import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/actions/products";

export default function NewProductPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title="Add product" subtitle="Create a new catalog item" />
        <main className="p-6 md:p-8">
          <ProductForm action={createProduct} submitLabel="Create product" />
        </main>
      </div>
    </div>
  );
}