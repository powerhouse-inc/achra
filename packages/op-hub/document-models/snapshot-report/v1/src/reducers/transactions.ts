import type { SnapshotReportTransactionsOperations } from "document-models/snapshot-report/v1";
import {
  AddTransactionAccountNotFoundError,
  DuplicateTransactionError,
  RemoveTransactionNotFoundError,
  UpdateFlowTypeTransactionNotFoundError,
} from "../../gen/transactions/error.js";

export const snapshotReportTransactionsOperations: SnapshotReportTransactionsOperations =
  {
    addTransactionOperation(state, action) {
      const account = state.snapshotAccounts.find(
        (a) => a.id === action.input.accountId,
      );
      if (!account) {
        throw new AddTransactionAccountNotFoundError(
          `Account with ID ${action.input.accountId} not found`,
        );
      }

      const existingTransaction = account.transactions.find(
        (t) => t.id === action.input.id,
      );
      if (existingTransaction) {
        throw new DuplicateTransactionError(
          `Transaction with ID ${action.input.id} already exists`,
        );
      }

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

      function isSwapAddress(address: string | null | undefined): boolean {
        if (!address) return false;
        return SWAP_ADDRESSES.has(address.toLowerCase());
      }

      // AUTO-CATEGORIZATION: Determine flow type and counter-party account ID
      let flowType = action.input.flowType || null;
      let counterPartyAccountId = action.input.counterPartyAccountId || null;

      // Check for swap transactions first (highest priority)
      const counterParty = action.input.counterParty;
      if (!flowType && isSwapAddress(counterParty)) {
        flowType = "Swap";
      } else if (counterParty) {
        // Find counter-party account in snapshot
        const counterPartyLower = counterParty.toLowerCase();
        const counterPartyAccount = state.snapshotAccounts.find(
          (acc) => acc.accountAddress.toLowerCase() === counterPartyLower,
        );

        if (counterPartyAccount) {
          // Auto-link counter-party account
          counterPartyAccountId = counterPartyAccount.id;

          // Auto-categorize flow type if not explicitly provided
          if (!flowType) {
            // Determine sender and receiver types based on transaction direction
            const fromType =
              action.input.direction === "OUTFLOW"
                ? account.type
                : counterPartyAccount.type;
            const toType =
              action.input.direction === "OUTFLOW"
                ? counterPartyAccount.type
                : account.type;

            // Flow categorization rules
            if (fromType === "Source") {
              flowType = "TopUp";
            } else if (toType === "Source") {
              flowType = "Return";
            } else if (toType === "Destination") {
              flowType = "TopUp";
            } else if (fromType === "External") {
              flowType = "External";
            } else if (fromType === "Internal" && toType === "Internal") {
              flowType = "Internal";
            } else if (fromType === "Internal" && toType === "External") {
              flowType = "External";
            } else {
              flowType = "External";
            }
          }
        } else if (!flowType) {
          // FALLBACK: Counter-party not found in snapshot, default to External
          flowType = "External";
        }
      } else if (!flowType) {
        // FALLBACK: No counter-party provided, default to External
        flowType = "External";
      }

      const newTransaction = {
        id: action.input.id,
        transactionId: action.input.transactionId,
        counterParty: action.input.counterParty || null,
        amount: action.input.amount,
        datetime: action.input.datetime,
        txHash: action.input.txHash,
        token: action.input.token,
        blockNumber: action.input.blockNumber || null,
        direction: action.input.direction,
        flowType: flowType,
        counterPartyAccountId: counterPartyAccountId,
      };

      account.transactions.push(newTransaction);
    },
    removeTransactionOperation(state, action) {
      let found = false;

      for (const account of state.snapshotAccounts) {
        const transactionIndex = account.transactions.findIndex(
          (t) => t.id === action.input.id,
        );
        if (transactionIndex !== -1) {
          account.transactions.splice(transactionIndex, 1);
          found = true;
          break;
        }
      }

      if (!found) {
        throw new RemoveTransactionNotFoundError(
          `Transaction with ID ${action.input.id} not found`,
        );
      }
    },
    updateTransactionFlowTypeOperation(state, action) {
      let transaction = null;

      for (const account of state.snapshotAccounts) {
        transaction = account.transactions.find(
          (t) => t.id === action.input.id,
        );
        if (transaction) {
          break;
        }
      }

      if (!transaction) {
        throw new UpdateFlowTypeTransactionNotFoundError(
          `Transaction with ID ${action.input.id} not found`,
        );
      }

      transaction.flowType = action.input.flowType;
    },
    recalculateFlowTypesOperation(state, action) {
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

      function isSwapAddress(address: string | null | undefined): boolean {
        if (!address) return false;
        return SWAP_ADDRESSES.has(address.toLowerCase());
      }

      for (const account of state.snapshotAccounts) {
        for (const tx of account.transactions) {
          // Check for swap transactions first
          if (isSwapAddress(tx.counterParty)) {
            tx.flowType = "Swap";
            continue;
          }

          if (!tx.counterParty) continue;

          // Find counter-party account
          const txCounterPartyLower = tx.counterParty.toLowerCase();
          const counterPartyAccount = state.snapshotAccounts.find(
            (acc) => acc.accountAddress.toLowerCase() === txCounterPartyLower,
          );

          if (counterPartyAccount) {
            // Update counter-party link if missing
            if (!tx.counterPartyAccountId) {
              tx.counterPartyAccountId = counterPartyAccount.id;
            }

            // Recalculate flow type based on account types
            const fromType =
              tx.direction === "OUTFLOW"
                ? account.type
                : counterPartyAccount.type;
            const toType =
              tx.direction === "OUTFLOW"
                ? counterPartyAccount.type
                : account.type;

            // Flow categorization rules
            if (fromType === "Source") {
              tx.flowType = "TopUp";
            } else if (toType === "Source") {
              tx.flowType = "Return";
            } else if (toType === "Destination") {
              tx.flowType = "TopUp";
            } else if (fromType === "External") {
              tx.flowType = "External";
            } else if (fromType === "Internal" && toType === "Internal") {
              tx.flowType = "Internal";
            } else if (fromType === "Internal" && toType === "External") {
              tx.flowType = "External";
            } else {
              tx.flowType = "External";
            }
          }
        }
      }
    },
  };
