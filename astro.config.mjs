import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** Public origin. Override with SITE_URL. The site is served at /, so there is no base. */
const site = process.env.SITE_URL || 'https://doskills.edheltzel.codes';

export default defineConfig({
  site,
  output: 'static',
  integrations: [
    sitemap(),
  ],
});
