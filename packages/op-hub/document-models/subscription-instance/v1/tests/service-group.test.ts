import { generateMock } from "document-model";
import {
  addServiceGroup,
  AddServiceGroupInputSchema,
  addServiceToGroup,
  AddServiceToGroupInputSchema,
  isSubscriptionInstanceDocument,
  reducer,
  removeServiceFromGroup,
  RemoveServiceFromGroupInputSchema,
  removeServiceGroup,
  RemoveServiceGroupInputSchema,
  updateServiceGroupCost,
  UpdateServiceGroupCostInputSchema,
  utils,
} from "document-models/subscription-instance/v1";
import { describe, expect, it } from "vitest";

describe("ServiceGroupOperations", () => {
  it("should handle addServiceGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddServiceGroupInputSchema());

    const updatedDocument = reducer(document, addServiceGroup(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SERVICE_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeServiceGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveServiceGroupInputSchema());

    const updatedDocument = reducer(document, removeServiceGroup(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SERVICE_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addServiceToGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddServiceToGroupInputSchema());

    const updatedDocument = reducer(document, addServiceToGroup(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SERVICE_TO_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeServiceFromGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveServiceFromGroupInputSchema());

    const updatedDocument = reducer(document, removeServiceFromGroup(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SERVICE_FROM_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateServiceGroupCost operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateServiceGroupCostInputSchema());

    const updatedDocument = reducer(document, updateServiceGroupCost(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SERVICE_GROUP_COST",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
