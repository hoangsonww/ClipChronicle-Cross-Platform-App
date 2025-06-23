#!/usr/bin/env bash
# =============================================================================
# test.sh
#
# Executes unit tests (Vitest), integration tests (Playwright), and any e2e.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LANDING_DIR="$ROOT_DIR/clipchronicle-landing"
ELECTRON_DIR="$ROOT_DIR/electron-app"
EXT_DIR="$ROOT_DIR/extension"

print_header() {
  echo
  echo "------------------------------------------------------------------------"
  echo " $1"
  echo "------------------------------------------------------------------------"
}

# Unit Tests
print_header "Running Unit Tests (Vitest)"
cd "$ROOT_DIR"
pnpm test -- --coverage

# Electron / Native
print_header "Testing Electron App"
cd "$ELECTRON_DIR"
pnpm test

# Playwright E2E
print_header "Running Playwright E2E Tests"
pnpm test:e2e

echo
echo "✅ All tests passed!"
