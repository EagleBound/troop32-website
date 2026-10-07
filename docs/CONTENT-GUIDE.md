# Content Guide

Initial guidance for writing and presenting public content on the Troop 32 website. This guide will grow as the troop makes content decisions.

## Terminology

| Use | Instead of / notes |
| --- | --- |
| **Scouting America** | The national organization. Older material may say "Boy Scouts of America" or "BSA"; use the current name unless quoting history. |
| **Troop 32** | The normal public identity for the troop. |
| **Troop 32-B / Troop 32-G** | Only when the organizational distinction matters (see below). |
| **Scout / Scouts** | Youth members. |
| **Scoutmaster**, **Committee Chair**, **Senior Patrol Leader**, etc. | Standard position titles. Name people only as allowed by [PRIVACY.md](PRIVACY.md). |
| **Scout Oath**, **Scout Law**, **Scout Motto**, **Scout Slogan**, **Outdoor Code** | Use these modern headings, not historical ones such as "Boy Scout Oath." |
| **Eagle Scout** | Scouting's highest rank. |

Use current Scouting America terminology. When an older source uses outdated terms, update them. Don't copy them.

### Troop 32, Troop 32-B, and Troop 32-G

Troop 32 is organizationally two Scouting America troops: **Troop 32-B** (boys) and **Troop 32-G** (girls). They normally meet together and go on outings together, and the public knows them as **Troop 32**.

- Write general public content as **Troop 32**. Don't create separate boys' and girls' versions of ordinary pages.
- Use the B/G designation only where it actually matters: certain awards, leadership positions and changes, registrations, records, and similar.
- Write inclusively. Avoid wording that implies the troop serves only boys or only girls.

## Tone and voice

- **Welcoming, clear, and useful.** Write for a family that knows nothing about Scouting.
- **Explain Scouting terms** the first time they appear. For example, "merit badge" or "Court of Honor".
- **Youth-led character.** Scouting is led by Scouts. Where appropriate, let the site sound like the Scouts' own voice, while staying accurate and appropriate.
- **Plain language.** Short sentences, concrete examples, no unexplained jargon.
- **Not corporate.** Avoid generic marketing language ("world-class," "unparalleled," "leverage"). Let the character of Scouting come through.

## Scouting principles as editorial principles

The principles below are approved project content. They may appear directly on the public site, and they also guide how the site is written. Public content should reflect the Scout Law: **trustworthy** (accurate, no exaggeration), **helpful** (useful to the reader), **friendly** and **courteous** (welcoming to newcomers), **cheerful**, and responsible.

### Scout Oath

> On my honor, I will do my best\
> To do my duty, to God and my country, and to obey the Scout Law;\
> To help other people at all times;\
> To keep myself physically strong, mentally awake, and morally straight.

### Scout Law

A Scout is:

- Trustworthy
- Loyal
- Helpful
- Friendly
- Courteous
- Kind
- Obedient
- Cheerful
- Thrifty
- Brave
- Clean
- Reverent

### Scout Motto

> Be Prepared!

### Scout Slogan

> Do a Good Turn Daily!

### Outdoor Code

> As an American, I will do my best to\
> Be clean in my outdoor manners,\
> Be careful with fire,\
> Be considerate in the outdoors, and\
> Be conservation minded.

The text above was supplied directly to this project. Third-party websites that reproduce these texts are not the governing authority for Troop 32 policy.

## No invented facts

**Never invent** Troop 32 history, traditions, achievements, policies, fees, schedules, leadership, meeting details, or other troop-specific facts.

