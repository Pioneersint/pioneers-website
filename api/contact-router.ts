import { z } from "zod";
import { router, publicProcedure } from "./router";
import { getDb } from "./queries/connection";
import { contacts } from "@db/schema";
import { desc, eq } from "drizzle-orm";

export const contactRouter = router({
  submit: publicProcedure
    .input(
      z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        phone: z.string().optional(),
        company: z.string().optional(),
        service: z.string().optional(),
        message: z.string().min(10, "Message must be at least 10 characters"),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      await db.insert(contacts).values({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        company: input.company || null,
        service: input.service || null,
        message: input.message,
        status: "new",
      });

      return { success: true, message: "Thank you! We will contact you within 24 hours." };
    }),

  list: publicProcedure.query(async () => {
    const db = getDb();
    return db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }),

  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["new", "read", "replied"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();
      await db
        .update(contacts)
        .set({ status: input.status })
        .where(eq(contacts.id, input.id));
      return { success: true };
    }),
});
