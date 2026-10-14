#!/usr/bin/env bash
# Rebuilds the downloadable CVs (English and Swedish) from index.html.
# Run after editing the site: ./make-pdf.sh
set -euo pipefail
cd "$(dirname "$0")"
browser=$(command -v chromium || command -v google-chrome-stable || command -v google-chrome)
for lang in en sv; do
  profile=$(mktemp -d)
  "$browser" --headless --disable-gpu --user-data-dir="$profile" --accept-lang="$lang" \
    --no-pdf-header-footer --virtual-time-budget=5000 \
    --print-to-pdf="Robin-Sjodin-CV-$lang.pdf" "file://$PWD/index.html" 2>/dev/null
  rm -rf "$profile"
  echo "Wrote Robin-Sjodin-CV-$lang.pdf"
done
