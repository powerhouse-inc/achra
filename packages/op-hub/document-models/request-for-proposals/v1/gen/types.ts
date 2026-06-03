/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { PHBaseState, PHDocument } from "document-model";
import type { RequestForProposalsAction } from "./actions.js";
import type { RequestForProposalsState as RequestForProposalsGlobalState } from "./schema/types.js";

type RequestForProposalsLocalState = Record<PropertyKey, never>;

type RequestForProposalsPHState = PHBaseState & {
  global: RequestForProposalsGlobalState;
  local: RequestForProposalsLocalState;
};
type RequestForProposalsDocument = PHDocument<RequestForProposalsPHState>;

export * from "./schema/types.js";

export type {
  RequestForProposalsAction,
  RequestForProposalsDocument,
  RequestForProposalsGlobalState,
  RequestForProposalsLocalState,
  RequestForProposalsPHState,
};
