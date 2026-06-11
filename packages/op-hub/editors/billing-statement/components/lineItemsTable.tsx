import { Tag, Plus, Trash2 } from "lucide-react";
import { Select } from "@powerhousedao/document-engineering";
import { InputField } from "../../invoice/components/inputField.js";
import { NumberForm } from "../../invoice/components/numberForm.js";
import {
  actions,
  type BillingStatementAction,
  type BillingStatementState,
  type BillingStatementUnitInput,
} from "document-models/billing-statement";
import { useState, useRef, useEffect } from "react";
import { formatNumber } from "../../invoice/lineItems.js";
import { LineItemTagsTable } from "../lineItemTags/lineItemTags.js";
import { generateId } from "document-model";
import { useOperationalHubSubteams } from "../../hooks/useOperationalHubSubteams.js";

const initialLineItem: LocalLineItemDraft = {
  description: "",
  unit: "HOUR",
  quantity: "",
  unitPriceCash: "",
  unitPricePwt: "",
};

type BillingStatementLineItem = {
  id: string;
  description: string;
  unit: BillingStatementUnitInput;
  quantity: number;
  unitPriceCash: number;
  unitPricePwt: number;
  totalPriceCash: number;
  totalPricePwt: number;
};

type LocalLineItemDraft = {
  id?: string;
  description: string;
  unit: BillingStatementUnitInput;
  quantity: number | string;
  unitPriceCash: number | string;
  unitPricePwt: number | string;
};

const inputClassName =
  "rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm shadow-sm";

