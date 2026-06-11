import { useState } from "react";
import { Button } from "@powerhousedao/document-engineering";
import type { Account } from "../../../document-models/account-transactions/v1/gen/types.js";

interface AccountSectionProps {
  account: Account;
  hasFetchedTransactions: boolean;
  onSetAccount: (address: string, name?: string) => void;
}

const inputClassName =
  "w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50";

export function AccountSection({
  account,
  hasFetchedTransactions,
  onSetAccount,
}: AccountSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState(account.account || "");
  const [name, setName] = useState(account.name || "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (address.trim()) {
      onSetAccount(address.trim(), name.trim() || undefined);
      setIsEditing(false);
    }
  }

  function handleStartEditing() {
    setAddress(account.account || "");
    setName(account.name || "");
    setIsEditing(true);
  }

  const hasAccount = account.account && account.account.trim() !== "";
  const isLocked = hasAccount && hasFetchedTransactions;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Account Settings
        </h2>
        {hasAccount && !isLocked && !isEditing && (
          <Button
            onClick={handleStartEditing}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm rounded-lg font-medium transition-colors"
          >
            Change Account
          </Button>
        )}
      </div>

      {!hasAccount && !isEditing ? (
        <div className="bg-status-warning/15 border border-status-warning/30 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-status-warning mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-status-warning">
                No Account Set
              </h3>
              <p className="text-sm text-foreground mt-1">
                Set an Ethereum address to start tracking transactions for this
                account.
              </p>
            </div>
            <Button
              onClick={handleStartEditing}
              className="ml-4 bg-status-warning hover:bg-status-warning/90 text-primary-foreground px-4 py-2 text-sm rounded-lg font-medium transition-colors"
            >
              Set Account
            </Button>
          </div>
        </div>
      ) : hasAccount && !isEditing ? (
        <div className="bg-status-success/15 border border-status-success/30 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-status-success mr-3 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-status-success">
                Account Configured{isLocked && " (Locked)"}
              </h3>
              <p className="text-sm text-foreground mt-1 font-mono break-all">
                {account.account}
              </p>
              {account.name && (
                <p className="text-sm text-muted-foreground mt-1">
                  Name: {account.name}
                </p>
              )}
              {isLocked && (
                <p className="text-xs text-muted-foreground mt-2">
                  Account is locked after fetching transactions. Create a new
                  document to use a different account.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {isLocked && (
            <p className="text-sm text-muted-foreground">
              Account changes are disabled after transactions have been fetched.
            </p>
          )}
          <div>
            <label
              htmlFor="account-address"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Ethereum Address *
            </label>
            <input
              id="account-address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="0x..."
              className={`${inputClassName} font-mono`}
              required
              disabled={Boolean(isLocked)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Enter the Ethereum address for this account
            </p>
          </div>
          <div>
            <label
              htmlFor="account-name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Account Name (Optional)
            </label>
            <input
              id="account-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Main Wallet"
              className={inputClassName}
              disabled={Boolean(isLocked)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              A friendly name for this account
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={Boolean(isLocked)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Set Account
            </Button>
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={Boolean(isLocked)}
              className="px-6 py-2 border border-border rounded-lg font-medium text-foreground hover:bg-accent transition-colors disabled:opacity-50"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
