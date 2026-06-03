import { generateMock } from "document-model";
import {
  addOwnerId,
  AddOwnerIdInputSchema,
  isSnapshotReportDocument,
  reducer,
  removeOwnerId,
  RemoveOwnerIdInputSchema,
  setAccountsDocument,
  SetAccountsDocumentInputSchema,
  setPeriod,
  setPeriodEnd,
  SetPeriodEndInputSchema,
  SetPeriodInputSchema,
  setPeriodStart,
  SetPeriodStartInputSchema,
  setReportConfig,
  SetReportConfigInputSchema,
  utils,
} from "document-models/snapshot-report/v1";
import { describe, expect, it } from "vitest";

describe("ConfigurationOperations", () => {
  it("should handle setReportConfig operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetReportConfigInputSchema());

    const updatedDocument = reducer(document, setReportConfig(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_REPORT_CONFIG",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setAccountsDocument operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetAccountsDocumentInputSchema());

    const updatedDocument = reducer(document, setAccountsDocument(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_ACCOUNTS_DOCUMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setPeriod operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetPeriodInputSchema());

    const updatedDocument = reducer(document, setPeriod(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_PERIOD");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addOwnerId operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddOwnerIdInputSchema());

    const updatedDocument = reducer(document, addOwnerId(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_OWNER_ID",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setPeriodStart operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetPeriodStartInputSchema());

    const updatedDocument = reducer(document, setPeriodStart(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PERIOD_START",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setPeriodEnd operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetPeriodEndInputSchema());

    const updatedDocument = reducer(document, setPeriodEnd(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PERIOD_END",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeOwnerId operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveOwnerIdInputSchema());

    const updatedDocument = reducer(document, removeOwnerId(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_OWNER_ID",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
