# Name-On
![Release](https://clintcparker.vsrm.visualstudio.com/_apis/public/Release/badge/5eb5c9e0-ca41-4637-a6a1-1a4c8deda67b/1/1)

![Build](https://clintcparker.visualstudio.com/_apis/public/build/definitions/5eb5c9e0-ca41-4637-a6a1-1a4c8deda67b/7/badge?branchName=master&api-version=5.0-preview.2)

## Introduction

Name-On generates a new _Adjective-Noun-Number_ combo with each request. Useful for unique, human-readable names for projects, containers, or anything else.

Try it live: [name-on.clintcparker.com](https://name-on.clintcparker.com)

---

## Structure

Name-On now consists of these main components:

1. **name-on-core**: Shared library with the core name generation logic
2. **name-on-unit-tests**: Unit tests for the core library
3. **azfn**: Azure Functions project exposing the name generator as an HTTP API
4. **static/**: Static frontend directory (contains `index.html` and, in the future, any additional static assets)

---

## Usage

- **Local development:**
  - Run the Azure Functions project (`azfn`) locally using the Azure Functions Core Tools or VS Code launch config.
  - Open `static/index.html` in your browser. It will call the local `/api/generate` endpoint.

- **Production:**
  - Deploy the `azfn` project to Azure Functions.
  - Deploy the contents of the `static/` directory as your static site (Azure Static Web Apps, blob storage, or any static host).
  - Ensure the static site is configured to call the correct `/api/generate` endpoint (update the JS if needed for your deployment).

---

## Example API Call

```
GET /api/generate
```
Returns a plain text name, e.g.:
```
clever-otter-123
```

---

## Roadmap
- [x] Add a button to copy to clipboard
- [x] Migrate to Azure Functions + static frontend
- [ ] Add deployment scripts/examples for Azure Static Web Apps
- [ ] Add more customization options for name format

---

## License
MIT
