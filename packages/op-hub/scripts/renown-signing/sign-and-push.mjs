/**
 * sign-and-push.mjs
 * ----------------------------------------------------------------------------
 * Reference / validated example: create a drive and a signed operation,
 * sign them with a Renown CLI keypair, and push them to a switchboard reactor
 * as a batch — then read the signer back for reverse-lookup.
 *
 * This reuses the REAL signing/document helpers exported by
 * `@powerhousedao/shared` (no reimplemented crypto), so the payloads match
 * exactly what Connect / the reactor client produce.
 *
 * Two signing layers are demonstrated (see README.md):
 *   1. Header signature  → records the creator's `did:key` on CREATE_DOCUMENT.
 *   2. `action.context.signer.user` → records the wallet address on each
 *      operation, which is what you query for "who created this".
 *
 * Prerequisites:
 *   - `ph login` (writes the P-256 keypair to .ph/.keypair.json)
 *   - a reachable switchboard (default: local, http://localhost:4001/graphql)
 *
 * Run (from the project root so node resolves node_modules):
 *   ETH_ADDRESS=0x...        # your Renown wallet (from `ph login` output)
 *   CLI_DID=did:key:zDna...  # the CLI DID (from `ph login` output)
 *   TOKEN=$(switchboard auth token | tail -1)
 *   node scripts/renown-signing/sign-and-push.mjs "My Drive Name"
 */
import { webcrypto } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  createSignedHeader,
  buildOperationSignature,
  actionSigner,
} from "@powerhousedao/shared/document-model";
import { driveCreateDocument } from "@powerhousedao/shared/document-drive";

// ---- Config (env-overridable) --------------------------------------------
const ENDPOINT = process.env.ENDPOINT || "http://localhost:4001/graphql";
const TOKEN = process.env.TOKEN || "";
const KEYPAIR_PATH = process.env.KEYPAIR_PATH || ".ph/.keypair.json";
const ETH_ADDRESS = process.env.ETH_ADDRESS; // your Renown wallet address
const CLI_DID = process.env.CLI_DID; // the CLI did:key (signing app key)
const NETWORK_ID = process.env.NETWORK_ID || "eip155";
const CHAIN_ID = Number(process.env.CHAIN_ID || 1);
const DRIVE_NAME = process.argv[2] || "Signed Drive";
const PREFERRED_EDITOR = process.env.PREFERRED_EDITOR || "builder-team-admin";

if (!ETH_ADDRESS || !CLI_DID) {
  console.error(
    "Set ETH_ADDRESS and CLI_DID (printed by `ph login`). See README.md.",
  );
  process.exit(1);
}

const { subtle } = webcrypto;
const uuid = () => webcrypto.randomUUID();

// ---- 1. Load the Renown keypair → an ISigner -----------------------------
const { keyPair } = JSON.parse(readFileSync(KEYPAIR_PATH, "utf8"));
const algo = { name: "ECDSA", namedCurve: "P-256" };
const privateKey = await subtle.importKey(
  "jwk",
  keyPair.privateKey,
  algo,
  true,
  ["sign"],
);
const publicKey = await subtle.importKey("jwk", keyPair.publicKey, algo, true, [
  "verify",
]);
const signMethod = async (data) =>
  new Uint8Array(
    await subtle.sign({ name: "ECDSA", hash: "SHA-256" }, privateKey, data),
  );
const signer = { publicKey, sign: signMethod };

// Reusable ActionSigner identity block.
const identity = () =>
  actionSigner(
    { address: ETH_ADDRESS, networkId: NETWORK_ID, chainId: CHAIN_ID },
    { name: "ph-cli", key: CLI_DID },
    [],
  );

// ---- GraphQL helper -------------------------------------------------------
async function gql(query, variables) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    console.error("GraphQL errors:", JSON.stringify(json.errors, null, 2));
    throw new Error("gql failed");
  }
  return json.data;
}

// ---- 2. Build + sign the drive document (header signature) ----------------
const driveDoc = driveCreateDocument({
  global: { name: DRIVE_NAME, icon: null, nodes: [] },
});
driveDoc.header.name = DRIVE_NAME;
driveDoc.header.slug = "signed-drive-" + Date.now();
driveDoc.header.meta = { preferredEditor: PREFERRED_EDITOR };
// driveCreateDocument already set a normal UUID id (via generateId()). Keep it.
const driveUuid = driveDoc.header.id;
// createSignedHeader signs `${documentType}:${createdAtUtcIso}:${nonce}` and
// populates sig.publicKey (JWK) + sig.nonce — but it ALSO overwrites id with the
// base64 signature. We restore the UUID so drives keep normal-length ids; the
// sig block still records the creator's did:key on CREATE_DOCUMENT, and wallet
// attribution rides on the operations' context.signer (see below).
const signedHeader = await createSignedHeader(
  driveDoc.header,
  "powerhouse/document-drive",
  signer,
);
driveDoc.header = { ...signedHeader, id: driveUuid };
console.log("→ drive id (uuid):", driveDoc.header.id);

const created = await gql(
  `mutation($document: JSONObject!){ createDocument(document:$document){ id slug name } }`,
  { document: driveDoc },
);
const driveId = created.createDocument.id;
console.log(
  "✓ createDocument:",
  driveId,
  "| slug:",
  created.createDocument.slug,
);

// ---- 3. Build + sign an ADD_FOLDER operation (carries wallet identity) ----
const folderInput = { id: uuid(), name: "Signed Folder", parentFolder: null };
const opSig = await buildOperationSignature(
  {
    documentId: driveId,
    signer: identity(),
    action: { scope: "global", type: "ADD_FOLDER", input: folderInput },
    previousStateHash: "", // optional grounding; not verified on write
  },
  signMethod,
);

const addFolderAction = {
  id: uuid(),
  type: "ADD_FOLDER",
  scope: "global",
  timestampUtcMs: new Date().toISOString(), // ISO string, NOT epoch millis
  input: folderInput,
  context: {
    signer: actionSigner(
      { address: ETH_ADDRESS, networkId: NETWORK_ID, chainId: CHAIN_ID },
      { name: "ph-cli", key: CLI_DID },
      [opSig],
    ),
  },
};

// mutateDocument accepts a BATCH of raw JSON actions ([JSONObject!]!).
await gql(
  `mutation($id: String!, $actions: [JSONObject!]!){ mutateDocument(documentIdentifier:$id, actions:$actions){ id } }`,
  { id: driveId, actions: [addFolderAction] },
);
console.log("✓ mutateDocument: ADD_FOLDER pushed");

// ---- 4. Reverse-lookup: read the signer back -----------------------------
const back = await gql(
  `query($filter: OperationsFilterInput!){
     documentOperations(filter:$filter){
       items { index action { type context { signer {
         user { address chainId networkId } app { name key } signatures
       } } } }
     }
   }`,
  { filter: { documentId: driveId } },
);
console.log("\n========= READ-BACK =========");
for (const op of back.documentOperations.items) {
  const s = op.action?.context?.signer;
  console.log(
    `op#${op.index} ${op.action?.type} → user.address=${s?.user?.address || "(none)"}` +
      ` app.key=${s?.app?.key || "(none)"} #sigs=${s?.signatures?.length ?? 0}`,
  );
}
console.log("\nExpected wallet:", ETH_ADDRESS);
console.log("Drive id:", driveId);
