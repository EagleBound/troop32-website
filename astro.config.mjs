// @ts-check
import { defineConfig } from 'astro/config';

// Astro configuration for the Troop 32 public website.
// See docs/DEVELOPMENT.md for how to run and build the site.
export default defineConfig({
  // The final public address is not decided yet (see docs/PROJECT.md).
  // Set `site` when the launch URL is approved so canonical and social links can be absolute.
  // site: 'https://example.org',

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
