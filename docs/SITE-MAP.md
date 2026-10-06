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
| `/contact/` | Contact | Contact |
| `/privacy/` | Privacy | Privacy |
| `/accessibility/` | Accessibility | Accessibility |
| (any unknown URL) | 404 | Page-not-found help |

**Header navigation:** About · What We Do · New Families · **Join** (prominent). Contact, Privacy, and Accessibility are in the footer. Photos remain on hold, and the member area remains future work.

## Public site

The **v1.0 launch** column is a *proposed* scope for the recruiting-ready Website v1.0 (see [PROJECT.md → Website v1.0 objectives](PROJECT.md#website-v10-objectives-temporary)). "Yes" means the page is proposed for launch, provided its content is confirmed. "Later" means future work. "On hold" means it is blocked by an open policy question.

| Section / page | v1.0 launch | Purpose | Main audience | Notes and open questions |
| --- | --- | --- | --- | --- |
| **Home** | Yes | Welcome, what Troop 32 is, how to visit or join | Prospective families, community | Could feature the regular Monday meeting and a link to "Join." Tagline use ("Eagle Bound!") is to be decided. |
| **About Troop 32** | Yes | Who we are | Everyone | History must be confirmed by leadership before use (see [PROJECT.md](PROJECT.md#open-content-items-requiring-confirmation)). |
| ↳ Troop 32-B and Troop 32-G | Yes | Explain the two-troop structure simply | Prospective families | Short explanation. The rest of the site still uses "Troop 32." |
| ↳ Troop leadership | Yes | Who leads the troop | Prospective families | Scoutmaster: James Vickers. Other names, photos, and contact details depend on [privacy policy](PRIVACY.md#open-policy-questions). |
| **What Is Scouting?** | Yes | Scouting for newcomers | Families new to Scouting | Link to official Scouting America resources. |
| ↳ Scout Oath, Scout Law, and Scouting values | Yes | Show the principles Scouts live by | Everyone | Approved text in [CONTENT-GUIDE.md](CONTENT-GUIDE.md#scouting-principles-as-editorial-principles). Includes Motto, Slogan, and Outdoor Code. |
| **What Scouts Do** | Yes | The program in action | Prospective families, Scouts | General descriptions only. No specific dates or locations of outings. |
| ↳ Outdoor activities | Yes, if content is supplied | Camping, hiking, and outdoor skills | | `[TO BE PROVIDED]`: what the troop actually does. |
| ↳ Service | Yes, if content is supplied | Community service | | `[TO BE PROVIDED]` |
| ↳ Advancement | Yes | Ranks and merit badges explained | Families, Scouts | Link to official advancement resources. |
| ↳ The Eagle Scout journey | Yes (general only) | What Eagle means and how Scouts get there | Families, Scouts | Recognizing individual Eagle Scouts depends on [policy](PRIVACY.md#open-policy-questions). |
| **Join Troop 32** | Yes | How to join, step by step | Prospective families | Age and eligibility details must be confirmed. Link to official applications. |
| ↳ Information for new families | Yes | What to expect, costs, gear, first steps | Prospective families | Costs and fees `[TO BE PROVIDED]` by leadership. |
| ↳ Regular meetings | Yes | When and where | Prospective families | **Approved public:** Mondays, 7:00 PM, Santa Rosa Bible Church, 4575 Badger Road, Santa Rosa, California. |
| **Photos** | On hold | Show Scouting in action | Everyone | **On hold until a youth-photo policy is approved.** v1.0 may use non-identifying activity images in the meantime. |
| **Contact** | Yes | Reach the troop | Everyone | Through an official troop channel. **The channel must be decided before launch.** No personal youth contact details. |
| **Privacy** | Yes | How the site handles information | Everyone | Public-facing notice. Wording needs leadership review. |
| **Accessibility** | Yes | Accessibility commitment and how to report problems | Everyone | States the WCAG 2.2 AA target without claiming guaranteed compliance. |

## Future member area (authenticated)

> **FUTURE / PROPOSED. NOT ARCHITECTURALLY DECIDED. NOT PART OF v1.0.**
>
> The member area needs its own PLAN, privacy review, designated adult leader review, architectural decisions, and explicit `EXECUTE:` authorization. No authentication provider, data store, account model, member database, authorization model, or hosting has been chosen.

Conceptually, it might include:

| Concept | Notes |
| --- | --- |
| Detailed calendar and logistics | Outing and event details that must not be public. |
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
