#!/usr/bin/env bash
set -euo pipefail

# Usage: ./deploy-landing.sh <S3_BUCKET> <CLOUDFRONT_DISTRIBUTION_ID>
S3_BUCKET=$1
CF_DIST_ID=$2
BUILD_DIR="clipchronicle-landing/.next"

echo "🔧 Installing dependencies..."
cd clipchronicle-landing
pnpm install

echo "📦 Building Next.js static output..."
pnpm build
pnpm export

echo "🚀 Syncing to S3 bucket ${S3_BUCKET}..."
aws s3 sync out/ s3://${S3_BUCKET}/ \
  --delete \
  --cache-control "max-age=0,public,must-revalidate"

echo "🧹 Invalidating CloudFront distribution ${CF_DIST_ID}..."
aws cloudfront create-invalidation \
  --distribution-id ${CF_DIST_ID} \
  --paths "/*"

echo "✅ Landing site deployed!"
