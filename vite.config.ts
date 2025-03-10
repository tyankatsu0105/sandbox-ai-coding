import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["vitest-cleanup-after-each.ts"],
    environment: "jsdom",
  },
  resolve: {
    alias: [
      {
        find: "~",
        replacement: `${__dirname}/src`,
      },
    ],
  },
});
