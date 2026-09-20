CREATE TABLE IF NOT EXISTS "site_settings" (
  "id" serial PRIMARY KEY,
  "storefront_headline" text NOT NULL DEFAULT 'Build without doubt.',
  "storefront_subtitle" text NOT NULL DEFAULT 'Genuine PC components, checked by people who know what they are looking at.',
  "storefront_cta" text NOT NULL DEFAULT 'Browse the bench',
  "location" text NOT NULL DEFAULT 'Bahawalpur, Pakistan',
  "support_hours" text NOT NULL DEFAULT 'Mon–Sat · 10:00 AM to 8:00 PM',
  "phone" text DEFAULT '',
  "footer_text" text NOT NULL DEFAULT 'The Bahawalpur parts desk for people who care what goes inside the case.',
  "updated_at" timestamp NOT NULL DEFAULT now()
);

INSERT INTO "site_settings" (
  "storefront_headline",
  "storefront_subtitle",
  "storefront_cta",
  "location",
  "support_hours",
  "phone",
  "footer_text",
  "updated_at"
)
SELECT
  'Build without doubt.',
  'Genuine PC components, checked by people who know what they are looking at.',
  'Browse the bench',
  'Bahawalpur, Pakistan',
  'Mon–Sat · 10:00 AM to 8:00 PM',
  '',
  'The Bahawalpur parts desk for people who care what goes inside the case.',
  now()
WHERE NOT EXISTS (SELECT 1 FROM "site_settings");
