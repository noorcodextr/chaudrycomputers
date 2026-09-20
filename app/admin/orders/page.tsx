import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import OrdersTable from "@/components/OrdersTable";
import { db } from "@/drizzle/db";
import { orders } from "@/drizzle/schema";
import { desc } from "drizzle-orm";

export default async function AdminOrdersPage() {
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title="Orders" subtitle={`${rows.length} customer requests`} />
        <main className="p-6 md:p-8">
          <OrdersTable rows={rows} />
        </main>
      </div>
    </div>
  );
}