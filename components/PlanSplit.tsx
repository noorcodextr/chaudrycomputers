"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { CategoryPoint } from "@/lib/analytics";

export default function PlanSplit({ data }: { data: CategoryPoint[] }) {
  const total = data.reduce((sum, point) => sum + point.value, 0);
  return (
    <div className="bg-surface border border-line rounded-card shadow-card p-5 h-full flex flex-col">
      <div className="text-sm font-medium text-ink mb-1">Inventory by category</div>
      <div className="text-xs text-ink-faint mb-2">{total.toLocaleString()} catalog products</div>

      <div className="flex-1 flex items-center justify-center relative min-h-[160px]">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              innerRadius={48}
              outerRadius={70}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: unknown, name: unknown) => [`${value ?? 0} products`, String(name)]}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E5E4E0",
                fontSize: 13,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-mono text-lg text-ink">{total}</span>
          <span className="text-[10px] text-ink-faint">total</span>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        {data.map((p) => (
          <div key={p.category} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-ink-soft">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              {p.category}
            </span>
            <span className="text-ink font-medium">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
