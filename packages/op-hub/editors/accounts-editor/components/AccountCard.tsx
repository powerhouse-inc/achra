import { useState } from "react";
import { Button } from "@powerhousedao/document-engineering";
import { setSelectedNode } from "@powerhousedao/reactor-browser";
import type {
  AccountEntry,
  KycAmlStatusTypeInput,
} from "../../../document-models/accounts/v1/gen/schema/types.js";
import { KYCStatusBadge } from "./KYCStatusBadge.js";

interface AccountCardProps {
  account: AccountEntry;
  onEdit: (account: AccountEntry) => void;
  onDelete: (id: string) => void;
  onUpdateKycStatus: (id: string, status: KycAmlStatusTypeInput) => void;
  onCreateTransactions?: (account: AccountEntry) => void;
  isCreatingTransactions?: boolean;
}

export function AccountCard({
  account,
  onEdit,
  onDelete,
  onUpdateKycStatus,
  onCreateTransactions,
  isCreatingTransactions = false,
}: AccountCardProps) {
  const [showKycMenu, setShowKycMenu] = useState(false);

  const accountTypeColors = {
    Source: "bg-primary/15 text-primary",
    Internal: "bg-status-progress/20 text-status-progress",
    Destination: "bg-status-success/20 text-status-success",
    External: "bg-status-warning/20 text-status-warning",
  };

  function handleKycStatusChange(status: KycAmlStatusTypeInput) {
    onUpdateKycStatus(account.id, status);
    setShowKycMenu(false);
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {account.name}
            </h3>
            <p className="text-sm text-muted-foreground font-mono">
              {account.account}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(account)}
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none"
              title="Edit account"
              aria-label={`Edit account ${account.name}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(account.id)}
              className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/15 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2 focus:outline-none"
              title="Delete account"
              aria-label={`Delete account ${account.name}`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {account.type && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Type:
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${accountTypeColors[account.type]}`}
              >
                {account.type}
              </span>
            </div>
          )}

          {account.budgetPath && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Budget Path:
              </span>
              <span className="text-sm text-foreground">
                {account.budgetPath}
              </span>
            </div>
          )}

          {account.accountTransactionsId && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Transactions ID:
              </span>
              <span className="text-sm text-foreground font-mono">
                {account.accountTransactionsId}
              </span>
            </div>
          )}

          {account.chain && account.chain.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Chains:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {account.chain.map((chain, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {chain}
                  </span>
                ))}
              </div>
            </div>
          )}

          {account.owners && account.owners.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Owners:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {account.owners.map((owner, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/15 text-primary"
                  >
                    {owner}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground">
                KYC/AML Status:
              </span>
              <div className="relative">
                <button
                  id={`kyc-status-button-${account.id}`}
                  onClick={() => setShowKycMenu(!showKycMenu)}
                  className="hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:outline-none rounded"
                  title="Update KYC/AML status"
                  aria-label={`Update KYC/AML status for ${account.name}, currently ${account.KycAmlStatus || "Not Set"}`}
                  aria-expanded={showKycMenu}
                  aria-haspopup="menu"
                >
                  <KYCStatusBadge status={account.KycAmlStatus} />
                </button>
                {showKycMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowKycMenu(false)}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute right-0 mt-2 w-48 bg-popover rounded-lg shadow-lg border border-border z-20"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`kyc-status-button-${account.id}`}
                    >
                      <div className="py-1">
                        <button
                          role="menuitem"
                          onClick={() => handleKycStatusChange("PASSED")}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-status-success/20 hover:text-status-success flex items-center gap-2 focus:bg-status-success/20 focus:text-status-success focus:outline-none"
                        >
                          <span
                            className="w-2 h-2 rounded-full bg-status-success"
                            aria-hidden="true"
                          />
                          Passed
                        </button>
                        <button
                          role="menuitem"
                          onClick={() => handleKycStatusChange("PENDING")}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-status-warning/20 hover:text-status-warning flex items-center gap-2 focus:bg-status-warning/20 focus:text-status-warning focus:outline-none"
                        >
                          <span
                            className="w-2 h-2 rounded-full bg-status-warning"
                            aria-hidden="true"
                          />
                          Pending
                        </button>
                        <button
                          role="menuitem"
                          onClick={() => handleKycStatusChange("FAILED")}
                          className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-destructive/15 hover:text-destructive flex items-center gap-2 focus:bg-destructive/15 focus:text-destructive focus:outline-none"
                        >
                          <span
                            className="w-2 h-2 rounded-full bg-destructive"
                            aria-hidden="true"
                          />
                          Failed
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Transaction History Section */}
            {onCreateTransactions && (
              <div className="flex flex-col gap-2">
                {account.accountTransactionsId ? (
                  // Show link to transactions document if it exists
                  <button
                    onClick={() =>
                      setSelectedNode(account.accountTransactionsId!)
                    }
                    className="w-full bg-status-progress/10 hover:bg-status-progress/20 border border-status-progress/30 rounded-lg p-3 transition-colors text-left"
                    aria-label={`View transaction history for ${account.name}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-status-progress"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-foreground">
                            View Transaction History
                          </span>
                          <p className="text-xs text-status-progress mt-0.5">
                            Transactions synced for reporting
                          </p>
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-status-progress flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </button>
                ) : (
                  // Show warning and create button if no transactions document exists
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-3 bg-status-warning/15 border border-status-warning/30 rounded-lg">
                      <svg
                        className="w-5 h-5 text-status-warning flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-status-warning">
                          No transaction history
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Fetch transactions to enable accurate expense
                          reporting
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => onCreateTransactions(account)}
                      disabled={isCreatingTransactions}
                      className="w-full bg-status-success hover:bg-status-success/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground px-4 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
                    >
                      {isCreatingTransactions ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-primary-foreground"
                            fill="none"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Fetching transactions…
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                          Fetch Transaction History
                        </span>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
