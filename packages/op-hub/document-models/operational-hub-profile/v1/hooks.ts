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
  OperationalHubProfileAction,
  OperationalHubProfileDocument,
} from "document-models/operational-hub-profile/v1";
import {
  assertIsOperationalHubProfileDocument,
  isOperationalHubProfileDocument,
} from "./gen/document-schema.js";

/** Hook to get a OperationalHubProfile document by its id */
export function useOperationalHubProfileDocumentById(
  documentId: string | null | undefined,
):
  | [
      OperationalHubProfileDocument,
      DocumentDispatch<OperationalHubProfileAction>,
    ]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isOperationalHubProfileDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected OperationalHubProfile document */
export function useSelectedOperationalHubProfileDocument(): [
  OperationalHubProfileDocument,
  DocumentDispatch<OperationalHubProfileAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsOperationalHubProfileDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all OperationalHubProfile documents in the selected drive */
export function useOperationalHubProfileDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isOperationalHubProfileDocument);
}

/** Hook to get all OperationalHubProfile documents in the selected folder */
export function useOperationalHubProfileDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isOperationalHubProfileDocument);
}
