import { describe, it, expect } from "vitest";

// Test that the main entrypoint exists and exports a function
describe("Electron main entry", () => {
  it("loads the .webpack/main module", () => {
    const main = require("../.webpack/main");
    // Should export a function to create the app
    expect(
      typeof main === "function" || typeof main.default === "function",
    ).toBe(true);
  });
});
