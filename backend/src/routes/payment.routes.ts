import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, type AuthRequest } from '../middleware/auth';

const router = Router();

// Get subscription plans
router.get('/plans', async (_req, res) => {
  res.json({
    success: true,
    data: [
      { plan: 'FREE', price: 0, features: ['Basic course access', 'Limited AI queries', 'Certificate verification'], limits: { maxCourses: 3, hasAIAccess: false, hasLMSAccess: false } },
      { plan: 'PRO', price: 99, currency: 'JOD', period: 'month', features: ['Full course library', 'Unlimited AI assistant', 'Digital certificates', 'Progress tracking', 'Priority support'], limits: { maxCourses: 999, hasAIAccess: true, hasLMSAccess: true } },
      { plan: 'ENTERPRISE', price: 299, currency: 'JOD', period: 'month', features: ['Everything in Pro', 'Custom consulting sessions', 'Team management', 'Advanced analytics', 'Dedicated account manager'], limits: { maxCourses: 999, hasAIAccess: true, hasLMSAccess: true } },
    ],
  });
});

// Get my subscription
router.get('/my-subscription', authenticate, async (req: AuthRequest, res) => {
  try {
    const sub = await prisma.subscription.findUnique({
      where: { userId: req.user!.userId },
      include: { invoices: { orderBy: { createdAt: 'desc' }, take: 10 } },
    });
    res.json({ success: true, data: sub });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create checkout session (mock - integrates with external gateway)
router.post('/checkout', authenticate, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({ plan: z.enum(['PRO', 'ENTERPRISE']) });
    const { plan } = schema.parse(req.body);

    // Return checkout URL structure for external payment gateway
    // In production, this would create a session with the payment provider
    res.json({
      success: true,
      data: {
        checkoutUrl: `${process.env.PAYMENT_GATEWAY_API_URL || '#'}/checkout`,
        sessionId: `session_${Date.now()}`,
        plan,
        amount: plan === 'PRO' ? 99 : 299,
        currency: 'JOD',
        // Webhook URL for payment confirmation
        webhookUrl: `${process.env.API_URL}/api/payments/webhook`,
      },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Webhook handler for payment gateway
router.post('/webhook', async (req, res) => {
  try {
    // Verify webhook signature from payment provider
    const signature = req.headers['x-webhook-signature'];
    if (!signature) return res.status(400).json({ success: false, error: 'Missing signature' });

    // Validate and process payment
    const { sessionId, status, customerId } = req.body;
    if (status === 'success') {
      // Activate subscription
      // Find user by gatewayCustomerId and update subscription
      await prisma.subscription.updateMany({
        where: { gatewayCustomerId: customerId },
        data: { status: 'ACTIVE', currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
      });
    }
    res.json({ success: true, received: true });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Cancel subscription
router.put('/cancel', authenticate, async (req: AuthRequest, res) => {
  try {
    const sub = await prisma.subscription.update({
      where: { userId: req.user!.userId },
      data: { status: 'CANCELED', canceledAt: new Date() },
    });
    res.json({ success: true, data: sub });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
