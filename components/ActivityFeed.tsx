import type { Order, Product } from "@/drizzle/schema";
import clsx from "clsx";

const toneMap = {
  rose: "bg-rose",
  pine: "bg-pine-500",
  amber: "bg-amber-500",
  ink: "bg-ink-faint",
} as const;

type Tone = keyof typeof toneMap;

function formatRelativeTime(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.round(diffMs / 60000));

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours} hr ago`;
  }

  const days = Math.round(hours / 24);
  return `${days} day ago`;
}

function getLogTone(status: Order["status"] | "available" | "unavailable"): Tone {
  if (status === "Cancelled") return "rose";
  if (status === "Completed" || status === "Confirmed" || status === "available") return "pine";
  if (status === "Pending" || status === "Contacted" || status === "unavailable") return "amber";
  return "ink";
}

export default function ActivityFeed({
  orders,
  products,
}: {
  orders: Order[];
  products: Product[];
}) {
  const activity = [
    ...orders.slice(0, 4).map((order) => ({
      id: `order-${order.id}`,
      text: `${order.customerName} placed order ${order.id} for Rs ${order.total.toLocaleString()}`,
      timeLabel: formatRelativeTime(new Date(order.createdAt)),
      timestamp: new Date(order.createdAt).getTime(),
      tone: getLogTone(order.status),
    })),
    ...products.slice(0, 3).map((product) => ({
      id: `product-${product.id}`,
      text: `${product.name} ${product.available ? "is back in stock" : "was marked unavailable"}`,
      timeLabel: formatRelativeTime(new Date(product.updatedAt)),
      timestamp: new Date(product.updatedAt).getTime(),
      tone: getLogTone(product.available ? "available" : "unavailable"),
    })),
  ]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5);

  return (
    <div className="bg-surface border border-line rounded-card shadow-card p-5 h-full">
      <div className="text-sm font-medium text-ink mb-4">Recent activity</div>
      <ul className="space-y-4">
        {activity.length === 0 ? (
          <li className="text-sm text-ink-faint">No recent activity yet.</li>
        ) : (
          activity.map((item) => (
            <li key={item.id} className="flex gap-3">
              <span
                className={clsx("mt-1.5 w-1.5 h-1.5 rounded-full shrink-0", toneMap[item.tone])}
              />
              <div className="min-w-0">
                <p className="text-sm text-ink leading-snug">{item.text}</p>
                <p className="text-xs text-ink-faint mt-0.5">{item.timeLabel}</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
