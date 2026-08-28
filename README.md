# Abhishek Kachchhi — Portfolio

The portfolio shell is available at `/`, with the approved design-system reference retained at `/system`.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` for a production build and `npm run lint` for linting.

## Intro playback

The cinematic intro plays once on every fresh application load. Reload the browser to replay it; internal portfolio navigation does not restart it. The existing replay URL remains harmless for bookmarked development links:

```text
http://localhost:5173/?intro=1
```

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
