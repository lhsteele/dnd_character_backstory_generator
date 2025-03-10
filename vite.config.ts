import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
    testTransformMode: {
      web: ["tsx"],
    },
  },
  build: {
    sourcemap: true,
    target: "esnext",
    outDir: "dist",
  },
  optimizeDeps: {
    exclude: ["vitest"],
  },
});
