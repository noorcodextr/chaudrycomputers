import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart } from "lucide-react";

import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { money } from "@/lib/fromatter";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import type { Product as StorefrontProduct } from "@/types/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const productId = Number(id);

  if (!Number.isInteger(productId)) {
    notFound();
  }

  const result = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  const product = result[0];

  if (!product) {
    notFound();
  }

  const storefrontProduct: StorefrontProduct = {
    id: product.id,
    category: product.category,
    name: product.name,
    imageUrl: product.imageUrl ?? undefined,
    imageUrls: product.imageUrls,
    specs: product.specs,
    price: product.price,
    compareAtPrice: product.compareAtPrice ?? undefined,
    badge: product.badge ?? undefined,
    available: product.available,
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em] transition-opacity hover:opacity-70"
          >
            <ArrowLeft className="size-4" />
            Back to Store
          </Link>

          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.12em]">
            <ShoppingCart className="size-4" />
            Cart
          </div>
        </div>
      </header>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Product Gallery */}
          <div className="relative">
            <ProductGallery
              name={product.name}
              imageUrl={product.imageUrl}
              imageUrls={product.imageUrls}
            />

            {/* Stock */}
            <div className="absolute left-4 top-4 z-30 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/60">
              <span
                className={`size-2 ${
                  product.available
                    ? "bg-emerald-400"
                    : "bg-white/30"
                }`}
              />

              {product.available
                ? "In workshop"
                : "Out of stock"}
            </div>

            {/* Badge */}
            {product.badge && (
              <span className="absolute right-4 top-4 z-30 bg-accent px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-accent-foreground">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="font-manrope text-[10px] font-bold uppercase tracking-[.2em] text-primary">
              {product.category}
            </p>

            <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-[.9] tracking-wide sm:text-5xl lg:text-6xl">
              {product.name}
            </h1>

            {/* Specs */}
            {product.specs.length > 0 && (
              <div className="mt-8 border-y border-border py-6">
                <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[.16em] text-muted-foreground">
                  Specifications
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {product.specs.map((spec) => (
                    <div
                      key={spec}
                      className="border border-border bg-card px-4 py-3 text-sm"
                    >
                      {spec}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mt-8">
              <p className="font-manrope text-3xl font-medium">
                {money(product.price)}
              </p>

              {product.compareAtPrice && (
                <p className="mt-1 text-sm text-muted-foreground line-through">
                  {money(product.compareAtPrice)}
                </p>
              )}
            </div>

            <ProductPurchase product={storefrontProduct} />

            {/* Availability */}
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span
                className={`size-2 rounded-full ${
                  product.available
                    ? "bg-emerald-400"
                    : "bg-muted-foreground"
                }`}
              />

              {product.available
                ? "This product is currently available."
                : "This product is currently unavailable."}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}