import { Button } from "@powerhousedao/document-engineering";
import type { TransactionEntry } from "../../../document-models/account-transactions/v1/gen/types.js";

interface TransactionsTableProps {
  transactions: TransactionEntry[];
  onEdit: (transaction: TransactionEntry) => void;
  onDelete: (id: string) => void;
}

export function TransactionsTable({
  transactions,
  onEdit,
  onDelete,
}: TransactionsTableProps) {
  // Sort transactions by datetime, newest first
  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.datetime).getTime();
    const dateB = new Date(b.datetime).getTime();
    return dateB - dateA; // Descending order (newest first)
  });

  function formatAmount(
    amount: string | { unit: string; value: string },
  ): string {
    try {
      if (typeof amount === "object" && amount.value) {
        const num = parseFloat(amount.value);
        return new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        }).format(num);
      } else if (typeof amount === "string") {
        const num = parseFloat(amount);
        return new Intl.NumberFormat("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 6,
        }).format(num);
      }
      return typeof amount === "object"
        ? JSON.stringify(amount)
        : String(amount);
    } catch {
      return typeof amount === "object"
        ? JSON.stringify(amount)
        : String(amount);
    }
  }

  function formatDate(dateString: string): string {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-foreground">
          No transactions yet
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Get started by adding your first transaction
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Counter Party
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Direction
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Token
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Tx Hash
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Period
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-accent">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {formatDate(transaction.datetime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {transaction.counterParty ? (
                    <span className="font-mono text-xs bg-muted text-foreground px-2 py-1 rounded">
                      {transaction.counterParty.slice(0, 8)}...
                      {transaction.counterParty.slice(-6)}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground font-mono">
                  {formatAmount(transaction.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.direction === "INFLOW"
                        ? "bg-status-success/20 text-status-success"
                        : "bg-destructive/15 text-destructive"
                    }`}
                  >
                    {transaction.direction === "INFLOW" ? (
                      <>
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        IN
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        OUT
                      </>
                    )}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-status-progress/20 text-status-progress">
                    {transaction.details.token}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {transaction.details.txHash ? (
                    <a
                      href={`https://etherscan.io/tx/${transaction.details.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-primary hover:text-primary/80 underline"
                    >
                      {transaction.details.txHash.slice(0, 10)}...
                    </a>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                  {transaction.accountingPeriod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      onClick={() => onEdit(transaction)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 text-xs rounded-lg font-medium transition-colors"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => onDelete(transaction.id)}
                      className="bg-destructive hover:bg-destructive/90 text-destructive-foreground px-3 py-1 text-xs rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
