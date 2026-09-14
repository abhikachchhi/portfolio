# WORD//SHIFT

A standalone five-letter deduction game built with React, TypeScript, Vite, and plain CSS.

## Commands

```bash
npm install
npm run dev
npm test
npm run lint
npm run build
```

## Architecture

- `src/game/wordShift.ts` contains pure game, evaluation, keyboard, candidate-filtering, and puzzle-selection logic.
- `src/data/words.ts` contains separate solution and allowed-guess collections.
- `src/data/puzzles.ts` contains the deterministic local archive.
- `src/components/` contains the board, keyboard, deduction map, archive, results, and game orchestration UI.

The game deliberately has no dependency on the surrounding portfolio application.
