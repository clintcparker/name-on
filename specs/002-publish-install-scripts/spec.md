# Feature Specification: Working Short Install URLs

**Feature Branch**: `002-publish-install-scripts`
**Created**: 2026-07-29
**Status**: Draft
**Input**: User description: "docs/TODO — Program.cs:206 advertises an install URL that is dead: `curl -fsSL https://name-on.clintcparker.com/install.sh | sh` → 404. The README's raw.githubusercontent.com URL returns 200. install.sh exists in install/ but nothing publishes it to the site root — wwwroot/ contains only index.html, and neither workflow copies it. Either correct the help text, or copy install/install.sh into wwwroot/ during deploy so the shorter URL works."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Install from the URL the tool tells you to use (Priority: P1)

Someone has heard about name-on, or already has an old copy, and runs `name-on --help` (or reads the help output in a terminal recording, a blog post, or a chat message). The help output tells them to install with a one-line shell command pointing at the project's own site. They copy that line, paste it into a terminal, and the CLI installs.

**Why this priority**: This is the reported defect. The product currently prints an install command that fails. A first-time user's very first interaction with the project is a 404, and nothing in the failure hints that a different URL would have worked. Fixing this restores a promise the product already makes.

**Independent Test**: Run the exact command printed by `name-on --help` on a clean macOS or Linux machine with no name-on installed. The command completes and `name-on --version` reports a version. No other user story needs to exist for this to be valuable.

**Acceptance Scenarios**:

1. **Given** the site is deployed and the user has no name-on installed, **When** they run the shell install command exactly as printed in the CLI help output, **Then** the installer runs and the `name-on` command becomes available.
2. **Given** the site is deployed, **When** a user requests the shell installer URL advertised in the help output, **Then** the request succeeds and returns the installer script — not a not-found error and not the web app's HTML page.
3. **Given** a cautious user who will not pipe an unread script to a shell, **When** they open the advertised installer URL in a browser, **Then** they can read the script's contents as plain text.
4. **Given** the installer has been fetched from the site, **When** it runs, **Then** it installs the same version and behaves identically to the installer fetched from the repository URL documented in the README.

---

### User Story 2 - Windows users get an equally short install URL (Priority: P2)

A Windows user reads the CLI help output. Today it lists a shell script that cannot run on their machine and says nothing about the PowerShell installer that already exists. This story gives them a short, advertised PowerShell one-liner on the same site.

**Why this priority**: The PowerShell installer already exists and is already documented in the README, so this is a gap in what the tool advertises rather than a broken promise. Valuable, but nobody is currently hitting a not-found error because of it.

**Independent Test**: On a clean Windows machine, run the PowerShell install command printed by `name-on --help`. The CLI installs. Can be shipped and tested without touching User Story 1's behavior.

**Acceptance Scenarios**:

1. **Given** the site is deployed, **When** a Windows user requests the PowerShell installer URL advertised in the help output, **Then** the request succeeds and returns the PowerShell installer script.
2. **Given** the CLI help output, **When** a user reads the install section, **Then** it lists an install path applicable to Windows alongside the shell, .NET tool, and Homebrew paths.
3. **Given** a Windows user runs the advertised PowerShell one-liner, **When** it completes, **Then** `name-on --version` reports a version.

---

### User Story 3 - Installers stay correct without anyone remembering to sync them (Priority: P3)

A maintainer edits the installer script — say, to support a new CPU architecture. They edit it in one place, merge to the main branch, and the site starts serving the updated script automatically. They never have to remember that a second copy exists.

**Why this priority**: This is what keeps User Stories 1 and 2 from decaying. The original defect happened precisely because publication was manual-by-omission — nobody wired it up. A duplicated, hand-synced copy would trade a not-found error for a subtler failure: an installer that silently serves stale logic. Lower priority only because the immediate user-facing breakage is fixed by P1.

**Independent Test**: Change a visible string in the canonical installer, let the automated deployment run, then fetch the site URL and confirm the change is present — with no manual copy step performed by a human.

**Acceptance Scenarios**:

1. **Given** a maintainer changes the canonical installer script and merges to the main branch, **When** the automated deployment completes, **Then** the site serves the updated script content.
2. **Given** the repository, **When** a maintainer looks for the installer script to edit, **Then** there is exactly one authoritative copy of each installer to edit.
3. **Given** an advertised install URL stops resolving for any reason, **When** the automated checks run, **Then** the failure is reported to maintainers rather than left for a user to discover.

---

### Edge Cases

