/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { accountTransactionsDocumentType } from "./document-type.js";
import { AccountTransactionsStateSchema } from "./schema/zod.js";
import type {
  AccountTransactionsDocument,
  AccountTransactionsPHState,
} from "./types.js";

/** Schema for validating the header object of a AccountTransactions document */
export const AccountTransactionsDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(accountTransactionsDocumentType),
  });

/** Schema for validating the state object of a AccountTransactions document */
export const AccountTransactionsPHStateSchema = BaseDocumentStateSchema.extend({
  global: AccountTransactionsStateSchema(),
});

export const AccountTransactionsDocumentSchema = z.object({
  header: AccountTransactionsDocumentHeaderSchema,
  state: AccountTransactionsPHStateSchema,
  initialState: AccountTransactionsPHStateSchema,
});

/** Simple helper function to check if a state object is a AccountTransactions document state object */
export function isAccountTransactionsState(
  state: unknown,
): state is AccountTransactionsPHState {
  return AccountTransactionsPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a AccountTransactions document state object */
export function assertIsAccountTransactionsState(
  state: unknown,
): asserts state is AccountTransactionsPHState {
  AccountTransactionsPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a AccountTransactions document */
export function isAccountTransactionsDocument(
  document: unknown,
): document is AccountTransactionsDocument {
  return AccountTransactionsDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a AccountTransactions document */
export function assertIsAccountTransactionsDocument(
  document: unknown,
): asserts document is AccountTransactionsDocument {
  AccountTransactionsDocumentSchema.parse(document);
}
