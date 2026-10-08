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
| **Repeated troop facts** | `src/data/site.ts` | Troop name, council and service area, Scoutmaster, public contact, navigation. **Change a fact here and it updates on every page.** It deliberately has no meeting day, time, or place. |
| **Scouting principles** | `src/data/principles.ts` | Scout Oath, Law, Motto, Slogan, Outdoor Code. Must match [CONTENT-GUIDE.md](CONTENT-GUIDE.md). |
| **Photo slots** | `src/data/photos.ts` | Which approved photo (or fallback illustration) appears in each photo spot. Each page section has its **own** slot (`hero`, `home.*`, `whatWeDo.*`, and the `gallery` mosaic list), so a photo never repeats on another page by accident. |
| **Events** | `src/content/events/` | One Markdown file per event (see [Add an event](#add-an-event)). Pages: `src/pages/events/`. Rules: `src/lib/events/`; collection setup: `src/content.config.ts`. |
| **Tests** | `tests/` | Automated tests (`npm test`, `npm run test:pages`). Fictional fixture events: `tests/fixtures/events/`. |
| **Photo approval record** | `docs/PHOTO-LOG.md` | Source, privacy review, and approval for every published photo. |
| **Styles** | `src/styles/global.css` | Colors, fonts, spacing, and buttons, defined once as "design tokens" at the top. Each component also has its own `<style>` section. |
| **Approved photos** | `src/assets/photos/` | Only approved, sanitized derivatives (metadata removed, neutral names). Never originals. |
| **Troop emblem** | `src/assets/brand/troop32-emblem.png` | 512×512 prepared copy of the Troop 32 emblem used in the header (see below). |
| **Other site files** | `public/` | Files copied as-is: `favicon.svg`, `apple-touch-icon.png`, `robots.txt`, `_headers` (security and search-engine headers for hosting), and `_redirects` (legacy redirects from the old site). See [HOSTING.md](HOSTING.md). |

## Common tasks

### Two Astro writing habits

- **Comments in pages:** write `{/* note */}` in the HTML part of an `.astro` file, or `//` comments in the top `---` section. Don't use `<!-- note -->`: those are sent to every visitor. A page test checks this.
- **Spaces before links:** if a line of text ends and the next line starts with a link or bold text, Astro drops the space between them ("visit a<a…>meeting" shows as "visit ameeting"). End the first line with `{' '}`, or keep the text and the link on one line. A page test checks this too.

### Meeting information (keep it private)

The regular meeting's day, time, and place are **not public** and are not stored anywhere in this repository ([PRIVACY.md](PRIVACY.md#regular-meetings-and-activity-logistics)). If the meeting moves or changes time, **nothing on the website changes.**

The "Our weekly meetings" card (`src/components/MeetingCard.astro`) and the footer say only that the troop meets weekly and invite families to plan a visit through the Scoutmaster. Don't add a day, time, place, address, map, or directions to them or to any page. `tests/pages/meeting-privacy.test.ts` fails the build checks if a weekday, clock time, street address, church or other place of worship, map link, or "directions" shows up in the header, footer, meeting card, page titles or descriptions, or anywhere on a non-event page.

A public event that leadership designates (see [Add an event](#add-an-event)) may still show its own date, time, and venue on its event page.

### The public contact email

The site's only public email address is the role-based **`scoutmaster@troop32.org`** (`contact.email` in `src/data/site.ts`). It appears on the Contact page and the Scoutmaster page. Mail to it is forwarded privately to the current Scoutmaster; that forwarding is set up by troop leadership **outside this repository**.

- **Never** put the forwarding destination, a personal email address, or a phone number anywhere in this repository: not in pages, docs, tests, or commit messages. The repository is public.
- When the Scoutmaster changes, the forwarding is normally updated, not the website.
- A page test fails if any other email address or a phone number appears on the site.

### Update the Scoutmaster page

The Scoutmaster has a short page at **`/about/scoutmaster/`** (`src/pages/about/scoutmaster.astro`). The address names the role, so it stays the same when the Scoutmaster changes. The About page links to it.

Everything on it comes from `scoutmaster` in `src/data/site.ts`:

```ts
scoutmaster: {
  displayName: 'Mr. Vickers',   // always "Mr./Mrs. Last Name", never a full name
  href: '/about/scoutmaster/',
  bio: [] as string[],          // reviewed paragraphs; empty = the "we'll share more" line
},
```

- **To add a biography:** write a few short paragraphs, have the Scoutmaster approve the exact text, then add them to `bio`, one string per paragraph. The "We'll share more about … in the future" line disappears automatically.
- **Good content:** Scouting background, time with the troop, why they volunteer. A photo needs the normal review in [PHOTO-LOG.md](PHOTO-LOG.md) and a small page change.
- **Never add:** a personal email, phone number, home address, employer, or family details.
- **When the Scoutmaster changes:** update `displayName` and clear or replace `bio`. Ask troop leadership to update the email forwarding. The "visit a troop meeting" line on the page uses "him"; adjust that wording in the page file if needed.
- Notes for the Webmaster go in the page file's top `---` section as `//` comments, which visitors never see. Don't use `<!-- -->` comments in pages: those are sent to every visitor.

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

> Events appear at **/events/** (Upcoming and Recent Adventures), **/events/archive/**, and each event's own page **/events/<file-name>/**. The homepage shows the three newest Recent Adventures (completed events only) in a text-only "Recent adventures" teaser. Upcoming events, including public/community ones, never appear there; they are listed under Upcoming on /events/. Policy: [PRIVACY.md → Events](PRIVACY.md#events-what-may-be-public-approved-e0-2026-10-07) and [Youth names](PRIVACY.md#youth-names).

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
- **Where it appears** (worked out at each build): Upcoming (a compact list: date, title, status, and summary, with no photos) for planned, postponed, and current cancelled events; **Recent Adventures** for completed events less than 12 months after their month; the **Troop 32 Archive** after that. Because the site is static, an event moves only when the site is rebuilt. Drafts, planned events whose month has passed, and cancelled events after their month have **no page** (their address shows "page not found").
- **What the page shows**: title, summary, the month (or month range), status label, destination, cover, story, and gallery. For a **public/community** event it also shows the exact date; while the event is still planned it adds the time, venue and address (or "To be announced"), and how to take part. A postponed or cancelled public event shows only its original date and venue name. A completed one keeps its date and venue name. The `uid`, the review, and who authorized the public designation are **never** shown.
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

  - **`approvedOn`** is the date the authorization to publish was **given or confirmed to the Webmaster** (for example, the date of the leader's email). Record only the **role**, never the person's name. If you don't have an authorization date, the event can't be public-community yet. Don't guess a date.
  - **Venue not decided yet?** Leave out `venue` and add `venueToBeAnnounced: true` inside `publicDetails`. The page shows "Where: To be announced" and the Upcoming list shows "Location to be announced". When the venue is known, **delete the flag** and add `venue` (the build rejects both together). Never put "TBD" or a guess in `venue`.
  - Only fill in what you've actually been told. Leave out any field you don't know (time, venue, participation) rather than guessing.

**What the build checks.** Errors (build stops): unknown fields, missing alt text or review, more than 20 gallery photos, a gallery on an event that isn't completed, public details without a public designation, a duplicate `uid`, a bad file name, a photo missing from PHOTO-LOG.md, a "completed" event in a future month, any Google Drive or Docs link, and an email address or phone number in an ordinary event. Warnings (review them): more than 12 gallery photos, a planned event whose date has passed, an email or phone number in a public/community event (confirm it is meant to be public), and a clock time or exact date in an ordinary event. Names, captions, and who is a Scout are **not** checked automatically; that is the human review.

In `npm run dev`, editing an event reloads it but doesn't rerun the cross-event checks. Run `npm run build` before committing.

### Write a public event page

The story (below the `---`) is where richer information goes once it's confirmed. A helpful structure for a public/community event:

```md
## About the event

What the event is and who it's for, in a few plain sentences.

## What to expect

What visitors will see or do, written for someone new to Scouting.

## Additional information

Anything else the public needs to know.
```

To see this layout filled in with example text, run `npm run dev:fixtures` and open the fictional "Example Community Fundraiser" page.

- **Add a section only when you have confirmed facts for it.** Until then, one honest line is enough, for example: "More details will be added here when they're available." Never publish placeholder text such as "Example text" or "TBD" headings on a real event page.
- **Put the date, time, venue, and how to take part in `publicDetails`**, not in the story. The page shows them in the "Event details" box and hides them automatically when the event is postponed, cancelled, or over.
- **Flyers (PDFs or images):** don't link or upload a flyer, and don't copy it word for word. Copy in only the facts that are meant to be public, and leave out names, personal phone numbers or emails, and meeting points. Contact details need leadership approval; the build warns if a public event contains an email address or phone number.
- **Never include** youth names beyond First L., private logistics (meeting points, transportation, attendee lists, patrols), or anything you aren't sure is public.

### The troop emblem

The header shows the Troop 32 emblem from `src/assets/brand/troop32-emblem.png`. It was prepared from the original emblem file, which is kept **outside** this repository and never modified, by:

- making the white corners outside the circle transparent, using a soft circular edge just inside the red ring so no white fringe shows on dark backgrounds;
- resizing proportionally to 512×512 PNG with no metadata.

**Header sizes (P2):** the emblem is 66 px on screens 768 px and wider, 52 px on phones, and 44 px on very narrow phones (under 360 px), so the troop name and the Menu button still fit on one row. On 768 px and wider, a third plain-text line, "SCOUTING AMERICA", sits under "SANTA ROSA, CALIFORNIA". It is hidden on phones, where there isn't room beside the Menu button. It is plain text, not the Scouting America logo. All of this is in `src/components/Header.astro`; `tests/pages/identity.test.ts` checks it.

`public/apple-touch-icon.png` is a 180×180 copy that keeps the white corners, because phones place transparent areas on black and round the corners themselves.

Never edit the artwork itself (see [CONTENT-GUIDE.md](CONTENT-GUIDE.md#the-troop-32-emblem)). If a cleaner original becomes available, regenerate these two files from it the same way.

### Change colors or fonts

Edit the design tokens at the top of `src/styles/global.css`. After changing colors, check that text still has enough contrast (see [CONTENT-GUIDE.md](CONTENT-GUIDE.md#accessibility)).

## Fonts

The site uses two open-license fonts, **self-hosted** (served from our own site, not from Google or another font service, so visitors aren't tracked):

- **Source Serif 4** for headings: sturdy and traditional, with an "established" feel.
- **Source Sans 3** for body text: very readable on screens of every size.

They are a matched pair designed to work together, and both are licensed under the SIL Open Font License. They are installed as the `@fontsource-variable/source-serif-4` and `@fontsource-variable/source-sans-3` packages.

## Search engines and redirects

The production site at `https://troop32.org` may be listed by search engines. The identical copy at `troop32.pages.dev` must not be. These settings work together:

- `indexable: true` in `src/data/site.ts` (no `noindex` meta tag);
- `public/robots.txt` allows crawling;
- `public/_headers` sends `X-Robots-Tag: noindex, nofollow` **only** for the `troop32.pages.dev` hosts;
- `site` in `astro.config.mjs` gives every page (except the 404 page) a canonical link to its `https://troop32.org/…/` address.

Never change one of them on its own. `npm run test:pages` (`tests/pages/launch.test.ts`) fails if they disagree. Details are in [HOSTING.md → Search engines](HOSTING.md#search-engines).

### Add a legacy redirect

Old addresses from the previous WordPress site are redirected in `public/_redirects`, but **only** when the old page has a clear equivalent here; everything else gets the 404 page, and `/log-in/` is never redirected. Add the address twice (with and without its trailing slash) pointing to an existing page ending in `/`, for example:

```text
/old-page/ /new-families/ 301
/old-page /new-families/ 301
```

Then run `npm run test:pages`. The full policy is in [HOSTING.md → Legacy redirects](HOSTING.md#legacy-redirects).

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

Astro prints a note that it "collects anonymous usage data". That is information about the build tool, not about website visitors. It is turned off for the hosted builds on Cloudflare Pages (`ASTRO_TELEMETRY_DISABLED=1`; see [HOSTING.md](HOSTING.md#build-configuration)). To turn it off on your own computer too, set the same environment variable, or run `npx astro telemetry disable`.
