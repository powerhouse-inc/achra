/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { snapshotReportDocumentType } from "./document-type.js";
import { SnapshotReportStateSchema } from "./schema/zod.js";
import type { SnapshotReportDocument, SnapshotReportPHState } from "./types.js";

/** Schema for validating the header object of a SnapshotReport document */
export const SnapshotReportDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(snapshotReportDocumentType),
  });

/** Schema for validating the state object of a SnapshotReport document */
export const SnapshotReportPHStateSchema = BaseDocumentStateSchema.extend({
  global: SnapshotReportStateSchema(),
});

export const SnapshotReportDocumentSchema = z.object({
  header: SnapshotReportDocumentHeaderSchema,
  state: SnapshotReportPHStateSchema,
  initialState: SnapshotReportPHStateSchema,
});

/** Simple helper function to check if a state object is a SnapshotReport document state object */
export function isSnapshotReportState(
  state: unknown,
): state is SnapshotReportPHState {
  return SnapshotReportPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a SnapshotReport document state object */
export function assertIsSnapshotReportState(
  state: unknown,
): asserts state is SnapshotReportPHState {
  SnapshotReportPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a SnapshotReport document */
export function isSnapshotReportDocument(
  document: unknown,
): document is SnapshotReportDocument {
  return SnapshotReportDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a SnapshotReport document */
export function assertIsSnapshotReportDocument(
  document: unknown,
): asserts document is SnapshotReportDocument {
  SnapshotReportDocumentSchema.parse(document);
}
