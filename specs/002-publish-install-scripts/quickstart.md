# Quickstart: Validating Working Short Install URLs

**Feature**: `002-publish-install-scripts` | **Date**: 2026-07-29

Runnable checks that prove the feature works. Sections 1–4 run locally against a
build; sections 5–7 run against the deployed site. Details of what each response
must look like live in
[contracts/http-installer-endpoints.md](./contracts/http-installer-endpoints.md)
and [contracts/cli-help-install-section.md](./contracts/cli-help-install-section.md).

## Prerequisites

- .NET 10 SDK (pinned in `global.json`) — `dotnet --version` reports `10.0.1xx`
- `curl`
- For §6/§7: the branch merged to `main` and the site deploy workflow completed

Run everything from the repository root.

---

## 1. Build and test

```sh
dotnet test name-on.sln
dotnet publish ./name-on-blazor/name-on-blazor.csproj -c Release -o build_output
```

**Expect**: tests exit `0` (including the new `InstallAdvertisementTests`), and
publish succeeds. Both are constitution quality gates.

**Negative check** — the deployment cannot ship nothing (FR-006 edge case): temporarily
point one `Content Include` in `name-on-blazor.csproj` at a nonexistent file and
re-run publish. It must fail with
`No file exists for the asset at either location …`. Revert afterward.

## 2. The published artifact carries both installers, byte-identical (FR-001, FR-002, FR-005)

```sh
ls build_output/wwwroot/install.sh build_output/wwwroot/install.ps1 build_output/wwwroot/staticwebapp.config.json
diff install/install.sh   build_output/wwwroot/install.sh
diff install/install.ps1  build_output/wwwroot/install.ps1
```

**Expect**: all three files listed; both `diff`s produce no output.

## 3. The site config does not hijack unmatched paths (FR-004)

```sh
grep -c navigationFallback name-on-blazor/wwwroot/staticwebapp.config.json
```

**Expect**: `0`. A non-zero count means unmatched paths would start returning the
app's HTML with a 200 — the failure mode the spec's first edge case forbids.
See the negative contract in
[contracts/http-installer-endpoints.md](./contracts/http-installer-endpoints.md).

## 4. Exactly one authoritative copy per installer (FR-007, FR-011, SC-006)

```sh
git ls-files '*install.sh' '*install.ps1'
git diff --stat main -- install/
```

**Expect**: the first command lists only `install/install.sh` and
`install/install.ps1` — no copy under `name-on-blazor/wwwroot/`. The second
produces no output, proving installer behavior is unchanged.

## 5. Local end-to-end serving check (optional, pre-deploy)

Serve the **publish artifact** — the same bytes the deploy action uploads:

```sh
dotnet publish ./name-on-blazor/name-on-blazor.csproj -c Release -o build_output
(cd build_output/wwwroot && python3 -m http.server 8731) &
curl -s http://localhost:8731/install.sh | head -3
curl -fsSL http://localhost:8731/install.sh | diff install/install.sh -
```

**Expect**: the script's first lines (`#!/bin/sh`, `# name-on CLI installer`) and
no `diff` output. This confirms the asset is reachable at the advertised path
before anything is deployed. Content type differs here — `http.server` is not the
production host, so §6 remains the authoritative check.

> **Do not use `dotnet run --project name-on-blazor` for this check.** The dev
> server resolves static web assets against the *source* `name-on-blazor/wwwroot/`
> folder, where the installers deliberately do not exist (FR-007 — they are
> referenced from `install/`, not copied in). It therefore answers `200` with a
> zero-byte body for `/install.sh`. Verified empirically: the build manifest maps
> route `install.sh` to `name-on-blazor/wwwroot/install.sh`, a path with no file.
> `Link` and `TargetPath` metadata both behave this way; only a full
> `StaticWebAsset` declaration (≈18 metadata fields per file) would redirect the
> dev-time content root, which Principle V rules out for a dev-only convenience.
> Publish and production are unaffected — §2 and §6 prove it.

