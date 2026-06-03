/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { PaymentTermsGlobalState } from "../types.js";
import type {
  SetBasicTermsAction,
  SetCostAndMaterialsAction,
  SetEscrowDetailsAction,
  SetEvaluationTermsAction,
  SetRetainerDetailsAction,
  UpdateStatusAction,
} from "./actions.js";

export interface PaymentTermsTermsOperations {
  setBasicTermsOperation: (
    state: PaymentTermsGlobalState,
    action: SetBasicTermsAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateStatusOperation: (
    state: PaymentTermsGlobalState,
    action: UpdateStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  setCostAndMaterialsOperation: (
    state: PaymentTermsGlobalState,
    action: SetCostAndMaterialsAction,
    dispatch?: SignalDispatch,
  ) => void;
  setEscrowDetailsOperation: (
    state: PaymentTermsGlobalState,
    action: SetEscrowDetailsAction,
    dispatch?: SignalDispatch,
  ) => void;
  setEvaluationTermsOperation: (
    state: PaymentTermsGlobalState,
    action: SetEvaluationTermsAction,
    dispatch?: SignalDispatch,
  ) => void;
  setRetainerDetailsOperation: (
    state: PaymentTermsGlobalState,
    action: SetRetainerDetailsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
