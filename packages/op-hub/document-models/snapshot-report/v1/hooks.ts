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
  SnapshotReportAction,
  SnapshotReportDocument,
} from "document-models/snapshot-report/v1";
import {
  assertIsSnapshotReportDocument,
  isSnapshotReportDocument,
} from "./gen/document-schema.js";

/** Hook to get a SnapshotReport document by its id */
export function useSnapshotReportDocumentById(
  documentId: string | null | undefined,
):
  | [SnapshotReportDocument, DocumentDispatch<SnapshotReportAction>]
  | [undefined, undefined] {
  const [document, dispatch] = useDocumentById(documentId);
  if (!isSnapshotReportDocument(document)) return [undefined, undefined];
  return [document, dispatch];
}

/** Hook to get the selected SnapshotReport document */
export function useSelectedSnapshotReportDocument(): [
  SnapshotReportDocument,
  DocumentDispatch<SnapshotReportAction>,
] {
  const [document, dispatch] = useSelectedDocument();

  assertIsSnapshotReportDocument(document);
  return [document, dispatch] as const;
}

/** Hook to get all SnapshotReport documents in the selected drive */
export function useSnapshotReportDocumentsInSelectedDrive() {
  const documentsInSelectedDrive = useDocumentsInSelectedDrive();
  return documentsInSelectedDrive?.filter(isSnapshotReportDocument);
}

/** Hook to get all SnapshotReport documents in the selected folder */
export function useSnapshotReportDocumentsInSelectedFolder() {
  const documentsInSelectedFolder = useDocumentsInSelectedFolder();
  return documentsInSelectedFolder?.filter(isSnapshotReportDocument);
}
