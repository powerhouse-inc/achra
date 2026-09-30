/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { SubscriptionInstancePHState } from "document-models/subscription-instance/v1";

import { subscriptionInstanceCustomerOperations } from "../src/reducers/customer.js";
import { subscriptionInstanceDebtLineItemsOperations } from "../src/reducers/debt-line-items.js";
import { subscriptionInstanceMetricsOperations } from "../src/reducers/metrics.js";
import { subscriptionInstanceServiceGroupOperations } from "../src/reducers/service-group.js";
import { subscriptionInstanceServiceOperations } from "../src/reducers/service.js";
import { subscriptionInstanceSubscriptionOperations } from "../src/reducers/subscription.js";

import {
  AccrueMetricUsageInputSchema,
  ActivateSubscriptionInputSchema,
  AddServiceFacetSelectionInputSchema,
  AddServiceGroupInputSchema,
  AddServiceInputSchema,
  AddServiceMetricInputSchema,
  AddServiceToGroupInputSchema,
  ApplyCreditInputSchema,
  CancelSubscriptionInputSchema,
  ChangePlanInputSchema,
  ConfirmLineItemPaymentInputSchema,
  DecrementMetricUsageInputSchema,
  GenerateInvoiceInputSchema,
  IncrementMetricUsageInputSchema,
  InitializeSubscriptionInputSchema,
  MarkLineItemInvoicedInputSchema,
  PauseSubscriptionInputSchema,
  RemoveServiceFacetSelectionInputSchema,
  RemoveServiceFromGroupInputSchema,
  RemoveServiceGroupInputSchema,
  RemoveServiceInputSchema,
  RemoveServiceMetricInputSchema,
  RenewExpiringSubscriptionInputSchema,
  ReportOveragePaymentInputSchema,
  ReportPaymentInputSchema,
  ReportRecurringPaymentInputSchema,
  ReportSetupPaymentInputSchema,
  ResumeSubscriptionInputSchema,
  SetAutoRenewInputSchema,
  SetCustomerTypeInputSchema,
  SetExpiringInputSchema,
  SetOperatorNotesInputSchema,
  SetResourceDocumentInputSchema,
  UpdateCustomerInfoInputSchema,
  UpdateMetricInputSchema,
  UpdateMetricUsageInputSchema,
  UpdateServiceGroupCostInputSchema,
  UpdateServiceInfoInputSchema,
  UpdateServiceRecurringCostInputSchema,
  UpdateServiceSetupCostInputSchema,
  UpdateTeamMemberCountInputSchema,
  UpdateTierInfoInputSchema,
} from "./schema/zod.js";

const schemaMemo = new Map<() => unknown, unknown>();

function memoizedSchema<T>(makeSchema: () => T): T {
  let schema = schemaMemo.get(makeSchema) as T | undefined;
  if (schema === undefined) {
    schema = makeSchema();
    schemaMemo.set(makeSchema, schema);
  }
  return schema;
}

