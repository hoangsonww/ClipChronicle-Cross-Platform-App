#!/usr/bin/env bash
# =============================================================================
# lint.sh
#
# Runs ESLint + Prettier checks across all packages. Exits non-zero on issues.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Running ESLint + Prettier across monorepo..."
cd "$ROOT_DIR"

# Lint staged files and entire codebase
pnpm lint

echo "✅ Lint passed with no errors!"
