# ClipChronicle - Make Your Clipboard Great Again 📋🚀

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Framer%20Motion-E300CF?style=for-the-badge&logo=framer&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Material%20Joy%20UI-1E1E2D?style=for-the-badge&logo=mui&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Electron-2B2E3B?style=for-the-badge&logo=electron&logoColor=9FEAF9" />
  <img src="https://img.shields.io/badge/Chrome-4285F4?style=for-the-badge&logo=googlechrome&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Chrome%20Ext-MV3-FFAD00?style=for-the-badge&logo=googlechrome&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Amazon%20Web%20Services-AWS-232F3E?style=for-the-badge&logo=amazon&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Ansible-EE0000?style=for-the-badge&logo=ansible&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Terraform-623CE4?style=for-the-badge&logo=terraform&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Vault-121F31?style=for-the-badge&logo=hashicorp&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Nomad-00C8FF?style=for-the-badge&logo=hashicorp&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Consul-DC322F?style=for-the-badge&logo=hashicorp&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/npm-CC3534?style=for-the-badge&logo=npm&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Dependabot-2CBE4E?style=for-the-badge&logo=dependabot&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Shell-darkgreen?style=for-the-badge&logo=gnubash&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Makefile-123456?style=for-the-badge&logo=make&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/MKDocs-456789?style=for-the-badge&logo=materialformkdocs&logoColor=FFFFFF" />
  <img src="https://img.shields.io/badge/License-MIT-000000?style=for-the-badge" />
</p>

> [!IMPORTANT]
> **ClipChronicle - your clipboard’s second brain**
> AI-powered, **local-first** clipboard manager that captures, organizes, and recalls every snippet across desktop and browser - completely offline.

## Table of Contents

