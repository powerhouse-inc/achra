/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BillingStatementGlobalState } from "../types.js";
import type {
  EditBillingStatementAction,
  EditContributorAction,
  EditStatusAction,
} from "./actions.js";

export interface BillingStatementGeneralOperations {
  editBillingStatementOperation: (
    state: BillingStatementGlobalState,
    action: EditBillingStatementAction,
    dispatch?: SignalDispatch,
  ) => void;
  editContributorOperation: (
    state: BillingStatementGlobalState,
    action: EditContributorAction,
    dispatch?: SignalDispatch,
  ) => void;
  editStatusOperation: (
    state: BillingStatementGlobalState,
    action: EditStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
}
