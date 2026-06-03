import { generateMock } from "document-model";
import {
  addAccount,
  AddAccountInputSchema,
  deleteAccount,
  DeleteAccountInputSchema,
  isAccountsDocument,
  reducer,
  updateAccount,
  UpdateAccountInputSchema,
  updateKycStatus,
  UpdateKycStatusInputSchema,
  utils,
} from "document-models/accounts/v1";
import { describe, expect, it } from "vitest";

describe("AccountsOperations", () => {
  it("should handle addAccount operation", () => {
    const document = utils.createDocument();
    const input = generateMock(AddAccountInputSchema());

    const updatedDocument = reducer(document, addAccount(input));

    expect(isAccountsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "ADD_ACCOUNT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateAccount operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateAccountInputSchema());

    const updatedDocument = reducer(document, updateAccount(input));

    expect(isAccountsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_ACCOUNT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle deleteAccount operation", () => {
    const document = utils.createDocument();
    const input = generateMock(DeleteAccountInputSchema());

    const updatedDocument = reducer(document, deleteAccount(input));

    expect(isAccountsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "DELETE_ACCOUNT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });

  it("should handle updateKycStatus operation", () => {
    const document = utils.createDocument();
    const input = generateMock(UpdateKycStatusInputSchema());

    const updatedDocument = reducer(document, updateKycStatus(input));

    expect(isAccountsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "UPDATE_KYC_STATUS",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
