#!/usr/bin/env node
/**
 * remove-user-drives.mjs
 *
 * Removes ALL drives belonging to a given wallet address from the Switchboard
 * reactor pointed to by NEXT_PUBLIC_SWITCHBOARD_URL in the project's .env.
 *
 * Usage:
 *   node scripts/remove-user-drives.mjs                 # prompts for wallet
 *   node scripts/remove-user-drives.mjs 0xWallet...     # wallet as argument
 *   node scripts/remove-user-drives.mjs 0xWallet... -y  # skip confirmation
 *
 * Overrides:
 *   NEXT_PUBLIC_SWITCHBOARD_URL   override the .env URL (env var wins)
 *   SWITCHBOARD_TOKEN             optional bearer token for protected reactors
 *
 * Requires Node 18+ (uses built-in fetch). No dependencies.
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin, stdout, argv, env, exit } from "node:process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, "..");

// Where we cache the last wallet we operated on. Lives inside .next (already
// gitignored) but uses a dedicated, clearly-namespaced filename so it never
// collides with anything Next.js writes there.
const LAST_WALLET_FILE = join(PROJECT_ROOT, ".next", ".remove-user-drives-last-wallet");

/** Read the previously remembered wallet, or null if none / unreadable. */
async function readLastWallet() {
  try {
    const v = (await readFile(LAST_WALLET_FILE, "utf8")).trim();
    return v || null;
  } catch {
    return null;
  }
}

/** Persist the wallet for next time. Best-effort: never throw on failure. */
async function rememberWallet(wallet) {
  try {
    await mkdir(dirname(LAST_WALLET_FILE), { recursive: true });
    await writeFile(LAST_WALLET_FILE, `${wallet}\n`, "utf8");
  } catch {
    // Caching is a convenience; a write failure must not break the run.
  }
}

// --- tiny ansi helpers ---------------------------------------------------
const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

/**
 * Parse the project .env and resolve NEXT_PUBLIC_SWITCHBOARD_URL.
 * Matches dotenv semantics: skips commented lines, last uncommented wins.
 */
async function resolveSwitchboardUrl() {
  // An explicit env var always wins (lets you target another reactor ad-hoc).
  if (env.NEXT_PUBLIC_SWITCHBOARD_URL) {
    return { url: env.NEXT_PUBLIC_SWITCHBOARD_URL, source: "environment" };
  }

  const envPath = join(PROJECT_ROOT, ".env");
  let raw;
  try {
    raw = await readFile(envPath, "utf8");
  } catch {
    throw new Error(
      `Could not read ${envPath}. Set NEXT_PUBLIC_SWITCHBOARD_URL in .env or pass it as an env var.`,
    );
  }

  let value;
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = trimmed.match(/^(?:export\s+)?NEXT_PUBLIC_SWITCHBOARD_URL\s*=\s*(.*)$/);
    if (!match) continue;
    let v = match[1].trim();
    // strip surrounding quotes
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    } else {
      // strip inline comment on unquoted values (" # ...")
      const hash = v.indexOf(" #");
      if (hash !== -1) v = v.slice(0, hash).trim();
    }
    if (v) value = v; // last uncommented occurrence wins
  }

  if (!value) {
    throw new Error("No active NEXT_PUBLIC_SWITCHBOARD_URL found in .env");
  }
  return { url: value, source: ".env" };
}

/** Ask a single question on a fresh readline interface (opened/closed per call
 * so a long-running fetch in between never leaves a stale, EOF-closed stream). */
async function prompt(question) {
  const rl = createInterface({ input: stdin, output: stdout });
  try {
    return (await rl.question(question)).trim();
  } finally {
    rl.close();
  }
}

/** Minimal GraphQL client over fetch. */
async function gql(url, query, variables) {
  const headers = { "content-type": "application/json" };
  if (env.SWITCHBOARD_TOKEN) headers.authorization = `Bearer ${env.SWITCHBOARD_TOKEN}`;

  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`HTTP ${res.status} — non-JSON response: ${text.slice(0, 300)}`);
  }
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data;
}

const GET_DRIVES = /* GraphQL */ `
  query DrivesForWallet($address: EthereumAddress!) {
    getBuilderDrives(filter: { ethereumAddress: $address }) {
      driveId
      driveName
      driveSlug
    }
  }
`;

const DELETE_DOCUMENT = /* GraphQL */ `
  mutation DeleteDrive($id: String!) {
    deleteDocument(identifier: $id, propagate: CASCADE)
  }
`;

async function main() {
  const args = argv.slice(2);
  const skipConfirm = args.includes("-y") || args.includes("--yes");
  const walletArg = args.find((a) => !a.startsWith("-"));

  const { url, source } = await resolveSwitchboardUrl();
  console.log(`${c.dim("Reactor:")} ${c.cyan(url)} ${c.dim(`(${source})`)}\n`);

  let wallet = walletArg;
  if (!wallet) {
    const last = await readLastWallet();
    const question = last
      ? `Wallet address ${c.dim(`[${last}]`)}: `
      : "Wallet address: ";
    const answer = await prompt(question);
    // Empty input reuses the remembered wallet (the offered default).
    wallet = answer || last || "";
  }
  if (!wallet) {
    console.error(c.red("No wallet address provided."));
    exit(1);
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
    const ok = (
      await prompt(
        c.yellow(`"${wallet}" doesn't look like an Ethereum address. Continue anyway? (y/N) `),
      )
    ).toLowerCase();
    if (ok !== "y" && ok !== "yes") {
      exit(1);
    }
  }

  console.log(c.dim("\nLooking up drives…"));
  const data = await gql(url, GET_DRIVES, { address: wallet });
  const drives = data?.getBuilderDrives ?? [];

  // Remember this wallet so the next run can offer it as the default.
  await rememberWallet(wallet);

  if (drives.length === 0) {
    console.log(c.green(`\nNo drives found for ${wallet}. Nothing to do.`));
    return;
  }

  console.log(c.bold(`\nFound ${drives.length} drive(s) for ${wallet}:`));
  for (const d of drives) {
    console.log(`  • ${d.driveName} ${c.dim(`(slug: ${d.driveSlug}, id: ${d.driveId})`)}`);
  }

  if (!skipConfirm) {
    const ans = (
      await prompt(c.red(`\nDelete all ${drives.length} drive(s)? This cannot be undone. (y/N) `))
    ).toLowerCase();
    if (ans !== "y" && ans !== "yes") {
      console.log("Aborted.");
      return;
    }
  }

  console.log("");
  let failures = 0;
  for (const d of drives) {
    try {
      const result = await gql(url, DELETE_DOCUMENT, { id: d.driveId });
      if (result?.deleteDocument) {
        console.log(`${c.green("✓")} Deleted ${d.driveName} ${c.dim(`(${d.driveId})`)}`);
      } else {
        failures++;
        console.log(`${c.red("✗")} Reactor returned false for ${d.driveName} ${c.dim(`(${d.driveId})`)}`);
      }
    } catch (err) {
      failures++;
      console.log(`${c.red("✗")} Failed to delete ${d.driveName} ${c.dim(`(${d.driveId})`)}: ${err.message}`);
    }
  }

  console.log(
    failures === 0
      ? c.green(`\nDone — removed ${drives.length} drive(s).`)
      : c.yellow(`\nDone with ${failures} failure(s) out of ${drives.length}.`),
  );
  if (failures > 0) exit(1);
}

main().catch((err) => {
  console.error(c.red(`\nError: ${err.message}`));
  exit(1);
});