- Use troop-specific facts only when they have been supplied or verified by troop leadership.
- Where information is missing, write **`[TO BE PROVIDED]`** or mark it as an open content decision.
- Information from the old troop32.org site may be stale. Confirm it before reuse (see [PROJECT.md](PROJECT.md#open-content-items-requiring-confirmation)).

**Confirmed for public use so far:**

- Troop 32 normally meets **Mondays at 7:00 PM** at **Santa Rosa Bible Church, 4575 Badger Road, Santa Rosa, California**.
- The current Scoutmaster is **James Vickers**.
- "Eagle Bound!" is an existing project tagline. Don't call it an official troop motto unless leadership confirms it.

## Privacy in content

Follow [PRIVACY.md](PRIVACY.md). In short:

- No youth contact information, rosters, private logistics, or medical/emergency information.
- The regular Monday meeting is public. Specific outings, campouts, travel, and special events are **not**, unless leadership approves the specific item.
- When in doubt, leave it out and flag it.

### Naming people

| Who | How | Example |
| --- | --- | --- |
| Scouts / youth | Real first name + last initial (First L.). Never a full last name. | *Jordan Q.* (documentation example only) |
| Adult leaders | Mr. Last Name or Mrs. Last Name, as appropriate | *Mr. Example* (documentation example only) |

The examples in this table are fictional. **Actual site content uses the Scout's real first name and real last initial**, never a placeholder or fictional name ([PRIVACY.md → Youth names](PRIVACY.md#youth-names)).

- The rule depends on whether the person is a Scout or an adult, **not on the type of event or content**. It applies the same way to event stories, captions, Eagle projects, courts of honor, service projects, awards, and historical records.
- The Webmaster confirms whether a person is a Scout or an adult. If that isn't known and it matters, ask; don't guess. Fix the naming if the Webmaster corrects it.

- Name a youth in a caption only when it adds real editorial value, such as recognition or a leadership role. Don't name Scouts just because you know who they are.
- **Alt text** describes the photo, not who is in it. Don't name individual youth in alt text.
- **Never put youth names in URLs or slugs**, not even abbreviated. Slugs describe the event or project: `eagle-project-trail-bench-2026`, not the Scout's name.

### Writing about events

Full rules: [PRIVACY.md → Events](PRIVACY.md#events-what-may-be-public-approved-e0-2026-10-07).

- **Ordinary troop events:** event name, month and year, a general description, and a well-known destination where appropriate (for example Camp Meriwether, Melita Island, or Philmont Scout Ranch). No youth full names, meeting points, unnecessary exact dates or times, departure/return schedules, transportation, attendees, campsites, patrol assignments, or itineraries.
- **Designated public/community events** (for example the Annual Pancake Breakfast or an Open House): the exact date, time, public venue, and admission details are allowed, but **only** when leadership has designated that event as public.
- **Eagle projects** follow the same rules as any other event. A named Scout is First L., upcoming or completed. The event type decides the logistics. An ordinary listing shows month and year and a general description (e.g. *Eagle Project · Jordan Q. — July 2027*, a fictional example). Exact date, time, location, and participation details appear only if leadership designates the project a public event ([PRIVACY.md](PRIVACY.md#named-scouts-in-event-content-including-eagle-projects)). The slug never contains the name: `/events/eagle-project-trail-bench-2027/`.
- **Event pages and galleries** are a historical record. They may reuse photos that also appear elsewhere on the site.
- **Event records:** how to write one, its fields, and what the build checks are in [DEVELOPMENT.md → Add an event](DEVELOPMENT.md#add-an-event).

### Events area

- The primary navigation label is **Events** (built in E2).
- `/events/` shows **Upcoming events** and **Recent Adventures** (completed events less than 12 months old); `/events/archive/` is the **Troop 32 Archive** (12 months or older).
- The Events pages are a selection of events suitable for the public, **not** the troop's full calendar. Don't write copy that suggests every troop event appears there.
- The homepage shows a short **Recent adventures** teaser: up to three text-only cards of the newest **completed** Recent Adventures. Upcoming events, including public/community ones, are never featured there; they appear under Upcoming on `/events/`.
- Event galleries: normally 6–12 curated photos; more than 12 triggers an editorial warning; 20 is the hard maximum.

## Imagery

Photo policy: [PRIVACY.md → Youth names, photographs, and recognition](PRIVACY.md#youth-names-photographs-and-recognition).

- Obtain appropriate permission before using any image.
- Recognizable Scouts may appear in approved photos of ordinary Scouting activities.
- Avoid identifying captions that don't add editorial value (see [Naming people](#naming-people)).
- Avoid images that reveal private locations.
- Use contextual judgment for swimming and aquatic photos. Ordinary boating, sailing, canoeing, and kayaking photos are fine. Photos that prominently show a girl in a swimsuit need specific designated adult leader approval ([PRIVACY.md](PRIVACY.md#swimming-and-aquatic-photographs)).
- Prefer variety in general page slots: use each photo once there. Event galleries may reuse photos.
- Remove embedded GPS/location metadata from images before public use.
- Prefer images that show activities and the spirit of Scouting.
- Every meaningful image needs alt text (see below).
- Work only from **copies** of photos. Originals in the troop's Drive or other external sources are never edited, moved, or deleted ([AGENTS.md §7](../AGENTS.md#7-external-sources-are-read-only); steps in [DEVELOPMENT.md](DEVELOPMENT.md#add-an-approved-photo)).

## Accessibility

The project's accessibility target is **WCAG 2.2 Level AA**. Writing these rules does not by itself guarantee compliance. Pages must be built and checked against them.

- **Alt text.** Describe the meaning of each meaningful image. Use empty alt text for purely decorative images.
- **Headings.** One main heading per page. Headings follow a logical order and don't skip levels.
- **Contrast.** Text and important visuals have adequate color contrast.
- **Descriptive links.** Link text says where it goes ("How to join Troop 32"), not "click here."
- **Keyboard navigation.** Everything works without a mouse, with a visible focus indicator.
- **Not color alone.** Never use color as the only way to convey meaning.
- **Media.** Provide captions for video and transcripts for audio where appropriate.
- **Readable structure.** Short paragraphs, lists where helpful, and plain language.

## Contact information

- Public contact goes through an **official troop channel**. The channel is still to be decided (see [PRIVACY.md](PRIVACY.md#open-policy-questions)).
- Never publish personal email addresses or phone numbers of youth. Publish adults' personal details only if policy allows.
- Prefer role-based contact (for example, "the Scoutmaster") over personal details.

## Dates and keeping content fresh

- Always include the **year** in dates. Content without a year goes stale silently.
- Remove or archive outdated content. Old leadership, prices, and schedules should not linger.
- Pages with time-sensitive content should show when they were last reviewed.
- When a fact changes, such as a leadership change, update every page that mentions it.

## External links

- Prefer official Scouting America sources for program information and forms.
- Check external links when content is reviewed. Fix or remove broken ones.
- Link to official forms and pages. Don't re-host copies that will go out of date.

## Branding

- Follow current **Scouting America brand guidance** and troop leadership direction for logos, names, and visual identity.
- This guide does not reach legal conclusions about Scouting America logos, trademarks, uniforms, badges, or insignia. **Flag uncertainties for human review.**
- Do not create new troop logos or emblems without troop leadership direction.

### The Troop 32 emblem

The **Troop 32 Santa Rosa emblem** (a round patch reading "TROOP" / "SANTA ROSA CA." around a gold fleur-de-lis with two stars and a large "32") was supplied and approved by the adult project lead as the site's **primary visual identity**.

- **Where it appears:** the global header, to the left of the "Troop 32 / Santa Rosa, California" text, which always stays alongside it. Also as the Apple home-screen icon. It does **not** appear in the footer, the homepage hero, or the browser-tab favicon (the bold "32" favicon reads better at small sizes). Using it in one place keeps it from being repeated.
- **Don't alter it.** Never redraw, recolor, re-letter, stretch, or crop into the artwork. Only ordinary preparation is allowed: proportional resizing and making the area outside the circle transparent. The prepared copy is `src/assets/brand/troop32-emblem.png`; the original file is kept outside this repository.
- **Accessibility:** in the header it is decorative (`alt=""`), because the linked text next to it names the troop.
- **Open item before public launch:** the emblem contains **Scouting America–derived fleur-de-lis elements** (the fleur-de-lis with two stars). Troop leadership should confirm that this use is consistent with current Scouting America brand guidance. This guide makes no legal or trademark conclusion.
