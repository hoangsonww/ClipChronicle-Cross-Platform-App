#!/usr/bin/env bash
# =============================================================================
# backup.sh
#
# Compresses & uploads the local SQLite database to S3 with timestamped filename.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

: "${LOCAL_DB_PATH:?Need to set LOCAL_DB_PATH}"
: "${AWS_BACKUP_BUCKET:?Need to set AWS_BACKUP_BUCKET}"
PREFIX="${BACKUP_PREFIX:-backups}"

TIMESTAMP=$(date -u +"%Y-%m-%dT%H%M%SZ")
FILENAME="clipchronicle-db-${TIMESTAMP}.sqlite3.gz"
TMP="/tmp/${FILENAME}"

echo "🔒 Compressing database: ${LOCAL_DB_PATH}"
gzip -c "${LOCAL_DB_PATH}" > "${TMP}"

echo "🚚 Uploading to s3://${AWS_BACKUP_BUCKET}/${PREFIX}/${FILENAME}"
aws s3 cp "${TMP}" "s3://${AWS_BACKUP_BUCKET}/${PREFIX}/${FILENAME}" --acl private

echo "🧹 Removing local temp file"
rm -f "${TMP}"

echo "✅ Backup completed at ${TIMESTAMP}"
