/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AddBuilderInput,
  BuildersState,
  RemoveBuilderInput,
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

export function AddBuilderInputSchema(): z.ZodObject<
  Properties<AddBuilderInput>
> {
  return z.object({
    builderPhid: z.string(),
  });
}

export function BuildersStateSchema(): z.ZodObject<Properties<BuildersState>> {
  return z.object({
    __typename: z.literal("BuildersState").optional(),
    builders: z.array(z.string()),
  });
}

export function RemoveBuilderInputSchema(): z.ZodObject<
  Properties<RemoveBuilderInput>
> {
  return z.object({
    builderPhid: z.string(),
  });
}
