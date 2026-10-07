import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  isIsoDate,
  isYearMonth,
  monthsBetween,
  parseYearMonth,
  troopToday,
} from '../../src/lib/events/months.ts';

test('accepts only "YYYY-MM" months', () => {
  assert.equal(isYearMonth('2027-07'), true);
  assert.equal(isYearMonth('2027-12'), true);
  for (const bad of ['2027-13', '2027-00', '2027-7', '27-07', '2027-07-01', 'July 2027']) {
    assert.equal(isYearMonth(bad), false, bad);
  }
  assert.throws(() => parseYearMonth('2027-13'));
});

test('accepts only real calendar dates', () => {
  assert.equal(isIsoDate('2028-02-29'), true); // leap year
  assert.equal(isIsoDate('2027-02-29'), false);
  assert.equal(isIsoDate('2027-04-31'), false);
  assert.equal(isIsoDate('2027-7-4'), false);
});

test('counts months across a year boundary', () => {
  assert.equal(monthsBetween({ year: 2026, month: 12 }, { year: 2027, month: 1 }), 1);
  assert.equal(monthsBetween({ year: 2026, month: 7 }, { year: 2027, month: 7 }), 12);
  assert.equal(monthsBetween({ year: 2027, month: 3 }, { year: 2026, month: 12 }), -3);
});

test('"today" uses the troop time zone, not UTC', () => {
  // 03:00 UTC on Aug 1 is still the evening of July 31 in Santa Rosa (PDT, UTC-7).
  assert.deepEqual(troopToday(new Date('2027-08-01T03:00:00Z')), { year: 2027, month: 7, day: 31 });
  assert.deepEqual(troopToday(new Date('2027-08-01T07:00:00Z')), { year: 2027, month: 8, day: 1 });
  // New Year's Eve in standard time (PST, UTC-8).
  assert.deepEqual(troopToday(new Date('2028-01-01T07:59:00Z')), { year: 2027, month: 12, day: 31 });
  assert.deepEqual(troopToday(new Date('2028-01-01T08:00:00Z')), { year: 2028, month: 1, day: 1 });
});
