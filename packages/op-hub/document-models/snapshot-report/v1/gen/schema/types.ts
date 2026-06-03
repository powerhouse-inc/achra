export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  Address: { input: `${string}:0x${string}`; output: `${string}:0x${string}` };
  Amount: {
    input: { unit?: string; value?: number };
    output: { unit?: string; value?: number };
  };
  Amount_Crypto: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Currency: {
    input: { unit: string; value: string };
    output: { unit: string; value: string };
  };
  Amount_Fiat: {
    input: { unit: string; value: number };
    output: { unit: string; value: number };
  };
  Amount_Money: { input: number; output: number };
  Amount_Percentage: { input: number; output: number };
  Amount_Tokens: { input: number; output: number };
  Attachment: { input: string; output: string };
  Currency: { input: string; output: string };
  Date: { input: string; output: string };
  DateTime: { input: string; output: string };
  EmailAddress: { input: string; output: string };
  EthereumAddress: { input: string; output: string };
  OID: { input: string; output: string };
  OLabel: { input: string; output: string };
  PHID: { input: string; output: string };
  URL: { input: string; output: string };
  Unknown: { input: unknown; output: unknown };
  Upload: { input: File; output: File };
};

export type AccountType = "Destination" | "External" | "Internal" | "Source";

export type AccountTypeInput =
  | "Destination"
  | "External"
  | "Internal"
  | "Source";

export type AddOwnerIdInput = {
  ownerId: Scalars["PHID"]["input"];
};

export type AddSnapshotAccountInput = {
  accountAddress: Scalars["String"]["input"];
  accountId: Scalars["OID"]["input"];
  accountName: Scalars["String"]["input"];
  accountTransactionsId?: InputMaybe<Scalars["PHID"]["input"]>;
  id: Scalars["OID"]["input"];
  type: AccountTypeInput;
};

export type AddTransactionInput = {
  accountId: Scalars["OID"]["input"];
  amount: Scalars["Amount_Currency"]["input"];
  blockNumber?: InputMaybe<Scalars["Int"]["input"]>;
  counterParty?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
  counterPartyAccountId?: InputMaybe<Scalars["OID"]["input"]>;
  datetime: Scalars["DateTime"]["input"];
  direction: TransactionDirectionInput;
  flowType?: InputMaybe<TransactionFlowTypeInput>;
  id: Scalars["OID"]["input"];
  token: Scalars["Currency"]["input"];
  transactionId: Scalars["String"]["input"];
  txHash: Scalars["String"]["input"];
};

export type RecalculateFlowTypesInput = {
  _?: InputMaybe<Scalars["String"]["input"]>;
};

export type RemoveEndingBalanceInput = {
  accountId: Scalars["OID"]["input"];
  balanceId: Scalars["OID"]["input"];
};

export type RemoveOwnerIdInput = {
  ownerId: Scalars["PHID"]["input"];
};

export type RemoveSnapshotAccountInput = {
  id: Scalars["OID"]["input"];
};

export type RemoveStartingBalanceInput = {
  accountId: Scalars["OID"]["input"];
  balanceId: Scalars["OID"]["input"];
};

export type RemoveTransactionInput = {
  id: Scalars["OID"]["input"];
};

export type SetAccountsDocumentInput = {
  accountsDocumentId: Scalars["PHID"]["input"];
};

export type SetEndingBalanceInput = {
  accountId: Scalars["OID"]["input"];
  amount: Scalars["Amount_Currency"]["input"];
  balanceId: Scalars["OID"]["input"];
  token: Scalars["Currency"]["input"];
};

export type SetPeriodEndInput = {
  periodEnd: Scalars["DateTime"]["input"];
};

export type SetPeriodInput = {
  endDate: Scalars["DateTime"]["input"];
  startDate: Scalars["DateTime"]["input"];
};

export type SetPeriodStartInput = {
  periodStart: Scalars["DateTime"]["input"];
};

export type SetReportConfigInput = {
  accountsDocumentId?: InputMaybe<Scalars["PHID"]["input"]>;
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  reportName?: InputMaybe<Scalars["String"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type SetStartingBalanceInput = {
  accountId: Scalars["OID"]["input"];
  amount: Scalars["Amount_Currency"]["input"];
  balanceId: Scalars["OID"]["input"];
  token: Scalars["Currency"]["input"];
};

export type SnapshotAccount = {
  accountAddress: Scalars["String"]["output"];
  accountId: Scalars["OID"]["output"];
  accountName: Scalars["String"]["output"];
  accountTransactionsId: Maybe<Scalars["PHID"]["output"]>;
  endingBalances: Array<TokenBalance>;
  id: Scalars["OID"]["output"];
  startingBalances: Array<TokenBalance>;
  transactions: Array<SnapshotTransaction>;
  type: AccountType;
};

export type SnapshotReportState = {
  accountsDocumentId: Maybe<Scalars["PHID"]["output"]>;
  endDate: Maybe<Scalars["DateTime"]["output"]>;
  ownerIds: Array<Scalars["PHID"]["output"]>;
  reportName: Maybe<Scalars["String"]["output"]>;
  reportPeriodEnd: Maybe<Scalars["DateTime"]["output"]>;
  reportPeriodStart: Maybe<Scalars["DateTime"]["output"]>;
  snapshotAccounts: Array<SnapshotAccount>;
  startDate: Maybe<Scalars["DateTime"]["output"]>;
};

export type SnapshotTransaction = {
  amount: Scalars["Amount_Currency"]["output"];
  blockNumber: Maybe<Scalars["Int"]["output"]>;
  counterParty: Maybe<Scalars["EthereumAddress"]["output"]>;
  counterPartyAccountId: Maybe<Scalars["OID"]["output"]>;
  datetime: Scalars["DateTime"]["output"];
  direction: TransactionDirection;
  flowType: Maybe<TransactionFlowType>;
  id: Scalars["OID"]["output"];
  token: Scalars["Currency"]["output"];
  transactionId: Scalars["String"]["output"];
  txHash: Scalars["String"]["output"];
};

export type TokenBalance = {
  amount: Scalars["Amount_Currency"]["output"];
  id: Scalars["OID"]["output"];
  token: Scalars["Currency"]["output"];
};

export type TransactionDirection = "INFLOW" | "OUTFLOW";

export type TransactionDirectionInput = "INFLOW" | "OUTFLOW";

export type TransactionFlowType =
  | "External"
  | "Internal"
  | "Return"
  | "Swap"
  | "TopUp";

export type TransactionFlowTypeInput =
  | "External"
  | "Internal"
  | "Return"
  | "Swap"
  | "TopUp";

export type UpdateSnapshotAccountTypeInput = {
  id: Scalars["OID"]["input"];
  type: AccountTypeInput;
};

export type UpdateTransactionFlowTypeInput = {
  flowType: TransactionFlowTypeInput;
  id: Scalars["OID"]["input"];
};
