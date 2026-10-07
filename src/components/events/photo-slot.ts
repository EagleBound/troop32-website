// Adapts a public event photo to the shared PhotoFrame component, so event
// photos use the same responsive images, crops, and captions as the rest of the site.
import type { ImageMetadata } from 'astro';
import type { FocusStep, PhotoSlot } from '../../data/photos';
import type { PublicPhoto } from '../../lib/events/present';

export function toPhotoSlot(photo: PublicPhoto<ImageMetadata>): PhotoSlot {
  return {
    scene: 'trail', // never shown: an event photo always has an image
    image: photo.src,
    alt: photo.alt,
    caption: photo.caption,
    focus: { x: photo.focus?.x as FocusStep | undefined, y: photo.focus?.y as FocusStep | undefined },
  };
}
