/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ServiceOfferingGlobalState } from "../types.js";
import type {
  AddFacetOptionAction,
  ChangeResourceTemplateAction,
  RemoveFacetOptionAction,
  RemoveFacetTargetAction,
  SelectResourceTemplateAction,
  SetAvailableBillingCyclesAction,
  SetFacetTargetAction,
  SetOfferingIdAction,
  SetOperatorAction,
  UpdateOfferingInfoAction,
  UpdateOfferingStatusAction,
} from "./actions.js";

export interface ServiceOfferingOfferingOperations {
  updateOfferingInfoOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateOfferingInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateOfferingStatusOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateOfferingStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOperatorOperation: (
    state: ServiceOfferingGlobalState,
    action: SetOperatorAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOfferingIdOperation: (
    state: ServiceOfferingGlobalState,
    action: SetOfferingIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  setFacetTargetOperation: (
    state: ServiceOfferingGlobalState,
    action: SetFacetTargetAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeFacetTargetOperation: (
    state: ServiceOfferingGlobalState,
    action: RemoveFacetTargetAction,
    dispatch?: SignalDispatch,
  ) => void;
  addFacetOptionOperation: (
    state: ServiceOfferingGlobalState,
    action: AddFacetOptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeFacetOptionOperation: (
    state: ServiceOfferingGlobalState,
    action: RemoveFacetOptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  selectResourceTemplateOperation: (
    state: ServiceOfferingGlobalState,
    action: SelectResourceTemplateAction,
    dispatch?: SignalDispatch,
  ) => void;
  changeResourceTemplateOperation: (
    state: ServiceOfferingGlobalState,
    action: ChangeResourceTemplateAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAvailableBillingCyclesOperation: (
    state: ServiceOfferingGlobalState,
    action: SetAvailableBillingCyclesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
