/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SubscriptionInstanceGlobalState } from "../types.js";
import type {
  SetCustomerTypeAction,
  UpdateTeamMemberCountAction,
} from "./actions.js";

export interface SubscriptionInstanceCustomerOperations {
  setCustomerTypeOperation: (
    state: SubscriptionInstanceGlobalState,
    action: SetCustomerTypeAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTeamMemberCountOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateTeamMemberCountAction,
    dispatch?: SignalDispatch,
  ) => void;
}
