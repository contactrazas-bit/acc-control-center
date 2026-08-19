"use client";

import { EyeOff } from "lucide-react";
import { usePrivacy } from "@/components/layout/privacy-provider";

export function PrivacyModeToggle() {
  const { privacyMode, setPrivacyMode } = usePrivacy();

  return (
    <label className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-slate-700">
      <EyeOff aria-hidden size={16} />
      <span>Privacy</span>
      <input
        aria-label="Privacy mode"
        checked={privacyMode}
        onChange={(event) => setPrivacyMode(event.target.checked)}
        type="checkbox"
      />
    </label>
  );
}
