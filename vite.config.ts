import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      server: { entry: "server" },
    }),
    netlify({
      // Deno edge-functions local server crashes on this environment;
      // production Netlify builds are unaffected.
      dev: { edgeFunctions: { enabled: false } },
    }),
    viteReact(),
  ],
  optimizeDeps: {
    // Optimize the first-screen dependencies together with React, rather than
    // discovering them during HMR and mixing dependency generations.
    include: [
      "@radix-ui/react-slot",
      "class-variance-authority",
      "clsx",
      "lucide-react",
      "tailwind-merge",
    ],
  },
});
