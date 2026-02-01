# Tasks: Customization Options

**Input**: Design documents from `/specs/001-customization-options/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: TDD is mandatory for all `name-on-core` changes per Constitution Principle III. Tests MUST be written and fail (Red) before implementation code (Green). Blazor UI changes are exempt from TDD but MUST NOT break existing tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup

**Purpose**: Verify baseline health before making changes

- [ ] T001 Run `dotnet test` in name-on-unit-tests/ and confirm all 5 existing tests pass
- [ ] T002 Run `dotnet publish -c Release` in name-on-blazor/ and confirm static site builds successfully

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types and Namer refactoring that MUST be complete before any user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

### Tests (Red phase -- all must fail before implementation)

- [ ] T003 [P] Write test in name-on-unit-tests/FormatTemplateTests.cs: verify `FormatTemplate.Default` has elements `[Adjective, Noun, Number]`
- [ ] T004 [P] Write test in name-on-unit-tests/JoiningStyleTests.cs: verify `JoiningStyle.Dash` joins `["clever", "otter", "42"]` into `"clever-otter-42"`
- [ ] T005 [P] Write test in name-on-unit-tests/NumberConfigTests.cs: verify default `NumberConfig` generates numbers in range 0-999 with no padding
- [ ] T006 [P] Write test in name-on-unit-tests/WordLengthFilterTests.cs: verify default `WordLengthFilter(null, null)` returns the full unfiltered list
- [ ] T007 [P] Write test in name-on-unit-tests/NameOptionsTests.cs: verify `NameOptions.Default` matches current behavior (adjective-dash-noun-dash-number format)
- [ ] T008 Write test in name-on-unit-tests/UnitTest1.cs: verify `Namer.Gen()` with no args still produces adjective-dash-noun-dash-number pattern (backward compatibility guard)

### Implementation (Green phase)

- [ ] T009 Rename `ElementType.ThreeDigit` to `ElementType.Number` in name-on-core/Namer.cs and update the switch expression in `MapElementTypeToString`
- [ ] T010 [P] Create name-on-core/NumberConfig.cs: record with `MaxValue` (default 999), `ZeroPad` (default false), `PadWidth` computed property, and `Format(int n)` method per data-model.md
- [ ] T011 [P] Create name-on-core/JoiningStyle.cs: enum with values `Dash`, `Underscore`, `None`, `CamelCase`, `PascalCase` and a static `Join(JoiningStyle style, string[] parts)` method that handles dash/underscore/none as literal join characters
- [ ] T012 [P] Create name-on-core/WordLengthFilter.cs: record with `MinLength` (int?), `MaxLength` (int?), `Filter(List<string> words)` method, and `IsPoolTooSmall(List<string> filtered)` method (threshold: 20)
- [ ] T013 [P] Create name-on-core/FormatTemplate.cs: record with `Id`, `Label`, `Elements` (ElementType[]), `HasNumber` computed property, and a static `Default` property returning adjective-noun-number template
- [ ] T014 Create name-on-core/NameOptions.cs: record with `Template` (FormatTemplate), `JoiningStyle` (JoiningStyle), `NumberConfig` (NumberConfig), `WordFilter` (WordLengthFilter), and static `Default` property per data-model.md
- [ ] T015 Refactor name-on-core/Namer.cs: add `Gen(NameOptions options)` method that uses options to select elements, generate parts, and join them; route existing `Gen()` overloads through `Gen(NameOptions.Default)` or equivalent wrappers
- [ ] T016 Fix off-by-one bug in name-on-core/Namer.cs: change `_random.Next(0, Nouns.Count-1)` to `_random.Next(0, Nouns.Count)` and same for `Adjectives.Count-1` (Random.Next upper bound is exclusive)
- [ ] T017 Run `dotnet test` in name-on-unit-tests/ and confirm all existing tests plus new foundational tests pass
- [ ] T018 Run `dotnet build` on name-on-core/ to verify no compilation errors

**Checkpoint**: Foundation ready -- `Namer.Gen()` routes through `NameOptions`, all core types exist with defaults, all tests green. User story implementation can now begin.

---

## Phase 3: User Story 1 -- Choose a Name Format Template (Priority: P1) 🎯 MVP

**Goal**: Users can select from 5 predefined format templates and generate names matching the chosen pattern.

**Independent Test**: Select each format template, generate a name, verify the output has the correct element pattern (e.g., adjective-adjective-noun template produces two adjectives and one noun).

### Tests (Red phase)

- [ ] T019 [P] [US1] Write test in name-on-unit-tests/FormatTemplateTests.cs: verify all 5 predefined templates exist with correct element arrays (adjective-noun-number, adjective-noun, noun-adjective-number, adjective-adjective-noun, noun-number)
- [ ] T020 [P] [US1] Write test in name-on-unit-tests/FormatTemplateTests.cs: verify `HasNumber` returns true for templates containing `ElementType.Number` and false otherwise
- [ ] T021 [P] [US1] Write test in name-on-unit-tests/NameOptionsTests.cs: verify `Namer.Gen(options)` with adjective-noun template produces a name with exactly 2 dash-separated parts (no number)
- [ ] T022 [P] [US1] Write test in name-on-unit-tests/NameOptionsTests.cs: verify `Namer.Gen(options)` with noun-adjective-number template produces a name where the first part is a valid noun and second is a valid adjective

### Implementation (Green phase)

- [ ] T023 [US1] Add all 5 predefined static template properties to name-on-core/FormatTemplate.cs: `AdjectiveNounNumber` (default), `AdjectiveNoun`, `NounAdjectiveNumber`, `AdjectiveAdjectiveNoun`, `NounNumber` per data-model.md
- [ ] T024 [US1] Add static `All` property to name-on-core/FormatTemplate.cs returning a list of all 5 predefined templates (for UI enumeration)
- [ ] T025 [US1] Update `Gen(NameOptions)` in name-on-core/Namer.cs to iterate over `options.Template.Elements` instead of hardcoded element types
- [ ] T026 [US1] Run `dotnet test` in name-on-unit-tests/ and confirm all tests pass

### Blazor UI

- [ ] T027 [US1] Add a collapsible customization panel to name-on-blazor/NameOn.razor below the generate/copy buttons with a toggle button to show/hide it
- [ ] T028 [US1] Add a format template radio button group or dropdown in the customization panel in name-on-blazor/NameOn.razor that lists all 5 templates with labels and example output
- [ ] T029 [US1] Wire template selection to `NameOptions.Template` and pass to `Namer.Gen(options)` in name-on-blazor/NameOn.razor
- [ ] T030 [US1] Add localStorage persistence for selected template using `IJSRuntime` in name-on-blazor/NameOn.razor: save on change, load on `OnInitializedAsync`
- [ ] T031 [US1] Run `dotnet test` in name-on-unit-tests/ and confirm no existing tests are broken by UI changes

**Checkpoint**: User Story 1 complete. Users can select format templates, generate matching names, and preferences persist across sessions.

---

## Phase 4: User Story 2 -- Change the Joining Style (Priority: P2)

**Goal**: Users can select a joining style (dash, underscore, none, camelCase, PascalCase) and generated names use the chosen convention.

**Independent Test**: Select each joining style, generate a name, verify the output uses the correct joining character or casing transformation.

### Tests (Red phase)

- [ ] T032 [P] [US2] Write test in name-on-unit-tests/JoiningStyleTests.cs: verify `Underscore` joins `["clever", "otter", "42"]` into `"clever_otter_42"`
- [ ] T033 [P] [US2] Write test in name-on-unit-tests/JoiningStyleTests.cs: verify `None` joins `["clever", "otter", "42"]` into `"cleverotter42"` (no casing changes)
- [ ] T034 [P] [US2] Write test in name-on-unit-tests/JoiningStyleTests.cs: verify `CamelCase` joins `["clever", "otter", "42"]` into `"cleverOtter42"` (first word lowercase, subsequent capitalized, number as-is)
- [ ] T035 [P] [US2] Write test in name-on-unit-tests/JoiningStyleTests.cs: verify `PascalCase` joins `["clever", "otter", "42"]` into `"CleverOtter42"` (all words capitalized, number as-is)
- [ ] T036 [P] [US2] Write test in name-on-unit-tests/JoiningStyleTests.cs: verify `CamelCase` with noun-number template joins `["otter", "42"]` into `"otter42"` (single word stays lowercase, number appended)
- [ ] T037 [P] [US2] Write test in name-on-unit-tests/JoiningStyleTests.cs: verify `PascalCase` with noun-number template joins `["otter", "42"]` into `"Otter42"`

### Implementation (Green phase)

- [ ] T038 [US2] Implement casing transformation logic in the `Join` method of name-on-core/JoiningStyle.cs: CamelCase (first word lowercase, subsequent word parts capitalized via `char.ToUpperInvariant`, numbers appended as-is) and PascalCase (all word parts capitalized, numbers as-is)
- [ ] T039 [US2] Integrate `JoiningStyle.Join` into `Gen(NameOptions)` in name-on-core/Namer.cs: generate parts as a string array first, then pass to `Join` with `options.JoiningStyle`
- [ ] T040 [US2] Run `dotnet test` in name-on-unit-tests/ and confirm all tests pass

### Blazor UI

- [ ] T041 [US2] Add a joining style radio button group or dropdown in the customization panel in name-on-blazor/NameOn.razor listing all 5 options: Dash (default), Underscore, None, camelCase, PascalCase
- [ ] T042 [US2] Wire joining style selection to `NameOptions.JoiningStyle` and pass to `Namer.Gen(options)` in name-on-blazor/NameOn.razor
- [ ] T043 [US2] Add localStorage persistence for joining style in name-on-blazor/NameOn.razor: extend the existing preferences save/load to include joining style
- [ ] T044 [US2] Run `dotnet test` in name-on-unit-tests/ and confirm no existing tests are broken

**Checkpoint**: User Story 2 complete. Users can select any joining style and generated names use the correct separator or casing.

---

## Phase 5: User Story 3 -- Control Number Range and Padding (Priority: P3)

**Goal**: Users can configure the number range (max: 9, 99, 999, 9999) and toggle zero-padding. Number controls are hidden when the active template has no number component.

**Independent Test**: Set each number range, toggle padding, generate names, verify numeric portions fall within range and use correct padding.

### Tests (Red phase)

- [ ] T045 [P] [US3] Write test in name-on-unit-tests/NumberConfigTests.cs: verify `NumberConfig(MaxValue: 99, ZeroPad: false)` generates numbers between 0 and 99 inclusive
- [ ] T046 [P] [US3] Write test in name-on-unit-tests/NumberConfigTests.cs: verify `NumberConfig(MaxValue: 9999, ZeroPad: false)` generates numbers between 0 and 9999 inclusive
- [ ] T047 [P] [US3] Write test in name-on-unit-tests/NumberConfigTests.cs: verify `NumberConfig(MaxValue: 999, ZeroPad: true)` formats number 7 as `"007"` (3-digit padding)
- [ ] T048 [P] [US3] Write test in name-on-unit-tests/NumberConfigTests.cs: verify `NumberConfig(MaxValue: 9999, ZeroPad: true)` formats number 42 as `"0042"` (4-digit padding)
- [ ] T049 [P] [US3] Write test in name-on-unit-tests/NameOptionsTests.cs: verify `Namer.Gen(options)` with `NumberConfig(MaxValue: 99)` produces a number segment between 0 and 99

### Implementation (Green phase)

- [ ] T050 [US3] Update `Gen(NameOptions)` in name-on-core/Namer.cs to use `options.NumberConfig.MaxValue` for random number range and `options.NumberConfig.Format(n)` for output formatting instead of hardcoded 0-999
- [ ] T051 [US3] Run `dotnet test` in name-on-unit-tests/ and confirm all tests pass

### Blazor UI

- [ ] T052 [US3] Add a number range dropdown (options: 0-9, 0-99, 0-999, 0-9999) in the customization panel in name-on-blazor/NameOn.razor
- [ ] T053 [US3] Add a zero-padding toggle checkbox in the customization panel in name-on-blazor/NameOn.razor
- [ ] T054 [US3] Implement conditional visibility: hide/disable number range and padding controls when `options.Template.HasNumber` is false in name-on-blazor/NameOn.razor
- [ ] T055 [US3] Wire number config to `NameOptions.NumberConfig` and persist to localStorage in name-on-blazor/NameOn.razor
- [ ] T056 [US3] Run `dotnet test` in name-on-unit-tests/ and confirm no existing tests are broken

**Checkpoint**: User Story 3 complete. Users can configure number range and padding, and controls are contextually shown/hidden.

---

## Phase 6: User Story 4 -- Set Word Length Limits (Priority: P4)

**Goal**: Users can set min/max word length filters. System warns when filter is too restrictive (fewer than 20 words in either pool).

**Independent Test**: Set word length limits, generate names, verify all words fall within the specified range. Set a restrictive filter and verify a warning appears.

### Tests (Red phase)

- [ ] T057 [P] [US4] Write test in name-on-unit-tests/WordLengthFilterTests.cs: verify `Filter` with `MaxLength: 5` returns only words with 5 or fewer characters from a sample list
- [ ] T058 [P] [US4] Write test in name-on-unit-tests/WordLengthFilterTests.cs: verify `Filter` with `MinLength: 6` returns only words with 6 or more characters from a sample list
- [ ] T059 [P] [US4] Write test in name-on-unit-tests/WordLengthFilterTests.cs: verify `Filter` with `MinLength: 4, MaxLength: 7` returns only words between 4 and 7 characters from a sample list
- [ ] T060 [P] [US4] Write test in name-on-unit-tests/WordLengthFilterTests.cs: verify `IsPoolTooSmall` returns true when filtered list has fewer than 20 entries
- [ ] T061 [P] [US4] Write test in name-on-unit-tests/WordLengthFilterTests.cs: verify `IsPoolTooSmall` returns false when filtered list has 20 or more entries
- [ ] T062 [P] [US4] Write test in name-on-unit-tests/NameOptionsTests.cs: verify `Namer.Gen(options)` with `WordFilter(MinLength: 4, MaxLength: 7)` produces names where all words are between 4 and 7 characters

### Implementation (Green phase)

- [ ] T063 [US4] Update `Gen(NameOptions)` in name-on-core/Namer.cs to apply `options.WordFilter.Filter()` to the adjective and noun pools before random selection
- [ ] T064 [US4] Run `dotnet test` in name-on-unit-tests/ and confirm all tests pass

### Blazor UI

- [ ] T065 [US4] Add min and max word length number inputs in the customization panel in name-on-blazor/NameOn.razor
- [ ] T066 [US4] Add a warning message element in name-on-blazor/NameOn.razor that displays when `IsPoolTooSmall` returns true for either adjective or noun pool after applying the filter
- [ ] T067 [US4] Wire word filter to `NameOptions.WordFilter` and persist to localStorage in name-on-blazor/NameOn.razor
- [ ] T068 [US4] Run `dotnet test` in name-on-unit-tests/ and confirm no existing tests are broken

**Checkpoint**: User Story 4 complete. Users can set word length limits with restrictive-filter warnings.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Features that span multiple user stories and final validation

- [ ] T069 Add a "Reset to Defaults" button in the customization panel in name-on-blazor/NameOn.razor that sets `_options = NameOptions.Default`, removes `"name-on-preferences"` from localStorage, and regenerates a name (FR-008)
- [ ] T070 Verify keyboard accessibility: confirm all customization controls in name-on-blazor/NameOn.razor are tab-navigable and operable via Enter/Space (NFR-001)
- [ ] T071 Verify responsive layout: confirm the customization panel in name-on-blazor/NameOn.razor renders correctly at 320px viewport width using Bootstrap responsive utilities (NFR-002)
- [ ] T072 Write backward compatibility test in name-on-unit-tests/NameOptionsTests.cs: verify `new Namer().Gen()` produces output matching regex `^[a-zA-Z]+-[a-zA-Z]+-\d+$` (FR-013)
- [ ] T073 Run full test suite with `dotnet test` in name-on-unit-tests/ and confirm all tests pass (Constitution quality gate 1)
- [ ] T074 Run `dotnet publish -c Release` in name-on-blazor/ and confirm static site builds successfully (Constitution quality gate 2)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies -- can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 -- BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Phase 2 -- no dependencies on other user stories
- **US2 (Phase 4)**: Depends on Phase 2 -- no dependencies on other user stories
- **US3 (Phase 5)**: Depends on Phase 2 -- no dependencies on other user stories
- **US4 (Phase 6)**: Depends on Phase 2 -- no dependencies on other user stories
- **Polish (Phase 7)**: Depends on all user story phases being complete

### User Story Independence

- **US1, US2, US3, US4** can all proceed in parallel after Phase 2 completes
- Each user story adds its own core type implementation + Blazor controls independently
- No user story depends on another user story's completion
- Recommended sequential order (single developer): US1 → US2 → US3 → US4

### Within Each User Story (TDD Flow)

1. Write tests (Red) -- tests MUST fail before implementation
2. Implement core types (Green) -- minimum code to pass tests
3. Refactor if needed
4. Add Blazor UI (exempt from TDD)
5. Run full test suite to verify no regressions

### Parallel Opportunities

**Phase 2 (Foundational)**:
- T003, T004, T005, T006, T007 can all run in parallel (different test files)
- T010, T011, T012, T013 can all run in parallel (different source files)

**Phase 3-6 (User Stories)**:
- All test tasks within a phase marked [P] can run in parallel
- After Phase 2, all 4 user stories can run in parallel (different developers)

---

## Parallel Example: Foundational Phase

```text
# Launch all foundational tests in parallel (different files):
T003: FormatTemplateTests.cs
T004: JoiningStyleTests.cs
T005: NumberConfigTests.cs
T006: WordLengthFilterTests.cs
T007: NameOptionsTests.cs

