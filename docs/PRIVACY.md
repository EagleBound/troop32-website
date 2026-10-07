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
- **The regular meeting information** listed below.
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

Also in this tier until a policy is approved:

- youth names, photographs, and identifying captions (see [Open policy questions](#open-policy-questions));
- Eagle Scout and other recognition that identifies individual youth.

### Tier 4: Never in the repository or on the website

- Credentials, passwords, API keys, tokens, and other secrets.
- Medical information and health records.
- Emergency contact information.
- Real rosters or member databases.

Some Tier 4 items, such as health forms, may be handled by Scouting America systems or troop leadership. They are **not** handled by this website project unless a future approved work package specifically decides otherwise.

## Regular meeting information vs. activity logistics

**Intentionally public (approved):**

> Troop 32 normally meets **Mondays at 7:00 PM** at **Santa Rosa Bible Church, 4575 Badger Road, Santa Rosa, California**.

This may be used in recruiting and prospective-family content.

**This permission does NOT extend to:**

- outings, campouts, or hikes;
- service projects;
- youth travel;
- special events;
- pickup and drop-off arrangements;
- temporary meeting changes or cancellations;
- other operational schedules or locations.

Specific youth activity logistics stay **private** unless troop leadership explicitly approves that particular information for public distribution.

**Why the difference?** A regular weekly meeting at a public church building is how families find the troop. Specific dates and places of youth activities away from the meeting location can reveal where identifiable youth will be, and when, which raises safety concerns.

## Repository rules

**Treat this GitHub repository as public.** Anything committed, including in documentation, drafts, code comments, test data, or Git history, should be considered publicly disclosed. Removing something in a later commit does **not** remove it from history.

- Never commit real credentials, secrets, passwords, API keys, or tokens.
- Never commit private member data, private contact information, rosters, medical or emergency information, or other protected information.
- Use **clearly fake placeholder data** in examples and tests. Examples: `Scout A`, `example@example.com`, `555-0100`.
- `.env` files are ignored by Git (see `.gitignore`). Only a `.env.example` with placeholder values may be committed.
- Future member-area *code* may live in this public repository. Private production *data* must not.
- If something private is ever committed by mistake, **stop and tell the directing human (see [PROJECT.md → Current phase](PROJECT.md#current-phase)) and the designated adult leader**. Do not try to quietly rewrite history.

## Photos and images

Until a youth-photo policy is approved, use a conservative approach:

- Use only images the troop has appropriate permission to use.
- Avoid unnecessary identifying captions. Do not pair names with faces.
- Avoid images that reveal private locations, such as homes or meeting-up points.
- **Remove embedded GPS/location metadata (EXIF)** from images before public use.
- When in doubt, leave it out and flag it.
- Every published photo needs a **full-resolution privacy review** and **human publication approval**, recorded in [PHOTO-LOG.md](PHOTO-LOG.md). Thumbnails are not enough to judge whether faces, names, or tags are visible.

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

1. **Youth photographs.** May identifiable youth faces appear publicly? Group shots only? What consent is required, from whom, and how is it recorded?
2. **Youth names.** First names only, first name plus last initial, or none? Does this differ for youth leaders, such as a Senior Patrol Leader?
3. **Eagle Scout and award recognition.** May names, photos, dates, project descriptions, or biographies of Eagle Scouts be published? With whose consent?
4. **Adult leader information.** Which adult names and roles may be public? Should contact go through role-based addresses instead of personal ones?
5. **Public contact channel.** What official troop contact method should the public use?
6. **Calendar.** What, if anything, about upcoming activities may be public beyond the regular meeting?
7. **Member area.** What information belongs there, who gets accounts, and who manages them?
8. **Retention.** How long should old posts, photos, and recognition stay up?

When a question is resolved, record the decision in [PROJECT.md](PROJECT.md#decision-log) and update this document.
