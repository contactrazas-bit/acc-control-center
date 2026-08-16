"use client";

import { createBrowserClient } from "@supabase/ssr";
import { assertSupabaseBrowserEnv } from "@/lib/validation/env";

export function createClient() {
  const env = assertSupabaseBrowserEnv();
  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}
