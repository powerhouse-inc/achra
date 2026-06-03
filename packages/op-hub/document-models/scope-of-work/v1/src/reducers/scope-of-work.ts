import type { ScopeOfWorkScopeOfWorkOperations } from "document-models/scope-of-work/v1";

export const scopeOfWorkScopeOfWorkOperations: ScopeOfWorkScopeOfWorkOperations =
  {
    editScopeOfWorkOperation(state, action) {
      state.title = action.input.title ?? state.title;
      state.description = action.input.description ?? state.description;
      state.status = action.input.status ?? state.status;
    },
  };
