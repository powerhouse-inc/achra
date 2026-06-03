import { useState } from "react";
import { Button } from "@powerhousedao/document-engineering";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  setSelectedNode,
  useParentFolderForSelectedNode,
  useSelectedDrive,
  useDocumentsInSelectedDrive,
  dispatchActions,
} from "@powerhousedao/reactor-browser";
import { deleteNode } from "@powerhousedao/shared/document-drive";
import { generateId } from "document-model/core";
import { useSelectedAccountTransactionsDocument } from "../hooks/useAccountTransactionsDocument.js";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setAccount,
} from "../../document-models/account-transactions/v1/gen/creators.js";
import type {
  TransactionEntry,
  AddTransactionInput,
} from "../../document-models/account-transactions/v1/gen/types.js";
import { TransactionsTable } from "./components/TransactionsTable.js";
import { TransactionForm } from "./components/TransactionForm.js";
import { AccountSection } from "./components/AccountSection.js";
import { alchemyIntegration } from "./alchemyIntegration.js";
import { actions as accountsActions } from "document-models/accounts";
import { actions as expenseReportActions } from "document-models/expense-report";

type ViewMode = "list" | "add" | "edit";

export default function Editor() {
  const [document, dispatch] = useSelectedAccountTransactionsDocument();
  const parentFolder = useParentFolderForSelectedNode();
  const [selectedDrive] = useSelectedDrive();
  const allDocuments = useDocumentsInSelectedDrive();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionEntry | null>(null);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  function handleAddTransaction(values: Omit<AddTransactionInput, "id">) {
    dispatch(
      addTransaction({
        id: generateId(),
        ...values,
      }),
    );
    setViewMode("list");
  }

  function handleUpdateTransaction(
    values: AddTransactionInput | Omit<AddTransactionInput, "id">,
  ) {
    if ("id" in values) {
      dispatch(updateTransaction(values));
    }
    setViewMode("list");
    setEditingTransaction(null);
  }

  function handleDeleteTransaction(id: string) {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransaction({ id }));
    }
  }

  function handleEditClick(transaction: TransactionEntry) {
    setEditingTransaction(transaction);
    setViewMode("edit");
  }

  function handleCancelForm() {
    setViewMode("list");
    setEditingTransaction(null);
  }

  async function handleDeleteDocument() {
    if (!document) return;

    const confirmMessage =
      "Are you sure you want to delete this account transactions document? This will also remove all references to it from Accounts, Expense Reports, and Snapshot Reports.";
    if (!window.confirm(confirmMessage)) {
      return;
    }

    setIsDeleting(true);
    const documentId = document.header.id;

    try {
      // Step 1: Find and remove references from Accounts documents
      const accountsDocs =
        allDocuments?.filter(
          (doc: any) => doc.header.documentType === "powerhouse/accounts",
        ) || [];

      for (const accountsDoc of accountsDocs) {
        const state = accountsDoc.state as any;
        const accounts = (state?.global?.accounts || []) as any[];
        const accountsToUpdate = accounts.filter(
          (acc: any) => acc.accountTransactionsId === documentId,
        );

        if (accountsToUpdate.length > 0) {
          const updateActions = accountsToUpdate.map((acc: any) =>
            accountsActions.updateAccount({
              id: acc.id,
              accountTransactionsId: null,
            }),
          );
          await dispatchActions(updateActions, accountsDoc.header.id);
        }
      }

      // Step 2: Find and remove references from Expense Report documents
      const expenseReportDocs =
        allDocuments?.filter(
          (doc: any) => doc.header.documentType === "powerhouse/expense-report",
        ) || [];

      for (const expenseReportDoc of expenseReportDocs) {
        const state = expenseReportDoc.state as any;
        const wallets = (state?.global?.wallets || []) as any[];
        const walletsToUpdate = wallets.filter(
          (wallet: any) => wallet.accountTransactionsDocumentId === documentId,
        );

        if (walletsToUpdate.length > 0) {
          const updateActions = walletsToUpdate.map((wallet: any) =>
            expenseReportActions.updateWallet({
              address: wallet.wallet,
              accountTransactionsDocumentId: null,
            }),
          );
          await dispatchActions(updateActions, expenseReportDoc.header.id);
        }
      }

      // Step 3: Note about Snapshot Reports
      // Snapshot Reports don't have an action to update accountTransactionsId,
      // so those references will remain but won't cause errors since the document is deleted

      // Step 4: Delete the document node from the drive
      if (selectedDrive?.header.id) {
        await dispatchActions(
          [deleteNode({ id: documentId })],
          selectedDrive.header.id,
        );
      }

      // Step 5: Navigate back to parent folder
      setSelectedNode(parentFolder?.id);
    } catch (error) {
      console.error("Error deleting account transactions document:", error);
      alert(
        `Failed to delete document: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleFetchTransactions() {
    const account = document.state.global.account;
    if (!account?.account) {
      alert("Please set an account address first");
      return;
    }

    // Determine last fetched block to request only newer transactions
    const existingTransactions = document.state.global.transactions || [];
    const lastBlockNumber = existingTransactions.reduce(
      (max: number, tx: any) => {
        const bn =
          typeof tx.blockNumber === "number" ? tx.blockNumber : -Infinity;
        return bn > max ? bn : max;
      },
      -Infinity,
    );
    const fromBlock =
      Number.isFinite(lastBlockNumber) && lastBlockNumber >= 0
        ? `0x${(lastBlockNumber + 1).toString(16)}`
        : undefined;

    setIsLoadingTransactions(true);
    try {
      // Try the new method first (when reactor is updated)
      try {
        const result = await alchemyIntegration.getTransactionsFromAlchemy(
          account.account,
          fromBlock,
        );

        if (result.success) {
          // Check if there are any transactions returned
          if (!result.transactions || result.transactions.length === 0) {
            alert(
              "No new transactions found. All transactions are up to date.",
            );
            return;
          }

          // Create a set of existing transaction keys for deduplication
          // Use txHash + blockNumber + token + counterParty + amount as unique identifier
          // Note: Multiple ERC20 transfers can share the same txHash and blockNumber, so we include amount
          const existingTxKeys = new Set(
            existingTransactions.map((tx: any) => {
              const txHash = tx.details?.txHash || tx.txHash || "";
              const blockNumber =
                tx.details?.blockNumber || tx.blockNumber || "";
              const token = tx.details?.token || tx.token || "";
              const counterParty = tx.counterParty || "";
              // Include amount to handle multiple transfers in same transaction
              const amount = tx.amount;
              const amountStr =
                typeof amount === "object" && amount?.value && amount?.unit
                  ? `${amount.value}-${amount.unit}`
                  : typeof amount === "string"
                    ? amount
                    : "";
              return `${txHash}-${blockNumber}-${token}-${counterParty}-${amountStr}`;
            }),
          );

          // Add only new transactions that don't already exist
          let addedCount = 0;
          let skippedCount = 0;
          for (const txData of result.transactions) {
            // Handle amount - it might come as string or object
            let amount;
            if (typeof txData.amount === "string") {
              // Parse amount string back to object format (e.g., "10.5 ETH" -> {value: "10.5", unit: "ETH"})
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
              // Amount is already in the correct object format
              amount = txData.amount;
            } else {
              // Fallback - create amount from token
              amount = {
                value: "0",
                unit: txData.token,
              };
            }

            // Validation - ensure we have required fields before adding
            if (!txData.direction) {
              console.error(
                `[Editor] Skipping transaction with undefined direction:`,
                txData,
              );
              skippedCount++;
              continue;
            }
            if (!txData.from || !txData.to) {
              console.error(
                `[Editor] Skipping transaction with undefined from/to:`,
                {
                  hash: txData.txHash,
                  from: txData.from,
                  to: txData.to,
                  direction: txData.direction,
                },
              );
              skippedCount++;
              continue;
            }
            // Dispatch transaction - reducer will prevent duplicates based on uniqueId
            // If uniqueId already exists, the reducer will throw an error which is stored in the operation
            dispatch(
              addTransaction({
                id: generateId(),
                counterParty: txData.counterParty,
                amount: amount,
                datetime: txData.datetime,
                txHash: txData.txHash,
                token: txData.token,
                blockNumber: txData.blockNumber,
                uniqueId: txData.uniqueId || null,
                accountingPeriod: txData.accountingPeriod,
                direction:
                  (txData.direction as "INFLOW" | "OUTFLOW") || "OUTFLOW", // Use direction from Alchemy data or default to OUTFLOW
                budget: null, // No budget assigned initially
              }),
            );
            addedCount++;
          }

          // Show appropriate message based on results
          if (addedCount === 0) {
            if (skippedCount > 0) {
              alert(
                `No new transactions found. All ${skippedCount} transaction(s) already exist in the document.`,
              );
            } else {
              alert(
                "No new transactions found. All transactions are up to date.",
              );
            }
          } else {
            const message =
              skippedCount > 0
                ? `Successfully added ${addedCount} new transaction(s) from Alchemy (${skippedCount} skipped - already exist or validation errors)`
                : `Successfully added ${addedCount} new transaction(s) from Alchemy`;
            alert(message);
          }
          return;
        } else {
          throw new Error(
            result.message || "Failed to fetch transactions from Alchemy",
          );
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";

        // If the new mutation doesn't exist, provide helpful message
        if (
          errorMessage.includes("400") ||
          errorMessage.includes("Cannot query field")
        ) {
          alert(
            "The transaction fetching feature requires a reactor restart to work. Please restart the reactor (ph vetra) and try again.",
          );
          return;
        }

        // Re-throw other errors
        throw error;
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      alert(
        `Error fetching transactions: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsLoadingTransactions(false);
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DocumentToolbar document={document} />
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">
          Account Transactions
        </h1>
        <Button
          onClick={handleDeleteDocument}
          disabled={isDeleting}
          className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
        >
          {isDeleting ? "Deleting..." : "Delete Document"}
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AccountSection
            account={document.state.global.account}
            hasFetchedTransactions={
              (document.state.global.transactions || []).length > 0
            }
            onSetAccount={(address, name) => {
              dispatch(
                setAccount({
                  id: generateId(),
                  account: address || "",
                  name: name || "",
                }),
              );
            }}
          />

          <div className="mt-8">
            {viewMode === "list" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Transactions ({document.state.global.transactions.length})
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      Manage account transactions with details and budgets. Only
                      new transactions will be added when fetching.
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      onClick={handleFetchTransactions}
                      disabled={
                        isLoadingTransactions ||
                        !document.state.global.account?.account
                      }
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
                    >
                      {isLoadingTransactions
                        ? "Fetching..."
                        : "Fetch New Transactions"}
                    </Button>
                    <Button
                      onClick={() => setViewMode("add")}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
                    >
                      Add Transaction
                    </Button>
                  </div>
                </div>

                <TransactionsTable
                  transactions={document.state.global.transactions}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteTransaction}
                />
              </div>
            )}

            {viewMode === "add" && (
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Add New Transaction
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Fill in the transaction details below
                  </p>
                </div>
                <TransactionForm
                  budgets={document.state.global.budgets}
                  onSubmit={handleAddTransaction}
                  onCancel={handleCancelForm}
                />
              </div>
            )}

            {viewMode === "edit" && editingTransaction && (
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Edit Transaction
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Update the transaction details below
                  </p>
                </div>
                <TransactionForm
                  transaction={editingTransaction}
                  budgets={document.state.global.budgets}
                  onSubmit={handleUpdateTransaction}
                  onCancel={handleCancelForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
