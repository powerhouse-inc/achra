/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ServiceOfferingGlobalState } from "../types.js";
import type {
  AddOptionGroupAction,
  AddOptionGroupTierPricingAction,
  DeleteOptionGroupAction,
  RemoveOptionGroupTierPricingAction,
  SetOptionGroupDiscountModeAction,
  SetOptionGroupStandalonePricingAction,
  UpdateOptionGroupAction,
  UpdateOptionGroupTierPricingAction,
} from "./actions.js";

export interface ServiceOfferingOptionGroupsOperations {
  addOptionGroupOperation: (
    state: ServiceOfferingGlobalState,
    action: AddOptionGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateOptionGroupOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateOptionGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteOptionGroupOperation: (
    state: ServiceOfferingGlobalState,
    action: DeleteOptionGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOptionGroupStandalonePricingOperation: (
    state: ServiceOfferingGlobalState,
    action: SetOptionGroupStandalonePricingAction,
    dispatch?: SignalDispatch,
  ) => void;
  addOptionGroupTierPricingOperation: (
    state: ServiceOfferingGlobalState,
    action: AddOptionGroupTierPricingAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateOptionGroupTierPricingOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateOptionGroupTierPricingAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeOptionGroupTierPricingOperation: (
    state: ServiceOfferingGlobalState,
    action: RemoveOptionGroupTierPricingAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOptionGroupDiscountModeOperation: (
    state: ServiceOfferingGlobalState,
    action: SetOptionGroupDiscountModeAction,
    dispatch?: SignalDispatch,
  ) => void;
}
