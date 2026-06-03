import { useState, useCallback, useMemo } from "react";
import {
  TextInput,
  Select,
  Textarea,
  DatePicker,
  Button,
} from "@powerhousedao/document-engineering";
import {
  usePHToast,
  type DocumentDispatch,
} from "@powerhousedao/reactor-browser";
import {
  actions,
  type PaymentTermsState,
  type BillingFrequency,
  type PaymentTermsAction,
} from "document-models/payment-terms";

export interface RetainerTabProps {
  state: PaymentTermsState;
  dispatch: DocumentDispatch<PaymentTermsAction>;
}

export function RetainerTab({ state, dispatch }: RetainerTabProps) {
  const toast = usePHToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    retainerAmount:
      state.retainerDetails?.retainerAmount.value?.toString() || "",
    billingFrequency: state.retainerDetails?.billingFrequency || "MONTHLY",
    startDate: state.retainerDetails?.startDate || "",
    endDate: state.retainerDetails?.endDate || "",
    autoRenew: state.retainerDetails?.autoRenew || false,
    servicesIncluded: state.retainerDetails?.servicesIncluded || "",
  });

  const billingFrequencyOptions = useMemo(
    () => [
      { label: "Weekly", value: "WEEKLY" },
      { label: "Biweekly", value: "BIWEEKLY" },
      { label: "Monthly", value: "MONTHLY" },
    ],
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (
        !formData.retainerAmount ||
        isNaN(parseFloat(formData.retainerAmount))
      ) {
        toast?.("Please enter a valid retainer amount", { type: "error" });
        return;
      }

      if (!formData.startDate) {
        toast?.("Start date is required", { type: "error" });
        return;
      }

      if (!formData.servicesIncluded.trim()) {
        toast?.("Services included description is required", { type: "error" });
        return;
      }

      const startDate = new Date(formData.startDate).toISOString();
      const endDate = formData.endDate
        ? new Date(formData.endDate).toISOString()
        : undefined;

      dispatch(
        actions.setRetainerDetails({
          retainerAmount: {
            value: parseFloat(formData.retainerAmount),
            unit: state.currency,
          },
          billingFrequency: formData.billingFrequency,
          startDate,
          endDate,
          autoRenew: formData.autoRenew,
          servicesIncluded: formData.servicesIncluded,
        }),
      );

      toast?.("Retainer configuration saved", { type: "success" });
      setIsEditing(false);
    },
    [formData, dispatch, state.currency, toast],
  );

  const handleCancel = useCallback(() => {
    setFormData({
      retainerAmount:
        state.retainerDetails?.retainerAmount.value?.toString() || "",
      billingFrequency: state.retainerDetails?.billingFrequency || "MONTHLY",
      startDate: state.retainerDetails?.startDate || "",
      endDate: state.retainerDetails?.endDate || "",
      autoRenew: state.retainerDetails?.autoRenew || false,
      servicesIncluded: state.retainerDetails?.servicesIncluded || "",
    });
    setIsEditing(false);
  }, [state.retainerDetails]);

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-white">
            Retainer Configuration
          </h2>
          <Button
            onClick={() => setIsEditing(true)}
            color="light"
            size="sm"
            className="cursor-pointer hover:bg-blue-600 hover:text-white"
          >
            {state.retainerDetails
              ? "Edit Configuration"
              : "Configure Retainer"}
          </Button>
        </div>

        {state.retainerDetails ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Retainer Amount
              </label>
              <p className="text-lg dark:text-white">
                {`${state.retainerDetails.retainerAmount.value} ${state.retainerDetails.retainerAmount.unit}`}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Billing Frequency
              </label>
              <p className="text-lg dark:text-white">
                {state.retainerDetails.billingFrequency}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Start Date
              </label>
              <p className="text-lg dark:text-white">
                {state.retainerDetails.startDate}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                End Date
              </label>
              <p className="text-lg dark:text-white">
                {state.retainerDetails.endDate || "Ongoing"}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Auto Renew
              </label>
              <p className="text-lg dark:text-white">
                {state.retainerDetails.autoRenew ? "Yes" : "No"}
              </p>
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Services Included
              </label>
              <div className="rounded border bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-700">
                <p className="text-sm dark:text-white">
                  {state.retainerDetails.servicesIncluded}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            <p>No retainer configuration set up yet.</p>
            <p className="text-sm">
              Click "Configure Retainer" to get started.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold dark:text-white">
          Configure Retainer
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <TextInput
          label="Retainer Amount *"
          type="number"
          value={formData.retainerAmount}
          onChange={(e) =>
            setFormData({ ...formData, retainerAmount: e.target.value })
          }
          className="w-full"
          placeholder="0.00"
          step="0.01"
          required
        />

        <Select
          label="Billing Frequency *"
          options={billingFrequencyOptions}
          value={formData.billingFrequency}
          onChange={(value) =>
            setFormData({
              ...formData,
              billingFrequency: value as BillingFrequency,
            })
          }
        />

        <DatePicker
          value={formData.startDate ? new Date(formData.startDate) : undefined}
          onChange={(e) => {
            const date = e.target.value ? new Date(e.target.value) : null;
            setFormData({
              ...formData,
              startDate: date?.toISOString() || "",
            });
          }}
          name="start-date"
          placeholder="Select start date"
          required
        />

        <DatePicker
          value={formData.endDate ? new Date(formData.endDate) : undefined}
          onChange={(e) => {
            const date = e.target.value ? new Date(e.target.value) : null;
            setFormData({
              ...formData,
              endDate: date?.toISOString() || "",
            });
          }}
          name="end-date"
          placeholder="Select end date (optional)"
        />

        <div className="col-span-2">
          <Textarea
            label="Services Included *"
            value={formData.servicesIncluded}
            onChange={(e) =>
              setFormData({ ...formData, servicesIncluded: e.target.value })
            }
            className="w-full"
            rows={4}
            placeholder="Describe the services included in the retainer..."
            required
          />
        </div>

        <div className="col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoRenew"
              checked={formData.autoRenew}
              onChange={(e) =>
                setFormData({ ...formData, autoRenew: e.target.checked })
              }
              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="autoRenew"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Auto-Renew Retainer
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          color="light"
          size="sm"
          className="cursor-pointer hover:bg-blue-600 hover:text-white"
        >
          Save Configuration
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
