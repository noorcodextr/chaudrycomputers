import { money } from "@/lib/fromatter";
import { Product } from "@/types/products";
import { Cpu, Plus } from "lucide-react";
import { CldImage } from "next-cloudinary"
import { Button } from "../ui/button";
import Link from "next/link";

export function ProductCard({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (product: Product) => void;
}) {
  return (
    <article className="group flex min-h-[370px] flex-col border border-border bg-card transition-transform duration-200 hover:-translate-y-1">

      {/* Product Image Area */}
      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-[hsl(216_26%_13%)]">
        <div className="workshop-grid absolute inset-0 opacity-20" />

        {/* Stock Status */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-white/55">
          <span
            className={`size-1.5 ${product.available ? "bg-emerald-400" : "bg-white/30"
              }`}
          />
          {product.available ? "In workshop" : "Out of stock"}
        </div>

        {/* Badge */}
        {product.badge && (
          <span className="absolute right-3 top-3 z-10 bg-accent px-2 py-1 text-[9px] font-extrabold uppercase tracking-[.12em] text-accent-foreground">
            {product.badge}
          </span>
        )}

        {/* Complete Product Image */}
        <div className="relative flex h-full w-full items-center justify-center p-5 transition-transform duration-300 group-hover:scale-105">
          {product.imageUrl ? (
            <CldImage
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="max-h-full max-w-full object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="grid size-24 place-items-center border border-chred text-chred">
              <Cpu className="size-12" strokeWidth={1.2} />
            </div>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4">

        <p className="font-manrope text-[8px] uppercase tracking-[.16em] text-primary">
          {product.category}
        </p>

        <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-[.95] tracking-wide">
          {product.name}
        </h3>

        {/* Specifications */}
        {/* 
<div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
  {product.specs.map((spec) => (
    <span
      key={spec}
      className="text-[11px] text-muted-foreground"
    >
      {spec}
    </span>
  ))}
</div>
*/}

        {/* Price + Add Button */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-5">
          <div>
            <p className="font-manrope text-lg font-medium">
              {money(product.price)}
            </p>

            {product.compareAtPrice && (
              <p className="text-[11px] text-muted-foreground line-through">
                {money(product.compareAtPrice)}
              </p>
            )}
          </div>

          <Link href={`/product/${product.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center px-3 py-3.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-gray-500 transition-transform hover:-translate-y-0.5"
            >
              View Details
            </Button>
          </Link>

          <button
            type="button"
            disabled={!product.available}
            onClick={() => onAdd(product)}
            className="inline-flex items-center gap-1.5 bg-chred px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.12em] text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
          >
            <Plus className="size-3.5" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}