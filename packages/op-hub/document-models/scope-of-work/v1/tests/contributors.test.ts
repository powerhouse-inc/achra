import { generateMock } from "document-model";
import {
  addAgent,
  AddAgentInputSchema,
  editAgent,
  EditAgentInputSchema,
  isScopeOfWorkDocument,
  reducer,
  removeAgent,
  RemoveAgentInputSchema,
  utils,
} from "document-models/scope-of-work/v1";
import { describe, expect, it } from "vitest";

describe("ContributorsOperations", () => {
  it("should handle addAgent operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddAgentInputSchema());

    const updatedDocument = reducer(document, addAgent(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_AGENT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeAgent operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveAgentInputSchema());

    const updatedDocument = reducer(document, removeAgent(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_AGENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editAgent operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditAgentInputSchema());

    const updatedDocument = reducer(document, editAgent(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_AGENT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
