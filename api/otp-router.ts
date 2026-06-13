import { z } from "zod";
import { router, publicProcedure } from "./router";
import { getDb } from "./queries/connection";
import { otpCodes } from "@db/schema";
import { eq, and, gt, sql } from "drizzle-orm";

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.log(`[EMAIL] To: ${to}\nSubject: ${subject}\nCode visible in DB only`);
    return true;
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: "noreply@pioneersint.com", name: "Pioneers International" },
        subject,
        content: [{ type: "text/html", value: html }],
      }),
    });
    return response.ok;
  } catch (err) {
    console.error("Send email failed:", err);
    return false;
  }
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export const otpRouter = router({
  send: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const code = generateOTP();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

      // Delete old codes for this email
      await db.delete(otpCodes).where(eq(otpCodes.email, input.email));

      // Insert new code
      await db.insert(otpCodes).values({
        email: input.email,
        code,
        verified: false,
        attempts: 0,
        expiresAt,
      });

      // Send email
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0F4C81; margin: 0;">PIONEERS</h1>
            <p style="color: #2D8B6F; margin: 5px 0;">INTERNATIONAL THOUGHT FOR BUSINESS CONSULTING</p>
          </div>
          <div style="background: #f8fafc; border-radius: 12px; padding: 30px; text-align: center;">
            <h2 style="color: #1e293b; margin-bottom: 10px;">Your Verification Code</h2>
            <p style="color: #64748b; margin-bottom: 25px;">Use the code below to verify your email address:</p>
            <div style="background: white; border: 2px dashed #2D8B6F; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <span style="font-size: 36px; font-weight: bold; color: #0F4C81; letter-spacing: 8px;">${code}</span>
            </div>
            <p style="color: #94a3b8; font-size: 12px;">This code will expire in 10 minutes.<br>If you didn't request this, please ignore this email.</p>
          </div>
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 11px;">&copy; 2026 Pioneers International. Amman, Jordan.</p>
          </div>
        </div>
      `;

      const sent = await sendEmail(input.email, "Pioneers International - Email Verification Code", html);

      if (!sent && process.env.SENDGRID_API_KEY) {
        throw new Error("Failed to send verification email. Please try again.");
      }

      return {
        success: true,
        message: "Verification code sent to your email",
      };
    }),

  verify: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        code: z.string().length(6),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Find the OTP record
      const records = await db
        .select()
        .from(otpCodes)
        .where(
          and(
            eq(otpCodes.email, input.email),
            eq(otpCodes.code, input.code),
            eq(otpCodes.verified, false),
            gt(otpCodes.expiresAt, new Date())
          )
        )
        .limit(1);

      if (records.length === 0) {
        // Increment attempts
        await db
          .update(otpCodes)
          .set({ attempts: sql`${otpCodes.attempts} + 1` })
          .where(eq(otpCodes.email, input.email));

        throw new Error("Invalid or expired verification code");
      }

      // Mark as verified
      await db
        .update(otpCodes)
        .set({ verified: true })
        .where(eq(otpCodes.id, records[0].id));

      return { success: true, message: "Email verified successfully" };
    }),
});
