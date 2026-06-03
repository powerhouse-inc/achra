import type { ResourceTemplateServiceCategoryManagementOperations } from "document-models/resource-template/v1";

export const resourceTemplateServiceCategoryManagementOperations: ResourceTemplateServiceCategoryManagementOperations =
  {
    setSetupServicesOperation(state, action) {
      state.setupServices = action.input.services;
      state.lastModified = action.input.lastModified;
    },
    setRecurringServicesOperation(state, action) {
      state.recurringServices = action.input.services;
      state.lastModified = action.input.lastModified;
    },
  };
