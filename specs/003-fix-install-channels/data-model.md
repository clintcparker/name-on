# Data Model: Working Package-Manager Install Channels

**Feature**: 003-fix-install-channels | **Date**: 2026-07-29

This feature has no application data. Its "entities" are release-pipeline artifacts and the invariants that bind them. The single source of truth for a release is the **git tag**; everything else is derived.

## Entities

### Release

| Field | Definition | Rule |
|---|---|---|
| Tag | Git tag `v<MAJOR>.<MINOR>.<PATCH>` pushed to `clintcparker/name-on` | SemVer, `v` prefix mandatory (the only form that triggers automation) |
| Version | Tag with `v` stripped, e.g. `1.0.0` | Injected into binaries and package via `-p:Version`; what `name-on --version` prints |
| State | implicit: *tagged* → *artifacts published* → *all channels live* | A release is complete only when every channel serves its Version (FR-003) |

### Release Artifact (5 per release)

| RID | Asset name | Consumed by |
|---|---|---|
| linux-x64 | `name-on-linux-x64.tar.gz` | install.sh, Homebrew (Linux) |
| linux-arm64 | `name-on-linux-arm64.tar.gz` | install.sh, Homebrew (Linux) |
| osx-x64 | `name-on-osx-x64.tar.gz` | install.sh, Homebrew (macOS Intel) |
| osx-arm64 | `name-on-osx-arm64.tar.gz` | install.sh, Homebrew (macOS Apple Silicon) |
| win-x64 | `name-on-win-x64.zip` | install.ps1 |

Rules: attached to the GitHub Release for the Tag; download URL is `releases/download/<Tag>/<asset>`; each Unix tarball contains exactly the `name-on` binary; sha256 of each tarball is recorded in the rendered formula and MUST match (FR-004).

### Install Channel (4)

| Channel | Advertised command | Source of truth it reads | Fixed by |
|---|---|---|---|
| NuGet (.NET tool) | `dotnet tool install -g name-on` | nuget.org package `name-on` | this feature (publish job) |
| Homebrew | `brew install clintcparker/tap/name-on` | `clintcparker/homebrew-tap` → `Formula/name-on.rb` | this feature (tap + render job) |
| Shell script | `curl … install.sh \| sh` | latest GitHub Release assets | first `v*` release (side effect) |
| PowerShell script | `irm … install.ps1 \| iex` | latest GitHub Release assets | first `v*` release (side effect) |

Invariant (FR-003/SC-004): for the latest Release, all four channels deliver the same Version.

### NuGet Package

Package ID `name-on` (verified available). Required metadata (FR-010): Description, `MIT` license expression, `PackageProjectUrl`/`RepositoryUrl` → github.com/clintcparker/name-on, README file. Version = Release.Version. `PackAsTool` with command name `name-on`.

### Tap Repository & Formula

`clintcparker/homebrew-tap`, public. Contains only `Formula/name-on.rb`, written exclusively by release automation from the template `install/homebrew/name-on.rb`. Placeholder → value mapping at render time:

| Placeholder | Value |
|---|---|
| `VERSION` (in `version "…"` and in URLs as `vVERSION`) | Release.Version |
| `SHA256_OSX_ARM64` / `SHA256_OSX_X64` / `SHA256_LINUX_ARM64` / `SHA256_LINUX_X64` | sha256 of the corresponding published tarball |

Invariant: a rendered formula never references a tag whose assets don't exist, because rendering downloads the published assets to hash them.

### One-Time Setup (FR-009 registry)

| Item | Where | Automation behavior when missing |
|---|---|---|
| `NUGET_API_KEY` secret | name-on repo secrets | Release workflow preflight fails with explicit message |
| `TAP_PUSH_TOKEN` secret (fine-grained PAT, contents-write on tap repo only) | name-on repo secrets | Release workflow preflight fails with explicit message |
| `clintcparker/homebrew-tap` public repo | GitHub | Homebrew publish job fails on clone/push with explicit message |

## State Transitions (release lifecycle)

```text
push tag v1.0.0
  └─▶ test ─▶ build (5 RIDs) ─▶ GitHub Release + assets ─┬─▶ nuget publish ──▶ nuget.org lists 1.0.0
                └────▶ pack (nupkg)──────────────────────┴─▶ homebrew render+push ─▶ tap formula @ 1.0.0
                                                              └─▶ verify-install-channels (workflow_run) asserts all channels agree on 1.0.0
daily cron ─▶ verify-install-channels asserts latest release == every channel's version (drift detector)
```

Failure rule: any publish job failing fails the whole run (visible partial publication, FR-006); re-running the workflow from the same tag is idempotent and converges.
