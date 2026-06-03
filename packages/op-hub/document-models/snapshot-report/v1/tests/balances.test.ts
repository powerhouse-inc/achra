import { generateMock } from "document-model";
import {
  isSnapshotReportDocument,
  reducer,
  removeEndingBalance,
  RemoveEndingBalanceInputSchema,
  removeStartingBalance,
  RemoveStartingBalanceInputSchema,
  setEndingBalance,
  SetEndingBalanceInputSchema,
  setStartingBalance,
  SetStartingBalanceInputSchema,
  utils,
} from "document-models/snapshot-report/v1";
import { describe, expect, it } from "vitest";

describe("BalancesOperations", () => {
  it("should handle setStartingBalance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetStartingBalanceInputSchema());

    const updatedDocument = reducer(document, setStartingBalance(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_STARTING_BALANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setEndingBalance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetEndingBalanceInputSchema());

    const updatedDocument = reducer(document, setEndingBalance(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_ENDING_BALANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeStartingBalance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveStartingBalanceInputSchema());

    const updatedDocument = reducer(document, removeStartingBalance(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_STARTING_BALANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeEndingBalance operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveEndingBalanceInputSchema());

    const updatedDocument = reducer(document, removeEndingBalance(input));

    expect(isSnapshotReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_ENDING_BALANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
