#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# upload-split.sh — Upload one drive's data, splitting the offering documents
# into a separate `service-offering` drive (new op-hub app architecture).
#
# The legacy operator drive bundled everything together: the operator's
# builder-profile AND its powerhouse/resource-template + powerhouse/service-
# offering catalog. The current app keeps those apart:
#
#   • team-admin drive       (editor "team-admin")       — the operator's
#     profile (+ the "Service Subscriptions" folder, etc.)
#   • service-offering drive (editor "service-offering")  — the resource-template
#     + service-offering catalog
#
# So for any data dir that contains offering docs this creates TWO drives on
# the target:
#
#   1. team-admin drive — keeps the original name/slug. Receives every
#      NON-offering doc (builder-profile, …) and every folder that is not part
#      of the offering subtree, including the "Service Subscriptions" folder.
#   2. service-offering drive — a new "<base> Operator" drive. Receives the
#      resource-template + service-offering docs under the SAME folder subtree
#      they had in the source drive, PLUS a mirror of the "Service Subscriptions"
#      subtree (the same product/subscription-instance docs) renamed "Customers".
#
# Both halves are uploaded with the existing, battle-tested upload.sh (one call
# each, against a filtered copy of the manifest in a temp dir). The only thing
# upload.sh can't do across two separate drives is resolve the offering docs'
# `operatorId` — which points at the operator's builder-profile now living in
# the OTHER drive — so this script fixes that up after both uploads.
#
# Drives with NO offering docs are uploaded unchanged by delegating to upload.sh.
#
# Usage:
#   SB_PROFILE=local bash upload-split.sh <data-dir> [builder-drive-name]
#   SB_PROFILE=local bash upload-split.sh <data-dir> --dry-run
#
# Env:
#   SB_PROFILE            switchboard profile (forwarded to upload.sh)
#   OPERATOR_DRIVE_NAME   override the new service-offering drive name
#                         (default: builder name with trailing "Admin"/"Operator"
#                         words stripped, then "+ Operator" — e.g.
#                         "Powerhouse RGH Operator Admin" → "Powerhouse RGH Operator")
#
# Drive icons are assigned by upload.sh from the editor id (team-admin /
# service-offering), so both halves of a split get the right icon automatically.
###############################################################################

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATA_DIR="${1:?Usage: $0 <data-dir> [builder-drive-name|--dry-run]}"

DRY_RUN=false
BUILDER_NAME=""
for arg in "${@:2}"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    *)         BUILDER_NAME="$arg" ;;
  esac
done

[ -f "$DATA_DIR/manifest.json" ] || { echo "Error: $DATA_DIR/manifest.json not found" >&2; exit 1; }

# Document types that move to the service-offering drive.
OFFERING_TYPES_CSV="powerhouse/resource-template,powerhouse/service-offering"

export DATA_DIR BUILDER_NAME DRY_RUN OFFERING_TYPES_CSV SCRIPT_DIR
export SB_PROFILE="${SB_PROFILE:-}"
export OPERATOR_DRIVE_NAME="${OPERATOR_DRIVE_NAME:-}"
# Drive icons are assigned by upload.sh based on the drive's editor id
# (team-admin / service-offering), so both halves of a split get the right icon
# automatically. Set DRIVE_ICON when calling upload.sh to override.

python3 << 'PYEOF'
import os, sys, json, subprocess, tempfile, shutil, datetime, copy

data_dir       = os.environ["DATA_DIR"]
builder_name   = os.environ.get("BUILDER_NAME", "").strip()
dry_run        = os.environ.get("DRY_RUN") == "true"
offering_types = set(os.environ["OFFERING_TYPES_CSV"].split(","))
script_dir     = os.environ["SCRIPT_DIR"]
sb_profile     = os.environ.get("SB_PROFILE", "").strip()
op_name_over   = os.environ.get("OPERATOR_DRIVE_NAME", "").strip()

G, Y, R, C, NC = "\033[0;32m", "\033[1;33m", "\033[0;31m", "\033[0;36m", "\033[0m"
def log(m):  print(f"  {G}✓{NC} {m}", flush=True)
def warn(m): print(f"  {Y}!{NC} {m}", flush=True)
def errf(m): print(f"  {R}✗{NC} {m}", flush=True)
def step(m): print(f"\n{C}━━━ {m} ━━━{NC}", flush=True)

with open(os.path.join(data_dir, "manifest.json")) as f:
    manifest = json.load(f)
source   = manifest.get("source", {})
docs     = manifest.get("documents", [])
folders  = manifest.get("folders", [])

drive_info = {}
try:
    with open(os.path.join(data_dir, "drive-info.json")) as f:
        drive_info = json.load(f)
