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
  SubscriptionInstanceAction,
  SubscriptionInstanceDocument,
} from "document-models/subscription-instance/v1";
import {
  assertIsSubscriptionInstanceDocument,
  isSubscriptionInstanceDocument,
} from "./gen/document-schema.js";

/** Hook to get a SubscriptionInstance document by its id */
export function useSubscriptionInstanceDocumentById(
  documentId: string | null | undefined,
):
  | [SubscriptionInstanceDocument, DocumentDispatch<SubscriptionInstanceAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isSubscriptionInstanceDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected SubscriptionInstance document */
export function useSelectedSubscriptionInstanceDocument(): [
  SubscriptionInstanceDocument,
  DocumentDispatch<SubscriptionInstanceAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsSubscriptionInstanceDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all SubscriptionInstance documents in the selected drive */
export function useSubscriptionInstanceDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isSubscriptionInstanceDocument);
}

/** Hook to get all SubscriptionInstance documents in the selected folder */
export function useSubscriptionInstanceDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isSubscriptionInstanceDocument);
}
