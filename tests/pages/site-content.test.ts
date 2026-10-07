// Checks the BUILT recruiting pages (L1). Run with `npm run test:pages`,
// which builds dist/ first.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const PUBLIC_EMAIL = 'scoutmaster@troop32.org';

function page(route: string): string {
  const file = join(DIST, route, 'index.html');
  assert.ok(existsSync(file), `missing page ${route}`);
  return readFileSync(file, 'utf8');
}
const main = (html: string) => html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/&#39;/g, "'").replace(/\s+/g, ' ');

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith('.html') ? [path] : [];
  });
}
const ALL = htmlFiles(DIST).map((file) => ({ file, html: readFileSync(file, 'utf8') }));

test('the only email address anywhere on the site is the role-based Scoutmaster address', () => {
  const found = new Set<string>();
  for (const { html } of ALL) {
    for (const m of html.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) found.add(m[0].toLowerCase());
  }
  assert.deepEqual([...found], [PUBLIC_EMAIL]);
});

test('no phone numbers on the site', () => {
  for (const { file, html } of ALL) {
    assert.ok(!/(?:\+?1[\s.-]?)?(?:\(\d{3}\)\s?|\b\d{3}[\s.-])\d{3}[\s.-]\d{4}\b/.test(text(html)), `${file} has a phone number`);
  }
});

test('Contact: two pathways, and a mailto link under "Email the Scoutmaster"', () => {
  const contact = main(page('contact'));
  assert.match(contact, /<h2 id="email-title"[^>]*>Email the Scoutmaster<\/h2>/);
  assert.match(contact, new RegExp(`href="mailto:${PUBLIC_EMAIL}"`));
  assert.ok(text(page('contact')).includes('no need to call ahead'));
});

test('the Scoutmaster appears only as "Mr. Vickers", never by full name', () => {
  for (const { file, html } of ALL) {
    // Every "Vickers" must be preceded by "Mr." (no first name or full name).
    for (const m of text(html).matchAll(/(\S+)\s+Vickers/g)) assert.equal(m[1], 'Mr.', `${file}: "${m[0]}"`);
  }
  const about = page('about');
  assert.match(about, /<a href="\/about\/scoutmaster\/"[^>]*>Mr\. Vickers<\/a>/);
  assert.ok(text(about).includes('Our Scoutmaster is Mr. Vickers'), 'space before the name');
});

test('Scoutmaster page: minimal, intentional, contact and meeting pathway', () => {
  const html = page('about/scoutmaster');
  assert.equal(html.match(/<h1[\s>]/g)?.length, 1);
  assert.match(html, /<h1[^>]*>Mr\. Vickers, Scoutmaster<\/h1>/);
  const body = text(main(html));
  assert.ok(body.includes('Mr. Vickers serves as the Scoutmaster of Troop 32.'));
  assert.ok(body.includes("We'll share more about Mr. Vickers here in the future."), 'empty-bio line while bio is empty');
  assert.ok(body.includes('visit a Monday meeting'));
  assert.match(html, new RegExp(`href="mailto:${PUBLIC_EMAIL}"`));
  assert.ok(!/<img /.test(main(html)), 'no photo');
  assert.match(html, /<a href="\/about\/" class="nav-link"[^>]*aria-current="page"/, 'About is current in the navigation');
});

test('no editorial notes or HTML comments reach visitors', () => {
  for (const { file, html } of ALL) {
    assert.ok(!/\bTODO\b|For the Webmaster|docs\/DEVELOPMENT/.test(html), `${file} contains editorial notes`);
  }
  // No page ships HTML comments (use {/* */} in .astro pages instead).
  for (const { file, html } of ALL) assert.ok(!/<!--/.test(html), `${file} contains an HTML comment`);
});

test('no words run into a following link or bold text (Astro drops line-break spaces)', () => {
  for (const { file, html } of ALL) {
    const glued = html.match(/[A-Za-z0-9,.;:)]<(?:a|strong|em|time|span) [^>]*>[^<]{0,25}/);
    assert.equal(glued, null, `${file}: missing space before "${glued?.[0]}"`);
  }
});

