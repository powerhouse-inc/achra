import { useState } from "react";
import { Button, Form, StringField } from "@powerhousedao/document-engineering";
import type { Account } from "../../../document-models/account-transactions/v1/gen/types.js";

interface AccountSectionProps {
  account: Account;
  hasFetchedTransactions: boolean;
  onSetAccount: (address: string, name?: string) => void;
}

export function AccountSection({
  account,
  hasFetchedTransactions,
  onSetAccount,
}: AccountSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  function handleSubmit(values: { address: string; name?: string }) {
    if (values.address) {
      onSetAccount(values.address, values.name);
      setIsEditing(false);
    }
  }

  const hasAccount = account.account && account.account.trim() !== "";
  const isLocked = hasAccount && hasFetchedTransactions;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Account Settings
        </h2>
        {hasAccount && !isLocked && !isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
          >
            Change Account
          </Button>
        )}
      </div>

      {!hasAccount && !isEditing ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-yellow-400 mr-3"
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
              <h3 className="text-sm font-medium text-yellow-800">
                No Account Set
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Set an Ethereum address to start tracking transactions for this
                account.
              </p>
            </div>
            <Button
              onClick={() => setIsEditing(true)}
              className="ml-4 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 text-sm"
            >
              Set Account
            </Button>
          </div>
        </div>
      ) : hasAccount && !isEditing ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-green-400 mr-3"
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
              <h3 className="text-sm font-medium text-green-800">
                Account Configured{isLocked && " (Locked)"}
              </h3>
              <p className="text-sm text-green-700 mt-1 font-mono break-all">
                {account.account}
              </p>
              {account.name && (
                <p className="text-sm text-green-600 mt-1">
                  Name: {account.name}
                </p>
              )}
              {isLocked && (
                <p className="text-xs text-gray-600 mt-2">
                  Account is locked after fetching transactions. Create a new
                  document to use a different account.
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Form
          onSubmit={handleSubmit}
          defaultValues={{
            address: account.account || "",
            name: account.name || "",
          }}
          className="space-y-4"
        >
          {isLocked && (
            <p className="text-sm text-gray-600">
              Account changes are disabled after transactions have been fetched.
            </p>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ethereum Address *
            </label>
            <StringField
              name="address"
              placeholder="0x..."
              className="w-full font-mono"
              required
              disabled={Boolean(isLocked)}
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter the Ethereum address for this account
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Account Name (Optional)
            </label>
            <StringField
              name="name"
              placeholder="My Main Wallet"
              className="w-full"
              disabled={Boolean(isLocked)}
            />
            <p className="text-xs text-gray-500 mt-1">
              A friendly name for this account
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              disabled={Boolean(isLocked)}
            >
              Set Account
            </Button>
            <Button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2"
              disabled={Boolean(isLocked)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
}
