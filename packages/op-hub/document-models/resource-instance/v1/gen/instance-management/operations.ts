/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceInstanceGlobalState } from "../types.js";
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

export interface ResourceInstanceInstanceManagementOperations {
  initializeInstanceOperation: (
    state: ResourceInstanceGlobalState,
    action: InitializeInstanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateInstanceInfoOperation: (
    state: ResourceInstanceGlobalState,
    action: UpdateInstanceInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOperatorProfileOperation: (
    state: ResourceInstanceGlobalState,
    action: SetOperatorProfileAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateInstanceStatusOperation: (
    state: ResourceInstanceGlobalState,
    action: UpdateInstanceStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  confirmInstanceOperation: (
    state: ResourceInstanceGlobalState,
    action: ConfirmInstanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  reportProvisioningStartedOperation: (
    state: ResourceInstanceGlobalState,
    action: ReportProvisioningStartedAction,
    dispatch?: SignalDispatch,
  ) => void;
  reportProvisioningCompletedOperation: (
    state: ResourceInstanceGlobalState,
    action: ReportProvisioningCompletedAction,
    dispatch?: SignalDispatch,
  ) => void;
  reportProvisioningFailedOperation: (
    state: ResourceInstanceGlobalState,
    action: ReportProvisioningFailedAction,
    dispatch?: SignalDispatch,
  ) => void;
  activateInstanceOperation: (
    state: ResourceInstanceGlobalState,
    action: ActivateInstanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  suspendForNonPaymentOperation: (
    state: ResourceInstanceGlobalState,
    action: SuspendForNonPaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  suspendForMaintenanceOperation: (
    state: ResourceInstanceGlobalState,
    action: SuspendForMaintenanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  resumeAfterPaymentOperation: (
    state: ResourceInstanceGlobalState,
    action: ResumeAfterPaymentAction,
    dispatch?: SignalDispatch,
  ) => void;
  resumeAfterMaintenanceOperation: (
    state: ResourceInstanceGlobalState,
    action: ResumeAfterMaintenanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  suspendInstanceOperation: (
    state: ResourceInstanceGlobalState,
    action: SuspendInstanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  terminateInstanceOperation: (
    state: ResourceInstanceGlobalState,
    action: TerminateInstanceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
