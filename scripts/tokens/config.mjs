// Shared path config for the token pipeline (scripts/build-tokens.mjs,
// scripts/check-tokens-drift.mjs). One place so both scripts agree on
// where tokens come from and where the generated CSS lands.
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(__dirname, '..', '..');

// TODO(Loop 12 gate): once dhruva-app tags a release, switch this to fetching
// https://raw.githubusercontent.com/AnshRajput/dhruva-app/<pinned-tag>/design-tokens.json
// instead of reading a local checkout. Until then: locally this assumes
// dhruva-app is checked out as a sibling of this repo; CI overrides via the
// DHRUVA_TOKENS_SOURCE env var (see .github/workflows/deploy.yml) because
// actions/checkout can't check out a second repo outside $GITHUB_WORKSPACE.
export const TOKENS_SOURCE_PATH = process.env.DHRUVA_TOKENS_SOURCE
  ? path.resolve(process.env.DHRUVA_TOKENS_SOURCE)
  : path.resolve(REPO_ROOT, '..', 'dhruva-app', 'design-tokens.json');

export const TOKENS_OUTPUT_PATH = path.resolve(REPO_ROOT, 'src', 'styles', 'tokens.css');
