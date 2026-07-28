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

**Where the JSON comes from:** the scripts fetch `design-tokens.json` from
`dhruva-app` over HTTPS, **pinned to a released tag** — see `TOKENS_REF` in
[`scripts/tokens/config.mjs`](scripts/tokens/config.mjs). The same source is
read locally and in CI, so the theme is deterministic and CI no longer needs a
second `dhruva-app` checkout. To adopt new brand tokens: bump `TOKENS_REF` to
the new tag, run `npm run build:tokens`, and commit the regenerated
`tokens.css`.

Offline or previewing an unreleased token change? Set
`DHRUVA_TOKENS_SOURCE=/path/to/design-tokens.json` to read a local file (e.g. a
sibling `../dhruva-app` checkout) instead of the pinned URL. If the pinned
source is simply unreachable at build time, `build:tokens` falls back to the
committed `tokens.css`, which CI's drift check keeps honest.

## License

Apache-2.0 — see [LICENSE](LICENSE).
