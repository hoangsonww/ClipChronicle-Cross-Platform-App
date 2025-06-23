#!/usr/bin/env bash
# =============================================================================
# changelog.sh
#
# Generates a markdown CHANGELOG.md from git tags and commits since last tag.
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -z "$LAST_TAG" ]; then
  RANGE="HEAD"
else
  RANGE="$LAST_TAG..HEAD"
fi

cat <<EOF > CHANGELOG.md
# Changelog

## Unreleased

$(git log $RANGE --pretty=format:'- %s (%an)')
EOF

echo "✅ CHANGELOG.md updated with commits from ${RANGE}"
