// Photo slots used around the site.
//
// Each page section has its OWN slot, so a photo chosen for one place never
// appears somewhere else by accident. A slot shows an original illustration
// (`scene`) until an APPROVED photo is added.
//
// Only approved, sanitized derivatives belong in src/assets/photos/.
// Every published photo must have an entry in docs/PHOTO-LOG.md.
// See docs/DEVELOPMENT.md ("Add an approved photo") and docs/PRIVACY.md.
//
// Keep the site balanced across events: each photo is used once, and no single
// event should dominate a page. docs/PHOTO-LOG.md ("Where each photo is used")
// lists the current arrangement. Don't fill a slot just because a photo exists.

import type { ImageMetadata } from 'astro';
import heroTrailWalk from '../assets/photos/hero-trail-walk-01.jpg';
import patrolHuddle from '../assets/photos/leadership-patrol-huddle-01.jpg';
import sailing from '../assets/photos/water-sailing-01.jpg';
import sledHaul from '../assets/photos/winter-sled-haul-01.jpg';
import pancakeLine from '../assets/photos/kitchen-pancake-line-01.jpg';
import trailFence from '../assets/photos/service-trail-fence-01.jpg';
import planterBench from '../assets/photos/service-planter-bench-01.jpg';
import trailBreak from '../assets/photos/backpacking-trail-break-01.jpg';
import summit from '../assets/photos/summit-panorama-01.jpg';
import tentPitching from '../assets/photos/camp-tent-pitching-01.jpg';
import sleepingOutdoors from '../assets/photos/camp-sleeping-outdoors-01.jpg';

export type SceneName = 'ridge' | 'forest' | 'lake' | 'campfire' | 'trail';

/** Focal point in 10% steps (0 = left/top, 100 = right/bottom). */
export type FocusStep = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

export interface PhotoSlot {
  /** Illustration shown while no approved photo exists. */
  scene: SceneName;
  /** Approved photo (optional). */
  image?: ImageMetadata;
  /** Alt text. Required when `image` is set; use '' only for decorative images. */
  alt?: string;
  /** Short caption. Never name youth. */
  caption?: string;
  /** Where the important part of the photo is, used when the frame crops it. */
  focus?: { x?: FocusStep; y?: FocusStep };
  /** Source collection (from docs/PHOTO-LOG.md). Used to keep the site balanced across events. */
  event?: string;
  /** Homepage mosaic tile shape. 'wide' spans two columns and suits panoramic photos. Default: square. */
  tile?: 'square' | 'wide';
}

const MELITA_2026 = 'Melita Island 2026';
const PHILMONT_2026 = 'Philmont 2026';
const EAGLE_PROJECTS_2026 = 'Eagle service projects 2026';
const SNOW_CAMPING_2026 = 'Snow camping 2026';
const PANCAKE_BREAKFAST_2026 = 'Pancake breakfast 2026';
const CHILL_OUTING_2026 = 'Chill Outing 2026';

export const photos = {
  /** Homepage hero background (decorative; the heading carries the message). */
  hero: { scene: 'ridge', image: heroTrailWalk, alt: '', event: MELITA_2026 },

  /** Homepage "three things Scouting does well" cards (portrait frames). */
  home: {
    outdoor: {
      scene: 'ridge',
      image: sledHaul,
      alt: 'Scouts in green Troop 32 shirts haul orange sleds up a snowy slope toward a rocky mountain peak.',
      focus: { x: 40, y: 70 },
      event: SNOW_CAMPING_2026,
    },
    leadership: {
      scene: 'campfire',
      image: pancakeLine,
      alt: 'A Scout in a Troop 32 shirt, apron, and gloves plates pancakes and sausages on a busy kitchen serving line.',
      focus: { x: 50, y: 50 },
      event: PANCAKE_BREAKFAST_2026,
    },
    service: {
      scene: 'trail',
      image: trailFence,
      alt: 'Scouts in Troop 32 caps set a wooden post for a split-rail fence beside a hillside trail.',
      focus: { x: 60, y: 50 },
      event: EAGLE_PROJECTS_2026,
    },
  },

  /** What We Do page sections. */
  whatWeDo: {
    outdoors: {
      scene: 'ridge',
      image: trailBreak,
      alt: 'A line of Scouts carrying backpacks pauses on a mountain trail to drink water under a cloudy sky.',
      focus: { x: 40, y: 50 },
      event: PHILMONT_2026,
    },
    leadership: {
      scene: 'campfire',
      image: patrolHuddle,
      alt: 'A patrol of Scouts in a huddle, arms around each other, beneath the American flag and the Troop 32 flag.',
      focus: { x: 50, y: 20 },
      event: MELITA_2026,
    },
    service: {
      scene: 'trail',
      image: planterBench,
      alt: 'Scouts and an adult volunteer lift a newly built wooden planter bench into place in a courtyard.',
      focus: { x: 50, y: 50 },
      event: EAGLE_PROJECTS_2026,
    },
  },

  /**
   * Homepage photo mosaic. Hidden until it holds at least 4 approved photos
   * from at least 3 different events (see `galleryIsReady`).
   *
   * Order matters for the layout: wide + square, then square + wide. On wide
   * screens that puts the two panoramas on opposite sides; on phones each wide
   * tile gets its own row and the two squares sit side by side.
   */
  gallery: [
    {
      scene: 'ridge',
      image: summit,
      alt: 'A Scout and an adult leader sit on a rocky mountain summit above a wide plain that stretches to the horizon.',
      caption: 'Summit day, Philmont Scout Ranch',
      focus: { x: 50, y: 60 },
      event: PHILMONT_2026,
      tile: 'wide',
    },
    {
      scene: 'campfire',
      image: sleepingOutdoors,
      alt: 'Scouts in sleeping bags on tarps across a grassy hillside at dusk, settling in to sleep outdoors.',
      caption: 'Sleeping under the stars',
      focus: { x: 50, y: 60 },
      event: CHILL_OUTING_2026,
    },
    {
      scene: 'lake',
      image: sailing,
      alt: 'Scouts in life jackets sailing a small sailboat across a wide, forested lake.',
      caption: 'Sailing',
      focus: { x: 50, y: 30 },
      event: MELITA_2026,
    },
    {
      scene: 'forest',
      image: tentPitching,
      alt: 'Scouts work together to raise a large tent in a field of tall golden grass.',
      caption: 'Setting up camp',
      focus: { x: 40, y: 60 },
      event: CHILL_OUTING_2026,
      tile: 'wide',
    },
  ] as PhotoSlot[],
} satisfies {
  hero: PhotoSlot;
  home: Record<string, PhotoSlot>;
  whatWeDo: Record<string, PhotoSlot>;
  gallery: PhotoSlot[];
};

/** True when the homepage mosaic has enough variety to be shown. */
export function galleryIsReady(gallery: PhotoSlot[] = photos.gallery): boolean {
  const approved = gallery.filter((slot) => slot.image);
  const events = new Set(approved.map((slot) => slot.event).filter(Boolean));
  return approved.length >= 4 && events.size >= 3;
}
