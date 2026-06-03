/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  ActivateInstanceInputSchema,
  ConfirmInstanceInputSchema,
  InitializeInstanceInputSchema,
  ReportProvisioningCompletedInputSchema,
  ReportProvisioningFailedInputSchema,
  ReportProvisioningStartedInputSchema,
  ResumeAfterMaintenanceInputSchema,
  ResumeAfterPaymentInputSchema,
  SetOperatorProfileInputSchema,
  SuspendForMaintenanceInputSchema,
  SuspendForNonPaymentInputSchema,
  SuspendInstanceInputSchema,
  TerminateInstanceInputSchema,
  UpdateInstanceInfoInputSchema,
  UpdateInstanceStatusInputSchema,
} from "../schema/zod.js";
import type {
  ActivateInstanceInput,
  ConfirmInstanceInput,
  InitializeInstanceInput,
  ReportProvisioningCompletedInput,
  ReportProvisioningFailedInput,
  ReportProvisioningStartedInput,
  ResumeAfterMaintenanceInput,
  ResumeAfterPaymentInput,
  SetOperatorProfileInput,
  SuspendForMaintenanceInput,
  SuspendForNonPaymentInput,
  SuspendInstanceInput,
  TerminateInstanceInput,
  UpdateInstanceInfoInput,
  UpdateInstanceStatusInput,
} from "../types.js";
import type {
  ActivateInstanceAction,
  ConfirmInstanceAction,
  InitializeInstanceAction,
  ReportProvisioningCompletedAction,
  ReportProvisioningFailedAction,
  ReportProvisioningStartedAction,
  ResumeAfterMaintenanceAction,
  ResumeAfterPaymentAction,
  SetOperatorProfileAction,
  SuspendForMaintenanceAction,
  SuspendForNonPaymentAction,
  SuspendInstanceAction,
  TerminateInstanceAction,
  UpdateInstanceInfoAction,
  UpdateInstanceStatusAction,
} from "./actions.js";

export const initializeInstance = (input: InitializeInstanceInput) =>
  createAction<InitializeInstanceAction>(
    "INITIALIZE_INSTANCE",
    { ...input },
    undefined,
    InitializeInstanceInputSchema,
    "global",
  );

export const updateInstanceInfo = (input: UpdateInstanceInfoInput) =>
  createAction<UpdateInstanceInfoAction>(
    "UPDATE_INSTANCE_INFO",
    { ...input },
    undefined,
    UpdateInstanceInfoInputSchema,
    "global",
  );

export const setOperatorProfile = (input: SetOperatorProfileInput) =>
  createAction<SetOperatorProfileAction>(
    "SET_OPERATOR_PROFILE",
    { ...input },
    undefined,
    SetOperatorProfileInputSchema,
    "global",
  );

export const updateInstanceStatus = (input: UpdateInstanceStatusInput) =>
  createAction<UpdateInstanceStatusAction>(
    "UPDATE_INSTANCE_STATUS",
    { ...input },
    undefined,
    UpdateInstanceStatusInputSchema,
    "global",
  );

export const confirmInstance = (input: ConfirmInstanceInput) =>
  createAction<ConfirmInstanceAction>(
    "CONFIRM_INSTANCE",
    { ...input },
    undefined,
    ConfirmInstanceInputSchema,
    "global",
  );

export const reportProvisioningStarted = (
  input: ReportProvisioningStartedInput,
) =>
  createAction<ReportProvisioningStartedAction>(
    "REPORT_PROVISIONING_STARTED",
    { ...input },
    undefined,
    ReportProvisioningStartedInputSchema,
    "global",
  );

export const reportProvisioningCompleted = (
  input: ReportProvisioningCompletedInput,
) =>
  createAction<ReportProvisioningCompletedAction>(
    "REPORT_PROVISIONING_COMPLETED",
    { ...input },
    undefined,
    ReportProvisioningCompletedInputSchema,
    "global",
  );

export const reportProvisioningFailed = (
  input: ReportProvisioningFailedInput,
) =>
  createAction<ReportProvisioningFailedAction>(
    "REPORT_PROVISIONING_FAILED",
    { ...input },
    undefined,
    ReportProvisioningFailedInputSchema,
    "global",
  );

export const activateInstance = (input: ActivateInstanceInput) =>
  createAction<ActivateInstanceAction>(
    "ACTIVATE_INSTANCE",
    { ...input },
    undefined,
    ActivateInstanceInputSchema,
    "global",
  );

export const suspendForNonPayment = (input: SuspendForNonPaymentInput) =>
  createAction<SuspendForNonPaymentAction>(
    "SUSPEND_FOR_NON_PAYMENT",
    { ...input },
    undefined,
    SuspendForNonPaymentInputSchema,
    "global",
  );

export const suspendForMaintenance = (input: SuspendForMaintenanceInput) =>
  createAction<SuspendForMaintenanceAction>(
    "SUSPEND_FOR_MAINTENANCE",
    { ...input },
    undefined,
    SuspendForMaintenanceInputSchema,
    "global",
  );

export const resumeAfterPayment = (input: ResumeAfterPaymentInput) =>
  createAction<ResumeAfterPaymentAction>(
    "RESUME_AFTER_PAYMENT",
    { ...input },
    undefined,
    ResumeAfterPaymentInputSchema,
    "global",
  );

export const resumeAfterMaintenance = (input: ResumeAfterMaintenanceInput) =>
  createAction<ResumeAfterMaintenanceAction>(
    "RESUME_AFTER_MAINTENANCE",
    { ...input },
    undefined,
    ResumeAfterMaintenanceInputSchema,
    "global",
  );

export const suspendInstance = (input: SuspendInstanceInput) =>
  createAction<SuspendInstanceAction>(
    "SUSPEND_INSTANCE",
    { ...input },
    undefined,
    SuspendInstanceInputSchema,
    "global",
  );

export const terminateInstance = (input: TerminateInstanceInput) =>
  createAction<TerminateInstanceAction>(
    "TERMINATE_INSTANCE",
    { ...input },
    undefined,
    TerminateInstanceInputSchema,
    "global",
  );
