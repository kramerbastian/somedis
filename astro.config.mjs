// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://kramerbastian.github.io',
  base: '/somedis',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte(), mdx()],
});
