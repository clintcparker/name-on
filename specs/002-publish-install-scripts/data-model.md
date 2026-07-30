# Phase 1 Data Model: Working Short Install URLs

**Feature**: `002-publish-install-scripts` | **Date**: 2026-07-29

This feature introduces no runtime data structures, no persistence, and no new
types in `name-on-core`. Its "entities" are build-time and deployment-time
artifacts. They are modeled here because the spec's Key Entities section defines
integrity rules for them that the implementation must enforce.

---

## Entity: Installer Script

A shell or PowerShell program that downloads a released `name-on` binary and
installs it. Two instances exist; both are pre-existing and unmodified by this
feature.

| Field | Shell instance | PowerShell instance |
|---|---|---|
| Canonical path (authoritative, editable) | `install/install.sh` | `install/install.ps1` |
| Published path in site artifact | `wwwroot/install.sh` | `wwwroot/install.ps1` |
| Served URL path | `/install.sh` | `/install.ps1` |
| Served content type | `text/plain; charset=utf-8` | `text/plain; charset=utf-8` |
| Target platforms | Linux, macOS (`linux-x64`, `linux-arm64`, `osx-x64`, `osx-arm64`) | Windows (`win-x64`) |
| Invocation | `curl -fsSL <url> \| sh` | `irm <url> \| iex` |
| Identity marker (first non-shebang line) | `# name-on CLI installer` | `# name-on CLI installer for Windows` |
| Repository marker | `REPO="clintcparker/name-on"` | `$Repo = "clintcparker/name-on"` |

### Relationships

- Each Installer Script is published to **exactly one** path in the site artifact.
- Each Installer Script is referenced by **one or more** Advertised Install URLs
  (currently two each: a site URL and a `raw.githubusercontent.com` URL).

### Validation rules

- **V1 (FR-007)**: Exactly one editable copy exists per platform, at the
  canonical path. No copy of either script may be checked into
  `name-on-blazor/wwwroot/`.
- **V2 (FR-002)**: The published copy is byte-identical to the canonical copy.
  Enforced structurally — the .NET static web assets SDK performs the copy; no
  transformation step exists that could alter it.
- **V3 (FR-011)**: Contents are not modified by this feature. `git diff install/`
  must be empty on this branch.
- **V4 (edge case: ship-nothing deployment)**: A canonical file that cannot be
  resolved fails `dotnet publish` (verified — research R6), so the deploy job
  cannot upload an artifact missing an installer.

### State transitions

The only lifecycle is publication, and it has no manual step:

```text
edited in install/  ──(merge to main)──▶  dotnet publish copies into wwwroot/
                                          ──▶ deploy action uploads artifact
                                          ──▶ served at /install.{sh,ps1}
                                          ──▶ verify-install-urls confirms live content
```

There is no "synced" or "stale" state to track, because no second editable copy
exists (V1). This is what FR-007 and SC-006 buy.

---

## Entity: Advertised Install URL

Any install address the product shows a user. Each is a public promise.

| Field | Description |
|---|---|
| URL | Absolute `https://` address |
| Surface | Where it is shown: CLI help output, README, or the site |
| Platform | Which platform the command applies to |
| Serving origin | Static site host, or GitHub raw content |

### Instances after this feature

| URL | Surface | Platform | Origin |
|---|---|---|---|
| `https://name-on.clintcparker.com/install.sh` | CLI help | Linux/macOS | site |
| `https://name-on.clintcparker.com/install.ps1` | CLI help | Windows | site |
| `https://raw.githubusercontent.com/clintcparker/name-on/main/install/install.sh` | README, and the shell script's own Windows hint | Linux/macOS | GitHub raw |
| `https://raw.githubusercontent.com/clintcparker/name-on/main/install/install.ps1` | README | Windows | GitHub raw |

Non-URL install channels — `dotnet tool install -g name-on` and
`brew install clintcparker/tap/name-on` — are advertised on both surfaces but are
not instances of this entity and are outside the URL check's scope.

### Validation rules

- **V5 (FR-010, SC-002)**: Every instance returns HTTP 200 with the correct
  installer content. Different surfaces may advertise different URLs; each must
  work.
- **V6 (FR-004, SC-003)**: The response is readable text, not an attachment and
  not the web app's HTML.
- **V7 (FR-008)**: The CLI help output contains no `https://` install URL other
  than the instances listed above.
- **V8 (FR-009, SC-005)**: The instance set is *derived* from the surfaces
  (CLI help output, README) at check time rather than hard-coded, so adding or
  changing an advertised URL automatically brings it under the check.

### Invariant

A path that is *not* an advertised URL must return an honest 404 — never a 200
carrying the web app's HTML. This constrains the site configuration: no
`navigationFallback` may be introduced (research R1).
