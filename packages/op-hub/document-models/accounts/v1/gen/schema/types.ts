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

export type AccountEntry = {
  KycAmlStatus: Maybe<KycAmlStatusType>;
  account: Scalars["String"]["output"];
  accountTransactionsId: Maybe<Scalars["PHID"]["output"]>;
  budgetPath: Maybe<Scalars["String"]["output"]>;
  chain: Maybe<Array<Scalars["String"]["output"]>>;
  id: Scalars["OID"]["output"];
  name: Scalars["String"]["output"];
  owners: Maybe<Array<Scalars["String"]["output"]>>;
  type: AccountType;
};

export type AccountType = "Destination" | "External" | "Internal" | "Source";

export type AccountTypeInput =
  | "Destination"
  | "External"
  | "Internal"
  | "Source";

export type AccountsState = {
  accounts: Array<AccountEntry>;
};

export type AddAccountInput = {
  KycAmlStatus?: InputMaybe<KycAmlStatusTypeInput>;
  account: Scalars["String"]["input"];
  accountTransactionsId?: InputMaybe<Scalars["PHID"]["input"]>;
  budgetPath?: InputMaybe<Scalars["String"]["input"]>;
  chain?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
  owners?: InputMaybe<Array<Scalars["String"]["input"]>>;
  type: AccountTypeInput;
};

export type DeleteAccountInput = {
  id: Scalars["OID"]["input"];
};

export type KycAmlStatusType = "FAILED" | "PASSED" | "PENDING";

export type KycAmlStatusTypeInput = "FAILED" | "PASSED" | "PENDING";

export type UpdateAccountInput = {
  KycAmlStatus?: InputMaybe<KycAmlStatusTypeInput>;
  account?: InputMaybe<Scalars["String"]["input"]>;
  accountTransactionsId?: InputMaybe<Scalars["PHID"]["input"]>;
  budgetPath?: InputMaybe<Scalars["String"]["input"]>;
  chain?: InputMaybe<Array<Scalars["String"]["input"]>>;
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  owners?: InputMaybe<Array<Scalars["String"]["input"]>>;
  type?: InputMaybe<AccountTypeInput>;
};

export type UpdateKycStatusInput = {
  KycAmlStatus: KycAmlStatusTypeInput;
  id: Scalars["OID"]["input"];
};
