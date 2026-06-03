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
  BuilderProfileAction,
  BuilderProfileDocument,
} from "document-models/builder-profile/v1";
import {
  assertIsBuilderProfileDocument,
  isBuilderProfileDocument,
} from "./gen/document-schema.js";

/** Hook to get a BuilderProfile document by its id */
export function useBuilderProfileDocumentById(
  documentId: string | null | undefined,
):
  | [BuilderProfileDocument, DocumentDispatch<BuilderProfileAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isBuilderProfileDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected BuilderProfile document */
export function useSelectedBuilderProfileDocument(): [
  BuilderProfileDocument,
  DocumentDispatch<BuilderProfileAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsBuilderProfileDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all BuilderProfile documents in the selected drive */
export function useBuilderProfileDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isBuilderProfileDocument);
}

/** Hook to get all BuilderProfile documents in the selected folder */
export function useBuilderProfileDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isBuilderProfileDocument);
}
