# Quickstart: Customization Options

**Feature**: 001-customization-options
**Date**: 2026-02-01

## Core Library Usage (name-on-core)

### Default behavior (backward compatible)

```csharp
var namer = new Namer();
string name = namer.Gen();
// Output: "clever-otter-42" (adjective-dash-noun-dash-number, same as today)
```

### Custom format template

```csharp
var namer = new Namer();
var options = new NameOptions
{
    Template = FormatTemplate.AdjectiveNoun  // no number component
};
string name = namer.Gen(options);
// Output: "clever-otter"
```

### Joining styles

```csharp
var namer = new Namer();

// Underscore
var opts1 = new NameOptions { JoiningStyle = JoiningStyle.Underscore };
namer.Gen(opts1);  // "clever_otter_42"

// CamelCase
var opts2 = new NameOptions { JoiningStyle = JoiningStyle.CamelCase };
namer.Gen(opts2);  // "cleverOtter42"

// PascalCase
var opts3 = new NameOptions { JoiningStyle = JoiningStyle.PascalCase };
namer.Gen(opts3);  // "CleverOtter42"

// No separator
var opts4 = new NameOptions { JoiningStyle = JoiningStyle.None };
namer.Gen(opts4);  // "cleverotter42"
```

### Number range and padding

```csharp
var namer = new Namer();

// Short numbers (0-99)
var opts1 = new NameOptions
{
    NumberConfig = new NumberConfig(MaxValue: 99, ZeroPad: false)
};
namer.Gen(opts1);  // "clever-otter-7"

// Padded numbers (0-999, zero-padded to 3 digits)
var opts2 = new NameOptions
{
    NumberConfig = new NumberConfig(MaxValue: 999, ZeroPad: true)
};
namer.Gen(opts2);  // "clever-otter-007"
```

### Word length filtering

```csharp
var namer = new Namer();

// Only short words (3-5 characters)
var opts = new NameOptions
{
    WordFilter = new WordLengthFilter(MinLength: 3, MaxLength: 5)
};
namer.Gen(opts);  // "bold-fox-42"

// Check if filter is too restrictive
var filter = new WordLengthFilter(MinLength: 12, MaxLength: 15);
var filtered = filter.Filter(Dicts.Adjectives);
if (filter.IsPoolTooSmall(filtered))
{
    // Warn the user: fewer than 20 adjectives match
}
```

### Combined options

```csharp
var namer = new Namer();
var opts = new NameOptions
{
    Template = FormatTemplate.AdjectiveAdjectiveNoun,
    JoiningStyle = JoiningStyle.PascalCase,
    WordFilter = new WordLengthFilter(MinLength: 4, MaxLength: 8)
};
namer.Gen(opts);  // "BoldCleverOtter"
```

## Blazor Integration (name-on-blazor)

### Loading preferences from localStorage

```csharp
// In NameOn.razor @code block
protected override async Task OnInitializedAsync()
{
    var json = await JS.InvokeAsync<string?>("localStorage.getItem", "name-on-preferences");
    if (json != null)
    {
        _options = JsonSerializer.Deserialize<NameOptions>(json) ?? NameOptions.Default;
    }
    GenerateName();
}
```

### Saving preferences on change

```csharp
private async Task OnSettingChanged()
{
    var json = JsonSerializer.Serialize(_options);
    await JS.InvokeVoidAsync("localStorage.setItem", "name-on-preferences", json);
    GenerateName();
}
```

### Reset to defaults

```csharp
private async Task ResetToDefaults()
{
    _options = NameOptions.Default;
    await JS.InvokeVoidAsync("localStorage.removeItem", "name-on-preferences");
    GenerateName();
}
```
