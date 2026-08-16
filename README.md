# ACC Control Center

Milestone 1 implements the secure application foundation only: Supabase Auth wiring, MFA assurance gating, a protected dashboard shell, owner-only profile RLS, privacy masking, theme controls, security headers, and validation tests.

Milestone 2 account inventory, integrations, recovery workflows, import/export, and backup features are intentionally not implemented.

## Setup

1. Run `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Fill in the Supabase project URL and anon key.
4. Apply `supabase/migrations/0001_secure_foundation.sql` to the Supabase project.
5. Create the private owner account through a trusted Supabase administrative flow. Public signup is intentionally not exposed.

## Required Validation

```bash
npm run audit:milestone1
npm run lint
npm run typecheck
npm run test
npm run build
```

## Required Environment

- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `APP_ENCRYPTION_KEY`
- `APP_ENCRYPTION_KEY_VERSION`
- `ACC_SCHEMA_VERSION`
- `ACC_APP_VERSION`
