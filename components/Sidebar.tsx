"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Users,
  Receipt,
  LineChart,
  Settings,
  Orbit,
  Package,
} from "lucide-react";
import clsx from "clsx";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutGrid },
  { href: "/admin/orders", label: "Orders", icon: Receipt },
  { href: "/admin/users", label: "Customers", icon: Users },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/analytics", label: "Analytics", icon: LineChart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 border-r border-line bg-surface h-screen sticky top-0">
      <div className="h-16 flex items-center gap-2 px-5 border-b border-line">
        <Orbit className="w-5 h-5 text-pine-500" strokeWidth={2} />
        <span className="text-[15px] font-semibold tracking-tight text-ink">Chaudry Console</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-pine-50 text-pine-700 font-medium"
                  : "text-ink-soft hover:bg-paper hover:text-ink"
              )}
            >
              <Icon className="w-[17px] h-[17px]" strokeWidth={active ? 2.2 : 1.8} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-line">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-md">
          <div className="w-8 h-8 rounded-full bg-pine-500 text-white text-xs font-medium flex items-center justify-center">
            SK
          </div>
          <div className="min-w-0">
            <div className="text-sm text-ink font-medium truncate">Store admin</div>
            <div className="text-xs text-ink-faint truncate">Chaudry Computers</div>
          </div>
        </div>
      </div>
    </aside>
  );
}