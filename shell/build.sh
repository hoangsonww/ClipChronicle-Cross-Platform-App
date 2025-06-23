#!/usr/bin/env bash
# =============================================================================
# build.sh
#
# Builds landing site (static export), electron app (native + packaging),
# and browser extension. Outputs consolidated logs.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LANDING_DIR="$ROOT_DIR/clipchronicle-landing"
ELECTRON_DIR="$ROOT_DIR/electron-app"
EXT_DIR="$ROOT_DIR/extension"

print_header() {
  echo
  echo "========================================================================"
  echo " $1"
  echo "========================================================================"
}

# Build Landing Site
print_header "Building Landing Site"
cd "$LANDING_DIR"
pnpm build
pnpm export
echo "→ landing out/ directory ready"

# Build Electron Native Module
print_header "Re-building Native Clipboard Module"
cd "$ELECTRON_DIR/native-clipboard"
cargo build --release

# Build Electron App
print_header "Packaging Electron App"
cd "$ELECTRON_DIR"
pnpm make
echo "→ electron-app/out/ contains installers"

# Build Extension
print_header "Building Browser Extension"
cd "$EXT_DIR"
pnpm build
echo "→ extension/dist/ ready"

echo
echo "✅ Build process completed successfully!"
