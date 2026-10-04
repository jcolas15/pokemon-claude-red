import { defineConfig } from "vitest/config";

// The game tests boot the whole engine headlessly and play through battles, so they get generous timeouts.
export default defineConfig({
  test: {
    include: ["tests/**/*.test.js"],
    environment: "node",
    testTimeout: 300_000,
  },
});
