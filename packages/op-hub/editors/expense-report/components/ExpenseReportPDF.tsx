import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type {
  Wallet,
  LineItemGroup,
  LineItem,
} from "../../../document-models/expense-report/v1/gen/types.js";

interface ExpenseReportPDFProps {
  periodStart?: string | null;
  periodEnd?: string | null;
  wallets: Wallet[];
  groups: LineItemGroup[];
}

interface LineItemWithGroupInfo extends LineItem {
  parentGroupId?: string | null;
  parentGroupLabel?: string;
  groupLabel?: string;
}

// Tailwind-inspired styles for PDF
const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 8,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1pt solid #e5e7eb",
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111827",
    textAlign: "center",
  },
  period: {
    fontSize: 9,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#111827",
  },
  walletInfo: {
    fontSize: 8,
    color: "#6b7280",
    marginBottom: 8,
  },
  table: {
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1pt solid #e5e7eb",
    paddingBottom: 6,
    marginBottom: 6,
    backgroundColor: "#f9fafb",
    paddingTop: 6,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottom: "0.5pt solid #f3f4f6",
    minHeight: 20,
  },
  tableRowAlt: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: "#f9fafb",
    borderBottom: "0.5pt solid #f3f4f6",
    minHeight: 20,
  },
  subtotalRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderTop: "1pt solid #d1d5db",
    marginTop: 3,
    fontWeight: "bold",
    backgroundColor: "#fafafa",
  },
  totalRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderTop: "2pt solid #111827",
    marginTop: 3,
    fontWeight: "bold",
    backgroundColor: "#f3f4f6",
  },
  headerCell: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  cell: {
    fontSize: 8,
    color: "#111827",
  },
  cellRight: {
    fontSize: 8,
    color: "#111827",
    textAlign: "right",
  },
  cellBold: {
    fontSize: 8,
    color: "#111827",
    fontWeight: "bold",
  },
  // Breakdown table columns - adjusted to match AggregatedExpensesTable
  categoryCol: { width: "20%" },
  budgetCol: { width: "11%", textAlign: "right" },
  forecastCol: { width: "11%", textAlign: "right" },
  actualsCol: { width: "11%", textAlign: "right" },
  differenceCol: { width: "11%", textAlign: "right" },
  commentsCol: { width: "25%", paddingLeft: 4 },
  paymentsCol: { width: "11%", textAlign: "right" },
  commentsText: {
    fontSize: 7,
    color: "#6b7280",
    lineHeight: 1.4,
  },
  // Color styles for difference column
  differenceNegative: {
    color: "#dc2626", // red-600 for negative values
  },
  differenceNormal: {
    color: "#111827", // gray-900 for positive or zero
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 7,
    color: "#6b7280",
  },
});

