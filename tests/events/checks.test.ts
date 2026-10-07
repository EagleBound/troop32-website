import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkEvents, imageFileName } from '../../src/lib/events/checks.ts';
import type { CheckableEvent } from '../../src/lib/events/checks.ts';
import { day, photoLog } from './fixtures.ts';

const today = day(2027, 8, 15);

function event(overrides: Partial<CheckableEvent> & { data?: Partial<CheckableEvent['data']> } = {}): CheckableEvent {
  return {
    id: 'eagle-project-trail-bench-2027',
    text: 'A fictional Scout built a trail bench.',
    ...overrides,
    data: { uid: 'evt-test0001', title: 'Example', status: 'completed', month: '2027-07', designation: 'ordinary', ...overrides.data },
  };
}

const run = (...events: CheckableEvent[]) => checkEvents(events, { photoLogText: photoLog, today });
const has = (list: string[], fragment: string) => list.some((m) => m.includes(fragment));

test('a clean event has no errors or warnings', () => {
  assert.deepEqual(run(event()), { errors: [], warnings: [] });
});

test('slug: lowercase kebab-case, at most 60 characters; a year is NOT required', () => {
  assert.deepEqual(run(event({ id: 'spring-camporee' })).errors, []);
  for (const bad of ['Spring-Camporee', 'spring_camporee', 'spring--camporee', '-spring', 'nested/spring-camporee', 'a'.repeat(61)]) {
    assert.ok(has(run(event({ id: bad })).errors, 'kebab-case'), bad);
  }
  assert.deepEqual(run(event({ id: 'a'.repeat(60) })).errors, []);
});

test('duplicate uids are errors', () => {
  const { errors } = run(event(), event({ id: 'another-event-2027' }));
  assert.ok(has(errors, 'already used'));
});

test('every photo needs a PHOTO-LOG.md entry', () => {
  const logged = { src: '__ASTRO_IMAGE_../../assets/photos/example-photo-01.jpg', alt: 'x' };
  const unlogged = { src: '__ASTRO_IMAGE_../../assets/photos/not-reviewed-01.jpg', alt: 'x' };
  assert.deepEqual(run(event({ data: { cover: logged, gallery: [logged] } })).errors, []);
  assert.ok(has(run(event({ data: { gallery: [logged, unlogged] } })).errors, 'not-reviewed-01.jpg'));
  assert.ok(has(run(event({ data: { cover: unlogged } })).errors, 'PHOTO-LOG'));
});

test('image file names are found in Astro\'s stored forms', () => {
  assert.equal(imageFileName('__ASTRO_IMAGE_../../assets/photos/a-01.jpg'), 'a-01.jpg');
  assert.equal(imageFileName({ src: '/_astro/a-01.jpg?w=10' }), 'a-01.jpg');
  assert.equal(imageFileName(undefined), undefined);
});

test('gallery: warning above 12, none at 12', () => {
  const photo = { src: 'example-photo-01.jpg', alt: 'x' };
  assert.deepEqual(run(event({ data: { gallery: Array(12).fill(photo) } })).warnings, []);
  assert.ok(has(run(event({ data: { gallery: Array(13).fill(photo) } })).warnings, '13 photos'));
});

test('planned event whose month passed: warning (needs update), not completed', () => {
  const { errors, warnings } = run(event({ data: { status: 'planned', month: '2027-06' } }));
  assert.deepEqual(errors, []);
  assert.ok(has(warnings, 'planned event whose date has passed'));
});

test('completed event in a future month: error', () => {
  assert.ok(has(run(event({ data: { month: '2027-10' } })).errors, "hasn't happened yet"));
});

test('postponed events get no age warning', () => {
  assert.deepEqual(run(event({ data: { status: 'postponed', month: '2026-01' } })), { errors: [], warnings: [] });
});

test('Google Drive / Docs links are errors everywhere', () => {
  const text = 'Photos: https://drive.google.com/drive/folders/abc';
  assert.ok(has(run(event({ text })).errors, 'Google Drive'));
  assert.ok(has(run(event({ text: 'https://docs.google.com/x', data: { designation: 'public-community' } })).errors, 'Google Drive'));
});

test('email and phone: error for ordinary events, warning for public-community events', () => {
  for (const text of ['Write to someone@example.com.', 'Call (707) 555-0100.', 'Call 707-555-0100.', 'Call +1 707 555 0100.']) {
    const ordinary = run(event({ text }));
    assert.ok(ordinary.errors.length > 0, `ordinary: ${text}`);
    const pub = run(event({ text, data: { designation: 'public-community' } }));
    assert.deepEqual(pub.errors, [], `public: ${text}`);
    assert.ok(has(pub.warnings, 'intentionally public contact'), `public: ${text}`);
  }
});

test('no false phone/email alarms on ordinary content', () => {
  for (const text of ['The 2026-2027 season.', 'uid: evt-k3m9q2zt', 'Troop 32 hiked 12.5 miles.', 'month: "2027-07"']) {
    assert.deepEqual(run(event({ text })).errors, [], text);
  }
});

test('ordinary events: exact clock times and dates warn; month/year does not', () => {
  for (const text of ['We left at 7:30.', 'Meet at 19:30.', 'Starts 7 PM.', 'Back by 10 a.m.']) {
    assert.ok(has(run(event({ text })).warnings, 'clock time'), text);
  }
  for (const text of ['On July 14 we hiked.', 'Sept. 3rd was rainy.']) {
    assert.ok(has(run(event({ text })).warnings, 'exact date'), text);
  }
  for (const text of ['In July 2027 we hiked.', 'Troop 32 am I.', 'Five amazing days.', 'May 2027.', 'Scouts may 3D-print.']) {
    assert.deepEqual(run(event({ text })).warnings, [], text);
  }
});

test('public-community events may state exact times and dates', () => {
  const text = 'Saturday, March 6, 8:00 to 11:00 AM.';
  assert.deepEqual(run(event({ text, data: { designation: 'public-community', status: 'planned', month: '2027-09' } })).warnings, []);
});

test('"archive" is a reserved slug', () => {
  assert.ok(has(run(event({ id: 'archive' })).errors, 'reserved'));
  assert.deepEqual(run(event({ id: 'archive-day-2027' })).errors, []);
});

test('body images and embedded media are errors (photos go through cover/gallery)', () => {
  for (const body of [
    '![A Scout](../../assets/photos/x.jpg)',
    'Text ![alt][ref] more.',
    '<img src="x.jpg" alt="">',
    '<picture><source srcset="x.webp"></picture>',
    '<video src="x.mp4"></video>',
    '<iframe src="https://example.com"></iframe>',
    '<SCRIPT>alert(1)</SCRIPT>',
  ]) {
    assert.ok(has(run(event({ body })).errors, 'embedded media'), body);
  }
  for (const body of ['A [link](https://example.com) and an exclamation! [not an image]', 'Scouts imagined a bridge.']) {
    assert.deepEqual(run(event({ body })).errors, [], body);
  }
});

test('a level-one heading in the body warns; lower levels do not', () => {
  assert.ok(has(run(event({ body: 'Intro\n\n# The hike\n' })).warnings, '"# "'));
  assert.deepEqual(run(event({ body: '## The hike\n\n### Day one\n#hashtag' })).warnings, []);
});
