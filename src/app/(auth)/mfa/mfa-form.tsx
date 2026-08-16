"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export function MfaForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function verify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    const supabase = createClient();
    const { data: factors, error: factorError } = await supabase.auth.mfa.listFactors();
    const factorId = factors?.totp?.find((factor) => factor.status === "verified")?.id;

    if (factorError || !factorId) {
      setPending(false);
      setError("A verified TOTP factor is required.");
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code,
    });

    setPending(false);

    if (verifyError) {
      setError(verifyError.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <Card>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-md bg-indigo-600 p-2 text-white">
          <ShieldCheck aria-hidden size={20} />
        </div>
        <div>
          <h1 className="text-xl font-semibold">MFA verification</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">Enter your authenticator code</p>
        </div>
      </div>
      <form className="grid gap-4" onSubmit={verify}>
        <label className="grid gap-2 text-sm">
          One-time code
          <input
            autoComplete="one-time-code"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 tracking-widest dark:border-slate-700 dark:bg-slate-950"
            inputMode="numeric"
            maxLength={8}
            minLength={6}
            onChange={(event) => setCode(event.target.value)}
            required
            type="text"
            value={code}
          />
        </label>
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        <Button disabled={pending} type="submit">
          {pending ? "Verifying" : "Verify"}
        </Button>
      </form>
    </Card>
  );
}
