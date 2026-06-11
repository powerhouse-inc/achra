/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  ConnectStripeAccountInputSchema,
  SetOperatorInputSchema,
  SyncStripeAccountStatusInputSchema,
} from "../schema/zod.js";
import type {
  ConnectStripeAccountInput,
  SetOperatorInput,
  SyncStripeAccountStatusInput,
} from "../types.js";
import type {
  ConnectStripeAccountAction,
  SetOperatorAction,
  SyncStripeAccountStatusAction,
} from "./actions.js";

export const setOperator = (input: SetOperatorInput) =>
  createAction<SetOperatorAction>(
    "SET_OPERATOR",
    { ...input },
    undefined,
    SetOperatorInputSchema,
    "global",
  );

export const connectStripeAccount = (input: ConnectStripeAccountInput) =>
  createAction<ConnectStripeAccountAction>(
    "CONNECT_STRIPE_ACCOUNT",
    { ...input },
    undefined,
    ConnectStripeAccountInputSchema,
    "global",
  );

export const syncStripeAccountStatus = (input: SyncStripeAccountStatusInput) =>
  createAction<SyncStripeAccountStatusAction>(
    "SYNC_STRIPE_ACCOUNT_STATUS",
    { ...input },
    undefined,
    SyncStripeAccountStatusInputSchema,
    "global",
  );
