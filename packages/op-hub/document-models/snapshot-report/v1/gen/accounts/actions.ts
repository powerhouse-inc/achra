/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  AddSnapshotAccountInput,
  RemoveSnapshotAccountInput,
  UpdateSnapshotAccountTypeInput,
} from "../types.js";

export type AddSnapshotAccountAction = Action & {
  type: "ADD_SNAPSHOT_ACCOUNT";
  input: AddSnapshotAccountInput;
};
export type UpdateSnapshotAccountTypeAction = Action & {
  type: "UPDATE_SNAPSHOT_ACCOUNT_TYPE";
  input: UpdateSnapshotAccountTypeInput;
};
export type RemoveSnapshotAccountAction = Action & {
  type: "REMOVE_SNAPSHOT_ACCOUNT";
  input: RemoveSnapshotAccountInput;
};

export type SnapshotReportAccountsAction =
  | AddSnapshotAccountAction
  | UpdateSnapshotAccountTypeAction
  | RemoveSnapshotAccountAction;
