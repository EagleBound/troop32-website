// @ts-check
import { defineConfig } from 'astro/config';

// Astro configuration for the Troop 32 public website.
// See docs/DEVELOPMENT.md for how to run and build the site.

// Fixture mode (scripts/fixtures.mjs) previews the Events pages with FICTIONAL
// test records. Its output and cache are kept apart so fixtures can never end
// up in dist/, which is what gets deployed.
const fixtureMode = process.env.TROOP32_EVENT_FIXTURES === '1';

export default defineConfig({
  outDir: fixtureMode ? './dist-fixtures' : './dist',
  cacheDir: fixtureMode ? './node_modules/.astro-fixtures' : './node_modules/.astro',

  // The production address (approved for launch 2026-10-08; see docs/PROJECT.md).
  // It makes the canonical and og:url links in BaseLayout.astro absolute.
  site: 'https://troop32.org',

  output: 'static',
  trailingSlash: 'always',

  build: {
    // Always ship CSS as separate files so the Content-Security-Policy in
    // public/_headers can forbid inline styles.
    inlineStylesheets: 'never',
  },

  vite: {
    build: {
      // Never inline assets as data: URLs; keep scripts and images as real files.
      assetsInlineLimit: 0,
    },
  },
});
