import { generateMock } from "document-model";
import {
  editIssuer,
  editIssuerBank,
  EditIssuerBankInputSchema,
  EditIssuerInputSchema,
  editIssuerWallet,
  EditIssuerWalletInputSchema,
  editPayer,
  editPayerBank,
  EditPayerBankInputSchema,
  EditPayerInputSchema,
  editPayerWallet,
  EditPayerWalletInputSchema,
  isInvoiceDocument,
  reducer,
  utils,
} from "document-models/invoice/v1";
import { describe, expect, it } from "vitest";

describe("PartiesOperations", () => {
  it("should handle editIssuerBank operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditIssuerBankInputSchema());

    const updatedDocument = reducer(document, editIssuerBank(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_ISSUER_BANK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editIssuer operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditIssuerInputSchema());

    const updatedDocument = reducer(document, editIssuer(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_ISSUER",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editIssuerWallet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditIssuerWalletInputSchema());

    const updatedDocument = reducer(document, editIssuerWallet(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_ISSUER_WALLET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editPayerBank operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditPayerBankInputSchema());

    const updatedDocument = reducer(document, editPayerBank(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_PAYER_BANK",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editPayer operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditPayerInputSchema());

    const updatedDocument = reducer(document, editPayer(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_PAYER");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle editPayerWallet operation", () => {
    const document = utils.createDocument();
    const input = generateMock(EditPayerWalletInputSchema());

    const updatedDocument = reducer(document, editPayerWallet(input));

    expect(isInvoiceDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "EDIT_PAYER_WALLET",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
