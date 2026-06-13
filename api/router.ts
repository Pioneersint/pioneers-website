import { authRouter } from "./auth-router";
import { paytabsRouter } from "./paytabs-router";
import { otpRouter } from "./otp-router";
import { contactRouter } from "./contact-router";
import { certificateRouter } from "./certificate-router";
import { courseRouter } from "./course-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  paytabs: paytabsRouter,
  otp: otpRouter,
  contact: contactRouter,
  certificate: certificateRouter,
  course: courseRouter,
});

export type AppRouter = typeof appRouter;

// Re-export procedures for convenience
export { publicQuery };
export const router = createRouter;
export const publicProcedure = publicQuery;
