import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import { alchemyClient } from "../../scripts/alchemy/alchemyClient.js";
import { actions } from "document-models/account-transactions";
import type { AccountTransactionsDocument } from "document-models/account-transactions";
import { generateId } from "document-model/core";

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const { reactorClient } = subgraph;

  return {
    Mutation: {
      AccountTransactions_getTransactionsFromAlchemy: async (
        _: unknown,
        args: { address: string; fromBlock?: string },
      ) => {
        const { address, fromBlock } = args;
        console.log(
          `[Resolver] getTransactionsFromAlchemy called for address:`,
          address,
        );

        try {
          const result =
            await alchemyClient.instance.getAllTransactionsForAddress(address, {
              fromBlock: fromBlock || "0x0",
              includeERC20: true,
              includeExternal: true,
              includeInternal: false,
              maxCount: 1000,
            });

          const { transactions } = result;
          console.log(
            `[Resolver] Successfully fetched ${transactions.length} transactions`,
          );

          // Format transactions to match GraphQL schema - include uniqueId
          const formattedTransactions = transactions.map((tx) => ({
            counterParty: tx.counterParty,
            amount: `${tx.amount.value} ${tx.amount.unit}`,
            txHash: tx.txHash,
            token: tx.token,
            blockNumber: tx.blockNumber,
            uniqueId: tx.uniqueId || null,
            datetime: tx.datetime,
            accountingPeriod: tx.accountingPeriod,
            from: tx.from,
            to: tx.to,
            direction: tx.direction,
          }));

          return {
            success: true,
            transactions: formattedTransactions,
            message: `Successfully fetched ${transactions.length} transactions from Alchemy`,
            transactionsCount: transactions.length,
          };
        } catch (error) {
          console.error(`[Resolver] Error fetching transactions:`, error);
          return {
            success: false,
            transactions: [],
            message: `Error fetching transactions: ${error instanceof Error ? error.message : "Unknown error"}`,
            transactionsCount: 0,
          };
        }
      },

      AccountTransactions_fetchTransactionsFromAlchemy: async (
        _: unknown,
        args: { docId: string; address: string; fromBlock?: string },
      ) => {
        const { docId, address, fromBlock } = args;
        console.log(`[Resolver] fetchTransactionsFromAlchemy called:`, {
          docId,
          address,
          fromBlock,
        });

        const doc = await reactorClient.get<AccountTransactionsDocument>(docId);
        if (!doc) {
          throw new Error(`Document with id ${docId} not found`);
        }

        try {
          const result =
            await alchemyClient.instance.getAllTransactionsForAddress(address, {
              fromBlock: fromBlock || "0x0",
              includeERC20: true,
              includeExternal: true,
              includeInternal: false,
              maxCount: 1000,
            });

          const { transactions } = result;

          if (!transactions || transactions.length === 0) {
            return {
              success: true,
              transactionsAdded: 0,
              message:
                "No new transactions found. All transactions are up to date.",
            };
          }

          // Get existing transactions for deduplication using uniqueId
          const existingTransactions = doc.state.global.transactions || [];
          const existingUniqueIds = new Set(
            existingTransactions
              .map((tx: any) => tx.details?.uniqueId)
              .filter((id: string | null | undefined) => id != null),
          );

          // Add only new transactions that don't already exist (based on uniqueId)
          let successfullyAdded = 0;
          let skippedDuplicates = 0;

          for (const tx of transactions) {
            // Skip if transaction with this uniqueId already exists
            if (tx.uniqueId && existingUniqueIds.has(tx.uniqueId)) {
              skippedDuplicates++;
              console.log(
                `[Resolver] Skipping duplicate transaction with uniqueId: ${tx.uniqueId}`,
              );
              continue;
            }

            try {
              await reactorClient.execute(docId, "main", [
                actions.addTransaction({
                  id: generateId(),
                  counterParty: tx.counterParty,
                  amount: tx.amount,
                  datetime: tx.datetime,
                  txHash: tx.txHash,
                  token: tx.token,
                  blockNumber: tx.blockNumber,
                  uniqueId: tx.uniqueId || null,
                  accountingPeriod: tx.accountingPeriod,
                  direction: tx.direction,
                  budget: null,
                }),
              ]);

              successfullyAdded++;
              // Add to set to prevent duplicates within this batch
              if (tx.uniqueId) {
                existingUniqueIds.add(tx.uniqueId);
              }
            } catch (addError) {
              console.error(
                `[Resolver] Failed to add transaction ${tx.txHash}:`,
                addError instanceof Error ? addError.message : addError,
              );
            }
          }

          console.log(
            `[Resolver] Summary: ${successfullyAdded} added, ${skippedDuplicates} skipped (duplicates)`,
          );

          if (successfullyAdded === 0) {
            return {
              success: true,
              transactionsAdded: 0,
              message:
                skippedDuplicates > 0
                  ? `No new transactions found. All ${skippedDuplicates} transaction(s) already exist in the document.`
                  : "No new transactions found. All transactions are up to date.",
            };
          }

          return {
            success: true,
            transactionsAdded: successfullyAdded,
            message:
              skippedDuplicates > 0
                ? `Successfully added ${successfullyAdded} new transaction(s) (${skippedDuplicates} skipped - already exist)`
                : `Successfully added ${successfullyAdded} new transaction(s)`,
          };
        } catch (error) {
          console.error(
            "[Resolver] Error fetching transactions from Alchemy:",
            error,
          );
          throw new Error(
            `Failed to fetch transactions: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      },
    },
  };
};
