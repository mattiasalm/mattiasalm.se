# mattiasalm.se

Personal site and CV for Mattias Alm. It's a static Astro site styled with Tailwind CSS, with a green CRT look by default and a plain "boring mode" for anyone who just wants to read the CV.

## Running it

```sh
yarn install
yarn dev       # local dev server at http://localhost:4321
yarn build     # static build into dist/
yarn preview   # serve dist/ to check the production build
```

## Where things live

All CV content is in `src/data/cv/index.ts`. Edit that file to change the CV; the `/cv` page and `/llms.txt` are both built from it, so they stay in sync.

```text
src/
  data/cv/           CV content and its types
  pages/             index (landing), cv, llms.txt
  components/Cv/     the CV page and its parts
  components/ModeToggle/   boring mode button and URL handling
  components/Info.astro    the landing page
  styles/global.css  palette, type scale, CRT effects, boring mode and print styles
public/              favicon and robots.txt
```

## Boring mode

Adding `?mode=boring` to any URL switches to plain black on white with no effects. The toggle button in the header does the same and keeps the param on internal links, so you can send someone `mattiasalm.se/cv?mode=boring` directly. Boring mode and print share their styles, so printing the CV gives the same clean layout.

## SEO and crawlers

The build generates a sitemap (`@astrojs/sitemap`, using `site` from `astro.config.mjs`). `public/robots.txt` allows all crawlers and points to the sitemap, and `/llms.txt` serves the CV as plain Markdown for AI tools.

## Deploying

Any static host works. Use `yarn build` as the build command and `dist` as the output folder.
