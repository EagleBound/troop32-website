// Central source for repeated, confirmed Troop 32 facts.
//
// Change a fact here and it updates everywhere on the site.
// Only put CONFIRMED, PUBLIC information in this file. This repository is public.
// See docs/PRIVACY.md before adding anything.

export const site = {
  /** Normal public identity (see docs/CONTENT-GUIDE.md). */
  name: 'Troop 32',
  locality: 'Santa Rosa, California',
  organization: 'Scouting America',

  /** The two Scouting America troops that make up Troop 32. */
  units: {
    boys: 'Troop 32-B',
    girls: 'Troop 32-G',
  },

  /**
   * The Scoutmaster, shown publicly in the E0 adult-name form (Mr./Mrs. Last
   * Name), never a full name. `bio` holds reviewed paragraphs for
   * /about/scoutmaster/; while it is empty the page shows a short "more to
   * come" line. When the Scoutmaster changes, update `displayName` and `bio`.
   * See docs/DEVELOPMENT.md ("Update the Scoutmaster page").
   */
  scoutmaster: {
    displayName: 'Mr. Vickers',
    href: '/about/scoutmaster/',
    bio: [] as string[],
  },

  /**
   * The REGULAR weekly meeting. Approved as public information.
   * Never add outing, campout, travel, or temporary-change details here.
   */
  meeting: {
    day: 'Mondays',
    /** Singular form for phrases like "Visit a Monday meeting". */
    dayName: 'Monday',
    time: '7:00 PM',
    place: 'Santa Rosa Bible Church',
    street: '4575 Badger Road',
    city: 'Santa Rosa',
    state: 'California',
  },

  /**
   * Public role-based contact channel (approved). It forwards privately to the
   * current Scoutmaster; that forwarding is set up OUTSIDE this repository.
   * NEVER add the forwarding destination, a personal email address, or a phone
   * number anywhere in this repository. A Scoutmaster change normally means
   * changing the forwarding, not this file.
   */
  contact: {
    email: 'scoutmaster@troop32.org' as string | null,
  },

  /**
   * Official Scouting America pages the site links to. Verified 2026-10-07
   * (docs/PROJECT.md). Re-check them when content is reviewed.
   */
  official: {
    scoutsBsa: 'https://www.scouting.org/programs/scouts-bsa/',
    scoutsBsaFaq: 'https://www.scouting.org/programs/scouts-bsa/faqs/',
    youthProtection: 'https://www.scouting.org/training/safeguarding-youth/',
  },

  /**
   * Search-engine indexing. Keep false until the launch work package is
   * approved; also update public/robots.txt and public/_headers at launch.
   */
  indexable: false,
} as const;

/** Single-line meeting address, e.g. for directions. */
export const meetingAddress = `${site.meeting.street}, ${site.meeting.city}, ${site.meeting.state}`;

/** A plain directions link (not an embedded map, which would track visitors). */
export const directionsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(`${site.meeting.place}, ${meetingAddress}`);

/** Header navigation. `cta` marks the visually prominent item. */
export const navigation = [
  { href: '/about/', label: 'About' },
  { href: '/what-we-do/', label: 'What We Do' },
  { href: '/events/', label: 'Events' },
  { href: '/new-families/', label: 'New Families' },
  { href: '/join/', label: 'Join', cta: true },
] as const;
