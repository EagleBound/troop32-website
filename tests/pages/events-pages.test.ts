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

/** Event slugs linked from cards inside the section labelled `id`. */
function cardSlugs(html: string, id: string): string[] {
  const section = html.split(`aria-labelledby="${id}"`)[1]?.split('</section>')[0] ?? '';
  return [...section.matchAll(/class="event-card-title"[^>]*><a href="\/events\/([^/"]+)\/"/g)].map((m) => m[1]);
}

const VISIBLE = {
  upcoming: [
    'example-postponed-hike-2027', // originally May 2027
    'example-cancelled-paddle-2027', // August 2027
    'example-lake-campout-2027', // September 2027
    'example-community-pancake-breakfast-2027', // October 2, 2027
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

test('normal build: empty states, no event pages, no fixtures', () => {
  const events = page(DIST, 'events');
  assert.ok(text(events).includes('Upcoming adventures are shared here when appropriate for the public.'));
  assert.match(events, /<a href="\/join\/">Learn more about visiting a Monday meeting<\/a>/);
  assert.ok(text(events).includes('Stories and photos from recent Troop 32 adventures will appear here.'));
  assert.ok(text(events).includes('Older adventures and milestones will be collected in the Troop 32 Archive.'));
  assert.ok(text(page(DIST, 'events/archive')).includes('The Troop 32 Archive is just getting started.'));

  const eventDirs = readdirSync(join(DIST, 'events')).filter((name) => name !== 'archive' && name !== 'index.html');
  assert.deepEqual(eventDirs, [], 'no event detail pages in the normal build');

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
  for (const slug of [...VISIBLE.upcoming, ...VISIBLE.recent, ...VISIBLE.archive].filter((s) => !/pancake|open-house/.test(s))) {
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

test('navigation: Events between What We Do and New Families; footer link', () => {
  const home = page(DIST, '');
  const nav = home.match(/<nav id="site-nav"[\s\S]*?<\/nav>/)?.[0] ?? '';
  const labels = [...nav.matchAll(/class="nav-link[^"]*"[^>]*>([^<]+)</g)].map((m) => m[1].trim());
  assert.deepEqual(labels, ['About', 'What We Do', 'Events', 'New Families', 'Join']);
  assert.match(home, /<footer[\s\S]*<a href="\/events\/"[^>]*>Events<\/a>/);
});
