#!/usr/bin/env python3
"""
Verify a drive-sync run by comparing source and target.

For each drive in DRIVES, checks on TARGET_PROFILE that:
  - the drive exists (looked up by NEW id from id-map.json)
  - preferredEditor matches the source
  - node count matches the source manifest
  - by-type node counts match
  - the powerhouse/builders doc (if any) has its builders[] populated
    with PHIDs that all resolve to drives we uploaded
  - a sample of builder-profile.contributors[] entries on the target
    point at uploaded builders-drive docs

Usage:
  TARGET_PROFILE=bai-dev DATA_DIR=scripts/drive-sync/data \
    python3 scripts/drive-sync/verify-sync.py [drive-dir-name ...]

If no drive-dir-names are given, every subdir of DATA_DIR with a manifest.json
is verified.
"""

import json, os, subprocess, sys
from collections import Counter

DATA_DIR = os.environ.get("DATA_DIR", "scripts/drive-sync/data")
TARGET_PROFILE = os.environ.get("TARGET_PROFILE", "bai-dev")

G, Y, R, NC = "\033[0;32m", "\033[1;33m", "\033[0;31m", "\033[0m"
def ok(m):   print(f"  {G}✓{NC} {m}", flush=True)
def warn(m): print(f"  {Y}!{NC} {m}", flush=True)
def fail(m): print(f"  {R}✗{NC} {m}", flush=True)

# upload.sh normalizes legacy editor ids to the current config.id, so the target
# drive carries the new id while the captured drive-info.json still has the old
# one. Apply the same remap to the source value before comparing.
EDITOR_ID_REMAP = {
    "builder-team-admin": "team-admin",
    "service-offering-app": "service-offering",
}
def normalize_editor(editor):
    return EDITOR_ID_REMAP.get(editor, editor)

failures = 0

def sb_json(*args):
    cmd = ["switchboard", "--profile", TARGET_PROFILE] + list(args) + ["--format", "json"]
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    if r.returncode != 0:
        return None, r.stderr.strip()
    try:
        return json.loads(r.stdout), None
    except Exception as e:
        return None, f"JSON parse: {e}"

def load(path):
    with open(path) as f:
        return json.load(f)

# ── Build merged map across all drives we know about ─────────────────────────

merged_map_path = os.path.join(DATA_DIR, "merged-id-map.json")
merged_map = load(merged_map_path) if os.path.exists(merged_map_path) else {}

# Pick which drives to verify
selected = sys.argv[1:]
if not selected:
    selected = sorted(d for d in os.listdir(DATA_DIR)
                      if os.path.isdir(os.path.join(DATA_DIR, d))
                      and os.path.exists(os.path.join(DATA_DIR, d, "manifest.json")))

print(f"\nVerifying {len(selected)} drive(s) on profile '{TARGET_PROFILE}'\n")

