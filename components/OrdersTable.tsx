"use client";

import type { Order } from "@/drizzle/schema";
import { updateOrderStatus } from "@/actions/orders";
import clsx from "clsx";

const statusStyles: Record<Order["status"], string> = {
  Pending: "bg-amber-400/15 text-amber-500",
  Contacted: "bg-slateblue/10 text-slateblue",
  Confirmed: "bg-pine-50 text-pine-700",
  Completed: "bg-pine-500 text-white",
  Cancelled: "bg-rose/10 text-rose",
};

export default function OrdersTable({ rows, limit }: { rows: Order[]; limit?: number }) {
  const visibleRows = limit ? rows.slice(0, limit) : rows;

  return (
    <div className="bg-surface border border-line rounded-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-line">
        <div className="text-sm font-medium text-ink">
          {limit ? "Recent orders" : "All orders"}
        </div>
        {limit && (
          <a href="/admin/orders" className="text-xs text-pine-600 font-medium hover:underline">
            View all
          </a>
        )}
      </div>

      <div className="overflow-x-auto thin-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-faint border-b border-line">
              <th className="px-5 py-2.5 font-medium">Order</th>
              <th className="px-5 py-2.5 font-medium">Customer</th>
              <th className="px-5 py-2.5 font-medium">City</th>
              <th className="px-5 py-2.5 font-medium">Total</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
              <th className="px-5 py-2.5 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((order) => (
              <tr
                key={order.id}
                className="border-b border-line last:border-0 hover:bg-paper/60 transition-colors"
              >
                <td className="px-5 py-3 font-mono text-xs text-ink-soft">{order.id}</td>
                <td className="px-5 py-3 text-ink font-medium">{order.customerName}</td>
                <td className="px-5 py-3 text-ink-soft">{order.city}</td>
                <td className="px-5 py-3 font-mono text-ink">Rs {order.total.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <form action={updateOrderStatus.bind(null, order.id)}>
                    <select name="status" defaultValue={order.status} onChange={(event) => event.currentTarget.form?.requestSubmit()} className={clsx("rounded border-0 px-2 py-1 text-xs font-medium outline-none", statusStyles[order.status])}>
                      {Object.keys(statusStyles).map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                  </form>
                </td>
                <td className="px-5 py-3 text-ink-faint text-xs">{order.createdAt.toLocaleDateString("en-PK")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
