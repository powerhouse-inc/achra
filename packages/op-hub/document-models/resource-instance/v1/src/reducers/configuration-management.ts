import type { ResourceInstanceConfigurationManagementOperations } from "document-models/resource-instance/v1";
import {
  ConfigurationLockedApplyConfigurationChangesError,
  ConfigurationLockedError,
  ConfigurationLockedRemoveInstanceFacetError,
  ConfigurationLockedUpdateInstanceFacetError,
} from "../../gen/configuration-management/error.js";

export const resourceInstanceConfigurationManagementOperations: ResourceInstanceConfigurationManagementOperations =
  {
    setInstanceFacetOperation(state, action) {
      if (state.status === "ACTIVE") {
        throw new ConfigurationLockedError(
          "Cannot modify configuration while instance is ACTIVE",
        );
      }
      const existingIndex = state.configuration.findIndex(
        (c) => c.categoryKey === action.input.categoryKey,
      );
      if (existingIndex !== -1) {
        state.configuration[existingIndex] = {
          id: action.input.id,
          categoryKey: action.input.categoryKey,
          categoryLabel: action.input.categoryLabel,
          selectedOption: action.input.selectedOption,
        };
      } else {
        state.configuration.push({
          id: action.input.id,
          categoryKey: action.input.categoryKey,
          categoryLabel: action.input.categoryLabel,
          selectedOption: action.input.selectedOption,
        });
      }
    },
    removeInstanceFacetOperation(state, action) {
      if (state.status === "ACTIVE") {
        throw new ConfigurationLockedRemoveInstanceFacetError(
          "Cannot modify configuration while instance is ACTIVE",
        );
      }
      const facetIndex = state.configuration.findIndex(
        (c) => c.categoryKey === action.input.categoryKey,
      );
      if (facetIndex !== -1) {
        state.configuration.splice(facetIndex, 1);
      }
    },
    updateInstanceFacetOperation(state, action) {
      if (state.status === "ACTIVE") {
        throw new ConfigurationLockedUpdateInstanceFacetError(
          "Cannot modify configuration while instance is ACTIVE",
        );
      }
      const facetIndex = state.configuration.findIndex(
        (c) => c.categoryKey === action.input.categoryKey,
      );
      if (facetIndex !== -1) {
        if (action.input.selectedOption) {
          state.configuration[facetIndex].selectedOption =
            action.input.selectedOption;
        }
        if (action.input.categoryLabel) {
          state.configuration[facetIndex].categoryLabel =
            action.input.categoryLabel;
        }
      }
    },
    applyConfigurationChangesOperation(state, action) {
      if (state.status === "ACTIVE") {
        throw new ConfigurationLockedApplyConfigurationChangesError(
          "Cannot modify configuration while instance is ACTIVE. Suspend the instance first.",
        );
      }
      action.input.removeFacetKeys?.forEach((categoryKey) => {
        const index = state.configuration.findIndex(
          (f) => f.categoryKey === categoryKey,
        );
        if (index !== -1) state.configuration.splice(index, 1);
      });
      action.input.updateFacets?.forEach((update) => {
        const facet = state.configuration.find(
          (f) => f.categoryKey === update.categoryKey,
        );
        if (facet) {
          if (update.selectedOption)
            facet.selectedOption = update.selectedOption;
          if (update.categoryLabel) facet.categoryLabel = update.categoryLabel;
        }
      });
      action.input.addFacets?.forEach((newFacet) => {
        state.configuration.push({
          id: newFacet.id,
          categoryKey: newFacet.categoryKey,
          categoryLabel: newFacet.categoryLabel,
          selectedOption: newFacet.selectedOption,
        });
      });
    },
  };
