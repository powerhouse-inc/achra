/** Text-only Tailwind classes; pairs with STATUS_STYLES for badge labels and inline amounts */
export const STATUS_TEXT_COLORS: Record<string, string> = {
  ACTIVE: "text-status-success",
  PROVISIONING: "text-status-progress",
  DRAFT: "text-muted-foreground",
  PENDING: "text-status-warning",
  SUSPENDED: "text-destructive",
  TERMINATED: "text-muted-foreground",
  CANCELLED: "text-muted-foreground",
  EXPIRING: "text-status-warning",
  PAUSED: "text-status-warning",
  TRIAL: "text-muted-foreground",
};

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: `bg-status-success/20 ${STATUS_TEXT_COLORS.ACTIVE}`,
  PROVISIONING: `bg-status-progress/20 ${STATUS_TEXT_COLORS.PROVISIONING}`,
  DRAFT: `bg-muted ${STATUS_TEXT_COLORS.DRAFT}`,
  PENDING: `bg-status-warning/20 ${STATUS_TEXT_COLORS.PENDING}`,
  SUSPENDED: `bg-destructive/15 ${STATUS_TEXT_COLORS.SUSPENDED}`,
  TERMINATED: `bg-muted ${STATUS_TEXT_COLORS.TERMINATED}`,
  CANCELLED: `bg-muted ${STATUS_TEXT_COLORS.CANCELLED}`,
  EXPIRING: `bg-status-warning/20 ${STATUS_TEXT_COLORS.EXPIRING}`,
  PAUSED: `bg-status-warning/20 ${STATUS_TEXT_COLORS.PAUSED}`,
  TRIAL: `bg-muted ${STATUS_TEXT_COLORS.TRIAL}`,
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-muted text-muted-foreground";
  const label = status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {label}
    </span>
  );
}
