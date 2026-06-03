import { useMemo } from "react";
import { useDocumentsInSelectedDrive } from "@powerhousedao/reactor-browser";
import type { Wallet } from "../../../document-models/expense-report/v1/gen/types.js";

interface SyncStatus {
  needsSync: boolean;
  outdatedWallets: string[]; // wallet addresses that need sync
  tagChangedWallets: string[]; // wallet addresses with tag changes
}

export function useWalletSync(wallets: Wallet[]): SyncStatus {
  const documents = useDocumentsInSelectedDrive();

  const syncStatus = useMemo(() => {
    if (!documents || wallets.length === 0) {
      return { needsSync: false, outdatedWallets: [], tagChangedWallets: [] };
    }

    // Create a map of billing statement documents
    const billingStatements = new Map<string, any>();
    documents
      .filter(
        (doc: any) =>
          doc.header.documentType === "powerhouse/billing-statement",
      )
      .forEach((doc: any) => {
        billingStatements.set(doc.header.id, doc);
      });

    const outdatedWallets: string[] = [];
    const tagChangedWallets: string[] = [];

    // Check each wallet
    wallets.forEach((wallet) => {
      if (!wallet.billingStatements || wallet.billingStatements.length === 0) {
        return; // No billing statements to sync
      }

      // Get current aggregated totals by category from wallet line items
      const currentCategoryTotals = new Map<string, number>();
      wallet.lineItems?.forEach((item) => {
        if (item?.group) {
          const currentTotal = currentCategoryTotals.get(item.group) || 0;
          currentCategoryTotals.set(
            item.group,
            currentTotal + (item.actuals || 0),
          );
        }
      });

      // Calculate expected aggregated totals by category from billing statements
      const expectedCategoryTotals = new Map<string, number>();
      const expectedCategoryLabels = new Set<string>();

      wallet.billingStatements.forEach((statementId) => {
        if (!statementId) return;
        const statement = billingStatements.get(statementId);
        if (statement?.state?.global?.lineItems) {
          statement.state.global.lineItems.forEach((item: any) => {
            // Find expense-account tag
            const expenseAccountTag = item.lineItemTag?.find(
              (tag: any) => tag.dimension === "expense-account",
            );

            if (expenseAccountTag?.label) {
              expectedCategoryLabels.add(expenseAccountTag.label);

              const currentTotal =
                expectedCategoryTotals.get(expenseAccountTag.label) || 0;
              expectedCategoryTotals.set(
                expenseAccountTag.label,
                currentTotal + (item.totalPriceCash || 0),
              );
            }
          });
        }
      });

      // Check if categories have changed
      const currentCategories = new Set(currentCategoryTotals.keys());
      const hasTagChanges =
        currentCategories.size !== expectedCategoryLabels.size;

      // Check if totals per category have changed
      let hasTotalMismatch = false;

      // We need to check if the aggregated totals match
      // Since wallet stores group IDs but billing statements have labels,
      // we need to sum up all line items regardless of category structure
      const currentTotalActuals = Array.from(
        currentCategoryTotals.values(),
      ).reduce((sum, total) => sum + total, 0);
      const expectedTotalActuals = Array.from(
        expectedCategoryTotals.values(),
      ).reduce((sum, total) => sum + total, 0);

      hasTotalMismatch =
        Math.abs(currentTotalActuals - expectedTotalActuals) > 0.01;

      if (hasTagChanges || hasTotalMismatch) {
        if (wallet.wallet) {
          outdatedWallets.push(wallet.wallet);
          if (hasTagChanges) {
            tagChangedWallets.push(wallet.wallet);
          }
        }
      }
    });

    return {
      needsSync: outdatedWallets.length > 0,
      outdatedWallets,
      tagChangedWallets,
    };
  }, [documents, wallets]);

  return syncStatus;
}
