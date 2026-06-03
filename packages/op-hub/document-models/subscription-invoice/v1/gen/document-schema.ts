/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { subscriptionInvoiceDocumentType } from "./document-type.js";
import { SubscriptionInvoiceStateSchema } from "./schema/zod.js";
import type {
  SubscriptionInvoiceDocument,
  SubscriptionInvoicePHState,
} from "./types.js";

/** Schema for validating the header object of a SubscriptionInvoice document */
export const SubscriptionInvoiceDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(subscriptionInvoiceDocumentType),
  });

/** Schema for validating the state object of a SubscriptionInvoice document */
export const SubscriptionInvoicePHStateSchema = BaseDocumentStateSchema.extend({
  global: SubscriptionInvoiceStateSchema(),
});

export const SubscriptionInvoiceDocumentSchema = z.object({
  header: SubscriptionInvoiceDocumentHeaderSchema,
  state: SubscriptionInvoicePHStateSchema,
  initialState: SubscriptionInvoicePHStateSchema,
});

/** Simple helper function to check if a state object is a SubscriptionInvoice document state object */
export function isSubscriptionInvoiceState(
  state: unknown,
): state is SubscriptionInvoicePHState {
  return SubscriptionInvoicePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a SubscriptionInvoice document state object */
export function assertIsSubscriptionInvoiceState(
  state: unknown,
): asserts state is SubscriptionInvoicePHState {
  SubscriptionInvoicePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a SubscriptionInvoice document */
export function isSubscriptionInvoiceDocument(
  document: unknown,
): document is SubscriptionInvoiceDocument {
  return SubscriptionInvoiceDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a SubscriptionInvoice document */
export function assertIsSubscriptionInvoiceDocument(
  document: unknown,
): asserts document is SubscriptionInvoiceDocument {
  SubscriptionInvoiceDocumentSchema.parse(document);
}
