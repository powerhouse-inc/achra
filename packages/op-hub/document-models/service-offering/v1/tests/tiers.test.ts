import { generateMock } from "document-model";
import {
  addServiceLevel,
  AddServiceLevelInputSchema,
  addTier,
  AddTierInputSchema,
  addUsageLimit,
  AddUsageLimitInputSchema,
  deleteTier,
  DeleteTierInputSchema,
  isServiceOfferingDocument,
  reducer,
  removeServiceLevel,
  RemoveServiceLevelInputSchema,
  removeUsageLimit,
  RemoveUsageLimitInputSchema,
  reorderTiers,
  ReorderTiersInputSchema,
  setTierBillingCycleDiscounts,
  SetTierBillingCycleDiscountsInputSchema,
  setTierDefaultBillingCycle,
  SetTierDefaultBillingCycleInputSchema,
  setTierPricingMode,
  SetTierPricingModeInputSchema,
  updateServiceLevel,
  UpdateServiceLevelInputSchema,
  updateTier,
  UpdateTierInputSchema,
  updateTierPricing,
  UpdateTierPricingInputSchema,
  updateUsageLimit,
  UpdateUsageLimitInputSchema,
  utils,
} from "document-models/service-offering/v1";
import { describe, expect, it } from "vitest";

describe("TiersOperations", () => {
  it("should handle addTier operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddTierInputSchema());

    const updatedDocument = reducer(document, addTier(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_TIER");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateTier operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTierInputSchema());

    const updatedDocument = reducer(document, updateTier(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TIER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateTierPricing operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTierPricingInputSchema());

    const updatedDocument = reducer(document, updateTierPricing(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TIER_PRICING",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteTier operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteTierInputSchema());

    const updatedDocument = reducer(document, deleteTier(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_TIER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addServiceLevel operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddServiceLevelInputSchema());

    const updatedDocument = reducer(document, addServiceLevel(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SERVICE_LEVEL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateServiceLevel operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateServiceLevelInputSchema());

    const updatedDocument = reducer(document, updateServiceLevel(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SERVICE_LEVEL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeServiceLevel operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveServiceLevelInputSchema());

    const updatedDocument = reducer(document, removeServiceLevel(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SERVICE_LEVEL",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addUsageLimit operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddUsageLimitInputSchema());

    const updatedDocument = reducer(document, addUsageLimit(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_USAGE_LIMIT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateUsageLimit operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateUsageLimitInputSchema());

    const updatedDocument = reducer(document, updateUsageLimit(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_USAGE_LIMIT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeUsageLimit operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveUsageLimitInputSchema());

    const updatedDocument = reducer(document, removeUsageLimit(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_USAGE_LIMIT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setTierDefaultBillingCycle operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetTierDefaultBillingCycleInputSchema());

    const updatedDocument = reducer(
      document,
      setTierDefaultBillingCycle(input),
    );

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_TIER_DEFAULT_BILLING_CYCLE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setTierBillingCycleDiscounts operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetTierBillingCycleDiscountsInputSchema());

    const updatedDocument = reducer(
      document,
      setTierBillingCycleDiscounts(input),
    );

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_TIER_BILLING_CYCLE_DISCOUNTS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setTierPricingMode operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetTierPricingModeInputSchema());

    const updatedDocument = reducer(document, setTierPricingMode(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_TIER_PRICING_MODE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reorderTiers operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReorderTiersInputSchema());

    const updatedDocument = reducer(document, reorderTiers(input));

    expect(isServiceOfferingDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REORDER_TIERS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
