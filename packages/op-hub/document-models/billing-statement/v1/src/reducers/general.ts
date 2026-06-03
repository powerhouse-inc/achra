import type { BillingStatementGeneralOperations } from "document-models/billing-statement/v1";
import { BillingStatementStatusInputSchema } from "../../gen/schema/zod.js";

export const billingStatementGeneralOperations: BillingStatementGeneralOperations =
  {
    editBillingStatementOperation(state, action) {
      state.dateIssued = action.input.dateIssued ?? state.dateIssued;
      state.dateDue = action.input.dateDue ?? state.dateDue;
      state.currency = action.input.currency ?? state.currency;
      state.notes = action.input.notes ?? state.notes;
    },
    editContributorOperation(state, action) {
      state.contributor = action.input.contributor ?? state.contributor;
    },
    editStatusOperation(state, action) {
      if (
        !BillingStatementStatusInputSchema.safeParse(action.input.status)
          .success
      ) {
        throw new Error("Invalid status value");
      }
      state.status = action.input.status ?? state.status;
    },
  };
