/**
 * Utility functions for calculating opening and closing balances
 * from transactions in snapshot reports
 */

import type { SnapshotTransaction } from "../../../document-models/snapshot-report/v1/gen/types.js";
import type {
  Scalars,
  AccountType,
} from "../../../document-models/snapshot-report/v1/gen/schema/types.js";

export type Amount_Currency = Scalars["Amount_Currency"]["output"];

export interface TokenBalance {
  token: string;
  opening: Amount_Currency;
  closing: Amount_Currency;
}

/**
 * Calculate the effect of a transaction on balance based on account type
 *
 * - Internal accounts: Standard balance (INFLOW +, OUTFLOW -)
 * - Source accounts: Track "cumulative provided" (OUTFLOW = funds sent to team = positive)
 * - Destination accounts: Track "cumulative received" (INFLOW = funds received from team = positive)
 * - External accounts: Net flows with team (standard balance)
 */
function getTransactionEffect(
  direction: string,
  amountValue: number,
  accountType?: string,
): number {
  // For Source accounts: OUTFLOW means funds provided (positive)
  if (accountType === "Source") {
    return direction === "OUTFLOW" ? amountValue : -amountValue;
  }

  // For Destination accounts: INFLOW means funds received (positive)
  if (accountType === "Destination") {
    return direction === "INFLOW" ? amountValue : -amountValue;
  }

  // For Internal and External accounts: Standard balance
  // INFLOW = positive, OUTFLOW = negative
  return direction === "INFLOW" ? amountValue : -amountValue;
}

/**
 * Calculate opening and closing balances for all tokens from transactions
 * @param transactions - All transactions for the account
 * @param startDate - Period start date (ISO string)
 * @param endDate - Period end date (ISO string)
 * @param accountType - Optional account type for type-specific balance logic
 * @param existingStartingBalances - Optional existing starting balances to preserve tokens with no transactions
 * @returns Map of token to balance information
 */
export function calculateBalances(
  transactions: SnapshotTransaction[],
  startDate: string,
  endDate: string,
  accountType?: AccountType,
  existingStartingBalances?: Array<{ token: string; amount: Amount_Currency }>,
): Map<string, TokenBalance> {
  const balances = new Map<string, TokenBalance>();
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Initialize balances from existing starting balances
  // This ensures tokens with opening balances but no transactions still get closing balances
  if (existingStartingBalances && existingStartingBalances.length > 0) {
    existingStartingBalances.forEach((startingBalance) => {
      const token = startingBalance.token;
      if (!token) return; // Skip if no token

      if (!balances.has(token)) {
        // Parse the starting balance amount
        // Amount_Currency is always an object with { value: string, unit: string }
        let openingValue = "0";
        let unit = token;

        if (
          startingBalance.amount &&
          typeof startingBalance.amount === "object"
        ) {
          if (
            startingBalance.amount.value !== undefined &&
            startingBalance.amount.value !== null
          ) {
            openingValue = String(startingBalance.amount.value);
          }
          if (startingBalance.amount.unit) {
            unit = String(startingBalance.amount.unit);
          }
        }

        balances.set(token, {
          token,
          opening: {
            value: openingValue,
            unit: unit,
          },
          closing: {
            value: "0", // Initialize period change to 0 (will be updated if there are period transactions)
            unit: unit,
          },
        });
      }
    });
  }

  // Process all transactions
  transactions.forEach((tx) => {
    const txDate = new Date(tx.datetime);
    const token = tx.token;

    // Initialize balance for this token if not exists
    if (!balances.has(token)) {
      balances.set(token, {
        token,
        opening: { value: "0", unit: token },
        closing: { value: "0", unit: token },
      });
    }

    const balance = balances.get(token)!;
    let amountStr: string;
    const txAmount = tx.amount as { value?: string; unit?: string } | string;
    if (typeof txAmount === "object" && txAmount?.value !== undefined) {
      amountStr = txAmount.value;
    } else if (typeof txAmount === "string") {
      amountStr = txAmount.split(" ")[0] || "0";
    } else {
      amountStr = "0";
    }
    const amountValue = parseFloat(amountStr);

    const effect = getTransactionEffect(tx.direction, amountValue, accountType);

    // Calculate opening balance (transactions before period start)
    if (txDate < start) {
      const currentOpening = parseFloat(balance.opening.value || "0");
      balance.opening.value = (currentOpening + effect).toString();
    }

    // Calculate period change (transactions during period)
    if (txDate >= start && txDate <= end) {
      const currentClosing = parseFloat(balance.closing.value || "0");
      balance.closing.value = (currentClosing + effect).toString();
    }
  });

  // Finalize closing balances (opening + period changes)
  // Fix floating-point precision errors (e.g., -0.0000001 → 0)
  const fixPrecision = (value: number): number => {
    // Only fix values very close to zero (floating-point errors)
    // Allow real negative balances for non-Internal accounts
    if (Math.abs(value) < 1e-10) return 0;
    return value;
  };

  balances.forEach((balance) => {
    const openingValue = parseFloat(balance.opening.value || "0");
    const periodChange = parseFloat(balance.closing.value || "0");
    const closingValue = openingValue + periodChange;

    balance.opening.value = fixPrecision(openingValue).toString();
    balance.closing.value = fixPrecision(closingValue).toString();

    // Debug logging for non-zero balances
    if (Math.abs(openingValue) > 1e-10 || Math.abs(closingValue) > 1e-10) {
      console.log("[calculateBalances] Finalized balance:", {
        token: balance.token,
        opening: balance.opening.value,
        closing: balance.closing.value,
        periodChange,
      });
    }
  });

  return balances;
}

/**
 * Format balance amount for display
 */
export function formatBalance(amount: Amount_Currency): string {
  if (typeof amount === "object" && amount?.value !== undefined) {
    const value = parseFloat(amount.value);
    return `${value.toFixed(6)} ${amount.unit || ""}`.trim();
  }
  // Amount_Currency should always be an object with value/unit
  return "0";
}
