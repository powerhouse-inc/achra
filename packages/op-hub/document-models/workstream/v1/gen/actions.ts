/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { WorkstreamProposalsAction } from "./proposals/actions.js";
import type { WorkstreamWorkstreamAction } from "./workstream/actions.js";

export * from "./proposals/actions.js";
export * from "./workstream/actions.js";

export type WorkstreamAction =
  | WorkstreamWorkstreamAction
  | WorkstreamProposalsAction;
