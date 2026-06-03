/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { BuildersGlobalState } from "../types.js";
import type { AddBuilderAction, RemoveBuilderAction } from "./actions.js";

export interface BuildersBuildersOperations {
  addBuilderOperation: (
    state: BuildersGlobalState,
    action: AddBuilderAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeBuilderOperation: (
    state: BuildersGlobalState,
    action: RemoveBuilderAction,
    dispatch?: SignalDispatch,
  ) => void;
}
