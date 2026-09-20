import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import RevenueChart from "@/components/RevenueChart";
import PlanSplit from "@/components/PlanSplit";
import { db } from "@/drizzle/db";
import { orders, products } from "@/drizzle/schema";
import { getCategorySplit, getRevenueSeries } from "@/lib/analytics";

export default async function AdminAnalyticsPage() {
  const [orderRows, productRows] = await Promise.all([
    db.select().from(orders),
    db.select().from(products),
  ]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <Topbar title="Analytics" subtitle="Store revenue and inventory trends" />
        <main className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2">
              <RevenueChart data={getRevenueSeries(orderRows)} />
            </div>
            <PlanSplit data={getCategorySplit(productRows)} />
          </div>
        </main>
      </div>
    </div>
  );
}