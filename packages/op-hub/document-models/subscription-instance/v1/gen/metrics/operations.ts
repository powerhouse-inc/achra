/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SubscriptionInstanceGlobalState } from "../types.js";
import type {
  AccrueMetricUsageAction,
  AddServiceMetricAction,
  DecrementMetricUsageAction,
  IncrementMetricUsageAction,
  RemoveServiceMetricAction,
  UpdateMetricAction,
  UpdateMetricUsageAction,
} from "./actions.js";

export interface SubscriptionInstanceMetricsOperations {
  addServiceMetricOperation: (
    state: SubscriptionInstanceGlobalState,
    action: AddServiceMetricAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateMetricOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateMetricAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateMetricUsageOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateMetricUsageAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeServiceMetricOperation: (
    state: SubscriptionInstanceGlobalState,
    action: RemoveServiceMetricAction,
    dispatch?: SignalDispatch,
  ) => void;
  incrementMetricUsageOperation: (
    state: SubscriptionInstanceGlobalState,
    action: IncrementMetricUsageAction,
    dispatch?: SignalDispatch,
  ) => void;
  decrementMetricUsageOperation: (
    state: SubscriptionInstanceGlobalState,
    action: DecrementMetricUsageAction,
    dispatch?: SignalDispatch,
  ) => void;
  accrueMetricUsageOperation: (
    state: SubscriptionInstanceGlobalState,
    action: AccrueMetricUsageAction,
    dispatch?: SignalDispatch,
  ) => void;
}
