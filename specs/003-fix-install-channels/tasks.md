# Tasks: Working Package-Manager Install Channels

**Input**: Design documents from `/specs/003-fix-install-channels/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/release-channels.md, quickstart.md

**Tests**: No unit-test tasks — the spec does not request TDD and no `name-on-core`/`name-on-cli` application code changes are expected (Constitution Check, plan.md). The verification workflow (T015) *is* the automated test for the release contract; per-story validation tasks execute the quickstart checks.

**Organization**: Tasks are grouped by user story. US1 = NuGet channel, US2 = Homebrew channel, US3 = hands-off release automation + drift detection. Several tasks are **manual maintainer actions** (secrets, repo creation) — they are in scope per FR-009 as *one-time setup* and are marked `(manual, maintainer)`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

## Path Conventions

Single repo, existing five-project .NET solution. All work lands in `.github/workflows/`, `name-on-cli/name-on-cli.csproj`, `install/homebrew/`, and `docs/`. The tap repository `clintcparker/homebrew-tap` is a separate public repo created once by hand and written only by release automation.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the documented release procedure and the 002 non-regression baseline before touching the pipeline.

- [X] T001 Create `docs/how-to/release.md` documenting: (a) the release procedure — push an annotated SemVer tag `v<MAJOR>.<MINOR>.<PATCH>` (e.g. `git tag -a v1.0.0 -m "name-on 1.0.0" && git push origin v1.0.0`), which is the only tag form that triggers `release-cli.yml`; (b) the one-time setup checklist per contract C6 — `NUGET_API_KEY` secret (nuget.org key, push scope, package `name-on`), `TAP_PUSH_TOKEN` secret (fine-grained PAT, contents read/write, only `clintcparker/homebrew-tap`), and creation of the public `clintcparker/homebrew-tap` repo; (c) re-run idempotency notes per C2 (`--skip-duplicate`, no-op formula commit, `softprops/action-gh-release` updates existing release)
- [X] T002 [P] Record the 002 baseline (FR-008): run `gh workflow run verify-install-urls.yml && gh run watch` and confirm green; confirm `git diff main -- .github/workflows/verify-install-urls.yml install/install.sh install/install.ps1` is empty on this branch

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Version wiring (tag → binary → package) and loud-failure preflight. Both channels depend on these for FR-003 (same version everywhere) and FR-009 (fail loudly on missing setup).

**⚠️ CRITICAL**: No user story work can begin until this phase is complete — T004/T005 restructure `release-cli.yml`, which every later workflow task edits.

- [X] T003 Remove the hard-coded `<Version>1.0.0</Version>` line from `name-on-cli/name-on-cli.csproj` so dev builds fall back to the SDK default and release builds can only get their version from the tag (contract C4, research R3)
- [X] T004 Add a `preflight` job as the first job in `.github/workflows/release-cli.yml`: derive `VERSION=${GITHUB_REF_NAME#v}` and expose it as a job output; fail within seconds with the explicit message `one-time setup missing: NUGET_API_KEY (see docs/how-to/release.md)` when `secrets.NUGET_API_KEY` is empty, and equivalently for `TAP_PUSH_TOKEN`; make the existing `test` job (and thus everything downstream) `needs: preflight` (contract C6, FR-009)
- [X] T005 Wire the derived version into builds in `.github/workflows/release-cli.yml`: pass `-p:Version=${{ needs.preflight.outputs.version }}` to `dotnet publish` in the `build` job and to `dotnet pack` in the `nuget` job (contract C4, research R3)

**Checkpoint**: A `v1.2.3` tag produces binaries and a nupkg that all report `1.2.3`; a missing secret kills the run in seconds with a message naming the secret.

---

## Phase 3: User Story 1 - Install as a .NET tool from the advertised command (Priority: P1) 🎯 MVP

**Goal**: `dotnet tool install -g name-on` installs the latest released version from nuget.org, and the listing identifies the project (FR-001, FR-010).

**Independent Test**: On a clean machine with only the .NET SDK, `dotnet tool install -g name-on` then `name-on --version` both succeed (quickstart §3). Requires any `v*` release to have been cut — a throwaway prerelease tag works before US3 lands.

### Implementation for User Story 1

- [X] T006 [P] [US1] Add `<PackageReadmeFile>README.md</PackageReadmeFile>` to `name-on-cli/name-on-cli.csproj` plus an `<ItemGroup>` packing the repo `README.md` into the package root, strengthening the nuget.org listing (FR-010, research R4)
- [X] T007 [P] [US1] Split the `Push to NuGet` step out of the `release` job in `.github/workflows/release-cli.yml` into its own `publish-nuget` job (`needs: release`, downloads the `nuget-package` artifact, keeps `--skip-duplicate`, no `continue-on-error`) so a NuGet failure is independently visible in the run summary (research R7, FR-006)
- [ ] T008 [P] [US1] (manual, maintainer) Create a nuget.org API key scoped to push package `name-on` and add it as the `NUGET_API_KEY` repository secret on `clintcparker/name-on`, following `docs/how-to/release.md`
- [ ] T009 [US1] Validate per quickstart §3: after a `v*` release exists (throwaway prerelease tag acceptable; clean up with `git push origin :refs/tags/<tag> && gh release delete <tag> --yes`), run `dotnet tool install -g name-on` and `name-on --version` on a clean machine/container and confirm the version matches the tag; confirm `https://www.nuget.org/packages/name-on` shows description, MIT license, and repo links (SC-001, FR-010)

**Checkpoint**: The first advertised command from docs/TODO works verbatim.

---

## Phase 4: User Story 2 - Install via Homebrew from the advertised command (Priority: P2)

**Goal**: `brew install clintcparker/tap/name-on` resolves the tap, verifies checksums, and installs the prebuilt binary for the user's platform (FR-002, FR-004).

**Independent Test**: On a clean macOS machine with Homebrew, `brew install clintcparker/tap/name-on` then `name-on --version` both succeed (quickstart §4). Independent of US1 — needs only Foundational + a `v*` release with assets.

### Implementation for User Story 2

- [X] T010 [P] [US2] (manual, maintainer) Create the public repository `clintcparker/homebrew-tap` on GitHub (a README is enough; `Formula/name-on.rb` is written only by release automation) per contract C6 and research R5
- [ ] T011 [P] [US2] (manual, maintainer) Create a fine-grained PAT with contents read/write scoped to only `clintcparker/homebrew-tap` and add it as the `TAP_PUSH_TOKEN` repository secret on `clintcparker/name-on`, following `docs/how-to/release.md`
- [X] T012 [P] [US2] Update the header comment of `install/homebrew/name-on.rb` to state the file is a template rendered and pushed by release automation (not manually copied), and confirm the placeholders are exactly `VERSION`, `SHA256_OSX_ARM64`, `SHA256_OSX_X64`, `SHA256_LINUX_ARM64`, `SHA256_LINUX_X64` as consumed by the render step (contract C5)
- [X] T013 [US2] Add a `homebrew` job to `.github/workflows/release-cli.yml` (`needs: release`, after assets are published): download the four Unix tarballs from `releases/download/v<VERSION>/`, compute each sha256, render `install/homebrew/name-on.rb` via `sed` substituting `VERSION` and the four `SHA256_*` placeholders, assert every placeholder appears in the template AND is absent from the rendered output (fail the release otherwise), then clone `clintcparker/homebrew-tap` using `TAP_PUSH_TOKEN` and commit the result to `Formula/name-on.rb` with message `name-on <VERSION>` — skipping the commit when content is unchanged so re-runs are idempotent (contracts C2, C5; research R5, R7)
- [ ] T014 [US2] Validate per quickstart §4: on macOS run `brew install clintcparker/tap/name-on`, `name-on --version` (matches release), and `brew test name-on`; repeat on Apple Silicon and Intel if available (SC-001, FR-004)

**Checkpoint**: The second advertised command from docs/TODO works verbatim; formula checksums provably match published assets.

---

## Phase 5: User Story 3 - Releases reach every channel without manual steps (Priority: P3)

**Goal**: Cutting a release the documented way publishes every channel with zero manual steps, and automation — not users — reports any channel that breaks or drifts (FR-005, FR-006).

**Independent Test**: Push a `v*` tag, perform zero further manual actions, then verify each advertised install command delivers that version (quickstart §2, §5, §6).

### Implementation for User Story 3

- [X] T015 [US3] Create `.github/workflows/verify-install-channels.yml` per contract C7 — triggers: daily cron, `workflow_run` on "Release CLI" completion, and `workflow_dispatch`; logic: resolve `L` = version of the latest `v*` GitHub release, then fail unless (1) all five assets from contract C3 return HTTP 200 on HEAD for `vL`, (2) `https://api.nuget.org/v3-flatcontainer/name-on/index.json` lists `L` — with bounded retry ≤ ~15 min only in the post-release (`workflow_run`) path to absorb NuGet indexing lag, no retry on cron, (3) the raw `Formula/name-on.rb` in `clintcparker/homebrew-tap` contains `version "L"`, and (4) post-release path only: `dotnet tool install -g name-on --version L` succeeds and `name-on --version` prints `L` (FR-006, SC-005)
- [X] T016 [US3] Review the final `.github/workflows/release-cli.yml` structure for partial-failure visibility (research R7): channels publish in separate jobs (`release` assets, `publish-nuget`, `homebrew`), no step anywhere uses `continue-on-error`, and any job failing fails the whole run; fix any deviation
- [ ] T017 [US3] Validate loud preflight failure per quickstart §1: with a secret missing (before T008/T011 complete, or with a secret temporarily renamed), push a throwaway prerelease tag (e.g. `v0.9.9-rc.1`) and confirm the run fails within seconds at `preflight` naming the missing secret; clean up with `git push origin :refs/tags/v0.9.9-rc.1 && gh release delete v0.9.9-rc.1 --yes` (FR-009)
- [ ] T018 [US3] Cut the first real release per quickstart §2: `git tag -a v1.0.0 -m "name-on 1.0.0" && git push origin v1.0.0`, then `gh run watch` — expect preflight → test → 5-RID build → GitHub Release with 5 assets → NuGet push → tap formula commit `name-on 1.0.0`, all green with zero manual steps (SC-003, FR-005); this release also repairs the install.sh/install.ps1 script channel end-to-end (research R1)
- [ ] T019 [US3] Confirm drift detection and version agreement per quickstart §5–§6: the release-triggered "Verify Install Channels" run is green; `gh release view --json tagName`, the nuget.org flatcontainer index, and the tap formula all agree on the same version; `gh workflow run verify-install-channels.yml` passes on manual dispatch (SC-004, SC-005)

**Checkpoint**: All user stories complete — a tag push is the entire release procedure, and staleness/partial publication pages the maintainer.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Resolve the originating TODO, audit advertised surfaces, and prove 002 non-regression.

- [X] T020 [P] Delete `docs/TODO` (or replace its contents with a resolved note pointing at this feature) now that both reported commands work (plan.md Project Structure)
- [X] T021 [P] Audit every advertised surface against contract C1 verbatim: `README.md` Installation section, CLI `--help` output in `name-on-cli/Program.cs`, and tools.clintparker.com — confirm the exact command text `dotnet tool install -g name-on` and `brew install clintcparker/tap/name-on`; no text changes are expected since the NuGet name was available (FR-007, SC-002, research R8)
- [ ] T022 Final 002 non-regression check per contract C8: `git diff main -- .github/workflows/verify-install-urls.yml install/install.sh install/install.ps1` is empty and `gh workflow run verify-install-urls.yml && gh run watch` is green (FR-008, SC-006)
- [ ] T023 Run the full quickstart sweep (`specs/003-fix-install-channels/quickstart.md` §1–§8) and confirm every section holds, including SC-004's cross-channel `name-on --version` agreement

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately. T001 and T002 are independent.
- **Foundational (Phase 2)**: Depends on T001 (preflight error messages reference `docs/how-to/release.md`). BLOCKS all user stories — T004/T005 restructure `release-cli.yml`, which T007, T013, and T016 then edit.
- **US1 (Phase 3)**: Depends on Foundational. T009 (validation) additionally requires a `v*` release to exist and T008 (secret) to be done.
- **US2 (Phase 4)**: Depends on Foundational. Independent of US1. T013 depends on T010–T012; T014 requires a `v*` release cut after T013.
- **US3 (Phase 5)**: T015 is independent of US1/US2 implementation (new file); T016 depends on T007 + T013; T017 can run before secrets exist (that's the point); T018 depends on ALL implementation tasks plus T008/T010/T011; T019 depends on T015 + T018.
- **Polish (Phase 6)**: T020/T021 anytime after T018 proves the commands work; T022/T023 last.

### Within-file ordering (sequential, same file)

`release-cli.yml` is edited by T004 → T005 → T007 → T013 → T016, in that order — never in parallel. `name-on-cli.csproj` is edited by T003 → T006.

### Parallel Opportunities

- T001 ∥ T002 (Setup)
- After Foundational: T006, T007, T008 together (US1); T010, T011, T012 together (US2); T015 (US3) — but do not run T007 and T013 concurrently (same file)
- Manual maintainer tasks T008, T010, T011 can all proceed while automation tasks are in flight
- T020 ∥ T021 (Polish)

---

## Parallel Example: after Phase 2 completes

```bash
# US1 implementation + one-time setup, concurrently:
Task: "T006 Add PackageReadmeFile metadata in name-on-cli/name-on-cli.csproj"
Task: "T007 Split publish-nuget job in .github/workflows/release-cli.yml"
Task: "T008 (manual) Create NUGET_API_KEY secret"

# US2 one-time setup + template prep, concurrently:
Task: "T010 (manual) Create clintcparker/homebrew-tap repo"
Task: "T011 (manual) Create TAP_PUSH_TOKEN secret"
Task: "T012 Update template header in install/homebrew/name-on.rb"

# US3 verification workflow (new file, no conflicts):
Task: "T015 Create .github/workflows/verify-install-channels.yml"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1 (T001–T002) → Phase 2 (T003–T005)
2. Phase 3: T006–T008, then cut a throwaway prerelease tag to run T009
3. **STOP and VALIDATE**: `dotnet tool install -g name-on` works — the P1 broken promise from docs/TODO is fixed

### Incremental Delivery

1. Setup + Foundational → version wiring and loud preflight in place
2. US1 → NuGet channel live (MVP)
3. US2 → Homebrew channel live
4. US3 → cut `v1.0.0` for real; verification workflow guards all channels (and the 002 script channel) from silent drift
5. Polish → TODO resolved, surfaces audited, 002 verification proven green

### Practical note on validation ordering

T017 (prove preflight fails loudly) is cheapest to run **before** adding the secrets in T008/T011 — the missing-setup state exists naturally at that point. If secrets are added first, temporarily rename one instead.
