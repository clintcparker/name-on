# Feature Specification: Customization Options

**Feature Branch**: `001-customization-options`
**Created**: 2026-02-01
**Status**: Draft
**Input**: User description: "Customization Options: Format templates, separators, number length/range, word length limits"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Choose a Name Format Template (Priority: P1)

A user visits Name-On and wants to generate names in a specific pattern rather than the default adjective-noun-number format. They open a customization panel and select from a list of predefined format templates such as "adjective-noun," "noun-adjective-number," or "adjective-adjective-noun." After selecting a template, they click generate and receive a name matching their chosen pattern. The selected template persists across sessions so the user does not have to re-select it each visit.

**Why this priority**: Format templates are the most impactful customization because they change the fundamental structure of generated names. This is the feature most likely to satisfy users who find the default pattern too rigid or want names suited for specific use cases (e.g., shorter names without numbers, or more descriptive double-adjective names).

**Independent Test**: Can be fully tested by selecting a format template, generating a name, and verifying the output matches the selected pattern. Delivers immediate value by giving users control over name structure.

**Acceptance Scenarios**:

1. **Given** a user is on the Name-On page, **When** they open the customization panel, **Then** they see a list of at least five predefined format templates with descriptive labels and example output for each.
2. **Given** a user has selected the "adjective-adjective-noun" template, **When** they generate a name, **Then** the output contains two adjectives followed by one noun, separated by the active separator.
3. **Given** a user selects a template that does not include a number component, **When** they generate a name, **Then** the output contains no numeric segment.
4. **Given** a user has selected a format template and closes the browser, **When** they return to Name-On later, **Then** their previously selected template is still active.

---

### User Story 2 - Change the Separator Style (Priority: P2)

A user wants names formatted differently for their specific use case — for example, underscored names for variable naming or camelCase for code identifiers. They select a separator style from the customization panel and all subsequently generated names use that separator. The available options are: dash (default), underscore, camelCase, PascalCase, and no separator.

**Why this priority**: Separator changes are the simplest customization to understand and have high practical value. Developers and designers frequently need names in specific casing or joining conventions.

**Independent Test**: Can be fully tested by selecting each separator option, generating a name, and verifying the output uses the correct joining style. Delivers value by making generated names directly usable in different contexts without manual reformatting.

**Acceptance Scenarios**:

1. **Given** the user selects "underscore" as the separator, **When** they generate a name, **Then** the name parts are joined with underscores (e.g., "clever_otter_123").
2. **Given** the user selects "camelCase," **When** they generate a name, **Then** the first word is lowercase and subsequent words are capitalized with no separator (e.g., "cleverOtter123").
3. **Given** the user selects "PascalCase," **When** they generate a name, **Then** all words are capitalized with no separator (e.g., "CleverOtter123").
4. **Given** the user selects "none" (no separator), **When** they generate a name, **Then** all parts are concatenated with no separator and no casing changes (e.g., "cleverotter123").
5. **Given** the user has not changed any settings, **When** they generate a name, **Then** the dash separator is used (current default behavior preserved).

---

### User Story 3 - Control Number Range and Padding (Priority: P3)

A user wants to control the numeric portion of generated names — either to get shorter numbers (0-99), longer numbers (0-9999), or zero-padded numbers for visual consistency (e.g., "007" instead of "7"). They adjust the number range and optional padding from the customization panel.

**Why this priority**: Number control allows fine-tuning name uniqueness and aesthetics. Users generating names for large sets benefit from wider ranges, while users wanting compact names prefer shorter numbers. Padding improves visual consistency in lists.

**Independent Test**: Can be fully tested by setting a number range and padding preference, generating multiple names, and verifying all numeric portions fall within the chosen range with correct padding.

**Acceptance Scenarios**:

1. **Given** the user sets the number range to 0–99, **When** they generate names, **Then** all numeric portions are between 0 and 99 inclusive.
2. **Given** the user sets the number range to 0–9999, **When** they generate names, **Then** all numeric portions are between 0 and 9999 inclusive.
3. **Given** the user enables zero-padding with a range of 0–999, **When** they generate a name with the number 7, **Then** the number displays as "007."
4. **Given** the user selects a format template without a number component, **When** they view the number range controls, **Then** the number controls are disabled or hidden since they do not apply.
5. **Given** the user has not changed any number settings, **When** they generate a name, **Then** the number range defaults to 0–999 with no padding (current behavior preserved).

---

### User Story 4 - Set Word Length Limits (Priority: P4)

A user wants to constrain how long or short the words in generated names can be — for example, only short words (3–5 characters) for compact identifiers or only longer words (6+ characters) for more descriptive names. They set minimum and/or maximum word length filters from the customization panel.

**Why this priority**: Word length control is a refinement that helps users get names matching their aesthetic or character-limit requirements. It is lower priority because the default word pool already produces reasonable results for most use cases.

**Independent Test**: Can be fully tested by setting word length limits, generating multiple names, and verifying all words in each name fall within the specified character range.

**Acceptance Scenarios**:

