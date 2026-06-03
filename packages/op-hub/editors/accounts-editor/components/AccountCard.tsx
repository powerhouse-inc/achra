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
    Source: "bg-purple-100 text-purple-800",
    Internal: "bg-blue-100 text-blue-800",
    Destination: "bg-green-100 text-green-800",
    External: "bg-orange-100 text-orange-800",
  };

  function handleKycStatusChange(status: KycAmlStatusTypeInput) {
    onUpdateKycStatus(account.id, status);
    setShowKycMenu(false);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {account.name}
            </h3>
            <p className="text-sm text-gray-600 font-mono">{account.account}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(account)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:outline-none"
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
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus:outline-none"
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
              <span className="text-sm font-medium text-gray-500">Type:</span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${accountTypeColors[account.type]}`}
              >
                {account.type}
              </span>
            </div>
          )}

          {account.budgetPath && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                Budget Path:
              </span>
              <span className="text-sm text-gray-900">
                {account.budgetPath}
              </span>
            </div>
          )}

          {account.accountTransactionsId && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">
                Transactions ID:
              </span>
              <span className="text-sm text-gray-900 font-mono">
                {account.accountTransactionsId}
              </span>
            </div>
          )}

          {account.chain && account.chain.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-gray-500">Chains:</span>
              <div className="flex flex-wrap gap-1.5">
                {account.chain.map((chain, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {chain}
                  </span>
                ))}
              </div>
            </div>
          )}

          {account.owners && account.owners.length > 0 && (
            <div className="flex items-start gap-2">
              <span className="text-sm font-medium text-gray-500">Owners:</span>
              <div className="flex flex-wrap gap-1.5">
                {account.owners.map((owner, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-100 text-indigo-700"
                  >
                    {owner}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                KYC/AML Status:
              </span>
              <div className="relative">
                <button
                  id={`kyc-status-button-${account.id}`}
                  onClick={() => setShowKycMenu(!showKycMenu)}
                  className="hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:outline-none rounded"
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
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby={`kyc-status-button-${account.id}`}
                    >
                      <div className="py-1">
                        <button
                          role="menuitem"
                          onClick={() => handleKycStatusChange("PASSED")}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-900 flex items-center gap-2 focus:bg-green-50 focus:text-green-900 focus:outline-none"
                        >
                          <span
                            className="w-2 h-2 rounded-full bg-green-500"
                            aria-hidden="true"
                          />
                          Passed
                        </button>
                        <button
                          role="menuitem"
                          onClick={() => handleKycStatusChange("PENDING")}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50 hover:text-yellow-900 flex items-center gap-2 focus:bg-yellow-50 focus:text-yellow-900 focus:outline-none"
                        >
                          <span
                            className="w-2 h-2 rounded-full bg-yellow-500"
                            aria-hidden="true"
                          />
                          Pending
                        </button>
                        <button
                          role="menuitem"
                          onClick={() => handleKycStatusChange("FAILED")}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-900 flex items-center gap-2 focus:bg-red-50 focus:text-red-900 focus:outline-none"
                        >
                          <span
                            className="w-2 h-2 rounded-full bg-red-500"
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
                    className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3 transition-colors text-left"
                    aria-label={`View transaction history for ${account.name}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-blue-600"
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
                          <span className="text-sm font-medium text-blue-900">
                            View Transaction History
                          </span>
                          <p className="text-xs text-blue-600 mt-0.5">
                            Transactions synced for reporting
                          </p>
                        </div>
                      </div>
                      <svg
                        className="w-5 h-5 text-blue-600 flex-shrink-0"
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
                    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <svg
                        className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
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
                        <p className="text-sm font-medium text-amber-900">
                          No transaction history
                        </p>
                        <p className="text-xs text-amber-700 mt-0.5">
                          Fetch transactions to enable accurate expense
                          reporting
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => onCreateTransactions(account)}
                      disabled={isCreatingTransactions}
                      className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
                    >
                      {isCreatingTransactions ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-4 w-4 text-white"
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
