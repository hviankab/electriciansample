import { defineCollection, z } from 'astro:content'

const pages = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.string().optional(),
    ogImage: z.string().optional(),
    noindex: z.boolean().default(false),
    draft: z.boolean().default(false),
    sections: z.array(z.object({
      component: z.string(),
      props: z.record(z.any()),
    })),
  }),
})

export const collections = { pages }
