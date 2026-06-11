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
  PaymentAccountAction,
  PaymentAccountDocument,
} from "document-models/payment-account/v1";
import {
  assertIsPaymentAccountDocument,
  isPaymentAccountDocument,
} from "./gen/document-schema.js";

/** Hook to get a PaymentAccount document by its id */
export function usePaymentAccountDocumentById(
  documentId: string | null | undefined,
):
  | [PaymentAccountDocument, DocumentDispatch<PaymentAccountAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isPaymentAccountDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected PaymentAccount document */
export function useSelectedPaymentAccountDocument(): [
  PaymentAccountDocument,
  DocumentDispatch<PaymentAccountAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsPaymentAccountDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all PaymentAccount documents in the selected drive */
export function usePaymentAccountDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isPaymentAccountDocument);
}

/** Hook to get all PaymentAccount documents in the selected folder */
export function usePaymentAccountDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isPaymentAccountDocument);
}
