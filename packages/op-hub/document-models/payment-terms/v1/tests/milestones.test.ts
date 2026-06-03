import { generateMock } from "document-model";
import {
  addMilestone,
  AddMilestoneInputSchema,
  deleteMilestone,
  DeleteMilestoneInputSchema,
  isPaymentTermsDocument,
  reducer,
  reorderMilestones,
  ReorderMilestonesInputSchema,
  updateMilestone,
  UpdateMilestoneInputSchema,
  updateMilestoneStatus,
  UpdateMilestoneStatusInputSchema,
  utils,
} from "document-models/payment-terms/v1";
import { describe, expect, it } from "vitest";

describe("MilestonesOperations", () => {
  it("should handle addMilestone operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddMilestoneInputSchema());

    const updatedDocument = reducer(document, addMilestone(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateMilestone operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateMilestoneInputSchema());

    const updatedDocument = reducer(document, updateMilestone(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateMilestoneStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateMilestoneStatusInputSchema());

    const updatedDocument = reducer(document, updateMilestoneStatus(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_MILESTONE_STATUS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteMilestone operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteMilestoneInputSchema());

    const updatedDocument = reducer(document, deleteMilestone(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reorderMilestones operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReorderMilestonesInputSchema());

    const updatedDocument = reducer(document, reorderMilestones(input));

    expect(isPaymentTermsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REORDER_MILESTONES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
