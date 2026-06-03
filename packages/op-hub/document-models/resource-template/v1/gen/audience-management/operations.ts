/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceTemplateGlobalState } from "../types.js";
import type {
  AddTargetAudienceAction,
  RemoveTargetAudienceAction,
} from "./actions.js";

export interface ResourceTemplateAudienceManagementOperations {
  addTargetAudienceOperation: (
    state: ResourceTemplateGlobalState,
    action: AddTargetAudienceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTargetAudienceOperation: (
    state: ResourceTemplateGlobalState,
    action: RemoveTargetAudienceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
