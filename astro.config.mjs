// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://melkocore.github.io',
  base: '/mlkr-site',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx()],
  build: { format: 'directory' },
});