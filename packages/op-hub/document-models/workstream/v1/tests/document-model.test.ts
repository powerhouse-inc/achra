/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsWorkstreamDocument,
  assertIsWorkstreamState,
  initialGlobalState,
  initialLocalState,
  isWorkstreamDocument,
  isWorkstreamState,
  utils,
  workstreamDocumentType,
} from "document-models/workstream/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("Workstream Document Model", () => {
  it("should create a new Workstream document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(workstreamDocumentType);
  });

  it("should create a new Workstream document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isWorkstreamDocument(document)).toBe(true);
    expect(isWorkstreamState(document.state)).toBe(true);
  });
  it("should reject a document that is not a Workstream document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsWorkstreamDocument(wrongDocumentType)).toThrow();
      expect(isWorkstreamDocument(wrongDocumentType)).toBe(false);
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
    expect(isWorkstreamState(wrongState.state)).toBe(false);
    expect(assertIsWorkstreamState(wrongState.state)).toThrow();
    expect(isWorkstreamDocument(wrongState)).toBe(false);
    expect(assertIsWorkstreamDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isWorkstreamState(wrongInitialState.state)).toBe(false);
    expect(assertIsWorkstreamState(wrongInitialState.state)).toThrow();
    expect(isWorkstreamDocument(wrongInitialState)).toBe(false);
    expect(assertIsWorkstreamDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isWorkstreamDocument(missingIdInHeader)).toBe(false);
    expect(assertIsWorkstreamDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isWorkstreamDocument(missingNameInHeader)).toBe(false);
    expect(assertIsWorkstreamDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isWorkstreamDocument(missingCreatedAtUtcIsoInHeader)).toBe(false);
    expect(
      assertIsWorkstreamDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isWorkstreamDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsWorkstreamDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
