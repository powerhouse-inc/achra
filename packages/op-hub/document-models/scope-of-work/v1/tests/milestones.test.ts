import { generateMock } from "document-model";
import {
  addCoordinator,
  AddCoordinatorInputSchema,
  addMilestone,
  addMilestoneDeliverable,
  AddMilestoneDeliverableInputSchema,
  AddMilestoneInputSchema,
  editMilestone,
  EditMilestoneInputSchema,
  isScopeOfWorkDocument,
  reducer,
  removeCoordinator,
  RemoveCoordinatorInputSchema,
  removeMilestone,
  removeMilestoneDeliverable,
  RemoveMilestoneDeliverableInputSchema,
  RemoveMilestoneInputSchema,
  utils,
} from "document-models/scope-of-work/v1";
import { describe, expect, it } from "vitest";

describe("MilestonesOperations", () => {
  it("should handle addMilestone operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddMilestoneInputSchema());

    const updatedDocument = reducer(document, addMilestone(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeMilestone operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveMilestoneInputSchema());

    const updatedDocument = reducer(document, removeMilestone(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editMilestone operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditMilestoneInputSchema());

    const updatedDocument = reducer(document, editMilestone(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_MILESTONE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addCoordinator operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddCoordinatorInputSchema());

    const updatedDocument = reducer(document, addCoordinator(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_COORDINATOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeCoordinator operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveCoordinatorInputSchema());

    const updatedDocument = reducer(document, removeCoordinator(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_COORDINATOR",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addMilestoneDeliverable operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddMilestoneDeliverableInputSchema());

    const updatedDocument = reducer(document, addMilestoneDeliverable(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_MILESTONE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeMilestoneDeliverable operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveMilestoneDeliverableInputSchema());

    const updatedDocument = reducer(
      document,
      removeMilestoneDeliverable(input),
    );

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_MILESTONE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
