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
  ResourceInstanceAction,
  ResourceInstanceDocument,
} from "document-models/resource-instance/v1";
import {
  assertIsResourceInstanceDocument,
  isResourceInstanceDocument,
} from "./gen/document-schema.js";

/** Hook to get a ResourceInstance document by its id */
export function useResourceInstanceDocumentById(
  documentId: string | null | undefined,
):
  | [ResourceInstanceDocument, DocumentDispatch<ResourceInstanceAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isResourceInstanceDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ResourceInstance document */
export function useSelectedResourceInstanceDocument(): [
  ResourceInstanceDocument,
  DocumentDispatch<ResourceInstanceAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsResourceInstanceDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all ResourceInstance documents in the selected drive */
export function useResourceInstanceDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isResourceInstanceDocument);
}

/** Hook to get all ResourceInstance documents in the selected folder */
export function useResourceInstanceDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isResourceInstanceDocument);
}