## 6. The deployed site serves both installers correctly (FR-001, FR-004, FR-005, SC-002, SC-003)

```sh
for u in https://name-on.clintcparker.com/install.sh \
         https://name-on.clintcparker.com/install.ps1; do
  curl -s -o /tmp/body -w "$u -> %{http_code} %{content_type}\n" "$u"
  head -2 /tmp/body
  grep -q '<!DOCTYPE' /tmp/body && echo "FAIL: served HTML"
done
```

**Expect** for each URL: `200` with a `text/plain` content type, the script's own
first two lines, and no `FAIL` line.

**Byte-identity against production** (FR-002):

```sh
curl -fsSL https://name-on.clintcparker.com/install.sh  | diff install/install.sh  -
curl -fsSL https://name-on.clintcparker.com/install.ps1 | diff install/install.ps1 -
```

**Expect**: no output from either.

**Browser readability** (SC-003): open
`https://name-on.clintcparker.com/install.sh` in a browser. The script text must
render in the page, not trigger a download.

**Honest 404s preserved**:

```sh
for u in /Install.sh /install.sh/ /install.txt /does-not-exist-xyz; do
  curl -s -o /dev/null -w "$u -> %{http_code}\n" "https://name-on.clintcparker.com$u"
done
```

**Expect**: `404` for every one.

**HTTPS redirect**:

```sh
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://name-on.clintcparker.com/install.sh
```

**Expect**: `301` to the `https://` URL.

## 7. The advertised commands are the ones that work (FR-008, FR-010)

```sh
dotnet run --project name-on-cli -- --help | sed -n '/^Install:/,$p'
```

**Expect** the four channels from
[contracts/cli-help-install-section.md](./contracts/cli-help-install-section.md).
Then check every URL the help output and README advertise — the same derivation
the CI workflow uses:

```sh
{ dotnet run --project name-on-cli -- --help; cat README.md; } \
  | grep -oE 'https://[^ |'"'"'")]*install\.(sh|ps1)' | sort -u \
  | while read -r u; do
      curl -s -o /dev/null -w "$u -> %{http_code} %{content_type}\n" "$u"
    done
```

**Expect**: every URL `200` with a `text/plain` content type. This is SC-002 —
100% of advertised URLs working — measured rather than asserted.

## 8. Publication needs no manual step (FR-006, SC-004)

Change a comment in `install/install.sh`, merge to `main`, let the site deploy
workflow finish, then:

```sh
curl -fsSL https://name-on.clintcparker.com/install.sh | grep '<your changed comment>'
```

**Expect**: the change is present, with no human having copied a file.

## 9. Regression detection works (FR-009, SC-005)

```sh
gh workflow run verify-install-urls.yml
gh run watch
```

**Expect**: green. To prove it actually fails on a break, run it against a
deliberately wrong URL in a scratch branch (for example, temporarily advertise
`/install-typo.sh` in the help text) and confirm the job fails.

---

## Known limitation — read before running an actual install

Piping either installer to a shell currently fails at the **download** step with
`Binary not found for <rid> at version 0.1.7+1`, because no GitHub release
carries the `name-on-<rid>` archives. This is true of the README's
`raw.githubusercontent.com` URL too — it is a pre-existing release-workflow
defect (`release-cli.yml` triggers on `v*` tags; the repo's tags have no `v`
prefix), documented in [research.md](./research.md) R9 and out of scope here.

**Therefore**: §§1–9 above are the validation for this feature.
SC-001 ("installs successfully on the first attempt") is **not** verifiable until
a release with binaries exists; at that point this check becomes meaningful with
no change to this feature:

```sh
INSTALL_DIR="$(mktemp -d)" sh -c 'curl -fsSL https://name-on.clintcparker.com/install.sh | sh'
"$INSTALL_DIR/name-on" --version
```
