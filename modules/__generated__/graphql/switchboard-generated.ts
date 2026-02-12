/* eslint-disable */
// @ts-nocheck
import { useQuery, useSuspenseQuery, UseQueryOptions, UseSuspenseQueryOptions } from '@tanstack/react-query';
import { switchboardFetcher } from '@/shared/lib/fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };

type FetchOptions = {
cache?: RequestCache;
next?: NextFetchRequestConfig;
};

            type RequestInit = {
              headers: (HeadersInit & FetchOptions) | FetchOptions;
            };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Amount: { input: any; output: any; }
  Amount_Crypto: { input: any; output: any; }
  Amount_Currency: { input: any; output: any; }
  Amount_Fiat: { input: any; output: any; }
  Amount_Money: { input: any; output: any; }
  Amount_Percentage: { input: any; output: any; }
  Amount_Tokens: { input: any; output: any; }
  Currency: { input: any; output: any; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  EthereumAddress: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  OID: { input: any; output: any; }
  OLabel: { input: any; output: any; }
  PHID: { input: any; output: any; }
  URL: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export enum AccountTransactionDirection {
  Inflow = 'INFLOW',
  Outflow = 'OUTFLOW'
}

export enum AccountTransactionFlowType {
  External = 'External',
  Internal = 'Internal',
  Return = 'Return',
  Swap = 'Swap',
  TopUp = 'TopUp'
}

export type AccountTransactions = IDocument & {
  __typename?: 'AccountTransactions';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: AccountTransactions_AccountTransactionsState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: AccountTransactions_AccountTransactionsState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type AccountTransactionsOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: AccountTransactions Document */
export type AccountTransactionsQueries = {
  __typename?: 'AccountTransactionsQueries';
  getDocument?: Maybe<AccountTransactions>;
  getDocuments?: Maybe<Array<AccountTransactions>>;
};


/** Queries: AccountTransactions Document */
export type AccountTransactionsQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: AccountTransactions Document */
export type AccountTransactionsQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type AccountTransactions_Account = {
  __typename?: 'AccountTransactions_Account';
  KycAmlStatus?: Maybe<Scalars['String']['output']>;
  account: Scalars['String']['output'];
  accountTransactionsId?: Maybe<Scalars['PHID']['output']>;
  budgetPath?: Maybe<Scalars['String']['output']>;
  chain?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
  owners?: Maybe<Array<Scalars['String']['output']>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type AccountTransactions_AccountTransactionsState = {
  __typename?: 'AccountTransactions_AccountTransactionsState';
  account: AccountTransactions_Account;
  budgets: Array<AccountTransactions_Budget>;
  transactions: Array<AccountTransactions_TransactionEntry>;
};

/** Module: Budgets */
export type AccountTransactions_AddBudgetInput = {
  id: Scalars['OID']['input'];
  name?: InputMaybe<Scalars['OLabel']['input']>;
};

/** Module: Transactions */
export type AccountTransactions_AddTransactionInput = {
  accountingPeriod: Scalars['String']['input'];
  amount: Scalars['Amount_Currency']['input'];
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  budget?: InputMaybe<Scalars['OID']['input']>;
  counterParty?: InputMaybe<Scalars['EthereumAddress']['input']>;
  datetime: Scalars['DateTime']['input'];
  direction: AccountTransactions_TransactionDirectionInput;
  id: Scalars['ID']['input'];
  token: Scalars['Currency']['input'];
  txHash: Scalars['String']['input'];
  uniqueId?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTransactions_AlchemyFetchResult = {
  __typename?: 'AccountTransactions_AlchemyFetchResult';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  transactionsAdded: Scalars['Int']['output'];
};

/** Alchemy Integration Types */
export type AccountTransactions_AlchemyTransactionsResult = {
  __typename?: 'AccountTransactions_AlchemyTransactionsResult';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  transactions: Array<AccountTransactions_TransactionData>;
  transactionsCount: Scalars['Int']['output'];
};

export type AccountTransactions_Budget = {
  __typename?: 'AccountTransactions_Budget';
  id: Scalars['OID']['output'];
  name?: Maybe<Scalars['OLabel']['output']>;
};

export type AccountTransactions_DeleteBudgetInput = {
  id: Scalars['OID']['input'];
};

export type AccountTransactions_DeleteTransactionInput = {
  id: Scalars['ID']['input'];
};

/** Module: Account */
export type AccountTransactions_SetAccountInput = {
  KycAmlStatus?: InputMaybe<Scalars['String']['input']>;
  account: Scalars['String']['input'];
  accountTransactionsId?: InputMaybe<Scalars['PHID']['input']>;
  budgetPath?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['OID']['input'];
  name: Scalars['String']['input'];
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTransactions_TransactionData = {
  __typename?: 'AccountTransactions_TransactionData';
  accountingPeriod: Scalars['String']['output'];
  amount: Scalars['Amount_Currency']['output'];
  blockNumber: Scalars['Int']['output'];
  counterParty: Scalars['EthereumAddress']['output'];
  datetime: Scalars['DateTime']['output'];
  direction: Scalars['String']['output'];
  from: Scalars['EthereumAddress']['output'];
  to: Scalars['EthereumAddress']['output'];
  token: Scalars['Currency']['output'];
  txHash: Scalars['String']['output'];
  uniqueId?: Maybe<Scalars['String']['output']>;
};

export type AccountTransactions_TransactionDetails = {
  __typename?: 'AccountTransactions_TransactionDetails';
  blockNumber?: Maybe<Scalars['Int']['output']>;
  token: Scalars['Currency']['output'];
  txHash: Scalars['String']['output'];
  uniqueId?: Maybe<Scalars['String']['output']>;
};

export enum AccountTransactions_TransactionDirection {
  Inflow = 'INFLOW',
  Outflow = 'OUTFLOW'
}

export enum AccountTransactions_TransactionDirectionInput {
  Inflow = 'INFLOW',
  Outflow = 'OUTFLOW'
}

export type AccountTransactions_TransactionEntry = {
  __typename?: 'AccountTransactions_TransactionEntry';
  accountingPeriod: Scalars['String']['output'];
  amount: Scalars['Amount_Currency']['output'];
  budget?: Maybe<Scalars['OID']['output']>;
  counterParty?: Maybe<Scalars['EthereumAddress']['output']>;
  datetime: Scalars['DateTime']['output'];
  details: AccountTransactions_TransactionDetails;
  direction: AccountTransactions_TransactionDirection;
  id: Scalars['ID']['output'];
};

export type AccountTransactions_UpdateBudgetInput = {
  id: Scalars['OID']['input'];
  name?: InputMaybe<Scalars['OLabel']['input']>;
};

export type AccountTransactions_UpdateTransactionInput = {
  accountingPeriod?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Amount_Currency']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  budget?: InputMaybe<Scalars['OID']['input']>;
  counterParty?: InputMaybe<Scalars['EthereumAddress']['input']>;
  datetime?: InputMaybe<Scalars['DateTime']['input']>;
  direction?: InputMaybe<AccountTransactions_TransactionDirectionInput>;
  id: Scalars['ID']['input'];
  token?: InputMaybe<Scalars['Currency']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  uniqueId?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTransactions_UpdateTransactionPeriodInput = {
  accountingPeriod: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type Accounts = IDocument & {
  __typename?: 'Accounts';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: Accounts_AccountsState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: Accounts_AccountsState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type AccountsOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: Accounts Document */
export type AccountsQueries = {
  __typename?: 'AccountsQueries';
  getDocument?: Maybe<Accounts>;
  getDocuments?: Maybe<Array<Accounts>>;
};


/** Queries: Accounts Document */
export type AccountsQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: Accounts Document */
export type AccountsQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type Accounts_AccountEntry = {
  __typename?: 'Accounts_AccountEntry';
  KycAmlStatus?: Maybe<Accounts_KycAmlStatusType>;
  account: Scalars['String']['output'];
  accountTransactionsId?: Maybe<Scalars['PHID']['output']>;
  budgetPath?: Maybe<Scalars['String']['output']>;
  chain?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
  owners?: Maybe<Array<Scalars['String']['output']>>;
  type: Accounts_AccountType;
};

export enum Accounts_AccountType {
  Destination = 'Destination',
  External = 'External',
  Internal = 'Internal',
  Source = 'Source'
}

export enum Accounts_AccountTypeInput {
  Destination = 'Destination',
  External = 'External',
  Internal = 'Internal',
  Source = 'Source'
}

export type Accounts_AccountsState = {
  __typename?: 'Accounts_AccountsState';
  accounts: Array<Accounts_AccountEntry>;
};

/** Module: Accounts */
export type Accounts_AddAccountInput = {
  KycAmlStatus?: InputMaybe<Accounts_KycAmlStatusTypeInput>;
  account: Scalars['String']['input'];
  accountTransactionsId?: InputMaybe<Scalars['PHID']['input']>;
  budgetPath?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['OID']['input'];
  name: Scalars['String']['input'];
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  type: Accounts_AccountTypeInput;
};

export type Accounts_DeleteAccountInput = {
  id: Scalars['OID']['input'];
};

export enum Accounts_KycAmlStatusType {
  Failed = 'FAILED',
  Passed = 'PASSED',
  Pending = 'PENDING'
}

export enum Accounts_KycAmlStatusTypeInput {
  Failed = 'FAILED',
  Passed = 'PASSED',
  Pending = 'PENDING'
}

export type Accounts_UpdateAccountInput = {
  KycAmlStatus?: InputMaybe<Accounts_KycAmlStatusTypeInput>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountTransactionsId?: InputMaybe<Scalars['PHID']['input']>;
  budgetPath?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['OID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  owners?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Accounts_AccountTypeInput>;
};

export type Accounts_UpdateKycStatusInput = {
  KycAmlStatus: Accounts_KycAmlStatusTypeInput;
  id: Scalars['OID']['input'];
};

export type AddDriveResult = {
  __typename?: 'AddDriveResult';
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

export type AllNetworks = {
  __typename?: 'AllNetworks';
  builders: Array<Builder>;
  documentType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['PHID']['output']>;
  network?: Maybe<Network>;
};

export type AnalyticsFilter = {
  currency?: InputMaybe<Scalars['String']['input']>;
  /** List of dimensions to filter by, such as 'budget' or 'project' */
  dimensions?: InputMaybe<Array<InputMaybe<AnalyticsFilterDimension>>>;
  end?: InputMaybe<Scalars['String']['input']>;
  /** Period to group by */
  granularity?: InputMaybe<AnalyticsGranularity>;
  /** List of metrics to filter by, such as 'budget' or 'actuals' */
  metrics?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start?: InputMaybe<Scalars['String']['input']>;
};

export type AnalyticsFilterDimension = {
  lod: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  select: Scalars['String']['input'];
};

export enum AnalyticsGranularity {
  Annual = 'annual',
  Daily = 'daily',
  Hourly = 'hourly',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  SemiAnnual = 'semiAnnual',
  Total = 'total',
  Weekly = 'weekly'
}

export type AnalyticsPeriod = {
  __typename?: 'AnalyticsPeriod';
  end?: Maybe<Scalars['DateTime']['output']>;
  period?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Array<Maybe<AnalyticsSeries>>>;
  start?: Maybe<Scalars['DateTime']['output']>;
};

export type AnalyticsQuery = {
  __typename?: 'AnalyticsQuery';
  currencies?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  dimensions?: Maybe<Array<Maybe<Dimension>>>;
  metrics?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  multiCurrencySeries?: Maybe<Array<Maybe<AnalyticsPeriod>>>;
  series?: Maybe<Array<Maybe<AnalyticsPeriod>>>;
};


export type AnalyticsQueryMultiCurrencySeriesArgs = {
  filter?: InputMaybe<MultiCurrencyConversions>;
};


export type AnalyticsQuerySeriesArgs = {
  filter?: InputMaybe<AnalyticsFilter>;
};

export type AnalyticsSeries = {
  __typename?: 'AnalyticsSeries';
  dimensions?: Maybe<Array<Maybe<AnalyticsSeriesDimension>>>;
  metric?: Maybe<Scalars['String']['output']>;
  sum?: Maybe<Scalars['Float']['output']>;
  unit?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['Float']['output']>;
};

export type AnalyticsSeriesDimension = {
  __typename?: 'AnalyticsSeriesDimension';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type BContentSection = {
  __typename?: 'BContentSection';
  content: Scalars['String']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  title: Scalars['String']['output'];
};

export type BFacetTarget = {
  __typename?: 'BFacetTarget';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOptions: Array<Scalars['String']['output']>;
};

export type BFaqField = {
  __typename?: 'BFaqField';
  answer?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  question?: Maybe<Scalars['String']['output']>;
};

export type BOptionGroup = {
  __typename?: 'BOptionGroup';
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type BResourceFacetBinding = {
  __typename?: 'BResourceFacetBinding';
  facetName: Scalars['String']['output'];
  facetType: Scalars['PHID']['output'];
  id: Scalars['OID']['output'];
  supportedOptions: Array<Scalars['OID']['output']>;
};

export type BService = {
  __typename?: 'BService';
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  facetBindings: Array<BResourceFacetBinding>;
  id: Scalars['OID']['output'];
  isSetupFormation: Scalars['Boolean']['output'];
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  parentServiceId?: Maybe<Scalars['OID']['output']>;
  title: Scalars['String']['output'];
};

export type BTargetAudience = {
  __typename?: 'BTargetAudience';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export enum BTemplateStatus {
  Active = 'ACTIVE',
  ComingSoon = 'COMING_SOON',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT'
}

export type BillingStatement = IDocument & {
  __typename?: 'BillingStatement';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: BillingStatement_BillingStatementState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: BillingStatement_BillingStatementState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type BillingStatementOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: BillingStatement Document */
export type BillingStatementQueries = {
  __typename?: 'BillingStatementQueries';
  getDocument?: Maybe<BillingStatement>;
  getDocuments?: Maybe<Array<BillingStatement>>;
};


/** Queries: BillingStatement Document */
export type BillingStatementQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: BillingStatement Document */
export type BillingStatementQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Module: LineItems */
export type BillingStatement_AddLineItemInput = {
  description: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  quantity: Scalars['Float']['input'];
  totalPriceCash: Scalars['Float']['input'];
  totalPricePwt: Scalars['Float']['input'];
  unit: BillingStatement_BillingStatementUnitInput;
  unitPriceCash: Scalars['Float']['input'];
  unitPricePwt: Scalars['Float']['input'];
};

export type BillingStatement_BillingStatementLineItem = {
  __typename?: 'BillingStatement_BillingStatementLineItem';
  description: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  lineItemTag: Array<BillingStatement_BillingStatementTag>;
  quantity: Scalars['Float']['output'];
  totalPriceCash: Scalars['Float']['output'];
  totalPricePwt: Scalars['Float']['output'];
  unit: BillingStatement_BillingStatementUnit;
  unitPriceCash: Scalars['Float']['output'];
  unitPricePwt: Scalars['Float']['output'];
};

export type BillingStatement_BillingStatementState = {
  __typename?: 'BillingStatement_BillingStatementState';
  contributor?: Maybe<Scalars['PHID']['output']>;
  currency: Scalars['String']['output'];
  dateDue?: Maybe<Scalars['DateTime']['output']>;
  dateIssued: Scalars['DateTime']['output'];
  lineItems: Array<BillingStatement_BillingStatementLineItem>;
  notes?: Maybe<Scalars['String']['output']>;
  status: BillingStatement_BillingStatementStatus;
  totalCash: Scalars['Float']['output'];
  totalPowt: Scalars['Float']['output'];
};

export enum BillingStatement_BillingStatementStatus {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Paid = 'PAID',
  Rejected = 'REJECTED'
}

export enum BillingStatement_BillingStatementStatusInput {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Paid = 'PAID',
  Rejected = 'REJECTED'
}

export type BillingStatement_BillingStatementTag = {
  __typename?: 'BillingStatement_BillingStatementTag';
  dimension: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export enum BillingStatement_BillingStatementUnit {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Unit = 'UNIT'
}

export enum BillingStatement_BillingStatementUnitInput {
  Day = 'DAY',
  Hour = 'HOUR',
  Minute = 'MINUTE',
  Unit = 'UNIT'
}

export type BillingStatement_DeleteLineItemInput = {
  id: Scalars['OID']['input'];
};

/** Module: General */
export type BillingStatement_EditBillingStatementInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  dateDue?: InputMaybe<Scalars['DateTime']['input']>;
  dateIssued?: InputMaybe<Scalars['DateTime']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type BillingStatement_EditContributorInput = {
  contributor: Scalars['PHID']['input'];
};

export type BillingStatement_EditLineItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
  totalPriceCash?: InputMaybe<Scalars['Float']['input']>;
  totalPricePwt?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<BillingStatement_BillingStatementUnitInput>;
  unitPriceCash?: InputMaybe<Scalars['Float']['input']>;
  unitPricePwt?: InputMaybe<Scalars['Float']['input']>;
};

/** Module: Tags */
export type BillingStatement_EditLineItemTagInput = {
  dimension: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  lineItemId: Scalars['OID']['input'];
  value: Scalars['String']['input'];
};

export type BillingStatement_EditStatusInput = {
  status: BillingStatement_BillingStatementStatusInput;
};

export type BudgetStatement = {
  __typename?: 'BudgetStatement';
  expenseReport: BudgetStatementExpenseReport;
  id: Scalars['OID']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  month: Scalars['String']['output'];
  owner: BudgetStatementOwner;
  snapshotReport: BudgetStatementSnapshotReport;
  status: Scalars['String']['output'];
};

export type BudgetStatementExpenseReport = {
  __typename?: 'BudgetStatementExpenseReport';
  groups: Array<ExpenseReportGroup>;
  periodEnd: Scalars['DateTime']['output'];
  periodStart: Scalars['DateTime']['output'];
  wallets: Array<ExpenseReportWallet>;
};

export type BudgetStatementOwner = {
  __typename?: 'BudgetStatementOwner';
  code: Scalars['String']['output'];
  id: Scalars['PHID']['output'];
  logo: Scalars['URL']['output'];
  name: Scalars['String']['output'];
};

export type BudgetStatementSnapshotReport = {
  __typename?: 'BudgetStatementSnapshotReport';
  accounts: Array<SnapshotAccount>;
  endDate: Scalars['DateTime']['output'];
  startDate: Scalars['DateTime']['output'];
};

export type Builder = {
  __typename?: 'Builder';
  code?: Maybe<Scalars['String']['output']>;
  contributors: Array<Builder>;
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id?: Maybe<Scalars['PHID']['output']>;
  isOperator: Scalars['Boolean']['output'];
  lastModified?: Maybe<Scalars['DateTime']['output']>;
  links: Array<BuilderLink>;
  name: Scalars['String']['output'];
  operationalHubMember: OpHubMember;
  scopes: Array<BuilderScope>;
  skills: Array<BuilderSkill>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<BuilderStatus>;
};

export type BuilderLink = {
  __typename?: 'BuilderLink';
  id: Scalars['OID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  url: Scalars['URL']['output'];
};

export type BuilderProduct = {
  __typename?: 'BuilderProduct';
  contentSections: Array<BContentSection>;
  description?: Maybe<Scalars['String']['output']>;
  facetTargets: Array<BFacetTarget>;
  faqFields?: Maybe<Array<BFaqField>>;
  id: Scalars['PHID']['output'];
  infoLink?: Maybe<Scalars['URL']['output']>;
  lastModified: Scalars['DateTime']['output'];
  operatorId: Scalars['PHID']['output'];
  optionGroups: Array<BOptionGroup>;
  recurringServices: Array<Scalars['String']['output']>;
  services: Array<BService>;
  setupServices: Array<Scalars['String']['output']>;
  status: BTemplateStatus;
  summary: Scalars['String']['output'];
  targetAudiences: Array<BTargetAudience>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
  title: Scalars['String']['output'];
};

export type BuilderProfile = IDocument & {
  __typename?: 'BuilderProfile';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: BuilderProfile_BuilderProfileState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: BuilderProfile_BuilderProfileState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type BuilderProfileOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: BuilderProfile Document */
export type BuilderProfileQueries = {
  __typename?: 'BuilderProfileQueries';
  getDocument?: Maybe<BuilderProfile>;
  getDocuments?: Maybe<Array<BuilderProfile>>;
};


/** Queries: BuilderProfile Document */
export type BuilderProfileQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: BuilderProfile Document */
export type BuilderProfileQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type BuilderProfileState = {
  __typename?: 'BuilderProfileState';
  about?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  contributors: Array<Scalars['PHID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['URL']['output']>;
  id?: Maybe<Scalars['PHID']['output']>;
  isOperator: Scalars['Boolean']['output'];
  lastModified?: Maybe<Scalars['DateTime']['output']>;
  links: Array<BuilderLink>;
  name?: Maybe<Scalars['String']['output']>;
  operationalHubMember: OpHubMember;
  products: Array<BuilderProduct>;
  projects: Array<BuilderProject>;
  scopes: Array<BuilderScope>;
  skills: Array<BuilderSkill>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<BuilderStatus>;
};

export type BuilderProfile_AddContributorInput = {
  contributorPHID: Scalars['PHID']['input'];
};

export type BuilderProfile_AddLinkInput = {
  id: Scalars['OID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['URL']['input'];
};

export type BuilderProfile_AddScopeInput = {
  scope?: InputMaybe<BuilderProfile_BuilderScopeInput>;
};

export type BuilderProfile_AddSkillInput = {
  skill?: InputMaybe<BuilderProfile_BuilderSkillInput>;
};

export type BuilderProfile_BuilderLink = {
  __typename?: 'BuilderProfile_BuilderLink';
  id: Scalars['OID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  url: Scalars['URL']['output'];
};

export type BuilderProfile_BuilderProfileState = {
  __typename?: 'BuilderProfile_BuilderProfileState';
  about?: Maybe<Scalars['String']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  contributors: Array<Scalars['PHID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['URL']['output']>;
  id?: Maybe<Scalars['PHID']['output']>;
  isOperator: Scalars['Boolean']['output'];
  lastModified?: Maybe<Scalars['DateTime']['output']>;
  links: Array<BuilderProfile_BuilderLink>;
  name?: Maybe<Scalars['String']['output']>;
  operationalHubMember: BuilderProfile_OpHubMember;
  scopes: Array<BuilderProfile_BuilderScope>;
  skills: Array<BuilderProfile_BuilderSkill>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<BuilderProfile_BuilderStatus>;
};

export enum BuilderProfile_BuilderScope {
  Acc = 'ACC',
  GovernanceScope = 'GOVERNANCE_SCOPE',
  ProtocolScope = 'PROTOCOL_SCOPE',
  Sta = 'STA',
  StabilityScope = 'STABILITY_SCOPE',
  Sup = 'SUP',
  SupportScope = 'SUPPORT_SCOPE'
}

export enum BuilderProfile_BuilderScopeInput {
  Acc = 'ACC',
  GovernanceScope = 'GOVERNANCE_SCOPE',
  ProtocolScope = 'PROTOCOL_SCOPE',
  Sta = 'STA',
  StabilityScope = 'STABILITY_SCOPE',
  Sup = 'SUP',
  SupportScope = 'SUPPORT_SCOPE'
}

export enum BuilderProfile_BuilderSkill {
  BackendDevelopment = 'BACKEND_DEVELOPMENT',
  DataEngineering = 'DATA_ENGINEERING',
  DevopsEngineering = 'DEVOPS_ENGINEERING',
  FrontendDevelopment = 'FRONTEND_DEVELOPMENT',
  FullStackDevelopment = 'FULL_STACK_DEVELOPMENT',
  QaTesting = 'QA_TESTING',
  SecurityEngineering = 'SECURITY_ENGINEERING',
  SmartContractDevelopment = 'SMART_CONTRACT_DEVELOPMENT',
  TechnicalWriting = 'TECHNICAL_WRITING',
  UiUxDesign = 'UI_UX_DESIGN'
}

export enum BuilderProfile_BuilderSkillInput {
  BackendDevelopment = 'BACKEND_DEVELOPMENT',
  DataEngineering = 'DATA_ENGINEERING',
  DevopsEngineering = 'DEVOPS_ENGINEERING',
  FrontendDevelopment = 'FRONTEND_DEVELOPMENT',
  FullStackDevelopment = 'FULL_STACK_DEVELOPMENT',
  QaTesting = 'QA_TESTING',
  SecurityEngineering = 'SECURITY_ENGINEERING',
  SmartContractDevelopment = 'SMART_CONTRACT_DEVELOPMENT',
  TechnicalWriting = 'TECHNICAL_WRITING',
  UiUxDesign = 'UI_UX_DESIGN'
}

export enum BuilderProfile_BuilderStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Completed = 'COMPLETED',
  Inactive = 'INACTIVE',
  OnHold = 'ON_HOLD'
}

export enum BuilderProfile_BuilderStatusInput {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Completed = 'COMPLETED',
  Inactive = 'INACTIVE',
  OnHold = 'ON_HOLD'
}

export type BuilderProfile_EditLinkInput = {
  id: Scalars['OID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['URL']['input'];
};

export type BuilderProfile_OpHubMember = {
  __typename?: 'BuilderProfile_OpHubMember';
  name?: Maybe<Scalars['String']['output']>;
  phid?: Maybe<Scalars['PHID']['output']>;
};

export type BuilderProfile_RemoveContributorInput = {
  contributorPHID: Scalars['PHID']['input'];
};

export type BuilderProfile_RemoveLinkInput = {
  id: Scalars['OID']['input'];
};

export type BuilderProfile_RemoveScopeInput = {
  scope?: InputMaybe<BuilderProfile_BuilderScopeInput>;
};

export type BuilderProfile_RemoveSkillInput = {
  skill?: InputMaybe<BuilderProfile_BuilderSkillInput>;
};

export type BuilderProfile_SetOpHubMemberInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  phid?: InputMaybe<Scalars['PHID']['input']>;
};

export type BuilderProfile_SetOperatorInput = {
  isOperator: Scalars['Boolean']['input'];
};

/** Module: Builders */
export type BuilderProfile_UpdateProfileInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['URL']['input']>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BuilderProfile_BuilderStatusInput>;
};

export type BuilderProject = {
  __typename?: 'BuilderProject';
  abstract?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['Float']['output']>;
  budgetType?: Maybe<Sow_BudgetType>;
  code: Scalars['String']['output'];
  currency?: Maybe<Sow_PmCurrency>;
  expenditure?: Maybe<Sow_BudgetExpenditure>;
  id: Scalars['OID']['output'];
  imageUrl?: Maybe<Scalars['URL']['output']>;
  scope?: Maybe<Builder_Sow_DeliverablesSet>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type BuilderSow_Deliverable = {
  __typename?: 'BuilderSOW_Deliverable';
  budgetAnchor?: Maybe<Sow_BudgetAnchorProject>;
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  keyResults: Array<Sow_KeyResult>;
  status: Sow_DeliverableStatus;
  title: Scalars['String']['output'];
  workProgress?: Maybe<Sow_Progress>;
};

export enum BuilderScope {
  Acc = 'ACC',
  GovernanceScope = 'GOVERNANCE_SCOPE',
  ProtocolScope = 'PROTOCOL_SCOPE',
  Sta = 'STA',
  StabilityScope = 'STABILITY_SCOPE',
  Sup = 'SUP',
  SupportScope = 'SUPPORT_SCOPE'
}

export enum BuilderSkill {
  BackendDevelopment = 'BACKEND_DEVELOPMENT',
  DataEngineering = 'DATA_ENGINEERING',
  DevopsEngineering = 'DEVOPS_ENGINEERING',
  FrontendDevelopment = 'FRONTEND_DEVELOPMENT',
  FullStackDevelopment = 'FULL_STACK_DEVELOPMENT',
  QaTesting = 'QA_TESTING',
  SecurityEngineering = 'SECURITY_ENGINEERING',
  SmartContractDevelopment = 'SMART_CONTRACT_DEVELOPMENT',
  TechnicalWriting = 'TECHNICAL_WRITING',
  UiUxDesign = 'UI_UX_DESIGN'
}

export enum BuilderStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Completed = 'COMPLETED',
  Inactive = 'INACTIVE',
  OnHold = 'ON_HOLD'
}

export type Builder_Sow_DeliverablesSet = {
  __typename?: 'Builder_SOW_DeliverablesSet';
  deliverables: Array<BuilderSow_Deliverable>;
  deliverablesCompleted: Sow_DeliverablesCompleted;
  progress: Sow_Progress;
  status: Sow_DeliverableSetStatus;
};

export type Builders = IDocument & {
  __typename?: 'Builders';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: Builders_BuildersState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: Builders_BuildersState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type BuildersOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: Builders Document */
export type BuildersQueries = {
  __typename?: 'BuildersQueries';
  getDocument?: Maybe<Builders>;
  getDocuments?: Maybe<Array<Builders>>;
};


/** Queries: Builders Document */
export type BuildersQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: Builders Document */
export type BuildersQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Module: Builders */
export type Builders_AddBuilderInput = {
  builderPhid: Scalars['PHID']['input'];
};

export type Builders_BuildersState = {
  __typename?: 'Builders_BuildersState';
  builders: Array<Scalars['PHID']['output']>;
};

export type Builders_RemoveBuilderInput = {
  builderPhid: Scalars['PHID']['input'];
};

export type ClientInfo = {
  __typename?: 'ClientInfo';
  icon?: Maybe<Scalars['URL']['output']>;
  id: Scalars['PHID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

/** Output type for request finance payment */
export type CreateRequestFinancePaymentOutput = {
  __typename?: 'CreateRequestFinancePaymentOutput';
  data?: Maybe<Scalars['JSONObject']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateResourceInstancesInput = {
  name: Scalars['String']['input'];
  resourceTemplateId: Scalars['PHID']['input'];
  teamName: Scalars['String']['input'];
};

export type CreateResourceInstancesOutput = {
  __typename?: 'CreateResourceInstancesOutput';
  data?: Maybe<Scalars['JSONObject']['output']>;
  errors: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CurrencyConversion = {
  metric: Scalars['String']['input'];
  sourceCurrency: Scalars['String']['input'];
};

export type Dimension = {
  __typename?: 'Dimension';
  name?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Value>>>;
};

export type DocumentDrive = IDocument & {
  __typename?: 'DocumentDrive';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: DocumentDrive_DocumentDriveState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  meta?: Maybe<DriveMeta>;
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  state: DocumentDrive_DocumentDriveState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DocumentDriveOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentDriveLocalState = {
  __typename?: 'DocumentDriveLocalState';
  availableOffline: Scalars['Boolean']['output'];
  listeners: Array<DocumentDrive_Listener>;
  sharingType?: Maybe<Scalars['String']['output']>;
  triggers: Array<DocumentDrive_Trigger>;
};

export type DocumentDriveStateInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentDrive_DocumentDriveState = {
  __typename?: 'DocumentDrive_DocumentDriveState';
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nodes: Array<DocumentDrive_Node>;
};

export type DocumentDrive_FileNode = {
  __typename?: 'DocumentDrive_FileNode';
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentFolder?: Maybe<Scalars['String']['output']>;
};

export type DocumentDrive_FolderNode = {
  __typename?: 'DocumentDrive_FolderNode';
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentFolder?: Maybe<Scalars['String']['output']>;
};

export type DocumentDrive_Listener = {
  __typename?: 'DocumentDrive_Listener';
  block: Scalars['Boolean']['output'];
  callInfo?: Maybe<DocumentDrive_ListenerCallInfo>;
  filter: DocumentDrive_ListenerFilter;
  label?: Maybe<Scalars['String']['output']>;
  listenerId: Scalars['ID']['output'];
  system: Scalars['Boolean']['output'];
};

export type DocumentDrive_ListenerCallInfo = {
  __typename?: 'DocumentDrive_ListenerCallInfo';
  data?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transmitterType?: Maybe<DocumentDrive_TransmitterType>;
};

export type DocumentDrive_ListenerFilter = {
  __typename?: 'DocumentDrive_ListenerFilter';
  branch?: Maybe<Array<Scalars['String']['output']>>;
  documentId?: Maybe<Array<Scalars['ID']['output']>>;
  documentType: Array<Scalars['String']['output']>;
  scope?: Maybe<Array<Scalars['String']['output']>>;
};

export type DocumentDrive_Node = DocumentDrive_FileNode | DocumentDrive_FolderNode;

export type DocumentDrive_PullResponderTriggerData = {
  __typename?: 'DocumentDrive_PullResponderTriggerData';
  interval: Scalars['String']['output'];
  listenerId: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export enum DocumentDrive_TransmitterType {
  Internal = 'Internal',
  MatrixConnect = 'MatrixConnect',
  PullResponder = 'PullResponder',
  RestWebhook = 'RESTWebhook',
  SecureConnect = 'SecureConnect',
  SwitchboardPush = 'SwitchboardPush'
}

export type DocumentDrive_Trigger = {
  __typename?: 'DocumentDrive_Trigger';
  data?: Maybe<DocumentDrive_TriggerData>;
  id: Scalars['ID']['output'];
  type: DocumentDrive_TriggerType;
};

export type DocumentDrive_TriggerData = DocumentDrive_PullResponderTriggerData;

export enum DocumentDrive_TriggerType {
  PullResponder = 'PullResponder'
}

export type DocumentModel = IDocument & {
  __typename?: 'DocumentModel';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DocumentModelOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentModel_Author = {
  __typename?: 'DocumentModel_Author';
  name: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type DocumentModel_CodeExample = {
  __typename?: 'DocumentModel_CodeExample';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type DocumentModel_DocumentModelGlobalState = {
  __typename?: 'DocumentModel_DocumentModelGlobalState';
  author: DocumentModel_Author;
  description: Scalars['String']['output'];
  extension: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  specifications: Array<DocumentModel_DocumentSpecification>;
};

export type DocumentModel_DocumentSpecification = {
  __typename?: 'DocumentModel_DocumentSpecification';
  changeLog: Array<Scalars['String']['output']>;
  modules: Array<DocumentModel_Module>;
  state: DocumentModel_ScopeState;
  version: Scalars['Int']['output'];
};

export type DocumentModel_Module = {
  __typename?: 'DocumentModel_Module';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  operations: Array<DocumentModel_Operation>;
};

export type DocumentModel_Operation = {
  __typename?: 'DocumentModel_Operation';
  description?: Maybe<Scalars['String']['output']>;
  errors: Array<DocumentModel_OperationError>;
  examples: Array<DocumentModel_CodeExample>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  reducer?: Maybe<Scalars['String']['output']>;
  schema?: Maybe<Scalars['String']['output']>;
  scope?: Maybe<Scalars['String']['output']>;
  template?: Maybe<Scalars['String']['output']>;
};

export type DocumentModel_OperationError = {
  __typename?: 'DocumentModel_OperationError';
  code?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  template?: Maybe<Scalars['String']['output']>;
};

export type DocumentModel_ScopeState = {
  __typename?: 'DocumentModel_ScopeState';
  global: DocumentModel_State;
  local: DocumentModel_State;
};

export type DocumentModel_State = {
  __typename?: 'DocumentModel_State';
  examples: Array<DocumentModel_CodeExample>;
  initialValue: Scalars['String']['output'];
  schema: Scalars['String']['output'];
};

export type DriveDocument = IDocument & {
  __typename?: 'DriveDocument';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DriveDocumentOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type DriveMeta = {
  __typename?: 'DriveMeta';
  preferredEditor?: Maybe<Scalars['String']['output']>;
};

export type ExpenseReport = IDocument & {
  __typename?: 'ExpenseReport';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ExpenseReport_ExpenseReportState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ExpenseReport_ExpenseReportState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ExpenseReportOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type ExpenseReportGroup = {
  __typename?: 'ExpenseReportGroup';
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  parentId: Scalars['ID']['output'];
};

export type ExpenseReportGroupTotals = {
  __typename?: 'ExpenseReportGroupTotals';
  group: Scalars['ID']['output'];
  groupLabel: Scalars['String']['output'];
  totalActuals: Scalars['Amount_Currency']['output'];
  totalBudget: Scalars['Amount_Currency']['output'];
  totalForecast: Scalars['Amount_Currency']['output'];
  totalPayments: Scalars['Amount_Currency']['output'];
};

export type ExpenseReportLineItem = {
  __typename?: 'ExpenseReportLineItem';
  actuals: Scalars['Amount_Currency']['output'];
  budget: Scalars['Amount_Currency']['output'];
  comments?: Maybe<Scalars['String']['output']>;
  forecast: Scalars['Amount_Currency']['output'];
  groupId: Scalars['ID']['output'];
  groupLabel: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  payments: Scalars['Amount_Currency']['output'];
};

/** Queries: ExpenseReport Document */
export type ExpenseReportQueries = {
  __typename?: 'ExpenseReportQueries';
  getDocument?: Maybe<ExpenseReport>;
  getDocuments?: Maybe<Array<ExpenseReport>>;
};


/** Queries: ExpenseReport Document */
export type ExpenseReportQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: ExpenseReport Document */
export type ExpenseReportQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type ExpenseReportWallet = {
  __typename?: 'ExpenseReportWallet';
  address?: Maybe<Scalars['EthereumAddress']['output']>;
  billingStatementIds: Array<Scalars['PHID']['output']>;
  lineItems: Array<ExpenseReportLineItem>;
  name?: Maybe<Scalars['String']['output']>;
  totals: Array<ExpenseReportGroupTotals>;
};

export type ExpenseReport_AddBillingStatementInput = {
  billingStatementId: Scalars['OID']['input'];
  wallet: Scalars['EthereumAddress']['input'];
};

export type ExpenseReport_AddLineItemGroupInput = {
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

export type ExpenseReport_AddLineItemInput = {
  lineItem: ExpenseReport_LineItemInput;
  wallet: Scalars['EthereumAddress']['input'];
};

/** Module: Wallet */
export type ExpenseReport_AddWalletInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  wallet: Scalars['EthereumAddress']['input'];
};

export type ExpenseReport_ExpenseReportState = {
  __typename?: 'ExpenseReport_ExpenseReportState';
  endDate?: Maybe<Scalars['DateTime']['output']>;
  groups: Array<ExpenseReport_LineItemGroup>;
  ownerId?: Maybe<Scalars['PHID']['output']>;
  periodEnd?: Maybe<Scalars['DateTime']['output']>;
  periodStart?: Maybe<Scalars['DateTime']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: ExpenseReport_ExpenseReportStatus;
  wallets: Array<ExpenseReport_Wallet>;
};

export enum ExpenseReport_ExpenseReportStatus {
  Draft = 'DRAFT',
  Final = 'FINAL',
  Review = 'REVIEW'
}

export enum ExpenseReport_ExpenseReportStatusInput {
  Draft = 'DRAFT',
  Final = 'FINAL',
  Review = 'REVIEW'
}

export type ExpenseReport_GroupTotals = {
  __typename?: 'ExpenseReport_GroupTotals';
  group?: Maybe<Scalars['ID']['output']>;
  totalActuals?: Maybe<Scalars['Float']['output']>;
  totalBudget?: Maybe<Scalars['Float']['output']>;
  totalForecast?: Maybe<Scalars['Float']['output']>;
  totalPayments?: Maybe<Scalars['Float']['output']>;
};

export type ExpenseReport_GroupTotalsInput = {
  group: Scalars['ID']['input'];
  totalActuals?: InputMaybe<Scalars['Float']['input']>;
  totalBudget?: InputMaybe<Scalars['Float']['input']>;
  totalForecast?: InputMaybe<Scalars['Float']['input']>;
  totalPayments?: InputMaybe<Scalars['Float']['input']>;
};

export type ExpenseReport_LineItem = {
  __typename?: 'ExpenseReport_LineItem';
  actuals?: Maybe<Scalars['Float']['output']>;
  budget?: Maybe<Scalars['Float']['output']>;
  comments?: Maybe<Scalars['String']['output']>;
  forecast?: Maybe<Scalars['Float']['output']>;
  group?: Maybe<Scalars['ID']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  payments?: Maybe<Scalars['Float']['output']>;
};

export type ExpenseReport_LineItemGroup = {
  __typename?: 'ExpenseReport_LineItemGroup';
  id: Scalars['ID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['ID']['output']>;
};

export type ExpenseReport_LineItemInput = {
  actuals?: InputMaybe<Scalars['Float']['input']>;
  budget?: InputMaybe<Scalars['Float']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  forecast?: InputMaybe<Scalars['Float']['input']>;
  group?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  payments?: InputMaybe<Scalars['Float']['input']>;
};

export type ExpenseReport_RemoveBillingStatementInput = {
  billingStatementId: Scalars['OID']['input'];
  wallet: Scalars['EthereumAddress']['input'];
};

export type ExpenseReport_RemoveGroupTotalsInput = {
  groupId: Scalars['ID']['input'];
  wallet: Scalars['EthereumAddress']['input'];
};

export type ExpenseReport_RemoveLineItemGroupInput = {
  id: Scalars['ID']['input'];
};

export type ExpenseReport_RemoveLineItemInput = {
  lineItemId: Scalars['ID']['input'];
  wallet: Scalars['EthereumAddress']['input'];
};

export type ExpenseReport_RemoveWalletInput = {
  wallet: Scalars['EthereumAddress']['input'];
};

export type ExpenseReport_SetGroupTotalsInput = {
  groupTotals: ExpenseReport_GroupTotalsInput;
  wallet: Scalars['EthereumAddress']['input'];
};

export type ExpenseReport_SetOwnerIdInput = {
  ownerId: Scalars['PHID']['input'];
};

export type ExpenseReport_SetPeriodEndInput = {
  periodEnd: Scalars['DateTime']['input'];
};

export type ExpenseReport_SetPeriodInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ExpenseReport_SetPeriodStartInput = {
  periodStart: Scalars['DateTime']['input'];
};

export type ExpenseReport_SetStatusInput = {
  status: ExpenseReport_ExpenseReportStatusInput;
};

export type ExpenseReport_UpdateLineItemGroupInput = {
  id: Scalars['ID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
};

export type ExpenseReport_UpdateLineItemInput = {
  actuals?: InputMaybe<Scalars['Float']['input']>;
  budget?: InputMaybe<Scalars['Float']['input']>;
  comments?: InputMaybe<Scalars['String']['input']>;
  forecast?: InputMaybe<Scalars['Float']['input']>;
  group?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  lineItemId: Scalars['ID']['input'];
  payments?: InputMaybe<Scalars['Float']['input']>;
  wallet: Scalars['EthereumAddress']['input'];
};

export type ExpenseReport_UpdateWalletInput = {
  accountDocumentId?: InputMaybe<Scalars['PHID']['input']>;
  accountTransactionsDocumentId?: InputMaybe<Scalars['PHID']['input']>;
  address: Scalars['EthereumAddress']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ExpenseReport_Wallet = {
  __typename?: 'ExpenseReport_Wallet';
  accountDocumentId?: Maybe<Scalars['PHID']['output']>;
  accountTransactionsDocumentId?: Maybe<Scalars['PHID']['output']>;
  billingStatements?: Maybe<Array<Maybe<Scalars['OID']['output']>>>;
  lineItems?: Maybe<Array<Maybe<ExpenseReport_LineItem>>>;
  name?: Maybe<Scalars['String']['output']>;
  totals?: Maybe<Array<Maybe<ExpenseReport_GroupTotals>>>;
  wallet?: Maybe<Scalars['EthereumAddress']['output']>;
};

export type Facet = IDocument & {
  __typename?: 'Facet';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: Facet_FacetState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: Facet_FacetState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type FacetOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: Facet Document */
export type FacetQueries = {
  __typename?: 'FacetQueries';
  getDocument?: Maybe<Facet>;
  getDocuments?: Maybe<Array<Facet>>;
};


/** Queries: Facet Document */
export type FacetQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: Facet Document */
export type FacetQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Module: OptionManagement */
export type Facet_AddOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type Facet_FacetOption = {
  __typename?: 'Facet_FacetOption';
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
};

export type Facet_FacetState = {
  __typename?: 'Facet_FacetState';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['PHID']['output'];
  lastModified: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  options: Array<Facet_FacetOption>;
};

export type Facet_RemoveOptionInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type Facet_ReorderOptionsInput = {
  lastModified: Scalars['DateTime']['input'];
  optionIds: Array<Scalars['OID']['input']>;
};

export type Facet_SetFacetDescriptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  lastModified: Scalars['DateTime']['input'];
};

/** Module: FacetManagement */
export type Facet_SetFacetNameInput = {
  lastModified: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
};

export type Facet_UpdateOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  lastModified: Scalars['DateTime']['input'];
};

export type FullProposal = {
  __typename?: 'FullProposal';
  author: ProposalAuthor;
  id: Scalars['OID']['output'];
  paymentTerms?: Maybe<Pt_PaymentTermsState>;
  sow?: Maybe<Sow_ScopeOfWorkState>;
  status: ProposalStatus;
};

/** Detailed Workstream hydrated from DB + documents */
export type FullQueryWorkstream = {
  __typename?: 'FullQueryWorkstream';
  alternativeProposals: Array<FullProposal>;
  client?: Maybe<ClientInfo>;
  code?: Maybe<Scalars['String']['output']>;
  initialProposal?: Maybe<FullProposal>;
  network?: Maybe<Network>;
  paymentRequests: Array<Scalars['PHID']['output']>;
  paymentTerms?: Maybe<Pt_PaymentTermsState>;
  rfp?: Maybe<Rfp>;
  slug?: Maybe<Scalars['String']['output']>;
  sow?: Maybe<Sow_ScopeOfWorkState>;
  status?: Maybe<WorkstreamStatus>;
  title?: Maybe<Scalars['String']['output']>;
};

export type GqlDocument = IDocument & {
  __typename?: 'GqlDocument';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type GqlDocumentOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type IDocument = {
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type IDocumentOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type Invoice = IDocument & {
  __typename?: 'Invoice';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: Invoice_InvoiceState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: Invoice_InvoiceState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type InvoiceOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: Invoice Document */
export type InvoiceQueries = {
  __typename?: 'InvoiceQueries';
  getDocument?: Maybe<Invoice>;
  getDocuments?: Maybe<Array<Invoice>>;
};


/** Queries: Invoice Document */
export type InvoiceQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: Invoice Document */
export type InvoiceQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type Invoice_AcceptInput = {
  payAfter?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Module: Items */
export type Invoice_AddLineItemInput = {
  currency: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  quantity: Scalars['Float']['input'];
  taxPercent: Scalars['Float']['input'];
  totalPriceTaxExcl: Scalars['Float']['input'];
  totalPriceTaxIncl: Scalars['Float']['input'];
  unitPriceTaxExcl: Scalars['Float']['input'];
  unitPriceTaxIncl: Scalars['Float']['input'];
};

export type Invoice_AddPaymentInput = {
  confirmed: Scalars['Boolean']['input'];
  id: Scalars['OID']['input'];
  issue?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  processorRef?: InputMaybe<Scalars['String']['input']>;
  txnRef?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_Address = {
  __typename?: 'Invoice_Address';
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  extendedAddress?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  stateProvince?: Maybe<Scalars['String']['output']>;
  streetAddress?: Maybe<Scalars['String']['output']>;
};

export type Invoice_Bank = {
  __typename?: 'Invoice_Bank';
  ABA?: Maybe<Scalars['String']['output']>;
  BIC?: Maybe<Scalars['String']['output']>;
  SWIFT?: Maybe<Scalars['String']['output']>;
  accountNum: Scalars['String']['output'];
  accountType?: Maybe<Invoice_InvoiceAccountType>;
  address: Invoice_Address;
  beneficiary?: Maybe<Scalars['String']['output']>;
  intermediaryBank?: Maybe<Invoice_IntermediaryBank>;
  memo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

/** Module: Transitions */
export type Invoice_CancelInput = {
  /** Add your inputs here */
  _placeholder?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_ClosePaymentInput = {
  closureReason?: InputMaybe<Invoice_ClosureReasonInput>;
};

export enum Invoice_ClosureReason {
  Cancelled = 'CANCELLED',
  Overpaid = 'OVERPAID',
  Underpaid = 'UNDERPAID'
}

export enum Invoice_ClosureReasonInput {
  Cancelled = 'CANCELLED',
  Overpaid = 'OVERPAID',
  Underpaid = 'UNDERPAID'
}

export type Invoice_ConfirmPaymentInput = {
  amount: Scalars['Float']['input'];
  id: Scalars['OID']['input'];
};

export type Invoice_ContactInfo = {
  __typename?: 'Invoice_ContactInfo';
  email?: Maybe<Scalars['String']['output']>;
  tel?: Maybe<Scalars['String']['output']>;
};

export type Invoice_DeleteLineItemInput = {
  id: Scalars['OID']['input'];
};

/** Module: General */
export type Invoice_EditInvoiceInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  dateDelivered?: InputMaybe<Scalars['String']['input']>;
  dateDue?: InputMaybe<Scalars['String']['input']>;
  dateIssued?: InputMaybe<Scalars['String']['input']>;
  invoiceNo?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_EditIssuerBankInput = {
  ABA?: InputMaybe<Scalars['String']['input']>;
  ABAIntermediary?: InputMaybe<Scalars['String']['input']>;
  BIC?: InputMaybe<Scalars['String']['input']>;
  BICIntermediary?: InputMaybe<Scalars['String']['input']>;
  SWIFT?: InputMaybe<Scalars['String']['input']>;
  SWIFTIntermediary?: InputMaybe<Scalars['String']['input']>;
  accountNum?: InputMaybe<Scalars['String']['input']>;
  accountNumIntermediary?: InputMaybe<Scalars['String']['input']>;
  accountType?: InputMaybe<Invoice_InvoiceAccountTypeInput>;
  accountTypeIntermediary?: InputMaybe<Invoice_InvoiceAccountTypeInput>;
  beneficiary?: InputMaybe<Scalars['String']['input']>;
  beneficiaryIntermediary?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  cityIntermediary?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  countryIntermediary?: InputMaybe<Scalars['String']['input']>;
  extendedAddress?: InputMaybe<Scalars['String']['input']>;
  extendedAddressIntermediary?: InputMaybe<Scalars['String']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  memoIntermediary?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nameIntermediary?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  postalCodeIntermediary?: InputMaybe<Scalars['String']['input']>;
  stateProvince?: InputMaybe<Scalars['String']['input']>;
  stateProvinceIntermediary?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  streetAddressIntermediary?: InputMaybe<Scalars['String']['input']>;
};

/** Module: Parties */
export type Invoice_EditIssuerInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  extendedAddress?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  stateProvince?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  tel?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_EditIssuerWalletInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['String']['input']>;
  chainName?: InputMaybe<Scalars['String']['input']>;
  rpc?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_EditLineItemInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  quantity?: InputMaybe<Scalars['Float']['input']>;
  taxPercent?: InputMaybe<Scalars['Float']['input']>;
  totalPriceTaxExcl?: InputMaybe<Scalars['Float']['input']>;
  totalPriceTaxIncl?: InputMaybe<Scalars['Float']['input']>;
  unitPriceTaxExcl?: InputMaybe<Scalars['Float']['input']>;
  unitPriceTaxIncl?: InputMaybe<Scalars['Float']['input']>;
};

export type Invoice_EditPayerBankInput = {
  ABA?: InputMaybe<Scalars['String']['input']>;
  ABAIntermediary?: InputMaybe<Scalars['String']['input']>;
  BIC?: InputMaybe<Scalars['String']['input']>;
  BICIntermediary?: InputMaybe<Scalars['String']['input']>;
  SWIFT?: InputMaybe<Scalars['String']['input']>;
  SWIFTIntermediary?: InputMaybe<Scalars['String']['input']>;
  accountNum?: InputMaybe<Scalars['String']['input']>;
  accountNumIntermediary?: InputMaybe<Scalars['String']['input']>;
  accountType?: InputMaybe<Invoice_InvoiceAccountTypeInput>;
  accountTypeIntermediary?: InputMaybe<Invoice_InvoiceAccountTypeInput>;
  beneficiary?: InputMaybe<Scalars['String']['input']>;
  beneficiaryIntermediary?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  cityIntermediary?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  countryIntermediary?: InputMaybe<Scalars['String']['input']>;
  extendedAddress?: InputMaybe<Scalars['String']['input']>;
  extendedAddressIntermediary?: InputMaybe<Scalars['String']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  memoIntermediary?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nameIntermediary?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  postalCodeIntermediary?: InputMaybe<Scalars['String']['input']>;
  stateProvince?: InputMaybe<Scalars['String']['input']>;
  stateProvinceIntermediary?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  streetAddressIntermediary?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_EditPayerInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  extendedAddress?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  stateProvince?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
  tel?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_EditPayerWalletInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['String']['input']>;
  chainName?: InputMaybe<Scalars['String']['input']>;
  rpc?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_EditPaymentDataInput = {
  confirmed: Scalars['Boolean']['input'];
  id: Scalars['OID']['input'];
  issue?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  processorRef?: InputMaybe<Scalars['String']['input']>;
  txnRef?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_EditStatusInput = {
  status: Invoice_Status;
};

export type Invoice_ExportedData = {
  __typename?: 'Invoice_ExportedData';
  exportedLineItems: Array<Array<Scalars['String']['output']>>;
  timestamp?: Maybe<Scalars['DateTime']['output']>;
};

export type Invoice_IntermediaryBank = {
  __typename?: 'Invoice_IntermediaryBank';
  ABA?: Maybe<Scalars['String']['output']>;
  BIC?: Maybe<Scalars['String']['output']>;
  SWIFT?: Maybe<Scalars['String']['output']>;
  accountNum: Scalars['String']['output'];
  accountType?: Maybe<Invoice_InvoiceAccountType>;
  address: Invoice_Address;
  beneficiary?: Maybe<Scalars['String']['output']>;
  memo?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export enum Invoice_InvoiceAccountType {
  Checking = 'CHECKING',
  Savings = 'SAVINGS',
  Trust = 'TRUST',
  Wallet = 'WALLET'
}

export enum Invoice_InvoiceAccountTypeInput {
  Checking = 'CHECKING',
  Savings = 'SAVINGS',
  Trust = 'TRUST',
  Wallet = 'WALLET'
}

export type Invoice_InvoiceLineItem = {
  __typename?: 'Invoice_InvoiceLineItem';
  currency: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  lineItemTag?: Maybe<Array<Invoice_InvoiceTag>>;
  quantity: Scalars['Float']['output'];
  taxPercent: Scalars['Float']['output'];
  totalPriceTaxExcl: Scalars['Float']['output'];
  totalPriceTaxIncl: Scalars['Float']['output'];
  unitPriceTaxExcl: Scalars['Float']['output'];
  unitPriceTaxIncl: Scalars['Float']['output'];
};

export type Invoice_InvoiceState = {
  __typename?: 'Invoice_InvoiceState';
  closureReason?: Maybe<Invoice_ClosureReason>;
  currency: Scalars['String']['output'];
  dateDelivered?: Maybe<Scalars['Date']['output']>;
  dateDue?: Maybe<Scalars['Date']['output']>;
  dateIssued?: Maybe<Scalars['Date']['output']>;
  exported: Invoice_ExportedData;
  invoiceNo: Scalars['String']['output'];
  invoiceTags: Array<Invoice_InvoiceTag>;
  issuer: Invoice_LegalEntity;
  lineItems: Array<Invoice_InvoiceLineItem>;
  notes?: Maybe<Scalars['String']['output']>;
  payAfter?: Maybe<Scalars['DateTime']['output']>;
  payer: Invoice_LegalEntity;
  payments: Array<Invoice_Payment>;
  rejections: Array<Invoice_Rejection>;
  status: Invoice_Status;
  totalPriceTaxExcl: Scalars['Float']['output'];
  totalPriceTaxIncl: Scalars['Float']['output'];
};

export type Invoice_InvoiceTag = {
  __typename?: 'Invoice_InvoiceTag';
  dimension: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type Invoice_InvoiceWallet = {
  __typename?: 'Invoice_InvoiceWallet';
  address?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['String']['output']>;
  chainName?: Maybe<Scalars['String']['output']>;
  rpc?: Maybe<Scalars['String']['output']>;
};

export type Invoice_IssueInput = {
  dateIssued: Scalars['String']['input'];
  invoiceNo: Scalars['String']['input'];
};

export type Invoice_LegalEntity = {
  __typename?: 'Invoice_LegalEntity';
  address?: Maybe<Invoice_Address>;
  contactInfo?: Maybe<Invoice_ContactInfo>;
  country?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Invoice_LegalEntityId>;
  name?: Maybe<Scalars['String']['output']>;
  paymentRouting?: Maybe<Invoice_PaymentRouting>;
};

export type Invoice_LegalEntityCorporateRegistrationId = {
  __typename?: 'Invoice_LegalEntityCorporateRegistrationId';
  corpRegId: Scalars['String']['output'];
};

export type Invoice_LegalEntityId = Invoice_LegalEntityCorporateRegistrationId | Invoice_LegalEntityTaxId;

export type Invoice_LegalEntityTaxId = {
  __typename?: 'Invoice_LegalEntityTaxId';
  taxId: Scalars['String']['output'];
};

export type Invoice_Payment = {
  __typename?: 'Invoice_Payment';
  amount?: Maybe<Scalars['Float']['output']>;
  confirmed: Scalars['Boolean']['output'];
  id: Scalars['OID']['output'];
  issue?: Maybe<Scalars['String']['output']>;
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
  processorRef?: Maybe<Scalars['String']['output']>;
  txnRef?: Maybe<Scalars['String']['output']>;
};

export type Invoice_PaymentRouting = {
  __typename?: 'Invoice_PaymentRouting';
  bank?: Maybe<Invoice_Bank>;
  wallet?: Maybe<Invoice_InvoiceWallet>;
};

export type Invoice_ReapprovePaymentInput = {
  /** Add your inputs here */
  _placeholder?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_RegisterPaymentTxInput = {
  id: Scalars['OID']['input'];
  timestamp: Scalars['DateTime']['input'];
  txRef: Scalars['String']['input'];
};

export type Invoice_ReinstateInput = {
  /** Add your inputs here */
  _placeholder?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_RejectInput = {
  final: Scalars['Boolean']['input'];
  id: Scalars['OID']['input'];
  reason: Scalars['String']['input'];
};

export type Invoice_Rejection = {
  __typename?: 'Invoice_Rejection';
  final: Scalars['Boolean']['output'];
  id: Scalars['OID']['output'];
  reason: Scalars['String']['output'];
};

export type Invoice_ReportPaymentIssueInput = {
  id: Scalars['OID']['input'];
  issue: Scalars['String']['input'];
};

export type Invoice_ResetInput = {
  /** Add your inputs here */
  _placeholder?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_SchedulePaymentInput = {
  id: Scalars['OID']['input'];
  processorRef: Scalars['String']['input'];
};

export type Invoice_SetExportedDataInput = {
  exportedLineItems: Array<Array<Scalars['String']['input']>>;
  timestamp: Scalars['DateTime']['input'];
};

export type Invoice_SetInvoiceTagInput = {
  dimension: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  value: Scalars['String']['input'];
};

export type Invoice_SetLineItemTagInput = {
  dimension: Scalars['String']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  lineItemId: Scalars['OID']['input'];
  value: Scalars['String']['input'];
};

export enum Invoice_Status {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Issued = 'ISSUED',
  Paymentclosed = 'PAYMENTCLOSED',
  Paymentissue = 'PAYMENTISSUE',
  Paymentreceived = 'PAYMENTRECEIVED',
  Paymentscheduled = 'PAYMENTSCHEDULED',
  Paymentsent = 'PAYMENTSENT',
  Rejected = 'REJECTED'
}

export type Invoice_Token = {
  __typename?: 'Invoice_Token';
  chainId?: Maybe<Scalars['String']['output']>;
  chainName?: Maybe<Scalars['String']['output']>;
  evmAddress?: Maybe<Scalars['String']['output']>;
  rpc?: Maybe<Scalars['String']['output']>;
  symbol?: Maybe<Scalars['String']['output']>;
};

export type LinkedDocument = {
  __typename?: 'LinkedDocument';
  id: Scalars['PHID']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};

export type MultiCurrencyConversions = {
  conversions: Array<InputMaybe<CurrencyConversion>>;
  currency?: InputMaybe<Scalars['String']['input']>;
  /** List of dimensions to filter by, such as 'budget' or 'project' */
  dimensions?: InputMaybe<Array<InputMaybe<AnalyticsFilterDimension>>>;
  end?: InputMaybe<Scalars['String']['input']>;
  /** Period to group by */
  granularity?: InputMaybe<AnalyticsGranularity>;
  /** List of metrics to filter by, such as 'budget' or 'actuals' */
  metrics?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  start?: InputMaybe<Scalars['String']['input']>;
};

/** Subgraph definition */
export type Mutation = {
  __typename?: 'Mutation';
  AccountTransactions_addBudget?: Maybe<Scalars['Int']['output']>;
  AccountTransactions_addTransaction?: Maybe<Scalars['Int']['output']>;
  AccountTransactions_createDocument?: Maybe<Scalars['String']['output']>;
  AccountTransactions_deleteBudget?: Maybe<Scalars['Int']['output']>;
  AccountTransactions_deleteTransaction?: Maybe<Scalars['Int']['output']>;
  AccountTransactions_fetchTransactionsFromAlchemy?: Maybe<AccountTransactions_AlchemyFetchResult>;
  AccountTransactions_getTransactionsFromAlchemy?: Maybe<AccountTransactions_AlchemyTransactionsResult>;
  AccountTransactions_setAccount?: Maybe<Scalars['Int']['output']>;
  AccountTransactions_updateBudget?: Maybe<Scalars['Int']['output']>;
  AccountTransactions_updateTransaction?: Maybe<Scalars['Int']['output']>;
  AccountTransactions_updateTransactionPeriod?: Maybe<Scalars['Int']['output']>;
  Accounts_addAccount?: Maybe<Scalars['Int']['output']>;
  Accounts_createDocument?: Maybe<Scalars['String']['output']>;
  Accounts_deleteAccount?: Maybe<Scalars['Int']['output']>;
  Accounts_updateAccount?: Maybe<Scalars['Int']['output']>;
  Accounts_updateKycStatus?: Maybe<Scalars['Int']['output']>;
  BillingStatement_addLineItem?: Maybe<Scalars['Int']['output']>;
  BillingStatement_createDocument?: Maybe<Scalars['String']['output']>;
  BillingStatement_deleteLineItem?: Maybe<Scalars['Int']['output']>;
  BillingStatement_editBillingStatement?: Maybe<Scalars['Int']['output']>;
  BillingStatement_editContributor?: Maybe<Scalars['Int']['output']>;
  BillingStatement_editLineItem?: Maybe<Scalars['Int']['output']>;
  BillingStatement_editLineItemTag?: Maybe<Scalars['Int']['output']>;
  BillingStatement_editStatus?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_addContributor?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_addLink?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_addScope?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_addSkill?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_createDocument?: Maybe<Scalars['String']['output']>;
  BuilderProfile_editLink?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_removeContributor?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_removeLink?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_removeScope?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_removeSkill?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_setOpHubMember?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_setOperator?: Maybe<Scalars['Int']['output']>;
  BuilderProfile_updateProfile?: Maybe<Scalars['Int']['output']>;
  Builders_addBuilder?: Maybe<Scalars['Int']['output']>;
  Builders_createDocument?: Maybe<Scalars['String']['output']>;
  Builders_removeBuilder?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_addBillingStatement?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_addLineItem?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_addLineItemGroup?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_addWallet?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_createDocument?: Maybe<Scalars['String']['output']>;
  ExpenseReport_removeBillingStatement?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_removeGroupTotals?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_removeLineItem?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_removeLineItemGroup?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_removeWallet?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_setGroupTotals?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_setOwnerId?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_setPeriod?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_setPeriodEnd?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_setPeriodStart?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_setStatus?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_updateLineItem?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_updateLineItemGroup?: Maybe<Scalars['Int']['output']>;
  ExpenseReport_updateWallet?: Maybe<Scalars['Int']['output']>;
  Facet_addOption?: Maybe<Scalars['Int']['output']>;
  Facet_createDocument?: Maybe<Scalars['String']['output']>;
  Facet_removeOption?: Maybe<Scalars['Int']['output']>;
  Facet_reorderOptions?: Maybe<Scalars['Int']['output']>;
  Facet_setFacetDescription?: Maybe<Scalars['Int']['output']>;
  Facet_setFacetName?: Maybe<Scalars['Int']['output']>;
  Facet_updateOption?: Maybe<Scalars['Int']['output']>;
  Invoice_accept?: Maybe<Scalars['Int']['output']>;
  Invoice_addLineItem?: Maybe<Scalars['Int']['output']>;
  Invoice_addPayment?: Maybe<Scalars['Int']['output']>;
  Invoice_cancel?: Maybe<Scalars['Int']['output']>;
  Invoice_closePayment?: Maybe<Scalars['Int']['output']>;
  Invoice_confirmPayment?: Maybe<Scalars['Int']['output']>;
  Invoice_createDocument?: Maybe<Scalars['String']['output']>;
  Invoice_createRequestFinancePayment?: Maybe<CreateRequestFinancePaymentOutput>;
  Invoice_deleteLineItem?: Maybe<Scalars['Int']['output']>;
  Invoice_editInvoice?: Maybe<Scalars['Int']['output']>;
  Invoice_editIssuer?: Maybe<Scalars['Int']['output']>;
  Invoice_editIssuerBank?: Maybe<Scalars['Int']['output']>;
  Invoice_editIssuerWallet?: Maybe<Scalars['Int']['output']>;
  Invoice_editLineItem?: Maybe<Scalars['Int']['output']>;
  Invoice_editPayer?: Maybe<Scalars['Int']['output']>;
  Invoice_editPayerBank?: Maybe<Scalars['Int']['output']>;
  Invoice_editPayerWallet?: Maybe<Scalars['Int']['output']>;
  Invoice_editPaymentData?: Maybe<Scalars['Int']['output']>;
  Invoice_editStatus?: Maybe<Scalars['Int']['output']>;
  Invoice_issue?: Maybe<Scalars['Int']['output']>;
  Invoice_processGnosisPayment?: Maybe<ProcessGnosisPaymentOutput>;
  Invoice_reapprovePayment?: Maybe<Scalars['Int']['output']>;
  Invoice_registerPaymentTx?: Maybe<Scalars['Int']['output']>;
  Invoice_reinstate?: Maybe<Scalars['Int']['output']>;
  Invoice_reject?: Maybe<Scalars['Int']['output']>;
  Invoice_reportPaymentIssue?: Maybe<Scalars['Int']['output']>;
  Invoice_reset?: Maybe<Scalars['Int']['output']>;
  Invoice_schedulePayment?: Maybe<Scalars['Int']['output']>;
  Invoice_setExportedData?: Maybe<Scalars['Int']['output']>;
  Invoice_setInvoiceTag?: Maybe<Scalars['Int']['output']>;
  Invoice_setLineItemTag?: Maybe<Scalars['Int']['output']>;
  Invoice_uploadInvoicePdfChunk?: Maybe<UploadInvoicePdfChunkOutput>;
  NetworkProfile_createDocument?: Maybe<Scalars['String']['output']>;
  NetworkProfile_setCategory?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setDescription?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setDiscord?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setGithub?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setIcon?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setLogo?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setLogoBig?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setProfileName?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setWebsite?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setX?: Maybe<Scalars['Int']['output']>;
  NetworkProfile_setYoutube?: Maybe<Scalars['Int']['output']>;
  OperationalHubProfile_addSubteam?: Maybe<Scalars['Int']['output']>;
  OperationalHubProfile_createDocument?: Maybe<Scalars['String']['output']>;
  OperationalHubProfile_removeSubteam?: Maybe<Scalars['Int']['output']>;
  OperationalHubProfile_setOperationalHubName?: Maybe<Scalars['Int']['output']>;
  OperationalHubProfile_setOperatorTeam?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_addBonusClause?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_addMilestone?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_addPenaltyClause?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_createDocument?: Maybe<Scalars['String']['output']>;
  PaymentTerms_deleteBonusClause?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_deleteMilestone?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_deletePenaltyClause?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_reorderMilestones?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_setBasicTerms?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_setEscrowDetails?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_setEvaluationTerms?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_setTimeAndMaterials?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updateBonusClause?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updateMilestone?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updateMilestoneStatus?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updatePenaltyClause?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updateStatus?: Maybe<Scalars['Int']['output']>;
  RequestForProposals_addContextDocument?: Maybe<Scalars['Int']['output']>;
  RequestForProposals_addProposal?: Maybe<Scalars['Int']['output']>;
  RequestForProposals_changeProposalStatus?: Maybe<Scalars['Int']['output']>;
  RequestForProposals_createDocument?: Maybe<Scalars['String']['output']>;
  RequestForProposals_editRfp?: Maybe<Scalars['Int']['output']>;
  RequestForProposals_removeContextDocument?: Maybe<Scalars['Int']['output']>;
  RequestForProposals_removeProposal?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_activateInstance?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_applyConfigurationChanges?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_confirmInstance?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_createDocument?: Maybe<Scalars['String']['output']>;
  ResourceInstance_initializeInstance?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_removeInstanceFacet?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_reportProvisioningCompleted?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_reportProvisioningFailed?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_reportProvisioningStarted?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_resumeAfterMaintenance?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_resumeAfterPayment?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_setInstanceFacet?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_setResourceProfile?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_suspendForMaintenance?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_suspendForNonPayment?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_suspendInstance?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_terminateInstance?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_updateInstanceFacet?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_updateInstanceInfo?: Maybe<Scalars['Int']['output']>;
  ResourceInstance_updateInstanceStatus?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_addContentSection?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_addFacetBinding?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_addFacetOption?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_addFaq?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_addOptionGroup?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_addService?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_addTargetAudience?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_createDocument?: Maybe<Scalars['String']['output']>;
  ResourceTemplate_deleteContentSection?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_deleteFaq?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_deleteOptionGroup?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_deleteService?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_removeFacetBinding?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_removeFacetOption?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_removeFacetTarget?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_removeTargetAudience?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_reorderContentSections?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_reorderFaqs?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_setFacetTarget?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_setOperator?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_setRecurringServices?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_setSetupServices?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_setTemplateId?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_updateContentSection?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_updateFaq?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_updateOptionGroup?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_updateService?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_updateTemplateInfo?: Maybe<Scalars['Int']['output']>;
  ResourceTemplate_updateTemplateStatus?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addAgent?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addCoordinator?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addDeliverable?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addDeliverableInSet?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addKeyResult?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addMilestone?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addMilestoneDeliverable?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addProject?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addProjectDeliverable?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_addRoadmap?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_createDocument?: Maybe<Scalars['String']['output']>;
  ScopeOfWork_editAgent?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_editDeliverable?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_editDeliverablesSet?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_editKeyResult?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_editMilestone?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_editRoadmap?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_editScopeOfWork?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeAgent?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeCoordinator?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeDeliverable?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeDeliverableInSet?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeKeyResult?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeMilestone?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeMilestoneDeliverable?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeProject?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeProjectDeliverable?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_removeRoadmap?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_setDeliverableBudgetAnchorProject?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_setDeliverableProgress?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_setProjectMargin?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_setProjectTotalBudget?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_updateProject?: Maybe<Scalars['Int']['output']>;
  ScopeOfWork_updateProjectOwner?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addFacetBinding?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addFacetOption?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addOptionGroup?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addService?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addServiceGroup?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addServiceLevel?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addTargetAudience?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addTier?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addTierPricingOption?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_addUsageLimit?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_changeResourceTemplate?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_createDocument?: Maybe<Scalars['String']['output']>;
  ServiceOffering_deleteOptionGroup?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_deleteService?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_deleteServiceGroup?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_deleteTier?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_removeFacetBinding?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_removeFacetOption?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_removeFacetTarget?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_removeServiceLevel?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_removeTargetAudience?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_removeTierPricingOption?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_removeUsageLimit?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_reorderServiceGroups?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_selectResourceTemplate?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_setFacetTarget?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_setOfferingId?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_setOperator?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateOfferingInfo?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateOfferingStatus?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateOptionGroup?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateService?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateServiceGroup?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateServiceLevel?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateTier?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateTierPricing?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateTierPricingOption?: Maybe<Scalars['Int']['output']>;
  ServiceOffering_updateUsageLimit?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_activateSubscription?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_addAddon?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_cancelSubscription?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_changeTier?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_createDocument?: Maybe<Scalars['String']['output']>;
  ServiceSubscription_expireSubscription?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_initializeSubscription?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_removeAddon?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_removeFacetSelection?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_setCachedSnippets?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_setFacetSelection?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_setPricing?: Maybe<Scalars['Int']['output']>;
  ServiceSubscription_updateBillingProjection?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_addOwnerId?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_addSnapshotAccount?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_addTransaction?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_createDocument?: Maybe<Scalars['String']['output']>;
  SnapshotReport_recalculateFlowTypes?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_removeEndingBalance?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_removeOwnerId?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_removeSnapshotAccount?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_removeStartingBalance?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_removeTransaction?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_setAccountsDocument?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_setEndingBalance?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_setPeriod?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_setPeriodEnd?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_setPeriodStart?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_setReportConfig?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_setStartingBalance?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_updateSnapshotAccountType?: Maybe<Scalars['Int']['output']>;
  SnapshotReport_updateTransactionFlowType?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_activateSubscription?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_addService?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_addServiceGroup?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_addServiceMetric?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_addServiceToGroup?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_cancelSubscription?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_createDocument?: Maybe<Scalars['String']['output']>;
  SubscriptionInstance_decrementMetricUsage?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_incrementMetricUsage?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_initializeSubscription?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_pauseSubscription?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_removeBudgetCategory?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_removeService?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_removeServiceFromGroup?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_removeServiceGroup?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_removeServiceMetric?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_renewExpiringSubscription?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_reportRecurringPayment?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_reportSetupPayment?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_resumeSubscription?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_setAutoRenew?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_setBudgetCategory?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_setCustomerType?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_setExpiring?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_setOperatorNotes?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_setRenewalDate?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_setResourceDocument?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateBillingProjection?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateCustomerInfo?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateMetric?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateMetricUsage?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateServiceInfo?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateServiceRecurringCost?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateServiceSetupCost?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateSubscriptionStatus?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateTeamMemberCount?: Maybe<Scalars['Int']['output']>;
  SubscriptionInstance_updateTierInfo?: Maybe<Scalars['Int']['output']>;
  Workstream_addAlternativeProposal?: Maybe<Scalars['Int']['output']>;
  Workstream_addPaymentRequest?: Maybe<Scalars['Int']['output']>;
  Workstream_createDocument?: Maybe<Scalars['String']['output']>;
  Workstream_editAlternativeProposal?: Maybe<Scalars['Int']['output']>;
  Workstream_editClientInfo?: Maybe<Scalars['Int']['output']>;
  Workstream_editInitialProposal?: Maybe<Scalars['Int']['output']>;
  Workstream_editWorkstream?: Maybe<Scalars['Int']['output']>;
  Workstream_removeAlternativeProposal?: Maybe<Scalars['Int']['output']>;
  Workstream_removePaymentRequest?: Maybe<Scalars['Int']['output']>;
  Workstream_setRequestForProposal?: Maybe<Scalars['Int']['output']>;
  addDrive?: Maybe<AddDriveResult>;
  createResourceInstances?: Maybe<CreateResourceInstancesOutput>;
  deleteDocument?: Maybe<Scalars['Boolean']['output']>;
  deleteDrive?: Maybe<Scalars['Boolean']['output']>;
  setDriveIcon?: Maybe<Scalars['Boolean']['output']>;
  setDriveName?: Maybe<Scalars['Boolean']['output']>;
};


/** Subgraph definition */
export type MutationAccountTransactions_AddBudgetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AccountTransactions_AddBudgetInput>;
};


/** Subgraph definition */
export type MutationAccountTransactions_AddTransactionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AccountTransactions_AddTransactionInput>;
};


/** Subgraph definition */
export type MutationAccountTransactions_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationAccountTransactions_DeleteBudgetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AccountTransactions_DeleteBudgetInput>;
};


/** Subgraph definition */
export type MutationAccountTransactions_DeleteTransactionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AccountTransactions_DeleteTransactionInput>;
};


/** Subgraph definition */
export type MutationAccountTransactions_FetchTransactionsFromAlchemyArgs = {
  address: Scalars['EthereumAddress']['input'];
  docId: Scalars['PHID']['input'];
  fromBlock?: InputMaybe<Scalars['String']['input']>;
};


/** Subgraph definition */
export type MutationAccountTransactions_GetTransactionsFromAlchemyArgs = {
  address: Scalars['EthereumAddress']['input'];
  fromBlock?: InputMaybe<Scalars['String']['input']>;
};


/** Subgraph definition */
export type MutationAccountTransactions_SetAccountArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AccountTransactions_SetAccountInput>;
};


/** Subgraph definition */
export type MutationAccountTransactions_UpdateBudgetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AccountTransactions_UpdateBudgetInput>;
};


/** Subgraph definition */
export type MutationAccountTransactions_UpdateTransactionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AccountTransactions_UpdateTransactionInput>;
};


/** Subgraph definition */
export type MutationAccountTransactions_UpdateTransactionPeriodArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AccountTransactions_UpdateTransactionPeriodInput>;
};


/** Subgraph definition */
export type MutationAccounts_AddAccountArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Accounts_AddAccountInput>;
};


/** Subgraph definition */
export type MutationAccounts_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationAccounts_DeleteAccountArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Accounts_DeleteAccountInput>;
};


/** Subgraph definition */
export type MutationAccounts_UpdateAccountArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Accounts_UpdateAccountInput>;
};


/** Subgraph definition */
export type MutationAccounts_UpdateKycStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Accounts_UpdateKycStatusInput>;
};


/** Subgraph definition */
export type MutationBillingStatement_AddLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BillingStatement_AddLineItemInput>;
};


/** Subgraph definition */
export type MutationBillingStatement_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationBillingStatement_DeleteLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BillingStatement_DeleteLineItemInput>;
};


/** Subgraph definition */
export type MutationBillingStatement_EditBillingStatementArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BillingStatement_EditBillingStatementInput>;
};


/** Subgraph definition */
export type MutationBillingStatement_EditContributorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BillingStatement_EditContributorInput>;
};


/** Subgraph definition */
export type MutationBillingStatement_EditLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BillingStatement_EditLineItemInput>;
};


/** Subgraph definition */
export type MutationBillingStatement_EditLineItemTagArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BillingStatement_EditLineItemTagInput>;
};


/** Subgraph definition */
export type MutationBillingStatement_EditStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BillingStatement_EditStatusInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_AddContributorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_AddContributorInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_AddLinkArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_AddLinkInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_AddScopeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_AddScopeInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_AddSkillArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_AddSkillInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationBuilderProfile_EditLinkArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_EditLinkInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_RemoveContributorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_RemoveContributorInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_RemoveLinkArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_RemoveLinkInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_RemoveScopeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_RemoveScopeInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_RemoveSkillArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_RemoveSkillInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_SetOpHubMemberArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_SetOpHubMemberInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_SetOperatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_SetOperatorInput>;
};


/** Subgraph definition */
export type MutationBuilderProfile_UpdateProfileArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_UpdateProfileInput>;
};


/** Subgraph definition */
export type MutationBuilders_AddBuilderArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Builders_AddBuilderInput>;
};


/** Subgraph definition */
export type MutationBuilders_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationBuilders_RemoveBuilderArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Builders_RemoveBuilderInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_AddBillingStatementArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_AddBillingStatementInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_AddLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_AddLineItemInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_AddLineItemGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_AddLineItemGroupInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_AddWalletArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_AddWalletInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationExpenseReport_RemoveBillingStatementArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_RemoveBillingStatementInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_RemoveGroupTotalsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_RemoveGroupTotalsInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_RemoveLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_RemoveLineItemInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_RemoveLineItemGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_RemoveLineItemGroupInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_RemoveWalletArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_RemoveWalletInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_SetGroupTotalsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_SetGroupTotalsInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_SetOwnerIdArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_SetOwnerIdInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_SetPeriodArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_SetPeriodInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_SetPeriodEndArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_SetPeriodEndInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_SetPeriodStartArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_SetPeriodStartInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_SetStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_SetStatusInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_UpdateLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_UpdateLineItemInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_UpdateLineItemGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_UpdateLineItemGroupInput>;
};


/** Subgraph definition */
export type MutationExpenseReport_UpdateWalletArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ExpenseReport_UpdateWalletInput>;
};


/** Subgraph definition */
export type MutationFacet_AddOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Facet_AddOptionInput>;
};


/** Subgraph definition */
export type MutationFacet_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationFacet_RemoveOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Facet_RemoveOptionInput>;
};


/** Subgraph definition */
export type MutationFacet_ReorderOptionsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Facet_ReorderOptionsInput>;
};


/** Subgraph definition */
export type MutationFacet_SetFacetDescriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Facet_SetFacetDescriptionInput>;
};


/** Subgraph definition */
export type MutationFacet_SetFacetNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Facet_SetFacetNameInput>;
};


/** Subgraph definition */
export type MutationFacet_UpdateOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Facet_UpdateOptionInput>;
};


/** Subgraph definition */
export type MutationInvoice_AcceptArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_AcceptInput>;
};


/** Subgraph definition */
export type MutationInvoice_AddLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_AddLineItemInput>;
};


/** Subgraph definition */
export type MutationInvoice_AddPaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_AddPaymentInput>;
};


/** Subgraph definition */
export type MutationInvoice_CancelArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_CancelInput>;
};


/** Subgraph definition */
export type MutationInvoice_ClosePaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_ClosePaymentInput>;
};


/** Subgraph definition */
export type MutationInvoice_ConfirmPaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_ConfirmPaymentInput>;
};


/** Subgraph definition */
export type MutationInvoice_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationInvoice_CreateRequestFinancePaymentArgs = {
  paymentData: Scalars['JSONObject']['input'];
};


/** Subgraph definition */
export type MutationInvoice_DeleteLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_DeleteLineItemInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditInvoiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditInvoiceInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditIssuerArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditIssuerInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditIssuerBankArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditIssuerBankInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditIssuerWalletArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditIssuerWalletInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditLineItemArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditLineItemInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditPayerArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditPayerInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditPayerBankArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditPayerBankInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditPayerWalletArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditPayerWalletInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditPaymentDataArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditPaymentDataInput>;
};


/** Subgraph definition */
export type MutationInvoice_EditStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_EditStatusInput>;
};


/** Subgraph definition */
export type MutationInvoice_IssueArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_IssueInput>;
};


/** Subgraph definition */
export type MutationInvoice_ProcessGnosisPaymentArgs = {
  chainName: Scalars['String']['input'];
  invoiceNo: Scalars['String']['input'];
  paymentDetails: Scalars['JSONObject']['input'];
};


/** Subgraph definition */
export type MutationInvoice_ReapprovePaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_ReapprovePaymentInput>;
};


/** Subgraph definition */
export type MutationInvoice_RegisterPaymentTxArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_RegisterPaymentTxInput>;
};


/** Subgraph definition */
export type MutationInvoice_ReinstateArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_ReinstateInput>;
};


/** Subgraph definition */
export type MutationInvoice_RejectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_RejectInput>;
};


/** Subgraph definition */
export type MutationInvoice_ReportPaymentIssueArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_ReportPaymentIssueInput>;
};


/** Subgraph definition */
export type MutationInvoice_ResetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_ResetInput>;
};


/** Subgraph definition */
export type MutationInvoice_SchedulePaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_SchedulePaymentInput>;
};


