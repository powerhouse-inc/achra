#!/usr/bin/env bash
###############################################################################
# common.sh — Shared helpers for drive-sync scripts
#
# Source this file: source "$(dirname "${BASH_SOURCE[0]}")/lib/common.sh"
###############################################################################

# ── Colors ──────────────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

# ── Logging ─────────────────────────────────────────────────────────────────

log()  { echo -e "${GREEN}  ✓${NC} $*"; }
warn() { echo -e "${YELLOW}  !${NC} $*"; }
err()  { echo -e "${RED}  ✗${NC} $*" >&2; }
step() { echo -e "\n${CYAN}━━━ $* ━━━${NC}"; }
die()  { err "$@"; exit 1; }

# ── JSON helpers ────────────────────────────────────────────────────────────

# Parse JSON with python3
pyjq() {
  python3 -c "import sys,json; $1" 2>&1
}

# ── Switchboard helpers ─────────────────────────────────────────────────────

# Run a switchboard command, return stdout
sb_run() {
  switchboard "$@" --format json 2>&1
}

# Mutate a document. Reads JSON input from stdin.
# Usage: echo '{"key":"val"}' | sb_mutate <doc_id> <operation>
sb_mutate() {
  local doc_id="$1" op="$2"
  local tmpfile
  tmpfile=$(mktemp /tmp/sb-input-XXXXXX.json)
  cat > "$tmpfile"
  local result
  result=$(switchboard docs mutate "$doc_id" --op "$op" --input-file "$tmpfile" --format json --quiet 2>&1) \
    || { err "Failed: mutate $doc_id --op $op"; err "$result"; rm -f "$tmpfile"; return 1; }
  rm -f "$tmpfile"
  echo "$result"
}

# ── Preflight ───────────────────────────────────────────────────────────────

preflight() {
  command -v switchboard >/dev/null 2>&1 || die "switchboard CLI not found"
  command -v python3     >/dev/null 2>&1 || die "python3 not found"
  switchboard ping --format json >/dev/null 2>&1 || die "Switchboard not reachable"
  log "Switchboard reachable"
  # Re-introspect to ensure all document types are discovered
  switchboard introspect >/dev/null 2>&1 || warn "Introspection failed — some types may be unavailable"
  log "Schema introspected"
}

# ── Safety checks ──────────────────────────────────────────────────────────

# Get the active profile name and URL
get_active_profile() {
  switchboard config show --format json 2>/dev/null \
    | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('name','?'), d.get('url','?'))" 2>/dev/null
}

# Confirm the user wants to operate on this profile. Aborts if declined.
# Usage: confirm_target "upload to" or confirm_target "delete from"
confirm_target() {
  local action="${1:-operate on}"
  local profile_info
  profile_info=$(get_active_profile)
  local profile_name profile_url
  profile_name=$(echo "$profile_info" | cut -d' ' -f1)
  profile_url=$(echo "$profile_info" | cut -d' ' -f2-)

  echo ""
  echo -e "  ${YELLOW}⚠  You are about to ${action}:${NC}"
  echo -e "  ${CYAN}Profile:${NC} $profile_name"
  echo -e "  ${CYAN}URL:${NC}     $profile_url"
  echo ""

  # Auto-confirm for local profiles (localhost)
  if echo "$profile_url" | grep -qE "localhost|127\.0\.0\.1"; then
    log "Local target — proceeding"
    return 0
  fi

  # Require explicit confirmation for remote targets
  if [ "${CONFIRM_REMOTE:-}" = "yes" ]; then
    log "Remote target auto-confirmed (CONFIRM_REMOTE=yes)"
    return 0
  fi

  echo -e "  ${RED}This is a REMOTE target. Changes cannot be easily undone.${NC}"
  read -r -p "  Type the profile name to confirm (${profile_name}): " confirmation
  if [ "$confirmation" != "$profile_name" ]; then
    die "Aborted — confirmation did not match"
  fi
  log "Confirmed: $profile_name"
}

# Assert the active profile matches expected. Aborts if not.
# Usage: assert_profile "local"
assert_profile() {
  local expected="$1"
  local profile_info
  profile_info=$(get_active_profile)
  local actual_name
  actual_name=$(echo "$profile_info" | cut -d' ' -f1)

  if [ "$actual_name" != "$expected" ]; then
    die "Expected profile '$expected' but active profile is '$actual_name'. Aborting to prevent cross-profile damage."
  fi
}

# Check that the target switchboard has the required document types.
# Usage: compat_check "type1" "type2" ...
# Returns 0 if all present, 1 if any missing (prints warnings).
compat_check() {
  local required=("$@")
  local available
  available=$(switchboard models list --format json 2>/dev/null \
    | python3 -c "import sys,json; print('\n'.join(m['type'] for m in json.load(sys.stdin)))" 2>/dev/null)

  local missing=()
  for t in "${required[@]}"; do
    if ! echo "$available" | grep -qx "$t"; then
      missing+=("$t")
    fi
  done

  if [ ${#missing[@]} -gt 0 ]; then
    warn "Target is missing ${#missing[@]} document type(s):"
    for t in "${missing[@]}"; do
      warn "  - $t"
    done
    warn "Documents of these types will be skipped during upload."
    return 1
  fi

  log "All ${#required[@]} required document types available"
  return 0
}
