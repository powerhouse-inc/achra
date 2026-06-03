/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { accountsDocumentType } from "./document-type.js";
import { AccountsStateSchema } from "./schema/zod.js";
import type { AccountsDocument, AccountsPHState } from "./types.js";

/** Schema for validating the header object of a Accounts document */
export const AccountsDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(accountsDocumentType),
});

/** Schema for validating the state object of a Accounts document */
export const AccountsPHStateSchema = BaseDocumentStateSchema.extend({
  global: AccountsStateSchema(),
});

export const AccountsDocumentSchema = z.object({
  header: AccountsDocumentHeaderSchema,
  state: AccountsPHStateSchema,
  initialState: AccountsPHStateSchema,
});

/** Simple helper function to check if a state object is a Accounts document state object */
export function isAccountsState(state: unknown): state is AccountsPHState {
  return AccountsPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a Accounts document state object */
export function assertIsAccountsState(
  state: unknown,
): asserts state is AccountsPHState {
  AccountsPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a Accounts document */
export function isAccountsDocument(
  document: unknown,
): document is AccountsDocument {
  return AccountsDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a Accounts document */
export function assertIsAccountsDocument(
  document: unknown,
): asserts document is AccountsDocument {
  AccountsDocumentSchema.parse(document);
}
