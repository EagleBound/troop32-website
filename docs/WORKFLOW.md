# Development Workflow

How the Scout Webmaster, the adult project lead, ChatGPT, and Clawson work together on the Troop 32 website. A new Webmaster should be able to follow this document from day one.

## Which workflow applies?

The project has two phases (see [PROJECT.md → Project phases](PROJECT.md#project-phases)). Check [PROJECT.md → Current phase](PROJECT.md#current-phase) to see which is active.

- **Phase 1: Initial development (Website v1.0).** Temporary and adult-led. Follow the [Phase 1 cycle](#phase-1-initial-development-cycle).
- **Phase 2: Scout Webmaster stewardship.** The permanent model. Follow the [Phase 2 cycle](#phase-2-scout-stewardship-cycle).

The **directing human** is the person directing work in the current phase: the adult project lead in Phase 1, the Scout Webmaster in Phase 2.

**What is the same in both phases:** every new task starts in PLAN; changes need an explicit `EXECUTE:` authorization; authorization is single-use; Clawson never commits or pushes; and all privacy, security, public-repository, production, factual-accuracy, and documentation rules apply in full.

**What differs:**

| | Phase 1 (v1.0, adult-led) | Phase 2 (Scout stewardship) |
| --- | --- | --- |
| Directing human | Adult project lead | Scout Webmaster |
| ChatGPT review of plans | Optional, at the lead's discretion | Expected, as part of the learning loop |
| Work package size | May be larger, to meet the launch deadline | Sized for careful review and learning |
| Explanations from Clawson | Brief, with decisions documented for the future Webmaster | As deep as the Webmaster wants |

## Who does what

| Who | Role in the workflow |
| --- | --- |
| **Scout Webmaster** | Directing human in Phase 2. Decides what to work on, reviews plans, authorizes execution, reviews results, commits, and pushes. |
| **Adult project lead** | Directing human in Phase 1. Same workflow responsibilities while Website v1.0 is built, plus preparing the handoff. |
| **ChatGPT** | Helps the directing human think through options, learn concepts, write clear work requests, and review plans and results. |
| **Clawson** | The website's AI technical assistant. Inspects and plans in PLAN mode, and does the approved work in EXECUTE mode. |
| **Designated adult leader** | Approves anything involving youth safety, privacy policy, credentials, production, system administration, phase changes, or major governance changes. May be the same person as the adult project lead. |

## Phase 1: initial development cycle

```text
1. Adult project lead prepares a work request (with ChatGPT, if useful)
2. Work request goes to Clawson as a NEW TASK
3. Clawson works in PLAN (read-only) mode and returns its PLAN report
4. Adult project lead reviews the plan (with ChatGPT, if useful)
5. Adult project lead sends an explicit  EXECUTE: <work package>
6. Clawson performs the approved work and returns an execution report
7. Clawson automatically returns to PLAN mode
8. Adult project lead reviews `git status` and `git diff`
9. Adult project lead commits and pushes the approved changes
```

Phase 1 can move faster than Phase 2, but only by using larger work packages and optional ChatGPT review. It never skips the `EXECUTE:` gate or any safeguard. The goal is to hand the Scout Webmaster a functioning, understandable, documented website.

## Phase 2: Scout stewardship cycle

```text
 1. Scout has an idea or task
 2. Scout discusses strategy and options with ChatGPT
 3. Scout + ChatGPT produce an agreed work request
 4. Work request goes to Clawson as a NEW TASK
 5. Clawson works in PLAN (read-only) mode
 6. Clawson returns its PLAN report
 7. Scout brings the PLAN report back to ChatGPT
 8. Scout + ChatGPT review and revise as needed   ──┐
                                                   │ (repeat 4–8 if the plan changes a lot)
 9. Scout sends an explicit  EXECUTE: <work package> ◄┘
10. Clawson performs the approved work
11. Clawson returns an execution report
12. Clawson automatically returns to PLAN mode
13. Scout reviews `git status` and `git diff`
14. Scout discusses the result with ChatGPT if useful
15. Scout commits the approved changes
16. Scout pushes the approved commit to GitHub
```

## PLAN mode

Every new task starts here automatically. PLAN mode is **read-only**. Clawson may look at anything relevant inside the repository, and read external sources the task authorizes, but changes nothing.

The one narrow exception: Clawson may make short-lived **scratch files** in a system temporary folder when that's needed to analyze authorized material (for example, a list of photo filenames). They never go in the repository, an external source, or a sync folder, they're deleted when practical, and they're disclosed in the PLAN report. The exact conditions are in [AGENTS.md §3](../AGENTS.md#3-plan-mode-the-default).

A PLAN report contains:

1. Clawson's understanding of the objective.
2. What Clawson inspected.
3. The proposed implementation.
4. Files expected to be created, changed, or removed.
5. Important decisions, risks, and tradeoffs.
6. Questions that need answers.
7. How the work will be validated.

The directing human can paste the PLAN report into ChatGPT to discuss it.

## Execution authorization

In both phases, execution starts **only** when a separate message from the directing human contains:

```text
EXECUTE: <approved work package>
```

Authorization covers **only that work package** and is **single-use**. It expires once Clawson delivers the execution report.

### Is this authorization?

| Message | Authorizes changes? |
| --- | --- |
| `EXECUTE: Build the initial home page as described in the approved plan` | **Yes**, for that work package only |
| "Let's work on the calendar next." | **No.** This starts a new PLAN. |
| "Can you improve the home page?" | **No.** This starts a new PLAN. |
| "That's good. Now let's add a photo gallery." | **No.** This starts a new PLAN. |
| "Looks great, go ahead." (without `EXECUTE:`) | **No.** Clawson asks for an explicit `EXECUTE:` line. |
| `EXECUTE: ...` for work package A, then "also fix the footer" | Only A is authorized. The footer is a new PLAN. |

### What Clawson may do during EXECUTE

Within the approved work package, Clawson works without asking about each step. It may read, create, edit, rename, move, and delete files inside the repository and any authorized local working directory named in the work package; run ordinary development commands; install approved project-local dependencies; run a local dev server; build, lint, format, and test; fix ordinary errors; and inspect Git. The approval covers the whole **work package**, not each individual command.

Before starting, Clawson checks for a **clean working tree**. If unrelated uncommitted changes exist, Clawson reports them and stops. It never discards, stashes, or overwrites someone's work to get a clean tree.

### External sources stay untouched

Google Drive, Dropbox, OneDrive, shared folders, photo libraries, and similar places are **external sources**. Clawson treats them as untouchable originals: it may read an authorized source and copy only what the work package needs into a private local working folder, but it **never** changes, renames, moves, deletes, uploads to, comments on, or re-shares anything there.

This is true even during EXECUTE and even if someone asks directly. Only a governance amendment approved by the designated adult leader can change it. If a job seems to need a change in an external source, Clawson stops and tells the directing human, and the people who manage that source make the change themselves. The authoritative rule is [AGENTS.md §7](../AGENTS.md#7-external-sources-are-read-only).

For photos and other media, the work flows one way:

```text
external source (never changed)
  → private local working folder (copies only; outside the repo and any sync folder)
  → work on the copies and create derivatives
  → human approval
  → approved public derivatives only
  → website repository
```

A work package that uses an external source should name the source, what may be copied, and the local working folder.

### Stop conditions

Clawson **stops and returns to the directing human** if the work would require:

- a materially different design from the approved plan;
- crossing a security boundary;
- crossing a privacy boundary;
- credentials;
- administrator access;
- machine-level configuration;
- system-wide software installation;
- production access;
- work outside the repository or an authorized local working directory;
- any change to an external source;
- a substantial expansion of the approved objective.

Stopping is not a failure. It keeps decisions with the people who are responsible for them.

## Execution report template

At the end of every EXECUTE phase, Clawson reports:

```markdown
## Execution Report: <work package>

**Accomplished:** <summary>

**Files created:** <list or "none">
**Files modified:** <list or "none">
**Files moved or deleted:** <list or "none">

**Important implementation decisions:** <list>
**Commands run:** <list>
**Dependencies added or changed:** <list with reason for each, or "none">
**External sources read or copied:** <list, with "none were modified", or "none">
**Tests / build / lint results:** <results, including failures>
**Validation performed:** <list>
**Problems or warnings:** <list or "none">
**Deviations from the approved plan:** <list or "none">
**Needs human review:** <list>

**Git status:** <summary>
**Suggested commit message:** <message>
```

Failures are reported honestly, never hidden.

## Git basics for the Webmaster

**Git** records the history of every file in the project. **GitHub** stores that history online so it isn't lost and the next Webmaster can see it. GitHub is the project's permanent record.

| Term | Meaning |
| --- | --- |
| **Working tree** | The files as they are right now on the computer. |
| **Commit** | A saved snapshot of changes, with a message explaining what changed and why. |
| **Push** | Uploads your commits to GitHub. |
| **`main`** | The main line of project history. |
| **Diff** | A line-by-line view of what changed. |

### Reviewing and saving Clawson's work

Run these in the repository folder:

```bash
git status          # which files changed?
git diff            # what changed inside files Git already tracks?
git status -u       # also list brand-new files
```

New files don't show up in `git diff` until they're staged. To review everything at once:

```bash
git add -A          # stage all changes (nothing is saved yet)
git diff --staged   # review every staged change, including new files
```

If everything looks right:

```bash
git commit -m "docs: short description of the change"
git push
```

If something looks wrong, **don't commit**. Ask Clawson or ChatGPT about it first. To unstage without losing any work, use `git restore --staged <file>`.

### Commit messages

Use a short prefix and a clear summary:

- `docs: add privacy framework`
- `feat: add home page`
- `fix: correct broken link on join page`
- `chore: update dependency`

### Current Git policy

- Clawson never stages changes for commit, commits, pushes, merges, force-pushes, rewrites history, or deletes remote branches.
- The directing human (the adult project lead in Phase 1, the Scout Webmaster in Phase 2) commits and pushes to `main`.
- Feature branches and pull requests are not required yet. They may be introduced later as the project grows and the Webmaster's Git skills develop.

## Changing these rules

The operating rules ([AGENTS.md](../AGENTS.md) and these documents) are changed through the same cycle: PLAN, review, and then `EXECUTE:`. Major governance changes, including changing the [current phase](PROJECT.md#current-phase), also need **designated adult leader** approval. Record each change in the [PROJECT.md decision log](PROJECT.md#decision-log).
