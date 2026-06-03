import { generateMock } from "document-model";
import {
  addContextDocument,
  AddContextDocumentInputSchema,
  isRequestForProposalsDocument,
  reducer,
  removeContextDocument,
  RemoveContextDocumentInputSchema,
  utils,
} from "document-models/request-for-proposals/v1";
import { describe, expect, it } from "vitest";

describe("ContexDocumentOperations", () => {
  it("should handle addContextDocument operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddContextDocumentInputSchema());

    const updatedDocument = reducer(document, addContextDocument(input));

    expect(isRequestForProposalsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_CONTEXT_DOCUMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeContextDocument operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveContextDocumentInputSchema());

    const updatedDocument = reducer(document, removeContextDocument(input));

    expect(isRequestForProposalsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_CONTEXT_DOCUMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
