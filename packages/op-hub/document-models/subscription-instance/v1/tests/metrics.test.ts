import { generateMock } from "document-model";
import {
  accrueMetricUsage,
  AccrueMetricUsageInputSchema,
  addServiceMetric,
  AddServiceMetricInputSchema,
  decrementMetricUsage,
  DecrementMetricUsageInputSchema,
  incrementMetricUsage,
  IncrementMetricUsageInputSchema,
  isSubscriptionInstanceDocument,
  reducer,
  removeServiceMetric,
  RemoveServiceMetricInputSchema,
  updateMetric,
  UpdateMetricInputSchema,
  updateMetricUsage,
  UpdateMetricUsageInputSchema,
  utils,
} from "document-models/subscription-instance/v1";
import { describe, expect, it } from "vitest";

describe("MetricsOperations", () => {
  it("should handle addServiceMetric operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddServiceMetricInputSchema());

    const updatedDocument = reducer(document, addServiceMetric(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SERVICE_METRIC",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateMetric operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateMetricInputSchema());

    const updatedDocument = reducer(document, updateMetric(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_METRIC",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateMetricUsage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateMetricUsageInputSchema());

    const updatedDocument = reducer(document, updateMetricUsage(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_METRIC_USAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeServiceMetric operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveServiceMetricInputSchema());

    const updatedDocument = reducer(document, removeServiceMetric(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SERVICE_METRIC",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle incrementMetricUsage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(IncrementMetricUsageInputSchema());

    const updatedDocument = reducer(document, incrementMetricUsage(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "INCREMENT_METRIC_USAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle decrementMetricUsage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DecrementMetricUsageInputSchema());

    const updatedDocument = reducer(document, decrementMetricUsage(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DECREMENT_METRIC_USAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle accrueMetricUsage operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AccrueMetricUsageInputSchema());

    const updatedDocument = reducer(document, accrueMetricUsage(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ACCRUE_METRIC_USAGE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
