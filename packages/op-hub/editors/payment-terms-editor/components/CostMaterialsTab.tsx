import { useState, useCallback } from "react";
import { TextInput, Select, Button } from "@powerhousedao/document-engineering";
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
import {
  checkboxClass,
  checkboxLabelClass,
  dashedEmptyClass,
  emptyStateClass,
  fieldLabelClass,
  formPanelClass,
  primaryButtonClass,
  readOnlyPanelClass,
  secondaryButtonClass,
} from "./uiClasses.js";

export interface CostMaterialsTabProps {
  state: PaymentTermsState;
  dispatch: DocumentDispatch<PaymentTermsAction>;
}

export function CostMaterialsTab({ state, dispatch }: CostMaterialsTabProps) {
  const toast = usePHToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    hourlyRate: state.costAndMaterials?.hourlyRate?.value?.toString() || "",
    variableCap: state.costAndMaterials?.variableCap?.value?.toString() || "",
    billingFrequency: state.costAndMaterials?.billingFrequency || "MONTHLY",
    timesheetRequired: state.costAndMaterials?.timesheetRequired || false,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      dispatch(
        actions.setCostAndMaterials({
          hourlyRate: formData.hourlyRate
            ? {
                value: parseFloat(formData.hourlyRate),
                unit: state.currency,
              }
            : undefined,
          variableCap: formData.variableCap
            ? {
                value: parseFloat(formData.variableCap),
                unit: state.currency,
              }
            : undefined,
          billingFrequency: formData.billingFrequency,
          timesheetRequired: formData.timesheetRequired,
        }),
      );

      toast?.("Cost & Materials configuration saved", { type: "success" });
      setIsEditing(false);
    },
    [formData, dispatch, state.currency, toast],
  );

  const handleCancel = useCallback(() => {
    setFormData({
      hourlyRate: state.costAndMaterials?.hourlyRate?.value?.toString() || "",
      variableCap: state.costAndMaterials?.variableCap?.value?.toString() || "",
      billingFrequency: state.costAndMaterials?.billingFrequency || "MONTHLY",
      timesheetRequired: state.costAndMaterials?.timesheetRequired || false,
    });
    setIsEditing(false);
  }, [state.costAndMaterials]);

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Cost & Materials Configuration
          </h2>
          <Button
            onClick={() => setIsEditing(true)}
            color="light"
            size="sm"
            className={primaryButtonClass}
          >
            {state.costAndMaterials
              ? "Edit Configuration"
              : "Configure Cost & Materials"}
          </Button>
        </div>

        {state.costAndMaterials ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={fieldLabelClass}>
                Hourly Rate
              </label>
              <p className="text-lg text-foreground">
                {state.costAndMaterials.hourlyRate
                  ? `${state.costAndMaterials.hourlyRate.value} ${state.costAndMaterials.hourlyRate.unit}`
                  : "Not set"}
              </p>
            </div>
            <div>
              <label className={fieldLabelClass}>
                Variable Cap
              </label>
              <p className="text-lg text-foreground">
                {state.costAndMaterials.variableCap
                  ? `${state.costAndMaterials.variableCap.value} ${state.costAndMaterials.variableCap.unit}`
                  : "Not set"}
              </p>
            </div>
            <div>
              <label className={fieldLabelClass}>
                Billing Frequency
              </label>
              <p className="text-lg text-foreground">
                {state.costAndMaterials.billingFrequency}
              </p>
            </div>
            <div>
              <label className={fieldLabelClass}>
                Timesheet Required
              </label>
              <p className="text-lg text-foreground">
                {state.costAndMaterials.timesheetRequired ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ) : (
          <div className={emptyStateClass}>
            <p>No cost & materials configuration set up yet.</p>
            <p className="text-sm">
              Click "Configure Cost & Materials" to get started.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Configure Cost & Materials
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className={fieldLabelClass}>
            Hourly Rate
          </label>
          <TextInput
            value={formData.hourlyRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, hourlyRate: e.target.value })
            }
            placeholder="0.00"
            type="number"
            step="0.01"
          />
        </div>

        <div>
          <label className={fieldLabelClass}>
            Variable Cap
          </label>
          <TextInput
            value={formData.variableCap}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, variableCap: e.target.value })
            }
            placeholder="0.00"
            type="number"
            step="0.01"
          />
        </div>

        <div>
          <label className={fieldLabelClass}>
            Billing Frequency *
          </label>
          <Select
            value={formData.billingFrequency}
            onChange={(value) =>
              setFormData({
                ...formData,
                billingFrequency: value as BillingFrequency,
              })
            }
            options={[
              { value: "WEEKLY", label: "Weekly" },
              { value: "BIWEEKLY", label: "Biweekly" },
              { value: "MONTHLY", label: "Monthly" },
            ]}
            placeholder="Select billing frequency"
            required
          />
        </div>

        <div className="flex items-center pt-6">
          <input
            type="checkbox"
            id="timesheetRequired"
            checked={formData.timesheetRequired}
            onChange={(e) =>
              setFormData({ ...formData, timesheetRequired: e.target.checked })
            }
            className={checkboxClass}
          />
          <label
            htmlFor="timesheetRequired"
            className={checkboxLabelClass}
          >
            Timesheet Required
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          color="light"
          size="sm"
          className={primaryButtonClass}
        >
          Save Configuration
        </Button>
        <Button
          type="button"
          onClick={handleCancel}
          color="light"
          size="sm"
          className={secondaryButtonClass}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
