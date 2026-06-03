import {
  useDocumentOfType,
  useSelectedDocumentId,
} from "@powerhousedao/reactor-browser";
import type {
  AccountsAction,
  AccountsDocument,
} from "document-models/accounts";

export function useAccountsDocument(documentId: string | null | undefined) {
  return useDocumentOfType<AccountsDocument, AccountsAction>(
    documentId,
    "powerhouse/accounts",
  );
}

export function useSelectedAccountsDocument() {
  const selectedDocumentId = useSelectedDocumentId();
  return useAccountsDocument(selectedDocumentId);
}
