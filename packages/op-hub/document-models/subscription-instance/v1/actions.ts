/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  subscriptionInstanceCustomerActions,
  subscriptionInstanceDebtLineItemsActions,
  subscriptionInstanceMetricsActions,
  subscriptionInstanceServiceActions,
  subscriptionInstanceServiceGroupActions,
  subscriptionInstanceSubscriptionActions,
} from "./gen/creators.js";

/** Actions for the SubscriptionInstance document model */

export const actions = {
  ...baseActions,
  ...subscriptionInstanceSubscriptionActions,
  ...subscriptionInstanceServiceActions,
  ...subscriptionInstanceServiceGroupActions,
  ...subscriptionInstanceMetricsActions,
  ...subscriptionInstanceCustomerActions,
  ...subscriptionInstanceDebtLineItemsActions,
};
