---
description: "Task list for feature 002-publish-install-scripts"
---

# Tasks: Working Short Install URLs

**Input**: Design documents from `/specs/002-publish-install-scripts/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Test tasks ARE included. Constitution Principle III requires a
corresponding `name-on-cli-tests` test for any `name-on-cli` change, and
contracts/cli-help-install-section.md defines a test contract with six
assertions. The `install/` scripts themselves are not modified (FR-011), so no
installer tests are added.

**Organization**: Tasks are grouped by user story so each story ships and
validates independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Exact file paths are included in every task

## Path Conventions

This repository uses a five-project solution at the repository root (no `src/`
or `tests/` roots). Relevant paths:

- `install/` — canonical installer scripts (authoritative, never edited here)
- `name-on-blazor/` — Blazor WASM static site (publishes the installers)
- `name-on-cli/Program.cs` — CLI, including help output
- `name-on-cli-tests/CliTests.cs` — MSTest suite
- `.github/workflows/` — deploy and verification workflows

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish a green baseline and confirm the pre-change state that
the feature is fixing, so every later verification is a real before/after.

- [X] T001 Establish a green baseline: run `dotnet test name-on.sln` and `dotnet publish ./name-on-blazor/name-on-blazor.csproj -c Release -o build_output` from the repository root; both must succeed, and `build_output/wwwroot/` must NOT yet contain `install.sh` or `install.ps1`
- [X] T002 [P] Confirm the pre-change state the feature fixes: `curl -s -o /dev/null -w '%{http_code}\n' https://name-on.clintcparker.com/install.sh` returns `404`, and `find . -name staticwebapp.config.json` returns nothing (baseline for research R1/R7)

**Checkpoint**: Build and tests green; the defect is reproduced; no site config exists yet.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Make the CLI help text addressable by tests and by the
verification workflow. Both US1 and US2 assert against it, and US3 scrapes it.

**⚠️ CRITICAL**: T003 must land before any help-output assertion in US1/US2. It is a pure refactor — no user-visible change.

- [X] T003 Extract the inline verbatim help string out of `PrintHelp()` into `public const string HelpText` on the `Program` class in `name-on-cli/Program.cs` (currently inline at `name-on-cli/Program.cs:176`), and reduce `PrintHelp()` to `Console.WriteLine(HelpText)` and nothing else, per the Code contract in `specs/002-publish-install-scripts/contracts/cli-help-install-section.md`. Content of the text is unchanged in this task; `dotnet run --project name-on-cli -- --help` output must be byte-identical to the baseline.
- [X] T004 Add a new `[TestClass] public class InstallAdvertisementTests` to `name-on-cli-tests/CliTests.cs` asserting against `Program.HelpText` the two channel-presence rules that are story-independent (test contract assertions 3, 4, 6): contains `dotnet tool install -g name-on`, contains `brew install clintcparker/tap/name-on`, and contains no `raw.githubusercontent.com` URL. These pass against the current text and pin what must not regress.

**Checkpoint**: Help text is a testable constant; `dotnet test name-on.sln` green.

---

## Phase 3: User Story 1 - Install from the URL the tool tells you to use (Priority: P1) 🎯 MVP

**Goal**: `https://name-on.clintcparker.com/install.sh` serves the canonical
shell installer as readable text with a 200, so the one-liner the CLI already
prints stops 404-ing.

**Independent Test**: `curl -fsSL https://name-on.clintcparker.com/install.sh | diff install/install.sh -` produces no output, the response is `200` with a `text/plain` content type, and the script renders in a browser rather than downloading. Requires no part of US2 or US3.

### Tests for User Story 1 ⚠️

> Written before the implementation tasks. This one passes against today's help text — the shell one-liner is already advertised correctly; US1's defect is on the serving side, not in the help text. The test exists so the advertised URL cannot silently change out from under the publication mechanism.

- [X] T005 [US1] Add a test method to `InstallAdvertisementTests` in `name-on-cli-tests/CliTests.cs` asserting `Program.HelpText` contains the exact string `curl -fsSL https://name-on.clintcparker.com/install.sh | sh` (test contract assertion 1)

### Implementation for User Story 1

