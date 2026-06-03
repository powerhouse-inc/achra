/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddServiceGroupInput,
  AddServiceToGroupInput,
  RemoveServiceFromGroupInput,
  RemoveServiceGroupInput,
  UpdateServiceGroupCostInput,
} from "../types.js";

export type AddServiceGroupAction = Action & {
  type: "ADD_SERVICE_GROUP";
  input: AddServiceGroupInput;
};
export type RemoveServiceGroupAction = Action & {
  type: "REMOVE_SERVICE_GROUP";
  input: RemoveServiceGroupInput;
};
export type AddServiceToGroupAction = Action & {
  type: "ADD_SERVICE_TO_GROUP";
  input: AddServiceToGroupInput;
};
export type RemoveServiceFromGroupAction = Action & {
  type: "REMOVE_SERVICE_FROM_GROUP";
  input: RemoveServiceFromGroupInput;
};
export type UpdateServiceGroupCostAction = Action & {
  type: "UPDATE_SERVICE_GROUP_COST";
  input: UpdateServiceGroupCostInput;
};

export type SubscriptionInstanceServiceGroupAction =
  | AddServiceGroupAction
  | RemoveServiceGroupAction
  | AddServiceToGroupAction
  | RemoveServiceFromGroupAction
  | UpdateServiceGroupCostAction;
