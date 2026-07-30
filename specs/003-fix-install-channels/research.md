# Research: Working Package-Manager Install Channels

**Feature**: 003-fix-install-channels | **Date**: 2026-07-29

All findings below were verified directly against the live repo, nuget.org, and GitHub during planning — none are assumptions.

## R1. Why the channels are broken (root cause)

**Finding**: `release-cli.yml` triggers on `push: tags: ['v*']`, but every tag ever pushed is `0.1.7+1`-style (no `v` prefix — these are Blazor-era releases from 2019–2021). The workflow has **never run**. Consequently: no NuGet package exists (`api.nuget.org` flatcontainer returns BlobNotFound for `name-on`), no release carries CLI binaries (latest release `0.1.7+1`, 2021-03-19, predates the CLI), and `clintcparker/homebrew-tap` was never created (confirmed: repo does not resolve).

**Implication**: `install.sh` is *also* end-to-end broken — it resolves the latest GitHub release tag and downloads `name-on-<rid>.tar.gz` from it, and no such asset exists on `0.1.7+1`. 002's verification passes because it only checks the script is *served*, not that it works. One properly tagged release repairs the script channel as a side effect.

## R2. Release procedure and tag format

**Decision**: The normal release procedure is: push an annotated SemVer tag `v<MAJOR>.<MINOR>.<PATCH>` (e.g. `v1.0.0`). Document it in `docs/how-to/release.md`. Keep the existing `v*` workflow trigger.

**Rationale**: FR-005 demands publishing hook into "the procedure a maintainer actually uses". There is no entrenched CLI release procedure to preserve — the CLI has never been released. The old `X.Y.Z+N` tags belong to the pre-CLI Blazor site and their `+` is hostile to URLs (needs percent-encoding in release-asset links). Every existing artifact already assumes `v*`: the workflow trigger, and the formula template's download URLs (`releases/download/vVERSION/...`). Making `v*` the *documented* procedure is the cheapest way to make the actual and automated procedures the same thing. A guard for "tag pushed in the old format" is unnecessary — old-style tags simply don't trigger release automation, and the new verification workflow (R6) will flag the resulting staleness if a maintainer forgets, satisfying the spec's edge case without extra machinery.

**Alternatives considered**: (a) Trigger on all tags — rejected: would fire on non-release tags and blesses the URL-hostile `+` format. (b) Trigger on GitHub Release creation instead of tag push — rejected: adds a manual step (creating the release) that the workflow currently does itself; more moving parts for the same result.

## R3. Version wiring (tag → binary → package)

**Decision**: The release workflow derives `VERSION=${GITHUB_REF_NAME#v}` and passes `-p:Version=$VERSION` to both `dotnet publish` (binaries) and `dotnet pack` (NuGet). Remove the hard-coded `<Version>1.0.0</Version>` from `name-on-cli.csproj` so dev builds get the SDK default (`1.0.0`) and release builds can't silently ship a stale hard-coded number.

**Rationale**: FR-003/SC-004 require `name-on --version` to report the released version identically across channels. `Program.cs` already reads `AssemblyInformationalVersion` and strips the `+commitsha` suffix, so `-p:Version` is the only wiring needed — no CLI code change. A hard-coded csproj version would eventually disagree with the tag; deriving from the tag makes disagreement impossible.

**Alternatives considered**: Keeping `<Version>` and requiring a manual bump per release — rejected: that is a per-release manual step (violates FR-005) and the exact kind of silent-drift failure this feature exists to kill.

## R4. NuGet channel

**Finding**: The package ID `name-on` is **available** — nuget.org search returns `totalHits: 0` and the flatcontainer index 404s. The advertised command needs no text change (FR-007 fallback not needed). The csproj already carries adequate identifying metadata for FR-010 (description, MIT license, project/repo URLs, tags); add `<PackageReadmeFile>` pointing at the repo README to strengthen the listing.

**Finding**: The repo has **no `NUGET_API_KEY` secret** (only the Azure Static Web Apps token exists). The existing push step would fail with a blank key — loudly, but confusingly.

**Decision**: One-time setup (maintainer, manual): create nuget.org API key scoped to push `name-on`, add as `NUGET_API_KEY` repo secret. Automation: add a preflight step at the top of the release workflow that fails with an explicit "one-time setup missing: NUGET_API_KEY" message when the secret is empty (FR-009). Keep `--skip-duplicate` so a re-run of a partially failed release converges instead of erroring.

