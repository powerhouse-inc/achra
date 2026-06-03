/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsBuildersDocument,
  assertIsBuildersState,
  buildersDocumentType,
  initialGlobalState,
  initialLocalState,
  isBuildersDocument,
  isBuildersState,
  utils,
} from "document-models/builders/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("Builders Document Model", () => {
  it("should create a new Builders document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(buildersDocumentType);
  });

  it("should create a new Builders document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isBuildersDocument(document)).toBe(true);
    expect(isBuildersState(document.state)).toBe(true);
  });
  it("should reject a document that is not a Builders document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsBuildersDocument(wrongDocumentType)).toThrow();
      expect(isBuildersDocument(wrongDocumentType)).toBe(false);
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
    expect(isBuildersState(wrongState.state)).toBe(false);
    expect(assertIsBuildersState(wrongState.state)).toThrow();
    expect(isBuildersDocument(wrongState)).toBe(false);
    expect(assertIsBuildersDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isBuildersState(wrongInitialState.state)).toBe(false);
    expect(assertIsBuildersState(wrongInitialState.state)).toThrow();
    expect(isBuildersDocument(wrongInitialState)).toBe(false);
    expect(assertIsBuildersDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isBuildersDocument(missingIdInHeader)).toBe(false);
    expect(assertIsBuildersDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isBuildersDocument(missingNameInHeader)).toBe(false);
    expect(assertIsBuildersDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isBuildersDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(assertIsBuildersDocument(missingCreatedAtUtcIsoInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isBuildersDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsBuildersDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