for drive_dir in selected:
    print(f"━━━ {drive_dir}")
    drive_path = os.path.join(DATA_DIR, drive_dir)
    manifest_path = os.path.join(drive_path, "manifest.json")
    id_map_path   = os.path.join(drive_path, "id-map.json")
    info_path     = os.path.join(drive_path, "drive-info.json")

    if not os.path.exists(manifest_path):
        fail(f"no manifest.json in {drive_path}"); failures += 1; continue
    if not os.path.exists(id_map_path):
        fail(f"no id-map.json in {drive_path}"); failures += 1; continue

    manifest = load(manifest_path)
    id_map   = load(id_map_path)

    # The drive ID isn't in the manifest — read it from drive-info.json
    src_editor = None
    src_drive_id = None
    src_drive_slug = None
    src_drive_name = None
    if os.path.exists(info_path):
        info = load(info_path)
        src_editor = info.get("preferredEditor")
        src_drive_id = info.get("id")
        src_drive_slug = info.get("slug")
        src_drive_name = info.get("name") or info.get("state",{}).get("global",{}).get("name")
    if not src_drive_id:
        fail(f"no source drive id found in drive-info.json"); failures += 1; continue

    # Drive id mapping isn't recorded in id-map.json. Match the new drive on the
    # target by name (the slug is unstable when source had a UUID-as-slug).
    new_drive_id = None
    all_drives, err = sb_json("drives", "list")
    if not all_drives:
        fail(f"could not list drives on target: {err}"); failures += 1; continue
    for drv in all_drives:
        # Match by source slug first (most precise), else by name.
        if src_drive_slug and drv.get("slug") == src_drive_slug:
            new_drive_id = drv["id"]
            break
    if not new_drive_id:
        # Fall back to name match
        for drv in all_drives:
            if src_drive_name and drv.get("name") == src_drive_name:
                new_drive_id = drv["id"]
                break
    if not new_drive_id:
        fail(f"could not locate new drive on target by slug={src_drive_slug!r} or name={src_drive_name!r}")
        failures += 1; continue

    # Pull target drive
    tgt, err = sb_json("drives", "get", new_drive_id)
    if not tgt:
        fail(f"drives get {new_drive_id} failed: {err}"); failures += 1; continue

    tgt_editor = tgt.get("preferredEditor")
    tgt_nodes = tgt["state"]["global"]["nodes"]

    # preferredEditor parity (normalize legacy source ids to current config.id)
    src_editor_norm = normalize_editor(src_editor)
    if src_editor_norm != tgt_editor:
        fail(f"preferredEditor mismatch: source={src_editor_norm!r} target={tgt_editor!r}"); failures += 1
    else:
        ok(f"preferredEditor: {tgt_editor!r}")

    # Node count parity (folders + files)
    src_nodes_count = len(manifest.get("folders", [])) + len(manifest.get("documents", []))
    tgt_nodes_count = len(tgt_nodes)
    if src_nodes_count != tgt_nodes_count:
        warn(f"node count: source={src_nodes_count} target={tgt_nodes_count} (delta {tgt_nodes_count - src_nodes_count})")
    else:
        ok(f"node count: {tgt_nodes_count}")

    # By-type counts
    src_types = Counter(d["type"] for d in manifest.get("documents", []))
    src_types["folder"] = len(manifest.get("folders", []))
    tgt_types = Counter(n.get("documentType", "folder") for n in tgt_nodes)
    type_keys = sorted(set(src_types) | set(tgt_types))
    drift = []
    for k in type_keys:
        if src_types[k] != tgt_types[k]:
            drift.append(f"{k}: src={src_types[k]} tgt={tgt_types[k]}")
    if drift:
        warn("type-count drift: " + "; ".join(drift))
    else:
        ok(f"type-count parity ({len(type_keys)} types)")

    # powerhouse/builders cross-drive PHID check
    builders_docs = [d for d in manifest.get("documents", []) if d["type"] == "powerhouse/builders"]
    for d in builders_docs:
        old_id = d["id"]
        new_id = id_map.get(old_id)
        if not new_id:
            warn(f"powerhouse/builders {old_id} has no remap"); continue
        doc, err = sb_json("docs", "get", new_id, "--state")
        if not doc:
            fail(f"docs get {new_id} failed: {err}"); failures += 1; continue
        tgt_builders = doc.get("state", {}).get("global", {}).get("builders", []) or []
        # Cross-check: source array length
        src_state_path = os.path.join(drive_path, "states", f"{old_id}.json")
        src_builders = []
        if os.path.exists(src_state_path):
            src_state = load(src_state_path)
            src_builders = src_state.get("builders") or []
        if len(tgt_builders) != len(src_builders):
            warn(f"powerhouse/builders.builders[]: source={len(src_builders)} target={len(tgt_builders)}")
        else:
            ok(f"powerhouse/builders.builders[]: {len(tgt_builders)} entries (parity)")
        # Check each PHID resolves to a known new doc
        unresolved = [p for p in tgt_builders if p not in set(merged_map.values())]
        if unresolved:
            warn(f"powerhouse/builders.builders[]: {len(unresolved)} PHID(s) don't match any remapped target id (sample: {unresolved[:2]})")

    # builder-profile.contributors[] cross-drive sanity (sample)
    profile_docs = [d for d in manifest.get("documents", []) if d["type"] == "powerhouse/builder-profile"]
    if profile_docs:
        sample = profile_docs[:3]
        ok_count = 0
        for d in sample:
            new_id = id_map.get(d["id"])
            if not new_id: continue
            doc, _ = sb_json("docs", "get", new_id, "--state")
            if not doc: continue
            contribs = doc.get("state", {}).get("global", {}).get("contributors") or []
            if not contribs:
                continue
            unresolved = [c for c in contribs if c not in set(merged_map.values())]
            if unresolved:
                warn(f"builder-profile {d['name']!r}: {len(unresolved)}/{len(contribs)} contributors not in merged map (sample: {unresolved[:1]})")
            else:
                ok_count += 1
        if ok_count:
            ok(f"builder-profile.contributors[]: {ok_count}/{len(sample)} sampled docs all-resolved")

    print()

print()
if failures:
    print(f"{R}✗ {failures} failure(s){NC}")
    sys.exit(1)
print(f"{G}✓ verification done{NC}")
