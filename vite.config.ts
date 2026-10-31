import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

// Related: https://github.com/remix-run/remix/issues/2835#issuecomment-1144102176
// Replace the HOST env var with SHOPIFY_APP_URL so that it doesn't break the Vite server.
// The CLI will eventually stop passing in HOST,
// so we can remove this workaround after the next major release.
if (!process.env.SHOPIFY_APP_URL) {
  process.env.SHOPIFY_APP_URL = process.env.HOST;
}

export default defineConfig({
  server: {
    port: Number(process.env.PORT || 3000),
    allowedHosts: [".trycloudflare.com"],
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    reactRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
});
