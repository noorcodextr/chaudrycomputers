"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/products";

export default function DeleteProductButton({ id }: { id: number }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        if (confirm("Delete this product? This can't be undone.")) {
          startTransition(() => deleteProduct(id));
        }
      }}
      className="text-ink-soft hover:text-rose disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}