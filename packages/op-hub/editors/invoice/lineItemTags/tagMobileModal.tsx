import { X } from "lucide-react";
import { useState, useEffect, type Dispatch } from "react";
import { InputField } from "../components/inputField.js";
import { Select, DatePicker } from "@powerhousedao/document-engineering/ui";
import { expenseAccountOptions } from "./tagMapping.js";
import { actions, type InvoiceTag } from "document-models/invoice";

type TagAssignmentRow = {
  id: string;
  item: string;
  period: string;
  expenseAccount: string;
  total: string;
  lineItemTag: InvoiceTag[];
};

type TagMobileModalProps = {
  item: TagAssignmentRow;
  onClose: () => void;
  dispatch: Dispatch<any>;
};

export function TagMobileModal({
  item,
  onClose,
  dispatch,
}: TagMobileModalProps) {
  const [description, setDescription] = useState(item.item);

  // Get current tag values
  const periodTag = item.lineItemTag.find(
    (tag) => tag.dimension === "accounting-period",
  );
  const expenseTag = item.lineItemTag.find(
    (tag) => tag.dimension === "xero-expense-account",
  );

  const [periodValue, setPeriodValue] = useState(periodTag?.label || "");
  const [periodStoredValue, setPeriodStoredValue] = useState(
    periodTag?.value || "",
  );
  const [expenseValue, setExpenseValue] = useState(expenseTag?.value || "");
  const [expenseLabel, setExpenseLabel] = useState(expenseTag?.label || "");

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSave = () => {
    // Save description if changed
    if (description !== item.item) {
      dispatch(
        actions.editLineItem({
          id: item.id,
          description: description,
        }),
      );
    }

    // Save period if changed
    if (periodStoredValue !== periodTag?.value) {
      dispatch(
        actions.setLineItemTag({
          lineItemId: item.id,
          dimension: "accounting-period",
          value: periodStoredValue,
          label: periodValue,
        }),
      );
    }

    // Save expense account if changed
    if (expenseValue !== expenseTag?.value) {
      dispatch(
        actions.setLineItemTag({
          lineItemId: item.id,
          dimension: "xero-expense-account",
          value: expenseValue,
          label: expenseLabel,
        }),
      );
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">Edit Tags</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          Save
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Item Description
          </label>
          <InputField
            value={description}
            handleInputChange={(e) => setDescription(e.target.value)}
            onBlur={() => {}}
            placeholder="Enter item description"
            className="w-full"
          />
        </div>

        {/* Period */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accounting Period
          </label>
          <DatePicker
            name="period"
            dateFormat="YYYY-MM"
            autoClose={true}
            placeholder="Select Period"
            value={periodValue}
            onChange={(e) => {
              const newValue = new Date(e.target.value)
                .toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "numeric",
                })
                .split("/")
                .reverse()
                .join("/");
              const newLabel = new Date(e.target.value).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                },
              );
              setPeriodValue(newLabel);
              setPeriodStoredValue(newValue);
            }}
            className="bg-white"
          />
        </div>

        {/* Expense Account */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Xero Expense Account
          </label>
          <Select
            options={expenseAccountOptions}
            value={expenseValue}
            placeholder="Select Expense Account"
            searchable={true}
            onChange={(value) => {
              setExpenseValue(value as string);
              setExpenseLabel(
                expenseAccountOptions.find((option) => option.value === value)
                  ?.label || "",
              );
            }}
          />
        </div>

        {/* Total (Read Only) */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total:</span>
            <span className="text-lg font-bold text-gray-900">
              {item.total}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 p-4 bg-white flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Save Tags
        </button>
      </div>
    </div>
  );
}
