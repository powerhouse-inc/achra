/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  accountTransactionsDocumentType,
  assertIsAccountTransactionsDocument,
  assertIsAccountTransactionsState,
  initialGlobalState,
  initialLocalState,
  isAccountTransactionsDocument,
  isAccountTransactionsState,
  utils,
} from "document-models/account-transactions/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("AccountTransactions Document Model", () => {
  it("should create a new AccountTransactions document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(accountTransactionsDocumentType);
  });

  it("should create a new AccountTransactions document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isAccountTransactionsDocument(document)).toBe(true);
    expect(isAccountTransactionsState(document.state)).toBe(true);
  });
  it("should reject a document that is not a AccountTransactions document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsAccountTransactionsDocument(wrongDocumentType)).toThrow();
      expect(isAccountTransactionsDocument(wrongDocumentType)).toBe(false);
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
    expect(isAccountTransactionsState(wrongState.state)).toBe(false);
    expect(assertIsAccountTransactionsState(wrongState.state)).toThrow();
    expect(isAccountTransactionsDocument(wrongState)).toBe(false);
    expect(assertIsAccountTransactionsDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isAccountTransactionsState(wrongInitialState.state)).toBe(false);
    expect(assertIsAccountTransactionsState(wrongInitialState.state)).toThrow();
    expect(isAccountTransactionsDocument(wrongInitialState)).toBe(false);
    expect(assertIsAccountTransactionsDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isAccountTransactionsDocument(missingIdInHeader)).toBe(false);
    expect(assertIsAccountTransactionsDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isAccountTransactionsDocument(missingNameInHeader)).toBe(false);
    expect(assertIsAccountTransactionsDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isAccountTransactionsDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsAccountTransactionsDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isAccountTransactionsDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsAccountTransactionsDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
