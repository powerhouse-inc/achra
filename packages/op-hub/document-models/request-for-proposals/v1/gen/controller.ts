/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { PHDocumentController } from "document-model";
import { RequestForProposals } from "../module.js";
import type {
  RequestForProposalsAction,
  RequestForProposalsPHState,
} from "./types.js";

export const RequestForProposalsController =
  PHDocumentController.forDocumentModel<
    RequestForProposalsPHState,
    RequestForProposalsAction
  >(RequestForProposals);
