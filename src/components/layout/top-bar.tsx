import { LogoutControl } from "@/components/layout/logout-control";
import { PrivacyModeToggle } from "@/components/layout/privacy-mode-toggle";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95">
      <div>
        <p className="text-sm text-slate-500">Protected workspace</p>
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <PrivacyModeToggle />
        <ThemeToggle />
        <LogoutControl />
      </div>
    </header>
  );
}