// Format number as currency
const formatNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return "0.00";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Format date
const formatDate = (dateString?: string | null): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function ExpenseReportPDF({
  periodStart,
  periodEnd,
  wallets,
  groups,
}: ExpenseReportPDFProps) {
  // Create a map of groups with their parent info
  const groupsMap = new Map<
    string,
    { group: LineItemGroup; parent?: LineItemGroup }
  >();

  groups.forEach((group) => {
    groupsMap.set(group.id, { group });
  });

  groups.forEach((group) => {
    if (group.parentId) {
      const entry = groupsMap.get(group.id);
      const parentEntry = groupsMap.get(group.parentId);
      if (entry && parentEntry) {
        entry.parent = parentEntry.group;
      }
    }
  });

  // Get line items for a wallet with group information
  const getWalletLineItems = (wallet: Wallet): LineItemWithGroupInfo[] => {
    const lineItems = wallet.lineItems || [];

    return lineItems
      .filter(
        (item): item is NonNullable<typeof item> =>
          item !== null && item !== undefined,
      )
      .map((item): LineItemWithGroupInfo => {
        const groupInfo = item.group ? groupsMap.get(item.group) : undefined;

        return {
          ...item,
          groupLabel: groupInfo?.group.label || item.label || undefined,
          parentGroupId: groupInfo?.parent?.id || null,
          parentGroupLabel: groupInfo?.parent?.label || undefined,
        };
      });
  };

  // Group line items by parent category
  const groupLineItemsByParent = (lineItems: LineItemWithGroupInfo[]) => {
    const grouped = new Map<string, LineItemWithGroupInfo[]>();

    lineItems.forEach((item) => {
      const key = item.parentGroupId || "uncategorized";
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(item);
    });

    // Convert to array and sort by hierarchy: Headcount, Non-Headcount, others, then uncategorized
    const entries = Array.from(grouped.entries());

    // Find Headcount and Non-Headcount group IDs
    const headcountGroup = groups.find((g) => g.label === "Headcount Expenses");
    const nonHeadcountGroup = groups.find(
      (g) => g.label === "Non-Headcount Expenses",
    );

    entries.sort(([keyA], [keyB]) => {
      // Uncategorized always goes last
      if (keyA === "uncategorized") return 1;
      if (keyB === "uncategorized") return -1;

      // Headcount Expenses always first
      if (keyA === headcountGroup?.id) return -1;
      if (keyB === headcountGroup?.id) return 1;

      // Non-Headcount Expenses always second
      if (keyA === nonHeadcountGroup?.id) return -1;
      if (keyB === nonHeadcountGroup?.id) return 1;

      // For other groups, maintain their original order
      return 0;
    });

    return entries.map(([key, items]) => ({
      parentLabel:
        key === "uncategorized"
          ? "Uncategorized"
          : items[0]?.parentGroupLabel || "Unknown",
      items,
    }));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Expense Report</Text>
          {periodStart && (
            <Text style={styles.period}>
              Transaction Period: {formatDate(periodStart)} to{" "}
              {formatDate(periodEnd)}
            </Text>
          )}
        </View>

        {/* Breakdown Tables for each wallet */}
        {wallets.map((wallet, walletIndex) => {
          const lineItems = getWalletLineItems(wallet);
          const groupedItems = groupLineItemsByParent(lineItems);

          // Calculate grand totals
          const grandTotals = lineItems.reduce(
            (acc, item) => ({
              budget: acc.budget + (item.budget || 0),
              forecast: acc.forecast + (item.forecast || 0),
              actuals: acc.actuals + (item.actuals || 0),
              payments: acc.payments + (item.payments || 0),
            }),
            { budget: 0, forecast: 0, actuals: 0, payments: 0 },
          );

          return (
            <View key={wallet.wallet || walletIndex} break={walletIndex > 0}>
              <View wrap={false}>
                <Text style={styles.sectionTitle}>
                  {periodStart &&
                    new Date(periodStart).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                  Breakdown
                </Text>
                <Text style={styles.walletInfo}>
                  {wallet.name && `${wallet.name} • `}
                  {wallet.wallet || "Unknown Wallet"}
                </Text>
              </View>

              <View style={styles.table}>
                {/* Grouped Items */}
                {groupedItems.map((group, groupIndex) => {
                  const subtotals = group.items.reduce(
                    (acc, item) => ({
                      budget: acc.budget + (item.budget || 0),
                      forecast: acc.forecast + (item.forecast || 0),
                      actuals: acc.actuals + (item.actuals || 0),
                      payments: acc.payments + (item.payments || 0),
                    }),
                    { budget: 0, forecast: 0, actuals: 0, payments: 0 },
                  );
                  const subtotalDifference =
                    subtotals.forecast - subtotals.actuals;

                  return (
                    <View key={group.parentLabel}>
                      {/* Table Header - show for first group or after page break */}
                      {groupIndex === 0 && (
                        <View style={styles.tableHeader} wrap={false}>
                          <Text style={[styles.headerCell, styles.categoryCol]}>
                            Category
                          </Text>
                          <Text style={[styles.headerCell, styles.budgetCol]}>
                            Budget Allocation
                          </Text>
                          <Text style={[styles.headerCell, styles.forecastCol]}>
                            Forecast
                          </Text>
                          <Text style={[styles.headerCell, styles.actualsCol]}>
                            Actuals
                          </Text>
                          <Text
                            style={[styles.headerCell, styles.differenceCol]}
                          >
                            Difference
                          </Text>
                          <Text style={[styles.headerCell, styles.commentsCol]}>
                            Comments
                          </Text>
                          <Text style={[styles.headerCell, styles.paymentsCol]}>
                            Payments
                          </Text>
                        </View>
                      )}

                      {/* Parent Category Header */}
                      <View
                        style={{
                          paddingVertical: 6,
                          paddingHorizontal: 6,
                          backgroundColor: "#f9fafb",
                          borderBottom: "1pt solid #e5e7eb",
                          marginTop: groupIndex > 0 ? 8 : 0,
                        }}
                        wrap={false}
                      >
                        <Text
                          style={{
                            fontSize: 9,
                            fontWeight: "bold",
                            color: "#111827",
                          }}
                        >
                          {group.parentLabel}
                        </Text>
                      </View>

                      {/* Category items */}
                      {group.items.map((item, itemIndex) => {
                        const difference =
                          (item.forecast || 0) - (item.actuals || 0);
                        const differenceStyle =
                          difference < 0
                            ? styles.differenceNegative
                            : styles.differenceNormal;

                        return (
                          <View
                            key={item.id}
                            style={
                              itemIndex % 2 === 0
                                ? styles.tableRow
                                : styles.tableRowAlt
                            }
                          >
                            <Text style={[styles.cell, styles.categoryCol]}>
                              {item.groupLabel || item.label || "Uncategorized"}
                            </Text>
                            <Text style={[styles.cellRight, styles.budgetCol]}>
                              {formatNumber(item.budget)}
                            </Text>
                            <Text
                              style={[styles.cellRight, styles.forecastCol]}
                            >
                              {formatNumber(item.forecast)}
                            </Text>
                            <Text style={[styles.cellRight, styles.actualsCol]}>
                              {formatNumber(item.actuals)}
                            </Text>
                            <Text
                              style={[
                                styles.cellRight,
                                styles.differenceCol,
                                differenceStyle,
                              ]}
                            >
                              {formatNumber(difference)}
                            </Text>
                            <View style={styles.commentsCol}>
                              {item.comments && (
                                <Text style={styles.commentsText}>
                                  {item.comments}
                                </Text>
                              )}
                            </View>
                            <Text
                              style={[styles.cellRight, styles.paymentsCol]}
                            >
                              {formatNumber(item.payments)}
                            </Text>
                          </View>
                        );
                      })}

                      {/* Subtotal row */}
                      <View style={styles.subtotalRow}>
                        <Text style={[styles.cellBold, styles.categoryCol]}>
                          Subtotal
                        </Text>
                        <Text style={[styles.cellRight, styles.budgetCol]}>
                          {formatNumber(subtotals.budget)}
                        </Text>
                        <Text style={[styles.cellRight, styles.forecastCol]}>
                          {formatNumber(subtotals.forecast)}
                        </Text>
                        <Text style={[styles.cellRight, styles.actualsCol]}>
                          {formatNumber(subtotals.actuals)}
                        </Text>
                        <Text
                          style={[
                            styles.cellRight,
                            styles.differenceCol,
                            subtotalDifference < 0
                              ? styles.differenceNegative
                              : styles.differenceNormal,
                          ]}
                        >
                          {formatNumber(subtotalDifference)}
                        </Text>
                        <View style={styles.commentsCol}></View>
                        <Text style={[styles.cellRight, styles.paymentsCol]}>
                          {formatNumber(subtotals.payments)}
                        </Text>
                      </View>
                    </View>
                  );
                })}

                {/* Grand Total row */}
                <View style={styles.totalRow}>
                  <Text style={[styles.cellBold, styles.categoryCol]}>
                    Total
                  </Text>
                  <Text style={[styles.cellRight, styles.budgetCol]}>
                    {formatNumber(grandTotals.budget)}
                  </Text>
                  <Text style={[styles.cellRight, styles.forecastCol]}>
                    {formatNumber(grandTotals.forecast)}
                  </Text>
                  <Text style={[styles.cellRight, styles.actualsCol]}>
                    {formatNumber(grandTotals.actuals)}
                  </Text>
                  <Text
                    style={[
                      styles.cellRight,
                      styles.differenceCol,
                      grandTotals.forecast - grandTotals.actuals < 0
                        ? styles.differenceNegative
                        : styles.differenceNormal,
                    ]}
                  >
                    {formatNumber(grandTotals.forecast - grandTotals.actuals)}
                  </Text>
                  <View style={styles.commentsCol}></View>
                  <Text style={[styles.cellRight, styles.paymentsCol]}>
                    {formatNumber(grandTotals.payments)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}

        {/* Page Number */}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
