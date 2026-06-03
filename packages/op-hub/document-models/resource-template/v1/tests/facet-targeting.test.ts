import { generateMock } from "document-model";
import {
  addFacetOption,
  AddFacetOptionInputSchema,
  isResourceTemplateDocument,
  reducer,
  removeFacetOption,
  RemoveFacetOptionInputSchema,
  removeFacetTarget,
  RemoveFacetTargetInputSchema,
  setFacetTarget,
  SetFacetTargetInputSchema,
  utils,
} from "document-models/resource-template/v1";
import { describe, expect, it } from "vitest";

describe("FacetTargetingOperations", () => {
  it("should handle setFacetTarget operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetFacetTargetInputSchema());

    const updatedDocument = reducer(document, setFacetTarget(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_FACET_TARGET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeFacetTarget operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveFacetTargetInputSchema());

    const updatedDocument = reducer(document, removeFacetTarget(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_FACET_TARGET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addFacetOption operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddFacetOptionInputSchema());

    const updatedDocument = reducer(document, addFacetOption(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_FACET_OPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeFacetOption operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveFacetOptionInputSchema());

    const updatedDocument = reducer(document, removeFacetOption(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_FACET_OPTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
