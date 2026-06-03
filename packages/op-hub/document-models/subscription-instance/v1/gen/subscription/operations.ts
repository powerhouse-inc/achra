/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { SubscriptionInstanceGlobalState } from "../types.js";
import type {
  ActivateSubscriptionAction,
  CancelSubscriptionAction,
  ChangePlanAction,
  GenerateInvoiceAction,
  InitializeSubscriptionAction,
  PauseSubscriptionAction,
  RenewExpiringSubscriptionAction,
  ResumeSubscriptionAction,
  SetAutoRenewAction,
  SetExpiringAction,
  SetOperatorNotesAction,
  SetResourceDocumentAction,
  UpdateCustomerInfoAction,
  UpdateTierInfoAction,
} from "./actions.js";

export interface SubscriptionInstanceSubscriptionOperations {
  initializeSubscriptionOperation: (
    state: SubscriptionInstanceGlobalState,
    action: InitializeSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  setResourceDocumentOperation: (
    state: SubscriptionInstanceGlobalState,
    action: SetResourceDocumentAction,
    dispatch?: SignalDispatch,
  ) => void;
  activateSubscriptionOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ActivateSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  pauseSubscriptionOperation: (
    state: SubscriptionInstanceGlobalState,
    action: PauseSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  setExpiringOperation: (
    state: SubscriptionInstanceGlobalState,
    action: SetExpiringAction,
    dispatch?: SignalDispatch,
  ) => void;
  cancelSubscriptionOperation: (
    state: SubscriptionInstanceGlobalState,
    action: CancelSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  resumeSubscriptionOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ResumeSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  renewExpiringSubscriptionOperation: (
    state: SubscriptionInstanceGlobalState,
    action: RenewExpiringSubscriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateCustomerInfoOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateCustomerInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTierInfoOperation: (
    state: SubscriptionInstanceGlobalState,
    action: UpdateTierInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOperatorNotesOperation: (
    state: SubscriptionInstanceGlobalState,
    action: SetOperatorNotesAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAutoRenewOperation: (
    state: SubscriptionInstanceGlobalState,
    action: SetAutoRenewAction,
    dispatch?: SignalDispatch,
  ) => void;
  changePlanOperation: (
    state: SubscriptionInstanceGlobalState,
    action: ChangePlanAction,
    dispatch?: SignalDispatch,
  ) => void;
  generateInvoiceOperation: (
    state: SubscriptionInstanceGlobalState,
    action: GenerateInvoiceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
