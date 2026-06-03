/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { invoiceDocumentType } from "./document-type.js";
import { InvoiceStateSchema } from "./schema/zod.js";
import type { InvoiceDocument, InvoicePHState } from "./types.js";

/** Schema for validating the header object of a Invoice document */
export const InvoiceDocumentHeaderSchema = BaseDocumentHeaderSchema.extend({
  documentType: z.literal(invoiceDocumentType),
});

/** Schema for validating the state object of a Invoice document */
export const InvoicePHStateSchema = BaseDocumentStateSchema.extend({
  global: InvoiceStateSchema(),
});

export const InvoiceDocumentSchema = z.object({
  header: InvoiceDocumentHeaderSchema,
  state: InvoicePHStateSchema,
  initialState: InvoicePHStateSchema,
});

/** Simple helper function to check if a state object is a Invoice document state object */
export function isInvoiceState(state: unknown): state is InvoicePHState {
  return InvoicePHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a Invoice document state object */
export function assertIsInvoiceState(
  state: unknown,
): asserts state is InvoicePHState {
  InvoicePHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a Invoice document */
export function isInvoiceDocument(
  document: unknown,
): document is InvoiceDocument {
  return InvoiceDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a Invoice document */
export function assertIsInvoiceDocument(
  document: unknown,
): asserts document is InvoiceDocument {
  InvoiceDocumentSchema.parse(document);
}
