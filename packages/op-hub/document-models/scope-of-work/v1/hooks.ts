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
  ScopeOfWorkAction,
  ScopeOfWorkDocument,
} from "document-models/scope-of-work/v1";
import {
  assertIsScopeOfWorkDocument,
  isScopeOfWorkDocument,
} from "./gen/document-schema.js";

/** Hook to get a ScopeOfWork document by its id */
export function useScopeOfWorkDocumentById(
  documentId: string | null | undefined,
):
  | [ScopeOfWorkDocument, DocumentDispatch<ScopeOfWorkAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isScopeOfWorkDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ScopeOfWork document */
export function useSelectedScopeOfWorkDocument(): [
  ScopeOfWorkDocument,
  DocumentDispatch<ScopeOfWorkAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsScopeOfWorkDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all ScopeOfWork documents in the selected drive */
export function useScopeOfWorkDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isScopeOfWorkDocument);
}

/** Hook to get all ScopeOfWork documents in the selected folder */
export function useScopeOfWorkDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isScopeOfWorkDocument);
}
