# Abhishek Kachchhi — Portfolio

The portfolio is available at `/`, with the approved design-system reference retained at `/system`.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run lint` for linting.

## Intro playback

The cinematic intro plays on a fresh homepage load. Reload the homepage to replay it; loading another route directly or navigating internally does not start it.

Reduced-motion preferences bypass the cinematic sequence.

## Typography

Geist Variable is self-hosted through `@fontsource-variable/geist` and used for body and UI text.

Dune Rise is the active display font and is loaded locally from the user-supplied files in `public/fonts/dune-rise/`. Its SIL Open Font License is preserved alongside the font files. Practa remains available locally as an alternate display face.

## Structure

- `src/components/` — reusable foundation components
- `src/components/intro/` — startup sequence and reduced-motion helper
- `src/pages/` — portfolio pages and design-system showcase
- `src/styles/tokens.css` — centralized color, type, spacing, radius, motion, and glass tokens
- `src/styles/global.css` — responsive and accessible global defaults
- `public/fonts/practa/` — documented slot for licensed Practa webfonts
- `public/fonts/dune-rise/` — local Dune Rise files and SIL OFL license

## Public routes

- `/` — home
- `/work` — current experience
- `/projects` — selected projects
- `/projects/loop-tac` and `/projects/word-shift` — canonical project-detail URLs
- `/work/loop-tac` and `/work/word-shift` — compatible project-detail URLs
- `/playground` — both playable experiments
- `/playground/loop-tac` and `/playground/word-shift` — individual games
- `/about` — personal approach and contact
- `/system` — design-system reference

## Deployment

`npm run build` produces the deployable `dist/` directory. Because routing is handled client-side, the production host must rewrite unknown application paths to `index.html`; static files under `/fonts` and `/favicon.svg` should remain exempt from that fallback.
