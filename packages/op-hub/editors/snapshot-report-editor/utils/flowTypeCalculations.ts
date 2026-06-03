import type {
  SnapshotAccount,
  TransactionFlowType,
} from "../../../document-models/snapshot-report/v1/gen/schema/types.js";

// Known swap protocol addresses (lowercase)
const SWAP_ADDRESSES = new Set([
  "0x9008d19f58aabd9ed0d60971565aa8510560ab41", // CoW Protocol Settlement
  "0x7a250d5630b4cf539739df2c5dacb4c659f2488d", // Uniswap V2 Router
  "0xe592427a0aece92de3edee1f18e0157c05861564", // Uniswap V3 Router
  "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45", // Uniswap V3 Router 2
  "0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad", // Uniswap Universal Router
  "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f", // SushiSwap Router
  "0x1111111254eeb25477b68fb85ed929f73a960582", // 1inch Router v5
  "0x1111111254fb6c44bac0bed2854e76f90643097d", // 1inch Router v4
  "0xdef1c0ded9bec7f1a1670819833240f027b25eff", // 0x Exchange Proxy
  "0x881d40237659c251811cec9c364ef91dc08d300c", // Metamask Swap Router
]);

/**
 * Check if an address is a known swap protocol address
 */
export function isSwapAddress(address: string | null | undefined): boolean {
  if (!address) return false;
  return SWAP_ADDRESSES.has(address.toLowerCase());
}

/**
 * Calculate the flow type for a transaction based on account types
 * @param direction - Transaction direction (INFLOW or OUTFLOW)
 * @param accountType - Type of the account the transaction belongs to
 * @param counterPartyType - Type of the counter-party account (if found)
 * @returns The calculated flow type
 */
export function calculateFlowType(
  direction: string,
  accountType: string,
  counterPartyType: string | null,
): TransactionFlowType {
  if (!counterPartyType) {
    return "External";
  }

  // Determine sender and receiver types based on transaction direction
  const fromType = direction === "OUTFLOW" ? accountType : counterPartyType;
  const toType = direction === "OUTFLOW" ? counterPartyType : accountType;

  // Flow categorization rules
  if (fromType === "Source") {
    return "TopUp";
  } else if (toType === "Source") {
    return "Return";
  } else if (toType === "Destination") {
    return "TopUp";
  } else if (fromType === "External") {
    return "External";
  } else if (fromType === "Internal" && toType === "Internal") {
    return "Internal";
  } else if (fromType === "Internal" && toType === "External") {
    return "External";
  }

  return "External";
}

/**
 * Find a counter-party account by address in the snapshot accounts
 * @param counterPartyAddress - The ethereum address of the counter-party
 * @param snapshotAccounts - Array of snapshot accounts to search
 * @returns The matching account or undefined
 */
export function findCounterPartyAccount(
  counterPartyAddress: string | null | undefined,
  snapshotAccounts: SnapshotAccount[],
): SnapshotAccount | undefined {
  if (!counterPartyAddress) {
    return undefined;
  }

  return snapshotAccounts.find(
    (acc) =>
      acc.accountAddress.toLowerCase() === counterPartyAddress.toLowerCase(),
  );
}

/**
 * Calculate flow type and counter-party account ID for a transaction
 * @param direction - Transaction direction
 * @param accountType - Type of the account
 * @param counterPartyAddress - Counter-party ethereum address
 * @param snapshotAccounts - All snapshot accounts for lookup
 * @returns Object with flowType and counterPartyAccountId
 */
export function calculateTransactionFlowInfo(
  direction: string,
  accountType: string,
  counterPartyAddress: string | null | undefined,
  snapshotAccounts: SnapshotAccount[],
): {
  flowType: TransactionFlowType;
  counterPartyAccountId: string | null;
} {
  // Check for swap transactions first (highest priority)
  if (isSwapAddress(counterPartyAddress)) {
    return {
      flowType: "Swap",
      counterPartyAccountId: null,
    };
  }

  const counterPartyAccount = findCounterPartyAccount(
    counterPartyAddress,
    snapshotAccounts,
  );

  const flowType = calculateFlowType(
    direction,
    accountType,
    counterPartyAccount?.type ?? null,
  );

  return {
    flowType,
    counterPartyAccountId: counterPartyAccount?.id ?? null,
  };
}
