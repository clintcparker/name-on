# Name-On

Name-On generates a new _Adjective-Noun-Number_ combo with each request. Useful for unique, human-readable names for projects, containers, or anything else.

Try it live: [name-on.clintcparker.com](https://name-on.clintcparker.com)

---

## Architecture (2024+)

Name-On is now a **Blazor WebAssembly (WASM)** app that runs entirely in the browser, using a shared C# core library for name generation. There are no server-side APIs or Azure Functions required.

### Solution Structure

- **name-on-core**: Shared C# library with the core name generation logic
- **name-on-blazor**: Blazor WASM frontend, directly references and uses `name-on-core`
- **name-on-unit-tests**: Unit tests for the core library

**Legacy directories removed:**
- `azfn/` (Azure Functions) — no longer used
- `static/` (old static site) — replaced by Blazor WASM

---

## Usage

### Local Development

- Open the solution in VS Code.
- Use the provided build and debug tasks to run the Blazor WASM app (`name-on-blazor`).
- All name generation is client-side; no backend required.

### Production Deployment

- Deploy the contents of `name-on-blazor/bin/Release/net8.0/wwwroot` to your static host (Azure Static Web Apps, blob storage, etc).
- The included GitHub Actions workflow deploys the Blazor WASM output to Azure Static Web Apps.

---

## Example Output

```
clever-otter-123
```

---

## Roadmap
- [x] Migrate to Blazor WebAssembly (WASM) only
- [x] Remove Azure Functions and legacy static frontend
- [x] Modernize deployment for static hosting
- [ ] Add more customization options for name format

---

## License
MIT
