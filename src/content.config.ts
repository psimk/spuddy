import { defineCollection, z } from "astro:content";

import { file } from "astro/loaders";

const productsWithEmojis = defineCollection({
  loader: file("./src/content/products-with-emojis.json"),
  schema: z.object({
    emoji: z.string(),
    variants: z.object({
      en: z.array(z.string()),
      lt: z.array(z.string()),
    }),
  }),
});

export const collections = { productsWithEmojis };
