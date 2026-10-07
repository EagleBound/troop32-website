// Build-time checks across all event records, beyond what the schema can see.
//
// ERRORS fail the build. WARNINGS are printed for the Webmaster to review.
//
// Deliberately NOT checked automatically: youth names in slugs or text, full
// last names, and whether a person is a Scout or an adult. No pattern can do
// that without constant false alarms or a roster, and E0 rules out a roster.
// Those stay with the human `review` (docs/PRIVACY.md → Scout or adult?).

import { classifyEvent } from './classify.ts';
import type { ClassifiableEvent } from './classify.ts';
import type { LocalDate } from './months.ts';
import { GALLERY_RECOMMENDED_MAX } from './schema.ts';

export interface CheckableEvent {
  /** Entry id = filename without ".md" = permanent URL slug. */
  id: string;
  data: ClassifiableEvent & {
    uid: string;
    designation?: 'ordinary' | 'public-community';
    cover?: { src: unknown };
    gallery?: { src: unknown }[];
  };
  /** Full raw file text (frontmatter and body), for the text scans. */
  text: string;
}

export interface CheckResult {
  errors: string[];
  warnings: string[];
}

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const SLUG_MAX_LENGTH = 60;

const GOOGLE_DRIVE_PATTERN = /\b(?:drive|docs)\.google\.com\b/i;
const EMAIL_PATTERN = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
// North American numbers written with separators: (707) 555-0100, 707-555-0100, 707.555.0100, +1 707 555 0100.
const PHONE_PATTERN = /(?:\+?1[\s.-]?)?(?:\(\d{3}\)\s?|\b\d{3}[\s.-])\d{3}[\s.-]\d{4}\b/;
// Clock times (7:30, 19:30, 7 PM, 7:30 a.m.) and "Month day" dates (July 14, Jul. 14).
const CLOCK_TIME_PATTERN = /\b(?:[01]?\d|2[0-3]):[0-5]\d\b|\b(?:1[0-2]|0?[1-9])\s?(?:a\.?m\.?|p\.?m\.?)(?![a-z])/i;
const MONTH_DAY_PATTERN =
  /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|June?|July?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\.?\s+(?:[12]\d|3[01]|0?[1-9])(?:st|nd|rd|th)?\b/;

/** Photo filenames that have a "#### `name.jpg`" entry in PHOTO-LOG.md. */
export function photoLogEntries(photoLogText: string): Set<string> {
  return new Set([...photoLogText.matchAll(/^#### `([^`]+)`/gm)].map((m) => m[1]));
}

/** File name of an image field, whatever form Astro stored it in. */
export function imageFileName(src: unknown): string | undefined {
  if (typeof src === 'string') return src.split(/[\\/]/).pop()?.split('?')[0];
  if (src && typeof src === 'object' && 'src' in src) return imageFileName((src as { src: unknown }).src);
  return undefined;
}

export function checkEvents(
  events: readonly CheckableEvent[],
  options: { photoLogText: string; today: LocalDate },
): CheckResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const logged = photoLogEntries(options.photoLogText);
  const uids = new Map<string, string>();

  for (const event of events) {
    const where = `events/${event.id}`;
    const { data } = event;
    const isPublic = data.designation === 'public-community';

    // Slug: permanent URL. Kebab-case, short. Including the year is recommended, not required.
    if (!SLUG_PATTERN.test(event.id) || event.id.length > SLUG_MAX_LENGTH) {
      errors.push(`${where}: file name must be lowercase kebab-case, at most ${SLUG_MAX_LENGTH} characters (it becomes the permanent URL).`);
    }

    const other = uids.get(data.uid);
    if (other) errors.push(`${where}: uid "${data.uid}" is already used by events/${other}. Every event needs its own uid.`);
    else uids.set(data.uid, event.id);

    // Photos must have a privacy review and approval recorded in PHOTO-LOG.md.
    const photos = [...(data.cover ? [data.cover] : []), ...(data.gallery ?? [])];
    for (const photo of photos) {
      const name = imageFileName(photo.src);
      if (!name || !logged.has(name)) {
        errors.push(`${where}: photo "${name ?? '(unknown)'}" has no entry in docs/PHOTO-LOG.md. Record its review and approval first.`);
      }
    }
    if ((data.gallery?.length ?? 0) > GALLERY_RECOMMENDED_MAX) {
      warnings.push(`${where}: gallery has ${data.gallery?.length} photos. Aim for 6–${GALLERY_RECOMMENDED_MAX} strong ones (hard maximum 20).`);
    }

    const view = classifyEvent(data, options.today);
    if (data.status === 'completed' && view === 'needs-update') {
      errors.push(`${where}: marked completed, but its month hasn't happened yet.`);
    } else if (view === 'needs-update') {
      warnings.push(`${where}: planned event whose date has passed. Mark it completed, cancelled, or postponed. It is hidden until then.`);
    }

    // Text scans over the whole file.
    if (GOOGLE_DRIVE_PATTERN.test(event.text)) {
      errors.push(`${where}: contains a Google Drive/Docs link. Drive links and IDs never go in this public repository.`);
    }
    for (const [label, pattern] of [['email address', EMAIL_PATTERN], ['phone number', PHONE_PATTERN]] as const) {
      if (!pattern.test(event.text)) continue;
      if (isPublic) warnings.push(`${where}: contains a ${label}. Confirm it is an intentionally public contact for this public event.`);
      else errors.push(`${where}: contains a ${label}. Contact details don't belong in an ordinary troop event.`);
    }
    if (!isPublic) {
      if (CLOCK_TIME_PATTERN.test(event.text)) {
        warnings.push(`${where}: mentions a clock time. Ordinary events shouldn't show unnecessary exact times.`);
      }
      if (MONTH_DAY_PATTERN.test(event.text)) {
        warnings.push(`${where}: mentions an exact date. Ordinary events normally show only the month and year.`);
      }
    }
  }

  return { errors, warnings };
}
