/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddOwnerIdInputSchema,
  RemoveOwnerIdInputSchema,
  SetAccountsDocumentInputSchema,
  SetPeriodEndInputSchema,
  SetPeriodInputSchema,
  SetPeriodStartInputSchema,
  SetReportConfigInputSchema,
} from "../schema/zod.js";
import type {
  AddOwnerIdInput,
  RemoveOwnerIdInput,
  SetAccountsDocumentInput,
  SetPeriodEndInput,
  SetPeriodInput,
  SetPeriodStartInput,
  SetReportConfigInput,
} from "../types.js";
import type {
  AddOwnerIdAction,
  RemoveOwnerIdAction,
  SetAccountsDocumentAction,
  SetPeriodAction,
  SetPeriodEndAction,
  SetPeriodStartAction,
  SetReportConfigAction,
} from "./actions.js";

export const setReportConfig = (input: SetReportConfigInput) =>
  createAction<SetReportConfigAction>(
    "SET_REPORT_CONFIG",
    { ...input },
    undefined,
    SetReportConfigInputSchema,
    "global",
  );

export const setAccountsDocument = (input: SetAccountsDocumentInput) =>
  createAction<SetAccountsDocumentAction>(
    "SET_ACCOUNTS_DOCUMENT",
    { ...input },
    undefined,
    SetAccountsDocumentInputSchema,
    "global",
  );

export const setPeriod = (input: SetPeriodInput) =>
  createAction<SetPeriodAction>(
    "SET_PERIOD",
    { ...input },
    undefined,
    SetPeriodInputSchema,
    "global",
  );

export const addOwnerId = (input: AddOwnerIdInput) =>
  createAction<AddOwnerIdAction>(
    "ADD_OWNER_ID",
    { ...input },
    undefined,
    AddOwnerIdInputSchema,
    "global",
  );

export const setPeriodStart = (input: SetPeriodStartInput) =>
  createAction<SetPeriodStartAction>(
    "SET_PERIOD_START",
    { ...input },
    undefined,
    SetPeriodStartInputSchema,
    "global",
  );

export const setPeriodEnd = (input: SetPeriodEndInput) =>
  createAction<SetPeriodEndAction>(
    "SET_PERIOD_END",
    { ...input },
    undefined,
    SetPeriodEndInputSchema,
    "global",
  );

export const removeOwnerId = (input: RemoveOwnerIdInput) =>
  createAction<RemoveOwnerIdAction>(
    "REMOVE_OWNER_ID",
    { ...input },
    undefined,
    RemoveOwnerIdInputSchema,
    "global",
  );
