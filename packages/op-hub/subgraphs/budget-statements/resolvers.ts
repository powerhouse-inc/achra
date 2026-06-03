import type { BaseSubgraph } from "@powerhousedao/reactor-api";
import type { PHDocument } from "document-model";
import type { SnapshotReportDocument } from "document-models/snapshot-report";
import type { ExpenseReportDocument } from "document-models/expense-report";

// Type definitions for builder profile (from external package)
interface BuilderProfileState {
  id: string | null;
  name: string | null;
  code: string | null;
  icon: string | null;
  operationalHubMember: {
    phid: string | null;
    name: string | null;
  };
}

// Helper to extract YYYY-MM-DD from an ISO date string without Date object
// to avoid timezone-dependent parsing
export const extractIsoDate = (dateStr: string): string | null => {
  const match = dateStr.match(/^(\d{4}-\d{2}-\d{2})/);
  return match ? match[1] : null;
};

// Helper to create a period key from start and end dates
export const getPeriodKey = (
  periodStart: string | null | undefined,
  periodEnd: string | null | undefined,
): string | null => {
  if (!periodStart || !periodEnd) return null;
  const start = extractIsoDate(periodStart);
  const end = extractIsoDate(periodEnd);
  if (!start || !end) return null;
  return `${start}_${end}`;
};

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// Helper to extract month key from an ISO date string (format: "SEP2025")
// Parses directly from the string to avoid timezone issues
export const getMonthKey = (dateStr: string | null): string | null => {
  if (!dateStr) return null;
  const match = dateStr.match(/^(\d{4})-(\d{2})/);
  if (!match) return null;
  const year = match[1];
  const monthIndex = parseInt(match[2], 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) return null;
  return `${MONTHS[monthIndex]}${year}`;
};

// Helper to sort budget statements by month (most recent first)
const sortByMonth = (a: { month: string }, b: { month: string }): number => {
  const parseMonth = (m: string) => {
    const months: Record<string, number> = {
      JAN: 0,
      FEB: 1,
      MAR: 2,
      APR: 3,
      MAY: 4,
      JUN: 5,
      JUL: 6,
      AUG: 7,
      SEP: 8,
      OCT: 9,
      NOV: 10,
      DEC: 11,
    };
    const monthStr = m.substring(0, 3);
    const year = parseInt(m.substring(3), 10);
    return new Date(year, months[monthStr] || 0).getTime();
  };
  return parseMonth(b.month) - parseMonth(a.month);
};

