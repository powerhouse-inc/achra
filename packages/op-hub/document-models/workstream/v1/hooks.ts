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
  WorkstreamAction,
  WorkstreamDocument,
} from "document-models/workstream/v1";
import {
  assertIsWorkstreamDocument,
  isWorkstreamDocument,
} from "./gen/document-schema.js";

/** Hook to get a Workstream document by its id */
export function useWorkstreamDocumentById(
  documentId: string | null | undefined,
):
  | [WorkstreamDocument, DocumentDispatch<WorkstreamAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isWorkstreamDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected Workstream document */
export function useSelectedWorkstreamDocument(): [
  WorkstreamDocument,
  DocumentDispatch<WorkstreamAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsWorkstreamDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all Workstream documents in the selected drive */
export function useWorkstreamDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isWorkstreamDocument);
}

/** Hook to get all Workstream documents in the selected folder */
export function useWorkstreamDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isWorkstreamDocument);
}
