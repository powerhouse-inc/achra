import { generateMock } from "document-model";
import {
  addTransaction,
  AddTransactionInputSchema,
  deleteTransaction,
  DeleteTransactionInputSchema,
  isAccountTransactionsDocument,
  reducer,
  updateTransaction,
  UpdateTransactionInputSchema,
  updateTransactionPeriod,
  UpdateTransactionPeriodInputSchema,
  utils,
} from "document-models/account-transactions/v1";
import { describe, expect, it } from "vitest";

describe("TransactionsOperations", () => {
  it("should handle addTransaction operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddTransactionInputSchema());

    const updatedDocument = reducer(document, addTransaction(input));

    expect(isAccountTransactionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_TRANSACTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateTransaction operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTransactionInputSchema());

    const updatedDocument = reducer(document, updateTransaction(input));

    expect(isAccountTransactionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TRANSACTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteTransaction operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteTransactionInputSchema());

    const updatedDocument = reducer(document, deleteTransaction(input));

    expect(isAccountTransactionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_TRANSACTION",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateTransactionPeriod operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateTransactionPeriodInputSchema());

    const updatedDocument = reducer(document, updateTransactionPeriod(input));

    expect(isAccountTransactionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_TRANSACTION_PERIOD",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
