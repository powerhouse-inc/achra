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
  NetworkProfileAction,
  NetworkProfileDocument,
} from "document-models/network-profile/v1";
import {
  assertIsNetworkProfileDocument,
  isNetworkProfileDocument,
} from "./gen/document-schema.js";

/** Hook to get a NetworkProfile document by its id */
export function useNetworkProfileDocumentById(
  documentId: string | null | undefined,
):
  | [NetworkProfileDocument, DocumentDispatch<NetworkProfileAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isNetworkProfileDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected NetworkProfile document */
export function useSelectedNetworkProfileDocument(): [
  NetworkProfileDocument,
  DocumentDispatch<NetworkProfileAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsNetworkProfileDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all NetworkProfile documents in the selected drive */
export function useNetworkProfileDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isNetworkProfileDocument);
}

/** Hook to get all NetworkProfile documents in the selected folder */
export function useNetworkProfileDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isNetworkProfileDocument);
}
