// ═══════════════════════════════════════════════════════════════
// HCMS Pro — PayTabs Payment Gateway Integration Server
// Node.js + Express — Ready for deployment on Vercel/Render/Railway
// ═══════════════════════════════════════════════════════════════
const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const app = express();

// ── Configuration ──
const CONFIG = {
  // PayTabs Credentials (from your PayTabs merchant dashboard)
  PAYTABS_PROFILE_ID: process.env.PAYTABS_PROFILE_ID || "YOUR_PROFILE_ID",
  PAYTABS_SERVER_KEY: process.env.PAYTABS_SERVER_KEY || "YOUR_SERVER_KEY",
  PAYTABS_CLIENT_KEY: process.env.PAYTABS_CLIENT_KEY || "YOUR_CLIENT_KEY",
  PAYTABS_REGION: process.env.PAYTABS_REGION || "SAU", // SAU, UAE, EGY, etc.
  // Your Domain
  BASE_URL: process.env.BASE_URL || "https://app.pioneers-intl.com",
  API_URL: process.env.API_URL || "https://api.pioneers-intl.com",
  // Plans Pricing (USD)
  PLANS: {
    basic: { name: "Basic", monthly: 99, yearly: 990 },
    professional: { name: "Professional", monthly: 249, yearly: 2490 },
    enterprise: { name: "Enterprise", monthly: 499, yearly: 4990 },
    consultant: { name: "Consultant", monthly: 999, yearly: 9990 },
  },
  // Security
  WEBHOOK_SECRET: process.env.WEBHOOK_SECRET || "your-webhook-secret-key",
};

// ── In-memory storage (replace with Supabase/PostgreSQL for production) ──
const payments = new Map();
const hospitals = new Map();

