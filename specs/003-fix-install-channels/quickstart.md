# Quickstart: Validating the Install Channels

**Feature**: 003-fix-install-channels | **Date**: 2026-07-29

How to prove each piece of this feature works end-to-end. Details of what must hold are in [contracts/release-channels.md](./contracts/release-channels.md); entity rules in [data-model.md](./data-model.md).

## Prerequisites

- One-time setup completed (see C6 in the contract): `NUGET_API_KEY` and `TAP_PUSH_TOKEN` secrets set, public `clintcparker/homebrew-tap` repo created.
- `gh` CLI authenticated as the maintainer.

## 1. Preflight fails loudly when setup is missing (FR-009)

Before adding the secrets, push a throwaway prerelease tag (e.g. `v0.9.9-rc.1`) — or temporarily rename a secret — and confirm the release run fails within seconds at the preflight job with a message naming the missing secret. Delete the tag/release afterwards:

```sh
git push origin :refs/tags/v0.9.9-rc.1 && gh release delete v0.9.9-rc.1 --yes
```

## 2. Cut a real release (Story 3 — the main event)

```sh
git tag -a v1.0.0 -m "name-on 1.0.0"
git push origin v1.0.0
gh run watch   # "Release CLI" workflow
```

Expected: test → 5-RID build → GitHub Release `v1.0.0` with 5 assets → NuGet push → tap formula commit `name-on 1.0.0`, all green, zero manual steps. Then the release-triggered "Verify Install Channels" run goes green (it waits out NuGet indexing lag).

## 3. NuGet channel (Story 1 / SC-001)

On a machine (or container) with only the .NET SDK:

```sh
dotnet tool install -g name-on
name-on --version    # → name-on 1.0.0
name-on              # → e.g. brave-otter-42
```

Listing check (FR-010): `https://www.nuget.org/packages/name-on` shows description, MIT license, and links to github.com/clintcparker/name-on.

## 4. Homebrew channel (Story 2 / SC-001)

On macOS (repeat on Apple Silicon and Intel if available):

```sh
brew install clintcparker/tap/name-on   # tap resolves, checksum verifies, installs
name-on --version                       # → name-on 1.0.0
brew test name-on                       # formula's test block passes
```

## 5. Version agreement across channels (SC-004)

`name-on --version` prints the same version whether installed via NuGet, brew, install.sh, or install.ps1. Quick cross-check without machines:

```sh
gh release view --json tagName -q .tagName                                  # v1.0.0
curl -s https://api.nuget.org/v3-flatcontainer/name-on/index.json           # contains "1.0.0"
curl -s https://raw.githubusercontent.com/clintcparker/homebrew-tap/main/Formula/name-on.rb | grep version
```

## 6. Drift detection (SC-005)

Trigger the verifier manually and confirm green: `gh workflow run verify-install-channels.yml`. To prove it detects drift, its cron run must fail if any channel lags the latest release — this was exercised naturally before the first release existed on all channels.

## 7. 002 non-regression (SC-006 / FR-008)

```sh
gh workflow run verify-install-urls.yml && gh run watch
```

Must pass unchanged. `git diff main -- .github/workflows/verify-install-urls.yml install/install.sh install/install.ps1` must be empty.

## 8. Surfaces (SC-002)

`name-on --help`, README, and tools.clintparker.com advertise exactly the commands validated above, and `docs/TODO` is resolved (removed or marked done).
