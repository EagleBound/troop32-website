// Checks the BUILT Events pages. Run with `npm run test:pages`, which first
// runs the normal build (dist/) and the fixture build (dist-fixtures/).
// Fixture expectations assume "today" = 2027-08-15 (scripts/fixtures.mjs).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const FIXTURES = 'dist-fixtures';

function page(root: string, route: string): string {
  const file = join(root, route, 'index.html');
  assert.ok(existsSync(file), `missing page ${root}/${route}`);
  return readFileSync(file, 'utf8');
}

function allFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? allFiles(path) : [path];
  });
}

const main = (html: string) => html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? '';
const text = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

/** Event slugs linked from cards or agenda rows inside the section labelled `id`. */
function cardSlugs(html: string, id: string): string[] {
  const section = html.split(`aria-labelledby="${id}"`)[1]?.split('</section>')[0] ?? '';
  return [...section.matchAll(/class="event-(?:card|agenda)-title"[^>]*>\s*<a href="\/events\/([^/"]+)\/"/g)].map((m) => m[1]);
}

const VISIBLE = {
  upcoming: [
    'example-postponed-hike-2027', // originally May 2027
    'example-cancelled-paddle-2027', // August 2027
    'example-lake-campout-2027', // September 2027
    'example-community-pancake-breakfast-2027', // October 2, 2027
    'example-tba-fundraiser-2027', // November 13, 2027 (location to be announced)
  ],
  recent: [
    'example-eagle-project-trail-bench-2027', // July 2027
    'example-summer-trek-2027', // June–July 2027 (title tiebreak)
    'example-open-house-2027', // March 2027
    'example-fall-camporee-2026', // September 2026: 11 months
  ],
  archive: ['example-summer-camp-2026', 'example-spring-service-day-2025'], // 12 months; earlier year
};
const HIDDEN = ['example-past-cancelled-2027', 'example-needs-update-2027', 'example-draft-outing-2027'];

// The REAL records (src/content/events/). Tests about them avoid dates that
// change with "today": completed events always have a page, in Recent or Archive.
const REAL_DIR = 'src/content/events';
const realRecords = readdirSync(REAL_DIR)
  .filter((name) => name.endsWith('.md'))
  .map((name) => {
    const source = readFileSync(join(REAL_DIR, name), 'utf8');
    return {
      slug: name.replace(/\.md$/, ''),
      uid: source.match(/^uid:\s*(\S+)/m)?.[1] ?? '',
      draft: /^draft:\s*true\b/m.test(source),
      status: source.match(/^status:\s*(\S+)/m)?.[1] ?? '',
    };
  });
const eventDirs = (root: string) =>
  readdirSync(join(root, 'events')).filter((name) => name !== 'archive' && name !== 'index.html');

/** For each view section: either cards or its approved empty-state text. */
function cardsOrEmpty(html: string, id: string, emptyText: string) {
  const hasCards = cardSlugs(html, id).length > 0;
  const hasEmpty = text(html.split(`aria-labelledby="${id}"`)[1]?.split('</section>')[0] ?? '').includes(emptyText);
  assert.ok(hasCards !== hasEmpty, `${id}: expected either cards or the empty state`);
}

test('normal build: detail pages match the real records exactly', () => {
  const pages = eventDirs(DIST);
  const known = new Set(realRecords.map((r) => r.slug));
  for (const slug of pages) assert.ok(known.has(slug), `page without a real record: ${slug}`);
  for (const r of realRecords.filter((r) => !r.draft && r.status === 'completed')) {
    assert.ok(pages.includes(r.slug), `completed record without a page: ${r.slug}`);
  }
  for (const r of realRecords.filter((r) => r.draft)) assert.ok(!pages.includes(r.slug), `draft has a page: ${r.slug}`);
});

test('normal build: each view shows cards or its approved empty state', () => {
  const events = page(DIST, 'events');
  cardsOrEmpty(events, 'upcoming-title', 'Upcoming adventures are shared here when appropriate for the public.');
  cardsOrEmpty(events, 'recent-title', 'Stories and photos from recent Troop 32 adventures will appear here.');
  assert.ok(text(events).includes('Older adventures and milestones will be collected in the Troop 32 Archive.'));
  if (cardSlugs(events, 'upcoming-title').length === 0) {
    assert.match(events, /<a href="\/join\/"[^>]*>Learn more about visiting a Monday meeting<\/a>/);
  }
  const archive = page(DIST, 'events/archive');
  assert.ok(/id="year-\d{4}"/.test(archive) || text(archive).includes('The Troop 32 Archive is just getting started.'));
});

