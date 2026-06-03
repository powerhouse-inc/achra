import { generateMock } from "document-model";
import {
  activateInstance,
  ActivateInstanceInputSchema,
  confirmInstance,
  ConfirmInstanceInputSchema,
  initializeInstance,
  InitializeInstanceInputSchema,
  isResourceInstanceDocument,
  reducer,
  reportProvisioningCompleted,
  ReportProvisioningCompletedInputSchema,
  reportProvisioningFailed,
  ReportProvisioningFailedInputSchema,
  reportProvisioningStarted,
  ReportProvisioningStartedInputSchema,
  resumeAfterMaintenance,
  ResumeAfterMaintenanceInputSchema,
  resumeAfterPayment,
  ResumeAfterPaymentInputSchema,
  setOperatorProfile,
  SetOperatorProfileInputSchema,
  suspendForMaintenance,
  SuspendForMaintenanceInputSchema,
  suspendForNonPayment,
  SuspendForNonPaymentInputSchema,
  suspendInstance,
  SuspendInstanceInputSchema,
  terminateInstance,
  TerminateInstanceInputSchema,
  updateInstanceInfo,
  UpdateInstanceInfoInputSchema,
  updateInstanceStatus,
  UpdateInstanceStatusInputSchema,
  utils,
} from "document-models/resource-instance/v1";
import { describe, expect, it } from "vitest";

describe("InstanceManagementOperations", () => {
  it("should handle initializeInstance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(InitializeInstanceInputSchema());

    const updatedDocument = reducer(document, initializeInstance(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "INITIALIZE_INSTANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateInstanceInfo operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateInstanceInfoInputSchema());

    const updatedDocument = reducer(document, updateInstanceInfo(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_INSTANCE_INFO",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setOperatorProfile operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOperatorProfileInputSchema());

    const updatedDocument = reducer(document, setOperatorProfile(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPERATOR_PROFILE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateInstanceStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateInstanceStatusInputSchema());

    const updatedDocument = reducer(document, updateInstanceStatus(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_INSTANCE_STATUS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle confirmInstance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ConfirmInstanceInputSchema());

    const updatedDocument = reducer(document, confirmInstance(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CONFIRM_INSTANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reportProvisioningStarted operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReportProvisioningStartedInputSchema());

    const updatedDocument = reducer(document, reportProvisioningStarted(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REPORT_PROVISIONING_STARTED",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reportProvisioningCompleted operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReportProvisioningCompletedInputSchema());

    const updatedDocument = reducer(
      document,
      reportProvisioningCompleted(input),
    );

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REPORT_PROVISIONING_COMPLETED",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reportProvisioningFailed operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReportProvisioningFailedInputSchema());

    const updatedDocument = reducer(document, reportProvisioningFailed(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REPORT_PROVISIONING_FAILED",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle activateInstance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ActivateInstanceInputSchema());

    const updatedDocument = reducer(document, activateInstance(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ACTIVATE_INSTANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle suspendForNonPayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SuspendForNonPaymentInputSchema());

    const updatedDocument = reducer(document, suspendForNonPayment(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SUSPEND_FOR_NON_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle suspendForMaintenance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SuspendForMaintenanceInputSchema());

    const updatedDocument = reducer(document, suspendForMaintenance(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SUSPEND_FOR_MAINTENANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle resumeAfterPayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ResumeAfterPaymentInputSchema());

    const updatedDocument = reducer(document, resumeAfterPayment(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "RESUME_AFTER_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle resumeAfterMaintenance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ResumeAfterMaintenanceInputSchema());

    const updatedDocument = reducer(document, resumeAfterMaintenance(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "RESUME_AFTER_MAINTENANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle suspendInstance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SuspendInstanceInputSchema());

    const updatedDocument = reducer(document, suspendInstance(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SUSPEND_INSTANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle terminateInstance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(TerminateInstanceInputSchema());

    const updatedDocument = reducer(document, terminateInstance(input));

    expect(isResourceInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "TERMINATE_INSTANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
