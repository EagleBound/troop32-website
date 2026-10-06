# Development Guide

How to run, change, and build the Troop 32 website on your own computer. Written for a Scout Webmaster. No prior web-development experience is assumed.

Before changing anything, read [WORKFLOW.md](WORKFLOW.md) (how changes are planned, approved, and reviewed) and [PRIVACY.md](PRIVACY.md) (what may and may not be published).

## How the website works (in one paragraph)

The site is built with **[Astro](https://astro.build)**, a tool that turns page files into plain, fast HTML pages. You edit files in `src/`, and Astro produces the finished website in a folder called `dist/`. The finished site is *static*: just files, with no database or login, which makes it fast, cheap to host, and hard to break into. Styling is plain CSS. There is almost no JavaScript; the only script is the small menu button on phones.

## Prerequisites

- **Node.js** version **22.12 or newer** (the project was set up with Node 24). Check with:

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

## Where things live

| What | Where | Notes |
| --- | --- | --- |
| **Pages** | `src/pages/` | Each file is one page. `about.astro` becomes `/about/`; `index.astro` is the home page; `404.astro` is the "page not found" page. |
| **Shared building blocks** | `src/components/` | Header, footer, meeting card, photo frame, page header, closing call to action, and the placeholder illustrations (`Scene.astro`). |
| **Page shell** | `src/layouts/BaseLayout.astro` | The `<head>`, skip link, header, and footer that wrap every page. |
| **Repeated troop facts** | `src/data/site.ts` | Troop name, meeting day/time/place, Scoutmaster, public contact, navigation. **Change a fact here and it updates on every page.** |
| **Scouting principles** | `src/data/principles.ts` | Scout Oath, Law, Motto, Slogan, Outdoor Code. Must match [CONTENT-GUIDE.md](CONTENT-GUIDE.md). |
| **Photo slots** | `src/data/photos.ts` | Which illustration or approved photo appears in each photo spot. |
| **Styles** | `src/styles/global.css` | Colors, fonts, spacing, and buttons, defined once as "design tokens" at the top. Each component also has its own `<style>` section. |
| **Approved photos (future)** | `src/assets/photos/` | Not created yet. Only approved, EXIF-stripped photos go here (see below). |
| **Other site files** | `public/` | Files copied as-is: `favicon.svg`, `robots.txt`, and `_headers` (security headers for hosting). |

## Common tasks

### Change the meeting time or place

Edit `meeting` in `src/data/site.ts`. Every page updates automatically. Changes to public information still go through the [workflow](WORKFLOW.md), and only the **regular** meeting belongs there, never outing or event details ([PRIVACY.md](PRIVACY.md#regular-meeting-information-vs-activity-logistics)).

### Set the public contact email

When troop leadership approves an official, role-based troop address, set `contact.email` in `src/data/site.ts`. The Contact page shows it automatically. Never use a personal email address or phone number.

### Add an approved photo

Only photos approved under the troop's photo policy ([PRIVACY.md](PRIVACY.md#photos-and-images)) may be added. The repository is public.

**Never edit the original.** Photos usually come from an external source such as the troop's Google Drive. Those originals are never changed, renamed, moved, or deleted ([AGENTS.md §7](../AGENTS.md#7-external-sources-are-read-only)). Always work on a **copy**.

1. Copy only the approved photo into a private local working folder **outside this repository and outside any sync folder**. For example, use `C:\Troop32-Staging\`, not a folder inside OneDrive, Google Drive, or Dropbox. Windows sometimes puts Pictures and Documents inside OneDrive, so check first.
2. On the copy, remove location and camera data (EXIF/GPS), resize it, and give it a neutral file name with no names (for example `campout-ridge-01.jpg`).
3. Save only that approved derivative in `src/assets/photos/`.
4. In `src/data/photos.ts`, import it and set `image` and a meaningful `alt` description on the slot:

   ```ts
   import ridge from '../assets/photos/campout-ridge-01.jpg';
   // ...
   outdoor: { scene: 'ridge', image: ridge, alt: 'Scouts hiking along a ridge trail at sunrise', caption: 'Outdoor adventure' },
   ```

Astro automatically creates smaller, faster versions of the photo for phones and computers. Always double-check the built image before committing.

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
| The build shows an error | Read the first red error line: it usually names the file and line. Ask Clawson in a PLAN request to explain it. |
| Something looks very wrong after many changes | `git status` and `git diff` show exactly what changed. Nothing is permanent until it is committed. |

Astro prints a note that it "collects anonymous usage data". That is information about the build tool, not about website visitors. See [PROJECT.md](PROJECT.md) for whether it has been turned off.
