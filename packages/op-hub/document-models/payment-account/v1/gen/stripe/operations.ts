/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { type SignalDispatch } from "document-model";
import type { PaymentAccountGlobalState } from "../types.js";
import type {
  ConnectStripeAccountAction,
  SetOperatorAction,
  SyncStripeAccountStatusAction,
} from "./actions.js";

export interface PaymentAccountStripeOperations {
  setOperatorOperation: (
    state: PaymentAccountGlobalState,
    action: SetOperatorAction,
    dispatch?: SignalDispatch,
  ) => void;
  connectStripeAccountOperation: (
    state: PaymentAccountGlobalState,
    action: ConnectStripeAccountAction,
    dispatch?: SignalDispatch,
  ) => void;
  syncStripeAccountStatusOperation: (
    state: PaymentAccountGlobalState,
    action: SyncStripeAccountStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
}
