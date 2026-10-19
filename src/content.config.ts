import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(220),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['Historia', 'Fundamentos', 'Ciencia aplicada', 'Seguridad', 'Comunicaciones', 'Formación']),
    audience: z.array(z.enum(['Aspirantes', 'Cadetes', 'Bomberos', 'Público general'])).min(1),
    readingMinutes: z.number().int().min(1),
    feature: z.boolean().default(false),
    draft: z.boolean().default(false),
    order: z.number().int().optional(),
    // Identificadores de src/components/simulators/<id>.astro
    simulators: z.array(z.string().regex(/^[a-z][a-z0-9-]*$/)).default([]),
    sources: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  }),
});

export const collections = { articulos };
