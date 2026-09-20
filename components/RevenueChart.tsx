"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { RevenuePoint } from "@/lib/analytics";

export default function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <div className="bg-surface border border-line rounded-card shadow-card p-5 h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-sm font-medium text-ink">Order revenue</div>
          <div className="text-xs text-ink-faint mt-0.5">Recent monthly totals</div>
        </div>
        <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-ink-soft">
              <span className="w-2 h-2 rounded-full bg-pine-500" /> Revenue
            </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F6B5C" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#0F6B5C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#E5E4E0" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9A9C9E", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9A9C9E", fontSize: 12 }}
            tickFormatter={(v) => `Rs ${Math.round(v / 1000)}k`}
            width={44}
          />
          <Tooltip
            formatter={(value: unknown) => [`Rs ${Number(value ?? 0).toLocaleString()}`, "Revenue"]}
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #E5E4E0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              fontSize: 13,
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#0F6B5C"
            strokeWidth={2}
            fill="url(#revFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