- [X] T006 [P] [US1] Add an `<ItemGroup>` to `name-on-blazor/name-on-blazor.csproj` containing `<Content Include="../install/install.sh" Link="wwwroot/install.sh" />`, exactly as verified in research R5 — no copy of the script is added to the source tree (FR-007)
- [X] T007 [P] [US1] Create `name-on-blazor/wwwroot/staticwebapp.config.json` containing only a `mimeTypes` object mapping `".sh"` to `"text/plain; charset=utf-8"`, per the Site configuration contract in `specs/002-publish-install-scripts/contracts/http-installer-endpoints.md`. It MUST NOT contain `navigationFallback`, `routes`, or `globalHeaders` — a `navigationFallback` would make unmatched paths return the app's HTML with a 200 (research R1, FR-004).
- [X] T008 [US1] Verify the build-output contract: run `dotnet publish ./name-on-blazor/name-on-blazor.csproj -c Release -o build_output`, then confirm `build_output/wwwroot/install.sh` and `build_output/wwwroot/staticwebapp.config.json` exist and `diff install/install.sh build_output/wwwroot/install.sh` produces no output (quickstart §2), and `grep -c navigationFallback name-on-blazor/wwwroot/staticwebapp.config.json` returns `0` (quickstart §3)
- [X] T009 [US1] Verify local serving: `dotnet run --project name-on-blazor`, then `curl -s http://localhost:<printed-port>/install.sh | head -3` shows `#!/bin/sh` and `# name-on CLI installer` (quickstart §5). Content type differs from production here; §6 in the Polish phase is the authoritative check.

**Checkpoint**: The shell installer is wired into the published artifact, byte-identical, with the site config in place and unmatched paths still 404. Shippable on its own — merging here fixes the reported defect.

---

## Phase 4: User Story 2 - Windows users get an equally short install URL (Priority: P2)

**Goal**: The PowerShell installer is served at
`https://name-on.clintcparker.com/install.ps1` and the help output advertises
it alongside the other three channels.

**Independent Test**: `dotnet run --project name-on-cli -- --help` lists all four install channels including a PowerShell line, and `curl -fsSL https://name-on.clintcparker.com/install.ps1 | diff install/install.ps1 -` produces no output. Does not change any US1 behavior.

**Note on parallelism with US1**: T012 and T013 extend the same two files US1
created (`name-on-blazor.csproj`, `staticwebapp.config.json`), so US2 cannot be
worked concurrently with US1 by a second person — the additions are one line
each and must follow US1's edits to those files.

### Tests for User Story 2 ⚠️

> **These fail against the current help text**, which has no PowerShell line. Observe red before T011.

- [X] T010 [US2] Add test methods to `InstallAdvertisementTests` in `name-on-cli-tests/CliTests.cs` asserting against `Program.HelpText`: (a) contains the exact string `irm https://name-on.clintcparker.com/install.ps1 | iex` (test contract assertion 2), and (b) the only `https://name-on.clintcparker.com/` URLs anywhere in the text are `.../install.sh` and `.../install.ps1` — guarding against re-introducing a dead site URL (test contract assertion 5, V7). Run `dotnet test name-on.sln` and confirm (a) fails.

### Implementation for User Story 2

- [X] T011 [US2] Update the `Install:` section inside `Program.HelpText` in `name-on-cli/Program.cs` to exactly match the Output contract in `specs/002-publish-install-scripts/contracts/cli-help-install-section.md`: add the `PowerShell:  irm https://name-on.clintcparker.com/install.ps1 | iex` line and realign the four labels (`.NET Tool:`, `Homebrew:`, `Script:`, `PowerShell:`) to a common column so commands stay copy-pasteable on one unbroken line. Nothing outside the `Install:` section changes.
- [X] T012 [P] [US2] Add `<Content Include="../install/install.ps1" Link="wwwroot/install.ps1" />` to the existing installer `<ItemGroup>` in `name-on-blazor/name-on-blazor.csproj`
- [X] T013 [P] [US2] Add `".ps1": "text/plain; charset=utf-8"` to the `mimeTypes` object in `name-on-blazor/wwwroot/staticwebapp.config.json`, keeping the file free of `navigationFallback`, `routes`, and `globalHeaders`
- [X] T014 [US2] Verify: `dotnet test name-on.sln` is green (T010 now passes), `dotnet publish ./name-on-blazor/name-on-blazor.csproj -c Release -o build_output` then `diff install/install.ps1 build_output/wwwroot/install.ps1` produces no output, and `curl -s http://localhost:<port>/install.ps1 | head -2` against `dotnet run --project name-on-blazor` shows `# name-on CLI installer for Windows`

**Checkpoint**: Both installers publish and both are advertised; all four channels appear in help output. US1 behavior unchanged.

---

## Phase 5: User Story 3 - Installers stay correct without anyone remembering to sync them (Priority: P3)

**Goal**: Publication stays automatic and single-sourced, and a broken advertised
URL is reported by CI rather than discovered by a user.

**Independent Test**: `gh workflow run verify-install-urls.yml` passes against the deployed site; temporarily advertising a bogus installer URL in the help text on a scratch branch makes it fail. Separately, `git ls-files '*install.sh' '*install.ps1'` lists exactly two files.

### Implementation for User Story 3

