import { generateMock } from "document-model";
import {
  initializeSubscriptionInvoice,
  InitializeSubscriptionInvoiceInputSchema,
  isSubscriptionInvoiceDocument,
  markSubscriptionInvoiceIssued,
  MarkSubscriptionInvoiceIssuedInputSchema,
  markSubscriptionInvoicePaid,
  MarkSubscriptionInvoicePaidInputSchema,
  reducer,
  setSubscriptionInvoiceNotes,
  SetSubscriptionInvoiceNotesInputSchema,
  setSubscriptionInvoiceStripeId,
  SetSubscriptionInvoiceStripeIdInputSchema,
  utils,
  voidSubscriptionInvoice,
  VoidSubscriptionInvoiceInputSchema,
} from "document-models/subscription-invoice/v1";
import { describe, expect, it } from "vitest";

describe("InvoiceOperations", () => {
  it("should handle initializeSubscriptionInvoice operation", () => {
    const document = utils.createDocument();
    const input = generateMock(InitializeSubscriptionInvoiceInputSchema());

    const updatedDocument = reducer(
      document,
      initializeSubscriptionInvoice(input),
    );

    expect(isSubscriptionInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "INITIALIZE_SUBSCRIPTION_INVOICE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle markSubscriptionInvoiceIssued operation", () => {
    const document = utils.createDocument();
    const input = generateMock(MarkSubscriptionInvoiceIssuedInputSchema());

    const updatedDocument = reducer(
      document,
      markSubscriptionInvoiceIssued(input),
    );

    expect(isSubscriptionInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "MARK_SUBSCRIPTION_INVOICE_ISSUED",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle markSubscriptionInvoicePaid operation", () => {
    const document = utils.createDocument();
    const input = generateMock(MarkSubscriptionInvoicePaidInputSchema());

    const updatedDocument = reducer(
      document,
      markSubscriptionInvoicePaid(input),
    );

    expect(isSubscriptionInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "MARK_SUBSCRIPTION_INVOICE_PAID",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle voidSubscriptionInvoice operation", () => {
    const document = utils.createDocument();
    const input = generateMock(VoidSubscriptionInvoiceInputSchema());

    const updatedDocument = reducer(document, voidSubscriptionInvoice(input));

    expect(isSubscriptionInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "VOID_SUBSCRIPTION_INVOICE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setSubscriptionInvoiceStripeId operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetSubscriptionInvoiceStripeIdInputSchema());

    const updatedDocument = reducer(
      document,
      setSubscriptionInvoiceStripeId(input),
    );

    expect(isSubscriptionInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_SUBSCRIPTION_INVOICE_STRIPE_ID",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setSubscriptionInvoiceNotes operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetSubscriptionInvoiceNotesInputSchema());

    const updatedDocument = reducer(
      document,
      setSubscriptionInvoiceNotes(input),
    );

    expect(isSubscriptionInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_SUBSCRIPTION_INVOICE_NOTES",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
