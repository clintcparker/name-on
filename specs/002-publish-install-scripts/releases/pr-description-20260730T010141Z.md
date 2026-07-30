## Summary

`name-on --help` told users to install with
`curl -fsSL https://name-on.clintcparker.com/install.sh | sh`. That URL returned
**404** — `install/install.sh` existed in the repo but nothing published it to the
site, and neither workflow copied it. A first-time user's very first interaction
with the project was a broken promise, with nothing in the failure hinting that
the README's longer `raw.githubusercontent.com` URL would have worked.

This PR makes the advertised URL work rather than retracting it. Both canonical
installers are declared as static web assets of the Blazor project, so the deploy
workflow's existing `dotnet publish` places them at the site root byte-identically
— no second copy, no manual step, no deploy-workflow edit. The help output gains a
Windows PowerShell one-liner, a test pins every advertised channel, and a new
workflow derives the advertised URLs from the help output and README and fails
when any of them stops serving a real installer.

## Specification

[`specs/002-publish-install-scripts/spec.md`](specs/002-publish-install-scripts/spec.md)
— three user stories, eleven functional requirements, six success criteria.

| Requirement | Satisfied by | Verified by |
|---|---|---|
| FR-001 serve shell installer at the advertised path | `Content Include` in `name-on-blazor.csproj` | publish diff; verify workflow |
| FR-002 byte-identical to canonical | SDK copy, no transform | `diff` against publish output **and** production |
| FR-003 same installed result as the README URL | same bytes, same script | verify workflow script identity |
| FR-004 readable text, no SPA fallback interception | `staticwebapp.config.json` `mimeTypes`, **no** `navigationFallback` | 404 assertions in verify workflow |
| FR-005 PowerShell installer, same guarantees | same mechanism, both files | publish diff; verify workflow |
| FR-006 automatic on merge, no manual step | happens inside `dotnet publish` | deploy workflow unchanged (T020) |
| FR-007 exactly one authoritative copy | referenced from `install/`, never copied | `git ls-files '*install.sh' '*install.ps1'` → 2 files |
| FR-008 help advertises only working URLs + a Windows path | help `Install:` section rewritten | `InstallAdvertisementTests` |
| FR-009 automated check fails on a broken URL | `verify-install-urls.yml` | demonstrated locally — see Testing |
| FR-010 every advertised URL resolves | derived-URL check covers help **and** README | verify workflow |
| FR-011 installers unchanged | `install/` not edited | `git diff --stat main -- install/` empty |

## Implementation

Plan: [`specs/002-publish-install-scripts/plan.md`](specs/002-publish-install-scripts/plan.md).
Every open question was resolved empirically in
[`research.md`](specs/002-publish-install-scripts/research.md) (R1–R9).

**Referenced, not copied.** `name-on-blazor.csproj` gains:

```xml
<Content Include="../install/install.sh"  Link="wwwroot/install.sh" />
<Content Include="../install/install.ps1" Link="wwwroot/install.ps1" />
```

`install/` stays the single authoritative location. A missing source file is a
hard `dotnet publish` failure (verified in R6 and again in T019), so the
deployment cannot silently succeed while shipping nothing.

**No `navigationFallback`, deliberately.** `staticwebapp.config.json` contains
*only* a `mimeTypes` map. The site returns an honest 404 for unmatched paths
today; a route fallback would make every mistyped path return the app's HTML with
a 200, so piping a typo'd URL to a shell would execute HTML — strictly worse than
the 404 being fixed. The verify workflow asserts `/Install.sh`, `/install.sh/`,
`/install.txt`, and `/does-not-exist-xyz` all still 404.

**Testable help text.** The inline verbatim string in `PrintHelp()` became
`public const string Program.HelpText`; `PrintHelp()` is now one line. Output is
otherwise unchanged. The `Install:` section is realigned to a common label column
so each command stays copy-pasteable on one unbroken line:

```text
Install:
  .NET Tool:   dotnet tool install -g name-on
  Homebrew:    brew install clintcparker/tap/name-on
  Script:      curl -fsSL https://name-on.clintcparker.com/install.sh | sh
  PowerShell:  irm https://name-on.clintcparker.com/install.ps1 | iex
```

**Derived, not hard-coded, verification.** `verify-install-urls.yml` scrapes every
`https://…install.(sh|ps1)` from the CLI help output *and* `README.md`, then for
each asserts HTTP 200, `content-type: text/*`, no `<!DOCTYPE` in the body, and the
installer's own marker strings. Adding or changing an advertised URL automatically
changes what gets checked. Triggers are `workflow_run` on the site deploy,
a daily `schedule`, and `workflow_dispatch` — **not** `push: main`, which would
race the deployment (R8).

Tasks: **23 of 25 complete** — see Known Limitations for the two that cannot run
before this merges.

### Files changed

| File | Change |
|---|---|
| `name-on-blazor/name-on-blazor.csproj` | declare both installers as published static assets |
| `name-on-blazor/wwwroot/staticwebapp.config.json` | **new** — `.sh`/`.ps1` → `text/plain; charset=utf-8` |
| `name-on-cli/Program.cs` | help text → `const HelpText`; `Install:` section corrected + PowerShell line |
| `name-on-cli-tests/CliTests.cs` | **new** `InstallAdvertisementTests` (6 tests) |
| `.github/workflows/verify-install-urls.yml` | **new** — derived-URL verification |
| `CHANGELOG.md` | **new** |
| `.gitignore` | ignore two `.specify/workflows/runs/` directories |
| `specs/002-publish-install-scripts/` | **new** — spec, plan, research, contracts, data model, quickstart, tasks |

