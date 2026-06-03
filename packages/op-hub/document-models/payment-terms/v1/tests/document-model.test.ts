/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsPaymentTermsDocument,
  assertIsPaymentTermsState,
  initialGlobalState,
  initialLocalState,
  isPaymentTermsDocument,
  isPaymentTermsState,
  paymentTermsDocumentType,
  utils,
} from "document-models/payment-terms/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("PaymentTerms Document Model", () => {
  it("should create a new PaymentTerms document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(paymentTermsDocumentType);
  });

  it("should create a new PaymentTerms document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isPaymentTermsDocument(document)).toBe(true);
    expect(isPaymentTermsState(document.state)).toBe(true);
  });
  it("should reject a document that is not a PaymentTerms document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsPaymentTermsDocument(wrongDocumentType)).toThrow();
      expect(isPaymentTermsDocument(wrongDocumentType)).toBe(false);
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
    expect(isPaymentTermsState(wrongState.state)).toBe(false);
    expect(assertIsPaymentTermsState(wrongState.state)).toThrow();
    expect(isPaymentTermsDocument(wrongState)).toBe(false);
    expect(assertIsPaymentTermsDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isPaymentTermsState(wrongInitialState.state)).toBe(false);
    expect(assertIsPaymentTermsState(wrongInitialState.state)).toThrow();
    expect(isPaymentTermsDocument(wrongInitialState)).toBe(false);
    expect(assertIsPaymentTermsDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isPaymentTermsDocument(missingIdInHeader)).toBe(false);
    expect(assertIsPaymentTermsDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isPaymentTermsDocument(missingNameInHeader)).toBe(false);
    expect(assertIsPaymentTermsDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isPaymentTermsDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsPaymentTermsDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isPaymentTermsDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsPaymentTermsDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
