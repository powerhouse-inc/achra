/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AccountType,
  AccountTypeInput,
  AddOwnerIdInput,
  AddSnapshotAccountInput,
  AddTransactionInput,
  RecalculateFlowTypesInput,
  RemoveEndingBalanceInput,
  RemoveOwnerIdInput,
  RemoveSnapshotAccountInput,
  RemoveStartingBalanceInput,
  RemoveTransactionInput,
  SetAccountsDocumentInput,
  SetEndingBalanceInput,
  SetPeriodEndInput,
  SetPeriodInput,
  SetPeriodStartInput,
  SetReportConfigInput,
  SetStartingBalanceInput,
  SnapshotAccount,
  SnapshotReportState,
  SnapshotTransaction,
  TokenBalance,
  TransactionDirection,
  TransactionDirectionInput,
  TransactionFlowType,
  TransactionFlowTypeInput,
  UpdateSnapshotAccountTypeInput,
  UpdateTransactionFlowTypeInput,
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

export const TransactionDirectionSchema = z.enum(["INFLOW", "OUTFLOW"]);

export const TransactionDirectionInputSchema = z.enum(["INFLOW", "OUTFLOW"]);

export const TransactionFlowTypeSchema = z.enum([
  "External",
  "Internal",
  "Return",
  "Swap",
  "TopUp",
]);

export const TransactionFlowTypeInputSchema = z.enum([
  "External",
  "Internal",
  "Return",
  "Swap",
  "TopUp",
]);

export function AddOwnerIdInputSchema(): z.ZodObject<
  Properties<AddOwnerIdInput>
> {
  return z.object({
    ownerId: z.string(),
  });
}

export function AddSnapshotAccountInputSchema(): z.ZodObject<
  Properties<AddSnapshotAccountInput>
> {
  return z.object({
    accountAddress: z.string(),
    accountId: z.string(),
    accountName: z.string(),
    accountTransactionsId: z.string().nullish(),
    id: z.string(),
    type: AccountTypeInputSchema,
  });
}

export function AddTransactionInputSchema(): z.ZodObject<
  Properties<AddTransactionInput>
> {
  return z.object({
    accountId: z.string(),
    amount: z.object({ unit: z.string(), value: z.string() }),
    blockNumber: z.number().nullish(),
    counterParty: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
    counterPartyAccountId: z.string().nullish(),
    datetime: z.iso.datetime(),
    direction: TransactionDirectionInputSchema,
    flowType: TransactionFlowTypeInputSchema.nullish(),
    id: z.string(),
    token: z.string(),
    transactionId: z.string(),
    txHash: z.string(),
  });
}

export function RecalculateFlowTypesInputSchema(): z.ZodObject<
  Properties<RecalculateFlowTypesInput>
> {
  return z.object({
    _: z.string().nullish(),
  });
}

export function RemoveEndingBalanceInputSchema(): z.ZodObject<
  Properties<RemoveEndingBalanceInput>
> {
  return z.object({
    accountId: z.string(),
    balanceId: z.string(),
  });
}

export function RemoveOwnerIdInputSchema(): z.ZodObject<
  Properties<RemoveOwnerIdInput>
> {
  return z.object({
    ownerId: z.string(),
  });
}

export function RemoveSnapshotAccountInputSchema(): z.ZodObject<
  Properties<RemoveSnapshotAccountInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveStartingBalanceInputSchema(): z.ZodObject<
  Properties<RemoveStartingBalanceInput>
> {
  return z.object({
    accountId: z.string(),
    balanceId: z.string(),
  });
}

export function RemoveTransactionInputSchema(): z.ZodObject<
  Properties<RemoveTransactionInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function SetAccountsDocumentInputSchema(): z.ZodObject<
  Properties<SetAccountsDocumentInput>
> {
  return z.object({
    accountsDocumentId: z.string(),
  });
}

export function SetEndingBalanceInputSchema(): z.ZodObject<
  Properties<SetEndingBalanceInput>
