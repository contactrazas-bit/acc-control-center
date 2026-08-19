import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const migration = readFileSync(join(process.cwd(), "supabase/migrations/0001_secure_foundation.sql"), "utf8");

describe("profiles RLS migration", () => {
  it("enables and forces RLS", () => {
    expect(migration).toContain("alter table public.profiles enable row level security");
    expect(migration).toContain("alter table public.profiles force row level security");
  });

  it("limits reads and updates to the owner", () => {
    expect(migration).toContain('create policy "Owners can select own profile"');
    expect(migration).toContain('create policy "Owners can update own profile"');
    expect(migration.match(/\(select auth\.uid\(\)\) = id/g)?.length).toBeGreaterThanOrEqual(3);
  });

  it("does not store credentials or OTP secrets", () => {
    expect(migration).not.toMatch(/password|totp_secret|otp|recovery_code|cookie/i);
  });
});
