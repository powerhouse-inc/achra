/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsBuilderProfileDocument,
  assertIsBuilderProfileState,
  builderProfileDocumentType,
  initialGlobalState,
  initialLocalState,
  isBuilderProfileDocument,
  isBuilderProfileState,
  utils,
} from "document-models/builder-profile/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("BuilderProfile Document Model", () => {
  it("should create a new BuilderProfile document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(builderProfileDocumentType);
  });

  it("should create a new BuilderProfile document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isBuilderProfileDocument(document)).toBe(true);
    expect(isBuilderProfileState(document.state)).toBe(true);
  });
  it("should reject a document that is not a BuilderProfile document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsBuilderProfileDocument(wrongDocumentType)).toThrow();
      expect(isBuilderProfileDocument(wrongDocumentType)).toBe(false);
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
    expect(isBuilderProfileState(wrongState.state)).toBe(false);
    expect(assertIsBuilderProfileState(wrongState.state)).toThrow();
    expect(isBuilderProfileDocument(wrongState)).toBe(false);
    expect(assertIsBuilderProfileDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isBuilderProfileState(wrongInitialState.state)).toBe(false);
    expect(assertIsBuilderProfileState(wrongInitialState.state)).toThrow();
    expect(isBuilderProfileDocument(wrongInitialState)).toBe(false);
    expect(assertIsBuilderProfileDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isBuilderProfileDocument(missingIdInHeader)).toBe(false);
    expect(assertIsBuilderProfileDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isBuilderProfileDocument(missingNameInHeader)).toBe(false);
    expect(assertIsBuilderProfileDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isBuilderProfileDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsBuilderProfileDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isBuilderProfileDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsBuilderProfileDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
