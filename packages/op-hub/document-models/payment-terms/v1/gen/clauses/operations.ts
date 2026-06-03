/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { PaymentTermsGlobalState } from "../types.js";
import type {
  AddBonusClauseAction,
  AddPenaltyClauseAction,
  DeleteBonusClauseAction,
  DeletePenaltyClauseAction,
  UpdateBonusClauseAction,
  UpdatePenaltyClauseAction,
} from "./actions.js";

export interface PaymentTermsClausesOperations {
  addBonusClauseOperation: (
    state: PaymentTermsGlobalState,
    action: AddBonusClauseAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateBonusClauseOperation: (
    state: PaymentTermsGlobalState,
    action: UpdateBonusClauseAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteBonusClauseOperation: (
    state: PaymentTermsGlobalState,
    action: DeleteBonusClauseAction,
    dispatch?: SignalDispatch,
  ) => void;
  addPenaltyClauseOperation: (
    state: PaymentTermsGlobalState,
    action: AddPenaltyClauseAction,
    dispatch?: SignalDispatch,
  ) => void;
  updatePenaltyClauseOperation: (
    state: PaymentTermsGlobalState,
    action: UpdatePenaltyClauseAction,
    dispatch?: SignalDispatch,
  ) => void;
  deletePenaltyClauseOperation: (
    state: PaymentTermsGlobalState,
    action: DeletePenaltyClauseAction,
    dispatch?: SignalDispatch,
  ) => void;
}
