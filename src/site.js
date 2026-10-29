export const siteName = 'Do Skills';

export const siteDescription =
  'A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project. Install the global set once with npx skills.';

export const installCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global -g';

/** Per-project install. Replace <group> with a group name. */
export const projectCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/project/<group>';

/** Placeholder until the real docs and install guide exist. Keep the links visible. */
export const docsHref = '/docs/';

/**
 * Social preview image. The landing page (Base.astro) and every docs page
 * (astro.config head) resolve `path` against the one `site` origin, so the two
 * always point at the same absolute URL. The file itself is not in this scaffold.
 */
export const ogImage = {
  path: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Do Skills. A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project. Install the global set once with npx skills.',
};
