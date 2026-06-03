/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsInvoiceDocument,
  assertIsInvoiceState,
  initialGlobalState,
  initialLocalState,
  invoiceDocumentType,
  isInvoiceDocument,
  isInvoiceState,
  utils,
} from "document-models/invoice/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("Invoice Document Model", () => {
  it("should create a new Invoice document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(invoiceDocumentType);
  });

  it("should create a new Invoice document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isInvoiceDocument(document)).toBe(true);
    expect(isInvoiceState(document.state)).toBe(true);
  });
  it("should reject a document that is not a Invoice document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsInvoiceDocument(wrongDocumentType)).toThrow();
      expect(isInvoiceDocument(wrongDocumentType)).toBe(false);
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
    expect(isInvoiceState(wrongState.state)).toBe(false);
    expect(assertIsInvoiceState(wrongState.state)).toThrow();
    expect(isInvoiceDocument(wrongState)).toBe(false);
    expect(assertIsInvoiceDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isInvoiceState(wrongInitialState.state)).toBe(false);
    expect(assertIsInvoiceState(wrongInitialState.state)).toThrow();
    expect(isInvoiceDocument(wrongInitialState)).toBe(false);
    expect(assertIsInvoiceDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isInvoiceDocument(missingIdInHeader)).toBe(false);
    expect(assertIsInvoiceDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isInvoiceDocument(missingNameInHeader)).toBe(false);
    expect(assertIsInvoiceDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isInvoiceDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(assertIsInvoiceDocument(missingCreatedAtUtcIsoInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isInvoiceDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsInvoiceDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
