import {
  useDocumentOfType,
  useSelectedDocumentId,
} from "@powerhousedao/reactor-browser";
import type {
  AccountTransactionsAction,
  AccountTransactionsDocument,
} from "document-models/account-transactions";

export function useAccountTransactionsDocument(
  documentId: string | null | undefined,
) {
  return useDocumentOfType<
    AccountTransactionsDocument,
    AccountTransactionsAction
  >(documentId, "powerhouse/account-transactions");
}

export function useSelectedAccountTransactionsDocument() {
  const selectedDocumentId = useSelectedDocumentId();
  return useAccountTransactionsDocument(selectedDocumentId);
}
