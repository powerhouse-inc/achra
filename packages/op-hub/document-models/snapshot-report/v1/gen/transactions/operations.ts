/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SnapshotReportGlobalState } from "../types.js";
import type {
  AddTransactionAction,
  RecalculateFlowTypesAction,
  RemoveTransactionAction,
  UpdateTransactionFlowTypeAction,
} from "./actions.js";

export interface SnapshotReportTransactionsOperations {
  addTransactionOperation: (
    state: SnapshotReportGlobalState,
    action: AddTransactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTransactionOperation: (
    state: SnapshotReportGlobalState,
    action: RemoveTransactionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTransactionFlowTypeOperation: (
    state: SnapshotReportGlobalState,
    action: UpdateTransactionFlowTypeAction,
    dispatch?: SignalDispatch,
  ) => void;
  recalculateFlowTypesOperation: (
    state: SnapshotReportGlobalState,
    action: RecalculateFlowTypesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