> {
  return z.object({
    accountId: z.string(),
    amount: z.object({ unit: z.string(), value: z.string() }),
    balanceId: z.string(),
    token: z.string(),
  });
}

export function SetPeriodEndInputSchema(): z.ZodObject<
  Properties<SetPeriodEndInput>
> {
  return z.object({
    periodEnd: z.iso.datetime(),
  });
}

export function SetPeriodInputSchema(): z.ZodObject<
  Properties<SetPeriodInput>
> {
  return z.object({
    endDate: z.iso.datetime(),
    startDate: z.iso.datetime(),
  });
}

export function SetPeriodStartInputSchema(): z.ZodObject<
  Properties<SetPeriodStartInput>
> {
  return z.object({
    periodStart: z.iso.datetime(),
  });
}

export function SetReportConfigInputSchema(): z.ZodObject<
  Properties<SetReportConfigInput>
> {
  return z.object({
    accountsDocumentId: z.string().nullish(),
    endDate: z.iso.datetime().nullish(),
    reportName: z.string().nullish(),
    startDate: z.iso.datetime().nullish(),
  });
}

export function SetStartingBalanceInputSchema(): z.ZodObject<
  Properties<SetStartingBalanceInput>
> {
  return z.object({
    accountId: z.string(),
    amount: z.object({ unit: z.string(), value: z.string() }),
    balanceId: z.string(),
    token: z.string(),
  });
}

export function SnapshotAccountSchema(): z.ZodObject<
  Properties<SnapshotAccount>
> {
  return z.object({
    __typename: z.literal("SnapshotAccount").optional(),
    accountAddress: z.string(),
    accountId: z.string(),
    accountName: z.string(),
    accountTransactionsId: z.string().nullish(),
    endingBalances: z.array(z.lazy(() => TokenBalanceSchema())),
    id: z.string(),
    startingBalances: z.array(z.lazy(() => TokenBalanceSchema())),
    transactions: z.array(z.lazy(() => SnapshotTransactionSchema())),
    type: AccountTypeSchema,
  });
}

export function SnapshotReportStateSchema(): z.ZodObject<
  Properties<SnapshotReportState>
> {
  return z.object({
    __typename: z.literal("SnapshotReportState").optional(),
    accountsDocumentId: z.string().nullish(),
    endDate: z.iso.datetime().nullish(),
    ownerIds: z.array(z.string()),
    reportName: z.string().nullish(),
    reportPeriodEnd: z.iso.datetime().nullish(),
    reportPeriodStart: z.iso.datetime().nullish(),
    snapshotAccounts: z.array(z.lazy(() => SnapshotAccountSchema())),
    startDate: z.iso.datetime().nullish(),
  });
}

export function SnapshotTransactionSchema(): z.ZodObject<
  Properties<SnapshotTransaction>
> {
  return z.object({
    __typename: z.literal("SnapshotTransaction").optional(),
    amount: z.object({ unit: z.string(), value: z.string() }),
    blockNumber: z.number().nullish(),
    counterParty: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
    counterPartyAccountId: z.string().nullish(),
    datetime: z.iso.datetime(),
    direction: TransactionDirectionSchema,
    flowType: TransactionFlowTypeSchema.nullish(),
    id: z.string(),
    token: z.string(),
    transactionId: z.string(),
    txHash: z.string(),
  });
}

export function TokenBalanceSchema(): z.ZodObject<Properties<TokenBalance>> {
  return z.object({
    __typename: z.literal("TokenBalance").optional(),
    amount: z.object({ unit: z.string(), value: z.string() }),
    id: z.string(),
    token: z.string(),
  });
}

export function UpdateSnapshotAccountTypeInputSchema(): z.ZodObject<
  Properties<UpdateSnapshotAccountTypeInput>
> {
  return z.object({
    id: z.string(),
    type: AccountTypeInputSchema,
  });
}

export function UpdateTransactionFlowTypeInputSchema(): z.ZodObject<
  Properties<UpdateTransactionFlowTypeInput>
> {
  return z.object({
    flowType: TransactionFlowTypeInputSchema,
    id: z.string(),
  });
}
