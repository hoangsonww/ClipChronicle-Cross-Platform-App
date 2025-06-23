#!/usr/bin/env bash
# =============================================================================
# release.sh
#
# Bumps version, creates git tag, pushes, and triggers deploy script.
# Usage: ./release.sh <new-version>
# =============================================================================

set -euo pipefail
IFS=$'\n\t'

if [ $# -ne 1 ]; then
  echo "Usage: $0 <new-version>"
  exit 1
fi

NEW_VERSION="$1"
echo "🔖 Bumping version to ${NEW_VERSION}"

# Update package.json in all workspaces
for pkg in clipchronicle-landing electron-app extension; do
  jq --arg v "$NEW_VERSION" '.version=$v' $pkg/package.json > tmp.$$ && mv tmp.$$ $pkg/package.json
  echo " → Updated $pkg/package.json"
done

# Changelog
./shell/changelog.sh

git add CHANGELOG.md
git commit -am "chore: release v${NEW_VERSION}"
git tag "v${NEW_VERSION}"
git push origin main --tags

# Trigger deploy
./shell/deploy.sh
