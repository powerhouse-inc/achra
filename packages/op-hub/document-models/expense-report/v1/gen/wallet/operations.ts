/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ExpenseReportGlobalState } from "../types.js";
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

export interface ExpenseReportWalletOperations {
  addWalletOperation: (
    state: ExpenseReportGlobalState,
    action: AddWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeWalletOperation: (
    state: ExpenseReportGlobalState,
    action: RemoveWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
  addBillingStatementOperation: (
    state: ExpenseReportGlobalState,
    action: AddBillingStatementAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeBillingStatementOperation: (
    state: ExpenseReportGlobalState,
    action: RemoveBillingStatementAction,
    dispatch?: SignalDispatch,
  ) => void;
  addLineItemOperation: (
    state: ExpenseReportGlobalState,
    action: AddLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateLineItemOperation: (
    state: ExpenseReportGlobalState,
    action: UpdateLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeLineItemOperation: (
    state: ExpenseReportGlobalState,
    action: RemoveLineItemAction,
    dispatch?: SignalDispatch,
  ) => void;
  addLineItemGroupOperation: (
    state: ExpenseReportGlobalState,
    action: AddLineItemGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateLineItemGroupOperation: (
    state: ExpenseReportGlobalState,
    action: UpdateLineItemGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeLineItemGroupOperation: (
    state: ExpenseReportGlobalState,
    action: RemoveLineItemGroupAction,
    dispatch?: SignalDispatch,
  ) => void;
  setGroupTotalsOperation: (
    state: ExpenseReportGlobalState,
    action: SetGroupTotalsAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeGroupTotalsOperation: (
    state: ExpenseReportGlobalState,
    action: RemoveGroupTotalsAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPeriodStartOperation: (
    state: ExpenseReportGlobalState,
    action: SetPeriodStartAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPeriodEndOperation: (
    state: ExpenseReportGlobalState,
    action: SetPeriodEndAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateWalletOperation: (
    state: ExpenseReportGlobalState,
    action: UpdateWalletAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOwnerIdOperation: (
    state: ExpenseReportGlobalState,
    action: SetOwnerIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  setStatusOperation: (
    state: ExpenseReportGlobalState,
    action: SetStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  setPeriodOperation: (
    state: ExpenseReportGlobalState,
    action: SetPeriodAction,
    dispatch?: SignalDispatch,
  ) => void;
}
