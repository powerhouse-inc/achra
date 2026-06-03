/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { scopeOfWorkDocumentType } from "./document-type.js";
import { ScopeOfWorkStateSchema } from "./schema/zod.js";
import type { ScopeOfWorkDocument, ScopeOfWorkPHState } from "./types.js";

/** Schema for validating the header object of a ScopeOfWork document */
export const ScopeOfWorkDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(scopeOfWorkDocumentType),
});

/** Schema for validating the state object of a ScopeOfWork document */
export const ScopeOfWorkPHStateSchema = BaseDocumentStateSchema.extend({
  global: ScopeOfWorkStateSchema(),
});

export const ScopeOfWorkDocumentSchema = z.object({
  header: ScopeOfWorkDocumentHeaderSchema,
  state: ScopeOfWorkPHStateSchema,
  initialState: ScopeOfWorkPHStateSchema,
});

/** Simple helper function to check if a state object is a ScopeOfWork document state object */
export function isScopeOfWorkState(
  state: unknown,
): state is ScopeOfWorkPHState {
  return ScopeOfWorkPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ScopeOfWork document state object */
export function assertIsScopeOfWorkState(
  state: unknown,
): asserts state is ScopeOfWorkPHState {
  ScopeOfWorkPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ScopeOfWork document */
export function isScopeOfWorkDocument(
  document: unknown,
): document is ScopeOfWorkDocument {
  return ScopeOfWorkDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ScopeOfWork document */
export function assertIsScopeOfWorkDocument(
  document: unknown,
): asserts document is ScopeOfWorkDocument {
  ScopeOfWorkDocumentSchema.parse(document);
}
