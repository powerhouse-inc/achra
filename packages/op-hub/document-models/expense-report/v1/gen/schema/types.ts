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

export type AddBillingStatementInput = {
  billingStatementId: Scalars["OID"]["input"];
  wallet: Scalars["EthereumAddress"]["input"];
};

export type AddLineItemGroupInput = {
  id: Scalars["ID"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  parentId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type AddLineItemInput = {
  lineItem: LineItemInput;
  wallet: Scalars["EthereumAddress"]["input"];
};

export type AddWalletInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  wallet: Scalars["EthereumAddress"]["input"];
};

export type ExpenseReportState = {
  endDate: Maybe<Scalars["DateTime"]["output"]>;
  groups: Array<LineItemGroup>;
  ownerId: Maybe<Scalars["PHID"]["output"]>;
  periodEnd: Maybe<Scalars["DateTime"]["output"]>;
  periodStart: Maybe<Scalars["DateTime"]["output"]>;
  startDate: Maybe<Scalars["DateTime"]["output"]>;
  status: ExpenseReportStatus;
  wallets: Array<Wallet>;
};

export type ExpenseReportStatus = "DRAFT" | "FINAL" | "REVIEW";

export type ExpenseReportStatusInput = "DRAFT" | "FINAL" | "REVIEW";

export type GroupTotals = {
  group: Maybe<Scalars["ID"]["output"]>;
  totalActuals: Maybe<Scalars["Float"]["output"]>;
  totalBudget: Maybe<Scalars["Float"]["output"]>;
  totalForecast: Maybe<Scalars["Float"]["output"]>;
  totalPayments: Maybe<Scalars["Float"]["output"]>;
};

export type GroupTotalsInput = {
  group: Scalars["ID"]["input"];
  totalActuals?: InputMaybe<Scalars["Float"]["input"]>;
  totalBudget?: InputMaybe<Scalars["Float"]["input"]>;
  totalForecast?: InputMaybe<Scalars["Float"]["input"]>;
  totalPayments?: InputMaybe<Scalars["Float"]["input"]>;
};

export type LineItem = {
  actuals: Maybe<Scalars["Float"]["output"]>;
  budget: Maybe<Scalars["Float"]["output"]>;
  comments: Maybe<Scalars["String"]["output"]>;
  forecast: Maybe<Scalars["Float"]["output"]>;
  group: Maybe<Scalars["ID"]["output"]>;
  id: Maybe<Scalars["ID"]["output"]>;
  label: Maybe<Scalars["String"]["output"]>;
  payments: Maybe<Scalars["Float"]["output"]>;
};

export type LineItemGroup = {
  id: Scalars["ID"]["output"];
  label: Maybe<Scalars["String"]["output"]>;
  parentId: Maybe<Scalars["ID"]["output"]>;
};

export type LineItemInput = {
  actuals?: InputMaybe<Scalars["Float"]["input"]>;
  budget?: InputMaybe<Scalars["Float"]["input"]>;
  comments?: InputMaybe<Scalars["String"]["input"]>;
  forecast?: InputMaybe<Scalars["Float"]["input"]>;
  group?: InputMaybe<Scalars["ID"]["input"]>;
  id: Scalars["ID"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  payments?: InputMaybe<Scalars["Float"]["input"]>;
};

export type RemoveBillingStatementInput = {
  billingStatementId: Scalars["OID"]["input"];
  wallet: Scalars["EthereumAddress"]["input"];
};

export type RemoveGroupTotalsInput = {
  groupId: Scalars["ID"]["input"];
  wallet: Scalars["EthereumAddress"]["input"];
};

export type RemoveLineItemGroupInput = {
  id: Scalars["ID"]["input"];
};

export type RemoveLineItemInput = {
  lineItemId: Scalars["ID"]["input"];
  wallet: Scalars["EthereumAddress"]["input"];
};

export type RemoveWalletInput = {
  wallet: Scalars["EthereumAddress"]["input"];
};

export type SetGroupTotalsInput = {
  groupTotals: GroupTotalsInput;
  wallet: Scalars["EthereumAddress"]["input"];
};

export type SetOwnerIdInput = {
  ownerId: Scalars["PHID"]["input"];
};

export type SetPeriodEndInput = {
  periodEnd: Scalars["DateTime"]["input"];
};

export type SetPeriodInput = {
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type SetPeriodStartInput = {
  periodStart: Scalars["DateTime"]["input"];
};

export type SetStatusInput = {
  status: ExpenseReportStatusInput;
};

export type UpdateLineItemGroupInput = {
  id: Scalars["ID"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  parentId?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UpdateLineItemInput = {
  actuals?: InputMaybe<Scalars["Float"]["input"]>;
  budget?: InputMaybe<Scalars["Float"]["input"]>;
  comments?: InputMaybe<Scalars["String"]["input"]>;
  forecast?: InputMaybe<Scalars["Float"]["input"]>;
  group?: InputMaybe<Scalars["ID"]["input"]>;
  label?: InputMaybe<Scalars["String"]["input"]>;
  lineItemId: Scalars["ID"]["input"];
  payments?: InputMaybe<Scalars["Float"]["input"]>;
  wallet: Scalars["EthereumAddress"]["input"];
};

export type UpdateWalletInput = {
  accountDocumentId?: InputMaybe<Scalars["PHID"]["input"]>;
  accountTransactionsDocumentId?: InputMaybe<Scalars["PHID"]["input"]>;
  address: Scalars["EthereumAddress"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Wallet = {
  accountDocumentId: Maybe<Scalars["PHID"]["output"]>;
  accountTransactionsDocumentId: Maybe<Scalars["PHID"]["output"]>;
  billingStatements: Maybe<Array<Maybe<Scalars["OID"]["output"]>>>;
  lineItems: Maybe<Array<Maybe<LineItem>>>;
  name: Maybe<Scalars["String"]["output"]>;
  totals: Maybe<Array<Maybe<GroupTotals>>>;
  wallet: Maybe<Scalars["EthereumAddress"]["output"]>;
};
