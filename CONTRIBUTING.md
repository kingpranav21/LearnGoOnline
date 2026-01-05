# Contributing

Thanks for contributing! This project is a Go learning app with in-browser Go WASM runner.

## Quick start

```bash
npm install
npm run dev
```

## What to work on
- **Topics**: improve `src/content/topics.ts` (definitions, context, line notes, assignments).
- **UI/UX**: small improvements to clarity, accessibility, and polish.
- **WASM runner**: only if you’re comfortable with Go + WASM.

## Adding or editing a topic
Topics live in `src/content/topics.ts`.

Guidelines:
- Keep examples short (fast to run).
- Prefer deterministic stdout for assignments (avoid time/random).
- Add `lineNotes` for only the lines that need explanation; blank lines are fine.

## Running checks

```bash
npm run lint
npm run build
```

## Updating the WASM runner (optional)
Only needed if you modify Go code under `wasm/runner/`.

Requirements: a local Go toolchain.

```bash
npm run build:wasm
```

## Pull requests
- Keep PRs small and focused.
- Include a short before/after description and screenshots for UI changes.

