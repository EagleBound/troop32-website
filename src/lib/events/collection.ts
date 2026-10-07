// Astro-facing access to events for pages. Classification comes only from
// classify.ts (selectEventViews); public data comes only through present.ts
// (toPublicEvent). Pages receive PublicEvent objects, never raw records.

import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import { selectEventViews } from './classify.ts';
import { fixtureToday } from './fixture-mode.ts';
import { troopToday } from './months.ts';
import { selectTeaserEvents, toPublicEvent } from './present.ts';
import type { PublicEvent, PublicView } from './present.ts';

export type SiteEvent = PublicEvent<ImageMetadata>;

/** "Today" for this build: the troop's date, or the fixed date in fixture mode. */
function buildToday() {
  return fixtureToday() ?? troopToday();
}

async function classified() {
  const entries = await getCollection('events');
  return selectEventViews(entries, buildToday(), (entry) => entry.data);
}

function present(entries: CollectionEntry<'events'>[], view: PublicView): SiteEvent[] {
  return entries.map((entry) => toPublicEvent(entry.id, entry.data, view));
}

/** Events for each public view, already sorted. */
export async function getEventViews(): Promise<Record<PublicView, SiteEvent[]>> {
  const views = await classified();
  return {
    upcoming: present(views.upcoming, 'upcoming'),
    recent: present(views.recent, 'recent'),
    archive: present(views.archive, 'archive'),
  };
}

/** Events for the homepage teaser (may be empty: then the section is omitted). */
export async function getHomepageTeaser(): Promise<SiteEvent[]> {
  return selectTeaserEvents(await getEventViews());
}

/**
 * One detail page per event that appears in a public view. Drafts,
 * needs-update events, and past cancelled events get no page (their URLs 404).
 */
export async function getEventPages() {
  const views = await classified();
  const pages = [];
  for (const view of ['upcoming', 'recent', 'archive'] as const) {
    for (const entry of views[view]) {
      const { Content } = await render(entry);
      pages.push({ params: { slug: entry.id }, props: { event: toPublicEvent(entry.id, entry.data, view), Content } });
    }
  }
  return pages;
}
