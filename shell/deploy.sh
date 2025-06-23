#!/usr/bin/env bash
# =============================================================================
# deploy.sh
#
# Orchestrates deployment:
#  - Landing site → S3 + CloudFront invalidation
#  - Electron artifacts → S3 releases
#  - (Extension built locally; instruct manual upload)
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

# AWS configs
: "${AWS_LANDING_BUCKET:?Need to set AWS_LANDING_BUCKET}"
: "${AWS_CF_ID:?Need to set AWS_CF_ID}"
: "${AWS_ELECTRON_BUCKET:?Need to set AWS_ELECTRON_BUCKET}"
VERSION="${VERSION:-$(git describe --tags --abbrev=0 || echo "0.0.0")}"

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

# Deploy Landing
print_header "Deploying Landing Site to S3 and invalidating CloudFront"
cd "$LANDING_DIR"
pnpm build && pnpm export
aws s3 sync out/ "s3://${AWS_LANDING_BUCKET}/" \
  --delete --cache-control "max-age=0,public,must-revalidate"
aws cloudfront create-invalidation \
  --distribution-id "${AWS_CF_ID}" \
  --paths "/*"

# Deploy Electron
print_header "Uploading Electron Artifacts to S3"
cd "$ELECTRON_DIR"
pnpm make
aws s3 cp out/ "s3://${AWS_ELECTRON_BUCKET}/releases/${VERSION}/" \
  --recursive --acl public-read

# Extension Notice
print_header "Browser Extension"
echo "Built extension available at ${EXT_DIR}/dist/"
echo "Please upload the ZIP to Chrome Web Store manually."

echo
echo "✅ Deployment complete!"
