#!/usr/bin/env node
// Build-time step (wired as `prebuild`/`predev` in package.json): reads the
// canonical design-tokens.json from dhruva-app and emits src/styles/tokens.css.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { generateTokensCss } from './tokens/generate-css.mjs';
import { TOKENS_SOURCE_PATH, TOKENS_OUTPUT_PATH } from './tokens/config.mjs';

let tokens;
try {
  tokens = JSON.parse(readFileSync(TOKENS_SOURCE_PATH, 'utf8'));
} catch (err) {
  console.error(`Could not read design tokens at ${TOKENS_SOURCE_PATH}`);
  console.error('Is dhruva-app checked out as a sibling of this repo? See scripts/tokens/config.mjs.');
  console.error(err.message);
  process.exit(1);
}

const css = generateTokensCss(tokens);
mkdirSync(dirname(TOKENS_OUTPUT_PATH), { recursive: true });
writeFileSync(TOKENS_OUTPUT_PATH, css);
console.log(`tokens.css written from ${TOKENS_SOURCE_PATH}`);
