// Astro content collections. See docs/DEVELOPMENT.md ("Add an event").
//
// events: one Markdown file per event in src/content/events/. The file name is
// the event's permanent URL slug. Schema: src/lib/events/schema.ts.
// Privacy rules: docs/PRIVACY.md → Events.
//
// In fixture mode only (scripts/fixtures.mjs), FICTIONAL test records from
// tests/fixtures/events/ are loaded instead. See src/lib/events/fixture-mode.ts.

import { defineCollection } from 'astro:content';
import { FIXTURE_MODE, fixtureToday } from './lib/events/fixture-mode.ts';
import { eventsLoader } from './lib/events/loader.ts';
import { buildEventSchema } from './lib/events/schema.ts';

const events = defineCollection({
  loader: FIXTURE_MODE
    ? eventsLoader({
        base: './tests/fixtures/events',
        photoLogPath: 'tests/fixtures/events/PHOTO-LOG.fixture.txt',
        today: fixtureToday(),
      })
    : eventsLoader(),
  schema: ({ image }) => buildEventSchema(image),
});

export const collections = { events };
