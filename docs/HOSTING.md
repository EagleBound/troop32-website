# Hosting, launch, and rollback

How the Troop 32 website is hosted, how changes reach the public, and how the move from the old WordPress site to this site (the **cutover**) is done and, if needed, reversed.

This document is public, like the rest of the repository. It names **roles**, never people, and it never contains IP addresses, credentials, recovery codes, private forwarding destinations, DNS record values, certificate details, or the private DNS zone export. See [PRIVACY.md](PRIVACY.md#repository-rules).

## How the site is hosted

| Part | What it is |
| --- | --- |
| Source | This GitHub repository, branch `main`, owned by the troop's institutional `EagleBound` account |
| Hosting | Cloudflare Pages project `troop32`, in the **same Cloudflare account** as the `troop32.org` DNS zone (required to attach the apex domain) |
| Build | Cloudflare Pages runs `npm test && npm run test:pages` and publishes `dist/` (see [Build configuration](#build-configuration)) |
| Addresses | `troop32.pages.dev` (always), and `troop32.org` once the cutover is done |
| DNS | Cloudflare is authoritative for `troop32.org` |
| Email | Not part of this site. Mail records are separate and are never changed by website work |

### Build configuration

Set in the Cloudflare Pages project, not in this repository:

- **Production build command:** `npm test && npm run test:pages`. `npm run test:pages` builds the site (and the separate fixture build into `dist-fixtures/`, which is never published) and then checks the built pages, so a failing test fails the build and nothing is published.
- **Build output directory:** `dist`.
- **`ASTRO_TELEMETRY_DISABLED=1`** in the **production** build environment, set when the project was created. Astro's anonymous usage reporting (about the build tool, not about website visitors) is therefore off for hosted builds. Pages keeps preview-build variables separately; only `main` is deployed today, so nothing else needs it. If preview branches are ever enabled, set the same variable there too.

## Who can do what

| Role | Access |
| --- | --- |
| **Adult Project Lead** | Cloudflare, GitHub `EagleBound`, and old-host (DirectAdmin) administration. Production rollback authority. Owns the 30-day legacy preservation review and approves decommissioning |
| **Designated adult infrastructure ASM** | Production rollback authority |
| **Scout Webmaster** | Commits and pushes approved website changes. Reports production problems. Does **not** change Cloudflare DNS, start a rollback, or restore backups |

Infrastructure accounts are adult-controlled. Credentials are never stored in this repository.

## How changes reach the public

1. A change goes through the PLAN → `EXECUTE:` workflow ([WORKFLOW.md](WORKFLOW.md)) and is committed and pushed to `main`.
2. Cloudflare Pages builds that commit automatically and publishes it to `troop32.pages.dev`, and to `troop32.org` after cutover. GitHub shows Cloudflare's build check on the commit.
3. Check the change on the live site. To undo it, revert the commit and push again.

## Search engines

The production site may be listed by search engines. The identical copy at `troop32.pages.dev` must not be. Four settings work together, and `tests/pages/launch.test.ts` checks that they agree:

| Setting | Where | Value |
| --- | --- | --- |
| `indexable` | `src/data/site.ts` | `true`, so no `noindex` meta tag |
| `robots.txt` | `public/robots.txt` | `User-agent: *` / `Allow: /` |
| `X-Robots-Tag` | `public/_headers` | Only on `troop32.pages.dev` and its per-deploy preview hosts: `noindex, nofollow` |
| Canonical URL | `site` in `astro.config.mjs`, used in `BaseLayout.astro` | Every page (except the 404 page) names its `https://troop32.org/…/` address as canonical, with a matching `og:url` |

## Security headers

Set for every page in `public/_headers`: a strict Content-Security-Policy (no inline scripts or styles, nothing from other sites), `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Cross-Origin-Opener-Policy`, and HSTS `max-age=31536000` (one year). HSTS deliberately has **no** `includeSubDomains` and **no** `preload`, so other `troop32.org` hostnames, such as mail, are never affected. Files under `/_astro/` are cached for a year because their names change whenever their content does.

## Legacy redirects

`public/_redirects` sends a few old WordPress addresses to their new equivalents with a permanent (301) redirect. The policy (approved 2026-10-08):

- Redirect **only** old public addresses that have a **clear equivalent** page on this site.
- Everything else from the old site (blog posts, dated pages, WordPress system addresses) gets the custom 404 page.
- **Never** redirect `/log-in/` (the old members' area) or anything under it, and don't list member-area addresses in the file.
- Each address is listed with and without its trailing slash. Every destination must be a real page, and destinations are never themselves redirected. The launch tests check all of this.

To add one, follow the same policy, add both lines, run `npm run test:pages`, and record the reason in the PLAN.

## Cloudflare settings the site relies on

These are zone settings in Cloudflare, changed only by an authorized adult and recorded in the cutover change log:

- SSL/TLS encryption mode **Full (strict)**. Never relaxed as a workaround.
- **Always Use HTTPS** on (HTTP → HTTPS) and **Automatic HTTPS Rewrites** on.
- `www.troop32.org` → `https://troop32.org/`: a **301 at Cloudflare**, keeping the path and query string (approved 2026-10-08).
- **Email Address Obfuscation off** from the cutover onward. If it were on, Cloudflare would rewrite the site's `mailto:` links so they only work with JavaScript.
- `troop32.org` (apex) attached to the Pages project as a custom domain, proxied.
- Mail-related records (MX, the mail hostname, and mail TXT records) are **never touched** by website work. The MX record points to a dedicated mail hostname, not to the apex or `www` (checked before cutover).

## Cutover (production launch)

The cutover is its own approved work package, performed by an authorized adult at the keyboard. The Scout Webmaster may watch and report problems. The production commit must already be deployed and validated on `troop32.pages.dev`.

**Before:** the Adult Project Lead holds a private, current export of the DNS zone (the rollback snapshot). It is never placed in this repository.

**Order of work:**

1. Remove the old apex web records (as recorded in the private export).
2. Add `troop32.org` as a custom domain on the Pages project, and wait until it shows **Active**.
3. Add the `www` → apex 301 rule.
4. Turn off Email Address Obfuscation.
5. Purge the Cloudflare cache.

**Change log** (kept privately by the adult, with no IP addresses or secrets): for each change, the time, who made it, where (DNS, Pages, Rules, or a setting), what was changed, the before value (or "as in the private export"), the after value, and how to undo it. Also record the deployed commit SHA and the time the cutover is declared complete.

## After cutover: checks and the 30-minute watch

Run these at about 2, 10, and 30 minutes after the change:

- `https://troop32.org/` serves this site with a valid certificate and no Cloudflare 52x errors; every page loads.
- `http://` redirects to `https://`; `https://www.troop32.org/join/?x=1` redirects (301) to `https://troop32.org/join/?x=1`.
- Legacy redirects go to the right pages; `/log-in/`, `/wp-admin/`, and an old blog post show the custom 404.
- On `troop32.org`: the security headers are present, there is **no** `X-Robots-Tag`, and canonical links are correct. On `troop32.pages.dev`: `X-Robots-Tag: noindex, nofollow` is still present.
- The pages contain no `/cdn-cgi/` additions, `mailto:` links are plain, and no cookies are set.
- In Cloudflare DNS, the mail-related records are unchanged, and a test email to the public Scoutmaster address arrives.
- A quick check on a phone, including the menu.

**The cutover is declared complete only when** all of these pass at 30 minutes **and** the scoutmaster@troop32.org delivery test has passed. That time starts the 30-day rollback window.

## Rollback

**When:** a **material failure** is a production outage, an SSL failure, a redirect loop, or a major failure of site functions or content. Anyone, including the Scout Webmaster, reports it to an authorized adult. Once an authorized adult confirms it, there are **up to 30 minutes** to fix it on the new site. If it isn't fixed by then, an authorized adult rolls back.

**Who:** only the Adult Project Lead or the designated adult infrastructure ASM.

**How** (about 5 minutes):

1. Remove `troop32.org` from the Pages project's custom domains.
2. Restore the apex web records exactly as in the private export (type, target, proxied). Touch nothing else, and never the mail records.
3. Turn Email Address Obfuscation back on. The `www` redirect rule can stay, because the old site redirects `www` the same way.
4. Purge the Cloudflare cache.
5. Check: the old site loads at `https://troop32.org/` with no 52x errors, `www` and `http://` redirect, the WordPress admin login works, and a test email arrives.
6. Record the time, the reason, and who did it.

The old site's certificate is valid long-term and Full (strict) needs no change, so switching back works without certificate work. A **restore from the old host's backup** is a separate last resort, only if the old WordPress files or database are damaged, and needs the Adult Project Lead's explicit sign-off.

## The 30-day window and the old site

- For **at least 30 days** after the cutover, the old WordPress installation, the old hosting account, and its website backup stay intact. The old hosting account also stays until the separate email migration is finished.
- Nothing happens automatically on day 30. The Adult Project Lead completes the legacy **preservation review** (deciding what historical material to keep, and where) and then approves decommissioning, which is a separate future plan.
- **Accepted risk:** the only backup copy is stored on the same old host.
