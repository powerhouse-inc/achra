/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsRequestForProposalsDocument,
  assertIsRequestForProposalsState,
  initialGlobalState,
  initialLocalState,
  isRequestForProposalsDocument,
  isRequestForProposalsState,
  requestForProposalsDocumentType,
  utils,
} from "document-models/request-for-proposals/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("RequestForProposals Document Model", () => {
  it("should create a new RequestForProposals document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(requestForProposalsDocumentType);
  });

  it("should create a new RequestForProposals document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isRequestForProposalsDocument(document)).toBe(true);
    expect(isRequestForProposalsState(document.state)).toBe(true);
  });
  it("should reject a document that is not a RequestForProposals document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsRequestForProposalsDocument(wrongDocumentType)).toThrow();
      expect(isRequestForProposalsDocument(wrongDocumentType)).toBe(false);
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
    expect(isRequestForProposalsState(wrongState.state)).toBe(false);
    expect(assertIsRequestForProposalsState(wrongState.state)).toThrow();
    expect(isRequestForProposalsDocument(wrongState)).toBe(false);
    expect(assertIsRequestForProposalsDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isRequestForProposalsState(wrongInitialState.state)).toBe(false);
    expect(assertIsRequestForProposalsState(wrongInitialState.state)).toThrow();
    expect(isRequestForProposalsDocument(wrongInitialState)).toBe(false);
    expect(assertIsRequestForProposalsDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isRequestForProposalsDocument(missingIdInHeader)).toBe(false);
    expect(assertIsRequestForProposalsDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isRequestForProposalsDocument(missingNameInHeader)).toBe(false);
    expect(assertIsRequestForProposalsDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isRequestForProposalsDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsRequestForProposalsDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isRequestForProposalsDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsRequestForProposalsDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
