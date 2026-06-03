/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ResourceTemplateGlobalState } from "../types.js";
import type {
  SetRecurringServicesAction,
  SetSetupServicesAction,
} from "./actions.js";

export interface ResourceTemplateServiceCategoryManagementOperations {
  setSetupServicesOperation: (
    state: ResourceTemplateGlobalState,
    action: SetSetupServicesAction,
    dispatch?: SignalDispatch,
  ) => void;
  setRecurringServicesOperation: (
    state: ResourceTemplateGlobalState,
    action: SetRecurringServicesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