test('normal build: no uid, review, or approval metadata on any page', () => {
  const uids = realRecords.map((r) => r.uid).filter(Boolean);
  for (const file of allFiles(DIST).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    for (const uid of uids) assert.ok(!html.includes(uid), `${file} contains a uid`);
    assert.ok(!/\bevt-[a-z0-9]{8}\b|reviewedBy|reviewedOn|approvedBy|approvedOn|publicDesignation|adult-project-lead/.test(html), `${file} contains metadata`);
  }
});

test('normal build: homepage teaser links only to real event pages, at most 3, no images', () => {
  const home = page(DIST, '');
  const section = home.match(/<section[^>]*aria-labelledby="event-teaser-title"[\s\S]*?<\/section>/)?.[0];
  if (!section) return; // omitted when nothing qualifies
  const slugs = [...section.matchAll(/class="event-card-title"[^>]*><a href="\/events\/([^/"]+)\/"/g)].map((m) => m[1]);
  assert.ok(slugs.length >= 1 && slugs.length <= 3, `teaser has ${slugs.length} cards`);
  for (const slug of slugs) assert.ok(eventDirs(DIST).includes(slug), `teaser links to missing page ${slug}`);
  assert.ok(!/<img|<figure/.test(section), 'teaser cards are text-only');
  assert.match(section, /<a href="\/events\/"[^>]*>See all events<\/a>/);

  // Only Recent Adventures (completed) may appear; never Upcoming. Order matches /events/.
  const events = page(DIST, 'events');
  const recent = cardSlugs(events, 'recent-title');
  const upcoming = cardSlugs(events, 'upcoming-title');
  assert.deepEqual(slugs, recent.slice(0, 3), 'teaser = first three Recent Adventures');
  for (const slug of slugs) assert.ok(!upcoming.includes(slug), `upcoming event ${slug} in the teaser`);
});

test('normal build: no fixture events or assets', () => {
  for (const file of allFiles(DIST)) {
    assert.ok(!/test-placeholder|fixture/i.test(file), `fixture asset in dist: ${file}`);
    if (/\.(html|css|js|json|xml|txt)$/.test(file)) {
      const content = readFileSync(file, 'utf8');
      assert.ok(!/Example (Lake|Community|Ridge|River|Summer|Fall|Spring|Open|Draft|Past|Needs)|Jordan Q\.|Fictional test data|evt-fx/.test(content), `fixture text in ${file}`);
    }
  }
});

test('fixture build: every page shows the fictional-data banner', () => {
  for (const route of ['', 'events', 'events/archive', `events/${VISIBLE.recent[0]}`]) {
    assert.ok(page(FIXTURES, route).includes('Fictional test data.'), route || 'home');
  }
});

test('fixture build: views list exactly the expected events in order', () => {
  const events = page(FIXTURES, 'events');
  assert.deepEqual(cardSlugs(events, 'upcoming-title'), VISIBLE.upcoming);
  assert.deepEqual(cardSlugs(events, 'recent-title'), VISIBLE.recent);
  assert.ok(text(events).includes('Visit the Troop 32 Archive (2 events)'));

  const archive = page(FIXTURES, 'events/archive');
  assert.deepEqual(cardSlugs(archive, 'year-2026'), ['example-summer-camp-2026']);
  assert.deepEqual(cardSlugs(archive, 'year-2025'), ['example-spring-service-day-2025']);
  assert.ok(archive.indexOf('id="year-2026"') < archive.indexOf('id="year-2025"'), 'newest year first');
});

test('fixture build: detail pages only for visible events', () => {
  const dirs = readdirSync(join(FIXTURES, 'events')).filter((name) => name !== 'archive' && name !== 'index.html').sort();
  assert.deepEqual(dirs, [...VISIBLE.upcoming, ...VISIBLE.recent, ...VISIBLE.archive].sort());
  for (const slug of HIDDEN) assert.ok(!existsSync(join(FIXTURES, 'events', slug)), slug);
});

test('fixture build: no private or review metadata anywhere', () => {
  for (const file of allFiles(FIXTURES).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(file, 'utf8');
    for (const leak of [/evt-fx\d/, /reviewedBy|reviewedOn/, /approvedBy|approvedOn/, /publicDesignation/, /committee-chair|Committee Chair/, /Example (Draft|Past Cancelled|Needs Update)/]) {
      assert.ok(!leak.test(html), `${file} contains ${leak}`);
    }
  }
});

