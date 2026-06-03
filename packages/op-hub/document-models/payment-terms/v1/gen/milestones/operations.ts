/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { PaymentTermsGlobalState } from "../types.js";
import type {
  AddMilestoneAction,
  DeleteMilestoneAction,
  ReorderMilestonesAction,
  UpdateMilestoneAction,
  UpdateMilestoneStatusAction,
} from "./actions.js";

export interface PaymentTermsMilestonesOperations {
  addMilestoneOperation: (
    state: PaymentTermsGlobalState,
    action: AddMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateMilestoneOperation: (
    state: PaymentTermsGlobalState,
    action: UpdateMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  updateMilestoneStatusOperation: (
    state: PaymentTermsGlobalState,
    action: UpdateMilestoneStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteMilestoneOperation: (
    state: PaymentTermsGlobalState,
    action: DeleteMilestoneAction,
    dispatch?: SignalDispatch,
  ) => void;
  reorderMilestonesOperation: (
    state: PaymentTermsGlobalState,
    action: ReorderMilestonesAction,
    dispatch?: SignalDispatch,
  ) => void;
}
