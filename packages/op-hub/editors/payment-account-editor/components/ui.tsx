import type { ReactNode } from "react";

type AlertVariant = "info" | "success" | "warning" | "destructive";

const alertStyles: Record<AlertVariant, string> = {
  info: "border-status-progress/40 bg-status-progress/10 text-status-progress",
  success: "border-status-success/40 bg-status-success/10 text-status-success",
  warning: "border-status-warning/40 bg-status-warning/10 text-status-warning",
  destructive: "border-destructive/40 bg-destructive/10 text-destructive",
};

export function Alert({
  variant,
  title,
  children,
  className,
}: {
  variant: AlertVariant;
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border p-4 text-sm ${alertStyles[variant]} ${className ?? ""}`}
    >
      <p className="font-semibold">{title}</p>
      {children ? <div className="mt-1">{children}</div> : null}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function StatusRow({
  label,
  description,
  ok,
  okLabel = "Enabled",
}: {
  label: string;
  description?: string;
  ok: boolean;
  okLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-accent-foreground">{label}</p>
        {description ? (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <span
        className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${
          ok
            ? "bg-status-success/30 text-status-success"
            : "border border-border text-muted-foreground"
        }`}
      >
        {ok ? okLabel : "Pending"}
      </span>
    </div>
  );
}
