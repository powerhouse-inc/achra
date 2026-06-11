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
  color = "bg-status-progress/20 text-status-progress",
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
          <span className="font-medium text-foreground">{title}</span>
          <span
            className={`inline-flex items-center justify-center rounded-full text-xs font-semibold px-2 py-0.5 min-w-[24px] ${color}`}
          >
            {count}
          </span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {title === "Draft" && invoiceDocModel && (
          <button
            type="button"
            className="bg-card text-foreground border border-border rounded px-3 py-1 text-sm font-medium hover:bg-accent transition-colors"
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
          <div className="relative bg-card rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Create New Invoice
              </h3>
              <button
                type="button"
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mb-4">
              <label
                htmlFor="invoice-name"
                className="block text-sm font-medium text-foreground mb-1"
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
                className="w-full bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-md hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmCreate}
                disabled={!invoiceName.trim()}
                className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
