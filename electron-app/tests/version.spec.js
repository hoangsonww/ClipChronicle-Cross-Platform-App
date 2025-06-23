import { describe, it, expect } from "vitest";
import { version as pkgVersion } from "../package.json";

describe("package.json", () => {
  it("has a valid version string", () => {
    // version should be a semver-like string
    expect(pkgVersion).toMatch(/^\d+\.\d+\.\d+(-.+)?$/);
  });
});
