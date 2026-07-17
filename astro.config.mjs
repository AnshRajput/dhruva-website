// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy targets: GitHub Pages (default: project subpath) and Vercel
// (SITE_URL set, BASE_PATH empty → serve at domain root).
const site = process.env.SITE_URL ?? 'https://anshrajput.github.io';
const base = process.env.BASE_PATH ?? '/dhruva-website';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
});
