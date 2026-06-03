/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddRoadmapInputSchema,
  EditRoadmapInputSchema,
  RemoveRoadmapInputSchema,
} from "../schema/zod.js";
import type {
  AddRoadmapInput,
  EditRoadmapInput,
  RemoveRoadmapInput,
} from "../types.js";
import type {
  AddRoadmapAction,
  EditRoadmapAction,
  RemoveRoadmapAction,
} from "./actions.js";

export const addRoadmap = (input: AddRoadmapInput) =>
  createAction<AddRoadmapAction>(
    "ADD_ROADMAP",
    { ...input },
    undefined,
    AddRoadmapInputSchema,
    "global",
  );

export const removeRoadmap = (input: RemoveRoadmapInput) =>
  createAction<RemoveRoadmapAction>(
    "REMOVE_ROADMAP",
    { ...input },
    undefined,
    RemoveRoadmapInputSchema,
    "global",
  );

export const editRoadmap = (input: EditRoadmapInput) =>
  createAction<EditRoadmapAction>(
    "EDIT_ROADMAP",
    { ...input },
    undefined,
    EditRoadmapInputSchema,
    "global",
  );
