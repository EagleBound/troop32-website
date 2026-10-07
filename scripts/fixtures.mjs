// Runs Astro in FIXTURE MODE: the Events pages are built from fictional test
// records in tests/fixtures/events/ instead of src/content/events/.
//
//   npm run dev:fixtures       preview while editing
//   npm run build:fixtures     build into dist-fixtures/ (never dist/)
//   npm run preview:fixtures   serve dist-fixtures/
//
// "Today" is fixed (2027-08-15 unless TROOP32_EVENTS_TODAY is set) so the
// Upcoming / Recent / Archive results never drift. Every page shows a
// "Fictional test data" banner. See docs/DEVELOPMENT.md.

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const [command = 'build', ...rest] = process.argv.slice(2);
if (!['dev', 'build', 'preview'].includes(command)) {
  console.error(`Usage: node scripts/fixtures.mjs <dev|build|preview>`);
  process.exit(1);
}

const astro = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));
const env = {
  ...process.env,
  TROOP32_EVENT_FIXTURES: '1',
  TROOP32_EVENTS_TODAY: process.env.TROOP32_EVENTS_TODAY || '2027-08-15',
};

const child = spawn(process.execPath, [astro, command, ...rest], { env, stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 1));
