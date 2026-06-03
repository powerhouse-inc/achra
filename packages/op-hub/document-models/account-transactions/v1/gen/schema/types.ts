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

export type Account = {
  KycAmlStatus: Maybe<Scalars["String"]["output"]>;
  account: Scalars["String"]["output"];
  accountTransactionsId: Maybe<Scalars["PHID"]["output"]>;
  budgetPath: Maybe<Scalars["String"]["output"]>;
  chain: Maybe<Array<Scalars["String"]["output"]>>;
  id: Scalars["OID"]["output"];
  name: Scalars["String"]["output"];
  owners: Maybe<Array<Scalars["String"]["output"]>>;
  type: Maybe<Scalars["String"]["output"]>;
};

export type AccountTransactionsState = {
  account: Account;
  budgets: Array<Budget>;
  transactions: Array<TransactionEntry>;
};

export type AddBudgetInput = {
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
};

export type AddTransactionInput = {
  accountingPeriod: Scalars["String"]["input"];
  amount: Scalars["Amount_Currency"]["input"];
  blockNumber?: InputMaybe<Scalars["Int"]["input"]>;
  budget?: InputMaybe<Scalars["OID"]["input"]>;
  counterParty?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
  datetime: Scalars["DateTime"]["input"];
  direction: TransactionDirectionInput;
  id: Scalars["ID"]["input"];
  token: Scalars["Currency"]["input"];
  txHash: Scalars["String"]["input"];
  uniqueId?: InputMaybe<Scalars["String"]["input"]>;
};

export type Budget = {
  id: Scalars["OID"]["output"];
  name: Maybe<Scalars["OLabel"]["output"]>;
};

export type DeleteBudgetInput = {
  id: Scalars["OID"]["input"];
};

export type DeleteTransactionInput = {
  id: Scalars["ID"]["input"];
};

export type SetAccountInput = {
  KycAmlStatus?: InputMaybe<Scalars["String"]["input"]>;
  account: Scalars["String"]["input"];
  accountTransactionsId?: InputMaybe<Scalars["PHID"]["input"]>;
  budgetPath?: InputMaybe<Scalars["String"]["input"]>;
  chain?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
  owners?: InputMaybe<Array<Scalars["String"]["input"]>>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type TransactionDetails = {
  blockNumber: Maybe<Scalars["Int"]["output"]>;
  token: Scalars["Currency"]["output"];
  txHash: Scalars["String"]["output"];
  uniqueId: Maybe<Scalars["String"]["output"]>;
};

export type TransactionDirection = "INFLOW" | "OUTFLOW";

export type TransactionDirectionInput = "INFLOW" | "OUTFLOW";

export type TransactionEntry = {
  accountingPeriod: Scalars["String"]["output"];
  amount: Scalars["Amount_Currency"]["output"];
  budget: Maybe<Scalars["OID"]["output"]>;
  counterParty: Maybe<Scalars["EthereumAddress"]["output"]>;
  datetime: Scalars["DateTime"]["output"];
  details: TransactionDetails;
  direction: TransactionDirection;
  id: Scalars["ID"]["output"];
};

export type UpdateBudgetInput = {
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["OLabel"]["input"]>;
};

export type UpdateTransactionInput = {
  accountingPeriod?: InputMaybe<Scalars["String"]["input"]>;
  amount?: InputMaybe<Scalars["Amount_Currency"]["input"]>;
  blockNumber?: InputMaybe<Scalars["Int"]["input"]>;
  budget?: InputMaybe<Scalars["OID"]["input"]>;
  counterParty?: InputMaybe<Scalars["EthereumAddress"]["input"]>;
  datetime?: InputMaybe<Scalars["DateTime"]["input"]>;
  direction?: InputMaybe<TransactionDirectionInput>;
  id: Scalars["ID"]["input"];
  token?: InputMaybe<Scalars["Currency"]["input"]>;
  txHash?: InputMaybe<Scalars["String"]["input"]>;
  uniqueId?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTransactionPeriodInput = {
  accountingPeriod: Scalars["String"]["input"];
  id: Scalars["ID"]["input"];
};
