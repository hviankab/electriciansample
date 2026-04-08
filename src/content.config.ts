import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
})

export const collections = { pages }
