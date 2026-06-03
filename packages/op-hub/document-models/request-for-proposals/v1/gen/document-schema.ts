/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import {
  BaseDocumentHeaderSchema,
  BaseDocumentStateSchema,
} from "document-model";
import { z } from "zod";
import { requestForProposalsDocumentType } from "./document-type.js";
import { RequestForProposalsStateSchema } from "./schema/zod.js";
import type {
  RequestForProposalsDocument,
  RequestForProposalsPHState,
} from "./types.js";

/** Schema for validating the header object of a RequestForProposals document */
export const RequestForProposalsDocumentHeaderSchema =
  BaseDocumentHeaderSchema.extend({
    documentType: z.literal(requestForProposalsDocumentType),
  });

/** Schema for validating the state object of a RequestForProposals document */
export const RequestForProposalsPHStateSchema = BaseDocumentStateSchema.extend({
  global: RequestForProposalsStateSchema(),
});

export const RequestForProposalsDocumentSchema = z.object({
  header: RequestForProposalsDocumentHeaderSchema,
  state: RequestForProposalsPHStateSchema,
  initialState: RequestForProposalsPHStateSchema,
});

/** Simple helper function to check if a state object is a RequestForProposals document state object */
export function isRequestForProposalsState(
  state: unknown,
): state is RequestForProposalsPHState {
  return RequestForProposalsPHStateSchema.safeParse(state).success;
}

/** Simple helper function to assert that a document state object is a RequestForProposals document state object */
export function assertIsRequestForProposalsState(
  state: unknown,
): asserts state is RequestForProposalsPHState {
  RequestForProposalsPHStateSchema.parse(state);
}

/** Simple helper function to check if a document is a RequestForProposals document */
export function isRequestForProposalsDocument(
  document: unknown,
): document is RequestForProposalsDocument {
  return RequestForProposalsDocumentSchema.safeParse(document).success;
}

/** Simple helper function to assert that a document is a RequestForProposals document */
export function assertIsRequestForProposalsDocument(
  document: unknown,
): asserts document is RequestForProposalsDocument {
  RequestForProposalsDocumentSchema.parse(document);
}
