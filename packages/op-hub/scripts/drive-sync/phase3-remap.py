#!/usr/bin/env python3
"""
Standalone runner for Phase 3 cross-drive remap (sync.sh skipped it because
its embedded heredoc reads DATA_DIR with a wrong default).

Remaps:
  - builder-profile.contributors[]    (cross-drive: refs builders drive)
  - builder-profile.operationalHubMember.phid (cross-drive)

Usage:
  TARGET_PROFILE=bai-dev DATA_DIR=scripts/drive-sync/data \
    python3 scripts/drive-sync/phase3-remap.py
"""

import json, os, subprocess, sys, tempfile

DATA_DIR = os.environ.get("DATA_DIR", "scripts/drive-sync/data")
TARGET_PROFILE = os.environ.get("TARGET_PROFILE", "bai-dev")

G, Y, R, NC = "\033[0;32m", "\033[1;33m", "\033[0;31m", "\033[0m"
def log(m):  print(f"  {G}✓{NC} {m}", flush=True)
def warn(m): print(f"  {Y}!{NC} {m}", flush=True)

merged_map_path = os.path.join(DATA_DIR, "merged-id-map.json")
if not os.path.exists(merged_map_path):
    print(f"  {R}✗{NC} no merged map at {merged_map_path}"); sys.exit(1)
with open(merged_map_path) as f:
    merged_map = json.load(f)
log(f"merged map: {len(merged_map)} ids")

def map_id(old):
    return merged_map.get(old, old)

def mutate(doc_id, op, input_data):
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(input_data, f); tmp = f.name
    try:
        r = subprocess.run(
            ["switchboard", "--profile", TARGET_PROFILE,
             "docs", "mutate", doc_id, "--op", op,
             "--input-file", tmp, "--format", "json"],
            capture_output=True, text=True, timeout=30,
        )
        return r.returncode == 0, (r.stderr or r.stdout).strip()[:200]
    finally:
        os.unlink(tmp)

remapped = 0
for drive_dir in sorted(os.listdir(DATA_DIR)):
    drive_path = os.path.join(DATA_DIR, drive_dir)
    manifest_path = os.path.join(drive_path, "manifest.json")
    id_map_path   = os.path.join(drive_path, "id-map.json")
    if not (os.path.exists(manifest_path) and os.path.exists(id_map_path)):
        continue
    with open(manifest_path) as f: manifest = json.load(f)
    with open(id_map_path)   as f: drive_map = json.load(f)

    for d in manifest.get("documents", []):
        dtype = d["type"]
        old_id = d["id"]
        new_id = drive_map.get(old_id)
        if not new_id:
            continue
        state_path = os.path.join(drive_path, "states", f"{old_id}.json")
        if not os.path.exists(state_path):
            continue
        with open(state_path) as f: state = json.load(f)

        if dtype == "powerhouse/builder-profile":
            # contributors[]: cross-drive PHIDs need remap
            for old_contrib in (state.get("contributors") or []):
                new_contrib = merged_map.get(old_contrib)
                if not new_contrib:
                    continue
                if old_contrib == new_contrib:
                    # Same id — already correct
                    continue
                # remove old, add new
                mutate(new_id, "removeContributor", {"contributorPHID": old_contrib})
                ok, err = mutate(new_id, "addContributor", {"contributorPHID": new_contrib})
                if ok:
                    remapped += 1
                    log(f"  contributor {old_contrib[:8]}…→{new_contrib[:8]}… on {d['name']!r}")
                else:
                    warn(f"  addContributor failed for {d['name']!r}: {err}")

            # operationalHubMember.phid: cross-drive
            ohm = state.get("operationalHubMember") or {}
            old_phid = ohm.get("phid")
            if old_phid:
                new_phid = merged_map.get(old_phid)
                if new_phid and new_phid != old_phid:
                    ok, err = mutate(new_id, "setOpHubMember", {
                        "name": ohm.get("name"),
                        "phid": new_phid,
                    })
                    if ok:
                        remapped += 1
                        log(f"  opHubMember {old_phid[:8]}…→{new_phid[:8]}… on {d['name']!r}")
                    else:
                        warn(f"  setOpHubMember failed for {d['name']!r}: {err}")

        elif dtype == "powerhouse/builders":
            # builders[]: cross-drive PHIDs into the builders drive. The state-
            # application phase tends to drop this array entirely, so unlike
            # builder-profile we rebuild it from the source rather than diffing.
            # Approach: addBuilder for every source PHID (remapped), then
            # removeBuilder for any stragglers already in the target state.
            source_builders = state.get("builders") or []
            if not source_builders:
                continue
            # Fetch the current target state to compute the diff.
            r = subprocess.run(
                ["switchboard", "--profile", TARGET_PROFILE,
                 "docs", "get", new_id, "--state", "--format", "json"],
                capture_output=True, text=True, timeout=15,
            )
            current_builders = []
            if r.returncode == 0:
                try:
                    current_builders = (
                        json.loads(r.stdout).get("state", {}).get("global", {}).get("builders") or []
                    )
                except json.JSONDecodeError:
                    pass
            desired = []
            for old_b in source_builders:
                new_b = merged_map.get(old_b, old_b)
                if new_b not in desired:
                    desired.append(new_b)
            # Add missing
            for b in desired:
                if b in current_builders:
                    continue
                ok, err = mutate(new_id, "addBuilder", {"builderPhid": b})
                if ok:
                    remapped += 1
                    log(f"  builder +{b[:8]}… on {d['name']!r}")
                else:
                    warn(f"  addBuilder failed for {d['name']!r}: {err}")
            # Remove stale entries the source no longer carries
            for b in current_builders:
                if b in desired:
                    continue
                ok, err = mutate(new_id, "removeBuilder", {"builderPhid": b})
                if ok:
                    remapped += 1
                    log(f"  builder -{b[:8]}… on {d['name']!r}")
                else:
                    warn(f"  removeBuilder failed for {d['name']!r}: {err}")

log(f"done — remapped {remapped} reference(s)")
