import SafeApiKit from "@safe-global/api-kit";
import Safe from "@safe-global/protocol-kit";
import { OperationType } from "@safe-global/types-kit";
import { ethers, AbiCoder } from "ethers";
import dotenv from "dotenv";
import {
  CHAIN_CONFIGS,
  type ChainConfig,
} from "../../editors/invoice/utils/utils.js";

dotenv.config();

// --- Type definitions ---
export interface PayerWallet {
  rpc: string;
  chainName: string;
  chainId: string;
  address: string;
  fallbackRpcs: string[];
}

export interface PayeeWallet {
  address: string;
}

export interface TokenInfo {
  symbol: string;
  evmAddress: string;
  decimals: number;
}

export interface PaymentDetail {
  payeeWallet: PayeeWallet;
  token: TokenInfo;
  amount: string | number;
}

export interface TransferResult {
  success: true;
  txHash: string;
  safeAddress: string;
  paymentDetails: PaymentDetail[];
}

// Alchemy RPC endpoints (server-side only, requires ALCHEMY_API_KEY)
const ALCHEMY_RPC: Record<string, string> = {
  base: "https://base-mainnet.g.alchemy.com/v2",
  ethereum: "https://eth-mainnet.g.alchemy.com/v2",
  "arbitrum one": "https://arb-mainnet.g.alchemy.com/v2",
};

function getAlchemyRpc(chainKey: string): string {
  const apiKey = process.env.ALCHEMY_API_KEY;
  const baseUrl = ALCHEMY_RPC[chainKey];
  if (!apiKey || !baseUrl) return "";
  return `${baseUrl}/${apiKey}`;
}

// Public RPC fallbacks per chain
const FALLBACK_RPCS: Record<string, string[]> = {
  base: [
    "https://base-mainnet.public.blastapi.io",
    "https://base-rpc.publicnode.com",
  ],
  ethereum: [
    "https://ethereum-rpc.publicnode.com",
    "https://eth-mainnet.public.blastapi.io",
    "https://1rpc.io/eth",
  ],
  "arbitrum one": [
    "https://arb1.arbitrum.io/rpc",
    "https://arbitrum-one-rpc.publicnode.com",
    "https://arbitrum-one.public.blastapi.io",
  ],
};

// Resolved lazily so a missing env var only breaks Gnosis-payment calls,
// not module import (which would take down the whole subgraph bundle).
let cachedSafeAddress: string | undefined;
function getSafeAddress(): string {
  if (cachedSafeAddress) return cachedSafeAddress;
  const isProduction = process.env.NODE_ENV === "production";
  const value = isProduction
    ? process.env.PRODUCTION_SAFE_ADDRESS
    : process.env.DEV_STAGING_SAFE_ADDRESS;
  if (!value) {
    const envVarName = isProduction
      ? "PRODUCTION_SAFE_ADDRESS"
      : "DEV_STAGING_SAFE_ADDRESS";
    throw new Error(
      `Missing ${envVarName} in .env (NODE_ENV=${process.env.NODE_ENV || "undefined"})`,
    );
  }
  console.log(
    `----- GNOSIS TRANSACTION BUILDER ----- Using ${isProduction ? "PRODUCTION" : "DEV/STAGING"} Safe address: ${value}`,
  );
  cachedSafeAddress = value;
  return value;
}

function buildPayerWallet(chainKey: string, config: ChainConfig): PayerWallet {
  const alchemyRpc = getAlchemyRpc(chainKey);
  return {
    chainName: config.chainName,
    chainId: config.chainId,
    rpc: alchemyRpc || config.rpc,
    address: getSafeAddress(),
    fallbackRpcs: FALLBACK_RPCS[chainKey] ?? [],
  };
}

function getPayerWallets(): Record<string, PayerWallet> {
  return {
    BASE: buildPayerWallet("base", CHAIN_CONFIGS.base),
    ETHEREUM: buildPayerWallet("ethereum", CHAIN_CONFIGS.ethereum),
    "ARBITRUM ONE": buildPayerWallet(
      "arbitrum one",
      CHAIN_CONFIGS["arbitrum one"],
    ),
  };
}

