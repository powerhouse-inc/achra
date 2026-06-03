/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsFacetDocument,
  assertIsFacetState,
  facetDocumentType,
  initialGlobalState,
  initialLocalState,
  isFacetDocument,
  isFacetState,
  utils,
} from "document-models/facet/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("Facet Document Model", () => {
  it("should create a new Facet document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(facetDocumentType);
  });

  it("should create a new Facet document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isFacetDocument(document)).toBe(true);
    expect(isFacetState(document.state)).toBe(true);
  });
  it("should reject a document that is not a Facet document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsFacetDocument(wrongDocumentType)).toThrow();
      expect(isFacetDocument(wrongDocumentType)).toBe(false);
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
    expect(isFacetState(wrongState.state)).toBe(false);
    expect(assertIsFacetState(wrongState.state)).toThrow();
    expect(isFacetDocument(wrongState)).toBe(false);
    expect(assertIsFacetDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isFacetState(wrongInitialState.state)).toBe(false);
    expect(assertIsFacetState(wrongInitialState.state)).toThrow();
    expect(isFacetDocument(wrongInitialState)).toBe(false);
    expect(assertIsFacetDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isFacetDocument(missingIdInHeader)).toBe(false);
    expect(assertIsFacetDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isFacetDocument(missingNameInHeader)).toBe(false);
    expect(assertIsFacetDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isFacetDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(assertIsFacetDocument(missingCreatedAtUtcIsoInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isFacetDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsFacetDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
