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
  BuildersAction,
  BuildersDocument,
} from "document-models/builders/v1";
import {
  assertIsBuildersDocument,
  isBuildersDocument,
} from "./gen/document-schema.js";

/** Hook to get a Builders document by its id */
export function useBuildersDocumentById(
  documentId: string | null | undefined,
):
  | [BuildersDocument, DocumentDispatch<BuildersAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isBuildersDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected Builders document */
export function useSelectedBuildersDocument(): [
  BuildersDocument,
  DocumentDispatch<BuildersAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsBuildersDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all Builders documents in the selected drive */
export function useBuildersDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isBuildersDocument);
}

/** Hook to get all Builders documents in the selected folder */
export function useBuildersDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isBuildersDocument);
}
