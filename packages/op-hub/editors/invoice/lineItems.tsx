import { usePHToast } from "@powerhousedao/reactor-browser";
import { Button as RWAButton } from "@powerhousedao/design-system/ui";
import {
  type DeleteLineItemInput,
  type EditInvoiceInput,
  type InvoiceTag,
} from "document-models/invoice";
import {
  forwardRef,
  useState,
  useMemo,
  useRef,
  type Dispatch,
  useEffect,
} from "react";
import { generateId } from "document-model";
import { Tag } from "lucide-react";
import { NumberForm } from "./components/numberForm.js";
import { InputField } from "./components/inputField.js";
import { LineItemTagsTable } from "./lineItemTags/lineItemTags.js";
import { LineItemsEmptyState } from "./components/lineItemsEmptyState.js";

// Helper function to get precision based on currency
function getCurrencyPrecision(currency: string): number {
  return currency === "USDS" || currency === "DAI" ? 6 : 2;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

type LineItem = {
  currency: string;
  description: string;
  id: string;
  quantity: number;
  taxPercent: number;
  totalPriceTaxExcl: number;
  totalPriceTaxIncl: number;
  unitPriceTaxExcl: number;
  unitPriceTaxIncl: number;
  lineItemTag: InvoiceTag[];
};

type EditableLineItem = {
  currency: string;
  description: string;
  id: string;
  quantity: number | string;
  taxPercent: number | string;
  totalPriceTaxExcl: number | string;
  totalPriceTaxIncl: number | string;
  unitPriceTaxExcl: number | string;
};

type EditableLineItemProps = {
  readonly item: Partial<LineItem>;
  readonly onSave: (item: LineItem) => void;
  readonly onCancel: () => void;
  readonly currency: string;
  readonly onEditingItemChange?: (
    values: {
      id: string;
      quantity: number;
      unitPriceTaxExcl: number;
      unitPriceTaxIncl: number;
    } | null,
  ) => void;
};

const EditableLineItem = forwardRef(function EditableLineItem(
  props: EditableLineItemProps,
  ref: React.Ref<HTMLTableRowElement>,
) {
  const { item, onSave, onCancel, currency, onEditingItemChange } = props;
  const [editedItem, setEditedItem] = useState<Partial<EditableLineItem>>({
    ...item,
    currency,
    quantity: item.quantity ?? 1,
    taxPercent: item.taxPercent ?? "",
    unitPriceTaxExcl: item.unitPriceTaxExcl ?? "",
    totalPriceTaxExcl: item.totalPriceTaxExcl ?? "",
    totalPriceTaxIncl: item.totalPriceTaxIncl ?? "",
  });

  const calculatedValues = useMemo(() => {
    const quantity =
      typeof editedItem.quantity === "string"
        ? editedItem.quantity === ""
          ? 1
          : Number(editedItem.quantity) || 1
        : (editedItem.quantity ?? 1);

    const unitPriceTaxExcl =
      typeof editedItem.unitPriceTaxExcl === "string"
        ? editedItem.unitPriceTaxExcl === ""
          ? 0
          : Number(editedItem.unitPriceTaxExcl)
        : (editedItem.unitPriceTaxExcl ?? 0);

    const taxPercent =
      typeof editedItem.taxPercent === "string"
        ? editedItem.taxPercent === ""
          ? 0
          : Number(editedItem.taxPercent)
        : (editedItem.taxPercent ?? 0);

    const totalPriceTaxExcl =
      typeof editedItem.totalPriceTaxExcl === "string"
        ? editedItem.totalPriceTaxExcl === ""
          ? 0
          : Number(editedItem.totalPriceTaxExcl)
        : (editedItem.totalPriceTaxExcl ?? 0);

    const totalPriceTaxIncl =
      typeof editedItem.totalPriceTaxIncl === "string"
        ? editedItem.totalPriceTaxIncl === ""
          ? 0
          : Number(editedItem.totalPriceTaxIncl)
        : (editedItem.totalPriceTaxIncl ?? 0);

    const taxRate = taxPercent / 100;

    // Helper function to compare floating point numbers

    // Check if user explicitly edited any fields
    const userEditedQuantity =
      editedItem.quantity !== undefined &&
      editedItem.quantity !== item.quantity;
    const userEditedUnitPriceTaxExcl =
      editedItem.unitPriceTaxExcl !== undefined &&
      editedItem.unitPriceTaxExcl !== item.unitPriceTaxExcl;
    const userEditedTotalPriceTaxExcl =
      editedItem.totalPriceTaxExcl !== undefined &&
      editedItem.totalPriceTaxExcl !== item.totalPriceTaxExcl;
    const userEditedTotalPriceTaxIncl =
      editedItem.totalPriceTaxIncl !== undefined &&
      editedItem.totalPriceTaxIncl !== item.totalPriceTaxIncl;

    let finalUnitPriceTaxExcl = unitPriceTaxExcl;
    let finalUnitPriceTaxIncl = unitPriceTaxExcl * (1 + taxRate);
    let finalTotalPriceTaxExcl = quantity * unitPriceTaxExcl;
    let finalTotalPriceTaxIncl = quantity * finalUnitPriceTaxIncl;

    // If user explicitly edited totalPriceTaxExcl, use that value and calculate unit price
    if (userEditedTotalPriceTaxExcl && totalPriceTaxExcl !== 0) {
      finalTotalPriceTaxExcl = totalPriceTaxExcl;
      finalUnitPriceTaxExcl = totalPriceTaxExcl / quantity;
      finalUnitPriceTaxIncl = finalUnitPriceTaxExcl * (1 + taxRate);
      finalTotalPriceTaxIncl = quantity * finalUnitPriceTaxIncl;
    }
    // If user explicitly edited totalPriceTaxIncl, use that value and calculate unit price
    else if (userEditedTotalPriceTaxIncl && totalPriceTaxIncl !== 0) {
      finalTotalPriceTaxIncl = totalPriceTaxIncl;
      finalUnitPriceTaxIncl = totalPriceTaxIncl / quantity;
      finalUnitPriceTaxExcl = finalUnitPriceTaxIncl / (1 + taxRate);
      finalTotalPriceTaxExcl = quantity * finalUnitPriceTaxExcl;
    }
    // If user explicitly edited unitPriceTaxExcl, use that value and calculate totals
    else if (userEditedUnitPriceTaxExcl && unitPriceTaxExcl !== 0) {
      finalUnitPriceTaxExcl = unitPriceTaxExcl;
      finalUnitPriceTaxIncl = unitPriceTaxExcl * (1 + taxRate);
      finalTotalPriceTaxExcl = quantity * finalUnitPriceTaxExcl;
      finalTotalPriceTaxIncl = quantity * finalUnitPriceTaxIncl;
    }
    // If user explicitly edited quantity, recalculate totals
    else if (userEditedQuantity) {
      finalTotalPriceTaxExcl = quantity * finalUnitPriceTaxExcl;
      finalTotalPriceTaxIncl = quantity * finalUnitPriceTaxIncl;
    }

    return {
      quantity: quantity,
      taxPercent: taxPercent,
      totalPriceTaxExcl: finalTotalPriceTaxExcl,
      totalPriceTaxIncl: finalTotalPriceTaxIncl,
      unitPriceTaxIncl: finalUnitPriceTaxIncl,
      unitPriceTaxExcl: finalUnitPriceTaxExcl,
    };
  }, [
    editedItem.quantity,
    editedItem.unitPriceTaxExcl,
    editedItem.taxPercent,
    editedItem.totalPriceTaxExcl,
    editedItem.totalPriceTaxIncl,
    item.quantity,
    item.unitPriceTaxExcl,
    item.totalPriceTaxExcl,
    item.totalPriceTaxIncl,
  ]);

  // Update parent component with current editing values for live totals
  useEffect(() => {
    if (onEditingItemChange && item.id) {
      onEditingItemChange({
        id: item.id,
        quantity: calculatedValues.quantity,
        unitPriceTaxExcl: calculatedValues.unitPriceTaxExcl,
        unitPriceTaxIncl: calculatedValues.unitPriceTaxIncl,
      });
    }
  }, [
    calculatedValues.quantity,
    calculatedValues.unitPriceTaxExcl,
    calculatedValues.unitPriceTaxIncl,
    onEditingItemChange,
    item.id,
  ]);

  // Clean up when component unmounts
  useEffect(() => {
    return () => {
      if (onEditingItemChange && item.id) {
        onEditingItemChange(null);
      }
    };
  }, [onEditingItemChange, item.id]);

  /**
   * Parses a numeric string, stripping thousand-separator commas
   * and rounding to the given precision.
   * Returns NaN if the string is not a valid number.
   */
  function parseNumericInput(raw: string, precision: number): number {
    // Strip thousand-separator commas
    const cleaned = raw.replace(/,/g, "");
    const num = parseFloat(cleaned);
    if (isNaN(num)) return NaN;
    // Round to desired precision
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
  }

  function handleInputChange(field: keyof EditableLineItem) {
    return function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const raw = event.target.value;
      // Strip thousand-separator commas for all processing
      const value = raw.replace(/,/g, "");

      if (field === "description") {
        setEditedItem((prev) => ({ ...prev, [field]: value }));
        return;
      }

      // Allow empty and zero for non-quantity fields
      if (field !== "quantity" && (value === "" || value === "0")) {
        setEditedItem((prev) => ({ ...prev, [field]: value }));
        return;
      }

      if (field === "quantity") {
        if (value === "" || value === "0") {
          setEditedItem((prev) => ({ ...prev, [field]: 1 }));
        } else {
          const num = parseNumericInput(value, 2);
          if (!isNaN(num)) {
            setEditedItem((prev) => ({ ...prev, [field]: num || 1 }));
          }
        }
      } else if (field === "taxPercent") {
        const numValue = parseInt(value, 10);
        if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
          setEditedItem((prev) => ({ ...prev, [field]: value }));
        }
      } else if (
        field === "unitPriceTaxExcl" ||
        field === "totalPriceTaxExcl" ||
        field === "totalPriceTaxIncl"
      ) {
        const maxDecimals = getCurrencyPrecision(currency);
        // Allow typing in progress (e.g. "12." or "-")
        if (/^-?\d*\.?\d*$/.test(value)) {
          // If it's a complete number, round to precision
          const num = parseNumericInput(value, maxDecimals);
          if (
            !isNaN(num) ||
            value === "" ||
            value === "-" ||
            value.endsWith(".")
          ) {
            const storeValue =
              value.endsWith(".") || value === "-" ? value : num;
            setEditedItem((prev) => ({
              ...prev,
              [field]:
                field === "totalPriceTaxExcl"
                  ? Number(storeValue) || 0
                  : storeValue,
            }));
          }
        } else {
          // Pasted value with commas already stripped — try to parse directly
          const num = parseNumericInput(value, maxDecimals);
          if (!isNaN(num)) {
            setEditedItem((prev) => ({
              ...prev,
              [field]: field === "totalPriceTaxExcl" ? num : num,
            }));
          }
        }
      } else {
        // For other decimal fields
        const num = parseNumericInput(value, 2);
        if (
          !isNaN(num) ||
          value === "" ||
          value === "-" ||
          value.endsWith(".")
        ) {
          setEditedItem((prev) => ({
            ...prev,
            [field]: isNaN(num) ? value : value,
          }));
        }
      }
    };
  }

  function handleSave() {
    const isNewItem = !item.id;

    // For new items, always include all required fields
    if (isNewItem) {
      onSave({
        id: editedItem.id ?? generateId(),
        currency,
        description: editedItem.description ?? "",
        quantity: calculatedValues.quantity,
        taxPercent: calculatedValues.taxPercent,
        unitPriceTaxExcl: calculatedValues.unitPriceTaxExcl,
        unitPriceTaxIncl: calculatedValues.unitPriceTaxIncl,
        totalPriceTaxExcl: calculatedValues.totalPriceTaxExcl,
        totalPriceTaxIncl: calculatedValues.totalPriceTaxIncl,
        lineItemTag: [],
      });
      return;
    }

    // For edits, only send changed fields
    const isClose = (a: number, b: number) => Math.abs(a - b) < 0.00001;

    const updateInput: any = {
      id: editedItem.id,
      currency,
    };

    if (
      editedItem.description !== undefined &&
      editedItem.description !== item.description
    ) {
      updateInput.description = editedItem.description ?? "";
    }

    if (!isClose(calculatedValues.quantity, item.quantity ?? 0)) {
      updateInput.quantity = calculatedValues.quantity;
    }

    if (!isClose(calculatedValues.taxPercent, item.taxPercent ?? 0)) {
      updateInput.taxPercent = calculatedValues.taxPercent;
    }

    if (
      !isClose(calculatedValues.unitPriceTaxExcl, item.unitPriceTaxExcl ?? 0)
    ) {
      updateInput.unitPriceTaxExcl = calculatedValues.unitPriceTaxExcl;
    }

    if (
      !isClose(calculatedValues.unitPriceTaxIncl, item.unitPriceTaxIncl ?? 0)
    ) {
      updateInput.unitPriceTaxIncl = calculatedValues.unitPriceTaxIncl;
    }

    if (
      !isClose(calculatedValues.totalPriceTaxExcl, item.totalPriceTaxExcl ?? 0)
    ) {
      updateInput.totalPriceTaxExcl = calculatedValues.totalPriceTaxExcl;
    }

    if (
      !isClose(calculatedValues.totalPriceTaxIncl, item.totalPriceTaxIncl ?? 0)
    ) {
      updateInput.totalPriceTaxIncl = calculatedValues.totalPriceTaxIncl;
    }

    onSave(updateInput);
  }

  return (
    <tr ref={ref} className="hover:bg-gray-50 table-row">
      <td className="border border-gray-200 p-3 table-cell">
        <InputField
          onBlur={() => {}}
          handleInputChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setEditedItem((prev) => ({ ...prev, description: e.target.value }));
          }}
          value={editedItem.description ?? ""}
          placeholder="Description"
          className=""
        />
      </td>
      <td className="border border-gray-200 p-3 table-cell">
        <NumberForm
          number={calculatedValues.quantity || 1}
          precision={2}
          handleInputChange={handleInputChange("quantity")}
          placeholder="Quantity"
          className=""
        />
      </td>
      <td className="border border-gray-200 p-3 table-cell">
        <NumberForm
          number={
            calculatedValues.unitPriceTaxExcl % 1 === 0
              ? calculatedValues.unitPriceTaxExcl.toString()
              : calculatedValues.unitPriceTaxExcl.toFixed(2)
          }
          precision={2}
          handleInputChange={handleInputChange("unitPriceTaxExcl")}
          pattern="^-?\d*\.?\d*$"
          placeholder="Unit Price (excl. tax)"
          className=""
        />
      </td>
      <td className="border border-gray-200 p-3 text-right font-medium table-cell">
        <NumberForm
          number={calculatedValues.taxPercent}
          precision={0}
          pattern="^(100|[1-9]?[0-9])$"
          handleInputChange={handleInputChange("taxPercent")}
          placeholder="Tax %"
          className=""
        />
      </td>
      <td className="border border-gray-200 p-3 text-right font-medium table-cell">
        <NumberForm
          number={
            calculatedValues.totalPriceTaxExcl % 1 === 0
              ? calculatedValues.totalPriceTaxExcl.toString()
              : calculatedValues.totalPriceTaxExcl.toFixed(2)
          }
          precision={2}
          handleInputChange={handleInputChange("totalPriceTaxExcl")}
          pattern="^-?\d*\.?\d*$"
          placeholder="Total (excl. tax)"
          className=""
        />
      </td>
      <td className="border border-gray-200 p-3 text-right font-medium table-cell">
        <NumberForm
          number={
            calculatedValues.totalPriceTaxIncl % 1 === 0
              ? calculatedValues.totalPriceTaxIncl.toString()
              : calculatedValues.totalPriceTaxIncl.toFixed(2)
          }
          precision={2}
          handleInputChange={handleInputChange("totalPriceTaxIncl")}
          pattern="^-?\d*\.?\d*$"
          placeholder="Total (incl. tax)"
          className=""
        />
      </td>
      <td className="border border-gray-200 p-3 table-cell">
        <div className="flex space-x-2">
          <button
            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-700"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
});

