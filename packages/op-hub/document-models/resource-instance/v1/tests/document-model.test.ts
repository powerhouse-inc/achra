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
  resourceInstanceDocumentType,
  isResourceInstanceDocument,
  assertIsResourceInstanceDocument,
  isResourceInstanceState,
  assertIsResourceInstanceState,
} from "document-models/resource-instance/v1";
import { ZodError } from "zod";

describe("ResourceInstance Document Model", () => {
  it("should create a new ResourceInstance document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(resourceInstanceDocumentType);
  });

  it("should create a new ResourceInstance document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isResourceInstanceDocument(document)).toBe(true);
    expect(isResourceInstanceState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ResourceInstance document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsResourceInstanceDocument(wrongDocumentType)).toThrow();
      expect(isResourceInstanceDocument(wrongDocumentType)).toBe(false);
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
    expect(isResourceInstanceState(wrongState.state)).toBe(false);
    expect(assertIsResourceInstanceState(wrongState.state)).toThrow();
    expect(isResourceInstanceDocument(wrongState)).toBe(false);
    expect(assertIsResourceInstanceDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isResourceInstanceState(wrongInitialState.state)).toBe(false);
    expect(assertIsResourceInstanceState(wrongInitialState.state)).toThrow();
    expect(isResourceInstanceDocument(wrongInitialState)).toBe(false);
    expect(assertIsResourceInstanceDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isResourceInstanceDocument(missingIdInHeader)).toBe(false);
    expect(assertIsResourceInstanceDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isResourceInstanceDocument(missingNameInHeader)).toBe(false);
    expect(assertIsResourceInstanceDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isResourceInstanceDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsResourceInstanceDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isResourceInstanceDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsResourceInstanceDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
