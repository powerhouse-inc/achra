import { useState, useCallback, useMemo } from "react";
import {
  ObjectSetTable,
  TextInput,
  Textarea,
  Button,
  type ColumnDef,
  type ColumnAlignment,
} from "@powerhousedao/document-engineering";
import { generateId } from "document-model/core";
import {
  usePHToast,
  type DocumentDispatch,
} from "@powerhousedao/reactor-browser";
import {
  actions,
  type BonusClause,
  type PenaltyClause,
  type PaymentTermsAction,
} from "document-models/payment-terms";

export interface ClausesTabProps {
  bonusClauses: BonusClause[];
  penaltyClauses: PenaltyClause[];
  dispatch: DocumentDispatch<PaymentTermsAction>;
  currency: string;
}

export function ClausesTab({
  bonusClauses,
  penaltyClauses,
  dispatch,
  currency = "USD",
}: ClausesTabProps) {
  const toast = usePHToast();
  const [activeSubTab, setActiveSubTab] = useState<"bonus" | "penalty">(
    "bonus",
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newClause, setNewClause] = useState({
    condition: "",
    amount: "",
    comment: "",
  });

  const bonusColumns = useMemo<Array<ColumnDef<BonusClause>>>(
    () => [
      {
        field: "condition",
        title: "Condition",
        editable: true,
        align: "left",
        onSave: (newValue, context) => {
          dispatch(
            actions.updateBonusClause({
              id: context.row.id,
              condition: newValue as string,
            }),
          );
          toast?.("Bonus clause condition updated", { type: "success" });
          return true;
        },
      },
      {
        field: "bonusAmount",
        title: `Bonus Amount (${currency})`,
        editable: true,
        align: "right",
        renderCell: (value: BonusClause["bonusAmount"]) =>
          value ? `${value.value} ${value.unit}` : "",
        onSave: (newValue, context) => {
          const amount = parseFloat(newValue as string);
          if (isNaN(amount)) {
            toast?.("Please enter a valid amount", { type: "error" });
            return false;
          }
          dispatch(
            actions.updateBonusClause({
              id: context.row.id,
              bonusAmount: { value: amount, unit: currency },
            }),
          );
          toast?.("Bonus amount updated", { type: "success" });
          return true;
        },
      },
      {
        field: "comment",
        title: "Comment",
        editable: true,
        align: "left",
        renderCell: (value: string | null) => value || "-",
        onSave: (newValue, context) => {
          dispatch(
            actions.updateBonusClause({
              id: context.row.id,
              comment: (newValue as string) || undefined,
            }),
          );
          toast?.("Bonus clause comment updated", { type: "success" });
          return true;
        },
      },
    ],
    [currency, dispatch, toast],
  );

  const penaltyColumns = useMemo<Array<ColumnDef<PenaltyClause>>>(
    () => [
      {
        field: "condition",
        title: "Condition",
        editable: true,
        align: "left",
        onSave: (newValue, context) => {
          dispatch(
            actions.updatePenaltyClause({
              id: context.row.id,
              condition: newValue as string,
            }),
          );
          toast?.("Penalty clause condition updated", { type: "success" });
          return true;
        },
      },
      {
        field: "deductionAmount",
        title: `Deduction Amount (${currency})`,
        editable: true,
        align: "right",
        renderCell: (value: PenaltyClause["deductionAmount"]) =>
          value ? `${value.value} ${value.unit}` : "",
        onSave: (newValue, context) => {
          const amount = parseFloat(newValue as string);
          if (isNaN(amount)) {
            toast?.("Please enter a valid amount", { type: "error" });
            return false;
          }
          dispatch(
            actions.updatePenaltyClause({
              id: context.row.id,
              deductionAmount: { value: amount, unit: currency },
            }),
          );
          toast?.("Deduction amount updated", { type: "success" });
          return true;
        },
      },
      {
        field: "comment",
        title: "Comment",
        editable: true,
        align: "left",
        renderCell: (value: string | null) => value || "-",
        onSave: (newValue, context) => {
          dispatch(
            actions.updatePenaltyClause({
              id: context.row.id,
              comment: (newValue as string) || undefined,
            }),
          );
          toast?.("Penalty clause comment updated", { type: "success" });
          return true;
        },
      },
    ],
    [currency, dispatch, toast],
  );

  const handleAddClause = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!newClause.condition.trim()) {
        toast?.("Condition is required", { type: "error" });
        return;
      }
      if (!newClause.amount || isNaN(parseFloat(newClause.amount))) {
        toast?.("Valid amount is required", { type: "error" });
        return;
      }

      if (activeSubTab === "bonus") {
        dispatch(
          actions.addBonusClause({
            id: generateId(),
            condition: newClause.condition,
            bonusAmount: {
              value: parseFloat(newClause.amount),
              unit: currency,
            },
            comment: newClause.comment || undefined,
          }),
        );
        toast?.("Bonus clause added successfully", { type: "success" });
      } else {
        dispatch(
          actions.addPenaltyClause({
            id: generateId(),
            condition: newClause.condition,
            deductionAmount: {
              value: parseFloat(newClause.amount),
              unit: currency,
            },
            comment: newClause.comment || undefined,
          }),
        );
        toast?.("Penalty clause added successfully", { type: "success" });
      }

      setNewClause({ condition: "", amount: "", comment: "" });
      setIsAddingNew(false);
    },
    [newClause, activeSubTab, dispatch, currency, toast],
  );

  const currentClauses =
    activeSubTab === "bonus" ? bonusClauses : penaltyClauses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">
            Bonus & Penalty Clauses
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {bonusClauses.length} bonus clause(s), {penaltyClauses.length}{" "}
            penalty clause(s)
          </p>
        </div>
        <Button
          onClick={() => setIsAddingNew(!isAddingNew)}
          color="light"
          size="sm"
          className="cursor-pointer hover:bg-blue-600 hover:text-white"
        >
          + Add {activeSubTab === "bonus" ? "Bonus" : "Penalty"} Clause
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-600">
        <button
          onClick={() => setActiveSubTab("bonus")}
          className={`rounded-t-lg px-4 py-2 text-sm font-medium ${
            activeSubTab === "bonus"
              ? "border-b-2 border-blue-700 bg-blue-50 text-blue-700 dark:border-blue-300 dark:bg-blue-900 dark:text-blue-300"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Bonus Clauses ({bonusClauses.length})
        </button>
        <button
          onClick={() => setActiveSubTab("penalty")}
          className={`rounded-t-lg px-4 py-2 text-sm font-medium ${
            activeSubTab === "penalty"
              ? "border-b-2 border-red-700 bg-red-50 text-red-700 dark:border-red-300 dark:bg-red-900 dark:text-red-300"
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Penalty Clauses ({penaltyClauses.length})
        </button>
      </div>

      {isAddingNew && (
        <div className="rounded-lg border bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
          <h3 className="mb-4 text-lg font-medium dark:text-white">
            Add New {activeSubTab === "bonus" ? "Bonus" : "Penalty"} Clause
          </h3>
          <form onSubmit={handleAddClause} className="space-y-4">
            <TextInput
              label="Condition *"
              value={newClause.condition}
              onChange={(e) =>
                setNewClause({ ...newClause, condition: e.target.value })
              }
              className="w-full"
              required
            />

            <TextInput
              label={`${activeSubTab === "bonus" ? "Bonus" : "Deduction"} Amount (${currency}) *`}
              type="number"
              value={newClause.amount}
              onChange={(e) =>
                setNewClause({ ...newClause, amount: e.target.value })
              }
              className="w-full"
              placeholder="0.00"
              step="0.01"
              required
            />

            <Textarea
              label="Comment"
              value={newClause.comment}
              onChange={(e) =>
                setNewClause({ ...newClause, comment: e.target.value })
              }
              className="w-full"
              rows={3}
              placeholder="Optional comment or additional details..."
            />

            <div className="flex gap-3">
              <Button
                type="submit"
                color="light"
                size="sm"
                className="cursor-pointer hover:bg-blue-600 hover:text-white"
              >
                Add {activeSubTab === "bonus" ? "Bonus" : "Penalty"} Clause
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setNewClause({ condition: "", amount: "", comment: "" });
                }}
                color="light"
                size="sm"
                className="cursor-pointer hover:bg-gray-600 hover:text-white"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {currentClauses.length > 0 ? (
        activeSubTab === "bonus" ? (
          <ObjectSetTable
            data={bonusClauses}
            columns={bonusColumns}
            onAdd={() => setIsAddingNew(true)}
            onDelete={(row: BonusClause[]) => {
              dispatch(
                actions.deleteBonusClause({
                  id: (row as unknown as BonusClause).id,
                }),
              );
              toast?.("Bonus clause deleted", { type: "success" });
            }}
          />
        ) : (
          <ObjectSetTable
            data={penaltyClauses}
            columns={penaltyColumns}
            onAdd={() => setIsAddingNew(true)}
            onDelete={(row: PenaltyClause[]) => {
              dispatch(
                actions.deletePenaltyClause({
                  id: (row as unknown as PenaltyClause).id,
                }),
              );
              toast?.("Penalty clause deleted", { type: "success" });
            }}
          />
        )
      ) : (
        <div className="rounded-lg border-2 border-dashed border-gray-300 py-8 text-center text-gray-500 dark:border-gray-600 dark:text-gray-400">
          <p className="text-lg font-medium">
            No {activeSubTab} clauses defined yet
          </p>
          <p className="text-sm">
            Add your first {activeSubTab} clause to get started
          </p>
        </div>
      )}
    </div>
  );
}
