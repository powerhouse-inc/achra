import { generateMock } from "document-model";
import {
  addTransaction,
  AddTransactionInputSchema,
  isSnapshotReportDocument,
  recalculateFlowTypes,
  RecalculateFlowTypesInputSchema,
  reducer,
  removeTransaction,
  RemoveTransactionInputSchema,
  updateTransactionFlowType,
  UpdateTransactionFlowTypeInputSchema,
  utils,
} from "document-models/snapshot-report/v1";
import { describe, expect, it } from "vitest";

describe("TransactionsOperations", () => {
  it("should handle addTransaction operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddTransactionInputSchema());

    const updatedDocument = reducer(document, addTransaction(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_TRANSACTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeTransaction operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveTransactionInputSchema());

    const updatedDocument = reducer(document, removeTransaction(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_TRANSACTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateTransactionFlowType operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTransactionFlowTypeInputSchema());

    const updatedDocument = reducer(document, updateTransactionFlowType(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TRANSACTION_FLOW_TYPE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle recalculateFlowTypes operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RecalculateFlowTypesInputSchema());

    const updatedDocument = reducer(document, recalculateFlowTypes(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "RECALCULATE_FLOW_TYPES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
