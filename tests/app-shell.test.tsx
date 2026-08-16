import React from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "@/components/layout/app-shell";
import { Providers } from "@/components/layout/providers";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

describe("app shell", () => {
  it("renders desktop and mobile navigation landmarks", () => {
    const html = renderToString(
      <Providers>
        <AppShell>
          <p>Dashboard content</p>
        </AppShell>
      </Providers>,
    );

    expect(html).toContain("Primary navigation");
    expect(html).toContain("Mobile primary navigation");
    expect(html).toContain("Dashboard content");
    expect(html).toContain("lg:block");
    expect(html).toContain("lg:hidden");
  });
});
