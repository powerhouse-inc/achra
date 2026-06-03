/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { SubscriptionInstanceCustomerAction } from "./customer/actions.js";
import type { SubscriptionInstanceDebtLineItemsAction } from "./debt-line-items/actions.js";
import type { SubscriptionInstanceMetricsAction } from "./metrics/actions.js";
import type { SubscriptionInstanceServiceGroupAction } from "./service-group/actions.js";
import type { SubscriptionInstanceServiceAction } from "./service/actions.js";
import type { SubscriptionInstanceSubscriptionAction } from "./subscription/actions.js";

export * from "./customer/actions.js";
export * from "./debt-line-items/actions.js";
export * from "./metrics/actions.js";
export * from "./service-group/actions.js";
export * from "./service/actions.js";
export * from "./subscription/actions.js";

export type SubscriptionInstanceAction =
  | SubscriptionInstanceSubscriptionAction
  | SubscriptionInstanceServiceAction
  | SubscriptionInstanceServiceGroupAction
  | SubscriptionInstanceMetricsAction
  | SubscriptionInstanceCustomerAction
  | SubscriptionInstanceDebtLineItemsAction;
