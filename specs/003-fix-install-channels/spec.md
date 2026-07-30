# Feature Specification: Working Package-Manager Install Channels

**Feature Branch**: `003-fix-install-channels`
**Created**: 2026-07-29
**Status**: Draft
**Input**: User description: "fix the issues from docs/TODO — the install instructions shown on tools.clintparker.com don't work: `dotnet tool install -g name-on` fails because the package is not found in the NuGet feed, and `brew install clintcparker/tap/name-on` fails because the repository `clintcparker/homebrew-tap` does not exist."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Install as a .NET tool from the advertised command (Priority: P1)

A .NET developer sees name-on advertised — on the tools site, in the README, or in the CLI's own help output — with the command `dotnet tool install -g name-on`. They paste it into a terminal. The tool installs from the public package feed and `name-on` runs.

**Why this priority**: This is the most natural install path for the product's core audience (a .NET tool for .NET developers), it requires no third-party account or repository to exist on the user's side, and today it fails with "not found in NuGet feeds" — a public promise the product breaks on first contact.

**Independent Test**: On a clean machine with only the .NET SDK installed, run `dotnet tool install -g name-on`, then `name-on --version`. Both succeed with no other part of this feature shipped.

**Acceptance Scenarios**:

1. **Given** a machine with the .NET SDK and no name-on installed, **When** the user runs `dotnet tool install -g name-on` exactly as advertised, **Then** the install completes successfully from the default public feed.
2. **Given** the tool was installed that way, **When** the user runs `name-on --version`, **Then** it reports the latest released version of the product.
3. **Given** a user searches the public package feed for the tool by its advertised name, **Then** they find a package whose description and links identify this project.
4. **Given** a new version of the product is released, **When** a user installs or updates via the same command, **Then** they receive that new version.

---

### User Story 2 - Install via Homebrew from the advertised command (Priority: P2)

A macOS (or Linux) user sees the command `brew install clintcparker/tap/name-on` and runs it. The tap resolves, the formula downloads a prebuilt binary matching their platform, and `name-on` runs.

**Why this priority**: Equally broken today ("Repository not found"), but it serves a broader-than-.NET audience at the cost of more moving parts: it depends on published release binaries and a separate tap repository existing. It is second only because the .NET tool path restores a working advertised command with the fewest dependencies.

**Independent Test**: On a clean macOS machine with Homebrew, run `brew install clintcparker/tap/name-on`, then `name-on --version`. Both succeed regardless of whether User Story 1 shipped.

**Acceptance Scenarios**:

1. **Given** a machine with Homebrew and no name-on installed, **When** the user runs `brew install clintcparker/tap/name-on` exactly as advertised, **Then** the tap is found, the formula installs, and the command completes successfully.
2. **Given** the tool was installed that way on Apple Silicon or Intel macOS, **When** the user runs `name-on --version`, **Then** it reports the latest released version, matching the binary built for their CPU architecture.
3. **Given** the formula references downloadable release artifacts, **When** Homebrew verifies their checksums, **Then** verification passes because the published checksums match the published artifacts.
4. **Given** a new version of the product is released, **When** a user runs the package manager's upgrade command, **Then** they receive that new version.

---

### User Story 3 - Releases reach every channel without manual steps (Priority: P3)

A maintainer cuts a release the way they normally do. Without any further manual action, the new version appears on the public package feed, the tap's formula is updated with correct version and checksums, and downloadable binaries exist for every supported platform. If any channel fails to update or stops working, automation reports it to the maintainer instead of leaving it for a user to discover.

**Why this priority**: This is what keeps Stories 1 and 2 from decaying. The current breakage exists precisely because publishing was never wired to how releases are actually cut — release automation exists but has never once run, so nothing was ever published anywhere. A one-time manual fix would recreate the same failure on the next release.

**Independent Test**: Cut a release of a new version using the project's normal release procedure, perform zero additional manual steps, then verify each advertised install command delivers that version.

**Acceptance Scenarios**:

1. **Given** a maintainer cuts a release using the project's normal release procedure, **When** the release automation completes, **Then** the new version is available through every advertised install channel with no manual publishing step.
2. **Given** the release automation runs, **When** it finishes, **Then** downloadable binaries for each supported operating system and CPU architecture are published alongside the release.
3. **Given** any advertised install channel stops delivering a working install, **When** the automated checks run, **Then** the failure is reported to maintainers.
4. **Given** the release automation partially fails (one channel published, another not), **Then** the failure is visible to the maintainer rather than silently leaving channels on different versions.

---

### Edge Cases

