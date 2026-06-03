/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsNetworkProfileDocument,
  assertIsNetworkProfileState,
  initialGlobalState,
  initialLocalState,
  isNetworkProfileDocument,
  isNetworkProfileState,
  networkProfileDocumentType,
  utils,
} from "document-models/network-profile/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("NetworkProfile Document Model", () => {
  it("should create a new NetworkProfile document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(networkProfileDocumentType);
  });

  it("should create a new NetworkProfile document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isNetworkProfileDocument(document)).toBe(true);
    expect(isNetworkProfileState(document.state)).toBe(true);
  });
  it("should reject a document that is not a NetworkProfile document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsNetworkProfileDocument(wrongDocumentType)).toThrow();
      expect(isNetworkProfileDocument(wrongDocumentType)).toBe(false);
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
    expect(isNetworkProfileState(wrongState.state)).toBe(false);
    expect(assertIsNetworkProfileState(wrongState.state)).toThrow();
    expect(isNetworkProfileDocument(wrongState)).toBe(false);
    expect(assertIsNetworkProfileDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isNetworkProfileState(wrongInitialState.state)).toBe(false);
    expect(assertIsNetworkProfileState(wrongInitialState.state)).toThrow();
    expect(isNetworkProfileDocument(wrongInitialState)).toBe(false);
    expect(assertIsNetworkProfileDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isNetworkProfileDocument(missingIdInHeader)).toBe(false);
    expect(assertIsNetworkProfileDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isNetworkProfileDocument(missingNameInHeader)).toBe(false);
    expect(assertIsNetworkProfileDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isNetworkProfileDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsNetworkProfileDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isNetworkProfileDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsNetworkProfileDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
