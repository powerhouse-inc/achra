/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SnapshotReportGlobalState } from "../types.js";
import type {
  RemoveEndingBalanceAction,
  RemoveStartingBalanceAction,
  SetEndingBalanceAction,
  SetStartingBalanceAction,
} from "./actions.js";

export interface SnapshotReportBalancesOperations {
  setStartingBalanceOperation: (
    state: SnapshotReportGlobalState,
    action: SetStartingBalanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setEndingBalanceOperation: (
    state: SnapshotReportGlobalState,
    action: SetEndingBalanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeStartingBalanceOperation: (
    state: SnapshotReportGlobalState,
    action: RemoveStartingBalanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeEndingBalanceOperation: (
    state: SnapshotReportGlobalState,
    action: RemoveEndingBalanceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
