import { X } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { generateId } from "document-model";
import { InputField } from "./inputField.js";
import { NumberForm } from "./numberForm.js";

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
  lineItemTag: any[];
};

type EditLineItemInput = {
  id: string;
  currency?: string;
  description?: string;
  quantity?: number;
  taxPercent?: number;
  totalPriceTaxExcl?: number;
  totalPriceTaxIncl?: number;
  unitPriceTaxExcl?: number;
  unitPriceTaxIncl?: number;
};

type LineItemMobileModalProps = {
  item?: Partial<LineItem>;
  currency: string;
  onSave: (item: EditLineItemInput) => void;
  onCancel: () => void;
  isNew?: boolean;
};

export function LineItemMobileModal({
  item,
  currency,
  onSave,
  onCancel,
  isNew = false,
}: LineItemMobileModalProps) {
  const [description, setDescription] = useState(item?.description ?? "");
  const [quantity, setQuantity] = useState<number | string>(
    item?.quantity ?? 1,
  );
  const [unitPriceTaxExcl, setUnitPriceTaxExcl] = useState<number | string>(
    item?.unitPriceTaxExcl ?? 0,
  );
  const [taxPercent, setTaxPercent] = useState<number | string>(
    item?.taxPercent ?? 0,
  );

  // Update state when item changes
  useEffect(() => {
    setDescription(item?.description ?? "");
    setQuantity(item?.quantity ?? 1);
    setUnitPriceTaxExcl(item?.unitPriceTaxExcl ?? 0);
    setTaxPercent(item?.taxPercent ?? 0);
  }, [item]);

  // Calculate totals
  const calculatedValues = useMemo(() => {
    const qty =
      typeof quantity === "string" ? parseFloat(quantity) || 1 : quantity;
    const unitPrice =
      typeof unitPriceTaxExcl === "string"
        ? parseFloat(unitPriceTaxExcl) || 0
        : unitPriceTaxExcl;
    const tax =
      typeof taxPercent === "string" ? parseFloat(taxPercent) || 0 : taxPercent;

    const taxRate = tax / 100;
    const unitPriceTaxIncl = unitPrice * (1 + taxRate);
    const totalPriceTaxExcl = qty * unitPrice;
    const totalPriceTaxIncl = qty * unitPriceTaxIncl;

    return {
      quantity: qty,
      unitPriceTaxExcl: unitPrice,
      unitPriceTaxIncl,
      taxPercent: tax,
      totalPriceTaxExcl,
      totalPriceTaxIncl,
    };
  }, [quantity, unitPriceTaxExcl, taxPercent]);

  const handleSave = () => {
    // For edit: use existing ID (if valid), For new or empty ID: generate ID
    const needsNewId = isNew || !item?.id || item.id === "";
    const lineItem = {
      id: needsNewId ? generateId() : item.id,
      currency,
      description,
      quantity: calculatedValues.quantity,
      unitPriceTaxExcl: calculatedValues.unitPriceTaxExcl,
      unitPriceTaxIncl: calculatedValues.unitPriceTaxIncl,
      taxPercent: calculatedValues.taxPercent,
      totalPriceTaxExcl: calculatedValues.totalPriceTaxExcl,
      totalPriceTaxIncl: calculatedValues.totalPriceTaxIncl,
    };
    onSave(lineItem as EditLineItemInput);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Cancel"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {isNew ? "Add Line Item" : "Edit Line Item"}
        </h2>
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
            Description *
          </label>
          <InputField
            value={description}
            handleInputChange={(e) => setDescription(e.target.value)}
            onBlur={() => {}}
            placeholder="Enter item description"
            className="w-full"
          />
        </div>

        {/* Quantity and Unit Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity *
            </label>
            <NumberForm
              number={quantity}
              handleInputChange={(e) => setQuantity(e.target.value)}
              precision={0}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unit Price *
            </label>
            <NumberForm
              number={unitPriceTaxExcl}
              handleInputChange={(e) => setUnitPriceTaxExcl(e.target.value)}
              precision={2}
              className="w-full"
            />
          </div>
        </div>

        {/* Tax % */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tax %
          </label>
          <NumberForm
            number={taxPercent}
            handleInputChange={(e) => setTaxPercent(e.target.value)}
            precision={2}
            className="w-full"
          />
        </div>

        {/* Calculated Totals - Read Only */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Calculated Totals
          </h3>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total (excl. tax):</span>
            <span className="font-medium text-gray-900">
              {currency}{" "}
              {calculatedValues.totalPriceTaxExcl.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax amount:</span>
            <span className="font-medium text-gray-900">
              {currency}{" "}
              {(
                calculatedValues.totalPriceTaxIncl -
                calculatedValues.totalPriceTaxExcl
              ).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
            <span className="text-gray-900 font-semibold">
              Total (incl. tax):
            </span>
            <span className="font-bold text-gray-900">
              {currency}{" "}
              {calculatedValues.totalPriceTaxIncl.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 p-4 bg-white flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          Save Line Item
        </button>
      </div>
    </div>
  );
}
