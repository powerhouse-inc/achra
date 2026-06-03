/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsResourceTemplateDocument,
  assertIsResourceTemplateState,
  initialGlobalState,
  initialLocalState,
  isResourceTemplateDocument,
  isResourceTemplateState,
  resourceTemplateDocumentType,
  utils,
} from "document-models/resource-template/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("ResourceTemplate Document Model", () => {
  it("should create a new ResourceTemplate document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(resourceTemplateDocumentType);
  });

  it("should create a new ResourceTemplate document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isResourceTemplateDocument(document)).toBe(true);
    expect(isResourceTemplateState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ResourceTemplate document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsResourceTemplateDocument(wrongDocumentType)).toThrow();
      expect(isResourceTemplateDocument(wrongDocumentType)).toBe(false);
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
    expect(isResourceTemplateState(wrongState.state)).toBe(false);
    expect(assertIsResourceTemplateState(wrongState.state)).toThrow();
    expect(isResourceTemplateDocument(wrongState)).toBe(false);
    expect(assertIsResourceTemplateDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isResourceTemplateState(wrongInitialState.state)).toBe(false);
    expect(assertIsResourceTemplateState(wrongInitialState.state)).toThrow();
    expect(isResourceTemplateDocument(wrongInitialState)).toBe(false);
    expect(assertIsResourceTemplateDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isResourceTemplateDocument(missingIdInHeader)).toBe(false);
    expect(assertIsResourceTemplateDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isResourceTemplateDocument(missingNameInHeader)).toBe(false);
    expect(assertIsResourceTemplateDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isResourceTemplateDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsResourceTemplateDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isResourceTemplateDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsResourceTemplateDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
