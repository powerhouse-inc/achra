/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  SetRecurringServicesInputSchema,
  SetSetupServicesInputSchema,
} from "../schema/zod.js";
import type {
  SetRecurringServicesInput,
  SetSetupServicesInput,
} from "../types.js";
import type {
  SetRecurringServicesAction,
  SetSetupServicesAction,
} from "./actions.js";

export const setSetupServices = (input: SetSetupServicesInput) =>
  createAction<SetSetupServicesAction>(
    "SET_SETUP_SERVICES",
    { ...input },
    undefined,
    SetSetupServicesInputSchema,
    "global",
  );

export const setRecurringServices = (input: SetRecurringServicesInput) =>
  createAction<SetRecurringServicesAction>(
    "SET_RECURRING_SERVICES",
    { ...input },
    undefined,
    SetRecurringServicesInputSchema,
    "global",
  );
