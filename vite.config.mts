import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/elevator/",
  plugins: [react()],
  build: {
    outDir: "build",
  },
});
