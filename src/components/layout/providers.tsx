"use client";

import { PrivacyProvider } from "@/components/layout/privacy-provider";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { AutoLockProvider } from "@/components/layout/auto-lock-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PrivacyProvider>
        <AutoLockProvider>{children}</AutoLockProvider>
      </PrivacyProvider>
    </ThemeProvider>
  );
}
