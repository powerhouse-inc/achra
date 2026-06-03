import { generateMock } from "document-model";
import {
  addBuilder,
  AddBuilderInputSchema,
  isBuildersDocument,
  reducer,
  removeBuilder,
  RemoveBuilderInputSchema,
  utils,
} from "document-models/builders/v1";
import { describe, expect, it } from "vitest";

describe("BuildersOperations", () => {
  it("should handle addBuilder operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddBuilderInputSchema());

    const updatedDocument = reducer(document, addBuilder(input));

    expect(isBuildersDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_BUILDER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeBuilder operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveBuilderInputSchema());

    const updatedDocument = reducer(document, removeBuilder(input));

    expect(isBuildersDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_BUILDER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
