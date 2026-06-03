/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { resourceInstanceDocumentType } from "./document-type.js";
import { ResourceInstanceStateSchema } from "./schema/zod.js";
import type {
  ResourceInstanceDocument,
  ResourceInstancePHState,
} from "./types.js";

/** Schema for validating the header object of a ResourceInstance document */
export const ResourceInstanceDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(resourceInstanceDocumentType),
  });

/** Schema for validating the state object of a ResourceInstance document */
export const ResourceInstancePHStateSchema = BaseDocumentStateSchema.extend({
  global: ResourceInstanceStateSchema(),
});

export const ResourceInstanceDocumentSchema = z.object({
  header: ResourceInstanceDocumentHeaderSchema,
  state: ResourceInstancePHStateSchema,
  initialState: ResourceInstancePHStateSchema,
});

/** Simple helper function to check if a state object is a ResourceInstance document state object */
export function isResourceInstanceState(
  state: unknown,
): state is ResourceInstancePHState {
  return ResourceInstancePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ResourceInstance document state object */
export function assertIsResourceInstanceState(
  state: unknown,
): asserts state is ResourceInstancePHState {
  ResourceInstancePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ResourceInstance document */
export function isResourceInstanceDocument(
  document: unknown,
): document is ResourceInstanceDocument {
  return ResourceInstanceDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ResourceInstance document */
export function assertIsResourceInstanceDocument(
  document: unknown,
): asserts document is ResourceInstanceDocument {
  ResourceInstanceDocumentSchema.parse(document);
}
