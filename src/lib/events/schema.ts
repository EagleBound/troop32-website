// Schema for one event record (src/content/events/<slug>.md).
//
// PRIVACY FIRST: every object here is STRICT. Any field not listed below fails
// the build, so private troop logistics (rendezvous points, departure times,
// drivers, attendee lists, patrols, itineraries, Drive links...) have nowhere to
// go. Don't add fields like that. They never belong in this public repository,
// even unrendered, and even in a draft. See docs/PRIVACY.md → Events.
//
// The image helper is passed in (Astro's `image()` in src/content.config.ts) so
// tests can run this schema with plain Node.

import { z } from 'astro/zod';
import {
  ISO_DATE_PATTERN,
  TIME_PATTERN,
  YEAR_MONTH_PATTERN,
  isIsoDate,
  isYearMonth,
  monthIndex,
  parseIsoDate,
  parseYearMonth,
} from './months.ts';

export const EVENT_STATUSES = ['planned', 'completed', 'cancelled', 'postponed'] as const;
export const EVENT_DESIGNATIONS = ['ordinary', 'public-community'] as const;

/** Roles that may authorize a public/community designation (E1 decision Q4). */
export const DESIGNATION_ROLES = ['scoutmaster', 'committee-chair', 'designated-adult-leader'] as const;

/** Roles that may record the required human review of a published event. */
export const REVIEW_ROLES = ['webmaster', 'adult-project-lead'] as const;

/** Hard gallery maximum (E0). More than GALLERY_RECOMMENDED_MAX only warns. */
export const GALLERY_HARD_MAX = 20;
export const GALLERY_RECOMMENDED_MAX = 12;

export const UID_PATTERN = /^evt-[a-z0-9]{8}$/;

// The frontmatter YAML parser turns an unquoted 2027-07-14 into a Date.
// Accept that, and store every date as a "YYYY-MM-DD" string.
const isoDate = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z
    .string()
    .regex(ISO_DATE_PATTERN, 'Use a date like "2027-07-14".')
    .refine(isIsoDate, 'Not a real calendar date.'),
);

const yearMonth = z.string().regex(YEAR_MONTH_PATTERN, 'Use a month like "2027-07" (quoted).');
const time = z.string().regex(TIME_PATTERN, 'Use a 24-hour time like "09:30" (quoted).');
const focusStep = z.number().int().min(0).max(100).multipleOf(10);

export function buildEventSchema<TImage extends z.ZodType>(image: () => TImage) {
  const photo = z.strictObject({
    src: image(),
    /** Required. Describe the photo; don't name individual youth. */
    alt: z.string().trim().min(1, 'Every event image needs alt text.'),
    /** Optional. A Scout named here appears as real First L. only. */
    caption: z.string().trim().min(1).max(140).optional(),
    focus: z.strictObject({ x: focusStep.optional(), y: focusStep.optional() }).optional(),
  });

  return z
    .strictObject({
      /** Permanent identifier for linking future member-area data. Never change or reuse. */
      uid: z.string().regex(UID_PATTERN, 'Use "evt-" plus 8 lowercase letters/digits, e.g. "evt-k3m9q2zt".'),
      title: z.string().trim().min(1).max(90),
      summary: z.string().trim().min(1).max(280),
      status: z.enum(EVENT_STATUSES),
      /** Start month. For a postponed event, the original month. */
      month: yearMonth,
      /** Last month of an event that spans months. */
      endMonth: yearMonth.optional(),
      /** Not rendered. NOT private: the repository is public. */
      draft: z.boolean().default(false),
      designation: z.enum(EVENT_DESIGNATIONS).default('ordinary'),
      /** Who authorized the public/community designation. Required for, and only for, public-community events. */
      publicDesignation: z
        .strictObject({ approvedByRole: z.enum(DESIGNATION_ROLES), approvedOn: isoDate })
        .optional(),
      /** The ONLY place for an exact public schedule. Public-community events only. */
      publicDetails: z
        .strictObject({
          date: isoDate.optional(),
          startTime: time.optional(),
          endTime: time.optional(),
          venue: z
            .strictObject({
              name: z.string().trim().min(1).max(120),
              address: z.string().trim().min(1).max(200).optional(),
            })
            .optional(),
          /** Admission, how to take part, or how to help. */
          participation: z.string().trim().min(1).max(500).optional(),
        })
        .optional(),
      /** General place or well-known destination, e.g. "Melita Island". Never a private meeting point. */
      destination: z.string().trim().min(1).max(80).optional(),
      cover: photo.optional(),
      gallery: z.array(photo).max(GALLERY_HARD_MAX, `A gallery may hold at most ${GALLERY_HARD_MAX} photos.`).optional(),
      /** Human review of names, captions, Scout/adult naming, and the public/private boundary. */
      review: z.strictObject({ reviewedByRole: z.enum(REVIEW_ROLES), reviewedOn: isoDate }).optional(),
    })
    .superRefine((event, ctx) => {
      const issue = (path: string, message: string) => ctx.addIssue({ code: 'custom', path: [path], message });
      const isPublic = event.designation === 'public-community';

      // Zod still runs this check when a field above failed, so guard every parse.
      const monthsValid = isYearMonth(event.month) && (!event.endMonth || isYearMonth(event.endMonth));
      const start = monthsValid ? monthIndex(parseYearMonth(event.month)) : NaN;
      const end = monthsValid && event.endMonth ? monthIndex(parseYearMonth(event.endMonth)) : start;
      if (end < start) issue('endMonth', '`endMonth` cannot be before `month`.');

      if (isPublic && !event.publicDesignation) {
        issue('publicDesignation', 'A public-community event must record who authorized the designation.');
      }
      if (!isPublic && event.publicDesignation) {
        issue('publicDesignation', 'Only public-community events have a `publicDesignation`.');
      }
      if (!isPublic && event.publicDetails) {
        issue('publicDetails', 'Exact public details are allowed only for leadership-designated public-community events.');
      }

      const details = event.publicDetails;
      if (monthsValid && typeof details?.date === 'string' && isIsoDate(details.date)) {
        const d = parseIsoDate(details.date);
        const m = monthIndex({ year: d.year, month: d.month });
        if (m < start || m > end) issue('publicDetails', '`publicDetails.date` must fall within the event month(s).');
      }
      if (details?.startTime && details.endTime && details.endTime <= details.startTime) {
        issue('publicDetails', '`endTime` must be after `startTime`.');
      }

      if (event.gallery && event.status !== 'completed') {
        issue('gallery', 'Only completed events have a gallery. A planned event may use a `cover` photo.');
      }
      if (!event.draft && !event.review) {
        issue('review', 'A published (non-draft) event needs a recorded human `review`.');
      }
    });
}
