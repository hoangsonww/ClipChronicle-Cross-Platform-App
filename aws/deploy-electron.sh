#!/usr/bin/env bash
set -euo pipefail

# Usage: ./deploy-electron.sh <S3_BUCKET> <VERSION>
S3_BUCKET=$1
VERSION=$2
ARTIFACT_DIR="electron-app/out"

echo "🔧 Building native module..."
cd electron-app/native-clipboard
cargo build --release

echo "🔧 Installing deps & building Electron app..."
cd ../
pnpm install
pnpm make            # produces out/ClipChronicle-*.{exe,dmg,AppImage}

echo "🚀 Uploading artifacts to S3..."
aws s3 cp ${ARTIFACT_DIR}/ s3://${S3_BUCKET}/releases/${VERSION}/ \
  --recursive \
  --acl public-read

echo "✅ Electron artifacts uploaded to s3://${S3_BUCKET}/releases/${VERSION}/"
