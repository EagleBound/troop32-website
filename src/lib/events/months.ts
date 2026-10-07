// Month and date helpers for the Events data model.
//
// Ordinary troop events are dated to the MONTH ("2027-07"), never the day
// (docs/PRIVACY.md → Events). Only leadership-designated public/community
// events may carry an exact public date.
//
// "Today" is always the troop's local date (Santa Rosa, California), not UTC,
// so an event doesn't change view a few hours early on the last day of a month.
//
// This file has no Astro imports so it can be tested with `node --test`.

export const TROOP_TIME_ZONE = 'America/Los_Angeles';

/** A calendar month. `month` is 1–12. */
export interface YearMonth {
  year: number;
  month: number;
}

/** A calendar date. `month` is 1–12. */
export interface LocalDate {
  year: number;
  month: number;
  day: number;
}

/** "YYYY-MM", e.g. "2027-07". */
export const YEAR_MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** "YYYY-MM-DD", e.g. "2027-07-14". */
export const ISO_DATE_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/** 24-hour "HH:MM", e.g. "07:30" or "19:30". */
export const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isYearMonth(value: string): boolean {
  return YEAR_MONTH_PATTERN.test(value);
}

export function parseYearMonth(value: string): YearMonth {
  const match = YEAR_MONTH_PATTERN.exec(value);
  if (!match) throw new Error(`Expected a month like "2027-07", got "${value}".`);
  return { year: Number(match[1]), month: Number(match[2]) };
}

/** True for a real calendar date in "YYYY-MM-DD" form (rejects 2027-02-30). */
export function isIsoDate(value: string): boolean {
  const match = ISO_DATE_PATTERN.exec(value);
  if (!match) return false;
  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  return day <= daysInMonth(year, month);
}

export function parseIsoDate(value: string): LocalDate {
  if (!isIsoDate(value)) throw new Error(`Expected a date like "2027-07-14", got "${value}".`);
  const [year, month, day] = value.split('-').map(Number);
  return { year, month, day };
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Months since year 0, so two months can be compared or subtracted. */
export function monthIndex(ym: YearMonth): number {
  return ym.year * 12 + (ym.month - 1);
}

/** Whole months from `from` to `to` (negative if `to` is earlier). */
export function monthsBetween(from: YearMonth, to: YearMonth): number {
  return monthIndex(to) - monthIndex(from);
}

export function compareDates(a: LocalDate, b: LocalDate): number {
  return a.year - b.year || a.month - b.month || a.day - b.day;
}

export function toYearMonth(date: LocalDate): YearMonth {
  return { year: date.year, month: date.month };
}

/** Today's date in the troop's time zone. Pass `now` in tests. */
export function troopToday(now: Date = new Date()): LocalDate {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: TROOP_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: part('year'), month: part('month'), day: part('day') };
}
