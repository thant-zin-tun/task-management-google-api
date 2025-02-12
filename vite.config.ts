import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@services": "/src/services",
      "@routes": "/src/routes",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@types": "/src/types",
      "@constants": "/src/constants",
    },
  },
});
