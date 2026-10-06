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

- **You may:** inspect files, repository structure, Git state, documentation, and relevant code; reason about the implementation; identify risks and ambiguities; recommend alternatives.
- **You must not:** create, edit, delete, rename, or move files; install anything; make implementation changes; commit; push; deploy; or otherwise modify the project.

A PLAN report explains your understanding of the objective, what you inspected, the proposed implementation, the files expected to change, important decisions or risks, open questions, and how the work will be validated.

## 4. EXECUTE mode (explicit authorization only)

- Only a separate prompt containing **`EXECUTE: <approved work package>`** authorizes changes. This is mandatory in **both** phases.
- Casual follow-ups ("Let's work on the calendar next," "Can you improve the home page?", "That's good. Now let's add...") are **not** authorization. They begin a new PLAN phase.
- Authorization covers **only** the approved work package and is **single-use**. It expires when you deliver the execution report. Then return to PLAN mode.

Within an approved work package you may, without asking about each step: read, create, edit, rename, move, and delete project files; create directories; run ordinary development commands; install *approved* project-local dependencies; run a local dev server; build, lint, format, and test; diagnose and fix ordinary errors; inspect Git; and make minor adjustments that stay within the approved objective.

**STOP and return to the directing human** if the work requires:

- a materially different design from the approved plan;
- crossing a security or privacy boundary;
- credentials;
- administrator access, machine-level configuration, or system-wide software installation;
- production access;
- work outside the repository;
- or a substantial expansion of the approved objective.

## 5. Before executing: clean working tree

Normally start EXECUTE from a clean Git working tree. If unrelated uncommitted changes exist, report them and stop unless the work package accounts for them. Never discard, overwrite, stash, reset, or otherwise alter existing human work without authorization.

## 6. Boundaries

- Work only inside the repository: `C:\Users\webma\Projects\troop32-website`.
- Do not inspect or modify unrelated user files, credentials, passwords, browser data, private keys, system files, or other projects.
- Do not weaken Windows or application security controls.
- Do not install system-wide software without explicit adult authorization.

## 7. Git and GitHub

GitHub is the durable project record. You may inspect Git freely.

You must **not** stage changes for commit, commit, push, merge, force-push, rewrite history, delete remote branches, or otherwise publish changes, unless an approved work package explicitly says otherwise. Leave changes uncommitted, deliver the execution report, and suggest a commit message. The directing human reviews, commits, and pushes to `main`. Feature branches and pull requests are not required at this stage.

## 8. Dependencies

Install dependencies only when the approved work package permits it. Prefer well-known, actively maintained packages, add only what is reasonably necessary, and report every added or changed dependency and why it was needed.

## 9. Production safety

The existing production site at troop32.org stays untouched while the replacement is developed separately. Viewing its **public** pages is allowed only when relevant to an approved work package. Never access or modify WordPress administration, DirectAdmin, hosting administration, DNS, production credentials, production databases, production server files, or other production infrastructure. Deployment, launch, or cutover is always its own explicitly approved work package. Deadlines do not change this.

## 10. Public repository and youth privacy

- **Treat this repository as public.** Anything committed is publicly disclosed. Never commit real credentials, secrets, passwords, API keys, private member data, private contact information, rosters, medical or emergency information, or other protected information. Use clearly fake placeholder data.
- **Privacy takes precedence over convenience** and over deadlines. Youth contact details, rosters, private logistics, transportation, medical/emergency information, credentials, and private records never go on the public site without an approved policy and authorization.
- The regular Monday meeting information is intentionally public. **This permission does not extend** to outings, campouts, special events, travel, pickup/drop-off, or temporary changes.
- **When uncertain, treat it as private and flag it for human review.**

Full rules: [`docs/PRIVACY.md`](docs/PRIVACY.md).

## 11. Content

- Use "Scouting America" for the national organization and "Troop 32" as the normal public identity. Use "Troop 32-B" / "Troop 32-G" only when the distinction matters.
- **Never invent** Troop 32 history, traditions, achievements, policies, fees, schedules, leadership, or meeting details. Use `[TO BE PROVIDED]` or flag an open content decision.
- Follow Scouting America brand guidance and troop leadership direction. Do not draw legal conclusions about trademarks or insignia; flag uncertainties.
- Do not copy prose, images, branding, code, or distinctive design from other websites, including the [design references](docs/DESIGN-REFERENCES.md).

Full guidance: [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md).

## 12. Teaching and communication

Explain significant technical decisions in plain language. Never conceal architectural, privacy, security, or maintenance decisions or tradeoffs.

- **Phase 2:** explain at the depth the Webmaster wants. Some Webmasters will learn to code; others will rely on judgment, review, and content stewardship. Both are valid. Make the Webmaster more capable, not a keystroke approver.
- **Phase 1:** keep explanations brief, but document decisions well enough that a future Scout Webmaster can understand and maintain the result.

## 13. Execution report (required at the end of every EXECUTE phase)

Report what you accomplished; files created, modified, moved, or deleted; important decisions; commands run; dependencies added or changed; test/build/lint results; validation performed; problems or warnings; material deviations from the plan; items requiring human review; current Git status; and a suggested commit message. Never conceal failures or silently work around privacy or security restrictions. Template: [`docs/WORKFLOW.md`](docs/WORKFLOW.md#execution-report-template).

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
