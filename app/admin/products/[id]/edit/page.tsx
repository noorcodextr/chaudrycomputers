import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProductForm from "@/components/admin/ProductForm";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import { updateProduct } from "@/actions/products";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  const [product] = await db.select().from(products).where(eq(products.id, productId));

  if (!product) {
    notFound();
  }

  const updateWithId = updateProduct.bind(null, productId);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title="Edit product" subtitle={product.name} />
        <main className="p-6 md:p-8">
          <ProductForm
            action={updateWithId}
            submitLabel="Save changes"
            initialValues={{
                id: product.id,
              name: product.name,
              category: product.category,
              imageUrls: product.imageUrls ?? [],
              specs: product.specs,
              price: product.price,
              compareAtPrice: product.compareAtPrice ?? undefined,
              badge: product.badge ?? "",
              available: product.available,
            }}
          />
        </main>
      </div>
    </div>
  );
}