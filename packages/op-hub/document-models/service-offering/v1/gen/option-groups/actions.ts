/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddOptionGroupInput,
  AddOptionGroupTierPricingInput,
  DeleteOptionGroupInput,
  RemoveOptionGroupTierPricingInput,
  SetOptionGroupDiscountModeInput,
  SetOptionGroupStandalonePricingInput,
  UpdateOptionGroupInput,
  UpdateOptionGroupTierPricingInput,
} from "../types.js";

export type AddOptionGroupAction = Action & {
  type: "ADD_OPTION_GROUP";
  input: AddOptionGroupInput;
};
export type UpdateOptionGroupAction = Action & {
  type: "UPDATE_OPTION_GROUP";
  input: UpdateOptionGroupInput;
};
export type DeleteOptionGroupAction = Action & {
  type: "DELETE_OPTION_GROUP";
  input: DeleteOptionGroupInput;
};
export type SetOptionGroupStandalonePricingAction = Action & {
  type: "SET_OPTION_GROUP_STANDALONE_PRICING";
  input: SetOptionGroupStandalonePricingInput;
};
export type AddOptionGroupTierPricingAction = Action & {
  type: "ADD_OPTION_GROUP_TIER_PRICING";
  input: AddOptionGroupTierPricingInput;
};
export type UpdateOptionGroupTierPricingAction = Action & {
  type: "UPDATE_OPTION_GROUP_TIER_PRICING";
  input: UpdateOptionGroupTierPricingInput;
};
export type RemoveOptionGroupTierPricingAction = Action & {
  type: "REMOVE_OPTION_GROUP_TIER_PRICING";
  input: RemoveOptionGroupTierPricingInput;
};
export type SetOptionGroupDiscountModeAction = Action & {
  type: "SET_OPTION_GROUP_DISCOUNT_MODE";
  input: SetOptionGroupDiscountModeInput;
};

export type ServiceOfferingOptionGroupsAction =
  | AddOptionGroupAction
  | UpdateOptionGroupAction
  | DeleteOptionGroupAction
  | SetOptionGroupStandalonePricingAction
  | AddOptionGroupTierPricingAction
  | UpdateOptionGroupTierPricingAction
  | RemoveOptionGroupTierPricingAction
  | SetOptionGroupDiscountModeAction;
