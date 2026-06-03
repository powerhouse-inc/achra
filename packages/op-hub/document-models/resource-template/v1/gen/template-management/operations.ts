/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceTemplateGlobalState } from "../types.js";
import type {
  SetOperatorAction,
  SetTemplateIdAction,
  SetWeightAction,
  UpdateTemplateInfoAction,
  UpdateTemplateStatusAction,
} from "./actions.js";

export interface ResourceTemplateTemplateManagementOperations {
  updateTemplateInfoOperation: (
    state: ResourceTemplateGlobalState,
    action: UpdateTemplateInfoAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateTemplateStatusOperation: (
    state: ResourceTemplateGlobalState,
    action: UpdateTemplateStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  setOperatorOperation: (
    state: ResourceTemplateGlobalState,
    action: SetOperatorAction,
    dispatch?: SignalDispatch,
  ) => void;
  setTemplateIdOperation: (
    state: ResourceTemplateGlobalState,
    action: SetTemplateIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  setWeightOperation: (
    state: ResourceTemplateGlobalState,
    action: SetWeightAction,
    dispatch?: SignalDispatch,
  ) => void;
}
