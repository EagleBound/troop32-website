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

export const EVENTS_BASE = './src/content/events';

export function eventsLoader(): Loader {
  const base = glob({
    pattern: '**/*.md',
    base: EVENTS_BASE,
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
        events.push({ id: entry.id, data: entry.data as CheckableEvent['data'], text });
      }
      const photoLogText = await readFile(new URL('docs/PHOTO-LOG.md', root), 'utf8');

      const { errors, warnings } = checkEvents(events, { photoLogText, today: troopToday() });
      for (const warning of warnings) context.logger.warn(warning);
      if (errors.length > 0) {
        throw new Error(`Event content check failed:\n- ${errors.join('\n- ')}`);
      }
    },
  };
}
