"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Product } from "@/types/products";

export default function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  function addToCart() {
    const stored = window.localStorage.getItem("chaudry-cart");
    const cart = stored ? JSON.parse(stored) as { product: Product; quantity: number }[] : [];
    const existing = cart.find((line) => line.product.id === product.id);
    const next = existing
      ? cart.map((line) => line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line)
      : [...cart, { product, quantity }];

    window.localStorage.setItem("chaudry-cart", JSON.stringify(next));
    window.dispatchEvent(new Event("chaudry-cart-updated"));
    router.push("/?cart=open");
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <div className="flex h-12 items-center border border-border">
        <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="grid h-full w-12 place-items-center transition-colors hover:bg-muted" aria-label="Decrease quantity">
          <Minus className="size-4" />
        </button>
        <span className="grid h-full w-12 place-items-center border-x border-border text-sm font-bold">{quantity}</span>
        <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} className="grid h-full w-12 place-items-center transition-colors hover:bg-muted" aria-label="Increase quantity">
          <Plus className="size-4" />
        </button>
      </div>
      <button type="button" disabled={!product.available} onClick={addToCart} className="flex h-12 flex-1 items-center justify-center gap-2 bg-chred px-6 text-xs font-extrabold uppercase tracking-[.14em] text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground">
        <ShoppingCart className="size-4" />
        {product.available ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}
