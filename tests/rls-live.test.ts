import { PGlite } from "@electric-sql/pglite";
import { describe, expect, it } from "vitest";

describe("cross-user RLS isolation", () => {
  it("blocks reads and updates across profile owners", async () => {
    const db = new PGlite();

    await db.exec(`
      create schema auth;
      create schema if not exists public;
      create role authenticated;
      create table auth.users (id uuid primary key, email text);
      create function auth.uid() returns uuid
      language sql stable
      as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    `);

    await db.exec(`
      create table public.profiles (
        id uuid primary key references auth.users(id) on delete cascade,
        email text,
        full_name text,
        created_at timestamptz not null default now(),
        updated_at timestamptz not null default now()
      );
      alter table public.profiles enable row level security;
      alter table public.profiles force row level security;
      grant select, update on public.profiles to authenticated;
      create policy "Owners can select own profile"
      on public.profiles for select to authenticated
      using ((select auth.uid()) = id);
      create policy "Owners can update own profile"
      on public.profiles for update to authenticated
      using ((select auth.uid()) = id)
      with check ((select auth.uid()) = id);
      insert into auth.users values
        ('00000000-0000-0000-0000-000000000001', 'a@example.com'),
        ('00000000-0000-0000-0000-000000000002', 'b@example.com');
      insert into public.profiles (id, email, full_name) values
        ('00000000-0000-0000-0000-000000000001', 'a@example.com', 'Owner A'),
        ('00000000-0000-0000-0000-000000000002', 'b@example.com', 'Owner B');
    `);

    await db.exec(`
      set role authenticated;
      set request.jwt.claim.sub = '00000000-0000-0000-0000-000000000001';
    `);

    const ownRows = await db.query("select email from public.profiles order by email");
    expect(ownRows.rows).toEqual([{ email: "a@example.com" }]);

    const updateOther = await db.query(
      "update public.profiles set full_name = 'Changed' where id = '00000000-0000-0000-0000-000000000002' returning id",
    );
    expect(updateOther.rows).toEqual([]);
  });
});
