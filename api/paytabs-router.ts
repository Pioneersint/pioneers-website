import { z } from "zod";
import { router, publicProcedure } from "./router";
import { getDb } from "./queries/connection";
import { payments } from "@db/schema";
import { eq } from "drizzle-orm";

const PAYTABS_BASE_URL = "https://secure-egypt.paytabs.com";

function getCredentials() {
  return {
    serverKey: process.env.PAYTABS_SERVER_KEY || "SRJ9Z2GKHN-JLTRTDBRR6-RMBGKRK6W6",
    profileId: process.env.PAYTABS_PROFILE_ID || "168025",
  };
}

export const paytabsRouter = router({
  createPayment: publicProcedure
    .input(
      z.object({
        amount: z.number().min(1),
        cartId: z.string().min(1),
        description: z.string().min(1),
        customerName: z.string().min(1),
        customerEmail: z.string().email(),
        customerPhone: z.string().optional(),
        customerCountry: z.string().default("JO"),
        returnUrl: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      const { serverKey, profileId } = getCredentials();

      try {
        const response = await fetch(`${PAYTABS_BASE_URL}/payment/request`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: serverKey,
          },
          body: JSON.stringify({
            profile_id: parseInt(profileId as string, 10),
            tran_type: "sale",
            tran_class: "ecom",
            cart_id: input.cartId,
            cart_description: input.description,
            cart_currency: "USD",
            cart_amount: input.amount,
            callback: `${input.returnUrl}/callback`,
            return: input.returnUrl,
            customer_details: {
              name: input.customerName,
              email: input.customerEmail,
              phone: input.customerPhone || "+962000000000",
              country: input.customerCountry,
              city: "Amman",
              state: "Amman",
              zip: "11118",
            },
            hide_shipping: true,
            language: "en",
            framed: false,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`PayTabs API error ${response.status}: ${errorText.substring(0, 200)}`);
        }

        const data = (await response.json()) as any;

        if (data.redirect_url) {
          try {
            const db = getDb();
            await db.insert(payments).values({
              tranRef: data.tran_ref || input.cartId,
              cartId: input.cartId,
              amount: input.amount.toString(),
              currency: "USD",
              customerName: input.customerName,
              customerEmail: input.customerEmail,
              customerPhone: input.customerPhone,
              description: input.description,
              status: "pending",
              paymentMethod: "paytabs",
              paytabsResponse: data,
            });
          } catch (dbErr) {
            console.error("Failed to save payment record:", dbErr);
          }

          return {
            success: true,
            redirectUrl: data.redirect_url,
            tranRef: data.tran_ref,
          };
        }

        throw new Error(data.message || "PayTabs did not return a redirect URL");
      } catch (error: any) {
        console.error("PayTabs payment creation error:", error);
        throw new Error(error.message || "Failed to create payment");
      }
    }),

  verifyPayment: publicProcedure
    .input(z.object({ tranRef: z.string() }))
    .query(async ({ input }) => {
      const { serverKey, profileId } = getCredentials();

      try {
        const response = await fetch(`${PAYTABS_BASE_URL}/payment/query`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: serverKey,
          },
          body: JSON.stringify({
            profile_id: parseInt(profileId as string, 10),
            tran_ref: input.tranRef,
          }),
        });

        if (!response.ok) {
          throw new Error(`PayTabs query failed: ${response.status}`);
        }

        const data = (await response.json()) as any;

        try {
          const db = getDb();
          const status =
            data.payment_result?.response_status === "A"
              ? "success"
              : data.payment_result?.response_status === "C"
              ? "cancelled"
              : "failed";

          await db
            .update(payments)
            .set({ status: status as any, paytabsResponse: data })
            .where(eq(payments.tranRef, input.tranRef));
        } catch (dbErr) {
          console.error("Failed to update payment status:", dbErr);
        }

        return {
          success: data.payment_result?.response_status === "A",
          status: data.payment_result?.response_status,
          amount: data.cart_amount,
          message: data.payment_result?.response_message,
          data,
        };
      } catch (error: any) {
        throw new Error(error.message || "Failed to verify payment");
      }
    }),
});
