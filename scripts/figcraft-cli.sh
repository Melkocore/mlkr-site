#!/usr/bin/env bash
set -euo pipefail

if command -v figcraft-cli >/dev/null 2>&1; then
  exec figcraft-cli "$@"
fi

APPIMG="${FIGCRAFT_APPIMAGE:-/home/ghashgul/Applications/figcraft-0.12.1-linux-x86_64.AppImage}"
if [[ -x "$APPIMG" ]]; then
  exec "$APPIMG" cli "$@"
fi

echo "figcraft-cli not found. Install FigCraft or set FIGCRAFT_APPIMAGE, or add figcraft-cli to PATH." >&2
exit 127
