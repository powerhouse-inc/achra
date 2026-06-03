/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SubscriptionInstanceGlobalState } from "../types.js";
import type {
  AddServiceGroupAction,
  AddServiceToGroupAction,
  RemoveServiceFromGroupAction,
  RemoveServiceGroupAction,
  UpdateServiceGroupCostAction,
} from "./actions.js";

export interface SubscriptionInstanceServiceGroupOperations {
  addServiceGroupOperation: (
    state: SubscriptionInstanceGlobalState,
    action: AddServiceGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeServiceGroupOperation: (
    state: SubscriptionInstanceGlobalState,
    action: RemoveServiceGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  addServiceToGroupOperation: (
    state: SubscriptionInstanceGlobalState,
    action: AddServiceToGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeServiceFromGroupOperation: (
    state: SubscriptionInstanceGlobalState,
    action: RemoveServiceFromGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateServiceGroupCostOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateServiceGroupCostAction,
    dispatch?: SignalDispatch,
  ) => void;
}