export const getResolvers = (
  subgraph: BaseSubgraph,
): Record<string, unknown> => {
  const { reactorClient } = subgraph;

  return {
    Query: {
      budgetStatements: async (
        _: unknown,
        args: { filter?: { teamId?: string; networkSlug?: string } },
      ) => {
        const { teamId, networkSlug } = args.filter || {};

        // Step 1: Collect all documents by type using reactorClient.find()
        const [snapshotResults, expenseResults, builderProfileResults] =
          await Promise.all([
            reactorClient.find({ type: "powerhouse/snapshot-report" }),
            reactorClient.find({ type: "powerhouse/expense-report" }),
            reactorClient.find({ type: "powerhouse/builder-profile" }),
          ]);

        let snapshotReportDocs =
          snapshotResults.results as SnapshotReportDocument[];
        let expenseReportDocs =
          expenseResults.results as ExpenseReportDocument[];
        const builderProfileDocs = new Map<string, PHDocument>();
        for (const doc of builderProfileResults.results) {
          builderProfileDocs.set(doc.header.id, doc);
        }

        // If networkSlug is provided, find the network profile and get valid builder PHIDs
        let allowedBuilderPhids: Set<string> | null = null;

        if (networkSlug) {
          const targetNetworkSlug = networkSlug.toLowerCase().trim();

          const networkResults = await reactorClient.find({
            type: "powerhouse/network-profile",
          });

          const networkDoc = networkResults.results.find((doc) => {
            const state = (doc.state as { global?: { name?: string } }).global;
            if (!state?.name) return false;
            const slug = state.name.toLowerCase().trim().split(/\s+/).join("-");
            return slug === targetNetworkSlug;
          });

          if (networkDoc) {
            // Find the builders list — look for a builders doc that shares a parent with the network doc
            const buildersResults = await reactorClient.find({
              type: "powerhouse/builders",
            });

            const buildersDoc = buildersResults.results[0];

            if (buildersDoc) {
              const state = (
                buildersDoc.state as {
                  global?: { builders?: unknown[] };
                }
              ).global;
              if (Array.isArray(state?.builders)) {
                allowedBuilderPhids = new Set(
                  state.builders.filter(
                    (id): id is string => typeof id === "string",
                  ),
                );
              }
            }
          }

          // If no network found or no builders list, return empty results
          if (!allowedBuilderPhids) {
            return [];
          }
        }

        // Apply filters to snapshot and expense reports
        if (allowedBuilderPhids) {
          snapshotReportDocs = snapshotReportDocs.filter((doc) => {
            const ownerId = doc.state.global.ownerIds?.[0] ?? null;
            return !ownerId || allowedBuilderPhids.has(ownerId);
          });
        }

        expenseReportDocs = expenseReportDocs.filter((doc) => {
          const ownerId = doc.state.global.ownerId;
          if (teamId && ownerId !== teamId) return false;
          if (
            allowedBuilderPhids &&
            ownerId &&
            !allowedBuilderPhids.has(ownerId)
          )
            return false;
          return true;
        });

        // Step 2: Resolve builder profiles and build opHub lookup
        // We need this before grouping so snapshot reports can be shared across op hub members
        const resolvedProfiles = new Map<string, BuilderProfileState | null>();
        const builderToOpHub = new Map<string, string>();

        const resolveProfile = async (
          phid: string,
        ): Promise<BuilderProfileState | null> => {
          if (resolvedProfiles.has(phid)) return resolvedProfiles.get(phid)!;
          let doc = builderProfileDocs.get(phid) || null;
          if (!doc) {
            try {
              doc = await reactorClient.get<PHDocument>(phid);
            } catch {
              // Profile may not exist
            }
          }
          const state = doc
            ? ((doc.state as unknown as { global: BuilderProfileState })
                ?.global ?? null)
            : null;
          resolvedProfiles.set(phid, state);
          if (state?.operationalHubMember?.phid) {
            builderToOpHub.set(phid, state.operationalHubMember.phid);
          }
          return state;
        };

        // Pre-resolve all builder profiles we'll need
        const allOwnerIds = new Set<string>();
        for (const doc of snapshotReportDocs) {
          const id = doc.state.global.ownerIds?.[0];
          if (id) allOwnerIds.add(id);
        }
        for (const doc of expenseReportDocs) {
          const id = doc.state.global.ownerId;
          if (id) allOwnerIds.add(id);
        }
        await Promise.all(
          Array.from(allOwnerIds).map((id) => resolveProfile(id)),
        );

        // Step 3: Group reports by ownerId AND period
        // Key format: "ownerId_periodStart_periodEnd"
        const budgetStatementsByOwnerAndPeriod = new Map<
          string,
          {
            ownerId: string;
            periodKey: string;
            snapshotReport: SnapshotReportDocument | null;
            expenseReport: ExpenseReportDocument | null;
          }
        >();

        // Index snapshot reports by opHub + period so they can be shared
        const snapshotByOpHub = new Map<string, SnapshotReportDocument>();

        // Group snapshot reports
        for (const snapshotDoc of snapshotReportDocs) {
          const state = snapshotDoc.state.global;
          const ownerId = state.ownerIds?.[0] ?? null;
          if (!ownerId) continue;

          const periodKey = getPeriodKey(
            state.reportPeriodStart,
            state.reportPeriodEnd,
          );
          if (!periodKey) continue;

          const key = `${ownerId}_${periodKey}`;
          if (!budgetStatementsByOwnerAndPeriod.has(key)) {
            budgetStatementsByOwnerAndPeriod.set(key, {
              ownerId,
              periodKey,
              snapshotReport: null,
              expenseReport: null,
            });
          }
          budgetStatementsByOwnerAndPeriod.get(key)!.snapshotReport =
            snapshotDoc;

          // Also index by opHub + period for sharing across subteams
          const opHubPhid = builderToOpHub.get(ownerId);
          if (opHubPhid) {
            snapshotByOpHub.set(`${opHubPhid}_${periodKey}`, snapshotDoc);
          }
        }

        // Group expense reports and match with snapshot reports
        for (const expenseDoc of expenseReportDocs) {
          const state = expenseDoc.state.global;
          const ownerId = state.ownerId;
          if (!ownerId) continue;

          const periodKey = getPeriodKey(state.periodStart, state.periodEnd);
          if (!periodKey) continue;

          const key = `${ownerId}_${periodKey}`;
          if (!budgetStatementsByOwnerAndPeriod.has(key)) {
            budgetStatementsByOwnerAndPeriod.set(key, {
              ownerId,
              periodKey,
              snapshotReport: null,
              expenseReport: null,
            });
          }
          budgetStatementsByOwnerAndPeriod.get(key)!.expenseReport = expenseDoc;
        }

        // Step 4: Fill in missing snapshot reports from op hub siblings
        for (const entry of budgetStatementsByOwnerAndPeriod.values()) {
          if (entry.snapshotReport) continue; // already has a direct match
          const opHubPhid = builderToOpHub.get(entry.ownerId);
          if (!opHubPhid) continue;
          const opHubSnapshot = snapshotByOpHub.get(
            `${opHubPhid}_${entry.periodKey}`,
          );
          if (opHubSnapshot) {
            entry.snapshotReport = opHubSnapshot;
          }
        }

        // Step 5: Build the budget statements
        const budgetStatements = [];

        for (const [
          key,
          { ownerId, periodKey, snapshotReport, expenseReport },
        ] of budgetStatementsByOwnerAndPeriod.entries()) {
          const ownerState = resolvedProfiles.get(ownerId) ?? null;

          const owner = {
            id: ownerId,
            name: ownerState?.name || "Unknown",
            code: ownerState?.code || "",
            logo: ownerState?.icon || "",
          };

          // Derive the month from the period start date
          const periodStartDate =
            snapshotReport?.state.global.reportPeriodStart ||
            expenseReport?.state.global.periodStart ||
            null;
          const month = getMonthKey(periodStartDate) || periodKey;

          // Build snapshot report data
          const snapshotReportData = snapshotReport
            ? buildSnapshotReportData(snapshotReport)
            : {
                startDate: "",
                endDate: "",
                accounts: [],
              };

          // Build expense report data
          const expenseReportData = expenseReport
            ? buildExpenseReportData(expenseReport)
            : {
                periodStart: "",
                periodEnd: "",
                groups: [],
                wallets: [],
              };

          // Get status from expense report state (default to empty string if not available)
          const status = expenseReport?.state.global.status || "DRAFT";

          // Get lastModifiedAtUtcIso from the expense report document header
          const lastModifiedAtUtcIso =
            expenseReport?.header.lastModifiedAtUtcIso || "";

          // Get operational hub member from builder profile
          const opHubMember = ownerState?.operationalHubMember ?? null;
          const operationalHubMember =
            opHubMember?.phid || opHubMember?.name
              ? {
                  phid: opHubMember.phid || null,
                  name: opHubMember.name || null,
                }
              : null;

          budgetStatements.push({
            id: key,
            owner,
            operationalHubMember,
            month,
            status,
            lastModifiedAtUtcIso,
            reportedActuals: computeReportedActuals(expenseReportData),
            netExpenseTxns: computeNetExpenseTxns(snapshotReportData),
            snapshotReport: snapshotReportData,
            expenseReport: expenseReportData,
          });
        }

        // Aggregate reportedActuals by operational hub + month
        // All builders in the same op hub for the same month share the same total
        const opHubActuals = new Map<string, number>();
        for (const stmt of budgetStatements) {
          const opHubPhid = stmt.operationalHubMember?.phid;
          if (!opHubPhid) continue;
          const groupKey = `${opHubPhid}_${stmt.month}`;
          const current = opHubActuals.get(groupKey) || 0;
          opHubActuals.set(
            groupKey,
            current + (parseFloat(stmt.reportedActuals.value) || 0),
          );
        }
        for (const stmt of budgetStatements) {
          const opHubPhid = stmt.operationalHubMember?.phid;
          if (!opHubPhid) continue;
          const groupKey = `${opHubPhid}_${stmt.month}`;
          const total = opHubActuals.get(groupKey);
          if (total !== undefined) {
            stmt.reportedActuals = { unit: "USDS", value: String(total) };
          }
        }

        // When filtering by teamId, remove entries for other owners that were
        // only collected because we don't filter snapshot reports by teamId
        // (snapshots are often owned by the opHub, not individual teams).
        const filteredStatements = teamId
          ? budgetStatements.filter((stmt) => stmt.owner.id === teamId)
          : budgetStatements;

        // Sort by month (most recent first)
        filteredStatements.sort(sortByMonth);

        return filteredStatements;
      },
    },
  };
};

