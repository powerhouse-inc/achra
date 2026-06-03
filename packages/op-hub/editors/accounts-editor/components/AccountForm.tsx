import { useState } from "react";
import { Button } from "@powerhousedao/document-engineering";
import { Tooltip, TooltipProvider } from "@powerhousedao/design-system/ui";
import { usePHToast } from "@powerhousedao/reactor-browser";
import { Info } from "lucide-react";
import { isValidEthereumAddress } from "../../../scripts/alchemy/alchemyHelpers.js";
import type {
  AccountEntry,
  AccountTypeInput,
  KycAmlStatusTypeInput,
} from "../../../document-models/accounts/v1/gen/schema/types.js";

interface AccountFormProps {
  account?: AccountEntry;
  onSubmit: (values: {
    id?: string;
    account: string;
    name: string;
    budgetPath?: string;
    accountTransactionsId?: string;
    chain?: string[];
    type?: AccountTypeInput;
    owners?: string[];
    KycAmlStatus?: KycAmlStatusTypeInput;
  }) => void;
  onCancel: () => void;
}

export function AccountForm({ account, onSubmit, onCancel }: AccountFormProps) {
  const toast = usePHToast();
  const [formData, setFormData] = useState({
    account: account?.account || "",
    name: account?.name || "",
    budgetPath: account?.budgetPath || "",
    accountTransactionsId: account?.accountTransactionsId || "",
    chain: account?.chain?.join(", ") || "",
    type: account?.type || "",
    owners: account?.owners?.join(", ") || "",
    KycAmlStatus: account?.KycAmlStatus || "",
  });
  const [accountError, setAccountError] = useState<string>("");

  function validateAccount(address: string): boolean {
    if (!address || address.trim() === "") {
      setAccountError("Account address is required");
      return false;
    }
    if (!isValidEthereumAddress(address.trim())) {
      setAccountError(
        "Invalid Ethereum address format. Must be 0x followed by 40 hexadecimal characters.",
      );
      return false;
    }
    setAccountError("");
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate Ethereum address
    if (!validateAccount(formData.account)) {
      const accountInput = e.currentTarget.querySelector<HTMLInputElement>(
        'input[name="account"]',
      );
      if (accountInput) {
        accountInput.focus();
      }
      return;
    }

    const chain = formData.chain
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c);
    const owners = formData.owners
      .split(",")
      .map((o) => o.trim())
      .filter((o) => o);

    // Validate required fields with custom message
    const typeSelect = e.currentTarget.querySelector<HTMLSelectElement>(
      'select[name="accountType"]',
    );
    if (!formData.type) {
      if (typeSelect) {
        typeSelect.setCustomValidity("Please select an Account Type");
        typeSelect.reportValidity();
      } else {
        toast?.("Account Type is required", { type: "warning" });
      }
      return;
    } else if (typeSelect) {
      typeSelect.setCustomValidity(""); // Clear any previous custom message
    }

    onSubmit({
      ...(account?.id && { id: account.id }),
      account: formData.account.trim(),
      name: formData.name,
      budgetPath: formData.budgetPath || undefined,
      accountTransactionsId: formData.accountTransactionsId || undefined,
      chain: chain.length > 0 ? chain : undefined,
      type: formData.type as AccountTypeInput, // Required field
      owners: owners.length > 0 ? owners : undefined,
      KycAmlStatus:
        (formData.KycAmlStatus as KycAmlStatusTypeInput | "") || undefined,
    });
  }

  return (
    <>
      <style>{`
        input[name="account"]::placeholder {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
      `}</style>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="account-address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Account <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="account-address"
                name="account"
                value={formData.account}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, account: value });
                  // Clear error when user starts typing
                  if (accountError) {
                    setAccountError("");
                  }
                }}
                onBlur={(e) => {
                  // Validate on blur
                  validateAccount(e.target.value);
                }}
                placeholder="e.g., 0x1234...abcd"
                spellCheck={false}
                autoComplete="off"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  accountError
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                required
              />
              {accountError && (
                <p className="mt-1 text-sm text-red-600">{accountError}</p>
              )}
              {!accountError && formData.account && (
                <p className="mt-1 text-xs text-gray-500">
                  Ethereum address format: 0x followed by 40 hexadecimal
                  characters
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="account-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="account-name"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Main Treasury"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <TooltipProvider delayDuration={0}>
                <label
                  htmlFor="account-type"
                  className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2"
                >
                  Account Type <span className="text-red-500">*</span>
                  <Tooltip
                    content={
                      <div className="text-xs">
                        <div className="font-semibold mb-1">Account Types:</div>
                        <div>
                          <strong>Source:</strong> Origin of funds (e.g.,
                          revenue streams)
                        </div>
                        <div>
                          <strong>Internal:</strong> Accounts within your
                          organization
                        </div>
                        <div>
                          <strong>Destination:</strong> Where funds are sent
                          (e.g., payments)
                        </div>
                        <div>
                          <strong>External:</strong> Third-party accounts
                          outside your org
                        </div>
                      </div>
                    }
                    side="right"
                  >
                    <Info className="w-4 h-4 text-gray-400 cursor-help" />
                  </Tooltip>
                </label>
              </TooltipProvider>
              <select
                id="account-type"
                name="accountType"
                value={formData.type}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    type: e.target.value,
                  });
                  // Clear custom validation message when user selects a value
                  e.target.setCustomValidity("");
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                required
              >
                <option value="">Select type...</option>
                <option value="Source">Source</option>
                <option value="Internal">Internal</option>
                <option value="Destination">Destination</option>
                <option value="External">External</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="kyc-status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                KYC/AML Status
              </label>
              <select
                id="kyc-status"
                name="kycStatus"
                value={formData.KycAmlStatus}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    KycAmlStatus: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">Select status...</option>
                <option value="PASSED">Passed</option>
                <option value="PENDING">Pending</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="budget-path"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Budget Path
            </label>
            <input
              type="text"
              id="budget-path"
              name="budgetPath"
              value={formData.budgetPath}
              onChange={(e) =>
                setFormData({ ...formData, budgetPath: e.target.value })
              }
              placeholder="e.g., /treasury/operations"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {account && (
            <div>
              <label
                htmlFor="account-transactions-id"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Account Transactions ID
              </label>
              <input
                type="text"
                id="account-transactions-id"
                name="accountTransactionsId"
                value={formData.accountTransactionsId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    accountTransactionsId: e.target.value,
                  })
                }
                placeholder="e.g., tx-12345"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="chains"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Chains
              <span className="ml-2 text-xs text-gray-500 font-normal">
                (comma-separated)
              </span>
            </label>
            <input
              type="text"
              id="chains"
              name="chain"
              value={formData.chain}
              onChange={(e) =>
                setFormData({ ...formData, chain: e.target.value })
              }
              placeholder="e.g., Ethereum, Polygon, Arbitrum"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="owners"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Owners
              <span className="ml-2 text-xs text-gray-500 font-normal">
                (comma-separated)
              </span>
            </label>
            <input
              type="text"
              id="owners"
              name="owners"
              value={formData.owners}
              onChange={(e) =>
                setFormData({ ...formData, owners: e.target.value })
              }
              placeholder="e.g., Alice, Bob, Charlie"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors"
          >
            {account ? "Update Account" : "Add Account"}
          </Button>
        </div>
      </form>
    </>
  );
}
