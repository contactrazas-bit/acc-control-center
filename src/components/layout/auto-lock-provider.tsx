"use client";

import { createContext, useContext, useMemo, useState } from "react";

const AutoLockContext = createContext<{
  timeoutMinutes: number;
  setTimeoutMinutes: (minutes: number) => void;
} | null>(null);

export function AutoLockProvider({ children }: { children: React.ReactNode }) {
  const [timeoutMinutes, setTimeoutMinutes] = useState(10);
  const value = useMemo(() => ({ timeoutMinutes, setTimeoutMinutes }), [timeoutMinutes]);

  return <AutoLockContext.Provider value={value}>{children}</AutoLockContext.Provider>;
}

export function useAutoLock() {
  const context = useContext(AutoLockContext);
  if (!context) {
    throw new Error("useAutoLock must be used within AutoLockProvider.");
  }

  return context;
}