except Exception:
    pass

src_name      = builder_name or drive_info.get("name") or source.get("name") or "Drive"
src_slug      = drive_info.get("slug") or source.get("slug") or "(auto)"

# Editor config.ids (these must match the editor modules' config.id in
# editors/*/module.ts). The editor modules were renamed in the app, so map any
# legacy id captured in drive-info.json onto the current one.
EDITOR_ID_REMAP = {
    "builder-team-admin": "team-admin",
    "service-offering-app": "service-offering",
}
BUILDER_EDITOR_ID  = "team-admin"
OFFERING_EDITOR_ID = "service-offering"
builder_editor = drive_info.get("preferredEditor") or BUILDER_EDITOR_ID
builder_editor = EDITOR_ID_REMAP.get(builder_editor, builder_editor)

# The customer/subscription area is one folder that appears in BOTH drives. The
# team-admin drive keeps the original "Service Subscriptions" name; the service-
# offering drive shows the same folder (and the product/subscription-instance
# docs inside it) under the name "Customers".
CUSTOMERS_SRC_FOLDER_NAME = "Service Subscriptions"
CUSTOMERS_DST_FOLDER_NAME = "Customers"

offering_docs = [d for d in docs if d.get("type") in offering_types]

# ── Passthrough: no offerings → behave exactly like upload.sh ──────────────────
if not offering_docs:
    step(f"No offering docs in {os.path.basename(data_dir)} — uploading unchanged")
    if dry_run:
        log(f"[dry-run] would run: upload.sh {data_dir} {src_name!r}")
        sys.exit(0)
    env = dict(os.environ)
    if sb_profile:
        env["SB_PROFILE"] = sb_profile
    for k in ("DRY_RUN", "BUILDER_NAME", "OFFERING_TYPES_CSV", "OPERATOR_DRIVE_NAME"):
        env.pop(k, None)
    rc = subprocess.run(["bash", os.path.join(script_dir, "upload.sh"), data_dir, src_name], env=env).returncode
    sys.exit(rc)

# ── Dedupe service-offerings: keep one per title ──────────────────────────────
# The legacy data has many "(copy)" offerings of the same product. Keep one per
# distinct title — preferring an ACTIVE offering whose resourceTemplateId
# resolves to a template in THIS drive (so the template link actually works),
# then the most complete (services + tiers). Resource-templates are NOT deduped.
rt_ids_in_drive = {d["id"] for d in offering_docs if d.get("type") == "powerhouse/resource-template"}
_state_cache = {}
def offering_state(doc):
    if doc["id"] not in _state_cache:
        p = os.path.join(data_dir, "states", f"{doc['id']}.json")
        try:
            with open(p) as fh:
                _state_cache[doc["id"]] = json.load(fh)
        except Exception:
            _state_cache[doc["id"]] = {}
    return _state_cache[doc["id"]]
def offering_title(doc):
    return (offering_state(doc).get("title") or doc.get("name") or "").strip().lower()
def offering_score(doc):
    s = offering_state(doc)
    return (
        1 if s.get("status") == "ACTIVE" else 0,
        1 if s.get("resourceTemplateId") in rt_ids_in_drive else 0,
        len(s.get("services") or []) + len(s.get("tiers") or []),
    )

rt_docs = [d for d in offering_docs if d.get("type") == "powerhouse/resource-template"]
so_docs = [d for d in offering_docs if d.get("type") == "powerhouse/service-offering"]
best_by_title = {}
for d in so_docs:
    t = offering_title(d)
    if t not in best_by_title or offering_score(d) > offering_score(best_by_title[t]):
        best_by_title[t] = d
kept_so = list(best_by_title.values())
if len(kept_so) < len(so_docs):
    log(f"Deduped service-offerings: kept {len(kept_so)} of {len(so_docs)} (dropped {len(so_docs) - len(kept_so)} copies)")
    for d in kept_so:
        st = offering_state(d)
        log(f"    keep {d['name']!r}  (title={st.get('title')!r}, {st.get('status')})")
offering_docs = rt_docs + kept_so

# ── Partition folders: an offering folder is any ancestor of an offering doc ───
by_id = {f["id"]: f for f in folders}
def ancestors(folder_id):
    chain, cur = [], folder_id
    while cur and cur in by_id:
        chain.append(cur)
        cur = by_id[cur].get("parentFolder")
    return chain

offering_folder_ids = set()
for d in offering_docs:
    pf = d.get("parentFolder")
    if pf:
        offering_folder_ids.update(ancestors(pf))

builder_docs     = [d for d in docs if d.get("type") not in offering_types]
builder_folders  = [f for f in folders if f["id"] not in offering_folder_ids]
offering_folders = [f for f in folders if f["id"] in offering_folder_ids]

