import { defineCollection, z } from "astro:content";

import { file } from "astro/loaders";

const products = defineCollection({
  loader: file("./src/content/products.json"),
  schema: z.object({
    emoji: z.string(),
    categoryId: z.string(),
    variants: z.object({
      en: z.array(z.string()),
      lt: z.array(z.string()),
    }),
  }),
});

const categories = defineCollection({
  loader: file("./src/content/categories.json"),
  schema: z.object({
    emoji: z.string(),
    title: z.object({
      en: z.string(),
      lt: z.string(),
    }),
  }),
});

const websites = defineCollection({
  loader: file("./src/content/websites.json"),
  schema: z.object({
    url: z.string(),
  }),
});

export const collections = { products, categories, websites };
