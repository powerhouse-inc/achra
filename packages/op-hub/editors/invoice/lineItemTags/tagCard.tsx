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
    <div className="bg-card border border-border rounded-lg mb-3 overflow-hidden shadow-sm">
      {/* Card Header */}
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h5 className="font-medium text-foreground text-sm">
              {item.item || "Untitled Item"}
            </h5>
          </div>
          <button
            className="p-1 hover:bg-accent rounded text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <MoreVertical className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Primary Info */}
        <div className="flex items-center justify-between text-sm">
          <div className="text-muted-foreground">
            {periodTag?.label || "No period set"}
          </div>
          <div className="font-semibold text-foreground">{item.total}</div>
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expense Account:</span>
              <span className="text-foreground text-right max-w-[60%]">
                {expenseTag?.label || "Not set"}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Edit Button */}
      <div className="border-t border-border bg-muted">
        <button
          className="w-full flex items-center justify-center gap-3 px-4 py-3 text-sm hover:bg-accent transition-colors text-foreground"
          onClick={onEdit}
        >
          <Edit className="w-4 h-4 text-primary" />
          <span>Edit Tags</span>
        </button>
      </div>
    </div>
  );
}
