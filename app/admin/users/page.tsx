import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { money } from "@/lib/fromatter";

export default async function AdminUsersPage() {
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));
  const customers = [...new Map(rows.map((order) => [order.phone, order])).values()];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title="Customers" subtitle={`${customers.length} unique customer contacts`} />
        <main className="p-6 md:p-8">
          <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-line text-left text-xs text-ink-faint"><th className="px-5 py-3 font-medium">Customer</th><th className="px-5 py-3 font-medium">Phone</th><th className="px-5 py-3 font-medium">Location</th><th className="px-5 py-3 font-medium">Orders</th><th className="px-5 py-3 font-medium">Last total</th></tr></thead>
                <tbody>
                  {customers.map((customer) => {
                    const orderCount = rows.filter((order) => order.phone === customer.phone).length;
                    return <tr key={customer.phone} className="border-b border-line last:border-0"><td className="px-5 py-3 font-medium text-ink">{customer.customerName}</td><td className="px-5 py-3 text-ink-soft">{customer.phone}</td><td className="px-5 py-3 text-ink-soft">{customer.city}</td><td className="px-5 py-3 text-ink-soft">{orderCount}</td><td className="px-5 py-3 font-mono text-ink">{money(customer.total)}</td></tr>;
                  })}
                  {!customers.length && <tr><td colSpan={5} className="px-5 py-10 text-center text-ink-faint">Customers appear here after the first order.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}