# After tests written, launch all core type implementations in parallel:
T010: NumberConfig.cs
T011: JoiningStyle.cs
T012: WordLengthFilter.cs
T013: FormatTemplate.cs
```

## Parallel Example: User Story 2 Tests

```text
# Launch all US2 tests in parallel (same file, different test methods):
T032: Underscore joining
T033: None joining
T034: CamelCase joining
T035: PascalCase joining
T036: CamelCase with noun-number
T037: PascalCase with noun-number
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T002)
2. Complete Phase 2: Foundational (T003-T018)
3. Complete Phase 3: User Story 1 (T019-T031)
4. **STOP and VALIDATE**: Generate names with each template, verify patterns
5. Deploy/demo if ready -- users can already choose name formats

### Incremental Delivery

1. Setup + Foundational → Core types ready, backward compatible
2. Add US1 (Format Templates) → Test independently → Deploy (MVP!)
3. Add US2 (Joining Style) → Test independently → Deploy
4. Add US3 (Number Range) → Test independently → Deploy
5. Add US4 (Word Length) → Test independently → Deploy
6. Polish → Final validation → Deploy

Each increment adds value without breaking previous functionality.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Constitution Principle III: Tests MUST be written before implementation for `name-on-core` changes (Red-Green-Refactor)
- Constitution Principle V: No speculative features -- implement only what spec defines
- Pre-existing bug fix (T016) is included in Foundational phase per research.md finding
- Commit after each task or logical group
- Stop at any checkpoint to validate the story independently
