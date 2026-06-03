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
  ResourceTemplateAction,
  ResourceTemplateDocument,
} from "document-models/resource-template/v1";
import {
  assertIsResourceTemplateDocument,
  isResourceTemplateDocument,
} from "./gen/document-schema.js";

/** Hook to get a ResourceTemplate document by its id */
export function useResourceTemplateDocumentById(
  documentId: string | null | undefined,
):
  | [ResourceTemplateDocument, DocumentDispatch<ResourceTemplateAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isResourceTemplateDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected ResourceTemplate document */
export function useSelectedResourceTemplateDocument(): [
  ResourceTemplateDocument,
  DocumentDispatch<ResourceTemplateAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsResourceTemplateDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all ResourceTemplate documents in the selected drive */
export function useResourceTemplateDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isResourceTemplateDocument);
}

/** Hook to get all ResourceTemplate documents in the selected folder */
export function useResourceTemplateDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isResourceTemplateDocument);
}
