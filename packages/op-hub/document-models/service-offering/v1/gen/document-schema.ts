/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { serviceOfferingDocumentType } from "./document-type.js";
import { ServiceOfferingStateSchema } from "./schema/zod.js";
import type {
  ServiceOfferingDocument,
  ServiceOfferingPHState,
} from "./types.js";

/** Schema for validating the header object of a ServiceOffering document */
export const ServiceOfferingDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(serviceOfferingDocumentType),
  });

/** Schema for validating the state object of a ServiceOffering document */
export const ServiceOfferingPHStateSchema = BaseDocumentStateSchema.extend({
  global: ServiceOfferingStateSchema(),
});

export const ServiceOfferingDocumentSchema = z.object({
  header: ServiceOfferingDocumentHeaderSchema,
  state: ServiceOfferingPHStateSchema,
  initialState: ServiceOfferingPHStateSchema,
});

/** Simple helper function to check if a state object is a ServiceOffering document state object */
export function isServiceOfferingState(
  state: unknown,
): state is ServiceOfferingPHState {
  return ServiceOfferingPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a ServiceOffering document state object */
export function assertIsServiceOfferingState(
  state: unknown,
): asserts state is ServiceOfferingPHState {
  ServiceOfferingPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a ServiceOffering document */
export function isServiceOfferingDocument(
  document: unknown,
): document is ServiceOfferingDocument {
  return ServiceOfferingDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a ServiceOffering document */
export function assertIsServiceOfferingDocument(
  document: unknown,
): asserts document is ServiceOfferingDocument {
  ServiceOfferingDocumentSchema.parse(document);
}
