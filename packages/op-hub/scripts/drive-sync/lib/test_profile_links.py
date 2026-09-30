import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from profile_links import BUILDER, HUB, choose_operator_team, extend_identity_map, ensure_operational_hub_links


def builder(operator=False, hub=None):
    return {"state": {"global": {"isOperator": operator, "operationalHubMember": {"phid": hub}}}}


class ProfileLinksTests(unittest.TestCase):
    def test_link_existing_profile_is_idempotent_and_uses_new_team_id(self):
        with tempfile.TemporaryDirectory() as temp:
            folder = Path(temp) / "genesis"
            (folder / "states").mkdir(parents=True)
            (folder / "manifest.json").write_text(json.dumps({"source": {"name": "Genesis", "slug": "genesis"}, "documents": [{"id": "old-hub", "type": HUB}]}))
            (folder / "id-map.json").write_text(json.dumps({"old-hub": "hub"}))
            (folder / "drive-info.json").write_text(json.dumps({"name": "Genesis", "slug": "genesis", "preferredEditor": "contributor-billing-editor"}))
            (folder / "states" / "old-hub.json").write_text(json.dumps({"name": "Genesis", "operatorTeam": "old-team"}))
            sb = FakeSwitchboard()
            changed = ensure_operational_hub_links(temp, "local", {"old-team": "team"}, sb)
            self.assertEqual(changed, 2)
            self.assertEqual(sb.documents["hub"]["state"]["global"]["operatorTeam"], "team")
            self.assertEqual(sb.documents["team"]["state"]["global"]["operationalHubMember"]["phid"], "hub")
            self.assertEqual(ensure_operational_hub_links(temp, "local", {"old-team": "team"}, sb), 0)

    def test_missing_hub_profile_is_created_and_linked_without_fixed_phids(self):
        with tempfile.TemporaryDirectory() as temp:
            folder = Path(temp) / "genesis"
            folder.mkdir()
            (folder / "manifest.json").write_text(json.dumps({"source": {"name": "Genesis", "slug": "genesis"}, "documents": []}))
            (folder / "id-map.json").write_text("{}")
            (folder / "drive-info.json").write_text(json.dumps({"name": "Genesis", "slug": "genesis", "preferredEditor": "contributor-billing-editor"}))
            sb = FakeSwitchboard()
            sb.drives["drive"]["state"]["global"]["nodes"] = []
            with patch.dict("os.environ", {"OPERATOR_TEAM_PROFILE": "team"}):
                ensure_operational_hub_links(temp, "local", {}, sb)
            self.assertEqual(sb.documents["generated-hub"]["state"]["global"]["operatorTeam"], "team")
            self.assertEqual(sb.documents["team"]["state"]["global"]["operationalHubMember"]["phid"], "generated-hub")

    def test_missing_legacy_operator_uses_linked_team_not_registry_copy(self):
        profiles = {"registry": builder(True, "hub"), "team": builder(True, "hub"), "other": builder(True, "elsewhere")}
        self.assertEqual(choose_operator_team("stale", {}, profiles, {"team", "other"}, {"hub"}), "team")

    def test_ambiguous_operator_needs_an_explicit_choice(self):
        profiles = {"a": builder(True, "hub"), "b": builder(True, "hub")}
        with self.assertRaises(RuntimeError):
            choose_operator_team(None, {}, profiles, {"a", "b"}, {"hub"})
        self.assertEqual(choose_operator_team(None, {}, profiles, {"a", "b"}, {"hub"}, "b"), "b")

    def test_source_operator_mapping_has_priority(self):
        self.assertEqual(choose_operator_team("old", {"old": "new"}, {"new": builder()}, set(), set()), "new")

    def test_profile_global_identity_aliases_are_remapped(self):
        with tempfile.TemporaryDirectory() as temp:
            for name, editor, target in [("a-registry", None, "registry"), ("b-team", "team-admin", "team")]:
                folder = Path(temp) / name
                (folder / "states").mkdir(parents=True)
                (folder / "manifest.json").write_text(json.dumps({"documents": [{"id": name, "type": "powerhouse/builder-profile"}]}))
                (folder / "id-map.json").write_text(json.dumps({name: target}))
                (folder / "drive-info.json").write_text(json.dumps({"preferredEditor": editor}))
                (folder / "states" / (name + ".json")).write_text(json.dumps({"id": "legacy-person"}))
            mapping = extend_identity_map(temp, {"a-registry": "registry", "b-team": "team"})
            self.assertEqual(mapping["legacy-person"], "team")
            self.assertEqual(mapping["a-registry"], "registry")


class FakeSwitchboard:
    def __init__(self):
        self.documents = {
            "hub": {"id": "hub", "documentType": HUB, "state": {"global": {"name": "Genesis", "operatorTeam": "stale", "subteams": []}}},
            "team": {"id": "team", "documentType": BUILDER, **builder(True, "old-hub")},
        }
        self.drives = {
            "drive": {"id": "drive", "name": "Genesis", "slug": "genesis", "preferredEditor": "contributor-billing-editor", "state": {"global": {"nodes": [{"id": "hub", "documentType": HUB}]}}},
            "team-drive": {"id": "team-drive", "name": "Team", "slug": "team", "preferredEditor": "team-admin", "state": {"global": {"nodes": [{"id": "team", "documentType": BUILDER}]}}},
        }

    def json(self, *args):
        if args[:2] == ("drives", "list"):
            return [{key: value for key, value in drive.items() if key != "preferredEditor"} for drive in self.drives.values()]
        if args[:2] == ("drives", "get"):
            return self.drives[args[2]]
        if args[0] == "query":
            return {"findDocuments": {"items": [self.documents["team"]], "hasNextPage": False, "cursor": None}}
        if args[:2] == ("docs", "create"):
            self.documents["generated-hub"] = {"id": "generated-hub", "documentType": HUB, "state": {"global": {"name": "", "operatorTeam": None, "subteams": []}}}
            self.drives["drive"]["state"]["global"]["nodes"].append({"id": "generated-hub", "documentType": HUB})
            return {"id": "generated-hub"}
        raise AssertionError(args)

    def document(self, identifier):
        return self.documents[identifier]

    def mutate(self, identifier, operation, payload):
        state = self.documents[identifier]["state"]["global"]
        if operation in {"setOperatorTeam", "setOperationalHubName"}:
            state.update(payload)
        elif operation == "setOpHubMember":
            state["operationalHubMember"] = payload
        else:
            raise AssertionError(operation)


if __name__ == "__main__":
    unittest.main()
