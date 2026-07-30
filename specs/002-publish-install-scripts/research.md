# Phase 0 Research: Working Short Install URLs

**Feature**: `002-publish-install-scripts` | **Date**: 2026-07-29

All findings below were verified empirically against the live site and a local
`dotnet publish` probe, not inferred from documentation. Commands used are shown
so they can be re-run.

---

## R1: How does the site currently respond to the advertised URL?

**Decision**: The URL is a genuine 404 from the static host — nothing intercepts it.

**Evidence**:

```sh
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://name-on.clintcparker.com/install.sh
# 404 text/html
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://name-on.clintcparker.com/does-not-exist-xyz
# 404 text/html
```

**Rationale**: An unmatched path returns 404, not the app's `index.html` with a
200. That means the Azure Static Web Apps deployment currently has **no**
`navigationFallback` configured (there is no `staticwebapp.config.json` anywhere
in the repository — confirmed by `find . -name staticwebapp.config.json`).

**Consequence for the design**: The edge case "the SPA catch-all swallows the
request" (spec line 61) is *already* satisfied — and the way to keep satisfying
it is to **not introduce** `navigationFallback` when adding a config file. This
inverts the naive reading of FR-004: no exclusion rule is needed, but a
regression is one careless config line away, so it must be called out.

**Note**: `name-on-blazor/App.razor` does contain a `<Router>`, but the app has a
single page (`NameOn.razor`, `@page "/"`), so no deep-link fallback is required.

---

## R2: What content type will the host serve `.sh` and `.ps1` as?

**Decision**: Add a minimal `staticwebapp.config.json` mapping `.sh` and `.ps1`
to `text/plain; charset=utf-8`.

**Evidence**:

```sh
curl -sI https://name-on.clintcparker.com/commit.txt | grep -i 'content-type\|cache-control\|x-content-type'
# content-type: text/plain
# cache-control: public, must-revalidate, max-age=30
# x-content-type-options: nosniff
```

**Rationale**: The host sends `X-Content-Type-Options: nosniff` on static
content. Azure Static Web Apps has no default MIME mapping for `.sh` or `.ps1`,
so they would be served as `application/octet-stream`; combined with `nosniff`,
a browser downloads the file instead of rendering it. That breaks FR-004 and
SC-003 ("read the full text in a browser without downloading it first"). An
explicit `mimeTypes` entry is the documented, declarative fix and is the only
config this feature needs.

**Alternatives considered**:

- *Rely on host defaults*: rejected — would serve an opaque download.
- *Rename the published files to `install.sh.txt`*: rejected — changes the
  advertised URL, which is the thing being fixed.
- *Serve from a `/install/` subdirectory*: rejected — longer URL, no benefit.

---

## R3: Is a cache-control policy needed for the stale-copy edge case?

**Decision**: No additional configuration.

**Evidence**: The host already returns `cache-control: public, must-revalidate,
max-age=30` plus a weak `ETag` and `Last-Modified` for static content (see R2
output).

**Rationale**: A 30-second max-age with `must-revalidate` means a user cannot get
an indefinitely stale installer. The spec's "stale cached copy" edge case is
covered by the host's existing default; adding cache headers would be
speculative configuration (Constitution Principle V).

---

## R4: HTTPS redirect for a scheme-less paste

**Decision**: No work needed.

**Evidence**:

```sh
curl -s -o /dev/null -w '%{http_code} %{redirect_url}\n' http://name-on.clintcparker.com/install.sh
# 301 https://name-on.clintcparker.com/install.sh
```

**Rationale**: The host already issues a permanent redirect to HTTPS. The
installers' own `curl -fsSL` follows redirects.

---

## R5: How should the installers get into the published site — one copy, no manual step?

**Decision**: Declare the canonical files in `install/` as static web assets of
the Blazor project via `<Content Include=... Link="wwwroot/..." />`.

**Evidence** — probe run in `/tmp/swa-probe` (a throwaway copy of the repo) with
this added to `name-on-blazor/name-on-blazor.csproj`:

```xml
<ItemGroup>
  <Content Include="../install/install.sh" Link="wwwroot/install.sh" />
  <Content Include="../install/install.ps1" Link="wwwroot/install.ps1" />
</ItemGroup>
```

```sh
dotnet publish ./name-on-blazor/name-on-blazor.csproj -c Release -o build_output
ls build_output/wwwroot/
# _framework/  index.html  index.html.br  index.html.gz  install.ps1  install.sh
diff install/install.sh build_output/wwwroot/install.sh && diff install/install.ps1 build_output/wwwroot/install.ps1
# (no output — byte-identical)
```

**Rationale**:

- Lands both files at the artifact root, so the published paths are exactly
  `/install.sh` and `/install.ps1` (FR-001, FR-005).
- Byte-identical copies, produced by the SDK (FR-002).
- Exactly one copy exists in the repository — `install/` stays authoritative and
  nothing is checked in under `wwwroot/` (FR-007).
