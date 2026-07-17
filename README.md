# Dhruva AI — website

The official website for [Dhruva AI](https://github.com/AnshRajput/dhruva-app),
the open-source app that runs AI models 100% on your phone. Offline chat,
characters, vision, image generation, voice, and document chat — zero
telemetry, nobody else's business.

Built with [Astro](https://astro.build), deployed to GitHub Pages on every
push to `main`.

## Develop

```sh
npm install
npm run dev     # local dev server
npm run build   # production build to dist/
```

## Token pipeline

The visual theme derives entirely from
[`design-tokens.json`](https://github.com/AnshRajput/dhruva-app/blob/main/design-tokens.json)
in the app repository — the single source of truth for the brand. Don't add
colors here; change them there.

A build-time script reads that JSON and emits `src/styles/tokens.css` — one
CSS custom property per token (colors for both themes, spacing, radius,
typography, motion, elevation). Every page's CSS consumes only `var(--*)`
from that file; there are no hardcoded brand colors anywhere else in `src/`.

```sh
npm run build:tokens   # regenerate src/styles/tokens.css from design-tokens.json
npm run tokens:check   # fail if the committed tokens.css has drifted from the JSON
```

`build:tokens` runs automatically as a `predev`/`prebuild` step, so `npm run
dev` and `npm run build` always pick up the latest tokens. `tokens:check` is
wired into CI (`.github/workflows/deploy.yml`) as a separate step so a stale
or hand-edited `tokens.css` fails the build loudly instead of silently
drifting from the brand source of truth.

**Where the JSON comes from:** locally, the scripts assume `dhruva-app` is
checked out as a sibling of this repo (`../dhruva-app/design-tokens.json` —
true if you cloned both under the same parent directory, e.g. as in this
project's orchestra layout). In CI, `actions/checkout` can't place a second
repo outside `$GITHUB_WORKSPACE`, so the workflow checks `dhruva-app` out to
`dhruva-app-src/` instead and points the scripts at it via the
`DHRUVA_TOKENS_SOURCE` env var. **TODO (Loop 12 gate):** once `dhruva-app`
tags a release, switch `scripts/tokens/config.mjs` to fetch
`https://raw.githubusercontent.com/AnshRajput/dhruva-app/<pinned-tag>/design-tokens.json`
instead of reading a local checkout, and drop the second checkout step in CI.

## License

Apache-2.0 — see [LICENSE](LICENSE).
