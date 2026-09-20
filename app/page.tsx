import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { mapDbProductToStorefront } from "@/lib/mappers";
import StorefrontClient from "@/components/storefront/StorefrontClient";
import { getSiteSettings } from "@/lib/site-content";

export default async function HomePage() {
  const [rows, settings] = await Promise.all([
    db
      .select()
      .from(products)
      .where(eq(products.available, true)),
    getSiteSettings(),
  ]);

  const storefrontProducts = rows.map(mapDbProductToStorefront);

  return <StorefrontClient products={storefrontProducts} settings={settings} />;
}