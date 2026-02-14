// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import svelte from '@astrojs/svelte';

import mdx from '@astrojs/mdx';

import node from '@astrojs/node';
import vercelAdapter from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'middleware' }),
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [svelte(), mdx()],
});
