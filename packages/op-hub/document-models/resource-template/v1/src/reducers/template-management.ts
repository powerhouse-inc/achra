import type { ResourceTemplateTemplateManagementOperations } from "document-models/resource-template/v1";

export const resourceTemplateTemplateManagementOperations: ResourceTemplateTemplateManagementOperations =
  {
    updateTemplateInfoOperation(state, action) {
      if (action.input.title) {
        state.title = action.input.title;
      }
      if (action.input.summary) {
        state.summary = action.input.summary;
      }
      if (action.input.description !== undefined) {
        state.description = action.input.description || null;
      }
      if (action.input.thumbnailUrl !== undefined) {
        state.thumbnailUrl = action.input.thumbnailUrl || null;
      }
      if (action.input.infoLink !== undefined) {
        state.infoLink = action.input.infoLink || null;
      }
      if (action.input.subtitle !== undefined) {
        state.subtitle = action.input.subtitle || null;
      }
      state.lastModified = action.input.lastModified;
    },
    updateTemplateStatusOperation(state, action) {
      state.status = action.input.status;
      state.lastModified = action.input.lastModified;
    },
    setOperatorOperation(state, action) {
      state.operatorId = action.input.operatorId;
      state.lastModified = action.input.lastModified;
    },
    setTemplateIdOperation(state, action) {
      state.id = action.input.id;
      state.lastModified = action.input.lastModified;
    },
    setWeightOperation(state, action) {
      state.weight = action.input.weight || null;
      state.lastModified = action.input.lastModified;
    },
  };
