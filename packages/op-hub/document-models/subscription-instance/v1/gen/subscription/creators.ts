/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  ActivateSubscriptionInputSchema,
  CancelSubscriptionInputSchema,
  ChangePlanInputSchema,
  GenerateInvoiceInputSchema,
  InitializeSubscriptionInputSchema,
  PauseSubscriptionInputSchema,
  RenewExpiringSubscriptionInputSchema,
  ResumeSubscriptionInputSchema,
  SetAutoRenewInputSchema,
  SetExpiringInputSchema,
  SetOperatorNotesInputSchema,
  SetResourceDocumentInputSchema,
  UpdateCustomerInfoInputSchema,
  UpdateTierInfoInputSchema,
} from "../schema/zod.js";
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

export const initializeSubscription = (input: InitializeSubscriptionInput) =>
  createAction<InitializeSubscriptionAction>(
    "INITIALIZE_SUBSCRIPTION",
    { ...input },
    undefined,
    InitializeSubscriptionInputSchema,
    "global",
  );

export const setResourceDocument = (input: SetResourceDocumentInput) =>
  createAction<SetResourceDocumentAction>(
    "SET_RESOURCE_DOCUMENT",
    { ...input },
    undefined,
    SetResourceDocumentInputSchema,
    "global",
  );

export const activateSubscription = (input: ActivateSubscriptionInput) =>
  createAction<ActivateSubscriptionAction>(
    "ACTIVATE_SUBSCRIPTION",
    { ...input },
    undefined,
    ActivateSubscriptionInputSchema,
    "global",
  );

export const pauseSubscription = (input: PauseSubscriptionInput) =>
  createAction<PauseSubscriptionAction>(
    "PAUSE_SUBSCRIPTION",
    { ...input },
    undefined,
    PauseSubscriptionInputSchema,
    "global",
  );

export const setExpiring = (input: SetExpiringInput) =>
  createAction<SetExpiringAction>(
    "SET_EXPIRING",
    { ...input },
    undefined,
    SetExpiringInputSchema,
    "global",
  );

export const cancelSubscription = (input: CancelSubscriptionInput) =>
  createAction<CancelSubscriptionAction>(
    "CANCEL_SUBSCRIPTION",
    { ...input },
    undefined,
    CancelSubscriptionInputSchema,
    "global",
  );

export const resumeSubscription = (input: ResumeSubscriptionInput) =>
  createAction<ResumeSubscriptionAction>(
    "RESUME_SUBSCRIPTION",
    { ...input },
    undefined,
    ResumeSubscriptionInputSchema,
    "global",
  );

export const renewExpiringSubscription = (
  input: RenewExpiringSubscriptionInput,
) =>
  createAction<RenewExpiringSubscriptionAction>(
    "RENEW_EXPIRING_SUBSCRIPTION",
    { ...input },
    undefined,
    RenewExpiringSubscriptionInputSchema,
    "global",
  );

export const updateCustomerInfo = (input: UpdateCustomerInfoInput) =>
  createAction<UpdateCustomerInfoAction>(
    "UPDATE_CUSTOMER_INFO",
    { ...input },
    undefined,
    UpdateCustomerInfoInputSchema,
    "global",
  );

export const updateTierInfo = (input: UpdateTierInfoInput) =>
  createAction<UpdateTierInfoAction>(
    "UPDATE_TIER_INFO",
    { ...input },
    undefined,
    UpdateTierInfoInputSchema,
    "global",
  );

export const setOperatorNotes = (input: SetOperatorNotesInput) =>
  createAction<SetOperatorNotesAction>(
    "SET_OPERATOR_NOTES",
    { ...input },
    undefined,
    SetOperatorNotesInputSchema,
    "global",
  );

export const setAutoRenew = (input: SetAutoRenewInput) =>
  createAction<SetAutoRenewAction>(
    "SET_AUTO_RENEW",
    { ...input },
    undefined,
    SetAutoRenewInputSchema,
    "global",
  );

export const changePlan = (input: ChangePlanInput) =>
  createAction<ChangePlanAction>(
    "CHANGE_PLAN",
    { ...input },
    undefined,
    ChangePlanInputSchema,
    "global",
  );

export const generateInvoice = (input: GenerateInvoiceInput) =>
  createAction<GenerateInvoiceAction>(
    "GENERATE_INVOICE",
    { ...input },
    undefined,
    GenerateInvoiceInputSchema,
    "global",
  );
