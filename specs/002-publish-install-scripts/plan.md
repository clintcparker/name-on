# Implementation Plan: Working Short Install URLs

**Branch**: `002-publish-install-scripts` | **Date**: 2026-07-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/002-publish-install-scripts/spec.md`

## Summary

The CLI's help output advertises `curl -fsSL https://name-on.clintcparker.com/install.sh | sh`,
but nothing publishes `install/install.sh` to the site, so the URL 404s. This plan
makes the advertised URL work rather than retracting it: the two canonical
installers in `install/` are declared as static web assets of the Blazor project,
so `dotnet publish` — which the existing deploy workflow already runs — copies
them byte-identically to the site root. A minimal `staticwebapp.config.json` maps
`.sh` and `.ps1` to `text/plain` so a cautious user can read either script in a
browser. The help output's install section is corrected and gains a Windows
PowerShell one-liner, a CLI test pins the advertised URLs, and a new scheduled
workflow derives the advertised URLs from the CLI help and README and fails when
any of them stops serving a real installer.

No new project, no new dependency, no server-side logic, and no second copy of
any installer.

**Known limitation carried forward from research (R9)**: no GitHub release
currently carries the binary assets the installers download, so an install run
fails *after* fetching the script — from the README's URL just as much as from
the new site URL. That is a pre-existing defect in the release workflow's tag
pattern, explicitly out of this feature's scope (FR-011, Out of Scope), and it
means **SC-001 is not achievable by this feature alone**. See "Deferred" below.

## Technical Context

**Language/Version**: C# / .NET 10.0 (SDK pinned in `global.json`, `rollForward: latestFeature`)
**Primary Dependencies**: Blazor WebAssembly (standalone) — no new packages added by this feature
**Storage**: N/A — installers are static files in the published site artifact
**Testing**: MSTest (`name-on-cli-tests`) for the help-output contract; GitHub Actions + `curl` for the served-URL contract
**Target Platform**: Azure Static Web Apps (site); macOS / Linux / Windows (installer consumers)
**Project Type**: Single solution — static web app + CLI sharing a core library; no structural change
**Performance Goals**: N/A — two static files, ~6 KB combined
**Constraints**: No server-side logic (Principle I); exactly one authoritative copy of each installer (FR-007); no change to installer behavior (FR-011); the site's honest 404 for unmatched paths must be preserved (FR-004)
**Scale/Scope**: 2 published files, 2 advertised URLs, 4 files changed, 1 file added, 1 workflow added

No NEEDS CLARIFICATION items remain — every open question was resolved
empirically in [research.md](./research.md).

## Constitution Check

*GATE: evaluated before Phase 0 and re-evaluated after Phase 1 design. Constitution v1.1.0.*

| Principle | Verdict | Basis |
|---|---|---|
| I. Client-Side First | PASS | Installers are published as static files. `staticwebapp.config.json` is declarative host configuration, not server code or a project-controlled backend. No API is introduced; the host model stays `standalone`. |
| II. Portable Core Library | PASS | `name-on-core` is untouched. |
| III. Test-First | PASS | `name-on-core` is untouched, so mandatory TDD does not apply. The `name-on-cli` change is help-output formatting, for which the constitution requires a corresponding `name-on-cli-tests` test (added) and encourages but does not mandate test-first. The test is written before the help-text edit anyway, since it fails against today's string. |
| IV. Static Deployment | PASS | Publication happens inside `dotnet publish`; the `wwwroot/` artifact stays self-contained (the installers become part of it); deployment remains the existing GitHub Actions job on push to `main`. |
| V. Simplicity | PASS | Solves the reported defect only. No new project (structure unchanged), no NuGet package, no new abstraction. Research actively removed two planned mechanisms — a build-time existence guard (R6: the SDK already errors) and cache-control configuration (R3: host defaults suffice). |

**Post-Phase 1 re-evaluation**: unchanged — all five PASS. The Phase 1 design added
only documentation artifacts and did not introduce new components, dependencies,
or structure.