/**
 * Build snapshot report data from a SnapshotReportDocument
 */
function buildSnapshotReportData(doc: SnapshotReportDocument) {
  const state = doc.state.global;

  return {
    startDate: state.reportPeriodStart || state.startDate || "",
    endDate: state.reportPeriodEnd || state.endDate || "",
    accounts: state.snapshotAccounts.map((account) => {
      // Build balances from startingBalances and endingBalances
      const balances = account.startingBalances.map((startBal, index) => {
        const endBal = account.endingBalances[index] || {
          amount: { unit: startBal.token, value: "0" },
          token: startBal.token,
        };
        return {
          startingBalance: startBal.amount,
          endingBalance: endBal.amount,
          token: {
            symbol: startBal.token,
            contractAddress: "", // Not available in the document model
          },
        };
      });

      // Build transactions from snapshot account transactions
      const transactions = account.transactions.map((tx) => ({
        id: tx.id,
        datetime: tx.datetime,
        txHash: tx.txHash,
        counterParty: tx.counterParty || "",
        counterPartyName: getCounterPartyName(
          tx.counterParty,
          state.snapshotAccounts,
        ),
        amount: {
          value: tx.amount,
          unit: tx.token,
        },
        direction: tx.direction,
        flowType: tx.flowType || "External",
      }));

      return {
        id: account.id,
        name: account.accountName,
        address: account.accountAddress,
        type: account.type,
        balances,
        transactions,
      };
    }),
  };
}

