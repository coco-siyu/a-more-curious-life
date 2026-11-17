import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../work/assets",
    emptyOutDir: true,
    lib: {
      entry: "src/main.tsx",
      name: "WorkGallery",
      formats: ["iife"],
      fileName: () => "work-gallery.js",
      cssFileName: "work-gallery",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
