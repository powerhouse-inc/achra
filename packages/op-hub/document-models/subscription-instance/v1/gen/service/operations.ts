/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SubscriptionInstanceGlobalState } from "../types.js";
import type {
  AddServiceAction,
  AddServiceFacetSelectionAction,
  RemoveServiceAction,
  RemoveServiceFacetSelectionAction,
  ReportOveragePaymentAction,
  ReportRecurringPaymentAction,
  ReportSetupPaymentAction,
  UpdateServiceInfoAction,
  UpdateServiceRecurringCostAction,
  UpdateServiceSetupCostAction,
} from "./actions.js";

export interface SubscriptionInstanceServiceOperations {
  addServiceOperation: (
    state: SubscriptionInstanceGlobalState,
    action: AddServiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeServiceOperation: (
    state: SubscriptionInstanceGlobalState,
    action: RemoveServiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateServiceSetupCostOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateServiceSetupCostAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateServiceRecurringCostOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateServiceRecurringCostAction,
    dispatch?: SignalDispatch,
  ) => void;
  reportSetupPaymentOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ReportSetupPaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  reportRecurringPaymentOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ReportRecurringPaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateServiceInfoOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateServiceInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  addServiceFacetSelectionOperation: (
    state: SubscriptionInstanceGlobalState,
    action: AddServiceFacetSelectionAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeServiceFacetSelectionOperation: (
    state: SubscriptionInstanceGlobalState,
    action: RemoveServiceFacetSelectionAction,
    dispatch?: SignalDispatch,
  ) => void;
  reportOveragePaymentOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ReportOveragePaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
