import {
  Button,
  Form,
  FormLabel,
  StringField,
  SelectField,
} from "@powerhousedao/document-engineering";
import type {
  TransactionEntry,
  Budget,
  AddTransactionInput,
} from "../../../document-models/account-transactions/v1/gen/types.js";

interface TransactionFormProps {
  transaction?: TransactionEntry;
  budgets: Budget[];
  onSubmit: (
    values: AddTransactionInput | Omit<AddTransactionInput, "id">,
  ) => void;
  onCancel: () => void;
}

export function TransactionForm({
  transaction,
  budgets,
  onSubmit,
  onCancel,
}: TransactionFormProps) {
  const isEditing = !!transaction;

  const defaultValues = transaction
    ? {
        id: transaction.id,
        counterParty: transaction.counterParty || "",
        amount:
          typeof transaction.amount === "object"
            ? transaction.amount.value
            : transaction.amount,
        datetime: new Date(transaction.datetime).toISOString().slice(0, 16), // Convert ISO to datetime-local format
        txHash: transaction.details.txHash,
        token: transaction.details.token,
        blockNumber: transaction.details.blockNumber?.toString() || "",
        budget: transaction.budget || "",
        accountingPeriod: transaction.accountingPeriod,
        direction: transaction.direction || "OUTFLOW",
      }
    : {
        counterParty: "",
        amount: "",
        datetime: new Date().toISOString().slice(0, 16), // Format for datetime-local input
        txHash: "",
        token: "ETH",
        blockNumber: "",
        budget: "",
        accountingPeriod: new Date().getFullYear().toString(),
        direction: "OUTFLOW",
      };

  function handleSubmit(values: {
    id?: string;
    counterParty: string;
    amount: string;
    datetime: string;
    txHash: string;
    token: string;
    blockNumber?: string;
    budget?: string;
    accountingPeriod: string;
    direction: string;
  }) {
    const formattedValues = {
      ...(isEditing && { id: values.id }),
      counterParty: values.counterParty,
      amount: {
        unit: values.token,
        value: values.amount,
      },
      datetime: new Date(values.datetime).toISOString(),
      txHash: values.txHash,
      token: values.token,
      blockNumber: values.blockNumber
        ? parseInt(values.blockNumber)
        : undefined,
      budget: values.budget || undefined,
      accountingPeriod: values.accountingPeriod,
      direction: values.direction as "INFLOW" | "OUTFLOW",
    };

    onSubmit(formattedValues);
  }

  const budgetOptions = [
    { value: "", label: "No Budget" },
    ...budgets.map((budget) => ({
      value: budget.id,
      label: budget.name || `Budget ${budget.id.slice(0, 8)}`,
    })),
  ];

  const tokenOptions = [
    { value: "ETH", label: "ETH" },
    { value: "USDC", label: "USDC" },
    { value: "USDT", label: "USDT" },
    { value: "DAI", label: "DAI" },
    { value: "WETH", label: "WETH" },
  ];

  const directionOptions = [
    { value: "INFLOW", label: "Inflow (IN)" },
    { value: "OUTFLOW", label: "Outflow (OUT)" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <Form
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormLabel htmlFor="counterParty" required>
              Counter Party Address
            </FormLabel>
            <StringField
              name="counterParty"
              placeholder="0x..."
              className="font-mono"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Ethereum address of the transaction counterpart
            </p>
          </div>

          <div>
            <FormLabel htmlFor="amount" required>
              Amount
            </FormLabel>
            <StringField
              name="amount"
              placeholder="0.00"
              type="number"
              step="any"
              required
            />
          </div>

          <div>
            <FormLabel htmlFor="datetime" required>
              Date & Time
            </FormLabel>
            <StringField name="datetime" type="datetime-local" required />
          </div>

          <div>
            <FormLabel htmlFor="token" required>
              Token
            </FormLabel>
            <SelectField name="token" options={tokenOptions} required />
          </div>

          <div>
            <FormLabel htmlFor="direction" required>
              Direction
            </FormLabel>
            <SelectField name="direction" options={directionOptions} required />
          </div>

          <div>
            <FormLabel htmlFor="txHash" required>
              Transaction Hash
            </FormLabel>
            <StringField
              name="txHash"
              placeholder="0x..."
              className="font-mono"
              required
            />
          </div>

          <div>
            <FormLabel htmlFor="blockNumber">Block Number (Optional)</FormLabel>
            <StringField
              name="blockNumber"
              placeholder="18000000"
              type="number"
            />
          </div>

          <div>
            <FormLabel htmlFor="budget">Budget (Optional)</FormLabel>
            <SelectField name="budget" options={budgetOptions} />
          </div>

          <div>
            <FormLabel htmlFor="accountingPeriod" required>
              Accounting Period
            </FormLabel>
            <StringField name="accountingPeriod" placeholder="2024" required />
            <p className="text-xs text-gray-500 mt-1">
              Year or period for accounting purposes
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {isEditing ? "Update Transaction" : "Add Transaction"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
