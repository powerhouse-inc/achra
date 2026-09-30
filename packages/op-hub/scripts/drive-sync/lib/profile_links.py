"""Resolve imported profile identities and make operational-hub links usable."""
import json
import os
from pathlib import Path
import subprocess

BUILDER = "powerhouse/builder-profile"
HUB = "powerhouse/operational-hub-profile"
TEAM_EDITORS = {"team-admin", "builder-team-admin"}


class Switchboard:
    def __init__(self, profile):
        self.profile = profile

    def json(self, *args):
        result = subprocess.run(
            ["switchboard", "--profile", self.profile, *args, "--format", "json"],
            capture_output=True, text=True, timeout=120,
        )
        if result.returncode:
            raise RuntimeError(result.stderr.strip() or result.stdout.strip())
        return json.loads(result.stdout)

    def document(self, identifier):
        return self.json("docs", "get", identifier, "--state")

    def mutate(self, identifier, operation, payload):
        return self.json("docs", "mutate", identifier, "--op", operation,
                         "--input", json.dumps(payload))


def source_drives(data_dir):
    for directory in sorted(Path(data_dir).iterdir()):
        manifest = directory / "manifest.json"
        mapping = directory / "id-map.json"
        if not (manifest.is_file() and mapping.is_file()):
            continue
        info_path = directory / "drive-info.json"
        info = json.loads(info_path.read_text()) if info_path.exists() else {}
        yield directory, json.loads(manifest.read_text()), json.loads(mapping.read_text()), info


def extend_identity_map(data_dir, mapping):
    """Legacy references may use global.id rather than the source header.id.

    Prefer the team-admin copy when the same operator was copied into both
    its own drive and the builders registry. Header mappings take precedence.
    """
    aliases = {}
    for directory, manifest, local_map, info in source_drives(data_dir):
        priority = int(info.get("preferredEditor") in TEAM_EDITORS)
        for doc in manifest.get("documents", []):
            target = local_map.get(doc["id"])
            path = directory / "states" / (doc["id"] + ".json")
            if not target or not path.exists():
                continue
            state = json.loads(path.read_text())
            alias = state.get("id")
            if isinstance(alias, str) and alias and alias not in mapping:
                if alias not in aliases or priority > aliases[alias][0]:
                    aliases[alias] = (priority, target)
    return {**mapping, **{alias: target for alias, (_, target) in aliases.items()}}


def choose_operator_team(source_team, mapping, profiles, team_ids, hub_ids, override=None):
    if override:
        if override not in profiles:
            raise RuntimeError("Operator override does not resolve to a builder profile")
        return override
    mapped = mapping.get(source_team, source_team)
    if mapped in profiles:
        return mapped
    candidates = [identifier for identifier in team_ids if identifier in profiles
                  and profiles[identifier]["state"]["global"].get("isOperator")
                  and (profiles[identifier]["state"]["global"].get("operationalHubMember") or {}).get("phid") in hub_ids]
    if len(candidates) != 1:
        raise RuntimeError(
            f"Cannot uniquely resolve the hub operator team ({len(candidates)} candidates). "
            "Set OPERATOR_TEAM_PROFILE to the intended target builder profile."
        )
    return candidates[0]


def all_builder_profiles(sb):
    query = 'query($cursor: String) { findDocuments(search: { type: "powerhouse/builder-profile" }, paging: { limit: 500, cursor: $cursor }) { items { id documentType state name } hasNextPage cursor } }'
    profiles = {}
    cursor = None
    while True:
        page = sb.json("query", query, "--variables", json.dumps({"cursor": cursor}))["findDocuments"]
        profiles.update((doc["id"], doc) for doc in page["items"])
        if not page["hasNextPage"]:
            return profiles
        next_cursor = page.get("cursor")
        if not next_cursor or next_cursor == cursor:
            raise RuntimeError("Builder-profile cursor did not advance")
        cursor = next_cursor


