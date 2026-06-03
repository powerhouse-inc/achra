/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  requestForProposalsContexDocumentActions,
  requestForProposalsProposalsActions,
  requestForProposalsRfpStateActions,
} from "./gen/creators.js";

/** Actions for the RequestForProposals document model */

export const actions = {
  ...baseActions,
  ...requestForProposalsRfpStateActions,
  ...requestForProposalsContexDocumentActions,
  ...requestForProposalsProposalsActions,
};
