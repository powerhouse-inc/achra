import type { FacetOptionManagementOperations } from "document-models/facet/v1";

export const facetOptionManagementOperations: FacetOptionManagementOperations =
  {
    addOptionOperation(state, action) {
      state.options.push({
        id: action.input.id,
        label: action.input.label,
        description: action.input.description || null,
        displayOrder: action.input.displayOrder || null,
        isDefault: action.input.isDefault || false,
      });
      state.lastModified = action.input.lastModified;
    },
    updateOptionOperation(state, action) {
      const option = state.options.find((o) => o.id === action.input.id);
      if (option) {
        if (action.input.label) {
          option.label = action.input.label;
        }
        if (action.input.description !== undefined) {
          option.description = action.input.description || null;
        }
        if (
          action.input.displayOrder !== undefined &&
          action.input.displayOrder !== null
        ) {
          option.displayOrder = action.input.displayOrder;
        }
        if (
          action.input.isDefault !== undefined &&
          action.input.isDefault !== null
        ) {
          option.isDefault = action.input.isDefault;
        }
      }
      state.lastModified = action.input.lastModified;
    },
    removeOptionOperation(state, action) {
      const optionIndex = state.options.findIndex(
        (o) => o.id === action.input.id,
      );
      if (optionIndex !== -1) {
        state.options.splice(optionIndex, 1);
      }
      state.lastModified = action.input.lastModified;
    },
    reorderOptionsOperation(state, action) {
      const orderedOptions: typeof state.options = [];
      action.input.optionIds.forEach((id, index) => {
        const option = state.options.find((o) => o.id === id);
        if (option) {
          option.displayOrder = index;
          orderedOptions.push(option);
        }
      });
      state.options.forEach((option) => {
        if (!action.input.optionIds.includes(option.id)) {
          orderedOptions.push(option);
        }
      });
      state.options = orderedOptions;
      state.lastModified = action.input.lastModified;
    },
  };
