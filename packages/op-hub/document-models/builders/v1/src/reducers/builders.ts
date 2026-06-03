import type { BuildersBuildersOperations } from "document-models/builders/v1";

export const buildersBuildersOperations: BuildersBuildersOperations = {
  addBuilderOperation(state, action) {
    state.builders.push(action.input.builderPhid);
  },
  removeBuilderOperation(state, action) {
    state.builders = state.builders.filter(
      (builder) => builder !== action.input.builderPhid,
    );
  },
};
