/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddDeliverableInSetInputSchema,
  EditDeliverablesSetInputSchema,
  RemoveDeliverableInSetInputSchema,
} from "../schema/zod.js";
import type {
  AddDeliverableInSetInput,
  EditDeliverablesSetInput,
  RemoveDeliverableInSetInput,
} from "../types.js";
import type {
  AddDeliverableInSetAction,
  EditDeliverablesSetAction,
  RemoveDeliverableInSetAction,
} from "./actions.js";

export const editDeliverablesSet = (input: EditDeliverablesSetInput) =>
  createAction<EditDeliverablesSetAction>(
    "EDIT_DELIVERABLES_SET",
    { ...input },
    undefined,
    EditDeliverablesSetInputSchema,
    "global",
  );

export const addDeliverableInSet = (input: AddDeliverableInSetInput) =>
  createAction<AddDeliverableInSetAction>(
    "ADD_DELIVERABLE_IN_SET",
    { ...input },
    undefined,
    AddDeliverableInSetInputSchema,
    "global",
  );

export const removeDeliverableInSet = (input: RemoveDeliverableInSetInput) =>
  createAction<RemoveDeliverableInSetAction>(
    "REMOVE_DELIVERABLE_IN_SET",
    { ...input },
    undefined,
    RemoveDeliverableInSetInputSchema,
    "global",
  );
