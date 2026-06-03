/**
 * signed-apply.mjs — sign a batch of actions with a Renown keypair and push
 * them to a switchboard reactor via mutateDocument. Used by upload.sh so every
 * uploaded operation carries context.signer (creator attribution).
 *
 * Reuses the validated signing helpers from @powerhousedao/shared (no
 * hand-rolled crypto). Lives inside the repo so Node resolves node_modules.
 *
 * Usage:
 *   node signed-apply.mjs apply <documentId> <actionsJsonFile>
 *
 * Env:
 *   ENDPOINT            switchboard GraphQL url (required)
 *   TOKEN               bearer token (optional)
 *   RENOWN_KEYPAIR      path to the P-256 keypair json (default .ph/.keypair.json)
 *   RENOWN_ADDRESS      signer wallet address (required)
 *   RENOWN_CLI_DID      signer app key, the did:key (required)
 *   RENOWN_NETWORK_ID   default "eip155"
 *   RENOWN_CHAIN_ID     default 1
 *   SIGN_CHUNK          max actions per mutateDocument call (default 50)
 */
import { webcrypto } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  buildOperationSignature,
  actionSigner,
} from "@powerhousedao/shared/document-model";

const [, , cmd, docId, actionsFile] = process.argv;
if (cmd !== "apply" || !docId || !actionsFile) {
  console.error(
    "usage: node signed-apply.mjs apply <documentId> <actionsJsonFile>",
  );
  process.exit(2);
}

const ENDPOINT = process.env.ENDPOINT;
const TOKEN = process.env.TOKEN || "";
const KEYPAIR_PATH = process.env.RENOWN_KEYPAIR || ".ph/.keypair.json";
const ADDRESS = process.env.RENOWN_ADDRESS;
const NETWORK_ID = process.env.RENOWN_NETWORK_ID || "eip155";
const CHAIN_ID = Number(process.env.RENOWN_CHAIN_ID || 1);
const CHUNK = Number(process.env.SIGN_CHUNK || 50);

if (!ENDPOINT || !ADDRESS) {
  console.error("missing ENDPOINT / RENOWN_ADDRESS");
  process.exit(2);
}

const { subtle } = webcrypto;
const uuid = () => webcrypto.randomUUID();
const b64u = (s) =>
  Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

/**
 * Derive the P-256 did:key for the keypair's public JWK. The reactor verifies
 * each op's signature against signer.app.key, so this MUST match the signing
 * key. Deriving it (rather than hardcoding the value `ph login` printed)
 * keeps it correct after a re-login rotates the keypair.
 */
function didKeyFromJwk(jwk) {
  const x = b64u(jwk.x);
  const y = b64u(jwk.y);
  const compressed = Buffer.concat([
    Buffer.from([(y[y.length - 1] & 1) === 0 ? 0x02 : 0x03]),
    x,
  ]);
  const mc = Buffer.concat([Buffer.from([0x80, 0x24]), compressed]); // multicodec p256-pub
  const A = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let digits = [0];
  for (const byte of mc) {
    let carry = byte;
    for (let j = 0; j < digits.length; j++) {
      carry += digits[j] << 8;
      digits[j] = carry % 58;
      carry = (carry / 58) | 0;
    }
    while (carry) {
      digits.push(carry % 58);
      carry = (carry / 58) | 0;
    }
  }
  let s = "";
  for (const byte of mc) {
    if (byte === 0) s += "1";
    else break;
  }
  for (let i = digits.length - 1; i >= 0; i--) s += A[digits[i]];
  return "did:key:z" + s;
}

// ---- signer ---------------------------------------------------------------
const { keyPair } = JSON.parse(readFileSync(KEYPAIR_PATH, "utf8"));
const algo = { name: "ECDSA", namedCurve: "P-256" };
const privateKey = await subtle.importKey(
  "jwk",
  keyPair.privateKey,
  algo,
  true,
  ["sign"],
);
const signMethod = async (data) =>
  new Uint8Array(
    await subtle.sign({ name: "ECDSA", hash: "SHA-256" }, privateKey, data),
  );
const CLI_DID = process.env.RENOWN_CLI_DID || didKeyFromJwk(keyPair.publicKey);
// app.name distinguishes our signed ops from the reactor's own genesis ops
// (which use app.name "switchboard") — important because a local reactor signs
// its genesis with the SAME keypair, so app.key alone can't tell them apart.
const APP_NAME = process.env.RENOWN_APP_NAME || "drive-sync-import";
const user = { address: ADDRESS, networkId: NETWORK_ID, chainId: CHAIN_ID };
const app = { name: APP_NAME, key: CLI_DID };

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
    console.error("GraphQL errors:", JSON.stringify(json.errors).slice(0, 600));
    throw new Error("gql failed");
  }
  return json.data;
}

// ---- sign + push ----------------------------------------------------------
const raw = JSON.parse(readFileSync(actionsFile, "utf8"));
const actions = Array.isArray(raw) ? raw : [raw];
const nowIso = new Date().toISOString();

const signed = [];
for (const a of actions) {
  const scope = a.scope || "global";
  const action = { scope, type: a.type, input: a.input };
  const sig = await buildOperationSignature(
    {
      documentId: docId,
      signer: actionSigner(user, app, []),
      action,
      previousStateHash: "",
    },
    signMethod,
  );
  signed.push({
    id: a.id || uuid(),
    type: a.type,
    scope,
    timestampUtcMs: a.timestampUtcMs || nowIso, // ISO string (reactor rejects epoch ms)
    input: a.input,
    context: { signer: actionSigner(user, app, [sig]) },
  });
}

const MUT = `mutation($id: String!, $actions: [JSONObject!]!){ mutateDocument(documentIdentifier:$id, actions:$actions){ id } }`;
let pushed = 0;
for (let i = 0; i < signed.length; i += CHUNK) {
  const batch = signed.slice(i, i + CHUNK);
  await gql(MUT, { id: docId, actions: batch });
  pushed += batch.length;
}

process.stdout.write(JSON.stringify({ ok: true, count: pushed }) + "\n");
