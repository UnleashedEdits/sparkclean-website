import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const serveSourceEntry = (): Plugin => ({
  name: "serve-source-entry",
  configureServer(server) {
    server.middlewares.use((request, _response, next) => {
      if (request.url === "/") request.url = "/app.html";
      next();
    });
  },
});

export default defineConfig({
  base: process.env.GITHUB_ACTIONS === "true" ? "/sparkclean-website/" : "/",
  plugins: [serveSourceEntry(), react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: "app.html",
    },
  },
});
