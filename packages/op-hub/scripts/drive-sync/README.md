# Drive Sync Scripts

Download drives from a source switchboard and recreate them on a target switchboard — or upload existing drive data from disk straight to a target without re-downloading.

These scripts follow the **split pattern**: a legacy operator drive that bundled an operator's builder-profile together with its `powerhouse/resource-template` + `powerhouse/service-offering` catalog is split into two drives on the target:

- a **team-admin** drive (editor `team-admin`) — the operator's profile and the "Service Subscriptions" folder
- a **service-offering** drive (editor `service-offering`) — the resource-template + service-offering catalog, plus a mirror of the "Service Subscriptions" subtree renamed **"Customers"**

Drives with no offering docs (network-admin, the builders drive, the operational hub, …) pass straight through unchanged.

## Prerequisites

- `switchboard` CLI installed and configured with profiles
- `python3`

## Quick Start

### Sync bai-dev → local (download + upload)

```bash
bash scripts/drive-sync/sync.sh --source bai-dev --target local
```

This downloads the 8 demo drives from bai-dev, then hands the upload to `upload-all-split.sh`, which uploads each drive (splitting operator drives), and remaps cross-drive references (e.g., contributor IDs). The default drive list is:

- `powerhouse-network-admin`
- `933f946f-5fab-4dea-85ea-aeb85f1f2fd1` (the `builders` drive — its slug on bai-dev is its UUID)
- `powerhouse-rgh-operator-admin`
- `bai-team-admin`
- `growth-team-admin`
- `core-dev-team-admin`
- `teeps-team-admin`
- `powerhouse-genesis-operational-hub`

### Upload from an existing data folder (skip download)

If `scripts/drive-sync/data/` already contains drive folders (each with its own `drive-info.json`, `manifest.json`, `states/`, `ops/`), just upload to the target — no source profile needed:

```bash
SB_PROFILE=local bash scripts/drive-sync/upload-all-split.sh
```

`upload-all-split.sh` will:

1. **Discover drives automatically** by scanning every subdirectory of `data/` that contains a `drive-info.json`. Folders can be named with the drive's UUID or with its slug — both work, because the slug, name, and `preferredEditor` are read directly from `drive-info.json`.
2. **Sort uploads in dependency-safe order** so cross-drive references can resolve: `powerhouse-network-admin` → `builders` (uuid-slug) → operator/team admins → operational hub.
3. **Route each drive through `upload-split.sh`**, which splits operator drives into a `team-admin` + `service-offering` pair (and dedupes service-offerings to one per title), or passes non-offering drives straight to `upload.sh`.
4. **Skip drives already on the target** (matched by slug), so it is safe to re-run.
5. **Run `phase3-remap.py`** to fix cross-drive references (builder-profile contributors, operationalHubMember), then **print Connect URLs** for every uploaded drive.

Verify before writing anything:

```bash
SB_PROFILE=local bash scripts/drive-sync/upload-all-split.sh --dry-run
```

The dry-run prints a table like `[N] <name> (<slug>) — N docs, N folders, editor=<editor>` so you can confirm discovery and editor assignment before any uploads happen.

## Individual Scripts

### download.sh — Download a drive

```bash
SB_PROFILE=bai-dev bash scripts/drive-sync/download.sh <drive-slug> [output-dir]
```

Downloads the drive tree and all document states to a local directory. Skips if data already exists (delete the directory to re-download).

### upload.sh — Upload a single drive

```bash
SB_PROFILE=local bash scripts/drive-sync/upload.sh <data-dir> [drive-name]
```

Creates the drive, folders, documents, and applies document states on the target. Saves an ID mapping file (`id-map.json`) for old→new ID resolution.

Environment variables:

- `PREFERRED_EDITOR` — drive editor id (e.g., `team-admin`, `network-admin`, `contributor-billing-editor`). Defaults to whatever the source drive specified. **Legacy ids are normalized to the current `config.id`** (`builder-team-admin` → `team-admin`, `service-offering-app` → `service-offering`), since captured `drive-info.json` files may still carry the old ids.
- `DRIVE_ICON` — drive icon URL override. If unset, an icon is chosen automatically from the editor id (`team-admin` and `service-offering` each get their own icon).
- `EXISTING_DRIVE` — drive id to upload into (skips drive creation, applies docs only).

### upload-split.sh — Upload one drive, splitting offering docs

```bash
SB_PROFILE=local bash scripts/drive-sync/upload-split.sh <data-dir> [builder-drive-name]
SB_PROFILE=local bash scripts/drive-sync/upload-split.sh <data-dir> --dry-run
```

