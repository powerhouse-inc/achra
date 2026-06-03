/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsScopeOfWorkDocument,
  assertIsScopeOfWorkState,
  initialGlobalState,
  initialLocalState,
  isScopeOfWorkDocument,
  isScopeOfWorkState,
  scopeOfWorkDocumentType,
  utils,
} from "document-models/scope-of-work/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("ScopeOfWork Document Model", () => {
  it("should create a new ScopeOfWork document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(scopeOfWorkDocumentType);
  });

  it("should create a new ScopeOfWork document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isScopeOfWorkDocument(document)).toBe(true);
    expect(isScopeOfWorkState(document.state)).toBe(true);
  });
  it("should reject a document that is not a ScopeOfWork document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsScopeOfWorkDocument(wrongDocumentType)).toThrow();
      expect(isScopeOfWorkDocument(wrongDocumentType)).toBe(false);
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
    expect(isScopeOfWorkState(wrongState.state)).toBe(false);
    expect(assertIsScopeOfWorkState(wrongState.state)).toThrow();
    expect(isScopeOfWorkDocument(wrongState)).toBe(false);
    expect(assertIsScopeOfWorkDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isScopeOfWorkState(wrongInitialState.state)).toBe(false);
    expect(assertIsScopeOfWorkState(wrongInitialState.state)).toThrow();
    expect(isScopeOfWorkDocument(wrongInitialState)).toBe(false);
    expect(assertIsScopeOfWorkDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isScopeOfWorkDocument(missingIdInHeader)).toBe(false);
    expect(assertIsScopeOfWorkDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isScopeOfWorkDocument(missingNameInHeader)).toBe(false);
    expect(assertIsScopeOfWorkDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isScopeOfWorkDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsScopeOfWorkDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isScopeOfWorkDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsScopeOfWorkDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
