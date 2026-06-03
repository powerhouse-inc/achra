/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddSnapshotAccountInputSchema,
  RemoveSnapshotAccountInputSchema,
  UpdateSnapshotAccountTypeInputSchema,
} from "../schema/zod.js";
import type {
  AddSnapshotAccountInput,
  RemoveSnapshotAccountInput,
  UpdateSnapshotAccountTypeInput,
} from "../types.js";
import type {
  AddSnapshotAccountAction,
  RemoveSnapshotAccountAction,
  UpdateSnapshotAccountTypeAction,
} from "./actions.js";

export const addSnapshotAccount = (input: AddSnapshotAccountInput) =>
  createAction<AddSnapshotAccountAction>(
    "ADD_SNAPSHOT_ACCOUNT",
    { ...input },
    undefined,
    AddSnapshotAccountInputSchema,
    "global",
  );

export const updateSnapshotAccountType = (
  input: UpdateSnapshotAccountTypeInput,
) =>
  createAction<UpdateSnapshotAccountTypeAction>(
    "UPDATE_SNAPSHOT_ACCOUNT_TYPE",
    { ...input },
    undefined,
    UpdateSnapshotAccountTypeInputSchema,
    "global",
  );

export const removeSnapshotAccount = (input: RemoveSnapshotAccountInput) =>
  createAction<RemoveSnapshotAccountAction>(
    "REMOVE_SNAPSHOT_ACCOUNT",
    { ...input },
    undefined,
    RemoveSnapshotAccountInputSchema,
    "global",
  );
