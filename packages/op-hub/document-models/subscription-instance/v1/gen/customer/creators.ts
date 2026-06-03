/**
 * WARNING: DO NOT EDIT
 * This file is auto-generated and updated by codegen
 */
import { createAction } from "document-model";
import {
  SetCustomerTypeInputSchema,
  UpdateTeamMemberCountInputSchema,
} from "../schema/zod.js";
import type {
  SetCustomerTypeInput,
  UpdateTeamMemberCountInput,
} from "../types.js";
import type {
  SetCustomerTypeAction,
  UpdateTeamMemberCountAction,
} from "./actions.js";

export const setCustomerType = (input: SetCustomerTypeInput) =>
  createAction<SetCustomerTypeAction>(
    "SET_CUSTOMER_TYPE",
    { ...input },
    undefined,
    SetCustomerTypeInputSchema,
    "global",
  );

export const updateTeamMemberCount = (input: UpdateTeamMemberCountInput) =>
  createAction<UpdateTeamMemberCountAction>(
    "UPDATE_TEAM_MEMBER_COUNT",
    { ...input },
    undefined,
    UpdateTeamMemberCountInputSchema,
    "global",
  );