test('Privacy notice matches what the site actually publishes (P1)', () => {
  const html = page('privacy');
  const body = text(main(html));
  // Statements that stopped being true once Events existed.
  assert.ok(!body.includes('The only schedule information on this website'), 'stale "only schedule" claim');
  assert.ok(!/does not publish[^.]*upcoming outings/.test(body), 'stale blanket "upcoming outings" claim');
  for (const shown of [
    'We share selected troop events by month and year',
    'Exact dates, times, and locations appear only for events troop leadership has opened to the public',
    'We never publish meeting points, travel or transportation details, who is attending, or similar logistics.',
    'location data is removed from them',
    'we use only their first name and last initial',
    'adult leaders are named as Mr. or Mrs. Last Name',
    "If you'd like a photo, name, or story about your family changed or removed, email scoutmaster@troop32.org or speak with a troop leader.",
    'Last reviewed: October 2026',
  ]) {
    assert.ok(body.includes(shown), `missing "${shown}"`);
  }
  assert.equal(html.match(new RegExp(`href="mailto:${PUBLIC_EMAIL}"`, 'g'))?.length, 2, 'removals + questions');
});

test('Accessibility: email reporting pathway and review date (P1)', () => {
  const html = page('accessibility');
  assert.match(html, new RegExp(`href="mailto:${PUBLIC_EMAIL}"`));
  assert.ok(text(main(html)).includes('Last reviewed: October 2026'));
});

test('New Families: official eligibility, visiting, gear, Youth Protection; costs unchanged', () => {
  const nf = page('new-families');
  const body = text(main(nf));
  assert.ok(body.includes("Under Scouting America's rules, youth can join Scouts BSA if they are age 11 but not yet 18"));
  assert.ok(body.includes('at least 10 years old and have earned the Arrow of Light award'));
  assert.ok(body.includes('at least 10 years old, in fifth grade, and registering on or after March 1'));
  assert.ok(!/10½|10 1\/2|through 18/.test(body), 'superseded eligibility wording');
  assert.match(nf, /href="https:\/\/www\.scouting\.org\/programs\/scouts-bsa\/faqs\/"/);
  assert.ok(body.includes("You don't need to contact us first: just come to a Monday meeting."));
  assert.ok(body.includes("check the troop's supply of lightly worn uniform items"));
  assert.ok(body.includes('including tents and cooking utensils'));
  assert.ok(!body.includes('Troop leaders can tell you what a new Scout needs first'));
  assert.ok(body.includes('Troop leaders can explain current costs and what they cover.'), 'cost answer unchanged');
  assert.ok(!/\$\s?\d/.test(body), 'no dollar figures');
  assert.ok(body.includes("Troop 32 follows Scouting America's Youth Protection requirements and policies."));
  assert.match(nf, /<a href="https:\/\/www\.scouting\.org\/training\/safeguarding-youth\/"[^>]*>Read Scouting America's Youth Protection information<\/a>/);
});

test('Join: no need to call ahead; official Scouts BSA link', () => {
  const joinPage = page('join');
  assert.ok(text(main(joinPage)).includes("you don't need to call ahead"));
  assert.match(joinPage, /<a href="https:\/\/www\.scouting\.org\/programs\/scouts-bsa\/"[^>]*>Learn about the Scouts BSA program from Scouting America<\/a>/);
});

test('external links on the recruiting pages go only to official Scouting America sites', () => {
  for (const route of ['join', 'new-families', 'contact', 'about', 'about/scoutmaster']) {
    for (const m of main(page(route)).matchAll(/href="(https?:\/\/[^"]+)"/g)) {
      const host = new URL(m[1]).hostname;
      assert.ok(host === 'www.scouting.org' || host === 'www.google.com', `${route}: unexpected external link ${m[1]}`);
    }
  }
});
