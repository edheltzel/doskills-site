export const siteName = 'Do Skills';

export const siteDescription =
  'A curated set of skills for coding agents: a loop from idea to merged change, plus stack skills you add per project. Install the global set once with npx skills.';

export const installCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global -g';

/**
 * Social preview image. The landing page (Base.astro) and every docs page
 * (astro.config head) resolve `path` against the one `site` origin, so the two
 * always point at the same absolute URL. The file itself is not in this scaffold.
 */
export const ogImage = {
  path: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Do Skills. A curated set of skills for coding agents: a loop from idea to merged change, plus stack skills you add per project. Install the global set once with npx skills.',
};