**Result**: no violations. Complexity Tracking is intentionally empty.

Two workflow quality gates from the constitution apply and are satisfied by
design: `dotnet test` must pass (the new CLI test runs in the existing suite),
and `dotnet publish -c Release` must produce a valid static site (verified in the
research probe).

## Project Structure

### Documentation (this feature)

```text
specs/002-publish-install-scripts/
├── spec.md              # Input specification
├── plan.md              # This file
├── research.md          # Phase 0 output — R1..R9, all empirically verified
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output — validation guide
├── contracts/
│   ├── http-installer-endpoints.md   # What the site must serve
│   └── cli-help-install-section.md   # What the help output must advertise
├── checklists/          # Pre-existing
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created here)
```

### Source Code (repository root)

```text
install/
├── install.sh                      # CANONICAL shell installer — unchanged
├── install.ps1                     # CANONICAL PowerShell installer — unchanged
└── homebrew/                       # unchanged

name-on-blazor/
├── name-on-blazor.csproj           # CHANGED: declare ../install/* as wwwroot static assets
└── wwwroot/
    ├── index.html                  # unchanged
    └── staticwebapp.config.json    # NEW: .sh/.ps1 -> text/plain; no navigationFallback

name-on-cli/
└── Program.cs                      # CHANGED: help Install section -> site URLs + PowerShell line;
                                    #          help text extracted to a testable constant

name-on-cli-tests/
└── CliTests.cs                     # CHANGED: new test class pinning advertised install URLs

.github/workflows/
├── azure-static-web-apps-nice-tree-07790bc10.yml  # unchanged — publish already carries the installers
├── release-cli.yml                                # unchanged (see Deferred)
└── verify-install-urls.yml                        # NEW: fails when an advertised URL stops working

README.md                           # unchanged — its raw.githubusercontent.com URLs already work (FR-010)
```

**Structure Decision**: The existing five-project layout is unchanged, as
Principle V requires. The installers live in `install/` and are *referenced* into
the Blazor project's published `wwwroot` by the build; no file moves and no
duplicate copies. The one new source artifact is
`name-on-blazor/wwwroot/staticwebapp.config.json`, which must sit in the
project's `wwwroot/` because that is what publishes to the artifact root the
deploy action uploads (research R7).

## Approach

### 1. Publish the installers (FR-001, FR-002, FR-005, FR-006, FR-007)

Add to `name-on-blazor/name-on-blazor.csproj`:

```xml
<ItemGroup>
  <Content Include="../install/install.sh" Link="wwwroot/install.sh" />
  <Content Include="../install/install.ps1" Link="wwwroot/install.ps1" />
</ItemGroup>
```

Verified in research (R5): both files land at `build_output/wwwroot/` byte-identical,
and a missing source is a hard `dotnet publish` failure (R6), so the deployment
cannot silently ship nothing. The deploy workflow needs no edit.

### 2. Serve them as readable text (FR-004)

Add `name-on-blazor/wwwroot/staticwebapp.config.json` containing only a
`mimeTypes` map for `.sh` and `.ps1` → `text/plain; charset=utf-8`.

Two constraints on this file, both from research:

- It **must not** define `navigationFallback`. The site currently returns an
  honest 404 for unmatched paths (R1); adding a fallback would make bogus paths
  return the app's HTML with a 200 — exactly the failure mode FR-004 and the
  spec's first edge case forbid.
- It needs **no** `cache-control` (R3) and **no** route rules; the host's
  defaults already cover the stale-cache and HTTPS-redirect edge cases (R3, R4).

### 3. Fix and complete the help output (FR-008, FR-010)

In `name-on-cli/Program.cs`, extract the help text into a
`public const string HelpText` on `Program` (currently an inline verbatim string
inside `PrintHelp()`), so tests and the verification workflow can read it, and
correct the Install section to:

