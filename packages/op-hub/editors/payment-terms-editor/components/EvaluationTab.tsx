import { useState, useCallback, useMemo } from "react";
import {
  TextInput,
  Select,
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
  type EvaluationFrequency,
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

export interface EvaluationTabProps {
  state: PaymentTermsState;
  dispatch: DocumentDispatch<PaymentTermsAction>;
}

export function EvaluationTab({ state, dispatch }: EvaluationTabProps) {
  const toast = usePHToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    evaluationFrequency: state.evaluation?.evaluationFrequency || "MONTHLY",
    evaluatorTeam: state.evaluation?.evaluatorTeam || "",
    criteria: state.evaluation?.criteria.join("\n") || "",
    impactsPayout: state.evaluation?.impactsPayout || false,
    impactsReputation: state.evaluation?.impactsReputation || false,
    commentsVisibleToClient: state.evaluation?.commentsVisibleToClient || false,
  });

  const evaluationFrequencyOptions = useMemo(
    () => [
      { label: "Weekly", value: "WEEKLY" },
      { label: "Monthly", value: "MONTHLY" },
      { label: "Per Milestone", value: "PER_MILESTONE" },
    ],
    [],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!formData.evaluatorTeam.trim()) {
        toast?.("Evaluator team is required", { type: "error" });
        return;
      }

      if (!formData.criteria.trim()) {
        toast?.("Evaluation criteria are required", { type: "error" });
        return;
      }

      dispatch(
        actions.setEvaluationTerms({
          evaluationFrequency: formData.evaluationFrequency,
          evaluatorTeam: formData.evaluatorTeam,
          criteria: formData.criteria.split("\n").filter((c) => c.trim()),
          impactsPayout: formData.impactsPayout,
          impactsReputation: formData.impactsReputation,
          commentsVisibleToClient: formData.commentsVisibleToClient,
        }),
      );

      toast?.("Evaluation terms saved", { type: "success" });
      setIsEditing(false);
    },
    [formData, dispatch, toast],
  );

  const handleCancel = useCallback(() => {
    setFormData({
      evaluationFrequency: state.evaluation?.evaluationFrequency || "MONTHLY",
      evaluatorTeam: state.evaluation?.evaluatorTeam || "",
      criteria: state.evaluation?.criteria.join("\n") || "",
      impactsPayout: state.evaluation?.impactsPayout || false,
      impactsReputation: state.evaluation?.impactsReputation || false,
      commentsVisibleToClient:
        state.evaluation?.commentsVisibleToClient || false,
    });
    setIsEditing(false);
  }, [state.evaluation]);

  if (!isEditing) {
    return (
      <div className="space-y-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Evaluation Terms
          </h2>
          <Button
            onClick={() => setIsEditing(true)}
            color="light"
            size="sm"
            className={primaryButtonClass}
          >
            {state.evaluation ? "Edit Terms" : "Configure Evaluation"}
          </Button>
        </div>

        {state.evaluation ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className={fieldLabelClass}>Evaluation Frequency</label>
              <p className="text-lg text-foreground">
                {state.evaluation.evaluationFrequency}
              </p>
            </div>
            <div>
              <label className={fieldLabelClass}>Evaluator Team</label>
              <p className="text-lg text-foreground">
                {state.evaluation.evaluatorTeam}
              </p>
            </div>
            <div>
              <label className={fieldLabelClass}>Impacts Payout</label>
              <p className="text-lg text-foreground">
                {state.evaluation.impactsPayout ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <label className={fieldLabelClass}>Impacts Reputation</label>
              <p className="text-lg text-foreground">
                {state.evaluation.impactsReputation ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <label className={fieldLabelClass}>
                Comments Visible to Client
              </label>
              <p className="text-lg text-foreground">
                {state.evaluation.commentsVisibleToClient ? "Yes" : "No"}
              </p>
            </div>
            <div className="col-span-2">
              <label className={fieldLabelClass}>Evaluation Criteria</label>
              <div className={readOnlyPanelClass}>
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {state.evaluation.criteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className={emptyStateClass}>
            <p>No evaluation terms configured yet.</p>
            <p className="text-sm">
              Click "Configure Evaluation" to get started.
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
          Configure Evaluation Terms
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Select
          label="Evaluation Frequency *"
          options={evaluationFrequencyOptions}
          value={formData.evaluationFrequency}
          onChange={(value) =>
            setFormData({
              ...formData,
              evaluationFrequency: value as EvaluationFrequency,
            })
          }
        />

        <TextInput
          label="Evaluator Team *"
          value={formData.evaluatorTeam}
          onChange={(e) =>
            setFormData({ ...formData, evaluatorTeam: e.target.value })
          }
          className="w-full"
          placeholder="e.g., Product Team"
          required
        />

        <div className="col-span-2">
          <Textarea
            label="Evaluation Criteria * (one per line)"
            value={formData.criteria}
            onChange={(e) =>
              setFormData({ ...formData, criteria: e.target.value })
            }
            className="w-full"
            rows={6}
            placeholder="Enter each evaluation criterion on a separate line..."
            required
          />
        </div>

        <div className="col-span-2 space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            Impact Settings
          </h3>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="impactsPayout"
              checked={formData.impactsPayout}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  impactsPayout: e.target.checked,
                })
              }
              className={checkboxClass}
            />
            <label htmlFor="impactsPayout" className={checkboxLabelClass}>
              Evaluation results impact payout
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="impactsReputation"
              checked={formData.impactsReputation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  impactsReputation: e.target.checked,
                })
              }
              className={checkboxClass}
            />
            <label htmlFor="impactsReputation" className={checkboxLabelClass}>
              Evaluation results impact reputation
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="commentsVisibleToClient"
              checked={formData.commentsVisibleToClient}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  commentsVisibleToClient: e.target.checked,
                })
              }
              className={checkboxClass}
            />
            <label
              htmlFor="commentsVisibleToClient"
              className={checkboxLabelClass}
            >
              Evaluation comments visible to client
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          color="light"
          size="sm"
          className={primaryButtonClass}
        >
          Save Evaluation Terms
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
