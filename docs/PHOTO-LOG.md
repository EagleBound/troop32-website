# Photo Log

Every photograph published on the Troop 32 website is recorded here **before** it goes live. This is the troop's record of where each public image came from, how it was reviewed for privacy, and who approved it.

**Never record youth names here.** This repository is public.

## How a photo gets onto the site

```text
authorized read-only external source (e.g. the troop's Google Drive; never modified)
  → private staging folder (copies only; outside the repo and any sync folder)
  → full-resolution privacy review (faces, names, tags, signs, plates, branding, suitability)
  → human publication approval (recorded below)
  → sanitized derivative (resized, metadata stripped, neutral filename)
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

## Published photographs

### `hero-trail-walk-01.jpg`

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
| Intended site use | Homepage hero (decorative background, `alt=""`) |
| Derivative | 2560×1183 JPEG, all metadata (EXIF/GPS/camera) removed |

### `leadership-patrol-huddle-01.jpg`

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
| Intended site use | Homepage › Scout-Led Leadership card (portrait crop, troop flag kept in frame) |
| Derivative | 739×1600 JPEG, all metadata removed |

### `water-sailing-01.jpg`

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
| Intended site use | What We Do › Outdoor adventure (portrait crop, no caption) |
| Derivative | 739×1600 JPEG, all metadata removed |

## Balance across events

| Collection | Photos published |
| --- | --- |
| Melita Island 2026 | 3 |

The site should show variety across years, seasons, and activities. Before adding more photos from a collection already listed here, check whether a photo from a different event would tell the troop's story better. The homepage photo mosaic stays hidden until it has at least four approved photos from at least three different events.
