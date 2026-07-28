// Shared config for the token pipeline (scripts/build-tokens.mjs,
// scripts/check-tokens-drift.mjs). One place so both scripts agree on where
// tokens come from and where the generated CSS lands.
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(__dirname, '..', '..');

export const TOKENS_OUTPUT_PATH = path.resolve(REPO_ROOT, 'src', 'styles', 'tokens.css');

// Canonical brand tokens live in dhruva-app, PINNED to a released tag so the
// site theme is deterministic and every build (local + CI) reads the exact
// same source. Bumping the brand = bump this ref, run `npm run build:tokens`,
// commit tokens.css. (This closed the old "Loop 12 gate" TODO: no more second
// repo checkout in CI — the JSON is fetched over HTTPS from the pinned tag.)
export const TOKENS_REF = 'v0.4.2';
export const TOKENS_SOURCE_URL = `https://raw.githubusercontent.com/AnshRajput/dhruva-app/${TOKENS_REF}/design-tokens.json`;

// Human-readable label of where tokens were loaded from (for log lines).
export const TOKENS_SOURCE_DESC = process.env.DHRUVA_TOKENS_SOURCE
  ? `local override ${process.env.DHRUVA_TOKENS_SOURCE}`
  : `${TOKENS_SOURCE_URL} (pinned ${TOKENS_REF})`;

// Load the design-tokens JSON. Default: fetch the pinned release from GitHub.
// Escape hatch: set DHRUVA_TOKENS_SOURCE=<path> to read a local file instead —
// for offline dev, or to preview an unreleased token change against a sibling
// dhruva-app checkout before it's tagged.
export async function loadTokensJson() {
  if (process.env.DHRUVA_TOKENS_SOURCE) {
    return JSON.parse(readFileSync(path.resolve(process.env.DHRUVA_TOKENS_SOURCE), 'utf8'));
  }
  const res = await fetch(TOKENS_SOURCE_URL);
  if (!res.ok) throw new Error(`fetch ${TOKENS_SOURCE_URL} -> HTTP ${res.status}`);
  return JSON.parse(await res.text());
}
