# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Working Short Install URLs — 2026-07-29

The install command the CLI printed did not work. `name-on --help` advertised
`curl -fsSL https://name-on.clintcparker.com/install.sh | sh`, but nothing
published `install/install.sh` to the site, so the URL returned 404 — a
first-time user's first interaction with the project was a broken promise, with
nothing in the failure hinting that a different URL would have worked. This
release makes the advertised URL work rather than retracting it.

#### Added

- The site now serves both canonical installers at short, memorable paths:
  `https://name-on.clintcparker.com/install.sh` and
  `.../install.ps1`. Both are byte-identical to the scripts in `install/`.
- A Windows-applicable install path in the CLI help output:
  `irm https://name-on.clintcparker.com/install.ps1 | iex`. The PowerShell
  installer already existed and was documented in the README, but the tool never
  mentioned it.
- `name-on-blazor/wwwroot/staticwebapp.config.json` — maps `.sh` and `.ps1` to
  `text/plain; charset=utf-8` so either script renders in a browser for
  inspection instead of downloading as an opaque attachment.
- `.github/workflows/verify-install-urls.yml` — fails when an advertised install
  URL stops serving a working installer. It **derives** the URL set from the CLI
  help output and the README rather than hard-coding it, so adding or changing an
  advertised URL automatically changes what gets checked. Runs after the site
  deploy completes, daily, and on demand.
- `InstallAdvertisementTests` in `name-on-cli-tests` — pins all four advertised
  install channels, and asserts the only `name-on.clintcparker.com` URLs in the
  help output are the two installers, so a dead site URL cannot be reintroduced.

#### Changed

- The CLI help output's `Install:` section lists four channels (.NET tool,
  Homebrew, shell script, PowerShell) with labels realigned to a common column
  so each command stays copy-pasteable on one unbroken line.
- The help text moved from an inline string inside `PrintHelp()` to
  `public const string Program.HelpText`, making it readable by tests and by the
  verification workflow. `PrintHelp()` is now `Console.WriteLine(HelpText)`.
  Output is otherwise unchanged.

#### Fixed

- `https://name-on.clintcparker.com/install.sh` returned 404 despite being the
  install command the CLI itself printed.

#### Technical Notes

- **Referenced, not copied.** The installers are declared as
  `<Content Include="../install/install.sh" Link="wwwroot/install.sh" />` in
  `name-on-blazor.csproj`, so the deploy workflow's existing `dotnet publish`
  places them in the published artifact root. `install/` remains the single
  authoritative location for each script — there is no checked-in duplicate to
  keep in sync, and the deploy workflow needed no edit. A missing source file is
  a hard publish failure, so the deployment cannot silently ship nothing.
- **No `navigationFallback`, deliberately.** The site config contains only a
  `mimeTypes` map. Adding a route fallback would make every unmatched path return
  the app's HTML with a 200 — piping a mistyped URL to a shell would then execute
  HTML, which is worse than the 404 being fixed. Unmatched paths still 404, and
  the verification workflow asserts it.
- **The dev server cannot serve these assets.** `dotnet run --project
  name-on-blazor` answers 200 with a zero-byte body for `/install.sh`, because
  the SDK resolves the route against the *source* `wwwroot/`, where the file
  deliberately does not exist. Publish output and production are unaffected and
  verified byte-identical. Validate against `dotnet publish` output or the
  deployed site, never the dev server.
- **The installers themselves are unchanged** — same platforms, same version
  selection, same install locations.
- **Known limitation ([#17](https://github.com/clintcparker/name-on/issues/17)).**
  No release carries the `name-on-<rid>` archives either installer downloads,
  because `release-cli.yml` fires on `v*` tags while this repository's tags are
  `0.1.9+1`-style. An install run therefore still fails *after* fetching the
  script — from the README's URL just as much as from the new site URL. That is a
  pre-existing release-workflow defect, out of scope here, and fixing it requires
  no change to this feature.

Spec artifacts: [`specs/002-publish-install-scripts/`](specs/002-publish-install-scripts/)
