import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatMonth,
  formatMonthRange,
  formatPublicDate,
  formatTime,
  formatTimeRange,
  groupByYear,
  toPublicEvent,
} from '../../src/lib/events/present.ts';
import type { EventRecord } from '../../src/lib/events/present.ts';

// FICTIONAL records only.
type Record = EventRecord<string> & { uid: string; review: object; publicDesignation?: object };

const ordinary = (overrides: Partial<Record> = {}): Record => ({
  uid: 'evt-test0001',
  title: 'Eagle Project · Jordan Q.',
  summary: 'A fictional bench project.',
  status: 'completed',
  month: '2027-07',
  draft: false,
  designation: 'ordinary',
  review: { reviewedByRole: 'webmaster', reviewedOn: '2027-08-01' },
  ...overrides,
});

const publicRecord = (overrides: Partial<Record> = {}): Record =>
  ordinary({
    title: 'Example Breakfast',
    status: 'planned',
    month: '2027-10',
    designation: 'public-community',
    publicDesignation: { approvedByRole: 'scoutmaster', approvedOn: '2027-07-20' },
    publicDetails: {
      date: '2027-10-02',
      startTime: '08:00',
      endTime: '11:00',
      venue: { name: 'Example Hall', address: '100 Example Street' },
      participation: 'Open to everyone.',
    },
    ...overrides,
  });

test('month and month-range formatting', () => {
  assert.equal(formatMonth('2027-07'), 'July 2027');
  assert.equal(formatMonthRange('2027-07'), 'July 2027');
  assert.equal(formatMonthRange('2027-07', '2027-07'), 'July 2027');
  assert.equal(formatMonthRange('2027-06', '2027-07'), 'June–July 2027');
  assert.equal(formatMonthRange('2026-12', '2027-01'), 'December 2026 – January 2027');
});

test('public dates never shift by time zone', () => {
  assert.equal(formatPublicDate('2027-10-02'), 'Saturday, October 2, 2027');
  assert.equal(formatPublicDate('2027-01-01'), 'Friday, January 1, 2027');
  assert.equal(formatPublicDate('2027-12-31'), 'Friday, December 31, 2027');
});

test('time formatting', () => {
  assert.equal(formatTime('00:00'), '12:00 AM');
  assert.equal(formatTime('08:05'), '8:05 AM');
  assert.equal(formatTime('12:00'), '12:00 PM');
  assert.equal(formatTime('23:59'), '11:59 PM');
  assert.equal(formatTimeRange('08:00', '11:00'), '8:00 AM – 11:00 AM');
  assert.equal(formatTimeRange('08:00'), '8:00 AM');
  assert.equal(formatTimeRange(undefined, '11:00'), 'Until 11:00 AM');
  assert.equal(formatTimeRange(), undefined);
});

test('only allowlisted fields reach the page (no uid, review, designation approval, or draft)', () => {
  const shown = toPublicEvent('example-2027', publicRecord(), 'upcoming');
  const text = JSON.stringify(shown);
  for (const hidden of ['evt-test0001', 'uid', 'review', 'reviewedByRole', 'webmaster', 'publicDesignation', 'approvedByRole', 'scoutmaster', 'draft', 'designation']) {
    assert.ok(!text.includes(hidden), `leaked "${hidden}"`);
  }
  assert.deepEqual(Object.keys(shown).sort(), ['badge', 'gallery', 'href', 'publicInfo', 'slug', 'status', 'summary', 'title', 'view', 'when', 'year']);
});

test('ordinary events show month only, never a day, even if publicDetails were present', () => {
  const shown = toPublicEvent('x', ordinary({ endMonth: '2027-08' }), 'recent');
  assert.deepEqual(shown.when, { text: 'July–August 2027', datetime: '2027-07' });
  assert.equal(shown.publicInfo, undefined);
  // Defensive: the schema forbids this, but presentation must not show it either.
  const smuggled = toPublicEvent('x', ordinary({ publicDetails: { date: '2027-07-04', startTime: '09:00' } }), 'recent');
  assert.equal(smuggled.when.text, 'July 2027');
  assert.equal(smuggled.publicInfo, undefined);
});

test('planned public-community: full public details', () => {
  const shown = toPublicEvent('x', publicRecord(), 'upcoming');
  assert.equal(shown.badge, 'Open to the public');
  assert.deepEqual(shown.when, { text: 'Saturday, October 2, 2027', datetime: '2027-10-02' });
  assert.deepEqual(shown.publicInfo, {
    venueName: 'Example Hall',
    time: '8:00 AM – 11:00 AM',
    venueAddress: '100 Example Street',
    participation: 'Open to everyone.',
  });
});

test('postponed / cancelled public-community: date, status, venue name; no time, address, or participation', () => {
  for (const [status, prefix, badge] of [
    ['postponed', 'Originally planned for', 'Postponed; new date to be announced'],
    ['cancelled', 'Was planned for', 'Cancelled'],
  ] as const) {
    const shown = toPublicEvent('x', publicRecord({ status }), 'upcoming');
    assert.equal(shown.badge, badge);
    assert.deepEqual(shown.when, { prefix, text: 'Saturday, October 2, 2027', datetime: '2027-10-02' });
    assert.deepEqual(shown.publicInfo, { venueName: 'Example Hall' });
  }
});

test('completed public-community: date and venue name only', () => {
  const shown = toPublicEvent('x', publicRecord({ status: 'completed' }), 'recent');
  assert.equal(shown.badge, undefined);
  assert.equal(shown.when.text, 'Saturday, October 2, 2027');
  assert.deepEqual(shown.publicInfo, { venueName: 'Example Hall' });
});

test('ordinary postponed and cancelled events: labels and month prefix', () => {
  assert.deepEqual(toPublicEvent('x', ordinary({ status: 'postponed', month: '2027-05' }), 'upcoming').when, {
    prefix: 'Originally planned for',
    text: 'May 2027',
    datetime: '2027-05',
  });
  assert.equal(toPublicEvent('x', ordinary({ status: 'cancelled' }), 'upcoming').badge, 'Cancelled');
  assert.equal(toPublicEvent('x', ordinary({ status: 'planned' }), 'upcoming').badge, undefined);
});

test('photos keep their governed alt text and captions; nothing else', () => {
  const shown = toPublicEvent(
    'x',
    ordinary({
      cover: { src: 'cover.png', alt: 'A bench.', focus: { x: 40 } },
      gallery: [{ src: 'a.png', alt: 'Scouts carry lumber.', caption: 'Build day' }],
    }),
    'recent',
  );
  assert.deepEqual(shown.cover, { src: 'cover.png', alt: 'A bench.', focus: { x: 40 } });
  assert.deepEqual(shown.gallery, [{ src: 'a.png', alt: 'Scouts carry lumber.', caption: 'Build day' }]);
});

test('archive grouping by the event\'s last year, newest first, order kept within a year', () => {
  const events = [
    toPublicEvent('a', ordinary({ title: 'A', month: '2025-11', endMonth: '2026-01' }), 'archive'),
    toPublicEvent('b', ordinary({ title: 'B', month: '2026-03' }), 'archive'),
    toPublicEvent('c', ordinary({ title: 'C', month: '2024-05' }), 'archive'),
  ];
  assert.deepEqual(
    groupByYear(events).map((g) => [g.year, g.events.map((e) => e.title)]),
    [[2026, ['A', 'B']], [2024, ['C']]],
  );
});
