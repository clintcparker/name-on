# Contract: Release → Install Channels

**Feature**: 003-fix-install-channels | **Date**: 2026-07-29

The interfaces this project exposes are not APIs — they are the exact commands users run and the artifact/naming conventions the channels depend on. Any change to these is a breaking change to a public promise.

## C1. Advertised commands (must succeed verbatim on a clean machine)

```sh
dotnet tool install -g name-on          # then: name-on --version → <latest version>
brew install clintcparker/tap/name-on   # then: name-on --version → <latest version>
curl -fsSL https://name-on.clintcparker.com/install.sh | sh        # unchanged from 002
irm https://name-on.clintcparker.com/install.ps1 | iex             # unchanged from 002
```

Surfaces bound to this contract: CLI `--help` output (`name-on-cli/Program.cs`), `README.md` Installation section, tools.clintparker.com. Changing a command's text requires updating all three in the same release (FR-007).

## C2. Release trigger contract

| Input | Behavior |
|---|---|
| Push tag `v<semver>` (e.g. `v1.0.0`) | Full pipeline runs: test → build 5 RIDs → GitHub Release with assets → NuGet publish → tap formula update |
| Push any other tag (e.g. `1.0.0`, `0.1.8+1`) | Nothing runs. Not an error — but the release never reaches any channel, and the daily channel verification will flag the drift if a maintainer intended it as a release |
| Re-run of a partially failed release run | Idempotent: `--skip-duplicate` on NuGet, no-op formula commit if content unchanged, `softprops/action-gh-release` updates the existing release |

## C3. Artifact naming contract (consumed by install.sh, install.ps1, formula)

```text
https://github.com/clintcparker/name-on/releases/download/v<VERSION>/name-on-<RID>.tar.gz   # linux-x64 linux-arm64 osx-x64 osx-arm64
https://github.com/clintcparker/name-on/releases/download/v<VERSION>/name-on-win-x64.zip
```

Each Unix tarball contains a single file `name-on` (executable). The zip contains `name-on.exe`. These names are load-bearing in three independent consumers — renaming any asset breaks script installs and the formula simultaneously.

## C4. Version contract

`git tag vX.Y.Z` ⇒ `-p:Version=X.Y.Z` on both `dotnet publish` and `dotnet pack` ⇒
- NuGet package version = `X.Y.Z`
- `name-on --version` prints `name-on X.Y.Z` (Program.cs strips any `+metadata` suffix)
- Formula `version "X.Y.Z"`, URLs reference `vX.Y.Z`

`name-on-cli.csproj` carries no hard-coded `<Version>` (dev builds default to 1.0.0; only tagged builds are published).

## C5. Formula render contract

Input: `install/homebrew/name-on.rb` (canonical template, this repo). Placeholders `VERSION`, `SHA256_OSX_ARM64`, `SHA256_OSX_X64`, `SHA256_LINUX_ARM64`, `SHA256_LINUX_X64` — each MUST appear in the template and MUST be absent from the rendered output (render step asserts both, so a template edit that breaks a placeholder fails the release rather than shipping a literal `SHA256_...` string). Checksums are computed from the assets actually attached to the GitHub Release, never from local build output. Output: `Formula/name-on.rb` in `clintcparker/homebrew-tap`, committed with message `name-on <VERSION>`.

## C6. Secrets / one-time setup contract (FR-009)

| Secret | Scope | Missing ⇒ |
|---|---|---|
| `NUGET_API_KEY` | nuget.org key, push scope, package `name-on` | Preflight job fails: "one-time setup missing: NUGET_API_KEY (see docs/how-to/release.md)" |
| `TAP_PUSH_TOKEN` | Fine-grained PAT, contents read/write, only `clintcparker/homebrew-tap` | Preflight job fails: "one-time setup missing: TAP_PUSH_TOKEN (see docs/how-to/release.md)" |

Preflight runs before any build so a missing secret fails in seconds, not after a 5-platform build matrix.

## C7. Verification contract (`verify-install-channels.yml`, FR-006)

Triggers: daily cron, `workflow_run` on "Release CLI" completion, manual dispatch.

Given `L` = version of the latest `v*` GitHub release, the run fails unless ALL hold:

1. All five assets from C3 exist on release `vL` (HTTP 200 on HEAD).
2. `https://api.nuget.org/v3-flatcontainer/name-on/index.json` lists `L` (with bounded retry ≤ ~15 min in the post-release path, to absorb NuGet indexing lag; no retry on cron).
3. `clintcparker/homebrew-tap` → `Formula/name-on.rb` (raw) contains `version "L"`.
4. Post-release path only: `dotnet tool install -g name-on --version L` succeeds and `name-on --version` prints `L` (end-to-end smoke of C1's first command).

Any single check failing ⇒ workflow fails ⇒ maintainer notified by GitHub (SC-005). Checks 2+3 against the same `L` make partial publication a failure by construction.

## C8. Non-regression contract (FR-008)

`.github/workflows/verify-install-urls.yml`, `install/install.sh`, `install/install.ps1` are not modified by this feature. The 002 verification must be green on this branch before merge.
