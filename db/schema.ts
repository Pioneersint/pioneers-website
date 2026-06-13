import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  decimal,
  boolean,
  json,
} from "drizzle-orm/mysql-core";

// ── Users (from auth system) ──
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ── Contact Form Submissions ──
export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  company: varchar("company", { length: 255 }),
  service: varchar("service", { length: 255 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;

// ── OTP Codes ──
export const otpCodes = mysqlTable("otp_codes", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  code: varchar("code", { length: 10 }).notNull(),
  verified: boolean("verified").default(false).notNull(),
  attempts: int("attempts").default(0).notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ── Courses ──
export const courses = mysqlTable("courses", {
  id: serial("id").primaryKey(),
  courseId: varchar("course_id", { length: 50 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  code: varchar("code", { length: 50 }),
  duration: varchar("duration", { length: 50 }),
  modules: int("modules").default(0),
  level: varchar("level", { length: 50 }),
  price: decimal("price", { precision: 10, scale: 2 }).default("0"),
  image: varchar("image", { length: 255 }),
  instructor: varchar("instructor", { length: 255 }),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Course = typeof courses.$inferSelect;

// ── Course Enrollments ──
export const enrollments = mysqlTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  courseId: varchar("course_id", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["pending", "paid", "completed", "cancelled"]).default("pending").notNull(),
  paymentRef: varchar("payment_ref", { length: 255 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ── Payments ──
export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  tranRef: varchar("tran_ref", { length: 255 }).notNull(),
  cartId: varchar("cart_id", { length: 255 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 10 }).default("USD"),
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 320 }),
  customerPhone: varchar("customer_phone", { length: 30 }),
  description: text("description"),
  status: mysqlEnum("status", ["pending", "success", "failed", "cancelled"]).default("pending").notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }),
  paytabsResponse: json("paytabs_response"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;

// ── Certificates ──
export const certificates = mysqlTable("certificates", {
  id: serial("id").primaryKey(),
  certId: varchar("cert_id", { length: 50 }).notNull().unique(),
  holderName: varchar("holder_name", { length: 255 }).notNull(),
  holderEmail: varchar("holder_email", { length: 320 }),
  courseName: varchar("course_name", { length: 255 }).notNull(),
  issueDate: timestamp("issue_date").notNull(),
  expiryDate: timestamp("expiry_date"),
  status: mysqlEnum("status", ["active", "expired", "revoked"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Certificate = typeof certificates.$inferSelect;

// ── PDF Store Orders ──
export const pdfOrders = mysqlTable("pdf_orders", {
  id: serial("id").primaryKey(),
  orderId: varchar("order_id", { length: 255 }).notNull().unique(),
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 320 }),
  items: json("items"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar("payment_method", { length: 50 }),
  paymentStatus: mysqlEnum("payment_status", ["pending", "paid", "delivered"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
