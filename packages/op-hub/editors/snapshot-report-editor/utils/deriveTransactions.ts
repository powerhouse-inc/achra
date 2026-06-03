/**
 * Utility for deriving transactions for non-Internal accounts
 * from Internal account transactions where they appear as counter-parties.
 *
 * This allows Source/Destination/External accounts to show their interactions
 * with Internal accounts without requiring their own AccountTransactions documents.
 */

import { generateId } from "document-model/core";
import type {
  SnapshotAccount,
  TransactionFlowType,
} from "../../../document-models/snapshot-report/v1/gen/schema/types.js";
import { calculateFlowType } from "./flowTypeCalculations.js";

/**
 * Derived transaction ready to be added to a snapshot account
 */
export interface DerivedTransactionInput {
  id: string;
  transactionId: string;
  counterParty: string;
  counterPartyAccountId: string;
  amount: { value: string; unit: string };
  datetime: string;
  txHash: string;
  token: string;
  blockNumber: number | null;
  direction: "INFLOW" | "OUTFLOW";
  flowType: TransactionFlowType;
}

/**
 * Invert the direction of a transaction
 * When deriving from Internal account's perspective to the counter-party's perspective
 */
function invertDirection(direction: string): "INFLOW" | "OUTFLOW" {
  return direction === "INFLOW" ? "OUTFLOW" : "INFLOW";
}

/**
 * Derive transactions for a non-Internal account by scanning Internal account transactions
 *
 * @param account - The Source/Destination/External account to derive transactions for
 * @param internalAccounts - All Internal accounts with their transactions
 * @returns Array of derived transactions from the account's perspective
 */
export function deriveTransactionsForAccount(
  account: SnapshotAccount,
  internalAccounts: SnapshotAccount[],
): DerivedTransactionInput[] {
  const derivedTransactions: DerivedTransactionInput[] = [];
  const accountAddressLower = account.accountAddress.toLowerCase();

  // Scan all Internal accounts
  for (const internalAccount of internalAccounts) {
    // Find transactions where the counter-party is our target account
    for (const tx of internalAccount.transactions) {
      if (tx.counterParty?.toLowerCase() === accountAddressLower) {
        // Derive the transaction from the non-Internal account's perspective
        const invertedDirection = invertDirection(tx.direction);

        // Calculate flow type from the derived account's perspective
        const flowType = calculateFlowType(
          invertedDirection,
          account.type,
          internalAccount.type, // counter-party is the Internal account
        );

        // Parse amount
        const txAmount = tx.amount as
          | { value?: string; unit?: string }
          | string;
        let amount: { value: string; unit: string };
        if (typeof txAmount === "object" && txAmount.value !== undefined) {
          amount = { value: txAmount.value, unit: txAmount.unit || tx.token };
        } else if (typeof txAmount === "string") {
          amount = { value: txAmount.split(" ")[0] || "0", unit: tx.token };
        } else {
          amount = { value: "0", unit: tx.token };
        }

        derivedTransactions.push({
          id: generateId(),
          transactionId: tx.transactionId, // Reference to original transaction
          counterParty: internalAccount.accountAddress, // The Internal account is now the counter-party
          counterPartyAccountId: internalAccount.id,
          amount,
          datetime: tx.datetime,
          txHash: tx.txHash,
          token: tx.token,
          blockNumber: tx.blockNumber ?? null,
          direction: invertedDirection,
          flowType,
        });
      }
    }
  }

  // Sort by datetime
  derivedTransactions.sort(
    (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime(),
  );

  return derivedTransactions;
}

/**
 * Derive transactions for all non-Internal accounts in the snapshot
 *
 * @param snapshotAccounts - All accounts in the snapshot
 * @returns Map of account ID to derived transactions
 */
export function deriveTransactionsForAllNonInternalAccounts(
  snapshotAccounts: SnapshotAccount[],
): Map<string, DerivedTransactionInput[]> {
  const internalAccounts = snapshotAccounts.filter(
    (acc) => acc.type === "Internal",
  );
  const nonInternalAccounts = snapshotAccounts.filter(
    (acc) => acc.type !== "Internal",
  );

  const derivedByAccount = new Map<string, DerivedTransactionInput[]>();

  for (const account of nonInternalAccounts) {
    const derived = deriveTransactionsForAccount(account, internalAccounts);
    derivedByAccount.set(account.id, derived);
  }

  return derivedByAccount;
}

/**
 * Check if an account should have derived transactions (non-Internal types)
 */
export function shouldDeriveTransactions(accountType: string): boolean {
  return accountType !== "Internal";
}
