// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
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

