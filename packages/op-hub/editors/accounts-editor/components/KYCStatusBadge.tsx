import type { KycAmlStatusType } from "../../../document-models/accounts/v1/gen/schema/types.js";

interface KYCStatusBadgeProps {
  status: KycAmlStatusType | null | undefined;
}

export function KYCStatusBadge({ status }: KYCStatusBadgeProps) {
  if (!status) {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
        No Status
      </span>
    );
  }

  const styles = {
    PASSED: "bg-status-success/20 text-status-success border-status-success/30",
    PENDING:
      "bg-status-warning/20 text-status-warning border-status-warning/30",
    FAILED: "bg-destructive/15 text-destructive border-destructive/30",
  };

  const icons = {
    PASSED: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    PENDING: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
    ),
    FAILED: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {icons[status]}
      <span>KYC/AML {status}</span>
    </span>
  );
}
