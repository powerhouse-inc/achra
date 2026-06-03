/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { builderProfileDocumentType } from "./document-type.js";
import { BuilderProfileStateSchema } from "./schema/zod.js";
import type { BuilderProfileDocument, BuilderProfilePHState } from "./types.js";

/** Schema for validating the header object of a BuilderProfile document */
export const BuilderProfileDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(builderProfileDocumentType),
  });

/** Schema for validating the state object of a BuilderProfile document */
export const BuilderProfilePHStateSchema = BaseDocumentStateSchema.extend({
  global: BuilderProfileStateSchema(),
});

export const BuilderProfileDocumentSchema = z.object({
  header: BuilderProfileDocumentHeaderSchema,
  state: BuilderProfilePHStateSchema,
  initialState: BuilderProfilePHStateSchema,
});

/** Simple helper function to check if a state object is a BuilderProfile document state object */
export function isBuilderProfileState(
  state: unknown,
): state is BuilderProfilePHState {
  return BuilderProfilePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a BuilderProfile document state object */
export function assertIsBuilderProfileState(
  state: unknown,
): asserts state is BuilderProfilePHState {
  BuilderProfilePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a BuilderProfile document */
export function isBuilderProfileDocument(
  document: unknown,
): document is BuilderProfileDocument {
  return BuilderProfileDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a BuilderProfile document */
export function assertIsBuilderProfileDocument(
  document: unknown,
): asserts document is BuilderProfileDocument {
  BuilderProfileDocumentSchema.parse(document);
}
