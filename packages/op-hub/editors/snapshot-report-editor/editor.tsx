import { generateId, setName } from "document-model";
import { useState, useMemo, useEffect, useCallback } from "react";
import {
  useDocumentsInSelectedDrive,
  useParentFolderForSelectedNode,
  setSelectedNode,
  dispatchActions,
  usePHToast,
} from "@powerhousedao/reactor-browser";
import { DocumentToolbar } from "@powerhousedao/design-system/connect";
import { Button, Select } from "@powerhousedao/document-engineering";
import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { DateRangePicker } from "./components/DateRangePicker.js";
import { useSelectedSnapshotReportDocument } from "../hooks/useSnapshotReportDocument.js";
import {
  setReportConfig,
  addSnapshotAccount,
  addTransaction,
  setPeriodStart,
  setPeriodEnd,
} from "../../document-models/snapshot-report/v1/gen/creators.js";
import { SetOwner } from "./components/SetOwner.js";
import { useSyncSnapshotAccount } from "./hooks/useSyncSnapshotAccount.js";
import { formatBalance } from "./utils/balanceCalculations.js";
import { calculateTransactionFlowInfo } from "./utils/flowTypeCalculations.js";
import { actions as accountsActions } from "document-models/accounts";

// Helper function to generate month options from January 2025 to current month
function generateMonthOptions() {
  const options: Array<{ label: string; value: string }> = [];
  const startDate = new Date(2025, 0, 1); // January 2025
  const currentDate = new Date();

  const date = new Date(startDate);

  while (date <= currentDate) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = date.toLocaleDateString("en-US", { month: "long" });
    const label = `${monthName} ${year}`;

    // Value format: YYYY-MM (e.g., "2025-01")
    const value = `${year}-${String(month + 1).padStart(2, "0")}`;

    options.push({ label, value });

    // Move to next month
    date.setMonth(date.getMonth() + 1);
  }

  // Reverse to show most recent first
  return options.reverse();
}

// Helper function to get start and end dates for a given month
function getMonthDateRange(yearMonth: string) {
  const [year, month] = yearMonth.split("-").map(Number);

  // First day of month at 00:00:00 UTC
  const periodStart = new Date(
    Date.UTC(year, month - 1, 1, 0, 0, 0, 0),
  ).toISOString();

  // Last day of month at 23:59:59.999 UTC
  // Get the last day by using day 0 of the next month
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const periodEnd = new Date(
    Date.UTC(year, month - 1, lastDay, 23, 59, 59, 999),
  ).toISOString();

  return { periodStart, periodEnd };
}

