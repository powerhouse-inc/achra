/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { describe, it, expect } from "vitest";
import {
  utils,
  initialGlobalState,
  initialLocalState,
  serviceOfferingDocumentType,
  isServiceOfferingDocument,
  assertIsServiceOfferingDocument,
  isServiceOfferingState,
  assertIsServiceOfferingState,
} from "document-models/service-offering/v1";
import { ZodError } from "zod";

describe("ServiceOffering Document Model", () => {
  it("should create a new ServiceOffering document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(serviceOfferingDocumentType);
  });

  it("should create a new ServiceOffering document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isServiceOfferingDocument(document)).toBe(true);
    expect(isServiceOfferingState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ServiceOffering document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsServiceOfferingDocument(wrongDocumentType)).toThrow();
      expect(isServiceOfferingDocument(wrongDocumentType)).toBe(false);
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
    expect(isServiceOfferingState(wrongState.state)).toBe(false);
    expect(assertIsServiceOfferingState(wrongState.state)).toThrow();
    expect(isServiceOfferingDocument(wrongState)).toBe(false);
    expect(assertIsServiceOfferingDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isServiceOfferingState(wrongInitialState.state)).toBe(false);
    expect(assertIsServiceOfferingState(wrongInitialState.state)).toThrow();
    expect(isServiceOfferingDocument(wrongInitialState)).toBe(false);
    expect(assertIsServiceOfferingDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isServiceOfferingDocument(missingIdInHeader)).toBe(false);
    expect(assertIsServiceOfferingDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isServiceOfferingDocument(missingNameInHeader)).toBe(false);
    expect(assertIsServiceOfferingDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isServiceOfferingDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsServiceOfferingDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isServiceOfferingDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsServiceOfferingDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
