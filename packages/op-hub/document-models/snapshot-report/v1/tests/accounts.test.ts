import { generateMock } from "document-model";
import {
  addSnapshotAccount,
  AddSnapshotAccountInputSchema,
  isSnapshotReportDocument,
  reducer,
  removeSnapshotAccount,
  RemoveSnapshotAccountInputSchema,
  updateSnapshotAccountType,
  UpdateSnapshotAccountTypeInputSchema,
  utils,
} from "document-models/snapshot-report/v1";
import { describe, expect, it } from "vitest";

describe("AccountsOperations", () => {
  it("should handle addSnapshotAccount operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddSnapshotAccountInputSchema());

    const updatedDocument = reducer(document, addSnapshotAccount(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_SNAPSHOT_ACCOUNT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateSnapshotAccountType operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateSnapshotAccountTypeInputSchema());

    const updatedDocument = reducer(document, updateSnapshotAccountType(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_SNAPSHOT_ACCOUNT_TYPE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeSnapshotAccount operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveSnapshotAccountInputSchema());

    const updatedDocument = reducer(document, removeSnapshotAccount(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_SNAPSHOT_ACCOUNT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
