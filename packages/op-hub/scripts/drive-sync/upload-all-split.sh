#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# upload-all-split.sh — Upload all downloaded drives to a target switchboard,
# routing each through upload-split.sh so an operator drive that bundles a
# service-offering catalog is split into a builder-team-admin drive + a
# service-offering-app drive (offerings deduped to one per title). Document
# names are stripped of "(copy)" markers by upload.sh. After uploading,
# phase3-remap.py fixes cross-drive references. Drives already on the target
# (by slug) are skipped, so this is safe to re-run.
#
# Discovers data folders by scanning $DATA_DIR for any subdirectory that
# contains a `drive-info.json`. The slug, name, and `preferredEditor` are
# read from that file, so data folders can be named with the original UUID
# or with the slug — both work. Drives are uploaded in dependency-safe
# order so cross-drive references resolve.
#
# Usage:
#   SB_PROFILE=local bash scripts/drive-sync/upload-all-split.sh [options]
#
# Options:
#   --target <profile>  Switchboard profile to use (default: local)
#   --data-dir <dir>    Data directory (default: scripts/drive-sync/data)
#   --skip <slugs>      Comma-separated drive slugs to skip
#   --only <slugs>      Comma-separated drive slugs to upload (overrides defaults)
#   --dry-run           Show what would be uploaded without doing it
#
# Renown signing (creator attribution), forwarded to upload.sh via env:
#   RENOWN_ADDRESS=0x…  Wallet to record as creator on every operation. When
#                       set, each created drive/document carries context.signer
#                       so `who-created.mjs <id>` reverse-looks-up the creator.
#                       (did:key is auto-derived from .ph/.keypair.json.)
#   Example:
#     RENOWN_ADDRESS=0x… SB_PROFILE=local bash scripts/drive-sync/upload-all-split.sh --target local
#   Note: the phase-3 cross-drive reference remap is NOT signed (post-creation
#   edits via the CLI); creation + state operations are.
###############################################################################

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="${SCRIPT_DIR}/data"
TARGET_PROFILE="${SB_PROFILE:-local}"
SKIP_SLUGS=""
ONLY_SLUGS=""
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --target)   TARGET_PROFILE="$2"; shift 2 ;;
    --data-dir) DATA_DIR="$2"; shift 2 ;;
    --skip)     SKIP_SLUGS="$2"; shift 2 ;;
    --only)     ONLY_SLUGS="$2"; shift 2 ;;
    --dry-run)  DRY_RUN=true; shift ;;
    *)          echo "Unknown option: $1"; exit 1 ;;
  esac
done

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${GREEN}  ✓${NC} $*"; }
warn() { echo -e "${YELLOW}  !${NC} $*"; }
err()  { echo -e "${RED}  ✗${NC} $*" >&2; }
step() { echo -e "\n${CYAN}━━━ $* ━━━${NC}"; }

# Dependency-safe priority. Lower number uploads first.
# Anything not in this map falls into the trailing bucket (priority 99),
# uploaded after the known drives in alphabetical order.
#
# The builders drive on bai-dev uses its UUID as its slug
# (933f946f-5fab-4dea-85ea-aeb85f1f2fd1) — that's why the UUID
# appears alongside the human-readable slugs here.
priority_for() {
  case "$1" in
    powerhouse-network-admin)              echo 1 ;;
    933f946f-5fab-4dea-85ea-aeb85f1f2fd1)  echo 2 ;;
    powerhouse-rgh-operator-admin)         echo 3 ;;
    bai-team-admin)                        echo 4 ;;
    growth-team-admin)                     echo 5 ;;
    core-dev-team-admin)                   echo 6 ;;
    teeps-team-admin)                      echo 7 ;;
    powerhouse-genesis-operational-hub)    echo 8 ;;
    *)                                     echo 99 ;;
  esac
}

# Switch to target profile up-front
switchboard config use "$TARGET_PROFILE" >/dev/null 2>&1

step "Upload All Drives"
echo -e "  ${CYAN}Profile:${NC} $TARGET_PROFILE"
echo -e "  ${CYAN}Data:${NC}    $DATA_DIR"

