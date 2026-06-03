/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  Account,
  AccountTransactionsState,
  AddBudgetInput,
  AddTransactionInput,
  Budget,
  DeleteBudgetInput,
  DeleteTransactionInput,
  SetAccountInput,
  TransactionDetails,
  TransactionDirection,
  TransactionDirectionInput,
  TransactionEntry,
  UpdateBudgetInput,
  UpdateTransactionInput,
  UpdateTransactionPeriodInput,
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

export const TransactionDirectionSchema = z.enum(["INFLOW", "OUTFLOW"]);

export const TransactionDirectionInputSchema = z.enum(["INFLOW", "OUTFLOW"]);

export function AccountSchema(): z.ZodObject<Properties<Account>> {
  return z.object({
    __typename: z.literal("Account").optional(),
    KycAmlStatus: z.string().nullish(),
    account: z.string(),
    accountTransactionsId: z.string().nullish(),
    budgetPath: z.string().nullish(),
    chain: z.array(z.string()).nullish(),
    id: z.string(),
    name: z.string(),
    owners: z.array(z.string()).nullish(),
    type: z.string().nullish(),
  });
}

export function AccountTransactionsStateSchema(): z.ZodObject<
  Properties<AccountTransactionsState>
> {
  return z.object({
    __typename: z.literal("AccountTransactionsState").optional(),
    account: z.lazy(() => AccountSchema()),
    budgets: z.array(z.lazy(() => BudgetSchema())),
    transactions: z.array(z.lazy(() => TransactionEntrySchema())),
  });
}

export function AddBudgetInputSchema(): z.ZodObject<
  Properties<AddBudgetInput>
> {
  return z.object({
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function AddTransactionInputSchema(): z.ZodObject<
  Properties<AddTransactionInput>
> {
  return z.object({
    accountingPeriod: z.string(),
    amount: z.object({ unit: z.string(), value: z.string() }),
    blockNumber: z.number().nullish(),
    budget: z.string().nullish(),
    counterParty: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
    datetime: z.iso.datetime(),
    direction: TransactionDirectionInputSchema,
    id: z.string(),
    token: z.string(),
    txHash: z.string(),
    uniqueId: z.string().nullish(),
  });
}

export function BudgetSchema(): z.ZodObject<Properties<Budget>> {
  return z.object({
    __typename: z.literal("Budget").optional(),
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function DeleteBudgetInputSchema(): z.ZodObject<
  Properties<DeleteBudgetInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function DeleteTransactionInputSchema(): z.ZodObject<
  Properties<DeleteTransactionInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function SetAccountInputSchema(): z.ZodObject<
  Properties<SetAccountInput>
> {
  return z.object({
    KycAmlStatus: z.string().nullish(),
    account: z.string(),
    accountTransactionsId: z.string().nullish(),
    budgetPath: z.string().nullish(),
    chain: z.array(z.string()).nullish(),
    id: z.string(),
    name: z.string(),
    owners: z.array(z.string()).nullish(),
    type: z.string().nullish(),
  });
}

export function TransactionDetailsSchema(): z.ZodObject<
  Properties<TransactionDetails>
> {
  return z.object({
    __typename: z.literal("TransactionDetails").optional(),
    blockNumber: z.number().nullish(),
    token: z.string(),
    txHash: z.string(),
    uniqueId: z.string().nullish(),
  });
}

export function TransactionEntrySchema(): z.ZodObject<
  Properties<TransactionEntry>
> {
  return z.object({
    __typename: z.literal("TransactionEntry").optional(),
    accountingPeriod: z.string(),
    amount: z.object({ unit: z.string(), value: z.string() }),
    budget: z.string().nullish(),
    counterParty: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
    datetime: z.iso.datetime(),
    details: z.lazy(() => TransactionDetailsSchema()),
    direction: TransactionDirectionSchema,
    id: z.string(),
  });
}

export function UpdateBudgetInputSchema(): z.ZodObject<
  Properties<UpdateBudgetInput>
> {
  return z.object({
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function UpdateTransactionInputSchema(): z.ZodObject<
  Properties<UpdateTransactionInput>
> {
  return z.object({
    accountingPeriod: z.string().nullish(),
    amount: z.object({ unit: z.string(), value: z.string() }).nullish(),
    blockNumber: z.number().nullish(),
    budget: z.string().nullish(),
    counterParty: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
    datetime: z.iso.datetime().nullish(),
    direction: TransactionDirectionInputSchema.nullish(),
    id: z.string(),
    token: z.string().nullish(),
    txHash: z.string().nullish(),
    uniqueId: z.string().nullish(),
  });
}

export function UpdateTransactionPeriodInputSchema(): z.ZodObject<
  Properties<UpdateTransactionPeriodInput>
> {
  return z.object({
    accountingPeriod: z.string(),
    id: z.string(),
  });
}
