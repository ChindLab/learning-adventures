#!/usr/bin/env bash
#
# Enables the repository's git hooks for this clone.
# The pre-commit hook runs syntax checks and unit tests (~1–2 s).
#
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -d .git ]; then
  echo "Not a git repository. Run 'git init' first, then 'npm run hooks'."
  exit 1
fi

git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
echo "Git hooks enabled: core.hooksPath = .githooks"
echo "pre-commit runs: npm run check (syntax + unit tests)."
echo "The browser self-test still runs in CI and before a release."
