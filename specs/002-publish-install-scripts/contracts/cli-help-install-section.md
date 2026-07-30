# Contract: CLI Help Install Section

**Feature**: `002-publish-install-scripts` | **Consumer**: a user running
`name-on --help` (or `-h`), and the `verify-install-urls` workflow, which scrapes
this output to learn which URLs to check.

---

## Output contract

`name-on --help` exits `0` and writes to **stdout** a help text whose `Install:`
section is exactly:

```text
Install:
  .NET Tool:   dotnet tool install -g name-on
  Homebrew:    brew install clintcparker/tap/name-on
  Script:      curl -fsSL https://name-on.clintcparker.com/install.sh | sh
  PowerShell:  irm https://name-on.clintcparker.com/install.ps1 | iex
```

Requirements this encodes:

| Rule | Requirement |
|---|---|
| Every `https://` URL in the section resolves to a working installer | FR-008, FR-010 |
| A Windows-applicable install path is listed | FR-008, US2 |
| Four channels are listed: .NET tool, Homebrew, shell script, PowerShell | US2 acceptance #2 |
| Commands are copy-pasteable verbatim — no placeholders, no line continuation | US1 acceptance #1 |
| No other section of the help output advertises an install URL | FR-008 |

Everything outside the `Install:` section is unchanged. Redesigning the help
output beyond this section is out of scope.

## Code contract (for testability)

`name_on_cli.Program` exposes the help text so it can be asserted on without
capturing console output:

```csharp
public class Program
{
    public const string HelpText = @"name-on - Generate unique, human-readable names
...";
}
```

- `PrintHelp()` writes `HelpText` and nothing else, so the constant and the
  observable output cannot drift.
- Visibility is `public` because `name-on-cli-tests` asserts on it. `Program` is
  already `public`.

## Scraping contract (for the verification workflow)

The workflow extracts advertised URLs with a single pattern applied to
`dotnet run --project name-on-cli -- --help`:

```text
https://[^ |'"]*install\.(sh|ps1)
```

Against the output above this yields exactly:

- `https://name-on.clintcparker.com/install.sh`
- `https://name-on.clintcparker.com/install.ps1`

Stability requirements for this to keep working:

- URLs appear on a single line, unbroken, terminated by a space or `|`.
- No URL is wrapped in a way that inserts whitespace or a newline mid-URL.

If a future change adds an install URL to the help output, the workflow picks it
up automatically and starts checking it — that is the point of scraping rather
than hard-coding (FR-009, research R8).

## Test contract

`name-on-cli-tests` asserts against `Program.HelpText`:

1. contains `curl -fsSL https://name-on.clintcparker.com/install.sh | sh`
2. contains `irm https://name-on.clintcparker.com/install.ps1 | iex`
3. contains `dotnet tool install -g name-on`
4. contains `brew install clintcparker/tap/name-on`
5. the only `https://name-on.clintcparker.com/` URLs present are the two installer
   URLs above (guards against re-introducing a dead site URL)
6. contains no `raw.githubusercontent.com` URL (the help output uses the short
   form; the README owns the long form)

Assertions 1 and 2 fail against the current help text, which lacks the PowerShell
line — so the test is written first and observed red, per Principle III.