- **The web app's catch-all routing swallows the request**: the site is a single-page app whose unmatched routes fall back to the app's HTML page. If the installer paths are treated as app routes, the URL returns a success status carrying HTML, and piping that to a shell produces confusing syntax errors instead of an honest not-found. The installer paths must resolve to the script itself.
- **The response is treated as an opaque download**: if the server labels the script as a binary attachment, users cannot inspect it in a browser before running it, which undermines the safest way to use a `curl | sh` command.
- **Case and path variants**: a user typing a differently-cased or trailing-slash variant of the path gets a normal not-found response, not the app's HTML dressed up as success.
- **Scheme-less or insecure request**: a user pasting the URL without `https` is redirected to the secure URL rather than failing or serving over plaintext.
- **Site is unavailable**: the site being down must not be the only way to install. The repository-hosted URLs documented in the README, the .NET tool, and Homebrew remain independent install paths.
- **Deployment runs before the installers exist at their expected location**: publication must not silently succeed while shipping nothing — an absent installer must break the deployment or its verification, not the user's install.
- **Stale cached copy**: a user who fetched the URL previously gets the current installer rather than an indefinitely cached older one.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project site MUST serve the shell installer at the exact path advertised in the CLI help output, returning the installer script with a success status.
- **FR-002**: The content served at that path MUST be byte-identical to the canonical shell installer maintained in the repository.
- **FR-003**: Piping the site-served shell installer to a POSIX shell MUST produce the same installed result as the repository-hosted installer URL documented in the README.
- **FR-004**: The site MUST serve each installer as readable text that a browser displays for inspection, and MUST NOT let the web app's unmatched-route fallback intercept the installer paths.
- **FR-005**: The project site MUST serve the PowerShell installer under the same guarantees as FR-001 through FR-004.
- **FR-006**: Publication of the installers to the site MUST happen automatically as part of the existing automated deployment on merge to the main branch, with no manual step.
- **FR-007**: Exactly one authoritative copy of each installer MUST exist for maintainers to edit; the solution MUST NOT require a human to keep two copies in sync.
- **FR-008**: The CLI help output MUST advertise only install URLs that resolve to a working installer, and MUST include a Windows-applicable install path.
- **FR-009**: An automated check MUST fail when an advertised install URL stops returning a working installer, so the regression is caught before a user encounters it.
- **FR-010**: Every install URL advertised anywhere user-facing — CLI help output, README, and the site — MUST resolve to working content. Different channels MAY advertise different URLs, provided each one works.
- **FR-011**: The change MUST NOT alter what the installers do, which versions they fetch, or where they install to.

### Key Entities

- **Installer script**: The shell and PowerShell programs that download and install the CLI. Each has exactly one authoritative copy in the repository; published copies are derived from it, never edited directly.
- **Advertised install URL**: Any install address the product shows a user — in CLI help output, the README, or on the site. Each one is a public promise and must resolve to a working installer.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new user who copies the install command from the CLI's help output installs the CLI successfully on the first attempt, on both macOS/Linux and Windows, with zero not-found errors.
- **SC-002**: 100% of install URLs advertised in user-facing surfaces (CLI help output, README, site) return working installer content when checked.
- **SC-003**: A user can read the full text of any advertised installer in a browser before running it, without downloading it first.
- **SC-004**: After a maintainer edits an installer and the automated deployment completes, the advertised URL serves the updated content within one deployment cycle, with zero manual steps performed by a human.
- **SC-005**: A broken advertised install URL is reported by automated checks rather than discovered by a user or during a manual code read.
- **SC-006**: The number of places a maintainer must edit to change an installer's behavior stays at one per platform.

## Assumptions

- **The dead URL is fixed by making it work, not by retracting it.** The TODO offered both options. Publishing the script is chosen because the short URL is the nicer, more memorable install experience, it is already advertised, and the site already exists to host it — retreating to the long repository URL would be a downgrade for the same amount of work. The alternative remains available if the maintainer prefers it: change the help text instead and drop this spec.
- **Both installers are published, not just the shell one.** Publishing only the shell script would leave the Windows installer reachable at a long URL and unmentioned in help output. The mechanism is identical for both, so the marginal cost is near zero.
- **The README keeps its repository-hosted URLs.** Those URLs work today, are independent of the site's availability, and make the script's provenance obvious. Consistency between README and help output is not required — only that every advertised URL works (FR-010).
- **The static host can serve arbitrary static files at the site root.** This is assumed of the current hosting model; if it cannot, this feature is not deliverable as specified.
- **No server-side logic is introduced.** The installers are published as static files, consistent with the project's client-side-only and static-deployment principles.

## Out of Scope

- Changing installer behavior: supported platforms, version selection, install locations, completion setup.
- New distribution channels (package managers, containers, MSI/pkg installers).
- Versioned or pinned installer URLs (for example, a path per release).
- Hosting the release binaries themselves on the site; the installers continue to fetch them from existing release infrastructure.
- Redesigning the CLI help output beyond the install section.
- Migrating the README's documented install URLs.

## Dependencies

- The existing automated site deployment to the static host, triggered on merge to the main branch.
- The static host serving static files at the site root without the single-page-app fallback intercepting them.
- The existing release infrastructure the installers download binaries from — unchanged by this feature.
