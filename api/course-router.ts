import { z } from "zod";
import { router, publicProcedure } from "./router";
import { getDb } from "./queries/connection";
import { courses, enrollments } from "@db/schema";
import { eq, desc } from "drizzle-orm";

export const courseRouter = router({
  /**
   * List all active courses
   */
  list: publicProcedure.query(async () => {
    const db = getDb();
    return db.select().from(courses).where(eq(courses.isActive, true));
  }),

  /**
   * Get a single course by ID
   */
  getById: publicProcedure
    .input(z.object({ courseId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const results = await db
        .select()
        .from(courses)
        .where(eq(courses.courseId, input.courseId))
        .limit(1);
      return results[0] || null;
    }),

  /**
   * Create enrollment
   */
  enroll: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        courseId: z.string(),
        paymentRef: z.string().optional(),
        amount: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if already enrolled
      const existing = await db
        .select()
        .from(enrollments)
        .where(eq(enrollments.userId, input.userId))
        .limit(1);

      if (existing.length > 0) {
        return { success: false, message: "Already enrolled in this course" };
      }

      await db.insert(enrollments).values({
        userId: input.userId,
        courseId: input.courseId,
        status: input.paymentRef ? "paid" : "pending",
        paymentRef: input.paymentRef || null,
        amount: input.amount?.toString() || null,
      });

      return { success: true, message: "Enrollment successful" };
    }),

  /**
   * Get user enrollments
   */
  myEnrollments: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      return db
        .select()
        .from(enrollments)
        .where(eq(enrollments.userId, input.userId))
        .orderBy(desc(enrollments.createdAt));
    }),

  /**
   * Seed default courses (run once)
   */
  seed: publicProcedure.mutation(async () => {
    const db = getDb();

    const defaultCourses = [
      { courseId: "iso9001-fund", title: "ISO 9001:2015 Fundamentals", description: "Learn the fundamentals of ISO 9001 quality management systems.", code: "ISO 9001", duration: "12 hours", modules: 8, level: "Beginner", price: "199", image: "/assets/images/service-iso.jpg", instructor: "Dr. Ahmad Hassan" },
      { courseId: "iso9001-auditor", title: "ISO 9001 Lead Auditor", description: "Become a certified ISO 9001 Lead Auditor with this comprehensive 40-hour program.", code: "ISO 9001", duration: "40 hours", modules: 12, level: "Advanced", price: "299", image: "/assets/images/service-iso.jpg", instructor: "Dr. Ahmad Hassan" },
      { courseId: "iso14001-env", title: "ISO 14001 Environmental Management", description: "Master environmental management systems with ISO 14001.", code: "ISO 14001", duration: "16 hours", modules: 10, level: "Intermediate", price: "249", image: "/assets/images/service-esg.jpg", instructor: "Sarah Al-Rashid" },
      { courseId: "iso45001-hse", title: "ISO 45001 Occupational Health & Safety", description: "Learn to implement occupational health and safety management systems.", code: "ISO 45001", duration: "20 hours", modules: 10, level: "Intermediate", price: "249", image: "/assets/images/hero-bg-1.jpg", instructor: "Eng. Mohammed Al-Farsi" },
      { courseId: "esg-strategy", title: "ESG Strategy & Reporting", description: "Develop effective ESG strategies and sustainability reporting frameworks.", code: "ESG", duration: "18 hours", modules: 8, level: "Intermediate", price: "349", image: "/assets/images/esg-premium.jpg", instructor: "Sarah Al-Rashid" },
      { courseId: "governance-best", title: "Corporate Governance Best Practices", description: "Learn corporate governance frameworks and best practices for GCC organizations.", code: "GOV", duration: "14 hours", modules: 6, level: "Advanced", price: "299", image: "/assets/images/service-governance.jpg", instructor: "Dr. Ahmad Hassan" },
    ];

    for (const course of defaultCourses) {
      // Check if exists
      const existing = await db
        .select()
        .from(courses)
        .where(eq(courses.courseId, course.courseId))
        .limit(1);

      if (existing.length === 0) {
        await db.insert(courses).values(course);
      }
    }

    return { success: true, message: `Seeded ${defaultCourses.length} courses` };
  }),
});
