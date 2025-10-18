import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

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

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
});

export const collections = { products, categories, posts };
