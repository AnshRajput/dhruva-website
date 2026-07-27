// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deploy targets:
// - Vercel (VERCEL env always set there): serve at domain root.
// - GitHub Pages (default): project subpath /dhruva-website.
// SITE_URL/BASE_PATH still override explicitly when non-empty.
const onVercel = !!process.env.VERCEL;
const site =
  process.env.SITE_URL ||
  (onVercel ? 'https://dhruvaai.vercel.app' : 'https://anshrajput.github.io');
// Trailing slash REQUIRED: templated links do `${base}docs/`, so without it the
// GitHub Pages build emits `/dhruva-websitedocs/` (404 on every nav link + the
// favicon). Astro normalises asset URLs but not these template literals.
const base = process.env.BASE_PATH || (onVercel ? '/' : '/dhruva-website/');

// https://astro.build/config
export default defineConfig({
  site,
  base,
  integrations: [sitemap()],
});
