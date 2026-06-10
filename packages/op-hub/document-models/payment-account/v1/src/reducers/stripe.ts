import type { PaymentAccountStripeOperations } from "document-models/payment-account/v1";
import {
  EmptyOperatorIdError,
  EmptyStripeAccountIdError,
  StripeAccountAlreadyConnectedError,
  StripeAccountNotConnectedError,
} from "../../gen/stripe/error.js";

export const paymentAccountStripeOperations: PaymentAccountStripeOperations = {
  setOperatorOperation(state, action) {
    const operatorId = action.input.operatorId
      ? action.input.operatorId.trim()
      : "";
    if (!operatorId) {
      throw new EmptyOperatorIdError("Operator id cannot be empty");
    }
    state.operatorId = operatorId;
    state.lastModified = action.input.lastModified;
  },
  connectStripeAccountOperation(state, action) {
    const id = action.input.stripeAccountId
      ? action.input.stripeAccountId.trim()
      : "";
    if (!id) {
      throw new EmptyStripeAccountIdError("Stripe account ID cannot be empty");
    }
    if (state.stripeAccountId) {
      throw new StripeAccountAlreadyConnectedError(
        "A Stripe account is already connected",
      );
    }
    state.stripeAccountId = id;
    state.lastModified = action.input.lastModified;
  },
  syncStripeAccountStatusOperation(state, action) {
    if (!state.stripeAccountId) {
      throw new StripeAccountNotConnectedError(
        "Cannot sync status: no Stripe account connected",
      );
    }
    state.stripeChargesEnabled = action.input.chargesEnabled;
    state.stripePayoutsEnabled = action.input.payoutsEnabled;
    state.stripeDetailsSubmitted = action.input.detailsSubmitted;
    state.stripeRequirementsCurrentlyDue =
      action.input.requirementsCurrentlyDue;
    state.stripeRequirementsDisabledReason =
      action.input.disabledReason || null;
    state.lastModified = action.input.lastModified;
  },
};
