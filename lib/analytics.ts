import type { Order, Product } from "@/drizzle/schema";

export type RevenuePoint = { month: string; revenue: number };
export type CategoryPoint = { category: string; value: number; color: string };

const categoryColors = ["#0F6B5C", "#6FA79A", "#D9A441", "#4A5FC1", "#B3564A", "#7D8A86", "#A7B8B1", "#C98A2B"];

export function getRevenueSeries(rows: Order[], monthCount = 6): RevenuePoint[] {
  const now = new Date();
  return Array.from({ length: monthCount }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - monthCount + index + 1, 1);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const revenue = rows
      .filter((order) => {
        const created = new Date(order.createdAt);
        return created.getFullYear() === date.getFullYear() && created.getMonth() === date.getMonth() && order.status !== "Cancelled";
      })
      .reduce((sum, order) => sum + order.total, 0);
    return { month, revenue };
  });
}

export function getCategorySplit(rows: Product[]): CategoryPoint[] {
  const counts = new Map<string, number>();
  rows.forEach((product) => counts.set(product.category, (counts.get(product.category) ?? 0) + 1));
  return [...counts.entries()].map(([category, value], index) => ({ category, value, color: categoryColors[index % categoryColors.length] }));
}
