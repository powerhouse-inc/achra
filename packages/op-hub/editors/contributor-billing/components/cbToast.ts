import { useState, useEffect } from "react";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toasts: ToastItem[]) => void;

let nextId = 0;
let toasts: ToastItem[] = [];
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) {
    listener([...toasts]);
  }
}

function removeToast(id: number) {
  toasts = toasts.filter((t) => t.id !== id);
  emit();
}

export function cbToast(message: string, options?: { type?: ToastType }) {
  const id = nextId++;
  toasts = [...toasts, { id, message, type: options?.type ?? "info" }];
  emit();
  setTimeout(() => removeToast(id), 5000);
}

export function useToasts() {
  const [state, setState] = useState<ToastItem[]>([]);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  return { toasts: state, removeToast };
}
