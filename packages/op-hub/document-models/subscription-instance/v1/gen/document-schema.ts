/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { subscriptionInstanceDocumentType } from "./document-type.js";
import { SubscriptionInstanceStateSchema } from "./schema/zod.js";
import type {
  SubscriptionInstanceDocument,
  SubscriptionInstancePHState,
} from "./types.js";

/** Schema for validating the header object of a SubscriptionInstance document */
export const SubscriptionInstanceDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(subscriptionInstanceDocumentType),
  });

/** Schema for validating the state object of a SubscriptionInstance document */
export const SubscriptionInstancePHStateSchema = BaseDocumentStateSchema.extend(
  {
    global: SubscriptionInstanceStateSchema(),
  },
);

export const SubscriptionInstanceDocumentSchema = z.object({
  header: SubscriptionInstanceDocumentHeaderSchema,
  state: SubscriptionInstancePHStateSchema,
  initialState: SubscriptionInstancePHStateSchema,
});

/** Simple helper function to check if a state object is a SubscriptionInstance document state object */
export function isSubscriptionInstanceState(
  state: unknown,
): state is SubscriptionInstancePHState {
  return SubscriptionInstancePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a SubscriptionInstance document state object */
export function assertIsSubscriptionInstanceState(
  state: unknown,
): asserts state is SubscriptionInstancePHState {
  SubscriptionInstancePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a SubscriptionInstance document */
export function isSubscriptionInstanceDocument(
  document: unknown,
): document is SubscriptionInstanceDocument {
  return SubscriptionInstanceDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a SubscriptionInstance document */
export function assertIsSubscriptionInstanceDocument(
  document: unknown,
): asserts document is SubscriptionInstanceDocument {
  SubscriptionInstanceDocumentSchema.parse(document);
}
