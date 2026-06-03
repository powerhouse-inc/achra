import { generateMock } from "document-model";
import {
  addService,
  AddServiceInputSchema,
  deleteService,
  DeleteServiceInputSchema,
  isServiceOfferingDocument,
  reducer,
  updateService,
  UpdateServiceInputSchema,
  utils,
} from "document-models/service-offering/v1";
import { describe, expect, it } from "vitest";

describe("ServicesOperations", () => {
  it("should handle addService operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddServiceInputSchema());

    const updatedDocument = reducer(document, addService(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
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

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
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

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_SERVICE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
