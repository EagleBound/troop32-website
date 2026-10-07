import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TEASER_LIMIT, selectTeaserEvents, toPublicEvent } from '../../src/lib/events/present.ts';
import type { EventRecord, PublicEvent } from '../../src/lib/events/present.ts';

// FICTIONAL records only. The teaser receives the already-classified, sorted
// Recent Adventures view (as collection.ts provides it); it never classifies.
const record = (title: string, overrides: Partial<EventRecord<string>> = {}): EventRecord<string> => ({
  title,
  summary: `${title} summary.`,
  status: 'completed',
  month: '2027-07',
  designation: 'ordinary',
  ...overrides,
});
const slug = (title: string) => title.toLowerCase().replace(/\W+/g, '-');
const up = (title: string, overrides: Partial<EventRecord<string>> = {}) =>
  toPublicEvent(slug(title), record(title, { status: 'planned', month: '2027-09', ...overrides }), 'upcoming');
const recent = (title: string) => toPublicEvent(slug(title), record(title), 'recent');
const titles = (events: PublicEvent[]) => events.map((e) => e.title);

test('only Recent Adventures, in the given newest-first order', () => {
  assert.deepEqual(titles(selectTeaserEvents([recent('Chill'), recent('Melita'), recent('Philmont')])), ['Chill', 'Melita', 'Philmont']);
});

test('upcoming events of every kind can never take a slot', () => {
  const upcoming = [
    up('Public breakfast', { designation: 'public-community', publicDetails: { date: '2027-09-04', venueToBeAnnounced: true } }),
    up('Ordinary campout'),
    up('Postponed hike', { status: 'postponed' }),
    up('Cancelled paddle', { status: 'cancelled' }),
  ];
  // Even if upcoming events were passed in by mistake, only Recent items survive.
  assert.deepEqual(titles(selectTeaserEvents([...upcoming, recent('Trek'), ...upcoming])), ['Trek']);
  assert.deepEqual(selectTeaserEvents(upcoming), []);
  const archived = toPublicEvent('old', record('Old trek', { month: '2025-01' }), 'archive');
  assert.deepEqual(selectTeaserEvents([archived]), []);
});

test('at most 3 cards by default', () => {
  assert.equal(TEASER_LIMIT, 3);
  const items = ['A', 'B', 'C', 'D', 'E'].map(recent);
  assert.deepEqual(titles(selectTeaserEvents(items)), ['A', 'B', 'C']);
  assert.deepEqual(titles(selectTeaserEvents(items, 2)), ['A', 'B']);
});

test('nothing qualifies → empty (the homepage section is omitted)', () => {
  assert.deepEqual(selectTeaserEvents([]), []);
});

test('teaser items are the allowlisted public objects, unchanged', () => {
  const trek = recent('Trek');
  const [item] = selectTeaserEvents([trek]);
  assert.equal(item, trek);
  const text = JSON.stringify(item);
  for (const hidden of ['uid', 'review', 'publicDesignation', 'draft', 'designation', 'publicEvent']) assert.ok(!text.includes(hidden), hidden);
});
