/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Reducer, StateReducer } from "document-model";
import { createReducer, isDocumentAction } from "document-model";
import type { ResourceInstancePHState } from "document-models/resource-instance/v1";

import { resourceInstanceConfigurationManagementOperations } from "../src/reducers/configuration-management.js";
import { resourceInstanceInstanceManagementOperations } from "../src/reducers/instance-management.js";

import {
  ActivateInstanceInputSchema,
  ApplyConfigurationChangesInputSchema,
  ConfirmInstanceInputSchema,
  InitializeInstanceInputSchema,
  RemoveInstanceFacetInputSchema,
  ReportProvisioningCompletedInputSchema,
  ReportProvisioningFailedInputSchema,
  ReportProvisioningStartedInputSchema,
  ResumeAfterMaintenanceInputSchema,
  ResumeAfterPaymentInputSchema,
  SetInstanceFacetInputSchema,
  SetOperatorProfileInputSchema,
  SuspendForMaintenanceInputSchema,
  SuspendForNonPaymentInputSchema,
  SuspendInstanceInputSchema,
  TerminateInstanceInputSchema,
  UpdateInstanceFacetInputSchema,
  UpdateInstanceInfoInputSchema,
  UpdateInstanceStatusInputSchema,
} from "./schema/zod.js";

const stateReducer: StateReducer<ResourceInstancePHState> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }
  switch (action.type) {
    case "INITIALIZE_INSTANCE": {
      InitializeInstanceInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.initializeInstanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_INSTANCE_INFO": {
      UpdateInstanceInfoInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.updateInstanceInfoOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_OPERATOR_PROFILE": {
      SetOperatorProfileInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.setOperatorProfileOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_INSTANCE_STATUS": {
      UpdateInstanceStatusInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.updateInstanceStatusOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "CONFIRM_INSTANCE": {
      ConfirmInstanceInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.confirmInstanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_PROVISIONING_STARTED": {
      ReportProvisioningStartedInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.reportProvisioningStartedOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_PROVISIONING_COMPLETED": {
      ReportProvisioningCompletedInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.reportProvisioningCompletedOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REPORT_PROVISIONING_FAILED": {
      ReportProvisioningFailedInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.reportProvisioningFailedOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "ACTIVATE_INSTANCE": {
      ActivateInstanceInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.activateInstanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SUSPEND_FOR_NON_PAYMENT": {
      SuspendForNonPaymentInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.suspendForNonPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SUSPEND_FOR_MAINTENANCE": {
      SuspendForMaintenanceInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.suspendForMaintenanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RESUME_AFTER_PAYMENT": {
      ResumeAfterPaymentInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.resumeAfterPaymentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "RESUME_AFTER_MAINTENANCE": {
      ResumeAfterMaintenanceInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.resumeAfterMaintenanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SUSPEND_INSTANCE": {
      SuspendInstanceInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.suspendInstanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "TERMINATE_INSTANCE": {
      TerminateInstanceInputSchema().parse(action.input);

      resourceInstanceInstanceManagementOperations.terminateInstanceOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "SET_INSTANCE_FACET": {
      SetInstanceFacetInputSchema().parse(action.input);

      resourceInstanceConfigurationManagementOperations.setInstanceFacetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "REMOVE_INSTANCE_FACET": {
      RemoveInstanceFacetInputSchema().parse(action.input);

      resourceInstanceConfigurationManagementOperations.removeInstanceFacetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "UPDATE_INSTANCE_FACET": {
      UpdateInstanceFacetInputSchema().parse(action.input);

      resourceInstanceConfigurationManagementOperations.updateInstanceFacetOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    case "APPLY_CONFIGURATION_CHANGES": {
      ApplyConfigurationChangesInputSchema().parse(action.input);

      resourceInstanceConfigurationManagementOperations.applyConfigurationChangesOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );

      break;
    }

    default:
      return state;
  }
};

export const reducer: Reducer<ResourceInstancePHState> =
  createReducer(stateReducer);
