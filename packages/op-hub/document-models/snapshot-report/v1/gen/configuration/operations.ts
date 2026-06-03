/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SnapshotReportGlobalState } from "../types.js";
import type {
  AddOwnerIdAction,
  RemoveOwnerIdAction,
  SetAccountsDocumentAction,
  SetPeriodAction,
  SetPeriodEndAction,
  SetPeriodStartAction,
  SetReportConfigAction,
} from "./actions.js";

export interface SnapshotReportConfigurationOperations {
  setReportConfigOperation: (
    state: SnapshotReportGlobalState,
    action: SetReportConfigAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAccountsDocumentOperation: (
    state: SnapshotReportGlobalState,
    action: SetAccountsDocumentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPeriodOperation: (
    state: SnapshotReportGlobalState,
    action: SetPeriodAction,
    dispatch?: SignalDispatch,
  ) => void;
  addOwnerIdOperation: (
    state: SnapshotReportGlobalState,
    action: AddOwnerIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPeriodStartOperation: (
    state: SnapshotReportGlobalState,
    action: SetPeriodStartAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPeriodEndOperation: (
    state: SnapshotReportGlobalState,
    action: SetPeriodEndAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeOwnerIdOperation: (
    state: SnapshotReportGlobalState,
    action: RemoveOwnerIdAction,
    dispatch?: SignalDispatch,
  ) => void;
}
