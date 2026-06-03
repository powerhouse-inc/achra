import type { BillingStatementTagsOperations } from "document-models/billing-statement/v1";

export const billingStatementTagsOperations: BillingStatementTagsOperations = {
  editLineItemTagOperation(state, action) {
    const stateItem = state.lineItems.find(
      (x) => x.id === action.input.lineItemId,
    );
    if (!stateItem) throw new Error("Item matching input.lineItemId not found");

    // if tag already exists with the same dimension, update the value and label
    const existingTag = stateItem.lineItemTag?.find(
      (tag) => tag.dimension === action.input.dimension,
    );
    if (existingTag) {
      existingTag.value = action.input.value;
      existingTag.label = action.input.label || null;
    } else {
      // if tag does not exist, add it
      const newTag = {
        dimension: action.input.dimension,
        value: action.input.value,
        label: action.input.label || null,
      };
      if (!stateItem.lineItemTag) {
        stateItem.lineItemTag = [];
      }

      // Add the new tag
      stateItem.lineItemTag?.push(newTag);
    }
  },
};
