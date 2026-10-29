# Do Skills

Private docs and learning site for [Do-Skills](https://github.com/edheltzel/Do-Skills). It is not deployed.

A curated set of skills for coding agents: a loop from idea to merged change, plus stack skills you add per project. Install the global set once with npx skills.

## Run locally

Needs Node 22.

```bash
npm ci
npm run dev
```

`npm run build` writes the static site to `dist/`. `npm run preview` serves that build.

Set `SITE_URL` for a production build. The default is the planned address, `https://doskills.edheltzel.codes`.

## Checks

```bash
npx astro check
npm run build
npm run contrast
npm run flash
npm run install-box
```

`contrast` checks the theme tokens. `flash` and `install-box` open the built site in Chrome.
