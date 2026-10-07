# Development Guide

How to run, change, and build the Troop 32 website on your own computer. Written for a Scout Webmaster. No prior web-development experience is assumed.

Before changing anything, read [WORKFLOW.md](WORKFLOW.md) (how changes are planned, approved, and reviewed) and [PRIVACY.md](PRIVACY.md) (what may and may not be published).

## How the website works (in one paragraph)

The site is built with **[Astro](https://astro.build)**, a tool that turns page files into plain, fast HTML pages. You edit files in `src/`, and Astro produces the finished website in a folder called `dist/`. The finished site is *static*: just files, with no database or login, which makes it fast, cheap to host, and hard to break into. Styling is plain CSS. There is almost no JavaScript; the only script is the small menu button on phones.

## Prerequisites

- **Node.js** version **22.18 or newer** (the project was set up with Node 24). 22.18 is the first version that runs the TypeScript tests directly. Check with:

  ```bash
  node --version
  ```

  If Node is missing or too old, ask the adult project lead or designated adult leader. Installing software on the computer is a machine-level change that needs adult approval.
- **Git**, to review and save changes (see [WORKFLOW.md](WORKFLOW.md#git-basics-for-the-webmaster)).
- A code editor such as Visual Studio Code is helpful but not required.

All commands below are run in a terminal **inside the project folder**:

```bash
cd C:\Users\webma\Projects\troop32-website
```

## First-time setup: install dependencies

```bash
npm install
```

This downloads the tools the project needs (Astro, the fonts, and the image tools) into a folder called `node_modules/`. That folder is not saved in Git. Run `npm install` again whenever `package.json` changes.

## Start the local development server

```bash
npm run dev
```

Then open **<http://localhost:4321/>** in your web browser.

While the server is running, saving a file in `src/` updates the browser automatically. The development server is only on your computer; nobody else can see it.

**To stop the server:** click in the terminal window and press **Ctrl + C** (answer `Y` if asked).

## Build the production version

```bash
npm run build
```

This creates the finished website in `dist/`. A build that ends with **Complete!** and shows no errors means the site is ready. To look at the built version locally:

```bash
npm run preview
```

then open the address it prints (normally <http://localhost:4321/>). Stop it with **Ctrl + C**.

`dist/` is not saved in Git. The hosting service builds its own copy (set up in a later, separately approved work package).

The build also **checks every event record** (see [Add an event](#add-an-event)). Errors stop the build; warnings are printed in yellow for the Webmaster to review.

## Run the tests

```bash
npm test
```

This runs the automated tests in `tests/events/` with Node's built-in test runner (no extra tools). They check the event rules: the schema, Upcoming/Recent/Archive classification (including the 12-month boundary), the content checks, and what the Events pages may show. A run that ends with `fail 0` passed. Test data is **fictional** (for example *Jordan Q.*); never put a real Scout in a test.

```bash
npm run test:pages
```

This builds the site twice (the normal build into `dist/` and the fixture build into `dist-fixtures/`, see below) and then checks the finished Events pages: which events appear where, empty states, status labels, that no private or review details leak, alt text, and that no fixture content reaches `dist/`. It takes about half a minute.

### Preview the Events pages with fictional data (fixture mode)

The real event folder starts empty, so the Events pages normally show their empty states. To see them filled in, use **fixture mode**, which loads clearly fictional test events from `tests/fixtures/events/` instead:

```bash
npm run dev:fixtures       # live preview
npm run build:fixtures     # build into dist-fixtures/
npm run preview:fixtures   # serve dist-fixtures/
```

- Every page shows a **"Fictional test data"** banner.
- "Today" is fixed at **2027-08-15**, so the same events always land in the same places.
- The output goes to `dist-fixtures/` (ignored by Git) and uses its own cache, so fixtures **never** reach `dist/`, which is what gets published.
- The fixture images are artificial placeholder graphics, not photographs. **Never** put a real Scout, a real photo, or a real event in `tests/fixtures/`.

## Where things live

| What | Where | Notes |
| --- | --- | --- |
| **Pages** | `src/pages/` | Each file is one page. `about.astro` becomes `/about/`; `index.astro` is the home page; `404.astro` is the "page not found" page. |
| **Shared building blocks** | `src/components/` | Header, footer, meeting card, photo frame, page header, closing call to action, and the placeholder illustrations (`Scene.astro`). Event cards, lists, details, and galleries are in `src/components/events/`. |
| **Page shell** | `src/layouts/BaseLayout.astro` | The `<head>`, skip link, header, and footer that wrap every page. |
| **Repeated troop facts** | `src/data/site.ts` | Troop name, meeting day/time/place, Scoutmaster, public contact, navigation. **Change a fact here and it updates on every page.** |
| **Scouting principles** | `src/data/principles.ts` | Scout Oath, Law, Motto, Slogan, Outdoor Code. Must match [CONTENT-GUIDE.md](CONTENT-GUIDE.md). |
| **Photo slots** | `src/data/photos.ts` | Which approved photo (or fallback illustration) appears in each photo spot. Each page section has its **own** slot (`hero`, `home.*`, `whatWeDo.*`, and the `gallery` mosaic list), so a photo never repeats on another page by accident. |
| **Events** | `src/content/events/` | One Markdown file per event (see [Add an event](#add-an-event)). Pages: `src/pages/events/`. Rules: `src/lib/events/`; collection setup: `src/content.config.ts`. |
| **Tests** | `tests/` | Automated tests (`npm test`, `npm run test:pages`). Fictional fixture events: `tests/fixtures/events/`. |
| **Photo approval record** | `docs/PHOTO-LOG.md` | Source, privacy review, and approval for every published photo. |
| **Styles** | `src/styles/global.css` | Colors, fonts, spacing, and buttons, defined once as "design tokens" at the top. Each component also has its own `<style>` section. |
| **Approved photos** | `src/assets/photos/` | Only approved, sanitized derivatives (metadata removed, neutral names). Never originals. |
| **Troop emblem** | `src/assets/brand/troop32-emblem.png` | 512×512 prepared copy of the Troop 32 emblem used in the header (see below). |
| **Other site files** | `public/` | Files copied as-is: `favicon.svg`, `apple-touch-icon.png`, `robots.txt`, and `_headers` (security headers for hosting). |

## Common tasks

### Change the meeting time or place

Edit `meeting` in `src/data/site.ts`. Every page updates automatically. Changes to public information still go through the [workflow](WORKFLOW.md), and only the **regular** meeting belongs there, never outing or event details ([PRIVACY.md](PRIVACY.md#regular-meeting-information-vs-activity-logistics)).

### Set the public contact email

When troop leadership approves an official, role-based troop address, set `contact.email` in `src/data/site.ts`. The Contact page shows it automatically. Never use a personal email address or phone number.

### Add an approved photo

Only photos approved under the troop's photo policy ([PRIVACY.md](PRIVACY.md#photos-and-images)) may be added. The repository is public.

**Never edit the original.** Photos usually come from an external source such as the troop's Google Drive. Those originals are never changed, renamed, moved, or deleted ([AGENTS.md §7](../AGENTS.md#7-external-sources-are-read-only)). Always work on a **copy**.

1. **Copy to private staging.** AI agents take photos only from the troop's **"Troop 32 Photos"** Drive folder. The directing human supplies its link at runtime, and agents move downward only into the folders the work package names ([AGENTS.md §7](../AGENTS.md#google-drive-access-scope-permanent)). Copy only the candidate photos into a private local working folder **outside this repository and outside any sync folder**. The troop uses `C:\Users\webma\Troop32-Staging\<Event-Year>\` with `originals\` and `derivatives\` subfolders. Don't use a folder inside OneDrive, Google Drive, or Dropbox. Windows sometimes puts Pictures and Documents inside OneDrive, so check first.
2. **Make sanitized derivatives.** On the copies, correct the rotation, remove all location and camera data (EXIF/GPS), resize (about 2560 px on the long side for a hero, 1600 px for cards), and give each one a neutral, subject-based name with no names or event in it (for example `water-sailing-01.jpg`).
3. **Review at full resolution.** Look for clearly identifiable faces, names on clothing or gear, readable signs, plates, location clues, branding, swimwear ([aquatic rules](PRIVACY.md#swimming-and-aquatic-photographs)), and anything unsuitable. Thumbnails are not enough.
4. **Get human approval and record it** in [PHOTO-LOG.md](PHOTO-LOG.md): source file, collection, privacy class, observations, approver role, and date.
5. **Add the derivative to the site.** Save only the approved derivative in `src/assets/photos/`. Never add originals.
6. **Assign it to a slot** in `src/data/photos.ts`: import it and set `image`, a meaningful `alt` (or `''` if purely decorative), `event` (its collection), and `focus` (where the important part of the photo is, so crops keep it in frame):

   ```ts
   import ridge from '../assets/photos/campout-ridge-01.jpg';
   // ...
   home: {
     outdoor: { scene: 'ridge', image: ridge, alt: 'Scouts hiking along a ridge trail at sunrise', focus: { x: 50, y: 40 }, event: 'Sierra backpacking 2027' },
   },
   ```

Astro automatically creates smaller, faster versions of the photo for phones and computers. Always check the built page before committing.

**Crops.** If something private is near the edge of a photo (a readable sign or schedule, a name, a crew or campsite number, a cut-off person), crop it out of the derivative itself. Don't rely on the page's `focus` crop, because a different screen size can bring it back into view. Record the crop in [PHOTO-LOG.md](PHOTO-LOG.md).

**The homepage mosaic** (`photos.gallery`) is a list of photos with optional captions. Set `tile: 'wide'` for panoramic photos (about 2:1), which span two columns; other photos are square. Keep the order alternating (wide, square, square, wide) so the panoramas sit on opposite sides on wide screens. The mosaic stays hidden unless it holds at least four approved photos from at least three different events.

**Keep the site balanced.** Every slot now has a real photo, drawn from six 2026 events, with each photo used once (see [PHOTO-LOG.md → Where each photo is used](PHOTO-LOG.md#where-each-photo-is-used)). When new photos arrive, replace a slot only if the new photo tells the troop's story better, and prefer events that aren't already shown on that page. Don't add a photo just because it exists. Record every change of placement in PHOTO-LOG.md. The "used once" rule covers these general page slots only. Future event galleries may reuse a photo as part of the event's historical record ([PRIVACY.md → Event galleries](PRIVACY.md#event-galleries)).

### Add an event

> Events appear at **/events/** (Upcoming and Recent Adventures), **/events/archive/**, and each event's own page **/events/<file-name>/**. The homepage doesn't show events yet. Policy: [PRIVACY.md → Events](PRIVACY.md#events-what-may-be-public-approved-e0-2026-10-07) and [Youth names](PRIVACY.md#youth-names).

Each event is one Markdown file in `src/content/events/`. **The file name is the event's permanent URL**: lowercase words joined by hyphens, at most 60 characters. Including the year is recommended (`eagle-project-trail-bench-2027.md` → `/events/eagle-project-trail-bench-2027/`) but not required. **Never put a Scout's name in the file name**, not even First L. Don't rename a published event.

```md
---
uid: evt-k3m9q2zt           # permanent ID; never change or reuse (see below)
title: "Eagle Project · Jordan Q."   # fictional example; real content uses the Scout's real First L.
summary: Scouts built a bench along a hillside trail.
status: completed           # planned | completed | cancelled | postponed
month: "2027-07"            # month only for ordinary events; quote it
# endMonth: "2027-08"       # only for events that span months
# draft: true               # not shown on the site, but STILL PUBLIC in Git
# destination: Melita Island   # general or well-known place only
cover:
  src: ../../assets/photos/example-photo-01.jpg
  alt: Scouts carry a wooden bench up a dirt trail.
gallery:                    # completed events only; aim for 6–12, max 20
  - src: ../../assets/photos/example-photo-02.jpg
    alt: Two Scouts sand the bench seat.
    caption: Finishing the seat
review:                     # required unless draft
  reviewedByRole: webmaster # webmaster | adult-project-lead
  reviewedOn: 2027-08-03
---

The story of the event goes here, in plain Markdown.
```

- **`uid`**: `evt-` plus 8 random lowercase letters and digits, unique to this event. A future member area will use it to link private information without putting that information here. Make one with `node -e "console.log('evt-'+Math.random().toString(36).slice(2,10).padEnd(8,'0'))"`.
- **`status`**: a planned event whose month has passed is hidden and flagged until you mark it `completed`, `cancelled`, or `postponed`; the site never assumes it happened. `postponed` shows in Upcoming as "Postponed; new date to be announced". When the new month is known, set `status: planned` and the new `month`. `cancelled` shows as "Cancelled" through its month, then disappears.
- **Where it appears** (worked out at each build): Upcoming for planned, postponed, and current cancelled events; **Recent Adventures** for completed events less than 12 months after their month; the **Troop 32 Archive** after that. Because the site is static, an event moves only when the site is rebuilt. Drafts, planned events whose month has passed, and cancelled events after their month have **no page** (their address shows "page not found").
- **What the page shows**: title, summary, the month (or month range), status label, destination, cover, story, and gallery. For a **public/community** event it also shows the exact date; while the event is still planned it adds the time, venue and address, and how to take part. A postponed or cancelled public event shows only its original date and venue name. A completed one keeps its date and venue name. The `uid`, the review, and who authorized the public designation are **never** shown.
- **The story** (the Markdown below the `---`): use `##` headings, not `#` (the page already has the main heading). Don't put images, videos, or embedded content in the story; the build rejects them. Photos go in `cover` and `gallery`.
- **Photos** must already be approved and listed in [PHOTO-LOG.md](PHOTO-LOG.md) (the build checks this) and saved in `src/assets/photos/`. Every photo needs alt text; don't name youth in alt text. A planned event may use an older photo as its cover, but its alt text and caption must not suggest the photo shows the upcoming event.
- **Names**: a Scout is real First L.; an adult leader is Mr. or Mrs. Last Name. You are the review point for who is a Scout and who is an adult. If you're not sure, ask; don't guess.
- **Never add** meeting points, departure or return times, drivers or transport, attendee lists, patrols, itineraries, campsite details, contact details, or Google Drive links. The schema rejects unknown fields, and the build rejects Drive links.
- **Public/community events** (for example a pancake breakfast open to everyone) can show an exact date, time, venue, and how to take part, but only after the Scoutmaster, Committee Chair, or designated adult leader authorizes it. Record that authorization:

  ```yaml
  designation: public-community
  publicDesignation:
    approvedByRole: scoutmaster   # scoutmaster | committee-chair | designated-adult-leader
    approvedOn: 2027-01-15
  publicDetails:
    date: 2027-03-06
    startTime: "08:00"            # 24-hour, quoted
    endTime: "11:00"
    venue: { name: Example Hall, address: "100 Example Street, Example City" }
    participation: Open to everyone. Tickets at the door.
  ```

**What the build checks.** Errors (build stops): unknown fields, missing alt text or review, more than 20 gallery photos, a gallery on an event that isn't completed, public details without a public designation, a duplicate `uid`, a bad file name, a photo missing from PHOTO-LOG.md, a "completed" event in a future month, any Google Drive or Docs link, and an email address or phone number in an ordinary event. Warnings (review them): more than 12 gallery photos, a planned event whose date has passed, an email or phone number in a public/community event (confirm it is meant to be public), and a clock time or exact date in an ordinary event. Names, captions, and who is a Scout are **not** checked automatically; that is the human review.

In `npm run dev`, editing an event reloads it but doesn't rerun the cross-event checks. Run `npm run build` before committing.

### The troop emblem

The header shows the Troop 32 emblem from `src/assets/brand/troop32-emblem.png`. It was prepared from the original emblem file, which is kept **outside** this repository and never modified, by:

- making the white corners outside the circle transparent, using a soft circular edge just inside the red ring so no white fringe shows on dark backgrounds;
- resizing proportionally to 512×512 PNG with no metadata.

`public/apple-touch-icon.png` is a 180×180 copy that keeps the white corners, because phones place transparent areas on black and round the corners themselves.

Never edit the artwork itself (see [CONTENT-GUIDE.md](CONTENT-GUIDE.md#the-troop-32-emblem)). If a cleaner original becomes available, regenerate these two files from it the same way.

### Change colors or fonts

Edit the design tokens at the top of `src/styles/global.css`. After changing colors, check that text still has enough contrast (see [CONTENT-GUIDE.md](CONTENT-GUIDE.md#accessibility)).

## Fonts

The site uses two open-license fonts, **self-hosted** (served from our own site, not from Google or another font service, so visitors aren't tracked):

- **Source Serif 4** for headings: sturdy and traditional, with an "established" feel.
- **Source Sans 3** for body text: very readable on screens of every size.

They are a matched pair designed to work together, and both are licensed under the SIL Open Font License. They are installed as the `@fontsource-variable/source-serif-4` and `@fontsource-variable/source-sans-3` packages.

## Search engines and launch

Until the site is officially launched, it tells search engines not to list it, in three places:

- `indexable: false` in `src/data/site.ts`;
- `public/robots.txt`;
- the `X-Robots-Tag` line in `public/_headers`.

All three are changed together in the separately approved launch work package.

## Troubleshooting

| Problem | What to try |
| --- | --- |
| `npm` or `node` is not recognized | Node.js is not installed or not on the PATH. Ask an adult; don't install software without approval. |
| `Cannot find module` or `astro: not found` | Run `npm install`. |
| Port 4321 is already in use | Another copy of the server is running. Stop it with Ctrl + C in its terminal, or run `npm run dev -- --port 4322` and open <http://localhost:4322/>. |
| The page didn't update | Save the file, then refresh the browser. If it is still stuck, stop the server (Ctrl + C) and run `npm run dev` again. |
| `Event content check failed` or `does not match collection schema` | The message names the event file and the problem. See [Add an event](#add-an-event). |
| The build shows an error | Read the first red error line: it usually names the file and line. Ask Clawson in a PLAN request to explain it. |
| Something looks very wrong after many changes | `git status` and `git diff` show exactly what changed. Nothing is permanent until it is committed. |

Astro prints a note that it "collects anonymous usage data". That is information about the build tool, not about website visitors. See [PROJECT.md](PROJECT.md) for whether it has been turned off.
