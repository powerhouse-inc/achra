import type { PHDocument } from "document-model";

/**
 * Checks whether a document has been fully synced (has a CREATE_DOCUMENT
 * operation in its "document" scope).  Documents that appear in
 * `useDocumentsInSelectedDrive` as stubs—before the reactor has pulled
 * their operations—will fail client-side `moveRelationship`/`addRelationship`
 * (formerly `moveChildren`/`addChildren`) because the reactor can't rebuild
 * them.
 *
 * Use this guard before calling `onMoveNode` or similar operations on
 * recently-synced documents.
 */
export function isDocumentSynced(doc: PHDocument): boolean {
  return (doc.operations.document?.length ?? 0) > 0;
}

/**
 * Builds a set of document IDs that are fully synced (have operations in
 * their document scope).  Useful for filtering file nodes before attempting
 * move operations.
 */
export function getSyncedDocumentIds(
  documents: PHDocument[] | undefined,
): Set<string> {
  if (!documents) return new Set();
  return new Set(documents.filter(isDocumentSynced).map((d) => d.header.id));
}
