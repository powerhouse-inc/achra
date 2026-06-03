/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddProposalInputSchema,
  ChangeProposalStatusInputSchema,
  RemoveProposalInputSchema,
} from "../schema/zod.js";
import type {
  AddProposalInput,
  ChangeProposalStatusInput,
  RemoveProposalInput,
} from "../types.js";
import type {
  AddProposalAction,
  ChangeProposalStatusAction,
  RemoveProposalAction,
} from "./actions.js";

export const addProposal = (input: AddProposalInput) =>
  createAction<AddProposalAction>(
    "ADD_PROPOSAL",
    { ...input },
    undefined,
    AddProposalInputSchema,
    "global",
  );

export const changeProposalStatus = (input: ChangeProposalStatusInput) =>
  createAction<ChangeProposalStatusAction>(
    "CHANGE_PROPOSAL_STATUS",
    { ...input },
    undefined,
    ChangeProposalStatusInputSchema,
    "global",
  );

export const removeProposal = (input: RemoveProposalInput) =>
  createAction<RemoveProposalAction>(
    "REMOVE_PROPOSAL",
    { ...input },
    undefined,
    RemoveProposalInputSchema,
    "global",
  );
