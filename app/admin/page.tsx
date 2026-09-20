import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";
import RevenueChart from "@/components/RevenueChart";
import PlanSplit from "@/components/PlanSplit";
import ActivityFeed from "@/components/ActivityFeed";
import OrdersTable from "@/components/OrdersTable";
import { db } from "@/drizzle/db";
import { orders, products } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import { money } from "@/lib/fromatter";
import { getCategorySplit, getRevenueSeries } from "@/lib/analytics";

export default async function AdminDashboardPage() {
  const [orderRows, productRows] = await Promise.all([
    db.select().from(orders).orderBy(desc(orders.createdAt)),
    db.select().from(products),
  ]);
  const completedRevenue = orderRows
    .filter((order) => order.status === "Confirmed" || order.status === "Completed")
    .reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orderRows.filter((order) => order.status === "Pending").length;
  const availableProducts = productRows.filter((product) => product.available).length;
  const revenueSeries = getRevenueSeries(orderRows);
  const categorySplit = getCategorySplit(productRows);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title="Overview" subtitle="Dashboard summary" />

        <main className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              label="Confirmed revenue"
              value={money(completedRevenue)}
              delta={0}
            />
            <StatCard
              label="Customer orders"
              value={orderRows.length.toLocaleString()}
              delta={0}
            />
            <StatCard
              label="Pending requests"
              value={pendingOrders.toLocaleString()}
              delta={0}
              positiveIsGood={false}
            />
            <StatCard
              label="Available products"
              value={availableProducts.toLocaleString()}
              delta={0}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <RevenueChart data={revenueSeries} />
            </div>
            <PlanSplit data={categorySplit} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <OrdersTable rows={orderRows} limit={5} />
            </div>
            <ActivityFeed orders={orderRows} products={productRows} />
          </div>
        </main>
      </div>
    </div>
  );
}