- **Release cut in a form the automation doesn't recognize**: the project's release automation has never fired because releases were tagged in a form the automation doesn't listen for. Whatever form the normal release procedure takes must be the form that triggers publishing — otherwise every channel silently stays stale, which is exactly the current defect.
- **Advertised name is unavailable on the public feed**: the package name could be taken or reserved by someone else on the public feed. If the advertised name cannot be obtained, every surface advertising it must change to the name that actually works.
- **Channels drift to different versions**: if one channel publishes and another fails, users on different channels get different versions. Partial publication must be surfaced as a failure, not treated as success.
- **Checksum or artifact mismatch in the tap**: if the formula's recorded checksums don't match the published binaries, installs fail with an integrity error, which looks worse than "not found". Formula updates and artifact publication must not be able to disagree silently.
- **First release bootstrap**: publishing requires one-time setup that no automation can conjure — credentials for the package feed and a publicly visible tap repository. Until that setup exists, the automation must fail loudly rather than appear to succeed.
- **Unsupported platform via Homebrew**: a user on a platform with no prebuilt binary (e.g., Linux on an unusual architecture) should get a clear "not supported" outcome from the formula, not a corrupt install.
- **Existing channels must not regress**: the script installers and short install URLs fixed by the previous feature (002) must keep working; adding package-manager publishing must not break or bypass the existing verification of those URLs.
- **A channel that can't be fixed must stop being advertised**: if a decision is made to drop a channel rather than fix it, every user-facing surface advertising it (tools site, README, CLI help output) must be updated in the same release — a knowingly broken advertisement is worse than a missing one.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Running `dotnet tool install -g name-on` on a machine with the .NET SDK MUST install the latest released version of the CLI from the default public package feed.
- **FR-002**: Running `brew install clintcparker/tap/name-on` on a supported macOS machine (Apple Silicon and Intel) MUST install the latest released version of the CLI, and the tap repository the command references MUST exist and be publicly accessible.
- **FR-003**: Every install channel MUST deliver the same product version for a given release, and the version reported by `name-on --version` after install MUST match the released version.
- **FR-004**: Prebuilt release binaries for each supported operating system and CPU architecture MUST be published for every release, and the Homebrew formula's recorded checksums MUST match those binaries.
- **FR-005**: Publishing to all channels MUST happen automatically as part of the project's normal release procedure — the procedure a maintainer actually uses, not a hypothetical one — with no per-release manual publishing step.
- **FR-006**: An automated check MUST fail visibly when any advertised install channel stops delivering a working install, including partial-publication states where channels disagree on the latest version.
- **FR-007**: Every user-facing surface that advertises install commands (the tools site, README, and CLI help output) MUST advertise only commands that work; if a channel is dropped instead of fixed, its advertisement MUST be removed from all surfaces.
- **FR-008**: The install channels fixed by the previous feature (script installers and their short URLs) MUST continue to work unchanged, and their existing automated verification MUST continue to pass.
- **FR-009**: One-time channel setup that cannot be automated (package-feed credentials, creation of the public tap repository) MUST be identified explicitly, and release automation MUST fail loudly — not succeed silently — when that setup is missing.
- **FR-010**: The published package listing on the public feed MUST identify the project (description, project links, license) so users can verify they are installing the genuine tool.

### Key Entities

- **Install channel**: A way a user obtains the CLI — public package feed (.NET tool), Homebrew tap, script installers, or direct binary download. Each advertised channel is a public promise that must either work or stop being advertised.
- **Release**: A published version of the product. A release is complete only when every advertised channel delivers it and its binaries exist for all supported platforms.
- **Advertised install command**: The exact command text shown on any user-facing surface (tools site, README, CLI help). Each must succeed verbatim on a clean machine.
- **Tap repository**: The publicly accessible location the Homebrew command references, holding the formula whose version and checksums must always correspond to a real published release.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Both commands reported broken in docs/TODO — `dotnet tool install -g name-on` and `brew install clintcparker/tap/name-on` — complete successfully on the first attempt on a clean machine.
- **SC-002**: 100% of install commands advertised on user-facing surfaces (tools site, README, CLI help output) succeed when executed verbatim.
- **SC-003**: After a maintainer cuts a release using the normal release procedure, every advertised channel delivers the new version within one automation cycle, with zero manual publishing steps.
- **SC-004**: `name-on --version` reports the same version regardless of which channel the user installed from.
- **SC-005**: A broken or partially published install channel is reported by automated checks before any user reports it.
- **SC-006**: The channels delivered by the previous feature (script install URLs) continue to pass their existing automated verification throughout and after this change.

## Assumptions

- **Both channels are wanted, not just one**: docs/TODO reports both commands as broken and both are advertised on multiple surfaces, so the default is to make both work rather than drop either. Dropping a channel remains an allowed outcome only if fixing it proves impossible (e.g., the package name is unobtainable), in which case FR-007 applies.
- **The tools site advertises this project's canonical commands**: tools.clintparker.com is an external surface owned by the same maintainer. This feature makes the advertised commands work as shown; if the working command text ends up differing, updating that site is part of FR-007's "all surfaces" obligation.
- **One-time setup is in scope as setup, not as recurring work**: registering feed credentials and creating the public tap repository are acceptable one-time manual acts by the maintainer; everything per-release must be automatic (FR-005).
- **Supported platforms follow the existing release build matrix**: macOS (Apple Silicon, Intel), Linux (x64, arm64), and Windows (x64) — the platforms the project already builds binaries for. Homebrew coverage targets macOS on both architectures, plus Linux where the existing binaries allow; no new platforms are introduced by this feature.
- **"Latest released version" means the most recent release the maintainer has cut**, not necessarily a new version number created for this feature — though cutting a fresh release is the expected way to prove Story 3 end-to-end.
