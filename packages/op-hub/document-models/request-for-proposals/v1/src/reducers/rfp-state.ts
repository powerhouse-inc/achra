import type { RequestForProposalsRfpStateOperations } from "document-models/request-for-proposals/v1";

export const requestForProposalsRfpStateOperations: RequestForProposalsRfpStateOperations =
  {
    editRfpOperation(state, action) {
      state.title = action.input.title || state.title;
      state.code = action.input.code || state.code;
      state.summary = action.input.summary || state.summary;
      state.briefing = action.input.briefing || state.briefing;
      state.eligibilityCriteria =
        action.input.eligibilityCriteria || state.eligibilityCriteria;
      state.evaluationCriteria =
        action.input.evaluationCriteria || state.evaluationCriteria;
      state.status = action.input.status || state.status;
      state.deadline = action.input.deadline || state.deadline;
      state.tags = action.input.tags || state.tags;
      if (action.input.budgetRange) {
        state.budgetRange = {
          min: action.input.budgetRange.min ?? state.budgetRange?.min ?? null,
          max: action.input.budgetRange.max ?? state.budgetRange?.max ?? null,
          currency:
            action.input.budgetRange.currency ??
            state.budgetRange?.currency ??
            null,
        };
      }
    },
  };