const stateReducer: StateReducer<SubscriptionInstancePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "INITIALIZE_SUBSCRIPTION": {
      memoizedSchema(InitializeSubscriptionInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.initializeSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_RESOURCE_DOCUMENT": {
      memoizedSchema(SetResourceDocumentInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.setResourceDocumentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ACTIVATE_SUBSCRIPTION": {
      memoizedSchema(ActivateSubscriptionInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.activateSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "PAUSE_SUBSCRIPTION": {
      memoizedSchema(PauseSubscriptionInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.pauseSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_EXPIRING": {
      memoizedSchema(SetExpiringInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.setExpiringOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CANCEL_SUBSCRIPTION": {
      memoizedSchema(CancelSubscriptionInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.cancelSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RESUME_SUBSCRIPTION": {
      memoizedSchema(ResumeSubscriptionInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.resumeSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RENEW_EXPIRING_SUBSCRIPTION": {
      memoizedSchema(RenewExpiringSubscriptionInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.renewExpiringSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_CUSTOMER_INFO": {
      memoizedSchema(UpdateCustomerInfoInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.updateCustomerInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TIER_INFO": {
      memoizedSchema(UpdateTierInfoInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.updateTierInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPERATOR_NOTES": {
      memoizedSchema(SetOperatorNotesInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.setOperatorNotesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_AUTO_RENEW": {
      memoizedSchema(SetAutoRenewInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.setAutoRenewOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CHANGE_PLAN": {
      memoizedSchema(ChangePlanInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.changePlanOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "GENERATE_INVOICE": {
      memoizedSchema(GenerateInvoiceInputSchema).parse(action.input);

      subscriptionInstanceSubscriptionOperations.generateInvoiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE": {
      memoizedSchema(AddServiceInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.addServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE": {
      memoizedSchema(RemoveServiceInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.removeServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_SETUP_COST": {
      memoizedSchema(UpdateServiceSetupCostInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.updateServiceSetupCostOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_RECURRING_COST": {
      memoizedSchema(UpdateServiceRecurringCostInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.updateServiceRecurringCostOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_SETUP_PAYMENT": {
      memoizedSchema(ReportSetupPaymentInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.reportSetupPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_RECURRING_PAYMENT": {
      memoizedSchema(ReportRecurringPaymentInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.reportRecurringPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_INFO": {
      memoizedSchema(UpdateServiceInfoInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.updateServiceInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_FACET_SELECTION": {
      memoizedSchema(AddServiceFacetSelectionInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.addServiceFacetSelectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_FACET_SELECTION": {
      memoizedSchema(RemoveServiceFacetSelectionInputSchema).parse(
        action.input,
      );

      subscriptionInstanceServiceOperations.removeServiceFacetSelectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_OVERAGE_PAYMENT": {
      memoizedSchema(ReportOveragePaymentInputSchema).parse(action.input);

      subscriptionInstanceServiceOperations.reportOveragePaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_GROUP": {
      memoizedSchema(AddServiceGroupInputSchema).parse(action.input);

      subscriptionInstanceServiceGroupOperations.addServiceGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_GROUP": {
      memoizedSchema(RemoveServiceGroupInputSchema).parse(action.input);

      subscriptionInstanceServiceGroupOperations.removeServiceGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_TO_GROUP": {
      memoizedSchema(AddServiceToGroupInputSchema).parse(action.input);

      subscriptionInstanceServiceGroupOperations.addServiceToGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_FROM_GROUP": {
      memoizedSchema(RemoveServiceFromGroupInputSchema).parse(action.input);

      subscriptionInstanceServiceGroupOperations.removeServiceFromGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_GROUP_COST": {
      memoizedSchema(UpdateServiceGroupCostInputSchema).parse(action.input);

      subscriptionInstanceServiceGroupOperations.updateServiceGroupCostOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_METRIC": {
      memoizedSchema(AddServiceMetricInputSchema).parse(action.input);

      subscriptionInstanceMetricsOperations.addServiceMetricOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_METRIC": {
      memoizedSchema(UpdateMetricInputSchema).parse(action.input);

      subscriptionInstanceMetricsOperations.updateMetricOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_METRIC_USAGE": {
      memoizedSchema(UpdateMetricUsageInputSchema).parse(action.input);

      subscriptionInstanceMetricsOperations.updateMetricUsageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_METRIC": {
      memoizedSchema(RemoveServiceMetricInputSchema).parse(action.input);

      subscriptionInstanceMetricsOperations.removeServiceMetricOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "INCREMENT_METRIC_USAGE": {
      memoizedSchema(IncrementMetricUsageInputSchema).parse(action.input);

      subscriptionInstanceMetricsOperations.incrementMetricUsageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DECREMENT_METRIC_USAGE": {
      memoizedSchema(DecrementMetricUsageInputSchema).parse(action.input);

      subscriptionInstanceMetricsOperations.decrementMetricUsageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ACCRUE_METRIC_USAGE": {
      memoizedSchema(AccrueMetricUsageInputSchema).parse(action.input);

      subscriptionInstanceMetricsOperations.accrueMetricUsageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_CUSTOMER_TYPE": {
      memoizedSchema(SetCustomerTypeInputSchema).parse(action.input);

      subscriptionInstanceCustomerOperations.setCustomerTypeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TEAM_MEMBER_COUNT": {
      memoizedSchema(UpdateTeamMemberCountInputSchema).parse(action.input);

      subscriptionInstanceCustomerOperations.updateTeamMemberCountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "MARK_LINE_ITEM_INVOICED": {
      memoizedSchema(MarkLineItemInvoicedInputSchema).parse(action.input);

      subscriptionInstanceDebtLineItemsOperations.markLineItemInvoicedOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CONFIRM_LINE_ITEM_PAYMENT": {
      memoizedSchema(ConfirmLineItemPaymentInputSchema).parse(action.input);

      subscriptionInstanceDebtLineItemsOperations.confirmLineItemPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_PAYMENT": {
      memoizedSchema(ReportPaymentInputSchema).parse(action.input);

      subscriptionInstanceDebtLineItemsOperations.reportPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "APPLY_CREDIT": {
      memoizedSchema(ApplyCreditInputSchema).parse(action.input);

      subscriptionInstanceDebtLineItemsOperations.applyCreditOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer: Reducer<SubscriptionInstancePHState> =
  createReducer(stateReducer);
