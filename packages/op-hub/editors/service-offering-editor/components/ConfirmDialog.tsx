import { useEffect, useRef } from "react";

interface ConfirmDialogProps {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKey);
    confirmRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[2000]"
      style={{ animation: "so-confirm-fade-in 0.15s ease-out" }}
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-[380px] w-[90%] text-center"
        style={{
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          animation: "so-confirm-scale-in 0.15s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <div
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full mb-3 ${variant === "danger" ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-500"}`}
        >
          {variant === "danger" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              />
            </svg>
          )}
        </div>
        <h3
          className="text-base font-bold text-slate-800 m-0 mb-1.5"
          id="confirm-title"
        >
          {title}
        </h3>
        <p
          className="text-[0.8125rem] text-slate-500 leading-6 m-0 mb-5"
          id="confirm-message"
        >
          {message}
        </p>
        <div className="flex justify-center gap-2">
          <button
            className="px-5 py-2 text-[0.8125rem] font-semibold border-none rounded-lg cursor-pointer transition-all duration-150 bg-slate-100 text-slate-600 hover:bg-slate-200"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            className={`px-5 py-2 text-[0.8125rem] font-semibold border-none rounded-lg cursor-pointer transition-all duration-150 ${variant === "danger" ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-amber-500 text-white hover:bg-amber-600"}`}
            style={
              variant === "danger"
                ? { boxShadow: "0 2px 6px rgba(244, 63, 94, 0.3)" }
                : { boxShadow: "0 2px 6px rgba(245, 158, 11, 0.3)" }
            }
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
