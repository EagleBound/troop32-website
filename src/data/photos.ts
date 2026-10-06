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
// Illustrations are intentionally kept in slots that a future Troop 32 photo
// collection (service, weekend camping, high adventure, fundraisers, meetings)
// will tell better. Don't fill a slot just because a photo exists.

import type { ImageMetadata } from 'astro';
import heroTrailWalk from '../assets/photos/hero-trail-walk-01.jpg';
import patrolHuddle from '../assets/photos/leadership-patrol-huddle-01.jpg';
import sailing from '../assets/photos/water-sailing-01.jpg';

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
}

const MELITA_2026 = 'Melita Island 2026';

export const photos = {
  /** Homepage hero background (decorative; the heading carries the message). */
  hero: { scene: 'ridge', image: heroTrailWalk, alt: '', event: MELITA_2026 },

  /** Homepage "three things Scouting does well" cards. */
  home: {
    // Future: a backpacking or high-adventure trail photo (Philmont, Northern Tier, Sierra).
    outdoor: { scene: 'ridge' },
    leadership: {
      scene: 'campfire',
      image: patrolHuddle,
      alt: 'A patrol of Scouts in a huddle, arms around each other, beneath the American flag and the Troop 32 flag.',
      focus: { x: 50, y: 20 },
      event: MELITA_2026,
    },
    // Future: a real Troop 32 service project. Never substitute an unrelated photo.
    service: { scene: 'trail' },
  },

  /** What We Do page sections. */
  whatWeDo: {
    outdoors: {
      scene: 'ridge',
      image: sailing,
      alt: 'Scouts in life jackets sailing a small sailboat across a wide, forested lake.',
      focus: { x: 50, y: 30 },
      event: MELITA_2026,
    },
    // Future: an ordinary troop moment, such as a patrol cooking at a weekend campout or an older Scout teaching a skill.
    leadership: { scene: 'campfire' },
    // Future: a different service or community photo from the homepage one (e.g. a fundraiser or community event).
    service: { scene: 'trail' },
  },

  /**
   * Homepage photo mosaic. Hidden until it holds at least 4 approved photos
   * from at least 3 different events (see `galleryIsReady`).
   */
  gallery: [] as PhotoSlot[],
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
