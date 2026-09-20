import { Search, Bell } from "lucide-react";

export default function Topbar({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="h-16 border-b border-line bg-paper/80 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-6 md:px-8">
      <div>
        <h1 className="text-[17px] font-semibold text-ink tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-ink-faint mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-surface border border-line rounded-md px-3 py-1.5 w-64">
          <Search className="w-3.5 h-3.5 text-ink-faint" />
          <input
            placeholder="Search customers, orders…"
            className="bg-transparent text-sm outline-none placeholder:text-ink-faint text-ink w-full"
          />
        </div>
        <button
          aria-label="Notifications"
          className="relative w-8 h-8 rounded-md border border-line bg-surface flex items-center justify-center hover:bg-paper transition-colors"
        >
          <Bell className="w-4 h-4 text-ink-soft" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-rose" />
        </button>
      </div>
    </header>
  );
}
