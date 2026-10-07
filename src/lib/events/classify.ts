// Decides where an event appears: Upcoming, Recent Adventures, or the
// Troop 32 Archive (docs/PRIVACY.md → Recency and retention).
//
// The site is static, so this runs when the site is BUILT. Views only change
// at the next build.

import { compareDates, monthIndex, monthsBetween, parseIsoDate, parseYearMonth, toYearMonth } from './months.ts';
import type { LocalDate } from './months.ts';

/** Completed events younger than this many months are Recent; older ones are Archive. */
export const RECENT_WINDOW_MONTHS = 12;

export type EventView = 'upcoming' | 'recent' | 'archive' | 'needs-update' | 'hidden';

/** The fields classification needs. Astro entries pass `entry.data`. */
export interface ClassifiableEvent {
  title: string;
  status: 'planned' | 'completed' | 'cancelled' | 'postponed';
  month: string;
  endMonth?: string;
  draft?: boolean;
  publicDetails?: { date?: string };
}

function endMonthOf(event: ClassifiableEvent) {
  return parseYearMonth(event.endMonth ?? event.month);
}

/**
 * - draft → hidden
 * - planned → upcoming until its month ends (or its exact public date passes),
 *   then needs-update. A past event is never assumed to have happened.
 * - postponed → upcoming ("new date to be announced"), whatever its month.
 * - cancelled → upcoming (labeled) through its month, then hidden.
 * - completed → recent for under 12 months after its (end) month, then archive.
 *   A "completed" event in a future month is inconsistent → needs-update.
 */
export function classifyEvent(event: ClassifiableEvent, today: LocalDate): EventView {
  if (event.draft) return 'hidden';

  const age = monthsBetween(endMonthOf(event), toYearMonth(today)); // months since the event's last month

  switch (event.status) {
    case 'planned': {
      if (event.publicDetails?.date) {
        return compareDates(parseIsoDate(event.publicDetails.date), today) >= 0 ? 'upcoming' : 'needs-update';
      }
      return age <= 0 ? 'upcoming' : 'needs-update';
    }
    case 'postponed':
      return 'upcoming';
    case 'cancelled':
      return age <= 0 ? 'upcoming' : 'hidden';
    case 'completed':
      if (age < 0) return 'needs-update';
      return age < RECENT_WINDOW_MONTHS ? 'recent' : 'archive';
  }
}

/** Status label shown with an Upcoming listing, if any. */
export function eventStatusLabel(event: Pick<ClassifiableEvent, 'status'>): string | undefined {
  if (event.status === 'postponed') return 'Postponed; new date to be announced';
  if (event.status === 'cancelled') return 'Cancelled';
  return undefined;
}

export interface EventViews<T> {
  upcoming: T[];
  recent: T[];
  archive: T[];
  needsUpdate: T[];
}

/**
 * Sorts events into views. Upcoming is soonest first; Recent and Archive are
 * newest first; ties are broken by title.
 */
export function selectEventViews<T>(
  items: readonly T[],
  today: LocalDate,
  toEvent: (item: T) => ClassifiableEvent,
): EventViews<T> {
  const views: EventViews<T> = { upcoming: [], recent: [], archive: [], needsUpdate: [] };
  for (const item of items) {
    const view = classifyEvent(toEvent(item), today);
    if (view === 'upcoming') views.upcoming.push(item);
    else if (view === 'recent') views.recent.push(item);
    else if (view === 'archive') views.archive.push(item);
    else if (view === 'needs-update') views.needsUpdate.push(item);
  }

  const startKey = (e: ClassifiableEvent) => {
    if (e.publicDetails?.date) {
      const d = parseIsoDate(e.publicDetails.date);
      return monthIndex(d) * 100 + d.day;
    }
    return monthIndex(parseYearMonth(e.month)) * 100;
  };
  const endKey = (e: ClassifiableEvent) => monthIndex(endMonthOf(e));
  const byTitle = (a: T, b: T) => toEvent(a).title.localeCompare(toEvent(b).title);

  views.upcoming.sort((a, b) => startKey(toEvent(a)) - startKey(toEvent(b)) || byTitle(a, b));
  const newestFirst = (a: T, b: T) => endKey(toEvent(b)) - endKey(toEvent(a)) || byTitle(a, b);
  views.recent.sort(newestFirst);
  views.archive.sort(newestFirst);
  return views;
}
