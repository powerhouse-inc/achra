import { useState } from "react";
import { Button } from "@powerhousedao/document-engineering";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Plus,
  RefreshCw,
  X,
} from "lucide-react";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import {
  setSelectedNode,
  usePHToast,
  useParentFolderForSelectedNode,
  useSelectedDrive,
} from "@powerhousedao/reactor-browser";
import { generateId } from "document-model/core";
import { useSelectedAccountsDocument } from "../hooks/useAccountsDocument.js";
import {
  addAccount,
  updateAccount,
  deleteAccount,
  updateKycStatus,
} from "../../document-models/accounts/v1/gen/accounts/creators.js";
import type {
  AccountEntry,
  AccountTypeInput,
  KycAmlStatusTypeInput,
} from "../../document-models/accounts/v1/gen/schema/types.js";
import { AccountForm } from "./components/AccountForm.js";
import { AccountsList } from "./components/AccountsList.js";
import { accountTransactionsService } from "./services/accountTransactionsService.js";

type ViewMode = "list" | "add" | "edit";

const HELP_DISMISSED_KEY = "accountsEditor.helpDismissed";

function InstructionSection({ onDismiss }: { onDismiss: () => void }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg overflow-hidden">
      <div className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-blue-100 transition-colors">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 flex-1"
        >
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <span className="font-medium text-blue-900">
            Getting Started with Accounts
          </span>
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 hover:bg-blue-200 rounded text-blue-600"
            title="Don't show again"
            aria-label="Dismiss help section"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-blue-100 rounded"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-blue-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-blue-600" />
            )}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 text-sm text-blue-800 space-y-3">
          <div>
            <strong className="text-blue-900">What is an Account?</strong>
            <p className="mt-1">
              An account represents a wallet address or entity that participates
              in your financial flows. This could be a treasury wallet, a
              contributor's address, or an external service provider.
            </p>
          </div>
          <div>
            <strong className="text-blue-900">
              Why specify an Account Type?
            </strong>
            <p className="mt-1">
              The account type helps categorize how funds flow in and out,
              making it easier to track transactions and generate accurate
              reports. It also enables automatic flow type detection.
            </p>
          </div>
          <div>
            <strong className="text-blue-900">Account Type Meanings:</strong>
            <ul className="mt-1 ml-4 list-disc space-y-1">
              <li>
                <strong>Source:</strong> Where funds originate (e.g., revenue
                streams, grants)
              </li>
              <li>
                <strong>Internal:</strong> Wallets within your organization
              </li>
              <li>
                <strong>Destination:</strong> Where you send payments (e.g.,
                contributor wallets)
              </li>
              <li>
                <strong>External:</strong> Third-party accounts outside your
                organization
              </li>
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-2">
            <strong className="text-amber-900">
              📊 Why fetch transactions?
            </strong>
            <p className="mt-1 text-amber-800">
              Transaction history is essential for generating accurate expense
              reports. Without complete transaction data, your reports may have
              gaps or inaccuracies. After adding an account, click "Fetch
              Transaction History" and sync regularly to ensure your reporting
              is complete.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Editor() {
  const [document, dispatch] = useSelectedAccountsDocument();
  const parentFolder = useParentFolderForSelectedNode();
  const [selectedDrive] = useSelectedDrive();
  const toast = usePHToast();
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [editingAccount, setEditingAccount] = useState<AccountEntry | null>(
    null,
  );
  const [creatingTransactionsFor, setCreatingTransactionsFor] = useState<
    string | null
  >(null);
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncProgress, setSyncProgress] = useState<{
    current: number;
    total: number;
    account: string;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    accountId: string | null;
    accountName: string;
  }>({ isOpen: false, accountId: null, accountName: "" });
  const [syncConfirm, setSyncConfirm] = useState(false);
  const [showHelp, setShowHelp] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(HELP_DISMISSED_KEY) !== "true";
    }
    return true;
  });

  function handleDismissHelp() {
    setShowHelp(false);
    localStorage.setItem(HELP_DISMISSED_KEY, "true");
  }

  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  function handleAddAccount(values: {
    account: string;
    name: string;
    budgetPath?: string;
    accountTransactionsId?: string;
    chain?: string[];
    type?: AccountTypeInput;
    owners?: string[];
    KycAmlStatus?: KycAmlStatusTypeInput;
  }) {
    dispatch(
      addAccount({
        id: generateId(),
        account: values.account,
        name: values.name,
        budgetPath: values.budgetPath,
        accountTransactionsId: values.accountTransactionsId,
        chain: values.chain,
        type: values.type || "External",
        owners: values.owners,
        KycAmlStatus: values.KycAmlStatus,
      }),
    );
    setViewMode("list");
  }

  function handleUpdateAccount(values: {
    id?: string;
    account: string;
    name: string;
    budgetPath?: string;
    accountTransactionsId?: string;
    chain?: string[];
    type?: AccountTypeInput;
    owners?: string[];
    KycAmlStatus?: KycAmlStatusTypeInput;
  }) {
    if (!values.id) return;
    dispatch(
      updateAccount({
        id: values.id,
        account: values.account,
        name: values.name,
        budgetPath: values.budgetPath,
        accountTransactionsId: values.accountTransactionsId,
        chain: values.chain,
        type: values.type,
        owners: values.owners,
        KycAmlStatus: values.KycAmlStatus,
      }),
    );
    setViewMode("list");
    setEditingAccount(null);
  }

  function handleDeleteAccount(id: string) {
    const account = accounts.find((a) => a.id === id);
    setDeleteConfirm({
      isOpen: true,
      accountId: id,
      accountName: account?.name || "this account",
    });
  }

  function confirmDelete() {
    if (deleteConfirm.accountId) {
      dispatch(deleteAccount({ id: deleteConfirm.accountId }));
      toast?.("Account deleted successfully", { type: "success" });
    }
    setDeleteConfirm({ isOpen: false, accountId: null, accountName: "" });
  }

  function handleUpdateKycStatus(
    id: string,
    KycAmlStatus: KycAmlStatusTypeInput,
  ) {
    dispatch(updateKycStatus({ id, KycAmlStatus }));
  }

  function handleEditClick(account: AccountEntry) {
    setEditingAccount(account);
    setViewMode("edit");
  }

  function handleCancelForm() {
    setViewMode("list");
    setEditingAccount(null);
  }

  async function handleCreateTransactions(account: AccountEntry) {
    setCreatingTransactionsFor(account.id);
    try {
      const driveId = selectedDrive?.header?.id;
      const accountsDocumentId = document.header.id;
      const result =
        await accountTransactionsService.createAccountTransactionsDocument(
          account,
          accountsDocumentId,
          driveId,
        );

      if (result.success) {
        // Dispatch local update to ensure UI re-renders immediately
        // The service already dispatched to the store, but this ensures local state updates
        if (result.documentId) {
          dispatch(
            updateAccount({
              id: account.id,
              accountTransactionsId: result.documentId,
            }),
          );
        }
        toast?.(
          `Created document and fetched ${result.transactionsAdded} transactions`,
          { type: "success" },
        );
      } else {
        toast?.(`Error: ${result.message}`, { type: "error" });
      }
    } catch (error) {
      toast?.(
        `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
        { type: "error" },
      );
    } finally {
      setCreatingTransactionsFor(null);
    }
  }

  function initiateSync() {
    if (accounts.length === 0) {
      toast?.("No accounts to sync transactions for", { type: "warning" });
      return;
    }
    setSyncConfirm(true);
  }

  async function handleSyncAllTransactions() {
    setSyncConfirm(false);
    setIsSyncingAll(true);
    const results: Array<{
      account: string;
      success: boolean;
      transactionsAdded: number;
      message: string;
    }> = [];

    try {
      const driveId = selectedDrive?.header?.id;
      const accountsDocumentId = document.header.id;

      for (let i = 0; i < accounts.length; i++) {
        const account = accounts[i];
        setSyncProgress({
          current: i + 1,
          total: accounts.length,
          account: account.name,
        });

        try {
          // If account already has a transaction document, sync it
          if (account.accountTransactionsId) {
            const result =
              await accountTransactionsService.syncTransactionsForDocument(
                account.accountTransactionsId,
                account.account,
              );

            results.push({
              account: account.name,
              success: result.success,
              transactionsAdded: result.transactionsAdded || 0,
              message: result.message,
            });
          } else {
            // Otherwise, create a new transaction document and fetch transactions
            const result =
              await accountTransactionsService.createAccountTransactionsDocument(
                account,
                accountsDocumentId,
                driveId,
              );

            if (result.success && result.documentId) {
              // Update the account with the new transaction document ID
              dispatch(
                updateAccount({
                  id: account.id,
                  accountTransactionsId: result.documentId,
                }),
              );
            }

            results.push({
              account: account.name,
              success: result.success,
              transactionsAdded: result.transactionsAdded || 0,
              message: result.message,
            });
          }
        } catch (error) {
          results.push({
            account: account.name,
            success: false,
            transactionsAdded: 0,
            message:
              error instanceof Error ? error.message : "Unknown error occurred",
          });
        }
      }

      // Show summary
      const totalAdded = results.reduce(
        (sum, r) => sum + r.transactionsAdded,
        0,
      );
      const successCount = results.filter((r) => r.success).length;
      const failedCount = results.length - successCount;

      if (failedCount === 0) {
        toast?.(
          `Synced ${successCount} account${successCount !== 1 ? "s" : ""}, ${totalAdded} new transactions`,
          { type: "success" },
        );
      } else {
        toast?.(
          `Synced ${successCount}/${results.length} accounts. ${failedCount} failed.`,
          { type: "warning" },
        );
      }
    } catch (error) {
      toast?.(
        `Error during sync: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
        { type: "error" },
      );
    } finally {
      setIsSyncingAll(false);
      setSyncProgress(null);
    }
  }

  const accounts = document.state.global.accounts;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <DocumentToolbar document={document} />
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Accounts</h1>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            {viewMode === "list" && (
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Accounts
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Manage your accounts and sync transactions
                  </p>
                </div>

                {/* Help Section */}
                {showHelp && (
                  <InstructionSection onDismiss={handleDismissHelp} />
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3">
                  <Button
                    onClick={() => setViewMode("add")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                    Add Account
                  </Button>
                  <Button
                    onClick={initiateSync}
                    disabled={isSyncingAll || accounts.length === 0}
                    className="border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {isSyncingAll ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {syncProgress
                          ? `Syncing ${syncProgress.current}/${syncProgress.total}…`
                          : "Syncing…"}
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" aria-hidden="true" />
                        Sync Transactions
                      </>
                    )}
                  </Button>
                </div>

                {syncProgress && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          Syncing transactions: {syncProgress.account}
                        </p>
                        <p className="text-xs text-blue-700 mt-1">
                          Progress: {syncProgress.current} of{" "}
                          {syncProgress.total} accounts
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-blue-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {accounts.length === 0 ? (
                  <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">
                      No accounts yet
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Get started by creating your first account
                    </p>
                    <Button
                      onClick={() => setViewMode("add")}
                      className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
                    >
                      Add Account
                    </Button>
                  </div>
                ) : (
                  <AccountsList
                    accounts={accounts}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteAccount}
                    onUpdateKycStatus={handleUpdateKycStatus}
                    onCreateTransactions={handleCreateTransactions}
                    creatingTransactionsFor={
                      creatingTransactionsFor || undefined
                    }
                  />
                )}
              </div>
            )}

            {viewMode === "add" && (
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Add New Account
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Fill in the account details below
                  </p>
                </div>
                <AccountForm
                  onSubmit={handleAddAccount}
                  onCancel={handleCancelForm}
                />
              </div>
            )}

            {viewMode === "edit" && editingAccount && (
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Edit Account
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Update the account details below
                  </p>
                </div>
                <AccountForm
                  account={editingAccount}
                  onSubmit={handleUpdateAccount}
                  onCancel={handleCancelForm}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() =>
            setDeleteConfirm({
              isOpen: false,
              accountId: null,
              accountName: "",
            })
          }
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
          >
            <h3
              id="delete-modal-title"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              Delete Account
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{deleteConfirm.accountName}"?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() =>
                  setDeleteConfirm({
                    isOpen: false,
                    accountId: null,
                    accountName: "",
                  })
                }
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sync Confirmation Modal */}
      {syncConfirm && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSyncConfirm(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sync-modal-title"
          >
            <h3
              id="sync-modal-title"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              Sync Transactions
            </h3>
            <p className="text-gray-600 mb-6">
              This will sync transactions for all {accounts.length} account
              {accounts.length !== 1 ? "s" : ""}. Accounts without transaction
              documents will have them created automatically.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                onClick={() => setSyncConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={() => void handleSyncAllTransactions()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Sync All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
