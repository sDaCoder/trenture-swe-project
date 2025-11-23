CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"user_email" text NOT NULL,
	"password" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"forgot_password_token" text,
	"forgot_password_token_expiry" text,
	CONSTRAINT "users_user_email_unique" UNIQUE("user_email")
);