test('fixture build: ordinary events show month-level dates only', () => {
  for (const slug of [...VISIBLE.upcoming, ...VISIBLE.recent, ...VISIBLE.archive].filter((s) => !/pancake|open-house|tba-fundraiser/.test(s))) {
    const html = main(page(FIXTURES, `events/${slug}`));
    assert.ok(!/datetime="\d{4}-\d{2}-\d{2}"/.test(html), `${slug}: day-level <time>`);
    assert.ok(!/(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),/.test(text(html)), `${slug}: weekday`);
    assert.ok(!/\d{1,2}:\d{2} (AM|PM)/.test(text(html)), `${slug}: clock time`);
    assert.ok(!html.includes('Event details'), `${slug}: public details block`);
  }
  assert.ok(text(main(page(FIXTURES, 'events/example-summer-trek-2027'))).includes('June–July 2027'));
  assert.ok(text(main(page(FIXTURES, 'events/example-postponed-hike-2027'))).includes('Originally planned for May 2027'));
});

test('fixture build: public details depend on status', () => {
  const planned = text(main(page(FIXTURES, 'events/example-community-pancake-breakfast-2027')));
  for (const shown of ['Open to the public', 'Saturday, October 2, 2027', '8:00 AM – 11:00 AM', 'Example Community Hall', '100 Example Street, Example City', 'Open to everyone. Tickets are sold at the door.']) {
    assert.ok(planned.includes(shown), `planned public event should show "${shown}"`);
  }

  const completed = text(main(page(FIXTURES, 'events/example-open-house-2027')));
  assert.ok(completed.includes('Saturday, March 13, 2027'));
  assert.ok(completed.includes('Example Community Hall'));
  for (const hidden of ['100 Example Street', '10:00 AM', '12:00 PM', 'Families welcome', 'Open to the public']) {
    assert.ok(!completed.includes(hidden), `completed public event should not show "${hidden}"`);
  }

  // Exact public details appear on no other page.
  for (const file of allFiles(FIXTURES).filter((f) => f.endsWith('.html') && !f.includes('pancake'))) {
    const content = text(readFileSync(file, 'utf8'));
    assert.ok(!content.includes('100 Example Street'), `${file}: street address`);
    assert.ok(!content.includes('Tickets are sold'), `${file}: participation`);
  }
});

test('fixture build: status labels', () => {
  const events = text(page(FIXTURES, 'events'));
  assert.ok(events.includes('Postponed; new date to be announced'));
  assert.ok(events.includes('Cancelled'));
  assert.ok(text(page(FIXTURES, 'events/example-cancelled-paddle-2027')).includes('Was planned for August 2027'));
});

test('fixture build: accessible structure and images', () => {
  const routes = ['events', 'events/archive', ...[...VISIBLE.upcoming, ...VISIBLE.recent, ...VISIBLE.archive].map((s) => `events/${s}`)];
  for (const route of routes) {
    const html = page(FIXTURES, route);
    assert.equal(html.match(/<h1[\s>]/g)?.length, 1, `${route}: exactly one h1`);
    for (const img of main(html).match(/<img [^>]*>/g) ?? []) {
      assert.match(img, /alt="[^"]+"/, `${route}: image without alt text: ${img}`);
    }
    assert.match(html, /<a href="\/events\/" class="nav-link" aria-current="page"/, `${route}: Events marked current in nav`);
  }

  const eagle = page(FIXTURES, 'events/example-eagle-project-trail-bench-2027');
  assert.equal(main(eagle).match(/<figure/g)?.length, 8, 'cover + 7 gallery photos');
  assert.ok(text(eagle).includes('Mr. Example checks the frame'), 'captions render');
  assert.match(eagle, /<h2 id="event-gallery-title"[^>]*>Photos<\/h2>/);
});

test('fixture build: homepage teaser (Recent Adventures only, newest first; max 3; text-only; placed before the Scout Law)', () => {
  const home = page(FIXTURES, '');
  const section = home.match(/<section[^>]*aria-labelledby="event-teaser-title"[\s\S]*?<\/section>/)?.[0] ?? '';
  assert.deepEqual(cardSlugs(home, 'event-teaser-title'), VISIBLE.recent.slice(0, 3));
  assert.deepEqual(cardSlugs(home, 'event-teaser-title'), [
    'example-eagle-project-trail-bench-2027', // July 2027
    'example-summer-trek-2027', // June–July 2027 (title tiebreak)
    'example-open-house-2027', // March 2027: a completed public-community event qualifies
  ]);
  assert.match(section, /<h2 id="event-teaser-title"[^>]*>Recent adventures<\/h2>/);
  assert.ok(!/<img|<figure/.test(section), 'text-only cards');
  for (const slug of VISIBLE.upcoming) assert.ok(!section.includes(`/events/${slug}/`), `upcoming ${slug} must not be featured`);
  for (const excluded of ['Example Community Pancake Breakfast', 'Example Community Fundraiser', 'Open to the public', 'Example Lake Campout', 'Example Ridge Hike', 'Example River Paddle']) {
    assert.ok(!text(section).includes(excluded), `${excluded} must not be featured`);
  }
  const at = (id: string) => home.indexOf(`id="${id}"`);
  assert.ok(at('gallery-title') < at('event-teaser-title') && at('event-teaser-title') < at('law-title'), 'between mosaic and Scout Law');
  assert.equal(home.match(/<h1[\s>]/g)?.length, 1);
});

