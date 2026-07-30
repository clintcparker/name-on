# Contract: HTTP Installer Endpoints

**Feature**: `002-publish-install-scripts` | **Consumer**: anyone running the
advertised install one-liner, or reading it in a browser first.

The site is a static host, so this contract is expressed as the request/response
behavior the deployed artifact must exhibit. It is verifiable with `curl` alone —
see [quickstart.md](../quickstart.md).

---

## `GET /install.sh`

**Request**: no headers, no auth, no query parameters required.

**Response**:

| Aspect | Required value |
|---|---|
| Status | `200` |
| `Content-Type` | `text/plain; charset=utf-8` |
| Body | Byte-identical to `install/install.sh` at the deployed commit |
| Body first line | `#!/bin/sh` |
| `Cache-Control` | Must permit revalidation within a short window (host default `public, must-revalidate, max-age=30` is sufficient) |

**Must not**:

- Return `application/octet-stream` or any `Content-Disposition: attachment`
  header — the response has to render in a browser (FR-004, SC-003).
- Return the web app's `index.html`.

Satisfies FR-001, FR-002, FR-004.

## `GET /install.ps1`

Identical to `/install.sh` with these substitutions:

| Aspect | Required value |
|---|---|
| Body | Byte-identical to `install/install.ps1` at the deployed commit |
| Body first line | `# name-on CLI installer for Windows` |

Satisfies FR-005.

## `GET http://name-on.clintcparker.com/install.sh` (insecure scheme)

| Aspect | Required value |
|---|---|
| Status | `301` |
| `Location` | `https://name-on.clintcparker.com/install.sh` |

Already provided by the host (research R4). `curl -fsSL` and `irm` both follow it.

## `GET /<unmatched path>` — negative contract

Examples: `/Install.sh`, `/install.sh/`, `/install.txt`, `/does-not-exist`.

| Aspect | Required value |
|---|---|
| Status | `404` |
| Body | Must not be a `200` carrying the web app's HTML |

This is the site's behavior today and must be preserved. The published
`staticwebapp.config.json` must therefore contain **no** `navigationFallback` key
(research R1). A regression here turns a piped install into confusing shell
syntax errors instead of an honest failure.

Satisfies FR-004 and the spec's first and third edge cases.

## Site configuration contract

`name-on-blazor/wwwroot/staticwebapp.config.json` — publishes to the artifact
root, which is where the host reads it (research R7):

```json
{
  "mimeTypes": {
    ".sh": "text/plain; charset=utf-8",
    ".ps1": "text/plain; charset=utf-8"
  }
}
```

Constraints on this file:

- **No `navigationFallback`** — see the negative contract above.
- **No `routes`, no `globalHeaders`** — the host's defaults already satisfy the
  caching and HTTPS-redirect requirements (research R3, R4); adding them would be
  speculative configuration (Constitution Principle V).
- The filename is reserved by the host and is not itself served.

## Build-output contract

`dotnet publish ./name-on-blazor/name-on-blazor.csproj -c Release -o build_output`
must produce, at `build_output/wwwroot/`:

- `install.sh` — byte-identical to `install/install.sh`
- `install.ps1` — byte-identical to `install/install.ps1`
- `staticwebapp.config.json`

and must **fail** if either canonical installer cannot be resolved (research R6).

Satisfies FR-006 and the spec's "deployment ships nothing" edge case.