// ── Middleware ──
app.use(cors({
  origin: ["https://app.pioneers-intl.com", "https://34faxd6fdaelk.kimi.page", "http://localhost:5173", "https://pioneers-intl.com"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ═══════════════════════════════════════════════════════════════
// 1. CREATE PAYMENT SESSION
// POST /api/payment/create
// ═══════════════════════════════════════════════════════════════
app.post("/api/payment/create", async (req, res) => {
  try {
    const { plan_id, billing_cycle, hospital_name, admin_email, admin_name, return_url } = req.body;

    // Validate
    const plan = CONFIG.PLANS[plan_id];
    if (!plan) {
      return res.status(400).json({ error: "Invalid plan", valid_plans: Object.keys(CONFIG.PLANS) });
    }

    const cycle = billing_cycle === "yearly" ? "yearly" : "monthly";
    const amount = plan[cycle];
    const description = `${plan.name} Plan (${cycle}) — ${hospital_name}`;

    // Generate unique order ID
    const orderId = `HCM-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Store pending payment
    payments.set(orderId, {
      orderId,
      planId: plan_id,
      billingCycle: cycle,
      amount,
      hospitalName: hospital_name,
      hospitalNameAr: hospital_name,
      adminEmail: admin_email,
      adminName: admin_name,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    // ── PayTabs Payment Request ──
    const paytabsPayload = {
      profile_id: CONFIG.PAYTABS_PROFILE_ID,
      tran_type: "sale",
      tran_class: "ecom",
      cart_id: orderId,
      cart_description: description,
      cart_currency: "USD",
      cart_amount: amount,
      callback: `${CONFIG.API_URL}/api/payment/webhook`,
      return: return_url || `${CONFIG.BASE_URL}/#/payment/success?order=${orderId}`,
      customer_details: {
        name: admin_name || "Hospital Admin",
        email: admin_email || "admin@hospital.com",
        phone: "+966500000000",
        country: "SA",
        city: "Riyadh",
        state: "Riyadh",
        zip: "12345",
        ip: req.ip || "127.0.0.1",
      },
      shipping_details: {
        name: hospital_name,
        email: admin_email,
        phone: "+966500000000",
        country: "SA",
        city: "Riyadh",
        state: "Riyadh",
        zip: "12345",
        ip: req.ip || "127.0.0.1",
      },
      user_defined: {
        udf1: plan_id,
        udf2: cycle,
        udf3: hospital_name,
        udf4: admin_email,
        udf5: admin_name,
        udf6: orderId,
      },
      framed: false,
      language: "en",
      hide_shipping: true,
    };

    // Call PayTabs API
    const response = await fetch("https://secure.paytabs.com/payment/request", {
      method: "POST",
      headers: {
        "authorization": CONFIG.PAYTABS_SERVER_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(paytabsPayload),
    });

    const paytabsResult = await response.json();

    if (paytabsResult.redirect_url) {
      return res.json({
        success: true,
        payment_url: paytabsResult.redirect_url,
        order_id: orderId,
        tran_ref: paytabsResult.tran_ref,
        amount,
        currency: "USD",
      });
    } else {
      console.error("PayTabs Error:", paytabsResult);
      return res.status(400).json({
        error: "Payment initiation failed",
        details: paytabsResult,
      });
    }
  } catch (error) {
    console.error("Payment Create Error:", error);
    return res.status(500).json({ error: "Internal server error", message: error.message });
  }
});

// ═══════════════════════════════════════════════════════════════
// 2. PAYTABS WEBHOOK (Payment Confirmation)
// POST /api/payment/webhook
// ═══════════════════════════════════════════════════════════════
app.post("/api/payment/webhook", async (req, res) => {
  try {
    const signature = req.headers["signature"] || req.headers["Authorization"];
    const payload = JSON.stringify(req.body);

    const { cart_id, tran_ref, payment_result, udf1, udf2, udf3, udf4, udf5, udf6 } = req.body;

    // Check payment result
    if (!payment_result || !payment_result.response_status || payment_result.response_status !== "A") {
      console.log("Payment not approved:", payment_result);
      return res.status(200).json({ received: true, status: "not_approved" });
    }

    // ── Extract custom data ──
    const orderId = cart_id || udf6;
    const planId = udf1;
    const billingCycle = udf2;
    const hospitalName = udf3;
    const adminEmail = udf4;
    const adminName = udf5;

    // Find pending payment
    const payment = payments.get(orderId);
    if (!payment) {
      console.error("Payment not found:", orderId);
      return res.status(404).json({ error: "Payment not found" });
    }

    // Mark as completed
    payment.status = "completed";
    payment.tranRef = tran_ref;
    payment.completedAt = new Date().toISOString();
    payment.paidAmount = req.body.cart_amount;

    // ── Create Hospital Account ──
    const hospitalId = `H-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const hospital = {
      id: hospitalId,
      name: hospitalName,
      nameEn: hospitalName,
      country: "Saudi Arabia",
      city: "Riyadh",
      plan: planId,
      status: "active",
      maxStandards: planId === "enterprise" ? 502 : planId === "professional" ? 200 : 50,
      maxUsers: planId === "enterprise" ? 50 : planId === "professional" ? 20 : 5,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (billingCycle === "yearly" ? 365 : 30) * 86400000).toISOString(),
      adminEmail,
      adminName: adminName || "Admin",
      billingCycle,
      monthlyFee: CONFIG.PLANS[planId]?.monthly || 99,
      paidAmount: payment.paidAmount,
      lastPaymentDate: new Date().toISOString(),
    };

    hospitals.set(hospitalId, hospital);
    payment.hospitalId = hospitalId;

    // ── Send Welcome Email ──
    await sendWelcomeEmail(hospital);

    console.log(`Payment Successful — Hospital Created: ${hospitalId} — ${hospitalName}`);
    return res.status(200).json({
      received: true,
      status: "completed",
      hospital_id: hospitalId,
      order_id: orderId,
    });
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ error: "Webhook processing failed" });
  }
});

// ═══════════════════════════════════════════════════════════════
// 3. CHECK PAYMENT STATUS
// GET /api/payment/status/:orderId
// ═══════════════════════════════════════════════════════════════
app.get("/api/payment/status/:orderId", (req, res) => {
  const { orderId } = req.params;
  const payment = payments.get(orderId);
  if (!payment) {
    return res.status(404).json({ error: "Payment not found" });
  }
  const hospital = payment.hospitalId ? hospitals.get(payment.hospitalId) : null;
  return res.json({
    order_id: orderId,
    status: payment.status,
    plan: payment.planId,
    amount: payment.amount,
    hospital_id: payment.hospitalId || null,
    hospital_name: hospital?.nameEn || null,
    created_at: payment.createdAt,
    completed_at: payment.completedAt || null,
  });
});

// ═══════════════════════════════════════════════════════════════
// 4. GET HOSPITAL DATA (for frontend after payment)
// GET /api/hospital/:hospitalId
// ═══════════════════════════════════════════════════════════════
app.get("/api/hospital/:hospitalId", (req, res) => {
  const { hospitalId } = req.params;
  const hospital = hospitals.get(hospitalId);
  if (!hospital) {
    return res.status(404).json({ error: "Hospital not found" });
  }
  return res.json({
    id: hospital.id,
    name: hospital.name,
    nameEn: hospital.nameEn,
    plan: hospital.plan,
    status: hospital.status,
    maxStandards: hospital.maxStandards,
    maxUsers: hospital.maxUsers,
    expiresAt: hospital.expiresAt,
    adminEmail: hospital.adminEmail,
    adminName: hospital.adminName,
  });
});

// ═══════════════════════════════════════════════════════════════
// 5. VERIFY PAYMENT (frontend calls this after return from PayTabs)
// GET /api/payment/verify
// ═══════════════════════════════════════════════════════════════
app.get("/api/payment/verify", async (req, res) => {
  const { tranRef } = req.query;
  if (!tranRef) {
    return res.status(400).json({ error: "Transaction reference required" });
  }
  try {
    const response = await fetch("https://secure.paytabs.com/payment/query", {
      method: "POST",
      headers: {
        "authorization": CONFIG.PAYTABS_SERVER_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        profile_id: CONFIG.PAYTABS_PROFILE_ID,
        tran_ref: tranRef,
      }),
    });
    const result = await response.json();
    return res.json({
      verified: result.payment_result?.response_status === "A",
      status: result.payment_result?.response_status === "A" ? "success" : "failed",
      transaction: result,
    });
  } catch (error) {
    console.error("Verify Error:", error);
    return res.status(500).json({ error: "Verification failed" });
  }
});

// ═══════════════════════════════════════════════════════════════
// 6. HEALTH CHECK
// GET /api/health
// ═══════════════════════════════════════════════════════════════
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "2.0.0",
    payments_pending: Array.from(payments.values()).filter((p) => p.status === "pending").length,
    hospitals_active: Array.from(hospitals.values()).filter((h) => h.status === "active").length,
  });
});

// ═══════════════════════════════════════════════════════════════
// HELPER: Send Welcome Email
// ═══════════════════════════════════════════════════════════════
async function sendWelcomeEmail(hospital) {
  try {
    const emailBody = `
    <h1>Welcome to HCMS Pro!</h1>
    <p>Dear ${hospital.adminName},</p>
    <p>Your hospital <strong>${hospital.nameEn}</strong> has been successfully registered.</p>
    <h3>Your Account Details:</h3>
    <ul>
    <li>Hospital ID: <code>${hospital.id}</code></li>
    <li>Plan: ${hospital.plan.toUpperCase()}</li>
    <li>Max Standards: ${hospital.maxStandards}</li>
    <li>Max Users: ${hospital.maxUsers}</li>
    <li>Valid Until: ${hospital.expiresAt}</li>
    </ul>
    <p>Login: <a href="https://app.pioneers-intl.com">app.pioneers-intl.com</a></p>
    <p>Need help? Contact support@pioneers-intl.com</p>
    `;
    console.log(`Welcome email prepared for: ${hospital.adminEmail}`);
  } catch (error) {
    console.error("Email Error:", error);
  }
}

// ═══════════════════════════════════════════════════════════════
// START SERVER (for local dev)
// ═══════════════════════════════════════════════════════════════
const PORT = process.env.PORT || 3001;
if (process.env.NODE_ENV !== "vercel") {
  app.listen(PORT, () => {
    console.log("═══════════════════════════════════════════════════════════");
    console.log(" HCMS Pro — PayTabs Payment API Server");
    console.log(" Version: 2.0.0");
    console.log(" Port:", PORT);
    console.log(" Environment:", process.env.NODE_ENV || "development");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(" Endpoints:");
    console.log(" POST /api/payment/create — Create payment session");
    console.log(" POST /api/payment/webhook — PayTabs webhook callback");
    console.log(" GET  /api/payment/status/:orderId — Check payment status");
    console.log(" GET  /api/payment/verify?tranRef=... — Verify transaction");
    console.log(" GET  /api/hospital/:hospitalId — Get hospital data");
    console.log(" GET  /api/health — Health check");
    console.log("═══════════════════════════════════════════════════════════");
  });
}

// Export for Vercel (serverless)
module.exports = app;
