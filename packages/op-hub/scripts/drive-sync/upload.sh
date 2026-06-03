#!/usr/bin/env bash
set -euo pipefail

###############################################################################
# upload.sh — Create a drive from downloaded data on a target switchboard
#
# Uses only switchboard CLI commands (no model-specific GraphQL).
#
# Usage:
#   bash upload.sh <data-dir> [drive-name]
#
# Environment:
#   SB_PROFILE        Switchboard profile to use (optional)
#   ID_MAP_FILE       Path to write the ID mapping JSON (old→new). Default: <data-dir>/id-map.json
#   PREFERRED_EDITOR  Drive editor override (legacy ids are normalized to the
#                     current config.id, e.g. builder-team-admin → team-admin)
#   DRIVE_ICON        Drive icon URL override. If unset, an icon is chosen from
#                     the editor id (team-admin / service-offering)
#   EXISTING_DRIVE    Drive ID to upload into (skips drive creation)
#
#   Renown signing (creator attribution) — optional:
#   RENOWN_ADDRESS    Wallet address to record as creator (did:pkh). Setting
#                     this ENABLES signing: every applied operation is routed
#                     through signed-apply.mjs and carries context.signer.user,
#                     so `who-created.mjs <docId>` can reverse-lookup the creator.
#   RENOWN_KEYPAIR    P-256 keypair json from `ph login` (default .ph/.keypair.json)
#   RENOWN_CLI_DID    did:key override (default: derived from the keypair)
#   RENOWN_NETWORK_ID / RENOWN_CHAIN_ID   identity chain (default eip155 / 1)
#   Note: the drive/doc genesis CREATE_DOCUMENT is still server-generated
#   (app.name "switchboard"); attribution rides on the operations' user.address.
#
# Example:
#   RENOWN_ADDRESS=0x… SB_PROFILE=local bash upload.sh data/powerhouse-rgh-operator-admin
#   SB_PROFILE=local bash upload.sh data/powerhouse-rgh-operator-admin
#   EXISTING_DRIVE=d8995a96-... SB_PROFILE=staging bash upload.sh data/powerhouse-rgh-operator-admin
###############################################################################

DATA_DIR="${1:?Usage: $0 <data-dir> [drive-name]}"
DRIVE_NAME="${2:-}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ID_MAP_FILE="${ID_MAP_FILE:-$DATA_DIR/id-map.json}"
PREFERRED_EDITOR="${PREFERRED_EDITOR:-}"
EXISTING_DRIVE="${EXISTING_DRIVE:-}"
EXTERNAL_ID_MAP="${EXTERNAL_ID_MAP:-}"  # Path to another drive's id-map.json for cross-drive remapping
DRIVE_ICON="${DRIVE_ICON:-}"  # Optional icon URL to set on the created/used drive

[ -f "$DATA_DIR/manifest.json" ] || { echo "Error: $DATA_DIR/manifest.json not found" >&2; exit 1; }

# Use profile if set
if [ -n "${SB_PROFILE:-}" ]; then
  switchboard config use "$SB_PROFILE" >/dev/null 2>&1
fi

source "$SCRIPT_DIR/lib/common.sh"

# ── Preflight ────────────────────────────────────────────────────────────────

step "Preflight"
preflight
log "Data dir: $DATA_DIR"

# ── Safety check ─────────────────────────────────────────────────────────────

confirm_target "upload drives/documents to"

# ── Compat check ─────────────────────────────────────────────────────────────

step "Compatibility check"

