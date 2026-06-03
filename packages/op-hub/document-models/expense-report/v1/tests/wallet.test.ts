import { generateMock } from "document-model";
import {
  addBillingStatement,
  AddBillingStatementInputSchema,
  addLineItem,
  addLineItemGroup,
  AddLineItemGroupInputSchema,
  AddLineItemInputSchema,
  addWallet,
  AddWalletInputSchema,
  isExpenseReportDocument,
  reducer,
  removeBillingStatement,
  RemoveBillingStatementInputSchema,
  removeGroupTotals,
  RemoveGroupTotalsInputSchema,
  removeLineItem,
  removeLineItemGroup,
  RemoveLineItemGroupInputSchema,
  RemoveLineItemInputSchema,
  removeWallet,
  RemoveWalletInputSchema,
  setGroupTotals,
  SetGroupTotalsInputSchema,
  setOwnerId,
  SetOwnerIdInputSchema,
  setPeriod,
  setPeriodEnd,
  SetPeriodEndInputSchema,
  SetPeriodInputSchema,
  setPeriodStart,
  SetPeriodStartInputSchema,
  setStatus,
  SetStatusInputSchema,
  updateLineItem,
  updateLineItemGroup,
  UpdateLineItemGroupInputSchema,
  UpdateLineItemInputSchema,
  updateWallet,
  UpdateWalletInputSchema,
  utils,
} from "document-models/expense-report/v1";
import { describe, expect, it } from "vitest";

describe("WalletOperations", () => {
  it("should handle addWallet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddWalletInputSchema());

    const updatedDocument = reducer(document, addWallet(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_WALLET");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeWallet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveWalletInputSchema());

    const updatedDocument = reducer(document, removeWallet(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_WALLET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addBillingStatement operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddBillingStatementInputSchema());

    const updatedDocument = reducer(document, addBillingStatement(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_BILLING_STATEMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeBillingStatement operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveBillingStatementInputSchema());

    const updatedDocument = reducer(document, removeBillingStatement(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_BILLING_STATEMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addLineItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddLineItemInputSchema());

    const updatedDocument = reducer(document, addLineItem(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_LINE_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateLineItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateLineItemInputSchema());

    const updatedDocument = reducer(document, updateLineItem(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_LINE_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeLineItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveLineItemInputSchema());

    const updatedDocument = reducer(document, removeLineItem(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_LINE_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addLineItemGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddLineItemGroupInputSchema());

    const updatedDocument = reducer(document, addLineItemGroup(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_LINE_ITEM_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateLineItemGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateLineItemGroupInputSchema());

    const updatedDocument = reducer(document, updateLineItemGroup(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_LINE_ITEM_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeLineItemGroup operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveLineItemGroupInputSchema());

    const updatedDocument = reducer(document, removeLineItemGroup(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_LINE_ITEM_GROUP",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setGroupTotals operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetGroupTotalsInputSchema());

    const updatedDocument = reducer(document, setGroupTotals(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_GROUP_TOTALS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle removeGroupTotals operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RemoveGroupTotalsInputSchema());

    const updatedDocument = reducer(document, removeGroupTotals(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_GROUP_TOTALS",
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

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
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

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_PERIOD_END",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateWallet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateWalletInputSchema());

    const updatedDocument = reducer(document, updateWallet(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_WALLET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setOwnerId operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetOwnerIdInputSchema());

    const updatedDocument = reducer(document, setOwnerId(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_OWNER_ID",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetStatusInputSchema());

    const updatedDocument = reducer(document, setStatus(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_STATUS");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setPeriod operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetPeriodInputSchema());

    const updatedDocument = reducer(document, setPeriod(input));

    expect(isExpenseReportDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_PERIOD");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