export default function Editor() {
  const [document, dispatch] = useSelectedSnapshotReportDocument();
  const documentsInDrive = useDocumentsInSelectedDrive();
  const toast = usePHToast();
  const [isAccountPickerOpen, setIsAccountPickerOpen] = useState(false);
  const [selectedAccountIds, setSelectedAccountIds] = useState<Set<string>>(
    new Set(),
  );
  const [expandedAccounts, setExpandedAccounts] = useState<Set<string>>(
    new Set(),
  );
  const [syncingAccounts, setSyncingAccounts] = useState<Set<string>>(
    new Set(),
  );
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const { syncAccount } = useSyncSnapshotAccount();

  if (!document) {
    return <div>Loading...</div>;
  }

  const {
    reportName,
    startDate,
    endDate,
    snapshotAccounts,
    accountsDocumentId,
    ownerIds,
    reportPeriodStart,
  } = document.state.global;

  // Filter for Accounts documents
  const accountsDocuments = documentsInDrive
    ? documentsInDrive.filter(
        (doc) => doc.header.documentType === "powerhouse/accounts",
      )
    : [];

  // Find selected accounts document
  const selectedAccountsDoc = accountsDocuments.find(
    (doc) => doc.header.id === accountsDocumentId,
  );

  // Get available accounts from the selected Accounts document
  const availableAccounts = selectedAccountsDoc
    ? ((selectedAccountsDoc.state as any).global?.accounts as any[]) || []
    : [];

  // Get IDs of accounts already in the snapshot
  const existingAccountIds = new Set(
    snapshotAccounts.map((acc) => acc.accountId),
  );

  // Create a map of accountId to accountEntry for quick lookup
  const accountEntryMap = new Map(
    availableAccounts.map((acc: any) => [acc.id, acc]),
  );

  // Local state for the selected period (before confirmation)
  const [selectedPeriod, setSelectedPeriod] = useState<string>(() => {
    if (reportPeriodStart) {
      // Use UTC methods to avoid timezone issues
      const date = new Date(reportPeriodStart);
      return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    }
    // Default to current month
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  // Track if the selected period differs from the saved period
  const savedPeriod = useMemo(() => {
    if (reportPeriodStart) {
      // Use UTC methods to avoid timezone issues
      const date = new Date(reportPeriodStart);
      return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    }
    return "";
  }, [reportPeriodStart]);

  // Track if we're in editing mode
  const [isEditingPeriod, setIsEditingPeriod] = useState(!savedPeriod);

  const isPeriodChanged = selectedPeriod !== savedPeriod;

  // Compute suggested start date from previous month's snapshot endDate
  const suggestedStartDate = useMemo(() => {
    if (!documentsInDrive || !reportPeriodStart) return null;

    const currentPeriodStart = new Date(reportPeriodStart);
    if (isNaN(currentPeriodStart.getTime())) return null;

    // Find all other snapshot reports in the drive
    const otherSnapshots = documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/snapshot-report" &&
        doc.header.id !== document.header.id,
    );

    // Find the snapshot whose reportPeriodStart is closest before this one
    let previousSnapshot: {
      endDate: string | null;
      reportPeriodStart: string;
    } | null = null;
    let closestDistance = Infinity;

    for (const snap of otherSnapshots) {
      const state = snap.state as {
        global?: {
          reportPeriodStart?: string | null;
          endDate?: string | null;
        };
      };
      const rps = state?.global?.reportPeriodStart;
      if (!rps) continue;

      const rpDate = new Date(rps);
      if (isNaN(rpDate.getTime())) continue;

      // Must be before current period
      const diff = currentPeriodStart.getTime() - rpDate.getTime();
      if (diff > 0 && diff < closestDistance) {
        closestDistance = diff;
        previousSnapshot = {
          endDate: state?.global?.endDate || null,
          reportPeriodStart: rps,
        };
      }
    }

    if (!previousSnapshot?.endDate) return null;

    const prevEnd = new Date(previousSnapshot.endDate);
    if (isNaN(prevEnd.getTime())) return null;

    // Suggested start = previous endDate + 1 day
    const suggested = new Date(prevEnd);
    suggested.setUTCDate(suggested.getUTCDate() + 1);
    suggested.setUTCHours(0, 0, 0, 0);
    return suggested;
  }, [documentsInDrive, reportPeriodStart, document.header.id]);

  // Compute suggested end date from next month's snapshot startDate
  const suggestedEndDate = useMemo(() => {
    if (!documentsInDrive || !reportPeriodStart) return null;

    const currentPeriodStart = new Date(reportPeriodStart);
    if (isNaN(currentPeriodStart.getTime())) return null;

    // Find all other snapshot reports in the drive
    const otherSnapshots = documentsInDrive.filter(
      (doc) =>
        doc.header.documentType === "powerhouse/snapshot-report" &&
        doc.header.id !== document.header.id,
    );

    // Find the snapshot whose reportPeriodStart is closest after this one
    let nextSnapshot: {
      startDate: string | null;
      reportPeriodStart: string;
    } | null = null;
    let closestDistance = Infinity;

    for (const snap of otherSnapshots) {
      const state = snap.state as {
        global?: {
          reportPeriodStart?: string | null;
          startDate?: string | null;
        };
      };
      const rps = state?.global?.reportPeriodStart;
      if (!rps) continue;

      const rpDate = new Date(rps);
      if (isNaN(rpDate.getTime())) continue;

      // Must be after current period
      const diff = rpDate.getTime() - currentPeriodStart.getTime();
      if (diff > 0 && diff < closestDistance) {
        closestDistance = diff;
        nextSnapshot = {
          startDate: state?.global?.startDate || null,
          reportPeriodStart: rps,
        };
      }
    }

    if (!nextSnapshot?.startDate) return null;

    const nextStart = new Date(nextSnapshot.startDate);
    if (isNaN(nextStart.getTime())) return null;

    // Suggested end = next startDate - 1 day (end of previous day)
    const suggested = new Date(nextStart);
    suggested.setUTCDate(suggested.getUTCDate() - 1);
    suggested.setUTCHours(23, 59, 59, 999);
    return suggested;
  }, [documentsInDrive, reportPeriodStart, document.header.id]);

  const handleSnapshotPeriodChange = useCallback(
    (newFromDate: string, newToDate: string) => {
      dispatch?.(
        setReportConfig({
          startDate: newFromDate,
          endDate: newToDate,
          reportName: reportName || undefined,
          accountsDocumentId: accountsDocumentId || undefined,
        }),
      );
    },
    [dispatch, reportName, accountsDocumentId],
  );

  const handleApplySuggestedStartDate = useCallback(() => {
    if (!suggestedStartDate) return;
    const fromISO = suggestedStartDate.toISOString();
    const toISO = endDate || "";
    handleSnapshotPeriodChange(fromISO, toISO);
  }, [suggestedStartDate, endDate, handleSnapshotPeriodChange]);

  const handleApplySuggestedEndDate = useCallback(() => {
    if (!suggestedEndDate) return;
    const fromISO = startDate || "";
    const toISO = suggestedEndDate.toISOString();
    handleSnapshotPeriodChange(fromISO, toISO);
  }, [suggestedEndDate, startDate, handleSnapshotPeriodChange]);

  // Update selected period when document period changes externally
  useEffect(() => {
    if (savedPeriod && savedPeriod !== selectedPeriod) {
      setSelectedPeriod(savedPeriod);
    }
  }, [savedPeriod]);

  // Handle period dropdown change (doesn't save yet)
  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
  };

  // Handle period confirmation (saves to document)
  const handleConfirmPeriod = () => {
    const { periodStart, periodEnd } = getMonthDateRange(selectedPeriod);

    // Get the formatted month label (e.g., "January 2025") - timezone agnostic
    const [year, month] = selectedPeriod.split("-").map(Number);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthLabel = `${monthNames[month - 1]} ${year}`;

    // Dispatch period dates
    dispatch?.(setPeriodStart({ periodStart }));
    dispatch?.(setPeriodEnd({ periodEnd }));

    // Auto-set document name based on reporting period
    dispatch?.(setName(`${monthLabel} - Snapshot Report`));

    // Exit editing mode
    setIsEditingPeriod(false);
  };

  // Handle starting to edit the period
  const handleEditPeriod = () => {
    setIsEditingPeriod(true);
  };

  // Generate month options
  const monthOptions = useMemo(() => generateMonthOptions(), []);

  // Get the formatted display label for the current period
  const periodDisplayLabel = useMemo(() => {
    const option = monthOptions.find((opt) => opt.value === selectedPeriod);
    return option ? option.label : selectedPeriod;
  }, [selectedPeriod, monthOptions]);

  // Note: startDate/endDate are used for transaction filtering (the actual date range to fetch)
  // reportPeriodStart/End are used for the reporting period label (e.g., "January 2025")

  // Handle sync for a single account
  const handleSyncAccount = async (snapshotAccount: any) => {
    if (!startDate || !endDate) {
      alert(
        "Please set the Snapshot Period (start and end dates) before syncing",
      );
      return;
    }

    setSyncingAccounts((prev) => new Set(prev).add(snapshotAccount.id));

    try {
      const accountEntry = accountEntryMap.get(snapshotAccount.accountId);
      const result = await syncAccount(
        snapshotAccount,
        accountEntry,
        accountsDocumentId || undefined,
        startDate,
        endDate,
        dispatch,
        snapshotAccounts,
        document?.header?.id,
      );

      if (result.success) {
        // If account transactions document was created, update the Accounts document
        if (result.documentId && accountEntry && accountsDocumentId) {
          await dispatchActions(
            [
              accountsActions.updateAccount({
                id: accountEntry.id,
                accountTransactionsId: result.documentId,
              }),
            ],
            accountsDocumentId,
          );
        }
      } else {
        alert(`Sync failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error syncing account:", error);
      alert(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setSyncingAccounts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(snapshotAccount.id);
        return newSet;
      });
    }
  };

  // Handle sync all accounts — Internal first (sequentially), then non-Internal
  const handleSyncAll = async () => {
    if (!startDate || !endDate) {
      alert(
        "Please set the Snapshot Period (start and end dates) before syncing",
      );
      return;
    }

    setIsSyncingAll(true);
    const accountUpdates: Array<{ id: string; accountTransactionsId: string }> =
      [];
    const totalAccounts = snapshotAccounts.length;
    let syncedCount = 0;
    let failedCount = 0;

    toast?.(`Syncing ${totalAccounts} accounts...`, {
      type: "connect-loading",
    });

    try {
      const internalAccounts = snapshotAccounts.filter(
        (a: any) => a.type === "Internal",
      );

      // Phase 1: Sync Internal accounts sequentially to avoid race conditions
      // on concurrent dispatchActions to the same document
      const accountTransactionsIdMap = new Map<string, string>();
      let latestSnapshotDoc: any;

      for (const account of internalAccounts) {
        const accountEntry = accountEntryMap.get(account.accountId);
        setSyncingAccounts((prev) => new Set(prev).add(account.id));

        try {
          const result = await syncAccount(
            account,
            accountEntry,
            accountsDocumentId || undefined,
            startDate,
            endDate,
            dispatch,
            snapshotAccounts,
            document?.header?.id,
          );

          if (result.documentId) {
            accountTransactionsIdMap.set(account.id, result.documentId);
            if (accountEntry) {
              accountUpdates.push({
                id: accountEntry.id,
                accountTransactionsId: result.documentId,
              });
            }
          }
          if (result.updatedSnapshotDoc) {
            latestSnapshotDoc = result.updatedSnapshotDoc;
          }

          if (result.success) {
            syncedCount++;
          } else {
            failedCount++;
          }
        } finally {
          setSyncingAccounts((prev) => {
            const newSet = new Set(prev);
            newSet.delete(account.id);
            return newSet;
          });
        }
      }

      // Use fresh snapshot accounts from the latest dispatch result for Phase 2
      const freshSnapshotAccounts: any[] =
        latestSnapshotDoc?.state?.global?.snapshotAccounts ?? snapshotAccounts;
      const freshNonInternalAccounts = freshSnapshotAccounts.filter(
        (a: any) => a.type !== "Internal",
      );

      // Phase 2: Sync non-Internal accounts sequentially
      // These derive transactions from Internal accounts' AccountTransactions docs
      for (const account of freshNonInternalAccounts) {
        const accountEntry = accountEntryMap.get(account.accountId);
        setSyncingAccounts((prev) => new Set(prev).add(account.id));

        try {
          const result = await syncAccount(
            account,
            accountEntry,
            accountsDocumentId || undefined,
            startDate,
            endDate,
            dispatch,
            freshSnapshotAccounts,
            document?.header?.id,
            accountTransactionsIdMap,
          );

          if (result.success) {
            syncedCount++;
          } else {
            failedCount++;
          }
        } finally {
          setSyncingAccounts((prev) => {
            const newSet = new Set(prev);
            newSet.delete(account.id);
            return newSet;
          });
        }
      }

      // Single batch update to Accounts document
      if (accountUpdates.length > 0 && accountsDocumentId) {
        await dispatchActions(
          accountUpdates.map((u) => accountsActions.updateAccount(u)),
          accountsDocumentId,
        );
      }

      if (failedCount === 0) {
        toast?.(
          `Synced ${syncedCount} account${syncedCount !== 1 ? "s" : ""} successfully`,
          { type: "success" },
        );
      } else {
        toast?.(
          `Synced ${syncedCount}/${totalAccounts} accounts. ${failedCount} failed.`,
          { type: "warning" },
        );
      }
    } catch (error) {
      toast?.(
        `Sync failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        { type: "error" },
      );
    } finally {
      setIsSyncingAll(false);
    }
  };

  const handleSetReportName = (name: string) => {
    dispatch?.(
      setReportConfig({
        reportName: name,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        accountsDocumentId: undefined,
      }),
    );
  };

  const handleToggleAccountExpansion = (accountId: string) => {
    setExpandedAccounts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(accountId)) {
        newSet.delete(accountId);
      } else {
        newSet.add(accountId);
      }
      return newSet;
    });
  };

  const handleOpenAccountPicker = () => {
    if (!accountsDocumentId) {
      alert("Please select an Accounts document first");
      return;
    }
    setIsAccountPickerOpen(true);
    setSelectedAccountIds(new Set());
  };

  const handleToggleAccount = (accountId: string) => {
    const newSelection = new Set(selectedAccountIds);
    if (newSelection.has(accountId)) {
      newSelection.delete(accountId);
    } else {
      newSelection.add(accountId);
    }
    setSelectedAccountIds(newSelection);
  };

  const handleSelectAllAccounts = () => {
    // Select all accounts that aren't already added to the snapshot
    const allAvailableAccountIds = new Set(
      availableAccounts
        .filter((account: any) => !existingAccountIds.has(account.id))
        .map((account: any) => account.id),
    );
    setSelectedAccountIds(allAvailableAccountIds);
  };

  const handleImportAccounts = async () => {
    if (!documentsInDrive || !startDate || !endDate) {
      alert(
        "Please set the report period (start and end dates) before importing accounts",
      );
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Track newly imported accounts for two-pass import
    const newlyImportedAccounts: Array<{
      snapshotAccountId: string;
      accountAddress: string;
      accountType: string;
      accountTransactionsId?: string;
    }> = [];

    // Build a combined list of existing + newly imported accounts for flow type calculation
    const allAccountsForLookup = [
      ...snapshotAccounts,
      ...Array.from(selectedAccountIds)
        .map((accountId) => {
          const account = availableAccounts.find(
            (acc: any) => acc.id === accountId,
          );
          if (account && !existingAccountIds.has(accountId) && account.type) {
            return {
              id: generateId(),
              accountId: account.id,
              accountAddress: account.account as string,
              accountName: account.name as string,
              type: account.type as string,
              accountTransactionsId: account.accountTransactionsId || null,
              startingBalances: [],
              endingBalances: [],
              transactions: [],
            };
          }
          return null;
        })
        .filter(Boolean),
    ];

    // FIRST PASS: Import all accounts
    // - Internal accounts: Import with transactions from AccountTransactions doc
    // - Non-Internal accounts: Import account only (transactions derived later)
    for (const accountId of selectedAccountIds) {
      const account = availableAccounts.find(
        (acc: any) => acc.id === accountId,
      );
      if (account && !existingAccountIds.has(accountId)) {
        if (!account.type) {
          alert(
            `Account "${account.name}" does not have a type set. Please update the account first.`,
          );
          continue;
        }

        // Add the snapshot account
        const snapshotAccountId = generateId();
        dispatch?.(
          addSnapshotAccount({
            id: snapshotAccountId,
            accountId: account.id,
            accountAddress: account.account,
            accountName: account.name,
            type: account.type,
            accountTransactionsId: account.accountTransactionsId || undefined,
          }),
        );

        // Track for second pass
        newlyImportedAccounts.push({
          snapshotAccountId,
          accountAddress: account.account,
          accountType: account.type,
          accountTransactionsId: account.accountTransactionsId,
        });

        // Only import transactions for Internal accounts
        // Non-Internal accounts will derive transactions from Internal accounts
        if (account.type === "Internal" && account.accountTransactionsId) {
          const txDoc = documentsInDrive.find(
            (doc) =>
              doc.header.id === account.accountTransactionsId &&
              doc.header.documentType === "powerhouse/account-transactions",
          ) as any;

          if (txDoc?.state?.global?.transactions) {
            const transactions = txDoc.state.global.transactions as any[];

            // Filter transactions by the report period
            const filteredTransactions = transactions.filter((tx: any) => {
              if (!tx?.datetime) return false;
              const txDate = new Date(tx.datetime);
              if (isNaN(txDate.getTime())) return false;
              return txDate >= start && txDate <= end;
            });

            // Add each transaction to the snapshot account
            for (const tx of filteredTransactions) {
              const { flowType, counterPartyAccountId } =
                calculateTransactionFlowInfo(
                  tx.direction,
                  account.type,
                  tx.counterParty,
                  allAccountsForLookup as any[],
                );

              dispatch?.(
                addTransaction({
                  accountId: snapshotAccountId,
                  id: generateId(),
                  transactionId: tx.id,
                  counterParty: tx.counterParty || undefined,
                  amount: tx.amount,
                  datetime: tx.datetime,
                  txHash: tx.details?.txHash || "",
                  token: tx.details?.token || "",
                  blockNumber: tx.details?.blockNumber || undefined,
                  direction: tx.direction,
                  flowType: flowType,
                  counterPartyAccountId: counterPartyAccountId || undefined,
                }),
              );
            }
          }
        }
      }
    }

    // SECOND PASS: Derive transactions for non-Internal accounts
    // We need to wait a moment for state to update, then derive
    // For now, user can click "Sync" on non-Internal accounts to derive
    // TODO: Implement auto-derive after import completes

    setIsAccountPickerOpen(false);
    setSelectedAccountIds(new Set());
  };

  // Get the parent folder node for the currently selected node
  const parentFolder = useParentFolderForSelectedNode();
  // Set the selected node to the parent folder node (close the editor)
  function handleClose() {
    setSelectedNode(parentFolder?.id);
  }

  return (
    <div>
      <DocumentToolbar document={document} />
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Snapshot Report</h1>

        {/* Report Configuration */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Report Configuration</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Name
                </label>
                <input
                  type="text"
                  value={reportName || ""}
                  onChange={(e) => handleSetReportName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Q4 2024 Treasury Report"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teams
                </label>
                <SetOwner ownerIds={ownerIds ?? []} dispatch={dispatch} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accounts Document
                </label>
                <select
                  value={accountsDocumentId || ""}
                  onChange={(e) =>
                    dispatch?.(
                      setReportConfig({
                        accountsDocumentId: e.target.value || undefined,
                        reportName: reportName || undefined,
                        startDate: startDate || undefined,
                        endDate: endDate || undefined,
                      }),
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an Accounts document...</option>
                  {accountsDocuments.map((doc) => (
                    <option key={doc.header.id} value={doc.header.id}>
                      {doc.header.name ||
                        `Accounts (${doc.header.id.slice(0, 8)}...)`}
                    </option>
                  ))}
                </select>
                {selectedAccountsDoc && (
                  <p className="text-xs text-gray-500 mt-1">
                    {(selectedAccountsDoc.state as any).global?.accounts
                      ?.length || 0}{" "}
                    accounts available
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reporting Period
              </label>
              {isEditingPeriod ? (
                <div className="flex items-center gap-2">
                  <Select
                    options={monthOptions}
                    value={selectedPeriod}
                    onChange={(value) => handlePeriodChange(value as string)}
                    className="min-w-[180px]"
                  />
                  {isPeriodChanged && (
                    <Button
                      variant="default"
                      onClick={handleConfirmPeriod}
                      className="text-sm"
                    >
                      Set Period
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    {periodDisplayLabel}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleEditPeriod}
                    className="text-sm"
                  >
                    Change
                  </Button>
                </div>
              )}
            </div>

            <div>
              <DateRangePicker
                label="Snapshot Period"
                fromDate={startDate || ""}
                toDate={endDate || ""}
                onChange={handleSnapshotPeriodChange}
              />
              {suggestedStartDate &&
                (!startDate ||
                  startDate.split("T")[0] !==
                    suggestedStartDate.toISOString().split("T")[0]) && (
                  <div className="mt-2 flex items-center gap-2 p-2 bg-indigo-50 border border-indigo-200 rounded-md">
                    <span className="text-xs text-indigo-700 flex-1">
                      Previous snapshot period ends{" "}
                      {new Date(
                        suggestedStartDate.getTime() - 86400000,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                      . Start from{" "}
                      <strong>
                        {suggestedStartDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                      </strong>{" "}
                      to avoid gaps.
                    </span>
                    <button
                      onClick={handleApplySuggestedStartDate}
                      className="px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 rounded transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                )}
              {suggestedEndDate &&
                endDate &&
                new Date(endDate) >= suggestedEndDate && (
                  <div className="mt-2 flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded-md">
                    <span className="text-xs text-amber-700 flex-1">
                      Next snapshot period starts{" "}
                      {new Date(
                        suggestedEndDate.getTime() + 86400000,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        timeZone: "UTC",
                      })}
                      . End by{" "}
                      <strong>
                        {suggestedEndDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          timeZone: "UTC",
                        })}
                      </strong>{" "}
                      to avoid overlap.
                    </span>
                    <button
                      onClick={handleApplySuggestedEndDate}
                      className="px-2 py-1 text-xs font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 rounded transition-colors whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Accounts Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Snapshot Accounts</h2>
            <div className="flex gap-2">
              {snapshotAccounts.length > 0 && (
                <button
                  onClick={handleSyncAll}
                  disabled={isSyncingAll || !startDate || !endDate}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isSyncingAll ? "animate-spin" : ""}`}
                  />
                  Sync All
                </button>
              )}
              <button
                onClick={handleOpenAccountPicker}
                disabled={!accountsDocumentId}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Account
              </button>
            </div>
          </div>

          {snapshotAccounts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No accounts added yet</p>
              <p className="text-sm mt-2">
                Click "Add Account" to select accounts for this snapshot
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Group accounts by type in flow order: Source → Internal → Destination → External */}
              {(
                [
                  {
                    type: "Source",
                    label: "Source",
                    borderClass: "border-emerald-300",
                    badgeClass: "bg-emerald-100 text-emerald-800",
                  },
                  {
                    type: "Internal",
                    label: "Internal",
                    borderClass: "border-blue-300",
                    badgeClass: "bg-blue-100 text-blue-800",
                  },
                  {
                    type: "Destination",
                    label: "Destination",
                    borderClass: "border-amber-300",
                    badgeClass: "bg-amber-100 text-amber-800",
                  },
                  {
                    type: "External",
                    label: "External",
                    borderClass: "border-gray-300",
                    badgeClass: "bg-gray-100 text-gray-800",
                  },
                ] as const
              ).map(({ type, label, borderClass, badgeClass }) => {
                const accountsOfType = snapshotAccounts.filter(
                  (a: any) => a.type === type,
                );
                if (accountsOfType.length === 0) return null;

                return (
                  <div key={type}>
                    <div
                      className={`flex items-center gap-2 mb-3 pb-2 border-b-2 ${borderClass}`}
                    >
                      <span
                        className={`px-2 py-0.5 text-xs font-semibold rounded ${badgeClass}`}
                      >
                        {label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {accountsOfType.length} account
                        {accountsOfType.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {accountsOfType.map((account: any) => (
                        <div
                          key={account.id}
                          className="border border-gray-200 rounded-lg overflow-hidden"
                        >
                          {/* Header - Always Visible */}
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold">
                                    {account.accountName}
                                  </h3>
                                  <button
                                    onClick={() => handleSyncAccount(account)}
                                    disabled={
                                      syncingAccounts.has(account.id) ||
                                      !startDate ||
                                      !endDate
                                    }
                                    className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Sync account transactions and balances"
                                  >
                                    <RefreshCw
                                      className={`w-4 h-4 ${
                                        syncingAccounts.has(account.id)
                                          ? "animate-spin text-blue-600"
                                          : "text-gray-600"
                                      }`}
                                    />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {account.accountAddress}
                                </p>
                                <span
                                  className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                                    account.type === "Source"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : account.type === "Internal"
                                        ? "bg-blue-100 text-blue-800"
                                        : account.type === "Destination"
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {account.type}
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-600">
                                  Transactions: {account.transactions.length}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Tokens: {account.startingBalances.length}
                                </p>
                              </div>
                            </div>

                            {/* Balances Display */}
                            {(() => {
                              // Helper to check if a balance is non-zero
                              const isNonZero = (amount: any) => {
                                const value = parseFloat(amount?.value || "0");
                                return value !== 0;
                              };

                              // Filter to non-zero balances
                              const nonZeroStarting =
                                account.startingBalances.filter((b: any) => {
                                  const endingBalance =
                                    account.endingBalances.find(
                                      (eb: any) => eb.token === b.token,
                                    );
                                  return (
                                    isNonZero(b.amount) ||
                                    (endingBalance &&
                                      isNonZero(endingBalance.amount))
                                  );
                                });

                              const endingOnlyBalances =
                                account.endingBalances.filter(
                                  (eb: any) =>
                                    !account.startingBalances.some(
                                      (sb: any) => sb.token === eb.token,
                                    ) && isNonZero(eb.amount),
                                );

                              const hasBalances =
                                nonZeroStarting.length > 0 ||
                                endingOnlyBalances.length > 0;

                              if (!hasBalances) return null;

                              return (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                    Balances
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {nonZeroStarting.map((balance: any) => {
                                      const endingBalance =
                                        account.endingBalances.find(
                                          (eb: any) =>
                                            eb.token === balance.token,
                                        );
                                      return (
                                        <div
                                          key={balance.id}
                                          className="bg-gray-50 rounded p-2 text-sm"
                                        >
                                          <div className="font-medium text-gray-700 mb-1">
                                            {balance.token}
                                          </div>
                                          <div
                                            className="text-xs text-gray-600 space-y-1"
                                            style={{
                                              fontVariantNumeric:
                                                "tabular-nums",
                                            }}
                                          >
                                            <div>
                                              Opening:{" "}
                                              <span className="font-medium">
                                                {formatBalance(balance.amount)}
                                              </span>
                                            </div>
                                            {endingBalance && (
                                              <div>
                                                Closing:{" "}
                                                <span className="font-medium">
                                                  {formatBalance(
                                                    endingBalance.amount,
                                                  )}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })}
                                    {endingOnlyBalances.map((balance: any) => (
                                      <div
                                        key={balance.id}
                                        className="bg-gray-50 rounded p-2 text-sm"
                                      >
                                        <div className="font-medium text-gray-700 mb-1">
                                          {balance.token}
                                        </div>
                                        <div
                                          className="text-xs text-gray-600 space-y-1"
                                          style={{
                                            fontVariantNumeric: "tabular-nums",
                                          }}
                                        >
                                          <div>
                                            Opening:{" "}
                                            <span className="font-medium">
                                              0.000000 {balance.token}
                                            </span>
                                          </div>
                                          <div>
                                            Closing:{" "}
                                            <span className="font-medium">
                                              {formatBalance(balance.amount)}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })()}

                            {/* Expand/Collapse Button */}
                            {account.transactions.length > 0 && (
                              <button
                                onClick={() =>
                                  handleToggleAccountExpansion(account.id)
                                }
                                className="mt-3 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                              >
                                {expandedAccounts.has(account.id) ? (
                                  <>
                                    <ChevronUp className="w-4 h-4" />
                                    <span>Hide Transactions</span>
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-4 h-4" />
                                    <span>Show Transactions</span>
                                  </>
                                )}
                              </button>
                            )}
                          </div>

                          {/* Expandable Transaction List */}
                          {expandedAccounts.has(account.id) &&
                            account.transactions.length > 0 && (
                              <div className="border-t border-gray-200 bg-gray-50">
                                <div className="p-4">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                    Transactions ({account.transactions.length})
                                  </h4>
                                  <div className="space-y-2">
                                    {[...account.transactions]
                                      .sort(
                                        (a: any, b: any) =>
                                          new Date(b.datetime).getTime() -
                                          new Date(a.datetime).getTime(),
                                      )
                                      .map((tx: any) => (
                                        <div
                                          key={tx.id}
                                          className="bg-white border border-gray-200 rounded p-3 text-sm"
                                        >
                                          <div className="grid grid-cols-2 gap-2">
                                            {/* Transaction Details Grid */}
                                            <div>
                                              <span className="text-gray-500">
                                                Direction:
                                              </span>
                                              <span
                                                className={`ml-2 font-medium ${
                                                  tx.direction === "INFLOW"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                }`}
                                              >
                                                {tx.direction}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">
                                                Amount:
                                              </span>
                                              <span className="ml-2 font-medium">
                                                {typeof tx.amount ===
                                                  "object" &&
                                                tx.amount?.value !== undefined
                                                  ? `${tx.amount.value} ${tx.amount.unit || tx.token}`
                                                  : `${tx.amount} ${tx.token}`}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">
                                                Date:
                                              </span>
                                              <span className="ml-2">
                                                {new Date(
                                                  tx.datetime,
                                                ).toLocaleDateString()}
                                              </span>
                                            </div>
                                            <div>
                                              <span className="text-gray-500">
                                                Time:
                                              </span>
                                              <span className="ml-2">
                                                {new Date(
                                                  tx.datetime,
                                                ).toLocaleTimeString()}
                                              </span>
                                            </div>
                                            {tx.counterParty && (
                                              <div className="col-span-2">
                                                <span className="text-gray-500">
                                                  Counter Party:
                                                </span>
                                                <span className="ml-2 font-mono text-xs">
                                                  {tx.counterParty}
                                                </span>
                                              </div>
                                            )}
                                            {tx.flowType && (
                                              <div>
                                                <span className="text-gray-500">
                                                  Flow Type:
                                                </span>
                                                <span
                                                  className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                                                    tx.flowType === "TopUp"
                                                      ? "bg-green-100 text-green-800"
                                                      : tx.flowType === "Return"
                                                        ? "bg-orange-100 text-orange-800"
                                                        : tx.flowType ===
                                                            "Internal"
                                                          ? "bg-purple-100 text-purple-800"
                                                          : tx.flowType ===
                                                              "Swap"
                                                            ? "bg-blue-100 text-blue-800"
                                                            : "bg-red-100 text-red-800"
                                                  }`}
                                                >
                                                  {tx.flowType}
                                                </span>
                                              </div>
                                            )}
                                            <div className="col-span-2">
                                              <span className="text-gray-500">
                                                Tx Hash:
                                              </span>
                                              <a
                                                href={`https://etherscan.io/tx/${tx.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="ml-2 text-blue-600 hover:underline font-mono text-xs"
                                              >
                                                {tx.txHash.substring(0, 10)}...
                                                {tx.txHash.substring(
                                                  tx.txHash.length - 8,
                                                )}
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Account Picker Modal */}
        {isAccountPickerOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 backdrop-blur-sm">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[85vh] flex flex-col border border-gray-200">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">
                      Select Accounts to Import
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Choose accounts from the selected Accounts document
                    </p>
                  </div>
                  {availableAccounts.some(
                    (account: any) => !existingAccountIds.has(account.id),
                  ) && (
                    <button
                      onClick={handleSelectAllAccounts}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add All Accounts
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {availableAccounts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No accounts available in the selected document
                  </div>
                ) : (
                  <div className="space-y-2">
                    {availableAccounts.map((account: any) => {
                      const isAlreadyAdded = existingAccountIds.has(account.id);
                      const isSelected = selectedAccountIds.has(account.id);

                      return (
                        <div
                          key={account.id}
                          onClick={() =>
                            !isAlreadyAdded && handleToggleAccount(account.id)
                          }
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            isAlreadyAdded
                              ? "bg-gray-100 cursor-not-allowed opacity-50"
                              : isSelected
                                ? "bg-blue-50 border-blue-500"
                                : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                disabled={isAlreadyAdded}
                                onChange={() => {}}
                                className="mt-1"
                              />
                              <div>
                                <h4 className="font-medium">{account.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {account.account}
                                </p>
                                <span
                                  className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                                    account.type === "Source"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : account.type === "Internal"
                                        ? "bg-blue-100 text-blue-800"
                                        : account.type === "Destination"
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-gray-100 text-gray-700"
                                  }`}
                                >
                                  {account.type || "External"}
                                </span>
                              </div>
                            </div>
                            {isAlreadyAdded && (
                              <span className="text-xs text-gray-500">
                                Already added
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="p-6 border-t flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsAccountPickerOpen(false);
                    setSelectedAccountIds(new Set());
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImportAccounts}
                  disabled={selectedAccountIds.size === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Import{" "}
                  {selectedAccountIds.size > 0
                    ? `(${selectedAccountIds.size})`
                    : ""}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
