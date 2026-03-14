import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@\//,
        replacement: fileURLToPath(new URL("./src/", import.meta.url)),
      },
      {
        find: /^lib\//,
        replacement: fileURLToPath(new URL("./src/lib/", import.meta.url)),
      },
      {
        find: /^components\/ui\//,
        replacement: fileURLToPath(
          new URL("./src/components/ui/", import.meta.url),
        ),
      },
      {
        find: /^components\//,
        replacement: fileURLToPath(
          new URL("./src/components/", import.meta.url),
        ),
      },
    ],
  },
});
