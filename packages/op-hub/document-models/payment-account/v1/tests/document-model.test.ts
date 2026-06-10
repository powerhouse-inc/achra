/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsPaymentAccountDocument,
  assertIsPaymentAccountState,
  initialGlobalState,
  initialLocalState,
  isPaymentAccountDocument,
  isPaymentAccountState,
  paymentAccountDocumentType,
  utils,
} from "document-models/payment-account/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("PaymentAccount Document Model", () => {
  it("should create a new PaymentAccount document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(paymentAccountDocumentType);
  });

  it("should create a new PaymentAccount document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isPaymentAccountDocument(document)).toBe(true);
    expect(isPaymentAccountState(document.state)).toBe(true);
  });
  it("should reject a document that is not a PaymentAccount document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsPaymentAccountDocument(wrongDocumentType)).toThrow();
      expect(isPaymentAccountDocument(wrongDocumentType)).toBe(false);
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
    expect(isPaymentAccountState(wrongState.state)).toBe(false);
    expect(assertIsPaymentAccountState(wrongState.state)).toThrow();
    expect(isPaymentAccountDocument(wrongState)).toBe(false);
    expect(assertIsPaymentAccountDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isPaymentAccountState(wrongInitialState.state)).toBe(false);
    expect(assertIsPaymentAccountState(wrongInitialState.state)).toThrow();
    expect(isPaymentAccountDocument(wrongInitialState)).toBe(false);
    expect(assertIsPaymentAccountDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isPaymentAccountDocument(missingIdInHeader)).toBe(false);
    expect(assertIsPaymentAccountDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isPaymentAccountDocument(missingNameInHeader)).toBe(false);
    expect(assertIsPaymentAccountDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isPaymentAccountDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsPaymentAccountDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isPaymentAccountDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsPaymentAccountDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
