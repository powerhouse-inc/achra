/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { resourceTemplateDocumentType } from "./document-type.js";
import { ResourceTemplateStateSchema } from "./schema/zod.js";
import type {
  ResourceTemplateDocument,
  ResourceTemplatePHState,
} from "./types.js";

/** Schema for validating the header object of a ResourceTemplate document */
export const ResourceTemplateDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(resourceTemplateDocumentType),
  });

/** Schema for validating the state object of a ResourceTemplate document */
export const ResourceTemplatePHStateSchema = BaseDocumentStateSchema.extend({
  global: ResourceTemplateStateSchema(),
});

export const ResourceTemplateDocumentSchema = z.object({
  header: ResourceTemplateDocumentHeaderSchema,
  state: ResourceTemplatePHStateSchema,
  initialState: ResourceTemplatePHStateSchema,
});

/** Simple helper function to check if a state object is a ResourceTemplate document state object */
export function isResourceTemplateState(
  state: unknown,
): state is ResourceTemplatePHState {
  return ResourceTemplatePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ResourceTemplate document state object */
export function assertIsResourceTemplateState(
  state: unknown,
): asserts state is ResourceTemplatePHState {
  ResourceTemplatePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ResourceTemplate document */
export function isResourceTemplateDocument(
  document: unknown,
): document is ResourceTemplateDocument {
  return ResourceTemplateDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ResourceTemplate document */
export function assertIsResourceTemplateDocument(
  document: unknown,
): asserts document is ResourceTemplateDocument {
  ResourceTemplateDocumentSchema.parse(document);
}
