/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddAccountInputSchema,
  DeleteAccountInputSchema,
  UpdateAccountInputSchema,
  UpdateKycStatusInputSchema,
} from "../schema/zod.js";
import type {
  AddAccountInput,
  DeleteAccountInput,
  UpdateAccountInput,
  UpdateKycStatusInput,
} from "../types.js";
import type {
  AddAccountAction,
  DeleteAccountAction,
  UpdateAccountAction,
  UpdateKycStatusAction,
} from "./actions.js";

export const addAccount = (input: AddAccountInput) =>
  createAction<AddAccountAction>(
    "ADD_ACCOUNT",
    { ...input },
    undefined,
    AddAccountInputSchema,
    "global",
  );

export const updateAccount = (input: UpdateAccountInput) =>
  createAction<UpdateAccountAction>(
    "UPDATE_ACCOUNT",
    { ...input },
    undefined,
    UpdateAccountInputSchema,
    "global",
  );

export const deleteAccount = (input: DeleteAccountInput) =>
  createAction<DeleteAccountAction>(
    "DELETE_ACCOUNT",
    { ...input },
    undefined,
    DeleteAccountInputSchema,
    "global",
  );

export const updateKycStatus = (input: UpdateKycStatusInput) =>
  createAction<UpdateKycStatusAction>(
    "UPDATE_KYC_STATUS",
    { ...input },
    undefined,
    UpdateKycStatusInputSchema,
    "global",
  );
