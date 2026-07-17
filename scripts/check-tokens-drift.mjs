#!/usr/bin/env node
// CI drift-check: regenerates tokens.css in memory from design-tokens.json
// and fails if it doesn't match the committed src/styles/tokens.css. Catches
// hand-edits to the generated CSS and stale commits after a token change.
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { generateTokensCss } from './tokens/generate-css.mjs';
import { TOKENS_SOURCE_PATH, TOKENS_OUTPUT_PATH } from './tokens/config.mjs';

const hash = (s) => createHash('sha256').update(s).digest('hex');

let tokens;
try {
  tokens = JSON.parse(readFileSync(TOKENS_SOURCE_PATH, 'utf8'));
} catch (err) {
  console.error(`Could not read design tokens at ${TOKENS_SOURCE_PATH}`);
  console.error(err.message);
  process.exit(1);
}

const fresh = generateTokensCss(tokens);

if (!existsSync(TOKENS_OUTPUT_PATH)) {
  console.error(`${TOKENS_OUTPUT_PATH} is missing. Run \`npm run build:tokens\` and commit it.`);
  process.exit(1);
}

const committed = readFileSync(TOKENS_OUTPUT_PATH, 'utf8');

if (hash(fresh) !== hash(committed)) {
  console.error(
    'Token drift detected: src/styles/tokens.css does not match design-tokens.json.\n' +
      'Run `npm run build:tokens` and commit the result.',
  );
  process.exit(1);
}

console.log('tokens.css matches design-tokens.json — no drift.');
