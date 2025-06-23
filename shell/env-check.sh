#!/usr/bin/env bash
# =============================================================================
# env-check.sh
#
# Verifies presence and validity of all required environment variables.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

required=(
  AWS_LANDING_BUCKET
  AWS_CF_ID
  AWS_ELECTRON_BUCKET
  AWS_BACKUP_BUCKET
  LOCAL_DB_PATH
)

missing=()
for var in "${required[@]}"; do
  if [ -z "${!var:-}" ]; then
    missing+=("$var")
  fi
done

if [ ${#missing[@]} -ne 0 ]; then
  echo "❌ Missing environment variables:"
  for v in "${missing[@]}"; do echo " - $v"; done
  exit 1
else
  echo "✅ All required environment variables are set."
fi
