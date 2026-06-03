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
  ServiceOfferingAction,
  ServiceOfferingDocument,
} from "document-models/service-offering/v1";
import {
  assertIsServiceOfferingDocument,
  isServiceOfferingDocument,
} from "./gen/document-schema.js";

/** Hook to get a ServiceOffering document by its id */
export function useServiceOfferingDocumentById(
  documentId: string | null | undefined,
):
  | [ServiceOfferingDocument, DocumentDispatch<ServiceOfferingAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isServiceOfferingDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ServiceOffering document */
export function useSelectedServiceOfferingDocument(): [
  ServiceOfferingDocument,
  DocumentDispatch<ServiceOfferingAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsServiceOfferingDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all ServiceOffering documents in the selected drive */
export function useServiceOfferingDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isServiceOfferingDocument);
}

/** Hook to get all ServiceOffering documents in the selected folder */
export function useServiceOfferingDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isServiceOfferingDocument);
}
