/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AccrueMetricUsageInput,
  AddServiceMetricInput,
  DecrementMetricUsageInput,
  IncrementMetricUsageInput,
  RemoveServiceMetricInput,
  UpdateMetricInput,
  UpdateMetricUsageInput,
} from "../types.js";

export type AddServiceMetricAction = Action & {
  type: "ADD_SERVICE_METRIC";
  input: AddServiceMetricInput;
};
export type UpdateMetricAction = Action & {
  type: "UPDATE_METRIC";
  input: UpdateMetricInput;
};
export type UpdateMetricUsageAction = Action & {
  type: "UPDATE_METRIC_USAGE";
  input: UpdateMetricUsageInput;
};
export type RemoveServiceMetricAction = Action & {
  type: "REMOVE_SERVICE_METRIC";
  input: RemoveServiceMetricInput;
};
export type IncrementMetricUsageAction = Action & {
  type: "INCREMENT_METRIC_USAGE";
  input: IncrementMetricUsageInput;
};
export type DecrementMetricUsageAction = Action & {
  type: "DECREMENT_METRIC_USAGE";
  input: DecrementMetricUsageInput;
};
export type AccrueMetricUsageAction = Action & {
  type: "ACCRUE_METRIC_USAGE";
  input: AccrueMetricUsageInput;
};

export type SubscriptionInstanceMetricsAction =
  | AddServiceMetricAction
  | UpdateMetricAction
  | UpdateMetricUsageAction
  | RemoveServiceMetricAction
  | IncrementMetricUsageAction
  | DecrementMetricUsageAction
  | AccrueMetricUsageAction;
