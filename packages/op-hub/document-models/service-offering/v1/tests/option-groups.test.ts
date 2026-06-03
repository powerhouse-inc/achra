import { generateMock } from "document-model";
import {
  addOptionGroup,
  AddOptionGroupInputSchema,
  addOptionGroupTierPricing,
  AddOptionGroupTierPricingInputSchema,
  deleteOptionGroup,
  DeleteOptionGroupInputSchema,
  isServiceOfferingDocument,
  reducer,
  removeOptionGroupTierPricing,
  RemoveOptionGroupTierPricingInputSchema,
  setOptionGroupDiscountMode,
  SetOptionGroupDiscountModeInputSchema,
  setOptionGroupStandalonePricing,
  SetOptionGroupStandalonePricingInputSchema,
  updateOptionGroup,
  UpdateOptionGroupInputSchema,
  updateOptionGroupTierPricing,
  UpdateOptionGroupTierPricingInputSchema,
  utils,
} from "document-models/service-offering/v1";
import { describe, expect, it } from "vitest";

describe("OptionGroupsOperations", () => {
  it("should handle addOptionGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddOptionGroupInputSchema());

    const updatedDocument = reducer(document, addOptionGroup(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_OPTION_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateOptionGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateOptionGroupInputSchema());

    const updatedDocument = reducer(document, updateOptionGroup(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_OPTION_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteOptionGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteOptionGroupInputSchema());

    const updatedDocument = reducer(document, deleteOptionGroup(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_OPTION_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setOptionGroupStandalonePricing operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOptionGroupStandalonePricingInputSchema());

    const updatedDocument = reducer(
      document,
      setOptionGroupStandalonePricing(input),
    );

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPTION_GROUP_STANDALONE_PRICING",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addOptionGroupTierPricing operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddOptionGroupTierPricingInputSchema());

    const updatedDocument = reducer(document, addOptionGroupTierPricing(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_OPTION_GROUP_TIER_PRICING",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateOptionGroupTierPricing operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateOptionGroupTierPricingInputSchema());

    const updatedDocument = reducer(
      document,
      updateOptionGroupTierPricing(input),
    );

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_OPTION_GROUP_TIER_PRICING",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeOptionGroupTierPricing operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveOptionGroupTierPricingInputSchema());

    const updatedDocument = reducer(
      document,
      removeOptionGroupTierPricing(input),
    );

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_OPTION_GROUP_TIER_PRICING",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setOptionGroupDiscountMode operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOptionGroupDiscountModeInputSchema());

    const updatedDocument = reducer(
      document,
      setOptionGroupDiscountMode(input),
    );

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OPTION_GROUP_DISCOUNT_MODE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
