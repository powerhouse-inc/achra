/* eslint-disable @typescript-eslint/no-empty-object-type */

import * as z from "zod";
import type {
  ConnectStripeAccountInput,
  PaymentAccountState,
  SetOperatorInput,
  SyncStripeAccountStatusInput,
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

export function ConnectStripeAccountInputSchema(): z.ZodObject<
  Properties<ConnectStripeAccountInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    stripeAccountId: z.string(),
  });
}

export function PaymentAccountStateSchema(): z.ZodObject<
  Properties<PaymentAccountState>
> {
  return z.object({
    __typename: z.literal("PaymentAccountState").optional(),
    lastModified: z.iso.datetime().nullish(),
    operatorId: z.string().nullish(),
    stripeAccountId: z.string().nullish(),
    stripeChargesEnabled: z.boolean(),
    stripeDetailsSubmitted: z.boolean(),
    stripePayoutsEnabled: z.boolean(),
    stripeRequirementsCurrentlyDue: z.array(z.string()),
    stripeRequirementsDisabledReason: z.string().nullish(),
  });
}

export function SetOperatorInputSchema(): z.ZodObject<
  Properties<SetOperatorInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    operatorId: z.string(),
  });
}

export function SyncStripeAccountStatusInputSchema(): z.ZodObject<
  Properties<SyncStripeAccountStatusInput>
> {
  return z.object({
    chargesEnabled: z.boolean(),
    detailsSubmitted: z.boolean(),
    disabledReason: z.string().nullish(),
    lastModified: z.iso.datetime(),
    payoutsEnabled: z.boolean(),
    requirementsCurrentlyDue: z.array(z.string()),
  });
}
