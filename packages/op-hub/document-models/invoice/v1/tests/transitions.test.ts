import { generateMock } from "document-model";
import {
  accept,
  AcceptInputSchema,
  cancel,
  CancelInputSchema,
  closePayment,
  ClosePaymentInputSchema,
  confirmPayment,
  ConfirmPaymentInputSchema,
  isInvoiceDocument,
  issue,
  IssueInputSchema,
  reapprovePayment,
  ReapprovePaymentInputSchema,
  reducer,
  registerPaymentTx,
  RegisterPaymentTxInputSchema,
  reinstate,
  ReinstateInputSchema,
  reject,
  RejectInputSchema,
  reportPaymentIssue,
  ReportPaymentIssueInputSchema,
  reset,
  ResetInputSchema,
  schedulePayment,
  SchedulePaymentInputSchema,
  utils,
} from "document-models/invoice/v1";
import { describe, expect, it } from "vitest";

describe("TransitionsOperations", () => {
  it("should handle accept operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AcceptInputSchema());

    const updatedDocument = reducer(document, accept(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ACCEPT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle cancel operation", () => {
    const document = utils.createDocument();
    const input = generateMock(CancelInputSchema());

    const updatedDocument = reducer(document, cancel(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("CANCEL");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle closePayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ClosePaymentInputSchema());

    const updatedDocument = reducer(document, closePayment(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CLOSE_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle confirmPayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ConfirmPaymentInputSchema());

    const updatedDocument = reducer(document, confirmPayment(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "CONFIRM_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle issue operation", () => {
    const document = utils.createDocument();
    const input = generateMock(IssueInputSchema());

    const updatedDocument = reducer(document, issue(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ISSUE");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reapprovePayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReapprovePaymentInputSchema());

    const updatedDocument = reducer(document, reapprovePayment(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REAPPROVE_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle registerPaymentTx operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RegisterPaymentTxInputSchema());

    const updatedDocument = reducer(document, registerPaymentTx(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REGISTER_PAYMENT_TX",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reinstate operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReinstateInputSchema());

    const updatedDocument = reducer(document, reinstate(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("REINSTATE");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reject operation", () => {
    const document = utils.createDocument();
    const input = generateMock(RejectInputSchema());

    const updatedDocument = reducer(document, reject(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("REJECT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reportPaymentIssue operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ReportPaymentIssueInputSchema());

    const updatedDocument = reducer(document, reportPaymentIssue(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REPORT_PAYMENT_ISSUE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle reset operation", () => {
    const document = utils.createDocument();
    const input = generateMock(ResetInputSchema());

    const updatedDocument = reducer(document, reset(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("RESET");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle schedulePayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SchedulePaymentInputSchema());

    const updatedDocument = reducer(document, schedulePayment(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SCHEDULE_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
