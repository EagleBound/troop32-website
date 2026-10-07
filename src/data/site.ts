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

  /** Approved public fact (docs/PROJECT.md). */
  scoutmaster: 'James Vickers',

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
   * Public role-based contact channel.
   * PENDING leadership confirmation. Leave as null until an official troop
   * address is approved. Never use a personal email address or phone number.
   */
  contact: {
    email: null as string | null,
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
