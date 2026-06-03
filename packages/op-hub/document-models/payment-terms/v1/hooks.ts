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
  PaymentTermsAction,
  PaymentTermsDocument,
} from "document-models/payment-terms/v1";
import {
  assertIsPaymentTermsDocument,
  isPaymentTermsDocument,
} from "./gen/document-schema.js";

/** Hook to get a PaymentTerms document by its id */
export function usePaymentTermsDocumentById(
  documentId: string | null | undefined,
):
  | [PaymentTermsDocument, DocumentDispatch<PaymentTermsAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isPaymentTermsDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected PaymentTerms document */
export function useSelectedPaymentTermsDocument(): [
  PaymentTermsDocument,
  DocumentDispatch<PaymentTermsAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsPaymentTermsDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all PaymentTerms documents in the selected drive */
export function usePaymentTermsDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isPaymentTermsDocument);
}

/** Hook to get all PaymentTerms documents in the selected folder */
export function usePaymentTermsDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isPaymentTermsDocument);
}
