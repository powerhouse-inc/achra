/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { workstreamDocumentType } from "./document-type.js";
import { WorkstreamStateSchema } from "./schema/zod.js";
import type { WorkstreamDocument, WorkstreamPHState } from "./types.js";

/** Schema for validating the header object of a Workstream document */
export const WorkstreamDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(workstreamDocumentType),
});

/** Schema for validating the state object of a Workstream document */
export const WorkstreamPHStateSchema = BaseDocumentStateSchema.extend({
  global: WorkstreamStateSchema(),
});

export const WorkstreamDocumentSchema = z.object({
  header: WorkstreamDocumentHeaderSchema,
  state: WorkstreamPHStateSchema,
  initialState: WorkstreamPHStateSchema,
});

/** Simple helper function to check if a state object is a Workstream document state object */
export function isWorkstreamState(state: unknown): state is WorkstreamPHState {
  return WorkstreamPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a Workstream document state object */
export function assertIsWorkstreamState(
  state: unknown,
): asserts state is WorkstreamPHState {
  WorkstreamPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a Workstream document */
export function isWorkstreamDocument(
  document: unknown,
): document is WorkstreamDocument {
  return WorkstreamDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a Workstream document */
export function assertIsWorkstreamDocument(
  document: unknown,
): asserts document is WorkstreamDocument {
  WorkstreamDocumentSchema.parse(document);
}
