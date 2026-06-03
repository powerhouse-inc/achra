/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddFacetOptionInput,
  ChangeResourceTemplateInput,
  RemoveFacetOptionInput,
  RemoveFacetTargetInput,
  SelectResourceTemplateInput,
  SetAvailableBillingCyclesInput,
  SetFacetTargetInput,
  SetOfferingIdInput,
  SetOperatorInput,
  UpdateOfferingInfoInput,
  UpdateOfferingStatusInput,
} from "../types.js";

export type UpdateOfferingInfoAction = Action & {
  type: "UPDATE_OFFERING_INFO";
  input: UpdateOfferingInfoInput;
};
export type UpdateOfferingStatusAction = Action & {
  type: "UPDATE_OFFERING_STATUS";
  input: UpdateOfferingStatusInput;
};
export type SetOperatorAction = Action & {
  type: "SET_OPERATOR";
  input: SetOperatorInput;
};
export type SetOfferingIdAction = Action & {
  type: "SET_OFFERING_ID";
  input: SetOfferingIdInput;
};
export type SetFacetTargetAction = Action & {
  type: "SET_FACET_TARGET";
  input: SetFacetTargetInput;
};
export type RemoveFacetTargetAction = Action & {
  type: "REMOVE_FACET_TARGET";
  input: RemoveFacetTargetInput;
};
export type AddFacetOptionAction = Action & {
  type: "ADD_FACET_OPTION";
  input: AddFacetOptionInput;
};
export type RemoveFacetOptionAction = Action & {
  type: "REMOVE_FACET_OPTION";
  input: RemoveFacetOptionInput;
};
export type SelectResourceTemplateAction = Action & {
  type: "SELECT_RESOURCE_TEMPLATE";
  input: SelectResourceTemplateInput;
};
export type ChangeResourceTemplateAction = Action & {
  type: "CHANGE_RESOURCE_TEMPLATE";
  input: ChangeResourceTemplateInput;
};
export type SetAvailableBillingCyclesAction = Action & {
  type: "SET_AVAILABLE_BILLING_CYCLES";
  input: SetAvailableBillingCyclesInput;
};

export type ServiceOfferingOfferingAction =
  | UpdateOfferingInfoAction
  | UpdateOfferingStatusAction
  | SetOperatorAction
  | SetOfferingIdAction
  | SetFacetTargetAction
  | RemoveFacetTargetAction
  | AddFacetOptionAction
  | RemoveFacetOptionAction
  | SelectResourceTemplateAction
  | ChangeResourceTemplateAction
  | SetAvailableBillingCyclesAction;
