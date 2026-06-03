import { FileText } from "lucide-react";

type LineItemsEmptyStateProps = {
  onAddItem: () => void;
};

export function LineItemsEmptyState({ onAddItem }: LineItemsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-6 px-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <div className="w-10 h-10 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
        <FileText className="w-5 h-5 text-gray-400" />
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-1">
        No line items yet
      </h3>
      <p className="text-sm text-gray-600 mb-4 text-center max-w-xs">
        Add your first line item to start building your invoice
      </p>
      <button
        onClick={onAddItem}
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm"
      >
        Add Your First Line Item
      </button>
    </div>
  );
}
