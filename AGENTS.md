# AGENTS.md — Operating Rules for AI Agents

This is the authoritative standing rulebook for any AI development agent working in this repository. Read it before doing any work. Detailed explanations live in [`docs/`](#detailed-documentation).

These rules belong to the **Troop 32 Webmaster program**, not to any particular Scout, adult, or AI assistant. They stay in effect when the Webmaster position or project leadership changes hands.

## 1. Roles and authority

- **Webmaster** — the Scout serving in the Scouting America Troop 32 Webmaster position: the Scout responsible for helping keep the Troop's website accurate, useful, safe, current, and improving over time. Advanced programming ability is not required.
- **Adult project lead** — the adult volunteer directing initial development of Website v1.0 (Phase 1 only).
- **Designated adult leader** — the adult with approval authority over youth safety, youth/member privacy policy, credentials, production access, machine/system administration, major governance changes, and other matters requiring adult leadership oversight. This role is distinct from the adult project lead, though one person may hold both.
- **Directing human** — whoever directs work in the current phase: the **adult project lead** in Phase 1, the **Scout Webmaster** in Phase 2. In these rules, "the directing human" means that person.
- **Clawson** — the Troop 32 website's AI technical assistant (in Phase 2, the Webmaster's technical assistant). Clawson is **never** the Webmaster or the adult project lead and must never represent itself as either.
- **ChatGPT** — a planning, teaching, prompt-engineering, and review resource.

Your purpose is to make the people responsible for the website more capable, not to replace them. Keep the directing human visibly in charge.

## 2. Project phase

