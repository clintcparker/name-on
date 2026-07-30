# Implementation Plan: Working Package-Manager Install Channels

**Branch**: `003-fix-install-channels` | **Date**: 2026-07-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-fix-install-channels/spec.md`

## Summary

Both advertised package-manager commands fail because the release automation has never fired: `release-cli.yml` triggers on `v*` tags, but every release ever cut was tagged `0.1.7+1`-style, so no NuGet package was published, no CLI binaries were attached to any release, and the Homebrew tap repository was never created. The fix is to (1) make `v*` SemVer tags the documented, actual release procedure and wire the tag version into the built artifacts, (2) complete the release pipeline so it publishes to NuGet and pushes a rendered formula to a real `clintcparker/homebrew-tap` repository with correct checksums, failing loudly when one-time setup (secrets, tap repo) is missing, and (3) add a channel-freshness verification workflow that detects broken or partially published channels — without touching the 002 install-URL verification.

## Technical Context

**Language/Version**: C# / .NET 10.0 (pinned in `global.json`); GitHub Actions YAML + bash for automation; Ruby (single Homebrew formula file)
**Primary Dependencies**: GitHub Actions (`softprops/action-gh-release@v2`, `actions/setup-dotnet@v4`), NuGet.org publish API, Homebrew formula conventions
**Storage**: N/A — published artifacts live on nuget.org, GitHub Releases, and the tap repository
**Testing**: MSTest for .NET (unchanged, no core/CLI code changes expected); channel verification via a scheduled GitHub Actions workflow (curl against nuget.org, tap repo, release assets)
**Target Platform**: Publishing targets: nuget.org (any .NET SDK platform); Homebrew on macOS arm64/x64 and Linux arm64/x64; GitHub Release binaries for linux-x64, linux-arm64, osx-x64, osx-arm64, win-x64
**Project Type**: Single repo, existing five-project .NET solution; this feature changes CI/CD, packaging metadata, the formula template, and docs — not application logic
**Performance Goals**: N/A (release automation; only constraint is that channels converge within one automation cycle per SC-003)
**Constraints**: One-time setup (NuGet API key, tap repo + push token) is manual by design and must fail loudly when absent (FR-009); 002's `verify-install-urls.yml` must keep passing unchanged (FR-008)
**Scale/Scope**: 2 workflows (1 modified, 1 new), 1 csproj, 1 formula template, 1 formula-render step, docs (README/release how-to), 0 changes to `name-on-core`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Assessment | Status |
|---|---|---|
| I. Client-Side First | No server-side processing added; feature is release/CI plumbing only. Blazor host model untouched. | PASS |
| II. Portable Core Library | `name-on-core` untouched. | PASS |
| III. Test-First | No changes to `name-on-core` or (expected) `name-on-cli` code, so no TDD obligation triggers. If CLI code turns out to need a change (it should not — `--version` and `completions` already exist), tests go in `name-on-cli-tests` first. Verification workflow is itself the test for the release contract. | PASS |
| IV. Static Deployment | Blazor deploy workflow untouched; `verify-install-urls.yml` untouched (FR-008). | PASS |
| V. Simplicity | No new projects, no new NuGet packages. One new workflow file is justified by FR-006 (channel verification is a distinct concern from 002's URL verification, and keeping it separate is what keeps 002's workflow unchanged). Formula rendering is `sed` in a workflow step, not a new tool. Constitution already names NuGet + GitHub Releases + Homebrew as the CLI's distribution channels (Technical Constraints, v1.1.0). | PASS |

**Post-Phase-1 re-check**: PASS — design added no projects, no dependencies, no server components. See Complexity Tracking (empty).

## Project Structure

### Documentation (this feature)

```text
specs/003-fix-install-channels/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── release-channels.md   # Phase 1 output — tag/artifact/formula/secrets contract
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
.github/workflows/
├── release-cli.yml            # MODIFIED: version from tag, secret preflight, tap publish job, partial-failure visibility
├── verify-install-urls.yml    # UNCHANGED (FR-008)
└── verify-install-channels.yml  # NEW: daily + post-release channel freshness & version-agreement checks

name-on-cli/
└── name-on-cli.csproj         # MODIFIED: remove hard-coded <Version>1.0.0</Version> (version injected from tag at release; dev builds fall back to SDK default)

install/
└── homebrew/
    └── name-on.rb             # MODIFIED: template stays canonical here; placeholders confirmed against render step

docs/
├── TODO                       # RESOLVED by this feature (delete or mark done at implementation end)
└── how-to/
    └── release.md             # NEW: the documented release procedure (push v* tag) + one-time setup checklist

README.md                      # TOUCHED only if a command's text must change (not expected — name is available)
```

**Structure Decision**: Single-repo layout, existing solution untouched. All work lands in `.github/workflows/`, `install/homebrew/`, `name-on-cli/name-on-cli.csproj`, and `docs/`. The tap repository `clintcparker/homebrew-tap` is a separate one-time-created public repo whose `Formula/name-on.rb` is written only by release automation.

## Complexity Tracking

> No constitution violations — table intentionally empty.
