/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { ServiceOfferingGlobalState } from "../types.js";
import type {
  AddServiceAction,
  DeleteServiceAction,
  UpdateServiceAction,
} from "./actions.js";

export interface ServiceOfferingServicesOperations {
  addServiceOperation: (
    state: ServiceOfferingGlobalState,
    action: AddServiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateServiceOperation: (
    state: ServiceOfferingGlobalState,
    action: UpdateServiceAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteServiceOperation: (
    state: ServiceOfferingGlobalState,
    action: DeleteServiceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
