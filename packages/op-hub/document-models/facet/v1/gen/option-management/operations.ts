/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { FacetGlobalState } from "../types.js";
import type {
  AddOptionAction,
  RemoveOptionAction,
  ReorderOptionsAction,
  UpdateOptionAction,
} from "./actions.js";

export interface FacetOptionManagementOperations {
  addOptionOperation: (
    state: FacetGlobalState,
    action: AddOptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateOptionOperation: (
    state: FacetGlobalState,
    action: UpdateOptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeOptionOperation: (
    state: FacetGlobalState,
    action: RemoveOptionAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderOptionsOperation: (
    state: FacetGlobalState,
    action: ReorderOptionsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
