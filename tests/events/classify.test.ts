import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classifyEvent, eventStatusLabel, selectEventViews } from '../../src/lib/events/classify.ts';
import type { ClassifiableEvent } from '../../src/lib/events/classify.ts';
import { day } from './fixtures.ts';

const ev = (overrides: Partial<ClassifiableEvent>): ClassifiableEvent => ({
  title: 'Example',
  status: 'completed',
  month: '2026-07',
  ...overrides,
});

test('planned: upcoming through its month, then needs-update (never assumed completed)', () => {
  const planned = ev({ status: 'planned', month: '2027-07' });
  assert.equal(classifyEvent(planned, day(2027, 6)), 'upcoming');
  assert.equal(classifyEvent(planned, day(2027, 7, 31)), 'upcoming');
  assert.equal(classifyEvent(planned, day(2027, 8, 1)), 'needs-update');
});

test('planned across a year boundary', () => {
  const planned = ev({ status: 'planned', month: '2027-12' });
  assert.equal(classifyEvent(planned, day(2027, 12, 31)), 'upcoming');
  assert.equal(classifyEvent(planned, day(2028, 1, 1)), 'needs-update');
});

test('planned public event with an exact date: needs-update the day after', () => {
  const planned = ev({ status: 'planned', month: '2027-03', publicDetails: { date: '2027-03-06' } });
  assert.equal(classifyEvent(planned, day(2027, 3, 6)), 'upcoming');
  assert.equal(classifyEvent(planned, day(2027, 3, 7)), 'needs-update');
});

test('multi-month events use endMonth', () => {
  const trek = ev({ status: 'planned', month: '2027-06', endMonth: '2027-07' });
  assert.equal(classifyEvent(trek, day(2027, 7, 20)), 'upcoming');
  const done = ev({ month: '2026-06', endMonth: '2026-07' });
  assert.equal(classifyEvent(done, day(2027, 6)), 'recent'); // 11 months after July
  assert.equal(classifyEvent(done, day(2027, 7)), 'archive'); // 12 months after July
});

test('completed: Recent for under 12 months, Archive at 12 months', () => {
  const july = ev({ month: '2026-07' });
  assert.equal(classifyEvent(july, day(2026, 7)), 'recent'); // same month
  assert.equal(classifyEvent(july, day(2027, 6, 30)), 'recent'); // 11 months
  assert.equal(classifyEvent(july, day(2027, 7, 1)), 'archive'); // 12 months
  assert.equal(classifyEvent(july, day(2030, 1)), 'archive');
});

test('completed: the 12-month boundary across a year change', () => {
  const december = ev({ month: '2026-12' });
  assert.equal(classifyEvent(december, day(2027, 11, 30)), 'recent');
  assert.equal(classifyEvent(december, day(2027, 12, 1)), 'archive');
});

test('completed in a future month is inconsistent → needs-update', () => {
  assert.equal(classifyEvent(ev({ month: '2027-09' }), day(2027, 8)), 'needs-update');
});

test('postponed stays upcoming, with no age limit', () => {
  const postponed = ev({ status: 'postponed', month: '2026-03' });
  assert.equal(classifyEvent(postponed, day(2026, 2)), 'upcoming');
  assert.equal(classifyEvent(postponed, day(2028, 9)), 'upcoming');
  assert.equal(eventStatusLabel(postponed), 'Postponed; new date to be announced');
});

test('cancelled: visible through its month, hidden afterward', () => {
  const cancelled = ev({ status: 'cancelled', month: '2027-05' });
  assert.equal(classifyEvent(cancelled, day(2027, 5, 31)), 'upcoming');
  assert.equal(classifyEvent(cancelled, day(2027, 6, 1)), 'hidden');
  assert.equal(eventStatusLabel(cancelled), 'Cancelled');
  assert.equal(eventStatusLabel(ev({ status: 'planned' })), undefined);
});

test('drafts are hidden whatever their status', () => {
  for (const status of ['planned', 'completed', 'cancelled', 'postponed'] as const) {
    assert.equal(classifyEvent(ev({ status, month: '2027-07', draft: true }), day(2027, 7)), 'hidden');
  }
});

test('views are sorted: upcoming soonest first, recent/archive newest first, ties by title', () => {
  const today = day(2027, 7, 1);
  const items = [
    ev({ title: 'B campout', status: 'planned', month: '2027-09' }),
    ev({ title: 'A campout', status: 'planned', month: '2027-09' }),
    ev({ title: 'Breakfast', status: 'planned', month: '2027-08', publicDetails: { date: '2027-08-20' } }),
    ev({ title: 'Hike', status: 'planned', month: '2027-08' }),
    ev({ title: 'Old trek', month: '2025-06' }),
    ev({ title: 'Older trek', month: '2024-06' }),
    ev({ title: 'Spring outing', month: '2027-04' }),
    ev({ title: 'Winter outing', month: '2027-01' }),
    ev({ title: 'Missed', status: 'planned', month: '2027-05' }),
    ev({ title: 'Draft', month: '2027-04', draft: true }),
  ];
  const views = selectEventViews(items, today, (e) => e);
  const titles = (list: ClassifiableEvent[]) => list.map((e) => e.title);
  assert.deepEqual(titles(views.upcoming), ['Hike', 'Breakfast', 'A campout', 'B campout']);
  assert.deepEqual(titles(views.recent), ['Spring outing', 'Winter outing']);
  assert.deepEqual(titles(views.archive), ['Old trek', 'Older trek']);
  assert.deepEqual(titles(views.needsUpdate), ['Missed']);
});
