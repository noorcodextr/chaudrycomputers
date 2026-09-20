import { customers, Customer } from "@/lib/data";
import clsx from "clsx";

const statusStyles: Record<Customer["status"], string> = {
  Active: "bg-pine-50 text-pine-700",
  Trial: "bg-slateblue/10 text-slateblue",
  "Past due": "bg-amber-400/15 text-amber-500",
  Cancelled: "bg-paper text-ink-soft border border-line",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CustomersTable() {
  return (
    <div className="bg-surface border border-line rounded-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-line">
        <div className="text-sm font-medium text-ink">{customers.length} customers</div>
      </div>

      <div className="overflow-x-auto thin-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-ink-faint border-b border-line">
              <th className="px-5 py-2.5 font-medium">Customer</th>
              <th className="px-5 py-2.5 font-medium">Plan</th>
              <th className="px-5 py-2.5 font-medium">MRR</th>
              <th className="px-5 py-2.5 font-medium">Customer since</th>
              <th className="px-5 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr
                key={c.id}
                className="border-b border-line last:border-0 hover:bg-paper/60 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pine-50 text-pine-700 text-xs font-medium flex items-center justify-center shrink-0">
                      {initials(c.name)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-ink font-medium truncate">{c.name}</div>
                      <div className="text-xs text-ink-faint truncate">{c.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink-soft">{c.plan}</td>
                <td className="px-5 py-3 font-mono text-ink">${c.mrr}</td>
                <td className="px-5 py-3 text-ink-faint text-xs">{c.accountsSince}</td>
                <td className="px-5 py-3">
                  <span
                    className={clsx(
                      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                      statusStyles[c.status]
                    )}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
