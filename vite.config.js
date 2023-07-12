import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  base: '/artis-frontend/',
  define: {
    "process.env": {
      ARTIS_SERVER_API: "http://localhost:8080" //"https://627c2eaf-31ea-4804-8510-ef26d9edb232.mock.pstmn.io"
    },
  },
});
