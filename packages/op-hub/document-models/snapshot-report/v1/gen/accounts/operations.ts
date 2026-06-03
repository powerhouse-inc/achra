/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SnapshotReportGlobalState } from "../types.js";
import type {
  AddSnapshotAccountAction,
  RemoveSnapshotAccountAction,
  UpdateSnapshotAccountTypeAction,
} from "./actions.js";

export interface SnapshotReportAccountsOperations {
  addSnapshotAccountOperation: (
    state: SnapshotReportGlobalState,
    action: AddSnapshotAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateSnapshotAccountTypeOperation: (
    state: SnapshotReportGlobalState,
    action: UpdateSnapshotAccountTypeAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeSnapshotAccountOperation: (
    state: SnapshotReportGlobalState,
    action: RemoveSnapshotAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
}
