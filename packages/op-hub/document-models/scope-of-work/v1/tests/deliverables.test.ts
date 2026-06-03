import { generateMock } from "document-model";
import {
  addDeliverable,
  AddDeliverableInputSchema,
  addKeyResult,
  AddKeyResultInputSchema,
  editDeliverable,
  EditDeliverableInputSchema,
  editKeyResult,
  EditKeyResultInputSchema,
  isScopeOfWorkDocument,
  reducer,
  removeDeliverable,
  RemoveDeliverableInputSchema,
  removeKeyResult,
  RemoveKeyResultInputSchema,
  setDeliverableBudgetAnchorProject,
  SetDeliverableBudgetAnchorProjectInputSchema,
  setDeliverableProgress,
  SetDeliverableProgressInputSchema,
  utils,
} from "document-models/scope-of-work/v1";
import { describe, expect, it } from "vitest";

describe("DeliverablesOperations", () => {
  it("should handle addDeliverable operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddDeliverableInputSchema());

    const updatedDocument = reducer(document, addDeliverable(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeDeliverable operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveDeliverableInputSchema());

    const updatedDocument = reducer(document, removeDeliverable(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editDeliverable operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditDeliverableInputSchema());

    const updatedDocument = reducer(document, editDeliverable(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_DELIVERABLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setDeliverableProgress operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetDeliverableProgressInputSchema());

    const updatedDocument = reducer(document, setDeliverableProgress(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_DELIVERABLE_PROGRESS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addKeyResult operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddKeyResultInputSchema());

    const updatedDocument = reducer(document, addKeyResult(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_KEY_RESULT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeKeyResult operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveKeyResultInputSchema());

    const updatedDocument = reducer(document, removeKeyResult(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_KEY_RESULT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editKeyResult operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditKeyResultInputSchema());

    const updatedDocument = reducer(document, editKeyResult(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_KEY_RESULT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setDeliverableBudgetAnchorProject operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetDeliverableBudgetAnchorProjectInputSchema());

    const updatedDocument = reducer(
      document,
      setDeliverableBudgetAnchorProject(input),
    );

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
