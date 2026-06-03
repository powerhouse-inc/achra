import { generateMock } from "document-model";
import {
  editScopeOfWork,
  EditScopeOfWorkInputSchema,
  isScopeOfWorkDocument,
  reducer,
  utils,
} from "document-models/scope-of-work/v1";
import { describe, expect, it } from "vitest";

describe("ScopeOfWorkOperations", () => {
  it("should handle editScopeOfWork operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditScopeOfWorkInputSchema());

    const updatedDocument = reducer(document, editScopeOfWork(input));

    expect(isScopeOfWorkDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_SCOPE_OF_WORK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
