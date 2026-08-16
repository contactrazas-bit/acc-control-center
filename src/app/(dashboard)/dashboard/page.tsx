import { ShieldCheck, Smartphone, UserRound } from "lucide-react";
import { AutoLockSettings } from "@/components/layout/auto-lock-settings";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <section>
        <p className="text-sm font-medium text-indigo-600 dark:text-violet-300">Milestone 1</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-normal">Secure foundation</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
          Authentication, MFA assurance, privacy mode, themes, RLS, and security headers are in scope.
        </p>
      </section>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <ShieldCheck aria-hidden className="mb-3 text-indigo-600" />
          <h3 className="font-semibold">Auth protected</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Server-side user verification guards this area.</p>
        </Card>
        <Card>
          <Smartphone aria-hidden className="mb-3 text-indigo-600" />
          <h3 className="font-semibold">MFA aware</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">AAL2 redirects are enforced when a verified factor exists.</p>
        </Card>
        <Card>
          <UserRound aria-hidden className="mb-3 text-indigo-600" />
          <h3 className="font-semibold">Owner isolated</h3>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">The profile table uses forced owner-only RLS policies.</p>
        </Card>
      </div>
      <Card>
        <h3 className="mb-4 font-semibold">Session presentation</h3>
        <AutoLockSettings />
        <p className="mt-3 text-sm text-slate-500">
          UI auto-lock is separate from Supabase server-session expiration.
        </p>
      </Card>
    </div>
  );
}
