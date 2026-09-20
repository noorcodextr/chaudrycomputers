import type { Product as DbProduct } from "@/drizzle/schema";
import type { Product } from "@/types/products";

export function mapDbProductToStorefront(row: DbProduct): Product {
  return {
    id: row.id,
    category: row.category,
    name: row.name,
    imageUrl: row.imageUrl ?? undefined,
    imageUrls: row.imageUrls,
    specs: row.specs,
    price: row.price,
    compareAtPrice: row.compareAtPrice ?? undefined,
    badge: row.badge ?? undefined,
    available: row.available,
  };
}