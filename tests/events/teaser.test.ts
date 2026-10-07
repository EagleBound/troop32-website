import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TEASER_LIMIT, selectTeaserEvents, toPublicEvent } from '../../src/lib/events/present.ts';
import type { EventRecord, PublicEvent } from '../../src/lib/events/present.ts';

// FICTIONAL records only. Views are passed already classified and sorted, as
// collection.ts provides them; the teaser never classifies.
const record = (title: string, overrides: Partial<EventRecord<string>> = {}): EventRecord<string> => ({
  title,
  summary: `${title} summary.`,
  status: 'completed',
  month: '2027-07',
  designation: 'ordinary',
  ...overrides,
});
const up = (title: string, overrides: Partial<EventRecord<string>> = {}) =>
  toPublicEvent(title.toLowerCase().replace(/\W+/g, '-'), record(title, { status: 'planned', month: '2027-09', ...overrides }), 'upcoming');
const recent = (title: string) => toPublicEvent(title.toLowerCase().replace(/\W+/g, '-'), record(title), 'recent');
const titles = (events: PublicEvent[]) => events.map((e) => e.title);

const publicPlanned = (title: string) =>
  up(title, { designation: 'public-community', publicDetails: { date: '2027-09-04', venue: { name: 'Example Hall' } } });

test('planned public-community events first (in the given soonest-first order), then recent', () => {
  const views = {
    upcoming: [publicPlanned('Open House'), up('Campout'), publicPlanned('Breakfast')],
    recent: [recent('Trek'), recent('Camporee')],
  };
  assert.deepEqual(titles(selectTeaserEvents(views)), ['Open House', 'Breakfast', 'Trek']);
});

test('at most 3 cards by default', () => {
  assert.equal(TEASER_LIMIT, 3);
  const views = { upcoming: [], recent: ['A', 'B', 'C', 'D', 'E'].map(recent) };
  assert.deepEqual(titles(selectTeaserEvents(views)), ['A', 'B', 'C']);
  assert.deepEqual(titles(selectTeaserEvents(views, 2)), ['A', 'B']);
});

test('ordinary upcoming, postponed, and cancelled events are never featured', () => {
  const views = {
    upcoming: [
      up('Ordinary campout'),
      up('Postponed hike', { status: 'postponed' }),
      up('Cancelled paddle', { status: 'cancelled' }),
      up('Postponed public', { status: 'postponed', designation: 'public-community', publicDetails: { date: '2027-09-04' } }),
      up('Cancelled public', { status: 'cancelled', designation: 'public-community', publicDetails: { date: '2027-09-04' } }),
    ],
    recent: [recent('Trek')],
  };
  assert.deepEqual(titles(selectTeaserEvents(views)), ['Trek']);
});

test('nothing qualifies → empty (the homepage section is omitted)', () => {
  assert.deepEqual(selectTeaserEvents({ upcoming: [up('Ordinary campout')], recent: [] }), []);
  assert.deepEqual(selectTeaserEvents({ upcoming: [], recent: [] }), []);
});

test('teaser items are the allowlisted public objects, unchanged', () => {
  const trek = recent('Trek');
  const [item] = selectTeaserEvents({ upcoming: [], recent: [trek] });
  assert.equal(item, trek);
  const text = JSON.stringify(item);
  for (const hidden of ['uid', 'review', 'publicDesignation', 'draft', 'designation']) assert.ok(!text.includes(hidden), hidden);
});
