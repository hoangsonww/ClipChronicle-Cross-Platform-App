#!/usr/bin/env bash
# =============================================================================
# migrate-db.sh
#
# Apply SQL migrations in order to the SQLite DB. Place .sql files in migrations/.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

: "${DB_PATH:?Please set DB_PATH to your SQLite DB file}"
MIGRATIONS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"/../migrations && pwd)"
APPLIED_TABLE="_migrations_applied"

sqlite3 "$DB_PATH" <<SQL
CREATE TABLE IF NOT EXISTS ${APPLIED_TABLE} (
  name TEXT PRIMARY KEY,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
SQL

for file in $(ls "$MIGRATIONS_DIR"/*.sql | sort); do
  name=$(basename "$file")
  already=$(sqlite3 "$DB_PATH" "SELECT COUNT(1) FROM ${APPLIED_TABLE} WHERE name='$name';")
  if [ "$already" -eq 0 ]; then
    echo "Applying migration $name"
    sqlite3 "$DB_PATH" < "$file"
    sqlite3 "$DB_PATH" "INSERT INTO ${APPLIED_TABLE}(name) VALUES('$name');"
  else
    echo "Skipping $name (already applied)"
  fi
done

echo "✅ All migrations applied."
