import type { BillingStatementLineItemsOperations } from "document-models/billing-statement/v1";
import type { BillingStatementState } from "../../gen/schema/types.js";

export const billingStatementLineItemsOperations: BillingStatementLineItemsOperations =
  {
    addLineItemOperation(state, action) {
      const newLineItem = {
        ...action.input,
        lineItemTag: [],
      };

      // Check for duplicate ID
      if (state.lineItems.find((x) => x.id === newLineItem.id)) {
        throw new Error("Duplicate line item ID");
      }

      state.lineItems.push(newLineItem);
      updateTotals(state);
    },
    editLineItemOperation(state, action) {
      const stateItem = state.lineItems.find((x) => x.id === action.input.id);
      if (!stateItem) throw new Error("Item matching input.id not found");

      const sanitizedInput = Object.fromEntries(
        Object.entries(action.input).filter(([, value]) => value !== null),
      );

      const nextItem = {
        ...stateItem,
        ...sanitizedInput,
      };

      Object.assign(stateItem, nextItem);
      updateTotals(state);
    },
    deleteLineItemOperation(state, action) {
      state.lineItems = state.lineItems.filter((x) => x.id !== action.input.id);
      updateTotals(state);
    },
  };

const updateTotals = (state: BillingStatementState) => {
  state.totalCash = state.lineItems.reduce((total, lineItem) => {
    return total + lineItem.quantity * lineItem.unitPriceCash;
  }, 0.0);

  state.totalPowt = state.lineItems.reduce((total, lineItem) => {
    return total + lineItem.quantity * lineItem.unitPricePwt;
  }, 0.0);
};
