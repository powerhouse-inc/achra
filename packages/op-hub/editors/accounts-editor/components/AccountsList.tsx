import type {
  AccountEntry,
  KycAmlStatusTypeInput,
} from "../../../document-models/accounts/v1/gen/schema/types.js";
import { AccountCard } from "./AccountCard.js";

interface AccountsListProps {
  accounts: AccountEntry[];
  onEdit: (account: AccountEntry) => void;
  onDelete: (id: string) => void;
  onUpdateKycStatus: (id: string, status: KycAmlStatusTypeInput) => void;
  onCreateTransactions?: (account: AccountEntry) => void;
  creatingTransactionsFor?: string;
}

export function AccountsList({
  accounts,
  onEdit,
  onDelete,
  onUpdateKycStatus,
  onCreateTransactions,
  creatingTransactionsFor,
}: AccountsListProps) {
  if (accounts.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No accounts yet
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Get started by adding your first account
        </p>
      </div>
    );
  }

  const accountsWithoutTransactions = accounts.filter(
    (account) => !account.accountTransactionsId,
  );

  return (
    <div className="space-y-4">
      {/* Account Count and Status */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {accounts.length} account{accounts.length !== 1 ? "s" : ""}
        </div>
        {accountsWithoutTransactions.length > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>
              {accountsWithoutTransactions.length} account
              {accountsWithoutTransactions.length !== 1 ? "s" : ""} need
              {accountsWithoutTransactions.length === 1 ? "s" : ""} transaction
              history
            </span>
          </div>
        )}
      </div>

      {/* Full-width Card List */}
      <div className="space-y-4">
        {accounts.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdateKycStatus={onUpdateKycStatus}
            onCreateTransactions={onCreateTransactions}
            isCreatingTransactions={creatingTransactionsFor === account.id}
          />
        ))}
      </div>
    </div>
  );
}
