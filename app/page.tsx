import { eq } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { mapDbProductToStorefront } from "@/lib/mappers";
import StorefrontClient from "@/components/storefront/StorefrontClient";

export default async function HomePage() {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.available, true));

  const storefrontProducts = rows.map(mapDbProductToStorefront);

  return <StorefrontClient products={storefrontProducts} />;
}