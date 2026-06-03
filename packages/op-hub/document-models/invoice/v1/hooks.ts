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
  InvoiceAction,
  InvoiceDocument,
} from "document-models/invoice/v1";
import {
  assertIsInvoiceDocument,
  isInvoiceDocument,
} from "./gen/document-schema.js";

/** Hook to get a Invoice document by its id */
export function useInvoiceDocumentById(
  documentId: string | null | undefined,
): [InvoiceDocument, DocumentDispatch<InvoiceAction>] | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isInvoiceDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected Invoice document */
export function useSelectedInvoiceDocument(): [
  InvoiceDocument,
  DocumentDispatch<InvoiceAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsInvoiceDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all Invoice documents in the selected drive */
export function useInvoiceDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isInvoiceDocument);
}

/** Hook to get all Invoice documents in the selected folder */
export function useInvoiceDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isInvoiceDocument);
}
