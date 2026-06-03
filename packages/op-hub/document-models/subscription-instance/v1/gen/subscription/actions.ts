/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  ActivateSubscriptionInput,
  CancelSubscriptionInput,
  ChangePlanInput,
  GenerateInvoiceInput,
  InitializeSubscriptionInput,
  PauseSubscriptionInput,
  RenewExpiringSubscriptionInput,
  ResumeSubscriptionInput,
  SetAutoRenewInput,
  SetExpiringInput,
  SetOperatorNotesInput,
  SetResourceDocumentInput,
  UpdateCustomerInfoInput,
  UpdateTierInfoInput,
} from "../types.js";

export type InitializeSubscriptionAction = Action & {
  type: "INITIALIZE_SUBSCRIPTION";
  input: InitializeSubscriptionInput;
};
export type SetResourceDocumentAction = Action & {
  type: "SET_RESOURCE_DOCUMENT";
  input: SetResourceDocumentInput;
};
export type ActivateSubscriptionAction = Action & {
  type: "ACTIVATE_SUBSCRIPTION";
  input: ActivateSubscriptionInput;
};
export type PauseSubscriptionAction = Action & {
  type: "PAUSE_SUBSCRIPTION";
  input: PauseSubscriptionInput;
};
export type SetExpiringAction = Action & {
  type: "SET_EXPIRING";
  input: SetExpiringInput;
};
export type CancelSubscriptionAction = Action & {
  type: "CANCEL_SUBSCRIPTION";
  input: CancelSubscriptionInput;
};
export type ResumeSubscriptionAction = Action & {
  type: "RESUME_SUBSCRIPTION";
  input: ResumeSubscriptionInput;
};
export type RenewExpiringSubscriptionAction = Action & {
  type: "RENEW_EXPIRING_SUBSCRIPTION";
  input: RenewExpiringSubscriptionInput;
};
export type UpdateCustomerInfoAction = Action & {
  type: "UPDATE_CUSTOMER_INFO";
  input: UpdateCustomerInfoInput;
};
export type UpdateTierInfoAction = Action & {
  type: "UPDATE_TIER_INFO";
  input: UpdateTierInfoInput;
};
export type SetOperatorNotesAction = Action & {
  type: "SET_OPERATOR_NOTES";
  input: SetOperatorNotesInput;
};
export type SetAutoRenewAction = Action & {
  type: "SET_AUTO_RENEW";
  input: SetAutoRenewInput;
};
export type ChangePlanAction = Action & {
  type: "CHANGE_PLAN";
  input: ChangePlanInput;
};
export type GenerateInvoiceAction = Action & {
  type: "GENERATE_INVOICE";
  input: GenerateInvoiceInput;
};

export type SubscriptionInstanceSubscriptionAction =
  | InitializeSubscriptionAction
  | SetResourceDocumentAction
  | ActivateSubscriptionAction
  | PauseSubscriptionAction
  | SetExpiringAction
  | CancelSubscriptionAction
  | ResumeSubscriptionAction
  | RenewExpiringSubscriptionAction
  | UpdateCustomerInfoAction
  | UpdateTierInfoAction
  | SetOperatorNotesAction
  | SetAutoRenewAction
  | ChangePlanAction
  | GenerateInvoiceAction;
