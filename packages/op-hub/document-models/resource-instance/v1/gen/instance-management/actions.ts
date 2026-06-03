/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
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

export type InitializeInstanceAction = Action & {
  type: "INITIALIZE_INSTANCE";
  input: InitializeInstanceInput;
};
export type UpdateInstanceInfoAction = Action & {
  type: "UPDATE_INSTANCE_INFO";
  input: UpdateInstanceInfoInput;
};
export type SetOperatorProfileAction = Action & {
  type: "SET_OPERATOR_PROFILE";
  input: SetOperatorProfileInput;
};
export type UpdateInstanceStatusAction = Action & {
  type: "UPDATE_INSTANCE_STATUS";
  input: UpdateInstanceStatusInput;
};
export type ConfirmInstanceAction = Action & {
  type: "CONFIRM_INSTANCE";
  input: ConfirmInstanceInput;
};
export type ReportProvisioningStartedAction = Action & {
  type: "REPORT_PROVISIONING_STARTED";
  input: ReportProvisioningStartedInput;
};
export type ReportProvisioningCompletedAction = Action & {
  type: "REPORT_PROVISIONING_COMPLETED";
  input: ReportProvisioningCompletedInput;
};
export type ReportProvisioningFailedAction = Action & {
  type: "REPORT_PROVISIONING_FAILED";
  input: ReportProvisioningFailedInput;
};
export type ActivateInstanceAction = Action & {
  type: "ACTIVATE_INSTANCE";
  input: ActivateInstanceInput;
};
export type SuspendForNonPaymentAction = Action & {
  type: "SUSPEND_FOR_NON_PAYMENT";
  input: SuspendForNonPaymentInput;
};
export type SuspendForMaintenanceAction = Action & {
  type: "SUSPEND_FOR_MAINTENANCE";
  input: SuspendForMaintenanceInput;
};
export type ResumeAfterPaymentAction = Action & {
  type: "RESUME_AFTER_PAYMENT";
  input: ResumeAfterPaymentInput;
};
export type ResumeAfterMaintenanceAction = Action & {
  type: "RESUME_AFTER_MAINTENANCE";
  input: ResumeAfterMaintenanceInput;
};
export type SuspendInstanceAction = Action & {
  type: "SUSPEND_INSTANCE";
  input: SuspendInstanceInput;
};
export type TerminateInstanceAction = Action & {
  type: "TERMINATE_INSTANCE";
  input: TerminateInstanceInput;
};

export type ResourceInstanceInstanceManagementAction =
  | InitializeInstanceAction
  | UpdateInstanceInfoAction
  | SetOperatorProfileAction
  | UpdateInstanceStatusAction
  | ConfirmInstanceAction
  | ReportProvisioningStartedAction
  | ReportProvisioningCompletedAction
  | ReportProvisioningFailedAction
  | ActivateInstanceAction
  | SuspendForNonPaymentAction
  | SuspendForMaintenanceAction
  | ResumeAfterPaymentAction
  | ResumeAfterMaintenanceAction
  | SuspendInstanceAction
  | TerminateInstanceAction;
