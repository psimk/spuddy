// @ts-check
import astroPwa from "@vite-pwa/astro";
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
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
});
