import Link from "next/link";
import { navigationItems } from "@/constants/navigation";

export function MobileNav() {
  const quickItems = navigationItems.slice(0, 4);

  return (
    <nav
      aria-label="Mobile primary navigation"
      className="fixed inset-x-0 bottom-0 z-10 grid grid-cols-4 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 lg:hidden"
    >
      {quickItems.map((item) => (
        <Link className="grid min-h-16 place-items-center gap-1 text-xs" href={item.href} key={item.href}>
          <item.icon aria-hidden size={18} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
