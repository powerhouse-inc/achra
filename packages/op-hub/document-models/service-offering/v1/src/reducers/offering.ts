import type { ServiceOfferingOfferingOperations } from "document-models/service-offering/v1";
import {
  AddFacetOptionTargetNotFoundError,
  ChangeResourceTemplateMismatchError,
  NoBillingCyclesSelectedError,
  RemoveFacetOptionTargetNotFoundError,
  RemoveFacetTargetNotFoundError,
} from "../../gen/offering/error.js";

export const serviceOfferingOfferingOperations: ServiceOfferingOfferingOperations =
  {
    updateOfferingInfoOperation(state, action) {
      if (action.input.title) state.title = action.input.title;
      if (action.input.summary) state.summary = action.input.summary;
      if (action.input.description !== undefined)
        state.description = action.input.description || null;
      if (action.input.thumbnailUrl !== undefined)
        state.thumbnailUrl = action.input.thumbnailUrl || null;
      if (action.input.infoLink !== undefined)
        state.infoLink = action.input.infoLink || null;
      state.lastModified = action.input.lastModified;
    },
    updateOfferingStatusOperation(state, action) {
      state.status = action.input.status;
      state.lastModified = action.input.lastModified;
    },
    setOperatorOperation(state, action) {
      state.operatorId = action.input.operatorId;
      state.lastModified = action.input.lastModified;
    },
    setOfferingIdOperation(state, action) {
      state.id = action.input.id;
      state.lastModified = action.input.lastModified;
    },
    setFacetTargetOperation(state, action) {
      const existingIndex = state.facetTargets.findIndex(
        (ft) => ft.categoryKey === action.input.categoryKey,
      );
      const facetTarget = {
        id: action.input.id,
        categoryKey: action.input.categoryKey,
        categoryLabel: action.input.categoryLabel,
        selectedOptions: action.input.selectedOptions,
      };
      if (existingIndex !== -1) {
        state.facetTargets[existingIndex] = facetTarget;
      } else {
        state.facetTargets.push(facetTarget);
      }
      state.lastModified = action.input.lastModified;
    },
    removeFacetTargetOperation(state, action) {
      const index = state.facetTargets.findIndex(
        (ft) => ft.categoryKey === action.input.categoryKey,
      );
      if (index === -1) {
        throw new RemoveFacetTargetNotFoundError(
          `Facet target with category key ${action.input.categoryKey} not found`,
        );
      }
      state.facetTargets.splice(index, 1);
      state.lastModified = action.input.lastModified;
    },
    addFacetOptionOperation(state, action) {
      const facetTarget = state.facetTargets.find(
        (ft) => ft.categoryKey === action.input.categoryKey,
      );
      if (!facetTarget) {
        throw new AddFacetOptionTargetNotFoundError(
          `Facet target with category key ${action.input.categoryKey} not found`,
        );
      }
      facetTarget.selectedOptions.push(action.input.optionId);
      state.lastModified = action.input.lastModified;
    },
    removeFacetOptionOperation(state, action) {
      const facetTarget = state.facetTargets.find(
        (ft) => ft.categoryKey === action.input.categoryKey,
      );
      if (!facetTarget) {
        throw new RemoveFacetOptionTargetNotFoundError(
          `Facet target with category key ${action.input.categoryKey} not found`,
        );
      }
      const optIndex = facetTarget.selectedOptions.indexOf(
        action.input.optionId,
      );
      if (optIndex !== -1) {
        facetTarget.selectedOptions.splice(optIndex, 1);
      }
      state.lastModified = action.input.lastModified;
    },
    selectResourceTemplateOperation(state, action) {
      state.resourceTemplateId = action.input.resourceTemplateId;
      state.lastModified = action.input.lastModified;
    },
    changeResourceTemplateOperation(state, action) {
      if (state.resourceTemplateId !== action.input.previousTemplateId) {
        throw new ChangeResourceTemplateMismatchError(
          `Current template ${state.resourceTemplateId} does not match previous template ${action.input.previousTemplateId}`,
        );
      }
      state.resourceTemplateId = action.input.newTemplateId;
      state.lastModified = action.input.lastModified;
    },
    setAvailableBillingCyclesOperation(state, action) {
      if (action.input.billingCycles.length === 0) {
        throw new NoBillingCyclesSelectedError(
          "At least one billing cycle must be selected",
        );
      }
      state.availableBillingCycles = action.input.billingCycles;
      state.lastModified = action.input.lastModified;
    },
  };
