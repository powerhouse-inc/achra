/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { networkProfileDocumentType } from "./document-type.js";
import { NetworkProfileStateSchema } from "./schema/zod.js";
import type { NetworkProfileDocument, NetworkProfilePHState } from "./types.js";

/** Schema for validating the header object of a NetworkProfile document */
export const NetworkProfileDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(networkProfileDocumentType),
  });

/** Schema for validating the state object of a NetworkProfile document */
export const NetworkProfilePHStateSchema = BaseDocumentStateSchema.extend({
  global: NetworkProfileStateSchema(),
});

export const NetworkProfileDocumentSchema = z.object({
  header: NetworkProfileDocumentHeaderSchema,
  state: NetworkProfilePHStateSchema,
  initialState: NetworkProfilePHStateSchema,
});

/** Simple helper function to check if a state object is a NetworkProfile document state object */
export function isNetworkProfileState(
  state: unknown,
): state is NetworkProfilePHState {
  return NetworkProfilePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a NetworkProfile document state object */
export function assertIsNetworkProfileState(
  state: unknown,
): asserts state is NetworkProfilePHState {
  NetworkProfilePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a NetworkProfile document */
export function isNetworkProfileDocument(
  document: unknown,
): document is NetworkProfileDocument {
  return NetworkProfileDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a NetworkProfile document */
export function assertIsNetworkProfileDocument(
  document: unknown,
): asserts document is NetworkProfileDocument {
  NetworkProfileDocumentSchema.parse(document);
}
