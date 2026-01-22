import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact()],
  server: {
    allowedHosts: [ "v17xjx.tunnel.pyjam.as" ],
    proxy: {
      "/api": {
        target: "http://backend:8000",
      },
    },
  },
});
