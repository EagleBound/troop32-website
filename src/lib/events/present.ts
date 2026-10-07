// THE PUBLIC-PRESENTATION BOUNDARY for events.
//
// Pages and components never receive a raw event record. They receive a
// PublicEvent built here from an ALLOWLIST of fields. `uid`, `review`,
// `publicDesignation`, `draft`, and anything else not copied below can't reach
// the page.
//
// This file only formats what the validated record already contains. It never
// invents or reconstructs details: an ordinary event's month never becomes a
// day, and public schedule details appear only as docs/PRIVACY.md and the E2
// decisions allow for the event's status.
//
// No Astro imports, so it can be tested with `node --test`.

import { eventStatusLabel } from './classify.ts';
import type { ClassifiableEvent } from './classify.ts';
import { parseIsoDate, parseYearMonth } from './months.ts';

/** Views that have public pages. */
export type PublicView = 'upcoming' | 'recent' | 'archive';

/** The record fields this module reads. Everything else is ignored. */
export interface EventRecord<TImage> extends ClassifiableEvent {
  summary: string;
  designation?: 'ordinary' | 'public-community';
  destination?: string;
  publicDetails?: {
    date?: string;
    startTime?: string;
    endTime?: string;
    venue?: { name: string; address?: string };
    venueToBeAnnounced?: boolean;
    participation?: string;
  };
  cover?: RecordPhoto<TImage>;
  gallery?: RecordPhoto<TImage>[];
}

interface RecordPhoto<TImage> {
  src: TImage;
  alt: string;
  caption?: string;
  focus?: { x?: number; y?: number };
}

export interface PublicPhoto<TImage> {
  src: TImage;
  alt: string;
  caption?: string;
  focus?: { x?: number; y?: number };
}