REQUIRED_TYPES=$(python3 -c "
import json
with open('$DATA_DIR/manifest.json') as f:
    m = json.load(f)
types = sorted(set(d['type'] for d in m['documents']))
for t in types:
    print(t)
")

# shellcheck disable=SC2086
compat_check $REQUIRED_TYPES || true

# ── Upload ───────────────────────────────────────────────────────────────────

step "Creating drive from downloaded data"

# Renown operation signing (optional). When RENOWN_ADDRESS is set, every
# applied operation is signed with the Renown keypair so the creator is
# recorded in each op's context.signer (reverse-lookup). See signed-apply.mjs.
export SIGNED_WRITE_SIDECAR="$SCRIPT_DIR/signed-apply.mjs"
export RENOWN_KEYPAIR="${RENOWN_KEYPAIR:-$SCRIPT_DIR/../../.ph/.keypair.json}"

export DATA_DIR DRIVE_NAME ID_MAP_FILE PREFERRED_EDITOR EXISTING_DRIVE EXTERNAL_ID_MAP DRIVE_ICON
export SIGNED_WRITE_SIDECAR RENOWN_KEYPAIR
export RENOWN_ADDRESS="${RENOWN_ADDRESS:-}" RENOWN_CLI_DID="${RENOWN_CLI_DID:-}"
export RENOWN_NETWORK_ID="${RENOWN_NETWORK_ID:-eip155}" RENOWN_CHAIN_ID="${RENOWN_CHAIN_ID:-1}"

python3 << 'PYEOF'
import subprocess, json, sys, os, tempfile, uuid, datetime, time

data_dir = os.environ["DATA_DIR"]
drive_name_override = os.environ.get("DRIVE_NAME", "").strip()
id_map_file = os.environ["ID_MAP_FILE"]
preferred_editor = os.environ.get("PREFERRED_EDITOR", "")
existing_drive = os.environ.get("EXISTING_DRIVE", "").strip()
drive_icon = os.environ.get("DRIVE_ICON", "").strip()

G = "\033[0;32m"
Y = "\033[1;33m"
R = "\033[0;31m"
C = "\033[0;36m"
NC = "\033[0m"

def log(msg):  print(f"  {G}✓{NC} {msg}", flush=True)
def warn(msg): print(f"  {Y}!{NC} {msg}", flush=True)
def errf(msg): print(f"  {R}✗{NC} {msg}", flush=True)
def step(msg): print(f"\n{C}━━━ {msg} ━━━{NC}", flush=True)

# ── Read manifest ────────────────────────────────────────────────────────────

with open(os.path.join(data_dir, "manifest.json")) as f:
    manifest = json.load(f)

drive_name = drive_name_override or manifest["source"]["name"]

# Read preferred editor from drive-info.json if available
source_preferred_editor = None
try:
    with open(os.path.join(data_dir, "drive-info.json")) as f:
        drive_info = json.load(f)
        source_preferred_editor = drive_info.get("preferredEditor")
except Exception:
    pass
# Use: env override > source drive info > nothing
if not preferred_editor and source_preferred_editor:
    preferred_editor = source_preferred_editor

# Normalize legacy editor ids to their current config.id. The editor modules
# were renamed in the app (builder-team-admin → team-admin, service-offering-app
# → service-offering) but the captured drive-info.json files still carry the old
# ids; a drive whose preferredEditor doesn't match an editor's config.id won't
# open with that editor in Connect.
EDITOR_ID_REMAP = {
    "builder-team-admin": "team-admin",
    "service-offering-app": "service-offering",
}
if preferred_editor in EDITOR_ID_REMAP:
    preferred_editor = EDITOR_ID_REMAP[preferred_editor]

# Default drive icon per editor type, so every team-admin / service-offering
# drive lands with the matching icon. An explicit DRIVE_ICON env always wins.
EDITOR_DEFAULT_ICON = {
    "team-admin":       "https://i.postimg.cc/FztDhVrh/team-admin-bg.png",
    "service-offering": "https://i.postimg.cc/QtFy8Mc4/service-offering-bg.png",
}
if not drive_icon and preferred_editor in EDITOR_DEFAULT_ICON:
    drive_icon = EDITOR_DEFAULT_ICON[preferred_editor]

log(f"Source: {manifest['source']['slug']} ({manifest['source']['downloadedAt']})")
log(f"Drive name: {drive_name}")
log(f"Documents: {len(manifest['documents'])}, Folders: {len(manifest['folders'])}")

# ── Helpers ──────────────────────────────────────────────────────────────────

def sb_run(*args, check=True):
    """Run switchboard CLI command, return stdout."""
    cmd = ["switchboard"] + list(args) + ["--format", "json"]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if check and result.returncode != 0:
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\n{result.stderr[:500]}")
    return result.stdout

def sb_run_raw(*args, check=True):
    """Run switchboard CLI command without appending --format json."""
    cmd = ["switchboard"] + list(args)
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if check and result.returncode != 0:
        raise RuntimeError(f"Command failed: {' '.join(cmd)}\n{result.stderr[:500]}")
    return result.stdout

def wait_for_doc(doc_id, timeout=15):
    """Poll until a document is accessible via docs get, or timeout."""
    for i in range(timeout):
        result = subprocess.run(
            ["switchboard", "docs", "get", doc_id, "--format", "json"],
            capture_output=True, text=True, timeout=10,
        )
        if result.returncode == 0:
            return True
        time.sleep(1)
    return False

def _poll_job(job_id, timeout=120, interval=0.5):
    """Poll jobStatus via raw GraphQL using only fields this server exposes
    (status, error, completedAt). Older switchboards don't have JobInfo.progress,
    so we can't use `docs apply --wait`."""
    query = ('query($id:String!){ jobStatus(jobId:$id) '
             '{ id status error completedAt } }')
    variables = json.dumps({"id": job_id})
    deadline = time.time() + timeout
    last_status = None
    while time.time() < deadline:
        result = subprocess.run(
            ["switchboard", "query", query,
             "--variables", variables, "--format", "json"],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode != 0:
            time.sleep(interval)
            continue
        try:
            data = json.loads(result.stdout)
        except json.JSONDecodeError:
            time.sleep(interval)
            continue
        if data.get("errors"):
            raise RuntimeError(f"jobStatus GraphQL errors: {data['errors']}")
        # `switchboard query --format json` returns the unwrapped data object,
        # but tolerate the wrapped {data:{...}} shape too.
        root = data.get("data") if isinstance(data.get("data"), dict) else data
        info = (root or {}).get("jobStatus") or {}
        last_status = info.get("status")
        # Terminal-fail signal from reactor-api.
        if last_status in ("FAILED", "failed", "ERROR", "error"):
            raise RuntimeError(f"job {job_id} failed: {info.get('error') or 'unknown'}")
        # Terminal-success: status reaches READ_MODELS_READY (or older READ_READY
        # alias) OR completedAt is populated, matching reactor-api's isTerminal.
        if last_status in ("READ_MODELS_READY", "READ_READY", "COMPLETED",
                           "completed", "SUCCESS", "success"):
            return
        if info.get("completedAt"):
            return
        time.sleep(interval)
    raise RuntimeError(f"job {job_id} did not complete within {timeout}s (last status: {last_status})")


# ── Renown operation signing (optional) ───────────────────────────────────────
# When RENOWN_ADDRESS is set, applied operations are routed through the Node
# signing sidecar (signed-apply.mjs) so each op carries context.signer with the
# creator's wallet. Otherwise the original switchboard-CLI path is used.
SIGN = bool(os.environ.get("RENOWN_ADDRESS", "").strip())
SIDECAR = os.environ.get("SIGNED_WRITE_SIDECAR", "")
SB_ENDPOINT = None
SB_TOKEN = ""
if SIGN:
    try:
        cfg = json.loads(subprocess.run(
            ["switchboard", "config", "show", "--format", "json"],
            capture_output=True, text=True, timeout=30).stdout)
        SB_ENDPOINT = cfg.get("url")
        tok = subprocess.run(
            ["switchboard", "auth", "token"],
            capture_output=True, text=True, timeout=30).stdout.strip().splitlines()
        SB_TOKEN = tok[-1] if tok else ""
        log(f"Renown signing ENABLED → {os.environ['RENOWN_ADDRESS']} (endpoint {SB_ENDPOINT})")
    except Exception as e:
        errf(f"Could not resolve signing endpoint/token; disabling signing: {e}")
        SIGN = False

def _signed_apply(doc_id, actions, retries=3):
    """Sign actions and push them via the Node sidecar (mutateDocument)."""
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(actions, f)
        tmppath = f.name
    env = dict(os.environ)
    env["ENDPOINT"] = SB_ENDPOINT or ""
    env["TOKEN"] = SB_TOKEN
    try:
        for attempt in range(retries):
            result = subprocess.run(
                ["node", SIDECAR, "apply", doc_id, tmppath],
                capture_output=True, text=True, timeout=180, env=env,
            )
            if result.returncode == 0:
                return
            if attempt < retries - 1:
                wait = (attempt + 1) * 3
                warn(f"  signed apply failed (attempt {attempt+1}): {result.stderr[:120] or result.stdout[:120]}... retrying in {wait}s")
                time.sleep(wait)
                continue
            raise RuntimeError(f"signed apply on {doc_id} failed after {retries} attempts: {result.stderr[:300] or result.stdout[:300]}")
    finally:
        os.unlink(tmppath)

def apply_actions(doc_id, actions, retries=3):
    """Apply actions to a document. Submits async via `docs apply` (no --wait),
    then polls jobStatus via raw GraphQL. Compatible with switchboards whose
    JobInfo type lacks the `progress` field that CLI 1.0.27's --wait queries.

    When signing is enabled, routes through the Node sidecar so each op carries
    context.signer with the creator's wallet."""
    if not actions:
        return
    if isinstance(actions, dict):
        actions = [actions]
    now_iso = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.") + \
        f"{datetime.datetime.now(datetime.timezone.utc).microsecond // 1000:03d}Z"
    for action in actions:
        if "id" not in action:
            action["id"] = str(uuid.uuid4())
        if "timestampUtcMs" not in action:
            action["timestampUtcMs"] = now_iso
    if SIGN:
        _signed_apply(doc_id, actions, retries)
        return
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(actions, f)
        tmppath = f.name
    try:
        for attempt in range(retries):
            result = subprocess.run(
                ["switchboard", "docs", "apply", doc_id,
                 "--file", tmppath, "--format", "json"],
                capture_output=True, text=True, timeout=60,
            )
            if result.returncode != 0:
                if attempt < retries - 1:
                    wait = (attempt + 1) * 3
                    warn(f"  apply submit failed (attempt {attempt+1}): {result.stderr[:100]}... retrying in {wait}s")
                    time.sleep(wait)
                    continue
                raise RuntimeError(f"apply on {doc_id} failed after {retries} attempts: {result.stderr[:300]}")
            try:
                resp = json.loads(result.stdout)
            except json.JSONDecodeError:
                resp = {}
            job_id = (resp.get("jobId") or resp.get("id")
                      or (resp.get("data") or {}).get("jobId"))
            if not job_id:
                return
            try:
                _poll_job(job_id)
                return
            except RuntimeError as e:
                if attempt < retries - 1:
                    wait = (attempt + 1) * 3
                    warn(f"  apply job failed (attempt {attempt+1}): {str(e)[:100]}... retrying in {wait}s")
                    time.sleep(wait)
                    continue
                raise
    finally:
        os.unlink(tmppath)

import re as _re

def op_to_action_type(op_name):
    """Convert camelCase operation name to SCREAMING_SNAKE_CASE action type.
    e.g., 'updateTemplateInfo' → 'UPDATE_TEMPLATE_INFO', 'addFaq' → 'ADD_FAQ'"""
    return _re.sub(r'([A-Z])', r'_\1', op_name).upper().lstrip('_')

def clean_name(name):
    """Strip '(copy)' / '(draft)' / '(active …)' markers — and the copy index
    left behind — from a document's display name. Names without such a marker
    are returned unchanged, so legitimate trailing numbers (invoice numbers,
    dates, etc.) are preserved."""
    if not name or not _re.search(r'\((?:copy|draft|active)\b', name, _re.I):
        return name
    n = _re.sub(r'\s*\((?:copy|draft|active)[^)]*\)', '', name, flags=_re.I)
    n = _re.sub(r'\s+\d+\s*$', '', n)
    n = _re.sub(r'\s{2,}', ' ', n).strip()
    return n or name

def mutate(doc_id, op, input_data, retries=3):
    """Mutate a single document. When batch mode is active (begin_batch/flush_batch),
    queues the action instead of sending it individually."""
    global _batch_target
    if _batch_target is not None and _batch_target[0] == doc_id:
        _batch_target[1].append({
            "type": op_to_action_type(op),
            "input": input_data,
            "scope": "global",
        })
        return
    # When signing, funnel single mutations through the signed apply path so
    # they carry context.signer like every other operation.
    if SIGN:
        apply_actions(doc_id, [{
            "type": op_to_action_type(op),
            "input": input_data,
            "scope": "global",
        }])
        return
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(input_data, f)
        tmppath = f.name
    try:
        for attempt in range(retries):
            result = subprocess.run(
                ["switchboard", "docs", "mutate", doc_id, "--op", op,
                 "--input-file", tmppath, "--format", "json", "--quiet"],
                capture_output=True, text=True, timeout=30,
            )
            if result.returncode == 0:
                return
            if attempt < retries - 1:
                wait = (attempt + 1) * 2
                warn(f"  mutate {op} failed (attempt {attempt+1}): {result.stderr[:100]}... retrying in {wait}s")
                time.sleep(wait)
        raise RuntimeError(f"mutate {doc_id} --op {op} failed after {retries} attempts: {result.stderr[:200]}")
    finally:
        os.unlink(tmppath)

# Global batch mode: when _batch_target is set, mutate() queues actions
# instead of sending them individually. Flushed via flush_batch().
_batch_target = None  # (doc_id, actions_list) or None

def begin_batch(doc_id):
    """Start collecting mutations for batch submission."""
    global _batch_target
    _batch_target = (doc_id, [])

def flush_batch():
    """Send all queued mutations in one batch request. Returns action count."""
    global _batch_target
    if not _batch_target:
        return 0
    doc_id, actions = _batch_target
    _batch_target = None
    if not actions:
        return 0
    apply_actions(doc_id, actions)
    return len(actions)

def load_state(doc_id):
    """Load downloaded state for a document."""
    path = os.path.join(data_dir, "states", f"{doc_id}.json")
    if not os.path.exists(path):
        return None
    with open(path) as f:
        return json.load(f)

# ── Verification helpers ──────────────────────────────────────────────────────

def get_drive_tree(drive_slug_or_id):
    """Fetch the drive tree and return parsed nodes list."""
    try:
        stdout = sb_run("docs", "tree", drive_slug_or_id)
        tree = json.loads(stdout)
        return tree["document"]["state"]["global"]["nodes"]
    except Exception:
        return []

def verify_drive(drive_slug_or_id):
    """Verify a drive exists and is accessible."""
    try:
        stdout = sb_run("drives", "get", drive_slug_or_id)
        data = json.loads(stdout)
        return data.get("id") is not None
    except Exception:
        return False

def verify_folders(drive_slug_or_id, expected_count):
    """Verify folder count in drive matches expected."""
    nodes = get_drive_tree(drive_slug_or_id)
    folders = [n for n in nodes if n.get("kind") == "folder"]
    if len(folders) == expected_count:
        log(f"Verified: {len(folders)} folders")
        return True
    else:
        errf(f"Folder count mismatch: expected {expected_count}, got {len(folders)}")
        return False

def verify_documents(drive_slug_or_id, expected_count):
    """Verify file count in drive matches expected."""
    nodes = get_drive_tree(drive_slug_or_id)
    files = [n for n in nodes if n.get("kind") == "file"]
    if len(files) == expected_count:
        log(f"Verified: {len(files)} documents")
        return True
    else:
        errf(f"Document count mismatch: expected {expected_count}, got {len(files)}")
        return False

def verify_placements(drive_slug_or_id, expected_placements):
    """Verify documents are in the correct folders.
    expected_placements: dict of {new_doc_id: new_folder_id}"""
    nodes = get_drive_tree(drive_slug_or_id)
    node_map = {n["id"]: n for n in nodes}
    misplaced = []
    for doc_id, expected_folder in expected_placements.items():
        node = node_map.get(doc_id)
        if not node:
            misplaced.append(f"  {doc_id}: not found in tree")
        elif node.get("parentFolder") != expected_folder:
            misplaced.append(f"  {doc_id}: expected folder {expected_folder}, got {node.get('parentFolder')}")
    if not misplaced:
        log(f"Verified: all {len(expected_placements)} documents in correct folders")
        return True
    else:
        errf(f"{len(misplaced)} document(s) misplaced:")
        for m in misplaced[:5]:
            errf(m)
        return False

def verify_doc_state(doc_id, checks):
    """Verify specific fields in a document's global state.
    checks: dict of {field_path: expected_value} or {field_path: callable}.
    Field paths use dots: 'isOperator', 'operatorId', etc."""
    try:
        stdout = sb_run("docs", "get", doc_id, "--state")
        data = json.loads(stdout)
        state = data.get("state", {}).get("global", {})
    except Exception as e:
        errf(f"Failed to fetch state for {doc_id}: {e}")
        return False

    all_ok = True
    for field, expected in checks.items():
        actual = state.get(field)
        if callable(expected):
            if not expected(actual):
                errf(f"  {field}: check failed (got {repr(actual)[:80]})")
                all_ok = False
        elif actual != expected:
            errf(f"  {field}: expected {repr(expected)[:50]}, got {repr(actual)[:50]}")
            all_ok = False
    return all_ok

# ID mapping: old staging ID → new local ID
id_map = {}

def map_id(old_id):
    """Resolve an old ID to its new counterpart, or return as-is."""
    if not old_id:
        return old_id
    return id_map.get(old_id, old_id)

timestamp = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%S.000Z")

# ── Step 1: Create or use existing drive ──────────────────────────────────────

step("Step 1: Create drive")

if existing_drive:
    # Use an existing drive — skip creation
    drive_id = existing_drive
    # Resolve slug from the drive info
    try:
        stdout = sb_run("drives", "get", drive_id)
        drive_info_result = json.loads(stdout)
        drive_slug = drive_info_result.get("slug", drive_id)
        actual_name = drive_info_result.get("name", drive_name)
        log(f"Using existing drive: {actual_name} (ID: {drive_id}, Slug: {drive_slug})")
    except Exception as e:
        errf(f"Cannot access existing drive {drive_id}: {e}")
        sys.exit(1)
else:
    create_args = ["drives", "create", "--name", drive_name]
    if preferred_editor:
        create_args += ["--preferred-editor", preferred_editor]
    result = json.loads(sb_run(*create_args))
    drive_id = result["id"]
    drive_slug = result["slug"]
    log(f"Drive: {drive_name} (ID: {drive_id}, Slug: {drive_slug})")

# Verify drive is accessible
for attempt in range(5):
    time.sleep(1)
    if verify_drive(drive_id):
        log("Drive verified")
        break
    if attempt < 4:
        warn(f"Drive not ready yet, waiting... (attempt {attempt+1})")
else:
    errf("Drive verification failed after 5 attempts — aborting")
    sys.exit(1)

# Ensure the drive state has the correct name (the /d/<slug> endpoint uses
# state.global.name). When signing, ALWAYS do this so the drive document carries
# at least one signed op (creator attribution) — the auto-generated ADD_FILE ops
# from `docs create --drive` are server-signed, so a drive with no folders/icon
# would otherwise have no wallet on it.
if drive_name and (existing_drive or SIGN):
    mutate(drive_id, "setDriveName", {"name": drive_name})
    log(f"Set drive state name: {drive_name}")

# Set the drive icon if requested (applies to both new and existing drives).
if drive_icon:
    mutate(drive_id, "setDriveIcon", {"icon": drive_icon})
    log("Set drive icon")

# ── Step 2: Create folders ───────────────────────────────────────────────────

step("Step 2: Create folders")

def sort_folders(folders):
    """Topological sort: parents before children."""
    by_id = {f["id"]: f for f in folders}
    result = []
    visited = set()
    def visit(folder):
        if folder["id"] in visited:
            return
        parent = folder.get("parentFolder")
        if parent and parent in by_id:
            visit(by_id[parent])
        visited.add(folder["id"])
        result.append(folder)
    for f in folders:
        visit(f)
    return result

folder_actions = []
for folder in sort_folders(manifest["folders"]):
    new_id = str(uuid.uuid4())
    id_map[folder["id"]] = new_id
    inp = {"id": new_id, "name": folder["name"]}
    parent = folder.get("parentFolder")
    if parent:
        inp["parentFolder"] = id_map.get(parent, parent)
    folder_actions.append({"type": "ADD_FOLDER", "input": inp, "scope": "global"})
    log(f"Folder: {folder['name']}")

apply_actions(drive_id, folder_actions)

# Verify folders
verify_folders(drive_slug, len(manifest["folders"]))

# ── Step 3: Create documents ─────────────────────────────────────────────────

step("Step 3: Create documents")

# Order: builder-profiles first, then RTs, then SOs, then others
type_order = {
    "powerhouse/builder-profile": 0,
    "powerhouse/resource-template": 1,
    "powerhouse/service-offering": 2,
    "powerhouse/network-profile": 3,
    "powerhouse/builders": 4,
    "powerhouse/payment-terms": 5,
    "powerhouse/request-for-proposals": 6,
    "powerhouse/scope-of-work": 7,
    "powerhouse/workstream": 8,  # last — references network-profile, SOW, payment-terms
}
docs_sorted = sorted(manifest["documents"], key=lambda d: type_order.get(d["type"], 99))

def create_document(doc_type, doc_name, drive_slug_or_id, retries=3):
    """Create a document with retry. Uses CLI docs create."""
    last_err = None
    for attempt in range(retries):
        try:
            result = subprocess.run(
                ["switchboard", "docs", "create", "--type", doc_type,
                 "--name", doc_name, "--drive", drive_slug_or_id, "--format", "json"],
                capture_output=True, text=True, timeout=30,
            )
            if result.returncode == 0:
                data = json.loads(result.stdout)
                new_id = None
                # Parse response — handles multiple formats:
                # {"Prefix_createDocument": {"id": "..."}}
                # {"Prefix": {"createDocument": {"id": "..."}}}
                # {"id": "..."}
                # [{"id": "..."}]
                if isinstance(data, dict):
                    # Recursively find first "id" value in nested dicts
                    def find_id(obj):
                        if isinstance(obj, dict):
                            if "id" in obj and isinstance(obj["id"], str):
                                return obj["id"]
                            for v in obj.values():
                                r = find_id(v)
                                if r:
                                    return r
                        return None
                    new_id = find_id(data)
                elif isinstance(data, list) and data and isinstance(data[0], dict):
                    new_id = data[0].get("id")
                if not new_id:
                    raise RuntimeError(f"Could not parse ID from: {json.dumps(data)[:200]}")
                # Wait for doc to be fully committed before returning
                if not wait_for_doc(new_id):
                    warn(f"  Doc {new_id} created but not yet accessible — proceeding anyway")
                return new_id
            else:
                last_err = result.stderr[:300]
        except subprocess.TimeoutExpired:
            last_err = "timeout"
        except Exception as e:
            last_err = str(e)

        if attempt < retries - 1:
            wait = (attempt + 1) * 3
            warn(f"  create {doc_name} failed (attempt {attempt+1}): {last_err[:100]}... retrying in {wait}s")
            time.sleep(wait)

    raise RuntimeError(f"Failed after {retries} attempts: {last_err}")

for doc in docs_sorted:
    doc_type = doc["type"]

    try:
        display_name = clean_name(doc["name"])
        new_id = create_document(doc_type, display_name, drive_id)
        id_map[doc["id"]] = new_id
        log(f"{display_name} ({doc_type}) → {new_id}")
    except Exception as e:
        errf(f"Failed to create {doc['name']}: {e}")

# Verify document count
created_count = sum(1 for d in manifest["documents"] if d["id"] in id_map)
verify_documents(drive_slug, created_count)

# ── Step 4: Move documents to folders ─────────────────────────────────────────

step("Step 4: Move documents to folders")

move_actions = []
for doc in manifest["documents"]:
    new_doc_id = id_map.get(doc["id"])
    parent = doc.get("parentFolder")
    if not new_doc_id or not parent:
        continue
    new_parent = id_map.get(parent)
    if not new_parent:
        continue
    move_actions.append({
        "type": "MOVE_NODE",
        "input": {"srcFolder": new_doc_id, "targetParentFolder": new_parent},
        "scope": "global",
    })

if move_actions:
    apply_actions(drive_id, move_actions)

log(f"Moved {len(move_actions)} documents to folders")

# Verify placements
expected_placements = {}
for doc in manifest["documents"]:
    new_doc_id = id_map.get(doc["id"])
    parent = doc.get("parentFolder")
    if new_doc_id and parent:
        new_parent = id_map.get(parent)
        if new_parent:
            expected_placements[new_doc_id] = new_parent
if expected_placements:
    time.sleep(1)
    verify_placements(drive_slug, expected_placements)

# ── Step 5: Apply document states ─────────────────────────────────────────────

step("Step 5: Apply document states")

# ── Builder Profile handler ──

def apply_builder_profile(old_id, new_id, state):
    if not state:
        return
    ops = 0

    # isOperator
    if state.get("isOperator"):
        mutate(new_id, "setOperator", {"isOperator": True})
        ops += 1

    # Profile fields
    profile = {}
    for key in ("name", "slug", "code", "icon", "description", "about", "status"):
        if state.get(key) is not None:
            profile[key] = state[key]
    if state.get("id"):
        profile["id"] = state["id"]
    if profile:
        mutate(new_id, "updateProfile", profile)
        ops += 1

    # Links
    for link in state.get("links") or []:
        mutate(new_id, "addLink", {
            "id": link["id"],
            "label": link.get("label"),
            "url": link.get("url"),
        })
        ops += 1

    # Skills
    for skill in state.get("skills") or []:
        if isinstance(skill, str):
            mutate(new_id, "addSkill", {"skill": skill})
        elif isinstance(skill, dict):
            mutate(new_id, "addSkill", skill)
        ops += 1

    # Scopes
    for scope in state.get("scopes") or []:
        if isinstance(scope, str):
            mutate(new_id, "addScope", {"scope": scope})
        elif isinstance(scope, dict):
            mutate(new_id, "addScope", scope)
        ops += 1

    # Contributors (remap IDs)
    for contrib_id in state.get("contributors") or []:
        mapped = map_id(contrib_id)
        mutate(new_id, "addContributor", {"contributorPHID": mapped})
        ops += 1

    # Op hub member
    ohm = state.get("operationalHubMember")
    if ohm and (ohm.get("name") or ohm.get("phid")):
        mutate(new_id, "setOpHubMember", {
            "name": ohm.get("name"),
            "phid": map_id(ohm.get("phid")),
        })
        ops += 1

    log(f"Builder profile state applied ({ops} ops)")


# ── Resource Template handler ──

def apply_resource_template(old_id, new_id, state):
    if not state:
        return
    ops = 0

    # Template info
    info = {"lastModified": timestamp}
    for key in ("title", "summary", "description", "thumbnailUrl", "infoLink"):
        if state.get(key) is not None:
            info[key] = state[key]
    mutate(new_id, "updateTemplateInfo", info)
    ops += 1

    # Status
    if state.get("status"):
        mutate(new_id, "updateTemplateStatus", {"status": state["status"], "lastModified": timestamp})
        ops += 1

    # Operator
    if state.get("operatorId"):
        mutate(new_id, "setOperator", {"operatorId": map_id(state["operatorId"]), "lastModified": timestamp})
        ops += 1

    # Target audiences
    for aud in state.get("targetAudiences") or []:
        mutate(new_id, "addTargetAudience", {
            "id": aud["id"], "label": aud["label"],
            "color": aud.get("color"), "lastModified": timestamp,
        })
        ops += 1

    # Facet targets
    for ft in state.get("facetTargets") or []:
        mutate(new_id, "setFacetTarget", {
            "id": ft["id"], "categoryKey": ft["categoryKey"],
            "categoryLabel": ft["categoryLabel"],
            "selectedOptions": ft["selectedOptions"],
            "lastModified": timestamp,
        })
        ops += 1

    # Setup / recurring services
    if state.get("setupServices"):
        mutate(new_id, "setSetupServices", {"services": state["setupServices"], "lastModified": timestamp})
        ops += 1
    if state.get("recurringServices"):
        mutate(new_id, "setRecurringServices", {"services": state["recurringServices"], "lastModified": timestamp})
        ops += 1

    # Option groups
    for og in state.get("optionGroups") or []:
        og_input = {"id": og["id"], "name": og["name"], "lastModified": timestamp}
        for key in ("description", "isAddOn", "defaultSelected"):
            if og.get(key) is not None:
                og_input[key] = og[key]
        mutate(new_id, "addOptionGroup", og_input)
        ops += 1

    # Services
    for svc in state.get("services") or []:
        svc_input = {
            "id": svc["id"], "title": svc["title"],
            "isSetupFormation": svc.get("isSetupFormation", False),
            "lastModified": timestamp,
        }
        for key in ("description", "displayOrder", "optionGroupId", "parentServiceId"):
            if svc.get(key) is not None:
                svc_input[key] = svc[key]
        # Facet bindings
        if svc.get("facetBindings"):
            svc_input["facetBindings"] = svc["facetBindings"]
        mutate(new_id, "addService", svc_input)
        ops += 1

    # FAQs
    for faq in state.get("faqFields") or []:
        mutate(new_id, "addFaq", {
            "id": faq["id"],
            "question": faq.get("question"),
            "answer": faq.get("answer"),
            "displayOrder": faq.get("displayOrder", 0),
        })
        ops += 1

    # Content sections
    for cs in state.get("contentSections") or []:
        mutate(new_id, "addContentSection", {
            "id": cs["id"], "title": cs["title"],
            "content": cs["content"],
            "displayOrder": cs.get("displayOrder", 0),
            "lastModified": timestamp,
        })
        ops += 1

    log(f"Resource template state applied ({ops} ops)")


# ── Service Offering handler ──

def apply_service_offering(old_id, new_id, state):
    if not state:
        return
    ops = 0

    # Offering info
    info = {"lastModified": timestamp}
    for key in ("title", "summary", "description", "thumbnailUrl", "infoLink"):
        if state.get(key) is not None:
            info[key] = state[key]
    mutate(new_id, "updateOfferingInfo", info)
    ops += 1

    # Status
    if state.get("status"):
        mutate(new_id, "updateOfferingStatus", {"status": state["status"], "lastModified": timestamp})
        ops += 1

    # Operator
    if state.get("operatorId"):
        mutate(new_id, "setOperator", {"operatorId": map_id(state["operatorId"]), "lastModified": timestamp})
        ops += 1

    # Resource template link
    if state.get("resourceTemplateId"):
        mutate(new_id, "selectResourceTemplate", {
            "resourceTemplateId": map_id(state["resourceTemplateId"]),
            "lastModified": timestamp,
        })
        ops += 1

    # Billing cycles
    if state.get("availableBillingCycles"):
        mutate(new_id, "setAvailableBillingCycles", {
            "billingCycles": state["availableBillingCycles"],
            "lastModified": timestamp,
        })
        ops += 1

    # Facet targets
    for ft in state.get("facetTargets") or []:
        mutate(new_id, "setFacetTarget", {
            "id": ft["id"], "categoryKey": ft["categoryKey"],
            "categoryLabel": ft["categoryLabel"],
            "selectedOptions": ft["selectedOptions"],
            "lastModified": timestamp,
        })
        ops += 1

    # Option groups (before services that reference them)
    for og in state.get("optionGroups") or []:
        og_input = {
            "id": og["id"], "name": og["name"],
            "isAddOn": og.get("isAddOn", False),
            "defaultSelected": og.get("defaultSelected", False),
            "lastModified": timestamp,
        }
        for key in ("description", "costType", "currency", "price", "availableBillingCycles"):
            if og.get(key) is not None:
                og_input[key] = og[key]
        mutate(new_id, "addOptionGroup", og_input)
        ops += 1

        # Billing cycle discounts
        for bcd in og.get("billingCycleDiscounts") or []:
            mutate(new_id, "setOptionGroupBillingCycleDiscount", {
                "optionGroupId": og["id"],
                "billingCycle": bcd["billingCycle"],
                "discountRule": bcd["discountRule"],
                "lastModified": timestamp,
            })
            ops += 1

        # Standalone pricing
        sp = og.get("standalonePricing")
        if sp:
            sp_input = {"optionGroupId": og["id"], "lastModified": timestamp}
            if sp.get("setupCost"):
                sp_input["setupCost"] = sp["setupCost"]
            sp_input["recurringPricing"] = sp.get("recurringPricing") or []
            mutate(new_id, "setOptionGroupStandalonePricing", sp_input)
            ops += 1

    # Services
    for svc in state.get("services") or []:
        svc_input = {
            "id": svc["id"], "title": svc["title"],
            "isSetupFormation": svc.get("isSetupFormation", False),
            "lastModified": timestamp,
        }
        for key in ("description", "displayOrder", "optionGroupId"):
            if svc.get(key) is not None:
                svc_input[key] = svc[key]
        mutate(new_id, "addService", svc_input)
        ops += 1

    # Tiers
    for tier in state.get("tiers") or []:
        tier_input = {
            "id": tier["id"], "name": tier["name"],
            "isCustomPricing": tier.get("isCustomPricing", False),
            "lastModified": timestamp,
        }
        if tier.get("description") is not None:
            tier_input["description"] = tier["description"]
        pricing = tier.get("pricing") or {}
        tier_input["currency"] = pricing.get("currency", "USD")
        if pricing.get("amount") is not None:
            tier_input["amount"] = pricing["amount"]
        mutate(new_id, "addTier", tier_input)
        ops += 1

        # Tier base pricing
        if pricing.get("amount") is not None and pricing["amount"] > 0:
            mutate(new_id, "updateTierPricing", {
                "tierId": tier["id"],
                "amount": pricing["amount"],
                "currency": pricing.get("currency", "USD"),
                "lastModified": timestamp,
            })
            ops += 1

        # Default billing cycle
        if tier.get("defaultBillingCycle"):
            mutate(new_id, "setTierDefaultBillingCycle", {
                "tierId": tier["id"],
                "defaultBillingCycle": tier["defaultBillingCycle"],
                "lastModified": timestamp,
            })
            ops += 1

        # Billing cycle discounts
        for bcd in tier.get("billingCycleDiscounts") or []:
            mutate(new_id, "setTierBillingCycleDiscount", {
                "tierId": tier["id"],
                "billingCycle": bcd["billingCycle"],
                "discountRule": bcd["discountRule"],
                "lastModified": timestamp,
            })
            ops += 1

        # Service levels
        for sl in tier.get("serviceLevels") or []:
            sl_input = {
                "tierId": tier["id"],
                "serviceLevelId": sl["id"],
                "serviceId": sl["serviceId"],
                "level": sl["level"],
                "lastModified": timestamp,
            }
            for key in ("optionGroupId", "customValue"):
                if sl.get(key) is not None:
                    sl_input[key] = sl[key]
            mutate(new_id, "addServiceLevel", sl_input)
            ops += 1

        # Usage limits
        for ul in tier.get("usageLimits") or []:
            ul_input = {
                "tierId": tier["id"],
                "limitId": ul["id"],
                "serviceId": ul["serviceId"],
                "metric": ul["metric"],
                "lastModified": timestamp,
            }
            for key in ("unitName", "freeLimit", "paidLimit", "resetCycle",
                        "unitPrice", "unitPriceCurrency", "notes"):
                if ul.get(key) is not None:
                    ul_input[key] = ul[key]
            mutate(new_id, "addUsageLimit", ul_input)
            ops += 1

    # Tier-dependent pricing (after tiers exist)
    for og in state.get("optionGroups") or []:
        for tp in og.get("tierDependentPricing") or []:
            tp_input = {
                "optionGroupId": og["id"],
                "tierPricingId": tp["id"],
                "tierId": tp["tierId"],
                "recurringPricing": tp.get("recurringPricing") or [],
                "lastModified": timestamp,
            }
            if tp.get("setupCost"):
                tp_input["setupCost"] = tp["setupCost"]
            if tp.get("setupCostDiscounts"):
                tp_input["setupCostDiscounts"] = tp["setupCostDiscounts"]
            mutate(new_id, "addOptionGroupTierPricing", tp_input)
            ops += 1

    log(f"Service offering state applied ({ops} ops)")


# ── Generic handler via mutation introspection ──

_input_type_cache = {}

def sb_query(query):
    stdout = sb_run_raw("query", query, "--format", "json")
    return json.loads(stdout) if stdout.strip() else None

def unwrap_gql_type(t):
    while t and t.get("kind") in ("NON_NULL", "LIST"):
        t = t.get("ofType") or {}
    return t or {"kind": "SCALAR", "name": "String"}

def get_input_fields(input_type_name):
    if input_type_name in _input_type_cache:
        return _input_type_cache[input_type_name]
    try:
        data = sb_query(
            '{ __type(name: "' + input_type_name + '") { name inputFields { name type { name kind ofType { name kind ofType { name kind } } } } } }'
        )
    except Exception:
        _input_type_cache[input_type_name] = []
        return []
    fields = (data or {}).get("__type", {}).get("inputFields") or []
    _input_type_cache[input_type_name] = fields
    return fields

def type_to_prefix(doc_type):
    name = doc_type.split("/")[-1]
    return "".join(word.capitalize() for word in name.split("-"))

def discover_operations(doc_type):
    """Discover available mutations for a type using switchboard models get."""
    try:
        stdout = sb_run("models", "get", doc_type)
        data = json.loads(stdout)
        return data.get("operations", [])
    except Exception:
        return []

def apply_generic_state(old_id, new_id, state, doc_type):
    """Apply state for any document type by discovering its operations."""
    prefix = type_to_prefix(doc_type)
    operations = discover_operations(doc_type)

    if not operations:
        warn(f"No operations discovered for {doc_type} — left empty")
        return

    ops_done = 0

    # Phase 1: set/update mutations → match to scalar state fields
    for op_info in operations:
        op_name = op_info["operation"]
        if op_name == "createDocument":
            continue
        if not (op_name.startswith("set") or op_name.startswith("update")):
            continue

        # Find the 'input' argument type
        input_type_name = None
        for arg in op_info.get("args", []):
            if arg["name"] == "input":
                input_type_name = arg["type_name"]
                break
        if not input_type_name:
            continue

        input_fields = get_input_fields(input_type_name)
        if not input_fields:
            continue

        input_data = {}
        for field in input_fields:
            fname = field["name"]
            if fname == "lastModified":
                input_data[fname] = timestamp
            elif fname in state and state[fname] is not None:
                input_data[fname] = state[fname]

        real_fields = {k for k in input_data if k != "lastModified"}
        if not real_fields:
            continue

        try:
            mutate(new_id, op_name, input_data)
            ops_done += 1
        except Exception:
            pass

    # Phase 2: add mutations → match to state arrays
    consumed_arrays = set()
    for op_info in operations:
        op_name = op_info["operation"]
        if not op_name.startswith("add"):
            continue

        input_type_name = None
        for arg in op_info.get("args", []):
            if arg["name"] == "input":
                input_type_name = arg["type_name"]
                break
        if not input_type_name:
            continue

        input_fields = get_input_fields(input_type_name)
        if not input_fields:
            continue

        field_names = {f["name"] for f in input_fields} - {"lastModified"}

        # Find best matching array in state
        best_key = None
        best_score = 0
        for state_key, state_val in state.items():
            if not isinstance(state_val, list) or not state_val:
                continue
            if state_key in consumed_arrays:
                continue
            sample = state_val[0]
            if not isinstance(sample, dict):
                continue
            overlap = len(field_names & set(sample.keys()))
            if overlap > best_score and overlap >= max(1, len(field_names) * 0.4):
                best_score = overlap
                best_key = state_key

        if not best_key:
            continue

        consumed_arrays.add(best_key)
        for item in state[best_key]:
            item_input = {}
            for f in input_fields:
                fname = f["name"]
                if fname == "lastModified":
                    item_input[fname] = timestamp
                elif fname in item and item[fname] is not None:
                    item_input[fname] = item[fname]
            try:
                mutate(new_id, op_name, item_input)
                ops_done += 1
            except Exception as e:
                warn(f"  {op_name} failed: {e}")
                break

    log(f"Generic state applied for {doc_type} ({ops_done} ops)")


# ── Expense Report handler ──

def apply_expense_report(old_id, new_id, state):
    if not state:
        return

    # 1. Scalars
    if state.get("ownerId"):
        mutate(new_id, "setOwnerId", {"ownerId": state["ownerId"]})
    if state.get("periodStart"):
        mutate(new_id, "setPeriodStart", {"periodStart": state["periodStart"]})
    if state.get("periodEnd"):
        mutate(new_id, "setPeriodEnd", {"periodEnd": state["periodEnd"]})
    if state.get("startDate") or state.get("endDate"):
        inp = {}
        if state.get("startDate"):
            inp["startDate"] = state["startDate"]
        if state.get("endDate"):
            inp["endDate"] = state["endDate"]
        if inp:
            mutate(new_id, "setPeriod", inp)
    if state.get("status"):
        mutate(new_id, "setStatus", {"status": state["status"]})

    # 2. Line item groups — root groups first (parentId=None), then children
    groups = state.get("groups") or []
    root_groups = [g for g in groups if not g.get("parentId")]
    child_groups = [g for g in groups if g.get("parentId")]
    for grp in root_groups + child_groups:
        inp = {"id": grp["id"], "label": grp.get("label", "")}
        if grp.get("parentId"):
            inp["parentId"] = grp["parentId"]
        mutate(new_id, "addLineItemGroup", inp)

    # 3. Wallets, line items, group totals, billing statements
    for wallet in state.get("wallets") or []:
        wallet_addr = wallet.get("wallet")
        if not wallet_addr:
            continue

        # Add wallet
        mutate(new_id, "addWallet", {
            "wallet": wallet_addr,
            "name": wallet.get("name", ""),
        })

        # Add line items inside this wallet
        for li in wallet.get("lineItems") or []:
            li_input = {
                "wallet": wallet_addr,
                "lineItem": {
                    "id": li["id"],
                    "label": li.get("label", ""),
                    "group": li.get("group"),
                },
            }
            for key in ("budget", "actuals", "forecast", "payments", "comments"):
                if li.get(key) is not None:
                    li_input["lineItem"][key] = li[key]
            mutate(new_id, "addLineItem", li_input)

        # Set group totals for this wallet
        for tot in wallet.get("totals") or []:
            mutate(new_id, "setGroupTotals", {
                "wallet": wallet_addr,
                "groupTotals": {
                    "group": tot["group"],
                    "totalBudget": tot.get("totalBudget", 0),
                    "totalForecast": tot.get("totalForecast", 0),
                    "totalActuals": tot.get("totalActuals", 0),
                    "totalPayments": tot.get("totalPayments", 0),
                },
            })

        # Add billing statements for this wallet
        for bs in wallet.get("billingStatements") or []:
            bs_id = bs if isinstance(bs, str) else bs.get("id", bs.get("billingStatementId"))
            if bs_id:
                mutate(new_id, "addBillingStatement", {
                    "wallet": wallet_addr,
                    "billingStatementId": bs_id,
                })

# ── Workstream handler ──

def apply_workstream(old_id, new_id, state):
    if not state:
        return

    # 1. Client info (references network-profile doc)
    client = state.get("client")
    if client and client.get("id"):
        mutate(new_id, "editClientInfo", {
            "clientId": map_id(client["id"]),
            "name": client.get("name", ""),
            "icon": client.get("icon", ""),
        })

    # 2. Workstream basics
    ws_input = {}
    for key in ("code", "title"):
        if state.get(key):
            ws_input[key] = state[key]
    if state.get("status"):
        ws_input["status"] = state["status"]
    if state.get("sow"):
        ws_input["sowId"] = map_id(state["sow"])
    if state.get("paymentTerms"):
        ws_input["paymentTerms"] = map_id(state["paymentTerms"])
    if ws_input:
        mutate(new_id, "editWorkstream", ws_input)

    # 3. RFP
    rfp = state.get("rfp")
    if rfp and (rfp.get("id") or rfp.get("title")):
        mutate(new_id, "setRequestForProposal", {
            "rfpId": map_id(rfp.get("id", "")),
            "title": rfp.get("title", ""),
        })

    # 4. Initial proposal
    ip = state.get("initialProposal")
    if ip and ip.get("id"):
        ip_input = {"id": ip["id"]}
        if ip.get("sow"):
            ip_input["sowId"] = map_id(ip["sow"])
        if ip.get("paymentTerms"):
            ip_input["paymentTermsId"] = map_id(ip["paymentTerms"])
        if ip.get("status"):
            ip_input["status"] = ip["status"]
        author = ip.get("author")
        if author:
            ip_input["proposalAuthor"] = {
                "id": map_id(author.get("id", "")),
                "name": author.get("name", ""),
            }
            if author.get("icon"):
                ip_input["proposalAuthor"]["icon"] = author["icon"]
        mutate(new_id, "editInitialProposal", ip_input)

    # 5. Alternative proposals
    for ap in state.get("alternativeProposals") or []:
        if ap.get("id"):
            mutate(new_id, "addAlternativeProposal", ap)


# ── Scope of Work handler ──

def apply_scope_of_work(old_id, new_id, state):
    if not state:
        return

    # 1. Basic info
    sow_input = {}
    for key in ("title", "description", "status"):
        if state.get(key):
            sow_input[key] = state[key]
    if sow_input:
        mutate(new_id, "editScopeOfWork", sow_input)

    # 2. Agents (called 'contributors' in state)
    for agent in state.get("contributors") or []:
        mutate(new_id, "addAgent", {
            "id": agent.get("id", ""),
            "name": agent.get("name", ""),
            "icon": agent.get("icon"),
            "description": agent.get("description"),
        })

    # 3. Projects (before deliverables that reference them)
    for proj in state.get("projects") or []:
        proj_input = {"id": proj["id"]}
        for key in ("code", "title", "slug", "abstract", "imageUrl"):
            if proj.get(key) is not None:
                proj_input[key] = proj[key]
        if proj.get("budgetType"):
            proj_input["budgetType"] = proj["budgetType"]
        if proj.get("currency"):
            proj_input["currency"] = proj["currency"]
        if proj.get("budget") is not None:
            proj_input["budget"] = proj["budget"]
        if proj.get("projectOwner"):
            proj_input["projectOwner"] = proj["projectOwner"]
        mutate(new_id, "addProject", proj_input)

    # 4. Roadmaps (before milestones)
    for rm in state.get("roadmaps") or []:
        rm_input = {"id": rm["id"]}
        for key in ("title", "slug", "description"):
            if rm.get(key) is not None:
                rm_input[key] = rm[key]
        mutate(new_id, "addRoadmap", rm_input)

    # 5. Deliverables (basic creation)
    for dl in state.get("deliverables") or []:
        dl_input = {"id": dl["id"]}
        for key in ("title", "code", "description", "status", "owner"):
            if dl.get(key) is not None:
                dl_input[key] = dl[key]
        mutate(new_id, "addDeliverable", dl_input)

    # 6. Deliverable progress
    for dl in state.get("deliverables") or []:
        wp = dl.get("workProgress")
        if wp and (wp.get("completed") or wp.get("total")):
            mutate(new_id, "setDeliverableProgress", {
                "id": dl["id"],
                "workProgress": {
                    "storyPoints": {
                        "total": wp.get("total", 0),
                        "completed": wp.get("completed", 0),
                    },
                },
            })

    # 7. Key results per deliverable
    for dl in state.get("deliverables") or []:
        for kr in dl.get("keyResults") or []:
            kr_input = {
                "id": kr["id"],
                "deliverableId": dl["id"],
            }
            for key in ("title", "link"):
                if kr.get(key) is not None:
                    kr_input[key] = kr[key]
            mutate(new_id, "addKeyResult", kr_input)

    # 8. Budget anchors per deliverable
    for dl in state.get("deliverables") or []:
        ba = dl.get("budgetAnchor")
        if ba and ba.get("project"):
            ba_input = {
                "deliverableId": dl["id"],
                "project": ba["project"],
            }
            for key in ("unit", "unitCost", "quantity", "margin"):
                if ba.get(key) is not None:
                    ba_input[key] = ba[key]
            mutate(new_id, "setDeliverableBudgetAnchorProject", ba_input)

    # 9. Milestones per roadmap
    for rm in state.get("roadmaps") or []:
        for ms in rm.get("milestones") or []:
            ms_input = {
                "id": ms["id"],
                "roadmapId": rm["id"],
            }
            for key in ("sequenceCode", "title", "description", "deliveryTarget"):
                if ms.get(key) is not None:
                    ms_input[key] = ms[key]
            mutate(new_id, "addMilestone", ms_input)

            # Coordinators per milestone
            for coord in ms.get("coordinators") or []:
                coord_id = coord if isinstance(coord, str) else coord.get("id", "")
                if coord_id:
                    mutate(new_id, "addCoordinator", {
                        "id": coord_id,
                        "milestoneId": ms["id"],
                    })

            # Deliverable links per milestone
            for msd in ms.get("deliverables") or []:
                if isinstance(msd, str):
                    mutate(new_id, "addMilestoneDeliverable", {
                        "milestoneId": ms["id"],
                        "deliverableId": msd,
                    })
                elif isinstance(msd, dict) and msd.get("id"):
                    mutate(new_id, "addMilestoneDeliverable", {
                        "milestoneId": ms["id"],
                        "deliverableId": msd["id"],
                        "title": msd.get("title", ""),
                    })


# ── Request for Proposals handler ──

def apply_request_for_proposals(old_id, new_id, state):
    if not state:
        return

    # editRfp with all available fields
    rfp_input = {}
    for key in ("title", "code", "summary", "briefing", "eligibilityCriteria",
                "evaluationCriteria", "status", "deadline"):
        if state.get(key) is not None:
            rfp_input[key] = state[key]
    if state.get("budgetRange"):
        rfp_input["budgetRange"] = state["budgetRange"]
    if rfp_input:
        mutate(new_id, "editRfp", rfp_input)


# ── Apply states to all documents ─────────────────────────────────────────────

HANDLERS = {
    "powerhouse/builder-profile": apply_builder_profile,
    "powerhouse/resource-template": apply_resource_template,
    "powerhouse/service-offering": apply_service_offering,
    "powerhouse/expense-report": apply_expense_report,
    "powerhouse/workstream": apply_workstream,
    "powerhouse/scope-of-work": apply_scope_of_work,
    "powerhouse/request-for-proposals": apply_request_for_proposals,
}

for doc in docs_sorted:
    new_id = id_map.get(doc["id"])
    if not new_id:
        continue
    state = load_state(doc["id"])
    if state is None:
        continue

    handler = HANDLERS.get(doc["type"])
    if handler:
        try:
            begin_batch(new_id)
            handler(doc["id"], new_id, state)
            ops = flush_batch()
            log(f"Batch applied {doc['name']} ({ops} ops)")
        except Exception as e:
            _batch_target = None  # reset on error
            errf(f"Error applying state for '{doc['name']}': {e}")
    else:
        try:
            begin_batch(new_id)
            apply_generic_state(doc["id"], new_id, state, doc["type"])
            ops = flush_batch()
            log(f"Batch applied {doc['name']} ({ops} ops)")
        except Exception as e:
            _batch_target = None  # reset on error
            errf(f"Error applying generic state for '{doc['name']}': {e}")

# ── Step 5b: Cross-drive ID remapping ─────────────────────────────────────────

external_id_map_path = os.environ.get("EXTERNAL_ID_MAP", "").strip()
if external_id_map_path and os.path.exists(external_id_map_path):
    step("Step 5b: Cross-drive ID remapping")
    with open(external_id_map_path) as f:
        external_map = json.load(f)
    log(f"Loaded external ID map: {len(external_map)} entries from {external_id_map_path}")

    # Find builder-profile docs and remap their contributors
    for doc in docs_sorted:
        if doc["type"] != "powerhouse/builder-profile":
            continue
        new_id = id_map.get(doc["id"])
        if not new_id:
            continue
        state = load_state(doc["id"])
        if not state:
            continue

        contributors = state.get("contributors") or []
        to_remap = [c for c in contributors if c in external_map]
        if not to_remap:
            continue

        log(f"Remapping {len(to_remap)} contributor(s) in {doc['name']}")
        for old_contrib in to_remap:
            new_contrib = external_map[old_contrib]
            mutate(new_id, "removeContributor", {"contributorPHID": old_contrib})
            mutate(new_id, "addContributor", {"contributorPHID": new_contrib})
        log(f"Remapped {len(to_remap)} contributors")

# ── Step 6: Verify applied states ─────────────────────────────────────────────

step("Step 6: Verify applied states")

verified = 0
verify_failed = 0

for doc in docs_sorted:
    new_id = id_map.get(doc["id"])
    if not new_id:
        continue
    state = load_state(doc["id"])
    if not state:
        continue

    doc_type = doc["type"]
    checks = {}

    if doc_type == "powerhouse/builder-profile":
        if state.get("isOperator"):
            checks["isOperator"] = True
        if state.get("name"):
            checks["name"] = state["name"]
        if state.get("slug"):
            checks["slug"] = state["slug"]
    elif doc_type == "powerhouse/resource-template":
        if state.get("operatorId"):
            checks["operatorId"] = map_id(state["operatorId"])
        if state.get("title"):
            checks["title"] = state["title"]
        if state.get("status"):
            checks["status"] = state["status"]
    elif doc_type == "powerhouse/service-offering":
        if state.get("operatorId"):
            checks["operatorId"] = map_id(state["operatorId"])
        if state.get("title"):
            checks["title"] = state["title"]
        if state.get("resourceTemplateId"):
            checks["resourceTemplateId"] = map_id(state["resourceTemplateId"])

    if not checks:
        continue

    ok = verify_doc_state(new_id, checks)
    if ok:
        verified += 1
        log(f"Verified: {doc['name']} ({len(checks)} checks)")
    else:
        verify_failed += 1
        errf(f"Verification failed: {doc['name']}")

if verified > 0 or verify_failed > 0:
    log(f"State verification: {verified} passed, {verify_failed} failed")

# ── Save ID map ──────────────────────────────────────────────────────────────

with open(id_map_file, "w") as f:
    json.dump(id_map, f, indent=2)
log(f"ID map saved to {id_map_file}")

# ── Final summary ─────────────────────────────────────────────────────────────

step("Summary")
log(f"Drive: {drive_name} (ID: {drive_id}, Slug: {drive_slug})")

type_counts = {}
for doc in manifest["documents"]:
    t = doc["type"]
    if doc["id"] in id_map:
        type_counts[t] = type_counts.get(t, 0) + 1
for t, count in sorted(type_counts.items()):
    mode = "dedicated handler" if t in HANDLERS else "generic introspection"
    log(f"  {t}: {count} ({mode})")

print()
log(f"Open in Connect:")
print(f"  {C}http://localhost:3001/?driveUrl=http://localhost:4001/d/{drive_id}{NC}")
print()
log("Done!")
PYEOF
