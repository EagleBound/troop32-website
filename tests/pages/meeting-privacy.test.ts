// P2: the regular troop meeting's day, time, place, address, and directions are
// NOT public. Checks the source data and BOTH builds (dist/ and the fictional
// dist-fixtures/). Run with `npm run test:pages`, which builds both first.
//
// These checks use GENERIC patterns (any weekday, clock time, street address,
// place of worship, or map link) on purpose: the removed details themselves
// must never be written into this public repository, not even in a test.
//
// Event detail pages are excluded from the page-wide checks: a public-community
// event that troop leadership designates may show its own date, time, and venue,
// and those pages are governed by the Events checks (src/lib/events/).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const BUILDS = ['dist', 'dist-fixtures'];

const WEEKDAY = /\b(?:Mon|Tues|Wednes|Thurs|Fri|Satur|Sun)days?\b/i;
const CLOCK = /\b\d{1,2}(?::\d{2})?\s?(?:AM|PM|a\.m\.|p\.m\.)/i;
const STREET =
  /\b\d{2,6}\s+(?:[A-Z][a-z]+\s+){1,3}(?:Road|Rd|Street|St|Avenue|Ave|Drive|Dr|Lane|Ln|Way|Boulevard|Blvd|Court|Ct|Place|Pl|Highway|Hwy)\b/;
const WORSHIP = /\b(?:church|chapel|parish|temple|synagogue|mosque)\b/i;
const MAPS = /google\.[a-z.]+\/maps|maps\.google|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.apple|bing\.com\/maps|openstreetmap/i;
const DIRECTIONS = /\b(?:get directions|directions to)\b/i;

const PATTERNS: [string, RegExp][] = [
  ['weekday', WEEKDAY],
  ['clock time', CLOCK],
  ['street address', STREET],
  ['place of worship', WORSHIP],
  ['map link', MAPS],
  ['directions', DIRECTIONS],
];

const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/\s+/g, ' ');

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith('.html') ? [path] : [];
  });
}

/** `events/<slug>/index.html`, but not the Events index or the Archive. */
function isEventDetail(build: string, file: string): boolean {
  const parts = relative(build, file).split(sep);
  return parts[0] === 'events' && parts.length === 3 && parts[1] !== 'archive';
}

function pages(build: string) {
  assert.ok(existsSync(build), `${build}/ is missing: run npm run test:pages`);
  return htmlFiles(build).map((file) => ({ file, html: readFileSync(file, 'utf8'), detail: isEventDetail(build, file) }));
}

/** Parts of every page that must never carry meeting logistics, on any page. */
function sharedRegions(html: string): string {
  const header = html.match(/<header class="site-header"[\s\S]*?<\/header>/)?.[0] ?? '';
  const footer = html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)?.[0] ?? '';
  const cards = html.match(/<section class="meeting-card"[\s\S]*?<\/section>/g) ?? [];
  return [header, footer, ...cards].join('\n');
}

function headMeta(html: string): string {
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '';
  const metas = [...html.matchAll(/<meta (?:name|property)="(?:description|og:description|og:title)" content="([^"]*)"/g)];
  return [title, ...metas.map((m) => m[1])].join('\n');
}

function assertClean(where: string, content: string, raw = content) {
  for (const [label, re] of PATTERNS) {
    const hit = (label === 'map link' ? raw : content).match(re);
    assert.equal(hit, null, `${where}: ${label} "${hit?.[0]}"`);
  }
}

test('source: no regular-meeting logistics in site data or page code', () => {
  const siteTs = readFileSync('src/data/site.ts', 'utf8');
  assert.ok(!/\bmeeting\s*:/.test(siteTs), 'site.meeting must not exist');
  assert.ok(!/meetingAddress|directionsUrl/.test(siteTs), 'meetingAddress / directionsUrl must not exist');

  const srcFiles = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const path = join(dir, name);
      return statSync(path).isDirectory() ? srcFiles(path) : /\.(astro|ts|mjs|js|md)$/.test(path) ? [path] : [];
    });
  for (const file of srcFiles('src')) {
    const code = readFileSync(file, 'utf8');
    assert.ok(!/site\.meeting\b|meetingAddress|directionsUrl/.test(code), `${file} still references meeting logistics`);
    assert.ok(!MAPS.test(code), `${file} contains a map link`);
  }
});

for (const build of BUILDS) {
  test(`${build}: header, footer, and meeting cards carry no meeting logistics (every page)`, () => {
    for (const { file, html } of pages(build)) {
      const regions = sharedRegions(html);
      assertClean(file, text(regions), regions);
    }
  });

  test(`${build}: titles and descriptions carry no meeting logistics (non-event pages)`, () => {
    for (const { file, html, detail } of pages(build)) {
      if (!detail) assertClean(`${file} <head>`, headMeta(html));
    }
  });
}

test('dist: no meeting logistics anywhere on non-event pages, and no map links on any page', () => {
  for (const { file, html, detail } of pages('dist')) {
    if (detail || relative('dist', file).startsWith(`events${sep}`)) {
      assert.equal(html.match(MAPS), null, `${file}: map link`);
      continue;
    }
    assertClean(file, text(html.replace(/<script[\s\S]*?<\/script>/g, '')), html);
  }
});

test('meeting card: approved P2 copy and a Scoutmaster contact link, on every page that shows it', () => {
  const routes = ['', 'about', 'contact', 'join', 'new-families', 'about/scoutmaster'];
  for (const route of routes) {
    const html = readFileSync(join('dist', route, 'index.html'), 'utf8');
    const card = html.match(/<section class="meeting-card"[\s\S]*?<\/section>/)?.[0];
    assert.ok(card, `/${route}: meeting card missing`);
    const body = text(card);
    assert.match(card, /<h[23] class="meeting-title"[^>]*>Our weekly meetings<\/h[23]>/, `/${route}: heading`);
    assert.ok(
      body.includes(
        'Troop 32 meets weekly throughout the year. Meetings give Scouts time to work on advancement, practice skills, plan upcoming adventures, build leadership, and have fun together.',
      ),
      `/${route}: body`,
    );
    assert.match(card, /class="meeting-subtitle"[^>]*>Interested in visiting\?</, `/${route}: subheading`);
    assert.ok(
      body.includes("Prospective families are always welcome. Get in touch with the Scoutmaster and we'll help you plan a visit."),
      `/${route}: invitation`,
    );
    assert.match(card, /<a class="meeting-contact"[^>]*href="mailto:scoutmaster@troop32\.org"[^>]*>Contact the Scoutmaster<\/a>/);
  }
});

test('footer: plan-a-visit pathway instead of meeting logistics', () => {
  const html = readFileSync(join('dist', 'index.html'), 'utf8');
  const footer = html.match(/<footer class="site-footer"[\s\S]*?<\/footer>/)?.[0] ?? '';
  assert.match(footer, /<h2 id="footer-visit" class="footer-heading"[^>]*>Visit Troop 32<\/h2>/);
  assert.match(footer, /<a href="mailto:scoutmaster@troop32\.org"[^>]*>Contact the Scoutmaster<\/a>/);
});
