import type { ServiceOfferingServicesOperations } from "document-models/service-offering/v1";
import {
  DeleteServiceNotFoundError,
  UpdateServiceNotFoundError,
} from "../../gen/services/error.js";

export const serviceOfferingServicesOperations: ServiceOfferingServicesOperations =
  {
    addServiceOperation(state, action) {
      state.services.push({
        id: action.input.id,
        title: action.input.title,
        description: action.input.description || null,
        // Use `??` so a valid `displayOrder: 0` is preserved (pairwise-swap
        // reorder dispatches send the receiving index, which can be 0).
        displayOrder: action.input.displayOrder ?? null,
        isSetupFormation: action.input.isSetupFormation || false,
        optionGroupId: action.input.optionGroupId || null,
      });
      state.lastModified = action.input.lastModified;
    },
    updateServiceOperation(state, action) {
      const service = state.services.find((s) => s.id === action.input.id);
      if (!service) {
        throw new UpdateServiceNotFoundError(
          `Service with ID ${action.input.id} not found`,
        );
      }
      if (action.input.title) service.title = action.input.title;
      if (action.input.description !== undefined)
        service.description = action.input.description || null;
      if (action.input.displayOrder !== undefined)
        service.displayOrder = action.input.displayOrder ?? null;
      if (
        action.input.isSetupFormation !== undefined &&
        action.input.isSetupFormation !== null
      )
        service.isSetupFormation = action.input.isSetupFormation;
      if (action.input.optionGroupId !== undefined)
        service.optionGroupId = action.input.optionGroupId || null;
      state.lastModified = action.input.lastModified;
    },
    deleteServiceOperation(state, action) {
      const index = state.services.findIndex((s) => s.id === action.input.id);
      if (index === -1) {
        throw new DeleteServiceNotFoundError(
          `Service with ID ${action.input.id} not found`,
        );
      }
      state.services.splice(index, 1);
      state.lastModified = action.input.lastModified;
    },
  };
