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
    <div className="bg-card border border-border shadow-sm rounded-lg mb-3 overflow-hidden">
      {/* Card Header */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h5 className="font-medium text-foreground text-sm">
              {item.description || "Untitled Item"}
            </h5>
          </div>
          <button
            className="p-1 hover:bg-accent rounded text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Primary Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>Qty: {item.quantity}</span>
            <span>•</span>
            <span>
              {currency} {formatNumber(item.unitPriceTaxExcl)}
            </span>
          </div>
          <div className="font-semibold text-foreground">
            {currency} {formatNumber(item.totalPriceTaxIncl)}
          </div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax %:</span>
              <span className="text-foreground">{item.taxPercent}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total (excl. tax):</span>
              <span className="text-foreground">
                {currency} {formatNumber(item.totalPriceTaxExcl)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Unit Price (incl. tax):
              </span>
              <span className="text-foreground">
                {currency} {formatNumber(item.unitPriceTaxIncl)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action Menu Dropdown */}
      {showMenu && (
        <div className="border-t border-border bg-muted">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-foreground hover:bg-accent transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
              setShowMenu(false);
            }}
          >
            <Edit className="w-4 h-4 text-primary" />
            <span>Edit Line Item</span>
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left hover:bg-destructive/15 text-destructive transition-colors"
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