# ── Mirror the customers subtree into the offering drive ───────────────────────
# The "Service Subscriptions" folder and the product/subscription-instance docs
# inside it are NOT offering types, so they already belong to the builder drive
# (keeping the original name). The service-offering drive shows the SAME folder
# and docs under the name "Customers", so mirror that subtree into the offering
# subset too — each drive gets its own uploaded copy/ids; only the offering side
# renames the root folder.
def subtree_folder_ids(root_id):
    ids, frontier = {root_id}, [root_id]
    while frontier:
        cur = frontier.pop()
        for f in folders:
            if f.get("parentFolder") == cur and f["id"] not in ids:
                ids.add(f["id"]); frontier.append(f["id"])
    return ids

customers_root_ids   = {f["id"] for f in folders if f.get("name") == CUSTOMERS_SRC_FOLDER_NAME}
customers_folder_ids = set()
for rid in customers_root_ids:
    customers_folder_ids.update(subtree_folder_ids(rid))

# Offering-side copy of the customers folders, with each root renamed.
customers_folders_offering = []
for f in folders:
    if f["id"] in customers_folder_ids:
        cf = copy.deepcopy(f)
        if cf["id"] in customers_root_ids:
            cf["name"] = CUSTOMERS_DST_FOLDER_NAME
        customers_folders_offering.append(cf)

offering_doc_ids = {d["id"] for d in offering_docs}
customers_docs   = [d for d in docs
                    if d.get("parentFolder") in customers_folder_ids
                    and d["id"] not in offering_doc_ids]

# Full doc/folder sets the offering drive is uploaded with. `offering_docs` stays
# the catalog-only list used by the operatorId fixup below.
offering_upload_docs    = offering_docs + customers_docs
offering_upload_folders = offering_folders + customers_folders_offering

# ── Derive the new service-offering-app drive name ─────────────────────────────
def derive_operator_name(base):
    toks = base.split()
    while toks and toks[-1] in ("Admin", "Operator"):
        toks.pop()
    return (" ".join(toks) + " Operator").strip()
operator_name = op_name_over or derive_operator_name(src_name)
def approx_slug(s):
    return "".join(ch if (ch.isalnum() or ch in " -_") else "" for ch in s).lower().replace("_", "-").replace(" ", "-")

def type_counts(items):
    out = {}
    for d in items:
        out[d.get("type", "?")] = out.get(d.get("type", "?"), 0) + 1
    return out

# ── Report (always; also the full body of --dry-run) ───────────────────────────
step(f"Split plan for {src_name!r} ({src_slug})")
print(f"  {C}→ team-admin{NC}  name={src_name!r}  editor={builder_editor}")
print(f"      docs={len(builder_docs)}  folders={len(builder_folders)}")
for t, n in sorted(type_counts(builder_docs).items()):
    print(f"        {n:3d}  {t}")
for f in builder_folders:
    print(f"        [folder] {f['name']}")
print(f"  {C}→ service-offering{NC}  name={operator_name!r}  slug≈{approx_slug(operator_name)}  editor={OFFERING_EDITOR_ID}")
print(f"      docs={len(offering_upload_docs)}  folders={len(offering_upload_folders)}")
for t, n in sorted(type_counts(offering_upload_docs).items()):
    print(f"        {n:3d}  {t}")
for f in offering_upload_folders:
    print(f"        [folder] {f['name']}")

if dry_run:
    print()
    log("[dry-run] nothing uploaded")
    sys.exit(0)

# ── Build two filtered data dirs (manifest subset + symlinked states/ops) ──────
def make_subset(tmp, sub_docs, sub_folders):
    os.makedirs(tmp, exist_ok=True)
    sub = {
        "source": source,
        "excluded": manifest.get("excluded", []),
        "folders": sub_folders,
        "documents": sub_docs,
    }
    with open(os.path.join(tmp, "manifest.json"), "w") as f:
        json.dump(sub, f, indent=2)
    # upload.sh reads doc states from <dir>/states/<id>.json; share them via symlink.
    for sub_name in ("states", "ops"):
        src = os.path.join(data_dir, sub_name)
        if os.path.isdir(src):
            os.symlink(os.path.abspath(src), os.path.join(tmp, sub_name))

work = tempfile.mkdtemp(prefix="upload-split-")
tmp_builder  = os.path.join(work, "builder")
tmp_offering = os.path.join(work, "offering")
make_subset(tmp_builder, builder_docs, builder_folders)
make_subset(tmp_offering, offering_upload_docs, offering_upload_folders)

