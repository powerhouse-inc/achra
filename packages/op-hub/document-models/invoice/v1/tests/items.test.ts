import { generateMock } from "document-model";
import {
  addLineItem,
  AddLineItemInputSchema,
  deleteLineItem,
  DeleteLineItemInputSchema,
  editLineItem,
  EditLineItemInputSchema,
  isInvoiceDocument,
  reducer,
  setInvoiceTag,
  SetInvoiceTagInputSchema,
  setLineItemTag,
  SetLineItemTagInputSchema,
  utils,
} from "document-models/invoice/v1";
import { describe, expect, it } from "vitest";

describe("ItemsOperations", () => {
  it("should handle addLineItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddLineItemInputSchema());

    const updatedDocument = reducer(document, addLineItem(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_LINE_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteLineItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteLineItemInputSchema());

    const updatedDocument = reducer(document, deleteLineItem(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_LINE_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editLineItem operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditLineItemInputSchema());

    const updatedDocument = reducer(document, editLineItem(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_LINE_ITEM",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setInvoiceTag operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetInvoiceTagInputSchema());

    const updatedDocument = reducer(document, setInvoiceTag(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_INVOICE_TAG",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle setLineItemTag operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetLineItemTagInputSchema());

    const updatedDocument = reducer(document, setLineItemTag(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_LINE_ITEM_TAG",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
