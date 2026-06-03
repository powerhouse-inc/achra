/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { buildersDocumentType } from "./document-type.js";
import { BuildersStateSchema } from "./schema/zod.js";
import type { BuildersDocument, BuildersPHState } from "./types.js";

/** Schema for validating the header object of a Builders document */
export const BuildersDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(buildersDocumentType),
});

/** Schema for validating the state object of a Builders document */
export const BuildersPHStateSchema = BaseDocumentStateSchema.extend({
  global: BuildersStateSchema(),
});

export const BuildersDocumentSchema = z.object({
  header: BuildersDocumentHeaderSchema,
  state: BuildersPHStateSchema,
  initialState: BuildersPHStateSchema,
});

/** Simple helper function to check if a state object is a Builders document state object */
export function isBuildersState(state: unknown): state is BuildersPHState {
  return BuildersPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a Builders document state object */
export function assertIsBuildersState(
  state: unknown,
): asserts state is BuildersPHState {
  BuildersPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a Builders document */
export function isBuildersDocument(
  document: unknown,
): document is BuildersDocument {
  return BuildersDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a Builders document */
export function assertIsBuildersDocument(
  document: unknown,
): asserts document is BuildersDocument {
  BuildersDocumentSchema.parse(document);
}
