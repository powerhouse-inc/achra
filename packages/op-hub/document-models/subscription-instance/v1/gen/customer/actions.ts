/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  SetCustomerTypeInput,
  UpdateTeamMemberCountInput,
} from "../types.js";

export type SetCustomerTypeAction = Action & {
  type: "SET_CUSTOMER_TYPE";
  input: SetCustomerTypeInput;
};
export type UpdateTeamMemberCountAction = Action & {
  type: "UPDATE_TEAM_MEMBER_COUNT";
  input: UpdateTeamMemberCountInput;
};

export type SubscriptionInstanceCustomerAction =
  | SetCustomerTypeAction
  | UpdateTeamMemberCountAction;
