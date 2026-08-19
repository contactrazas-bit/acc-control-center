import Link from "next/link";
import { navigationItems } from "@/constants/navigation";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white px-4 py-6 dark:border-slate-800 dark:bg-slate-950 lg:block">
      <div className="mb-8 px-2">
        <p className="text-lg font-semibold">ACC</p>
        <p className="text-sm text-slate-500">Control Center</p>
      </div>
      <nav aria-label="Primary navigation" className="grid gap-1">
        {navigationItems.map((item) => (
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            href={item.href}
            key={item.href}
          >
            <item.icon aria-hidden size={17} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
