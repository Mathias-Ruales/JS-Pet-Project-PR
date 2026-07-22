# Repo Viewer

A React app that fetches and displays GitHub repositories for a given organization, with multiple sorting and filtering views.

## Tech Stack

- React 19 + TypeScript
- Vite
- MUI (Material UI) v9
- Vitest + @vitest/coverage-v8

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file in the project root:

```
VITE_GITHUB_ORG=[YOUR ORG NAME]
```

See `.env.example` for reference.

### Run

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Features

- Fetches repos from the GitHub API for the configured organization
- **Popular** — repos with more than 5 stars
- **Recent** — 5 most recently updated repos
- **Total** — aggregate star count
- **Top 5** — highest-starred repos
- **Alphabetical** — repos sorted A-Z, excluding those starting with "h"
- Responsive layout with mobile sidebar navigation

## CI

GitHub Actions runs on every pull request and push to `main`:

1. Install dependencies
2. Lint (`eslint`)
3. Build (`tsc -b && vite build`)
4. Test (`vitest`)