/**
 * Retry helper with exponential backoff for Safe API calls
 * Handles rate limiting (429 errors) and temporary failures
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000,
  operationName = "API call",
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      const errStatus =
        error instanceof Object && "status" in error
          ? (error as { status: number }).status
          : undefined;
      const isRateLimit =
        errMsg.includes("Too Many Requests") ||
        errMsg.includes("429") ||
        errStatus === 429;

      if (isRateLimit && attempt < maxRetries - 1) {
        const waitTime = initialDelay * Math.pow(2, attempt);
        console.log(
          `[${operationName}] Rate limited, retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      throw error;
    }
  }
  throw new Error(`${operationName}: Max retries (${maxRetries}) exceeded`);
}

// --- Implementation ---
/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
async function initSafeProtocolKit(
  rpcs: string[],
  privateKey: string,
  walletAddress: string,
) {
  let lastError: Error = new Error("No RPC endpoints provided");
  for (const rpc of rpcs) {
    try {
      console.log(`Trying RPC: ${rpc}`);
      // @ts-expect-error - Safe.init typing mismatch with runtime API
      const kit = await Safe.init({
        provider: rpc,
        signer: privateKey,
        safeAddress: walletAddress,
      });
      console.log(`Connected via RPC: ${rpc}`);
      return kit;
    } catch (err: unknown) {
      console.warn(
        `RPC failed (${rpc}):`,
        err instanceof Error ? err.message : err,
      );
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }
  throw lastError;
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
async function executeTransferProposal(
  chainName: string,
  paymentDetailsInput: PaymentDetail | PaymentDetail[],
): Promise<TransferResult> {
  const wallets = getPayerWallets();
  const payerWallet = wallets[chainName.toUpperCase()];

  const paymentDetails = Array.isArray(paymentDetailsInput)
    ? paymentDetailsInput
    : [paymentDetailsInput];

  const privateKey = process.env.SIGNER_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("Missing SIGNER_PRIVATE_KEY in .env");
  }

  console.log("\n=== Safe Transfer Initialization ===");
  console.log(`Chain: ${payerWallet.chainName} (${payerWallet.chainId})`);
  console.log(`Safe Address: ${payerWallet.address}`);

  // Build ordered list of RPCs: primary + fallbacks
  const rpcs: string[] = [payerWallet.rpc, ...payerWallet.fallbackRpcs];

  // Set up provider and signer using the primary RPC
  const provider = new ethers.JsonRpcProvider(payerWallet.rpc);
  const signer = new ethers.Wallet(privateKey, provider);

  // Safe API and Protocol Kit instances
  // @ts-expect-error - SafeApiKit constructor typing mismatch with runtime API
  const safeApiKit = new SafeApiKit({
    chainId: BigInt(payerWallet.chainId),
    apiKey: process.env.SAFE_API_KEY,
  });

  // Get next nonce with retry logic for rate limiting
  const nextNonce = await withRetry(
    () => safeApiKit.getNextNonce(getSafeAddress()),
    3,
    1000,
    "getNextNonce",
  );
  console.log("Next Nonce: ", nextNonce);

  // Initialize Safe Protocol Kit with RPC fallback
  const protocolKit = await initSafeProtocolKit(
    rpcs,
    privateKey,
    payerWallet.address,
  );

  // Build the batch of ERC-20 transfer calls
  const coder = AbiCoder.defaultAbiCoder();
  const transactions = paymentDetails.map((pd) => {
    const { payeeWallet, token, amount } = pd;
    const amountSmall = ethers.parseUnits(amount.toString(), token.decimals);

    console.log("\n--- Preparing transfer ---");
    console.log(`Token: ${token.symbol} @ ${token.evmAddress}`);
    console.log(`To: ${payeeWallet.address}`);
    console.log(`Amount: ${amount} → ${amountSmall}`);

    // a9059cbb is the ERC-20 transfer method ID
    const data =
      "0xa9059cbb" +
      coder
        .encode(["address", "uint256"], [payeeWallet.address, amountSmall])
        .slice(2);

    return {
      to: ethers.getAddress(token.evmAddress),
      value: "0",
      data,
      operation: OperationType.Call,
    };
  });

  console.log("\n=== Creating Safe transaction ===");
  const safeTx = await protocolKit.createTransaction({
    transactions,
    options: {
      nonce: nextNonce,
    },
  });

  console.log("\n=== Signing & proposing ===");
  const safeTxHash = await protocolKit.getTransactionHash(safeTx);
  const signature = await protocolKit.signHash(safeTxHash);
  const senderAddress = await signer.getAddress();

  // Propose transaction with retry logic for rate limiting
  await withRetry(
    async () => {
      try {
        await safeApiKit.proposeTransaction({
          safeAddress: payerWallet.address,
          safeTransactionData: safeTx.data,
          safeTxHash,
          senderAddress,
          senderSignature: signature.data,
        });
      } catch (err: unknown) {
        console.error("Propose TX payload:", {
          safeAddress: payerWallet.address,
          safeTxHash,
          senderAddress,
          nonce: nextNonce,
        });
        // Make a raw fetch to surface the actual API error body
        try {
          const apiUrl = `https://safe-transaction-mainnet.safe.global/api/v1/safes/${payerWallet.address}/multisig-transactions/`;
          const rawRes = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              ...safeTx.data,
              safeTxHash,
              sender: senderAddress,
              signature: signature.data,
            }),
          });
          const rawBody = await rawRes.text();
          console.error(`Safe API raw response (${rawRes.status}):`, rawBody);
        } catch {
          // ignore debug fetch failure
        }
        throw err;
      }
    },
    3,
    1000,
    "proposeTransaction",
  );

  return {
    success: true,
    txHash: safeTxHash,
    safeAddress: payerWallet.address,
    paymentDetails,
  };
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */

export { executeTransferProposal };
