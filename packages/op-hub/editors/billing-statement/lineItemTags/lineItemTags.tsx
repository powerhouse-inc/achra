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
    // Resetting all tags to empty values
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
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 text-slate-800">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-slate-200/60 bg-white text-slate-800 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
          {/* Header */}
          <div className="relative border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-blue-50/50 px-6 py-5 text-slate-800">
            {/* Close button - absolute positioned top right */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full border border-slate-300/60 bg-slate-100/50 p-2 text-slate-600 transition hover:bg-slate-200/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
              aria-label="Close tag editor"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200/60 bg-white">
                <Tag className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <div className="text-[11px] font-medium tracking-[0.22em] text-slate-500">
                  TAG EDITOR
                </div>
                <h2 className="text-xl font-medium tracking-tight">
                  Assign tags to line items
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Button color="light" size="small" onClick={handleReset}>
                Reset
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="p-6">
            <div className="overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-gradient-to-r from-slate-50 to-blue-50/30 text-slate-800">
                    <tr>
                      <th className="border-b border-slate-200/60 px-3 py-3 text-left text-[11px] font-medium tracking-[0.20em] text-slate-600">
                        ITEM
                      </th>
                      <th className="border-b border-slate-200/60 px-3 py-3 text-left text-[11px] font-medium tracking-[0.20em] text-slate-600">
                        PERIOD
                      </th>
                      <th className="border-b border-slate-200/60 px-3 py-3 text-left text-[11px] font-medium tracking-[0.20em] text-slate-600">
                        EXPENSE ACCOUNT
                      </th>
                      <th className="border-b border-slate-200/60 px-3 py-3 text-left text-[11px] font-medium tracking-[0.20em] text-slate-600">
                        BUDGET ALLOCATION
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-slate-700">
                    {lineItems.map((item) => (
                      <tr
                        key={item.id}
                        className="odd:bg-slate-50/30 even:bg-white hover:bg-blue-50/30"
                      >
                        <td className="border-b border-slate-200/60 p-2">
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
                        <td className="border-b border-slate-200/60 p-2 w-50 relative isolate">
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
                                  label: new Date(
                                    e.target.value,
                                  ).toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                  }),
                                }),
                              )
                            }
                            className="w-full text-xs bg-white"
                          />
                        </td>
                        <td className="border-b border-slate-200/60 p-2">
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
                        <td className="border-b border-slate-200/60 p-2">
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
            </div>

            <div className="mt-4 text-xs text-slate-400">
              Changes persist as you blur fields/selects.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
