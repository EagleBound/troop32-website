# Photo Log

Every photograph published on the Troop 32 website is recorded here **before** it goes live. This is the troop's record of where each public image came from, how it was reviewed for privacy, and who approved it.

**Never record youth names here.** This repository is public.

## How a photo gets onto the site

```text
authorized read-only external source (e.g. the troop's Google Drive; never modified)
  → private staging folder (copies only; outside the repo and any sync folder)
  → full-resolution privacy review (faces, names, tags, signs, plates, branding, suitability)
  → human publication approval (recorded below)
  → sanitized derivative (resized, cropped if needed, metadata stripped, neutral filename)
  → src/assets/photos/ → public website
```

The rules behind each step:

- External sources are read-only: [AGENTS.md §7](../AGENTS.md#7-external-sources-are-read-only).
- Privacy: [PRIVACY.md](PRIVACY.md#photos-and-images).
- Step-by-step instructions: [DEVELOPMENT.md](DEVELOPMENT.md#add-an-approved-photo).

**Privacy classes:**
- **A:** no identifiable youth.
- **B:** identifiable youth in ordinary, appropriate Scouting activity.
- **C:** needs special review (names, awards tied to individuals, sensitive settings, location or logistics clues, branding questions).

Class B and C photos need explicit human publication approval. Thumbnail review alone is never enough.

**Approval is not placement.** A human-approved photo is *available* for editorial use. It doesn't have to appear on the site, and where it appears is an editorial decision recorded in [Where each photo is used](#where-each-photo-is-used).

> **Youth-photo policy approved (E0, 2026-10-07).** Recognizable Scouts may appear in approved public photos of ordinary Scouting activities, after the review and approval steps above ([PRIVACY.md → Youth names, photographs, and recognition](PRIVACY.md#youth-names-photographs-and-recognition)). This resolves the earlier pre-launch item about privacy-class-B photos. Every photo still needs its own full-resolution review for sensitive details in the frame.
>
> **Already-approved photos are not re-reviewed** just because the policy changed. That includes `water-sailing-01.jpg`, which is approved under the swimming/aquatic rule.

**Swimming and aquatic photos.** Use contextual judgment ([PRIVACY.md](PRIVACY.md#swimming-and-aquatic-photographs)). If a girl in a swimsuit is a prominent or high-resolution subject, the photo needs specific **designated adult leader** approval. Record that approval, and the approver's role, in the photo's entry.

**Names.** This log still never records youth names. Captions on the site may use First L. where the [naming rules](PRIVACY.md#youth-names) allow. Record only the fact that a photo has a named caption, never the name itself.

## Where each photo is used

In general page slots, each photo appears in exactly one place, so the site shows variety. Slots are defined in `src/data/photos.ts`. A future event gallery may also include a photo used in a slot. That reuse is allowed as part of the event's historical record ([PRIVACY.md → Event galleries](PRIVACY.md#event-galleries)). This log keeps its current single-file structure for now.

| Page › section | Photo | Collection | Frame |
| --- | --- | --- | --- |
| Home › hero (decorative background) | `hero-trail-walk-01.jpg` | Melita Island 2026 | Full-bleed |
| Home › Outdoor Adventure card | `winter-sled-haul-01.jpg` | Snow camping 2026 | Portrait 3:4 |
| Home › Scout-Led Leadership card | `kitchen-pancake-line-01.jpg` | Pancake breakfast 2026 | Portrait 3:4 |
| Home › Service card | `service-trail-fence-01.jpg` | Eagle service projects 2026 | Portrait 3:4 |
| Home › "Scouting in action" mosaic, wide tile | `summit-panorama-01.jpg` | Philmont 2026 | Panorama, caption "Summit day, Philmont Scout Ranch" |
| Home › mosaic, square tile | `camp-sleeping-outdoors-01.jpg` | Chill Outing 2026 | Square, caption "Sleeping under the stars" |
| Home › mosaic, square tile | `water-sailing-01.jpg` | Melita Island 2026 | Square, caption "Sailing" |
| Home › mosaic, wide tile | `camp-tent-pitching-01.jpg` | Chill Outing 2026 | Panorama, caption "Pitching camp" |
| What We Do › Outdoor adventure | `backpacking-trail-break-01.jpg` | Philmont 2026 | Portrait 3:4 |
| What We Do › Scout-led leadership | `leadership-patrol-huddle-01.jpg` | Melita Island 2026 | Portrait 3:4 |
| What We Do › Service | `service-planter-bench-01.jpg` | Eagle service projects 2026 | Landscape 4:3 |

**Why this arrangement (2026-10-06):** the goal is a balanced picture of the troop's whole program, not the most photos.

- The homepage draws on six events and What We Do on three. No event has more than two photos on a page.
- The Philmont summit photo is the strongest image, but its two subjects (one Scout, one adult) sit in the middle of the frame, where the hero text goes. The hero keeps the Melita trail walk, a group of Scouts that is already tuned for the layout. The summit gets the large wide tile at the top of the mosaic instead, where its panoramic width shows.
- Two existing Melita photos were **moved** to make room for other events:
  - **Patrol huddle:** from the homepage Leadership card to What We Do › Scout-led leadership. That text is about patrols, which the photo shows directly.
  - **Sailing:** from What We Do › Outdoor adventure to a square mosaic tile. The Philmont trail photo matches that section's text ("camp, hike, cook, navigate") more closely.
- No photo slot shows a placeholder illustration any more. `Scene.astro` stays as the fallback for any slot without a photo.

## Approved photographs not displayed

None. All approved photos are in use.

## Published photographs

### Melita Island 2026

#### `hero-trail-walk-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `20260720_103012.jpg` |
| Source collection | Troop 32 / Melita Island 2026 |
| Privacy class (full-resolution review) | **B**: two youth faces clearly identifiable, one more identifiable; one adult in partial profile |
| Privacy / branding observations | A "T32" tag on a pack; small troop emblems on shirts. No personal names, readable signs, or vehicles. Camp buildings in the background; no camp name visible. The photographer's arm at the bottom-left edge is kept out of view by the site crop. |
| Source authorization | Troop-controlled photo from the Troop 32 Google Drive collection authorized by the adult project lead for public website use |
| Human publication approval | Approved after visual review of the full-resolution derivative |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | Homepage hero (decorative background, `alt=""`) |
| Derivative | 2560×1183 JPEG, all metadata (EXIF/GPS/camera) removed |

#### `leadership-patrol-huddle-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `20260722_133726.jpg` |
| Source collection | Troop 32 / Melita Island 2026 |
| Privacy class (full-resolution review) | **B** with **C** elements: one older Scout's face clearly visible, one partial profile; most of the group from behind |
| Privacy / branding observations | "TROOP 32" on hats. One small white name card on a hat, not legible at full resolution. The troop flag reads "TROOP 32 / SANTA ROSA, CA" with the older "BSA" fleur-de-lis emblem; kept intentionally as authentic Troop 32 branding. Nothing unsuitable. |
| Source authorization | Troop-controlled photo from the Troop 32 Google Drive collection authorized by the adult project lead for public website use |
| Human publication approval | Approved after visual review of the full-resolution derivative |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | What We Do › Scout-led leadership (portrait crop, troop flag kept in frame). *Moved 2026-10-06 from the homepage Scout-Led Leadership card, with adult project lead approval, to balance events.* |
| Derivative | 739×1600 JPEG, all metadata removed |

#### `water-sailing-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `20260722_110416.jpg` (alternate `20260722_110421.jpg` not selected) |
| Source collection | Troop 32 / Melita Island 2026 |
| Privacy class (full-resolution review) | **B** (borderline): two people identifiable in profile at full resolution; small at display size; middle Scout faces away |
| Privacy / branding observations | Manufacturer sail branding ("RS Feva XL"), sail number 6968, and a Czech flag on the sail; boat markings, not personal or troop identifiers. Everyone in life jackets. Distant shoreline; no identifiable location. |
| Source authorization | Troop-controlled photo from the Troop 32 Google Drive collection authorized by the adult project lead for public website use |
| Human publication approval | Approved after visual review of the full-resolution derivative |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | Homepage › "Scouting in action" mosaic (square tile, caption "Sailing"). *Moved 2026-10-06 from What We Do › Outdoor adventure, with adult project lead approval.* |
| Derivative | 739×1600 JPEG, all metadata removed |

### 2026 collections (Philmont, Eagle service projects, snow camping, pancake breakfast, Chill Outing)

These eight photos share the following:

- **Source:** troop-controlled photos from the Troop 32 Google Drive collection, authorized by the adult project lead for public website use.
- **Staging:** copied to the private staging folder `Troop32-Staging\2026-Mixed\`. Review copies (rotated, metadata removed, 3000 px) were prepared there.
- **Approval:** the adult project lead personally reviewed all eight review copies and approved them for public use on **2026-10-06**.
- **Public derivatives:** made from the review copies with crops and resizing only. Saved as JPEG (quality 80), sRGB, with **no** EXIF, GPS, XMP, IPTC, ICC, or comment data. Verified 2026-10-06.

#### `summit-panorama-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `20260626_085202.jpg` (review copy `philmont-summit-01.jpg`) |
| Source collection | Troop 32 / Philmont 2026 (high adventure) |
| Privacy class (full-resolution review) | **B**: one Scout and one adult leader clearly identifiable, posing |
| Privacy / branding observations | A water bottle with a "T32" sticker. A second Scout, cut off at the left edge and facing away, wore a shirt showing an expedition crew number. **The derivative crops off the left 10% of the frame**, removing that Scout and the crew number. Open landscape; no signs or vehicles. |
| Human publication approval | Approved by the adult project lead after review of the full-resolution review copy |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | Homepage › "Scouting in action" mosaic, wide lead tile. Caption "Summit day, Philmont Scout Ranch" approved by the adult project lead as historical context for a past activity at a well-known public Scouting destination. No dates, crew numbers, names, or itinerary details. |
| Derivative | 2000×1027 JPEG (crop of the 3000×1386 review copy) |

#### `backpacking-trail-break-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `20260622_080228.jpg` (review copy `philmont-trail-01.jpg`) |
| Source collection | Troop 32 / Philmont 2026 (high adventure) |
| Privacy class (full-resolution review) | **B**: several youth faces identifiable in a line of backpackers |
| Privacy / branding observations | "TROOP 32" on a cap; matching troop trek shirts. No personal names, readable signs, or vehicles. Burned forest and meadow; no identifiable trail markers. |
| Human publication approval | Approved by the adult project lead after review of the full-resolution review copy |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | What We Do › Outdoor adventure (portrait frame) |
| Derivative | 1386×2000 JPEG (crop of the 1386×3000 review copy, trimming the upper sky and the bottom) |

#### `service-trail-fence-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `IMG_7879.HEIC` (review copy `eagle-service-fence-01.jpg`) |
| Source collection | Troop 32 / Eagle service projects 2026 |
| Privacy class (full-resolution review) | **B** (borderline **A**): Scouts mostly seen from behind; one partial profile; one adult partly visible |
| Privacy / branding observations | "TROOP 32" on caps and shirts. Open-space hillside trail; no signs. The Eagle candidate is **not** identified, and site copy and alt text don't describe it as an Eagle project, so no individual can be inferred. |
| Human publication approval | Approved by the adult project lead after review of the full-resolution review copy |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | Homepage › Service card (portrait frame) |
| Derivative | 1600×1200 JPEG (resize of the review copy) |

#### `service-planter-bench-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `IMG_7768.HEIC` (review copy `eagle-service-bench-01.jpg`) |
| Source collection | Troop 32 / Eagle service projects 2026 |
| Privacy class (full-resolution review) | **B**: some youth faces partly identifiable; one adult |
| Privacy / branding observations | Troop shirts and caps. A commercial courtyard with a distinctive building, but no business name or sign is legible; an accessible-parking marking; part of a pickup at the right edge with no plate visible. The Eagle candidate is not identified. **The derivative crops off a dark foreground pole** at the left (about 17% of the width). |
| Human publication approval | Approved by the adult project lead after review of the full-resolution review copy |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | What We Do › Service (landscape frame) |
| Derivative | 1600×1200 JPEG (crop of the 3000×2250 review copy) |

#### `winter-sled-haul-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `0B6924B6-C079-4897-A2A9-98881A3D6E3B_1_201_a.jpeg` (review copy `snow-camping-sled-haul-01.jpg`) |
| Source collection | Troop 32 / Snow camping 2026 |
| Privacy class (full-resolution review) | **A**: everyone seen from behind or at a distance |
| Privacy / branding observations | Troop shirts. Snowy mountain slope; no signs, trailheads, or vehicles. |
| Human publication approval | Approved by the adult project lead after review of the full-resolution review copy |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | Homepage › Outdoor Adventure card (portrait frame) |
| Derivative | 1067×1600 JPEG (resize of the review copy) |

#### `kitchen-pancake-line-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `IMG_2380.jpeg` (review copy `pancake-breakfast-griddle-01.jpg`) |
| Source collection | Troop 32 / Pancake breakfast 2026 |
| Privacy class (full-resolution review) | **B** with **C** elements: one Scout's face in profile; others from behind; an adult partly visible |
| Privacy / branding observations | "TROOP 32 / SANTA ROSA, CA" on a shirt. **C elements, both removed by the crop:** (1) a legible posted tally sheet for a recurring weekday breakfast program (school year and dates), which revealed a recurring schedule at an identifiable facility; (2) a cap reading "EAGLE SCOUT / TROOP 32", which tied a rank to an individual. **The derivative keeps only the left 48% of the frame's width and a middle band of its height** (1080×1440 px from x 0, y 820 of the review copy). Ordinary product packaging remains. |
| Human publication approval | Approved by the adult project lead after review of the full-resolution review copy; privacy crop specifically approved |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | Homepage › Scout-Led Leadership card (portrait frame) |
| Derivative | 1080×1440 JPEG (crop of the 2250×3000 review copy; no upscaling) |

#### `camp-tent-pitching-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `20260822_165828.jpg` (review copy `chill-outing-tent-pitching-01.jpg`) |
| Source collection | Troop 32 / Chill Outing 2026 |
| Privacy class (full-resolution review) | **B**: two Scouts identifiable in profile |
| Privacy / branding observations | Troop shirts. A distant white vehicle with **no legible plate**; a power-line tower; a few tiny, unidentifiable distant figures by the water. Open grassland; no signs. |
| Human publication approval | Approved by the adult project lead after review of the full-resolution review copy |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | Homepage › "Scouting in action" mosaic, wide tile, caption "Pitching camp" |
| Derivative | 2000×924 JPEG (resize of the review copy) |

#### `camp-sleeping-outdoors-01.jpg`

| Field | Record |
| --- | --- |
| Original source file | `IMG_5719.JPG` (review copy `chill-outing-sleeping-outdoors-01.jpg`) |
| Source collection | Troop 32 / Chill Outing 2026 |
| Privacy class (full-resolution review) | **B**, **sensitive setting (C)**: youth lying in sleeping bags; faces mostly hidden by hair, pillows, or bags; a few small partial faces mid-frame |
| Privacy / branding observations | Tarps, sleeping bags, and an outdoor movie screen on a hillside at dusk. No names, signs, or vehicles. |
| **Human approval and override** | During planning, Clawson flagged sleeping youth as a sensitive setting. **The adult project lead personally considered and overrode that concern** and approved the photo for public use: sleeping outdoors is a defining feature and selling point of the Chill Outing. Site copy is limited to the caption "Sleeping under the stars" and descriptive alt text. |
| Approver role | Adult project lead |
| Approval date | 2026-10-06 |
| Site use | Homepage › "Scouting in action" mosaic, square tile |
| Derivative | 1200×1600 JPEG (resize of the review copy) |

## Balance across events

| Collection | Photos published | Where |
| --- | --- | --- |
| Melita Island 2026 | 3 | Home hero, Home mosaic (sailing), What We Do › Leadership |
| Philmont 2026 | 2 | Home mosaic (summit), What We Do › Outdoor adventure |
| Eagle service projects 2026 | 2 | Home › Service, What We Do › Service (two different projects) |
| Chill Outing 2026 | 2 | Home mosaic (tent pitching, sleeping outdoors) |
| Snow camping 2026 | 1 | Home › Outdoor Adventure |
| Pancake breakfast 2026 | 1 | Home › Scout-Led Leadership |

The site should show variety across years, seasons, and activities. Before adding more photos from a collection already listed here, check whether a photo from a different event would tell the troop's story better. If a new photo replaces one in a slot, record the change here. The homepage photo mosaic stays hidden unless it has at least four approved photos from at least three different events (`galleryIsReady` in `src/data/photos.ts`).
