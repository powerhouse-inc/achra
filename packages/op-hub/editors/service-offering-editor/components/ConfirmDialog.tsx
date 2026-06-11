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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[2000]"
      style={{ animation: "so-confirm-fade-in 0.15s ease-out" }}
      onClick={onCancel}
    >
      <div
        className="bg-card border border-border rounded-xl p-6 max-w-[380px] w-[90%] text-center"
        style={{
          boxShadow: "var(--shadow-lg)",
          animation: "so-confirm-scale-in 0.15s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <div
          className={`inline-flex items-center justify-center w-11 h-11 rounded-full mb-3 ${variant === "danger" ? "bg-destructive/15 text-destructive" : "bg-status-warning/20 text-status-warning"}`}
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
          className="text-base font-bold text-foreground m-0 mb-1.5"
          id="confirm-title"
        >
          {title}
        </h3>
        <p
          className="text-[0.8125rem] text-muted-foreground leading-6 m-0 mb-5"
          id="confirm-message"
        >
          {message}
        </p>
        <div className="flex justify-center gap-2">
          <button
            className="px-5 py-2 text-[0.8125rem] font-semibold border-none rounded-lg cursor-pointer transition-all duration-150 bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            className={`px-5 py-2 text-[0.8125rem] font-semibold border-none rounded-lg cursor-pointer transition-all duration-150 ${variant === "danger" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "bg-status-warning text-primary-foreground hover:bg-status-warning/90"}`}
            style={
              variant === "danger"
                ? {
                    boxShadow:
                      "0 2px 6px color-mix(in oklab, var(--destructive) 30%, transparent)",
                  }
                : {
                    boxShadow:
                      "0 2px 6px color-mix(in oklab, var(--status-warning) 30%, transparent)",
                  }
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
