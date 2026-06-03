#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# download.sh — Download a drive's structure and document states
#
# Uses only switchboard CLI commands (no model-specific GraphQL).
#
# Usage:
#   bash download.sh <drive-slug> [output-dir]
#
# Environment:
#   EXCLUDE_IDS   Comma-separated doc IDs to skip (default: none)
#   SB_PROFILE    Switchboard profile to use (optional)
#
# Example:
#   SB_PROFILE=bai-dev bash download.sh powerhouse-rgh-operator-admin
###############################################################################

DRIVE_SLUG="${1:?Usage: $0 <drive-slug> [output-dir]}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_DIR="${2:-$SCRIPT_DIR/data/$DRIVE_SLUG}"
EXCLUDE_IDS="${EXCLUDE_IDS:-}"

# Use profile if set
if [ -n "${SB_PROFILE:-}" ]; then
  switchboard config use "$SB_PROFILE" >/dev/null 2>&1
fi

source "$SCRIPT_DIR/lib/common.sh"

# ── Preflight ────────────────────────────────────────────────────────────────

step "Preflight"
preflight

# ── Check existing download ──────────────────────────────────────────────────

if [ -f "$OUTPUT_DIR/manifest.json" ]; then
  log "Data already exists at $OUTPUT_DIR — skipping download"
  log "Delete the directory to re-download."
  exit 0
fi

mkdir -p "$OUTPUT_DIR/states" "$OUTPUT_DIR/ops"

# ── Download drive tree ──────────────────────────────────────────────────────

step "Download drive tree"

switchboard docs tree "$DRIVE_SLUG" --format json > "$OUTPUT_DIR/tree.json" 2>&1
log "Drive tree saved"

switchboard drives get "$DRIVE_SLUG" --format json > "$OUTPUT_DIR/drive-info.json" 2>&1 || true
log "Drive info saved"

# ── Download document states ─────────────────────────────────────────────────

step "Download document states"

export OUTPUT_DIR DRIVE_SLUG EXCLUDE_IDS

python3 << 'PYEOF'
import subprocess, json, sys, os, datetime

output_dir = os.environ["OUTPUT_DIR"]
drive_slug = os.environ["DRIVE_SLUG"]
exclude_ids = set(filter(None, os.environ.get("EXCLUDE_IDS", "").split(",")))

G = "\033[0;32m"
Y = "\033[1;33m"
R = "\033[0;31m"
NC = "\033[0m"

# ── Read tree ────────────────────────────────────────────────────────────────

with open(os.path.join(output_dir, "tree.json")) as f:
    tree = json.load(f)

# Read drive name
drive_name = drive_slug
try:
    with open(os.path.join(output_dir, "drive-info.json")) as f:
        info = json.load(f)
        drive_name = info.get("name", drive_slug)
except Exception:
    pass

# Handle both old format (tree.document.state.global.nodes) and new format (tree.nodes)
try:
    nodes = tree["document"]["state"]["global"]["nodes"]
except (KeyError, TypeError):
    nodes = tree["nodes"]
folders = [n for n in nodes if n["kind"] == "folder"]
files_all = [n for n in nodes if n["kind"] == "file"]
files = [n for n in files_all if n["id"] not in exclude_ids]
excluded = [n for n in files_all if n["id"] in exclude_ids]

print(f"  Found {len(folders)} folders, {len(files)} documents" +
      (f" (excluded {len(excluded)})" if excluded else ""))

# ── Fetch each document state using CLI ──────────────────────────────────────

downloaded = 0
failed = 0

for f in files:
    doc_id = f["id"]
    doc_type = f.get("documentType") or f.get("type") or "unknown"

    try:
        result = subprocess.run(
            ["switchboard", "docs", "get", doc_id, "--state", "--format", "json"],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode != 0:
            raise RuntimeError(result.stderr[:200])

        doc_data = json.loads(result.stdout)
        state = doc_data.get("state", {}).get("global")

        state_path = os.path.join(output_dir, "states", f"{doc_id}.json")
        with open(state_path, "w") as fp:
            json.dump(state, fp, indent=2)

        # Fetch operation history
        ops_result = subprocess.run(
            ["switchboard", "ops", doc_id, "--format", "json"],
            capture_output=True, text=True, timeout=120,
        )
        if ops_result.returncode == 0:
            ops_data = json.loads(ops_result.stdout)
            ops_path = os.path.join(output_dir, "ops", f"{doc_id}.json")
            with open(ops_path, "w") as fp:
                json.dump(ops_data, fp, indent=2)
            ops_count = len(ops_data) if isinstance(ops_data, list) else 0
        else:
            ops_count = 0

        downloaded += 1
        print(f"  {G}✓{NC} {f['name']} ({doc_type}) — state + {ops_count} ops")

    except Exception as e:
        # Save null state so manifest is consistent
        state_path = os.path.join(output_dir, "states", f"{doc_id}.json")
        with open(state_path, "w") as fp:
            json.dump(None, fp)
        failed += 1
        print(f"  {R}✗{NC} {f['name']} ({doc_type}) — {e}", file=sys.stderr)

# ── Save manifest ────────────────────────────────────────────────────────────

manifest = {
    "source": {
        "slug": drive_slug,
        "name": drive_name,
        "downloadedAt": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z"),
    },
    "excluded": sorted(exclude_ids),
    "folders": [
        {
            "id": f["id"],
            "name": f["name"],
            "parentFolder": f.get("parentFolder"),
        }
        for f in folders
    ],
    "documents": [
        {
            "id": f["id"],
            "name": f["name"],
            "type": f.get("documentType") or f.get("type") or "unknown",
            "parentFolder": f.get("parentFolder"),
        }
        for f in files
    ],
}

with open(os.path.join(output_dir, "manifest.json"), "w") as fp:
    json.dump(manifest, fp, indent=2)

print(f"\n  {G}✓{NC} Downloaded {downloaded} states" +
      (f", {failed} failed" if failed else ""))
PYEOF

# ── Done ─────────────────────────────────────────────────────────────────────

step "Download complete"
log "Data saved to: $OUTPUT_DIR"
log "Next: run upload.sh to create this drive on a target switchboard"
