"use client";

import { useAutoLock } from "@/components/layout/auto-lock-provider";

export function AutoLockSettings() {
  const { timeoutMinutes, setTimeoutMinutes } = useAutoLock();

  return (
    <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
      UI auto-lock
      <select
        aria-label="UI auto-lock timeout"
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
        value={timeoutMinutes}
        onChange={(event) => setTimeoutMinutes(Number(event.target.value))}
      >
        {[5, 10, 15, 30].map((minutes) => (
          <option key={minutes} value={minutes}>
            {minutes} minutes
          </option>
        ))}
      </select>
    </label>
  );
}
