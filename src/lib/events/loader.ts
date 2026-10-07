// Loads event records with Astro's glob loader, then runs the build-time
// checks in checks.ts. Errors stop the build; warnings are printed.
//
// Note: in `astro dev`, edits to an event reload that file but don't rerun
// these cross-event checks. `npm run build` always runs them.

import { readFile } from 'node:fs/promises';
import { glob } from 'astro/loaders';
import type { Loader } from 'astro/loaders';
import { checkEvents } from './checks.ts';
import type { CheckableEvent } from './checks.ts';
import { troopToday } from './months.ts';
import type { LocalDate } from './months.ts';

export const EVENTS_BASE = './src/content/events';
export const PHOTO_LOG_PATH = 'docs/PHOTO-LOG.md';

export interface EventsLoaderOptions {
  /** Folder of event files. Default: the real src/content/events. */
  base?: string;
  /** Photo approval record the photo check uses. Default: docs/PHOTO-LOG.md. */
  photoLogPath?: string;
  /** Date the checks treat as today. Default: today in the troop's time zone. */
  today?: LocalDate;
}

export function eventsLoader(options: EventsLoaderOptions = {}): Loader {
  const base = glob({
    pattern: '**/*.md',
    base: options.base ?? EVENTS_BASE,
    // Keep the file name exactly as written (no automatic slugifying), so the
    // slug check sees the real file name. "eagle-project-trail-bench-2027.md" → "eagle-project-trail-bench-2027".
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  });

  return {
    name: 'troop32-events',
    load: async (context) => {
      await base.load(context);

      const root = context.config.root;
      const events: CheckableEvent[] = [];
      for (const entry of context.store.values()) {
        const text = entry.filePath ? await readFile(new URL(entry.filePath, root), 'utf8') : (entry.body ?? '');
        events.push({ id: entry.id, data: entry.data as CheckableEvent['data'], text, body: entry.body ?? '' });
      }
      const photoLogText = await readFile(new URL(options.photoLogPath ?? PHOTO_LOG_PATH, root), 'utf8');

      const { errors, warnings } = checkEvents(events, { photoLogText, today: options.today ?? troopToday() });
      for (const warning of warnings) context.logger.warn(warning);
      if (errors.length > 0) {
        throw new Error(`Event content check failed:\n- ${errors.join('\n- ')}`);
      }
    },
  };
}
