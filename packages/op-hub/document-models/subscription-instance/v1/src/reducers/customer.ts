import type { SubscriptionInstanceCustomerOperations } from "document-models/subscription-instance/v1";

export const subscriptionInstanceCustomerOperations: SubscriptionInstanceCustomerOperations =
  {
    setCustomerTypeOperation(state, action) {
      state.customerType = action.input.customerType;
      state.teamMemberCount = action.input.teamMemberCount || null;
    },
    updateTeamMemberCountOperation(state, action) {
      state.teamMemberCount = action.input.teamMemberCount;
    },
  };
