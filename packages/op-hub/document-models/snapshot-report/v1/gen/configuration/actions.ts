/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddOwnerIdInput,
  RemoveOwnerIdInput,
  SetAccountsDocumentInput,
  SetPeriodEndInput,
  SetPeriodInput,
  SetPeriodStartInput,
  SetReportConfigInput,
} from "../types.js";

export type SetReportConfigAction = Action & {
  type: "SET_REPORT_CONFIG";
  input: SetReportConfigInput;
};
export type SetAccountsDocumentAction = Action & {
  type: "SET_ACCOUNTS_DOCUMENT";
  input: SetAccountsDocumentInput;
};
export type SetPeriodAction = Action & {
  type: "SET_PERIOD";
  input: SetPeriodInput;
};
export type AddOwnerIdAction = Action & {
  type: "ADD_OWNER_ID";
  input: AddOwnerIdInput;
};
export type SetPeriodStartAction = Action & {
  type: "SET_PERIOD_START";
  input: SetPeriodStartInput;
};
export type SetPeriodEndAction = Action & {
  type: "SET_PERIOD_END";
  input: SetPeriodEndInput;
};
export type RemoveOwnerIdAction = Action & {
  type: "REMOVE_OWNER_ID";
  input: RemoveOwnerIdInput;
};

export type SnapshotReportConfigurationAction =
  | SetReportConfigAction
  | SetAccountsDocumentAction
  | SetPeriodAction
  | AddOwnerIdAction
  | SetPeriodStartAction
  | SetPeriodEndAction
  | RemoveOwnerIdAction;
