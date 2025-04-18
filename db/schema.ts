import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  stripeId: text("stripe_id").notNull(),
  amount: integer("amount").notNull(),
  userId: integer("user_id").references(() => users.id),
  status: text("status").default("completed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  email_verified: boolean("email_verified").default(false),
  verification_token: text("verification_token"),
  verification_token_expiry: timestamp("verification_token_expiry"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Simplified insert schema - removed password and verification fields
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email("Invalid email format"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

export const selectUserSchema = createSelectSchema(users);
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;