def ensure_operational_hub_links(data_dir, profile, mapping, sb=None):
    sb = sb or Switchboard(profile)
    drives = sb.json("drives", "list")
    # `drives list` omits preferredEditor; use the full documents to distinguish
    # team-admin profiles from duplicate copies in the builders registry.
    drives = [drive if "preferredEditor" in drive else sb.json("drives", "get", drive["id"]) for drive in drives]
    profiles = all_builder_profiles(sb)
    team_ids = {node["id"] for drive in drives if drive.get("preferredEditor") in TEAM_EDITORS
                for node in drive["state"]["global"]["nodes"]
                if node.get("documentType") == BUILDER}
    changed = 0
    for directory, manifest, local_map, info in source_drives(data_dir):
        source_hubs = [doc for doc in manifest.get("documents", []) if doc["type"] == HUB]
        if not source_hubs and info.get("preferredEditor") != "contributor-billing-editor":
            continue
        name = info.get("name") or manifest["source"]["name"]
        slug = info.get("slug") or manifest["source"]["slug"]
        candidates = [drive for drive in drives if drive.get("slug") == slug or drive.get("name") == name]
        if len(candidates) != 1:
            raise RuntimeError(f"Cannot uniquely locate imported operational-hub drive {name!r}")
        drive = candidates[0]
        hubs = [node["id"] for node in drive["state"]["global"]["nodes"] if node.get("documentType") == HUB]
        imported_hubs = [local_map[doc["id"]] for doc in source_hubs if doc["id"] in local_map]
        if not hubs:
            if imported_hubs:
                canonical = imported_hubs[0]
                sb.json("docs", "add-to", drive["id"], canonical)
            else:
                canonical = sb.json("docs", "create", "--type", HUB, "--name", name, "--drive", drive["id"])["id"]
                sb.mutate(canonical, "setOperationalHubName", {"name": name})
            hubs = [canonical]
            changed += 1
        canonical = next((identifier for identifier in imported_hubs if identifier in hubs), hubs[0])
        hub = sb.document(canonical)
        source_team = hub["state"]["global"].get("operatorTeam")
        if source_hubs:
            source_path = directory / "states" / (source_hubs[0]["id"] + ".json")
            if source_path.exists():
                source_team = json.loads(source_path.read_text()).get("operatorTeam") or source_team
        operator = choose_operator_team(source_team, mapping, profiles, team_ids,
                                        set(hubs) | {doc["id"] for doc in source_hubs},
                                        os.environ.get("OPERATOR_TEAM_PROFILE"))
        associated_subteams = {identifier for identifier in team_ids if identifier != operator
                              and identifier in profiles
                              and (profiles[identifier]["state"]["global"].get("operationalHubMember") or {}).get("phid") in set(hubs)}
        for identifier in hubs:
            state = sb.document(identifier)["state"]["global"]
            current = state.get("operatorTeam")
            # Keep an unrelated, valid manually chosen team on an extra profile.
            if identifier != canonical and current in profiles and current != operator:
                continue
            if current != operator:
                sb.mutate(identifier, "setOperatorTeam", {"operatorTeam": operator})
                changed += 1
            for old_team in state.get("subteams") or []:
                target = mapping.get(old_team, old_team)
                if target != old_team:
                    sb.mutate(identifier, "removeSubteam", {"subteam": old_team})
                    sb.mutate(identifier, "addSubteam", {"subteam": target})
                    changed += 1
            current_subteams = {mapping.get(team, team) for team in state.get("subteams") or []}
            for subteam in sorted(associated_subteams - current_subteams):
                sb.mutate(identifier, "addSubteam", {"subteam": subteam})
                changed += 1
        expected_member = {"name": hub["state"]["global"]["name"], "phid": canonical}
        if profiles[operator]["state"]["global"].get("operationalHubMember") != expected_member:
            sb.mutate(operator, "setOpHubMember", expected_member)
            changed += 1
        linked = sb.document(canonical)["state"]["global"].get("operatorTeam")
        if linked != operator:
            raise RuntimeError(f"Operational-hub operator readback failed for {name!r}")
        print(f"  ✓ {name}: hub {canonical} → operator {operator}", flush=True)
    return changed


def validate_saved_map(directory, profile):
    directory = Path(directory)
    manifest = json.loads((directory / "manifest.json").read_text())
    path = directory / "id-map.json"
    if not path.exists():
        raise RuntimeError("Existing drive has no saved ID map; restore its map before rerunning")
    mapping = json.loads(path.read_text())
    identifiers = {mapping[doc["id"]] for doc in manifest["documents"] if doc["id"] in mapping}
    if manifest["documents"] and not identifiers:
        raise RuntimeError("Existing drive has an empty saved ID map")
    sb = Switchboard(profile)
    for identifier in identifiers:
        sb.json("docs", "get", identifier)


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--profile", default="local")
    parser.add_argument("--validate-map", required=True)
    args = parser.parse_args()
    validate_saved_map(args.validate_map, args.profile)
