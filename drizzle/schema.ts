import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
  foreignKey,
} from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("category", [
  "Processors",
  "Graphics Cards",
  "Memory",
  "Storage",
  "Power Supply",
  "Cooling",
  "Peripherals",
  "Accessories",
]);

export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  category: categoryEnum("category").notNull(),

  name: varchar("name", { length: 255 }).notNull(),

  imageUrl: text("image_url"),
  imageUrls: text("image_urls")
  .array()
  .notNull()
  .default([]),

  specs: text("specs").array().notNull().default([]),

  price: integer("price").notNull(),

  compareAtPrice: integer("compare_at_price"),

  badge: varchar("badge", { length: 100 }),

  available: boolean("available")
    .notNull()
    .default(true),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});


export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),

  username: varchar("username", {
    length: 100,
  })
    .notNull()
    .unique(),

  email: varchar("email", {
    length: 255,
  })
    .notNull()
    .unique(),

  passwordHash: text("password_hash").notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});

export const orderStatusEnum = pgEnum("order_status", [
  "Pending",
  "Contacted",
  "Confirmed",
  "Completed",
  "Cancelled",
]);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  postalCode: varchar("postal_code", { length: 30 }),
  total: integer("total").notNull(),
  status: orderStatusEnum("status").notNull().default("Pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderItems = pgTable(
  "order_items",
  {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").notNull(),
    productId: integer("product_id").references(() => products.id, { onDelete: "set null" }),
    productName: varchar("product_name", { length: 255 }).notNull(),
    unitPrice: integer("unit_price").notNull(),
    quantity: integer("quantity").notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.orderId],
      foreignColumns: [orders.id],
    }),
  ],
);

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),

  storefrontHeadline: text("storefront_headline").notNull().default("Build without doubt."),
  storefrontSubtitle: text("storefront_subtitle").notNull().default("Genuine PC components, checked by people who know what they are looking at."),
  storefrontCta: text("storefront_cta").notNull().default("Browse the bench"),
  logoUrl: text("logo_url").default(""),

  location: text("location").notNull().default("Bahawalpur, Pakistan"),
  supportHours: text("support_hours").notNull().default("Mon–Sat · 10:00 AM to 8:00 PM"),
  phone: text("phone").default(""),
  footerText: text("footer_text").notNull().default("The Bahawalpur parts desk for people who care what goes inside the case."),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Admin = typeof admins.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;