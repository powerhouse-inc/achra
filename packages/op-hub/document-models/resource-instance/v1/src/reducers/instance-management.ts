import type { ResourceInstanceInstanceManagementOperations } from "document-models/resource-instance/v1";
import {
  AlreadyTerminatedError,
  InvalidStatusTransitionActivateInstanceError,
  InvalidStatusTransitionError,
  InvalidStatusTransitionReportProvisioningCompletedError,
  InvalidStatusTransitionReportProvisioningFailedError,
  InvalidStatusTransitionReportProvisioningStartedError,
  InvalidStatusTransitionResumeAfterMaintenanceError,
  InvalidStatusTransitionResumeAfterPaymentError,
  InvalidStatusTransitionSuspendForMaintenanceError,
  InvalidStatusTransitionSuspendForNonPaymentError,
  InvalidStatusTransitionSuspendInstanceError,
  InvalidSuspensionTypeError,
  InvalidSuspensionTypeResumeAfterMaintenanceError,
  ProvisioningNotCompletedError,
} from "../../gen/instance-management/error.js";

export const resourceInstanceInstanceManagementOperations: ResourceInstanceInstanceManagementOperations =
  {
    initializeInstanceOperation(state, action) {
      state.operatorProfile = {
        id: action.input.operatorId,
        operatorName: action.input.operatorName || null,
      };
      state.resourceTemplateId = action.input.resourceTemplateId || null;
      state.customerId = action.input.customerId || null;
      state.customerName = action.input.customerName || null;
      state.templateName = action.input.templateName || null;
      state.thumbnailUrl = action.input.thumbnailUrl || null;
      state.infoLink = action.input.infoLink || null;
      state.description = action.input.description || null;
      state.status = "DRAFT";
    },
    updateInstanceInfoOperation(state, action) {
      if (action.input.thumbnailUrl)
        state.thumbnailUrl = action.input.thumbnailUrl;
      if (action.input.infoLink) state.infoLink = action.input.infoLink;
      if (action.input.description)
        state.description = action.input.description;
    },
    setOperatorProfileOperation(state, action) {
      state.operatorProfile = {
        id: action.input.operatorId,
        operatorName: action.input.operatorName || null,
      };
    },
    updateInstanceStatusOperation(state, action) {
      state.status = action.input.status;
    },
    confirmInstanceOperation(state, action) {
      if (state.status !== "DRAFT") {
        throw new InvalidStatusTransitionError(
          "Can only confirm instances in DRAFT status",
        );
      }
      state.status = "PROVISIONING";
      state.confirmedAt = action.input.confirmedAt;
    },
    reportProvisioningStartedOperation(state, action) {
      if (state.status !== "PROVISIONING") {
        throw new InvalidStatusTransitionReportProvisioningStartedError(
          "Can only report provisioning started for instances in PROVISIONING status",
        );
      }
      state.provisioningStartedAt = action.input.startedAt;
    },
    reportProvisioningCompletedOperation(state, action) {
      if (state.status !== "PROVISIONING") {
        throw new InvalidStatusTransitionReportProvisioningCompletedError(
          "Can only report provisioning completed for instances in PROVISIONING status",
        );
      }
      state.provisioningCompletedAt = action.input.completedAt;
    },
    reportProvisioningFailedOperation(state, action) {
      if (state.status !== "PROVISIONING") {
        throw new InvalidStatusTransitionReportProvisioningFailedError(
          "Can only report provisioning failed for instances in PROVISIONING status",
        );
      }
      state.provisioningFailureReason = action.input.failureReason;
      state.status = "DRAFT";
    },
    activateInstanceOperation(state, action) {
      if (state.status !== "PROVISIONING") {
        throw new InvalidStatusTransitionActivateInstanceError(
          "Can only activate instances in PROVISIONING status",
        );
      }
      if (!state.provisioningCompletedAt) {
        throw new ProvisioningNotCompletedError(
          "Must report provisioning completed before activating",
        );
      }
      state.status = "ACTIVE";
      state.activatedAt = action.input.activatedAt;
    },
    suspendForNonPaymentOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new InvalidStatusTransitionSuspendForNonPaymentError(
          "Can only suspend ACTIVE instances",
        );
      }
      state.status = "SUSPENDED";
      state.suspendedAt = action.input.suspendedAt;
      state.suspensionType = "NON_PAYMENT";
      state.suspensionReason = "Non-payment";
      const details = [];
      if (action.input.outstandingAmount) {
        details.push(`Outstanding: ${action.input.outstandingAmount}`);
      }
      if (action.input.daysPastDue) {
        details.push(`Days past due: ${action.input.daysPastDue}`);
      }
      state.suspensionDetails = details.join(", ") || null;
    },
    suspendForMaintenanceOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new InvalidStatusTransitionSuspendForMaintenanceError(
          "Can only suspend ACTIVE instances",
        );
      }
      state.status = "SUSPENDED";
      state.suspendedAt = action.input.suspendedAt;
      state.suspensionType = "MAINTENANCE";
      state.suspensionReason = "Scheduled maintenance";
      const details = [];
      if (action.input.maintenanceType) {
        details.push(`Type: ${action.input.maintenanceType}`);
      }
      if (action.input.estimatedDuration) {
        details.push(`Duration: ${action.input.estimatedDuration}`);
      }
      state.suspensionDetails = details.join(", ") || null;
    },
    resumeAfterPaymentOperation(state, action) {
      if (state.status !== "SUSPENDED") {
        throw new InvalidStatusTransitionResumeAfterPaymentError(
          "Can only resume SUSPENDED instances",
        );
      }
      if (state.suspensionType !== "NON_PAYMENT") {
        throw new InvalidSuspensionTypeError(
          "This operation is for NON_PAYMENT suspensions only",
        );
      }
      state.status = "ACTIVE";
      state.resumedAt = action.input.resumedAt;
    },
    resumeAfterMaintenanceOperation(state, action) {
      if (state.status !== "SUSPENDED") {
        throw new InvalidStatusTransitionResumeAfterMaintenanceError(
          "Can only resume SUSPENDED instances",
        );
      }
      if (state.suspensionType !== "MAINTENANCE") {
        throw new InvalidSuspensionTypeResumeAfterMaintenanceError(
          "This operation is for MAINTENANCE suspensions only",
        );
      }
      state.status = "ACTIVE";
      state.resumedAt = action.input.resumedAt;
    },
    suspendInstanceOperation(state, action) {
      if (state.status !== "ACTIVE") {
        throw new InvalidStatusTransitionSuspendInstanceError(
          "Can only suspend ACTIVE instances",
        );
      }
      state.status = "SUSPENDED";
      state.suspendedAt = action.input.suspendedAt;
      state.suspensionType = "OTHER";
      state.suspensionReason = action.input.reason || null;
    },
    terminateInstanceOperation(state, action) {
      if (state.status === "TERMINATED") {
        throw new AlreadyTerminatedError(
          "Instance is already terminated and cannot be terminated again",
        );
      }
      state.status = "TERMINATED";
      state.terminatedAt = action.input.terminatedAt;
      state.terminationReason = action.input.reason;
    },
  };
