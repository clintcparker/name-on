# How to Release the CLI

The entire release procedure is pushing one annotated SemVer tag. Everything
else — tests, 5-platform builds, the GitHub Release, the NuGet package, and the
Homebrew tap formula — is done by `.github/workflows/release-cli.yml`.

## Release procedure

```sh
git tag -a v1.0.0 -m "name-on 1.0.0"
git push origin v1.0.0
gh run watch   # "Release CLI"
```

The tag **must** be of the form `v<MAJOR>.<MINOR>.<PATCH>` (a `v` prefix, then
SemVer — e.g. `v1.0.0`, `v1.2.3`, or a prerelease like `v1.3.0-rc.1`). That is
the only tag form that triggers `release-cli.yml`; tags in the old Blazor-era
`0.1.7+1` style do nothing. The version baked into the binaries, the NuGet
package, and the Homebrew formula is derived from the tag (`v1.2.3` → `1.2.3`),
so the tag is the single source of truth — there is no version number to bump
in any file.

After the run goes green, the release-triggered "Verify Install Channels"
workflow confirms every channel serves the new version (it waits out NuGet's
indexing lag before checking).

## One-time setup checklist

The release workflow's `preflight` job fails within seconds — naming the
missing piece — until all of the following exist. None of these recur per
release.

1. **`NUGET_API_KEY` repository secret** (on `clintcparker/name-on`):
   a nuget.org API key with *Push* scope, glob-scoped to the package
   `name-on`. Create at <https://www.nuget.org/account/apikeys>, then:

   ```sh
   gh secret set NUGET_API_KEY --repo clintcparker/name-on
   ```

2. **Public tap repository `clintcparker/homebrew-tap`**: a README is enough;
   `Formula/name-on.rb` is written only by release automation (never edit it
   there — the canonical template is `install/homebrew/name-on.rb` in this
   repo).

   ```sh
   gh repo create clintcparker/homebrew-tap --public --description "Homebrew tap for clintcparker tools"
   ```

3. **`TAP_PUSH_TOKEN` repository secret** (on `clintcparker/name-on`):
   a fine-grained personal access token with **Contents: Read and write**
   permission on **only** `clintcparker/homebrew-tap`. Create at
   <https://github.com/settings/personal-access-tokens/new>, then:

   ```sh
   gh secret set TAP_PUSH_TOKEN --repo clintcparker/name-on
   ```

## Re-running a failed release

A partially failed run can be re-run from the same tag and converges instead of
erroring:

- **NuGet push** uses `--skip-duplicate` — re-pushing an already-published
  version is a no-op, not an error.
- **Tap formula commit** is skipped when the rendered `Formula/name-on.rb`
  content is unchanged, so re-runs don't create empty commits.
- **GitHub Release** — `softprops/action-gh-release` updates the existing
  release for the tag rather than failing, re-uploading assets as needed.

To abandon a botched tag entirely (e.g. a throwaway prerelease used to test
preflight):

```sh
git push origin :refs/tags/<tag>
gh release delete <tag> --yes   # only if a release object was created
```
