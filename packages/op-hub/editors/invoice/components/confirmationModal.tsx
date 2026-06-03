import React from "react";

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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-6">
        <div className="border-b border-slate-100 pb-2 text-2xl font-bold text-gray-800">
          {header}
        </div>
        <div className="my-6 rounded-md bg-slate-50 p-4 text-center flex flex-col items-center justify-center min-h-[64px]">
          {children}
        </div>
        <div className="mt-8 flex justify-between gap-3">
          <button
            onClick={onCancel}
            className="flex-1 min-h-[48px] min-w-[142px] text-base font-semibold py-3 px-6 rounded-xl outline-none active:opacity-75 hover:scale-105 transform transition-all bg-slate-50 text-slate-800"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onContinue}
            disabled={continueDisabled}
            className={`flex-1 min-h-[48px] min-w-[142px] text-base font-semibold py-3 px-6 rounded-xl outline-none active:opacity-75 hover:scale-105 transform transition-all bg-gray-800 text-gray-50 ${continueDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
