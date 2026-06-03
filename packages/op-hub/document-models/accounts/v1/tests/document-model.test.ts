/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  accountsDocumentType,
  assertIsAccountsDocument,
  assertIsAccountsState,
  initialGlobalState,
  initialLocalState,
  isAccountsDocument,
  isAccountsState,
  utils,
} from "document-models/accounts/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("Accounts Document Model", () => {
  it("should create a new Accounts document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(accountsDocumentType);
  });

  it("should create a new Accounts document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isAccountsDocument(document)).toBe(true);
    expect(isAccountsState(document.state)).toBe(true);
  });
  it("should reject a document that is not a Accounts document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsAccountsDocument(wrongDocumentType)).toThrow();
      expect(isAccountsDocument(wrongDocumentType)).toBe(false);
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
    expect(isAccountsState(wrongState.state)).toBe(false);
    expect(assertIsAccountsState(wrongState.state)).toThrow();
    expect(isAccountsDocument(wrongState)).toBe(false);
    expect(assertIsAccountsDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isAccountsState(wrongInitialState.state)).toBe(false);
    expect(assertIsAccountsState(wrongInitialState.state)).toThrow();
    expect(isAccountsDocument(wrongInitialState)).toBe(false);
    expect(assertIsAccountsDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isAccountsDocument(missingIdInHeader)).toBe(false);
    expect(assertIsAccountsDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isAccountsDocument(missingNameInHeader)).toBe(false);
    expect(assertIsAccountsDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isAccountsDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(assertIsAccountsDocument(missingCreatedAtUtcIsoInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isAccountsDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsAccountsDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
