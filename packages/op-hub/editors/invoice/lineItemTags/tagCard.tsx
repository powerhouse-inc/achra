import { MoreVertical, Edit } from "lucide-react";
import { useState } from "react";

type TagAssignmentRow = {
  id: string;
  item: string;
  period: string;
  expenseAccount: string;
  total: string;
  lineItemTag: any[];
};

type TagCardProps = {
  item: TagAssignmentRow;
  onEdit: () => void;
};

export function TagCard({ item, onEdit }: TagCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get tag values
  const periodTag = item.lineItemTag.find(
    (tag) => tag.dimension === "accounting-period",
  );
  const expenseTag = item.lineItemTag.find(
    (tag) => tag.dimension === "xero-expense-account",
  );

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
              {item.item || "Untitled Item"}
            </h5>
          </div>
          <button
            className="p-1 hover:bg-gray-100 rounded"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Primary Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            {periodTag?.label || "No period set"}
          </div>
          <div className="font-semibold text-gray-900">{item.total}</div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-gray-100 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Expense Account:</span>
              <span className="text-gray-900 text-right max-w-[60%]">
                {expenseTag?.label || "Not set"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Edit Button */}
      <div className="border-t border-gray-200 bg-gray-50">
        <button
          className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4 text-blue-600" />
          <span>Edit Tags</span>
        </button>
      </div>
    </div>
  );
}
