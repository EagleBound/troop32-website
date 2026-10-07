// Fixture mode: preview and test the Events pages with FICTIONAL records from
// tests/fixtures/events/ instead of the real src/content/events/.
//
// Turned on only by scripts/fixtures.mjs (`npm run dev:fixtures`,
// `npm run build:fixtures`). Fixture builds go to dist-fixtures/, never dist/,
// and every page shows a "fictional test data" banner. A normal build never
// sees the fixtures.

import { parseIsoDate } from './months.ts';
import type { LocalDate } from './months.ts';

export const FIXTURE_ENV = 'TROOP32_EVENT_FIXTURES';
export const FIXTURE_TODAY_ENV = 'TROOP32_EVENTS_TODAY';

export const FIXTURE_MODE = process.env[FIXTURE_ENV] === '1';

/** Fixed "today" for fixture builds, so test results never drift. Ignored outside fixture mode. */
export function fixtureToday(): LocalDate | undefined {
  const value = process.env[FIXTURE_TODAY_ENV];
  return FIXTURE_MODE && value ? parseIsoDate(value) : undefined;
}
