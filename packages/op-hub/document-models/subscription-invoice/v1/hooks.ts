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
  SubscriptionInvoiceAction,
  SubscriptionInvoiceDocument,
} from "document-models/subscription-invoice/v1";
import {
  assertIsSubscriptionInvoiceDocument,
  isSubscriptionInvoiceDocument,
} from "./gen/document-schema.js";

/** Hook to get a SubscriptionInvoice document by its id */
export function useSubscriptionInvoiceDocumentById(
  documentId: string | null | undefined,
):
  | [SubscriptionInvoiceDocument, DocumentDispatch<SubscriptionInvoiceAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isSubscriptionInvoiceDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected SubscriptionInvoice document */
export function useSelectedSubscriptionInvoiceDocument(): [
  SubscriptionInvoiceDocument,
  DocumentDispatch<SubscriptionInvoiceAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsSubscriptionInvoiceDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all SubscriptionInvoice documents in the selected drive */
export function useSubscriptionInvoiceDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isSubscriptionInvoiceDocument);
}

/** Hook to get all SubscriptionInvoice documents in the selected folder */
export function useSubscriptionInvoiceDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isSubscriptionInvoiceDocument);
}
