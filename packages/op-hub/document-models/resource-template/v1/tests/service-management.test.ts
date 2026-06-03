import { generateMock } from "document-model";
import {
  addFacetBinding,
  AddFacetBindingInputSchema,
  addService,
  AddServiceInputSchema,
  deleteService,
  DeleteServiceInputSchema,
  isResourceTemplateDocument,
  reducer,
  removeFacetBinding,
  RemoveFacetBindingInputSchema,
  updateService,
  UpdateServiceInputSchema,
  utils,
} from "document-models/resource-template/v1";
import { describe, expect, it } from "vitest";

describe("ServiceManagementOperations", () => {
  it("should handle addService operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddServiceInputSchema());

    const updatedDocument = reducer(document, addService(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SERVICE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateService operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateServiceInputSchema());

    const updatedDocument = reducer(document, updateService(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SERVICE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteService operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteServiceInputSchema());

    const updatedDocument = reducer(document, deleteService(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_SERVICE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addFacetBinding operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddFacetBindingInputSchema());

    const updatedDocument = reducer(document, addFacetBinding(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_FACET_BINDING",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeFacetBinding operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveFacetBindingInputSchema());

    const updatedDocument = reducer(document, removeFacetBinding(input));

    expect(isResourceTemplateDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_FACET_BINDING",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
