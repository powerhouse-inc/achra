/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import type { Action } from "document-model";
import type {
  ConnectStripeAccountInput,
  SetOperatorInput,
  SyncStripeAccountStatusInput,
} from "../types.js";

export type SetOperatorAction = Action & {
  type: "SET_OPERATOR";
  input: SetOperatorInput;
};
export type ConnectStripeAccountAction = Action & {
  type: "CONNECT_STRIPE_ACCOUNT";
  input: ConnectStripeAccountInput;
};
export type SyncStripeAccountStatusAction = Action & {
  type: "SYNC_STRIPE_ACCOUNT_STATUS";
  input: SyncStripeAccountStatusInput;
};

export type PaymentAccountStripeAction =
  | SetOperatorAction
  | ConnectStripeAccountAction
  | SyncStripeAccountStatusAction;
