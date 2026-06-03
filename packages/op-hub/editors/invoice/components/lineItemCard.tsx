import { Edit, Trash2, MoreVertical } from "lucide-react";
import { formatNumber } from "../lineItems.js";
import { useState } from "react";

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

type LineItemCardProps = {
  item: LineItem;
  onEdit: () => void;
  onDelete: () => void;
  currency: string;
};

export function LineItemCard({
  item,
  onEdit,
  onDelete,
  currency,
}: LineItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-3 overflow-hidden">
      {/* Card Header */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h5 className="font-medium text-gray-900 text-sm">
              {item.description || "Untitled Item"}
            </h5>
          </div>
          <button
            className="p-1 hover:bg-gray-100 rounded"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Primary Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-600">
            <span>Qty: {item.quantity}</span>
            <span>•</span>
            <span>
              {currency} {formatNumber(item.unitPriceTaxExcl)}
            </span>
          </div>
          <div className="font-semibold text-gray-900">
            {currency} {formatNumber(item.totalPriceTaxIncl)}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tax %:</span>
              <span className="text-gray-900">{item.taxPercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total (excl. tax):</span>
              <span className="text-gray-900">
                {currency} {formatNumber(item.totalPriceTaxExcl)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unit Price (incl. tax):</span>
              <span className="text-gray-900">
                {currency} {formatNumber(item.unitPriceTaxIncl)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Menu Dropdown */}
      {showMenu && (
        <div className="border-t border-gray-200 bg-gray-50">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setShowMenu(false);
            }}
          >
            <Edit className="w-4 h-4 text-blue-600" />
            <span>Edit Line Item</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-red-50 text-red-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              if (confirm("Delete this line item?")) {
                onDelete();
              }
              setShowMenu(false);
            }}
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}
