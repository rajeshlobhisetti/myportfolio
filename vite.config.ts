import { defineConfig } from "vite";
import { copy } from 'vite-plugin-static-copy';
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/myportfolio/",
  plugins: [
    react(),
    tailwindcss(),
    viteTsconfigPaths(),
  ],
});
