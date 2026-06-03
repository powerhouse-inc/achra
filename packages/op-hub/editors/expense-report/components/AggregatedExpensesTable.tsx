import { useMemo, useState, useRef, useEffect } from "react";
import React from "react";
import type {
  Wallet,
  LineItemGroup,
  LineItem,
} from "../../../document-models/expense-report/v1/gen/types.js";
import { actions } from "document-models/expense-report";
import { Textarea, Select, Button } from "@powerhousedao/document-engineering";
import { Plus, Trash2 } from "lucide-react";
import { generateId } from "document-model";

interface AggregatedExpensesTableProps {
  wallets: Wallet[];
  groups: LineItemGroup[];
  periodStart?: string | null;
  periodEnd?: string | null;
  dispatch: (action: any) => void;
}

interface LineItemWithGroupInfo extends LineItem {
  parentGroupId?: string | null;
  parentGroupLabel?: string;
  groupLabel?: string;
}

export function AggregatedExpensesTable({
  wallets,
  groups,
  dispatch,
}: AggregatedExpensesTableProps) {
  // State for active tab (selected wallet)
  const [activeWalletIndex, setActiveWalletIndex] = useState(0);

  // State for editing comments
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string>("");
  const [originalComment, setOriginalComment] = useState<string>("");

  // State for editing numeric fields
  const [editingField, setEditingField] = useState<{
    lineItemId: string;
    field: "budget" | "forecast" | "actuals" | "payments";
    originalValue: number;
  } | null>(null);
  const [editingValue, setEditingValue] = useState<string>("");

  // State for adding new line item
  const [isAddingLineItem, setIsAddingLineItem] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string>("");
  const [duplicateCategoryError, setDuplicateCategoryError] =
    useState<string>("");

  // State for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [lineItemToDelete, setLineItemToDelete] = useState<{
    id: string;
    label: string;
  } | null>(null);

  // Ref for line item editor to scroll into view
  const lineItemEditorRef = useRef<HTMLTableRowElement>(null);

  // Scroll to bottom of page when editor opens
  useEffect(() => {
    if (isAddingLineItem && lineItemEditorRef.current) {
      // Use a slight delay to ensure the editor is rendered
      setTimeout(() => {
        // Find the scrollable container by traversing up from the ref
        let element = lineItemEditorRef.current?.parentElement;
        while (element) {
          const style = window.getComputedStyle(element);
          const isScrollable =
            style.overflow === "auto" ||
            style.overflow === "scroll" ||
            style.overflowY === "auto" ||
            style.overflowY === "scroll";
          if (isScrollable && element.scrollHeight > element.clientHeight) {
            // Found the scrollable container, scroll to bottom
            element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
            break;
          }
          element = element.parentElement;
        }
      }, 150);
    }
  }, [isAddingLineItem]);

  // Get existing category IDs for the active wallet
  const existingCategoryIds = useMemo(() => {
    const wallet = wallets[activeWalletIndex];
    if (!wallet || !wallet.lineItems) return new Set<string>();

    return new Set(
      wallet.lineItems
        .filter(
          (item): item is NonNullable<typeof item> =>
            item !== null && item !== undefined,
        )
        .map((item) => item.group)
        .filter((group): group is string => !!group),
    );
  }, [wallets, activeWalletIndex]);

  // Create group options for Select component
  const groupOptions = useMemo(() => {
    return groups.map((group) => ({
      value: group.id,
      label: group.label || group.id,
    }));
  }, [groups]);

  // Handle category selection with duplicate check
  const handleCategoryChange = (value: string) => {
    setSelectedGroupId(value);

    // Check if category already exists
    if (existingCategoryIds.has(value)) {
      const categoryLabel = groups.find((g) => g.id === value)?.label || value;
      setDuplicateCategoryError(
        `"${categoryLabel}" already exists in this wallet. Please select a different category.`,
      );
    } else {
      setDuplicateCategoryError("");
    }
  };

  // Handle saving new line item
  const handleSaveLineItem = () => {
    const wallet = wallets[activeWalletIndex];
    if (!wallet || !wallet.wallet || !selectedGroupId) return;

    // Prevent saving if duplicate
    if (existingCategoryIds.has(selectedGroupId)) {
      return;
    }

    const newLineItem = {
      id: generateId(),
      label: groups.find((g) => g.id === selectedGroupId)?.label || "",
      group: selectedGroupId,
      budget: 0,
      actuals: 0,
      forecast: 0,
      payments: 0,
      comments: "",
    };

    dispatch(
      actions.addLineItem({
        wallet: wallet.wallet,
        lineItem: newLineItem,
      }),
    );

    // Reset state
    setIsAddingLineItem(false);
    setSelectedGroupId("");
    setDuplicateCategoryError("");
  };

  // Handle canceling new line item
  const handleCancelLineItem = () => {
    setIsAddingLineItem(false);
    setSelectedGroupId("");
    setDuplicateCategoryError("");
  };

  // Handle opening delete confirmation modal
  const handleDeleteLineItem = (lineItemId: string, lineItemLabel: string) => {
    setLineItemToDelete({ id: lineItemId, label: lineItemLabel });
    setDeleteModalOpen(true);
  };

  // Handle confirming deletion
  const handleConfirmDelete = () => {
    const wallet = wallets[activeWalletIndex];
    if (!wallet || !wallet.wallet || !lineItemToDelete) return;

    dispatch(
      actions.removeLineItem({
        wallet: wallet.wallet,
        lineItemId: lineItemToDelete.id,
      }),
    );

    // Close modal and reset state
    setDeleteModalOpen(false);
    setLineItemToDelete(null);
  };

  // Handle canceling deletion
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setLineItemToDelete(null);
  };

  // Format period for title

  // Create a map of groups with their parent info
  const groupsMap = useMemo(() => {
    const map = new Map<
      string,
      { group: LineItemGroup; parent?: LineItemGroup }
    >();

    groups.forEach((group) => {
      map.set(group.id, { group });
    });

    // Add parent references
    groups.forEach((group) => {
      if (group.parentId) {
        const entry = map.get(group.id);
        const parentEntry = map.get(group.parentId);
        if (entry && parentEntry) {
          entry.parent = parentEntry.group;
        }
      }
    });

    return map;
  }, [groups]);

  // Get line items for the active wallet with group information
  // Line items are now already aggregated by category
  const walletLineItems = useMemo(() => {
    if (!wallets[activeWalletIndex]) return [];

    const wallet = wallets[activeWalletIndex];
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
  }, [wallets, activeWalletIndex, groupsMap]);

  // Group line items by parent category
  // Line items are already aggregated by category, so we just need to group them by parent
  const groupedAndAggregatedItems = useMemo(() => {
    const grouped = new Map<
      string,
      Array<{
        lineItemId: string;
        groupId: string;
        groupLabel: string;
        parentGroupId: string | null | undefined;
        parentGroupLabel: string | undefined;
        budget: number;
        forecast: number;
        actuals: number;
        payments: number;
        comment: string;
      }>
    >();

    walletLineItems.forEach((item) => {
      if (!item) return;

      const parentKey = item.parentGroupId || "uncategorized";
      const items = grouped.get(parentKey) || [];

      items.push({
        lineItemId: item.id || "",
        groupId: item.group || "uncategorized",
        groupLabel: item.groupLabel || "Uncategorized",
        parentGroupId: item.parentGroupId,
        parentGroupLabel: item.parentGroupLabel,
        budget: item.budget || 0,
        forecast: item.forecast || 0,
        actuals: item.actuals || 0,
        payments: item.payments || 0,
        comment: item.comments || "",
      });

      grouped.set(parentKey, items);
    });

    return grouped;
  }, [walletLineItems]);

  // Calculate subtotals for each parent group
  const calculateSubtotal = (
    items: Array<{
      budget: number;
      forecast: number;
      actuals: number;
      payments: number;
      [key: string]: any;
    }>,
  ) => {
    return items.reduce(
      (acc, item) => ({
        budget: acc.budget + item.budget,
        forecast: acc.forecast + item.forecast,
        actuals: acc.actuals + item.actuals,
        difference: acc.difference + (item.forecast - item.actuals),
        payments: acc.payments + item.payments,
      }),
      { budget: 0, forecast: 0, actuals: 0, difference: 0, payments: 0 },
    );
  };

  // Calculate grand totals
  const grandTotals = useMemo(() => {
    return walletLineItems.reduce(
      (acc, item) => ({
        budget: acc.budget + (item?.budget || 0),
        forecast: acc.forecast + (item?.forecast || 0),
        actuals: acc.actuals + (item?.actuals || 0),
        difference:
          acc.difference + ((item?.forecast || 0) - (item?.actuals || 0)),
        payments: acc.payments + (item?.payments || 0),
      }),
      { budget: 0, forecast: 0, actuals: 0, difference: 0, payments: 0 },
    );
  }, [walletLineItems]);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatWalletAddress = (address: string) => {
    if (!address || address.length < 13) return address;
    return `${address.substring(0, 6)}...${address.substring(address.length - 6)}`;
  };

  // Handle starting comment edit
  const handleStartEdit = (lineItemId: string, currentComment: string) => {
    setEditingGroupId(lineItemId);
    setEditingComment(currentComment);
    setOriginalComment(currentComment);
  };

  // Handle saving comment for a single line item
  const handleSaveComment = () => {
    const wallet = wallets[activeWalletIndex];
    if (!wallet || !wallet.wallet || !editingGroupId) return;

    // Only dispatch if the comment has actually changed
    if (editingComment !== originalComment) {
      dispatch(
        actions.updateLineItem({
          wallet: wallet.wallet,
          lineItemId: editingGroupId,
          comments: editingComment,
        }),
      );
    }

    // Reset editing state
    setEditingGroupId(null);
    setEditingComment("");
    setOriginalComment("");
  };

  // Handle canceling comment edit
  const handleCancelEdit = () => {
    setEditingGroupId(null);
    setEditingComment("");
    setOriginalComment("");
  };

  // Handle starting numeric field edit
  const handleStartFieldEdit = (
    lineItemId: string,
    field: "budget" | "forecast" | "actuals" | "payments",
    currentValue: number,
  ) => {
    setEditingField({ lineItemId, field, originalValue: currentValue });
    setEditingValue(currentValue.toString());
  };

  // Handle saving numeric field
  const handleSaveField = () => {
    const wallet = wallets[activeWalletIndex];
    if (!wallet || !wallet.wallet || !editingField) return;

    const numericValue = parseFloat(editingValue);
    if (isNaN(numericValue)) {
      // Invalid number, cancel edit
      handleCancelFieldEdit();
      return;
    }

    // Only dispatch if the value has actually changed
    if (numericValue !== editingField.originalValue) {
      dispatch(
        actions.updateLineItem({
          wallet: wallet.wallet,
          lineItemId: editingField.lineItemId,
          [editingField.field]: numericValue,
        }),
      );
    }

    // Reset editing state
    setEditingField(null);
    setEditingValue("");
  };

  // Handle canceling numeric field edit
  const handleCancelFieldEdit = () => {
    setEditingField(null);
    setEditingValue("");
  };

  // Sort parent groups: Headcount first, then Non-Headcount, then others, then uncategorized
  const sortedParentKeys = useMemo(() => {
    const keys = Array.from(groupedAndAggregatedItems.keys());

    // Find Headcount and Non-Headcount group IDs
    const headcountGroup = groups.find((g) => g.label === "Headcount Expenses");
    const nonHeadcountGroup = groups.find(
      (g) => g.label === "Non-Headcount Expenses",
    );

    return keys.sort((a, b) => {
      // Uncategorized always goes last
      if (a === "uncategorized") return 1;
      if (b === "uncategorized") return -1;

      // Headcount Expenses always first
      if (a === headcountGroup?.id) return -1;
      if (b === headcountGroup?.id) return 1;

      // Non-Headcount Expenses always second
      if (a === nonHeadcountGroup?.id) return -1;
      if (b === nonHeadcountGroup?.id) return 1;

      // For other groups, maintain their original order
      return 0;
    });
  }, [groupedAndAggregatedItems, groups]);

  if (wallets.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Wallet Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {wallets.map((wallet, index) => {
            const isActive = index === activeWalletIndex;
            return (
              <button
                key={wallet.wallet || index}
                onClick={() => setActiveWalletIndex(index)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${
                    isActive
                      ? "border-green-500 text-green-600 dark:text-green-400"
                      : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }
                `}
              >
                {wallet.name || formatWalletAddress(wallet.wallet || "")}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="pl-6 pr-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsAddingLineItem(true)}
                    className="inline-flex items-center justify-center w-6 h-6 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                  <span>Expense Category</span>
                </div>
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Budget Allocation
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Forecast
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actuals
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Difference
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-96">
                Comments
              </th>
              <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-32">
                Payments
              </th>
              <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-16">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedParentKeys.map((parentKey) => {
              const items = groupedAndAggregatedItems.get(parentKey) || [];
              if (items.length === 0) return null;

              const subtotals = calculateSubtotal(items);
              const parentLabel =
                parentKey === "uncategorized"
                  ? "Uncategorized"
                  : items[0]?.parentGroupLabel || "Other";

              return (
                <React.Fragment key={parentKey}>
                  {/* Parent Category Header */}
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <td
                      colSpan={8}
                      className="px-6 py-3 text-sm font-bold text-gray-900 dark:text-white"
                    >
                      {parentLabel}
                    </td>
                  </tr>

                  {/* Aggregated Category Items */}
                  {items.map((item) => {
                    if (!item) return null;

                    const difference = item.forecast - item.actuals;
                    const isEditingComment = editingGroupId === item.lineItemId;

                    // Helper function to render editable numeric cell
                    const renderEditableCell = (
                      field: "budget" | "forecast" | "actuals" | "payments",
                      value: number,
                    ) => {
                      const isEditingThis =
                        editingField?.lineItemId === item.lineItemId &&
                        editingField?.field === field;

                      if (isEditingThis) {
                        return (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              step="0.01"
                              value={editingValue}
                              onChange={(e) => setEditingValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  handleSaveField();
                                } else if (e.key === "Escape") {
                                  handleCancelFieldEdit();
                                }
                              }}
                              onBlur={handleSaveField}
                              autoFocus
                              className="w-full px-2 py-1 text-right text-sm border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            />
                          </div>
                        );
                      }

                      return (
                        <div
                          className="group cursor-pointer text-right"
                          onClick={() =>
                            handleStartFieldEdit(item.lineItemId, field, value)
                          }
                        >
                          <span className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 inline-block px-1 py-0.5 rounded transition-colors min-w-[4rem]">
                            {formatNumber(value)}
                          </span>
                        </div>
                      );
                    };

                    return (
                      <tr
                        key={item.lineItemId}
                        className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors align-top"
                      >
                        <td className="pl-6 pr-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {item.groupLabel}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                          {renderEditableCell("budget", item.budget)}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                          {renderEditableCell("forecast", item.forecast)}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                          {renderEditableCell("actuals", item.actuals)}
                        </td>
                        <td
                          className={`px-3 py-3 whitespace-nowrap text-right text-sm font-medium ${
                            difference < 0
                              ? "text-red-600 dark:text-red-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {formatNumber(difference)}
                        </td>
                        <td className="px-3 py-3 text-sm w-96">
                          {isEditingComment ? (
                            <Textarea
                              value={editingComment}
                              onChange={(e) =>
                                setEditingComment(e.target.value)
                              }
                              placeholder="Add comment..."
                              autoExpand={true}
                              multiline={true}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSaveComment();
                                } else if (e.key === "Escape") {
                                  handleCancelEdit();
                                } else if (e.key === "Tab") {
                                  e.preventDefault();
                                  handleSaveComment();
                                }
                              }}
                              onBlur={handleSaveComment}
                              autoFocus
                              className="w-full px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white max-h-32 overflow-y-auto"
                            />
                          ) : (
                            <div
                              className="group cursor-pointer w-full max-h-20 overflow-hidden"
                              onClick={() =>
                                handleStartEdit(item.lineItemId, item.comment)
                              }
                              title={item.comment || "No comments"}
                            >
                              <span className="group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 px-1 py-0.5 rounded transition-colors block text-gray-600 dark:text-gray-400 break-words">
                                {item.comment || "No comments"}
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white w-32">
                          {renderEditableCell("payments", item.payments)}
                        </td>
                        <td className="px-2 py-3 whitespace-nowrap text-center w-16">
                          <button
                            onClick={() =>
                              handleDeleteLineItem(
                                item.lineItemId,
                                item.groupLabel,
                              )
                            }
                            className="inline-flex items-center justify-center p-0.5 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            title="Delete line item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {/* Subtotal Row */}
                  <tr className="bg-gray-50 dark:bg-gray-800/50 font-semibold align-top">
                    <td className="pl-6 pr-3 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      Subtotal
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      <div className="text-right">
                        <span className="inline-block px-1 py-0.5 min-w-[4rem]">
                          {formatNumber(subtotals.budget)}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      <div className="text-right">
                        <span className="inline-block px-1 py-0.5 min-w-[4rem]">
                          {formatNumber(subtotals.forecast)}
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                      <div className="text-right">
                        <span className="inline-block px-1 py-0.5 min-w-[4rem]">
                          {formatNumber(subtotals.actuals)}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-3 py-3 whitespace-nowrap text-right text-sm font-bold ${
                        subtotals.difference < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {formatNumber(subtotals.difference)}
                    </td>
                    <td className="px-3 py-3"></td>
                    <td className="px-3 py-3 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white w-32">
                      <div className="text-right">
                        <span className="inline-block px-1 py-0.5 min-w-[4rem]">
                          {formatNumber(subtotals.payments)}
                        </span>
                      </div>
                    </td>
                    <td className="px-2 py-3"></td>
                  </tr>
                </React.Fragment>
              );
            })}

            {/* Grand Total Row */}
            <tr className="bg-gray-100 dark:bg-gray-800 font-bold align-top">
              <td className="pl-6 pr-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                Total
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                <div className="text-right">
                  <span className="inline-block px-1 py-0.5 min-w-[4rem]">
                    {formatNumber(grandTotals.budget)}
                  </span>
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                <div className="text-right">
                  <span className="inline-block px-1 py-0.5 min-w-[4rem]">
                    {formatNumber(grandTotals.forecast)}
                  </span>
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                <div className="text-right">
                  <span className="inline-block px-1 py-0.5 min-w-[4rem]">
                    {formatNumber(grandTotals.actuals)}
                  </span>
                </div>
              </td>
              <td
                className={`px-3 py-4 whitespace-nowrap text-right text-sm ${
                  grandTotals.difference < 0
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {formatNumber(grandTotals.difference)}
              </td>
              <td className="px-3 py-4"></td>
              <td className="px-3 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white w-32">
                <div className="text-right">
                  <span className="inline-block px-1 py-0.5 min-w-[4rem]">
                    {formatNumber(grandTotals.payments)}
                  </span>
                </div>
              </td>
              <td className="px-2 py-4"></td>
            </tr>

            {/* Line Item Editor Row */}
            {isAddingLineItem && (
              <tr
                ref={lineItemEditorRef}
                className="bg-white dark:bg-gray-900 border-t border-gray-900 dark:border-gray-100"
              >
                <td colSpan={8} className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex items-end gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Select Category
                        </label>
                        <Select
                          name="category"
                          searchable={true}
                          value={selectedGroupId}
                          onChange={(value: string | string[]) =>
                            handleCategoryChange(value as string)
                          }
                          options={groupOptions}
                          placeholder="Choose a category..."
                          className="w-full"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSaveLineItem}
                          disabled={
                            !selectedGroupId || !!duplicateCategoryError
                          }
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          SAVE
                        </Button>
                        <Button
                          onClick={handleCancelLineItem}
                          variant="secondary"
                        >
                          CANCEL
                        </Button>
                      </div>
                    </div>
                    {duplicateCategoryError && (
                      <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                        <span className="text-sm text-amber-800 dark:text-amber-200">
                          {duplicateCategoryError}
                        </span>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && lineItemToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCancelDelete}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Delete Line Item
              </h3>
            </div>

            {/* Content */}
            <div className="px-6 py-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete the line item{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  "{lineItemToDelete.label}"
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <Button onClick={handleCancelDelete} variant="secondary">
                CANCEL
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                DELETE
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
