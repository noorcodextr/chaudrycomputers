import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import clsx from "clsx";

export default function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  positiveIsGood = true,
}: {
  label: string;
  value: string;
  delta: number;
  deltaLabel?: string;
  positiveIsGood?: boolean;
}) {
  const isPositive = delta >= 0;
  const isGood = positiveIsGood ? isPositive : !isPositive;

  return (
    <div className="bg-surface border border-line rounded-card shadow-card p-5">
      <div className="text-xs text-ink-soft">{label}</div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl text-ink tracking-tight">{value}</span>
      </div>
      <div className="mt-2 flex items-center gap-1">
        <span
          className={clsx(
            "flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded",
            isGood ? "bg-pine-50 text-pine-700" : "bg-rose/10 text-rose"
          )}
        >
          {isPositive ? (
            <ArrowUpRight className="w-3 h-3" />
          ) : (
            <ArrowDownRight className="w-3 h-3" />
          )}
          {Math.abs(delta)}%
        </span>
        <span className="text-xs text-ink-faint">{deltaLabel ?? "vs last month"}</span>
      </div>
    </div>
  );
}
