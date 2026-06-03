import type { ResourceTemplateFacetTargetingOperations } from "document-models/resource-template/v1";

export const resourceTemplateFacetTargetingOperations: ResourceTemplateFacetTargetingOperations =
  {
    setFacetTargetOperation(state, action) {
      const existingIndex = state.facetTargets.findIndex(
        (ft) => ft.categoryKey === action.input.categoryKey,
      );
      if (existingIndex !== -1) {
        state.facetTargets[existingIndex] = {
          id: action.input.id,
          categoryKey: action.input.categoryKey,
          categoryLabel: action.input.categoryLabel,
          selectedOptions: action.input.selectedOptions,
        };
      } else {
        state.facetTargets.push({
          id: action.input.id,
          categoryKey: action.input.categoryKey,
          categoryLabel: action.input.categoryLabel,
          selectedOptions: action.input.selectedOptions,
        });
      }
      state.lastModified = action.input.lastModified;
    },
    removeFacetTargetOperation(state, action) {
      const facetIndex = state.facetTargets.findIndex(
        (ft) => ft.categoryKey === action.input.categoryKey,
      );
      if (facetIndex !== -1) {
        state.facetTargets.splice(facetIndex, 1);
      }
      state.lastModified = action.input.lastModified;
    },
    addFacetOptionOperation(state, action) {
      const facetTarget = state.facetTargets.find(
        (ft) => ft.categoryKey === action.input.categoryKey,
      );
      if (
        facetTarget &&
        !facetTarget.selectedOptions.includes(action.input.optionId)
      ) {
        facetTarget.selectedOptions.push(action.input.optionId);
      }
      state.lastModified = action.input.lastModified;
    },
    removeFacetOptionOperation(state, action) {
      const facetTarget = state.facetTargets.find(
        (ft) => ft.categoryKey === action.input.categoryKey,
      );
      if (facetTarget) {
        const optionIndex = facetTarget.selectedOptions.indexOf(
          action.input.optionId,
        );
        if (optionIndex !== -1) {
          facetTarget.selectedOptions.splice(optionIndex, 1);
        }
      }
      state.lastModified = action.input.lastModified;
    },
  };
