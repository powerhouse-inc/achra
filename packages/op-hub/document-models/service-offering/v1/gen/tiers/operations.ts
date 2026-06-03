/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ServiceOfferingGlobalState } from "../types.js";
import type {
  AddServiceLevelAction,
  AddTierAction,
  AddUsageLimitAction,
  DeleteTierAction,
  RemoveServiceLevelAction,
  RemoveUsageLimitAction,
  ReorderTiersAction,
  SetTierBillingCycleDiscountsAction,
  SetTierDefaultBillingCycleAction,
  SetTierPricingModeAction,
  UpdateServiceLevelAction,
  UpdateTierAction,
  UpdateTierPricingAction,
  UpdateUsageLimitAction,
} from "./actions.js";

export interface ServiceOfferingTiersOperations {
  addTierOperation: (
    state: ServiceOfferingGlobalState,
    action: AddTierAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTierOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateTierAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTierPricingOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateTierPricingAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteTierOperation: (
    state: ServiceOfferingGlobalState,
    action: DeleteTierAction,
    dispatch?: SignalDispatch,
  ) => void;
  addServiceLevelOperation: (
    state: ServiceOfferingGlobalState,
    action: AddServiceLevelAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateServiceLevelOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateServiceLevelAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeServiceLevelOperation: (
    state: ServiceOfferingGlobalState,
    action: RemoveServiceLevelAction,
    dispatch?: SignalDispatch,
  ) => void;
  addUsageLimitOperation: (
    state: ServiceOfferingGlobalState,
    action: AddUsageLimitAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateUsageLimitOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateUsageLimitAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeUsageLimitOperation: (
    state: ServiceOfferingGlobalState,
    action: RemoveUsageLimitAction,
    dispatch?: SignalDispatch,
  ) => void;
  setTierDefaultBillingCycleOperation: (
    state: ServiceOfferingGlobalState,
    action: SetTierDefaultBillingCycleAction,
    dispatch?: SignalDispatch,
  ) => void;
  setTierBillingCycleDiscountsOperation: (
    state: ServiceOfferingGlobalState,
    action: SetTierBillingCycleDiscountsAction,
    dispatch?: SignalDispatch,
  ) => void;
  setTierPricingModeOperation: (
    state: ServiceOfferingGlobalState,
    action: SetTierPricingModeAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderTiersOperation: (
    state: ServiceOfferingGlobalState,
    action: ReorderTiersAction,
    dispatch?: SignalDispatch,
  ) => void;
}
