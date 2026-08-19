import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");

const checks = [
  ["package.json exists", () => existsSync(join(root, "package.json"))],
  ["Next app layout exists", () => existsSync(join(root, "src/app/layout.tsx"))],
  ["Supabase browser client exists", () => read("src/lib/supabase/client.ts").includes("createBrowserClient")],
  ["Supabase server client exists", () => read("src/lib/supabase/server.ts").includes("createServerClient")],
  ["middleware refreshes Supabase session", () => read("src/lib/supabase/middleware.ts").includes("auth.getUser")],
  ["login uses password auth", () => read("src/app/(auth)/login/actions.ts").includes("signInWithPassword")],
  ["no public signup route", () => !existsSync(join(root, "src/app/(auth)/signup")) && !read("src/app/(auth)/login/login-form.tsx").toLowerCase().includes("sign up")],
  ["MFA challenge-and-verify exists", () => read("src/app/(auth)/mfa/mfa-form.tsx").includes("challengeAndVerify")],
  ["dashboard guard redirects unauthenticated users", () => read("src/lib/auth/guards.ts").includes('destination: "/login"')],
  ["dashboard guard redirects unsatisfied AAL2", () => read("src/lib/auth/guards.ts").includes('destination: "/mfa"')],
  ["logout uses Supabase signOut", () => read("src/lib/auth/logout.ts").includes("signOut")],
  ["privacy masking utilities exist", () => read("src/lib/security/privacy.ts").includes("maskEmail")],
  ["theme provider supports dark and light", () => read("src/components/layout/theme-provider.tsx").includes('"light"') && read("src/components/layout/theme-provider.tsx").includes('"dark"')],
  ["responsive desktop and mobile navigation exist", () => read("src/components/layout/sidebar.tsx").includes("lg:block") && read("src/components/layout/mobile-nav.tsx").includes("lg:hidden")],
  ["security headers configured", () => read("next.config.ts").includes("Content-Security-Policy") && read("next.config.ts").includes("X-Frame-Options")],
  ["RLS migration enables and forces RLS", () => read("supabase/migrations/0001_secure_foundation.sql").includes("enable row level security") && read("supabase/migrations/0001_secure_foundation.sql").includes("force row level security")],
];

const failures = checks.filter(([, check]) => !check());

for (const [name, check] of checks) {
  console.log(`${check() ? "PASS" : "FAIL"} ${name}`);
}

if (failures.length > 0) {
  console.error(`\n${failures.length}/${checks.length} Milestone 1 static checks failed.`);
  process.exit(1);
}

console.log(`\n${checks.length}/${checks.length} Milestone 1 static checks passed.`);