/** Subgraph definition */
export type MutationInvoice_SetExportedDataArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_SetExportedDataInput>;
};


/** Subgraph definition */
export type MutationInvoice_SetInvoiceTagArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_SetInvoiceTagInput>;
};


/** Subgraph definition */
export type MutationInvoice_SetLineItemTagArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Invoice_SetLineItemTagInput>;
};


/** Subgraph definition */
export type MutationInvoice_UploadInvoicePdfChunkArgs = {
  chunk: Scalars['String']['input'];
  chunkIndex: Scalars['Int']['input'];
  fileName: Scalars['String']['input'];
  sessionId: Scalars['String']['input'];
  totalChunks: Scalars['Int']['input'];
};


/** Subgraph definition */
export type MutationNetworkProfile_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationNetworkProfile_SetCategoryArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetCategoryInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetDescriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetDescriptionInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetDiscordArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetDiscordInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetGithubArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetGithubInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetIconArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetIconInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetLogoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetLogoInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetLogoBigArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetLogoBigInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetProfileNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetProfileNameInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetWebsiteArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetWebsiteInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetXArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetXInput>;
};


/** Subgraph definition */
export type MutationNetworkProfile_SetYoutubeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetYoutubeInput>;
};


