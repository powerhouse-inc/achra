import { generateMock } from "document-model";
import {
  isAccountTransactionsDocument,
  reducer,
  setAccount,
  SetAccountInputSchema,
  utils,
} from "document-models/account-transactions/v1";
import { describe, expect, it } from "vitest";

describe("AccountOperations", () => {
  it("should handle setAccount operation", () => {
    const document = utils.createDocument();
    const input = generateMock(SetAccountInputSchema());

    const updatedDocument = reducer(document, setAccount(input));

    expect(isAccountTransactionsDocument(updatedDocument)).toBe(true);
    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_ACCOUNT",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(
      input,
    );
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
