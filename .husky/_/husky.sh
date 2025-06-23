#!/usr/bin/env bash
# husky-shim
command_exists () { command -v "$1" >/dev/null 2>&1; }
hook_name=$(basename "$0")
if [ -n "$HUSKY_DEBUG" ]; then set -x; fi
if [ -f .huskyrc ] && command_exists husky-run; then
  husky-run "$hook_name" "$@"
else
  . "$(dirname "$0")/../../node_modules/husky/lib/runner.sh" "$hook_name" "$@"
fi
