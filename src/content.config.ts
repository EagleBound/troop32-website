// Astro content collections. See docs/DEVELOPMENT.md ("Add an event").
//
// events: one Markdown file per event in src/content/events/. The file name is
// the event's permanent URL slug. Schema: src/lib/events/schema.ts.
// Privacy rules: docs/PRIVACY.md → Events.

import { defineCollection } from 'astro:content';
import { eventsLoader } from './lib/events/loader.ts';
import { buildEventSchema } from './lib/events/schema.ts';

const events = defineCollection({
  loader: eventsLoader(),
  schema: ({ image }) => buildEventSchema(image),
});

export const collections = { events };
