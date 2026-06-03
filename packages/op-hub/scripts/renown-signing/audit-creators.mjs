/**
 * audit-creators.mjs — scan every drive (or one drive) and every document in it,
 * reporting the signer on each: which ops are yours (signed wallet, app.name
 * "drive-sync-import") vs the reactor's own genesis ("switchboard"), and the
 * recovered wallet did:pkh.
 *
 * Uses the `switchboard` CLI for drive/node listing and GraphQL for operations.
 *
 * Usage (from project root):
 *   TOKEN=$(switchboard auth token | tail -1) \
 *   node scripts/renown-signing/audit-creators.mjs [driveSlugOrId]
 */
import { execFileSync } from "node:child_process";

const ENDPOINT = process.env.ENDPOINT || "http://localhost:4001/graphql";
const TOKEN = process.env.TOKEN || "";
const ONLY = process.argv[2];

function sb(...args) {
  const out = execFileSync("switchboard", [...args, "--format", "json"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return JSON.parse(out);
}

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
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 400));
  return json.data;
}

const OPS_Q = `query($filter: OperationsFilterInput!){
  documentOperations(filter:$filter){ items { action { type context { signer {
    user { address chainId networkId } app { name key }
  } } } } }
}`;

async function summarize(docId) {
  const d = await gql(OPS_Q, { filter: { documentId: docId } });
  const items = d.documentOperations.items;
  const wallets = new Set();
  const apps = new Map();
  let key = null;
  for (const op of items) {
    const s = op.action?.context?.signer;
    const name = s?.app?.name || "(unsigned)";
    apps.set(name, (apps.get(name) || 0) + 1);
    if (s?.app?.key && !key) key = s.app.key;
    if (s?.user?.address)
      wallets.add(`${s.user.networkId}:${s.user.chainId}:${s.user.address}`);
  }
  return { count: items.length, wallets: [...wallets], apps, key };
}

const fmtApps = (apps) =>
  [...apps.entries()].map(([k, v]) => `${k}=${v}`).join(" ");

function listDrives() {
  if (ONLY) {
    const d = sb("drives", "get", ONLY);
    return [{ id: d.id, name: d.name || d.slug || ONLY }];
  }
  return sb("drives", "list")
    .filter(
      (x) =>
        !(x.slug || "").startsWith("vetra-") &&
        !(x.slug || "").startsWith("preview-"),
    )
    .map((x) => ({ id: x.id, name: x.name || x.slug }));
}

function driveFiles(driveId) {
  try {
    const d = sb("docs", "get", driveId, "--state");
    const nodes = d.state.global.nodes || [];
    return nodes.filter((n) => n.kind === "file");
  } catch {
    return [];
  }
}

const drives = listDrives();
let totalDocs = 0,
  attributedDocs = 0,
  drivesOk = 0,
  allKeys = new Set();

for (const drive of drives) {
  const ds = await summarize(drive.id);
  if (ds.key) allKeys.add(ds.key);
  const driveOk = ds.wallets.length > 0;
  if (driveOk) drivesOk++;
  console.log(`\n■ DRIVE ${drive.name}  [${drive.id}]`);
  console.log(
    `    ops=${ds.count}  { ${fmtApps(ds.apps)} }  wallet=${driveOk ? ds.wallets.join(",") : "(none)"}`,
  );

  for (const f of driveFiles(drive.id)) {
    totalDocs++;
    const fs = await summarize(f.id);
    if (fs.key) allKeys.add(fs.key);
    const ok = fs.wallets.length > 0;
    if (ok) attributedDocs++;
    console.log(
      `      ${ok ? "✓" : "·"} ${(f.name || f.id).slice(0, 40).padEnd(40)} ops=${String(fs.count).padStart(3)}  { ${fmtApps(fs.apps)} }${ok ? "" : "  ← no wallet (content-empty)"}`,
    );
  }
}

console.log(`\n========================================`);
console.log(`Drives attributed:    ${drivesOk}/${drives.length}`);
console.log(
  `Documents attributed: ${attributedDocs}/${totalDocs}` +
    (totalDocs - attributedDocs
      ? `  (${totalDocs - attributedDocs} content-empty / server-only)`
      : ""),
);
console.log(`Signer app.key(s) seen: ${[...allKeys].join(", ") || "(none)"}`);
