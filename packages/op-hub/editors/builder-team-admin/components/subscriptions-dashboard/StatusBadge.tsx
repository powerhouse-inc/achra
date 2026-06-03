/** Text-only Tailwind classes; pairs with STATUS_STYLES for badge labels and inline amounts */
export const STATUS_TEXT_COLORS: Record<string, string> = {
  ACTIVE: "text-emerald-700",
  PROVISIONING: "text-blue-700",
  DRAFT: "text-stone-500",
  PENDING: "text-amber-700",
  SUSPENDED: "text-red-700",
  TERMINATED: "text-stone-500",
  CANCELLED: "text-stone-500",
  EXPIRING: "text-orange-700",
  PAUSED: "text-amber-600",
  TRIAL: "text-stone-500",
};

const STATUS_STYLES: Record<string, string> = {
  ACTIVE: `bg-emerald-100 ${STATUS_TEXT_COLORS.ACTIVE}`,
  PROVISIONING: `bg-blue-100 ${STATUS_TEXT_COLORS.PROVISIONING}`,
  DRAFT: `bg-stone-100 ${STATUS_TEXT_COLORS.DRAFT}`,
  PENDING: `bg-amber-100 ${STATUS_TEXT_COLORS.PENDING}`,
  SUSPENDED: `bg-red-100 ${STATUS_TEXT_COLORS.SUSPENDED}`,
  TERMINATED: `bg-stone-200 ${STATUS_TEXT_COLORS.TERMINATED}`,
  CANCELLED: `bg-stone-200 ${STATUS_TEXT_COLORS.CANCELLED}`,
  EXPIRING: `bg-orange-100 ${STATUS_TEXT_COLORS.EXPIRING}`,
  PAUSED: `bg-amber-100 ${STATUS_TEXT_COLORS.PAUSED}`,
  TRIAL: `bg-stone-100 ${STATUS_TEXT_COLORS.TRIAL}`,
};

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-stone-100 text-stone-500";
  const label = status.charAt(0) + status.slice(1).toLowerCase();

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {label}
    </span>
  );
}
