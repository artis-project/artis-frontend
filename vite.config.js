import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    "process.env": {
      ARTIS_SERVER_API: "https://627c2eaf-31ea-4804-8510-ef26d9edb232.mock.pstmn.io"
    },
  },
});
