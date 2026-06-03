import { useState, useCallback } from "react";
import {
  TextInput,
  Textarea,
  Button,
} from "@powerhousedao/document-engineering";
import {
  usePHToast,
  type DocumentDispatch,
} from "@powerhousedao/reactor-browser";
import {
  actions,
  type PaymentTermsState,
  type PaymentTermsAction,
} from "document-models/payment-terms";

export interface EscrowTabProps {
  state: PaymentTermsState;
  dispatch: DocumentDispatch<PaymentTermsAction>;
}

export function EscrowTab({ state, dispatch }: EscrowTabProps) {
  const toast = usePHToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    amountHeld: state.escrowDetails?.amountHeld.value?.toString() || "",
    proofOfFundsDocumentId: state.escrowDetails?.proofOfFundsDocumentId || "",
    releaseConditions: state.escrowDetails?.releaseConditions || "",
    escrowProvider: state.escrowDetails?.escrowProvider || "",
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.amountHeld || isNaN(parseFloat(formData.amountHeld))) {
        toast?.("Please enter a valid amount to be held in escrow", {
          type: "error",
        });
        return;
      }

      if (!formData.releaseConditions.trim()) {
        toast?.("Release conditions are required", { type: "error" });
        return;
      }

      dispatch(
        actions.setEscrowDetails({
          amountHeld: {
            value: parseFloat(formData.amountHeld),
            unit: state.currency,
          },
          proofOfFundsDocumentId: formData.proofOfFundsDocumentId || undefined,
          releaseConditions: formData.releaseConditions,
          escrowProvider: formData.escrowProvider || undefined,
        }),
      );

      toast?.("Escrow details saved", { type: "success" });
      setIsEditing(false);
    },
    [formData, dispatch, state.currency, toast],
  );

  const handleCancel = useCallback(() => {
    setFormData({
      amountHeld: state.escrowDetails?.amountHeld.value?.toString() || "",
      proofOfFundsDocumentId: state.escrowDetails?.proofOfFundsDocumentId || "",
      releaseConditions: state.escrowDetails?.releaseConditions || "",
      escrowProvider: state.escrowDetails?.escrowProvider || "",
    });
    setIsEditing(false);
  }, [state.escrowDetails]);

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-white">
            Escrow Configuration
          </h2>
          <Button
            onClick={() => setIsEditing(true)}
            color="light"
            size="sm"
            className="cursor-pointer hover:bg-blue-600 hover:text-white"
          >
            {state.escrowDetails ? "Edit Escrow" : "Configure Escrow"}
          </Button>
        </div>

        {state.escrowDetails && state.escrowDetails.releaseConditions ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount Held
              </label>
              <p className="text-lg dark:text-white">
                {`${state.escrowDetails.amountHeld.value} ${state.escrowDetails.amountHeld.unit}`}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Escrow Provider
              </label>
              <p className="text-lg dark:text-white">
                {state.escrowDetails.escrowProvider || "Not specified"}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Proof of Funds Document ID
              </label>
              <p className="text-sm font-mono dark:text-white">
                {state.escrowDetails.proofOfFundsDocumentId || "Not provided"}
              </p>
            </div>
            <div className="col-span-1">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Release Conditions
              </label>
              <div className="rounded border bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-700">
                <p className="text-sm dark:text-white">
                  {state.escrowDetails.releaseConditions}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            <p>No escrow configuration set up yet.</p>
            <p className="text-sm">Click "Configure Escrow" to get started.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white">
          Configure Escrow
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <TextInput
          label={`Amount Held (${state.currency}) *`}
          type="number"
          value={formData.amountHeld}
          onChange={(e) =>
            setFormData({ ...formData, amountHeld: e.target.value })
          }
          className="w-full"
          placeholder="0.00"
          step="0.01"
          required
        />

        <TextInput
          label="Escrow Provider"
          value={formData.escrowProvider}
          onChange={(e) =>
            setFormData({ ...formData, escrowProvider: e.target.value })
          }
          className="w-full"
          placeholder="e.g., Escrow.com"
        />

        <TextInput
          label="Proof of Funds Document ID"
          value={formData.proofOfFundsDocumentId}
          onChange={(e) =>
            setFormData({
              ...formData,
              proofOfFundsDocumentId: e.target.value,
            })
          }
          className="w-full"
          placeholder="Document reference ID"
        />

        <div className="col-span-1">
          <Textarea
            label="Release Conditions *"
            value={formData.releaseConditions}
            onChange={(e) =>
              setFormData({ ...formData, releaseConditions: e.target.value })
            }
            className="w-full"
            rows={4}
            placeholder="Describe the conditions for releasing escrow funds..."
            required
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          color="light"
          size="sm"
          className="cursor-pointer hover:bg-blue-600 hover:text-white"
        >
          Save Escrow Details
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          color="light"
          size="sm"
          className="cursor-pointer hover:bg-gray-600 hover:text-white"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