/**
 * Build expense report data from an ExpenseReportDocument
 */
function buildExpenseReportData(doc: ExpenseReportDocument) {
  const state = doc.state.global;

  // Build groups
  const groups = state.groups.map((group) => ({
    id: group.id,
    label: group.label || "",
    parentId: group.parentId || "",
  }));

  // Create a map for quick group label lookup
  const groupLabelMap = new Map<string, string>();
  for (const group of state.groups) {
    groupLabelMap.set(group.id, group.label || "");
  }

  // Build wallets
  const wallets = state.wallets.map((wallet) => {
    // Build totals from wallet totals
    const totals = (wallet.totals || [])
      .filter((t): t is NonNullable<typeof t> => t !== null)
      .map((total) => ({
        group: total.group || "",
        groupLabel: groupLabelMap.get(total.group || "") || "",
        totalBudget: { unit: "USDS", value: String(total.totalBudget || 0) },
        totalForecast: {
          unit: "USDS",
          value: String(total.totalForecast || 0),
        },
        totalActuals: { unit: "USDS", value: String(total.totalActuals || 0) },
        totalPayments: {
          unit: "USDS",
          value: String(total.totalPayments || 0),
        },
      }));

    // Build line items
    const lineItems = (wallet.lineItems || [])
      .filter((li): li is NonNullable<typeof li> => li !== null)
      .map((item) => ({
        id: item.id || "",
        label: item.label || "",
        groupId: item.group || "",
        groupLabel: groupLabelMap.get(item.group || "") || "",
        budget: { unit: "USDS", value: String(item.budget || 0) },
        forecast: { unit: "USDS", value: String(item.forecast || 0) },
        actuals: { unit: "USDS", value: String(item.actuals || 0) },
        payments: { unit: "USDS", value: String(item.payments || 0) },
        comments: item.comments || null,
      }));

    // Collect billing statement IDs
    const billingStatementIds = (wallet.billingStatements || []).filter(
      (id): id is string => id !== null,
    );

    return {
      name: wallet.name || null,
      address: wallet.wallet || null,
      totals,
      lineItems,
      billingStatementIds,
    };
  });

  return {
    periodStart: state.periodStart || "",
    periodEnd: state.periodEnd || "",
    groups,
    wallets,
  };
}

