/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { baseActions } from "document-model";
import {
  workstreamProposalsActions,
  workstreamWorkstreamActions,
} from "./gen/creators.js";

/** Actions for the Workstream document model */

export const actions = {
  ...baseActions,
  ...workstreamWorkstreamActions,
  ...workstreamProposalsActions,
};
