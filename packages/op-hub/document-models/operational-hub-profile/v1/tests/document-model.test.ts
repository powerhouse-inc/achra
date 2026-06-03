/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsOperationalHubProfileDocument,
  assertIsOperationalHubProfileState,
  initialGlobalState,
  initialLocalState,
  isOperationalHubProfileDocument,
  isOperationalHubProfileState,
  operationalHubProfileDocumentType,
  utils,
} from "document-models/operational-hub-profile/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("OperationalHubProfile Document Model", () => {
  it("should create a new OperationalHubProfile document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(
      operationalHubProfileDocumentType,
    );
  });

  it("should create a new OperationalHubProfile document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isOperationalHubProfileDocument(document)).toBe(true);
    expect(isOperationalHubProfileState(document.state)).toBe(true);
  });
  it("should reject a document that is not a OperationalHubProfile document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(
        assertIsOperationalHubProfileDocument(wrongDocumentType),
      ).toThrow();
      expect(isOperationalHubProfileDocument(wrongDocumentType)).toBe(false);
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
    expect(isOperationalHubProfileState(wrongState.state)).toBe(false);
    expect(assertIsOperationalHubProfileState(wrongState.state)).toThrow();
    expect(isOperationalHubProfileDocument(wrongState)).toBe(false);
    expect(assertIsOperationalHubProfileDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isOperationalHubProfileState(wrongInitialState.state)).toBe(false);
    expect(
      assertIsOperationalHubProfileState(wrongInitialState.state),
    ).toThrow();
    expect(isOperationalHubProfileDocument(wrongInitialState)).toBe(false);
    expect(assertIsOperationalHubProfileDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isOperationalHubProfileDocument(missingIdInHeader)).toBe(false);
    expect(assertIsOperationalHubProfileDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isOperationalHubProfileDocument(missingNameInHeader)).toBe(false);
    expect(
      assertIsOperationalHubProfileDocument(missingNameInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(
      isOperationalHubProfileDocument(missingCreatedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsOperationalHubProfileDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isOperationalHubProfileDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsOperationalHubProfileDocument(
        missingLastModifiedAtUtcIsoInHeader,
      ),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
