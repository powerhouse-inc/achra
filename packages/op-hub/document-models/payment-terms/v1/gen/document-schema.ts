/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { paymentTermsDocumentType } from "./document-type.js";
import { PaymentTermsStateSchema } from "./schema/zod.js";
import type { PaymentTermsDocument, PaymentTermsPHState } from "./types.js";

/** Schema for validating the header object of a PaymentTerms document */
export const PaymentTermsDocumentHeaderSchema = BaseDocumentHeaderSchema.extend(
  {
    documentType: z.literal(paymentTermsDocumentType),
  },
);

/** Schema for validating the state object of a PaymentTerms document */
export const PaymentTermsPHStateSchema = BaseDocumentStateSchema.extend({
  global: PaymentTermsStateSchema(),
});

export const PaymentTermsDocumentSchema = z.object({
  header: PaymentTermsDocumentHeaderSchema,
  state: PaymentTermsPHStateSchema,
  initialState: PaymentTermsPHStateSchema,
});

/** Simple helper function to check if a state object is a PaymentTerms document state object */
export function isPaymentTermsState(
  state: unknown,
): state is PaymentTermsPHState {
  return PaymentTermsPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a PaymentTerms document state object */
export function assertIsPaymentTermsState(
  state: unknown,
): asserts state is PaymentTermsPHState {
  PaymentTermsPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a PaymentTerms document */
export function isPaymentTermsDocument(
  document: unknown,
): document is PaymentTermsDocument {
  return PaymentTermsDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a PaymentTerms document */
export function assertIsPaymentTermsDocument(
  document: unknown,
): asserts document is PaymentTermsDocument {
  PaymentTermsDocumentSchema.parse(document);
}
