import type React from "react";

interface ConfirmationModalProps {
  open: boolean;
  header: React.ReactNode;
  onCancel: () => void;
  onContinue: () => void;
  cancelLabel?: string;
  continueLabel?: string;
  children?: React.ReactNode;
  continueDisabled?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  header,
  onCancel,
  onContinue,
  cancelLabel = "Cancel",
  continueLabel = "Continue",
  children,
  continueDisabled = false,
}) => {
  if (!open) return null;

  return (
    <div className="contributor-billing-modal fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="border-b border-slate-100 pb-3 text-xl font-semibold text-gray-800">
          {header}
        </div>
        <div className="my-5 rounded-lg bg-slate-50 p-4 text-center flex flex-col items-center justify-center min-h-[64px]">
          {children}
        </div>
        <div className="mt-6 flex justify-between gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 min-h-[44px] min-w-[120px] text-sm font-medium py-2.5 px-5 rounded-lg outline-none active:opacity-75 hover:bg-slate-100 transition-colors bg-slate-50 text-slate-700"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={continueDisabled}
            className={`flex-1 min-h-[44px] min-w-[120px] text-sm font-medium py-2.5 px-5 rounded-lg outline-none active:opacity-75 transition-colors bg-gray-800 text-white hover:bg-gray-700 ${
              continueDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
