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
  subscriptionInstanceDocumentType,
  isSubscriptionInstanceDocument,
  assertIsSubscriptionInstanceDocument,
  isSubscriptionInstanceState,
  assertIsSubscriptionInstanceState,
} from "document-models/subscription-instance/v1";
import { ZodError } from "zod";

describe("SubscriptionInstance Document Model", () => {
  it("should create a new SubscriptionInstance document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(subscriptionInstanceDocumentType);
  });

  it("should create a new SubscriptionInstance document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isSubscriptionInstanceDocument(document)).toBe(true);
    expect(isSubscriptionInstanceState(document.state)).toBe(true);
  });
  it("should reject a document that is not a SubscriptionInstance document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsSubscriptionInstanceDocument(wrongDocumentType)).toThrow();
      expect(isSubscriptionInstanceDocument(wrongDocumentType)).toBe(false);
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
    expect(isSubscriptionInstanceState(wrongState.state)).toBe(false);
    expect(assertIsSubscriptionInstanceState(wrongState.state)).toThrow();
    expect(isSubscriptionInstanceDocument(wrongState)).toBe(false);
    expect(assertIsSubscriptionInstanceDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isSubscriptionInstanceState(wrongInitialState.state)).toBe(false);
    expect(
      assertIsSubscriptionInstanceState(wrongInitialState.state),
    ).toThrow();
    expect(isSubscriptionInstanceDocument(wrongInitialState)).toBe(false);
    expect(assertIsSubscriptionInstanceDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isSubscriptionInstanceDocument(missingIdInHeader)).toBe(false);
    expect(assertIsSubscriptionInstanceDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isSubscriptionInstanceDocument(missingNameInHeader)).toBe(false);
    expect(assertIsSubscriptionInstanceDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isSubscriptionInstanceDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsSubscriptionInstanceDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(
      isSubscriptionInstanceDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toBe(false);
    expect(
      assertIsSubscriptionInstanceDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
