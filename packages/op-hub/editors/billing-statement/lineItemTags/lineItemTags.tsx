import type { Dispatch } from "react";
import { X, Tag } from "lucide-react";
import { PowerhouseButton as Button } from "@powerhousedao/design-system";
import { Select, DatePicker } from "@powerhousedao/document-engineering/ui";
import type { SelectOption } from "@powerhousedao/document-engineering/ui";
import {
  budgetOptions as defaultBudgetOptions,
  expenseAccountOptions,
} from "./tagMapping.js";
import {
  actions,
  type BillingStatementTag,
  type BillingStatementAction,
} from "document-models/billing-statement";
import { InputField } from "../../invoice/components/inputField.js";

interface TagAssignmentRow {
  id: string;
  description: string;
  period: string;
  lineItemTag: BillingStatementTag[];
}

interface LineItemTagsTableProps {
  lineItems: TagAssignmentRow[];
  onClose: () => void;
  dispatch: Dispatch<BillingStatementAction>;
  /** Dynamic budget options from Operational Hub Profile subteams */
  budgetOptions?: SelectOption[];
}

export function LineItemTagsTable({
  lineItems,
  onClose,
  dispatch,
  budgetOptions = defaultBudgetOptions,
}: LineItemTagsTableProps) {
  const handleReset = () => {
    lineItems.forEach((item) => {
      item.lineItemTag.forEach((tag) => {
        dispatch(
          actions.editLineItemTag({
            lineItemId: item.id,
            dimension: tag.dimension,
            value: "",
            label: "",
          }),
        );
      });
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-6 bg-card z-10">
        <span className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Assign Tags
          </h2>
          <Tag style={{ width: 28, height: 28, fill: "var(--foreground)" }} />
        </span>
        <div className="flex items-center gap-2">
          <Button color="light" size="medium" onClick={handleReset}>
            Reset
          </Button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-accent text-foreground"
            aria-label="Close tag editor"
          >
            <X size={24} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border mt-4">
        <table className="w-full border-collapse bg-background text-foreground">
          <thead className="bg-muted">
            <tr>
              <th className="border-b border-border px-3 py-3 text-left text-[11px] font-medium tracking-[0.20em] text-foreground">
                ITEM
              </th>
              <th className="border-b border-border px-3 py-3 text-left text-[11px] font-medium tracking-[0.20em] text-foreground">
                PERIOD
              </th>
              <th className="border-b border-border px-3 py-3 text-left text-[11px] font-medium tracking-[0.20em] text-foreground">
                EXPENSE ACCOUNT
              </th>
              <th className="border-b border-border px-3 py-3 text-left text-[11px] font-medium tracking-[0.20em] text-foreground">
                BUDGET ALLOCATION
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {lineItems.map((item) => (
              <tr key={item.id} className="hover:bg-accent">
                <td className="border-b border-border p-2">
                  <InputField
                    value={item.description}
                    handleInputChange={() => {}}
                    onBlur={(e) => {
                      dispatch(
                        actions.editLineItem({
                          id: item.id,
                          description: e.target.value,
                        }),
                      );
                    }}
                    className="w-full text-xs"
                  />
                </td>
                <td className="border-b border-border p-2 w-50 relative isolate">
                  <DatePicker
                    name="period"
                    dateFormat="YYYY-MM-DD"
                    autoClose={true}
                    placeholder="Select Period"
                    value={
                      item.lineItemTag.find(
                        (tag) => tag.dimension === "accounting-period",
                      )?.label || ""
                    }
                    onChange={(e) =>
                      dispatch(
                        actions.editLineItemTag({
                          lineItemId: item.id,
                          dimension: "accounting-period",
                          value: new Date(e.target.value)
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "numeric",
                            })
                            .split("/")
                            .reverse()
                            .join("/"),
                          label: new Date(e.target.value).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              year: "numeric",
                            },
                          ),
                        }),
                      )
                    }
                    className="w-full text-xs"
                  />
                </td>
                <td className="border-b border-border p-2">
                  <Select
                    options={expenseAccountOptions}
                    value={
                      item.lineItemTag.find(
                        (tag) => tag.dimension === "expense-account",
                      )?.value || ""
                    }
                    placeholder="Select Expense Account"
                    searchable={true}
                    onChange={(value) => {
                      const selectedOption = expenseAccountOptions.find(
                        (option) => option.value === value,
                      );
                      dispatch(
                        actions.editLineItemTag({
                          lineItemId: item.id,
                          dimension: "expense-account",
                          value: selectedOption?.value || "",
                          label: selectedOption?.label,
                        }),
                      );
                    }}
                    className="w-full text-xs"
                  />
                </td>
                <td className="border-b border-border p-2">
                  <Select
                    options={budgetOptions}
                    value={
                      item.lineItemTag.find(
                        (tag) => tag.dimension === "budget",
                      )?.value || ""
                    }
                    placeholder="Select Budget Allocation"
                    searchable={true}
                    onChange={(value) => {
                      dispatch(
                        actions.editLineItemTag({
                          lineItemId: item.id,
                          dimension: "budget",
                          value: value as string,
                          label: budgetOptions.find(
                            (option) => option.value === value,
                          )?.label,
                        }),
                      );
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-muted-foreground">
        Changes persist as you blur fields/selects.
      </div>
    </div>
  );
}
