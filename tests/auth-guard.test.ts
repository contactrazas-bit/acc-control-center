import { describe, expect, it } from "vitest";
import { decideDashboardAccess } from "@/lib/auth/guards";

describe("dashboard auth guard", () => {
  it("redirects unauthenticated users to login", () => {
    expect(decideDashboardAccess({ hasUser: false, currentLevel: null, nextLevel: null })).toEqual({
      type: "redirect",
      destination: "/login",
    });
  });

  it("redirects users with unsatisfied AAL2 to MFA", () => {
    expect(decideDashboardAccess({ hasUser: true, currentLevel: "aal1", nextLevel: "aal2" })).toEqual({
      type: "redirect",
      destination: "/mfa",
    });
  });

  it("allows authenticated users when AAL2 is satisfied", () => {
    expect(decideDashboardAccess({ hasUser: true, currentLevel: "aal2", nextLevel: "aal2" })).toEqual({
      type: "allow",
    });
  });
});
