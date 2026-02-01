# Data Model: Customization Options

**Feature**: 001-customization-options
**Date**: 2026-02-01

## Entities

### ElementType (enum -- modified)

Defines the types of elements that compose a generated name.

| Value | Description |
|-------|-------------|
| `Adjective` | A word from the adjective dictionary |
| `Noun` | A word from the noun dictionary |
| `Number` | A numeric value (replaces `ThreeDigit`; range configured via `NumberConfig`) |

**Migration**: `ThreeDigit` is removed. All references update to `Number`.

---

### FormatTemplate (record)

A predefined name pattern defining which elements compose a name and in what order.

| Field | Type | Description |
|-------|------|-------------|
| `Id` | `string` | Unique identifier (e.g., `"adjective-noun-number"`) |
| `Label` | `string` | Display label (e.g., `"Adjective + Noun + Number"`) |
| `Elements` | `ElementType[]` | Ordered list of element types |
| `HasNumber` | `bool` | Computed: `Elements.Contains(ElementType.Number)` |

**Predefined templates** (FR-001):

| Id | Label | Elements | Example (dash) |
|----|-------|----------|----------------|
| `adjective-noun-number` | Adjective + Noun + Number | `[Adj, Noun, Num]` | clever-otter-42 |
| `adjective-noun` | Adjective + Noun | `[Adj, Noun]` | clever-otter |
| `noun-adjective-number` | Noun + Adjective + Number | `[Noun, Adj, Num]` | otter-clever-42 |
| `adjective-adjective-noun` | Adjective + Adjective + Noun | `[Adj, Adj, Noun]` | clever-brave-otter |
| `noun-number` | Noun + Number | `[Noun, Num]` | otter-42 |

**Validation**: Templates are compile-time constants; no runtime creation.

---

### JoiningStyle (enum)

Defines how name elements are joined into a final string.

| Value | Join Char | Casing | Example |
|-------|-----------|--------|---------|
| `Dash` | `"-"` | None | clever-otter-42 |
| `Underscore` | `"_"` | None | clever_otter_42 |
| `None` | `""` | None | cleverotter42 |
| `CamelCase` | `""` | First word lowercase, rest capitalized; numbers as-is | cleverOtter42 |
| `PascalCase` | `""` | All words capitalized; numbers as-is | CleverOtter42 |

**Default**: `Dash`

---

### NumberConfig (record)

Configures the numeric element in generated names.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `MaxValue` | `int` | `999` | Upper bound (inclusive). Allowed values: 9, 99, 999, 9999. |
| `ZeroPad` | `bool` | `false` | Whether to zero-pad to the digit width of `MaxValue` |

**Derived**:
- `PadWidth`: Number of digits in `MaxValue + 1` (e.g., 999 -> 3, 9999 -> 4)
- `Format(int n)`: Returns `n.ToString()` or `n.ToString($"D{PadWidth}")` when padded

**Validation**: `MaxValue` must be one of `{9, 99, 999, 9999}`.

---

### WordLengthFilter (record)

Optional constraints on dictionary word lengths.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `MinLength` | `int?` | `null` | Minimum word length (inclusive). `null` = no minimum. |
| `MaxLength` | `int?` | `null` | Maximum word length (inclusive). `null` = no maximum. |

**Methods**:
- `Filter(List<string> words)` -> `List<string>`: Returns words matching the length constraints.
- `IsPoolTooSmall(List<string> filtered)` -> `bool`: Returns `true` if `filtered.Count < 20`.

**Validation**: If both set, `MinLength <= MaxLength`.

---

### NameOptions (record)

Top-level configuration combining all customization settings.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `Template` | `FormatTemplate` | `FormatTemplate.Default` | Active format template |
| `JoiningStyle` | `JoiningStyle` | `Dash` | Active joining style |
| `NumberConfig` | `NumberConfig` | `new(999, false)` | Number range + padding |
| `WordFilter` | `WordLengthFilter` | `new(null, null)` | Word length constraints |

**Static**:
- `NameOptions.Default`: Returns options matching current behavior (adjective-noun-number, dash, 0-999, no padding, no filter).

**Serialization**: JSON-serializable via `System.Text.Json` for localStorage persistence.

---

### UserPreferences (Blazor-side only)

Not a `name-on-core` entity. Lives in `name-on-blazor` as a localStorage-backed wrapper around `NameOptions`.

| Field | Type | Description |
|-------|------|-------------|
| `Options` | `NameOptions` | The serialized/deserialized settings |

**Storage key**: `"name-on-preferences"`
**Load**: On `OnInitializedAsync`, deserialize from localStorage; fall back to `NameOptions.Default` if missing or invalid.
**Save**: On any setting change, serialize to localStorage.

## Entity Relationships

```
NameOptions
├── FormatTemplate  (1:1)  -- which elements and order
│   └── ElementType[]      -- Adjective, Noun, Number
├── JoiningStyle    (enum) -- how to join elements
├── NumberConfig    (1:1)  -- range + padding for Number elements
└── WordLengthFilter (1:1) -- constraints on Adjective/Noun pools

Namer
├── uses NameOptions to configure generation
├── reads Dicts.Adjectives / Dicts.Nouns (filtered by WordLengthFilter)
└── delegates joining to JoiningStyle logic
```
