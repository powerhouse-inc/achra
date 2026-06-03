import { useToasts } from "./cbToast.js";

const typeStyles: Record<string, string> = {
  success: "bg-green-600",
  error: "bg-red-600",
  warning: "bg-yellow-500 text-black",
  info: "bg-blue-600",
};

export function ToastRenderer() {
  const { toasts, removeToast } = useToasts();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${typeStyles[t.type] ?? typeStyles.info} text-white px-4 py-3 rounded shadow-lg text-sm flex items-start gap-2 animate-[slideIn_0.2s_ease-out]`}
        >
          <span className="flex-1">{t.message}</span>
          <button
            type="button"
            className="opacity-70 hover:opacity-100 text-lg leading-none"
            onClick={() => removeToast(t.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
