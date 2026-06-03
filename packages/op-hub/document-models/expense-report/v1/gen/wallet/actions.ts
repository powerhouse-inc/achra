/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
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

export type AddWalletAction = Action & {
  type: "ADD_WALLET";
  input: AddWalletInput;
};
export type RemoveWalletAction = Action & {
  type: "REMOVE_WALLET";
  input: RemoveWalletInput;
};
export type AddBillingStatementAction = Action & {
  type: "ADD_BILLING_STATEMENT";
  input: AddBillingStatementInput;
};
export type RemoveBillingStatementAction = Action & {
  type: "REMOVE_BILLING_STATEMENT";
  input: RemoveBillingStatementInput;
};
export type AddLineItemAction = Action & {
  type: "ADD_LINE_ITEM";
  input: AddLineItemInput;
};
export type UpdateLineItemAction = Action & {
  type: "UPDATE_LINE_ITEM";
  input: UpdateLineItemInput;
};
export type RemoveLineItemAction = Action & {
  type: "REMOVE_LINE_ITEM";
  input: RemoveLineItemInput;
};
export type AddLineItemGroupAction = Action & {
  type: "ADD_LINE_ITEM_GROUP";
  input: AddLineItemGroupInput;
};
export type UpdateLineItemGroupAction = Action & {
  type: "UPDATE_LINE_ITEM_GROUP";
  input: UpdateLineItemGroupInput;
};
export type RemoveLineItemGroupAction = Action & {
  type: "REMOVE_LINE_ITEM_GROUP";
  input: RemoveLineItemGroupInput;
};
export type SetGroupTotalsAction = Action & {
  type: "SET_GROUP_TOTALS";
  input: SetGroupTotalsInput;
};
export type RemoveGroupTotalsAction = Action & {
  type: "REMOVE_GROUP_TOTALS";
  input: RemoveGroupTotalsInput;
};
export type SetPeriodStartAction = Action & {
  type: "SET_PERIOD_START";
  input: SetPeriodStartInput;
};
export type SetPeriodEndAction = Action & {
  type: "SET_PERIOD_END";
  input: SetPeriodEndInput;
};
export type UpdateWalletAction = Action & {
  type: "UPDATE_WALLET";
  input: UpdateWalletInput;
};
export type SetOwnerIdAction = Action & {
  type: "SET_OWNER_ID";
  input: SetOwnerIdInput;
};
export type SetStatusAction = Action & {
  type: "SET_STATUS";
  input: SetStatusInput;
};
export type SetPeriodAction = Action & {
  type: "SET_PERIOD";
  input: SetPeriodInput;
};

export type ExpenseReportWalletAction =
  | AddWalletAction
  | RemoveWalletAction
  | AddBillingStatementAction
  | RemoveBillingStatementAction
  | AddLineItemAction
  | UpdateLineItemAction
  | RemoveLineItemAction
  | AddLineItemGroupAction
  | UpdateLineItemGroupAction
  | RemoveLineItemGroupAction
  | SetGroupTotalsAction
  | RemoveGroupTotalsAction
  | SetPeriodStartAction
  | SetPeriodEndAction
  | UpdateWalletAction
  | SetOwnerIdAction
  | SetStatusAction
  | SetPeriodAction;
