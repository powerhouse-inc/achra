/**
 * Service for creating Account Transactions documents and fetching transactions
 * Uses reactor-browser APIs for universal local/remote drive compatibility
 */

import type { AccountEntry } from "../../../document-models/accounts/v1/gen/schema/types.js";
import { addDocument, dispatchActions } from "@powerhousedao/reactor-browser";
import {
  actions as accountTransactionsActions,
  addTransaction,
} from "document-models/account-transactions";
import { actions as accountsActions } from "document-models/accounts";
import { generateId } from "document-model/core";
import { alchemyIntegration } from "../../account-transactions-editor/alchemyIntegration.js";

export interface CreateAccountTransactionsResult {
  success: boolean;
  documentId?: string;
  transactionsAdded?: number;
  message: string;
}

export class AccountTransactionsService {
  constructor() {
    // No longer need GraphQL endpoint - using reactor-browser APIs
  }

  /**
   * Create an Account Transactions document and fetch transactions for the account
   */
  async createAccountTransactionsDocument(
    account: AccountEntry,
    accountsDocumentId: string,
    driveId?: string,
  ): Promise<CreateAccountTransactionsResult> {
    try {
      if (!driveId) {
        throw new Error("Drive ID is required to create document");
      }

      // Step 1: Create the Account Transactions document using addDocument
      const documentName = `${account.name} Transactions`;
      console.log("[AccountTransactionsService] Creating document:", {
        name: documentName,
        driveId,
      });

      const createdNode = await addDocument(
        driveId,
        documentName,
        "powerhouse/account-transactions",
        undefined,
        undefined,
        undefined,
        "powerhouse-account-transactions-editor",
      );

      if (!createdNode?.id) {
        throw new Error("Failed to create AccountTransactions document");
      }

      console.log(
        "[AccountTransactionsService] Document created:",
        createdNode.id,
      );

      // Give the document a moment to be fully initialized
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Step 2: Set the account information in the document
      await dispatchActions(
        [
          accountTransactionsActions.setAccount({
            id: account.id,
            account: account.account,
            name: account.name,
          }),
        ],
        createdNode.id,
      );

      console.log("[AccountTransactionsService] Account info set");

      // Wait a bit before adding transactions
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Step 3: Fetch and add transactions from Alchemy
      let transactionsAdded = 0;
      try {
        console.log(
          "[AccountTransactionsService] Fetching transactions from Alchemy for:",
          account.account,
        );

        const result = await alchemyIntegration.getTransactionsFromAlchemy(
          account.account,
        );

        console.log(
          "[AccountTransactionsService] Alchemy result:",
          result.success,
          "transactions count:",
          result.transactions?.length || 0,
        );

        if (result.success && result.transactions.length > 0) {
          // Add each transaction to the document
          const transactionActions = result.transactions
            .filter((txData) => {
              // Validate required fields
              if (!txData.direction || !txData.from || !txData.to) {
                console.error(
                  `[AccountTransactionsService] Skipping invalid transaction:`,
                  txData,
                );
                return false;
              }
              return true;
            })
            .map((txData) => {
              // Handle amount formatting
              let amount;
              if (typeof txData.amount === "string") {
                const amountParts = txData.amount.split(" ");
                amount = {
                  value: amountParts[0] || "0",
                  unit: amountParts[1] || txData.token,
                };
              } else if (
                typeof txData.amount === "object" &&
                txData.amount &&
                "value" in txData.amount &&
                "unit" in txData.amount
              ) {
                amount = txData.amount;
              } else {
                amount = {
                  value: "0",
                  unit: txData.token,
                };
              }

              return addTransaction({
                id: generateId(),
                counterParty: txData.counterParty,
                amount: amount,
                datetime: txData.datetime,
                txHash: txData.txHash,
                token: txData.token,
                blockNumber: txData.blockNumber,
                //uniqueId: txData.uniqueId || null,
                accountingPeriod: txData.accountingPeriod,
                direction:
                  (txData.direction as "INFLOW" | "OUTFLOW") || "OUTFLOW",
                budget: null,
              });
            });

          console.log(
            "[AccountTransactionsService] Creating",
            transactionActions.length,
            "transaction actions",
          );

          if (transactionActions.length > 0) {
            console.log(
              "[AccountTransactionsService] Dispatching",
              transactionActions.length,
              "transaction actions to document:",
              createdNode.id,
            );

            // Batch dispatch transactions 100 at a time for better performance
            const BATCH_SIZE = 100;
            for (let i = 0; i < transactionActions.length; i += BATCH_SIZE) {
              try {
                const batch = transactionActions.slice(i, i + BATCH_SIZE);
                const result = await dispatchActions(batch, createdNode.id);
                if (i === 0) {
                  console.log(
                    `[AccountTransactionsService] First batch dispatch result:`,
                    result,
                  );
                }
                console.log(
                  `[AccountTransactionsService] Dispatched batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(transactionActions.length / BATCH_SIZE)} (${Math.min(i + BATCH_SIZE, transactionActions.length)}/${transactionActions.length} transactions)`,
                );
              } catch (dispatchError) {
                console.error(
                  `[AccountTransactionsService] ERROR dispatching batch starting at ${i}:`,
                  dispatchError,
                );
                throw dispatchError;
              }
            }

            transactionsAdded = transactionActions.length;
            console.log(
              `[AccountTransactionsService] Successfully dispatched all ${transactionsAdded} transaction actions`,
            );
          }
        } else {
          console.log(
            "[AccountTransactionsService] No transactions to add:",
            result.success ? "success but empty" : "failed",
          );
        }
      } catch (alchemyError) {
        console.error(
          "[AccountTransactionsService] ERROR fetching transactions from Alchemy:",
          alchemyError,
        );
        // Don't fail the entire operation if Alchemy fetch fails
      }

      // Step 4: Update the account with the transaction document ID
      console.log(
        "[AccountTransactionsService] Updating account in Accounts document:",
        {
          accountId: account.id,
          accountsDocumentId,
          transactionsDocId: createdNode.id,
        },
      );

      try {
        await dispatchActions(
          [
            accountsActions.updateAccount({
              id: account.id,
              accountTransactionsId: createdNode.id,
            }),
          ],
          accountsDocumentId,
        );

        console.log(
          "[AccountTransactionsService] Successfully updated account with transactions ID",
        );
      } catch (updateError) {
        console.error(
          "[AccountTransactionsService] ERROR updating account:",
          updateError,
        );
        throw updateError;
      }

      return {
        success: true,
        documentId: createdNode.id,
        transactionsAdded,
        message: `Successfully created document and fetched ${transactionsAdded} transactions`,
      };
    } catch (error) {
      console.error(
        "[AccountTransactionsService] Error creating account transactions:",
        error,
      );
      return {
        success: false,
        message: `Failed to create account transactions: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }

  /**
   * Sync transactions for an existing Account Transactions document
   * This fetches new transactions from Alchemy and adds them to an existing document
   */
  async syncTransactionsForDocument(
    documentId: string,
    address: string,
  ): Promise<{
    success: boolean;
    transactionsAdded?: number;
    message: string;
  }> {
    try {
      console.log(
        "[AccountTransactionsService] Syncing transactions for document:",
        documentId,
      );

      const result =
        await alchemyIntegration.getTransactionsFromAlchemy(address);

      if (!result.success || result.transactions.length === 0) {
        return {
          success: true,
          transactionsAdded: 0,
          message: "No new transactions found",
        };
      }

      // Add each transaction to the document
      const transactionActions = result.transactions
        .filter((txData) => {
          // Validate required fields
          if (!txData.direction || !txData.from || !txData.to) {
            console.error(
              `[AccountTransactionsService] Skipping invalid transaction:`,
              txData,
            );
            return false;
          }
          return true;
        })
        .map((txData) => {
          // Handle amount formatting
          let amount;
          if (typeof txData.amount === "string") {
            const amountParts = txData.amount.split(" ");
            amount = {
              value: amountParts[0] || "0",
              unit: amountParts[1] || txData.token,
            };
          } else if (
            typeof txData.amount === "object" &&
            txData.amount &&
            "value" in txData.amount &&
            "unit" in txData.amount
          ) {
            amount = txData.amount;
          } else {
            amount = {
              value: "0",
              unit: txData.token,
            };
          }

          return addTransaction({
            id: generateId(),
            counterParty: txData.counterParty,
            amount: amount,
            datetime: txData.datetime,
            txHash: txData.txHash,
            token: txData.token,
            blockNumber: txData.blockNumber,
            accountingPeriod: txData.accountingPeriod,
            direction: (txData.direction as "INFLOW" | "OUTFLOW") || "OUTFLOW",
            budget: null,
          });
        });

      if (transactionActions.length > 0) {
        // Batch dispatch transactions 100 at a time for better performance
        const BATCH_SIZE = 100;
        for (let i = 0; i < transactionActions.length; i += BATCH_SIZE) {
          const batch = transactionActions.slice(i, i + BATCH_SIZE);
          await dispatchActions(batch, documentId);
          console.log(
            `[AccountTransactionsService] Synced batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(transactionActions.length / BATCH_SIZE)} (${Math.min(i + BATCH_SIZE, transactionActions.length)}/${transactionActions.length} transactions)`,
          );
        }
        console.log(
          `[AccountTransactionsService] Successfully synced all ${transactionActions.length} transactions`,
        );
      }

      return {
        success: true,
        transactionsAdded: transactionActions.length,
        message: `Successfully synced ${transactionActions.length} new transaction(s)`,
      };
    } catch (error) {
      console.error(
        "[AccountTransactionsService] Error syncing transactions:",
        error,
      );
      return {
        success: false,
        transactionsAdded: 0,
        message: `Failed to sync transactions: ${error instanceof Error ? error.message : "Unknown error"}`,
      };
    }
  }
}

// Export singleton instance
export const accountTransactionsService = new AccountTransactionsService();
