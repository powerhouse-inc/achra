/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddCoordinatorInputSchema,
  AddMilestoneDeliverableInputSchema,
  AddMilestoneInputSchema,
  EditMilestoneInputSchema,
  RemoveCoordinatorInputSchema,
  RemoveMilestoneDeliverableInputSchema,
  RemoveMilestoneInputSchema,
} from "../schema/zod.js";
import type {
  AddCoordinatorInput,
  AddMilestoneDeliverableInput,
  AddMilestoneInput,
  EditMilestoneInput,
  RemoveCoordinatorInput,
  RemoveMilestoneDeliverableInput,
  RemoveMilestoneInput,
} from "../types.js";
import type {
  AddCoordinatorAction,
  AddMilestoneAction,
  AddMilestoneDeliverableAction,
  EditMilestoneAction,
  RemoveCoordinatorAction,
  RemoveMilestoneAction,
  RemoveMilestoneDeliverableAction,
} from "./actions.js";

export const addMilestone = (input: AddMilestoneInput) =>
  createAction<AddMilestoneAction>(
    "ADD_MILESTONE",
    { ...input },
    undefined,
    AddMilestoneInputSchema,
    "global",
  );

export const removeMilestone = (input: RemoveMilestoneInput) =>
  createAction<RemoveMilestoneAction>(
    "REMOVE_MILESTONE",
    { ...input },
    undefined,
    RemoveMilestoneInputSchema,
    "global",
  );

export const editMilestone = (input: EditMilestoneInput) =>
  createAction<EditMilestoneAction>(
    "EDIT_MILESTONE",
    { ...input },
    undefined,
    EditMilestoneInputSchema,
    "global",
  );

export const addCoordinator = (input: AddCoordinatorInput) =>
  createAction<AddCoordinatorAction>(
    "ADD_COORDINATOR",
    { ...input },
    undefined,
    AddCoordinatorInputSchema,
    "global",
  );

export const removeCoordinator = (input: RemoveCoordinatorInput) =>
  createAction<RemoveCoordinatorAction>(
    "REMOVE_COORDINATOR",
    { ...input },
    undefined,
    RemoveCoordinatorInputSchema,
    "global",
  );

export const addMilestoneDeliverable = (input: AddMilestoneDeliverableInput) =>
  createAction<AddMilestoneDeliverableAction>(
    "ADD_MILESTONE_DELIVERABLE",
    { ...input },
    undefined,
    AddMilestoneDeliverableInputSchema,
    "global",
  );

export const removeMilestoneDeliverable = (
  input: RemoveMilestoneDeliverableInput,
) =>
  createAction<RemoveMilestoneDeliverableAction>(
    "REMOVE_MILESTONE_DELIVERABLE",
    { ...input },
    undefined,
    RemoveMilestoneDeliverableInputSchema,
    "global",
  );