export interface PublicEvent<TImage = unknown> {
  slug: string;
  href: string;
  title: string;
  summary: string;
  status: ClassifiableEvent['status'];
  view: PublicView;
  /** Year used to group the Archive (the event's last month). */
  year: number;
  /** Status badge text, if any. */
  badge?: string;
  /** Date line: `prefix` + `text`, with a machine-readable `datetime` for <time>. */
  when: { prefix?: string; text: string; datetime: string };
  destination?: string;
  /** Public-community events only, already reduced to what this status may show. */
  publicInfo?: {
    time?: string;
    venueName?: string;
    venueAddress?: string;
    /** Planned event whose venue isn't decided yet (shown as "To be announced"). */
    venueToBeAnnounced?: true;
    participation?: string;
  };
  cover?: PublicPhoto<TImage>;
  gallery: PublicPhoto<TImage>[];
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "2027-07" → "July 2027". */
export function formatMonth(value: string): string {
  const { year, month } = parseYearMonth(value);
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

/** "June–July 2027", or "December 2026 – January 2027". */
export function formatMonthRange(start: string, end?: string): string {
  if (!end || end === start) return formatMonth(start);
  const a = parseYearMonth(start);
  const b = parseYearMonth(end);
  if (a.year === b.year) return `${MONTH_NAMES[a.month - 1]}–${MONTH_NAMES[b.month - 1]} ${a.year}`;
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

/** "2027-03-06" → "Saturday, March 6, 2027". Computed in UTC so the day can't shift. */
export function formatPublicDate(value: string): string {
  const { year, month, day } = parseIsoDate(value);
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

/** "08:00" → "8:00 AM"; "00:00" → "12:00 AM"; "12:00" → "12:00 PM". */
export function formatTime(value: string): string {
  const [hours, minutes] = value.split(':').map(Number);
  const suffix = hours < 12 ? 'AM' : 'PM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(minutes).padStart(2, '0')} ${suffix}`;
}

/** "8:00 AM – 11:00 AM", or a single time. */
export function formatTimeRange(start?: string, end?: string): string | undefined {
  if (start && end) return `${formatTime(start)} – ${formatTime(end)}`;
  if (start) return formatTime(start);
  if (end) return `Until ${formatTime(end)}`;
  return undefined;
}

function copyPhoto<TImage>(photo: RecordPhoto<TImage>): PublicPhoto<TImage> {
  return {
    src: photo.src,
    alt: photo.alt,
    ...(photo.caption ? { caption: photo.caption } : {}),
    ...(photo.focus ? { focus: { ...photo.focus } } : {}),
  };
}

/**
 * Public schedule details by status (E2 decision Q3), public-community events only:
 * - planned:   date, time, venue name and address (or "to be announced"), participation
 * - postponed / cancelled: date and venue name; no time, address, or participation
 * - completed: date and venue name (history); no time, address, or participation
 */
function publicInfoFor(record: EventRecord<unknown>): PublicEvent['publicInfo'] {
  const details = record.publicDetails;
  if (record.designation !== 'public-community' || !details) return undefined;

  const info: NonNullable<PublicEvent['publicInfo']> = {};
  if (details.venue?.name) info.venueName = details.venue.name;
  if (record.status === 'planned') {
    const time = formatTimeRange(details.startTime, details.endTime);
    if (time) info.time = time;
    if (details.venue?.address) info.venueAddress = details.venue.address;
    if (details.venueToBeAnnounced && !details.venue) info.venueToBeAnnounced = true;
    if (details.participation) info.participation = details.participation;
  }
  return Object.keys(info).length > 0 ? info : undefined;
}

export function toPublicEvent<TImage>(slug: string, record: EventRecord<TImage>, view: PublicView): PublicEvent<TImage> {
  const isPublic = record.designation === 'public-community';
  // An exact date is shown only when a public-community event's record has one.
  const exactDate = isPublic ? record.publicDetails?.date : undefined;

  const when: PublicEvent['when'] = exactDate
    ? { text: formatPublicDate(exactDate), datetime: exactDate }
    : { text: formatMonthRange(record.month, record.endMonth), datetime: record.month };
  if (record.status === 'postponed') when.prefix = 'Originally planned for';
  if (record.status === 'cancelled') when.prefix = 'Was planned for';

  const badge = eventStatusLabel(record) ?? (isPublic && record.status === 'planned' ? 'Open to the public' : undefined);
  const publicInfo = publicInfoFor(record);

  return {
    slug,
    href: `/events/${slug}/`,
    title: record.title,
    summary: record.summary,
    status: record.status,
    view,
    year: parseYearMonth(record.endMonth ?? record.month).year,
    ...(badge ? { badge } : {}),
    when,
    ...(record.destination ? { destination: record.destination } : {}),
    ...(publicInfo ? { publicInfo } : {}),
    ...(record.cover ? { cover: copyPhoto(record.cover) } : {}),
    gallery: (record.gallery ?? []).map(copyPhoto),
  };
}

export const TEASER_LIMIT = 3;

/**
 * Events for the homepage "Recent adventures" teaser: the first `limit` items
 * of the already-classified Recent Adventures view (completed, under 12
 * months, newest first). No classification happens here. Upcoming events,
 * including public-community ones, are never featured on the homepage; they
 * appear under Upcoming on /events/. Anything not in the Recent view is
 * dropped as a safeguard. Empty → the section is omitted.
 */
export function selectTeaserEvents<T extends Pick<PublicEvent, 'view'>>(
  recent: readonly T[],
  limit: number = TEASER_LIMIT,
): T[] {
  return recent.filter((event) => event.view === 'recent').slice(0, limit);
}

/** Archive groups, newest year first. Keeps the order of `events` within a year. */
export function groupByYear<T extends { year: number }>(events: readonly T[]): { year: number; events: T[] }[] {
  const groups = new Map<number, T[]>();
  for (const event of events) groups.set(event.year, [...(groups.get(event.year) ?? []), event]);
  return [...groups.entries()].sort(([a], [b]) => b - a).map(([year, list]) => ({ year, events: list }));
}
