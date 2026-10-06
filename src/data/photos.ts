// Photo slots used around the site.
//
// Each slot shows an original illustrated placeholder (`scene`) until an
// APPROVED photo is added. To add a photo later:
//   1. Put the approved, EXIF-stripped image in src/assets/photos/.
//   2. Import it below and set `image` and a meaningful `alt` on the slot.
// Never add identifiable youth photos without an approved policy
// (see docs/PRIVACY.md).

import type { ImageMetadata } from 'astro';

export type SceneName = 'ridge' | 'forest' | 'lake' | 'campfire' | 'trail';

export interface PhotoSlot {
  /** Illustration shown while no approved photo exists. */
  scene: SceneName;
  /** Approved photo (optional). */
  image?: ImageMetadata;
  /** Alt text describing the approved photo. Required when `image` is set. */
  alt?: string;
  /** Short caption. Never name youth. */
  caption?: string;
}

export const photos = {
  outdoor: { scene: 'ridge', caption: 'Outdoor adventure' },
  leadership: { scene: 'campfire', caption: 'Scouts leading Scouts' },
  service: { scene: 'trail', caption: 'Service to the community' },
  gallery: [
    { scene: 'forest', caption: 'Camping' },
    { scene: 'lake', caption: 'On the water' },
    { scene: 'trail', caption: 'On the trail' },
    { scene: 'campfire', caption: 'Around the campfire' },
  ],
} satisfies Record<string, PhotoSlot | PhotoSlot[]>;
