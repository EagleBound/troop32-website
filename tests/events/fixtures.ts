// FICTIONAL test data only. No real Scout, adult, or event is represented.
// (docs/PRIVACY.md → Youth names: fictional names belong only in docs, templates, tests, and examples.)

import { z } from 'astro/zod';
import { buildEventSchema } from '../../src/lib/events/schema.ts';
import type { LocalDate } from '../../src/lib/events/months.ts';

/** The schema with a plain string standing in for Astro's image() helper. */
export const schema = buildEventSchema(() => z.string());

/** A valid, published, ordinary completed event (raw frontmatter input). */
export function ordinaryEvent(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    uid: 'evt-test0001',
    title: 'Eagle Project · Jordan Q.',
    summary: 'A fictional trail bench project used in tests.',
    status: 'completed',
    month: '2026-07',
    review: { reviewedByRole: 'webmaster', reviewedOn: '2026-08-10' },
    ...overrides,
  };
}

/** A valid, published, leadership-designated public/community event. */
export function publicEvent(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return ordinaryEvent({
    uid: 'evt-test0002',
    title: 'Example Community Breakfast',
    status: 'planned',
    month: '2027-03',
    designation: 'public-community',
    publicDesignation: { approvedByRole: 'scoutmaster', approvedOn: '2027-01-15' },
    publicDetails: {
      date: '2027-03-06',
      startTime: '08:00',
      endTime: '11:00',
      venue: { name: 'Example Hall', address: '100 Example Street, Example City' },
      participation: 'Open to everyone. Tickets at the door.',
    },
    ...overrides,
  });
}

export const day = (year: number, month: number, d = 15): LocalDate => ({ year, month, day: d });

export const photoLog = '# Photo Log\n\n#### `example-photo-01.jpg`\n\n#### `example-photo-02.jpg`\n';
