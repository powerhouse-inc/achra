/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  AddBillingStatementInputSchema,
  AddLineItemGroupInputSchema,
  AddLineItemInputSchema,
  AddWalletInputSchema,
  RemoveBillingStatementInputSchema,
  RemoveGroupTotalsInputSchema,
  RemoveLineItemGroupInputSchema,
  RemoveLineItemInputSchema,
  RemoveWalletInputSchema,
  SetGroupTotalsInputSchema,
  SetOwnerIdInputSchema,
  SetPeriodEndInputSchema,
  SetPeriodInputSchema,
  SetPeriodStartInputSchema,
  SetStatusInputSchema,
  UpdateLineItemGroupInputSchema,
  UpdateLineItemInputSchema,
  UpdateWalletInputSchema,
} from "../schema/zod.js";
import type {
  AddBillingStatementInput,
  AddLineItemGroupInput,
  AddLineItemInput,
  AddWalletInput,
  RemoveBillingStatementInput,
  RemoveGroupTotalsInput,
  RemoveLineItemGroupInput,
  RemoveLineItemInput,
  RemoveWalletInput,
  SetGroupTotalsInput,
  SetOwnerIdInput,
  SetPeriodEndInput,
  SetPeriodInput,
  SetPeriodStartInput,
  SetStatusInput,
  UpdateLineItemGroupInput,
  UpdateLineItemInput,
  UpdateWalletInput,
} from "../types.js";
import type {
  AddBillingStatementAction,
  AddLineItemAction,
  AddLineItemGroupAction,
  AddWalletAction,
  RemoveBillingStatementAction,
  RemoveGroupTotalsAction,
  RemoveLineItemAction,
  RemoveLineItemGroupAction,
  RemoveWalletAction,
  SetGroupTotalsAction,
  SetOwnerIdAction,
  SetPeriodAction,
  SetPeriodEndAction,
  SetPeriodStartAction,
  SetStatusAction,
  UpdateLineItemAction,
  UpdateLineItemGroupAction,
  UpdateWalletAction,
} from "./actions.js";

export const addWallet = (input: AddWalletInput) =>
  createAction<AddWalletAction>(
    "ADD_WALLET",
    { ...input },
    undefined,
    AddWalletInputSchema,
    "global",
  );

export const removeWallet = (input: RemoveWalletInput) =>
  createAction<RemoveWalletAction>(
    "REMOVE_WALLET",
    { ...input },
    undefined,
    RemoveWalletInputSchema,
    "global",
  );

export const addBillingStatement = (input: AddBillingStatementInput) =>
  createAction<AddBillingStatementAction>(
    "ADD_BILLING_STATEMENT",
    { ...input },
    undefined,
    AddBillingStatementInputSchema,
    "global",
  );

export const removeBillingStatement = (input: RemoveBillingStatementInput) =>
  createAction<RemoveBillingStatementAction>(
    "REMOVE_BILLING_STATEMENT",
    { ...input },
    undefined,
    RemoveBillingStatementInputSchema,
    "global",
  );

export const addLineItem = (input: AddLineItemInput) =>
  createAction<AddLineItemAction>(
    "ADD_LINE_ITEM",
    { ...input },
    undefined,
    AddLineItemInputSchema,
    "global",
  );

export const updateLineItem = (input: UpdateLineItemInput) =>
  createAction<UpdateLineItemAction>(
    "UPDATE_LINE_ITEM",
    { ...input },
    undefined,
    UpdateLineItemInputSchema,
    "global",
  );

export const removeLineItem = (input: RemoveLineItemInput) =>
  createAction<RemoveLineItemAction>(
    "REMOVE_LINE_ITEM",
    { ...input },
    undefined,
    RemoveLineItemInputSchema,
    "global",
  );

export const addLineItemGroup = (input: AddLineItemGroupInput) =>
  createAction<AddLineItemGroupAction>(
    "ADD_LINE_ITEM_GROUP",
    { ...input },
    undefined,
    AddLineItemGroupInputSchema,
    "global",
  );

export const updateLineItemGroup = (input: UpdateLineItemGroupInput) =>
  createAction<UpdateLineItemGroupAction>(
    "UPDATE_LINE_ITEM_GROUP",
    { ...input },
    undefined,
    UpdateLineItemGroupInputSchema,
    "global",
  );

export const removeLineItemGroup = (input: RemoveLineItemGroupInput) =>
  createAction<RemoveLineItemGroupAction>(
    "REMOVE_LINE_ITEM_GROUP",
    { ...input },
    undefined,
    RemoveLineItemGroupInputSchema,
    "global",
  );

export const setGroupTotals = (input: SetGroupTotalsInput) =>
  createAction<SetGroupTotalsAction>(
    "SET_GROUP_TOTALS",
    { ...input },
    undefined,
    SetGroupTotalsInputSchema,
    "global",
  );

export const removeGroupTotals = (input: RemoveGroupTotalsInput) =>
  createAction<RemoveGroupTotalsAction>(
    "REMOVE_GROUP_TOTALS",
    { ...input },
    undefined,
    RemoveGroupTotalsInputSchema,
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

export const updateWallet = (input: UpdateWalletInput) =>
  createAction<UpdateWalletAction>(
    "UPDATE_WALLET",
    { ...input },
    undefined,
    UpdateWalletInputSchema,
    "global",
  );

export const setOwnerId = (input: SetOwnerIdInput) =>
  createAction<SetOwnerIdAction>(
    "SET_OWNER_ID",
    { ...input },
    undefined,
    SetOwnerIdInputSchema,
    "global",
  );

export const setStatus = (input: SetStatusInput) =>
  createAction<SetStatusAction>(
    "SET_STATUS",
    { ...input },
    undefined,
    SetStatusInputSchema,
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
