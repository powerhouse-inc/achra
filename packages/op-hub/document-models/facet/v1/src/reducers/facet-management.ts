import type { FacetFacetManagementOperations } from "document-models/facet/v1";

export const facetFacetManagementOperations: FacetFacetManagementOperations = {
  setFacetNameOperation(state, action) {
    state.name = action.input.name;
    state.lastModified = action.input.lastModified;
  },
  setFacetDescriptionOperation(state, action) {
    state.description = action.input.description || null;
    state.lastModified = action.input.lastModified;
  },
};
