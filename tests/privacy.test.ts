import { describe, expect, it } from "vitest";
import { maskEmail, maskPhone, maskUsername } from "@/lib/security/privacy";

describe("privacy masking", () => {
  it("masks email names while preserving domain", () => {
    expect(maskEmail("owner@example.com")).toBe("o***@example.com");
  });

  it("masks phone numbers except the last four digits", () => {
    expect(maskPhone("+1 (555) 123-9876")).toBe("***-***-9876");
  });

  it("masks usernames", () => {
    expect(maskUsername("accountowner")).toBe("a***r");
  });
});
