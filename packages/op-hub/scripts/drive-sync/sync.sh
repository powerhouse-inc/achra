#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# sync.sh — Orchestrator: download drives from source, upload to target
#
# Handles multi-drive sync with cross-drive ID remapping (e.g., the operator
# drive's builder-profile contributors reference builder IDs from the builders
# drive).
#
# Usage:
#   bash sync.sh --source <profile> --target <profile> [options]
#
# Options:
#   --source <profile>   Source switchboard profile (required)
#   --target <profile>   Target switchboard profile (required)
#   --drives <slugs>     Comma-separated drive slugs to sync (default: see below)
#   --data-dir <dir>     Directory for downloaded data (default: ./data)
#   --exclude <ids>      Comma-separated doc IDs to exclude from download
#   --clean              Delete existing data before downloading
#
# Default drives (bai-dev demo set, 8 drives):
#   powerhouse-network-admin
#   933f946f-5fab-4dea-85ea-aeb85f1f2fd1   (builders — slug is its UUID)
#   powerhouse-rgh-operator-admin
#   bai-team-admin
#   growth-team-admin
#   core-dev-team-admin
#   teeps-team-admin
#   powerhouse-genesis-operational-hub
#
# Example:
#   bash scripts/drive-sync/sync.sh \
#     --source bai-dev \
#     --target local
###############################################################################

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/lib/common.sh"

# ── Parse arguments ──────────────────────────────────────────────────────────

SOURCE_PROFILE=""
TARGET_PROFILE=""
DRIVES="powerhouse-network-admin,933f946f-5fab-4dea-85ea-aeb85f1f2fd1,powerhouse-rgh-operator-admin,bai-team-admin,growth-team-admin,core-dev-team-admin,teeps-team-admin,powerhouse-genesis-operational-hub"
DATA_DIR="$SCRIPT_DIR/data"
EXCLUDE_IDS=""
CLEAN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source)  SOURCE_PROFILE="$2"; shift 2 ;;
    --target)  TARGET_PROFILE="$2"; shift 2 ;;
    --drives)  DRIVES="$2"; shift 2 ;;
    --data-dir) DATA_DIR="$2"; shift 2 ;;
    --exclude) EXCLUDE_IDS="$2"; shift 2 ;;
    --clean)   CLEAN=true; shift ;;
    *) die "Unknown option: $1" ;;
  esac
done

[ -n "$SOURCE_PROFILE" ] || die "Missing --source <profile>"
[ -n "$TARGET_PROFILE" ] || die "Missing --target <profile>"

IFS=',' read -ra DRIVE_SLUGS <<< "$DRIVES"

step "Drive Sync"
log "Source: $SOURCE_PROFILE"
log "Target: $TARGET_PROFILE"
log "Drives: ${DRIVE_SLUGS[*]}"
log "Data dir: $DATA_DIR"

# ── Safety: prevent source == target ─────────────────────────────────────────

if [ "$SOURCE_PROFILE" = "$TARGET_PROFILE" ]; then
  die "Source and target profiles are the same ('$SOURCE_PROFILE'). This would be destructive. Aborting."
fi

# Verify target is what we expect before doing anything
switchboard config use "$TARGET_PROFILE" >/dev/null 2>&1
confirm_target "upload drives/documents to"

# Switch back — download phase will set its own profile
switchboard config use "$SOURCE_PROFILE" >/dev/null 2>&1

# ── Phase 1: Download all drives from source ─────────────────────────────────

step "Phase 1: Download drives from source"

for slug in "${DRIVE_SLUGS[@]}"; do
  echo ""
  log "Downloading: $slug"

  if [ "$CLEAN" = true ] && [ -d "$DATA_DIR/$slug" ]; then
    rm -rf "$DATA_DIR/$slug"
    log "Cleaned existing data for $slug"
  fi

  SB_PROFILE="$SOURCE_PROFILE" EXCLUDE_IDS="$EXCLUDE_IDS" \
    bash "$SCRIPT_DIR/download.sh" "$slug" "$DATA_DIR/$slug"
done

# ── Phase 2: Upload all drives to target (split pattern) ─────────────────────

step "Phase 2: Upload drives to target (split pattern)"

# Hand the upload off to upload-all-split.sh — the current op-hub pattern. It
# uploads every drive now sitting in $DATA_DIR (just populated by phase 1) in
# dependency-safe order, splitting any operator drive that bundles a service-
# offering catalog into a team-admin + service-offering pair, merges the per-
# drive id-maps, and runs phase3-remap.py to fix cross-drive references
# (builder-profile contributors, operationalHubMember, etc.). Drives already on
# the target (matched by slug) are skipped, so this stays safe to re-run.

# Safety: verify we're targeting the right profile before uploading.
switchboard config use "$TARGET_PROFILE" >/dev/null 2>&1
assert_profile "$TARGET_PROFILE"

SB_PROFILE="$TARGET_PROFILE" \
  bash "$SCRIPT_DIR/upload-all-split.sh" \
    --target "$TARGET_PROFILE" \
    --data-dir "$DATA_DIR"

# ── Done ─────────────────────────────────────────────────────────────────────

step "Sync complete"
log "All drives synced from $SOURCE_PROFILE → $TARGET_PROFILE"
echo ""
log "Done!"