type LineItemsTableProps = {
  readonly lineItems: LineItem[];
  readonly currency: string;
  readonly onAddItem: (item: LineItem) => void;
  readonly onUpdateItem: (item: LineItem) => void;
  readonly onDeleteItem: (input: DeleteLineItemInput) => void;
  readonly onUpdateCurrency: (input: EditInvoiceInput) => void;
  readonly onEditingItemChange?: (
    values: {
      id: string;
      quantity: number;
      unitPriceTaxExcl: number;
      unitPriceTaxIncl: number;
    } | null,
  ) => void;
  readonly dispatch: Dispatch<any>;
  readonly paymentAccounts: InvoiceTag[];
};

export function LineItemsTable({
  lineItems,
  currency,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onEditingItemChange,
  dispatch,
  paymentAccounts,
}: LineItemsTableProps) {
  const toast = usePHToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showTagTable, setShowTagTable] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  function handleAddClick() {
    setIsAddingNew(true);
  }

  function handleSaveNewItem(item: LineItem) {
    try {
      onAddItem(item);
    } catch (error: any) {
      if (error?.message?.includes("Invalid action input:")) {
        try {
          const errorPart = error.message.split("Invalid action input: ")[1];
          const zodError = JSON.parse(errorPart);
          if (Array.isArray(zodError) && zodError.length > 0) {
            const firstError = zodError[0];
            const errorJSX = (
              <div>
                <p className="font-semibold">Failed to add line item</p>
                <p>{firstError.message}: </p>
                {zodError.map((err: any, index: number) => (
                  <ul key={index}>
                    <li className="text-red-500 font-semibold">
                      - {err.path.join(".")}
                    </li>
                  </ul>
                ))}
              </div>
            );

            toast?.(errorJSX, {
              type: "error",
            });
            return;
          }
        } catch (parseError) {
          console.error("Failed to parse Zod error:", parseError);
          toast?.("Invalid input data", {
            type: "error",
          });
          return;
        }
      } else if (error?.message) {
        toast?.(error.message, {
          type: "error",
        });
        return;
      }

      toast?.("Failed to add line item", {
        type: "error",
      });
    }
    setIsAddingNew(false);
  }

  function handleCancelNewItem() {
    setIsAddingNew(false);
  }

  // Transform line items to TagAssignmentRow format for the tag table
  const tagAssignmentRows = lineItems.map((item) => ({
    id: item.id,
    item: item.description,
    period: "", // Default value
    expenseAccount: "", // Default value
    total: `${currency} ${formatNumber(item.totalPriceTaxIncl)}`,
    lineItemTag: item.lineItemTag,
  }));

  if (showTagTable) {
    return (
      <LineItemTagsTable
        lineItems={tagAssignmentRows}
        onClose={() => setShowTagTable(false)}
        dispatch={dispatch}
        paymentAccounts={paymentAccounts}
      />
    );
  }

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Line Items Section */}
      <div className="mt-4">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-xl font-semibold text-gray-900">Line Items</h4>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTagTable(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
              title="Manage Tags for All Line Items"
            >
              <Tag className="w-4 h-4" />
              <span>Manage Tags</span>
            </button>
            <RWAButton disabled={isAddingNew} onClick={handleAddClick}>
              Add Line Item
            </RWAButton>
          </div>
        </div>

        {/* Empty State */}
        {lineItems.length === 0 && !isAddingNew && (
          <LineItemsEmptyState onAddItem={handleAddClick} />
        )}

        {/* Table View */}
        {(lineItems.length > 0 || isAddingNew) && (
          <div
            ref={tableContainerRef}
            className="overflow-x-auto rounded-lg border border-gray-200"
          >
            <table
              ref={tableRef}
              className="w-full table-fixed border-collapse bg-white"
            >
              <colgroup>
                <col style={{ width: "30%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "8%" }} />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b border-gray-200 p-3 text-left">
                    Description
                  </th>
                  <th className="border-b border-gray-200 p-3 text-right">
                    Quantity
                  </th>
                  <th className="border-b border-gray-200 p-3 text-right">
                    Unit Price (excl. tax)
                  </th>
                  <th className="border-b border-gray-200 p-3 text-right">
                    Tax %
                  </th>
                  <th className="border-b border-gray-200 p-3 text-right">
                    Total (excl. tax)
                  </th>
                  <th className="border-b border-gray-200 p-3 text-right">
                    Total (incl. tax)
                  </th>
                  <th className="border-b border-gray-200 p-3 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((item) =>
                  editingId === item.id ? (
                    <EditableLineItem
                      currency={currency}
                      item={item}
                      key={item.id}
                      onCancel={() => setEditingId(null)}
                      onSave={(updatedItem) => {
                        try {
                          onUpdateItem(updatedItem);
                          setEditingId(null);
                        } catch (error: any) {
                          console.error(error);

                          if (
                            error?.message?.includes("Invalid action input:")
                          ) {
                            try {
                              const zodError = JSON.parse(
                                error.message.split(
                                  "Invalid action input: ",
                                )[1],
                              );
                              if (
                                Array.isArray(zodError) &&
                                zodError.length > 0
                              ) {
                                const firstError = zodError[0];
                                const errorJSX = (
                                  <div>
                                    <p className="font-semibold">
                                      Failed to update line item
                                    </p>
                                    <p>{firstError.message}: </p>
                                    {zodError.map((err: any, index: number) => (
                                      <ul key={index}>
                                        <li className="text-red-500 font-semibold">
                                          - {err.path.join(".")}
                                        </li>
                                      </ul>
                                    ))}
                                  </div>
                                );

                                toast?.(errorJSX, {
                                  type: "error",
                                });
                                return;
                              }
                            } catch (parseError) {
                              console.error(
                                "Failed to parse Zod error:",
                                parseError,
                              );
                              toast?.("Invalid input data", {
                                type: "error",
                              });
                              return;
                            }
                          } else if (error?.message) {
                            toast?.(error.message, {
                              type: "error",
                            });
                            return;
                          }

                          toast?.("Failed to update line item", {
                            type: "error",
                          });
                        }
                      }}
                      onEditingItemChange={onEditingItemChange}
                    />
                  ) : (
                    <tr key={item.id} className="hover:bg-gray-50 table-row">
                      <td className="border-b border-gray-200 p-3 table-cell">
                        {item.description}
                      </td>
                      <td className="border-b border-gray-200 p-3 text-right table-cell">
                        {item.quantity % 1 === 0
                          ? item.quantity.toString()
                          : item.quantity.toFixed(2)}
                      </td>
                      <td className="border-b border-gray-200 p-3 text-right table-cell">
                        {formatNumber(item.unitPriceTaxExcl)}
                      </td>
                      <td className="border-b border-gray-200 p-3 text-right table-cell">
                        {typeof item.taxPercent === "number"
                          ? Math.round(item.taxPercent)
                          : 0}
                        %
                      </td>
                      <td className="border-b border-gray-200 p-3 text-right font-medium table-cell">
                        {formatNumber(item.totalPriceTaxExcl)}
                      </td>
                      <td className="border-b border-gray-200 p-3 text-right font-medium table-cell">
                        {formatNumber(item.totalPriceTaxIncl)}
                      </td>
                      <td className="border-b border-gray-200 p-3 table-cell">
                        <div className="flex justify-center space-x-2">
                          <button
                            className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-200"
                            onClick={() => setEditingId(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                            onClick={() => onDeleteItem({ id: item.id })}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
                {isAddingNew ? (
                  <EditableLineItem
                    currency={currency}
                    item={{}}
                    onCancel={handleCancelNewItem}
                    onSave={handleSaveNewItem}
                    onEditingItemChange={onEditingItemChange}
                  />
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
