# Learn Go, Interactively.

A minimal single-page app to learn Go via:
- **Topic catalog** (definitions + context)
- **Line-by-line code walkthrough**
- **Interactive assignments** with auto-checks
- **In-browser Go runner** (Go WASM in a Web Worker)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (go online)
This is a static Vite site (no backend needed).

- **Vercel**: import the repo, build command `npm run build`, output `dist`.
- **Netlify**: build `npm run build`, publish directory `dist`.
- **GitHub Pages**:
  - easiest path is a GitHub Action to publish `dist` (if you want this, tell me your repo name and desired URL and I’ll add it)
  - note: Vite often needs a `base` setting for Pages (`/repo-name/`)

## How progress works
- No accounts; progress is stored in `localStorage` under the key `gamecode.progress.v2`.
- Stored fields:
  - `lastTopicId`
  - `readTopicIds[]`
  - `completedTopicIds[]`

Implementation: `src/state/progress.ts`.

## Content: how to add/edit topics
Topics live in `src/content/topics.ts`.

Each topic can include:
- `code` + `lineNotes` (for the walkthrough)
- `assignment` (starter code + expected stdout)
- `docs[]` links and `externalUrl` references

## WASM runner (in-browser Go)
Go code executes **in a Web Worker** using:
- `public/wasm/wasm_exec.js` (from your local Go toolchain)
- `public/wasm/runner.wasm` (compiled from `wasm/runner/`)

Worker + client:
- `src/worker/goRunner.worker.ts`
- `src/lib/goRunnerClient.ts`

### Build `runner.wasm` (only if you change Go code)

```bash
npm run build:wasm
```

### Timeout behavior
To prevent infinite loops from freezing the page, the client enforces a hard timeout by **terminating the worker** (see `runGo()` in `src/lib/goRunnerClient.ts`).

## Production notes
- **WASM files must be served** from `/wasm/wasm_exec.js` and `/wasm/runner.wasm` (already in `public/wasm/`).
- **Caching**: it’s fine to cache `runner.wasm` aggressively; if you change it, the filename hash in `dist` will change on rebuild.
- **Security**: Go code runs in a worker, but treat it as untrusted input; keep timeouts and avoid exposing powerful browser APIs.

## Contributing
See `CONTRIBUTING.md` for local setup, content guidelines, and PR process.

## Contact
Email: `pcodes@learngo.online`
