// Simple notification dialog component
type NotificationProps = {
  show: boolean;
  type: "success" | "error";
  title: string;
  message?: string;
  details?: string[];
  onClose: () => void;
};

export const NotificationDialog = ({
  show,
  type,
  title,
  message,
  details,
  onClose,
}: NotificationProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-border bg-card shadow-lg">
        {/* Header */}
        <div
          className={`border-b border-border px-6 py-4 ${
            type === "error" ? "bg-destructive/15" : "bg-status-success/20"
          }`}
        >
          <div className="flex items-center gap-3">
            {type === "error" ? (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/15">
                <svg
                  className="h-5 w-5 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-success/20">
                <svg
                  className="h-5 w-5 text-status-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
            <h3
              className={`text-lg font-semibold ${
                type === "error" ? "text-destructive" : "text-status-success"
              }`}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {message && (
            <p className="text-sm leading-relaxed text-foreground">{message}</p>
          )}
          {details && details.length > 0 && (
            <div className="mt-4 rounded-lg border border-border bg-muted p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Affected Items:
              </p>
              <ul className="space-y-1">
                {details.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-foreground before:mr-2 before:content-['•']"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
              type === "error"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : "bg-status-success text-primary-foreground hover:bg-status-success/90"
            }`}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
