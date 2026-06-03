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
  RequestForProposalsAction,
  RequestForProposalsDocument,
} from "document-models/request-for-proposals/v1";
import {
  assertIsRequestForProposalsDocument,
  isRequestForProposalsDocument,
} from "./gen/document-schema.js";

/** Hook to get a RequestForProposals document by its id */
export function useRequestForProposalsDocumentById(
  documentId: string | null | undefined,
):
  | [RequestForProposalsDocument, DocumentDispatch<RequestForProposalsAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isRequestForProposalsDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected RequestForProposals document */
export function useSelectedRequestForProposalsDocument(): [
  RequestForProposalsDocument,
  DocumentDispatch<RequestForProposalsAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsRequestForProposalsDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all RequestForProposals documents in the selected drive */
export function useRequestForProposalsDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isRequestForProposalsDocument);
}

/** Hook to get all RequestForProposals documents in the selected folder */
export function useRequestForProposalsDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isRequestForProposalsDocument);
}
