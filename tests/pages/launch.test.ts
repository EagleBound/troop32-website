// Launch: search indexing, canonical URLs, headers, and legacy redirects.
// Checks the BUILT site in dist/. Run with `npm run test:pages`.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const SITE = 'https://troop32.org';
const PREVIEW_HOSTS = ['https://troop32.pages.dev/*', 'https://:version.troop32.pages.dev/*'];

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
}
const ALL_FILES = files(DIST);
const PAGES = ALL_FILES.filter((f) => f.endsWith('.html')).map((file) => {
  const rel = relative(DIST, file).split(sep).join('/');
  const route = rel === 'index.html' ? '/' : rel.endsWith('/index.html') ? `/${rel.slice(0, -'index.html'.length)}` : null;
  return { file, rel, route, html: readFileSync(file, 'utf8') };
});
const ROUTES = new Set(PAGES.flatMap((p) => (p.route ? [p.route] : [])));

/** `_headers` as { pattern: [header lines] }; comments and blank lines dropped. */
function parseHeaders(source: string): Map<string, string[]> {
  const blocks = new Map<string, string[]>();
  let current: string[] | undefined;
  for (const line of source.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    if (/^\s/.test(line)) {
      assert.ok(current, `header line outside a block: ${line}`);
      current.push(line.trim());
    } else {
      current = [];
      blocks.set(line.trim(), current);
    }
  }
  return blocks;
}
const HEADERS = parseHeaders(readFileSync('public/_headers', 'utf8'));

const REDIRECTS = readFileSync('public/_redirects', 'utf8')
  .split(/\r?\n/)
  .filter((line) => line.trim() && !line.trimStart().startsWith('#'))
  .map((line) => {
    const parts = line.trim().split(/\s+/);
    assert.equal(parts.length, 3, `redirect line must be "source destination status": ${line}`);
    return { source: parts[0], destination: parts[1], status: parts[2] };
  });

test('indexing: site.indexable is true and no page has a robots meta tag', () => {
  assert.match(readFileSync('src/data/site.ts', 'utf8'), /^\s*indexable:\s*true,/m);
  for (const { rel, html } of PAGES) assert.ok(!/<meta name="robots"/.test(html), `${rel} has a robots meta tag`);
});

test('indexing: robots.txt allows crawling', () => {
  const rules = readFileSync(join(DIST, 'robots.txt'), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim() && !line.startsWith('#'));
  assert.deepEqual(rules, ['User-agent: *', 'Allow: /']);
});

test('_headers: production has no X-Robots-Tag; the pages.dev hosts are noindex', () => {
  assert.equal(readFileSync(join(DIST, '_headers'), 'utf8'), readFileSync('public/_headers', 'utf8'));
  const all = HEADERS.get('/*');
  assert.ok(all, 'missing /* block');
  assert.ok(!all.some((h) => /^X-Robots-Tag:/i.test(h)), 'X-Robots-Tag must not apply to every host');
  for (const host of PREVIEW_HOSTS) {
    assert.deepEqual(HEADERS.get(host), ['X-Robots-Tag: noindex, nofollow'], `${host} must be noindex`);
  }
  const robotsBlocks = [...HEADERS].filter(([, lines]) => lines.some((h) => /^X-Robots-Tag:/i.test(h))).map(([p]) => p);
  assert.deepEqual(robotsBlocks.sort(), [...PREVIEW_HOSTS].sort(), 'X-Robots-Tag only on the pages.dev hosts');
});

test('_headers: security headers and HSTS (one year, no includeSubDomains, no preload)', () => {
  const all = HEADERS.get('/*') ?? [];
  const hsts = all.filter((h) => /^Strict-Transport-Security:/i.test(h));
  assert.deepEqual(hsts, ['Strict-Transport-Security: max-age=31536000']);
  for (const name of [
    'Content-Security-Policy',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'Referrer-Policy',
    'Permissions-Policy',
    'Cross-Origin-Opener-Policy',
  ]) {
    assert.ok(all.some((h) => h.startsWith(`${name}:`)), `missing ${name}`);
  }
  assert.ok(all.includes("Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests"));
  assert.deepEqual(HEADERS.get('/_astro/*'), ['Cache-Control: public, max-age=31536000, immutable']);
});

test('canonical: every page except 404 has one absolute troop32.org canonical and a matching og:url', () => {
  assert.ok(PAGES.length > 10, 'expected the full site in dist/');
  for (const { rel, route, html } of PAGES) {
    const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
    const ogUrls = [...html.matchAll(/<meta property="og:url" content="([^"]*)"/g)].map((m) => m[1]);
    if (rel === '404.html') {
      assert.deepEqual(canonicals, [], '404 has no canonical');
      assert.deepEqual(ogUrls, [], '404 has no og:url');
      continue;
    }
    assert.ok(route, `unexpected HTML file ${rel}`);
    assert.deepEqual(canonicals, [`${SITE}${route}`], `${rel} canonical`);
    assert.deepEqual(ogUrls, [`${SITE}${route}`], `${rel} og:url`);
  }
});

test('no page or asset mentions pages.dev', () => {
  // robots.txt and _headers name it only in comments or host rules.
  for (const file of ALL_FILES) {
    if (!/\.(html|css|js|json|xml)$/.test(file)) continue;
    assert.ok(!readFileSync(file, 'utf8').includes('pages.dev'), `${file} mentions pages.dev`);
  }
});

test('_redirects: copied to dist and well formed (301, local paths, no duplicates)', () => {
  assert.equal(readFileSync(join(DIST, '_redirects'), 'utf8'), readFileSync('public/_redirects', 'utf8'));
  assert.equal(REDIRECTS.length, 28, '14 approved legacy addresses, each with and without a trailing slash');
  const sources = REDIRECTS.map((r) => r.source);
  assert.equal(new Set(sources).size, sources.length, 'duplicate source');
  for (const { source, destination, status } of REDIRECTS) {
    assert.equal(status, '301', `${source}: status`);
    assert.match(source, /^\/[a-z0-9/-]+$/, `${source}: plain local path`);
    assert.match(destination, /^\/([a-z0-9-]+\/)*$/, `${source}: destination must be a local page path ending in /`);
  }
});

test('_redirects: never the old members area, never over a real page, every destination exists, no chains', () => {
  const sources = new Set(REDIRECTS.map((r) => r.source));
  for (const { source, destination } of REDIRECTS) {
    assert.ok(!source.startsWith('/log-in'), `${source}: /log-in/ must not be redirected`);
    assert.ok(!destination.startsWith('/log-in'), `${source}: destination under /log-in/`);
    assert.ok(!ROUTES.has(source) && !ROUTES.has(`${source}/`), `${source} would shadow a real page`);
    assert.ok(ROUTES.has(destination), `${source}: destination ${destination} is not a built page`);
    assert.ok(existsSync(join(DIST, destination, 'index.html')), `${destination}: missing index.html`);
    assert.ok(!sources.has(destination) && !sources.has(destination.replace(/\/$/, '')), `${source}: chain via ${destination}`);
  }
});

test('_redirects: each address works with and without its trailing slash, to the same page', () => {
  const bySource = new Map(REDIRECTS.map((r) => [r.source, r.destination]));
  for (const [source, destination] of bySource) {
    const twin = source.endsWith('/') ? source.slice(0, -1) : `${source}/`;
    assert.equal(bySource.get(twin), destination, `${source}: missing or different twin ${twin}`);
  }
});
