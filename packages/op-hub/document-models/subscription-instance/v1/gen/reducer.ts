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
      InitializeSubscriptionInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.initializeSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_RESOURCE_DOCUMENT": {
      SetResourceDocumentInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.setResourceDocumentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ACTIVATE_SUBSCRIPTION": {
      ActivateSubscriptionInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.activateSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "PAUSE_SUBSCRIPTION": {
      PauseSubscriptionInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.pauseSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_EXPIRING": {
      SetExpiringInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.setExpiringOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CANCEL_SUBSCRIPTION": {
      CancelSubscriptionInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.cancelSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RESUME_SUBSCRIPTION": {
      ResumeSubscriptionInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.resumeSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RENEW_EXPIRING_SUBSCRIPTION": {
      RenewExpiringSubscriptionInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.renewExpiringSubscriptionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_CUSTOMER_INFO": {
      UpdateCustomerInfoInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.updateCustomerInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TIER_INFO": {
      UpdateTierInfoInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.updateTierInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPERATOR_NOTES": {
      SetOperatorNotesInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.setOperatorNotesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_AUTO_RENEW": {
      SetAutoRenewInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.setAutoRenewOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CHANGE_PLAN": {
      ChangePlanInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.changePlanOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "GENERATE_INVOICE": {
      GenerateInvoiceInputSchema().parse(action.input);

      subscriptionInstanceSubscriptionOperations.generateInvoiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE": {
      AddServiceInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.addServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE": {
      RemoveServiceInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.removeServiceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_SETUP_COST": {
      UpdateServiceSetupCostInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.updateServiceSetupCostOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_RECURRING_COST": {
      UpdateServiceRecurringCostInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.updateServiceRecurringCostOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_SETUP_PAYMENT": {
      ReportSetupPaymentInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.reportSetupPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_RECURRING_PAYMENT": {
      ReportRecurringPaymentInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.reportRecurringPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_INFO": {
      UpdateServiceInfoInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.updateServiceInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_FACET_SELECTION": {
      AddServiceFacetSelectionInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.addServiceFacetSelectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_FACET_SELECTION": {
      RemoveServiceFacetSelectionInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.removeServiceFacetSelectionOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_OVERAGE_PAYMENT": {
      ReportOveragePaymentInputSchema().parse(action.input);

      subscriptionInstanceServiceOperations.reportOveragePaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_GROUP": {
      AddServiceGroupInputSchema().parse(action.input);

      subscriptionInstanceServiceGroupOperations.addServiceGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_GROUP": {
      RemoveServiceGroupInputSchema().parse(action.input);

      subscriptionInstanceServiceGroupOperations.removeServiceGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_TO_GROUP": {
      AddServiceToGroupInputSchema().parse(action.input);

      subscriptionInstanceServiceGroupOperations.addServiceToGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_FROM_GROUP": {
      RemoveServiceFromGroupInputSchema().parse(action.input);

      subscriptionInstanceServiceGroupOperations.removeServiceFromGroupOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_SERVICE_GROUP_COST": {
      UpdateServiceGroupCostInputSchema().parse(action.input);

      subscriptionInstanceServiceGroupOperations.updateServiceGroupCostOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ADD_SERVICE_METRIC": {
      AddServiceMetricInputSchema().parse(action.input);

      subscriptionInstanceMetricsOperations.addServiceMetricOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_METRIC": {
      UpdateMetricInputSchema().parse(action.input);

      subscriptionInstanceMetricsOperations.updateMetricOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_METRIC_USAGE": {
      UpdateMetricUsageInputSchema().parse(action.input);

      subscriptionInstanceMetricsOperations.updateMetricUsageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_SERVICE_METRIC": {
      RemoveServiceMetricInputSchema().parse(action.input);

      subscriptionInstanceMetricsOperations.removeServiceMetricOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "INCREMENT_METRIC_USAGE": {
      IncrementMetricUsageInputSchema().parse(action.input);

      subscriptionInstanceMetricsOperations.incrementMetricUsageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "DECREMENT_METRIC_USAGE": {
      DecrementMetricUsageInputSchema().parse(action.input);

      subscriptionInstanceMetricsOperations.decrementMetricUsageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ACCRUE_METRIC_USAGE": {
      AccrueMetricUsageInputSchema().parse(action.input);

      subscriptionInstanceMetricsOperations.accrueMetricUsageOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_CUSTOMER_TYPE": {
      SetCustomerTypeInputSchema().parse(action.input);

      subscriptionInstanceCustomerOperations.setCustomerTypeOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_TEAM_MEMBER_COUNT": {
      UpdateTeamMemberCountInputSchema().parse(action.input);

      subscriptionInstanceCustomerOperations.updateTeamMemberCountOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "MARK_LINE_ITEM_INVOICED": {
      MarkLineItemInvoicedInputSchema().parse(action.input);

      subscriptionInstanceDebtLineItemsOperations.markLineItemInvoicedOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CONFIRM_LINE_ITEM_PAYMENT": {
      ConfirmLineItemPaymentInputSchema().parse(action.input);

      subscriptionInstanceDebtLineItemsOperations.confirmLineItemPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_PAYMENT": {
      ReportPaymentInputSchema().parse(action.input);

      subscriptionInstanceDebtLineItemsOperations.reportPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "APPLY_CREDIT": {
      ApplyCreditInputSchema().parse(action.input);

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