1. **Given** the user sets a maximum word length of 5, **When** they generate a name, **Then** every word in the name is 5 characters or fewer.
2. **Given** the user sets a minimum word length of 6, **When** they generate a name, **Then** every word in the name is 6 characters or longer.
3. **Given** the user sets both minimum 4 and maximum 7, **When** they generate a name, **Then** every word is between 4 and 7 characters inclusive.
4. **Given** the user sets word length limits that would result in fewer than 20 available words in either the adjective or noun pool, **When** they attempt to apply those limits, **Then** the system warns them that the filter is too restrictive and suggests widening the range.
5. **Given** the user has not changed word length settings, **When** they generate a name, **Then** no word length filter is applied (current behavior preserved).

---

### Edge Cases

- What happens when number padding is enabled but the format has no number component? The padding setting is ignored silently; it only applies when a number element is part of the active template.
- What happens if all customization options are changed simultaneously? The system applies all settings together and generates a name matching the combined configuration.
- What happens if a user's previously saved settings reference a template that has been removed in an update? The system falls back to the default template (adjective-noun-number) and resets the stored preference.
- What happens when word length limits produce a very small word pool? If either word pool (adjectives or nouns) is reduced to fewer than 20 words, the system displays a warning before applying the filter.
- What happens when the user resets all customization to defaults? A "Reset to Defaults" action restores all settings to their original values (adjective-noun-number, dash separator, 0–999 range, no padding, no word length limits).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST offer at least five predefined format templates: adjective-noun-number (default), adjective-noun, noun-adjective-number, adjective-adjective-noun, and noun-number.
- **FR-002**: System MUST allow users to select a separator style from: dash (default), underscore, camelCase, PascalCase, and no separator.
- **FR-003**: System MUST allow users to configure the number range with a minimum of 0 and a configurable maximum of 9, 99, 999 (default), or 9999.
- **FR-004**: System MUST allow users to enable or disable zero-padding for the numeric portion, where the pad width matches the maximum digits of the selected range (e.g., 3 digits for 0–999).
- **FR-005**: System MUST allow users to set an optional minimum and/or maximum word length to filter the available adjective and noun pools.
- **FR-006**: System MUST warn the user when word length limits reduce either word pool to fewer than 20 entries, before applying the filter.
- **FR-007**: System MUST persist all customization preferences in the browser across sessions so users do not need to re-select their options on each visit.
- **FR-008**: System MUST provide a "Reset to Defaults" action that restores all customization settings to their original values.
- **FR-009**: System MUST display the customization panel in a way that does not obstruct the primary name generation and copy workflow.
- **FR-010**: System MUST display a live preview or example name in each format template option so users can understand the pattern before selecting it.
- **FR-011**: System MUST disable or hide number-related controls (range and padding) when the selected format template does not include a number component.
- **FR-012**: Generated names MUST always match the active combination of format template, separator style, number range, padding, and word length filters.
- **FR-013**: System MUST preserve backward compatibility — the default configuration (no customizations applied) MUST produce names identical in structure to the current output (adjective-dash-noun-dash-number).

### Key Entities

- **Format Template**: A predefined pattern defining which elements (adjective, noun, number) compose a name and in what order. Has a label, an ordered list of element types, and an example output.
- **Separator Style**: The character or casing convention used to join name elements. Includes both literal characters (dash, underscore, empty) and casing transformations (camelCase, PascalCase).
- **Number Configuration**: Defines the range (maximum value) and optional zero-padding for the numeric element. Only relevant when the active format template includes a number component.
- **Word Length Filter**: Optional minimum and maximum character length constraints applied to the adjective and noun pools. When active, only words within the specified range are eligible for selection.
- **User Preferences**: The collection of all customization settings (template, separator, number config, word length filter) persisted in the browser.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can select a format template, separator, number range, and word length filter and generate a matching name in under 10 seconds from opening the customization panel.
- **SC-002**: 100% of generated names conform to the user's active customization settings (format, separator, number range, padding, word length).
- **SC-003**: Customization preferences persist correctly across browser sessions — returning users see their previous settings active without re-selecting, 100% of the time.
- **SC-004**: The default experience (no customization applied) produces names structurally identical to the current Name-On output, ensuring zero disruption for existing users.
- **SC-005**: Users who set word length limits that are too restrictive receive a warning before the filter is applied, preventing confusion from empty or near-empty word pools.
- **SC-006**: Users can reset all customization to defaults with a single action.

## Assumptions

- The predefined format templates are sufficient for initial release; custom user-defined templates are out of scope.
- Preference persistence uses browser-local storage only (no accounts or server-side storage), consistent with the project's client-side-first principle.
- Word lists (adjectives and nouns) remain the existing built-in dictionaries. Custom word lists are a separate roadmap feature (Theme Packs / Word Lists).
- The threshold of 20 words for the "too restrictive" warning is a reasonable minimum to maintain name variety.
- camelCase and PascalCase separator styles apply casing transformations to words; the underlying word data remains lowercase.
- The customization panel is an additive UI element — the existing generate and copy buttons remain unchanged in their primary position.
