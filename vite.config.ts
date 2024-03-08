import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills({ overrides: { fs: "memfs" } })],
  server: {
    cors: {
      origin: ["localhost:5173", "*"],
      methods: ["DELETE", "GET", "HEAD", "PATCH", "POST", "PUT"],
      // allowedHeaders: ["Content-Type", "Authorization"],
      preflightContinue: true,
      optionsSuccessStatus: 204,
    },
  },
});
