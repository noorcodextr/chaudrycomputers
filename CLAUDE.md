@AGENTS.md

# Chaudry Computers Store

## Project Purpose

Chaudry Computers is a computer-parts storefront for customers in Bahawalpur, Pakistan, paired with an unfinished admin dashboard. The public storefront is the primary implemented experience. The admin area is currently a visual/analytics prototype with credential-login scaffolding.

## Stack

- Next.js 16 App Router, React 19, TypeScript 5
- Tailwind CSS 4 with the Tailwind PostCSS plugin
- Drizzle ORM with PostgreSQL
- NextAuth 4 credentials provider with JWT sessions
- bcryptjs for password verification and seeding
- Lucide React and Phosphor icons
- Framer Motion, Zod, clsx, tailwind-merge
- TypeScript path alias: `@/*`

Use the Next.js guidance in `AGENTS.md` and consult the installed Next.js documentation under `node_modules/next/dist/docs/` before making framework-level changes.

## Application Flow

### Storefront

- Entry point: `app/page.tsx`
- Products are loaded from PostgreSQL in `app/page.tsx` and mapped by `lib/mappers.ts`.
- Search and category filtering happen client-side.
- The cart is client-side state persisted in `localStorage` and shown by `components/storefront/Cartpanel.tsx`.
- `Productcard.tsx` renders catalog items; `Brand.tsx` renders branding.
- Checkout posts validated items and customer details to `app/api/orders/route.ts`, persists the order/items, then optionally opens WhatsApp.
- Currency formatting lives in `lib/fromatter.ts` and uses Pakistan locale/Rs formatting.

### Admin

- Dashboard entry point: `app/admin/page.tsx`; layout: `app/admin/layout.tsx`.
- Dashboard metrics, chart series, orders, customers, and activity are static data from `lib/data.ts`.
- Main components are `Sidebar.tsx`, `Topbar.tsx`, `StatCard.tsx`, `RevenueChart.tsx`, `PlanSplit.tsx`, `OrdersTable.tsx`, `ActivityFeed.tsx`, and `CustomersTable.tsx`.
- `/admin/orders`, `/admin/products`, and `/admin/settings` directories exist but currently have no page implementations.
- Sidebar links also reference missing `/orders`, `/users`, `/analytics`, and `/settings` routes; the dashboard itself is `/admin`.

## Routes

- `/`: storefront catalog, filters, cart, demo checkout
- `/login`: credential login form
- `/admin`: protected dashboard with live product/order metrics
- `/admin/products`, `/admin/products/new`, `/admin/products/[id]/edit`: product CRUD with Cloudinary uploads
- `/admin/orders`: persisted orders and status updates
- `/admin/users`: customers derived from persisted orders
- `/admin/analytics`: live revenue and inventory charts
- `/admin/settings`: session and integration status
- `/api/auth/[...nextauth]`: NextAuth GET/POST handler

There are no implemented product, order, customer, payment, or WhatsApp API endpoints. The `actions/` directory is empty.

## Database

- Configuration: `drizzle.config.ts`
- Client: `drizzle/db.ts`
- Schema: `drizzle/schema.ts`
- Migration: `drizzle/20260919081114_loose_lord_hawal/migration.sql`
- Seed: `drizzle/seed.ts`

The schema contains:

- `products`: category enum, name, image URL, string-array specs, price, optional compare-at price, optional badge, availability, timestamps.
- `admins`: unique username/email, bcrypt password hash, created timestamp.
- `orders`: customer contact/delivery details, total, lifecycle status, timestamps.
- `order_items`: product snapshot, quantity, unit price, and foreign keys to orders/products.

There are no payment tables or payment integration. Product categories are `Processors`, `Graphics Cards`, `Memory`, `Storage`, `Power Supply`, `Cooling`, `Peripherals`, and `Accessories`.

The storefront product type in `types/products.ts` is separate from the Drizzle-inferred product type and is not currently connected to the database.

## Authentication and Security

- Auth config: `lib/auth.ts`; handler: `app/api/auth/[...nextauth]/route.ts`.
- Credentials are looked up by username in `admins`; passwords are checked with `bcrypt.compare`.
- Sessions use JWTs and the sign-in page is `/login`.
- `drizzle/seed.ts` requires `ADMIN_USERNAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`; it rejects passwords shorter than eight characters and hashes with bcrypt cost 12.
- `app/admin/layout.tsx` enforces a server-side session before rendering admin routes.
- Never copy values from `.env` into documentation, prompts, commits, or chat. Treat the currently present database and auth credentials as exposed and rotate them before deployment.

## UI and Styling

- Storefront styling is in `app/globals.css`: dark industrial/workshop direction, red accents, grid textures, Barlow Condensed display type, Manrope body type, dense uppercase labels, and sharp rectangular controls.
- Root fonts and metadata are configured in `app/layout.tsx`; metadata still has the default Create Next App title.
- Admin components intend a separate Orbit-style system using Public Sans, IBM Plex Mono, green/pine accents, neutral surfaces, and rounded cards.
- `app/admin/layout.tsx` imports an admin stylesheet that is currently missing. Several admin utility tokens such as `bg-surface`, `border-line`, `text-ink`, `text-pine-500`, and `rounded-card` are not clearly defined in the root stylesheet.
- Login uses shadcn-style primitives under `components/ui/`; component configuration is in `components.json`.

## Commands and Environment

```text
npm run dev
npm run build
npm run start
npm run lint
npm run db:generate
npm run db:push
npm run db:seed
npm run db:studio
```

Required environment variable names are `DATABASE_URL`, `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and optionally `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_PHONE_NUMBER` for WhatsApp. Do not document or print their values.

## Known Gaps

- Add payment integration and stock reservation if the business needs online payment.
- Add pagination/search and richer order detail views for larger inventories.
- Add admin password change and multi-admin management.
- Replace the default README and metadata.
- Add environment validation, tests, and test scripts.
- `updatedAt` is updated explicitly by product/order mutations.

## Working Conventions

Prefer the existing App Router, Tailwind, Drizzle, NextAuth, and shadcn patterns. Keep storefront and admin visual systems separate unless consolidation is intentional. Keep changes focused, preserve public APIs where possible, and enforce authorization on the server for protected operations. Do not assume demo data is persisted.