idmap_builder  = os.path.join(work, "id-map.builder.json")
idmap_offering = os.path.join(work, "id-map.offering.json")

def run_upload(tmp, name, editor, idmap_path):
    env = dict(os.environ)
    if sb_profile:
        env["SB_PROFILE"] = sb_profile
    env["PREFERRED_EDITOR"] = editor
    env["ID_MAP_FILE"] = idmap_path
    # upload.sh picks the drive icon from the editor id; don't force one here.
    env.pop("DRIVE_ICON", None)
    for k in ("DRY_RUN", "BUILDER_NAME", "OFFERING_TYPES_CSV", "OPERATOR_DRIVE_NAME", "EXTERNAL_ID_MAP"):
        env.pop(k, None)
    rc = subprocess.run(["bash", os.path.join(script_dir, "upload.sh"), tmp, name], env=env).returncode
    if rc != 0:
        raise SystemExit(f"upload.sh failed for {name!r} (exit {rc})")

try:
    step("Uploading team-admin drive")
    run_upload(tmp_builder, src_name, builder_editor, idmap_builder)

    step("Uploading service-offering drive")
    run_upload(tmp_offering, operator_name, OFFERING_EDITOR_ID, idmap_offering)

    # ── Re-point offering operatorId at the operator's builder-profile ─────────
    # Every offering in this drive belongs to the drive's operator, but the
    # source operatorId values are inconsistent (most point at stale ids that
    # aren't profiles we upload). So re-point them all at the operator builder-
    # profile that now lives in the builder-team-admin drive. (If a single
    # operator can't be identified, fall back to a best-effort id-map remap.)
    step("Re-pointing offering operatorId at the operator profile")
    with open(idmap_builder) as f:
        map_builder = json.load(f)
    with open(idmap_offering) as f:
        map_offering = json.load(f)
    merged = {**map_builder, **map_offering}

    def is_operator_profile(doc):
        p = os.path.join(data_dir, "states", f"{doc['id']}.json")
        try:
            with open(p) as f:
                return bool(json.load(f).get("isOperator"))
        except Exception:
            return False

    bp_docs = [d for d in builder_docs if d.get("type") == "powerhouse/builder-profile"]
    operator_candidates = [d for d in bp_docs if is_operator_profile(d)] or bp_docs
    operator_old_id = operator_candidates[0]["id"] if len(operator_candidates) == 1 else None
    operator_new_id = map_builder.get(operator_old_id) if operator_old_id else None
    if operator_new_id:
        log(f"Operator profile: {operator_old_id[:8]}… → {operator_new_id}")
    else:
        warn("No single operator profile found — falling back to per-doc id-map remap")

    now = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")

    def mutate(doc_id, op, inp):
        with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
            json.dump(inp, f)
            tmp_in = f.name
        try:
            cmd = ["switchboard"]
            if sb_profile:
                cmd += ["--profile", sb_profile]
            cmd += ["docs", "mutate", doc_id, "--op", op,
                    "--input-file", tmp_in, "--format", "json", "--quiet"]
            r = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
            return r.returncode == 0, (r.stderr or r.stdout).strip()[:200]
        finally:
            os.unlink(tmp_in)

    fixed = 0
    for d in offering_docs:
        new_id = map_offering.get(d["id"])
        if not new_id:
            continue
        target_op = operator_new_id
        if not target_op:
            # Fallback: remap whatever the source carried, if it resolves.
            sp = os.path.join(data_dir, "states", f"{d['id']}.json")
            old_op = None
            if os.path.exists(sp):
                with open(sp) as f:
                    old_op = json.load(f).get("operatorId")
            target_op = merged.get(old_op) if old_op else None
        if not target_op:
            continue
        ok, err = mutate(new_id, "setOperator", {"operatorId": target_op, "lastModified": now})
        if ok:
            fixed += 1
        else:
            warn(f"setOperator failed for {d['name']!r}: {err}")
    log(f"Set operatorId on {fixed} offering doc(s)")

    # Merged id-map for the source dir so a later phase-3 cross-drive remap
    # (builder-profile contributors, etc.) and upload-all's merge pick up BOTH
    # new drives' ids.
    with open(os.path.join(data_dir, "id-map.json"), "w") as f:
        json.dump(merged, f, indent=2)
    log(f"Wrote merged id-map ({len(merged)} ids) to {os.path.join(data_dir, 'id-map.json')}")
finally:
    shutil.rmtree(work, ignore_errors=True)

step("Done")
log(f"team-admin: {src_name!r}  ({len(builder_docs)} docs, editor={builder_editor})")
log(f"service-offering: {operator_name!r}  ({len(offering_upload_docs)} docs, editor={OFFERING_EDITOR_ID})")
PYEOF
