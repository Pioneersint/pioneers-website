import { z } from "zod";
import { router, publicProcedure } from "./router";
import { getDb } from "./queries/connection";
import { certificates } from "@db/schema";
import { eq } from "drizzle-orm";

export const certificateRouter = router({
  /**
   * Verify a certificate by ID
   */
  verify: publicProcedure
    .input(z.object({ certId: z.string().min(1) }))
    .query(async ({ input }) => {
      const db = getDb();

      const results = await db
        .select()
        .from(certificates)
        .where(eq(certificates.certId, input.certId))
        .limit(1);

      if (results.length === 0) {
        return {
          found: false,
          message: "Certificate not found. Please verify the certificate ID.",
        };
      }

      const cert = results[0];
      const now = new Date();
      const isExpired = cert.expiryDate ? new Date(cert.expiryDate) < now : false;
      const isRevoked = cert.status === "revoked";
      const isValid = cert.status === "active" && !isExpired;

      return {
        found: true,
        valid: isValid,
        certificate: {
          certId: cert.certId,
          holderName: cert.holderName,
          holderEmail: cert.holderEmail,
          courseName: cert.courseName,
          issueDate: cert.issueDate,
          expiryDate: cert.expiryDate,
          status: isRevoked ? "revoked" : isExpired ? "expired" : "active",
        },
        message: isRevoked
          ? "This certificate has been revoked."
          : isExpired
          ? "This certificate has expired."
          : "Certificate verified successfully.",
      };
    }),

  /**
   * Create a certificate (admin)
   */
  create: publicProcedure
    .input(
      z.object({
        certId: z.string().min(1),
        holderName: z.string().min(1),
        holderEmail: z.string().email().optional(),
        courseName: z.string().min(1),
        issueDate: z.string().transform((s) => new Date(s)),
        expiryDate: z.string().transform((s) => new Date(s)).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      await db.insert(certificates).values({
        certId: input.certId,
        holderName: input.holderName,
        holderEmail: input.holderEmail || null,
        courseName: input.courseName,
        issueDate: input.issueDate,
        expiryDate: input.expiryDate || null,
        status: "active",
      });

      return { success: true, message: "Certificate created successfully" };
    }),

  /**
   * List all certificates (admin)
   */
  list: publicProcedure.query(async () => {
    const db = getDb();
    return db.select().from(certificates);
  }),
});
