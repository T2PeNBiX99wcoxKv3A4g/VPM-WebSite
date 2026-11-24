# VPM-WebSite

The frontend of the VPM package listing that is published to GitHub Pages for
[VPM](https://github.com/T2PeNBiX99wcoxKv3A4g/VPM) and every `VPM.*` package repository.

Previously each repository carried its own copy of the site under `Website/`. There is one
copy now: this repository. The listing workflow checks it out, builds it and hands the
result to [`vrchat-community/package-list-action`](https://github.com/vrchat-community/package-list-action).

## How the data gets in

The listing action resolves the GitHub releases of a repository and renders
`Website/index.html` and `Website/app.js` as Scriban templates. `templates/app.js` is that
template: it publishes the listing and packages as two globals, and the React bundle reads
them at runtime.

```text
templates/app.js  --(build copy)-->  dist/app.js
dist/  --(published as Website/)-->  package-list-action
                                     |
                                     +--> renders index.html (no placeholders)
                                     +--> renders app.js  -> window.VPM_LISTING / window.PACKAGES
                                     +--> writes index.json
                                     |
                                     v
                                  GitHub Pages
```

`templates/app.js` therefore has to stay a valid Scriban template: the `PACKAGES` block is
the contract with the action and must keep its structure. `npm run check:template` renders
it with sample data and fails if the result is not valid JavaScript.

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Vite entry point (the action's `index.html` after publishing) |
| `templates/app.js` | Scriban template that carries the listing data |
| `src/main.tsx` | Bootstraps React and loads the listing data |
| `src/App.tsx` | Page composition and shared state (theme, toast, dialogs) |
| `src/components/` | One component per section, dialog and card |
| `src/hooks/` | Theme persistence and clipboard handling |
| `src/styles.css` | The existing stylesheet, unchanged |
| `public/` | `banner.png` and `favicon.ico`, copied as-is |

## Commands

```bash
npm install
npm run dev            # UI preview with sample data (no rendered app.js)
npm run build          # tsc + vite build + copies the template to dist/app.js
npm run check:template # renders templates/app.js and syntax-checks the result
```

`npm run dev` uses `src/dev-data.ts` because `app.js` only exists after the listing action
runs.
