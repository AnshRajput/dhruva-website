#!/usr/bin/env node
// Build-time step (wired as `prebuild`/`predev` in package.json): reads the
// canonical design-tokens.json from dhruva-app and emits src/styles/tokens.css.
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { generateTokensCss } from './tokens/generate-css.mjs';
import { loadTokensJson, TOKENS_OUTPUT_PATH, TOKENS_SOURCE_DESC } from './tokens/config.mjs';

let tokens;
try {
  tokens = await loadTokensJson();
} catch (err) {
  // If the pinned source is unreachable (offline build, e.g. a local dev
  // machine with no network), the committed tokens.css is the source of truth
  // — CI's drift check on the GitHub side guarantees it matches the pinned JSON.
  if (existsSync(TOKENS_OUTPUT_PATH)) {
    console.warn(`Tokens source unavailable (${TOKENS_SOURCE_DESC}): ${err.message}. Using committed tokens.css.`);
    process.exit(0);
  }
  console.error(`Could not load design tokens from ${TOKENS_SOURCE_DESC}: ${err.message}`);
  process.exit(1);
}

const css = generateTokensCss(tokens);
mkdirSync(dirname(TOKENS_OUTPUT_PATH), { recursive: true });
writeFileSync(TOKENS_OUTPUT_PATH, css);
console.log(`tokens.css written from ${TOKENS_SOURCE_DESC}`);
