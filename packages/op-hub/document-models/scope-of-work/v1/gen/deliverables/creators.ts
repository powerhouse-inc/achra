/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddDeliverableInputSchema,
  AddKeyResultInputSchema,
  EditDeliverableInputSchema,
  EditKeyResultInputSchema,
  RemoveDeliverableInputSchema,
  RemoveKeyResultInputSchema,
  SetDeliverableBudgetAnchorProjectInputSchema,
  SetDeliverableProgressInputSchema,
} from "../schema/zod.js";
import type {
  AddDeliverableInput,
  AddKeyResultInput,
  EditDeliverableInput,
  EditKeyResultInput,
  RemoveDeliverableInput,
  RemoveKeyResultInput,
  SetDeliverableBudgetAnchorProjectInput,
  SetDeliverableProgressInput,
} from "../types.js";
import type {
  AddDeliverableAction,
  AddKeyResultAction,
  EditDeliverableAction,
  EditKeyResultAction,
  RemoveDeliverableAction,
  RemoveKeyResultAction,
  SetDeliverableBudgetAnchorProjectAction,
  SetDeliverableProgressAction,
} from "./actions.js";

export const addDeliverable = (input: AddDeliverableInput) =>
  createAction<AddDeliverableAction>(
    "ADD_DELIVERABLE",
    { ...input },
    undefined,
    AddDeliverableInputSchema,
    "global",
  );

export const removeDeliverable = (input: RemoveDeliverableInput) =>
  createAction<RemoveDeliverableAction>(
    "REMOVE_DELIVERABLE",
    { ...input },
    undefined,
    RemoveDeliverableInputSchema,
    "global",
  );

export const editDeliverable = (input: EditDeliverableInput) =>
  createAction<EditDeliverableAction>(
    "EDIT_DELIVERABLE",
    { ...input },
    undefined,
    EditDeliverableInputSchema,
    "global",
  );

export const setDeliverableProgress = (input: SetDeliverableProgressInput) =>
  createAction<SetDeliverableProgressAction>(
    "SET_DELIVERABLE_PROGRESS",
    { ...input },
    undefined,
    SetDeliverableProgressInputSchema,
    "global",
  );

export const addKeyResult = (input: AddKeyResultInput) =>
  createAction<AddKeyResultAction>(
    "ADD_KEY_RESULT",
    { ...input },
    undefined,
    AddKeyResultInputSchema,
    "global",
  );

export const removeKeyResult = (input: RemoveKeyResultInput) =>
  createAction<RemoveKeyResultAction>(
    "REMOVE_KEY_RESULT",
    { ...input },
    undefined,
    RemoveKeyResultInputSchema,
    "global",
  );

export const editKeyResult = (input: EditKeyResultInput) =>
  createAction<EditKeyResultAction>(
    "EDIT_KEY_RESULT",
    { ...input },
    undefined,
    EditKeyResultInputSchema,
    "global",
  );

export const setDeliverableBudgetAnchorProject = (
  input: SetDeliverableBudgetAnchorProjectInput,
) =>
  createAction<SetDeliverableBudgetAnchorProjectAction>(
    "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT",
    { ...input },
    undefined,
    SetDeliverableBudgetAnchorProjectInputSchema,
    "global",
  );