```text
Install:
  .NET Tool:   dotnet tool install -g name-on
  Homebrew:    brew install clintcparker/tap/name-on
  Script:      curl -fsSL https://name-on.clintcparker.com/install.sh | sh
  PowerShell:  irm https://name-on.clintcparker.com/install.ps1 | iex
```

`PrintHelp()` becomes `Console.WriteLine(HelpText)` — no behavior change beyond
the section's content.

### 4. Pin it with a test (Principle III, FR-008)

Add an `InstallAdvertisementTests` class to `name-on-cli-tests/CliTests.cs`
asserting against `Program.HelpText`: the two exact one-liners are present, all
four channels are listed, and no `https://name-on.clintcparker.com/` URL other
than the two installer URLs appears. Written before the Program.cs edit — it
fails against today's text, which lacks the PowerShell line.

### 5. Catch regressions automatically (FR-009, FR-010, SC-002, SC-005)

Add `.github/workflows/verify-install-urls.yml` that **derives** the URLs to check
rather than hard-coding them (research R8):

- extract every `https://…install.(sh|ps1)` URL from `dotnet run --project name-on-cli -- --help`
- extract the same pattern from `README.md`
- for each unique URL assert: HTTP 200; `content-type` starts with `text/`; body
  is not HTML (no `<!DOCTYPE`); body contains the installer's own marker
  (`clintcparker/name-on` plus a `name-on CLI installer` header line)
- additionally assert that `install/install.sh` and `install/install.ps1` are
  byte-identical to what the site serves — this is FR-002 and FR-003 checked
  against production, not just against the build output

Triggers: `workflow_run` completion of the site deploy workflow, a daily
`schedule`, and `workflow_dispatch`. Not `push: main` — that would race the
deployment (R8).

### 6. README (FR-010)

No change. Its `raw.githubusercontent.com` URLs return 200 today, FR-010 permits
different channels to advertise different working URLs, and migrating them is
explicitly out of scope. The new workflow checks them anyway.

## Requirements Coverage

| Requirement | Where it is satisfied | Verified by |
|---|---|---|
| FR-001 serve shell installer at advertised path | Approach 1 | quickstart §2, verify workflow |
| FR-002 byte-identical to canonical | Approach 1 (SDK copy) | research R5 `diff`; verify workflow diff-vs-production |
| FR-003 same installed result as README URL | Approach 1 + 5 | verify workflow (script identity). Downstream install blocked — see Deferred |
| FR-004 readable text, no SPA fallback interception | Approach 2 | quickstart §2/§3; research R1, R2 |
| FR-005 PowerShell installer, same guarantees | Approach 1 + 2 | quickstart §2, verify workflow |
| FR-006 automatic on merge to main, no manual step | Approach 1 (inside `dotnet publish`) | research R5; quickstart §5 |
| FR-007 exactly one authoritative copy | Approach 1 (no checked-in duplicate) | quickstart §4 |
| FR-008 help advertises only working URLs + Windows path | Approach 3 | Approach 4 test |
| FR-009 automated check fails on a broken URL | Approach 5 | quickstart §6 |
| FR-010 every advertised URL resolves | Approach 3 + 5 + 6 | verify workflow |
| FR-011 installers unchanged | `install/` files not edited | `git diff --stat install/` is empty |

## Deferred / Out of Band

- **Release binaries missing (blocks SC-001)**: no release carries the
  `name-on-<rid>` archives the installers download, because
  `.github/workflows/release-cli.yml` fires on `v*` tags while the repo's tags
  are `0.1.7+1`-style (research R9). Both the site URL and the README URL fetch a
  correct script that then fails to find a binary. This is a separate defect —
  fixing it would change installer/release behavior, which FR-011 and the spec's
  Out of Scope section forbid here. Recommend filing it as its own issue; once a
  release with binaries exists, SC-001 is met with no change to this feature, and
  an end-to-end install job can be added to the verify workflow additively.
- **README URL migration**, versioned installer paths, and new distribution
  channels remain out of scope per the spec.

## Complexity Tracking

> No Constitution Check violations. Nothing to justify.
