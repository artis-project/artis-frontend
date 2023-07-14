import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: '/artis-frontend/',
  define: {
    "process.env": {
      ARTIS_SERVER_API: "https://artis-api-44ccrafs3a-ew.a.run.app"
    },
  },
});