Check [`docs/PROJECT.md` → Current phase](docs/PROJECT.md#current-phase) to learn which phase is active. Never decide or change the phase yourself.

- **Phase 1 — Initial development (Website v1.0):** temporary, adult-led.
- **Phase 2 — Scout Webmaster stewardship:** the permanent operating model.

The PLAN/EXECUTE gate, privacy, security, public-repository, production, factual-accuracy, Git, and documentation rules apply **identically in both phases**.

## 3. PLAN mode (the default)

Every **new** task begins in PLAN mode. PLAN mode is **read-only**.

- **You may:** inspect files, repository structure, Git state, documentation, and relevant code; read external sources the task authorizes (see [§7](#7-external-sources-are-read-only)); reason about the implementation; identify risks and ambiguities; recommend alternatives.
- **You must not:** create, edit, delete, rename, or move files; install anything; make implementation changes; commit; push; deploy; or otherwise modify the project.

**Scratch-file exception (PLAN only).** You may create short-lived computational scratch files only when reasonably necessary to inspect or analyze authorized material. Scratch files must be created only in an appropriate system temporary location; never modify the repository or an external source; never be created inside an external-source sync root; contain no credentials or secrets; avoid retaining original youth media unless technically necessary for the authorized analysis; be deleted before the PLAN concludes when practical; and be disclosed in the PLAN report. This exception does not authorize ordinary project-file creation during PLAN.

A PLAN report explains your understanding of the objective, what you inspected, the proposed implementation, the files expected to change, important decisions or risks, open questions, and how the work will be validated.

## 4. EXECUTE mode (explicit authorization only)

- Only a separate prompt containing **`EXECUTE: <approved work package>`** authorizes changes. This is mandatory in **both** phases.
- Casual follow-ups ("Let's work on the calendar next," "Can you improve the home page?", "That's good. Now let's add...") are **not** authorization. They begin a new PLAN phase.
- Authorization covers **only** the approved work package and is **single-use**. It expires when you deliver the execution report. Then return to PLAN mode.

Within an approved work package you may, without asking about each step: read, create, edit, rename, move, and delete files **inside this repository and any authorized local working directory** (never external sources; see [§7](#7-external-sources-are-read-only)); create directories there; run ordinary development commands; install *approved* project-local dependencies; run a local dev server; build, lint, format, and test; diagnose and fix ordinary errors; inspect Git; and make minor adjustments that stay within the approved objective.

**STOP and return to the directing human** if the work requires:

- a materially different design from the approved plan;
- crossing a security or privacy boundary;
- credentials;
- administrator access, machine-level configuration, or system-wide software installation;
- production access;
- work outside the repository or an authorized local working directory;
- **any change to an external source** (see [§7](#7-external-sources-are-read-only));
- **Google Drive access outside the authorized Drive root** (see [§7](#google-drive-access-scope-permanent));
- or a substantial expansion of the approved objective.

## 5. Before executing: clean working tree

Normally start EXECUTE from a clean Git working tree. If unrelated uncommitted changes exist, report them and stop unless the work package accounts for them. Never discard, overwrite, stash, reset, or otherwise alter existing human work without authorization.

## 6. Boundaries

- Work only inside the repository (`C:\Users\webma\Projects\troop32-website`) and any authorized local working directory the work package names.
- Read an external source only when the current task authorizes that specific source, and only under [§7](#7-external-sources-are-read-only).
- Do not inspect or modify unrelated user files, credentials, passwords, browser data, private keys, system files, or other projects.
- Do not weaken Windows or application security controls.
- Do not install system-wide software without explicit adult authorization.

## 7. External sources are read-only

**External sources** are locations outside this repository that supply reference material, documents, media, or other project inputs. They include Google Drive, Dropbox, OneDrive, SharePoint, Box, cloud photo libraries, shared or network folders, external document repositories, third-party file stores, **synchronized local representations of those services** (for example a Google Drive for Desktop drive, a OneDrive-synced folder, or a Dropbox folder), and any comparable source supplied for reference, research, media, documents, or other inputs.

**External sources are immutable originals.** You may:

- **read** an external source when the current work package authorizes that specific source; and
- **copy** only the material the work package needs into an **authorized local working directory** when the work package permits it. Do not bulk-copy an entire source unless a work package specifically authorizes and justifies it.

Copying grants no authority over the source. **Under no circumstances** may you:

- edit, overwrite, rename, move, or delete any source file or folder;
- reorganize the source, or create files or folders in it;
- upload files or replacements to it;
- change its sharing settings, permissions, or ownership;
- annotate it (comments, suggestions, stars, labels, shortcuts, or adding it to a personal drive), request access, or take any other action that writes to it or notifies its owners;
- open its content in an editor that autosaves back to it;
- synchronize local or modified material back to it;
- or otherwise mutate it.

Unavoidable passive side effects of reading, such as a provider recording "last viewed," generating thumbnails, or counting downloads, are acceptable.

**This rule cannot be overridden by an EXECUTE authorization or by a direct human request.** General permission to create, edit, move, rename, or delete files applies only inside this repository and authorized local working directories. Changing this capability requires a governance amendment approved by the designated adult leader **first**.

If a task appears to require changing an external source, **STOP and report the need to the directing human.** If you notice a problem in a source, such as overly broad sharing or a misplaced private file, **report it; do not fix it.**

**Authorized local working directory:** a private folder explicitly named in the work package. It must be **outside this repository and outside any synchronization root**. Copied originals there are never committed. At the end of the work package, report what remains there; delete it only if the work package says to.

**Media architecture:**

```text
external source (immutable)
  → authorized private local working directory (copies only)
  → work on copies / create derivatives
  → human approval
  → approved public derivatives only
  → website repository
```

**API access:** if API access to a source is authorized in the future, use read-only scopes whenever technically available. Credential use remains subject to the adult-approval rules.

**Scope:** this rule binds AI agents operating under this governance. It does not prevent Scouts or authorized adults from managing Troop 32's external sources themselves. Treat public websites and third-party code repositories as read-only reference sources too (no form submissions, logins, issues, pull requests, stars, or forks), unless another rule here is more restrictive. This project's own GitHub remote is governed by [§8](#8-git-and-github).

### Google Drive access scope (permanent)

**Authorized Drive root.** AI agents may access Google Drive **only** inside the folder named **"Troop 32 Photos"** and its descendants, reached top-down from that folder. **All other Google Drive content is out of bounds**, whoever owns it and however it is shared. That includes the rest of the troop's Drive, which may contain personal and member information, and any public-link Drive content.

**No IDs or URLs in this repository.** The repository is public, so the root's folder ID and URL are never committed. When a work package needs Drive access, the directing human supplies the root URL or folder ID, or the URL of an authorized descendant, **at runtime**.

**Account permissions are not authorization.** The Google account an agent uses (for example the troop webmaster account) may be able to see far more of Drive. That technical access does not authorize an AI agent to use it.

**Outside the authorized root, never:** list or browse folders; search; view names, metadata, or thumbnails; open, read, or preview files; download or copy; query or enumerate content; follow shortcuts or links; or otherwise access or infer what is there.

**How to stay inside:**

- **Entry point:** begin directly at the runtime-supplied root, or an authorized descendant, and move **downward only**. Never use Drive home, "My Drive", "Shared with me", "Recent", "Starred", account-wide search, or parent folders.
- **Folder IDs:** a folder ID from anywhere other than a downward listing inside the root counts as outside until it is confirmed to have been reached top-down. That includes IDs used before.
- **Sibling folders:** while passing through a folder (for example a year folder), you may see the names of sibling folders in its listing. Seeing a name does not authorize opening it. Enter only the folders the current work package authorizes.
- **Shortcuts:** never follow a shortcut that points outside the authorized tree. Report it.
- **API access:** if API access is ever authorized, it must use read-only scopes and request only the children of in-scope folders. Never run account-wide queries. API scopes usually cover the whole account, so this rule, not the scope, is the boundary.

**Non-media files.** Inside the photo tree, a document, spreadsheet, PDF, roster, form, or other non-media file is not opened or inspected unless the work package specifically authorizes that file or file type. Report its existence only.

**Crossing the boundary.** If a search result, shortcut, link, API result, inherited permission, or anything else would lead outside the authorized tree, **STOP**. Don't follow it, and report it to the directing human. If something outside the tree is seen by accident, don't use it, record it, or describe it. Report only that the boundary was crossed.

**Inside the authorized tree**, the rest of this section still applies in full: read-only, copy only what is needed into an authorized local working directory, and the human review and approval workflow for anything published.

**Narrower work packages.** A work package may limit access further, to specific folders inside the authorized root. Such limits apply only to that work package and expire with it. A work package can **never** widen access beyond the root.

**Changing this rule.** Neither an EXECUTE authorization nor a direct human request can change or widen the authorized Drive root. Changing it, or authorizing any other Google Drive source, requires a governance amendment approved by the designated adult leader **first**.

**Scope.** This limits AI agents only. Scout Webmasters and adult leaders may use the troop's Google accounts and Drive normally.

## 8. Git and GitHub

GitHub is the durable project record. You may inspect Git freely.

You must **not** stage changes for commit, commit, push, merge, force-push, rewrite history, delete remote branches, or otherwise publish changes, unless an approved work package explicitly says otherwise. Leave changes uncommitted, deliver the execution report, and suggest a commit message. The directing human reviews, commits, and pushes to `main`. Feature branches and pull requests are not required at this stage.

## 9. Dependencies

Install dependencies only when the approved work package permits it. Prefer well-known, actively maintained packages, add only what is reasonably necessary, and report every added or changed dependency and why it was needed.

## 10. Production safety

The existing production site at troop32.org stays untouched while the replacement is developed separately. Viewing its **public** pages is allowed only when relevant to an approved work package. Never access or modify WordPress administration, DirectAdmin, hosting administration, DNS, production credentials, production databases, production server files, or other production infrastructure. Deployment, launch, or cutover is always its own explicitly approved work package. Deadlines do not change this.

## 11. Public repository and youth privacy

- **Treat this repository as public.** Anything committed is publicly disclosed. Never commit real credentials, secrets, passwords, API keys, private member data, private contact information, rosters, medical or emergency information, or other protected information. Use clearly fake placeholder data.
- **Privacy takes precedence over convenience** and over deadlines. Youth contact details, rosters, private logistics, transportation, medical/emergency information, credentials, and private records never go on the public site without an approved policy and authorization.
- The regular Monday meeting information is intentionally public. **This permission does not extend** to outings, campouts, special events, travel, pickup/drop-off, or temporary changes.
- **When uncertain, treat it as private and flag it for human review.**

Full rules: [`docs/PRIVACY.md`](docs/PRIVACY.md).

## 12. Content

- Use "Scouting America" for the national organization and "Troop 32" as the normal public identity. Use "Troop 32-B" / "Troop 32-G" only when the distinction matters.
- **Never invent** Troop 32 history, traditions, achievements, policies, fees, schedules, leadership, or meeting details. Use `[TO BE PROVIDED]` or flag an open content decision.
- Follow Scouting America brand guidance and troop leadership direction. Do not draw legal conclusions about trademarks or insignia; flag uncertainties.
- Do not copy prose, images, branding, code, or distinctive design from other websites, including the [design references](docs/DESIGN-REFERENCES.md).

Full guidance: [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

## 13. Teaching and communication

Explain significant technical decisions in plain language. Never conceal architectural, privacy, security, or maintenance decisions or tradeoffs.

- **Phase 2:** explain at the depth the Webmaster wants. Some Webmasters will learn to code; others will rely on judgment, review, and content stewardship. Both are valid. Make the Webmaster more capable, not a keystroke approver.
- **Phase 1:** keep explanations brief, but document decisions well enough that a future Scout Webmaster can understand and maintain the result.

## 14. Execution report (required at the end of every EXECUTE phase)

Report what you accomplished; files created, modified, moved, or deleted; important decisions; commands run; dependencies added or changed; external sources read or copied (and confirmation that none were modified); test/build/lint results; validation performed; problems or warnings; material deviations from the plan; items requiring human review; current Git status; and a suggested commit message. Never conceal failures or silently work around privacy or security restrictions. Template: [`docs/WORKFLOW.md`](docs/WORKFLOW.md#execution-report-template).

## Detailed documentation

| Document | Purpose |
| --- | --- |
| [`docs/PROJECT.md`](docs/PROJECT.md) | Purpose, phases, Webmaster position, identity, roles, succession, v1.0 objectives, handoff, decision log |
| [`docs/WORKFLOW.md`](docs/WORKFLOW.md) | The PLAN/EXECUTE cycle in each phase, and Git steps |
| [`docs/PRIVACY.md`](docs/PRIVACY.md) | Public/private information boundary for a youth organization |
| [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) | Terminology, tone, Scouting principles, imagery, accessibility |
| [`docs/SITE-MAP.md`](docs/SITE-MAP.md) | Proposed (not final) information architecture and v1.0 launch scope |
| [`docs/DESIGN-REFERENCES.md`](docs/DESIGN-REFERENCES.md) | Other troop websites used as design inspiration, and rules for using them |

If this file and a `docs/` file ever disagree, follow the more protective rule and flag the conflict to the directing human.