/**
 * Get counter party name by matching the counter party address
 * against snapshot account addresses.
 */
function getCounterPartyName(
  counterPartyAddress: string | null | undefined,
  snapshotAccounts: SnapshotReportDocument["state"]["global"]["snapshotAccounts"],
): string {
  if (!counterPartyAddress) return "";

  const account = snapshotAccounts.find(
    (acc) =>
      acc.accountAddress.toLowerCase() === counterPartyAddress.toLowerCase(),
  );
  return account?.accountName || "";
}

type AmountCurrency = { unit: string; value: string };

type ExpenseReportData = {
  wallets: Array<{
    lineItems: Array<{ actuals: AmountCurrency }>;
  }>;
};

type SnapshotReportData = {
  accounts: Array<{
    type: string;
    transactions: Array<{
      direction: string;
      flowType: string;
      amount: { value: AmountCurrency; unit: string };
    }>;
  }>;
};

/**
 * Sum of all line item actuals from expense report wallets
 */
export function computeReportedActuals(
  expenseReportData: ExpenseReportData,
): AmountCurrency {
  let total = 0;
  for (const wallet of expenseReportData.wallets) {
    for (const item of wallet.lineItems) {
      total += parseFloat(item.actuals.value) || 0;
    }
  }
  return { unit: "USDS", value: String(total) };
}

// USD stablecoins to include in net expense calculation
const USD_STABLECOINS = new Set(["USDS", "USDC", "DAI"]);

/**
 * Sum of outbound USD stablecoin transactions that leave the Internal wallet grouping.
 * Excludes Swap (token conversion) and Internal (inter-wallet transfers) flowTypes.
 * Only counts USDS, USDC, and DAI — excludes sUSDS, EURe, SKY, MKR, etc.
 */
export function computeNetExpenseTxns(
  snapshotReportData: SnapshotReportData,
): AmountCurrency {
  let total = 0;
  for (const account of snapshotReportData.accounts) {
    if (account.type !== "Internal") continue;
    for (const tx of account.transactions) {
      if (tx.direction !== "OUTFLOW") continue;
      if (tx.flowType === "Swap" || tx.flowType === "Internal") continue;
      if (!USD_STABLECOINS.has(tx.amount.unit)) continue;
      total += parseFloat(tx.amount.value.value) || 0;
    }
  }
  return { unit: "USDS", value: String(total) };
}
