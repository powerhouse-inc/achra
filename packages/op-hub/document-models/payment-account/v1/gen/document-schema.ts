/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { paymentAccountDocumentType } from "./document-type.js";
import { PaymentAccountStateSchema } from "./schema/zod.js";
import type { PaymentAccountDocument, PaymentAccountPHState } from "./types.js";

/** Schema for validating the header object of a PaymentAccount document */
export const PaymentAccountDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(paymentAccountDocumentType),
  });

/** Schema for validating the state object of a PaymentAccount document */
export const PaymentAccountPHStateSchema = BaseDocumentStateSchema.extend({
  global: PaymentAccountStateSchema(),
});

export const PaymentAccountDocumentSchema = z.object({
  header: PaymentAccountDocumentHeaderSchema,
  state: PaymentAccountPHStateSchema,
  initialState: PaymentAccountPHStateSchema,
});

/** Simple helper function to check if a state object is a PaymentAccount document state object */
export function isPaymentAccountState(
  state: unknown,
): state is PaymentAccountPHState {
  return PaymentAccountPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a PaymentAccount document state object */
export function assertIsPaymentAccountState(
  state: unknown,
): asserts state is PaymentAccountPHState {
  PaymentAccountPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a PaymentAccount document */
export function isPaymentAccountDocument(
  document: unknown,
): document is PaymentAccountDocument {
  return PaymentAccountDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a PaymentAccount document */
export function assertIsPaymentAccountDocument(
  document: unknown,
): asserts document is PaymentAccountDocument {
  PaymentAccountDocumentSchema.parse(document);
}
