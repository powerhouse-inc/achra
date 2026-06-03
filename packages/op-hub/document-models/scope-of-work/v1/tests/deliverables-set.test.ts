import { generateMock } from "document-model";
import {
  addDeliverableInSet,
  AddDeliverableInSetInputSchema,
  editDeliverablesSet,
  EditDeliverablesSetInputSchema,
  isScopeOfWorkDocument,
  reducer,
  removeDeliverableInSet,
  RemoveDeliverableInSetInputSchema,
  utils,
} from "document-models/scope-of-work/v1";
import { describe, expect, it } from "vitest";

describe("DeliverablesSetOperations", () => {
  it("should handle editDeliverablesSet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditDeliverablesSetInputSchema());

    const updatedDocument = reducer(document, editDeliverablesSet(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_DELIVERABLES_SET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addDeliverableInSet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddDeliverableInSetInputSchema());

    const updatedDocument = reducer(document, addDeliverableInSet(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_DELIVERABLE_IN_SET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeDeliverableInSet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveDeliverableInSetInputSchema());

    const updatedDocument = reducer(document, removeDeliverableInSet(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_DELIVERABLE_IN_SET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
