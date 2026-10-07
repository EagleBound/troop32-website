# Troop 32 Website — Project Overview

## Purpose

This repository holds the **replacement website** for Scouting America Troop 32 in Santa Rosa, California.

The new site should give prospective families, the community, and current members clear, accurate, and safe information about Troop 32. It should be something a Scout Webmaster can understand, maintain, and hand on to the next Webmaster.

The replacement site is currently a **development project**. The existing production website at troop32.org stays untouched (see [Development vs. production](#development-vs-production)).

## Project phases

The project has two phases. They separate building the first website from the permanent Webmaster position.

| | Phase 1: Initial development | Phase 2: Scout Webmaster stewardship |
| --- | --- | --- |
| **What** | Design and build Website v1.0 | Keep the website accurate, useful, safe, current, and improving |
| **Duration** | Temporary; ends at [handoff](#handoff-to-scout-stewardship) | Permanent operating model |
| **Directing human** | Adult project lead | Scout Webmaster |
| **Tools** | ChatGPT for planning/review, Clawson for implementation | ChatGPT for planning/teaching/review, Clawson for implementation |

**Why two phases?** Building an entire website from scratch, under a recruiting deadline, is not a fair or consistent responsibility to place on one Scout. If the first Webmaster had to build the site while every later Webmaster inherited a working one, the position would mean something different for each Scout. Adult volunteers therefore build v1.0, and Scout Webmasters receive a functioning, understandable, documented website, not an unfinished development assignment.

**Phase 1 does not redefine the Webmaster position.** It is a temporary adult-led project phase.

The same safeguards apply in both phases: the PLAN → `EXECUTE:` gate, privacy rules, security boundaries, public-repository rules, production restrictions, factual-verification standards, Git safeguards, and documentation requirements. See [WORKFLOW.md](WORKFLOW.md#which-workflow-applies).

### Current phase

**Phase 1: Initial development (Website v1.0).**

This line is the single source of truth for the active phase. It changes only through an approved PLAN → `EXECUTE:` work package with designated adult leader approval, recorded in the [decision log](#decision-log).

## The Webmaster position

> **The Troop 32 Webmaster is the Scout responsible for helping keep the Troop's website accurate, useful, safe, current, and improving over time.**

The position should be substantially the same from one Webmaster to the next. The Scout Webmaster may:

- identify stale or incorrect content;
- update appropriate public information;
- add or replace approved photographs and content;
- identify usability problems;
- propose improvements;
- discuss design and technical options with ChatGPT;
- prepare work requests;
- review Clawson's PLAN responses;
- authorize approved implementation through the documented [workflow](WORKFLOW.md);
- review implementation results and Git diffs;
- commit and push approved changes;
- help document the website;
- and participate in an orderly handoff to the next Webmaster.

**Advanced programming ability is not a prerequisite.** A Scout with technical interest may choose to learn HTML, CSS, JavaScript, Git, accessibility, design, or other skills and contribute more directly to implementation. Another Scout may rely more on ChatGPT and Clawson while exercising good judgment, communication, review, content stewardship, and leadership. **Both can be successful Webmasters.**

The AI-assisted workflow should make the Scout more capable, not reduce the Scout to approving individual keystrokes.

## Troop 32 identity

Organizationally, Troop 32 is two Scouting America troops:

| Troop | Members |
| --- | --- |
| **Troop 32-B** | Boys |
| **Troop 32-G** | Girls |

The two troops normally meet together and take part in outings together. In ordinary public communication they are referred to together simply as **Troop 32**.

- Use **"Troop 32"** for general public content.
- Use **"Troop 32-B"** or **"Troop 32-G"** only when the organizational distinction matters. Examples: certain awards, leadership positions or changes, registrations, and records.
- Do not split ordinary public content into separate boys' and girls' versions.

**Regular meetings (approved for public use):** Troop 32 normally meets on **Mondays at 7:00 PM** at **Santa Rosa Bible Church, 4575 Badger Road, Santa Rosa, California**. This approval covers the *regular* meeting only. See [PRIVACY.md](PRIVACY.md#regular-meeting-information-vs-activity-logistics).

**Current Scoutmaster:** James Vickers.

**Tagline:** "Eagle Bound!" is an existing repository/project tagline. It is **not** described as an official Troop 32 motto unless troop leadership confirms that.

Other troop facts, such as history, traditions, and leadership beyond the Scoutmaster, are **not yet confirmed** for this project. See [Open content items](#open-content-items-requiring-confirmation).

## Ownership and succession

The website, repository, documentation, operating rules, account arrangements, and project history belong to the **Troop 32 Webmaster program**. They do not belong to any individual Scout, parent, adult leader, adult volunteer, or AI assistant.

- The Webmaster position changes over time. When a new Scout becomes Webmaster, these rules and documents remain in effect.
- Avoid designs, accounts, or knowledge that depend on one particular person or tool. Write down how things work.
- Accounts and services created during Phase 1 should be troop-owned and documented, not tied to a volunteer's personal account. Credentials are never stored in the repository.
- Changes to the operating rules themselves are major governance changes and need designated adult leader approval (see [WORKFLOW.md](WORKFLOW.md#changing-these-rules)).

## Roles

| Role | Responsibility |
| --- | --- |
| **Scout Webmaster** | The [Webmaster position](#the-webmaster-position). Directing human in Phase 2: sets direction, makes ordinary website decisions, reviews and authorizes plans, reviews changes, commits and pushes. Participates in the handoff at the end of Phase 1. |
| **Adult project lead** | Phase 1 only. Directs initial development of Website v1.0: prepares work requests, reviews plans, authorizes execution, reviews changes, commits and pushes, and prepares the handoff. |
| **Designated adult leader** | Approves matters involving youth safety, youth/member privacy policy, credentials, production access, machine/system administration, major governance changes, phase changes, and other matters requiring adult oversight. This is a role, not a named person. It is distinct from the adult project lead, though one person may hold both roles. |
| **Troop leadership** | Approves privacy policy affecting youth/member information and confirms troop facts for public content. |
| **ChatGPT** | Planning, teaching, prompt-engineering, and review resource used by the directing human. |
| **Clawson** | The website's AI technical assistant (in Phase 2, the Webmaster's technical assistant). Plans and, when explicitly authorized, implements approved work. Never the Webmaster or the adult project lead. |

## Intended audiences

1. **Prospective families**, including families new to Scouting.
2. **Community members** and partner organizations.
3. **Current Scouts and families** looking for general public information.
4. **Members**, through a *future* authenticated area. Not yet designed (see [Major unresolved decisions](#major-unresolved-architectural-decisions)).

## Objectives

- Clear, welcoming, accurate public information about Troop 32 and Scouting.
- Privacy by design, appropriate for a youth organization.
- Accessible to people with disabilities from the start (see [CONTENT-GUIDE.md](CONTENT-GUIDE.md#accessibility)).
- Maintainable by a Scout Webmaster, with documented decisions.
- Continuity across Webmaster successions.

## Website v1.0 objectives (temporary)

> **Temporary section.** This applies to Phase 1 only. When v1.0 launches and is handed off, mark this section *completed* rather than deleting it, so the history stays readable.

Website v1.0 has an immediate practical objective: give Troop 32 a **polished, useful public website suitable for its upcoming recruiting Open House**.

That deadline sets the priorities for initial development:

1. Public recruiting experience first.
2. Prospective-family information first.
3. Mobile-friendly presentation.
4. Clear meeting and join information.
5. Trustworthy and current content.
6. Polished public appearance.
7. Privacy and safety.
8. A realistic v1.0 scope.

Features not needed for the recruiting launch, **especially authenticated/member functionality**, remain future work. The v1.0 launch scope is marked in [SITE-MAP.md](SITE-MAP.md).

**The deadline does not relax any safeguard.** In particular:

- Launching or deploying the site is its own approved work package. Any change to troop32.org, its hosting, or DNS needs designated adult leader approval.
- ~~The youth-photo policy is still open.~~ **Resolved 2026-10-07 (E0):** recognizable Scouts may appear in approved photos of ordinary Scouting activities ([PRIVACY.md](PRIVACY.md#youth-names-photographs-and-recognition)). The individually approved privacy-class-B photos on the development site ([PHOTO-LOG.md](PHOTO-LOG.md)) fall within that policy.
- Unconfirmed troop facts stay out of public content.

## Handoff to Scout stewardship

Phase 1 ends when Website v1.0 is operational and suitable for handoff. **Draft handoff criteria** (to be confirmed by the designated adult leader):

- [ ] The v1.0 public site is live and working.
- [ ] How to update content and maintain the site is documented in this repository.
- [ ] Accounts, domains, and hosting are troop-owned, and the people with access are documented. Credentials are not stored in the repository.
- [ ] Known issues and planned future work are listed.
- [ ] The Scout Webmaster has had a walkthrough of the site, the documentation, and the workflow.
- [ ] The designated adult leader confirms the handoff, and the [Current phase](#current-phase) is changed to Phase 2 through an approved work package.

## Architectural principles

- **Privacy by design.** Decide what is public deliberately. Default to private when uncertain.
- **Public/member separation.** Public content and future member-only content are kept clearly separate. Private information is never placed on the public site "temporarily."
- **No secrets or private data in the repository.** The repository is treated as public (see [PRIVACY.md](PRIVACY.md#repository-rules)).
- **Simple and maintainable over clever.** Prefer approaches a Scout can understand and maintain.
- **Few, well-known dependencies.** Each one is justified and reported.
- **GitHub is the durable project record.** History, decisions, and documentation live in the repository so future Webmasters can follow what happened and why.
- **External sources are immutable originals.** AI agents only read and copy from Google Drive, photo libraries, shared folders, and similar sources, and never change them. Work happens on local copies, and only approved public derivatives enter the repository. This is a permanent program-level boundary. See [AGENTS.md §7](../AGENTS.md#7-external-sources-are-read-only).

## Development vs. production

| | Production | Replacement (this repository) |
| --- | --- | --- |
| Where | troop32.org (existing site) | Developed locally and in GitHub |
| Status | Live, **must remain untouched** | In development |
| Access | No administrative access of any kind without separate explicit authorization | Normal development under the [workflow](WORKFLOW.md) |

Launching v1.0 and any cutover from the old site to the new site are **separate, explicitly approved work packages**. They need designated adult leader approval because they involve production and credentials.

## Current project status

- **Phase 1: Initial development (Website v1.0).**
- Governance and project documentation established (this document set).
- Design references reviewed during Website v1.0 planning (see [DESIGN-REFERENCES.md](DESIGN-REFERENCES.md)).
- **WP1 local foundation built:** an Astro static site with all v1.0 pages (Home, About, What We Do, New Families, Join, Contact, Privacy, Accessibility, 404), the design system, central site data, and original placeholder illustrations. See [DEVELOPMENT.md](DEVELOPMENT.md).
- **Balanced 2026 photography integrated:** 11 human-approved photos from six Troop 32 events: Melita Island, Philmont, Eagle service projects, snow camping, a pancake breakfast, and the Chill Outing. Each photo is used once. The homepage has the hero, three program cards, and a four-photo "Scouting in action" mosaic led by a wide Philmont summit panorama. What We Do has one photo per section. No slot still shows a placeholder illustration. The full arrangement, the reasons for it, and each photo's privacy review are in [PHOTO-LOG.md](PHOTO-LOG.md).
- **Events data model built (E1):** an `events` content collection with a strict schema, Upcoming / Recent Adventures / Archive classification, build-time content checks, and automated tests (`npm test`). No event records yet ([DEVELOPMENT.md → Add an event](DEVELOPMENT.md#add-an-event)).
- **Events pages built (E2):** `/events/`, `/events/archive/`, and `/events/<slug>/`, with Events in the header and footer navigation. Fictional fixture mode (`npm run dev:fixtures`) previews them with test data.
- **First real events and homepage teaser (E3):** five 2026 events (Philmont Trek, Melita Island, Chill Outing, Snow Camping, Pancake Breakfast), month-level dates, summaries only, using only already-approved photos ([PHOTO-LOG.md → Event pages](PHOTO-LOG.md#event-pages)). The homepage shows up to three text-only event cards between the photo mosaic and the Scout Law. Eagle service projects are not yet event pages.
- **First upcoming public event:** Pancake Breakfast, Sunday, March 7, 2027, designated public/community by the designated adult leader; location to be announced. Upcoming events on `/events/` use a compact list. The breakfast appears under Upcoming there, not on the homepage.
- **Not yet deployed.** No hosting account, preview URL, or DNS change exists. The site is marked `noindex` until launch.
- **Public contact channel pending.** The Contact page uses the Monday meeting as the contact pathway until leadership approves a role-based troop address (`contact.email` in `src/data/site.ts`).
- **Astro telemetry:** the Astro build tool sends anonymous usage data about the tool (not about website visitors) unless disabled. Turning it off is a pending decision (see the WP1 execution report).

### Website v1.0 technical architecture

| Area | Choice |
| --- | --- |
| Site type | Static site: plain HTML/CSS files, no database, no server code |
| Framework | [Astro](https://astro.build) (static output) |
| Styling | Plain modern CSS with design tokens; no Tailwind, no UI framework |
| JavaScript | Only the accessible mobile-menu toggle; FAQ uses native HTML disclosure (`<details>`) |
| Identity | Troop 32 Santa Rosa emblem (`src/assets/brand/troop32-emblem.png`) beside the text "Troop 32 / Santa Rosa, California" in the global header; Apple touch icon from the same emblem; the "32" SVG favicon remains |
| Fonts | Source Serif 4 + Source Sans 3, self-hosted, SIL Open Font License |
| Images | Astro responsive images (WebP at several widths) from approved, sanitized derivatives in `src/assets/photos/`; separate photo slot per page section in `src/data/photos.ts`, each photo used once; homepage mosaic of wide (panoramic) and square tiles; original SVG illustrations as the fallback for any slot without a photo |
| Repeated facts | `src/data/site.ts` |
| Events data | Astro content collection `events` (`src/content.config.ts`): one Markdown file per event in `src/content/events/`, file name = permanent slug, `uid` = permanent ID for a future member area. Strict schema, classification, and checks in `src/lib/events/` (no Astro imports, so they are testable). Classification happens at build time in the America/Los_Angeles time zone |
| Events pages | `src/pages/events/` (`index`, `archive`, `[slug]`), components in `src/components/events/`. Pages receive only an allowlisted public view of each event (`src/lib/events/present.ts`); classification comes only from `classify.ts`. No JavaScript |
| Tests | Node's built-in test runner (`npm test`), no test dependencies; requires Node 22.18+. `npm run test:pages` checks the built pages in the normal build and in fixture mode (fictional records in `tests/fixtures/events/`, built to `dist-fixtures/`) |
| Security | Static-host headers in `public/_headers` (strict Content-Security-Policy, no inline scripts or styles) |
| Hosting | Not yet connected. Recommended: Cloudflare Pages from GitHub, troop-owned accounts (a separate work package) |

Future member functionality is a separate project and is not part of this architecture.

### Content still needing confirmation before launch

The v1.0 pages avoid unconfirmed facts by using general Scouting descriptions. These items should be confirmed or supplied:

- That prospective families are welcome to visit a regular Monday meeting (the site invites them to).
- The current Scouting America rank list and Eagle Scout requirements as summarized on What We Do, and the current program terminology (external verification).
- Official Scouting America links (youth protection, applications) to add to New Families and Join.
- Age and grade eligibility, costs, and uniform and gear guidance (currently general: "troop leaders can explain").
- The public role-based contact address.

- Confirmation by troop leadership that the Troop 32 emblem's Scouting America–derived fleur-de-lis elements are used consistently with current Scouting America brand guidance.

## Major unresolved architectural decisions

Each of these needs its own PLAN and approval before anything is built:

1. **Launch target and hosting for v1.0.** Whether v1.0 launches at a new address or replaces troop32.org, where it is hosted, and who holds the accounts. This is the most deadline-sensitive decision.
2. ~~**Site technology.**~~ Decided 2026-10-06: Astro static site (see the decision log).
3. **Future member area:** authentication provider, data storage, account management, authorization model, and hosting of private information. This also needs a privacy review and designated adult leader approval.
4. **Contact method.** How the public reaches the troop (an official troop channel, not personal addresses).
5. **Content management.** How Scout Webmasters and non-technical leaders could supply updates.
6. ~~**Photo sources.**~~ Decided 2026-10-06: authorized read-only external source → private staging → full-resolution review → human approval → sanitized derivative → repository ([PHOTO-LOG.md](PHOTO-LOG.md)). Youth-photo policy decided 2026-10-07 (E0; see [PRIVACY.md](PRIVACY.md#youth-names-photographs-and-recognition)).
7. **Cutover plan** from the existing production site.
8. **Events area.** Policy decided 2026-10-07 (E0): navigation label **Events**, containing Upcoming Events, Recent Adventures (completed less than 12 months ago), and the Troop 32 Archive (12 months or older), plus an approved homepage teaser. Galleries normally hold 6–12 photos, with a warning above 12 and a hard maximum of 20. Private event data lives outside this repository and links by a stable event identifier ([PRIVACY.md → Events](PRIVACY.md#events-what-may-be-public-approved-e0-2026-10-07)). **Data model, classifier, and gallery validation built in E1** (2026-10-07). **Pages and navigation built in E2; homepage teaser and first real events in E3.** **Not built yet:** scheduled rebuilds and the member system each need their own PLAN and approval.

## Open content items requiring confirmation

These came from the existing public site and may be stale. They must be **confirmed by troop leadership** before public use:

- Troop history (the old site says the troop was founded in the early 1900s, restarted in 1946, and is among the oldest troops in Sonoma County).
- The age and grade range served and the program description.
- Costs and fees.
- Leadership positions other than the Scoutmaster, and contact arrangements.
- Whether "Eagle Bound!" is an official troop motto.

## Decision log

| Date | Decision | Approved by |
| --- | --- | --- |
| 2026-10-06 | Adopted the PLAN/EXECUTE operating model, Git policy, privacy-first rules, and initial documentation set ([AGENTS.md](../AGENTS.md)). | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Treat the GitHub repository as public. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Regular Monday 7:00 PM meeting at Santa Rosa Bible Church approved as public information. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | "Troop 32" is the normal public identity; 32-B / 32-G used only where the distinction matters. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | No feature branches or pull requests required at this stage; the directing human commits and pushes to `main`. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Two-phase model: Phase 1 adult-led initial development of Website v1.0; Phase 2 permanent Scout Webmaster stewardship. Current phase: Phase 1. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Adopted the Webmaster position definition; advanced programming ability is not a prerequisite. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | The PLAN → `EXECUTE:` gate is mandatory in both phases. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Adult project lead and designated adult leader are distinct roles that one person may hold. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Website v1.0 priority: a recruiting-ready public site for the upcoming Open House; member functionality deferred. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Recorded three neighboring troop websites as design references, not templates ([DESIGN-REFERENCES.md](DESIGN-REFERENCES.md)). | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Website v1.0 architecture: Astro static site, plain CSS, TypeScript where Astro uses it, minimal JavaScript, self-hosted open-license fonts. No Tailwind or UI framework. | Adult project lead, via approved EXECUTE work package (WP1) |
| 2026-10-06 | Design direction "trail-worn and trustworthy": forest / cream / charcoal / khaki with one warm accent; text identity "Troop 32, Santa Rosa, California"; no Scouting America marks or assumed troop emblem. *(The text-only identity part is superseded below by the approved troop emblem.)* | Adult project lead, via approved EXECUTE work package (WP1) |
| 2026-10-06 | v1.0 page set and navigation: Home, About, What We Do, New Families, Join (prominent), plus Contact, Privacy, Accessibility, 404 ([SITE-MAP.md](SITE-MAP.md)). | Adult project lead, via approved EXECUTE work package (WP1) |
| 2026-10-06 | WP1 local foundation built; not deployed. | Adult project lead, via approved EXECUTE work package (WP1) |
| 2026-10-06 | Permanent rule: external sources (Drive, Dropbox, OneDrive, SharePoint, Box, photo libraries, shared folders, their synced local folders, and similar) are read-only for AI agents. The rule cannot be overridden by EXECUTE or a direct request; changing it requires a designated-adult-approved governance amendment ([AGENTS.md §7](../AGENTS.md#7-external-sources-are-read-only)). | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | PLAN may use short-lived, disclosed scratch files in a system temporary folder for analyzing authorized material ([AGENTS.md §3](../AGENTS.md#3-plan-mode-the-default)). | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Photos from the Troop 32 Google Drive collection the adult project lead authorizes are troop-controlled and authorized for public website use; each individual photo still requires full-resolution review and human publication approval, recorded in [PHOTO-LOG.md](PHOTO-LOG.md). | Adult project lead |
| 2026-10-06 | First real photos published: 3 from Melita Island 2026 (all privacy class B after full-resolution review). Separate photo slots per page; illustrations intentionally retained for future event collections; homepage mosaic hidden until 4+ photos from 3+ events. | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | **Supersedes the text-only identity:** the Troop 32 Santa Rosa emblem, supplied and approved by the adult project lead, is the site's primary visual identity in the global header (56 px desktop, 44 px mobile), with the text identity kept alongside it; also used as the Apple touch icon. Not used in the footer, hero, or favicon. The emblem contains Scouting America–derived fleur-de-lis elements; **open item before public launch:** troop leadership to confirm against current Scouting America brand guidance (no legal conclusion made). See [CONTENT-GUIDE.md](CONTENT-GUIDE.md#the-troop-32-emblem). | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Permanent Google Drive access boundary for AI agents: only the "Troop 32 Photos" folder and its descendants, reached top-down. All other Google Drive content is out of bounds, regardless of account permissions or link sharing. Folder IDs and URLs are never committed; the directing human supplies them at runtime. Non-media files are not opened unless authorized. Work packages may narrow but never widen access; changing the root requires a designated-adult-approved governance amendment ([AGENTS.md §7](../AGENTS.md#google-drive-access-scope-permanent)). | Adult project lead, via approved EXECUTE work package |
| 2026-10-06 | Eight more photos published from five 2026 collections (Philmont, Eagle service projects, snow camping, pancake breakfast, Chill Outing), each personally approved by the adult project lead. The sleeping-outdoors photo was approved over a flagged sensitive-setting concern, because sleeping outdoors is a defining feature of the Chill Outing. The kitchen photo was published with a privacy crop that excludes a legible recurring-schedule sheet and an "Eagle Scout" cap. Caption "Summit day, Philmont Scout Ranch" approved; no dates, crew numbers, or itinerary. | Adult project lead |
| 2026-10-06 | Balanced photo arrangement: hero unchanged (Melita trail walk); Philmont summit as the wide lead tile of the homepage mosaic rather than the hero; patrol huddle moved to What We Do › Leadership and sailing moved to the mosaic; each photo used once; no event more than twice per page ([PHOTO-LOG.md](PHOTO-LOG.md#where-each-photo-is-used)). The troop-wide youth-photo policy remains an open **pre-launch** item. | Adult project lead, via approved EXECUTE work package |

| 2026-10-07 | **Youth photographs (E0):** recognizable Scouts may appear in approved public photos of ordinary Scouting activities, after full-resolution review and human approval. Each photo still gets a privacy review for sensitive content in the frame. Resolves the earlier pre-launch youth-photo item ([PRIVACY.md](PRIVACY.md#photographs-of-scouts)). | Adult project lead, via approved EXECUTE work package (E0) |
| 2026-10-07 | **Names (E0):** youth are identified only as First name + last initial, never by full name. Names appear in captions only with editorial value, and normally not in alt text. Adults may be identified as Mr./Mrs. Last Name. No youth names, even abbreviated, in URLs or slugs ([PRIVACY.md](PRIVACY.md#youth-names)). | Adult project lead, via approved EXECUTE work package (E0) |
| 2026-10-07 | **Eagle projects (E0):** completed projects may publicly name the Scout as First L., with a project-descriptive slug. ~~Upcoming projects don't name the Scout where that would tie a named minor to a future activity or location.~~ *(Superseded by the E0 clarifications below: Eagle projects have no separate naming convention.)* | Adult project lead, via approved EXECUTE work package (E0) |
| 2026-10-07 | **Events (E0):** ordinary troop events are public only at a general level (name, month/year, description, well-known destination such as Camp Meriwether, Melita Island, or Philmont Scout Ranch). Leadership may explicitly designate public/community events (for example the Annual Pancake Breakfast or an Open House), which may then show exact date, time, venue, and admission details. Private logistics never enter the public repository, even as unrendered fields. A future member system will hold private information separately and link it by a stable event identifier ([PRIVACY.md → Events](PRIVACY.md#events-what-may-be-public-approved-e0-2026-10-07)). | Adult project lead, via approved EXECUTE work package (E0) |
| 2026-10-07 | **Swimming/aquatic photos (E0):** contextual editorial judgment. Ordinary boating and sailing photos are acceptable, and incidental background swimwear and boys' ordinary swim shorts are generally acceptable. A photo with a girl in a swimsuit as a prominent or high-resolution subject requires specific designated adult leader approval. `water-sailing-01.jpg` stays approved and is not re-reviewed ([PRIVACY.md](PRIVACY.md#swimming-and-aquatic-photographs)). | Adult project lead, via approved EXECUTE work package (E0) |
| 2026-10-07 | **Galleries, recency, retention (E0):** approved photos may appear in an event gallery and elsewhere ("use once" applies to general page slots only). Galleries normally hold 6–12 photos, with a warning above 12 and a hard maximum of 20. Completed events under 12 months old are Recent Adventures; older ones go to the Troop 32 Archive. The Archive is kept indefinitely by default, and leadership can remove or revise a youth's name, photo, caption, or record on a family/privacy concern. Policy only; nothing implemented. | Adult project lead, via approved EXECUTE work package (E0) |
| 2026-10-07 | **Events navigation (E0):** future primary navigation label "Events" (Upcoming Events, Recent Adventures, Troop 32 Archive), plus a homepage teaser. PHOTO-LOG.md keeps its single-file structure for now. No change to the Google Drive access boundary. Not implemented. | Adult project lead, via approved EXECUTE work package (E0) |
| 2026-10-07 | **E0 clarification: real names and upcoming Eagle projects.** (1) Actual public content and historical records use the Scout's **real** first name and last initial when naming is editorially appropriate. A fictional or placeholder identity is never substituted for a real Scout. Fictional names such as *Jordan Q.* appear only in documentation, templates, tests, and examples. (2) **Supersedes the upcoming-project restriction in the Eagle row above:** an upcoming Eagle project may name the Scout as First L. with month/year and a general description, within ordinary-event limits (no exact date or time, rendezvous, specific operational location, transportation, attendees, or other logistics). The public-event exception applies only if leadership affirmatively designates the project as public. (3) Youth names still never appear in URLs (e.g. `/events/eagle-project-trail-bench-2027/`). ([PRIVACY.md](PRIVACY.md#named-scouts-in-event-content-including-eagle-projects)) *(The Eagle-specific framing is superseded by the final naming clarification below.)* | Adult project lead, via approved EXECUTE work package (E0 clarification) |
| 2026-10-07 | **E0 final naming and privacy clarification.** Naming depends on whether the person is a Scout or an adult, **not on the type of event or content.** Scouts: real First L. throughout public content (events, captions, Eagle projects, courts of honor, service, camp and leadership stories, awards, historical records); never a full last name; never a fictional identity for a real Scout. Adult leaders: Mr. or Mrs. Last Name. Eagle projects have no separate convention; the ordinary vs. designated-public event rules decide what logistics accompany a name. Names never appear in URLs. Purpose recorded: reduce publicly available information that could help someone identify or locate Scouts (it mitigates, not eliminates, the risk). The Webmaster is the human review point for youth/adult classification, names, captions, and the public/private boundary. Unknown youth/adult status is not guessed, and no system is built to store or infer it ([PRIVACY.md → Youth names](PRIVACY.md#youth-names)). | Adult project lead, via approved EXECUTE work package (E0 final naming and privacy clarification) |
| 2026-10-07 | **Events data model (E1):** Astro `events` content collection; one durable record per event whose file name is the permanent, lowercase kebab-case slug (max 60 characters; including the year recommended, not required; never youth names). Separate immutable `uid` (`evt-` + 8 characters) for a future member area. Strict schema: unknown fields rejected, so private logistics have nowhere to go. Statuses planned / completed / cancelled / postponed; month-level dates. Exact public date, time, venue, and participation only in `publicDetails` of a `public-community` event, which requires a recorded authorization by the Scoutmaster, Committee Chair, or designated adult leader. Every non-draft event requires a recorded human review (Webmaster or adult project lead). Drafts are not rendered but are not private. Required alt text; gallery only on completed events, hard maximum 20, warning above 12; every photo must have a PHOTO-LOG.md entry; planned events may use an approved cover photo. | Adult project lead, via approved EXECUTE work package (E1) |
| 2026-10-07 | **Event classification (E1):** troop time zone America/Los_Angeles, computed at build. Planned: Upcoming through its month (or exact public date), then hidden and flagged "needs update" (never assumed completed). Postponed: Upcoming, "Postponed; new date to be announced", no age limit; becomes planned with the new month when known. Cancelled: Upcoming, "Cancelled", through its month, then hidden. Completed: Recent Adventures for under 12 months after its (end) month, Archive from 12 months. Multi-month events use `endMonth`. | Adult project lead, via approved EXECUTE work package (E1) |
| 2026-10-07 | **Event content checks (E1):** Google Drive/Docs links are build errors everywhere. Email addresses and North American phone numbers are errors in ordinary events and warnings in public-community events. Clock times and exact dates in ordinary events are warnings. No automated detection of youth names or Scout/adult status, and no roster; names stay with human review. Tests use Node's built-in runner with fictional data; no new dependencies. Node requirement raised to 22.18+. | Adult project lead, via approved EXECUTE work package (E1) |
| 2026-10-07 | **Events pages (E2):** routes `/events/` (Upcoming, Recent Adventures, Archive link), `/events/archive/` (one page, grouped by year; no per-year routes), and `/events/<slug>/`. Navigation: About · What We Do · Events · New Families · Join, plus a footer link. Drafts, needs-update events, and past cancelled events have no page (404). Pages receive only an allowlisted public view (`present.ts`); `uid`, review, designation approval, and draft state never reach them. Ordinary events show month-level dates only. Public-community events: while planned, exact date, time, venue and address (plain text, no map link), and participation; postponed or cancelled, original date and venue name only; completed, date and venue name only. Static captioned gallery, no lightbox or JavaScript; card covers reuse the governed alt text. Approved empty-state text; the Events pages are not presented as the full troop calendar. Homepage teaser deferred to E3. | Adult project lead, via approved EXECUTE work package (E2) |
| 2026-10-07 | **Event check additions (E2):** `archive` is a reserved slug; images or embedded media (image, picture, video, audio, iframe, embed, object, script) in an event's story are build errors, so photos only enter through `cover`/`gallery`; a level-one `#` heading in the story is a warning. | Adult project lead, via approved EXECUTE work package (E2) |
| 2026-10-07 | **Fixture mode (E2):** fictional event records and artificial placeholder graphics (not photographs) in `tests/fixtures/events/`, loaded only by `scripts/fixtures.mjs`, built to `dist-fixtures/` with a separate cache and a "Fictional test data" banner on every page. Never associated with real Troop 32 photos or Scouts. | Adult project lead, via approved EXECUTE work package (E2) |
| 2026-10-07 | **Homepage Events teaser (E3):** up to 3 text-only cards (no photos, so homepage photos aren't repeated), placed between the "Scouting in action" mosaic and the Scout Law. ~~Selection works only on the already-classified public views: planned public-community events first (soonest first), then Recent Adventures (newest first). Ordinary upcoming, postponed, and cancelled events are not featured.~~ *(Selection rule superseded below: Recent Adventures only.)* The section is omitted when nothing qualifies. The rest of the homepage is unchanged. | Adult project lead, via approved EXECUTE work package (E3) |
| 2026-10-07 | **First real events (E3):** Melita Island (2026-07), Chill Outing (2026-08), Philmont Trek (2026-06), Snow Camping (2026-03), Pancake Breakfast (2026-03). Months are human-supplied estimates approved for month-level publication; a later Webmaster may correct them. Approved titles and short summaries only, no stories. Destinations only for Melita Island and Philmont Scout Ranch. All ordinary (Pancake Breakfast is not a public-community event). Covers and galleries reuse only already-approved photos; small galleries accepted. Eagle service projects are left out pending a fresh privacy review. Review recorded as the adult project lead, 2026-10-07. | Adult project lead, via approved EXECUTE work package (E3) |
| 2026-10-07 | **Compact Upcoming list and location to be announced:** Upcoming events on `/events/` are a compact list (one row per event: date column, title, status, summary; no photos). Recent Adventures and the Archive keep photo cards. New `publicDetails.venueToBeAnnounced: true` (public-community events only, never together with `venue`) shows "To be announced" while the event is planned. Clarified that `publicDesignation.approvedOn` is the date authorization to publish was given or confirmed to the Webmaster; the authorization requirement is unchanged. Example page sections (About the event, What to expect, Additional information) live only in a fictional fixture and in DEVELOPMENT.md guidance. | Adult project lead, via approved EXECUTE work package |
| 2026-10-07 | **Pancake Breakfast 2027 (first upcoming public event):** planned public-community event on Sunday, March 7, 2027; location to be announced. Public designation authorized by the designated adult leader (role recorded; name not stored), confirmed 2026-10-07. Summary "Troop 32's pancake breakfast is open to the public." and the line "More details will be added here when they're available." No venue, time, price, menu, tickets, contact, participation details, names, or images. ~~Leads the homepage teaser under the existing E3 rule.~~ *(Superseded below: upcoming events are not on the homepage.)* | Adult project lead, via approved EXECUTE work package |
| 2026-10-07 | **Homepage teaser shows recent completed events only (post-review correction):** "Recent adventures" on the homepage now shows only the first three items of the Recent Adventures view (completed, under 12 months, newest first), and is omitted when there are none. Upcoming events, including public-community ones, never take a slot. **Supersedes** the E3 rule that put planned public-community events first. **Reason:** the section should showcase actual recent Scout activities; upcoming public events could otherwise displace that content, and they already have their place under Upcoming on `/events/`. The unused `publicEvent` presentation field was removed. The heading stays "Recent adventures"; no homepage Upcoming section. | Adult project lead, via approved EXECUTE work package |

Add new rows as decisions are made. Record who approved each decision by role.
