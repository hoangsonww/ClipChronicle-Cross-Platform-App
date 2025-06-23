import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Run in a Node-like environment
    environment: "node",
    // Enable top-level globals like `describe` / `it`
    globals: true,
    // Match all `.spec.js` files under `tests/`
    include: ["tests/**/*.spec.js"],
    // Reporters, coverage, etc. can be added here
    coverage: {
      provider: "c8",
      reporter: ["text", "html"],
    },
  },
});
