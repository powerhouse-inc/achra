/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { DocumentDispatch } from "@powerhousedao/reactor-browser";
import {
  useDocumentById,
  useDocumentsInSelectedDrive,
  useDocumentsInSelectedFolder,
  useSelectedDocument,
} from "@powerhousedao/reactor-browser";
import type {
  AccountsAction,
  AccountsDocument,
} from "document-models/accounts/v1";
import {
  assertIsAccountsDocument,
  isAccountsDocument,
} from "./gen/document-schema.js";

/** Hook to get a Accounts document by its id */
export function useAccountsDocumentById(
  documentId: string | null | undefined,
):
  | [AccountsDocument, DocumentDispatch<AccountsAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isAccountsDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected Accounts document */
export function useSelectedAccountsDocument(): [
  AccountsDocument,
  DocumentDispatch<AccountsAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsAccountsDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all Accounts documents in the selected drive */
export function useAccountsDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isAccountsDocument);
}

/** Hook to get all Accounts documents in the selected folder */
export function useAccountsDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isAccountsDocument);
}
