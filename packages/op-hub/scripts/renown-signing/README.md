# Renown-signed drive & operation creation

A validated reference for creating drives/documents and **signing the
operations with a Renown identity**, then pushing them to a switchboard reactor
as a batch — so you can later reverse-lookup *who* created a drive.

It reuses the real signing/document helpers from `@powerhousedao/shared` (no
hand-rolled crypto), so the payloads match exactly what Connect / the reactor
client produce.

## The two signing layers

A drive's genesis is a `CREATE_DOCUMENT` action (scope `document`). There are
two independent places an identity is recorded:

| Layer | Signs | Lands on | Records |
| --- | --- | --- | --- |
| **Header signature** | `${documentType}:${createdAtUtcIso}:${nonce}` (ECDSA P-256 / SHA-256, base64) | `document.header.sig.publicKey` + `sig.nonce` | the creator's session **`did:key`** (`app.key` on `CREATE_DOCUMENT`) |
| **Operation `context.signer`** | `documentId + scope + type + JSON(input)` + `prevOpHash` | `action.context.signer` | the **wallet** `address` / `chainId` / `networkId` → `did:pkh`, plus the signature tuple |

The header signature is the canonical "this drive was created by this key"
proof, but it only stores the **public key** (→ `did:key`), not your wallet
address. To reverse-lookup by **wallet**, also attach `context.signer.user`
to the operations (the script does this on `ADD_FOLDER`).

### Document IDs stay normal UUIDs

`createSignedHeader` would normally overwrite `header.id` with the base64
signature (its content-addressed design), producing long ids like
`Y2a92Vu…==`. The reactor's `createDocument` takes the id straight from
`document.header.id`, so the script **restores the original `generateId()`
UUID** after signing. The signature block (`sig.publicKey` + `sig.nonce`) is
kept, so `CREATE_DOCUMENT` still records the creator's `did:key`.

**Reverse-lookup is independent of the id** — it reads `context.signer` off the
operations — so you keep short, normal-looking UUID drive ids *and* full
attribution.

### Signature tuple format (`context.signer.signatures[]`)

Each signature is a 5-tuple produced by `buildOperationSignature`:

```
[ unixTimestamp, appKey(did:key), opHash, prevStateHash, "0x"+sigHex ]
```

- `opHash` = SHA1-base64 of `documentId + scope + type + JSON.stringify(input)`
- signed message = `"\x19Signed Operation:\n" + len + (timestamp+appKey+opHash+prevStateHash)`

## Prerequisites

1. **Authenticate** so a P-256 keypair is written to `.ph/.keypair.json`:

   ```bash
   ph login
   # prints: ETH Address, User DID (did:pkh:...), CLI DID (did:key:...)
   ```

2. A reachable **switchboard** (default profile `local`,
   `http://localhost:4001/graphql`). Get a bearer token with
   `switchboard auth token`.

## Run

From the **project root** (so Node resolves `node_modules`):

```bash
TOKEN=$(switchboard auth token | tail -1) \
ETH_ADDRESS=0xadbA7C2F82139031D7564D18aC22D09B12A0BcA4 \
CLI_DID=did:key:zDnaen2YLkpSUCyTXMoaxnHCe1XzAG3oWjLXqwgJi2nGmgKiu \
node scripts/renown-signing/sign-and-push.mjs "My Drive Name"
```

| Env | Default | Notes |
| --- | --- | --- |
| `ENDPOINT` | `http://localhost:4001/graphql` | target switchboard |
| `TOKEN` | _(none)_ | bearer token (`switchboard auth token`) |
| `KEYPAIR_PATH` | `.ph/.keypair.json` | the `ph login` keypair |
| `ETH_ADDRESS` | **required** | your Renown wallet (from `ph login`) |
| `CLI_DID` | **required** | the CLI `did:key` (from `ph login`) |
| `NETWORK_ID` / `CHAIN_ID` | `eip155` / `1` | identity chain |
| `PREFERRED_EDITOR` | `builder-team-admin` | drive `header.meta.preferredEditor` |

See [`example-output.txt`](./example-output.txt) for a confirmed run.

## What the script does

1. Loads the keypair → an `ISigner` (`subtle.sign`, ECDSA P-256).
2. Builds a drive doc with `driveCreateDocument`, then signs the header with
   `createSignedHeader(...)`.
3. `createDocument(document: JSONObject!)` — pushes the signed drive.
4. Builds an `ADD_FOLDER` action, signs it with `buildOperationSignature(...)`,
   attaches `context.signer` (with your wallet), and pushes it via
   `mutateDocument(documentIdentifier, actions: [JSONObject!]!)` — the batch
   action API (send N actions at once here).
5. Reads operations back via `documentOperations(filter)` and prints
   `action.context.signer.user.address` for each.

## Reverse-lookup helper

[`who-created.mjs`](./who-created.mjs) reads a document's operations and prints
the creator's `did:key` and any signing wallet identities:

```bash
TOKEN=$(switchboard auth token | tail -1) \
node scripts/renown-signing/who-created.mjs <driveId>
# Creator app key (CREATE_DOCUMENT): did:key:zDnaen…
# Signing wallet identities: did:pkh:eip155:1:0xadbA7C2F…BcA4
```

## Reverse-lookup query

```graphql
query($filter: OperationsFilterInput!) {
  documentOperations(filter: $filter) {
    items {
      index
      action {
        type
        context { signer { user { address chainId networkId } app { name key } signatures } }
      }
    }
  }
}
```

`did:pkh:${networkId}:${chainId}:${address}` is the creator. The `app.key`
(`did:key`) on `CREATE_DOCUMENT` is the session key; its binding to the wallet
is the Renown Verifiable Credential.

## Used by the import pipeline

`scripts/drive-sync/signed-apply.mjs` is a batch version of this recipe that the
import pipeline (`upload.sh`) calls for every operation when `RENOWN_ADDRESS` is
set, so uploaded drives/documents are attributed:

```bash
RENOWN_ADDRESS=0x… SB_PROFILE=local bash scripts/drive-sync/upload-all-split.sh --target local
```

It **derives the `did:key` from the keypair** (so it can't go stale after a
`ph login` rotates the key) and signs each action's `context.signer`. The
drive/doc genesis stays server-generated (`app.name: "switchboard"`); creator
attribution rides on the operations' `user.address`.

## Gotchas (learned the hard way)

- **`createDocument` takes a full PHDocument `JSONObject`**; `mutateDocument`
  takes **raw JSON action objects** (`[JSONObject!]!`). The strongly-typed
  `ActionInput`/`ReactorSignerInput` in the schema is a *different* surface —
  put `context.signer` exactly where the reducer expects it.
- **`action.timestampUtcMs` must be an ISO string** (`new Date().toISOString()`),
  not epoch millis — the reactor rejects `Invalid timestamp` otherwise.
- **`createDocument` returns `PHDocument`**, whose `operations` field is a
  paged type — don't select it as a list.
- **`OperationsFilterInput!` is non-null** in the read query.
- Signatures bind `prevOpHash`, so multi-op batches must be signed **in real
  sequence** per document.
- Signature verification is **optional by default** on the reactor
  (`requireSignature=false`) — unsigned/half-signed ops are still stored, they
  just won't *verify*. Validate locally if you need provable attribution.