- It is part of `dotnet publish`, which the existing deploy workflow already
  runs, so publication is automatic with no new workflow step (FR-006). It also
  works for a local `dotnet run --project name-on-blazor`, which makes the
  feature testable before deploying.

**Alternatives considered**:

- *`cp` step in the deploy workflow* (mirroring the existing `commit.txt` step):
  rejected — works only in CI, so a local publish silently omits the installers,
  and it couples publication to one workflow file rather than to the build.
- *An MSBuild `Copy` target into `name-on-blazor/wwwroot/`*: rejected — leaves
  generated duplicates in the source tree that must then be gitignored.
- *A checked-in second copy under `wwwroot/`*: rejected by FR-007 — trades a 404
  for a silently stale installer.
- *Symlink*: rejected — poor Windows and Git portability.

---

## R6: Can the deployment silently ship nothing if an installer is missing?

**Decision**: No — a missing source file is already a hard build failure. No
extra guard is needed.

**Evidence**: The probe was re-run with the `install.ps1` path pointed at a
nonexistent file:

```text
Microsoft.NET.Sdk.StaticWebAssets.targets(684,5): error :
  System.InvalidOperationException: No file exists for the asset at either
  location '/private/tmp/swa-probe/install/does-not-exist.ps1' or
  '../install/does-not-exist.ps1'.
```

**Rationale**: The static web assets SDK resolves and validates every declared
asset, so `dotnet publish` fails and the deploy job never reaches the upload
step. This satisfies the spec's "deployment runs before the installers exist"
edge case without a bespoke verification step, and lets the design drop a
planned `diff`-the-output workflow step (Constitution Principle V).

---

## R7: Does adding `staticwebapp.config.json` reach the host correctly?

**Decision**: Place it at `name-on-blazor/wwwroot/staticwebapp.config.json`.

**Evidence**: Probe publish output:

```text
build_output/wwwroot/staticwebapp.config.json
build_output/wwwroot/staticwebapp.config.json.br
build_output/wwwroot/staticwebapp.config.json.gz
```

**Rationale**: The deploy workflow uploads `build_output/wwwroot` as
`app_location`, and the host requires the config file at the root of the
uploaded app. Files in the project's `wwwroot/` publish to that root — already
proven in production by `commit.txt`. The host treats the filename as reserved
and does not serve it.

---

## R8: What makes an automated check for FR-009 non-duplicative?

**Decision**: The check derives the URLs it tests by running the built CLI's
`--help` and scraping the README, rather than hard-coding a list.

**Rationale**: FR-009 asks for a check that fails when an advertised URL breaks.
A check with its own hard-coded URL list would itself become a third place to
keep in sync, and would keep passing if the help text were changed to advertise
a *new* broken URL. Deriving the list from the surfaces under test means the
check follows the advertisement automatically (FR-010, SC-002, SC-006).

**Trigger design**: run on `workflow_run` completion of the site deploy (so it
checks after content is live, not racing it), on a daily `schedule` (catches
host/DNS regressions with no commit involved), and on `workflow_dispatch`.
Triggering on `push: main` was rejected — it would race the deploy and produce
flaky failures.

---

## R9: Can an end-to-end "the install actually succeeds" check be part of this feature?

**Decision**: No. The automated check verifies *URL resolution and script
integrity* only. End-to-end install success is blocked by a pre-existing,
separate defect and is out of this feature's scope.

**Evidence**:

```sh
curl -s https://api.github.com/repos/clintcparker/name-on/releases?per_page=10
# 0.1.7+1  assets: []
# 0.1.5+2  assets: ['name-on-cli.zip']
# 0.1.4+1  assets: ['name-on-cli.zip']
```

**Finding**: No release carries the `name-on-<rid>.tar.gz` / `name-on-win-x64.zip`
assets that `install/install.sh` and `install/install.ps1` download. Both
installers therefore fail today at the download step with "Binary not found for
`<rid>` at version 0.1.7+1" — and this is true of the README's
`raw.githubusercontent.com` URLs too, not just the site URL. The cause is that
`.github/workflows/release-cli.yml` triggers on `v*` tags while the repository's
tags are `0.1.7+1`-style with no `v` prefix, so the release job has never run.

**Consequence**:

- FR-003 ("same installed result as the repository-hosted installer") is
  satisfiable and worth asserting — both paths fetch byte-identical scripts —
  but it is currently a comparison of two identical *failures* downstream of
  this feature's change.
- **SC-001 ("installs successfully on the first attempt") cannot be met by this
  feature alone.** It becomes achievable the moment a release with binaries
  exists; nothing in this plan blocks it.
- FR-011 forbids changing what the installers do or which versions they fetch,
  and "hosting the release binaries" is explicitly out of scope, so fixing the
  release tag pattern belongs in a separate change.

**Recommendation**: file a follow-up for the release-workflow tag mismatch, and
keep this feature's automated check scoped to what it can honestly assert. The
check is written so that adding an end-to-end install job later is additive.