test('fixture build: compact Upcoming list (one row per event, date column, no images)', () => {
  const events = page(FIXTURES, 'events');
  const section = events.split('aria-labelledby="upcoming-title"')[1]?.split('</section>')[0] ?? '';
  assert.match(section, /<ul class="event-agenda"[^>]*role="list"/);
  assert.equal(section.match(/<li class="event-agenda-item"/g)?.length, VISIBLE.upcoming.length);
  assert.equal(section.match(/<h3 class="event-agenda-title"/g)?.length, VISIBLE.upcoming.length);
  assert.equal(section.match(/<time datetime=/g)?.length, VISIBLE.upcoming.length);
  assert.ok(!/<img|<figure|event-card/.test(section), 'no images or photo cards in Upcoming');
  assert.match(section, /<time datetime="2027-11-13"[^>]*>Saturday, November 13, 2027<\/time>/);
  assert.ok(text(section).includes('Location to be announced'));
  // Recent Adventures keeps its photo cards.
  const recent = events.split('aria-labelledby="recent-title"')[1]?.split('</section>')[0] ?? '';
  assert.match(recent, /class="event-card"/);
});

test('fixture build: location to be announced, with no invented venue details', () => {
  const tba = text(main(page(FIXTURES, 'events/example-tba-fundraiser-2027')));
  assert.ok(tba.includes('Where To be announced'), 'details block shows Where: To be announced');
  assert.ok(tba.includes('Saturday, November 13, 2027'));
  assert.ok(tba.includes('About the event') && tba.includes('What to expect') && tba.includes('Example text:'), 'example sections render');
  assert.ok(!/\d{1,2}:\d{2} (AM|PM)|Example (Community )?Hall|Example Street/.test(tba), 'no time or venue');
  // The flag only affects events that set it.
  assert.ok(!text(main(page(FIXTURES, 'events/example-community-pancake-breakfast-2027'))).includes('To be announced'));
});

test('normal build: Pancake Breakfast 2027 shows only its confirmed public information', () => {
  const route = 'events/pancake-breakfast-2027';
  if (!existsSync(join(DIST, route, 'index.html'))) return; // after March 7, 2027 it awaits a status update
  const html = main(page(DIST, route));
  const body = text(html);
  for (const shown of [
    'Pancake Breakfast',
    'Sunday, March 7, 2027',
    'Open to the public',
    'Where To be announced',
    'More details will be added here when they',
    'pancake breakfast is open to the public.',
  ]) {
    assert.ok(body.includes(shown), `missing "${shown}"`);
  }
  assert.match(html, /<time datetime="2027-03-07"/);
  assert.ok(!/\d{1,2}:\d{2} (AM|PM)|How to take part|<img|Mr\.|Mrs\./.test(html), 'no time, participation, image, or adult name');
  assert.equal(html.match(/<h2[\s>]/g)?.length, 1, 'only the Event details heading: no placeholder sections');
});

test('homepage: existing photos unchanged and not repeated by the teaser (both builds)', () => {
  for (const root of [DIST, FIXTURES]) {
    const home = page(root, '');
    assert.equal(home.match(/<figure/g)?.length, 7, `${root}: 3 program cards + 4 mosaic tiles`);
    assert.equal(home.match(/<img /g)?.length, 9, `${root}: emblem + hero + 7 framed photos`);
  }
});

test('navigation: Events between What We Do and New Families; footer link', () => {
  const home = page(DIST, '');
  const nav = home.match(/<nav id="site-nav"[\s\S]*?<\/nav>/)?.[0] ?? '';
  const labels = [...nav.matchAll(/class="nav-link[^"]*"[^>]*>([^<]+)</g)].map((m) => m[1].trim());
  assert.deepEqual(labels, ['About', 'What We Do', 'Events', 'New Families', 'Join']);
  assert.match(home, /<footer[\s\S]*<a href="\/events\/"[^>]*>Events<\/a>/);
});
