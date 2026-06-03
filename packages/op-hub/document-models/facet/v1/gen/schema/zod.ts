/* eslint-disable @typescript-eslint/no-empty-object-type */

import * as z from "zod";
import type {
  AddOptionInput,
  FacetOption,
  FacetState,
  RemoveOptionInput,
  ReorderOptionsInput,
  SetFacetDescriptionInput,
  SetFacetNameInput,
  UpdateOptionInput,
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

export function AddOptionInputSchema(): z.ZodObject<
  Properties<AddOptionInput>
> {
  return z.object({
    description: z.string().nullish(),
    displayOrder: z.number().nullish(),
    id: z.string(),
    isDefault: z.boolean().nullish(),
    label: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function FacetOptionSchema(): z.ZodObject<Properties<FacetOption>> {
  return z.object({
    __typename: z.literal("FacetOption").optional(),
    description: z.string().nullish(),
    displayOrder: z.number().nullish(),
    id: z.string(),
    isDefault: z.boolean(),
    label: z.string(),
  });
}

export function FacetStateSchema(): z.ZodObject<Properties<FacetState>> {
  return z.object({
    __typename: z.literal("FacetState").optional(),
    description: z.string().nullish(),
    id: z.string().nullish(),
    lastModified: z.iso.datetime().nullish(),
    name: z.string(),
    options: z.array(z.lazy(() => FacetOptionSchema())),
  });
}

export function RemoveOptionInputSchema(): z.ZodObject<
  Properties<RemoveOptionInput>
> {
  return z.object({
    id: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function ReorderOptionsInputSchema(): z.ZodObject<
  Properties<ReorderOptionsInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    optionIds: z.array(z.string()),
  });
}

export function SetFacetDescriptionInputSchema(): z.ZodObject<
  Properties<SetFacetDescriptionInput>
> {
  return z.object({
    description: z.string().nullish(),
    lastModified: z.iso.datetime(),
  });
}

export function SetFacetNameInputSchema(): z.ZodObject<
  Properties<SetFacetNameInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    name: z.string(),
  });
}

export function UpdateOptionInputSchema(): z.ZodObject<
  Properties<UpdateOptionInput>
> {
  return z.object({
    description: z.string().nullish(),
    displayOrder: z.number().nullish(),
    id: z.string(),
    isDefault: z.boolean().nullish(),
    label: z.string().nullish(),
    lastModified: z.iso.datetime(),
  });
}
