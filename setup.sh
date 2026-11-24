#!/usr/bin/env bash
#
# Bela Learning – first-run setup.
# Writes bela.config.json and regenerates js/config/seed.js.
# Needs Node.js 18+ (same requirement as the tests).
#
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Bela setup needs Node.js 18 or newer."
  echo "Install it from https://nodejs.org/ and run ./setup.sh again."
  exit 1
fi

exec node tools/setup.js "$@"