`install/install.sh` and `install/install.ps1` are **not** touched.

## Testing

**Unit / contract — green.** `dotnet test name-on.sln` → **81 passed, 0 failed**
(42 `name-on-cli-tests` incl. 6 new, 39 `name-on-unit-tests`).

**Publish artifact contract — verified.**

```
build_output/wwwroot/install.sh                 3171 bytes
build_output/wwwroot/install.ps1                2841 bytes
build_output/wwwroot/staticwebapp.config.json    105 bytes
diff install/install.sh  build_output/wwwroot/install.sh   → no output
diff install/install.ps1 build_output/wwwroot/install.ps1  → no output
grep -c navigationFallback …/staticwebapp.config.json      → 0
```

**Single-source invariant — verified.** `git ls-files '*install.sh' '*install.ps1'`
lists exactly `install/install.sh` and `install/install.ps1`. Nothing under
`wwwroot/`, and `.gitignore`'s `wwwroot/` entry remains commented out, so no
generated duplicate is being hidden.

**Fail-loud-on-missing-source — verified (T019).** Pointing a `Content Include`
at a nonexistent path fails `dotnet publish` with
`No file exists for the asset at either location …`, then reverting restores a
successful publish.

**FR-009 detection demonstrated pre-deploy.** The verify workflow's checks were
run locally against the derived URL set: the two `raw.githubusercontent.com` URLs
pass, and the two site URLs correctly **fail** while undeployed. That is exactly
the regression signal FR-009 and SC-005 ask for, observed working.

**Serving over HTTP — verified against the publish artifact**, not the dev server.
`dotnet run --project name-on-blazor` answers 200 with a **zero-byte body** for
`/install.sh`: the SDK resolves the route against the *source* `wwwroot/`, where
the file deliberately does not exist. Redirecting the dev-time content root needs
a full `StaticWebAsset` declaration (~18 metadata fields per file), which
Principle V rules out for a dev-only convenience. Publish output and production
are unaffected. This is documented in the `.csproj` comment, in `quickstart.md`
§5, and in the `tasks.md` verification record.

CI has not yet run on this branch — it had no commits before this PR. Please let
the checks complete before merging.

## Review Notes

No `/speckit.review` or `/speckit.qa` reports exist for this feature; the
verification above comes from the task-level checks in
[`tasks.md`](specs/002-publish-install-scripts/tasks.md) and the validation guide
in [`quickstart.md`](specs/002-publish-install-scripts/quickstart.md).

**Constitution check: all five principles PASS**, no violations, Complexity
Tracking intentionally empty. Notably, research *removed* two planned mechanisms
rather than adding them — a build-time existence guard (the SDK already errors)
and cache-control configuration (host defaults suffice).

Reviewers may want to look hardest at:

1. **The absence of `navigationFallback`** in `staticwebapp.config.json`. This is
   load-bearing, and a future "fix the SPA deep-link routing" change would
   silently reintroduce the failure mode. The comment and the 404 assertions in
   the verify workflow are the guardrails.
2. **The `Content Include` relative paths** (`../install/…`) — they resolve
   correctly in the deploy workflow because it publishes the `.csproj` directly
   from the repo root.

### Known limitations

- **An install still fails at the binary-download step — this PR does not change
  that.** No release carries the `name-on-<rid>` archives either installer
  downloads, because `release-cli.yml` fires on `v*` tags while this repository's
  tags are `0.1.9+1`-style. This affects the README's URL exactly as much as the
  new site URL. It is a pre-existing release-workflow defect, out of scope here
  (FR-011 forbids changing installer/release behavior), and filed as **#17**.
  **SC-001 is therefore not achievable by this feature alone**; it is met with no
  change to this feature once a release with binaries exists.
- **T024 and T025 are blocked until this merges and Azure SWA deploys.** T024 runs
  quickstart §6 against the live site (200 + `text/plain` for both URLs,
  byte-identity, browser rendering, the four 404 variants, and the `http://` →
  `https://` redirect). T025 runs the verify workflow against production and then
  proves it detects a break. Everything they check has been verified as far as it
  can be pre-deploy.
- **The README keeps its `raw.githubusercontent.com` URLs.** They work today, are
  independent of the site's availability, and FR-010 only requires that every
  advertised URL work — not that channels agree. Migrating them is out of scope,
  and the verify workflow checks them regardless.

## Checklist

- [x] All in-scope tasks completed (23/25; T024–T025 require the merge + deploy)
- [ ] Code review passed
- [x] Automated tests pass locally (81/81)
- [ ] CI pipeline green — first run happens on this PR
- [x] Changelog updated (`CHANGELOG.md` created)
- [x] Documentation updated (spec artifacts + `quickstart.md` validation guide; README intentionally unchanged)
- [ ] Post-merge: run T024 and T025 once the site deploy completes

---
*Generated by `/speckit.ship` from spec-driven development artifacts.*
