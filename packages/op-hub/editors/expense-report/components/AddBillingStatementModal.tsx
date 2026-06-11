import { useState, useMemo } from "react";
import { Button } from "@powerhousedao/document-engineering";
import {
  useDocumentsInSelectedDrive,
  useSelectedDrive,
  isFileNodeKind,
} from "@powerhousedao/reactor-browser";
import type { FileNode } from "@powerhousedao/shared/document-drive";
import { generateId } from "document-model";
import { X, FileText, Check } from "lucide-react";
import type { LineItemGroup } from "../../../document-models/expense-report/v1/gen/types.js";
import type { BillingStatementLineItem } from "../../../document-models/billing-statement/v1/gen/types.js";
import { actions } from "document-models/expense-report";

interface AddBillingStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  dispatch: any;
  groups: LineItemGroup[];
  /** The Payments folder ID to filter billing statements by. If not provided, shows all billing statements in the drive. */
  paymentsFolderId?: string | null;
}

// Mapping of fusion labels to group IDs

export function AddBillingStatementModal({
  isOpen,
  onClose,
  walletAddress,
  dispatch,
  groups,
  paymentsFolderId,
}: AddBillingStatementModalProps) {
  const documents = useDocumentsInSelectedDrive();
  const [driveDocument] = useSelectedDrive();
  const [selectedStatements, setSelectedStatements] = useState<Set<string>>(
    new Set(),
  );
  const [searchTerm, setSearchTerm] = useState("");

  // Get already added billing statement IDs for this wallet from documents
  const existingBillingStatementIds = useMemo(() => {
    if (!documents) return new Set<string>();

    const expenseReports = documents.filter(
      (doc: any) => doc.header.documentType === "powerhouse/expense-report",
    );

    const ids = new Set<string>();
    expenseReports.forEach((doc: any) => {
      const wallets = doc.state?.global?.wallets || [];
      const wallet = wallets.find((w: any) => w.wallet === walletAddress);
      if (wallet?.billingStatements) {
        wallet.billingStatements.forEach((id: string) => {
          if (id) ids.add(id);
        });
      }
    });

    return ids;
  }, [documents, walletAddress]);

  // Get billing statement documents from the drive, filtered by the Payments folder
  const billingStatements = useMemo(() => {
    if (!documents || !driveDocument) return [];

    // Get all file nodes from the drive
    const nodes = driveDocument.state.global.nodes;

    // If we have a payments folder ID, filter billing statements to only those in that folder
    // Otherwise, show all billing statements (fallback for editors used outside contributor billing)
    return documents
      .filter((doc: any) => {
        if (doc.header.documentType !== "powerhouse/billing-statement") {
          return false;
        }

        // If we have a payments folder, only include billing statements in that folder
        if (paymentsFolderId) {
          const fileNode = nodes.find(
            (node): node is FileNode =>
              isFileNodeKind(node) && node.id === doc.header.id,
          );
          return fileNode?.parentFolder === paymentsFolderId;
        }

        // Fallback: include all billing statements if no payments folder context
        return true;
      })
      .map((doc: any) => ({
        id: doc.header.id,
        name: doc.header.name,
        document: doc, // Full document with state
      }));
  }, [documents, driveDocument, paymentsFolderId]);

  // Filter billing statements based on search term
  const filteredStatements = useMemo(() => {
    if (!searchTerm.trim()) return billingStatements;
    const search = searchTerm.toLowerCase();
    return billingStatements.filter((stmt) =>
      stmt.name.toLowerCase().includes(search),
    );
  }, [billingStatements, searchTerm]);

  // Toggle statement selection
  const toggleStatement = (id: string) => {
    // Don't allow selecting already-added statements
    if (existingBillingStatementIds.has(id)) {
      return;
    }

    const newSelected = new Set(selectedStatements);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedStatements(newSelected);
  };

  // Format currency with thousand separators
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Map billing statement line item tag to expense report group
  const mapTagToGroup = (lineItem: BillingStatementLineItem): string | null => {
    // Find expense-account tag
    const expenseAccountTag = lineItem.lineItemTag?.find(
      (tag) => tag.dimension === "expense-account",
    );

    if (!expenseAccountTag || !expenseAccountTag.label) return null;

    // Find matching group by label
    const group = groups.find((g) => g.label === expenseAccountTag.label);
    return group ? group.id : null;
  };

  // Add selected billing statements to wallet
  const handleAddStatements = () => {
    if (selectedStatements.size === 0) return;

    // First, add all billing statement references
    selectedStatements.forEach((statementId) => {
      dispatch(
        actions.addBillingStatement({
          wallet: walletAddress,
          billingStatementId: statementId,
        }),
      );
    });

    // Aggregate line items by category across all selected billing statements
    const categoryAggregation = new Map<
      string,
      {
        groupId: string | null;
        groupLabel: string;
        budget: number;
        actuals: number;
        forecast: number;
        payments: number;
      }
    >();

    selectedStatements.forEach((statementId) => {
      const statement = billingStatements.find((s) => s.id === statementId);
      if (!statement || !statement.document) return;

      console.log("Statement document:", statement.document);

      // Extract line items from billing statement
      const billingState = statement.document;
      const lineItems = billingState.state?.global?.lineItems || [];

      console.log("Line items found:", lineItems.length, lineItems);

      // Aggregate line items by category
      lineItems.forEach((billingLineItem: BillingStatementLineItem) => {
        const groupId = mapTagToGroup(billingLineItem);
        const categoryKey = groupId || "uncategorized";

        const existing = categoryAggregation.get(categoryKey);

        if (existing) {
          // Aggregate values for the same category
          existing.actuals += billingLineItem.totalPriceCash || 0;
        } else {
          // Create new category entry
          const group = groups.find((g) => g.id === groupId);
          categoryAggregation.set(categoryKey, {
            groupId: groupId,
            groupLabel: group?.label || "Uncategorized",
            budget: 0,
            actuals: billingLineItem.totalPriceCash || 0,
            forecast: 0,
            payments: 0,
          });
        }
      });
    });

    // Now add aggregated line items to wallet
    categoryAggregation.forEach((aggregatedItem) => {
      const expenseLineItem = {
        id: generateId(),
        label: aggregatedItem.groupLabel,
        group: aggregatedItem.groupId,
        budget: aggregatedItem.budget,
        actuals: aggregatedItem.actuals,
        forecast: aggregatedItem.forecast,
        payments: aggregatedItem.payments,
        comments: null,
      };

      dispatch(
        actions.addLineItem({
          wallet: walletAddress,
          lineItem: expenseLineItem,
        }),
      );
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[80vh] bg-card rounded-lg shadow-2xl border border-border flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Add Billing Statements
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Select billing statements to add to wallet{" "}
              {walletAddress.substring(0, 10)}...
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-border">
          <div className="relative">
            <input
              type="text"
              placeholder="Search billing statements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-11 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto px-6 py-4">
          {filteredStatements.length > 0 ? (
            <div className="space-y-2">
              {filteredStatements.map((statement) => {
                const isAlreadyAdded = existingBillingStatementIds.has(
                  statement.id,
                );
                const isSelected = selectedStatements.has(statement.id);
                const billingState = statement.document;
                const lineItemCount =
                  billingState.state?.global?.lineItems?.length || 0;
                const totalCash = billingState.state?.global?.totalCash || 0;

                return (
                  <div
                    key={statement.id}
                    onClick={() => toggleStatement(statement.id)}
                    className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                      isAlreadyAdded
                        ? "border-border bg-muted opacity-60 cursor-not-allowed"
                        : isSelected
                          ? "border-primary bg-primary/10 cursor-pointer"
                          : "border-border hover:border-muted-foreground cursor-pointer"
                    }`}
                  >
                    {/* Checkbox */}
                    <div
                      className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center ${
                        isAlreadyAdded
                          ? "border-border bg-muted"
                          : isSelected
                            ? "bg-primary border-primary"
                            : "border-input"
                      }`}
                    >
                      {(isSelected || isAlreadyAdded) && (
                        <Check className="text-primary-foreground" size={14} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground truncate">
                          {statement.name}
                        </span>
                        <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
                          {lineItemCount} items
                        </span>
                        {isAlreadyAdded && (
                          <span className="text-xs text-status-warning px-2 py-1 bg-status-warning/20 rounded font-medium">
                            Already included
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span>Total: {formatCurrency(totalCash)}</span>
                        <span className="text-xs font-mono">
                          {statement.id.substring(0, 8)}...
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <FileText size={48} className="mb-4 opacity-50" />
              <p className="text-sm">
                {searchTerm
                  ? "No billing statements found matching your search"
                  : "No billing statements available in this drive"}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-muted/50">
          <span className="text-sm text-muted-foreground">
            {selectedStatements.size} statement
            {selectedStatements.size !== 1 ? "s" : ""} selected
          </span>
          <div className="flex gap-3">
            <Button onClick={onClose} variant="secondary">
              CANCEL
            </Button>
            <Button
              onClick={handleAddStatements}
              disabled={selectedStatements.size === 0}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              ADD{" "}
              {selectedStatements.size > 0 && `(${selectedStatements.size})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
