#!/usr/bin/env bash
# =============================================================================
# install.sh
#
# Installs all prerequisites and project dependencies for landing site,
# electron app, and extension. Idempotent and verbose.
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

# 1. Ensure system prerequisites
print_header "Checking system prerequisites"
command -v node   >/dev/null 2>&1 || { echo "Node.js not found; install from https://nodejs.org"; exit 1; }
command -v pnpm   >/dev/null 2>&1 || { echo "pnpm not found; installing globally..."; npm install -g pnpm; }
command -v cargo  >/dev/null 2>&1 || { echo "Rust toolchain not found; please install Rust from https://rustup.rs/"; exit 1; }
command -v aws    >/dev/null 2>&1 || { echo "AWS CLI not found; please install AWS CLI v2"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "Docker not found; please install Docker"; exit 1; }

# 2. Install landing dependencies
print_header "Installing landing site dependencies"
cd "$LANDING_DIR"
pnpm install

# 3. Install electron app dependencies & native module
print_header "Installing electron-app dependencies"
cd "$ELECTRON_DIR"
pnpm install

print_header "Building native clipboard module"
cd native-clipboard
cargo build --release

# 4. Install extension dependencies
print_header "Installing extension dependencies"
cd "$EXT_DIR"
pnpm install

echo
echo "✅ All dependencies installed successfully!"
