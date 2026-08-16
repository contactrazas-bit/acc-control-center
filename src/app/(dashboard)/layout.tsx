import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { type AalLevel, decideDashboardAccess } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function normalizeAal(level: string | null | undefined): AalLevel {
  return level === "aal1" || level === "aal2" ? level : null;
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const decision = decideDashboardAccess({
    hasUser: Boolean(user),
    currentLevel: normalizeAal(aal?.currentLevel),
    nextLevel: normalizeAal(aal?.nextLevel),
  });

  if (decision.type === "redirect") {
    redirect(decision.destination);
  }

  return <AppShell>{children}</AppShell>;
}
