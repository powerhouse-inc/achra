import { useState, useEffect, useCallback } from "react";
import { Button, TextInput } from "@powerhousedao/document-engineering";
import {
  Plus,
  Trash2,
  Pencil,
  Check,
  X,
  Copy,
  CheckCheck,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// Ethereum address regex - matches 0x followed by 40 hex characters
const ETH_ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
import type {
  Wallet,
  LineItemGroup,
  LineItem,
} from "../../../document-models/expense-report/v1/gen/types.js";
import { actions } from "document-models/expense-report";
import { generateId } from "document-model/core";
import { useWalletSync } from "../hooks/useWalletSync.js";
import { useSyncWallet } from "../hooks/useSyncWallet.js";
import {
  addDocument,
  dispatchActions,
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  setSelectedNode,
  useDocumentById,
} from "@powerhousedao/reactor-browser";
import { actions as accountsActions } from "document-models/accounts";
import {
  actions as accountTransactionsActions,
  addTransaction,
} from "document-models/account-transactions";
import type { AccountEntry } from "../../../document-models/accounts/v1/gen/schema/types.js";
import { alchemyIntegration } from "../../account-transactions-editor/alchemyIntegration.js";
import { isSwapAddress } from "../../snapshot-report-editor/utils/flowTypeCalculations.js";

interface WalletsTableProps {
  wallets: Wallet[];
  groups: LineItemGroup[];
  onAddBillingStatement: (walletAddress: string) => void;
  periodStart: string;
  periodEnd: string;
  dispatch: any;
}

export function WalletsTable({
  wallets,
  groups,
  onAddBillingStatement,
  periodStart,
  periodEnd,
  dispatch,
}: WalletsTableProps) {
  const documents = useDocumentsInSelectedDrive();
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [walletError, setWalletError] = useState("");
  const [editingWallet, setEditingWallet] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [copiedWallet, setCopiedWallet] = useState<string | null>(null);
  const [syncingWallet, setSyncingWallet] = useState<string | null>(null);
  const [addingWallet, setAddingWallet] = useState(false);

  // Manual wallet entry state
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualWalletAddress, setManualWalletAddress] = useState("");
  const [manualWalletName, setManualWalletName] = useState("");
  const [manualWalletError, setManualWalletError] = useState("");
  const [addingManualWallet, setAddingManualWallet] = useState(false);

  // State for handling newly created transaction documents
  const [pendingTxDoc, setPendingTxDoc] = useState<{
    documentId: string;
    accountEntry: AccountEntry;
    accountsDocId: string;
    walletAddress: string;
  } | null>(null);

  // Track if we're currently processing to prevent duplicate runs
  const [isProcessing, setIsProcessing] = useState(false);

  // Progress state for Add Txns operation
  const [txProgress, setTxProgress] = useState<{
    show: boolean;
    step: string;
    current: number;
    total: number;
    details: string;
  }>({
    show: false,
    step: "",
    current: 0,
    total: 5,
    details: "",
  });

  // Get drive and documents for account/transactions document management
  const [selectedDrive] = useSelectedDrive();
  const allDocuments = useDocumentsInSelectedDrive();

  // Load the pending transaction document if one exists
  const [pendingDocument, pendingDocDispatch] = useDocumentById(
    pendingTxDoc?.documentId || null,
  );

  // Get available Account documents from the drive
  const availableAccounts =
    allDocuments?.filter(
      (doc: any) => doc.header.documentType === "powerhouse/accounts",
    ) || [];

  // Extract all account entries from all Accounts documents
  const accountEntries = availableAccounts.flatMap((doc: any) => {
    const accounts = doc.state?.global?.accounts || [];
    return accounts.map((acc: any) => ({
      ...acc,
      accountsDocumentId: doc.header.id, // Store which Accounts document this came from
    }));
  });

  // Check sync status
  const { needsSync, outdatedWallets, tagChangedWallets } =
    useWalletSync(wallets);
  const { syncWallet } = useSyncWallet();

  // Handle fetching and adding transactions when a new document is created
  useEffect(() => {
    // Check if we have pending work and all required resources
    if (
      !pendingTxDoc ||
      !pendingDocument ||
      !pendingDocDispatch ||
      isProcessing
    ) {
      return;
    }

    // Check if transactions have already been added to prevent duplicates
    const existingTransactions =
      (pendingDocument?.state as any)?.global?.transactions || [];
    if (existingTransactions.length > 0) {
      console.log(
        "[WalletsTable] Transactions already exist in document, skipping duplicate processing",
        existingTransactions.length,
      );
      // Clear pending state since transactions are already there
      setPendingTxDoc(null);
      setIsProcessing(false);
      return;
    }

    // Mark as processing and save current pending doc
    setIsProcessing(true);
    const currentPendingDoc = pendingTxDoc;

    const fetchAndAddTransactions = async () => {
      console.log(
        "[WalletsTable] Processing pending transaction document:",
        currentPendingDoc.documentId,
      );

      try {
        // Step 1: Set account info in the transaction document
        setTxProgress({
          show: true,
          step: "Initializing",
          current: 1,
          total: 5,
          details: "Setting up transaction document...",
        });

        // Add small delay to ensure document is fully initialized
        await new Promise((resolve) => setTimeout(resolve, 300));

        console.log("[WalletsTable] Document state before setAccount:", {
          documentId: pendingDocument?.header?.id,
          hasState: !!pendingDocument?.state,
          hasGlobal: !!(pendingDocument?.state as any)?.global,
        });

        const setAccountAction = accountTransactionsActions.setAccount({
          id: currentPendingDoc.accountEntry.id,
          account: currentPendingDoc.accountEntry.account,
          name: currentPendingDoc.accountEntry.name,
        });

        console.log(
          "[WalletsTable] Dispatching setAccount action:",
          setAccountAction,
        );

        pendingDocDispatch(setAccountAction);

        // Wait a bit for the action to be processed
        await new Promise((resolve) => setTimeout(resolve, 200));

        console.log(
          "[WalletsTable] Account info set - checking document state:",
          {
            account: (pendingDocument?.state as any)?.global?.account,
          },
        );

        // Step 2: Fetch transactions from Alchemy
        setTxProgress({
          show: true,
          step: "Fetching Transactions",
          current: 2,
          total: 5,
          details: "Retrieving blockchain transactions from Alchemy...",
        });

        console.log(
          "[WalletsTable] Fetching transactions from Alchemy for:",
          currentPendingDoc.accountEntry.account,
        );

        const result = await alchemyIntegration.getTransactionsFromAlchemy(
          currentPendingDoc.accountEntry.account,
        );

        console.log(
          "[WalletsTable] Alchemy result:",
          result.success,
          "transactions count:",
          result.transactions?.length || 0,
        );

        if (result.success && result.transactions.length > 0) {
          // Step 3: Add each transaction using the document's dispatch function
          // Deduplication is handled by the reducer based on uniqueId
          setTxProgress({
            show: true,
            step: "Adding Transactions",
            current: 3,
            total: 5,
            details: `Processing ${result.transactions.length} transactions...`,
          });

          let addedCount = 0;
          let skippedCount = 0;

          for (const txData of result.transactions) {
            // Validate required fields
            if (!txData.direction || !txData.from || !txData.to) {
              console.error(
                "[WalletsTable] Skipping invalid transaction:",
                txData,
              );
              skippedCount++;
              continue;
            }

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

            // Dispatch transaction directly to the document
            const txAction = addTransaction({
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
                (txData.direction as "INFLOW" | "OUTFLOW") || "OUTFLOW",
              budget: null,
            });

            if (addedCount === 0) {
              console.log("[WalletsTable] First transaction action:", txAction);
            }

            // Dispatch transaction - reducer will prevent duplicates based on uniqueId
            // If uniqueId already exists, the reducer will throw an error which is stored in the operation
            pendingDocDispatch(txAction);
            addedCount++;

            // Update progress every 10 transactions
            if (addedCount % 10 === 0) {
              setTxProgress({
                show: true,
                step: "Adding Transactions",
                current: 3,
                total: 5,
                details: `Added ${addedCount} of ${result.transactions.length} transactions...`,
              });
              console.log(
                `[WalletsTable] Added ${addedCount}/${result.transactions.length} transactions (${skippedCount} skipped)`,
              );
            }
          }

          console.log(
            `[WalletsTable] Successfully added ${addedCount} transactions (${skippedCount} skipped as duplicates or invalid)`,
          );

          // Verify operations were added
          console.log("[WalletsTable] Final transaction count in document:", {
            transactionsCount:
              (pendingDocument?.state as any)?.global?.transactions?.length ||
              0,
            operationsCount:
              (pendingDocument?.operations as any)?.global?.length || 0,
          });
        } else {
          console.log("[WalletsTable] No transactions to add");
        }

        // Step 4: Update the Accounts document with the transaction document ID
        setTxProgress({
          show: true,
          step: "Linking Documents",
          current: 4,
          total: 5,
          details: "Updating account references...",
        });

        console.log("[WalletsTable] Updating account in Accounts document:", {
          accountId: currentPendingDoc.accountEntry.id,
          accountsDocId: currentPendingDoc.accountsDocId,
          transactionsDocId: currentPendingDoc.documentId,
        });

        await dispatchActions(
          [
            accountsActions.updateAccount({
              id: currentPendingDoc.accountEntry.id,
              accountTransactionsId: currentPendingDoc.documentId,
            }),
          ],
          currentPendingDoc.accountsDocId,
        );

        console.log(
          "[WalletsTable] Successfully updated account with transactions ID",
        );

        // Step 5: Link the transaction document to the wallet in ExpenseReport
        setTxProgress({
          show: true,
          step: "Finalizing",
          current: 5,
          total: 5,
          details: "Linking to expense report...",
        });

        dispatch(
          actions.updateWallet({
            address: currentPendingDoc.walletAddress,
            accountTransactionsDocumentId: currentPendingDoc.documentId,
          }),
        );

        console.log("[WalletsTable] Successfully linked to wallet");

        // Success! Close modal after a brief delay
        setTimeout(() => {
          setTxProgress({
            show: false,
            step: "",
            current: 0,
            total: 5,
            details: "",
          });
        }, 1500);
      } catch (error) {
        console.error(
          "[WalletsTable] Error processing pending transaction document:",
          error,
        );
        setTxProgress({
          show: false,
          step: "",
          current: 0,
          total: 5,
          details: "",
        });
        alert(
          `Failed to fetch transactions: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      } finally {
        // Always clear processing state and pending doc
        setPendingTxDoc(null);
        setIsProcessing(false);
      }
    };

    fetchAndAddTransactions();
    // Only depend on pendingTxDoc and isProcessing - not on pendingDocument or pendingDocDispatch
    // to prevent re-running when transactions are added
  }, [pendingTxDoc?.documentId, isProcessing]);

  // Validate Ethereum address
  const validateEthAddress = useCallback((address: string): boolean => {
    return ETH_ADDRESS_REGEX.test(address);
  }, []);

  // Handle manual wallet addition
  const handleAddManualWallet = () => {
    const trimmedAddress = manualWalletAddress.trim();
    const trimmedName = manualWalletName.trim();

    // Validate address
    if (!trimmedAddress) {
      setManualWalletError("Please enter a wallet address");
      return;
    }

    if (!validateEthAddress(trimmedAddress)) {
      setManualWalletError(
        "Invalid Ethereum address. Must be 0x followed by 40 hex characters.",
      );
      return;
    }

    // Check if wallet already exists
    const walletExists = wallets.some(
      (w) => w.wallet?.toLowerCase() === trimmedAddress.toLowerCase(),
    );

    if (walletExists) {
      setManualWalletError("This wallet is already added to the report");
      return;
    }

    setAddingManualWallet(true);
    setManualWalletError("");

    try {
      // Add the wallet to the expense report
      dispatch(
        actions.addWallet({
          wallet: trimmedAddress,
          name: trimmedName || undefined,
        }),
      );

      // Clear inputs and collapse manual entry
      setManualWalletAddress("");
      setManualWalletName("");
      setShowManualEntry(false);
    } catch (error) {
      console.error("Error adding manual wallet:", error);
      setManualWalletError("Failed to add wallet. Please try again.");
    } finally {
      setAddingManualWallet(false);
    }
  };

  const handleAddTransactions = async (wallet: Wallet) => {
    if (!wallet.wallet) {
      return;
    }

    // Check if transactions document already exists
    if (wallet.accountTransactionsDocumentId) {
      return;
    }

    if (!selectedDrive?.header?.id) {
      alert("No drive selected");
      return;
    }

    try {
      // Show initial progress
      setTxProgress({
        show: true,
        step: "Preparing",
        current: 0,
        total: 5,
        details: "Checking for existing documents...",
      });

      // Find or create AccountTransactions document for this wallet
      const existingTxDoc = allDocuments?.find(
        (doc: any) =>
          doc.header.documentType === "powerhouse/account-transactions" &&
          doc.state?.global?.account?.account === wallet.wallet,
      );

      if (existingTxDoc) {
        // Link existing document
        dispatch(
          actions.updateWallet({
            address: wallet.wallet,
            accountTransactionsDocumentId: existingTxDoc.header.id,
          }),
        );
        setTxProgress({
          show: false,
          step: "",
          current: 0,
          total: 5,
          details: "",
        });
        return;
      }

      // Step 1: Find or create an Accounts document
      setTxProgress({
        show: true,
        step: "Preparing",
        current: 0,
        total: 5,
        details: "Setting up accounts...",
      });

      const accountsDoc = allDocuments?.find(
        (doc: any) => doc.header.documentType === "powerhouse/accounts",
      ) as any;

      let accountsDocId: string;
      let existingAccounts: any[] = [];

      if (!accountsDoc) {
        console.log("[WalletsTable] Creating new Accounts document");
        const accountsNode = await addDocument(
          selectedDrive.header.id,
          "Accounts",
          "powerhouse/accounts",
          undefined,
          undefined,
          undefined,
          "powerhouse-accounts-editor",
        );

        if (!accountsNode?.id) {
          throw new Error("Failed to create Accounts document");
        }

        accountsDocId = accountsNode.id;
      } else {
        accountsDocId = accountsDoc.header.id;
        existingAccounts = accountsDoc.state?.global?.accounts || [];
      }

      // Step 2: Find or create an AccountEntry for this wallet
      let accountEntry: AccountEntry | undefined = existingAccounts.find(
        (acc: any) => acc.account === wallet.wallet,
      );

      if (!accountEntry) {
        console.log(
          "[WalletsTable] Creating new account entry for wallet:",
          wallet.wallet,
        );

        const newAccountId = generateId();
        const newAccountName = wallet.name || wallet.wallet.substring(0, 10);

        // Add the account to the Accounts document
        console.log(
          "[WalletsTable] Adding new account to Accounts document:",
          newAccountId,
        );
        await dispatchActions(
          [
            accountsActions.addAccount({
              id: newAccountId,
              account: wallet.wallet,
              name: newAccountName,
              type: "External",
            }),
          ],
          accountsDocId,
        );

        console.log("[WalletsTable] Account added successfully");

        // Create accountEntry reference
        accountEntry = {
          id: newAccountId,
          account: wallet.wallet,
          name: newAccountName,
          type: "External",
          accountTransactionsId: null,
          KycAmlStatus: null,
          budgetPath: null,
          chain: null,
          owners: null,
        };

        // Give a small delay to ensure the account is persisted
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Step 3: Create the AccountTransactions document
      setTxProgress({
        show: true,
        step: "Preparing",
        current: 0,
        total: 5,
        details: "Creating transaction document...",
      });

      console.log("[WalletsTable] Creating AccountTransactions document");
      const documentName = `${accountEntry.name} Transactions`;

      const createdNode = await addDocument(
        selectedDrive.header.id,
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
        "[WalletsTable] AccountTransactions document created:",
        createdNode.id,
      );

      // Step 4: Set up pending state to let useEffect handle the rest
      setPendingTxDoc({
        documentId: createdNode.id,
        accountEntry,
        accountsDocId,
        walletAddress: wallet.wallet,
      });
    } catch (error) {
      console.error("[WalletsTable] Error adding transactions:", error);
      setTxProgress({
        show: false,
        step: "",
        current: 0,
        total: 5,
        details: "",
      });
      alert(
        `Failed to add transactions document: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    }
  };

  const handleStartEditName = (wallet: Wallet) => {
    setEditingWallet(wallet.wallet || null);
    setEditingName(wallet.name || "");
  };

  const handleSaveEditName = (walletAddress: string) => {
    const wallet = wallets.find((w) => w.wallet === walletAddress);
    const trimmedName = editingName.trim();

    // Only update if the name has changed
    if (trimmedName && wallet && trimmedName !== (wallet.name || "")) {
      dispatch(
        actions.updateWallet({
          address: walletAddress,
          name: trimmedName,
        }),
      );
    }
    setEditingWallet(null);
    setEditingName("");
  };

  const handleCancelEditName = () => {
    setEditingWallet(null);
    setEditingName("");
  };

  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedWallet(address);
    setTimeout(() => setCopiedWallet(null), 2000);
  };

  const formatAddress = (address: string) => {
    if (!address || address.length < 11) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 5)}`;
  };

  const handleSyncWallet = async (wallet: Wallet) => {
    if (!wallet.wallet) {
      return;
    }

    // Validate period dates before syncing
    if (!periodStart || !periodEnd) {
      alert(
        "Please set the period start and end dates before syncing wallet transactions.",
      );
      return;
    }

    setSyncingWallet(wallet.wallet);

    try {
      // Get existing line items (don't remove them, we'll update instead)
      const existingLineItems = (wallet.lineItems || []).filter(
        (item): item is LineItem => item !== null && item !== undefined,
      );

      // Get billing statement IDs
      const billingStatementIds = (wallet.billingStatements || []).filter(
        (id): id is string => id !== null && id !== undefined,
      );

      // Sync wallet with all new parameters
      syncWallet(
        wallet.wallet,
        existingLineItems,
        billingStatementIds,
        groups,
        wallets,
        wallet.accountTransactionsDocumentId,
        periodStart,
        periodEnd,
        dispatch,
      );

      // Small delay to show sync animation
      setTimeout(() => {
        setSyncingWallet(null);
      }, 500);
    } catch (error) {
      console.error("Error syncing wallet:", error);
      alert(error instanceof Error ? error.message : "Error syncing wallet");
      setSyncingWallet(null);
    }
  };

  const handleRemoveWallet = (walletAddress: string) => {
    dispatch(
      actions.removeWallet({
        wallet: walletAddress,
      }),
    );
  };

  // Calculate totals for a wallet
  const calculateWalletTotals = (wallet: Wallet) => {
    const lineItems = wallet.lineItems || [];
    return {
      budget: lineItems.reduce((sum, item) => sum + (item?.budget || 0), 0),
      forecast: lineItems.reduce((sum, item) => sum + (item?.forecast || 0), 0),
      actuals: lineItems.reduce((sum, item) => sum + (item?.actuals || 0), 0),
      difference: lineItems.reduce((sum, item) => {
        const budget = item?.budget || 0;
        const actuals = item?.actuals || 0;
        return sum + (actuals - budget);
      }, 0),
      payments: lineItems.reduce((sum, item) => sum + (item?.payments || 0), 0),
    };
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="space-y-4">
      {/* Wallets Table */}
      {wallets.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <div className="min-w-max">
            <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Wallet
                  </th>
                  {/* Budget Allocation column - hidden for now, may be needed in the future
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                    Budget Allocation
                  </th>
                  */}
                  {/* Forecast column - hidden for now, may be needed in the future
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Forecast
                  </th>
                  */}
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center justify-end gap-2">
                      {needsSync && (
                        <button
                          onClick={() => {
                            // Sync all outdated wallets
                            [...tagChangedWallets, ...outdatedWallets].forEach(
                              (walletAddress) => {
                                const wallet = wallets.find(
                                  (w) => w.wallet === walletAddress,
                                );
                                if (wallet) {
                                  handleSyncWallet(wallet);
                                }
                              },
                            );
                          }}
                          disabled={syncingWallet !== null}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                            tagChangedWallets.length > 0
                              ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 animate-pulse"
                              : "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 animate-pulse"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                          title={
                            tagChangedWallets.length > 0
                              ? "ALERT: Tags have changed in billing statements - sync all wallets!"
                              : "Sync all wallets with latest billing statements"
                          }
                        >
                          <RefreshCw
                            size={16}
                            className={
                              syncingWallet !== null ? "animate-spin" : ""
                            }
                          />
                        </button>
                      )}
                      <span>Actuals</span>
                    </div>
                  </th>
                  {/* Difference column - hidden for now, may be needed in the future
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Difference
                  </th>
                  */}
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Payments
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {wallets.map((wallet) => {
                  const totals = calculateWalletTotals(wallet);

                  return (
                    <tr
                      key={wallet.wallet}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        {editingWallet === wallet.wallet ? (
                          <div className="flex items-center gap-2">
                            <TextInput
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              placeholder="Enter wallet name"
                              className="flex-1"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleSaveEditName(wallet.wallet || "");
                                } else if (e.key === "Escape") {
                                  handleCancelEditName();
                                }
                              }}
                              autoFocus
                            />
                            <button
                              onClick={() =>
                                handleSaveEditName(wallet.wallet || "")
                              }
                              className="inline-flex items-center justify-center w-7 h-7 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md transition-colors"
                              title="Save"
                            >
                              <Check size={14} />
                            </button>
                            <button
                              onClick={handleCancelEditName}
                              className="inline-flex items-center justify-center w-7 h-7 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900/20 rounded-md transition-colors"
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {wallet.name || "Unnamed Wallet"}
                            </span>
                            <button
                              onClick={() => handleStartEditName(wallet)}
                              className="inline-flex items-center justify-center w-6 h-6 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                              title="Edit name"
                            >
                              <Pencil size={12} />
                            </button>
                            <button
                              onClick={() =>
                                handleCopyAddress(wallet.wallet || "")
                              }
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-500 dark:text-gray-400 font-mono hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                              title={`Copy address: ${wallet.wallet}`}
                            >
                              {formatAddress(wallet.wallet || "")}
                              {copiedWallet === wallet.wallet ? (
                                <CheckCheck
                                  size={12}
                                  className="text-green-500"
                                />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                      {/* Budget Allocation column - hidden for now, may be needed in the future
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                        {formatCurrency(totals.budget)}
                      </td>
                      */}
                      {/* Forecast column - hidden for now, may be needed in the future
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                        {formatCurrency(totals.forecast)}
                      </td>
                      */}
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm">
                        {totals.actuals === 0 &&
                        (!wallet.billingStatements ||
                          wallet.billingStatements.length === 0) ? (
                          // When actuals is 0 and no billing statements, only show the Add Bills button
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() =>
                                onAddBillingStatement(wallet.wallet || "")
                              }
                              className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                              title="Add billing statement for this wallet"
                            >
                              <Plus size={16} />
                              <span>Add Bills</span>
                            </button>
                          </div>
                        ) : (
                          // When actuals is not 0 or has billing statements, show compact buttons + value horizontally
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                onAddBillingStatement(wallet.wallet || "")
                              }
                              className="inline-flex items-center justify-center w-8 h-8 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                              title="Add billing statement for this wallet"
                            >
                              <Plus size={16} />
                            </button>
                            {((wallet.billingStatements &&
                              wallet.billingStatements.length > 0) ||
                              wallet.accountTransactionsDocumentId) && (
                              <button
                                onClick={() => handleSyncWallet(wallet)}
                                disabled={syncingWallet === wallet.wallet}
                                className={`inline-flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                                  tagChangedWallets.includes(
                                    wallet.wallet || "",
                                  )
                                    ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 animate-pulse"
                                    : outdatedWallets.includes(
                                          wallet.wallet || "",
                                        )
                                      ? "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 animate-pulse"
                                      : "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                                title={
                                  tagChangedWallets.includes(
                                    wallet.wallet || "",
                                  )
                                    ? "ALERT: Tags have changed - sync required!"
                                    : outdatedWallets.includes(
                                          wallet.wallet || "",
                                        )
                                      ? "Sync needed - billing statements updated"
                                      : wallet.accountTransactionsDocumentId
                                        ? "Sync wallet with billing statements and transactions"
                                        : "Sync with latest billing statements"
                                }
                              >
                                <RefreshCw
                                  size={16}
                                  className={
                                    syncingWallet === wallet.wallet
                                      ? "animate-spin"
                                      : ""
                                  }
                                />
                              </button>
                            )}
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatCurrency(totals.actuals)}
                            </span>
                          </div>
                        )}
                      </td>
                      {/* Difference column - hidden for now, may be needed in the future
                      <td
                        className={`px-3 py-3 whitespace-nowrap text-right text-sm font-medium ${
                          totals.difference > 0
                            ? "text-red-600 dark:text-red-400"
                            : totals.difference < 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {formatCurrency(totals.difference)}
                      </td>
                      */}
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm">
                        {wallet.accountTransactionsDocumentId ? (
                          // Show clickable document snippet card when transactions document is linked
                          <button
                            onClick={() =>
                              setSelectedNode(
                                wallet.accountTransactionsDocumentId!,
                              )
                            }
                            className="bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 border border-green-200 dark:border-green-800 rounded px-2 py-1 transition-colors text-left"
                          >
                            <div className="flex items-center gap-1.5">
                              <svg
                                className="w-3 h-3 text-green-600 dark:text-green-400 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              <div className="min-w-0">
                                <span className="text-[10px] font-medium text-green-900 dark:text-green-100 block leading-tight">
                                  Transactions
                                </span>
                                <span className="text-xs text-green-600 dark:text-green-400">
                                  {formatCurrency(totals.payments)}
                                </span>
                              </div>
                            </div>
                          </button>
                        ) : (
                          // Show Add Txns button when no transactions document is linked
                          <div className="flex items-center justify-end">
                            <button
                              onClick={() => handleAddTransactions(wallet)}
                              className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-md transition-colors"
                              title="Add transactions document for this wallet"
                            >
                              <Plus size={16} />
                              <span>Add Txns</span>
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-right text-sm">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              handleRemoveWallet(wallet.wallet || "")
                            }
                            className="inline-flex items-center justify-center w-8 h-8 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                            title="Remove wallet"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            No wallets added yet. Add a wallet to get started.
          </p>
        </div>
      )}

      {/* Add Wallet Section */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Horizontal layout: Select Account (left) and Manual Entry (right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Select from existing accounts - left side */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Account
            </label>
            <select
              value={selectedAccountId}
              onChange={(e) => {
                const accountId = e.target.value;
                setSelectedAccountId(accountId);
                setWalletError("");

                // Auto-add wallet when an account is selected
                if (accountId) {
                  const selectedAccount = accountEntries.find(
                    (acc: any) => acc.id === accountId,
                  );

                  if (selectedAccount) {
                    // Check if wallet already exists
                    const walletExists = wallets.some(
                      (w) => w.wallet === selectedAccount.account,
                    );

                    if (walletExists) {
                      setWalletError(
                        "This account is already added to the report",
                      );
                      setSelectedAccountId("");
                      return;
                    }

                    // Add the wallet
                    try {
                      dispatch(
                        actions.addWallet({
                          wallet: selectedAccount.account,
                          name: selectedAccount.name || undefined,
                        }),
                      );
                      dispatch(
                        actions.updateWallet({
                          address: selectedAccount.account,
                          accountDocumentId:
                            selectedAccount.accountsDocumentId || undefined,
                          accountTransactionsDocumentId:
                            selectedAccount.accountTransactionsId || undefined,
                        }),
                      );
                      // Reset selection after adding
                      setSelectedAccountId("");
                    } catch (error) {
                      console.error("Error adding wallet:", error);
                      setWalletError("Failed to add wallet. Please try again.");
                      setSelectedAccountId("");
                    }
                  }
                }
              }}
              className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                walletError
                  ? "border-red-300 dark:border-red-600"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <option value="">-- Select an account to add --</option>
              {accountEntries.map((acc: any) => (
                <option key={acc.id} value={acc.id}>
                  {acc.name} ({acc.account?.substring(0, 10)}...
                  {acc.account?.substring(acc.account.length - 4)})
                </option>
              ))}
            </select>
            {walletError && (
              <div className="mt-2 px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {walletError}
                </p>
              </div>
            )}
          </div>

          {/* Manual wallet entry toggle - right side */}
          <div>
            <button
              type="button"
              onClick={() => {
                setShowManualEntry(!showManualEntry);
                setManualWalletError("");
              }}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
            >
              {showManualEntry ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
              <span>Add wallet manually</span>
            </button>

            {/* Manual entry form - collapsible */}
            {showManualEntry && (
              <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3 animate-in slide-in-from-top-2 duration-200">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Wallet Address
                      <span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      value={manualWalletAddress}
                      onChange={(e) => {
                        setManualWalletAddress(e.target.value);
                        setManualWalletError("");
                      }}
                      placeholder="0x..."
                      className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        manualWalletError
                          ? "border-red-300 dark:border-red-600"
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Enter a valid Ethereum address (0x + 40 hex characters)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Wallet Name
                      <span className="text-gray-400 dark:text-gray-500 ml-1 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={manualWalletName}
                      onChange={(e) => setManualWalletName(e.target.value)}
                      placeholder="e.g., Operations Wallet"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleAddManualWallet();
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Error message */}
                {manualWalletError && (
                  <div className="px-3 py-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {manualWalletError}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-1">
                  <Button
                    onClick={handleAddManualWallet}
                    disabled={!manualWalletAddress.trim() || addingManualWallet}
                  >
                    {addingManualWallet ? "Adding..." : "Add Wallet"}
                  </Button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowManualEntry(false);
                      setManualWalletAddress("");
                      setManualWalletName("");
                      setManualWalletError("");
                    }}
                    className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Progress Notification - Bottom Right */}
      {txProgress.show && (
        <div className="fixed bottom-4 right-4 z-50 transition-all duration-300 ease-out">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-80">
            <div className="space-y-3">
              {/* Header with Spinner */}
              <div className="flex items-center gap-3">
                <RefreshCw
                  size={20}
                  className="animate-spin text-blue-600 dark:text-blue-500 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {txProgress.step}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Step {txProgress.current} of {txProgress.total}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-blue-600 dark:bg-blue-500 h-1.5 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${(txProgress.current / txProgress.total) * 100}%`,
                  }}
                />
              </div>

              {/* Details */}
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {txProgress.details}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
