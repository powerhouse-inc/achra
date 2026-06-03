/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceTemplateGlobalState } from "../types.js";
import type {
  AddFacetOptionAction,
  RemoveFacetOptionAction,
  RemoveFacetTargetAction,
  SetFacetTargetAction,
} from "./actions.js";

export interface ResourceTemplateFacetTargetingOperations {
  setFacetTargetOperation: (
    state: ResourceTemplateGlobalState,
    action: SetFacetTargetAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeFacetTargetOperation: (
    state: ResourceTemplateGlobalState,
    action: RemoveFacetTargetAction,
    dispatch?: SignalDispatch,
  ) => void;
  addFacetOptionOperation: (
    state: ResourceTemplateGlobalState,
    action: AddFacetOptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeFacetOptionOperation: (
    state: ResourceTemplateGlobalState,
    action: RemoveFacetOptionAction,
    dispatch?: SignalDispatch,
  ) => void;
}
