/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsSubscriptionInvoiceDocument,
  assertIsSubscriptionInvoiceState,
  initialGlobalState,
  initialLocalState,
  isSubscriptionInvoiceDocument,
  isSubscriptionInvoiceState,
  subscriptionInvoiceDocumentType,
  utils,
} from "document-models/subscription-invoice/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("SubscriptionInvoice Document Model", () => {
  it("should create a new SubscriptionInvoice document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(subscriptionInvoiceDocumentType);
  });

  it("should create a new SubscriptionInvoice document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isSubscriptionInvoiceDocument(document)).toBe(true);
    expect(isSubscriptionInvoiceState(document.state)).toBe(true);
  });
  it("should reject a document that is not a SubscriptionInvoice document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsSubscriptionInvoiceDocument(wrongDocumentType)).toThrow();
      expect(isSubscriptionInvoiceDocument(wrongDocumentType)).toBe(false);
    } catch (error) {
      expect(error).toBeInstanceOf(ZodError);
    }
  });
  const wrongState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongState.state.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isSubscriptionInvoiceState(wrongState.state)).toBe(false);
    expect(assertIsSubscriptionInvoiceState(wrongState.state)).toThrow();
    expect(isSubscriptionInvoiceDocument(wrongState)).toBe(false);
    expect(assertIsSubscriptionInvoiceDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isSubscriptionInvoiceState(wrongInitialState.state)).toBe(false);
    expect(assertIsSubscriptionInvoiceState(wrongInitialState.state)).toThrow();
    expect(isSubscriptionInvoiceDocument(wrongInitialState)).toBe(false);
    expect(assertIsSubscriptionInvoiceDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isSubscriptionInvoiceDocument(missingIdInHeader)).toBe(false);
    expect(assertIsSubscriptionInvoiceDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isSubscriptionInvoiceDocument(missingNameInHeader)).toBe(false);
    expect(assertIsSubscriptionInvoiceDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isSubscriptionInvoiceDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsSubscriptionInvoiceDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isSubscriptionInvoiceDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsSubscriptionInvoiceDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
