# Privacy Framework

Troop 32 is a **youth Scouting organization**. On this project, **privacy takes precedence over convenience.**

This document sets a conservative working boundary between public and private information for the website and this repository.

> **This is not legal advice.** It is a project working policy. Questions of law, and the final privacy policy for youth/member information, belong to the **designated adult leader** and **troop leadership**. Scouting America's own youth-protection and digital-communication guidance should be consulted as the authority. This document does not interpret that guidance.

## The golden rule

**When uncertain whether information belongs in public, treat it as private and flag it for human review.**

## Information tiers

### Tier 1: Intentionally public

General information intended for prospective families, community members, Scouts and families seeking general information, and other appropriate public audiences. Examples:

- What Scouting is, and the Scout Oath, Scout Law, Scout Motto, Scout Slogan, and Outdoor Code.
- General description of Troop 32 and its program, once confirmed (see [CONTENT-GUIDE.md](CONTENT-GUIDE.md#no-invented-facts)).
- How to join, and links to official Scouting America resources.
- That Troop 32 meets weekly throughout the year, and that prospective families can plan a visit through the Scoutmaster. **Not** the meeting day, time, or place (see [Regular meetings and activity logistics](#regular-meetings-and-activity-logistics)).
- The troop's official public contact channel, once decided.

### Tier 2: May belong in a future authenticated member area

Operational information members need that should not be public. The member area is **not yet designed** and needs its own PLAN, privacy review, and adult approval. Examples:

- Detailed calendars and outing/event logistics.
- Announcements intended for members.
- Troop documents, forms, and meeting materials.
- Leader contact details, if policy allows.

Nothing in this tier goes on the public site in the meantime.

### Tier 3: Requires explicit policy and leadership approval before *any* publication

Do **not** publish publicly without an explicitly approved policy and appropriate authorization:

- youth personal contact information;
- private member contact information;
- member rosters;
- private email addresses;
- private phone numbers;
- private meeting/event logistics;
- transportation or driver information;
- emergency contacts;
- medical information;
- account credentials;
- private troop records;
- any other information that could unnecessarily identify, locate, contact, or profile youth members.

Youth names, photographs, captions, and Eagle Scout recognition are now governed by the approved [Youth names, photographs, and recognition](#youth-names-photographs-and-recognition) policy. Anything outside that policy stays in this tier.

### Tier 4: Never in the repository or on the website

- Credentials, passwords, API keys, tokens, and other secrets.
- Medical information and health records.
- Emergency contact information.
- Real rosters or member databases.

Some Tier 4 items, such as health forms, may be handled by Scouting America systems or troop leadership. They are **not** handled by this website project unless a future approved work package specifically decides otherwise.

## Regular meetings and activity logistics

**Decided P2 (2026-10-07), with designated adult leader approval. Supersedes the earlier decision that made the regular meeting public.**

The troop's **recurring meeting logistics are private.** The public website and this repository never contain:

- the regular meeting day or time;
- the regular meeting place or its street address;
- directions or map links to it;
- any equivalent wording that would let a visitor work out where and when Scouts predictably gather.

They never enter this repository, even as an unrendered field or in a test. Families learn the details privately: a prospective family gets in touch with the Scoutmaster (scoutmaster@troop32.org), who helps them plan a visit.

**What may be public:** that Troop 32 meets weekly throughout the year, what meetings are for (advancement, skills, planning adventures, leadership, fun), and that prospective families are welcome to plan a visit through the Scoutmaster.

The same privacy applies to:

- outings, campouts, or hikes;
- service projects;
- youth travel;
- special events;
- pickup and drop-off arrangements;
- temporary meeting changes or cancellations;
- other operational schedules or locations.

Specific youth activity logistics stay **private** unless troop leadership explicitly approves that particular information for public distribution.

**Why?** A predictable weekly time and place tells anyone exactly where a group of identifiable youth will be, every week. Planning visits through the Scoutmaster still lets families find the troop, while a responsible adult knows who is coming.

**Public events are unchanged.** Troop leadership may still explicitly designate a genuinely public event (for example a community breakfast or an open house) and publish its date, time, and venue under the [Events](#events-what-may-be-public-approved-e0-2026-10-07) rules.

**Removing it doesn't erase older copies.** Earlier versions of this repository (Git history) and other public places, such as the previous troop32.org site, web archives, and unit listings, may still show the old details. Those are tracked as separate follow-up items; this policy governs current content.

## Events: what may be public (approved E0, 2026-10-07)

### Ordinary troop events (the default)

For outings, campouts, high adventure, service projects, and other ordinary troop activities, the public site may show **only general information**:

- event name;
- month and year;
- a general description;
- a well-known destination, where appropriate. Well-known Scouting destinations such as **Camp Meriwether**, **Melita Island**, and **Philmont Scout Ranch** may be named.

**Why:** these rules exist to reduce how much information about Scouts that could help someone identify or locate them is publicly available. They lower, but can't remove, the risk that an outsider uses the troop website to identify, locate, track, contact, or otherwise target a youth. The [naming rules](#youth-names) and these event rules work together.

For ordinary troop activities, don't publicly expose anything that isn't needed and could materially help someone locate or track Scouts:

- youth full names;
- private operational locations or rendezvous points;
- unnecessary exact dates and times;
- departure or return schedules;
- transportation or driver information;
- attendee lists or rosters;
- patrol assignments;
- private itineraries;
- other non-public logistical or personal information.

Private troop logistics in that list (rendezvous points, departure and return times, transportation and driver arrangements, attendee lists, campsite details, patrol assignments, itineraries, and similar operational information) must also **never be stored in the public repository**, even in a field that isn't displayed.

### Designated public/community events (opt-in)

Troop leadership may **explicitly designate** an event as intended for the general public. Examples: the Annual Pancake Breakfast, an Open House, or another community event. For a designated public event, the site may publish the exact date, time, public venue, admission information, and other details the public needs to attend.

This is an **affirmative leadership designation**, made for each event. It is never the default for ordinary troop activities. If no designation is recorded, treat the event as ordinary.

### Named Scouts in event content (including Eagle projects)

*Amended 2026-10-07 (E0 clarifications). This replaces the earlier rule that upcoming Eagle listings don't name the Scout. Eagle projects have no separate naming convention.*

A Scout named in any event content, upcoming or completed, is named as **First L.** under the general [naming rules](#youth-names). The kind of event decides only which logistics may appear alongside the name:

- **Ordinary troop event (the default):** First L., month and year, a general description, and anything else the [ordinary-event rules](#ordinary-troop-events-the-default) allow. **No** exact date or time, rendezvous information, specific operational location details, transportation arrangements, attendee information, or other private logistics.
- **Designated public/community event:** if troop leadership affirmatively designates the event (for example an Eagle project) as public, the [public-event exception](#designated-publiccommunity-events-opt-in) applies. The site may then publish the exact date, time, public location, participation information, and other details the public needs to attend or help.

Documentation example (fictional Scout): *Eagle Project · Jordan Q. — July 2027* at `/events/eagle-project-trail-bench-2027/`.

### Public and private event information are kept apart

Private or member event information never goes in this public Git repository, in any form. A future member system will keep it in separate private storage and link it to the public event through a **stable event identifier**. Authentication, private storage, email subscriptions, and member pages are future work and need their own PLAN and approval.

That identifier is each event record's permanent `uid` (E1). **A draft event is not private.** `draft: true` only keeps the event off the website; the file is still in the public repository, so a draft may contain only information suitable for public disclosure.

### Recency and retention

- Completed events less than **12 months** old will be shown as **Recent Adventures**. At 12 months or older, they move to the **Troop 32 Archive**. *(Policy only; not built yet.)*
- The Troop 32 Archive is meant to be a **durable historical record**. By default, archived events and approved photos may stay up indefinitely.
- Troop leadership must always be able to **remove or revise** a youth's name, photograph, caption, or historical record when a family or privacy concern comes up. Handle such a request promptly. Removing something from the site doesn't remove it from Git history (see [Repository rules](#repository-rules)), so tell the directing human and the designated adult leader if history needs attention.

## Repository rules

**Treat this GitHub repository as public.** Anything committed, including in documentation, drafts, code comments, test data, or Git history, should be considered publicly disclosed. Removing something in a later commit does **not** remove it from history.

- Never commit real credentials, secrets, passwords, API keys, or tokens.
- Never commit private member data, private contact information, rosters, medical or emergency information, or other protected information.
- Use **clearly fake placeholder data** in examples and tests. Examples: `Scout A`, `example@example.com`, `555-0100`.
- `.env` files are ignored by Git (see `.gitignore`). Only a `.env.example` with placeholder values may be committed.
- Future member-area *code* may live in this public repository. Private production *data* must not.
- If something private is ever committed by mistake, **stop and tell the directing human (see [PROJECT.md → Current phase](PROJECT.md#current-phase)) and the designated adult leader**. Do not try to quietly rewrite history.

## Youth names, photographs, and recognition

Approved in work package E0 (2026-10-07). This resolves open questions 1–4, 6, and 8 below.

### Photographs of Scouts

**Recognizable Scouts may appear** in approved public photographs of ordinary Scouting activities, after the established review process: full-resolution privacy review, then human publication approval recorded in [PHOTO-LOG.md](PHOTO-LOG.md).

Approval of a recognizable face doesn't approve everything else in the frame. Still check each photo for sensitive information such as names, tags, signs, plates, schedules, private locations, and awards tied to individuals (see [Photos and images](#photos-and-images)).

### Youth names

The naming rule depends on **who the person is** (a Scout/youth or an adult leader), **not on the type of event or content.** It's part of the same safeguard as the event rules (see the **Why** under [Ordinary troop events](#ordinary-troop-events-the-default)).

- Whenever a Scout is identified anywhere in public-facing content, use the Scout's **real first name and real last initial: First L.** That covers event stories, captions, Eagle projects, courts of honor, service projects, camp stories, leadership stories, awards, historical records, and all other public content.
- **Never publish a Scout's full last name**, even if it's available from a source.
- **Never substitute a fictional or placeholder identity for a real Scout** in actual site content.
- **Fictional names** such as *Jordan Q.* belong **only** in documentation, templates, tests, or examples where no real person is shown. Every *Jordan Q.* example in these documents is fictional.
- Example (documentation only): an actual event displayed as *Eagle Project · Jordan Q. — July 2027* would use the permanent URL `/events/eagle-project-trail-bench-2027/`. The name is visible on the page; the slug describes the project.
- A youth's name may appear in a caption when it adds real editorial value, such as recognition or a leadership role. **Don't identify Scouts just because the Webmaster knows who they are.**
- **Alt text** normally describes the photo without naming individual youth.
- **Never put youth names in URLs or slugs, not even abbreviated.** A page may visibly say "Eagle Project · Jordan Q.", but its permanent slug describes the project, not the Scout. For example: `eagle-project-trail-bench-2026`.

### Adult names

Whenever an adult leader is identified in public-facing content, use **Mr. Last Name** or **Mrs. Last Name**, as appropriate. This doesn't extend to adults' personal contact details (see [Tier 3](#tier-3-requires-explicit-policy-and-leadership-approval-before-any-publication)).

### Scout or adult?

- **The Webmaster is the human review point** for whether a person is a Scout or an adult, and for names, captions, and the public/private boundary.
- If Clawson treats someone as a Scout and the Webmaster says the person is an adult leader (or the reverse), correct the naming.
- **Don't guess or invent** whether someone is a youth or an adult when it matters and isn't known. Ask the Webmaster.
- Don't build a system for storing or inferring people's youth/adult status. Human editorial review handles it.

### Eagle Scout projects

Eagle projects have **no separate naming convention**. A Scout named in Eagle project content, upcoming or completed, is named as First L. The event rules decide what logistics may accompany the name ([Named Scouts in event content](#named-scouts-in-event-content-including-eagle-projects)).

### Swimming and aquatic photographs

Use contextual editorial judgment. Don't reject every photo that shows water or swimwear. This is an editorial and privacy safeguard. It doesn't mean aquatic activities are inappropriate.

- Ordinary boating, sailing, canoeing, kayaking, and similar Scouting photos are acceptable when otherwise appropriate.
- Incidental or background swimwear, at a resolution low enough that no individual is prominent, is generally not a concern.
- Boys in ordinary swim shorts are generally acceptable, if the photo is otherwise appropriate.
- **Be substantially more conservative with photos that prominently show girls in swimsuits.** Don't publish a photo where a girl in a swimsuit is a prominent or high-resolution subject, unless a **designated adult leader specifically approves that image** for publication. Record that approval in PHOTO-LOG.md.

Photos already approved before this policy, including `water-sailing-01.jpg`, are not re-reviewed just because the policy changed.

## Photos and images

Every photo, with or without recognizable youth:

- Use only images the troop has appropriate permission to use.
- Follow the [names and captions rules](#youth-names) above. Avoid captions that identify people without editorial value.
- Avoid images that reveal private locations or logistics, such as homes, meeting-up points, vehicles with legible plates, or posted schedules.
- **Remove embedded GPS/location metadata (EXIF)** from images before public use.
- When in doubt, leave it out and flag it.
- Every published photo needs a **full-resolution privacy review** and **human publication approval**, recorded in [PHOTO-LOG.md](PHOTO-LOG.md). Thumbnails are not enough to judge whether faces, names, or tags are visible.

### Event galleries

- An approved photo may appear **both** in an event's historical gallery **and** elsewhere on the site. The "use each photo once" preference applies to general marketing and page slots where visual variety matters. It doesn't stop appropriate reuse in an event's historical record.
- An event gallery should normally hold **6–12 strong, curated photos**. More than 12 should eventually produce an editorial warning, not an automatic failure. **20 is the intended hard maximum.** *(Not yet enforced.)*

### Original media and working copies

The troop's photo and document stores (Google Drive and similar) are **external sources**. AI agents treat them as read-only originals and never change, move, delete, or re-share anything in them ([AGENTS.md §7](../AGENTS.md#7-external-sources-are-read-only)).

The troop's Google account can see parts of the troop Drive that hold personal and member information. AI agents may access **only** the "Troop 32 Photos" folder tree, and must not open non-photo files there unless a work package specifically authorizes it ([AGENTS.md §7, Google Drive access scope](../AGENTS.md#google-drive-access-scope-permanent)). Drive folder links and IDs are never committed to this public repository.

- **Copy only what is needed.** Copy only the specific files a work package needs. Never mirror a whole photo library "just in case."
- **Copies are private working material.** Copies of youth photos in a local working folder are private, even though they aren't published yet.
  - Keep them **outside the repository and outside any sync folder** (Google Drive, OneDrive, Dropbox).
  - Never share them.
  - Delete them when the work package says the work is finished.
- **Only approved public derivatives reach the repository.** These are resized images with metadata removed and neutral filenames. Original files never do.
- **Report sharing problems; don't fix them.** If an external source looks over-shared (for example, a folder of youth photos viewable by anyone with the link), the agent reports it to the directing human and the designated adult leader rather than changing it.

## Open policy questions

These need a decision by the **designated adult leader / troop leadership**. Clawson must not answer them on its own.

Questions resolved in work package E0 (2026-10-07) are struck through. Their decisions are recorded above and in the [decision log](PROJECT.md#decision-log). Any part a decision left open is noted.

1. ~~**Youth photographs.**~~ **Resolved:** recognizable Scouts may appear in approved photos of ordinary Scouting activities ([Photographs of Scouts](#photographs-of-scouts)). *Still open: whether any family consent or opt-out process is needed, and how it would be recorded.*
2. ~~**Youth names.**~~ **Resolved:** real First L. throughout public content, whatever the type of event or content; never full last names; never in URLs ([Youth names](#youth-names)). The same rule applies to youth leaders, such as a Senior Patrol Leader.
3. ~~**Eagle Scout and award recognition.**~~ **Resolved for naming:** any Scout named in recognition (Eagle projects, awards, courts of honor), upcoming or completed, is named as First L.; event rules govern the accompanying logistics ([Eagle Scout projects](#eagle-scout-projects)). *Still open: whether to publish Eagle Scout biographies and individual portraits, and any consent step.*
4. ~~**Adult leader information.**~~ **Resolved for names:** Mr. or Mrs. Last Name, as appropriate ([Adult names](#adult-names)). *Still open: which roles are listed, and role-based contact addresses (see question 5).*
5. ~~**Public contact channel.**~~ **Resolved (L1, 2026-10-07):** the role-based address scoutmaster@troop32.org, forwarded privately outside this repository. *(Originally also "plus the regular meeting"; since P2, prospective families plan a visit through the Scoutmaster and no meeting day, time, or place is public.)* No forwarding destination or personal contact detail is ever stored in the repository.
6. ~~**Calendar.**~~ **Resolved:** general information only for ordinary events; full public details only for events leadership designates as public ([Events](#events-what-may-be-public-approved-e0-2026-10-07)). *Still open: who records a public-event designation, and how.*
7. **Member area.** What information belongs there, who gets accounts, and who manages them? *(E0 set only the boundary: private event information never goes in this repository and links to public events by a stable event identifier.)*
8. ~~**Retention.**~~ **Resolved:** the Archive is kept indefinitely by default, and leadership can remove or revise youth content on request ([Recency and retention](#recency-and-retention)).

When a question is resolved, record the decision in [PROJECT.md](PROJECT.md#decision-log) and update this document.
