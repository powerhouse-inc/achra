import type { InvoiceItemsOperations } from "document-models/invoice/v1";
import type {
  InvoiceLineItem,
  InvoiceState,
  InvoiceTag,
} from "../../gen/schema/types.js";

export const invoiceItemsOperations: InvoiceItemsOperations = {
  addLineItemOperation(state, action) {
    const item: InvoiceLineItem = {
      ...action.input,
      lineItemTag: [],
    };

    if (state.lineItems.find((x) => x.id === item.id))
      throw new Error("Duplicate input.id");

    validatePrices(item);
    state.lineItems.push(item);
    updateTotals(state);
  },

  editLineItemOperation(state, action) {
    const stateItem = state.lineItems.find((x) => x.id === action.input.id);
    if (!stateItem) throw new Error("Item matching input.id not found");

    const sanitizedInput = Object.fromEntries(
      Object.entries(action.input).filter(([, value]) => value !== null),
    ) as Partial<InvoiceLineItem>;

    // Ensure lineItemTag is always an array if provided
    if ("lineItemTag" in action.input) {
      sanitizedInput.lineItemTag = ((action.input as Record<string, unknown>)
        .lineItemTag ?? []) as InvoiceTag[];
    }

    const nextItem: InvoiceLineItem = {
      ...stateItem,
      ...sanitizedInput,
    };
    validatePrices(nextItem);
    applyInvariants(state, nextItem);
    Object.assign(stateItem, nextItem);
    updateTotals(state);
  },

  deleteLineItemOperation(state, action) {
    state.lineItems = state.lineItems.filter((x) => x.id !== action.input.id);
    updateTotals(state);
  },

  setLineItemTagOperation(state, action) {
    const stateItem = state.lineItems.find(
      (x) => x.id === action.input.lineItemId,
    );
    if (!stateItem) throw new Error("Item matching input.id not found");

    // if tag already exists with the same dimension, update the value and label
    const existingTag = stateItem.lineItemTag?.find(
      (tag) => tag.dimension === action.input.dimension,
    );
    if (existingTag) {
      existingTag.value = action.input.value;
      existingTag.label = action.input.label || null;
    } else {
      // if tag does not exist, add it
      const newTag: InvoiceTag = {
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
  setInvoiceTagOperation(state, action) {
    // if tag already exists with the same dimension, update the value and label
    const existingTag = state.invoiceTags?.find(
      (tag) => tag.dimension === action.input.dimension,
    );
    if (existingTag) {
      existingTag.value = action.input.value;
      existingTag.label = action.input.label || null;
    } else {
      // if tag does not exist, add it
      const newTag: InvoiceTag = {
        dimension: action.input.dimension,
        value: action.input.value,
        label: action.input.label || null,
      };
      if (!state.invoiceTags) {
        state.invoiceTags = [];
      }
      // Add the new tag
      state.invoiceTags.push(newTag);
    }
  },
};

function updateTotals(state: InvoiceState) {
  state.totalPriceTaxExcl = state.lineItems.reduce((total, lineItem) => {
    return total + lineItem.quantity * lineItem.unitPriceTaxExcl;
  }, 0.0);

  state.totalPriceTaxIncl = state.lineItems.reduce((total, lineItem) => {
    return total + lineItem.quantity * lineItem.unitPriceTaxIncl;
  }, 0.0);
}

function validatePrices(item: InvoiceLineItem) {
  const EPSILON = 0.00001;

  const calcPriceIncl = item.quantity * item.unitPriceTaxIncl;
  const calcPriceExcl = item.quantity * item.unitPriceTaxExcl;

  const taxRate = item.taxPercent / 100;

  const isClose = (a: number, b: number) => Math.abs(a - b) < EPSILON;

  const expectedUnitPriceExcl = item.unitPriceTaxIncl / (1 + taxRate);
  if (!isClose(item.unitPriceTaxExcl, expectedUnitPriceExcl)) {
    throw new Error("Tax inclusive/exclusive unit prices failed comparison.");
  }

  if (!isClose(calcPriceIncl, item.totalPriceTaxIncl)) {
    throw new Error("Calculated unitPriceTaxIncl does not match input total");
  }

  if (!isClose(calcPriceExcl, item.totalPriceTaxExcl)) {
    throw new Error("Calculated unitPriceTaxExcl does not match input total");
  }

  const expectedTotalPriceExcl = calcPriceIncl / (1 + taxRate);
  if (!isClose(calcPriceExcl, expectedTotalPriceExcl)) {
    throw new Error("Tax inclusive/exclusive totals failed comparison.");
  }
}

const applyInvariants = (state: InvoiceState, nextItem: InvoiceLineItem) => {
  const EPSILON = 0.00001;

  const isClose = (a: number, b: number) => Math.abs(a - b) < EPSILON;

  const hasChanged = (oldValue: number, newValue: number) =>
    !isClose(oldValue, newValue);

  const currentItem = state.lineItems.find((item) => item.id === nextItem.id);
  if (!currentItem) {
    return;
  }

  const taxRate = nextItem.taxPercent / 100;

  const expectedTotalPriceTaxExcl =
    nextItem.quantity * nextItem.unitPriceTaxExcl;
  if (hasChanged(expectedTotalPriceTaxExcl, nextItem.totalPriceTaxExcl)) {
    nextItem.unitPriceTaxExcl = nextItem.totalPriceTaxExcl / nextItem.quantity;
    nextItem.unitPriceTaxIncl = nextItem.unitPriceTaxExcl * (1 + taxRate);
    nextItem.totalPriceTaxIncl = nextItem.quantity * nextItem.unitPriceTaxIncl;
  }

  const expectedTotalPriceTaxIncl =
    nextItem.quantity * nextItem.unitPriceTaxIncl;
  if (hasChanged(expectedTotalPriceTaxIncl, nextItem.totalPriceTaxIncl)) {
    nextItem.unitPriceTaxIncl = nextItem.totalPriceTaxIncl / nextItem.quantity;
    nextItem.unitPriceTaxExcl = nextItem.unitPriceTaxIncl / (1 + taxRate);
    nextItem.totalPriceTaxExcl = nextItem.quantity * nextItem.unitPriceTaxExcl;
  }

  const expectedUnitPriceTaxIncl = nextItem.unitPriceTaxExcl * (1 + taxRate);
  if (hasChanged(expectedUnitPriceTaxIncl, nextItem.unitPriceTaxIncl)) {
    nextItem.unitPriceTaxIncl = nextItem.unitPriceTaxExcl * (1 + taxRate);
    nextItem.totalPriceTaxExcl = nextItem.quantity * nextItem.unitPriceTaxExcl;
    nextItem.totalPriceTaxIncl = nextItem.quantity * nextItem.unitPriceTaxIncl;
  }

  const expectedUnitPriceTaxExcl = nextItem.unitPriceTaxIncl / (1 + taxRate);
  if (hasChanged(expectedUnitPriceTaxExcl, nextItem.unitPriceTaxExcl)) {
    nextItem.unitPriceTaxExcl = nextItem.unitPriceTaxIncl / (1 + taxRate);
    nextItem.totalPriceTaxExcl = nextItem.quantity * nextItem.unitPriceTaxExcl;
    nextItem.totalPriceTaxIncl = nextItem.quantity * nextItem.unitPriceTaxIncl;
  }
};