/** Subgraph definition */
export type MutationOperationalHubProfile_AddSubteamArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<OperationalHubProfile_AddSubteamInput>;
};


/** Subgraph definition */
export type MutationOperationalHubProfile_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationOperationalHubProfile_RemoveSubteamArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<OperationalHubProfile_RemoveSubteamInput>;
};


/** Subgraph definition */
export type MutationOperationalHubProfile_SetOperationalHubNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<OperationalHubProfile_SetOperationalHubNameInput>;
};


/** Subgraph definition */
export type MutationOperationalHubProfile_SetOperatorTeamArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<OperationalHubProfile_SetOperatorTeamInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_AddBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddBonusClauseInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_AddMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddMilestoneInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_AddPenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddPenaltyClauseInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationPaymentTerms_DeleteBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeleteBonusClauseInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_DeleteMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeleteMilestoneInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_DeletePenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeletePenaltyClauseInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_ReorderMilestonesArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_ReorderMilestonesInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_SetBasicTermsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetBasicTermsInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_SetEscrowDetailsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetEscrowDetailsInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_SetEvaluationTermsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetEvaluationTermsInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_SetTimeAndMaterialsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetTimeAndMaterialsInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_UpdateBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateBonusClauseInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_UpdateMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateMilestoneInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_UpdateMilestoneStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateMilestoneStatusInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_UpdatePenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdatePenaltyClauseInput>;
};


/** Subgraph definition */
export type MutationPaymentTerms_UpdateStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateStatusInput>;
};


/** Subgraph definition */
export type MutationRequestForProposals_AddContextDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_AddContextDocumentInput>;
};


/** Subgraph definition */
export type MutationRequestForProposals_AddProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_AddProposalInput>;
};


/** Subgraph definition */
export type MutationRequestForProposals_ChangeProposalStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_ChangeProposalStatusInput>;
};


/** Subgraph definition */
export type MutationRequestForProposals_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationRequestForProposals_EditRfpArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_EditRfpInput>;
};


/** Subgraph definition */
export type MutationRequestForProposals_RemoveContextDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_RemoveContextDocumentInput>;
};


/** Subgraph definition */
export type MutationRequestForProposals_RemoveProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_RemoveProposalInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_ActivateInstanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_ActivateInstanceInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_ApplyConfigurationChangesArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_ApplyConfigurationChangesInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_ConfirmInstanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_ConfirmInstanceInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationResourceInstance_InitializeInstanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_InitializeInstanceInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_RemoveInstanceFacetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_RemoveInstanceFacetInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_ReportProvisioningCompletedArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_ReportProvisioningCompletedInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_ReportProvisioningFailedArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_ReportProvisioningFailedInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_ReportProvisioningStartedArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_ReportProvisioningStartedInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_ResumeAfterMaintenanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_ResumeAfterMaintenanceInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_ResumeAfterPaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_ResumeAfterPaymentInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_SetInstanceFacetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_SetInstanceFacetInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_SetResourceProfileArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_SetResourceProfileInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_SuspendForMaintenanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_SuspendForMaintenanceInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_SuspendForNonPaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_SuspendForNonPaymentInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_SuspendInstanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_SuspendInstanceInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_TerminateInstanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_TerminateInstanceInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_UpdateInstanceFacetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_UpdateInstanceFacetInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_UpdateInstanceInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_UpdateInstanceInfoInput>;
};


/** Subgraph definition */
export type MutationResourceInstance_UpdateInstanceStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceInstance_UpdateInstanceStatusInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_AddContentSectionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_AddContentSectionInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_AddFacetBindingArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_AddFacetBindingInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_AddFacetOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_AddFacetOptionInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_AddFaqArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_AddFaqInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_AddOptionGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_AddOptionGroupInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_AddServiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_AddServiceInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_AddTargetAudienceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_AddTargetAudienceInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationResourceTemplate_DeleteContentSectionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_DeleteContentSectionInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_DeleteFaqArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_DeleteFaqInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_DeleteOptionGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_DeleteOptionGroupInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_DeleteServiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_DeleteServiceInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_RemoveFacetBindingArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_RemoveFacetBindingInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_RemoveFacetOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_RemoveFacetOptionInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_RemoveFacetTargetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_RemoveFacetTargetInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_RemoveTargetAudienceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_RemoveTargetAudienceInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_ReorderContentSectionsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_ReorderContentSectionsInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_ReorderFaqsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_ReorderFaqsInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_SetFacetTargetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_SetFacetTargetInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_SetOperatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_SetOperatorInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_SetRecurringServicesArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_SetRecurringServicesInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_SetSetupServicesArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_SetSetupServicesInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_SetTemplateIdArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_SetTemplateIdInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_UpdateContentSectionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_UpdateContentSectionInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_UpdateFaqArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_UpdateFaqInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_UpdateOptionGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_UpdateOptionGroupInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_UpdateServiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_UpdateServiceInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_UpdateTemplateInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_UpdateTemplateInfoInput>;
};


/** Subgraph definition */
export type MutationResourceTemplate_UpdateTemplateStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ResourceTemplate_UpdateTemplateStatusInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddAgentInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddCoordinatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddCoordinatorInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddDeliverableInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddDeliverableInSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddDeliverableInSetInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddKeyResultInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddMilestoneInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddMilestoneDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddMilestoneDeliverableInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddProjectInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddProjectDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddProjectDeliverableInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_AddRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddRoadmapInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationScopeOfWork_EditAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditAgentInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_EditDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditDeliverableInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_EditDeliverablesSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditDeliverablesSetInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_EditKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditKeyResultInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_EditMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditMilestoneInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_EditRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditRoadmapInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_EditScopeOfWorkArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditScopeOfWorkInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveAgentInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveCoordinatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveCoordinatorInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveDeliverableInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveDeliverableInSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveDeliverableInSetInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveKeyResultInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveMilestoneInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveMilestoneDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveMilestoneDeliverableInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveProjectInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveProjectDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveProjectDeliverableInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_RemoveRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveRoadmapInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_SetDeliverableBudgetAnchorProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetDeliverableBudgetAnchorProjectInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_SetDeliverableProgressArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetDeliverableProgressInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_SetProjectMarginArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetProjectMarginInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_SetProjectTotalBudgetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetProjectTotalBudgetInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_UpdateProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_UpdateProjectInput>;
};


/** Subgraph definition */
export type MutationScopeOfWork_UpdateProjectOwnerArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_UpdateProjectOwnerInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddFacetBindingArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddFacetBindingInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddFacetOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddFacetOptionInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddOptionGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddOptionGroupInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddServiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddServiceInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddServiceGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddServiceGroupInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddServiceLevelArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddServiceLevelInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddTargetAudienceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddTargetAudienceInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddTierArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddTierInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddTierPricingOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddTierPricingOptionInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_AddUsageLimitArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_AddUsageLimitInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_ChangeResourceTemplateArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_ChangeResourceTemplateInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationServiceOffering_DeleteOptionGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_DeleteOptionGroupInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_DeleteServiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_DeleteServiceInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_DeleteServiceGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_DeleteServiceGroupInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_DeleteTierArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_DeleteTierInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_RemoveFacetBindingArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_RemoveFacetBindingInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_RemoveFacetOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_RemoveFacetOptionInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_RemoveFacetTargetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_RemoveFacetTargetInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_RemoveServiceLevelArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_RemoveServiceLevelInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_RemoveTargetAudienceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_RemoveTargetAudienceInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_RemoveTierPricingOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_RemoveTierPricingOptionInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_RemoveUsageLimitArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_RemoveUsageLimitInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_ReorderServiceGroupsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_ReorderServiceGroupsInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_SelectResourceTemplateArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_SelectResourceTemplateInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_SetFacetTargetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_SetFacetTargetInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_SetOfferingIdArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_SetOfferingIdInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_SetOperatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_SetOperatorInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateOfferingInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateOfferingInfoInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateOfferingStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateOfferingStatusInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateOptionGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateOptionGroupInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateServiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateServiceInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateServiceGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateServiceGroupInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateServiceLevelArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateServiceLevelInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateTierArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateTierInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateTierPricingArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateTierPricingInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateTierPricingOptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateTierPricingOptionInput>;
};


/** Subgraph definition */
export type MutationServiceOffering_UpdateUsageLimitArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceOffering_UpdateUsageLimitInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_ActivateSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_ActivateSubscriptionInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_AddAddonArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_AddAddonInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_CancelSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_CancelSubscriptionInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_ChangeTierArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_ChangeTierInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationServiceSubscription_ExpireSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_ExpireSubscriptionInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_InitializeSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_InitializeSubscriptionInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_RemoveAddonArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_RemoveAddonInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_RemoveFacetSelectionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_RemoveFacetSelectionInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_SetCachedSnippetsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_SetCachedSnippetsInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_SetFacetSelectionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_SetFacetSelectionInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_SetPricingArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_SetPricingInput>;
};


/** Subgraph definition */
export type MutationServiceSubscription_UpdateBillingProjectionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ServiceSubscription_UpdateBillingProjectionInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_AddOwnerIdArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_AddOwnerIdInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_AddSnapshotAccountArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_AddSnapshotAccountInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_AddTransactionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_AddTransactionInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationSnapshotReport_RecalculateFlowTypesArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_RecalculateFlowTypesInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_RemoveEndingBalanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_RemoveEndingBalanceInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_RemoveOwnerIdArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_RemoveOwnerIdInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_RemoveSnapshotAccountArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_RemoveSnapshotAccountInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_RemoveStartingBalanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_RemoveStartingBalanceInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_RemoveTransactionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_RemoveTransactionInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_SetAccountsDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_SetAccountsDocumentInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_SetEndingBalanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_SetEndingBalanceInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_SetPeriodArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_SetPeriodInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_SetPeriodEndArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_SetPeriodEndInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_SetPeriodStartArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_SetPeriodStartInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_SetReportConfigArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_SetReportConfigInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_SetStartingBalanceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_SetStartingBalanceInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_UpdateSnapshotAccountTypeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_UpdateSnapshotAccountTypeInput>;
};


/** Subgraph definition */
export type MutationSnapshotReport_UpdateTransactionFlowTypeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SnapshotReport_UpdateTransactionFlowTypeInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_ActivateSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_ActivateSubscriptionInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_AddServiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_AddServiceInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_AddServiceGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_AddServiceGroupInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_AddServiceMetricArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_AddServiceMetricInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_AddServiceToGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_AddServiceToGroupInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_CancelSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_CancelSubscriptionInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationSubscriptionInstance_DecrementMetricUsageArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_DecrementMetricUsageInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_IncrementMetricUsageArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_IncrementMetricUsageInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_InitializeSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_InitializeSubscriptionInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_PauseSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_PauseSubscriptionInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_RemoveBudgetCategoryArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_RemoveBudgetCategoryInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_RemoveServiceArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_RemoveServiceInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_RemoveServiceFromGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_RemoveServiceFromGroupInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_RemoveServiceGroupArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_RemoveServiceGroupInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_RemoveServiceMetricArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_RemoveServiceMetricInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_RenewExpiringSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_RenewExpiringSubscriptionInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_ReportRecurringPaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_ReportRecurringPaymentInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_ReportSetupPaymentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_ReportSetupPaymentInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_ResumeSubscriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_ResumeSubscriptionInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_SetAutoRenewArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_SetAutoRenewInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_SetBudgetCategoryArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_SetBudgetCategoryInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_SetCustomerTypeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_SetCustomerTypeInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_SetExpiringArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_SetExpiringInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_SetOperatorNotesArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_SetOperatorNotesInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_SetRenewalDateArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_SetRenewalDateInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_SetResourceDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_SetResourceDocumentInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateBillingProjectionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateBillingProjectionInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateCustomerInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateCustomerInfoInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateMetricArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateMetricInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateMetricUsageArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateMetricUsageInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateServiceInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateServiceInfoInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateServiceRecurringCostArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateServiceRecurringCostInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateServiceSetupCostArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateServiceSetupCostInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateSubscriptionStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateSubscriptionStatusInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateTeamMemberCountArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateTeamMemberCountInput>;
};


/** Subgraph definition */
export type MutationSubscriptionInstance_UpdateTierInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubscriptionInstance_UpdateTierInfoInput>;
};


/** Subgraph definition */
export type MutationWorkstream_AddAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_AddAlternativeProposalInput>;
};


/** Subgraph definition */
export type MutationWorkstream_AddPaymentRequestArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_AddPaymentRequestInput>;
};


/** Subgraph definition */
export type MutationWorkstream_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationWorkstream_EditAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditAlternativeProposalInput>;
};


/** Subgraph definition */
export type MutationWorkstream_EditClientInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditClientInfoInput>;
};


/** Subgraph definition */
export type MutationWorkstream_EditInitialProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditInitialProposalInput>;
};


/** Subgraph definition */
export type MutationWorkstream_EditWorkstreamArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditWorkstreamInput>;
};


/** Subgraph definition */
export type MutationWorkstream_RemoveAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_RemoveAlternativeProposalInput>;
};


/** Subgraph definition */
export type MutationWorkstream_RemovePaymentRequestArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_RemovePaymentRequestInput>;
};


/** Subgraph definition */
export type MutationWorkstream_SetRequestForProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_SetRequestForProposalInput>;
};


