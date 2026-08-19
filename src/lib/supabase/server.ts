import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { assertSupabaseBrowserEnv } from "@/lib/validation/env";

export async function createClient() {
  const cookieStore = await cookies();
  const env = assertSupabaseBrowserEnv();

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Server Components cannot always write cookies. Middleware refreshes sessions.
        }
      },
    },
  });
}
