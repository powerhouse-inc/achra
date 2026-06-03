/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { FacetGlobalState } from "../types.js";
import type {
  SetFacetDescriptionAction,
  SetFacetNameAction,
} from "./actions.js";

export interface FacetFacetManagementOperations {
  setFacetNameOperation: (
    state: FacetGlobalState,
    action: SetFacetNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setFacetDescriptionOperation: (
    state: FacetGlobalState,
    action: SetFacetDescriptionAction,
    dispatch?: SignalDispatch,
  ) => void;
}
