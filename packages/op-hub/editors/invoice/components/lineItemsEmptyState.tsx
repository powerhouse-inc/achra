import { FileText } from "lucide-react";

type LineItemsEmptyStateProps = {
  onAddItem: () => void;
};

export function LineItemsEmptyState({ onAddItem }: LineItemsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 bg-muted rounded-lg border-2 border-dashed border-input">
      <div className="w-10 h-10 mb-3 bg-muted rounded-full flex items-center justify-center">
        <FileText className="w-5 h-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">
        No line items yet
      </h3>
      <p className="text-sm text-muted-foreground mb-4 text-center max-w-xs">
        Add your first line item to start building your invoice
      </p>
      <button
        onClick={onAddItem}
        className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
      >
        Add Your First Line Item
      </button>
    </div>
  );
}
