/**
 * find-my-drives.mjs — list the drives created/signed by a given wallet.
 *
 * There is no server-side "drives by signer" query, so this enumerates drives
 * (switchboard CLI) and keeps the ones that have at least one operation whose
 * context.signer.user.address matches — i.e. an op you signed.
 *
 * Usage (from project root):
 *   TOKEN=$(switchboard auth token | tail -1) \
 *   node scripts/renown-signing/find-my-drives.mjs [walletAddress]
 *
 * walletAddress defaults to $RENOWN_ADDRESS. Matching is case-insensitive.
 * Pass --docs to also list matching documents inside each drive.
 */
import { execFileSync } from "node:child_process";

const ENDPOINT = process.env.ENDPOINT || "http://localhost:4001/graphql";
const TOKEN = process.env.TOKEN || "";
const args = process.argv.slice(2);
const WITH_DOCS = args.includes("--docs");
const ADDRESS = (
  args.find((a) => !a.startsWith("--")) ||
  process.env.RENOWN_ADDRESS ||
  ""
).toLowerCase();

if (!ADDRESS) {
  console.error("provide a wallet address (arg or RENOWN_ADDRESS)");
  process.exit(2);
}

const sb = (...a) =>
  JSON.parse(
    execFileSync("switchboard", [...a, "--format", "json"], {
      encoding: "utf8",
      maxBuffer: 64 << 20,
    }),
  );

async function gql(query, variables) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });
  const j = await res.json();
  if (j.errors) throw new Error(JSON.stringify(j.errors).slice(0, 300));
  return j.data;
}

const OPS_Q = `query($f: OperationsFilterInput!){ documentOperations(filter:$f){ items {
  action { context { signer { user { address } app { name } } } } } } }`;

// Returns { signedByMe, total } for a document.
async function signedByMe(docId) {
  const d = await gql(OPS_Q, { f: { documentId: docId } });
  const items = d.documentOperations.items;
  let mine = 0;
  for (const op of items) {
    const a = op.action?.context?.signer?.user?.address;
    if (a && a.toLowerCase() === ADDRESS) mine++;
  }
  return { mine, total: items.length };
}

const drives = sb("drives", "list").filter(
  (x) =>
    !(x.slug || "").startsWith("vetra-") &&
    !(x.slug || "").startsWith("preview-"),
);

console.log(`Drives signed by ${ADDRESS}:\n`);
let hits = 0;
for (const drive of drives) {
  const r = await signedByMe(drive.id);
  if (r.mine === 0) continue;
  hits++;
  console.log(
    `  ✓ ${(drive.name || drive.slug || drive.id).padEnd(38)} ${drive.id}  (${r.mine}/${r.total} ops)`,
  );
  if (WITH_DOCS) {
    let nodes = [];
    try {
      nodes = sb("docs", "get", drive.id, "--state").state.global.nodes.filter(
        (n) => n.kind === "file",
      );
    } catch {}
    for (const f of nodes) {
      const fr = await signedByMe(f.id);
      if (fr.mine > 0)
        console.log(
          `        - ${(f.name || f.id).slice(0, 40).padEnd(40)} (${fr.mine}/${fr.total})`,
        );
    }
  }
}
console.log(`\n${hits}/${drives.length} drives created/signed by this wallet.`);