const LineItemsTable = (props: {
  state: BillingStatementState;
  dispatch: React.Dispatch<BillingStatementAction>;
}) => {
  const { state, dispatch } = props;
  const { budgetOptions } = useOperationalHubSubteams();
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [localLineItem, setLocalLineItem] =
    useState<LocalLineItemDraft>(initialLineItem);
  const [showTagTable, setShowTagTable] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newLineItem, setNewLineItem] =
    useState<LocalLineItemDraft>(initialLineItem);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      const isSelectMenu =
        target.closest('[role="listbox"]') || target.closest('[role="option"]');
      const isButton = target.closest("button");

      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node) &&
        !isSelectMenu &&
        !isButton
      ) {
        if (editingRow !== null) {
          handleSave();
        }
        if (isAddingNew) {
          handleCancelAdd();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingRow, localLineItem, isAddingNew, newLineItem]);

  const units: Array<{ label: string; value: BillingStatementUnitInput }> = [
    { label: "Minute", value: "MINUTE" },
    { label: "Hour", value: "HOUR" },
    { label: "Day", value: "DAY" },
    { label: "Unit", value: "UNIT" },
  ];

  const handleInputChange = (
    field: keyof LocalLineItemDraft,
    value: string | number,
  ) => {
    if (field === "unitPriceCash" || field === "unitPricePwt") {
      const regex = new RegExp(`^-?\\d*\\.?\\d{0,6}$`);
      const stringValue = String(value);
      if (regex.test(stringValue) || stringValue === "-") {
        setLocalLineItem((prev) => ({ ...prev, [field]: value }));
      }
    }
    setLocalLineItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const { description, unit, quantity, unitPriceCash, unitPricePwt } =
      localLineItem;
    if (
      description &&
      unit &&
      quantity !== "" &&
      unitPriceCash !== "" &&
      unitPricePwt !== ""
    ) {
      const qty = Number(quantity);
      const fiat = Number(unitPriceCash);
      const powt = Number(unitPricePwt);

      const originalItem = state.lineItems.find(
        (item: any) => item.id === localLineItem.id,
      ) as BillingStatementLineItem | undefined;

      const hasChanges =
        !originalItem ||
        originalItem.description !== description ||
        originalItem.unit !== unit ||
        originalItem.quantity !== qty ||
        originalItem.unitPriceCash !== fiat ||
        originalItem.unitPricePwt !== powt;

      if (hasChanges) {
        const id = String(localLineItem.id);
        dispatch(
          actions.editLineItem({
            id,
            description,
            unit,
            quantity: qty,
            unitPriceCash: fiat,
            unitPricePwt: powt,
            totalPriceCash: qty * fiat,
            totalPricePwt: qty * powt,
          }),
        );
      }
      setEditingRow(null);
      setLocalLineItem(initialLineItem);
    }
  };

  const handleAddLineItem = () => {
    setIsAddingNew(true);
    setNewLineItem(initialLineItem);
  };

  const handleNewLineItemChange = (
    field: keyof LocalLineItemDraft,
    value: string | number,
  ) => {
    if (field === "unitPriceCash" || field === "unitPricePwt") {
      const regex = new RegExp(`^-?\\d*\\.?\\d{0,6}$`);
      const stringValue = String(value);
      if (regex.test(stringValue) || stringValue === "-") {
        setNewLineItem((prev) => ({ ...prev, [field]: value }));
      }
    } else {
      setNewLineItem((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveNewLineItem = () => {
    const { description, unit, quantity, unitPriceCash, unitPricePwt } =
      newLineItem;

    if (
      description &&
      unit &&
      quantity !== "" &&
      unitPriceCash !== "" &&
      unitPricePwt !== ""
    ) {
      const qty = Number(quantity);
      const fiat = Number(unitPriceCash);
      const powt = Number(unitPricePwt);

      dispatch(
        actions.addLineItem({
          id: generateId(),
          description,
          unit,
          quantity: qty,
          unitPriceCash: fiat,
          unitPricePwt: powt,
          totalPriceCash: qty * fiat,
          totalPricePwt: qty * powt,
        }),
      );

      setIsAddingNew(false);
      setNewLineItem(initialLineItem);
    }
  };

  const handleCancelAdd = () => {
    setIsAddingNew(false);
    setNewLineItem(initialLineItem);
  };

  const handleDeleteLineItem = (id: string) => {
    if (editingRow !== null) {
      setEditingRow(null);
      setLocalLineItem(initialLineItem);
    }
    dispatch(actions.deleteLineItem({ id }));
  };

  if (showTagTable) {
    return (
      <LineItemTagsTable
        lineItems={state.lineItems as unknown as any}
        onClose={() => setShowTagTable(false)}
        dispatch={dispatch}
        budgetOptions={budgetOptions.length > 0 ? budgetOptions : undefined}
      />
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            Line Items
          </div>
          <div className="text-sm text-muted-foreground">
            Double‑click a row to edit. Click outside to save.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowTagTable(!showTagTable)}
            className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-4 py-2 text-xs font-medium text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label="Open tag editor"
          >
            <Tag className="h-4 w-4 text-muted-foreground" />
            Tags
          </button>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto" ref={tableRef}>
          <div className="min-w-[980px]">
            <table className="w-full border-collapse text-sm text-foreground">
              <thead>
                <tr className="bg-muted text-foreground">
                  <th className="w-10 border-b border-border px-2 py-3.5 text-center text-[11px] font-medium uppercase tracking-wide text-foreground">
                    #
                  </th>
                  <th className="w-[28rem] border-b border-border px-3 py-3.5 text-left text-[11px] font-medium uppercase tracking-wide text-foreground">
                    Description
                  </th>
                  <th className="w-44 border-b border-border px-3 py-3.5 text-left text-[11px] font-medium uppercase tracking-wide text-foreground">
                    Unit
                  </th>
                  <th className="w-20 border-b border-border px-3 py-3.5 text-right text-[11px] font-medium uppercase tracking-wide text-foreground">
                    Qty
                  </th>
                  <th className="w-28 border-b border-border px-3 py-3.5 text-right text-[11px] font-medium uppercase tracking-wide text-foreground">
                    Fiat/Unit
                  </th>
                  <th className="w-28 border-b border-border px-3 py-3.5 text-right text-[11px] font-medium uppercase tracking-wide text-foreground">
                    POWT/Unit
                  </th>
                  <th className="w-32 border-b border-border px-3 py-3.5 text-right text-[11px] font-medium uppercase tracking-wide text-foreground">
                    Total Fiat
                  </th>
                  <th className="w-32 border-b border-border px-3 py-3.5 text-right text-[11px] font-medium uppercase tracking-wide text-foreground">
                    Total POWT
                  </th>
                  <th className="w-16 border-b border-border px-2 py-3.5 text-center text-[11px] font-medium uppercase tracking-wide text-foreground">
                    {/* Delete column header */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.lineItems.map((item: any, idx: number) =>
                  editingRow === idx ? (
                    <tr
                      key={item.id}
                      className="bg-primary/10 shadow-[inset_0_0_0_1px] shadow-primary/30"
                    >
                      <td className="border-b border-border px-2 py-3 text-center text-xs text-muted-foreground">
                        {idx + 1}
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        <InputField
                          input={localLineItem.description}
                          value={localLineItem.description}
                          onBlur={() => {}}
                          handleInputChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          className={`w-full ${inputClassName}`}
                        />
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        <Select
                          options={units}
                          value={localLineItem.unit}
                          onChange={(value) =>
                            handleInputChange(
                              "unit",
                              value as BillingStatementUnitInput,
                            )
                          }
                          className={`w-44 ${inputClassName}`}
                        />
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        <NumberForm
                          number={localLineItem.quantity}
                          handleInputChange={(e: any) =>
                            handleInputChange("quantity", e.target.value)
                          }
                          className={`w-24 text-right ${inputClassName}`}
                        />
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        <NumberForm
                          number={localLineItem.unitPriceCash}
                          handleInputChange={(e: any) =>
                            handleInputChange(
                              "unitPriceCash",
                              String(e.target.value),
                            )
                          }
                          className={`w-28 text-right ${inputClassName}`}
                        />
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        <NumberForm
                          number={localLineItem.unitPricePwt}
                          handleInputChange={(e: any) =>
                            handleInputChange("unitPricePwt", e.target.value)
                          }
                          className={`w-28 text-right ${inputClassName}`}
                        />
                      </td>
                      <td className="border-b border-border px-3 py-3 text-right text-muted-foreground">
                        {localLineItem.quantity && localLineItem.unitPriceCash
                          ? Number(localLineItem.quantity) *
                            Number(localLineItem.unitPriceCash)
                          : ""}
                      </td>
                      <td className="border-b border-border px-3 py-3 text-right text-muted-foreground">
                        {localLineItem.quantity && localLineItem.unitPricePwt
                          ? Number(localLineItem.quantity) *
                            Number(localLineItem.unitPricePwt)
                          : ""}
                      </td>
                      <td className="border-b border-border px-2 py-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLineItem(String(localLineItem.id));
                          }}
                          className="inline-flex items-center justify-center rounded-lg p-1.5 text-destructive transition hover:bg-destructive/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 focus-visible:ring-offset-1"
                          aria-label="Delete line item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr
                      key={item.id}
                      className="cursor-pointer hover:bg-accent transition-colors text-foreground"
                      onDoubleClick={() => {
                        setEditingRow(idx);
                        setLocalLineItem({ ...item });
                      }}
                    >
                      <td className="border-b border-border px-2 py-3 text-center text-xs text-muted-foreground">
                        {idx + 1}
                      </td>
                      <td className="border-b border-border px-3 py-3 text-foreground">
                        {item.description}
                      </td>
                      <td className="border-b border-border px-3 py-3 text-center text-xs font-medium tracking-wide text-muted-foreground">
                        {item.unit}
                      </td>
                      <td className="border-b border-border px-3 py-3 text-right text-foreground">
                        {item.quantity}
                      </td>
                      <td className="border-b border-border px-3 py-3 text-right text-foreground">
                        {formatNumber(item.unitPriceCash)}
                      </td>
                      <td className="border-b border-border px-3 py-3 text-right text-foreground">
                        {formatNumber(item.unitPricePwt)}
                      </td>
                      <td className="border-b border-border px-3 py-3 text-right text-foreground">
                        {formatNumber(item.totalPriceCash)}
                      </td>
                      <td className="border-b border-border px-3 py-3 text-right text-foreground">
                        {formatNumber(item.totalPricePwt)}
                      </td>
                      <td className="border-b border-border px-2 py-3 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLineItem(item.id);
                          }}
                          className="inline-flex items-center justify-center rounded-lg p-1.5 text-destructive transition hover:bg-destructive/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive/30 focus-visible:ring-offset-1"
                          aria-label="Delete line item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ),
                )}
                {isAddingNew && (
                  <tr className="bg-status-success/15 shadow-[inset_0_0_0_1px] shadow-status-success/30">
                    <td className="border-b border-border px-2 py-3 text-center text-xs text-muted-foreground">
                      {state.lineItems.length + 1}
                    </td>
                    <td className="border-b border-border px-3 py-2">
                      <InputField
                        input={newLineItem.description}
                        value={newLineItem.description}
                        onBlur={() => {}}
                        handleInputChange={(e) =>
                          handleNewLineItemChange("description", e.target.value)
                        }
                        className={`w-full ${inputClassName}`}
                      />
                    </td>
                    <td className="border-b border-border px-3 py-2">
                      <Select
                        options={units}
                        value={newLineItem.unit}
                        onChange={(value) =>
                          handleNewLineItemChange(
                            "unit",
                            value as BillingStatementUnitInput,
                          )
                        }
                        className={`w-44 ${inputClassName}`}
                      />
                    </td>
                    <td className="border-b border-border px-3 py-2">
                      <NumberForm
                        number={newLineItem.quantity}
                        handleInputChange={(e: any) =>
                          handleNewLineItemChange("quantity", e.target.value)
                        }
                        className={`w-24 text-right font-mono tabular-nums ${inputClassName}`}
                      />
                    </td>
                    <td className="border-b border-border px-3 py-2">
                      <NumberForm
                        number={newLineItem.unitPriceCash}
                        handleInputChange={(e: any) =>
                          handleNewLineItemChange(
                            "unitPriceCash",
                            String(e.target.value),
                          )
                        }
                        className={`w-28 text-right font-mono tabular-nums ${inputClassName}`}
                      />
                    </td>
                    <td className="border-b border-border px-3 py-2">
                      <NumberForm
                        number={newLineItem.unitPricePwt}
                        handleInputChange={(e: any) =>
                          handleNewLineItemChange(
                            "unitPricePwt",
                            e.target.value,
                          )
                        }
                        className={`w-28 text-right font-mono tabular-nums ${inputClassName}`}
                      />
                    </td>
                    <td className="border-b border-border px-3 py-3 text-right font-mono tabular-nums text-muted-foreground">
                      {newLineItem.quantity && newLineItem.unitPriceCash
                        ? Number(newLineItem.quantity) *
                          Number(newLineItem.unitPriceCash)
                        : ""}
                    </td>
                    <td className="border-b border-border px-3 py-3 text-right font-mono tabular-nums text-muted-foreground">
                      {newLineItem.quantity && newLineItem.unitPricePwt
                        ? Number(newLineItem.quantity) *
                          Number(newLineItem.unitPricePwt)
                        : ""}
                    </td>
                    <td className="border-b border-border px-2 py-3 text-center">
                      {/* Empty cell for new item row */}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {!isAddingNew && (
          <div className="flex justify-center bg-muted px-4 py-4">
            <button
              type="button"
              onClick={handleAddLineItem}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-xs font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Plus className="h-4 w-4" />
              Add Line Item
            </button>
          </div>
        )}

        {isAddingNew && (
          <div className="flex justify-center gap-3 bg-muted px-4 py-4">
            <button
              type="button"
              onClick={handleSaveNewLineItem}
              className="rounded-md bg-primary px-5 py-2.5 text-xs font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Save Line Item
            </button>
            <button
              type="button"
              onClick={handleCancelAdd}
              className="rounded-md border border-border bg-card px-5 py-2.5 text-xs font-medium text-foreground shadow-sm transition hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineItemsTable;
