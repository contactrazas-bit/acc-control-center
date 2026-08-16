"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/(auth)/login/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, { error: "" });

  return (
    <Card>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-md bg-indigo-600 p-2 text-white">
          <LockKeyhole aria-hidden size={20} />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Owner login</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Private access only</p>
        </div>
      </div>
      <form action={formAction} className="grid gap-4">
        <label className="grid gap-2 text-sm">
          Email
          <input
            autoComplete="email"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            name="email"
            required
            type="email"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Password
          <input
            autoComplete="current-password"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 dark:border-slate-700 dark:bg-slate-950"
            name="password"
            required
            type="password"
          />
        </label>
        {state.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}
        <Button disabled={pending} type="submit">
          {pending ? "Signing in" : "Sign in"}
        </Button>
      </form>
    </Card>
  );
}