## R5. Homebrew channel

**Finding**: `clintcparker/homebrew-tap` does not exist. The in-repo formula template (`install/homebrew/name-on.rb`) is structurally sound: download URLs match the release asset names the build matrix produces (`name-on-{osx,linux}-{arm64,x64}.tar.gz` under `releases/download/v<version>/`), `bin.install "name-on"` matches the tarball contents, and `post_install` calls `name-on completions bash|zsh|fish` — all subcommands the CLI already implements.

**Decision**: One-time setup (maintainer, manual): create public repo `clintcparker/homebrew-tap`, and create a fine-grained PAT with contents-write on that repo only, stored as `TAP_PUSH_TOKEN` secret in `name-on`. Automation: a new `homebrew` job in the release workflow, running after the GitHub Release assets are published, that (1) downloads the four Unix tarballs, (2) computes their sha256s, (3) renders `install/homebrew/name-on.rb` by substituting `VERSION` and the four `SHA256_*` placeholders via `sed`, (4) commits the result to `Formula/name-on.rb` in the tap repo. Preflight fails loudly when `TAP_PUSH_TOKEN` is missing or the tap repo is unreachable (FR-009). Because checksums are computed from the exact assets attached to the release, formula and artifacts cannot silently disagree (edge case: checksum mismatch).

**Rationale for sed-render over alternatives**: (a) `brew bump-formula-pr` — rejected: designed for homebrew-core, not needed for a self-owned tap. (b) A dedicated release tool (goreleaser-style) — rejected: new dependency for one templated file (Constitution V). (c) Maintaining the formula only in the tap repo — rejected: keeping the canonical template in this repo means formula changes ride the same PR/review flow as the code they describe; the tap copy is pure build output.

**Linux coverage**: the template already has an `on_linux` block and linux tarballs exist in the build matrix, so Linuxbrew works at zero marginal cost — matching the spec assumption (macOS both arches, Linux where existing binaries allow). Unsupported platforms get Homebrew's standard "no bottle/binary available" failure from the formula having no matching block — a clear "not supported", not a corrupt install.

## R6. Channel verification (FR-006)

**Decision**: New workflow `verify-install-channels.yml` (daily cron + `workflow_run` after "Release CLI" completes + manual dispatch). It determines the latest `v*` release via the GitHub API, then asserts: (1) all five release assets exist for that tag; (2) nuget.org's flatcontainer index for `name-on` lists that version; (3) the tap's `Formula/name-on.rb` contains that version string; (4) — version agreement across channels falls out of (2)+(3) both being checked against the same release tag, so partial publication (one channel updated, another not) fails the run. A scheduled failure surfaces via GitHub's workflow-failure notification to the maintainer (SC-005).

**Rationale for a separate workflow instead of extending `verify-install-urls.yml`**: FR-008 requires 002's verification to keep passing; the safest way to not break it is to not edit it. The two also have different natural triggers (site-deploy-completion vs release-completion) and different failure audiences. NuGet indexing lags publish by minutes — the post-release trigger tolerates this with a bounded retry/wait on the flatcontainer check rather than failing instantly.

**Alternatives considered**: Full end-to-end installs (`dotnet tool install`, `brew install`) in CI daily — rejected as the *primary* check: slow, flaky (brew tap clones, NuGet CDN), and the metadata assertions above catch every drift mode the spec names. A real `dotnet tool install` smoke test runs once in the release-triggered path only, where its cost is justified.

## R7. Partial-failure visibility inside the release workflow

**Decision**: The release workflow's publish jobs (`release` assets, `nuget`, `homebrew`) are separate jobs so one channel's failure is independently visible in the run summary; the workflow as a whole fails if any job fails. No channel's step uses `continue-on-error`. Combined with `--skip-duplicate` (NuGet) and idempotent formula commits (same content → no-op), a failed run can be re-run from the same tag and converge.

## R8. Advertised-surface changes (FR-007)

**Finding**: No command text changes are needed — the NuGet name is obtainable and the tap will exist under the advertised path. Surfaces stay as-is: CLI `--help` (4 channels), README (4 channels + web app), tools.clintparker.com (external, same commands, maintainer-owned). The only surface work is `docs/TODO` removal and the new `docs/how-to/release.md`.
