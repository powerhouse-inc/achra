/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddFacetOptionInputSchema,
  ChangeResourceTemplateInputSchema,
  RemoveFacetOptionInputSchema,
  RemoveFacetTargetInputSchema,
  SelectResourceTemplateInputSchema,
  SetAvailableBillingCyclesInputSchema,
  SetFacetTargetInputSchema,
  SetOfferingIdInputSchema,
  SetOperatorInputSchema,
  UpdateOfferingInfoInputSchema,
  UpdateOfferingStatusInputSchema,
} from "../schema/zod.js";
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

export const updateOfferingInfo = (input: UpdateOfferingInfoInput) =>
  createAction<UpdateOfferingInfoAction>(
    "UPDATE_OFFERING_INFO",
    { ...input },
    undefined,
    UpdateOfferingInfoInputSchema,
    "global",
  );

export const updateOfferingStatus = (input: UpdateOfferingStatusInput) =>
  createAction<UpdateOfferingStatusAction>(
    "UPDATE_OFFERING_STATUS",
    { ...input },
    undefined,
    UpdateOfferingStatusInputSchema,
    "global",
  );

export const setOperator = (input: SetOperatorInput) =>
  createAction<SetOperatorAction>(
    "SET_OPERATOR",
    { ...input },
    undefined,
    SetOperatorInputSchema,
    "global",
  );

export const setOfferingId = (input: SetOfferingIdInput) =>
  createAction<SetOfferingIdAction>(
    "SET_OFFERING_ID",
    { ...input },
    undefined,
    SetOfferingIdInputSchema,
    "global",
  );

export const setFacetTarget = (input: SetFacetTargetInput) =>
  createAction<SetFacetTargetAction>(
    "SET_FACET_TARGET",
    { ...input },
    undefined,
    SetFacetTargetInputSchema,
    "global",
  );

export const removeFacetTarget = (input: RemoveFacetTargetInput) =>
  createAction<RemoveFacetTargetAction>(
    "REMOVE_FACET_TARGET",
    { ...input },
    undefined,
    RemoveFacetTargetInputSchema,
    "global",
  );

export const addFacetOption = (input: AddFacetOptionInput) =>
  createAction<AddFacetOptionAction>(
    "ADD_FACET_OPTION",
    { ...input },
    undefined,
    AddFacetOptionInputSchema,
    "global",
  );

export const removeFacetOption = (input: RemoveFacetOptionInput) =>
  createAction<RemoveFacetOptionAction>(
    "REMOVE_FACET_OPTION",
    { ...input },
    undefined,
    RemoveFacetOptionInputSchema,
    "global",
  );

export const selectResourceTemplate = (input: SelectResourceTemplateInput) =>
  createAction<SelectResourceTemplateAction>(
    "SELECT_RESOURCE_TEMPLATE",
    { ...input },
    undefined,
    SelectResourceTemplateInputSchema,
    "global",
  );

export const changeResourceTemplate = (input: ChangeResourceTemplateInput) =>
  createAction<ChangeResourceTemplateAction>(
    "CHANGE_RESOURCE_TEMPLATE",
    { ...input },
    undefined,
    ChangeResourceTemplateInputSchema,
    "global",
  );

export const setAvailableBillingCycles = (
  input: SetAvailableBillingCyclesInput,
) =>
  createAction<SetAvailableBillingCyclesAction>(
    "SET_AVAILABLE_BILLING_CYCLES",
    { ...input },
    undefined,
    SetAvailableBillingCyclesInputSchema,
    "global",
  );
