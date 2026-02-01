# Implementation Plan: Customization Options

**Branch**: `001-customization-options` | **Date**: 2026-02-01 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/001-customization-options/spec.md`

## Summary

Add user-facing customization controls to Name-On: format templates (5 presets), joining styles (dash, underscore, none, camelCase, PascalCase), configurable number ranges with optional zero-padding, and word-length filters. All generation logic lives in `name-on-core`; the Blazor UI provides the customization panel and persists preferences via `localStorage`.

The core approach is to refactor `Namer` to accept a `NameOptions` configuration object instead of raw parameters, generalize the `ElementType` enum to support variable number ranges, and add a `NameJoiner` responsible for joining elements with the correct separator or casing transformation. The Blazor component adds a collapsible panel below the existing generate/copy buttons.

## Technical Context

**Language/Version**: C# / .NET 8.0 (pinned in `global.json`)
**Primary Dependencies**: Blazor WebAssembly (standalone), Bootstrap via CDN
**Storage**: Browser `localStorage` for preference persistence (no server-side storage)
**Testing**: MSTest (`dotnet test`), TDD mandatory for `name-on-core` changes
**Target Platform**: Browser (WebAssembly) -- static deployment to Azure Static Web Apps
**Project Type**: Three-project .NET solution (core library + Blazor WASM frontend + unit tests)
**Performance Goals**: No perceptible latency from customization; all computation in-memory on existing dictionaries
**Constraints**: Client-side only (no server APIs), static deployment, three-project structure is fixed
**Scale/Scope**: Single-page application; approximately 1,400 adjectives, 3,600 nouns in built-in dictionaries

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status | Notes |
|-----------|------|--------|-------|
| I. Client-Side First | No server APIs or backend dependencies introduced | PASS | All logic in-browser; storage via `localStorage` |
| II. Portable Core Library | All name-generation logic in `name-on-core`; no Blazor/ASP.NET references | PASS | Spec explicitly requires this. `name-on-core` gains `NameOptions`, `JoiningStyle` enum, `FormatTemplate` model, word-length filter. Blazor handles only UI + persistence. |
| III. Test-First | TDD mandatory for `name-on-core` changes | PASS | Tests written before implementation for all new core types and `Namer` refactor. |
| IV. Static Deployment | Build produces static site via `dotnet publish` | PASS | No new build dependencies; no server runtime required. |
| V. Simplicity | No speculative features or premature abstractions | PASS | Fixed template presets (not user-defined). Discrete number range options (not free-form). Three-project structure preserved. |

No violations. Complexity Tracking table not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-customization-options/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
name-on-core/
├── Dicts.cs              # Existing -- adjective/noun word lists (unchanged)
├── Namer.cs              # Existing -- refactor: accept NameOptions, generalize Gen()
├── NameOptions.cs        # NEW -- configuration record (template, joining style, number config, word filter)
├── FormatTemplate.cs     # NEW -- predefined template definitions + ElementType updates
├── JoiningStyle.cs       # NEW -- enum + joining/casing logic
├── NumberConfig.cs       # NEW -- range + padding configuration
├── WordLengthFilter.cs   # NEW -- min/max filter + pool-size warning logic
└── name-on-core.csproj   # Existing (unchanged)

name-on-blazor/
├── NameOn.razor           # Existing -- add customization panel UI, localStorage persistence
├── Program.cs             # Existing (unchanged)
├── MainLayout.razor       # Existing (unchanged)
└── name-on-blazor.csproj  # Existing (unchanged)

name-on-unit-tests/
├── UnitTest1.cs                # Existing -- keep current tests passing
├── FormatTemplateTests.cs      # NEW -- template element ordering
├── JoiningStyleTests.cs        # NEW -- separator + casing transformation
├── NumberConfigTests.cs        # NEW -- range boundaries + zero-padding
├── WordLengthFilterTests.cs    # NEW -- filter logic + pool-size warning
├── NameOptionsTests.cs         # NEW -- combined configuration
└── name-on-unit-tests.csproj   # Existing (unchanged)
```

**Structure Decision**: The existing three-project structure (`name-on-core`, `name-on-blazor`, `name-on-unit-tests`) is preserved per Constitution Principle V. New files are added within existing projects -- no new projects introduced.
