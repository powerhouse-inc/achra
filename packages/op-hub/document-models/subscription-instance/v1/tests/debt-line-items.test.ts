import { generateMock } from "document-model";
import {
  applyCredit,
  ApplyCreditInputSchema,
  confirmLineItemPayment,
  ConfirmLineItemPaymentInputSchema,
  isSubscriptionInstanceDocument,
  markLineItemInvoiced,
  MarkLineItemInvoicedInputSchema,
  reducer,
  reportPayment,
  ReportPaymentInputSchema,
  utils,
} from "document-models/subscription-instance/v1";
import { describe, expect, it } from "vitest";

describe("DebtLineItemsOperations", () => {
  it("should handle markLineItemInvoiced operation", () => {
    const document = utils.createDocument();
    const input = generateMock(MarkLineItemInvoicedInputSchema());

    const updatedDocument = reducer(document, markLineItemInvoiced(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "MARK_LINE_ITEM_INVOICED",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle confirmLineItemPayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ConfirmLineItemPaymentInputSchema());

    const updatedDocument = reducer(document, confirmLineItemPayment(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CONFIRM_LINE_ITEM_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reportPayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReportPaymentInputSchema());

    const updatedDocument = reducer(document, reportPayment(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REPORT_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle applyCredit operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ApplyCreditInputSchema());

    const updatedDocument = reducer(document, applyCredit(input));

    expect(isSubscriptionInstanceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "APPLY_CREDIT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