/** Subgraph definition */
export type MutationAddDriveArgs = {
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Subgraph definition */
export type MutationCreateResourceInstancesArgs = {
  input: CreateResourceInstancesInput;
};


/** Subgraph definition */
export type MutationDeleteDocumentArgs = {
  id: Scalars['PHID']['input'];
};


/** Subgraph definition */
export type MutationDeleteDriveArgs = {
  id: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationSetDriveIconArgs = {
  icon: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationSetDriveNameArgs = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Network = {
  __typename?: 'Network';
  category?: Maybe<Array<NetworkCategory>>;
  darkThemeIcon?: Maybe<Scalars['String']['output']>;
  darkThemeLogo?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  discord?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  logoBig?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  x?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export enum NetworkCategory {
  Charity = 'CHARITY',
  Crypto = 'CRYPTO',
  Defi = 'DEFI',
  Ngo = 'NGO',
  Oss = 'OSS'
}

export type NetworkProfile = IDocument & {
  __typename?: 'NetworkProfile';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: NetworkProfile_NetworkProfileState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: NetworkProfile_NetworkProfileState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type NetworkProfileOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: NetworkProfile Document */
export type NetworkProfileQueries = {
  __typename?: 'NetworkProfileQueries';
  getDocument?: Maybe<NetworkProfile>;
  getDocuments?: Maybe<Array<NetworkProfile>>;
};


/** Queries: NetworkProfile Document */
export type NetworkProfileQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: NetworkProfile Document */
export type NetworkProfileQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export enum NetworkProfile_NetworkCategory {
  Charity = 'CHARITY',
  Crypto = 'CRYPTO',
  Defi = 'DEFI',
  Ngo = 'NGO',
  Oss = 'OSS'
}

export type NetworkProfile_NetworkProfileState = {
  __typename?: 'NetworkProfile_NetworkProfileState';
  category: Array<NetworkProfile_NetworkCategory>;
  darkThemeIcon: Scalars['String']['output'];
  darkThemeLogo: Scalars['String']['output'];
  description: Scalars['String']['output'];
  discord?: Maybe<Scalars['String']['output']>;
  github?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  logo: Scalars['String']['output'];
  logoBig: Scalars['String']['output'];
  name: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
  x?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type NetworkProfile_SetCategoryInput = {
  category: Array<NetworkProfile_NetworkCategory>;
};

export type NetworkProfile_SetDescriptionInput = {
  description: Scalars['String']['input'];
};

export type NetworkProfile_SetDiscordInput = {
  discord?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkProfile_SetGithubInput = {
  github?: InputMaybe<Scalars['String']['input']>;
};

/** Module: NetworkProfileManagement */
export type NetworkProfile_SetIconInput = {
  darkThemeIcon?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkProfile_SetLogoBigInput = {
  logoBig: Scalars['String']['input'];
};

export type NetworkProfile_SetLogoInput = {
  darkThemeLogo?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkProfile_SetProfileNameInput = {
  name: Scalars['String']['input'];
};

export type NetworkProfile_SetWebsiteInput = {
  website?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkProfile_SetXInput = {
  x?: InputMaybe<Scalars['String']['input']>;
};

export type NetworkProfile_SetYoutubeInput = {
  youtube?: InputMaybe<Scalars['String']['input']>;
};

export type OpHubMember = {
  __typename?: 'OpHubMember';
  name?: Maybe<Scalars['String']['output']>;
  phid?: Maybe<Scalars['PHID']['output']>;
};

export type Operation = {
  __typename?: 'Operation';
  context?: Maybe<PhOperationContext>;
  error?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  id: Scalars['String']['output'];
  index: Scalars['Int']['output'];
  inputText?: Maybe<Scalars['String']['output']>;
  skip?: Maybe<Scalars['Int']['output']>;
  timestampUtcMs: Scalars['DateTime']['output'];
  type: Scalars['String']['output'];
};

export type OperationalHubProfile = IDocument & {
  __typename?: 'OperationalHubProfile';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: OperationalHubProfile_OperationalHubProfileState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: OperationalHubProfile_OperationalHubProfileState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type OperationalHubProfileOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueries = {
  __typename?: 'OperationalHubProfileQueries';
  getDocument?: Maybe<OperationalHubProfile>;
  getDocuments?: Maybe<Array<OperationalHubProfile>>;
};


/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type OperationalHubProfile_AddSubteamInput = {
  subteam: Scalars['PHID']['input'];
};

export type OperationalHubProfile_OperationalHubProfileState = {
  __typename?: 'OperationalHubProfile_OperationalHubProfileState';
  name: Scalars['String']['output'];
  operatorTeam?: Maybe<Scalars['PHID']['output']>;
  subteams: Array<Scalars['PHID']['output']>;
};

export type OperationalHubProfile_RemoveSubteamInput = {
  subteam: Scalars['PHID']['input'];
};

/** Module: Configuration */
export type OperationalHubProfile_SetOperationalHubNameInput = {
  name: Scalars['String']['input'];
};

export type OperationalHubProfile_SetOperatorTeamInput = {
  operatorTeam?: InputMaybe<Scalars['PHID']['input']>;
};

export type PhOperationContext = {
  __typename?: 'PHOperationContext';
  signer?: Maybe<Signer>;
};

export enum Pt_BillingFrequency {
  Biweekly = 'BIWEEKLY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type Pt_BonusClause = {
  __typename?: 'PT_BonusClause';
  bonusAmount: Scalars['Amount']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  condition: Scalars['String']['output'];
  id: Scalars['OID']['output'];
};

export type Pt_CostAndMaterials = {
  __typename?: 'PT_CostAndMaterials';
  billingFrequency: Pt_BillingFrequency;
  hourlyRate?: Maybe<Scalars['Amount']['output']>;
  timesheetRequired: Scalars['Boolean']['output'];
  variableCap?: Maybe<Scalars['Amount']['output']>;
};

export type Pt_Escrow = {
  __typename?: 'PT_Escrow';
  amountHeld: Scalars['Amount']['output'];
  escrowProvider?: Maybe<Scalars['String']['output']>;
  proofOfFundsDocumentId?: Maybe<Scalars['String']['output']>;
  releaseConditions: Scalars['String']['output'];
};

export enum Pt_EvaluationFrequency {
  Monthly = 'MONTHLY',
  PerMilestone = 'PER_MILESTONE',
  Weekly = 'WEEKLY'
}

export type Pt_EvaluationTerms = {
  __typename?: 'PT_EvaluationTerms';
  commentsVisibleToClient: Scalars['Boolean']['output'];
  criteria: Array<Scalars['String']['output']>;
  evaluationFrequency: Pt_EvaluationFrequency;
  evaluatorTeam: Scalars['String']['output'];
  impactsPayout: Scalars['Boolean']['output'];
  impactsReputation: Scalars['Boolean']['output'];
};

export type Pt_Milestone = {
  __typename?: 'PT_Milestone';
  amount: Scalars['Amount']['output'];
  expectedCompletionDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
  payoutStatus: Pt_MilestonePayoutStatus;
  requiresApproval: Scalars['Boolean']['output'];
};

export enum Pt_MilestonePayoutStatus {
  Approved = 'APPROVED',
  Paid = 'PAID',
  Pending = 'PENDING',
  ReadyForReview = 'READY_FOR_REVIEW',
  Rejected = 'REJECTED'
}

export enum Pt_PaymentCurrency {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export enum Pt_PaymentModel {
  CostAndMaterials = 'COST_AND_MATERIALS',
  Milestone = 'MILESTONE',
  Retainer = 'RETAINER'
}

export type Pt_PaymentTermsState = {
  __typename?: 'PT_PaymentTermsState';
  bonusClauses: Array<Pt_BonusClause>;
  costAndMaterials?: Maybe<Pt_CostAndMaterials>;
  currency: Pt_PaymentCurrency;
  escrowDetails?: Maybe<Pt_Escrow>;
  evaluation?: Maybe<Pt_EvaluationTerms>;
  milestoneSchedule: Array<Pt_Milestone>;
  payer: Scalars['String']['output'];
  paymentModel: Pt_PaymentModel;
  penaltyClauses: Array<Pt_PenaltyClause>;
  proposer: Scalars['String']['output'];
  retainerDetails?: Maybe<Pt_Retainer>;
  status: Pt_PaymentTermsStatus;
  totalAmount?: Maybe<Scalars['Amount']['output']>;
};

export enum Pt_PaymentTermsStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

export type Pt_PenaltyClause = {
  __typename?: 'PT_PenaltyClause';
  comment?: Maybe<Scalars['String']['output']>;
  condition: Scalars['String']['output'];
  deductionAmount: Scalars['Amount']['output'];
  id: Scalars['OID']['output'];
};

export type Pt_Retainer = {
  __typename?: 'PT_Retainer';
  autoRenew: Scalars['Boolean']['output'];
  billingFrequency: Pt_BillingFrequency;
  endDate?: Maybe<Scalars['Date']['output']>;
  retainerAmount: Scalars['Amount']['output'];
  servicesIncluded: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
};

export type PaymentTerms = IDocument & {
  __typename?: 'PaymentTerms';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: PaymentTerms_PaymentTermsState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: PaymentTerms_PaymentTermsState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type PaymentTermsOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: PaymentTerms Document */
export type PaymentTermsQueries = {
  __typename?: 'PaymentTermsQueries';
  getDocument?: Maybe<PaymentTerms>;
  getDocuments?: Maybe<Array<PaymentTerms>>;
};


/** Queries: PaymentTerms Document */
export type PaymentTermsQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: PaymentTerms Document */
export type PaymentTermsQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Module: Clauses */
export type PaymentTerms_AddBonusClauseInput = {
  bonusAmount: Scalars['Amount']['input'];
  comment?: InputMaybe<Scalars['String']['input']>;
  condition: Scalars['String']['input'];
  id: Scalars['OID']['input'];
};

/** Module: Milestones */
export type PaymentTerms_AddMilestoneInput = {
  amount: Scalars['Amount']['input'];
  expectedCompletionDate?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['OID']['input'];
  name: Scalars['String']['input'];
  requiresApproval: Scalars['Boolean']['input'];
};

export type PaymentTerms_AddPenaltyClauseInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  condition: Scalars['String']['input'];
  deductionAmount: Scalars['Amount']['input'];
  id: Scalars['OID']['input'];
};

export enum PaymentTerms_BillingFrequency {
  Biweekly = 'BIWEEKLY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type PaymentTerms_BonusClause = {
  __typename?: 'PaymentTerms_BonusClause';
  bonusAmount: Scalars['Amount']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  condition: Scalars['String']['output'];
  id: Scalars['OID']['output'];
};

export type PaymentTerms_DeleteBonusClauseInput = {
  id: Scalars['OID']['input'];
};

export type PaymentTerms_DeleteMilestoneInput = {
  id: Scalars['OID']['input'];
};

export type PaymentTerms_DeletePenaltyClauseInput = {
  id: Scalars['OID']['input'];
};

export type PaymentTerms_Escrow = {
  __typename?: 'PaymentTerms_Escrow';
  amountHeld: Scalars['Amount']['output'];
  escrowProvider?: Maybe<Scalars['String']['output']>;
  proofOfFundsDocumentId?: Maybe<Scalars['String']['output']>;
  releaseConditions: Scalars['String']['output'];
};

export enum PaymentTerms_EvaluationFrequency {
  Monthly = 'MONTHLY',
  PerMilestone = 'PER_MILESTONE',
  Weekly = 'WEEKLY'
}

export type PaymentTerms_EvaluationTerms = {
  __typename?: 'PaymentTerms_EvaluationTerms';
  commentsVisibleToClient: Scalars['Boolean']['output'];
  criteria: Array<Scalars['String']['output']>;
  evaluationFrequency: PaymentTerms_EvaluationFrequency;
  evaluatorTeam: Scalars['String']['output'];
  impactsPayout: Scalars['Boolean']['output'];
  impactsReputation: Scalars['Boolean']['output'];
};

export type PaymentTerms_Milestone = {
  __typename?: 'PaymentTerms_Milestone';
  amount: Scalars['Amount']['output'];
  expectedCompletionDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
  payoutStatus: PaymentTerms_MilestonePayoutStatus;
  requiresApproval: Scalars['Boolean']['output'];
};

export enum PaymentTerms_MilestonePayoutStatus {
  Approved = 'APPROVED',
  Paid = 'PAID',
  Pending = 'PENDING',
  ReadyForReview = 'READY_FOR_REVIEW',
  Rejected = 'REJECTED'
}

export enum PaymentTerms_PaymentCurrency {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export enum PaymentTerms_PaymentModel {
  Milestone = 'MILESTONE',
  TimeAndMaterials = 'TIME_AND_MATERIALS'
}

export type PaymentTerms_PaymentTermsState = {
  __typename?: 'PaymentTerms_PaymentTermsState';
  bonusClauses: Array<PaymentTerms_BonusClause>;
  currency: PaymentTerms_PaymentCurrency;
  escrowDetails?: Maybe<PaymentTerms_Escrow>;
  evaluation?: Maybe<PaymentTerms_EvaluationTerms>;
  milestoneSchedule: Array<PaymentTerms_Milestone>;
  payer: Scalars['String']['output'];
  paymentModel: PaymentTerms_PaymentModel;
  penaltyClauses: Array<PaymentTerms_PenaltyClause>;
  proposer: Scalars['String']['output'];
  status: PaymentTerms_PaymentTermsStatus;
  timeAndMaterials?: Maybe<PaymentTerms_TimeAndMaterials>;
  totalAmount?: Maybe<Scalars['Amount']['output']>;
};

export enum PaymentTerms_PaymentTermsStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

export type PaymentTerms_PenaltyClause = {
  __typename?: 'PaymentTerms_PenaltyClause';
  comment?: Maybe<Scalars['String']['output']>;
  condition: Scalars['String']['output'];
  deductionAmount: Scalars['Amount']['output'];
  id: Scalars['OID']['output'];
};

export type PaymentTerms_ReorderMilestonesInput = {
  order: Array<Scalars['OID']['input']>;
};

/** Module: Terms */
export type PaymentTerms_SetBasicTermsInput = {
  currency: PaymentTerms_PaymentCurrency;
  payer: Scalars['String']['input'];
  paymentModel: PaymentTerms_PaymentModel;
  proposer: Scalars['String']['input'];
  totalAmount?: InputMaybe<Scalars['Amount']['input']>;
};

export type PaymentTerms_SetEscrowDetailsInput = {
  amountHeld: Scalars['Amount']['input'];
  escrowProvider?: InputMaybe<Scalars['String']['input']>;
  proofOfFundsDocumentId?: InputMaybe<Scalars['String']['input']>;
  releaseConditions: Scalars['String']['input'];
};

export type PaymentTerms_SetEvaluationTermsInput = {
  commentsVisibleToClient: Scalars['Boolean']['input'];
  criteria: Array<Scalars['String']['input']>;
  evaluationFrequency: PaymentTerms_EvaluationFrequency;
  evaluatorTeam: Scalars['String']['input'];
  impactsPayout: Scalars['Boolean']['input'];
  impactsReputation: Scalars['Boolean']['input'];
};

export type PaymentTerms_SetTimeAndMaterialsInput = {
  billingFrequency: PaymentTerms_BillingFrequency;
  hourlyRate?: InputMaybe<Scalars['Amount']['input']>;
  retainerAmount?: InputMaybe<Scalars['Amount']['input']>;
  timesheetRequired: Scalars['Boolean']['input'];
  variableCap?: InputMaybe<Scalars['Amount']['input']>;
};

export type PaymentTerms_TimeAndMaterials = {
  __typename?: 'PaymentTerms_TimeAndMaterials';
  billingFrequency: PaymentTerms_BillingFrequency;
  hourlyRate?: Maybe<Scalars['Amount']['output']>;
  retainerAmount?: Maybe<Scalars['Amount']['output']>;
  timesheetRequired: Scalars['Boolean']['output'];
  variableCap?: Maybe<Scalars['Amount']['output']>;
};

export type PaymentTerms_UpdateBonusClauseInput = {
  bonusAmount?: InputMaybe<Scalars['Amount']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
};

export type PaymentTerms_UpdateMilestoneInput = {
  amount?: InputMaybe<Scalars['Amount']['input']>;
  expectedCompletionDate?: InputMaybe<Scalars['Date']['input']>;
  id: Scalars['OID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  requiresApproval?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentTerms_UpdateMilestoneStatusInput = {
  id: Scalars['OID']['input'];
  payoutStatus: PaymentTerms_MilestonePayoutStatus;
};

export type PaymentTerms_UpdatePenaltyClauseInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  deductionAmount?: InputMaybe<Scalars['Amount']['input']>;
  id: Scalars['OID']['input'];
};

export type PaymentTerms_UpdateStatusInput = {
  status: PaymentTerms_PaymentTermsStatus;
};

/** Output type for process gnosis payment */
export type ProcessGnosisPaymentOutput = {
  __typename?: 'ProcessGnosisPaymentOutput';
  data?: Maybe<Scalars['JSONObject']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ProcessorWorkstream = {
  __typename?: 'ProcessorWorkstream';
  final_milestone_target?: Maybe<Scalars['DateTime']['output']>;
  initial_proposal_author?: Maybe<Scalars['PHID']['output']>;
  initial_proposal_status?: Maybe<ProposalStatus>;
  network_phid?: Maybe<Scalars['PHID']['output']>;
  network_slug?: Maybe<Scalars['String']['output']>;
  sow_phid?: Maybe<Scalars['PHID']['output']>;
  workstream_phid?: Maybe<Scalars['PHID']['output']>;
  workstream_slug?: Maybe<Scalars['String']['output']>;
  workstream_status?: Maybe<WorkstreamStatus>;
  workstream_title?: Maybe<Scalars['String']['output']>;
};

export type Proposal = {
  __typename?: 'Proposal';
  author: ProposalAuthor;
  id: Scalars['OID']['output'];
  paymentTerms: Scalars['PHID']['output'];
  sow: Scalars['PHID']['output'];
  status: ProposalStatus;
};

export type ProposalAuthor = {
  __typename?: 'ProposalAuthor';
  icon?: Maybe<Scalars['URL']['output']>;
  id: Scalars['PHID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export enum ProposalRole {
  Alternative = 'ALTERNATIVE',
  Awarded = 'AWARDED',
  Initial = 'INITIAL'
}

export enum ProposalStatus {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

/** Subgraph definition */
export type Query = {
  __typename?: 'Query';
  AccountTransactions?: Maybe<AccountTransactionsQueries>;
  Accounts?: Maybe<AccountsQueries>;
  BillingStatement?: Maybe<BillingStatementQueries>;
  BuilderProfile?: Maybe<BuilderProfileQueries>;
  Builders?: Maybe<BuildersQueries>;
  ExpenseReport?: Maybe<ExpenseReportQueries>;
  Facet?: Maybe<FacetQueries>;
  Invoice?: Maybe<InvoiceQueries>;
  NetworkProfile?: Maybe<NetworkProfileQueries>;
  OperationalHubProfile?: Maybe<OperationalHubProfileQueries>;
  PaymentTerms?: Maybe<PaymentTermsQueries>;
  RequestForProposals?: Maybe<RequestForProposalsQueries>;
  ResourceInstance?: Maybe<ResourceInstanceQueries>;
  ResourceTemplate?: Maybe<ResourceTemplateQueries>;
  ScopeOfWork?: Maybe<ScopeOfWorkQueries>;
  ServiceOffering?: Maybe<ServiceOfferingQueries>;
  ServiceSubscription?: Maybe<ServiceSubscriptionQueries>;
  SnapshotReport?: Maybe<SnapshotReportQueries>;
  SubscriptionInstance?: Maybe<SubscriptionInstanceQueries>;
  Workstream?: Maybe<WorkstreamQueries>;
  allNetworks: Array<AllNetworks>;
  analytics?: Maybe<AnalyticsQuery>;
  budgetStatements: Array<BudgetStatement>;
  builders: Array<BuilderProfileState>;
  driveDocument?: Maybe<DocumentDrive>;
  driveDocuments: Array<DocumentDrive>;
  driveIdBySlug?: Maybe<Scalars['String']['output']>;
  drives: Array<Scalars['String']['output']>;
  processorWorkstreams: Array<ProcessorWorkstream>;
  resourceTemplates: Array<RsResourceTemplate>;
  rfpByWorkstream: Array<WorkstreamRfp>;
  scopeOfWorkByNetworkOrStatus: Array<Sow_ScopeOfWorkState>;
  serviceOfferings: Array<RsServiceOffering>;
  workstream: Array<FullQueryWorkstream>;
  workstreams: Array<FullQueryWorkstream>;
};


/** Subgraph definition */
export type QueryAllNetworksArgs = {
  filter?: InputMaybe<NetworkFilter>;
};


/** Subgraph definition */
export type QueryBudgetStatementsArgs = {
  filter?: InputMaybe<BudgetStatementsFilter>;
};


/** Subgraph definition */
export type QueryBuildersArgs = {
  filter?: InputMaybe<BuildersFilter>;
};


/** Subgraph definition */
export type QueryDriveDocumentArgs = {
  idOrSlug: Scalars['String']['input'];
};


/** Subgraph definition */
export type QueryDriveIdBySlugArgs = {
  slug: Scalars['String']['input'];
};


/** Subgraph definition */
export type QueryResourceTemplatesArgs = {
  filter?: InputMaybe<RsResourceTemplatesFilter>;
};


/** Subgraph definition */
export type QueryRfpByWorkstreamArgs = {
  filter: WorkstreamFilter;
};


/** Subgraph definition */
export type QueryScopeOfWorkByNetworkOrStatusArgs = {
  filter: ScopeOfWorkByNetworkOrStatusFilter;
};


/** Subgraph definition */
export type QueryServiceOfferingsArgs = {
  filter?: InputMaybe<RsServiceOfferingsFilter>;
};


/** Subgraph definition */
export type QueryWorkstreamArgs = {
  filter: WorkstreamFilter;
};


/** Subgraph definition */
export type QueryWorkstreamsArgs = {
  filter?: InputMaybe<WorkstreamsFilter>;
};

export type Rfp = {
  __typename?: 'RFP';
  briefing?: Maybe<Scalars['String']['output']>;
  budgetCurrency?: Maybe<Scalars['String']['output']>;
  budgetMax?: Maybe<Scalars['Float']['output']>;
  budgetMin?: Maybe<Scalars['Float']['output']>;
  code?: Maybe<Scalars['String']['output']>;
  eligibilityCriteria?: Maybe<Scalars['String']['output']>;
  evaluationCriteria?: Maybe<Scalars['String']['output']>;
  id: Scalars['PHID']['output'];
  status?: Maybe<RfpStatus>;
  submissionDeadline?: Maybe<Scalars['DateTime']['output']>;
  summary?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export enum RfpStatus {
  Awarded = 'AWARDED',
  Canceled = 'CANCELED',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  NotAwarded = 'NOT_AWARDED',
  OpenForProposals = 'OPEN_FOR_PROPOSALS',
  RequestForCommments = 'REQUEST_FOR_COMMMENTS'
}

export enum RsBillingCycle {
  Annual = 'ANNUAL',
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME',
  Quarterly = 'QUARTERLY',
  SemiAnnual = 'SEMI_ANNUAL'
}

export type RsContentSection = {
  __typename?: 'RSContentSection';
  content: Scalars['String']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  title: Scalars['String']['output'];
};

export type RsFacetTarget = {
  __typename?: 'RSFacetTarget';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOptions: Array<Scalars['String']['output']>;
};

export type RsFaqField = {
  __typename?: 'RSFaqField';
  answer?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  question?: Maybe<Scalars['String']['output']>;
};

export enum RsGroupCostType {
  Recurring = 'RECURRING',
  Setup = 'SETUP'
}

export type RsOfferingFacetTarget = {
  __typename?: 'RSOfferingFacetTarget';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOptions: Array<Scalars['String']['output']>;
};

export type RsOfferingOptionGroup = {
  __typename?: 'RSOfferingOptionGroup';
  billingCycle?: Maybe<RsBillingCycle>;
  costType?: Maybe<RsGroupCostType>;
  currency?: Maybe<Scalars['Currency']['output']>;
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Amount_Money']['output']>;
};

export type RsOfferingService = {
  __typename?: 'RSOfferingService';
  costType?: Maybe<RsServiceCostType>;
  currency?: Maybe<Scalars['Currency']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  facetBindings: Array<RsResourceFacetBinding>;
  id: Scalars['OID']['output'];
  isSetupFormation: Scalars['Boolean']['output'];
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  price?: Maybe<Scalars['Amount_Money']['output']>;
  serviceGroupId?: Maybe<Scalars['OID']['output']>;
  title: Scalars['String']['output'];
};

export type RsOfferingTargetAudience = {
  __typename?: 'RSOfferingTargetAudience';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export type RsOptionGroup = {
  __typename?: 'RSOptionGroup';
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type RsResourceFacetBinding = {
  __typename?: 'RSResourceFacetBinding';
  facetName: Scalars['String']['output'];
  facetType: Scalars['PHID']['output'];
  id: Scalars['OID']['output'];
  supportedOptions: Array<Scalars['OID']['output']>;
};

export type RsResourceTemplate = {
  __typename?: 'RSResourceTemplate';
  contentSections: Array<RsContentSection>;
  description?: Maybe<Scalars['String']['output']>;
  facetTargets: Array<RsFacetTarget>;
  faqFields?: Maybe<Array<RsFaqField>>;
  id: Scalars['PHID']['output'];
  infoLink?: Maybe<Scalars['URL']['output']>;
  lastModified: Scalars['DateTime']['output'];
  operatorId: Scalars['PHID']['output'];
  optionGroups: Array<RsOptionGroup>;
  recurringServices: Array<Scalars['String']['output']>;
  services: Array<RsService>;
  setupServices: Array<Scalars['String']['output']>;
  status: RsTemplateStatus;
  summary: Scalars['String']['output'];
  targetAudiences: Array<RsTargetAudience>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
  title: Scalars['String']['output'];
};

export type RsResourceTemplatesFilter = {
  id?: InputMaybe<Scalars['PHID']['input']>;
  operatorId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Array<RsTemplateStatusInput>>;
};

export type RsService = {
  __typename?: 'RSService';
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  facetBindings: Array<RsResourceFacetBinding>;
  id: Scalars['OID']['output'];
  isSetupFormation: Scalars['Boolean']['output'];
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  parentServiceId?: Maybe<Scalars['OID']['output']>;
  title: Scalars['String']['output'];
};

export enum RsServiceCostType {
  Recurring = 'RECURRING',
  Setup = 'SETUP'
}

export type RsServiceGroup = {
  __typename?: 'RSServiceGroup';
  billingCycle: RsBillingCycle;
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
};

export enum RsServiceLevel {
  Custom = 'CUSTOM',
  Included = 'INCLUDED',
  NotApplicable = 'NOT_APPLICABLE',
  NotIncluded = 'NOT_INCLUDED',
  Optional = 'OPTIONAL',
  Variable = 'VARIABLE'
}

export type RsServiceLevelBinding = {
  __typename?: 'RSServiceLevelBinding';
  customValue?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  level: RsServiceLevel;
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  serviceId: Scalars['OID']['output'];
};

export type RsServiceOffering = {
  __typename?: 'RSServiceOffering';
  description?: Maybe<Scalars['String']['output']>;
  facetTargets: Array<RsOfferingFacetTarget>;
  id: Scalars['PHID']['output'];
  infoLink?: Maybe<Scalars['URL']['output']>;
  lastModified: Scalars['DateTime']['output'];
  operatorId: Scalars['PHID']['output'];
  optionGroups: Array<RsOfferingOptionGroup>;
  resourceTemplateId?: Maybe<Scalars['PHID']['output']>;
  serviceGroups: Array<RsServiceGroup>;
  services: Array<RsOfferingService>;
  status: RsServiceStatus;
  summary: Scalars['String']['output'];
  targetAudiences: Array<RsOfferingTargetAudience>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
  tiers: Array<RsServiceSubscriptionTier>;
  title: Scalars['String']['output'];
};

export type RsServiceOfferingsFilter = {
  id?: InputMaybe<Scalars['PHID']['input']>;
  operatorId?: InputMaybe<Scalars['PHID']['input']>;
  resourceTemplateId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Array<RsServiceStatus>>;
};

export type RsServicePricing = {
  __typename?: 'RSServicePricing';
  amount?: Maybe<Scalars['Amount_Money']['output']>;
  currency: Scalars['Currency']['output'];
};

export enum RsServiceStatus {
  Active = 'ACTIVE',
  ComingSoon = 'COMING_SOON',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT'
}

export type RsServiceSubscriptionTier = {
  __typename?: 'RSServiceSubscriptionTier';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isCustomPricing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pricing: RsServicePricing;
  pricingOptions: Array<RsTierPricingOption>;
  serviceLevels: Array<RsServiceLevelBinding>;
  usageLimits: Array<RsServiceUsageLimit>;
};

export type RsServiceUsageLimit = {
  __typename?: 'RSServiceUsageLimit';
  freeLimit?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  metric: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  paidLimit?: Maybe<Scalars['Int']['output']>;
  resetCycle?: Maybe<RsUsageResetCycle>;
  serviceId: Scalars['OID']['output'];
  unitName?: Maybe<Scalars['String']['output']>;
  unitPrice?: Maybe<Scalars['Amount_Money']['output']>;
  unitPriceCurrency?: Maybe<Scalars['Currency']['output']>;
};

export type RsTargetAudience = {
  __typename?: 'RSTargetAudience';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export enum RsTemplateStatus {
  Active = 'ACTIVE',
  ComingSoon = 'COMING_SOON',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT'
}

export enum RsTemplateStatusInput {
  Active = 'ACTIVE',
  ComingSoon = 'COMING_SOON',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT'
}

export type RsTierPricingOption = {
  __typename?: 'RSTierPricingOption';
  amount: Scalars['Amount_Money']['output'];
  currency: Scalars['Currency']['output'];
  id: Scalars['OID']['output'];
  isDefault: Scalars['Boolean']['output'];
};

export enum RsUsageResetCycle {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type RequestForProposals = IDocument & {
  __typename?: 'RequestForProposals';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: RequestForProposals_RequestForProposalsState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: RequestForProposals_RequestForProposalsState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type RequestForProposalsOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: RequestForProposals Document */
export type RequestForProposalsQueries = {
  __typename?: 'RequestForProposalsQueries';
  getDocument?: Maybe<RequestForProposals>;
  getDocuments?: Maybe<Array<RequestForProposals>>;
};


/** Queries: RequestForProposals Document */
export type RequestForProposalsQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: RequestForProposals Document */
export type RequestForProposalsQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Module: ContexDocument */
export type RequestForProposals_AddContextDocumentInput = {
  name: Scalars['String']['input'];
  rfpId: Scalars['OID']['input'];
  url: Scalars['URL']['input'];
};

/** Module: Proposals */
export type RequestForProposals_AddProposalInput = {
  budgetEstimate: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  paymentTerms: RequestForProposals_RfpPaymentTermInput;
  proposalStatus: RequestForProposals_RfpProposalStatusInput;
  rfpId: Scalars['OID']['input'];
  submittedby?: InputMaybe<Scalars['OID']['input']>;
  summary: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type RequestForProposals_BudgetRange = {
  __typename?: 'RequestForProposals_BudgetRange';
  currency?: Maybe<Scalars['String']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type RequestForProposals_BudgetRangeInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type RequestForProposals_ChangeProposalStatusInput = {
  proposalId: Scalars['OID']['input'];
  status: RequestForProposals_RfpProposalStatusInput;
};

export type RequestForProposals_ContextDocument = {
  __typename?: 'RequestForProposals_ContextDocument';
  name: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

/** Module: RfpState */
export type RequestForProposals_EditRfpInput = {
  briefing?: InputMaybe<Scalars['String']['input']>;
  budgetRange?: InputMaybe<RequestForProposals_BudgetRangeInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  eligibilityCriteria?: InputMaybe<Scalars['String']['input']>;
  evaluationCriteria?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RequestForProposals_RfpStatusInput>;
  summary?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum RequestForProposals_RfpCommentatorType {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export enum RequestForProposals_RfpStatus {
  Awarded = 'AWARDED',
  Canceled = 'CANCELED',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  NotAwarded = 'NOT_AWARDED',
  OpenForProposals = 'OPEN_FOR_PROPOSALS',
  RequestForCommments = 'REQUEST_FOR_COMMMENTS'
}

export enum RequestForProposals_RfpStatusInput {
  Awarded = 'AWARDED',
  Canceled = 'CANCELED',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  NotAwarded = 'NOT_AWARDED',
  OpenForProposals = 'OPEN_FOR_PROPOSALS',
  RequestForCommments = 'REQUEST_FOR_COMMMENTS'
}

export type RequestForProposals_RemoveContextDocumentInput = {
  name: Scalars['String']['input'];
  rfpId: Scalars['OID']['input'];
};

export type RequestForProposals_RemoveProposalInput = {
  id: Scalars['OID']['input'];
  rfpId: Scalars['OID']['input'];
};

export type RequestForProposals_RequestForProposalsState = {
  __typename?: 'RequestForProposals_RequestForProposalsState';
  briefing: Scalars['String']['output'];
  budgetRange: RequestForProposals_BudgetRange;
  code?: Maybe<Scalars['String']['output']>;
  contextDocuments: Array<RequestForProposals_ContextDocument>;
  deadline?: Maybe<Scalars['DateTime']['output']>;
  eligibilityCriteria: Scalars['String']['output'];
  evaluationCriteria: Scalars['String']['output'];
  issuer: Scalars['ID']['output'];
  proposals: Array<RequestForProposals_RfpProposal>;
  rfpCommenter: Array<RequestForProposals_RfpCommenter>;
  status: RequestForProposals_RfpStatus;
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
};

export enum RequestForProposals_RfpAgentType {
  Ai = 'AI',
  Group = 'GROUP',
  Human = 'HUMAN'
}

export type RequestForProposals_RfpCommenter = {
  __typename?: 'RequestForProposals_RfpCommenter';
  agentType: RequestForProposals_RfpAgentType;
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rfpCommentatorType: RequestForProposals_RfpCommentatorType;
};

export enum RequestForProposals_RfpPaymentTerm {
  Escrow = 'ESCROW',
  MilestoneBasedAdvancePayment = 'MILESTONE_BASED_ADVANCE_PAYMENT',
  MilestoneBasedFixedPrice = 'MILESTONE_BASED_FIXED_PRICE',
  RetainerBased = 'RETAINER_BASED',
  VariableCost = 'VARIABLE_COST'
}

export enum RequestForProposals_RfpPaymentTermInput {
  Escrow = 'ESCROW',
  MilestoneBasedAdvancePayment = 'MILESTONE_BASED_ADVANCE_PAYMENT',
  MilestoneBasedFixedPrice = 'MILESTONE_BASED_FIXED_PRICE',
  RetainerBased = 'RETAINER_BASED',
  VariableCost = 'VARIABLE_COST'
}

export type RequestForProposals_RfpProposal = {
  __typename?: 'RequestForProposals_RfpProposal';
  budgetEstimate: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  paymentTerms: RequestForProposals_RfpPaymentTerm;
  proposalStatus: RequestForProposals_RfpProposalStatus;
  submittedby?: Maybe<Scalars['OID']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum RequestForProposals_RfpProposalStatus {
  Approved = 'APPROVED',
  ConditionallyApproved = 'CONDITIONALLY_APPROVED',
  NeedsRevision = 'NEEDS_REVISION',
  Opened = 'OPENED',
  Rejected = 'REJECTED',
  Revised = 'REVISED',
  Submitted = 'SUBMITTED',
  UnderReview = 'UNDER_REVIEW',
  Withdrawn = 'WITHDRAWN'
}

export enum RequestForProposals_RfpProposalStatusInput {
  Approved = 'APPROVED',
  ConditionallyApproved = 'CONDITIONALLY_APPROVED',
  NeedsRevision = 'NEEDS_REVISION',
  Opened = 'OPENED',
  Rejected = 'REJECTED',
  Revised = 'REVISED',
  Submitted = 'SUBMITTED',
  UnderReview = 'UNDER_REVIEW',
  Withdrawn = 'WITHDRAWN'
}

export type ResourceInstance = IDocument & {
  __typename?: 'ResourceInstance';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ResourceInstance_ResourceInstanceState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ResourceInstance_ResourceInstanceState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ResourceInstanceOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: ResourceInstance Document */
export type ResourceInstanceQueries = {
  __typename?: 'ResourceInstanceQueries';
  getDocument?: Maybe<ResourceInstance>;
  getDocuments?: Maybe<Array<ResourceInstance>>;
};


/** Queries: ResourceInstance Document */
export type ResourceInstanceQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: ResourceInstance Document */
export type ResourceInstanceQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type ResourceInstance_ActivateInstanceInput = {
  activatedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_ApplyConfigurationChangesInput = {
  addFacets?: InputMaybe<Array<ResourceInstance_SetInstanceFacetInput>>;
  appliedAt: Scalars['DateTime']['input'];
  changeDescription?: InputMaybe<Scalars['String']['input']>;
  removeFacetKeys?: InputMaybe<Array<Scalars['String']['input']>>;
  updateFacets?: InputMaybe<Array<ResourceInstance_UpdateInstanceFacetInput>>;
};

export type ResourceInstance_ConfirmInstanceInput = {
  confirmedAt: Scalars['DateTime']['input'];
};

/** Module: InstanceManagement */
export type ResourceInstance_InitializeInstanceInput = {
  customerId?: InputMaybe<Scalars['PHID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  infoLink?: InputMaybe<Scalars['URL']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profileDocumentType: Scalars['String']['input'];
  profileId: Scalars['PHID']['input'];
  resourceTemplateId?: InputMaybe<Scalars['PHID']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type ResourceInstance_InstanceFacet = {
  __typename?: 'ResourceInstance_InstanceFacet';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOption: Scalars['String']['output'];
};

export enum ResourceInstance_InstanceStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Provisioning = 'PROVISIONING',
  Suspended = 'SUSPENDED',
  Terminated = 'TERMINATED'
}

export type ResourceInstance_RemoveInstanceFacetInput = {
  categoryKey: Scalars['String']['input'];
};

export type ResourceInstance_ReportProvisioningCompletedInput = {
  completedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_ReportProvisioningFailedInput = {
  failedAt: Scalars['DateTime']['input'];
  failureReason: Scalars['String']['input'];
};

export type ResourceInstance_ReportProvisioningStartedInput = {
  startedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_ResourceInstanceState = {
  __typename?: 'ResourceInstance_ResourceInstanceState';
  activatedAt?: Maybe<Scalars['DateTime']['output']>;
  configuration: Array<ResourceInstance_InstanceFacet>;
  confirmedAt?: Maybe<Scalars['DateTime']['output']>;
  customerId?: Maybe<Scalars['PHID']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  infoLink?: Maybe<Scalars['URL']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<ResourceInstance_ResourceProfile>;
  provisioningCompletedAt?: Maybe<Scalars['DateTime']['output']>;
  provisioningFailureReason?: Maybe<Scalars['String']['output']>;
  provisioningStartedAt?: Maybe<Scalars['DateTime']['output']>;
  resourceTemplateId?: Maybe<Scalars['PHID']['output']>;
  resumedAt?: Maybe<Scalars['DateTime']['output']>;
  status: ResourceInstance_InstanceStatus;
  suspendedAt?: Maybe<Scalars['DateTime']['output']>;
  suspensionDetails?: Maybe<Scalars['String']['output']>;
  suspensionReason?: Maybe<Scalars['String']['output']>;
  suspensionType?: Maybe<ResourceInstance_SuspensionType>;
  terminatedAt?: Maybe<Scalars['DateTime']['output']>;
  terminationReason?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
};

export type ResourceInstance_ResourceProfile = {
  __typename?: 'ResourceInstance_ResourceProfile';
  documentType: Scalars['String']['output'];
  id: Scalars['PHID']['output'];
};

export type ResourceInstance_ResumeAfterMaintenanceInput = {
  resumedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_ResumeAfterPaymentInput = {
  paymentReference?: InputMaybe<Scalars['String']['input']>;
  resumedAt: Scalars['DateTime']['input'];
};

/** Module: ConfigurationManagement */
export type ResourceInstance_SetInstanceFacetInput = {
  categoryKey: Scalars['String']['input'];
  categoryLabel: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  selectedOption: Scalars['String']['input'];
};

export type ResourceInstance_SetResourceProfileInput = {
  profileDocumentType: Scalars['String']['input'];
  profileId: Scalars['PHID']['input'];
};

export type ResourceInstance_SuspendForMaintenanceInput = {
  estimatedDuration?: InputMaybe<Scalars['String']['input']>;
  maintenanceType?: InputMaybe<Scalars['String']['input']>;
  suspendedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_SuspendForNonPaymentInput = {
  daysPastDue?: InputMaybe<Scalars['Int']['input']>;
  outstandingAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  suspendedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_SuspendInstanceInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
  suspendedAt: Scalars['DateTime']['input'];
};

export enum ResourceInstance_SuspensionType {
  Maintenance = 'MAINTENANCE',
  NonPayment = 'NON_PAYMENT',
  Other = 'OTHER'
}

export type ResourceInstance_TerminateInstanceInput = {
  reason: Scalars['String']['input'];
  terminatedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_UpdateInstanceFacetInput = {
  categoryKey: Scalars['String']['input'];
  categoryLabel?: InputMaybe<Scalars['String']['input']>;
  selectedOption?: InputMaybe<Scalars['String']['input']>;
};

export type ResourceInstance_UpdateInstanceInfoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  infoLink?: InputMaybe<Scalars['URL']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type ResourceInstance_UpdateInstanceStatusInput = {
  status: ResourceInstance_InstanceStatus;
};

export type ResourceTemplate = IDocument & {
  __typename?: 'ResourceTemplate';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ResourceTemplate_ResourceTemplateState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ResourceTemplate_ResourceTemplateState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ResourceTemplateOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueries = {
  __typename?: 'ResourceTemplateQueries';
  getDocument?: Maybe<ResourceTemplate>;
  getDocuments?: Maybe<Array<ResourceTemplate>>;
};


/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Module: ContentSectionManagement */
export type ResourceTemplate_AddContentSectionInput = {
  content: Scalars['String']['input'];
  displayOrder: Scalars['Int']['input'];
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
};

export type ResourceTemplate_AddFacetBindingInput = {
  bindingId: Scalars['OID']['input'];
  facetName: Scalars['String']['input'];
  facetType: Scalars['PHID']['input'];
  lastModified: Scalars['DateTime']['input'];
  serviceId: Scalars['OID']['input'];
  supportedOptions: Array<Scalars['OID']['input']>;
};

export type ResourceTemplate_AddFacetOptionInput = {
  categoryKey: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
  optionId: Scalars['String']['input'];
};

export type ResourceTemplate_AddFaqInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  displayOrder: Scalars['Int']['input'];
  id: Scalars['OID']['input'];
  question?: InputMaybe<Scalars['String']['input']>;
};

/** Module: OptionGroupManagement */
export type ResourceTemplate_AddOptionGroupInput = {
  defaultSelected: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  isAddOn: Scalars['Boolean']['input'];
  lastModified: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
};

/** Module: ServiceManagement */
export type ResourceTemplate_AddServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  isSetupFormation?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  parentServiceId?: InputMaybe<Scalars['OID']['input']>;
  title: Scalars['String']['input'];
};

/** Module: AudienceManagement */
export type ResourceTemplate_AddTargetAudienceInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  label: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ResourceTemplate_ContentSection = {
  __typename?: 'ResourceTemplate_ContentSection';
  content: Scalars['String']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  title: Scalars['String']['output'];
};

export type ResourceTemplate_DeleteContentSectionInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ResourceTemplate_DeleteFaqInput = {
  id: Scalars['OID']['input'];
};

export type ResourceTemplate_DeleteOptionGroupInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ResourceTemplate_DeleteServiceInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ResourceTemplate_FacetTarget = {
  __typename?: 'ResourceTemplate_FacetTarget';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOptions: Array<Scalars['String']['output']>;
};

export type ResourceTemplate_FaqField = {
  __typename?: 'ResourceTemplate_FaqField';
  answer?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  question?: Maybe<Scalars['String']['output']>;
};

export type ResourceTemplate_OptionGroup = {
  __typename?: 'ResourceTemplate_OptionGroup';
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type ResourceTemplate_RemoveFacetBindingInput = {
  bindingId: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  serviceId: Scalars['OID']['input'];
};

export type ResourceTemplate_RemoveFacetOptionInput = {
  categoryKey: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
  optionId: Scalars['String']['input'];
};

export type ResourceTemplate_RemoveFacetTargetInput = {
  categoryKey: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ResourceTemplate_RemoveTargetAudienceInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ResourceTemplate_ReorderContentSectionsInput = {
  lastModified: Scalars['DateTime']['input'];
  sectionIds: Array<Scalars['OID']['input']>;
};

export type ResourceTemplate_ReorderFaqsInput = {
  faqIds: Array<Scalars['OID']['input']>;
  lastModified: Scalars['DateTime']['input'];
};

export type ResourceTemplate_ResourceFacetBinding = {
  __typename?: 'ResourceTemplate_ResourceFacetBinding';
  facetName: Scalars['String']['output'];
  facetType: Scalars['PHID']['output'];
  id: Scalars['OID']['output'];
  supportedOptions: Array<Scalars['OID']['output']>;
};

export type ResourceTemplate_ResourceTemplateState = {
  __typename?: 'ResourceTemplate_ResourceTemplateState';
  contentSections: Array<ResourceTemplate_ContentSection>;
  description?: Maybe<Scalars['String']['output']>;
  facetTargets: Array<ResourceTemplate_FacetTarget>;
  faqFields?: Maybe<Array<ResourceTemplate_FaqField>>;
  id: Scalars['PHID']['output'];
  infoLink?: Maybe<Scalars['URL']['output']>;
  lastModified: Scalars['DateTime']['output'];
  operatorId: Scalars['PHID']['output'];
  optionGroups: Array<ResourceTemplate_OptionGroup>;
  recurringServices: Array<Scalars['String']['output']>;
  services: Array<ResourceTemplate_Service>;
  setupServices: Array<Scalars['String']['output']>;
  status: ResourceTemplate_TemplateStatus;
  summary: Scalars['String']['output'];
  targetAudiences: Array<ResourceTemplate_TargetAudience>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
  title: Scalars['String']['output'];
};

export type ResourceTemplate_Service = {
  __typename?: 'ResourceTemplate_Service';
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  facetBindings: Array<ResourceTemplate_ResourceFacetBinding>;
  id: Scalars['OID']['output'];
  isSetupFormation: Scalars['Boolean']['output'];
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  parentServiceId?: Maybe<Scalars['OID']['output']>;
  title: Scalars['String']['output'];
};

/** Module: FacetTargeting */
export type ResourceTemplate_SetFacetTargetInput = {
  categoryKey: Scalars['String']['input'];
  categoryLabel: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  selectedOptions: Array<Scalars['String']['input']>;
};

export type ResourceTemplate_SetOperatorInput = {
  lastModified: Scalars['DateTime']['input'];
  operatorId: Scalars['PHID']['input'];
};

export type ResourceTemplate_SetRecurringServicesInput = {
  lastModified: Scalars['DateTime']['input'];
  services: Array<Scalars['String']['input']>;
};

/** Module: ServiceCategoryManagement */
export type ResourceTemplate_SetSetupServicesInput = {
  lastModified: Scalars['DateTime']['input'];
  services: Array<Scalars['String']['input']>;
};

export type ResourceTemplate_SetTemplateIdInput = {
  id: Scalars['PHID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ResourceTemplate_TargetAudience = {
  __typename?: 'ResourceTemplate_TargetAudience';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export enum ResourceTemplate_TemplateStatus {
  Active = 'ACTIVE',
  ComingSoon = 'COMING_SOON',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT'
}

export type ResourceTemplate_UpdateContentSectionInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResourceTemplate_UpdateFaqInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  question?: InputMaybe<Scalars['String']['input']>;
};

export type ResourceTemplate_UpdateOptionGroupInput = {
  defaultSelected?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  isAddOn?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ResourceTemplate_UpdateServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  isSetupFormation?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  parentServiceId?: InputMaybe<Scalars['OID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Module: TemplateManagement */
export type ResourceTemplate_UpdateTemplateInfoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  infoLink?: InputMaybe<Scalars['URL']['input']>;
  lastModified: Scalars['DateTime']['input'];
  summary?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResourceTemplate_UpdateTemplateStatusInput = {
  lastModified: Scalars['DateTime']['input'];
  status: ResourceTemplate_TemplateStatus;
};

export type Sow_Agent = {
  __typename?: 'SOW_Agent';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['URL']['output']>;
  id: Scalars['PHID']['output'];
  name: Scalars['String']['output'];
};

export type Sow_Binary = {
  __typename?: 'SOW_Binary';
  done?: Maybe<Scalars['Boolean']['output']>;
};

export type Sow_BudgetAnchorProject = {
  __typename?: 'SOW_BudgetAnchorProject';
  margin: Scalars['Float']['output'];
  project?: Maybe<Scalars['OID']['output']>;
  quantity: Scalars['Float']['output'];
  unit?: Maybe<Sow_Unit>;
  unitCost: Scalars['Float']['output'];
};

export type Sow_BudgetExpenditure = {
  __typename?: 'SOW_BudgetExpenditure';
  actuals: Scalars['Float']['output'];
  cap: Scalars['Float']['output'];
  percentage: Scalars['Float']['output'];
};

export enum Sow_BudgetType {
  Capex = 'CAPEX',
  Contingency = 'CONTINGENCY',
  Opex = 'OPEX',
  Overhead = 'OVERHEAD'
}

export type Sow_Deliverable = {
  __typename?: 'SOW_Deliverable';
  budgetAnchor?: Maybe<Sow_BudgetAnchorProject>;
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  keyResults: Array<Sow_KeyResult>;
  owner?: Maybe<Builder>;
  status: Sow_DeliverableStatus;
  title: Scalars['String']['output'];
  workProgress?: Maybe<Sow_Progress>;
};

export enum Sow_DeliverableSetStatus {
  Canceled = 'CANCELED',
  Draft = 'DRAFT',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export enum Sow_DeliverableStatus {
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO',
  WontDo = 'WONT_DO'
}

export type Sow_DeliverablesCompleted = {
  __typename?: 'SOW_DeliverablesCompleted';
  completed: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Sow_DeliverablesSet = {
  __typename?: 'SOW_DeliverablesSet';
  deliverables: Array<Scalars['OID']['output']>;
  deliverablesCompleted: Sow_DeliverablesCompleted;
  progress: Sow_Progress;
  status: Sow_DeliverableSetStatus;
};

export type Sow_KeyResult = {
  __typename?: 'SOW_KeyResult';
  id: Scalars['OID']['output'];
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Sow_Milestone = {
  __typename?: 'SOW_Milestone';
  budget?: Maybe<Scalars['Float']['output']>;
  coordinators: Array<Scalars['ID']['output']>;
  deliveryTarget: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  scope?: Maybe<Sow_DeliverablesSet>;
  sequenceCode: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum Sow_PmCurrency {
  Dai = 'DAI',
  Eur = 'EUR',
  Usd = 'USD',
  Usds = 'USDS'
}

export type Sow_Percentage = {
  __typename?: 'SOW_Percentage';
  value: Scalars['Float']['output'];
};

export type Sow_Progress = Sow_Binary | Sow_Percentage | Sow_StoryPoint;

export type Sow_Project = {
  __typename?: 'SOW_Project';
  abstract?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['Float']['output']>;
  budgetType?: Maybe<Sow_BudgetType>;
  code: Scalars['String']['output'];
  currency?: Maybe<Sow_PmCurrency>;
  expenditure?: Maybe<Sow_BudgetExpenditure>;
  id: Scalars['OID']['output'];
  imageUrl?: Maybe<Scalars['URL']['output']>;
  projectOwner?: Maybe<Builder>;
  scope?: Maybe<Sow_DeliverablesSet>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Sow_Roadmap = {
  __typename?: 'SOW_Roadmap';
  description: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  milestones: Array<Sow_Milestone>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Sow_ScopeOfWorkState = {
  __typename?: 'SOW_ScopeOfWorkState';
  contributors: Array<Builder>;
  deliverables: Array<Sow_Deliverable>;
  description: Scalars['String']['output'];
  projects: Array<Sow_Project>;
  roadmaps: Array<Sow_Roadmap>;
  status: Sow_ScopeOfWorkStatus;
  title: Scalars['String']['output'];
};

export enum Sow_ScopeOfWorkStatus {
  Approved = 'APPROVED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export type Sow_StoryPoint = {
  __typename?: 'SOW_StoryPoint';
  completed: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum Sow_Unit {
  Hours = 'Hours',
  StoryPoints = 'StoryPoints'
}

export type ScopeOfWork = IDocument & {
  __typename?: 'ScopeOfWork';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ScopeOfWork_ScopeOfWorkState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ScopeOfWork_ScopeOfWorkState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ScopeOfWorkOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueries = {
  __typename?: 'ScopeOfWorkQueries';
  getDocument?: Maybe<ScopeOfWork>;
  getDocuments?: Maybe<Array<ScopeOfWork>>;
};


/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Module: Contributors */
export type ScopeOfWork_AddAgentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['URL']['input']>;
  id: Scalars['PHID']['input'];
  name: Scalars['String']['input'];
};

export type ScopeOfWork_AddCoordinatorInput = {
  id: Scalars['ID']['input'];
  milestoneId: Scalars['OID']['input'];
};

export type ScopeOfWork_AddDeliverableInSetInput = {
  deliverableId: Scalars['OID']['input'];
  milestoneId?: InputMaybe<Scalars['ID']['input']>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
};

/** Module: Deliverables */
export type ScopeOfWork_AddDeliverableInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  owner?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ScopeOfWork_PmDeliverableStatusInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_AddKeyResultInput = {
  deliverableId: Scalars['OID']['input'];
  id: Scalars['OID']['input'];
  link?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type ScopeOfWork_AddMilestoneDeliverableInput = {
  deliverableId: Scalars['OID']['input'];
  milestoneId: Scalars['OID']['input'];
  title: Scalars['String']['input'];
};

/** Module: Milestones */
export type ScopeOfWork_AddMilestoneInput = {
  deliveryTarget?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  roadmapId: Scalars['OID']['input'];
  sequenceCode?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_AddProjectDeliverableInput = {
  deliverableId: Scalars['ID']['input'];
  projectId: Scalars['OID']['input'];
  title: Scalars['String']['input'];
};

/** Module: Projects */
export type ScopeOfWork_AddProjectInput = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  budget?: InputMaybe<Scalars['Float']['input']>;
  budgetType?: InputMaybe<ScopeOfWork_PmBudgetTypeInput>;
  code: Scalars['String']['input'];
  currency?: InputMaybe<ScopeOfWork_PmCurrencyInput>;
  id: Scalars['OID']['input'];
  imageUrl?: InputMaybe<Scalars['URL']['input']>;
  projectOwner?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

/** Module: Roadmaps */
export type ScopeOfWork_AddRoadmapInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type ScopeOfWork_Agent = {
  __typename?: 'ScopeOfWork_Agent';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['URL']['output']>;
  id: Scalars['PHID']['output'];
  name: Scalars['String']['output'];
};

export type ScopeOfWork_Binary = {
  __typename?: 'ScopeOfWork_Binary';
  done?: Maybe<Scalars['Boolean']['output']>;
};

export type ScopeOfWork_BudgetAnchorProject = {
  __typename?: 'ScopeOfWork_BudgetAnchorProject';
  margin: Scalars['Float']['output'];
  project?: Maybe<Scalars['OID']['output']>;
  quantity: Scalars['Float']['output'];
  unit?: Maybe<ScopeOfWork_Unit>;
  unitCost: Scalars['Float']['output'];
};

export type ScopeOfWork_BudgetExpenditure = {
  __typename?: 'ScopeOfWork_BudgetExpenditure';
  actuals: Scalars['Float']['output'];
  cap: Scalars['Float']['output'];
  percentage: Scalars['Float']['output'];
};

export enum ScopeOfWork_BudgetType {
  Capex = 'CAPEX',
  Contingency = 'CONTINGENCY',
  Opex = 'OPEX',
  Overhead = 'OVERHEAD'
}

export type ScopeOfWork_Deliverable = {
  __typename?: 'ScopeOfWork_Deliverable';
  budgetAnchor?: Maybe<ScopeOfWork_BudgetAnchorProject>;
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  keyResults: Array<ScopeOfWork_KeyResult>;
  owner?: Maybe<Scalars['ID']['output']>;
  status: ScopeOfWork_DeliverableStatus;
  title: Scalars['String']['output'];
  workProgress?: Maybe<ScopeOfWork_Progress>;
};

export enum ScopeOfWork_DeliverableSetStatus {
  Canceled = 'CANCELED',
  Draft = 'DRAFT',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export enum ScopeOfWork_DeliverableSetStatusInput {
  Canceled = 'CANCELED',
  Draft = 'DRAFT',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export enum ScopeOfWork_DeliverableStatus {
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO',
  WontDo = 'WONT_DO'
}

export type ScopeOfWork_DeliverablesCompleted = {
  __typename?: 'ScopeOfWork_DeliverablesCompleted';
  completed: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ScopeOfWork_DeliverablesCompletedInput = {
  completed: Scalars['Int']['input'];
  total: Scalars['Int']['input'];
};

export type ScopeOfWork_DeliverablesSet = {
  __typename?: 'ScopeOfWork_DeliverablesSet';
  deliverables: Array<Scalars['OID']['output']>;
  deliverablesCompleted: ScopeOfWork_DeliverablesCompleted;
  progress: ScopeOfWork_Progress;
  status: ScopeOfWork_DeliverableSetStatus;
};

export type ScopeOfWork_EditAgentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['URL']['input']>;
  id: Scalars['PHID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_EditDeliverableInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  owner?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ScopeOfWork_PmDeliverableStatusInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Module: DeliverablesSet */
export type ScopeOfWork_EditDeliverablesSetInput = {
  deliverablesCompleted?: InputMaybe<ScopeOfWork_DeliverablesCompletedInput>;
  milestoneId?: InputMaybe<Scalars['ID']['input']>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ScopeOfWork_DeliverableSetStatusInput>;
};

export type ScopeOfWork_EditKeyResultInput = {
  deliverableId: Scalars['OID']['input'];
  id: Scalars['OID']['input'];
  link?: InputMaybe<Scalars['URL']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_EditMilestoneInput = {
  deliveryTarget?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  roadmapId: Scalars['OID']['input'];
  sequenceCode?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_EditRoadmapInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Module: ScopeOfWork */
export type ScopeOfWork_EditScopeOfWorkInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ScopeOfWork_ScopeOfWorkStatusInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_KeyResult = {
  __typename?: 'ScopeOfWork_KeyResult';
  id: Scalars['OID']['output'];
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScopeOfWork_Milestone = {
  __typename?: 'ScopeOfWork_Milestone';
  budget?: Maybe<Scalars['Float']['output']>;
  coordinators: Array<Scalars['ID']['output']>;
  deliveryTarget: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  scope?: Maybe<ScopeOfWork_DeliverablesSet>;
  sequenceCode: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum ScopeOfWork_PmBudgetTypeInput {
  Capex = 'CAPEX',
  Contingency = 'CONTINGENCY',
  Opex = 'OPEX',
  Overhead = 'OVERHEAD'
}

export enum ScopeOfWork_PmCurrency {
  Dai = 'DAI',
  Eur = 'EUR',
  Usd = 'USD',
  Usds = 'USDS'
}

export enum ScopeOfWork_PmCurrencyInput {
  Dai = 'DAI',
  Eur = 'EUR',
  Usd = 'USD',
  Usds = 'USDS'
}

export enum ScopeOfWork_PmDeliverableStatusInput {
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO',
  WontDo = 'WONT_DO'
}

export type ScopeOfWork_Percentage = {
  __typename?: 'ScopeOfWork_Percentage';
  value: Scalars['Float']['output'];
};

export type ScopeOfWork_Progress = ScopeOfWork_Binary | ScopeOfWork_Percentage | ScopeOfWork_StoryPoint;

export type ScopeOfWork_ProgressInput = {
  done?: InputMaybe<Scalars['Boolean']['input']>;
  percentage?: InputMaybe<Scalars['Float']['input']>;
  storyPoints?: InputMaybe<ScopeOfWork_StoryPointInput>;
};

export type ScopeOfWork_Project = {
  __typename?: 'ScopeOfWork_Project';
  abstract?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['Float']['output']>;
  budgetType?: Maybe<ScopeOfWork_BudgetType>;
  code: Scalars['String']['output'];
  currency?: Maybe<ScopeOfWork_PmCurrency>;
  expenditure?: Maybe<ScopeOfWork_BudgetExpenditure>;
  id: Scalars['OID']['output'];
  imageUrl?: Maybe<Scalars['URL']['output']>;
  projectOwner?: Maybe<Scalars['ID']['output']>;
  scope?: Maybe<ScopeOfWork_DeliverablesSet>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScopeOfWork_RemoveAgentInput = {
  id: Scalars['PHID']['input'];
};

export type ScopeOfWork_RemoveCoordinatorInput = {
  id: Scalars['ID']['input'];
  milestoneId: Scalars['OID']['input'];
};

export type ScopeOfWork_RemoveDeliverableInSetInput = {
  deliverableId: Scalars['OID']['input'];
  milestoneId?: InputMaybe<Scalars['ID']['input']>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
};

export type ScopeOfWork_RemoveDeliverableInput = {
  id: Scalars['OID']['input'];
};

export type ScopeOfWork_RemoveKeyResultInput = {
  deliverableId: Scalars['OID']['input'];
  id: Scalars['OID']['input'];
};

export type ScopeOfWork_RemoveMilestoneDeliverableInput = {
  deliverableId: Scalars['OID']['input'];
  milestoneId: Scalars['OID']['input'];
};

export type ScopeOfWork_RemoveMilestoneInput = {
  id: Scalars['OID']['input'];
  roadmapId: Scalars['OID']['input'];
};

export type ScopeOfWork_RemoveProjectDeliverableInput = {
  deliverableId: Scalars['OID']['input'];
  projectId: Scalars['OID']['input'];
};

export type ScopeOfWork_RemoveProjectInput = {
  projectId: Scalars['ID']['input'];
};

export type ScopeOfWork_RemoveRoadmapInput = {
  id: Scalars['OID']['input'];
};

export type ScopeOfWork_Roadmap = {
  __typename?: 'ScopeOfWork_Roadmap';
  description: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  milestones: Array<ScopeOfWork_Milestone>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScopeOfWork_ScopeOfWorkState = {
  __typename?: 'ScopeOfWork_ScopeOfWorkState';
  contributors: Array<ScopeOfWork_Agent>;
  deliverables: Array<ScopeOfWork_Deliverable>;
  description: Scalars['String']['output'];
  projects: Array<ScopeOfWork_Project>;
  roadmaps: Array<ScopeOfWork_Roadmap>;
  status: ScopeOfWork_ScopeOfWorkStatus;
  title: Scalars['String']['output'];
};

export enum ScopeOfWork_ScopeOfWorkStatus {
  Approved = 'APPROVED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export enum ScopeOfWork_ScopeOfWorkStatusInput {
  Approved = 'APPROVED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export type ScopeOfWork_SetDeliverableBudgetAnchorProjectInput = {
  deliverableId: Scalars['ID']['input'];
  margin?: InputMaybe<Scalars['Float']['input']>;
  project?: InputMaybe<Scalars['OID']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<ScopeOfWork_Unit>;
  unitCost?: InputMaybe<Scalars['Float']['input']>;
};

export type ScopeOfWork_SetDeliverableProgressInput = {
  id: Scalars['OID']['input'];
  workProgress?: InputMaybe<ScopeOfWork_ProgressInput>;
};

export type ScopeOfWork_SetProjectMarginInput = {
  margin: Scalars['Float']['input'];
  projectId: Scalars['OID']['input'];
};

export type ScopeOfWork_SetProjectTotalBudgetInput = {
  projectId: Scalars['OID']['input'];
  totalBudget: Scalars['Float']['input'];
};

export type ScopeOfWork_StoryPoint = {
  __typename?: 'ScopeOfWork_StoryPoint';
  completed: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ScopeOfWork_StoryPointInput = {
  completed: Scalars['Int']['input'];
  total: Scalars['Int']['input'];
};

export enum ScopeOfWork_Unit {
  Hours = 'Hours',
  StoryPoints = 'StoryPoints'
}

export type ScopeOfWork_UpdateProjectInput = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  budget?: InputMaybe<Scalars['Float']['input']>;
  budgetType?: InputMaybe<ScopeOfWork_PmBudgetTypeInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<ScopeOfWork_PmCurrencyInput>;
  id: Scalars['OID']['input'];
  imageUrl?: InputMaybe<Scalars['URL']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_UpdateProjectOwnerInput = {
  id: Scalars['OID']['input'];
  projectOwner: Scalars['ID']['input'];
};

export type ServiceOffering = IDocument & {
  __typename?: 'ServiceOffering';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ServiceOffering_ServiceOfferingState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ServiceOffering_ServiceOfferingState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ServiceOfferingOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: ServiceOffering Document */
export type ServiceOfferingQueries = {
  __typename?: 'ServiceOfferingQueries';
  getDocument?: Maybe<ServiceOffering>;
  getDocuments?: Maybe<Array<ServiceOffering>>;
};


/** Queries: ServiceOffering Document */
export type ServiceOfferingQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: ServiceOffering Document */
export type ServiceOfferingQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type ServiceOffering_AddFacetBindingInput = {
  bindingId: Scalars['OID']['input'];
  facetName: Scalars['String']['input'];
  facetType: Scalars['PHID']['input'];
  lastModified: Scalars['DateTime']['input'];
  serviceId: Scalars['OID']['input'];
  supportedOptions: Array<Scalars['OID']['input']>;
};

export type ServiceOffering_AddFacetOptionInput = {
  categoryKey: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
  optionId: Scalars['String']['input'];
};

/** Module: OptionGroupManagement */
export type ServiceOffering_AddOptionGroupInput = {
  billingCycle?: InputMaybe<ServiceOffering_BillingCycle>;
  costType?: InputMaybe<ServiceOffering_GroupCostType>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  defaultSelected: Scalars['Boolean']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  isAddOn: Scalars['Boolean']['input'];
  lastModified: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Amount_Money']['input']>;
};

/** Module: ServiceGroupManagement */
export type ServiceOffering_AddServiceGroupInput = {
  billingCycle: ServiceOffering_BillingCycle;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
};

/** Module: ServiceManagement */
export type ServiceOffering_AddServiceInput = {
  costType?: InputMaybe<ServiceOffering_ServiceCostType>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  isSetupFormation?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  price?: InputMaybe<Scalars['Amount_Money']['input']>;
  serviceGroupId?: InputMaybe<Scalars['OID']['input']>;
  title: Scalars['String']['input'];
};

export type ServiceOffering_AddServiceLevelInput = {
  customValue?: InputMaybe<Scalars['String']['input']>;
  lastModified: Scalars['DateTime']['input'];
  level: ServiceOffering_ServiceLevel;
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  serviceId: Scalars['OID']['input'];
  serviceLevelId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_AddTargetAudienceInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  label: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
};

/** Module: TierManagement */
export type ServiceOffering_AddTierInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  currency: Scalars['Currency']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  isCustomPricing?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
};

export type ServiceOffering_AddTierPricingOptionInput = {
  amount: Scalars['Amount_Money']['input'];
  currency: Scalars['Currency']['input'];
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  pricingOptionId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_AddUsageLimitInput = {
  freeLimit?: InputMaybe<Scalars['Int']['input']>;
  lastModified: Scalars['DateTime']['input'];
  limitId: Scalars['OID']['input'];
  metric: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  paidLimit?: InputMaybe<Scalars['Int']['input']>;
  resetCycle?: InputMaybe<ServiceOffering_UsageResetCycle>;
  serviceId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
  unitName?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['Amount_Money']['input']>;
  unitPriceCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export enum ServiceOffering_BillingCycle {
  Annual = 'ANNUAL',
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME',
  Quarterly = 'QUARTERLY',
  SemiAnnual = 'SEMI_ANNUAL'
}

export type ServiceOffering_ChangeResourceTemplateInput = {
  lastModified: Scalars['DateTime']['input'];
  newTemplateId: Scalars['PHID']['input'];
  previousTemplateId: Scalars['PHID']['input'];
};

export type ServiceOffering_DeleteOptionGroupInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceOffering_DeleteServiceGroupInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceOffering_DeleteServiceInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceOffering_DeleteTierInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceOffering_FacetTarget = {
  __typename?: 'ServiceOffering_FacetTarget';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOptions: Array<Scalars['String']['output']>;
};

export enum ServiceOffering_GroupCostType {
  Recurring = 'RECURRING',
  Setup = 'SETUP'
}

export type ServiceOffering_OptionGroup = {
  __typename?: 'ServiceOffering_OptionGroup';
  billingCycle?: Maybe<ServiceOffering_BillingCycle>;
  costType?: Maybe<ServiceOffering_GroupCostType>;
  currency?: Maybe<Scalars['Currency']['output']>;
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Amount_Money']['output']>;
};

export type ServiceOffering_RemoveFacetBindingInput = {
  bindingId: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  serviceId: Scalars['OID']['input'];
};

export type ServiceOffering_RemoveFacetOptionInput = {
  categoryKey: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
  optionId: Scalars['String']['input'];
};

export type ServiceOffering_RemoveFacetTargetInput = {
  categoryKey: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceOffering_RemoveServiceLevelInput = {
  lastModified: Scalars['DateTime']['input'];
  serviceLevelId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_RemoveTargetAudienceInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceOffering_RemoveTierPricingOptionInput = {
  lastModified: Scalars['DateTime']['input'];
  pricingOptionId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_RemoveUsageLimitInput = {
  lastModified: Scalars['DateTime']['input'];
  limitId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_ReorderServiceGroupsInput = {
  lastModified: Scalars['DateTime']['input'];
  order: Array<Scalars['OID']['input']>;
};

export type ServiceOffering_ResourceFacetBinding = {
  __typename?: 'ServiceOffering_ResourceFacetBinding';
  facetName: Scalars['String']['output'];
  facetType: Scalars['PHID']['output'];
  id: Scalars['OID']['output'];
  supportedOptions: Array<Scalars['OID']['output']>;
};

export type ServiceOffering_SelectResourceTemplateInput = {
  lastModified: Scalars['DateTime']['input'];
  resourceTemplateId: Scalars['PHID']['input'];
};

export type ServiceOffering_Service = {
  __typename?: 'ServiceOffering_Service';
  costType?: Maybe<ServiceOffering_ServiceCostType>;
  currency?: Maybe<Scalars['Currency']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  facetBindings: Array<ServiceOffering_ResourceFacetBinding>;
  id: Scalars['OID']['output'];
  isSetupFormation: Scalars['Boolean']['output'];
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  price?: Maybe<Scalars['Amount_Money']['output']>;
  serviceGroupId?: Maybe<Scalars['OID']['output']>;
  title: Scalars['String']['output'];
};

export enum ServiceOffering_ServiceCostType {
  Recurring = 'RECURRING',
  Setup = 'SETUP'
}

export type ServiceOffering_ServiceGroup = {
  __typename?: 'ServiceOffering_ServiceGroup';
  billingCycle: ServiceOffering_BillingCycle;
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
};

export enum ServiceOffering_ServiceLevel {
  Custom = 'CUSTOM',
  Included = 'INCLUDED',
  NotApplicable = 'NOT_APPLICABLE',
  NotIncluded = 'NOT_INCLUDED',
  Optional = 'OPTIONAL',
  Variable = 'VARIABLE'
}

export type ServiceOffering_ServiceLevelBinding = {
  __typename?: 'ServiceOffering_ServiceLevelBinding';
  customValue?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  level: ServiceOffering_ServiceLevel;
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  serviceId: Scalars['OID']['output'];
};

export type ServiceOffering_ServiceOfferingState = {
  __typename?: 'ServiceOffering_ServiceOfferingState';
  description?: Maybe<Scalars['String']['output']>;
  facetTargets: Array<ServiceOffering_FacetTarget>;
  id: Scalars['PHID']['output'];
  infoLink?: Maybe<Scalars['URL']['output']>;
  lastModified: Scalars['DateTime']['output'];
  operatorId: Scalars['PHID']['output'];
  optionGroups: Array<ServiceOffering_OptionGroup>;
  resourceTemplateId?: Maybe<Scalars['PHID']['output']>;
  serviceGroups: Array<ServiceOffering_ServiceGroup>;
  services: Array<ServiceOffering_Service>;
  status: ServiceOffering_ServiceStatus;
  summary: Scalars['String']['output'];
  targetAudiences: Array<ServiceOffering_TargetAudience>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
  tiers: Array<ServiceOffering_ServiceSubscriptionTier>;
  title: Scalars['String']['output'];
};

export type ServiceOffering_ServicePricing = {
  __typename?: 'ServiceOffering_ServicePricing';
  amount?: Maybe<Scalars['Amount_Money']['output']>;
  currency: Scalars['Currency']['output'];
};

export enum ServiceOffering_ServiceStatus {
  Active = 'ACTIVE',
  ComingSoon = 'COMING_SOON',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT'
}

export type ServiceOffering_ServiceSubscriptionTier = {
  __typename?: 'ServiceOffering_ServiceSubscriptionTier';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isCustomPricing: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pricing: ServiceOffering_ServicePricing;
  pricingOptions: Array<ServiceOffering_TierPricingOption>;
  serviceLevels: Array<ServiceOffering_ServiceLevelBinding>;
  usageLimits: Array<ServiceOffering_ServiceUsageLimit>;
};

export type ServiceOffering_ServiceUsageLimit = {
  __typename?: 'ServiceOffering_ServiceUsageLimit';
  freeLimit?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  metric: Scalars['String']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  paidLimit?: Maybe<Scalars['Int']['output']>;
  resetCycle?: Maybe<ServiceOffering_UsageResetCycle>;
  serviceId: Scalars['OID']['output'];
  unitName?: Maybe<Scalars['String']['output']>;
  unitPrice?: Maybe<Scalars['Amount_Money']['output']>;
  unitPriceCurrency?: Maybe<Scalars['Currency']['output']>;
};

export type ServiceOffering_SetFacetTargetInput = {
  categoryKey: Scalars['String']['input'];
  categoryLabel: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  selectedOptions: Array<Scalars['String']['input']>;
};

export type ServiceOffering_SetOfferingIdInput = {
  id: Scalars['PHID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceOffering_SetOperatorInput = {
  lastModified: Scalars['DateTime']['input'];
  operatorId: Scalars['PHID']['input'];
};

export type ServiceOffering_TargetAudience = {
  __typename?: 'ServiceOffering_TargetAudience';
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export type ServiceOffering_TierPricingOption = {
  __typename?: 'ServiceOffering_TierPricingOption';
  amount: Scalars['Amount_Money']['output'];
  currency: Scalars['Currency']['output'];
  id: Scalars['OID']['output'];
  isDefault: Scalars['Boolean']['output'];
};

/** Module: OfferingManagement */
export type ServiceOffering_UpdateOfferingInfoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  infoLink?: InputMaybe<Scalars['URL']['input']>;
  lastModified: Scalars['DateTime']['input'];
  summary?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceOffering_UpdateOfferingStatusInput = {
  lastModified: Scalars['DateTime']['input'];
  status: ServiceOffering_ServiceStatus;
};

export type ServiceOffering_UpdateOptionGroupInput = {
  billingCycle?: InputMaybe<ServiceOffering_BillingCycle>;
  costType?: InputMaybe<ServiceOffering_GroupCostType>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  defaultSelected?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  isAddOn?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Amount_Money']['input']>;
};

export type ServiceOffering_UpdateServiceGroupInput = {
  billingCycle?: InputMaybe<ServiceOffering_BillingCycle>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceOffering_UpdateServiceInput = {
  costType?: InputMaybe<ServiceOffering_ServiceCostType>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  isSetupFormation?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  price?: InputMaybe<Scalars['Amount_Money']['input']>;
  serviceGroupId?: InputMaybe<Scalars['OID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceOffering_UpdateServiceLevelInput = {
  customValue?: InputMaybe<Scalars['String']['input']>;
  lastModified: Scalars['DateTime']['input'];
  level?: InputMaybe<ServiceOffering_ServiceLevel>;
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  serviceLevelId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_UpdateTierInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  isCustomPricing?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceOffering_UpdateTierPricingInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  lastModified: Scalars['DateTime']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_UpdateTierPricingOptionInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  pricingOptionId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_UpdateUsageLimitInput = {
  freeLimit?: InputMaybe<Scalars['Int']['input']>;
  lastModified: Scalars['DateTime']['input'];
  limitId: Scalars['OID']['input'];
  metric?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paidLimit?: InputMaybe<Scalars['Int']['input']>;
  resetCycle?: InputMaybe<ServiceOffering_UsageResetCycle>;
  tierId: Scalars['OID']['input'];
  unitName?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['Amount_Money']['input']>;
  unitPriceCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export enum ServiceOffering_UsageResetCycle {
  Daily = 'DAILY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type ServiceSubscription = IDocument & {
  __typename?: 'ServiceSubscription';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ServiceSubscription_ServiceSubscriptionState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ServiceSubscription_ServiceSubscriptionState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ServiceSubscriptionOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: ServiceSubscription Document */
export type ServiceSubscriptionQueries = {
  __typename?: 'ServiceSubscriptionQueries';
  getDocument?: Maybe<ServiceSubscription>;
  getDocuments?: Maybe<Array<ServiceSubscription>>;
};


/** Queries: ServiceSubscription Document */
export type ServiceSubscriptionQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: ServiceSubscription Document */
export type ServiceSubscriptionQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type ServiceSubscription_ActivateSubscriptionInput = {
  currentPeriodEnd: Scalars['DateTime']['input'];
  currentPeriodStart: Scalars['DateTime']['input'];
  lastModified: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
};

/** Module: AddOnManagement */
export type ServiceSubscription_AddAddonInput = {
  addedAt: Scalars['DateTime']['input'];
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  optionGroupId: Scalars['OID']['input'];
};

export enum ServiceSubscription_BillingCycle {
  Annual = 'ANNUAL',
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME',
  Quarterly = 'QUARTERLY',
  SemiAnnual = 'SEMI_ANNUAL'
}

export type ServiceSubscription_CancelSubscriptionInput = {
  cancelEffectiveDate?: InputMaybe<Scalars['DateTime']['input']>;
  cancelledAt: Scalars['DateTime']['input'];
  lastModified: Scalars['DateTime']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

/** Module: TierSelection */
export type ServiceSubscription_ChangeTierInput = {
  lastModified: Scalars['DateTime']['input'];
  newTierId: Scalars['OID']['input'];
};

export type ServiceSubscription_ExpireSubscriptionInput = {
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceSubscription_FacetSelection = {
  __typename?: 'ServiceSubscription_FacetSelection';
  categoryKey: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOptionId: Scalars['String']['output'];
};

/** Module: SubscriptionManagement */
export type ServiceSubscription_InitializeSubscriptionInput = {
  createdAt: Scalars['DateTime']['input'];
  customerId: Scalars['PHID']['input'];
  customerName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['PHID']['input'];
  lastModified: Scalars['DateTime']['input'];
  resourceTemplateId: Scalars['PHID']['input'];
  selectedTierId: Scalars['OID']['input'];
  serviceOfferingId: Scalars['PHID']['input'];
  serviceOfferingTitle?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceSubscription_RemoveAddonInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceSubscription_RemoveFacetSelectionInput = {
  categoryKey: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type ServiceSubscription_SelectedAddon = {
  __typename?: 'ServiceSubscription_SelectedAddon';
  addedAt: Scalars['DateTime']['output'];
  id: Scalars['OID']['output'];
  optionGroupId: Scalars['OID']['output'];
};

export type ServiceSubscription_ServiceSubscriptionState = {
  __typename?: 'ServiceSubscription_ServiceSubscriptionState';
  autoRenew: Scalars['Boolean']['output'];
  cancelEffectiveDate?: Maybe<Scalars['DateTime']['output']>;
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancelledAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  currentPeriodEnd?: Maybe<Scalars['DateTime']['output']>;
  currentPeriodStart?: Maybe<Scalars['DateTime']['output']>;
  customerId: Scalars['PHID']['output'];
  customerName?: Maybe<Scalars['String']['output']>;
  facetSelections: Array<ServiceSubscription_FacetSelection>;
  id: Scalars['PHID']['output'];
  lastModified: Scalars['DateTime']['output'];
  nextBillingDate?: Maybe<Scalars['DateTime']['output']>;
  pricing?: Maybe<ServiceSubscription_SubscriptionPricing>;
  projectedBillAmount?: Maybe<Scalars['Amount_Money']['output']>;
  projectedBillCurrency?: Maybe<Scalars['Currency']['output']>;
  resourceTemplateId: Scalars['PHID']['output'];
  selectedAddons: Array<ServiceSubscription_SelectedAddon>;
  selectedTierId: Scalars['OID']['output'];
  serviceOfferingId: Scalars['PHID']['output'];
  serviceOfferingTitle?: Maybe<Scalars['String']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  status: ServiceSubscription_SubscriptionStatus;
};

export type ServiceSubscription_SetCachedSnippetsInput = {
  customerName?: InputMaybe<Scalars['String']['input']>;
  lastModified: Scalars['DateTime']['input'];
  serviceOfferingTitle?: InputMaybe<Scalars['String']['input']>;
};

/** Module: FacetSelection */
export type ServiceSubscription_SetFacetSelectionInput = {
  categoryKey: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
  selectedOptionId: Scalars['String']['input'];
};

export type ServiceSubscription_SetPricingInput = {
  amount: Scalars['Amount_Money']['input'];
  billingCycle: ServiceSubscription_BillingCycle;
  currency: Scalars['Currency']['input'];
  lastModified: Scalars['DateTime']['input'];
  setupFee?: InputMaybe<Scalars['Amount_Money']['input']>;
};

export type ServiceSubscription_SubscriptionPricing = {
  __typename?: 'ServiceSubscription_SubscriptionPricing';
  amount: Scalars['Amount_Money']['output'];
  billingCycle: ServiceSubscription_BillingCycle;
  currency: Scalars['Currency']['output'];
  setupFee?: Maybe<Scalars['Amount_Money']['output']>;
};

export enum ServiceSubscription_SubscriptionStatus {
  Active = 'ACTIVE',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

/** Module: BillingProjection */
export type ServiceSubscription_UpdateBillingProjectionInput = {
  lastModified: Scalars['DateTime']['input'];
  nextBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectedBillAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  projectedBillCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export type Signer = {
  __typename?: 'Signer';
  app?: Maybe<SignerApp>;
  signatures: Array<Scalars['String']['output']>;
  user?: Maybe<SignerUser>;
};

export type SignerApp = {
  __typename?: 'SignerApp';
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SignerUser = {
  __typename?: 'SignerUser';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  networkId: Scalars['String']['output'];
};

export enum SnapAccountType {
  Destination = 'Destination',
  External = 'External',
  Internal = 'Internal',
  Source = 'Source'
}

export type SnapshotAccount = {
  __typename?: 'SnapshotAccount';
  address: Scalars['String']['output'];
  balances: Array<SnapshotAccountBalance>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  transactions: Array<SnapshotAccountTransaction>;
  type: SnapAccountType;
};

export type SnapshotAccountBalance = {
  __typename?: 'SnapshotAccountBalance';
  endingBalance: Scalars['Amount_Currency']['output'];
  startingBalance: Scalars['Amount_Currency']['output'];
  token: Token;
};

export type SnapshotAccountTransaction = {
  __typename?: 'SnapshotAccountTransaction';
  amount: TxAmount;
  counterParty: Scalars['EthereumAddress']['output'];
  counterPartyName: Scalars['String']['output'];
  datetime: Scalars['DateTime']['output'];
  direction: AccountTransactionDirection;
  flowType: AccountTransactionFlowType;
  id: Scalars['ID']['output'];
  txHash: Scalars['String']['output'];
};

export type SnapshotReport = IDocument & {
  __typename?: 'SnapshotReport';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: SnapshotReport_SnapshotReportState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: SnapshotReport_SnapshotReportState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type SnapshotReportOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: SnapshotReport Document */
export type SnapshotReportQueries = {
  __typename?: 'SnapshotReportQueries';
  getDocument?: Maybe<SnapshotReport>;
  getDocuments?: Maybe<Array<SnapshotReport>>;
};


/** Queries: SnapshotReport Document */
export type SnapshotReportQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: SnapshotReport Document */
export type SnapshotReportQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export enum SnapshotReport_AccountType {
  Destination = 'Destination',
  External = 'External',
  Internal = 'Internal',
  Source = 'Source'
}

export enum SnapshotReport_AccountTypeInput {
  Destination = 'Destination',
  External = 'External',
  Internal = 'Internal',
  Source = 'Source'
}

export type SnapshotReport_AddOwnerIdInput = {
  ownerId: Scalars['PHID']['input'];
};

/** Module: Accounts */
export type SnapshotReport_AddSnapshotAccountInput = {
  accountAddress: Scalars['String']['input'];
  accountId: Scalars['OID']['input'];
  accountName: Scalars['String']['input'];
  accountTransactionsId?: InputMaybe<Scalars['PHID']['input']>;
  id: Scalars['OID']['input'];
  type: SnapshotReport_AccountTypeInput;
};

/** Module: Transactions */
export type SnapshotReport_AddTransactionInput = {
  accountId: Scalars['OID']['input'];
  amount: Scalars['Amount_Currency']['input'];
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  counterParty?: InputMaybe<Scalars['EthereumAddress']['input']>;
  counterPartyAccountId?: InputMaybe<Scalars['OID']['input']>;
  datetime: Scalars['DateTime']['input'];
  direction: SnapshotReport_TransactionDirectionInput;
  flowType?: InputMaybe<SnapshotReport_TransactionFlowTypeInput>;
  id: Scalars['OID']['input'];
  token: Scalars['Currency']['input'];
  transactionId: Scalars['String']['input'];
  txHash: Scalars['String']['input'];
};

export type SnapshotReport_RecalculateFlowTypesInput = {
  _?: InputMaybe<Scalars['String']['input']>;
};

export type SnapshotReport_RemoveEndingBalanceInput = {
  accountId: Scalars['OID']['input'];
  balanceId: Scalars['OID']['input'];
};

export type SnapshotReport_RemoveOwnerIdInput = {
  ownerId: Scalars['PHID']['input'];
};

export type SnapshotReport_RemoveSnapshotAccountInput = {
  id: Scalars['OID']['input'];
};

export type SnapshotReport_RemoveStartingBalanceInput = {
  accountId: Scalars['OID']['input'];
  balanceId: Scalars['OID']['input'];
};

export type SnapshotReport_RemoveTransactionInput = {
  id: Scalars['OID']['input'];
};

export type SnapshotReport_SetAccountsDocumentInput = {
  accountsDocumentId: Scalars['PHID']['input'];
};

export type SnapshotReport_SetEndingBalanceInput = {
  accountId: Scalars['OID']['input'];
  amount: Scalars['Amount_Currency']['input'];
  balanceId: Scalars['OID']['input'];
  token: Scalars['Currency']['input'];
};

export type SnapshotReport_SetPeriodEndInput = {
  periodEnd: Scalars['DateTime']['input'];
};

export type SnapshotReport_SetPeriodInput = {
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
};

export type SnapshotReport_SetPeriodStartInput = {
  periodStart: Scalars['DateTime']['input'];
};

/** Module: Configuration */
export type SnapshotReport_SetReportConfigInput = {
  accountsDocumentId?: InputMaybe<Scalars['PHID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  reportName?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Module: Balances */
export type SnapshotReport_SetStartingBalanceInput = {
  accountId: Scalars['OID']['input'];
  amount: Scalars['Amount_Currency']['input'];
  balanceId: Scalars['OID']['input'];
  token: Scalars['Currency']['input'];
};

export type SnapshotReport_SnapshotAccount = {
  __typename?: 'SnapshotReport_SnapshotAccount';
  accountAddress: Scalars['String']['output'];
  accountId: Scalars['OID']['output'];
  accountName: Scalars['String']['output'];
  accountTransactionsId?: Maybe<Scalars['PHID']['output']>;
  endingBalances: Array<SnapshotReport_TokenBalance>;
  id: Scalars['OID']['output'];
  startingBalances: Array<SnapshotReport_TokenBalance>;
  transactions: Array<SnapshotReport_SnapshotTransaction>;
  type: SnapshotReport_AccountType;
};

export type SnapshotReport_SnapshotReportState = {
  __typename?: 'SnapshotReport_SnapshotReportState';
  accountsDocumentId?: Maybe<Scalars['PHID']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  ownerIds: Array<Scalars['PHID']['output']>;
  reportName?: Maybe<Scalars['String']['output']>;
  reportPeriodEnd?: Maybe<Scalars['DateTime']['output']>;
  reportPeriodStart?: Maybe<Scalars['DateTime']['output']>;
  snapshotAccounts: Array<SnapshotReport_SnapshotAccount>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
};

export type SnapshotReport_SnapshotTransaction = {
  __typename?: 'SnapshotReport_SnapshotTransaction';
  amount: Scalars['Amount_Currency']['output'];
  blockNumber?: Maybe<Scalars['Int']['output']>;
  counterParty?: Maybe<Scalars['EthereumAddress']['output']>;
  counterPartyAccountId?: Maybe<Scalars['OID']['output']>;
  datetime: Scalars['DateTime']['output'];
  direction: SnapshotReport_TransactionDirection;
  flowType?: Maybe<SnapshotReport_TransactionFlowType>;
  id: Scalars['OID']['output'];
  token: Scalars['Currency']['output'];
  transactionId: Scalars['String']['output'];
  txHash: Scalars['String']['output'];
};

export type SnapshotReport_TokenBalance = {
  __typename?: 'SnapshotReport_TokenBalance';
  amount: Scalars['Amount_Currency']['output'];
  id: Scalars['OID']['output'];
  token: Scalars['Currency']['output'];
};

export enum SnapshotReport_TransactionDirection {
  Inflow = 'INFLOW',
  Outflow = 'OUTFLOW'
}

export enum SnapshotReport_TransactionDirectionInput {
  Inflow = 'INFLOW',
  Outflow = 'OUTFLOW'
}

export enum SnapshotReport_TransactionFlowType {
  External = 'External',
  Internal = 'Internal',
  Return = 'Return',
  Swap = 'Swap',
  TopUp = 'TopUp'
}

export enum SnapshotReport_TransactionFlowTypeInput {
  External = 'External',
  Internal = 'Internal',
  Return = 'Return',
  Swap = 'Swap',
  TopUp = 'TopUp'
}

export type SnapshotReport_UpdateSnapshotAccountTypeInput = {
  id: Scalars['OID']['input'];
  type: SnapshotReport_AccountTypeInput;
};

export type SnapshotReport_UpdateTransactionFlowTypeInput = {
  flowType: SnapshotReport_TransactionFlowTypeInput;
  id: Scalars['OID']['input'];
};

export type SubscriptionInstance = IDocument & {
  __typename?: 'SubscriptionInstance';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: SubscriptionInstance_SubscriptionInstanceState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: SubscriptionInstance_SubscriptionInstanceState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type SubscriptionInstanceOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueries = {
  __typename?: 'SubscriptionInstanceQueries';
  getDocument?: Maybe<SubscriptionInstance>;
  getDocuments?: Maybe<Array<SubscriptionInstance>>;
};


/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type SubscriptionInstance_ActivateSubscriptionInput = {
  activatedSince: Scalars['DateTime']['input'];
};

/** Module: ServiceGroup */
export type SubscriptionInstance_AddServiceGroupInput = {
  groupId: Scalars['OID']['input'];
  name: Scalars['String']['input'];
  optional: Scalars['Boolean']['input'];
};

/** Module: Service */
export type SubscriptionInstance_AddServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recurringAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  recurringBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars['Currency']['input']>;
  recurringLastPaymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  recurringNextBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  serviceId: Scalars['OID']['input'];
  setupAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  setupBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  setupCurrency?: InputMaybe<Scalars['Currency']['input']>;
  setupPaymentDate?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Module: Metrics */
export type SubscriptionInstance_AddServiceMetricInput = {
  currentUsage: Scalars['Int']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  metricId: Scalars['OID']['input'];
  name: Scalars['String']['input'];
  nextUsageReset?: InputMaybe<Scalars['DateTime']['input']>;
  serviceId: Scalars['OID']['input'];
  unitCostAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  unitCostBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  unitCostCurrency?: InputMaybe<Scalars['Currency']['input']>;
  unitCostLastPaymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  unitCostNextBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  unitName: Scalars['String']['input'];
  usageResetPeriod?: InputMaybe<SubscriptionInstance_ResetPeriod>;
};

export type SubscriptionInstance_AddServiceToGroupInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  groupId: Scalars['OID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  recurringAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  recurringBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars['Currency']['input']>;
  recurringLastPaymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  recurringNextBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  serviceId: Scalars['OID']['input'];
  setupAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  setupBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  setupCurrency?: InputMaybe<Scalars['Currency']['input']>;
  setupPaymentDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum SubscriptionInstance_BillingCycle {
  Annual = 'ANNUAL',
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME',
  Quarterly = 'QUARTERLY',
  SemiAnnual = 'SEMI_ANNUAL'
}

export type SubscriptionInstance_BudgetCategory = {
  __typename?: 'SubscriptionInstance_BudgetCategory';
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export type SubscriptionInstance_CancelSubscriptionInput = {
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
  cancelledSince: Scalars['DateTime']['input'];
};

export enum SubscriptionInstance_CustomerType {
  Individual = 'INDIVIDUAL',
  Team = 'TEAM'
}

export type SubscriptionInstance_DecrementMetricUsageInput = {
  currentTime: Scalars['DateTime']['input'];
  decrementBy: Scalars['Int']['input'];
  metricId: Scalars['OID']['input'];
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_IncrementMetricUsageInput = {
  currentTime: Scalars['DateTime']['input'];
  incrementBy: Scalars['Int']['input'];
  metricId: Scalars['OID']['input'];
  serviceId: Scalars['OID']['input'];
};

/** Module: Subscription */
export type SubscriptionInstance_InitializeSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt: Scalars['DateTime']['input'];
  customerEmail?: InputMaybe<Scalars['EmailAddress']['input']>;
  customerId?: InputMaybe<Scalars['PHID']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  resourceId?: InputMaybe<Scalars['PHID']['input']>;
  resourceLabel?: InputMaybe<Scalars['String']['input']>;
  resourceThumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
  serviceOfferingId?: InputMaybe<Scalars['PHID']['input']>;
  tierName?: InputMaybe<Scalars['String']['input']>;
  tierPricingOptionId?: InputMaybe<Scalars['OID']['input']>;
};

export type SubscriptionInstance_PauseSubscriptionInput = {
  pausedSince: Scalars['DateTime']['input'];
};

export type SubscriptionInstance_RecurringCost = {
  __typename?: 'SubscriptionInstance_RecurringCost';
  amount: Scalars['Amount_Money']['output'];
  billingCycle: SubscriptionInstance_BillingCycle;
  currency: Scalars['Currency']['output'];
  lastPaymentDate?: Maybe<Scalars['DateTime']['output']>;
  nextBillingDate?: Maybe<Scalars['DateTime']['output']>;
};

export type SubscriptionInstance_RemoveBudgetCategoryInput = {
  budgetId: Scalars['OID']['input'];
};

export type SubscriptionInstance_RemoveServiceFromGroupInput = {
  groupId: Scalars['OID']['input'];
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_RemoveServiceGroupInput = {
  groupId: Scalars['OID']['input'];
};

export type SubscriptionInstance_RemoveServiceInput = {
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_RemoveServiceMetricInput = {
  metricId: Scalars['OID']['input'];
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_RenewExpiringSubscriptionInput = {
  newRenewalDate?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp: Scalars['DateTime']['input'];
};

export type SubscriptionInstance_ReportRecurringPaymentInput = {
  paymentDate: Scalars['DateTime']['input'];
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_ReportSetupPaymentInput = {
  paymentDate: Scalars['DateTime']['input'];
  serviceId: Scalars['OID']['input'];
};

export enum SubscriptionInstance_ResetPeriod {
  Annual = 'ANNUAL',
  Daily = 'DAILY',
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  SemiAnnual = 'SEMI_ANNUAL',
  Weekly = 'WEEKLY'
}

export type SubscriptionInstance_ResourceDocument = {
  __typename?: 'SubscriptionInstance_ResourceDocument';
  id: Scalars['PHID']['output'];
  label?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
};

export type SubscriptionInstance_ResumeSubscriptionInput = {
  timestamp: Scalars['DateTime']['input'];
};

export type SubscriptionInstance_Service = {
  __typename?: 'SubscriptionInstance_Service';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  metrics: Array<SubscriptionInstance_ServiceMetric>;
  name?: Maybe<Scalars['String']['output']>;
  recurringCost?: Maybe<SubscriptionInstance_RecurringCost>;
  setupCost?: Maybe<SubscriptionInstance_SetupCost>;
};

export type SubscriptionInstance_ServiceGroup = {
  __typename?: 'SubscriptionInstance_ServiceGroup';
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
  optional: Scalars['Boolean']['output'];
  services: Array<SubscriptionInstance_Service>;
};

export type SubscriptionInstance_ServiceMetric = {
  __typename?: 'SubscriptionInstance_ServiceMetric';
  currentUsage: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  limit?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  nextUsageReset?: Maybe<Scalars['DateTime']['output']>;
  unitCost?: Maybe<SubscriptionInstance_RecurringCost>;
  unitName: Scalars['String']['output'];
  usageResetPeriod?: Maybe<SubscriptionInstance_ResetPeriod>;
};

export type SubscriptionInstance_SetAutoRenewInput = {
  autoRenew: Scalars['Boolean']['input'];
};

export type SubscriptionInstance_SetBudgetCategoryInput = {
  budgetId: Scalars['OID']['input'];
  budgetLabel: Scalars['String']['input'];
};

/** Module: Customer */
export type SubscriptionInstance_SetCustomerTypeInput = {
  customerType: SubscriptionInstance_CustomerType;
  teamMemberCount?: InputMaybe<Scalars['Int']['input']>;
};

export type SubscriptionInstance_SetExpiringInput = {
  expiringSince: Scalars['DateTime']['input'];
};

export type SubscriptionInstance_SetOperatorNotesInput = {
  operatorNotes?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionInstance_SetRenewalDateInput = {
  renewalDate: Scalars['DateTime']['input'];
};

export type SubscriptionInstance_SetResourceDocumentInput = {
  resourceId: Scalars['PHID']['input'];
  resourceLabel?: InputMaybe<Scalars['String']['input']>;
  resourceThumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type SubscriptionInstance_SetupCost = {
  __typename?: 'SubscriptionInstance_SetupCost';
  amount: Scalars['Amount_Money']['output'];
  billingDate?: Maybe<Scalars['DateTime']['output']>;
  currency: Scalars['Currency']['output'];
  paymentDate?: Maybe<Scalars['DateTime']['output']>;
};

export type SubscriptionInstance_SubscriptionInstanceState = {
  __typename?: 'SubscriptionInstance_SubscriptionInstanceState';
  activatedSince?: Maybe<Scalars['DateTime']['output']>;
  autoRenew: Scalars['Boolean']['output'];
  budget?: Maybe<SubscriptionInstance_BudgetCategory>;
  cancellationReason?: Maybe<Scalars['String']['output']>;
  cancelledSince?: Maybe<Scalars['DateTime']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerEmail?: Maybe<Scalars['EmailAddress']['output']>;
  customerId?: Maybe<Scalars['PHID']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  customerType?: Maybe<SubscriptionInstance_CustomerType>;
  expiringSince?: Maybe<Scalars['DateTime']['output']>;
  nextBillingDate?: Maybe<Scalars['DateTime']['output']>;
  operatorId?: Maybe<Scalars['PHID']['output']>;
  operatorNotes?: Maybe<Scalars['String']['output']>;
  pausedSince?: Maybe<Scalars['DateTime']['output']>;
  projectedBillAmount?: Maybe<Scalars['Amount_Money']['output']>;
  projectedBillCurrency?: Maybe<Scalars['Currency']['output']>;
  renewalDate?: Maybe<Scalars['DateTime']['output']>;
  resource?: Maybe<SubscriptionInstance_ResourceDocument>;
  serviceGroups: Array<SubscriptionInstance_ServiceGroup>;
  serviceOfferingId?: Maybe<Scalars['PHID']['output']>;
  services: Array<SubscriptionInstance_Service>;
  status: SubscriptionInstance_SubscriptionStatus;
  teamMemberCount?: Maybe<Scalars['Int']['output']>;
  tierName?: Maybe<Scalars['String']['output']>;
  tierPricingOptionId?: Maybe<Scalars['OID']['output']>;
};

export enum SubscriptionInstance_SubscriptionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Expiring = 'EXPIRING',
  Paused = 'PAUSED',
  Pending = 'PENDING'
}

export type SubscriptionInstance_UpdateBillingProjectionInput = {
  nextBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectedBillAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  projectedBillCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export type SubscriptionInstance_UpdateCustomerInfoInput = {
  customerEmail?: InputMaybe<Scalars['EmailAddress']['input']>;
  customerId?: InputMaybe<Scalars['PHID']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionInstance_UpdateMetricInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  metricId: Scalars['OID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  nextUsageReset?: InputMaybe<Scalars['DateTime']['input']>;
  serviceId: Scalars['OID']['input'];
  unitName?: InputMaybe<Scalars['String']['input']>;
  usageResetPeriod?: InputMaybe<SubscriptionInstance_ResetPeriod>;
};

export type SubscriptionInstance_UpdateMetricUsageInput = {
  currentTime: Scalars['DateTime']['input'];
  currentUsage: Scalars['Int']['input'];
  metricId: Scalars['OID']['input'];
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_UpdateServiceInfoInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_UpdateServiceRecurringCostInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  billingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  lastPaymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  nextBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_UpdateServiceSetupCostInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  billingDate?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_UpdateSubscriptionStatusInput = {
  status: SubscriptionInstance_SubscriptionStatus;
};

export type SubscriptionInstance_UpdateTeamMemberCountInput = {
  teamMemberCount: Scalars['Int']['input'];
};

export type SubscriptionInstance_UpdateTierInfoInput = {
  tierName?: InputMaybe<Scalars['String']['input']>;
  tierPricingOptionId?: InputMaybe<Scalars['OID']['input']>;
};

export type Token = {
  __typename?: 'Token';
  contractAddress: Scalars['EthereumAddress']['output'];
  symbol: Scalars['String']['output'];
};

export type TxAmount = {
  __typename?: 'TxAmount';
  unit: Scalars['String']['output'];
  value: Scalars['Amount_Currency']['output'];
};

/** Output type for PDF chunk upload */
export type UploadInvoicePdfChunkOutput = {
  __typename?: 'UploadInvoicePdfChunkOutput';
  data?: Maybe<Scalars['JSONObject']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Value = {
  __typename?: 'Value';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type Workstream = IDocument & {
  __typename?: 'Workstream';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: Workstream_WorkstreamState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: Workstream_WorkstreamState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type WorkstreamOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Filter to fetch a single workstream */
export type WorkstreamFilter = {
  networkId?: InputMaybe<Scalars['PHID']['input']>;
  networkName?: InputMaybe<Scalars['String']['input']>;
  networkSlug?: InputMaybe<Scalars['String']['input']>;
  workstreamId?: InputMaybe<Scalars['PHID']['input']>;
  workstreamSlug?: InputMaybe<Scalars['String']['input']>;
  workstreamStatus?: InputMaybe<WorkstreamStatus>;
  workstreamStatuses?: InputMaybe<Array<WorkstreamStatus>>;
};

/** Queries: Workstream Document */
export type WorkstreamQueries = {
  __typename?: 'WorkstreamQueries';
  getDocument?: Maybe<Workstream>;
  getDocuments?: Maybe<Array<Workstream>>;
};


/** Queries: Workstream Document */
export type WorkstreamQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: Workstream Document */
export type WorkstreamQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type WorkstreamRfp = {
  __typename?: 'WorkstreamRfp';
  code?: Maybe<Scalars['String']['output']>;
  rfp?: Maybe<Rfp>;
  status?: Maybe<WorkstreamStatus>;
  title?: Maybe<Scalars['String']['output']>;
};

export enum WorkstreamStatus {
  Awarded = 'AWARDED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  NotAwarded = 'NOT_AWARDED',
  OpenForProposals = 'OPEN_FOR_PROPOSALS',
  PreworkRfc = 'PREWORK_RFC',
  ProposalSubmitted = 'PROPOSAL_SUBMITTED',
  RfpCancelled = 'RFP_CANCELLED',
  RfpDraft = 'RFP_DRAFT'
}

export type Workstream_AddAlternativeProposalInput = {
  id: Scalars['ID']['input'];
  paymentTermsId?: InputMaybe<Scalars['PHID']['input']>;
  proposalAuthor?: InputMaybe<Workstream_ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_ProposalStatusInput>;
};

export type Workstream_AddPaymentRequestInput = {
  id: Scalars['PHID']['input'];
};

export type Workstream_ClientInfo = {
  __typename?: 'Workstream_ClientInfo';
  icon?: Maybe<Scalars['URL']['output']>;
  id: Scalars['PHID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Workstream_EditAlternativeProposalInput = {
  id: Scalars['ID']['input'];
  paymentTermsId?: InputMaybe<Scalars['PHID']['input']>;
  proposalAuthor?: InputMaybe<Workstream_ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_ProposalStatusInput>;
};

export type Workstream_EditClientInfoInput = {
  clientId: Scalars['PHID']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Module: Proposals */
export type Workstream_EditInitialProposalInput = {
  id: Scalars['ID']['input'];
  paymentTermsId?: InputMaybe<Scalars['PHID']['input']>;
  proposalAuthor?: InputMaybe<Workstream_ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_ProposalStatusInput>;
};

/** Module: Workstream */
export type Workstream_EditWorkstreamInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['PHID']['input']>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_WorkstreamStatusInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Workstream_Proposal = {
  __typename?: 'Workstream_Proposal';
  author: Workstream_ProposalAuthor;
  id: Scalars['ID']['output'];
  paymentTerms: Scalars['PHID']['output'];
  sow: Scalars['PHID']['output'];
  status: Workstream_ProposalStatus;
};

export type Workstream_ProposalAuthor = {
  __typename?: 'Workstream_ProposalAuthor';
  icon?: Maybe<Scalars['URL']['output']>;
  id: Scalars['PHID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type Workstream_ProposalAuthorInput = {
  icon?: InputMaybe<Scalars['URL']['input']>;
  id: Scalars['PHID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum Workstream_ProposalStatus {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export enum Workstream_ProposalStatusInput {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export type Workstream_Rfp = {
  __typename?: 'Workstream_RFP';
  id: Scalars['PHID']['output'];
  title: Scalars['String']['output'];
};

export type Workstream_RemoveAlternativeProposalInput = {
  id: Scalars['ID']['input'];
};

export type Workstream_RemovePaymentRequestInput = {
  id: Scalars['PHID']['input'];
};

export type Workstream_SetRequestForProposalInput = {
  rfpId: Scalars['PHID']['input'];
  title: Scalars['String']['input'];
};

export type Workstream_WorkstreamState = {
  __typename?: 'Workstream_WorkstreamState';
  alternativeProposals: Array<Workstream_Proposal>;
  client?: Maybe<Workstream_ClientInfo>;
  code?: Maybe<Scalars['String']['output']>;
  initialProposal?: Maybe<Workstream_Proposal>;
  paymentRequests: Array<Scalars['PHID']['output']>;
  paymentTerms?: Maybe<Scalars['PHID']['output']>;
  rfp?: Maybe<Workstream_Rfp>;
  sow?: Maybe<Scalars['PHID']['output']>;
  status: Workstream_WorkstreamStatus;
  title?: Maybe<Scalars['String']['output']>;
};

export enum Workstream_WorkstreamStatus {
  Awarded = 'AWARDED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  NotAwarded = 'NOT_AWARDED',
  OpenForProposals = 'OPEN_FOR_PROPOSALS',
  PreworkRfc = 'PREWORK_RFC',
  ProposalSubmitted = 'PROPOSAL_SUBMITTED',
  RfpCancelled = 'RFP_CANCELLED',
  RfpDraft = 'RFP_DRAFT'
}

export enum Workstream_WorkstreamStatusInput {
  Awarded = 'AWARDED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  NotAwarded = 'NOT_AWARDED',
  OpenForProposals = 'OPEN_FOR_PROPOSALS',
  PreworkRfc = 'PREWORK_RFC',
  ProposalSubmitted = 'PROPOSAL_SUBMITTED',
  RfpCancelled = 'RFP_CANCELLED',
  RfpDraft = 'RFP_DRAFT'
}

export type WorkstreamsFilter = {
  networkId?: InputMaybe<Scalars['PHID']['input']>;
  networkName?: InputMaybe<Scalars['String']['input']>;
  networkNames?: InputMaybe<Array<Scalars['String']['input']>>;
  networkSlug?: InputMaybe<Scalars['String']['input']>;
  workstreamStatus?: InputMaybe<WorkstreamStatus>;
  workstreamStatuses?: InputMaybe<Array<WorkstreamStatus>>;
  workstreamTitle?: InputMaybe<Scalars['String']['input']>;
};

export type BudgetStatementsFilter = {
  networkSlug?: InputMaybe<Scalars['String']['input']>;
  teamId?: InputMaybe<Scalars['PHID']['input']>;
};

export type BuildersFilter = {
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  isOperator?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  networkSlug?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<BuilderScope>>;
  skills?: InputMaybe<Array<BuilderSkill>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BuilderStatus>;
};

export type NetworkFilter = {
  networkSlug?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWorkByNetworkOrStatusFilter = {
  networkId?: InputMaybe<Scalars['PHID']['input']>;
  networkName?: InputMaybe<Scalars['String']['input']>;
  networkSlug?: InputMaybe<Scalars['String']['input']>;
  proposalRole?: InputMaybe<ProposalRole>;
  workstreamId?: InputMaybe<Scalars['PHID']['input']>;
  workstreamSlug?: InputMaybe<Scalars['String']['input']>;
  workstreamStatus?: InputMaybe<WorkstreamStatus>;
};

export type BuilderProfileQueryVariables = Exact<{
  filter?: InputMaybe<BuildersFilter>;
}>;


export type BuilderProfileQuery = { __typename?: 'Query', builders: Array<{ __typename?: 'BuilderProfileState', code?: string | null, description?: string | null, about?: string | null, id?: any | null, icon?: any | null, lastModified?: any | null, name?: string | null, scopes: Array<BuilderScope>, skills: Array<BuilderSkill>, slug?: string | null, status?: BuilderStatus | null, isOperator: boolean, links: Array<{ __typename?: 'BuilderLink', id: any, label?: string | null, url: any }>, operationalHubMember: { __typename?: 'OpHubMember', name?: string | null, phid?: any | null }, projects: Array<{ __typename?: 'BuilderProject', budget?: number | null, title: string, code: string, slug: string, currency?: Sow_PmCurrency | null, abstract?: string | null, id: any, scope?: { __typename?: 'Builder_SOW_DeliverablesSet', status: Sow_DeliverableSetStatus, progress: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', completed: number, total: number }, deliverablesCompleted: { __typename?: 'SOW_DeliverablesCompleted', completed: number, total: number } } | null }> }> };

export type BuildersListQueryVariables = Exact<{
  filter?: InputMaybe<BuildersFilter>;
}>;


export type BuildersListQuery = { __typename?: 'Query', builders: Array<{ __typename?: 'BuilderProfileState', code?: string | null, description?: string | null, id?: any | null, icon?: any | null, lastModified?: any | null, name?: string | null, scopes: Array<BuilderScope>, skills: Array<BuilderSkill>, slug?: string | null, status?: BuilderStatus | null, isOperator: boolean, links: Array<{ __typename?: 'BuilderLink', id: any, label?: string | null, url: any }>, operationalHubMember: { __typename?: 'OpHubMember', name?: string | null, phid?: any | null } }> };

export type AccountSnapshotsQueryVariables = Exact<{
  filter?: InputMaybe<BudgetStatementsFilter>;
}>;


export type AccountSnapshotsQuery = { __typename?: 'Query', budgetStatements: Array<{ __typename?: 'BudgetStatement', id: any, month: string, snapshotReport: { __typename?: 'BudgetStatementSnapshotReport', startDate: any, endDate: any, accounts: Array<{ __typename?: 'SnapshotAccount', id: string, name: string, type: SnapAccountType, address: string, transactions: Array<{ __typename?: 'SnapshotAccountTransaction', id: string, counterParty: any, counterPartyName: string, datetime: any, direction: AccountTransactionDirection, flowType: AccountTransactionFlowType, txHash: string, amount: { __typename?: 'TxAmount', unit: string, value: any } }>, balances: Array<{ __typename?: 'SnapshotAccountBalance', endingBalance: any, startingBalance: any, token: { __typename?: 'Token', symbol: string, contractAddress: any } }> }> } }> };

export type BudgetStatementsDetailsQueryVariables = Exact<{
  filter?: InputMaybe<BudgetStatementsFilter>;
}>;


export type BudgetStatementsDetailsQuery = { __typename?: 'Query', budgetStatements: Array<{ __typename?: 'BudgetStatement', id: any, month: string, expenseReport: { __typename?: 'BudgetStatementExpenseReport', periodStart: any, periodEnd: any, wallets: Array<{ __typename?: 'ExpenseReportWallet', name?: string | null, address?: any | null, billingStatementIds: Array<any>, totals: Array<{ __typename?: 'ExpenseReportGroupTotals', group: string, groupLabel: string, totalBudget: any, totalForecast: any, totalActuals: any, totalPayments: any }>, lineItems: Array<{ __typename?: 'ExpenseReportLineItem', id: string, label: string, groupId: string, groupLabel: string, actuals: any, budget: any, comments?: string | null, forecast: any, payments: any }> }>, groups: Array<{ __typename?: 'ExpenseReportGroup', id: string, label: string, parentId: string }> } }> };

export type BudgetStatementsAvailableMonthsQueryVariables = Exact<{
  filter?: InputMaybe<BudgetStatementsFilter>;
}>;


export type BudgetStatementsAvailableMonthsQuery = { __typename?: 'Query', budgetStatements: Array<{ __typename?: 'BudgetStatement', id: any, month: string, lastModifiedAtUtcIso: any, status: string }> };

export type BudgetStatementsQueryVariables = Exact<{
  filter?: InputMaybe<BudgetStatementsFilter>;
}>;


export type BudgetStatementsQuery = { __typename?: 'Query', budgetStatements: Array<{ __typename?: 'BudgetStatement', id: any, month: string, lastModifiedAtUtcIso: any, status: string, owner: { __typename?: 'BudgetStatementOwner', name: string, code: string, id: any, logo: any }, expenseReport: { __typename?: 'BudgetStatementExpenseReport', periodStart: any, periodEnd: any, wallets: Array<{ __typename?: 'ExpenseReportWallet', name?: string | null, address?: any | null, totals: Array<{ __typename?: 'ExpenseReportGroupTotals', groupLabel: string, totalActuals: any, totalForecast: any, totalPayments: any }> }> } }> };

export type AllNetworksQueryVariables = Exact<{
  filter?: InputMaybe<NetworkFilter>;
}>;


export type AllNetworksQuery = { __typename?: 'Query', allNetworks: Array<{ __typename?: 'AllNetworks', network?: { __typename?: 'Network', name?: string | null, slug?: string | null, icon?: string | null, logo?: string | null, darkThemeIcon?: string | null, darkThemeLogo?: string | null, category?: Array<NetworkCategory> | null, description?: string | null, discord?: string | null, github?: string | null, logoBig?: string | null, website?: string | null, x?: string | null, youtube?: string | null } | null }> };

export type ProjectsQueryVariables = Exact<{
  filter?: InputMaybe<WorkstreamsFilter>;
}>;


export type ProjectsQuery = { __typename?: 'Query', workstreams: Array<{ __typename?: 'FullQueryWorkstream', slug?: string | null, initialProposal?: { __typename?: 'FullProposal', status: ProposalStatus, author: { __typename?: 'ProposalAuthor', id: any, name?: string | null }, sow?: { __typename?: 'SOW_ScopeOfWorkState', description: string, title: string, status: Sow_ScopeOfWorkStatus, projects: Array<{ __typename?: 'SOW_Project', abstract?: string | null, slug: string, code: string, currency?: Sow_PmCurrency | null, id: any, imageUrl?: any | null, title: string, budget?: number | null, projectOwner?: { __typename?: 'Builder', id?: any | null, code?: string | null, name: string } | null, expenditure?: { __typename?: 'SOW_BudgetExpenditure', cap: number } | null, scope?: { __typename?: 'SOW_DeliverablesSet', status: Sow_DeliverableSetStatus, deliverables: Array<any>, progress: { __typename?: 'SOW_Binary' } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint' } } | null }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string, status: Sow_DeliverableStatus, keyResults: Array<{ __typename?: 'SOW_KeyResult', id: any, link: string, title: string }>, workProgress?: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', total: number, completed: number } | null, budgetAnchor?: { __typename?: 'SOW_BudgetAnchorProject', unitCost: number, unit?: Sow_Unit | null, quantity: number } | null }> } | null } | null }> };

export type WorkstreamProjectQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type WorkstreamProjectQuery = { __typename?: 'Query', workstream: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, status?: WorkstreamStatus | null, slug?: string | null, initialProposal?: { __typename?: 'FullProposal', status: ProposalStatus, author: { __typename?: 'ProposalAuthor', id: any, name?: string | null }, sow?: { __typename?: 'SOW_ScopeOfWorkState', description: string, title: string, status: Sow_ScopeOfWorkStatus, contributors: Array<{ __typename?: 'Builder', id?: any | null, icon: string, slug?: string | null, name: string }>, projects: Array<{ __typename?: 'SOW_Project', abstract?: string | null, slug: string, code: string, currency?: Sow_PmCurrency | null, id: any, imageUrl?: any | null, title: string, budget?: number | null, budgetType?: Sow_BudgetType | null, projectOwner?: { __typename?: 'Builder', id?: any | null, code?: string | null, name: string } | null, expenditure?: { __typename?: 'SOW_BudgetExpenditure', cap: number } | null, scope?: { __typename?: 'SOW_DeliverablesSet', status: Sow_DeliverableSetStatus, deliverables: Array<any>, progress: { __typename?: 'SOW_Binary' } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint' } } | null }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string, status: Sow_DeliverableStatus, keyResults: Array<{ __typename?: 'SOW_KeyResult', id: any, link: string, title: string }>, workProgress?: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', total: number, completed: number } | null, budgetAnchor?: { __typename?: 'SOW_BudgetAnchorProject', unitCost: number, unit?: Sow_Unit | null, quantity: number } | null }> } | null } | null }> };

export type RfpByWorkstreamQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type RfpByWorkstreamQuery = { __typename?: 'Query', rfpByWorkstream: Array<{ __typename?: 'WorkstreamRfp', code?: string | null, title?: string | null, status?: WorkstreamStatus | null, rfp?: { __typename?: 'RFP', briefing?: string | null, budgetCurrency?: string | null, budgetMax?: number | null, budgetMin?: number | null, code?: string | null, eligibilityCriteria?: string | null, evaluationCriteria?: string | null, status?: RfpStatus | null, id: any, summary?: string | null, submissionDeadline?: any | null, title: string } | null }> };

export type RoadmapDetailsQueryVariables = Exact<{
  filter: ScopeOfWorkByNetworkOrStatusFilter;
}>;


export type RoadmapDetailsQuery = { __typename?: 'Query', scopeOfWorkByNetworkOrStatus: Array<{ __typename?: 'SOW_ScopeOfWorkState', title: string, status: Sow_ScopeOfWorkStatus, description: string, roadmaps: Array<{ __typename?: 'SOW_Roadmap', id: any, title: string, slug: string, description: string, milestones: Array<{ __typename?: 'SOW_Milestone', id: any, title: string, description: string, sequenceCode: string, budget?: number | null, deliveryTarget: string, coordinators: Array<string>, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any>, status: Sow_DeliverableSetStatus, deliverablesCompleted: { __typename?: 'SOW_DeliverablesCompleted', completed: number, total: number }, progress: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', total: number, completed: number } } | null }> }>, contributors: Array<{ __typename?: 'Builder', id?: any | null, name: string }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, status: Sow_DeliverableStatus, title: string, code: string, description: string, owner?: { __typename?: 'Builder', id?: any | null, code?: string | null, icon: string } | null, budgetAnchor?: { __typename?: 'SOW_BudgetAnchorProject', margin: number, project?: any | null, quantity: number, unit?: Sow_Unit | null, unitCost: number } | null, keyResults: Array<{ __typename?: 'SOW_KeyResult', id: any, link: string, title: string }>, workProgress?: { __typename: 'SOW_Binary', done?: boolean | null } | { __typename: 'SOW_Percentage', value: number } | { __typename: 'SOW_StoryPoint', total: number, completed: number } | null }>, projects: Array<{ __typename?: 'SOW_Project', abstract?: string | null, budget?: number | null, budgetType?: Sow_BudgetType | null, code: string, currency?: Sow_PmCurrency | null, id: any, imageUrl?: any | null, title: string, expenditure?: { __typename?: 'SOW_BudgetExpenditure', actuals: number, cap: number, percentage: number } | null, projectOwner?: { __typename?: 'Builder', id?: any | null, code?: string | null, name: string } | null, scope?: { __typename?: 'SOW_DeliverablesSet', status: Sow_DeliverableSetStatus, deliverables: Array<any>, deliverablesCompleted: { __typename?: 'SOW_DeliverablesCompleted', completed: number, total: number } } | null }> }> };

export type ScopeOfWorkQueryVariables = Exact<{
  docId: Scalars['PHID']['input'];
}>;


export type ScopeOfWorkQuery = { __typename?: 'Query', ScopeOfWork?: { __typename?: 'ScopeOfWorkQueries', getDocument?: { __typename?: 'ScopeOfWork', id: string, stateJSON?: any | null, state: { __typename?: 'ScopeOfWork_ScopeOfWorkState', description: string, status: ScopeOfWork_ScopeOfWorkStatus, title: string, roadmaps: Array<{ __typename?: 'ScopeOfWork_Roadmap', id: any, slug: string, title: string, description: string, milestones: Array<{ __typename?: 'ScopeOfWork_Milestone', description: string, budget?: number | null, title: string, sequenceCode: string, id: any, coordinators: Array<string>, deliveryTarget: string, scope?: { __typename?: 'ScopeOfWork_DeliverablesSet', deliverables: Array<any>, status: ScopeOfWork_DeliverableSetStatus, deliverablesCompleted: { __typename?: 'ScopeOfWork_DeliverablesCompleted', completed: number, total: number } } | null }> }>, contributors: Array<{ __typename?: 'ScopeOfWork_Agent', id: any, name: string }>, deliverables: Array<{ __typename?: 'ScopeOfWork_Deliverable', code: string, description: string, id: any, owner?: string | null, status: ScopeOfWork_DeliverableStatus, title: string, budgetAnchor?: { __typename?: 'ScopeOfWork_BudgetAnchorProject', margin: number, project?: any | null, quantity: number, unit?: ScopeOfWork_Unit | null, unitCost: number } | null, keyResults: Array<{ __typename?: 'ScopeOfWork_KeyResult', id: any, link: string, title: string }> }>, projects: Array<{ __typename?: 'ScopeOfWork_Project', abstract?: string | null, budget?: number | null, budgetType?: ScopeOfWork_BudgetType | null, code: string, currency?: ScopeOfWork_PmCurrency | null, id: any, imageUrl?: any | null, projectOwner?: string | null, title: string, expenditure?: { __typename?: 'ScopeOfWork_BudgetExpenditure', actuals: number, cap: number, percentage: number } | null, scope?: { __typename?: 'ScopeOfWork_DeliverablesSet', status: ScopeOfWork_DeliverableSetStatus, deliverables: Array<any>, deliverablesCompleted: { __typename?: 'ScopeOfWork_DeliverablesCompleted', completed: number, total: number } } | null }> } } | null } | null };

export type RoadmapListQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type RoadmapListQuery = { __typename?: 'Query', workstream: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, slug?: string | null, network?: { __typename?: 'Network', name?: string | null, logo?: string | null, darkThemeLogo?: string | null, slug?: string | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', roadmaps: Array<{ __typename?: 'SOW_Roadmap', id: any, description: string, slug: string, title: string, milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, coordinators: Array<string>, deliveryTarget: string, description: string, id: any, sequenceCode: string, title: string, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any>, status: Sow_DeliverableSetStatus, deliverablesCompleted: { __typename?: 'SOW_DeliverablesCompleted', completed: number, total: number }, progress: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', completed: number, total: number } } | null }> }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string, status: Sow_DeliverableStatus, keyResults: Array<{ __typename?: 'SOW_KeyResult', id: any, link: string, title: string }> }> } | null }> };

export type ServiceOfferingsQueryVariables = Exact<{
  filter?: InputMaybe<RsServiceOfferingsFilter>;
}>;


export type ServiceOfferingsQuery = { __typename?: 'Query', serviceOfferings: Array<{ __typename?: 'RSServiceOffering', summary: string, operatorId: any, title: string, status: RsServiceStatus, id: any, infoLink?: any | null, description?: string | null, lastModified: any, resourceTemplateId?: any | null, thumbnailUrl?: any | null, facetTargets: Array<{ __typename?: 'RSOfferingFacetTarget', categoryKey: string, categoryLabel: string, selectedOptions: Array<string>, id: any }>, optionGroups: Array<{ __typename?: 'RSOfferingOptionGroup', defaultSelected: boolean, description?: string | null, isAddOn: boolean, name: string, id: any }>, services: Array<{ __typename?: 'RSOfferingService', description?: string | null, displayOrder?: number | null, id: any, isSetupFormation: boolean, optionGroupId?: any | null, title: string, facetBindings: Array<{ __typename?: 'RSResourceFacetBinding', facetName: string, facetType: any, id: any, supportedOptions: Array<any> }> }>, tiers: Array<{ __typename?: 'RSServiceSubscriptionTier', description?: string | null, id: any, isCustomPricing: boolean, name: string, pricing: { __typename?: 'RSServicePricing', amount?: any | null, currency: any }, pricingOptions: Array<{ __typename?: 'RSTierPricingOption', amount: any, currency: any, id: any, isDefault: boolean }>, serviceLevels: Array<{ __typename?: 'RSServiceLevelBinding', customValue?: string | null, id: any, level: RsServiceLevel, optionGroupId?: any | null, serviceId: any }>, usageLimits: Array<{ __typename?: 'RSServiceUsageLimit', id: any, metric: string, notes?: string | null, serviceId: any, unitName?: string | null, unitPrice?: any | null, unitPriceCurrency?: any | null }> }>, targetAudiences: Array<{ __typename?: 'RSOfferingTargetAudience', label: string, color?: string | null, id: any }> }> };

export type ResourceTemplatesQueryVariables = Exact<{ [key: string]: never; }>;


export type ResourceTemplatesQuery = { __typename?: 'Query', resourceTemplates: Array<{ __typename?: 'RSResourceTemplate', description?: string | null, infoLink?: any | null, lastModified: any, title: string, thumbnailUrl?: any | null, operatorId: any, recurringServices: Array<string>, status: RsTemplateStatus, summary: string, setupServices: Array<string>, id: any, contentSections: Array<{ __typename?: 'RSContentSection', id: any, title: string, content: string, displayOrder: number }>, facetTargets: Array<{ __typename?: 'RSFacetTarget', id: any, categoryKey: string, categoryLabel: string, selectedOptions: Array<string> }>, faqFields?: Array<{ __typename?: 'RSFaqField', id: any, question?: string | null, answer?: string | null, displayOrder: number }> | null, targetAudiences: Array<{ __typename?: 'RSTargetAudience', id: any, label: string, color?: string | null }> }> };

export type WorkstreamDetailsQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type WorkstreamDetailsQuery = { __typename?: 'Query', workstream: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, status?: WorkstreamStatus | null, slug?: string | null, client?: { __typename?: 'ClientInfo', name?: string | null, icon?: any | null } | null, network?: { __typename?: 'Network', name?: string | null, slug?: string | null, logo?: string | null, darkThemeLogo?: string | null } | null, initialProposal?: { __typename?: 'FullProposal', status: ProposalStatus, author: { __typename?: 'ProposalAuthor', name?: string | null }, paymentTerms?: { __typename?: 'PT_PaymentTermsState', proposer: string, currency: Pt_PaymentCurrency, totalAmount?: any | null, paymentModel: Pt_PaymentModel } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', description: string, title: string, status: Sow_ScopeOfWorkStatus, projects: Array<{ __typename?: 'SOW_Project', id: any, slug: string, code: string, abstract?: string | null, title: string, imageUrl?: any | null, budget?: number | null, currency?: Sow_PmCurrency | null, projectOwner?: { __typename?: 'Builder', id?: any | null, code?: string | null, name: string } | null, expenditure?: { __typename?: 'SOW_BudgetExpenditure', cap: number } | null, scope?: { __typename?: 'SOW_DeliverablesSet', status: Sow_DeliverableSetStatus, deliverables: Array<any>, progress: { __typename?: 'SOW_Binary' } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint' } } | null }>, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any> } | null }> }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string, status: Sow_DeliverableStatus, keyResults: Array<{ __typename?: 'SOW_KeyResult', title: string, id: any, link: string }>, workProgress?: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', total: number, completed: number } | null, budgetAnchor?: { __typename?: 'SOW_BudgetAnchorProject', unitCost: number, unit?: Sow_Unit | null, quantity: number } | null }> } | null } | null, rfp?: { __typename?: 'RFP', title: string, summary?: string | null, budgetMax?: number | null, budgetMin?: number | null, budgetCurrency?: string | null, briefing?: string | null, submissionDeadline?: any | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', projects: Array<{ __typename?: 'SOW_Project', title: string }>, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', id: any }> }> } | null, alternativeProposals: Array<{ __typename?: 'FullProposal', id: any }> }> };

export type WorkstreamsQueryVariables = Exact<{
  filter?: InputMaybe<WorkstreamsFilter>;
}>;


export type WorkstreamsQuery = { __typename?: 'Query', workstreams: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, status?: WorkstreamStatus | null, slug?: string | null, client?: { __typename?: 'ClientInfo', name?: string | null, icon?: any | null } | null, initialProposal?: { __typename?: 'FullProposal', status: ProposalStatus, author: { __typename?: 'ProposalAuthor', name?: string | null }, paymentTerms?: { __typename?: 'PT_PaymentTermsState', proposer: string, currency: Pt_PaymentCurrency, totalAmount?: any | null, paymentModel: Pt_PaymentModel } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', description: string, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any> } | null }> }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string }> } | null } | null, rfp?: { __typename?: 'RFP', title: string, summary?: string | null, budgetMax?: number | null, budgetMin?: number | null, budgetCurrency?: string | null, briefing?: string | null, submissionDeadline?: any | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', projects: Array<{ __typename?: 'SOW_Project', title: string }>, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', id: any }> }> } | null, alternativeProposals: Array<{ __typename?: 'FullProposal', id: any }>, network?: { __typename?: 'Network', name?: string | null, logo?: string | null, darkThemeLogo?: string | null, slug?: string | null } | null }> };



export const BuilderProfileDocument = `
    query BuilderProfile($filter: buildersFilter) {
  builders(filter: $filter) {
    code
    description
    about
    id
    icon
    lastModified
    links {
      id
      label
      url
    }
    name
    scopes
    skills
    slug
    status
    isOperator
    operationalHubMember {
      name
      phid
    }
    projects {
      scope {
        status
        progress {
          ... on SOW_StoryPoint {
            completed
            total
          }
          ... on SOW_Percentage {
            value
          }
          ... on SOW_Binary {
            done
          }
        }
        deliverablesCompleted {
          completed
          total
        }
      }
      budget
      title
      code
      slug
      currency
      abstract
      id
    }
  }
}
    `;

export const useBuilderProfileQuery = <
      TData = BuilderProfileQuery,
      TError = unknown
    >(
      variables?: BuilderProfileQueryVariables,
      options?: Omit<UseQueryOptions<BuilderProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BuilderProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BuilderProfileQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BuilderProfile'] : ['BuilderProfile', variables],
    queryFn: switchboardFetcher<BuilderProfileQuery, BuilderProfileQueryVariables>(BuilderProfileDocument, variables),
    ...options
  }
    )};

useBuilderProfileQuery.getKey = (variables?: BuilderProfileQueryVariables) => variables === undefined ? ['BuilderProfile'] : ['BuilderProfile', variables];

export const useSuspenseBuilderProfileQuery = <
      TData = BuilderProfileQuery,
      TError = unknown
    >(
      variables?: BuilderProfileQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<BuilderProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<BuilderProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<BuilderProfileQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BuilderProfileSuspense'] : ['BuilderProfileSuspense', variables],
    queryFn: switchboardFetcher<BuilderProfileQuery, BuilderProfileQueryVariables>(BuilderProfileDocument, variables),
    ...options
  }
    )};

useSuspenseBuilderProfileQuery.getKey = (variables?: BuilderProfileQueryVariables) => variables === undefined ? ['BuilderProfileSuspense'] : ['BuilderProfileSuspense', variables];


useBuilderProfileQuery.fetcher = (variables?: BuilderProfileQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<BuilderProfileQuery, BuilderProfileQueryVariables>(BuilderProfileDocument, variables, options);

export const BuildersListDocument = `
    query BuildersList($filter: buildersFilter) {
  builders(filter: $filter) {
    code
    description
    id
    icon
    lastModified
    links {
      id
      label
      url
    }
    name
    scopes
    skills
    slug
    status
    isOperator
    operationalHubMember {
      name
      phid
    }
  }
}
    `;

export const useBuildersListQuery = <
      TData = BuildersListQuery,
      TError = unknown
    >(
      variables?: BuildersListQueryVariables,
      options?: Omit<UseQueryOptions<BuildersListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BuildersListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BuildersListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BuildersList'] : ['BuildersList', variables],
    queryFn: switchboardFetcher<BuildersListQuery, BuildersListQueryVariables>(BuildersListDocument, variables),
    ...options
  }
    )};

useBuildersListQuery.getKey = (variables?: BuildersListQueryVariables) => variables === undefined ? ['BuildersList'] : ['BuildersList', variables];

export const useSuspenseBuildersListQuery = <
      TData = BuildersListQuery,
      TError = unknown
    >(
      variables?: BuildersListQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<BuildersListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<BuildersListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<BuildersListQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BuildersListSuspense'] : ['BuildersListSuspense', variables],
    queryFn: switchboardFetcher<BuildersListQuery, BuildersListQueryVariables>(BuildersListDocument, variables),
    ...options
  }
    )};

useSuspenseBuildersListQuery.getKey = (variables?: BuildersListQueryVariables) => variables === undefined ? ['BuildersListSuspense'] : ['BuildersListSuspense', variables];


useBuildersListQuery.fetcher = (variables?: BuildersListQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<BuildersListQuery, BuildersListQueryVariables>(BuildersListDocument, variables, options);

export const AccountSnapshotsDocument = `
    query AccountSnapshots($filter: budgetStatementsFilter) {
  budgetStatements(filter: $filter) {
    id
    month
    snapshotReport {
      startDate
      endDate
      accounts {
        id
        name
        type
        address
        transactions {
          id
          amount {
            unit
            value
          }
          counterParty
          counterPartyName
          datetime
          direction
          flowType
          txHash
        }
        balances {
          endingBalance
          startingBalance
          token {
            symbol
            contractAddress
          }
        }
      }
    }
  }
}
    `;

export const useAccountSnapshotsQuery = <
      TData = AccountSnapshotsQuery,
      TError = unknown
    >(
      variables?: AccountSnapshotsQueryVariables,
      options?: Omit<UseQueryOptions<AccountSnapshotsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AccountSnapshotsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AccountSnapshotsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AccountSnapshots'] : ['AccountSnapshots', variables],
    queryFn: switchboardFetcher<AccountSnapshotsQuery, AccountSnapshotsQueryVariables>(AccountSnapshotsDocument, variables),
    ...options
  }
    )};

useAccountSnapshotsQuery.getKey = (variables?: AccountSnapshotsQueryVariables) => variables === undefined ? ['AccountSnapshots'] : ['AccountSnapshots', variables];

export const useSuspenseAccountSnapshotsQuery = <
      TData = AccountSnapshotsQuery,
      TError = unknown
    >(
      variables?: AccountSnapshotsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<AccountSnapshotsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<AccountSnapshotsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<AccountSnapshotsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AccountSnapshotsSuspense'] : ['AccountSnapshotsSuspense', variables],
    queryFn: switchboardFetcher<AccountSnapshotsQuery, AccountSnapshotsQueryVariables>(AccountSnapshotsDocument, variables),
    ...options
  }
    )};

useSuspenseAccountSnapshotsQuery.getKey = (variables?: AccountSnapshotsQueryVariables) => variables === undefined ? ['AccountSnapshotsSuspense'] : ['AccountSnapshotsSuspense', variables];


useAccountSnapshotsQuery.fetcher = (variables?: AccountSnapshotsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<AccountSnapshotsQuery, AccountSnapshotsQueryVariables>(AccountSnapshotsDocument, variables, options);

export const BudgetStatementsDetailsDocument = `
    query BudgetStatementsDetails($filter: budgetStatementsFilter) {
  budgetStatements(filter: $filter) {
    id
    month
    expenseReport {
      periodStart
      periodEnd
      wallets {
        name
        address
        billingStatementIds
        totals {
          group
          groupLabel
          totalBudget
          totalForecast
          totalActuals
          totalPayments
        }
        lineItems {
          id
          label
          groupId
          groupLabel
          actuals
          budget
          comments
          forecast
          payments
        }
      }
      groups {
        id
        label
        parentId
      }
    }
  }
}
    `;

export const useBudgetStatementsDetailsQuery = <
      TData = BudgetStatementsDetailsQuery,
      TError = unknown
    >(
      variables?: BudgetStatementsDetailsQueryVariables,
      options?: Omit<UseQueryOptions<BudgetStatementsDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BudgetStatementsDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BudgetStatementsDetailsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BudgetStatementsDetails'] : ['BudgetStatementsDetails', variables],
    queryFn: switchboardFetcher<BudgetStatementsDetailsQuery, BudgetStatementsDetailsQueryVariables>(BudgetStatementsDetailsDocument, variables),
    ...options
  }
    )};

useBudgetStatementsDetailsQuery.getKey = (variables?: BudgetStatementsDetailsQueryVariables) => variables === undefined ? ['BudgetStatementsDetails'] : ['BudgetStatementsDetails', variables];

export const useSuspenseBudgetStatementsDetailsQuery = <
      TData = BudgetStatementsDetailsQuery,
      TError = unknown
    >(
      variables?: BudgetStatementsDetailsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<BudgetStatementsDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<BudgetStatementsDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<BudgetStatementsDetailsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BudgetStatementsDetailsSuspense'] : ['BudgetStatementsDetailsSuspense', variables],
    queryFn: switchboardFetcher<BudgetStatementsDetailsQuery, BudgetStatementsDetailsQueryVariables>(BudgetStatementsDetailsDocument, variables),
    ...options
  }
    )};

useSuspenseBudgetStatementsDetailsQuery.getKey = (variables?: BudgetStatementsDetailsQueryVariables) => variables === undefined ? ['BudgetStatementsDetailsSuspense'] : ['BudgetStatementsDetailsSuspense', variables];


useBudgetStatementsDetailsQuery.fetcher = (variables?: BudgetStatementsDetailsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<BudgetStatementsDetailsQuery, BudgetStatementsDetailsQueryVariables>(BudgetStatementsDetailsDocument, variables, options);

export const BudgetStatementsAvailableMonthsDocument = `
    query BudgetStatementsAvailableMonths($filter: budgetStatementsFilter) {
  budgetStatements(filter: $filter) {
    id
    month
    lastModifiedAtUtcIso
    status
  }
}
    `;

export const useBudgetStatementsAvailableMonthsQuery = <
      TData = BudgetStatementsAvailableMonthsQuery,
      TError = unknown
    >(
      variables?: BudgetStatementsAvailableMonthsQueryVariables,
      options?: Omit<UseQueryOptions<BudgetStatementsAvailableMonthsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BudgetStatementsAvailableMonthsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BudgetStatementsAvailableMonthsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BudgetStatementsAvailableMonths'] : ['BudgetStatementsAvailableMonths', variables],
    queryFn: switchboardFetcher<BudgetStatementsAvailableMonthsQuery, BudgetStatementsAvailableMonthsQueryVariables>(BudgetStatementsAvailableMonthsDocument, variables),
    ...options
  }
    )};

useBudgetStatementsAvailableMonthsQuery.getKey = (variables?: BudgetStatementsAvailableMonthsQueryVariables) => variables === undefined ? ['BudgetStatementsAvailableMonths'] : ['BudgetStatementsAvailableMonths', variables];

export const useSuspenseBudgetStatementsAvailableMonthsQuery = <
      TData = BudgetStatementsAvailableMonthsQuery,
      TError = unknown
    >(
      variables?: BudgetStatementsAvailableMonthsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<BudgetStatementsAvailableMonthsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<BudgetStatementsAvailableMonthsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<BudgetStatementsAvailableMonthsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BudgetStatementsAvailableMonthsSuspense'] : ['BudgetStatementsAvailableMonthsSuspense', variables],
    queryFn: switchboardFetcher<BudgetStatementsAvailableMonthsQuery, BudgetStatementsAvailableMonthsQueryVariables>(BudgetStatementsAvailableMonthsDocument, variables),
    ...options
  }
    )};

useSuspenseBudgetStatementsAvailableMonthsQuery.getKey = (variables?: BudgetStatementsAvailableMonthsQueryVariables) => variables === undefined ? ['BudgetStatementsAvailableMonthsSuspense'] : ['BudgetStatementsAvailableMonthsSuspense', variables];


useBudgetStatementsAvailableMonthsQuery.fetcher = (variables?: BudgetStatementsAvailableMonthsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<BudgetStatementsAvailableMonthsQuery, BudgetStatementsAvailableMonthsQueryVariables>(BudgetStatementsAvailableMonthsDocument, variables, options);

export const BudgetStatementsDocument = `
    query BudgetStatements($filter: budgetStatementsFilter) {
  budgetStatements(filter: $filter) {
    id
    month
    lastModifiedAtUtcIso
    status
    owner {
      name
      code
      id
      logo
    }
    expenseReport {
      periodStart
      periodEnd
      wallets {
        name
        address
        totals {
          groupLabel
          totalActuals
          totalForecast
          totalPayments
        }
      }
    }
  }
}
    `;

export const useBudgetStatementsQuery = <
      TData = BudgetStatementsQuery,
      TError = unknown
    >(
      variables?: BudgetStatementsQueryVariables,
      options?: Omit<UseQueryOptions<BudgetStatementsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<BudgetStatementsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<BudgetStatementsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BudgetStatements'] : ['BudgetStatements', variables],
    queryFn: switchboardFetcher<BudgetStatementsQuery, BudgetStatementsQueryVariables>(BudgetStatementsDocument, variables),
    ...options
  }
    )};

useBudgetStatementsQuery.getKey = (variables?: BudgetStatementsQueryVariables) => variables === undefined ? ['BudgetStatements'] : ['BudgetStatements', variables];

export const useSuspenseBudgetStatementsQuery = <
      TData = BudgetStatementsQuery,
      TError = unknown
    >(
      variables?: BudgetStatementsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<BudgetStatementsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<BudgetStatementsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<BudgetStatementsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['BudgetStatementsSuspense'] : ['BudgetStatementsSuspense', variables],
    queryFn: switchboardFetcher<BudgetStatementsQuery, BudgetStatementsQueryVariables>(BudgetStatementsDocument, variables),
    ...options
  }
    )};

useSuspenseBudgetStatementsQuery.getKey = (variables?: BudgetStatementsQueryVariables) => variables === undefined ? ['BudgetStatementsSuspense'] : ['BudgetStatementsSuspense', variables];


useBudgetStatementsQuery.fetcher = (variables?: BudgetStatementsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<BudgetStatementsQuery, BudgetStatementsQueryVariables>(BudgetStatementsDocument, variables, options);

export const AllNetworksDocument = `
    query AllNetworks($filter: networkFilter) {
  allNetworks(filter: $filter) {
    network {
      name
      slug
      icon
      logo
      darkThemeIcon
      darkThemeLogo
      category
      description
      discord
      github
      logoBig
      website
      x
      youtube
    }
  }
}
    `;

export const useAllNetworksQuery = <
      TData = AllNetworksQuery,
      TError = unknown
    >(
      variables?: AllNetworksQueryVariables,
      options?: Omit<UseQueryOptions<AllNetworksQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<AllNetworksQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<AllNetworksQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AllNetworks'] : ['AllNetworks', variables],
    queryFn: switchboardFetcher<AllNetworksQuery, AllNetworksQueryVariables>(AllNetworksDocument, variables),
    ...options
  }
    )};

useAllNetworksQuery.getKey = (variables?: AllNetworksQueryVariables) => variables === undefined ? ['AllNetworks'] : ['AllNetworks', variables];

export const useSuspenseAllNetworksQuery = <
      TData = AllNetworksQuery,
      TError = unknown
    >(
      variables?: AllNetworksQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<AllNetworksQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<AllNetworksQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<AllNetworksQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['AllNetworksSuspense'] : ['AllNetworksSuspense', variables],
    queryFn: switchboardFetcher<AllNetworksQuery, AllNetworksQueryVariables>(AllNetworksDocument, variables),
    ...options
  }
    )};

useSuspenseAllNetworksQuery.getKey = (variables?: AllNetworksQueryVariables) => variables === undefined ? ['AllNetworksSuspense'] : ['AllNetworksSuspense', variables];


useAllNetworksQuery.fetcher = (variables?: AllNetworksQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<AllNetworksQuery, AllNetworksQueryVariables>(AllNetworksDocument, variables, options);

export const ProjectsDocument = `
    query Projects($filter: WorkstreamsFilter) {
  workstreams(filter: $filter) {
    slug
    initialProposal {
      status
      author {
        id
        name
      }
      sow {
        description
        title
        status
        projects {
          abstract
          slug
          code
          currency
          id
          imageUrl
          projectOwner {
            id
            code
            name
          }
          title
          budget
          expenditure {
            cap
          }
          scope {
            status
            progress {
              ... on SOW_Percentage {
                value
              }
            }
            deliverables
          }
        }
        deliverables {
          id
          code
          title
          description
          status
          keyResults {
            id
            link
            title
          }
          workProgress {
            ... on SOW_StoryPoint {
              total
              completed
            }
            ... on SOW_Percentage {
              value
            }
            ... on SOW_Binary {
              done
            }
          }
          budgetAnchor {
            unitCost
            unit
            quantity
          }
        }
      }
    }
  }
}
    `;

export const useProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      variables?: ProjectsQueryVariables,
      options?: Omit<UseQueryOptions<ProjectsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ProjectsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ProjectsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Projects'] : ['Projects', variables],
    queryFn: switchboardFetcher<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, variables),
    ...options
  }
    )};

useProjectsQuery.getKey = (variables?: ProjectsQueryVariables) => variables === undefined ? ['Projects'] : ['Projects', variables];

export const useSuspenseProjectsQuery = <
      TData = ProjectsQuery,
      TError = unknown
    >(
      variables?: ProjectsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<ProjectsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<ProjectsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<ProjectsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ProjectsSuspense'] : ['ProjectsSuspense', variables],
    queryFn: switchboardFetcher<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, variables),
    ...options
  }
    )};

useSuspenseProjectsQuery.getKey = (variables?: ProjectsQueryVariables) => variables === undefined ? ['ProjectsSuspense'] : ['ProjectsSuspense', variables];


useProjectsQuery.fetcher = (variables?: ProjectsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, variables, options);

export const WorkstreamProjectDocument = `
    query WorkstreamProject($filter: WorkstreamFilter!) {
  workstream(filter: $filter) {
    title
    status
    slug
    initialProposal {
      status
      author {
        id
        name
      }
      sow {
        contributors {
          id
          icon
          slug
          name
        }
        description
        title
        status
        projects {
          abstract
          slug
          code
          currency
          id
          imageUrl
          projectOwner {
            id
            code
            name
          }
          title
          budget
          budgetType
          expenditure {
            cap
          }
          scope {
            status
            progress {
              ... on SOW_Percentage {
                value
              }
            }
            deliverables
          }
        }
        deliverables {
          id
          code
          title
          description
          status
          keyResults {
            id
            link
            title
          }
          workProgress {
            ... on SOW_StoryPoint {
              total
              completed
            }
            ... on SOW_Percentage {
              value
            }
            ... on SOW_Binary {
              done
            }
          }
          budgetAnchor {
            unitCost
            unit
            quantity
          }
        }
      }
    }
  }
}
    `;

export const useWorkstreamProjectQuery = <
      TData = WorkstreamProjectQuery,
      TError = unknown
    >(
      variables: WorkstreamProjectQueryVariables,
      options?: Omit<UseQueryOptions<WorkstreamProjectQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkstreamProjectQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkstreamProjectQuery, TError, TData>(
      {
    queryKey: ['WorkstreamProject', variables],
    queryFn: switchboardFetcher<WorkstreamProjectQuery, WorkstreamProjectQueryVariables>(WorkstreamProjectDocument, variables),
    ...options
  }
    )};

useWorkstreamProjectQuery.getKey = (variables: WorkstreamProjectQueryVariables) => ['WorkstreamProject', variables];

export const useSuspenseWorkstreamProjectQuery = <
      TData = WorkstreamProjectQuery,
      TError = unknown
    >(
      variables: WorkstreamProjectQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkstreamProjectQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkstreamProjectQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkstreamProjectQuery, TError, TData>(
      {
    queryKey: ['WorkstreamProjectSuspense', variables],
    queryFn: switchboardFetcher<WorkstreamProjectQuery, WorkstreamProjectQueryVariables>(WorkstreamProjectDocument, variables),
    ...options
  }
    )};

useSuspenseWorkstreamProjectQuery.getKey = (variables: WorkstreamProjectQueryVariables) => ['WorkstreamProjectSuspense', variables];


useWorkstreamProjectQuery.fetcher = (variables: WorkstreamProjectQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<WorkstreamProjectQuery, WorkstreamProjectQueryVariables>(WorkstreamProjectDocument, variables, options);

export const RfpByWorkstreamDocument = `
    query RfpByWorkstream($filter: WorkstreamFilter!) {
  rfpByWorkstream(filter: $filter) {
    code
    rfp {
      briefing
      budgetCurrency
      budgetMax
      budgetMin
      code
      eligibilityCriteria
      evaluationCriteria
      status
      id
      summary
      submissionDeadline
      title
    }
    title
    status
  }
}
    `;

export const useRfpByWorkstreamQuery = <
      TData = RfpByWorkstreamQuery,
      TError = unknown
    >(
      variables: RfpByWorkstreamQueryVariables,
      options?: Omit<UseQueryOptions<RfpByWorkstreamQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RfpByWorkstreamQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RfpByWorkstreamQuery, TError, TData>(
      {
    queryKey: ['RfpByWorkstream', variables],
    queryFn: switchboardFetcher<RfpByWorkstreamQuery, RfpByWorkstreamQueryVariables>(RfpByWorkstreamDocument, variables),
    ...options
  }
    )};

useRfpByWorkstreamQuery.getKey = (variables: RfpByWorkstreamQueryVariables) => ['RfpByWorkstream', variables];

export const useSuspenseRfpByWorkstreamQuery = <
      TData = RfpByWorkstreamQuery,
      TError = unknown
    >(
      variables: RfpByWorkstreamQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<RfpByWorkstreamQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<RfpByWorkstreamQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<RfpByWorkstreamQuery, TError, TData>(
      {
    queryKey: ['RfpByWorkstreamSuspense', variables],
    queryFn: switchboardFetcher<RfpByWorkstreamQuery, RfpByWorkstreamQueryVariables>(RfpByWorkstreamDocument, variables),
    ...options
  }
    )};

useSuspenseRfpByWorkstreamQuery.getKey = (variables: RfpByWorkstreamQueryVariables) => ['RfpByWorkstreamSuspense', variables];


useRfpByWorkstreamQuery.fetcher = (variables: RfpByWorkstreamQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<RfpByWorkstreamQuery, RfpByWorkstreamQueryVariables>(RfpByWorkstreamDocument, variables, options);

export const RoadmapDetailsDocument = `
    query RoadmapDetails($filter: scopeOfWorkByNetworkOrStatusFilter!) {
  scopeOfWorkByNetworkOrStatus(filter: $filter) {
    title
    status
    description
    roadmaps {
      id
      title
      slug
      description
      milestones {
        id
        title
        description
        sequenceCode
        budget
        deliveryTarget
        coordinators
        scope {
          deliverables
          deliverablesCompleted {
            completed
            total
          }
          status
          progress {
            ... on SOW_StoryPoint {
              total
              completed
            }
            ... on SOW_Percentage {
              value
            }
            ... on SOW_Binary {
              done
            }
          }
        }
      }
    }
    contributors {
      id
      name
    }
    deliverables {
      id
      owner {
        id
        code
        icon
      }
      status
      title
      code
      description
      budgetAnchor {
        margin
        project
        quantity
        unit
        unitCost
      }
      keyResults {
        id
        link
        title
      }
      workProgress {
        ... on SOW_StoryPoint {
          __typename
          total
          completed
        }
        ... on SOW_Percentage {
          __typename
          value
        }
        ... on SOW_Binary {
          __typename
          done
        }
      }
    }
    projects {
      abstract
      budget
      budgetType
      code
      currency
      expenditure {
        actuals
        cap
        percentage
      }
      id
      imageUrl
      projectOwner {
        id
        code
        name
      }
      title
      scope {
        status
        deliverablesCompleted {
          completed
          total
        }
        deliverables
      }
    }
  }
}
    `;

export const useRoadmapDetailsQuery = <
      TData = RoadmapDetailsQuery,
      TError = unknown
    >(
      variables: RoadmapDetailsQueryVariables,
      options?: Omit<UseQueryOptions<RoadmapDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RoadmapDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RoadmapDetailsQuery, TError, TData>(
      {
    queryKey: ['RoadmapDetails', variables],
    queryFn: switchboardFetcher<RoadmapDetailsQuery, RoadmapDetailsQueryVariables>(RoadmapDetailsDocument, variables),
    ...options
  }
    )};

useRoadmapDetailsQuery.getKey = (variables: RoadmapDetailsQueryVariables) => ['RoadmapDetails', variables];

export const useSuspenseRoadmapDetailsQuery = <
      TData = RoadmapDetailsQuery,
      TError = unknown
    >(
      variables: RoadmapDetailsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<RoadmapDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<RoadmapDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<RoadmapDetailsQuery, TError, TData>(
      {
    queryKey: ['RoadmapDetailsSuspense', variables],
    queryFn: switchboardFetcher<RoadmapDetailsQuery, RoadmapDetailsQueryVariables>(RoadmapDetailsDocument, variables),
    ...options
  }
    )};

useSuspenseRoadmapDetailsQuery.getKey = (variables: RoadmapDetailsQueryVariables) => ['RoadmapDetailsSuspense', variables];


useRoadmapDetailsQuery.fetcher = (variables: RoadmapDetailsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<RoadmapDetailsQuery, RoadmapDetailsQueryVariables>(RoadmapDetailsDocument, variables, options);

export const ScopeOfWorkDocument = `
    query ScopeOfWork($docId: PHID!) {
  ScopeOfWork {
    getDocument(docId: $docId) {
      id
      stateJSON
      state {
        roadmaps {
          id
          slug
          title
          description
          milestones {
            description
            budget
            title
            sequenceCode
            id
            coordinators
            deliveryTarget
            scope {
              deliverables
              deliverablesCompleted {
                completed
                total
              }
              status
            }
          }
        }
        contributors {
          id
          name
        }
        deliverables {
          budgetAnchor {
            margin
            project
            quantity
            unit
            unitCost
          }
          code
          description
          id
          keyResults {
            id
            link
            title
          }
          owner
          status
          title
        }
        description
        projects {
          abstract
          budget
          budgetType
          code
          currency
          expenditure {
            actuals
            cap
            percentage
          }
          id
          imageUrl
          projectOwner
          title
          scope {
            status
            deliverablesCompleted {
              completed
              total
            }
            deliverables
          }
        }
        status
        title
      }
    }
  }
}
    `;

export const useScopeOfWorkQuery = <
      TData = ScopeOfWorkQuery,
      TError = unknown
    >(
      variables: ScopeOfWorkQueryVariables,
      options?: Omit<UseQueryOptions<ScopeOfWorkQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ScopeOfWorkQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ScopeOfWorkQuery, TError, TData>(
      {
    queryKey: ['ScopeOfWork', variables],
    queryFn: switchboardFetcher<ScopeOfWorkQuery, ScopeOfWorkQueryVariables>(ScopeOfWorkDocument, variables),
    ...options
  }
    )};

useScopeOfWorkQuery.getKey = (variables: ScopeOfWorkQueryVariables) => ['ScopeOfWork', variables];

export const useSuspenseScopeOfWorkQuery = <
      TData = ScopeOfWorkQuery,
      TError = unknown
    >(
      variables: ScopeOfWorkQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<ScopeOfWorkQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<ScopeOfWorkQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<ScopeOfWorkQuery, TError, TData>(
      {
    queryKey: ['ScopeOfWorkSuspense', variables],
    queryFn: switchboardFetcher<ScopeOfWorkQuery, ScopeOfWorkQueryVariables>(ScopeOfWorkDocument, variables),
    ...options
  }
    )};

useSuspenseScopeOfWorkQuery.getKey = (variables: ScopeOfWorkQueryVariables) => ['ScopeOfWorkSuspense', variables];


useScopeOfWorkQuery.fetcher = (variables: ScopeOfWorkQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<ScopeOfWorkQuery, ScopeOfWorkQueryVariables>(ScopeOfWorkDocument, variables, options);

export const RoadmapListDocument = `
    query RoadmapList($filter: WorkstreamFilter!) {
  workstream(filter: $filter) {
    title
    slug
    network {
      name
      logo
      darkThemeLogo
      slug
    }
    sow {
      roadmaps {
        id
        description
        slug
        title
        milestones {
          budget
          coordinators
          deliveryTarget
          description
          id
          sequenceCode
          title
          scope {
            deliverables
            deliverablesCompleted {
              completed
              total
            }
            progress {
              ... on SOW_StoryPoint {
                completed
                total
              }
              ... on SOW_Percentage {
                value
              }
              ... on SOW_Binary {
                done
              }
            }
            status
          }
        }
      }
      deliverables {
        id
        code
        title
        description
        status
        keyResults {
          id
          link
          title
        }
      }
    }
  }
}
    `;

export const useRoadmapListQuery = <
      TData = RoadmapListQuery,
      TError = unknown
    >(
      variables: RoadmapListQueryVariables,
      options?: Omit<UseQueryOptions<RoadmapListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<RoadmapListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<RoadmapListQuery, TError, TData>(
      {
    queryKey: ['RoadmapList', variables],
    queryFn: switchboardFetcher<RoadmapListQuery, RoadmapListQueryVariables>(RoadmapListDocument, variables),
    ...options
  }
    )};

useRoadmapListQuery.getKey = (variables: RoadmapListQueryVariables) => ['RoadmapList', variables];

export const useSuspenseRoadmapListQuery = <
      TData = RoadmapListQuery,
      TError = unknown
    >(
      variables: RoadmapListQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<RoadmapListQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<RoadmapListQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<RoadmapListQuery, TError, TData>(
      {
    queryKey: ['RoadmapListSuspense', variables],
    queryFn: switchboardFetcher<RoadmapListQuery, RoadmapListQueryVariables>(RoadmapListDocument, variables),
    ...options
  }
    )};

useSuspenseRoadmapListQuery.getKey = (variables: RoadmapListQueryVariables) => ['RoadmapListSuspense', variables];


useRoadmapListQuery.fetcher = (variables: RoadmapListQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<RoadmapListQuery, RoadmapListQueryVariables>(RoadmapListDocument, variables, options);

export const ServiceOfferingsDocument = `
    query ServiceOfferings($filter: RSServiceOfferingsFilter) {
  serviceOfferings(filter: $filter) {
    summary
    operatorId
    title
    status
    id
    infoLink
    description
    lastModified
    resourceTemplateId
    facetTargets {
      categoryKey
      categoryLabel
      selectedOptions
      id
    }
    optionGroups {
      defaultSelected
      description
      isAddOn
      name
      id
    }
    services {
      description
      displayOrder
      facetBindings {
        facetName
        facetType
        id
        supportedOptions
      }
      id
      isSetupFormation
      optionGroupId
      title
    }
    tiers {
      description
      id
      isCustomPricing
      name
      pricing {
        amount
        currency
      }
      pricingOptions {
        amount
        currency
        id
        isDefault
      }
      serviceLevels {
        customValue
        id
        level
        optionGroupId
        serviceId
      }
      usageLimits {
        id
        metric
        notes
        serviceId
        unitName
        unitPrice
        unitPriceCurrency
      }
    }
    thumbnailUrl
    targetAudiences {
      label
      color
      id
    }
  }
}
    `;

export const useServiceOfferingsQuery = <
      TData = ServiceOfferingsQuery,
      TError = unknown
    >(
      variables?: ServiceOfferingsQueryVariables,
      options?: Omit<UseQueryOptions<ServiceOfferingsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ServiceOfferingsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ServiceOfferingsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ServiceOfferings'] : ['ServiceOfferings', variables],
    queryFn: switchboardFetcher<ServiceOfferingsQuery, ServiceOfferingsQueryVariables>(ServiceOfferingsDocument, variables),
    ...options
  }
    )};

useServiceOfferingsQuery.getKey = (variables?: ServiceOfferingsQueryVariables) => variables === undefined ? ['ServiceOfferings'] : ['ServiceOfferings', variables];

export const useSuspenseServiceOfferingsQuery = <
      TData = ServiceOfferingsQuery,
      TError = unknown
    >(
      variables?: ServiceOfferingsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<ServiceOfferingsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<ServiceOfferingsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<ServiceOfferingsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ServiceOfferingsSuspense'] : ['ServiceOfferingsSuspense', variables],
    queryFn: switchboardFetcher<ServiceOfferingsQuery, ServiceOfferingsQueryVariables>(ServiceOfferingsDocument, variables),
    ...options
  }
    )};

useSuspenseServiceOfferingsQuery.getKey = (variables?: ServiceOfferingsQueryVariables) => variables === undefined ? ['ServiceOfferingsSuspense'] : ['ServiceOfferingsSuspense', variables];


useServiceOfferingsQuery.fetcher = (variables?: ServiceOfferingsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<ServiceOfferingsQuery, ServiceOfferingsQueryVariables>(ServiceOfferingsDocument, variables, options);

export const ResourceTemplatesDocument = `
    query ResourceTemplates {
  resourceTemplates {
    contentSections {
      id
      title
      content
      displayOrder
    }
    description
    facetTargets {
      id
      categoryKey
      categoryLabel
      selectedOptions
    }
    faqFields {
      id
      question
      answer
      displayOrder
    }
    infoLink
    lastModified
    title
    thumbnailUrl
    targetAudiences {
      id
      label
      color
    }
    operatorId
    recurringServices
    status
    summary
    setupServices
    id
  }
}
    `;

export const useResourceTemplatesQuery = <
      TData = ResourceTemplatesQuery,
      TError = unknown
    >(
      variables?: ResourceTemplatesQueryVariables,
      options?: Omit<UseQueryOptions<ResourceTemplatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ResourceTemplatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ResourceTemplatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ResourceTemplates'] : ['ResourceTemplates', variables],
    queryFn: switchboardFetcher<ResourceTemplatesQuery, ResourceTemplatesQueryVariables>(ResourceTemplatesDocument, variables),
    ...options
  }
    )};

useResourceTemplatesQuery.getKey = (variables?: ResourceTemplatesQueryVariables) => variables === undefined ? ['ResourceTemplates'] : ['ResourceTemplates', variables];

export const useSuspenseResourceTemplatesQuery = <
      TData = ResourceTemplatesQuery,
      TError = unknown
    >(
      variables?: ResourceTemplatesQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<ResourceTemplatesQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<ResourceTemplatesQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<ResourceTemplatesQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ResourceTemplatesSuspense'] : ['ResourceTemplatesSuspense', variables],
    queryFn: switchboardFetcher<ResourceTemplatesQuery, ResourceTemplatesQueryVariables>(ResourceTemplatesDocument, variables),
    ...options
  }
    )};

useSuspenseResourceTemplatesQuery.getKey = (variables?: ResourceTemplatesQueryVariables) => variables === undefined ? ['ResourceTemplatesSuspense'] : ['ResourceTemplatesSuspense', variables];


useResourceTemplatesQuery.fetcher = (variables?: ResourceTemplatesQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<ResourceTemplatesQuery, ResourceTemplatesQueryVariables>(ResourceTemplatesDocument, variables, options);

export const WorkstreamDetailsDocument = `
    query WorkstreamDetails($filter: WorkstreamFilter!) {
  workstream(filter: $filter) {
    title
    status
    slug
    client {
      name
      icon
    }
    network {
      name
      slug
      logo
      darkThemeLogo
    }
    initialProposal {
      status
      author {
        name
      }
      paymentTerms {
        proposer
        currency
        totalAmount
        paymentModel
      }
      sow {
        description
        title
        status
        projects {
          id
          slug
          code
          abstract
          title
          projectOwner {
            id
            code
            name
          }
          imageUrl
          budget
          currency
          expenditure {
            cap
          }
          scope {
            status
            progress {
              ... on SOW_Percentage {
                value
              }
            }
            deliverables
          }
        }
        roadmaps {
          milestones {
            budget
            scope {
              deliverables
            }
          }
        }
        deliverables {
          id
          code
          title
          description
          keyResults {
            title
            id
            link
          }
          workProgress {
            ... on SOW_StoryPoint {
              total
              completed
            }
            ... on SOW_Percentage {
              value
            }
            ... on SOW_Binary {
              done
            }
          }
          budgetAnchor {
            unitCost
            unit
            quantity
          }
          status
        }
      }
    }
    rfp {
      title
      summary
      budgetMax
      budgetMin
      budgetCurrency
      briefing
      submissionDeadline
    }
    sow {
      projects {
        title
      }
      roadmaps {
        milestones {
          id
        }
      }
    }
    alternativeProposals {
      id
    }
  }
}
    `;

export const useWorkstreamDetailsQuery = <
      TData = WorkstreamDetailsQuery,
      TError = unknown
    >(
      variables: WorkstreamDetailsQueryVariables,
      options?: Omit<UseQueryOptions<WorkstreamDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkstreamDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkstreamDetailsQuery, TError, TData>(
      {
    queryKey: ['WorkstreamDetails', variables],
    queryFn: switchboardFetcher<WorkstreamDetailsQuery, WorkstreamDetailsQueryVariables>(WorkstreamDetailsDocument, variables),
    ...options
  }
    )};

useWorkstreamDetailsQuery.getKey = (variables: WorkstreamDetailsQueryVariables) => ['WorkstreamDetails', variables];

export const useSuspenseWorkstreamDetailsQuery = <
      TData = WorkstreamDetailsQuery,
      TError = unknown
    >(
      variables: WorkstreamDetailsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkstreamDetailsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkstreamDetailsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkstreamDetailsQuery, TError, TData>(
      {
    queryKey: ['WorkstreamDetailsSuspense', variables],
    queryFn: switchboardFetcher<WorkstreamDetailsQuery, WorkstreamDetailsQueryVariables>(WorkstreamDetailsDocument, variables),
    ...options
  }
    )};

useSuspenseWorkstreamDetailsQuery.getKey = (variables: WorkstreamDetailsQueryVariables) => ['WorkstreamDetailsSuspense', variables];


useWorkstreamDetailsQuery.fetcher = (variables: WorkstreamDetailsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<WorkstreamDetailsQuery, WorkstreamDetailsQueryVariables>(WorkstreamDetailsDocument, variables, options);

export const WorkstreamsDocument = `
    query Workstreams($filter: WorkstreamsFilter) {
  workstreams(filter: $filter) {
    title
    status
    slug
    client {
      name
      icon
    }
    initialProposal {
      status
      author {
        name
      }
      paymentTerms {
        proposer
        currency
        totalAmount
        paymentModel
      }
      sow {
        description
        roadmaps {
          milestones {
            budget
            scope {
              deliverables
            }
          }
        }
        deliverables {
          id
          code
          title
          description
        }
      }
    }
    rfp {
      title
      summary
      budgetMax
      budgetMin
      budgetCurrency
      briefing
      submissionDeadline
    }
    sow {
      projects {
        title
      }
      roadmaps {
        milestones {
          id
        }
      }
    }
    alternativeProposals {
      id
    }
    network {
      name
      logo
      darkThemeLogo
      slug
    }
  }
}
    `;

export const useWorkstreamsQuery = <
      TData = WorkstreamsQuery,
      TError = unknown
    >(
      variables?: WorkstreamsQueryVariables,
      options?: Omit<UseQueryOptions<WorkstreamsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<WorkstreamsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<WorkstreamsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Workstreams'] : ['Workstreams', variables],
    queryFn: switchboardFetcher<WorkstreamsQuery, WorkstreamsQueryVariables>(WorkstreamsDocument, variables),
    ...options
  }
    )};

useWorkstreamsQuery.getKey = (variables?: WorkstreamsQueryVariables) => variables === undefined ? ['Workstreams'] : ['Workstreams', variables];

export const useSuspenseWorkstreamsQuery = <
      TData = WorkstreamsQuery,
      TError = unknown
    >(
      variables?: WorkstreamsQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<WorkstreamsQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<WorkstreamsQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<WorkstreamsQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['WorkstreamsSuspense'] : ['WorkstreamsSuspense', variables],
    queryFn: switchboardFetcher<WorkstreamsQuery, WorkstreamsQueryVariables>(WorkstreamsDocument, variables),
    ...options
  }
    )};

useSuspenseWorkstreamsQuery.getKey = (variables?: WorkstreamsQueryVariables) => variables === undefined ? ['WorkstreamsSuspense'] : ['WorkstreamsSuspense', variables];


useWorkstreamsQuery.fetcher = (variables?: WorkstreamsQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<WorkstreamsQuery, WorkstreamsQueryVariables>(WorkstreamsDocument, variables, options);
