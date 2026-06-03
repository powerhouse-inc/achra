import type { ResourceTemplateAudienceManagementOperations } from "document-models/resource-template/v1";

export const resourceTemplateAudienceManagementOperations: ResourceTemplateAudienceManagementOperations =
  {
    addTargetAudienceOperation(state, action) {
      state.targetAudiences.push({
        id: action.input.id,
        label: action.input.label,
        color: action.input.color || null,
      });
      state.lastModified = action.input.lastModified;
    },
    removeTargetAudienceOperation(state, action) {
      const audienceIndex = state.targetAudiences.findIndex(
        (a) => a.id === action.input.id,
      );
      if (audienceIndex !== -1) {
        state.targetAudiences.splice(audienceIndex, 1);
      }
      state.lastModified = action.input.lastModified;
    },
  };
