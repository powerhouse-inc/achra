import { useState, useCallback, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import type { DocumentModelModule } from "document-model";

interface InvoiceTableSectionProps {
  title: string;
  count: number;
  children: React.ReactNode;
  color?: string;
  onSelectDocumentModel?: (model: DocumentModelModule, name: string) => void;
  filteredDocumentModels?: DocumentModelModule[];
  defaultExpanded?: boolean;
}

export const InvoiceTableSection = ({
  title,
  count,
  children,
  color = "bg-blue-100 text-blue-600",
  onSelectDocumentModel,
  filteredDocumentModels,
  defaultExpanded = true,
}: InvoiceTableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invoiceName, setInvoiceName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const invoiceDocModel = filteredDocumentModels?.find(
    (model) => model.documentModel?.global?.id === "powerhouse/invoice",
  );

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleOpenModal = useCallback(() => {
    setInvoiceName("");
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setInvoiceName("");
  }, []);

  const handleConfirmCreate = useCallback(() => {
    if (invoiceDocModel && invoiceName.trim()) {
      onSelectDocumentModel?.(invoiceDocModel, invoiceName.trim());
      handleCloseModal();
    }
  }, [invoiceDocModel, invoiceName, onSelectDocumentModel, handleCloseModal]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && invoiceName.trim()) {
        handleConfirmCreate();
      } else if (e.key === "Escape") {
        handleCloseModal();
      }
    },
    [invoiceName, handleConfirmCreate, handleCloseModal],
  );

  // Focus input when modal opens
  useEffect(() => {
    if (isModalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <div className="contributor-billing-section mb-3">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity py-1"
        >
          <span className="font-medium text-gray-800">{title}</span>
          <span
            className={`inline-flex items-center justify-center rounded-full text-xs font-semibold px-2 py-0.5 min-w-[24px] ${color}`}
          >
            {count}
          </span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          )}
        </button>

        {title === "Draft" && invoiceDocModel && (
          <button
            type="button"
            className="bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium hover:bg-gray-50 transition-colors"
            onClick={handleOpenModal}
          >
            Create Invoice
          </button>
        )}
      </div>

      {isExpanded && <div className="mt-2">{children}</div>}

      {/* Create Invoice Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={handleCloseModal}
          />
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Create New Invoice
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="invoice-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Invoice Name
              </label>
              <input
                ref={inputRef}
                id="invoice-name"
                type="text"
                value={invoiceName}
                onChange={(e) => setInvoiceName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter invoice name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCreate}
                disabled={!invoiceName.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
