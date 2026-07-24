# Cosy-Docs

> The official documentation site and public landing page for **COSY** — a self-hostable platform for orchestrating and managing game servers.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Lint](https://github.com/Magenta-Mause/Cosy-Docs/actions/workflows/lint.yml/badge.svg)](https://github.com/Magenta-Mause/Cosy-Docs/actions/workflows/lint.yml)
[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-000000?logo=bun&logoColor=white)](https://bun.com)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-EF4444?logo=react&logoColor=white)](https://tanstack.com/start)
[![Fumadocs](https://img.shields.io/badge/Docs-Fumadocs-0EA5E9)](https://fumadocs.dev)

---

## Overview

**COSY** (Cost Optimized Server Yard) is a self-hostable platform for managing game servers (Minecraft, Valheim, CS:GO, and more) through a beautiful, gamified "village" web interface, where each server is represented as a building in a pixel-art world. Every game server runs isolated in its own container, and COSY is optimized to run cost-efficiently on a single host while still supporting Kubernetes scaling.

**Cosy-Docs** is the repository behind two public-facing surfaces of the project:

- The **landing page** (`cosy-hosting.net`)
- The **documentation site** (served under `/docs`), covering installation, configuration, and day-to-day usage of COSY

It is a fully static, prerendered site built with [TanStack Start](https://tanstack.com/start) and [Fumadocs](https://fumadocs.dev), bundled with [Vite](https://vite.dev), and run/packaged with [Bun](https://bun.com). Documentation content is authored in **MDX** under `content/docs`.

### Key features

- Gamified landing page introducing COSY
- Searchable MDX documentation (installation, configuration, features, guides) powered by Fumadocs + Orama
- Fully static output (prerendered) — served by any static file host / nginx
- Fast, type-safe React 19 stack with Tailwind CSS v4 and Biome for linting/formatting

### Related repositories

Cosy-Docs is one component of the wider COSY project. The other repositories in the [Magenta-Mause](https://github.com/Magenta-Mause) organization are:

| Repository | Description |
| --- | --- |
| [Cosy](https://github.com/Magenta-Mause/Cosy) | Main project & install scripts (the umbrella repo; all issues are tracked here) |
| [Cosy-Frontend](https://github.com/Magenta-Mause/Cosy-Frontend) | React + TypeScript web interface (the "Village" UI) |
| [Cosy-Backend](https://github.com/Magenta-Mause/Cosy-Backend) | Java Spring Boot control-plane / API |

You can browse the full organization for additional components (e.g. the Rust game-asset API and deployment configs).

---

## Getting Started

### Prerequisites

- **[Bun](https://bun.com)** — used as the package manager, task runner, and build tool. The Docker build uses the `oven/bun:latest` image; installing the current stable Bun locally is recommended.
- **[Git](https://git-scm.com/)** — to clone the repository.
- **(Optional) [Docker](https://www.docker.com/)** — only needed if you want to build/run the production container image.

Installing Bun:

```sh
# macOS / Linux
curl -fsSL https://bun.com/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1|iex"

# via npm
npm install -g bun
```

You may need to restart your terminal after installation. See the [Bun installation docs](https://bun.com/docs/installation) if you run into issues.

### Installation

```sh
git clone https://github.com/Magenta-Mause/Cosy-Docs.git
cd Cosy-Docs
bun install
```

`bun install` runs a `postinstall` step (`fumadocs-mdx`) that generates the MDX source map needed by the app.

### Configuration

This is a static documentation/landing site and does **not** read any runtime environment variables — there is intentionally no `.env` / `.env.example`. Configuration lives in code:

- **`source.config.ts`** — Fumadocs MDX configuration (points at `content/docs`).
- **`vite.config.ts`** — Vite + TanStack Start config (dev server runs on port `3000`, host `0.0.0.0`; prerendering options).
- **`biome.json`** — linting/formatting rules.
- **`components.json`** — shadcn/ui component configuration.

To edit or add documentation, create/modify `.mdx` files under `content/docs` (grouped by folder, with `meta.json` controlling ordering/navigation).

### Quick Start

Start the dev server with hot-reloading:

```sh
bun run dev
```

Then open **http://localhost:3000** — the landing page is at `/` and the documentation at `/docs`.

---

## Development

### Project structure

```
Cosy-Docs/
├── content/docs/       # MDX documentation content (installation, configuration, features, guides)
├── src/
│   ├── routes/         # TanStack Start routes (index, /docs, /api/search)
│   ├── components/     # React UI components (landing page, docs helpers, shadcn/ui)
│   ├── lib/            # Shared helpers, constants, Fumadocs source & layout
│   ├── styles/         # Tailwind / global CSS
│   ├── assets/         # Images, fonts, cursors
│   └── router.tsx      # Router setup
├── public/             # Static public assets
├── docker/Dockerfile   # Multi-stage build → nginx static image
├── argo/               # Kubernetes manifests (Deployment, Service, Ingress, cache middleware)
├── source.config.ts    # Fumadocs MDX config
├── vite.config.ts      # Vite + TanStack Start config
└── biome.json          # Biome lint/format config
```

### Available commands

All scripts are defined in `package.json` and run with Bun:

| Command | Description |
| --- | --- |
| `bun run dev` | Start the Vite dev server with hot-reloading (http://localhost:3000) |
| `bun run build` | Produce a production build in `dist/` |
| `bun run start` | Serve the built `dist/client` output locally (via `serve`) |
| `bun run types:check` | Regenerate MDX types and run `tsc --noEmit` |
| `bun run lint` | Check formatting/linting with Biome |
| `bun run lint:fix` | Auto-format the codebase with Biome |

### Development workflow

1. Create a feature branch off `main`.
2. Make your changes — for docs, edit MDX under `content/docs`; for the site/UI, edit files under `src/`.
3. Run `bun run dev` and verify your changes at http://localhost:3000.
4. Run `bun run lint` (and `bun run lint:fix` to auto-format) and `bun run types:check` before pushing.
5. Open a pull request against `main`. The **Lint** CI workflow runs on every pull request.

**Editor setup (recommended for VS Code):**

- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) — linting/formatting
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) — Tailwind class completion
- [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) — component boilerplate

### Major dependencies

- **[TanStack Start](https://tanstack.com/start)** / **[TanStack Router](https://tanstack.com/router)** — full-stack React framework and routing (SPA + prerendering).
- **[Fumadocs](https://fumadocs.dev)** (`fumadocs-core`, `fumadocs-ui`, `fumadocs-mdx`) — documentation framework and MDX pipeline.
- **[@orama/orama](https://orama.com/)** — client-side full-text search for the docs.
- **[React 19](https://react.dev/)**, **[Tailwind CSS v4](https://tailwindcss.com/)**, **[shadcn/ui](https://ui.shadcn.com/)** + **[Radix UI](https://www.radix-ui.com/)**, **[lucide](https://lucide.dev/)** icons.
- **[Vite 7](https://vite.dev)** — bundler/dev server. **[Biome](https://biomejs.dev/)** — linter/formatter.

---

## Deployment

The production image is built from `docker/Dockerfile`: a multi-stage build compiles the static site with Bun and serves the output (`dist/client`) with **nginx**. On tag pushes (`v*.*.*`), the **Release** GitHub Actions workflow builds and publishes the image to `ghcr.io/Magenta-Mause/cosy-docs`.

Kubernetes manifests for deploying that image (Deployment, Service, Ingress, and a Traefik cache middleware) live in the `argo/` directory.

---

## Documentation

The rendered documentation is the primary output of this repository. Content sources live under `content/docs`:

- **Installation** — Docker & Kubernetes install guides
- **Getting Started** — the COSY concept and creating your first game server
- **Configuration** — images/ports, environment variables, volumes, RCON, resource limits, execution commands
- **Features** — dashboard & metrics, console, file management, access management, webhooks, public dashboard
- **Guides** — task-oriented walkthroughs

To preview the docs locally, run `bun run dev` and visit `/docs`.

---

## Contributing

Contributions are welcome! Contribution guidelines are maintained org-wide in the [Magenta-Mause/.github](https://github.com/Magenta-Mause/.github) community-health repository.

**Reporting bugs & requesting features:** Issues for the entire COSY project are centralized in the main repository. Please open bug reports and feature requests in **[Magenta-Mause/Cosy → Issues](https://github.com/Magenta-Mause/Cosy/issues/new/choose)**. (Note: issues opened directly on this repository are automatically redirected and closed.)

**Pull requests** are made against this repository's `main` branch. Before opening a PR, please run `bun run lint` and `bun run types:check`.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## Contact & Support

- **Discord:** [Join the COSY community](https://discord.gg/Ns2Z6DavfA) for questions, support, and feature requests.
- **Documentation:** the docs served by this site are the best place to start.
- **Issues:** [Magenta-Mause/Cosy](https://github.com/Magenta-Mause/Cosy/issues) (central issue tracker for the project).
- **Releases:** [Cosy-Docs releases](https://github.com/Magenta-Mause/Cosy-Docs/releases).

---

## Acknowledgments

Built by [Magenta-Mause](https://github.com/Magenta-Mause) with [TanStack Start](https://tanstack.com/start), [Fumadocs](https://fumadocs.dev), [Vite](https://vite.dev), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and [Bun](https://bun.com).
