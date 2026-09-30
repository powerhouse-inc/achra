/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AddSubteamInput,
  OperationalHubProfileState,
  RemoveSubteamInput,
  SetOperationalHubNameInput,
  SetOperatorTeamInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export function AddSubteamInputSchema(): z.ZodObject<
  Properties<AddSubteamInput>
> {
  return z.object({
    subteam: z.string(),
  });
}

export function OperationalHubProfileStateSchema(): z.ZodObject<
  Properties<OperationalHubProfileState>
> {
  return z.object({
    __typename: z.literal("OperationalHubProfileState").optional(),
    name: z.string(),
    operatorTeam: z.string().nullish(),
    subteams: z.array(z.string()),
  });
}

export function RemoveSubteamInputSchema(): z.ZodObject<
  Properties<RemoveSubteamInput>
> {
  return z.object({
    subteam: z.string(),
  });
}

export function SetOperationalHubNameInputSchema(): z.ZodObject<
  Properties<SetOperationalHubNameInput>
> {
  return z.object({
    name: z.string(),
  });
}

export function SetOperatorTeamInputSchema(): z.ZodObject<
  Properties<SetOperatorTeamInput>
> {
  return z.object({
    operatorTeam: z.string().nullish(),
  });
}
