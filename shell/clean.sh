#!/usr/bin/env bash
# =============================================================================
# clean.sh
#
# Removes build artifacts, caches, logs, and temporary files across all packages.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo "🧹 Cleaning build outputs and caches..."

# Landing
rm -rf "${ROOT_DIR}/clipchronicle-landing/.next" "${ROOT_DIR}/clipchronicle-landing/out"

# Electron
rm -rf \
  "${ROOT_DIR}/electron-app/out" \
  "${ROOT_DIR}/electron-app/dist" \
  "${ROOT_DIR}/electron-app/native-clipboard/target"

# Extension
rm -rf "${ROOT_DIR}/extension/dist"

# Node modules & pnpm store (optional)
# rm -rf "${ROOT_DIR}/node_modules"
# pnpm store prune

echo "✅ Clean complete."
