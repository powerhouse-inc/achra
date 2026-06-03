/**
 * Utility functions for Alchemy API integration
 */

import type { AlchemyAssetTransfer, TransactionEntry } from "./alchemyTypes.js";

/**
 * Retry mechanism with exponential backoff (following gnosis pattern)
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000,
  operationName = "Alchemy API call",
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit =
        error?.message?.includes("Too Many Requests") ||
        error?.message?.includes("429") ||
        error?.status === 429;

      if (isRateLimit && attempt < maxRetries - 1) {
        const waitTime = initialDelay * Math.pow(2, attempt);
        console.log(
          `[${operationName}] Rate limited, retrying in ${waitTime}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, waitTime));
        continue;
      }

      // If it's not a rate limit error or we've exhausted retries, throw
      if (attempt === maxRetries - 1) {
        console.error(
          `[${operationName}] Max retries exceeded:`,
          error?.message,
        );
      }
      throw error;
    }
  }
  throw new Error(`${operationName}: Max retries exceeded`);
}

/**
 * Validate Ethereum address format
 */
export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Convert Alchemy transaction to document model format
 */
export function convertToTransactionEntry(
  transfer: AlchemyAssetTransfer,
  userAddress: string,
  blockTimestamp?: number,
): TransactionEntry {
  // Convert value based on decimals for ERC20 tokens
  let value: string;
  if (transfer.category === "erc20" && transfer.rawContract.decimal) {
    const decimals = parseInt(transfer.rawContract.decimal, 16);
    const rawValue = parseInt(transfer.rawContract.value, 16);
    value = (rawValue / Math.pow(10, decimals)).toString();
  } else {
    value = transfer.value?.toString() || transfer.rawContract.value || "0";
  }

  const token = transfer.asset || "ETH";

  // Determine direction and counterparty based on transaction flow
  const userAddressLower = userAddress.toLowerCase();
  const fromAddressLower = transfer.from.toLowerCase();
  const toAddressLower = transfer.to.toLowerCase();

  let direction: "INFLOW" | "OUTFLOW";
  let counterParty: string;

  if (toAddressLower === userAddressLower) {
    // Money coming INTO user's account
    direction = "INFLOW";
    counterParty = transfer.from; // The sender is the counterparty
  } else if (fromAddressLower === userAddressLower) {
    // Money going OUT of user's account
    direction = "OUTFLOW";
    counterParty = transfer.to; // The receiver is the counterparty
  } else {
    // This shouldn't happen for user-specific transactions, but fallback to OUTFLOW
    direction = "OUTFLOW";
    counterParty = transfer.from;
  }

  // Use provided timestamp or fallback to current time
  const datetime = blockTimestamp
    ? new Date(blockTimestamp).toISOString()
    : new Date().toISOString();

  // Extract year from the actual transaction date for accounting period
  const transactionDate = new Date(blockTimestamp || Date.now());

  // Validation - throw error if critical fields are undefined
  if (!direction) {
    throw new Error(
      `Direction is undefined for transaction ${transfer.hash}. From: ${transfer.from}, To: ${transfer.to}, User: ${userAddress}`,
    );
  }
  if (!transfer.from) {
    throw new Error(
      `From address is undefined for transaction ${transfer.hash}`,
    );
  }
  if (!transfer.to) {
    throw new Error(`To address is undefined for transaction ${transfer.hash}`);
  }

  return {
    uniqueId: transfer.uniqueId,
    counterParty,
    amount: {
      unit: token,
      value: value,
    },
    txHash: transfer.hash,
    token: token,
    blockNumber: parseInt(transfer.blockNum, 16),
    datetime: datetime,
    accountingPeriod: transactionDate.getFullYear().toString(),
    from: transfer.from,
    to: transfer.to,
    direction,
  };
}

/**
 * Validate environment variables
 */
export function validateEnvironment(): { apiKey: string; network: string } {
  const apiKey = process.env.ALCHEMY_API_KEY;
  if (!apiKey) {
    throw new Error("ALCHEMY_API_KEY environment variable is not set");
  }

  const network = process.env.ALCHEMY_NETWORK || "mainnet";

  return { apiKey, network };
}
