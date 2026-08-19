"use client";

import { createContext, useContext, useMemo, useState } from "react";

const PrivacyContext = createContext<{
  privacyMode: boolean;
  setPrivacyMode: (enabled: boolean) => void;
} | null>(null);

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
  const [privacyMode, setPrivacyMode] = useState(false);
  const value = useMemo(() => ({ privacyMode, setPrivacyMode }), [privacyMode]);

  return <PrivacyContext.Provider value={value}>{children}</PrivacyContext.Provider>;
}

export function usePrivacy() {
  const context = useContext(PrivacyContext);
  if (!context) {
    throw new Error("usePrivacy must be used within PrivacyProvider.");
  }

  return context;
}
