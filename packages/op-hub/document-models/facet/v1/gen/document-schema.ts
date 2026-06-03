/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { facetDocumentType } from "./document-type.js";
import { FacetStateSchema } from "./schema/zod.js";
import type { FacetDocument, FacetPHState } from "./types.js";

/** Schema for validating the header object of a Facet document */
export const FacetDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(facetDocumentType),
});

/** Schema for validating the state object of a Facet document */
export const FacetPHStateSchema = BaseDocumentStateSchema.extend({
  global: FacetStateSchema(),
});

export const FacetDocumentSchema = z.object({
  header: FacetDocumentHeaderSchema,
  state: FacetPHStateSchema,
  initialState: FacetPHStateSchema,
});

/** Simple helper function to check if a state object is a Facet document state object */
export function isFacetState(state: unknown): state is FacetPHState {
  return FacetPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a Facet document state object */
export function assertIsFacetState(
  state: unknown,
): asserts state is FacetPHState {
  FacetPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a Facet document */
export function isFacetDocument(document: unknown): document is FacetDocument {
  return FacetDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a Facet document */
export function assertIsFacetDocument(
  document: unknown,
): asserts document is FacetDocument {
  FacetDocumentSchema.parse(document);
}
