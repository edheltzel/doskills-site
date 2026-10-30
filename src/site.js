export const siteName = 'Do Skills';

export const siteDescription =
  'A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project. Install the global set once with npx skills.';

export const installCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/global -g';

/** Per-project install. Replace <group> with a group name. */
export const projectCommand =
  'npx skills add https://github.com/edheltzel/Do-Skills/tree/master/skills/project/<group>';

/**
 * Skill counts shown in the hero ledger and the scope cards. One source so the
 * two never drift; update here when Do-Skills adds or removes a skill.
 */
export const counts = { skills: 67, global: 38, project: 29, groups: 13 };

/** Docs live in the product repo (C2); the site links out. */
export const docsHref = 'https://github.com/edheltzel/Do-Skills/blob/master/docs/README.md';
export const installHref = 'https://github.com/edheltzel/Do-Skills/blob/master/README.md#installation';

/**
 * Social preview image. The landing page (Base.astro) resolves `path` against
 * the `site` origin. The file is public/og.png (1200x630).
 */
export const ogImage = {
  path: '/og.png',
  width: 1200,
  height: 630,
  alt: 'Do Skills. A curated set of skills for coding agents: a loop from idea to pull request, plus stack skills you add per project. Install the global set once with npx skills.',
};
