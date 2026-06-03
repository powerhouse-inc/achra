/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */
/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import {
  assertIsSnapshotReportDocument,
  assertIsSnapshotReportState,
  initialGlobalState,
  initialLocalState,
  isSnapshotReportDocument,
  isSnapshotReportState,
  snapshotReportDocumentType,
  utils,
} from "document-models/snapshot-report/v1";
import { describe, expect, it } from "vitest";
import { ZodError } from "zod";

describe("SnapshotReport Document Model", () => {
  it("should create a new SnapshotReport document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe(snapshotReportDocumentType);
  });

  it("should create a new SnapshotReport document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
    expect(isSnapshotReportDocument(document)).toBe(true);
    expect(isSnapshotReportState(document.state)).toBe(true);
  });
  it("should reject a document that is not a SnapshotReport document", () => {
    const wrongDocumentType = utils.createDocument();
    wrongDocumentType.header.documentType = "the-wrong-thing-1234";
    try {
      expect(assertIsSnapshotReportDocument(wrongDocumentType)).toThrow();
      expect(isSnapshotReportDocument(wrongDocumentType)).toBe(false);
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
    expect(isSnapshotReportState(wrongState.state)).toBe(false);
    expect(assertIsSnapshotReportState(wrongState.state)).toThrow();
    expect(isSnapshotReportDocument(wrongState)).toBe(false);
    expect(assertIsSnapshotReportDocument(wrongState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const wrongInitialState = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  wrongInitialState.initialState.global = {
    ...{ notWhat: "you want" },
  };
  try {
    expect(isSnapshotReportState(wrongInitialState.state)).toBe(false);
    expect(assertIsSnapshotReportState(wrongInitialState.state)).toThrow();
    expect(isSnapshotReportDocument(wrongInitialState)).toBe(false);
    expect(assertIsSnapshotReportDocument(wrongInitialState)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingIdInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingIdInHeader.header.id;
  try {
    expect(isSnapshotReportDocument(missingIdInHeader)).toBe(false);
    expect(assertIsSnapshotReportDocument(missingIdInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingNameInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingNameInHeader.header.name;
  try {
    expect(isSnapshotReportDocument(missingNameInHeader)).toBe(false);
    expect(assertIsSnapshotReportDocument(missingNameInHeader)).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingCreatedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingCreatedAtUtcIsoInHeader.header.createdAtUtcIso;
  try {
    expect(isSnapshotReportDocument(missingCreatedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsSnapshotReportDocument(missingCreatedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }

  const missingLastModifiedAtUtcIsoInHeader = utils.createDocument();
  // @ts-expect-error - we are testing the error case
  delete missingLastModifiedAtUtcIsoInHeader.header.lastModifiedAtUtcIso;
  try {
    expect(isSnapshotReportDocument(missingLastModifiedAtUtcIsoInHeader)).toBe(
      false,
    );
    expect(
      assertIsSnapshotReportDocument(missingLastModifiedAtUtcIsoInHeader),
    ).toThrow();
  } catch (error) {
    expect(error).toBeInstanceOf(ZodError);
  }
});
