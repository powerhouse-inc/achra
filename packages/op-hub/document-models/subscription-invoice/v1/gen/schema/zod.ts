/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  InitializeSubscriptionInvoiceInput,
  MarkSubscriptionInvoiceIssuedInput,
  MarkSubscriptionInvoicePaidInput,
  SetSubscriptionInvoiceNotesInput,
  SetSubscriptionInvoiceStripeIdInput,
  SubscriptionInvoiceBillingCycle,
  SubscriptionInvoiceLineItem,
  SubscriptionInvoiceLineItemInput,
  SubscriptionInvoiceLineItemOrigin,
  SubscriptionInvoiceState,
  SubscriptionInvoiceStatus,
  VoidSubscriptionInvoiceInput,
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

export const SubscriptionInvoiceBillingCycleSchema = z.enum([
  "ANNUAL",
  "MONTHLY",
  "ONE_TIME",
  "QUARTERLY",
  "SEMI_ANNUAL",
]);

export const SubscriptionInvoiceLineItemOriginSchema = z.enum([
  "DYNAMIC",
  "ESTIMATED_USAGE",
  "RECONCILIATION",
  "SETUP",
  "SUBSCRIPTION_FEE",
]);

export const SubscriptionInvoiceStatusSchema = z.enum([
  "DRAFT",
  "ISSUED",
  "PAID",
  "VOID",
]);

export function InitializeSubscriptionInvoiceInputSchema(): z.ZodObject<
  Properties<InitializeSubscriptionInvoiceInput>
> {
  return z.object({
    billingCycle: SubscriptionInvoiceBillingCycleSchema.nullish(),
    creditApplied: z.number(),
    currency: z.string().nullish(),
    customerEmail: z.email().nullish(),
    customerId: z.string().nullish(),
    customerName: z.string().nullish(),
    cycleEnd: z.iso.datetime().nullish(),
    cycleStart: z.iso.datetime().nullish(),
    dueDate: z.iso.datetime().nullish(),
    invoiceNumber: z.string().nullish(),
    lineItems: z.array(z.lazy(() => SubscriptionInvoiceLineItemInputSchema())),
    notes: z.string().nullish(),
    sourceSubscriptionId: z.string().nullish(),
    sourceSubscriptionName: z.string().nullish(),
    subtotal: z.number(),
    totalDue: z.number(),
    totalPaid: z.number(),
  });
}

export function MarkSubscriptionInvoiceIssuedInputSchema(): z.ZodObject<
  Properties<MarkSubscriptionInvoiceIssuedInput>
> {
  return z.object({
    issuedAt: z.iso.datetime(),
  });
}

export function MarkSubscriptionInvoicePaidInputSchema(): z.ZodObject<
  Properties<MarkSubscriptionInvoicePaidInput>
> {
  return z.object({
    paidAmount: z.number(),
    paidAt: z.iso.datetime(),
  });
}

export function SetSubscriptionInvoiceNotesInputSchema(): z.ZodObject<
  Properties<SetSubscriptionInvoiceNotesInput>
> {
  return z.object({
    notes: z.string().nullish(),
  });
}

export function SetSubscriptionInvoiceStripeIdInputSchema(): z.ZodObject<
  Properties<SetSubscriptionInvoiceStripeIdInput>
> {
  return z.object({
    stripeInvoiceId: z.string(),
  });
}

export function SubscriptionInvoiceLineItemSchema(): z.ZodObject<
  Properties<SubscriptionInvoiceLineItem>
> {
  return z.object({
    __typename: z.literal("SubscriptionInvoiceLineItem").optional(),
    amountDue: z.number(),
    chargedAt: z.iso.datetime(),
    creditApplied: z.number(),
    currency: z.string(),
    debitAmount: z.number(),
    description: z.string(),
    id: z.string(),
    origin: SubscriptionInvoiceLineItemOriginSchema,
    settledAmount: z.number(),
    sliceId: z.string(),
    sourceName: z.string().nullish(),
  });
}

export function SubscriptionInvoiceLineItemInputSchema(): z.ZodObject<
  Properties<SubscriptionInvoiceLineItemInput>
> {
  return z.object({
    amountDue: z.number(),
    chargedAt: z.iso.datetime(),
    creditApplied: z.number(),
    currency: z.string(),
    debitAmount: z.number(),
    description: z.string(),
    id: z.string(),
    origin: SubscriptionInvoiceLineItemOriginSchema,
    settledAmount: z.number(),
    sliceId: z.string(),
    sourceName: z.string().nullish(),
  });
}

export function SubscriptionInvoiceStateSchema(): z.ZodObject<
  Properties<SubscriptionInvoiceState>
> {
  return z.object({
    __typename: z.literal("SubscriptionInvoiceState").optional(),
    billingCycle: SubscriptionInvoiceBillingCycleSchema.nullish(),
    creditApplied: z.number(),
    currency: z.string().nullish(),
    customerEmail: z.email().nullish(),
    customerId: z.string().nullish(),
    customerName: z.string().nullish(),
    cycleEnd: z.iso.datetime().nullish(),
    cycleStart: z.iso.datetime().nullish(),
    dueDate: z.iso.datetime().nullish(),
    invoiceNumber: z.string().nullish(),
    issuedAt: z.iso.datetime().nullish(),
    lineItems: z.array(z.lazy(() => SubscriptionInvoiceLineItemSchema())),
    notes: z.string().nullish(),
    sourceSubscriptionId: z.string().nullish(),
    sourceSubscriptionName: z.string().nullish(),
    status: SubscriptionInvoiceStatusSchema,
    stripeInvoiceId: z.string().nullish(),
    subtotal: z.number(),
    totalDue: z.number(),
    totalPaid: z.number(),
  });
}

export function VoidSubscriptionInvoiceInputSchema(): z.ZodObject<
  Properties<VoidSubscriptionInvoiceInput>
> {
  return z.object({
    reason: z.string().nullish(),
    voidedAt: z.iso.datetime(),
  });
}