# Preflight
switchboard ping --format json >/dev/null 2>&1 || { err "Switchboard not reachable"; exit 1; }
log "Switchboard reachable"

# Build the upload list by scanning data folders for drive-info.json
IFS=',' read -ra SKIP_ARRAY <<< "$SKIP_SLUGS"
declare -A SKIP_SET
for s in "${SKIP_ARRAY[@]}"; do
  [[ -n "$s" ]] && SKIP_SET["$s"]=1
done

IFS=',' read -ra ONLY_ARRAY <<< "$ONLY_SLUGS"
declare -A ONLY_SET
for s in "${ONLY_ARRAY[@]}"; do
  [[ -n "$s" ]] && ONLY_SET["$s"]=1
done

# Emit `<priority>|<slug>|<name>|<preferredEditor>|<dir>` per drive.
# Using `|` (non-whitespace) as the delimiter so that empty fields
# (e.g., preferredEditor=null) are preserved by bash's `read` — tab
# delimiters get collapsed when IFS is whitespace.
SEP=$'\x1f'
DRIVE_LIST=$(
  for dir in "$DATA_DIR"/*/; do
    [[ -f "$dir/drive-info.json" ]] || continue
    SEP="$SEP" python3 - "$dir" <<'PY'
import json, os, sys
sep = os.environ["SEP"]
d = sys.argv[1].rstrip("/")
di = json.load(open(os.path.join(d, "drive-info.json")))
slug = (
    di.get("slug")
    or di.get("header", {}).get("slug")
    or os.path.basename(d)
)
name = (
    di.get("name")
    or di.get("header", {}).get("name")
    or slug
)
editor = di.get("preferredEditor") or di.get("header", {}).get("meta", {}).get("preferredEditor") or ""
print(f"{slug}{sep}{name}{sep}{editor}{sep}{d}")
PY
  done |
  while IFS="$SEP" read -r slug name editor dir; do
    p=$(priority_for "$slug")
    printf "%d%s%s%s%s%s%s%s%s\n" "$p" "$SEP" "$slug" "$SEP" "$name" "$SEP" "$editor" "$SEP" "$dir"
  done |
  sort -t "$SEP" -k1,1n -k2,2
)

TOTAL=0
declare -a UPLOAD_LINES
while IFS="$SEP" read -r priority slug name editor dir; do
  [[ -z "$slug" ]] && continue

  # Skip if in skip set
  [[ -n "${SKIP_SET[$slug]:-}" ]] && continue

  # If --only is set, only include listed slugs
  if [[ ${#ONLY_ARRAY[@]} -gt 0 ]] && [[ -n "${ONLY_ARRAY[0]:-}" ]] && [[ -z "${ONLY_SET[$slug]+x}" ]]; then
    continue
  fi

  docs=$(python3 -c "import json; m=json.load(open('$dir/manifest.json' if __import__('os').path.exists('$dir/manifest.json') else '/dev/null')); print(len(m.get('documents', [])))" 2>/dev/null || echo "?")
  folders=$(python3 -c "import json; m=json.load(open('$dir/manifest.json' if __import__('os').path.exists('$dir/manifest.json') else '/dev/null')); print(len(m.get('folders', [])))" 2>/dev/null || echo "?")

  TOTAL=$((TOTAL + 1))
  UPLOAD_LINES+=("$slug$SEP$name$SEP$editor$SEP$dir")
  echo -e "  ${CYAN}[$TOTAL]${NC} $name ($slug) — $docs docs, $folders folders, editor=${editor:-(default)}"
done <<< "$DRIVE_LIST"

echo ""
echo -e "  ${CYAN}Total:${NC} $TOTAL drives to upload"

if $DRY_RUN; then
  log "Dry run — nothing uploaded"
  exit 0
fi

if [[ $TOTAL -eq 0 ]]; then
  warn "No drives matched — nothing to upload"
  exit 0
fi

# Auto-confirm for local profiles
PROFILE_URL=$(switchboard config show --format json 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('url',''))" 2>/dev/null)
if ! echo "$PROFILE_URL" | grep -qE "localhost|127\.0\.0\.1"; then
  echo ""
  echo -e "  ${RED}⚠  This is a REMOTE target: $PROFILE_URL${NC}"
  read -r -p "  Type 'yes' to confirm: " confirmation
  if [ "$confirmation" != "yes" ]; then
    err "Aborted"
    exit 1
  fi
fi

# Slugs already on the target — skip them so re-runs don't duplicate drives.
EXISTING_SLUGS=$(switchboard drives list --format json 2>/dev/null \
  | python3 -c "import sys,json; print(' '.join(d.get('slug','') for d in json.load(sys.stdin)))" 2>/dev/null || echo "")

SUCCEEDED=0
FAILED=0
SKIPPED=0

for line in "${UPLOAD_LINES[@]}"; do
  IFS="$SEP" read -r slug name editor dir <<< "$line"

  if [[ " $EXISTING_SLUGS " == *" $slug "* ]]; then
    warn "Skipping $name ($slug) — already on target"
    SKIPPED=$((SKIPPED + 1))
    continue
  fi

  step "Uploading: $name ($slug) → editor=${editor:-(default)}"

  # upload-split.sh splits offering drives (builder-team-admin + service-
  # offering-app); non-offering drives pass straight through to upload.sh.
  if SB_PROFILE="$TARGET_PROFILE" PREFERRED_EDITOR="$editor" \
       bash "$SCRIPT_DIR/upload-split.sh" "$dir" "$name" 2>&1; then
    log "Completed: $name"
    SUCCEEDED=$((SUCCEEDED + 1))
  else
    err "Failed: $name"
    FAILED=$((FAILED + 1))
  fi
done

step "Upload All — Summary"
echo -e "  ${GREEN}✓${NC} Succeeded: $SUCCEEDED"
[[ $SKIPPED -gt 0 ]] && echo -e "  ${YELLOW}!${NC} Skipped (already present): $SKIPPED"
[[ $FAILED -gt 0 ]] && echo -e "  ${RED}✗${NC} Failed: $FAILED"
echo -e "  ${CYAN}Total:${NC} $TOTAL drives"

# Phase 3: cross-drive PHID remap.
# Per-drive id-maps are written by upload.sh. Merge them into a single
# map and run phase3-remap.py so cross-drive refs (e.g. builder-profile
# contributors[] and operationalHubMember.phid) point at the freshly
# created document IDs on the target — they change on every upload.
if [[ $SUCCEEDED -gt 0 ]]; then
  step "Phase 3: cross-drive PHID remap"
  if python3 - "$DATA_DIR" <<'PY'
import json, os, sys
data_dir = sys.argv[1]
merged = {}
for d in sorted(os.listdir(data_dir)):
    p = os.path.join(data_dir, d, "id-map.json")
    if not os.path.isfile(p):
        continue
    with open(p) as f:
        merged.update(json.load(f))
out = os.path.join(data_dir, "merged-id-map.json")
with open(out, "w") as f:
    json.dump(merged, f, indent=2)
print(f"  merged {len(merged)} ids -> {out}")
PY
  then
    if TARGET_PROFILE="$TARGET_PROFILE" DATA_DIR="$DATA_DIR" \
         python3 "$SCRIPT_DIR/phase3-remap.py"; then
      log "Phase 3 remap completed"
    else
      err "Phase 3 remap failed (drives are uploaded, but cross-drive refs may be stale)"
    fi
  else
    err "Failed to build merged-id-map.json — skipping Phase 3 remap"
  fi
fi

step "Drives on target"
switchboard drives list --format json 2>/dev/null | python3 -c "
import sys, json
drives = json.load(sys.stdin)
for d in drives:
    name = d.get('name', d.get('slug', '?'))
    slug = d.get('slug', '?')
    editor = d.get('preferredEditor') or d.get('header',{}).get('meta',{}).get('preferredEditor') or '-'
    print(f'  {name:<40s} {slug:<55s} editor={editor}')
" 2>/dev/null || true

echo ""
log "Done!"
