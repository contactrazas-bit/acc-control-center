import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();

describe("foundation security", () => {
  it("configures defensive response headers", () => {
    const config = readFileSync(join(root, "next.config.ts"), "utf8");

    expect(config).toContain("Content-Security-Policy");
    expect(config).toContain("frame-ancestors 'none'");
    expect(config).toContain("X-Frame-Options");
    expect(config).toContain("Strict-Transport-Security");
  });

  it("keeps service role key out of client source", () => {
    const client = readFileSync(join(root, "src/lib/supabase/client.ts"), "utf8");

    expect(client).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
  });
});
