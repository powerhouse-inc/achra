// Status can be any string - SubscriptionStatus, InvoiceStatus, KycStatus, etc.

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

const statusColors: Record<string, string> = {
  // Subscription statuses
  ACTIVE: "si-badge--emerald",
  PENDING: "si-badge--amber",
  PAUSED: "si-badge--slate",
  EXPIRING: "si-badge--orange",
  CANCELLED: "si-badge--rose",
  // Invoice statuses
  DRAFT: "si-badge--slate",
  SENT: "si-badge--sky",
  PAID: "si-badge--emerald",
  PARTIALLY_PAID: "si-badge--amber",
  OVERDUE: "si-badge--rose",
  REFUNDED: "si-badge--violet",
  // KYC statuses
  NOT_STARTED: "si-badge--slate",
  NOT_REQUIRED: "si-badge--slate",
  VERIFIED: "si-badge--emerald",
  REJECTED: "si-badge--rose",
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const colorClass = statusColors[status] || "si-badge--slate";
  const sizeClass = size === "sm" ? "si-badge--sm" : "";

  return (
    <span className={`si-badge ${colorClass} ${sizeClass}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}
