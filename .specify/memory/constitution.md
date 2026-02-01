<!--
Sync Impact Report
==================
Version change: 1.0.0 → 1.1.0
Modified principles:
  - V. Simplicity: Expanded allowed project structure to include CLI
    and CLI test projects alongside existing three projects.
Modified sections:
  - Technical Constraints: Added CLI distribution channels and
    release workflow references.
  - Development Workflow: Extended TDD scope to cover CLI projects.
Rationale: The name-on-core library was designed for reuse across
  frontends (Principle II rationale). Adding a CLI frontend fulfills
  this design goal without modifying the core library.
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ no updates needed
  - .specify/templates/spec-template.md ✅ no updates needed
  - .specify/templates/tasks-template.md ✅ no updates needed
  - .specify/templates/agent-file-template.md ✅ no updates needed
  - .specify/templates/checklist-template.md ✅ no updates needed
Follow-up TODOs: None
-->

# Name-On Constitution

## Core Principles

### I. Client-Side First

All application logic MUST execute in the browser. No server-side
APIs, backend services, or runtime server dependencies are permitted.

- Features MUST NOT introduce server-side processing or API calls
  to custom backends.
- Third-party client-side APIs (e.g., CDN-hosted CSS) are acceptable
  when they do not require a server the project controls.
- The Blazor WASM host model MUST remain `standalone` (no server
  project).

**Rationale**: Name-On is a static site. Client-side execution
eliminates hosting complexity, reduces cost, and enables deployment
to any static file host.

### II. Portable Core Library

The `name-on-core` library MUST remain a standalone, reusable C#
class library with zero UI or hosting dependencies.

- `name-on-core` MUST NOT reference Blazor, ASP.NET, or any
  presentation framework.
- All name-generation logic MUST reside in `name-on-core`.
- The library MUST be independently compilable and testable without
  the Blazor project.

**Rationale**: A decoupled core library enables reuse across
different frontends (CLI, API, desktop) and simplifies unit testing.

### III. Test-First (NON-NEGOTIABLE)

TDD is mandatory for all changes to `name-on-core`. The Red-Green-
Refactor cycle MUST be followed.

- Tests MUST be written before implementation code.
- Tests MUST fail (Red) before the corresponding implementation is
  written.
- Implementation MUST be the minimum code needed to make tests pass
  (Green).
- Refactoring MUST NOT change observable behavior (Refactor).
- All existing tests MUST pass before a PR can be merged.
- UI-only changes in `name-on-blazor` are exempt from TDD but MUST
  NOT break existing tests.
- Changes to `name-on-cli` MUST include corresponding tests in
  `name-on-cli-tests`. TDD is strongly encouraged but not mandatory
  for CLI argument parsing and output formatting.

**Rationale**: The core library's correctness (uniqueness guarantees,
format compliance, dictionary integrity) is critical. TDD enforces
this discipline.

### IV. Static Deployment

The application MUST remain deployable as a static site to Azure
Static Web Apps (or any equivalent static host).

- The CI/CD pipeline MUST produce a static build artifact via
  `dotnet publish`.
- No build step MUST require a running server or database.
- The `wwwroot/` output MUST be self-contained (HTML, CSS, JS, WASM
  binaries, and static assets).
- Deployment MUST be automated via GitHub Actions on push to `main`.

**Rationale**: Static hosting is the simplest, cheapest, and most
reliable deployment model for this project. It aligns with
Principle I (Client-Side First).

### V. Simplicity

Every change MUST solve a current, concrete problem. Speculative
features and premature abstractions are prohibited.

- YAGNI: Do not build functionality until it is needed.
- Prefer inline solutions over new abstractions when the abstraction
  would serve only one call site.
- The project structure (`name-on-core`, `name-on-blazor`,
  `name-on-unit-tests`, `name-on-cli`, `name-on-cli-tests`) MUST NOT
  grow without explicit constitution amendment.
- Dependencies MUST be justified; avoid adding NuGet packages when
  the .NET standard library suffices.

**Rationale**: Name-On is a small, focused tool. Complexity erodes
maintainability disproportionately in small projects.

## Technical Constraints

- **Target Framework**: .NET 8.0 (all projects).
- **SDK**: Version pinned in `global.json`.
- **Test Framework**: MSTest.
- **CI/CD**: GitHub Actions deploying to Azure Static Web Apps (Blazor)
  and GitHub Releases + NuGet (CLI).
- **Frontend**: Blazor WebAssembly (standalone, no server project).
- **CLI**: .NET console application distributed as a .NET global tool
  (NuGet), self-contained binaries (GitHub Releases), and Homebrew.
- **Styling**: Bootstrap via CDN; no CSS preprocessors required.
- **Package Manager**: NuGet only; no npm/node dependencies.

## Development Workflow

### Quality Gates (all MUST pass before merge)

1. **All unit tests pass**: `dotnet test` MUST exit with code 0.
2. **Build succeeds**: `dotnet publish` in Release mode MUST produce
   a valid static site.
3. **Constitution compliance**: PR reviewers MUST verify the change
   does not violate any Core Principle. Non-compliant changes MUST
   be rejected or accompanied by a constitution amendment.
4. **TDD evidence**: For `name-on-core` changes, the PR MUST show
   test commits preceding implementation commits (or tests and
   implementation in the same commit with tests written first).

### PR Requirements

- Every PR MUST target `main`.
- CI MUST pass before merge.
- Commit messages MUST be descriptive (imperative mood, concise
  summary).

### Amendment Procedure

- Constitution changes MUST be proposed as a dedicated PR with only
  the constitution file modified.
- The PR description MUST explain the rationale for the change.
- Version MUST be bumped per semantic versioning (see Governance).

## Governance

This constitution supersedes all other development practices for the
Name-On project. When a conflict exists between this constitution
and any other document, the constitution takes precedence.

- **Compliance**: All PRs and code reviews MUST verify adherence to
  the Core Principles. Violations MUST be flagged and resolved
  before merge.
- **Amendments**: Changes to this constitution require a dedicated
  PR, clear rationale, and version increment. Breaking changes to
  principles (removal or redefinition) require a MAJOR version bump.
- **Versioning**: This constitution follows semantic versioning:
  - MAJOR: Principle removed or fundamentally redefined.
  - MINOR: New principle or section added, or material expansion.
  - PATCH: Wording clarifications, typo fixes, non-semantic edits.
- **Review Cadence**: The constitution SHOULD be reviewed when the
  project's architecture materially changes (e.g., new target
  platform, new project added to the solution).

**Version**: 1.1.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
