CREATE TYPE "category" AS ENUM('Processors', 'Graphics Cards', 'Memory', 'Storage', 'Power Supply', 'Cooling', 'Peripherals', 'Accessories');--> statement-breakpoint
CREATE TABLE "admins" (
	"id" serial PRIMARY KEY,
	"username" varchar(100) NOT NULL UNIQUE,
	"email" varchar(255) NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY,
	"category" "category" NOT NULL,
	"name" varchar(255) NOT NULL,
	"image_url" text,
	"specs" text[] DEFAULT '{}'::text[] NOT NULL,
	"price" integer NOT NULL,
	"compare_at_price" integer,
	"badge" varchar(100),
	"available" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
