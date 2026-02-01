# Research: Customization Options

**Feature**: 001-customization-options
**Date**: 2026-02-01

## Decision Log

### 1. Namer Refactoring Strategy

**Decision**: Route all `Gen()` overloads through a new `Gen(NameOptions)` method. Existing overloads become thin wrappers for backward compatibility.

**Rationale**: A single code path for name generation avoids duplication and ensures all customization options are applied consistently. The existing `Gen()`, `Gen(ElementType[])`, and `Gen(string, ElementType[])` signatures remain unchanged -- they construct a default `NameOptions` internally and delegate.

**Alternatives considered**:
- Adding new overloads alongside old ones: Rejected -- leads to parallel code paths that can diverge.
- Breaking the old API entirely: Rejected -- unnecessary; the wrapper approach costs nothing and existing tests pass without changes.

### 2. ElementType Generalization

**Decision**: Replace `ElementType.ThreeDigit` with `ElementType.Number`. Number range and padding are configuration concerns on `NameOptions`, not type-level distinctions.

**Rationale**: "ThreeDigit" encodes a specific range (0-999) into the type system. The spec requires configurable ranges (9, 99, 999, 9999) and optional padding. A general `Number` element type with runtime configuration is cleaner and extensible.

**Alternatives considered**:
- Adding `ElementType.OneDigit`, `TwoDigit`, `FourDigit`: Rejected -- combinatorial explosion; padding and range are orthogonal.
- Keeping `ThreeDigit` and adding `Number`: Rejected -- two ways to express the same concept; confusing.

**Migration note**: `ElementType.ThreeDigit` is referenced in `UnitTest1.cs` indirectly (via the default `Gen()` call) and in `Namer.cs` switch expression. Renaming is a source-breaking change but has no runtime impact since the enum is internal to the solution.

### 3. Joining Style Implementation

**Decision**: Implement joining logic as a static `NameJoiner` class within `name-on-core` with methods that accept a list of string parts and a `JoiningStyle` enum value.

**Rationale**: Joining is a pure function (parts in, string out) with no state. A static class keeps it simple. The enum distinguishes literal separators (Dash, Underscore, None) from casing transformations (CamelCase, PascalCase).

**Implementation approach**:
- For Dash/Underscore/None: `string.Join(separator, parts)`
- For CamelCase: First part lowercase, subsequent word parts capitalized, number parts appended as-is
- For PascalCase: All word parts capitalized, number parts appended as-is
- Capitalization uses `char.ToUpperInvariant()` on first character + remainder slice (`part[1..]`)

**Alternatives considered**:
- Instance-based `IJoiner` interface with strategy pattern: Rejected -- over-engineered for 5 fixed options (Constitution Principle V).
- Putting joining logic in `Namer.Gen()` directly: Rejected -- mixing generation and formatting reduces testability.

### 4. Word-Length Filtering

**Decision**: Filter on-demand at generation time using LINQ. No pre-cached filtered lists.

**Rationale**: The dictionaries have ~1,400 adjectives and ~3,600 nouns. Filtering these with `.Where()` is sub-millisecond even on WASM. Pre-caching adds complexity (cache invalidation when options change) with no measurable benefit.

**Pool-size warning**: The `WordLengthFilter` class provides a `GetFilteredPool(words, min, max)` method that returns the filtered list and a separate `IsPoolTooSmall(filteredList)` check (threshold: 20 words). The warning is surfaced to the caller -- in the Blazor UI, this triggers a visible warning message.

**Alternatives considered**:
- Pre-filtered cached dictionaries keyed by (min, max): Rejected -- premature optimization. Can be added later if profiling shows a need.
- Server-side filtering: Rejected -- violates Constitution Principle I.

### 5. Preference Persistence (localStorage)

**Decision**: Use `IJSRuntime` (already injected in `NameOn.razor`) to call `localStorage.setItem` / `localStorage.getItem` directly. Serialize `NameOptions` to JSON via `System.Text.Json`.

**Rationale**: No external NuGet packages needed. The project already uses `IJSRuntime` for clipboard access (`navigator.clipboard.writeText`). The same pattern works for localStorage. `System.Text.Json` is built into .NET 8.0.

**Storage key**: `"name-on-preferences"`
**Serialization**: `JsonSerializer.Serialize(options)` / `JsonSerializer.Deserialize<NameOptions>(json)`

**Alternatives considered**:
- Blazored.LocalStorage NuGet package: Rejected -- adds an external dependency for trivial functionality (Constitution Principle V).
- IndexedDB: Rejected -- overkill for a single JSON blob.
- Cookies: Rejected -- size limits and no structured data support.

### 6. Pre-existing Bug

**Finding**: `_random.Next(0, Nouns.Count - 1)` and `_random.Next(0, Adjectives.Count - 1)` in `Namer.cs` use an exclusive upper bound, meaning the last word in each list is never selected.

**Decision**: Fix during refactoring. Change to `_random.Next(0, Nouns.Count)` and `_random.Next(0, Adjectives.Count)`. The `Random.Next(minValue, maxValue)` method returns values in the range `[minValue, maxValue)` (exclusive upper bound), so `Count` is correct.

**Impact**: Existing tests do not assert specific dictionary coverage, so this fix is safe. The uniqueness test (`NamesAreVeryUnique`) will benefit from the larger effective pool.
