import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const albums = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/albums' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    releaseDate: z.coerce.date(),
    cover: z.string().optional(),
    bandcampUrl: z.string().url().optional(),
    bandcampEmbed: z.string().optional(),
    trackSlugs: z.array(z.string()).default([]),
    genres: z.array(z.string()).default([]),
    credits: z.array(z.string()).default([]),
  }),
});

const tracks = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tracks' }),
  schema: z.object({
    title: z.string(),
    album: z.string(),
    index: z.number().int().positive(),
    duration: z.string().optional(),
    bandcampTrackUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    script: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    excerpt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const shows = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/shows' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    city: z.string(),
    venue: z.string(),
    ticketUrl: z.string().url().optional(),
    status: z.enum(['upcoming', 'past', 'cancelled']).default('upcoming'),
    flyer: z.string().optional(),
  }),
});

export const collections = { albums, tracks, blog, shows };
