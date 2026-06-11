import { useState, useCallback, useMemo } from "react";
import {
  ObjectSetTable,
  TextInput,
  DatePicker,
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
  type Milestone,
  type MilestonePayoutStatus,
  type PaymentTermsAction,
} from "document-models/payment-terms";
import {
  checkboxClass,
  checkboxLabelClass,
  dashedEmptyClass,
  emptyStateClass,
  fieldLabelClass,
  formPanelClass,
  primaryButtonClass,
  readOnlyPanelClass,
  secondaryButtonClass,
} from "./uiClasses.js";

export interface MilestonesTabProps {
  milestones: Milestone[];
  dispatch: DocumentDispatch<PaymentTermsAction>;
  currency: string;
}

export function MilestonesTab({
  milestones,
  dispatch,
  currency = "USD",
}: MilestonesTabProps) {
  const toast = usePHToast();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    name: "",
    amount: "",
    expectedCompletionDate: "",
    requiresApproval: true,
  });

  const columns = useMemo<Array<ColumnDef<Milestone>>>(
    () => [
      {
        field: "name",
        title: "Name",
        editable: true,
        align: "left",
        onSave: (newValue, context) => {
          if (newValue !== context.row.name) {
            dispatch(
              actions.updateMilestone({
                id: context.row.id,
                name: newValue as string,
              }),
            );
            toast?.("Milestone name updated", { type: "success" });
            return true;
          }
          return false;
        },
      },
      {
        field: "amount",
        title: `Amount (${currency})`,
        editable: true,
        align: "right",
        renderCell: (value: Milestone["amount"]) =>
          value ? `${value.value} ${value.unit}` : "",
        onSave: (newValue, context) => {
          const amount = parseFloat(newValue as string);
          if (isNaN(amount)) {
            toast?.("Please enter a valid amount", { type: "error" });
            return false;
          }
          dispatch(
            actions.updateMilestone({
              id: context.row.id,
              amount: { value: amount, unit: currency },
            }),
          );
          toast?.("Milestone amount updated", { type: "success" });
          return true;
        },
      },
      {
        field: "expectedCompletionDate",
        title: "Expected Completion",
        editable: true,
        align: "center",
        renderCell: (value: string | null) =>
          value ? new Date(value).toLocaleDateString() : "Not set",
        onSave: (newValue, context) => {
          const dateValue = newValue as string;
          dispatch(
            actions.updateMilestone({
              id: context.row.id,
              expectedCompletionDate: dateValue || undefined,
            }),
          );
          toast?.("Expected completion date updated", { type: "success" });
          return true;
        },
      },
      {
        field: "requiresApproval",
        title: "Requires Approval",
        editable: true,
        align: "center",
        renderCell: (value: boolean) => (value ? "Yes" : "No"),
        onSave: (newValue, context) => {
          const approved = newValue === "true" || newValue === true;
          dispatch(
            actions.updateMilestone({
              id: context.row.id,
              requiresApproval: approved,
            }),
          );
          toast?.("Approval requirement updated", { type: "success" });
          return true;
        },
      },
      {
        field: "payoutStatus",
        title: "Status",
        editable: true,
        align: "center",
        renderCell: (value: MilestonePayoutStatus) => {
          const statusMap: Record<MilestonePayoutStatus, string> = {
            PENDING: "Pending",
            READY_FOR_REVIEW: "Ready for Review",
            APPROVED: "Approved",
            PAID: "Paid",
            REJECTED: "Rejected",
          };
          return statusMap[value] || value;
        },
        onSave: (newValue, context) => {
          dispatch(
            actions.updateMilestoneStatus({
              id: context.row.id,
              payoutStatus: newValue as MilestonePayoutStatus,
            }),
          );
          toast?.("Milestone status updated", { type: "success" });
          return true;
        },
      },
      {
        field: "actions",
        title: "Actions",
        editable: false,
        align: "center",
        renderCell: (_, context) => (
          <Button
            onClick={() => {
              dispatch(actions.deleteMilestone({ id: context.row.id }));
              toast?.("Milestone deleted", { type: "success" });
            }}
            size="sm"
            className="text-destructive hover:text-destructive/80"
          >
            Delete
          </Button>
        ),
      },
    ],
    [currency, dispatch, toast],
  );

  const handleAddMilestone = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!newMilestone.name.trim()) {
        toast?.("Name is required", { type: "error" });
        return;
      }
      if (!newMilestone.amount || isNaN(parseFloat(newMilestone.amount))) {
        toast?.("Valid amount is required", { type: "error" });
        return;
      }

      const milestoneData = {
        id: generateId(),
        name: newMilestone.name,
        amount: {
          value: parseFloat(newMilestone.amount),
          unit: currency,
        },
        requiresApproval: newMilestone.requiresApproval,
        expectedCompletionDate: newMilestone.expectedCompletionDate
          ? new Date(newMilestone.expectedCompletionDate).toISOString()
          : undefined,
      };

      dispatch(actions.addMilestone(milestoneData));
      toast?.("Milestone added successfully", { type: "success" });

      setNewMilestone({
        name: "",
        amount: "",
        expectedCompletionDate: "",
        requiresApproval: true,
      });
      setIsAddingNew(false);
    },
    [newMilestone, dispatch, currency, toast],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Milestones</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {milestones.length} milestone(s) defined
          </p>
        </div>
        <Button
          onClick={() => setIsAddingNew(!isAddingNew)}
          color="light"
          size="sm"
          className={primaryButtonClass}
        >
          + Add Milestone
        </Button>
      </div>

      {isAddingNew && (
        <div className={formPanelClass}>
          <h3 className="mb-4 text-lg font-medium text-foreground">
            Add New Milestone
          </h3>
          <form onSubmit={handleAddMilestone} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <TextInput
                label="Name *"
                value={newMilestone.name}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, name: e.target.value })
                }
                className="w-full"
                required
              />

              <TextInput
                label={`Amount (${currency}) *`}
                type="number"
                value={newMilestone.amount}
                onChange={(e) =>
                  setNewMilestone({ ...newMilestone, amount: e.target.value })
                }
                className="w-full"
                placeholder="0.00"
                step="0.01"
                required
              />

              <DatePicker
                value={
                  newMilestone.expectedCompletionDate
                    ? new Date(newMilestone.expectedCompletionDate)
                    : undefined
                }
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  setNewMilestone({
                    ...newMilestone,
                    expectedCompletionDate: date?.toISOString() || "",
                  });
                }}
                name="expected-completion-date"
                placeholder="Select expected completion date"
              />

              <div className="flex items-center pt-6">
                <input
                  type="checkbox"
                  id="requiresApproval"
                  checked={newMilestone.requiresApproval}
                  onChange={(e) =>
                    setNewMilestone({
                      ...newMilestone,
                      requiresApproval: e.target.checked,
                    })
                  }
                  className={checkboxClass}
                />
                <label
                  htmlFor="requiresApproval"
                  className={checkboxLabelClass}
                >
                  Requires Approval
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="submit"
                color="light"
                size="sm"
                className={primaryButtonClass}
              >
                Add Milestone
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsAddingNew(false);
                  setNewMilestone({
                    name: "",
                    amount: "",
                    expectedCompletionDate: "",
                    requiresApproval: true,
                  });
                }}
                color="light"
                size="sm"
                className={secondaryButtonClass}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {milestones.length > 0 ? (
        <ObjectSetTable
          data={milestones}
          columns={columns}
          onAdd={() => setIsAddingNew(true)}
          onDelete={(row: Milestone[]) => {
            dispatch(
              actions.deleteMilestone({
                id: (row as unknown as Milestone).id,
              }),
            );
            toast?.("Milestone deleted", { type: "success" });
          }}
        />
      ) : (
        <div className={dashedEmptyClass}>
          <p className="text-lg font-medium">No milestones defined yet</p>
          <p className="text-sm">Add your first milestone to get started</p>
        </div>
      )}
    </div>
  );
}