- [X] T015 [US3] Create `.github/workflows/verify-install-urls.yml` that **derives** the URLs to check rather than hard-coding them (research R8): set up .NET 10 per `global.json`, extract every match of `https://[^ |'"\)]*install\.(sh|ps1)` from both `dotnet run --project name-on-cli -- --help` and `README.md`, `sort -u` them (expect four: two `name-on.clintcparker.com` URLs from help, two `raw.githubusercontent.com` URLs from `README.md:25` and `README.md:28`), and for each assert HTTP `200`, a `content-type` starting with `text/`, a body with no `<!DOCTYPE`, and a body containing both `clintcparker/name-on` and the installer's own `name-on CLI installer` header line. Triggers: `workflow_run` on completion of `Azure Static Web Apps CI/CD`, a daily `schedule`, and `workflow_dispatch` — NOT `push: main`, which would race the deploy (research R8).
- [X] T016 [US3] Add a step to `.github/workflows/verify-install-urls.yml` asserting byte-identity against production, not just against the build output: `curl -fsSL https://name-on.clintcparker.com/install.sh | diff install/install.sh -` and the same for `install.ps1`, both required to produce no output (FR-002, FR-003)
- [X] T017 [US3] Verify exactly one authoritative copy per installer (FR-007, V1, SC-006): `git ls-files '*install.sh' '*install.ps1'` lists only `install/install.sh` and `install/install.ps1` — nothing under `name-on-blazor/wwwroot/` — and confirm `.gitignore` was not modified to hide a generated duplicate (the `wwwroot/` entry at `.gitignore:31` must remain commented out)
- [X] T018 [US3] Verify installer behavior is unchanged (FR-011, V3): `git diff --stat main -- install/` produces no output
- [X] T019 [US3] Verify the deployment cannot silently ship nothing (V4, spec edge case): temporarily point one `Content Include` in `name-on-blazor/name-on-blazor.csproj` at a nonexistent path, confirm `dotnet publish` fails with `No file exists for the asset at either location …` (research R6), then revert the change and re-confirm publish succeeds
- [X] T020 [US3] Confirm no edit to `.github/workflows/azure-static-web-apps-nice-tree-07790bc10.yml` is needed (FR-006): its `Publish Blazor WASM` step already runs `dotnet publish … -o build_output` and its `app_location` is `build_output/wwwroot`, which is where the installers now land — record this so no redundant copy step gets added

**Checkpoint**: All three stories functional. Publication is automatic, single-sourced, and monitored.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Close out the source TODO, record the deferred defect, and run the
post-deploy validations that require the branch to be on `main`.

- [X] T021 [P] Update `docs/TODO` to remove the resolved dead-install-URL item, noting that the short URL was made to work (rather than the help text retracted) per the spec's first Assumption
- [X] T022 [P] File a follow-up GitHub issue for the pre-existing release defect that blocks SC-001: `.github/workflows/release-cli.yml` triggers on `v*` tags while the repository's tags are `0.1.7+1`-style, so no release carries the `name-on-<rid>` binaries either installer downloads (research R9, plan "Deferred"). Out of scope here; SC-001 is met with no change to this feature once a release with binaries exists.
- [X] T023 Run the local half of the validation guide end to end — `specs/002-publish-install-scripts/quickstart.md` §§1–5 and the local part of §7 — and confirm every stated expectation
> **T024 and T025 are blocked until this branch is merged and the Azure Static
> Web Apps deploy has run.** Everything they check has been verified as far as it
> can be pre-deploy: the publish artifact serves both installers byte-identically
> over HTTP (quickstart §5), the live site still returns `404` for `/Install.sh`,
> `/install.sh/`, `/install.txt`, and `/does-not-exist-xyz` (negative contract
> baseline preserved), and the verification workflow's checks were executed
> locally against the derived URL set — the two README URLs pass and the two site
> URLs correctly fail while undeployed, which is FR-009/SC-005 demonstrated.

- [ ] T024 Post-merge: run `specs/002-publish-install-scripts/quickstart.md` §6 against the deployed site — `200` with `text/plain` for both installer URLs, byte-identity via `diff`, browser renders the script without downloading (SC-003), `404` for `/Install.sh`, `/install.sh/`, `/install.txt`, `/does-not-exist-xyz`, and `301` to `https://` for the insecure-scheme request
- [ ] T025 Post-merge: `gh workflow run verify-install-urls.yml && gh run watch` is green (quickstart §9), then prove it detects a break by advertising a bogus installer URL on a scratch branch and confirming the job fails (FR-009, SC-005)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately
- **Foundational (Phase 2)**: depends on Phase 1; T003 BLOCKS every help-output assertion in US1 and US2
- **User Story 1 (Phase 3)**: depends on Phase 2 — the MVP; shippable alone
- **User Story 2 (Phase 4)**: depends on Phase 2 for T010/T011; T012 and T013 depend on US1's T006 and T007 having created the `<ItemGroup>` and the config file
- **User Story 3 (Phase 5)**: T015's URL derivation expects the help output US2 produces; run it after US2, or after US1 alone if shipping the MVP only (it will then check three URLs instead of four)
- **Polish (Phase 6)**: T021–T023 after the stories being shipped are complete; T024 and T025 require the branch merged to `main` and the site deploy workflow finished

