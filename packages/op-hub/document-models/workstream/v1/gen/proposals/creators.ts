/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddAlternativeProposalInputSchema,
  EditAlternativeProposalInputSchema,
  EditInitialProposalInputSchema,
  RemoveAlternativeProposalInputSchema,
} from "../schema/zod.js";
import type {
  AddAlternativeProposalInput,
  EditAlternativeProposalInput,
  EditInitialProposalInput,
  RemoveAlternativeProposalInput,
} from "../types.js";
import type {
  AddAlternativeProposalAction,
  EditAlternativeProposalAction,
  EditInitialProposalAction,
  RemoveAlternativeProposalAction,
} from "./actions.js";

export const editInitialProposal = (input: EditInitialProposalInput) =>
  createAction<EditInitialProposalAction>(
    "EDIT_INITIAL_PROPOSAL",
    { ...input },
    undefined,
    EditInitialProposalInputSchema,
    "global",
  );

export const addAlternativeProposal = (input: AddAlternativeProposalInput) =>
  createAction<AddAlternativeProposalAction>(
    "ADD_ALTERNATIVE_PROPOSAL",
    { ...input },
    undefined,
    AddAlternativeProposalInputSchema,
    "global",
  );

export const editAlternativeProposal = (input: EditAlternativeProposalInput) =>
  createAction<EditAlternativeProposalAction>(
    "EDIT_ALTERNATIVE_PROPOSAL",
    { ...input },
    undefined,
    EditAlternativeProposalInputSchema,
    "global",
  );

export const removeAlternativeProposal = (
  input: RemoveAlternativeProposalInput,
) =>
  createAction<RemoveAlternativeProposalAction>(
    "REMOVE_ALTERNATIVE_PROPOSAL",
    { ...input },
    undefined,
    RemoveAlternativeProposalInputSchema,
    "global",
  );
