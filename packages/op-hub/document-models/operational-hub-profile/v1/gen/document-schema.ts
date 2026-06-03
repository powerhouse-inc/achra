/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { operationalHubProfileDocumentType } from "./document-type.js";
import { OperationalHubProfileStateSchema } from "./schema/zod.js";
import type {
  OperationalHubProfileDocument,
  OperationalHubProfilePHState,
} from "./types.js";

/** Schema for validating the header object of a OperationalHubProfile document */
export const OperationalHubProfileDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(operationalHubProfileDocumentType),
  });

/** Schema for validating the state object of a OperationalHubProfile document */
export const OperationalHubProfilePHStateSchema =
  BaseDocumentStateSchema.extend({
    global: OperationalHubProfileStateSchema(),
  });

export const OperationalHubProfileDocumentSchema = z.object({
  header: OperationalHubProfileDocumentHeaderSchema,
  state: OperationalHubProfilePHStateSchema,
  initialState: OperationalHubProfilePHStateSchema,
});

/** Simple helper function to check if a state object is a OperationalHubProfile document state object */
export function isOperationalHubProfileState(
  state: unknown,
): state is OperationalHubProfilePHState {
  return OperationalHubProfilePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a OperationalHubProfile document state object */
export function assertIsOperationalHubProfileState(
  state: unknown,
): asserts state is OperationalHubProfilePHState {
  OperationalHubProfilePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a OperationalHubProfile document */
export function isOperationalHubProfileDocument(
  document: unknown,
): document is OperationalHubProfileDocument {
  return OperationalHubProfileDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a OperationalHubProfile document */
export function assertIsOperationalHubProfileDocument(
  document: unknown,
): asserts document is OperationalHubProfileDocument {
  OperationalHubProfileDocumentSchema.parse(document);
}