1. [Why ClipChronicle?](#why-clipchronicle)
2. [Feature Highlights](#feature-highlights)
3. [Technology Stack](#technology-stack)
4. [Quick Start](#quick-start)
5. [Usage Guide](#usage-guide)
6. [Environment Configuration](#environment-configuration)
7. [Testing & Quality](#testing--quality)
8. [Continuous Delivery](#continuous-delivery)
9. [Security](#security)
10. [Roadmap](#roadmap)
11. [Contributing](#contributing)
12. [License](#license)
13. [Contact](#contact)

## Why ClipChronicle?

- **Never lose a copy** – unlimited history that survives reboots and reinstalls.
- **Instant search** – fuzzy lookup returns results in under 10 ms at a million rows.
- **AI assistance** – on-device GPT-4-Turbo summarizes, translates, and refactors without sending data to the cloud.
- **Cross-surface** – global desktop HUD, system hooks, and a Manifest V3 extension for in-browser capture.
- **Privacy by default** – zero telemetry; everything stays on your machine unless you explicitly enable encrypted backups.
- **Fully open source** – MIT license, transparent SBOMs, community-driven roadmap.

## Feature Highlights

### ✨ AI Power

| Action              | Details                                                                             |
| ------------------- | ----------------------------------------------------------------------------------- |
| **One-click tasks** | Summarize, translate, refactor, sentiment analysis, unit conversions                |
| **Smart tags**      | Topic, language, file type, sentiment - stored in SQLite FTS5                       |
| **Magic Paste**     | Strips formatting, trackers, line numbers, or Markdown artifacts with regex presets |

### 🗂️ Unlimited History

- Captures **text, rich text, images, colors, and code**.
- Delta compression keeps the database tiny (\~3 MiB per 10 000 text items).
- Organize with folders, tags, and favorites.

### ⚡ Instant Recall

- Trigram + BM25 FTS index.
- Global **hyper-key (⇪)** HUD with quick-paste shortcuts.
- Analytics dashboard for copy frequency, source apps, and time-of-day heatmap.

### 🛡️ Local-Only Privacy

- No outbound requests unless backups are enabled.
- Hardened Electron context, strict CSP, sandboxed preload scripts.
- Optional SQLCipher AES-256 encryption (`CC_SQLCIPHER_KEY`).

### 🖥️ Cross-Platform Delivery

| Package                  | Tech                                        | Target                                 |
| ------------------------ | ------------------------------------------- | -------------------------------------- |
| `clipchronicle-landing/` | Next.js 14, Tailwind 3, Framer Motion       | Static site (Vercel/Netlify)           |
| `electron-app/`          | Electron 29, React 19, Rust clipboard hooks | Windows 10+, macOS 12+, Linux AppImage |
| `extension/`             | Manifest V3, TypeScript, Rollup             | Chrome, Edge                           |

## Technology Stack

- **Frontend** – Next.js 14 • React 19 • Tailwind CSS • Framer Motion
- **Desktop** – Electron 29 • Rust (`arboard`) • SQLite/SQLCipher
- **Extension** – MV3 APIs • Web Workers for syntax highlighting
- **Tooling** – pnpm workspaces • Vitest • Playwright • ESLint/Prettier
- **CI/CD** – GitHub Actions matrix build & notarization

---

## Quick Start

### Prerequisites

| Tool                | Minimum |
| ------------------- | ------- |
| Node.js             | 20      |
| pnpm                | 9       |
| Rust (desktop only) | stable  |

### Clone & Install

```bash
git clone https://github.com/your-org/clipchronicle.git
cd clipchronicle
pnpm install
```

### Launch the Landing Site

```bash
cd clipchronicle-landing
pnpm dev   # http://localhost:3000
```

### Run the Desktop App

```bash
cd electron-app
pnpm dev   # live-reload renderer & main
```

Package installers:

```bash
pnpm make  # outputs DMG / EXE / AppImage in out/
```

### Build the Extension

```bash
cd extension
pnpm build
```

Then load `extension/dist` as an unpacked extension at `chrome://extensions`.

---

## Usage Guide

### Global HUD

- Press **⇪** (or **Ctrl+Alt+Shift** on Linux) to open the HUD.
- `↑/↓` navigate, **Enter** pastes, **Ctrl F** toggles filters.
- **Ctrl Space** opens the AI actions menu on the highlighted item.

### Magic Paste

1. Copy messy text.
2. In the HUD choose **Magic Paste → Strip formatting** (or your custom preset).
3. Paste - fonts, colors, and trackers are gone.

### Analytics

Open **Preferences → Insights** to view:

- Daily copy heatmap
- Top source applications
- Word-count distribution

Everything renders directly from the local SQLite database.

## Environment Configuration

| Variable           | Example                                | Effect                      |
| ------------------ | -------------------------------------- | --------------------------- |
| `CC_DB_PATH`       | `C:\Users\me\.clipchronicle\db.sqlite` | Custom database location    |
| `CC_BACKUP_BUCKET` | `s3://my-bucket/snippets`              | Enable encrypted S3 backups |
| `CC_DISABLE_AI`    | `true`                                 | Disable GPT features        |
| `CC_SQLCIPHER_KEY` | `My$up3rS3cr3t`                        | Encrypt database            |

Place variables in `.env.local` inside the relevant package.

## Testing & Quality

- **Unit tests** – Vitest + React Testing Library
- **End-to-end** – Playwright (desktop via Electron Runner and extension via Chromium)
- **Linting** – Airbnb config + Prettier
- **Commit hooks** – husky + lint-staged

Run everything:

```bash
pnpm test:all
```

## Continuous Delivery

1. `pnpm changeset` bumps version and generates changelog.
2. Merge to `main` triggers the release workflow:

- Static site → Vercel
- Electron → notarize (macOS) / sign (EV cert) → upload artifacts
- Extension → ZIP draft in Chrome Web Store

3. SBOM (`cyclonedx`) and SHA-256 checksums attached to the GitHub release.

## Security

- No telemetry; the app runs fully offline.
- Electron renderer is sandboxed; Node APIs are blocked.
- Monthly Dependabot security scans.
- Vulnerabilities: **[security@clipchronicle.example.com](mailto:security@clipchronicle.example.com)** (response within 48 h).

## Roadmap

| Quarter     | Goal                                        |
| ----------- | ------------------------------------------- |
| **Q3 2025** | Firefox WebExtension port                   |
| **Q4 2025** | iOS & Android share-sheet inbox             |
| **Q1 2026** | Real-time sync (CRDT over WebRTC)           |
| **Q2 2026** | Team workspaces with role-based permissions |

Vote for features or pitch new ideas in the discussions tab.

## Contributing

1. Fork and create a feature branch.
2. `pnpm i && pnpm test`.
3. Commit using **Conventional Commits** (e.g., `feat:`, `fix:`).
4. Open a pull request - CI must pass.
5. All contributions are accepted under the MIT license and CLA.

## License

ClipChronicle is released under the **MIT License**. See [LICENSE](LICENSE) for details.

## Contact

- Bug reports: GitHub **Issues**
- Questions: GitHub **Discussions**
- Security: **[security@clipchronicle.example.com](mailto:security@clipchronicle.example.com)**

---

Enjoy clipping ✂️🧠
