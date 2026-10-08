// P2: header identity (larger emblem, "Scouting America" line) and the About
// page's council affiliation. Run with `npm run test:pages`.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith('.html') ? [path] : [];
  });
}
const header = (html: string) => html.match(/<header class="site-header"[\s\S]*?<\/header>/)?.[0] ?? '';
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/\s+/g, ' ');

test('header: 66 px emblem with 2x and 3x versions, decorative', () => {
  const h = header(readFileSync(join(DIST, 'index.html'), 'utf8'));
  const img = h.match(/<img [^>]*class="identity-emblem"[^>]*>/)?.[0] ?? h.match(/<img [^>]*>/)?.[0];
  assert.ok(img, 'emblem image missing');
  assert.match(img, /\bwidth="66"/);
  assert.match(img, /\bheight="66"/);
  assert.match(img, /\salt(?:="")?[\s>]/, 'empty alt (decorative)');
  assert.match(img, /srcset="[^"]*\b2x\b[^"]*\b3x\b/);
});

test('header: name, place, and plain-text Scouting America line', () => {
  const h = header(readFileSync(join(DIST, 'index.html'), 'utf8'));
  assert.match(h, /<span class="identity-name"[^>]*>Troop 32<\/span>/);
  assert.match(h, /<span class="identity-place"[^>]*>Santa Rosa, California<\/span>/);
  assert.match(h, /<span class="identity-org"[^>]*>Scouting America<\/span>/);
});

test('header: identical on every page apart from the current-page marker', () => {
  const normalize = (h: string) => h.replace(/ aria-current="page"/g, '');
  const files = htmlFiles(DIST);
  const first = normalize(header(readFileSync(files[0], 'utf8')));
  assert.ok(first.length > 0);
  for (const file of files) assert.equal(normalize(header(readFileSync(file, 'utf8'))), first, `${file}: header differs`);
});

test('header CSS: Scouting America line hidden below 48rem; emblem 52 px on mobile, 44 px on very narrow phones', () => {
  const cssDir = join(DIST, '_astro');
  const css = readdirSync(cssDir)
    .filter((f) => f.endsWith('.css'))
    .map((f) => readFileSync(join(cssDir, f), 'utf8'))
    .join('\n');
  // The CSS minifier may rewrite `(max-width: X)` as `(width<=X)`.
  const maxWidth = (rem: string) => `@media\\s*\\((?:max-width:\\s*|width\\s*<=\\s*)${rem.replace('.', '\\.')}rem\\)\\s*\\{`;
  const mobile = css.match(new RegExp(`${maxWidth('47.99')}[^@]*`, 'g')) ?? [];
  assert.ok(mobile.some((block) => /\.identity-org[^{]*\{[^}]*display:\s*none/.test(block)), 'third line hidden on mobile');
  assert.ok(mobile.some((block) => /identity-emblem[^{]*\{[^}]*width:\s*52px/.test(block)), 'mobile emblem 52 px');
  assert.match(css, new RegExp(`${maxWidth('22.49')}[^@]*identity-emblem[^{]*\\{[^}]*width:\\s*44px`), 'narrow emblem 44 px');
  assert.match(css, /identity-emblem[^{]*\{[^}]*width:\s*66px/, 'desktop emblem 66 px');
});

test('About: approved council and service-area affiliation, before the two-troop explanation', () => {
  const about = readFileSync(join(DIST, 'about', 'index.html'), 'utf8');
  const body = text(about.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '');
  const affiliation =
    'Troop 32 is a Scouting America troop served by the Redwood Empire Service Area of the Golden Gate Area Council (GGAC).';
  assert.ok(body.includes(affiliation), 'affiliation sentence');
  assert.ok(body.indexOf(affiliation) < body.indexOf('Organizationally, Troop 32 is two Scouting America troops'));
  assert.ok(!/href="https?:\/\/[^"]*ggac/i.test(about), 'no external council link in P2');
});
