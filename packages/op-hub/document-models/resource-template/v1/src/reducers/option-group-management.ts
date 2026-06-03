import type { ResourceTemplateOptionGroupManagementOperations } from "document-models/resource-template/v1";

export const resourceTemplateOptionGroupManagementOperations: ResourceTemplateOptionGroupManagementOperations =
  {
    addOptionGroupOperation(state, action) {
      state.optionGroups.push({
        id: action.input.id,
        name: action.input.name,
        description: action.input.description || null,
        isAddOn: action.input.isAddOn,
        defaultSelected: action.input.defaultSelected,
      });
      state.lastModified = action.input.lastModified;
    },
    updateOptionGroupOperation(state, action) {
      const optionGroup = state.optionGroups.find(
        (og) => og.id === action.input.id,
      );
      if (optionGroup) {
        if (action.input.name) {
          optionGroup.name = action.input.name;
        }
        if (action.input.description !== undefined) {
          optionGroup.description = action.input.description || null;
        }
        if (
          action.input.isAddOn !== undefined &&
          action.input.isAddOn !== null
        ) {
          optionGroup.isAddOn = action.input.isAddOn;
        }
        if (
          action.input.defaultSelected !== undefined &&
          action.input.defaultSelected !== null
        ) {
          optionGroup.defaultSelected = action.input.defaultSelected;
        }
      }
      state.lastModified = action.input.lastModified;
    },
    deleteOptionGroupOperation(state, action) {
      const optionGroupIndex = state.optionGroups.findIndex(
        (og) => og.id === action.input.id,
      );
      if (optionGroupIndex !== -1) {
        state.services.forEach((service) => {
          if (service.optionGroupId === action.input.id) {
            service.optionGroupId = null;
          }
        });
        state.optionGroups.splice(optionGroupIndex, 1);
      }
      state.lastModified = action.input.lastModified;
    },
    addFaqOperation(state, action) {
      if (!state.faqFields) {
        state.faqFields = [];
      }
      state.faqFields.push({
        id: action.input.id,
        question: action.input.question || null,
        answer: action.input.answer || null,
        displayOrder: action.input.displayOrder,
      });
    },
    updateFaqOperation(state, action) {
      // TODO: implement updateFaqOperation reducer
      throw new Error("Reducer for 'updateFaqOperation' not implemented.");
    },
    deleteFaqOperation(state, action) {
      // TODO: implement deleteFaqOperation reducer
      throw new Error("Reducer for 'deleteFaqOperation' not implemented.");
    },
    reorderFaqsOperation(state, action) {
      action.input.faqIds.forEach((id, index) => {
        const faq = state.faqFields?.find((f) => f.id === id);
        if (faq) {
          faq.displayOrder = index;
        }
      });
      state.lastModified = action.input.lastModified;
    },
  };
