import Link from "next/link";
import { desc } from "drizzle-orm";
import { Pencil } from "lucide-react";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { db } from "@/drizzle/db";
import { products } from "@/drizzle/schema";
import DeleteProductButton from "@/components/admin/DeleteProductButton"
import { money } from "@/lib/fromatter";

export default async function AdminProductsPage() {
    const rows = await db.select().from(products).orderBy(desc(products.createdAt));

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 min-w-0">
                <Topbar title="Products" subtitle={`${rows.length} products in inventory`} />
                <main className="p-6 md:p-8 space-y-4">
                    <div className="flex justify-end">
                        <Link
                            href="/admin/products/new"
                            className="bg-pine-500 text-ink-soft border border-pine-500 text-sm font-medium px-4 py-2 rounded-md hover:bg-pine-600 transition-colors"
                        >
                            Add product
                        </Link>
                    </div>

                    <div className="bg-surface border border-line rounded-card shadow-card overflow-hidden">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-xs text-ink-faint border-b border-line">
                                    <th className="px-5 py-2.5 font-medium">Name</th>
                                    <th className="px-5 py-2.5 font-medium">Category</th>
                                    <th className="px-5 py-2.5 font-medium">Price</th>
                                    <th className="px-5 py-2.5 font-medium">Available</th>
                                    <th className="px-5 py-2.5 font-medium" />
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((product) => (
                                    <tr key={product.id} className="border-b border-line last:border-0">
                                        <td className="px-5 py-3 text-ink font-medium">{product.name}</td>
                                        <td className="px-5 py-3 text-ink-soft">{product.category}</td>
                                        <td className="px-5 py-3 font-mono text-ink">
                                            {money(product.price)}
                                        </td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={
                                                    product.available
                                                        ? "text-pine-700 bg-pine-50 px-2 py-0.5 rounded text-xs font-medium"
                                                        : "text-ink-soft bg-paper border border-line px-2 py-0.5 rounded text-xs font-medium"
                                                }
                                            >
                                                {product.available ? "Available" : "Unavailable"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3">
                                            <div className="flex items-center gap-3 justify-end">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="text-ink-soft hover:text-pine-600"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <DeleteProductButton id={product.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {rows.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-5 py-10 text-center text-ink-faint text-sm">
                                            No products yet — add your first one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}