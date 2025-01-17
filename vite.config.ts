import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Updated config according to guide above in order to properly expose the application while running in a docker container
export default defineConfig({
  base: "/",
  plugins: [
    react(),
  ],
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8080",
  },
  resolve: {
    alias: {
      // https://www.geeksforgeeks.org/how-to-create-absolute-imports-in-vite-react-app/
      "@": resolve(__dirname, "src")
    }
  }
});