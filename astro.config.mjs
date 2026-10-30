// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://melkocore.github.io',
  base: '/mlkr-site',
  integrations: [react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
    define: {
      global: 'globalThis',
    },
  },
  build: { format: 'directory' },
});