If the drive contains `powerhouse/resource-template` / `powerhouse/service-offering` docs, it creates **two** drives via `upload.sh`: a `team-admin` drive (keeping the original name + the "Service Subscriptions" folder) and a `service-offering` drive (the catalog + a "Customers" mirror of the subscriptions subtree). Drives with no offering docs are uploaded unchanged. After both halves upload, it re-points each offering's `operatorId` at the operator's builder-profile in the team-admin drive.

### upload-all-split.sh — Upload every drive in `data/`

```bash
SB_PROFILE=local bash scripts/drive-sync/upload-all-split.sh [options]
```

Options:

- `--target <profile>` — Switchboard profile (default: `local`, also read from `SB_PROFILE`)
- `--data-dir <dir>` — Data directory (default: `scripts/drive-sync/data`)
- `--skip <slugs>` — Comma-separated drive slugs to skip
- `--only <slugs>` — Comma-separated drive slugs to upload (overrides default list)
- `--dry-run` — Show what would be uploaded without doing it

Drive discovery is by scanning `data/*/drive-info.json` — folder name is irrelevant.

### sync.sh — Full orchestration (download + upload + remap)

```bash
bash scripts/drive-sync/sync.sh --source <profile> --target <profile> [options]
```

Phase 1 downloads each drive with `download.sh`; phase 2 hands the whole `data/` directory to `upload-all-split.sh` (which uploads via the split pattern and runs `phase3-remap.py`).

Options:

- `--drives <slugs>` — Comma-separated drive slugs (default: the 8 bai-dev demo drives listed above)
- `--data-dir <dir>` — Data directory (default: `scripts/drive-sync/data`)
- `--exclude <ids>` — Comma-separated doc IDs to exclude
- `--clean` — Delete existing data before downloading

### verify-sync.py — Verify a sync run

```bash
TARGET_PROFILE=local DATA_DIR=scripts/drive-sync/data \
  python3 scripts/drive-sync/verify-sync.py [drive-dir-name ...]
```

Compares each drive on the target against the source manifest: drive exists, `preferredEditor` matches (legacy ids normalized), node counts match, builders/contributor references resolve.

## How It Works

| Phase | What happens |
|-------|-------------|
| Download | `switchboard docs get <id> --state` for each document — no model-specific GraphQL |
| Upload | `switchboard docs create --type <type> --drive <drive>` + `switchboard docs mutate --op`, splitting offering drives |
| Remap | Cross-drive references (contributor IDs, opHubMember) updated with merged ID map via `phase3-remap.py` |

### Document type handling

| Type | Strategy |
|------|----------|
| `powerhouse/builder-profile` | Dedicated: isOperator, profile, links, skills, scopes, contributors |
| `powerhouse/resource-template` | Dedicated: info, status, audiences, facets, services, FAQs, content sections |
| `powerhouse/service-offering` | Dedicated: info, status, billing, facets, option groups, tiers, pricing |
| Any other type | Generic: operations discovered via `switchboard models get`, state fields matched to mutation inputs |

### Compatibility check

Before uploading, the script checks that the target switchboard has all required document types registered. Missing types are skipped with a warning.

### Drive editor & icon assignment

The `preferredEditor` value is read from each drive's `drive-info.json` and passed through to `upload.sh`, which **normalizes legacy editor ids** to the current `config.id` so the drive opens with the right editor on the target. `upload.sh` also assigns a **drive icon based on the editor id** (`team-admin` and `service-offering` drives each land with their own icon); set `DRIVE_ICON` to override.

## Files

```
scripts/drive-sync/
├── lib/common.sh         # Shared helpers
├── download.sh           # Phase 1: download drive
├── upload.sh             # Phase 2: upload one drive (editor-id + icon normalization)
├── upload-split.sh       # Phase 2: upload one drive, splitting offering docs
├── upload-all-split.sh   # Phase 2 (batch): upload every drive in data/ via the split pattern
├── phase3-remap.py       # Phase 3: cross-drive PHID remap
├── sync.sh               # Orchestrator: download + upload-all-split + remap
├── verify-sync.py        # Verify a sync run against the source
└── data/                 # Drive data on disk (git-ignored)
    └── <uuid-or-slug>/
        ├── drive-info.json   # slug, name, preferredEditor, …
        ├── manifest.json     # documents + folders
        ├── tree.json
        ├── states/<doc-id>.json
        ├── ops/<doc-id>.json
        └── id-map.json       # written by upload.sh: oldId → newId
```
