/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddMilestoneInputSchema,
  DeleteMilestoneInputSchema,
  ReorderMilestonesInputSchema,
  UpdateMilestoneInputSchema,
  UpdateMilestoneStatusInputSchema,
} from "../schema/zod.js";
import type {
  AddMilestoneInput,
  DeleteMilestoneInput,
  ReorderMilestonesInput,
  UpdateMilestoneInput,
  UpdateMilestoneStatusInput,
} from "../types.js";
import type {
  AddMilestoneAction,
  DeleteMilestoneAction,
  ReorderMilestonesAction,
  UpdateMilestoneAction,
  UpdateMilestoneStatusAction,
} from "./actions.js";

export const addMilestone = (input: AddMilestoneInput) =>
  createAction<AddMilestoneAction>(
    "ADD_MILESTONE",
    { ...input },
    undefined,
    AddMilestoneInputSchema,
    "global",
  );

export const updateMilestone = (input: UpdateMilestoneInput) =>
  createAction<UpdateMilestoneAction>(
    "UPDATE_MILESTONE",
    { ...input },
    undefined,
    UpdateMilestoneInputSchema,
    "global",
  );

export const updateMilestoneStatus = (input: UpdateMilestoneStatusInput) =>
  createAction<UpdateMilestoneStatusAction>(
    "UPDATE_MILESTONE_STATUS",
    { ...input },
    undefined,
    UpdateMilestoneStatusInputSchema,
    "global",
  );

export const deleteMilestone = (input: DeleteMilestoneInput) =>
  createAction<DeleteMilestoneAction>(
    "DELETE_MILESTONE",
    { ...input },
    undefined,
    DeleteMilestoneInputSchema,
    "global",
  );

export const reorderMilestones = (input: ReorderMilestonesInput) =>
  createAction<ReorderMilestonesAction>(
    "REORDER_MILESTONES",
    { ...input },
    undefined,
    ReorderMilestonesInputSchema,
    "global",
  );
