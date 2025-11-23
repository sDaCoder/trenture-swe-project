import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    userId: uuid("user_id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("user_email").notNull().unique(),
    password: text("password").notNull(),
    emailVerified: boolean("email_verified").notNull().default(false),
    isAdmin: boolean("is_admin").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    forgotPasswordToken: text("forgot_password_token"),
    forgotPasswordTokenExpiry: text("forgot_password_token_expiry"),
    verifyToken: text("verify_token"),
    verifyTokenExpiry: text("verify_token_expiry"),
})