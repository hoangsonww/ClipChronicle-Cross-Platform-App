#!/usr/bin/env bash
# =============================================================================
# docs.sh
#
# Generates API docs (TypeDoc) for landing, electron, and extension.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

ROOT=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
OUT_DIR="$ROOT/docs"

echo "📚 Cleaning old docs"
rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

for pkg in clipchronicle-landing electron-app extension; do
  echo "→ Generating docs for $pkg"
  npx typedoc --options $pkg/typedoc.json --out "$OUT_DIR/$pkg" "$pkg/src"
done

echo "✅ Docs generated in $OUT_DIR/"
