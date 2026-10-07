import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ordinaryEvent, publicEvent, schema } from './fixtures.ts';

const photo = (n: number) => ({ src: `../../assets/photos/example-photo-${n}.jpg`, alt: 'Scouts on a trail.' });

/** Asserts the input fails, with an issue mentioning `fragment`. */
function rejects(input: Record<string, unknown>, fragment: string) {
  const result = schema.safeParse(input);
  assert.equal(result.success, false, `expected failure: ${fragment}`);
  const text = JSON.stringify(result.error?.issues);
  assert.ok(text.includes(fragment), `expected an issue mentioning "${fragment}", got ${text}`);
}

test('valid ordinary and public-community events pass', () => {
  const ordinary = schema.parse(ordinaryEvent());
  assert.equal(ordinary.designation, 'ordinary');
  assert.equal(ordinary.draft, false);
  assert.equal(schema.parse(publicEvent()).designation, 'public-community');
});

test('YAML dates (parsed as Date objects) are stored as YYYY-MM-DD', () => {
  const parsed = schema.parse(ordinaryEvent({ review: { reviewedByRole: 'webmaster', reviewedOn: new Date('2026-08-10') } }));
  assert.equal(parsed.review?.reviewedOn, '2026-08-10');
});

test('unknown fields (private logistics) are rejected', () => {
  for (const key of ['rendezvous', 'departureTime', 'attendees', 'drivers', 'patrols', 'itinerary', 'driveUrl', 'date']) {
    rejects(ordinaryEvent({ [key]: 'x' }), key);
  }
  rejects(publicEvent({ publicDetails: { contactPhone: 'x' } }), 'contactPhone');
  rejects(ordinaryEvent({ cover: { ...photo(1), photographer: 'x' } }), 'photographer');
});

test('exact public details and designation are gated to public-community events', () => {
  rejects(ordinaryEvent({ publicDetails: { date: '2026-07-04' } }), 'public-community');
  rejects(ordinaryEvent({ publicDesignation: { approvedByRole: 'scoutmaster', approvedOn: '2026-06-01' } }), 'publicDesignation');
  rejects(publicEvent({ publicDesignation: undefined }), 'authorized');
});

test('designation roles: Scoutmaster, Committee Chair, designated adult leader only', () => {
  for (const role of ['scoutmaster', 'committee-chair', 'designated-adult-leader']) {
    assert.ok(schema.safeParse(publicEvent({ publicDesignation: { approvedByRole: role, approvedOn: '2027-01-15' } })).success, role);
  }
  rejects(publicEvent({ publicDesignation: { approvedByRole: 'troop-leadership', approvedOn: '2027-01-15' } }), 'approvedByRole');
  rejects(publicEvent({ publicDesignation: { approvedByRole: 'webmaster', approvedOn: '2027-01-15' } }), 'approvedByRole');
});

test('public details: date within the event month(s), valid times', () => {
  rejects(publicEvent({ publicDetails: { date: '2027-04-01' } }), 'within the event month');
  rejects(publicEvent({ publicDetails: { date: '2027-02-30' } }), 'real calendar date');
  rejects(publicEvent({ publicDetails: { startTime: '8:00' } }), '24-hour');
  rejects(publicEvent({ publicDetails: { startTime: '11:00', endTime: '08:00' } }), 'after');
  assert.ok(schema.safeParse(publicEvent({ month: '2027-03', endMonth: '2027-04', publicDetails: { date: '2027-04-02' } })).success);
});

test('months: valid format and endMonth not before month', () => {
  rejects(ordinaryEvent({ month: '2026-7' }), 'month');
  rejects(ordinaryEvent({ month: '2026-07', endMonth: '2026-06' }), 'endMonth');
  assert.ok(schema.safeParse(ordinaryEvent({ month: '2026-06', endMonth: '2026-07' })).success);
});

test('uid must be evt- plus 8 lowercase letters/digits', () => {
  for (const bad of ['evt-ABC12345', 'evt-1234567', 'event-12345678', '']) rejects(ordinaryEvent({ uid: bad }), 'uid');
});

test('every non-draft event needs a human review; drafts may omit it', () => {
  rejects(ordinaryEvent({ review: undefined }), 'review');
  rejects(ordinaryEvent({ status: 'planned', month: '2027-07', review: undefined }), 'review');
  assert.ok(schema.safeParse(ordinaryEvent({ draft: true, review: undefined })).success);
  rejects(ordinaryEvent({ review: { reviewedByRole: 'clawson', reviewedOn: '2026-08-10' } }), 'reviewedByRole');
});

test('images: alt text required; gallery max 20; gallery only when completed', () => {
  rejects(ordinaryEvent({ cover: { src: 'x.jpg', alt: '   ' } }), 'alt');
  rejects(ordinaryEvent({ cover: { src: 'x.jpg' } }), 'alt');
  rejects(ordinaryEvent({ gallery: [{ src: 'x.jpg', alt: '' }] }), 'alt');
  assert.ok(schema.safeParse(ordinaryEvent({ gallery: Array.from({ length: 20 }, (_, i) => photo(i)) })).success);
  rejects(ordinaryEvent({ gallery: Array.from({ length: 21 }, (_, i) => photo(i)) }), 'at most 20');
  rejects(ordinaryEvent({ status: 'planned', month: '2027-07', gallery: [photo(1)] }), 'Only completed events');
  // A planned event may have an approved cover photo.
  assert.ok(schema.safeParse(ordinaryEvent({ status: 'planned', month: '2027-07', cover: photo(1) })).success);
});

test('focus uses 10% steps', () => {
  assert.ok(schema.safeParse(ordinaryEvent({ cover: { ...photo(1), focus: { x: 40, y: 100 } } })).success);
  rejects(ordinaryEvent({ cover: { ...photo(1), focus: { x: 45 } } }), 'focus');
});

test('venueToBeAnnounced: public-community only, exactly true, never with a venue', () => {
  assert.ok(schema.safeParse(publicEvent({ publicDetails: { date: '2027-03-06', venueToBeAnnounced: true } })).success);
  rejects(publicEvent({ publicDetails: { venueToBeAnnounced: true, venue: { name: 'Example Hall' } } }), 'not both');
  rejects(ordinaryEvent({ publicDetails: { venueToBeAnnounced: true } }), 'public-community');
  for (const bad of [false, 'yes', 1]) rejects(publicEvent({ publicDetails: { venueToBeAnnounced: bad } }), 'venueToBeAnnounced');
});
