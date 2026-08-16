export type AalLevel = "aal1" | "aal2" | null;

export type DashboardGuardInput = {
  hasUser: boolean;
  currentLevel: AalLevel;
  nextLevel: AalLevel;
};

export type DashboardGuardDecision =
  | { type: "allow" }
  | { type: "redirect"; destination: "/login" | "/mfa" };

export function decideDashboardAccess(input: DashboardGuardInput): DashboardGuardDecision {
  if (!input.hasUser) {
    return { type: "redirect", destination: "/login" };
  }

  if (input.nextLevel === "aal2" && input.currentLevel !== "aal2") {
    return { type: "redirect", destination: "/mfa" };
  }

  return { type: "allow" };
}
