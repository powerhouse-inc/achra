/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddAgentInputSchema,
  EditAgentInputSchema,
  RemoveAgentInputSchema,
} from "../schema/zod.js";
import type {
  AddAgentInput,
  EditAgentInput,
  RemoveAgentInput,
} from "../types.js";
import type {
  AddAgentAction,
  EditAgentAction,
  RemoveAgentAction,
} from "./actions.js";

export const addAgent = (input: AddAgentInput) =>
  createAction<AddAgentAction>(
    "ADD_AGENT",
    { ...input },
    undefined,
    AddAgentInputSchema,
    "global",
  );

export const removeAgent = (input: RemoveAgentInput) =>
  createAction<RemoveAgentAction>(
    "REMOVE_AGENT",
    { ...input },
    undefined,
    RemoveAgentInputSchema,
    "global",
  );

export const editAgent = (input: EditAgentInput) =>
  createAction<EditAgentAction>(
    "EDIT_AGENT",
    { ...input },
    undefined,
    EditAgentInputSchema,
    "global",
  );
