#!/usr/bin/env bash
set -euo pipefail

# Usage: ./backup-db.sh <LOCAL_DB_PATH> <S3_BUCKET> [PREFIX]
LOCAL_DB=$1
S3_BUCKET=$2
PREFIX=${3:-backups}

TIMESTAMP=$(date -u +"%Y-%m-%dT%H%M%SZ")
BACKUP_NAME="clipchronicle-db-${TIMESTAMP}.sqlite3"

echo "🗄  Compressing local DB..."
gzip -c "${LOCAL_DB}" > "/tmp/${BACKUP_NAME}.gz"

echo "🚚 Uploading backup to s3://${S3_BUCKET}/${PREFIX}/${BACKUP_NAME}.gz..."
aws s3 cp "/tmp/${BACKUP_NAME}.gz" "s3://${S3_BUCKET}/${PREFIX}/${BACKUP_NAME}.gz" \
  --acl private

echo "🧹 Cleaning up..."
rm "/tmp/${BACKUP_NAME}.gz"

echo "✅ Backup completed at ${TIMESTAMP}"
