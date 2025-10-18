// @ts-check
import cloudflare from "@astrojs/cloudflare";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import astroPwa from "@vite-pwa/astro";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/emoji-suffix-demo": "/demo/emoji-suffix",
    "/list-demo": "/demo/list",
    "/navigation-demo": "/demo/navigation",
    "/sectioned-list-demo": "/demo/sectioned-list",
  },

  integrations: [
    react(),
    astroPwa(),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],

  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Geist",
        cssVariable: "--font-geist",
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: cloudflare(),
});
