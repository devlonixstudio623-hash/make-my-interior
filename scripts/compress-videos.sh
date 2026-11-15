#!/usr/bin/env bash
# Compress hero & Instagram reel videos under 3 MB for fast mobile loading.
# Requires ffmpeg: https://ffmpeg.org/

set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: ./scripts/compress-videos.sh <input.mp4> <output.mp4> [hero|reel]"
  exit 1
fi

INPUT="$1"
OUTPUT="$2"
MODE="${3:-reel}"

if [ "$MODE" = "hero" ]; then
  # 16:9 Landscape muted hero loop (target < 3 MB for 8-12s clip)
  ffmpeg -y -i "$INPUT" \
    -vf "scale='min(1280,iw)':-2" \
    -c:v libx264 -preset slow -crf 28 -movflags +faststart \
    -an "$OUTPUT"
else
  # 9:16 Vertical Instagram Reel with AAC audio (target < 3 MB)
  ffmpeg -y -i "$INPUT" \
    -vf "scale='min(720,iw)':-2" \
    -c:v libx264 -preset slow -crf 28 -movflags +faststart \
    -c:a aac -b:a 96k "$OUTPUT"
fi

echo "Done! File size:"
ls -lh "$OUTPUT"
