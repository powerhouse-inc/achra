/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AccountEntry,
  AccountType,
  AccountTypeInput,
  AccountsState,
  AddAccountInput,
  DeleteAccountInput,
  KycAmlStatusType,
  KycAmlStatusTypeInput,
  UpdateAccountInput,
  UpdateKycStatusInput,
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

export const AccountTypeSchema = z.enum([
  "Destination",
  "External",
  "Internal",
  "Source",
]);

export const AccountTypeInputSchema = z.enum([
  "Destination",
  "External",
  "Internal",
  "Source",
]);

export const KycAmlStatusTypeSchema = z.enum(["FAILED", "PASSED", "PENDING"]);

export const KycAmlStatusTypeInputSchema = z.enum([
  "FAILED",
  "PASSED",
  "PENDING",
]);

export function AccountEntrySchema(): z.ZodObject<Properties<AccountEntry>> {
  return z.object({
    __typename: z.literal("AccountEntry").optional(),
    KycAmlStatus: KycAmlStatusTypeSchema.nullish(),
    account: z.string(),
    accountTransactionsId: z.string().nullish(),
    budgetPath: z.string().nullish(),
    chain: z.array(z.string()).nullish(),
    id: z.string(),
    name: z.string(),
    owners: z.array(z.string()).nullish(),
    type: AccountTypeSchema,
  });
}

export function AccountsStateSchema(): z.ZodObject<Properties<AccountsState>> {
  return z.object({
    __typename: z.literal("AccountsState").optional(),
    accounts: z.array(z.lazy(() => AccountEntrySchema())),
  });
}

export function AddAccountInputSchema(): z.ZodObject<
  Properties<AddAccountInput>
> {
  return z.object({
    KycAmlStatus: KycAmlStatusTypeInputSchema.nullish(),
    account: z.string(),
    accountTransactionsId: z.string().nullish(),
    budgetPath: z.string().nullish(),
    chain: z.array(z.string()).nullish(),
    id: z.string(),
    name: z.string(),
    owners: z.array(z.string()).nullish(),
    type: AccountTypeInputSchema,
  });
}

export function DeleteAccountInputSchema(): z.ZodObject<
  Properties<DeleteAccountInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function UpdateAccountInputSchema(): z.ZodObject<
  Properties<UpdateAccountInput>
> {
  return z.object({
    KycAmlStatus: KycAmlStatusTypeInputSchema.nullish(),
    account: z.string().nullish(),
    accountTransactionsId: z.string().nullish(),
    budgetPath: z.string().nullish(),
    chain: z.array(z.string()).nullish(),
    id: z.string(),
    name: z.string().nullish(),
    owners: z.array(z.string()).nullish(),
    type: AccountTypeInputSchema.nullish(),
  });
}

export function UpdateKycStatusInputSchema(): z.ZodObject<
  Properties<UpdateKycStatusInput>
> {
  return z.object({
    KycAmlStatus: KycAmlStatusTypeInputSchema,
    id: z.string(),
  });
}
