# Site Map

> **PROPOSED — NOT FINAL**
>
> This is an initial information architecture for discussion. Nothing here is decided until the directing human for the current phase (and, where required, the designated adult leader and troop leadership) approves it. See [PROJECT.md → Current phase](PROJECT.md#current-phase). Page names, groupings, and contents will change.

## Implemented v1.0 structure (approved in WP1)

The long-term map below is still proposed. For v1.0, several entries were **combined** into fewer pages:

| URL | Page | Combines these entries from the map below |
| --- | --- | --- |
| `/` | Home | Home, plus short sections on the Scout Law, safety, and Troop 32-B / 32-G |
| `/about/` | About | About Troop 32, Troop 32-B and Troop 32-G, Troop leadership, Scout Oath / Scout Law / Scouting values |
| `/what-we-do/` | What We Do | What Scouts Do, Outdoor activities, Service, Advancement, The Eagle Scout journey |
| `/new-families/` | New Families | What Is Scouting?, Information for new families, safety for parents |
| `/join/` | Join | Join Troop 32, Regular meetings |
| `/about/scoutmaster/` | Mr. Vickers, Scoutmaster | Short Scoutmaster page; biography to be added later (L1) |
| `/contact/` | Contact | Contact (Monday meeting or scoutmaster@troop32.org) |
| `/privacy/` | Privacy | Privacy |
| `/accessibility/` | Accessibility | Accessibility |
| `/events/` | Events | Upcoming events (compact list, no photos), Recent Adventures (photo cards), and a link to the Archive (added in E2) |
| `/events/archive/` | Troop 32 Archive | Completed events 12 months or older, by year (E2) |
| `/events/<slug>/` | One event | Permanent page for each event shown in a view (E2) |
| (any unknown URL) | 404 | Page-not-found help |

**Header navigation:** About · What We Do · Events · New Families · **Join** (prominent). Events is also in the footer's Explore list. Contact, Privacy, and Accessibility are in the footer. A separate Photos page is superseded by the Events area, and the member area remains future work. Real photos from six 2026 Troop 32 events appear on Home (hero, program cards, and a "Scouting in action" mosaic) and What We Do ([PHOTO-LOG.md](PHOTO-LOG.md#where-each-photo-is-used)). These fall within the youth-photo policy approved 2026-10-07 (E0).

## Public site

The **v1.0 launch** column is a *proposed* scope for the recruiting-ready Website v1.0 (see [PROJECT.md → Website v1.0 objectives](PROJECT.md#website-v10-objectives-temporary)). "Yes" means the page is proposed for launch, provided its content is confirmed. "Later" means future work. "On hold" means it is blocked by an open policy question.

| Section / page | v1.0 launch | Purpose | Main audience | Notes and open questions |
| --- | --- | --- | --- | --- |
| **Home** | Yes | Welcome, what Troop 32 is, how to visit or join | Prospective families, community | Could feature the regular Monday meeting and a link to "Join." Tagline use ("Eagle Bound!") is to be decided. |
| **About Troop 32** | Yes | Who we are | Everyone | History must be confirmed by leadership before use (see [PROJECT.md](PROJECT.md#open-content-items-requiring-confirmation)). |
| ↳ Troop 32-B and Troop 32-G | Yes | Explain the two-troop structure simply | Prospective families | Short explanation. The rest of the site still uses "Troop 32." |
| ↳ Troop leadership | Yes | Who leads the troop | Prospective families | Scoutmaster: Mr. Vickers, with his own page at `/about/scoutmaster/`. Other adult leaders may be named as Mr. or Mrs. Last Name ([PRIVACY.md](PRIVACY.md#adult-names)). Which roles to list, and contact details, are [still open](PRIVACY.md#open-policy-questions). |
| **What Is Scouting?** | Yes | Scouting for newcomers | Families new to Scouting | Link to official Scouting America resources. |
| ↳ Scout Oath, Scout Law, and Scouting values | Yes | Show the principles Scouts live by | Everyone | Approved text in [CONTENT-GUIDE.md](CONTENT-GUIDE.md#scouting-principles-as-editorial-principles). Includes Motto, Slogan, and Outdoor Code. |
| **What Scouts Do** | Yes | The program in action | Prospective families, Scouts | General descriptions only. No specific dates or locations of outings. |
| ↳ Outdoor activities | Yes, if content is supplied | Camping, hiking, and outdoor skills | | `[TO BE PROVIDED]`: what the troop actually does. |
| ↳ Service | Yes, if content is supplied | Community service | | `[TO BE PROVIDED]` |
| ↳ Advancement | Yes | Ranks and merit badges explained | Families, Scouts | Link to official advancement resources. |
| ↳ The Eagle Scout journey | Yes (general only) | What Eagle means and how Scouts get there | Families, Scouts | A Scout named in Eagle project or other recognition content, upcoming or completed, is named as First L., like anywhere else on the site ([PRIVACY.md](PRIVACY.md#eagle-scout-projects)). Whether to publish Eagle biographies and individual portraits is [still open](PRIVACY.md#open-policy-questions). |
| **Join Troop 32** | Yes | How to join, step by step | Prospective families | Age and eligibility details must be confirmed. Link to official applications. |
| ↳ Information for new families | Yes | What to expect, costs, gear, first steps | Prospective families | Costs and fees `[TO BE PROVIDED]` by leadership. |
| ↳ Regular meetings | Yes | When and where | Prospective families | **Approved public:** Mondays, 7:00 PM, Santa Rosa Bible Church, 4575 Badger Road, Santa Rosa, California. |
| **Photos** | Superseded | Show Scouting in action | Everyone | Replaced by the planned **Events** area below. The youth-photo policy was approved 2026-10-07 (E0). |
| **Events** | Built (E2); first events added (E3) | Upcoming Events, Recent Adventures (completed less than 12 months ago), Troop 32 Archive (12 months or older), with curated event galleries | Everyone | Policy approved 2026-10-07 (E0): primary nav label "Events", plus a homepage teaser. General information only for ordinary events; full details only for designated public events ([PRIVACY.md → Events](PRIVACY.md#events-what-may-be-public-approved-e0-2026-10-07)). Pages built in E2. First five real 2026 events and the homepage teaser (up to three text-only cards) added in E3. |
| **Contact** | Yes | Reach the troop | Everyone | Through an official troop channel. **The channel must be decided before launch.** No personal youth contact details. |
| **Privacy** | Yes | How the site handles information | Everyone | Public notice summarizing [PRIVACY.md](PRIVACY.md): events, photos and names, what is never published, and how to ask for changes or removals. Revised and approved by the adult project lead in P1 (last reviewed October 2026). |
| **Accessibility** | Yes | Accessibility commitment and how to report problems | Everyone | States the WCAG 2.2 AA target without claiming guaranteed compliance. Problems can be reported by email or at a meeting (last reviewed October 2026). |

## Future member area (authenticated)

> **FUTURE / PROPOSED. NOT ARCHITECTURALLY DECIDED. NOT PART OF v1.0.**
>
> The member area needs its own PLAN, privacy review, designated adult leader review, architectural decisions, and explicit `EXECUTE:` authorization. No authentication provider, data store, account model, member database, authorization model, or hosting has been chosen.

Conceptually, it might include:

| Concept | Notes |
| --- | --- |
| Detailed calendar and logistics | Outing and event details that must not be public. Stored outside the public repository and linked to the public event by a stable event identifier (E0, 2026-10-07). |
| Announcements | Member-only news. |
| Documents and forms | Troop materials. Official Scouting America forms may simply be linked. |
| Other member resources | `[TO BE PROVIDED]` |

The member area may instead link to existing tools the troop already uses. That decision is open.

## Out of scope (for now)

These stay outside the current site scope unless separately approved later:

- Online payments.
- Medical information or health forms.
- Storing sensitive personal information.
- Rosters and member contact databases.

## Ideas from the existing site

The existing troop32.org public site has topics worth considering, rewritten fresh and confirmed before use: "Why Scouting?", "Is it safe?" (youth protection overview), "Is it fun?", "Is it for the whole family?", age requirements, costs, how to join, and advancement. Treat all of its content as potentially stale.

Ideas from other troops' websites are tracked separately in [DESIGN-REFERENCES.md](DESIGN-REFERENCES.md).
