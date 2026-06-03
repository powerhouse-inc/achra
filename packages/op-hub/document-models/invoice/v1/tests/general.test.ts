import { generateMock } from "document-model";
import {
  addPayment,
  AddPaymentInputSchema,
  editInvoice,
  EditInvoiceInputSchema,
  editPaymentData,
  EditPaymentDataInputSchema,
  editStatus,
  EditStatusInputSchema,
  isInvoiceDocument,
  reducer,
  setExportedData,
  SetExportedDataInputSchema,
  utils,
} from "document-models/invoice/v1";
import { describe, expect, it } from "vitest";

describe("GeneralOperations", () => {
  it("should handle editInvoice operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditInvoiceInputSchema());

    const updatedDocument = reducer(document, editInvoice(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_INVOICE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle addPayment operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddPaymentInputSchema());

    const updatedDocument = reducer(document, addPayment(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_PAYMENT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editPaymentData operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditPaymentDataInputSchema());

    const updatedDocument = reducer(document, editPaymentData(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_PAYMENT_DATA",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditStatusInputSchema());

    const updatedDocument = reducer(document, editStatus(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_STATUS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setExportedData operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetExportedDataInputSchema());

    const updatedDocument = reducer(document, setExportedData(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_EXPORTED_DATA",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
