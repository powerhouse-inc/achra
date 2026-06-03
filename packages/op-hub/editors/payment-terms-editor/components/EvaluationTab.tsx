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
          <h2 className="text-xl font-semibold dark:text-white">
            Evaluation Terms
          </h2>
          <Button
            onClick={() => setIsEditing(true)}
            color="light"
            size="sm"
            className="cursor-pointer hover:bg-blue-600 hover:text-white"
          >
            {state.evaluation ? "Edit Terms" : "Configure Evaluation"}
          </Button>
        </div>

        {state.evaluation ? (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Evaluation Frequency
              </label>
              <p className="text-lg dark:text-white">
                {state.evaluation.evaluationFrequency}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Evaluator Team
              </label>
              <p className="text-lg dark:text-white">
                {state.evaluation.evaluatorTeam}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Impacts Payout
              </label>
              <p className="text-lg dark:text-white">
                {state.evaluation.impactsPayout ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Impacts Reputation
              </label>
              <p className="text-lg dark:text-white">
                {state.evaluation.impactsReputation ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Comments Visible to Client
              </label>
              <p className="text-lg dark:text-white">
                {state.evaluation.commentsVisibleToClient ? "Yes" : "No"}
              </p>
            </div>
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Evaluation Criteria
              </label>
              <div className="rounded border bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-700">
                <ul className="list-inside list-disc space-y-1 text-sm">
                  {state.evaluation.criteria.map((criterion, index) => (
                    <li key={index}>{criterion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
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
        <h2 className="text-xl font-semibold dark:text-white">
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
          <h3 className="text-lg font-medium dark:text-white">
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
              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="impactsPayout"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
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
              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="impactsReputation"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
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
              className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="commentsVisibleToClient"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
          className="cursor-pointer hover:bg-blue-600 hover:text-white"
        >
          Save Evaluation Terms
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