### User Story Dependencies

- **US1 (P1)**: independent. Delivers the defect fix by itself.
- **US2 (P2)**: independently *testable* and *shippable*, but its two one-line file additions come after US1 touched those same files. No behavioral dependency on US1.
- **US3 (P3)**: independent in substance; its derived URL list simply covers whatever is advertised at the time it runs.

### Within Each User Story

- Tests before implementation (T005 before T006–T009; T010 before T011)
- Config and project-file edits before verification tasks
- Local verification before post-deploy verification

### Parallel Opportunities

- T002 runs alongside T001 (network check vs. local build)
- **US1**: T006 (`name-on-blazor.csproj`) and T007 (`staticwebapp.config.json`) are different files — run together
- **US2**: T011 (`Program.cs`), T012 (`name-on-blazor.csproj`), and T013 (`staticwebapp.config.json`) are three different files — run together
- **Polish**: T021 (`docs/TODO`) and T022 (issue tracker) are independent of each other and of the code
- Genuinely limited overall: this feature touches five files. Most sequencing is a real file dependency, not conservatism.

---

## Parallel Example: User Story 2

```bash
# Three different files, no ordering between them:
Task: "T011 Update the Install: section in Program.HelpText in name-on-cli/Program.cs"
Task: "T012 Add the install.ps1 Content Include to name-on-blazor/name-on-blazor.csproj"
Task: "T013 Add the .ps1 mimeTypes entry to name-on-blazor/wwwroot/staticwebapp.config.json"

# Then converge on verification:
Task: "T014 dotnet test + publish diff + local curl of /install.ps1"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1: Setup — green baseline, defect reproduced
2. Phase 2: Foundational — T003 refactor, T004 baseline test
3. Phase 3: User Story 1 — publish `install.sh`, add the site config
4. **STOP and VALIDATE**: quickstart §§1–5; the advertised shell one-liner resolves
5. Merge to `main`, let the deploy run, then quickstart §6 — the reported 404 is gone

### Incremental Delivery

1. Setup + Foundational → help text is testable
2. US1 → the dead URL works → **MVP, closes the reported defect**
3. US2 → Windows users get a short URL and see it in help output
4. US3 → the fix is protected by CI and can't decay
5. Polish → source TODO closed, deferred release defect filed, post-deploy checks run

### Solo-Maintainer Note

This is a single-maintainer repository and the feature touches five files, so the
"parallel team" pattern does not really apply. The value of the phase split here
is the **stopping points**: US1 alone is a complete, mergeable fix, and US3 can be
added later without revisiting US1 or US2.

---

## Notes

- `[P]` tasks touch different files and have no ordering between them
- `install/install.sh` and `install/install.ps1` are **never edited** by this feature (FR-011) — T018 enforces that
- No copy of either installer is checked in under `name-on-blazor/wwwroot/` (FR-007) — T017 enforces that
- `staticwebapp.config.json` must never gain `navigationFallback` — that single line would turn every bogus path into a 200 carrying the app's HTML, which is worse than the 404 being fixed (research R1, T007/T013)
- **SC-001 is not achievable by this feature alone.** An actual install still fails at the binary-download step for both the site URL and the README URL, because no release carries the archives (research R9). T022 files that separately.
- Commit after each task or logical group

### Verification record (implementation pass)

- **T020 (no deploy-workflow edit needed)**: confirmed. `azure-static-web-apps-nice-tree-07790bc10.yml`
  runs `dotnet publish ./name-on-blazor/name-on-blazor.csproj -c Release -o build_output`
  and uploads `app_location: build_output/wwwroot` — precisely where the two
  `Content Include` items place the installers. **Do not add a copy step.**
- **T009 deviation — the dev server cannot serve these assets.** `dotnet run --project name-on-blazor`
  answers `200` with a **zero-byte body** for `/install.sh`. Cause, verified in the
  build manifest: the SDK maps route `install.sh` to the *source* path
  `name-on-blazor/wwwroot/install.sh`, which deliberately has no file (FR-007 —
  referenced from `install/`, not copied in). `Link` and `TargetPath` metadata both
  behave this way; only a full `StaticWebAsset` declaration (~18 metadata fields
  per file) redirects the dev-time content root, which Principle V rules out for a
  dev-only convenience. **Publish and production are unaffected** — verified
  byte-identical in the artifact and over HTTP. T009 was therefore satisfied by
  serving the publish artifact (`python3 -m http.server` over `build_output/wwwroot`),
  which checks the same bytes the deploy action uploads. quickstart §5 was updated
  to document this and to steer away from the dev server.
