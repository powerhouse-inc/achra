/* eslint-disable */
// @ts-nocheck
import { useQuery, useSuspenseQuery, useMutation, UseQueryOptions, UseSuspenseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
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

/**
 * Mutation result type for AccountTransactions operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type AccountTransactionsMutationResult = {
  __typename?: 'AccountTransactionsMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: AccountTransactions_FullState;
};

/** Mutations: AccountTransactions */
export type AccountTransactionsMutations = {
  __typename?: 'AccountTransactionsMutations';
  addBudget: AccountTransactionsMutationResult;
  addBudgetAsync: Scalars['String']['output'];
  addTransaction: AccountTransactionsMutationResult;
  addTransactionAsync: Scalars['String']['output'];
  createDocument: AccountTransactionsMutationResult;
  createEmptyDocument: AccountTransactionsMutationResult;
  deleteBudget: AccountTransactionsMutationResult;
  deleteBudgetAsync: Scalars['String']['output'];
  deleteTransaction: AccountTransactionsMutationResult;
  deleteTransactionAsync: Scalars['String']['output'];
  setAccount: AccountTransactionsMutationResult;
  setAccountAsync: Scalars['String']['output'];
  updateBudget: AccountTransactionsMutationResult;
  updateBudgetAsync: Scalars['String']['output'];
  updateTransaction: AccountTransactionsMutationResult;
  updateTransactionAsync: Scalars['String']['output'];
  updateTransactionPeriod: AccountTransactionsMutationResult;
  updateTransactionPeriodAsync: Scalars['String']['output'];
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsAddBudgetArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_AddBudgetInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsAddBudgetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_AddBudgetInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsAddTransactionArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_AddTransactionInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsAddTransactionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_AddTransactionInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<AccountTransactions_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsDeleteBudgetArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_DeleteBudgetInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsDeleteBudgetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_DeleteBudgetInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsDeleteTransactionArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_DeleteTransactionInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsDeleteTransactionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_DeleteTransactionInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsSetAccountArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_SetAccountInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsSetAccountAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_SetAccountInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsUpdateBudgetArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_UpdateBudgetInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsUpdateBudgetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_UpdateBudgetInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsUpdateTransactionArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_UpdateTransactionInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsUpdateTransactionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_UpdateTransactionInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsUpdateTransactionPeriodArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_UpdateTransactionPeriodInput;
};


/** Mutations: AccountTransactions */
export type AccountTransactionsMutationsUpdateTransactionPeriodAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: AccountTransactions_UpdateTransactionPeriodInput;
};

/** Queries: AccountTransactions Document */
export type AccountTransactionsQueries = {
  __typename?: 'AccountTransactionsQueries';
  /** Get all AccountTransactions documents (paged) */
  AccountTransactions_documents: AccountTransactions_DocumentResultPage;
  /** Get a specific AccountTransactions document by identifier */
  document?: Maybe<AccountTransactions_DocumentWithChildren>;
  /** Get children of a AccountTransactions document */
  documentChildren: AccountTransactions_DocumentResultPage;
  /** Get parents of a AccountTransactions document */
  documentParents: AccountTransactions_DocumentResultPage;
  /** Find AccountTransactions documents by search criteria */
  findDocuments: AccountTransactions_DocumentResultPage;
};


/** Queries: AccountTransactions Document */
export type AccountTransactionsQueriesAccountTransactions_DocumentsArgs = {
  paging?: InputMaybe<AccountTransactions_PagingInput>;
};


/** Queries: AccountTransactions Document */
export type AccountTransactionsQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<AccountTransactions_ViewFilterInput>;
};


/** Queries: AccountTransactions Document */
export type AccountTransactionsQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<AccountTransactions_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<AccountTransactions_ViewFilterInput>;
};


/** Queries: AccountTransactions Document */
export type AccountTransactionsQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<AccountTransactions_PagingInput>;
  view?: InputMaybe<AccountTransactions_ViewFilterInput>;
};


/** Queries: AccountTransactions Document */
export type AccountTransactionsQueriesFindDocumentsArgs = {
  paging?: InputMaybe<AccountTransactions_PagingInput>;
  search: AccountTransactions_SearchFilterInput;
  view?: InputMaybe<AccountTransactions_ViewFilterInput>;
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

export type AccountTransactions_AccountInput = {
  KycAmlStatus?: InputMaybe<Scalars['String']['input']>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountTransactionsId?: InputMaybe<Scalars['PHID']['input']>;
  budgetPath?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['OID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owners?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type AccountTransactions_AccountTransactionsState = {
  __typename?: 'AccountTransactions_AccountTransactionsState';
  account: AccountTransactions_Account;
  budgets: Array<AccountTransactions_Budget>;
  transactions: Array<AccountTransactions_TransactionEntry>;
};

/** Input Types for Initial State */
export type AccountTransactions_AccountTransactionsStateInput = {
  account?: InputMaybe<AccountTransactions_AccountInput>;
  budgets?: InputMaybe<Array<InputMaybe<AccountTransactions_BudgetInput>>>;
  transactions?: InputMaybe<Array<InputMaybe<AccountTransactions_TransactionEntryInput>>>;
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

export type AccountTransactions_BudgetInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  name?: InputMaybe<Scalars['OLabel']['input']>;
};

export type AccountTransactions_DeleteBudgetInput = {
  id: Scalars['OID']['input'];
};

export type AccountTransactions_DeleteTransactionInput = {
  id: Scalars['ID']['input'];
};

/** Paginated result type for AccountTransactions documents */
export type AccountTransactions_DocumentResultPage = {
  __typename?: 'AccountTransactions_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<AccountTransactionsMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for AccountTransactions */
export type AccountTransactions_DocumentWithChildren = {
  __typename?: 'AccountTransactions_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: AccountTransactionsMutationResult;
};

/** Full state with all scopes for AccountTransactions */
export type AccountTransactions_FullState = {
  __typename?: 'AccountTransactions_FullState';
  auth: Scalars['JSONObject']['output'];
  document: AccountTransactions_PhDocumentScopeState;
  global: AccountTransactions_AccountTransactionsState;
  local: Scalars['JSONObject']['output'];
};

export type AccountTransactions_InitialStateInput = {
  global?: InputMaybe<AccountTransactions_AccountTransactionsStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type AccountTransactions_PhDocumentScopeState = {
  __typename?: 'AccountTransactions_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: AccountTransactions_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type AccountTransactions_PhHashConfig = {
  __typename?: 'AccountTransactions_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type AccountTransactions_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type AccountTransactions_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
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

export type AccountTransactions_TransactionDetailsInput = {
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  token?: InputMaybe<Scalars['Currency']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
  uniqueId?: InputMaybe<Scalars['String']['input']>;
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

export type AccountTransactions_TransactionEntryInput = {
  accountingPeriod?: InputMaybe<Scalars['String']['input']>;
  amount?: InputMaybe<Scalars['Amount_Currency']['input']>;
  budget?: InputMaybe<Scalars['OID']['input']>;
  counterParty?: InputMaybe<Scalars['EthereumAddress']['input']>;
  datetime?: InputMaybe<Scalars['DateTime']['input']>;
  details?: InputMaybe<AccountTransactions_TransactionDetailsInput>;
  direction?: InputMaybe<AccountTransactions_TransactionDirection>;
  id?: InputMaybe<Scalars['ID']['input']>;
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

export type AccountTransactions_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

/**
 * Mutation result type for Accounts operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type AccountsMutationResult = {
  __typename?: 'AccountsMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Accounts_FullState;
};

/** Mutations: Accounts */
export type AccountsMutations = {
  __typename?: 'AccountsMutations';
  addAccount: AccountsMutationResult;
  addAccountAsync: Scalars['String']['output'];
  createDocument: AccountsMutationResult;
  createEmptyDocument: AccountsMutationResult;
  deleteAccount: AccountsMutationResult;
  deleteAccountAsync: Scalars['String']['output'];
  updateAccount: AccountsMutationResult;
  updateAccountAsync: Scalars['String']['output'];
  updateKycStatus: AccountsMutationResult;
  updateKycStatusAsync: Scalars['String']['output'];
};


/** Mutations: Accounts */
export type AccountsMutationsAddAccountArgs = {
  docId: Scalars['PHID']['input'];
  input: Accounts_AddAccountInput;
};


/** Mutations: Accounts */
export type AccountsMutationsAddAccountAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Accounts_AddAccountInput;
};


/** Mutations: Accounts */
export type AccountsMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<Accounts_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Accounts */
export type AccountsMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Accounts */
export type AccountsMutationsDeleteAccountArgs = {
  docId: Scalars['PHID']['input'];
  input: Accounts_DeleteAccountInput;
};


/** Mutations: Accounts */
export type AccountsMutationsDeleteAccountAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Accounts_DeleteAccountInput;
};


/** Mutations: Accounts */
export type AccountsMutationsUpdateAccountArgs = {
  docId: Scalars['PHID']['input'];
  input: Accounts_UpdateAccountInput;
};


/** Mutations: Accounts */
export type AccountsMutationsUpdateAccountAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Accounts_UpdateAccountInput;
};


/** Mutations: Accounts */
export type AccountsMutationsUpdateKycStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: Accounts_UpdateKycStatusInput;
};


/** Mutations: Accounts */
export type AccountsMutationsUpdateKycStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Accounts_UpdateKycStatusInput;
};

/** Queries: Accounts Document */
export type AccountsQueries = {
  __typename?: 'AccountsQueries';
  /** Get all Accounts documents (paged) */
  Accounts_documents: Accounts_DocumentResultPage;
  /** Get a specific Accounts document by identifier */
  document?: Maybe<Accounts_DocumentWithChildren>;
  /** Get children of a Accounts document */
  documentChildren: Accounts_DocumentResultPage;
  /** Get parents of a Accounts document */
  documentParents: Accounts_DocumentResultPage;
  /** Find Accounts documents by search criteria */
  findDocuments: Accounts_DocumentResultPage;
};


/** Queries: Accounts Document */
export type AccountsQueriesAccounts_DocumentsArgs = {
  paging?: InputMaybe<Accounts_PagingInput>;
};


/** Queries: Accounts Document */
export type AccountsQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<Accounts_ViewFilterInput>;
};


/** Queries: Accounts Document */
export type AccountsQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<Accounts_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<Accounts_ViewFilterInput>;
};


/** Queries: Accounts Document */
export type AccountsQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<Accounts_PagingInput>;
  view?: InputMaybe<Accounts_ViewFilterInput>;
};


/** Queries: Accounts Document */
export type AccountsQueriesFindDocumentsArgs = {
  paging?: InputMaybe<Accounts_PagingInput>;
  search: Accounts_SearchFilterInput;
  view?: InputMaybe<Accounts_ViewFilterInput>;
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

export type Accounts_AccountEntryInput = {
  KycAmlStatus?: InputMaybe<Accounts_KycAmlStatusType>;
  account?: InputMaybe<Scalars['String']['input']>;
  accountTransactionsId?: InputMaybe<Scalars['PHID']['input']>;
  budgetPath?: InputMaybe<Scalars['String']['input']>;
  chain?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id?: InputMaybe<Scalars['OID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owners?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  type?: InputMaybe<Accounts_AccountType>;
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

/** Input Types for Initial State */
export type Accounts_AccountsStateInput = {
  accounts?: InputMaybe<Array<InputMaybe<Accounts_AccountEntryInput>>>;
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

/** Paginated result type for Accounts documents */
export type Accounts_DocumentResultPage = {
  __typename?: 'Accounts_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<AccountsMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for Accounts */
export type Accounts_DocumentWithChildren = {
  __typename?: 'Accounts_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: AccountsMutationResult;
};

/** Full state with all scopes for Accounts */
export type Accounts_FullState = {
  __typename?: 'Accounts_FullState';
  auth: Scalars['JSONObject']['output'];
  document: Accounts_PhDocumentScopeState;
  global: Accounts_AccountsState;
  local: Scalars['JSONObject']['output'];
};

export type Accounts_InitialStateInput = {
  global?: InputMaybe<Accounts_AccountsStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
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

/** Document scope state (same for all document types) */
export type Accounts_PhDocumentScopeState = {
  __typename?: 'Accounts_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: Accounts_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type Accounts_PhHashConfig = {
  __typename?: 'Accounts_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type Accounts_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Accounts_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

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

export type Accounts_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Action = {
  __typename?: 'Action';
  attachments?: Maybe<Array<Attachment>>;
  context?: Maybe<ActionContext>;
  id: Scalars['String']['output'];
  input: Scalars['JSONObject']['output'];
  scope: Scalars['String']['output'];
  timestampUtcMs: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type ActionContext = {
  __typename?: 'ActionContext';
  signer?: Maybe<ReactorSigner>;
};

export type ActionContextInput = {
  signer?: InputMaybe<ReactorSignerInput>;
};

export type ActionInput = {
  attachments?: InputMaybe<Array<AttachmentInput>>;
  context?: InputMaybe<ActionContextInput>;
  id: Scalars['String']['input'];
  input: Scalars['JSONObject']['input'];
  scope: Scalars['String']['input'];
  timestampUtcMs: Scalars['String']['input'];
  type: Scalars['String']['input'];
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

export type Attachment = {
  __typename?: 'Attachment';
  data: Scalars['String']['output'];
  extension?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  mimeType: Scalars['String']['output'];
};

export type AttachmentInput = {
  data: Scalars['String']['input'];
  extension?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  hash: Scalars['String']['input'];
  mimeType: Scalars['String']['input'];
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

export type BillingCycleOverrideInput = {
  billingCycle: RsBillingCycle;
  groupId: Scalars['OID']['input'];
};

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

/**
 * Mutation result type for BillingStatement operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type BillingStatementMutationResult = {
  __typename?: 'BillingStatementMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: BillingStatement_FullState;
};

/** Mutations: BillingStatement */
export type BillingStatementMutations = {
  __typename?: 'BillingStatementMutations';
  addLineItem: BillingStatementMutationResult;
  addLineItemAsync: Scalars['String']['output'];
  createDocument: BillingStatementMutationResult;
  createEmptyDocument: BillingStatementMutationResult;
  deleteLineItem: BillingStatementMutationResult;
  deleteLineItemAsync: Scalars['String']['output'];
  editBillingStatement: BillingStatementMutationResult;
  editBillingStatementAsync: Scalars['String']['output'];
  editContributor: BillingStatementMutationResult;
  editContributorAsync: Scalars['String']['output'];
  editLineItem: BillingStatementMutationResult;
  editLineItemAsync: Scalars['String']['output'];
  editLineItemTag: BillingStatementMutationResult;
  editLineItemTagAsync: Scalars['String']['output'];
  editStatus: BillingStatementMutationResult;
  editStatusAsync: Scalars['String']['output'];
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsAddLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_AddLineItemInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsAddLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_AddLineItemInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<BillingStatement_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsDeleteLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_DeleteLineItemInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsDeleteLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_DeleteLineItemInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditBillingStatementArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditBillingStatementInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditBillingStatementAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditBillingStatementInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditContributorArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditContributorInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditContributorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditContributorInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditLineItemInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditLineItemInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditLineItemTagArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditLineItemTagInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditLineItemTagAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditLineItemTagInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditStatusInput;
};


/** Mutations: BillingStatement */
export type BillingStatementMutationsEditStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BillingStatement_EditStatusInput;
};

/** Queries: BillingStatement Document */
export type BillingStatementQueries = {
  __typename?: 'BillingStatementQueries';
  /** Get all BillingStatement documents (paged) */
  BillingStatement_documents: BillingStatement_DocumentResultPage;
  /** Get a specific BillingStatement document by identifier */
  document?: Maybe<BillingStatement_DocumentWithChildren>;
  /** Get children of a BillingStatement document */
  documentChildren: BillingStatement_DocumentResultPage;
  /** Get parents of a BillingStatement document */
  documentParents: BillingStatement_DocumentResultPage;
  /** Find BillingStatement documents by search criteria */
  findDocuments: BillingStatement_DocumentResultPage;
};


/** Queries: BillingStatement Document */
export type BillingStatementQueriesBillingStatement_DocumentsArgs = {
  paging?: InputMaybe<BillingStatement_PagingInput>;
};


/** Queries: BillingStatement Document */
export type BillingStatementQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<BillingStatement_ViewFilterInput>;
};


/** Queries: BillingStatement Document */
export type BillingStatementQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<BillingStatement_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<BillingStatement_ViewFilterInput>;
};


/** Queries: BillingStatement Document */
export type BillingStatementQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<BillingStatement_PagingInput>;
  view?: InputMaybe<BillingStatement_ViewFilterInput>;
};


/** Queries: BillingStatement Document */
export type BillingStatementQueriesFindDocumentsArgs = {
  paging?: InputMaybe<BillingStatement_PagingInput>;
  search: BillingStatement_SearchFilterInput;
  view?: InputMaybe<BillingStatement_ViewFilterInput>;
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

export type BillingStatement_BillingStatementLineItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  lineItemTag?: InputMaybe<Array<InputMaybe<BillingStatement_BillingStatementTagInput>>>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  totalPriceCash?: InputMaybe<Scalars['Float']['input']>;
  totalPricePwt?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<BillingStatement_BillingStatementUnit>;
  unitPriceCash?: InputMaybe<Scalars['Float']['input']>;
  unitPricePwt?: InputMaybe<Scalars['Float']['input']>;
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

/** Input Types for Initial State */
export type BillingStatement_BillingStatementStateInput = {
  contributor?: InputMaybe<Scalars['PHID']['input']>;
  currency?: InputMaybe<Scalars['String']['input']>;
  dateDue?: InputMaybe<Scalars['DateTime']['input']>;
  dateIssued?: InputMaybe<Scalars['DateTime']['input']>;
  lineItems?: InputMaybe<Array<InputMaybe<BillingStatement_BillingStatementLineItemInput>>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BillingStatement_BillingStatementStatus>;
  totalCash?: InputMaybe<Scalars['Float']['input']>;
  totalPowt?: InputMaybe<Scalars['Float']['input']>;
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

export type BillingStatement_BillingStatementTagInput = {
  dimension?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
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

/** Paginated result type for BillingStatement documents */
export type BillingStatement_DocumentResultPage = {
  __typename?: 'BillingStatement_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<BillingStatementMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for BillingStatement */
export type BillingStatement_DocumentWithChildren = {
  __typename?: 'BillingStatement_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: BillingStatementMutationResult;
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

/** Full state with all scopes for BillingStatement */
export type BillingStatement_FullState = {
  __typename?: 'BillingStatement_FullState';
  auth: Scalars['JSONObject']['output'];
  document: BillingStatement_PhDocumentScopeState;
  global: BillingStatement_BillingStatementState;
  local: Scalars['JSONObject']['output'];
};

export type BillingStatement_InitialStateInput = {
  global?: InputMaybe<BillingStatement_BillingStatementStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type BillingStatement_PhDocumentScopeState = {
  __typename?: 'BillingStatement_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: BillingStatement_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type BillingStatement_PhHashConfig = {
  __typename?: 'BillingStatement_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type BillingStatement_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type BillingStatement_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type BillingStatement_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type BudgetStatement = {
  __typename?: 'BudgetStatement';
  expenseReport: BudgetStatementExpenseReport;
  id: Scalars['OID']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  month: Scalars['String']['output'];
  netExpenseTxns: Scalars['Amount_Currency']['output'];
  operationalHubMember?: Maybe<OperationalHubMember>;
  owner: BudgetStatementOwner;
  reportedActuals: Scalars['Amount_Currency']['output'];
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

/**
 * Mutation result type for BuilderProfile operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type BuilderProfileMutationResult = {
  __typename?: 'BuilderProfileMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: BuilderProfile_FullState;
};

/** Mutations: BuilderProfile */
export type BuilderProfileMutations = {
  __typename?: 'BuilderProfileMutations';
  addContributor: BuilderProfileMutationResult;
  addContributorAsync: Scalars['String']['output'];
  addLink: BuilderProfileMutationResult;
  addLinkAsync: Scalars['String']['output'];
  addScope: BuilderProfileMutationResult;
  addScopeAsync: Scalars['String']['output'];
  addSkill: BuilderProfileMutationResult;
  addSkillAsync: Scalars['String']['output'];
  createDocument: BuilderProfileMutationResult;
  createEmptyDocument: BuilderProfileMutationResult;
  editLink: BuilderProfileMutationResult;
  editLinkAsync: Scalars['String']['output'];
  removeContributor: BuilderProfileMutationResult;
  removeContributorAsync: Scalars['String']['output'];
  removeLink: BuilderProfileMutationResult;
  removeLinkAsync: Scalars['String']['output'];
  removeScope: BuilderProfileMutationResult;
  removeScopeAsync: Scalars['String']['output'];
  removeSkill: BuilderProfileMutationResult;
  removeSkillAsync: Scalars['String']['output'];
  setOpHubMember: BuilderProfileMutationResult;
  setOpHubMemberAsync: Scalars['String']['output'];
  setOperator: BuilderProfileMutationResult;
  setOperatorAsync: Scalars['String']['output'];
  updateProfile: BuilderProfileMutationResult;
  updateProfileAsync: Scalars['String']['output'];
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsAddContributorArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_AddContributorInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsAddContributorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_AddContributorInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsAddLinkArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_AddLinkInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsAddLinkAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_AddLinkInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsAddScopeArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_AddScopeInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsAddScopeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_AddScopeInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsAddSkillArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_AddSkillInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsAddSkillAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_AddSkillInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<BuilderProfile_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsEditLinkArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_EditLinkInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsEditLinkAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_EditLinkInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsRemoveContributorArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_RemoveContributorInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsRemoveContributorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_RemoveContributorInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsRemoveLinkArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_RemoveLinkInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsRemoveLinkAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_RemoveLinkInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsRemoveScopeArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_RemoveScopeInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsRemoveScopeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_RemoveScopeInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsRemoveSkillArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_RemoveSkillInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsRemoveSkillAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_RemoveSkillInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsSetOpHubMemberArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_SetOpHubMemberInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsSetOpHubMemberAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_SetOpHubMemberInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsSetOperatorArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_SetOperatorInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsSetOperatorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_SetOperatorInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsUpdateProfileArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_UpdateProfileInput;
};


/** Mutations: BuilderProfile */
export type BuilderProfileMutationsUpdateProfileAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: BuilderProfile_UpdateProfileInput;
};

/** Queries: BuilderProfile Document */
export type BuilderProfileQueries = {
  __typename?: 'BuilderProfileQueries';
  /** Get all BuilderProfile documents (paged) */
  BuilderProfile_documents: BuilderProfile_DocumentResultPage;
  /** Get a specific BuilderProfile document by identifier */
  document?: Maybe<BuilderProfile_DocumentWithChildren>;
  /** Get children of a BuilderProfile document */
  documentChildren: BuilderProfile_DocumentResultPage;
  /** Get parents of a BuilderProfile document */
  documentParents: BuilderProfile_DocumentResultPage;
  /** Find BuilderProfile documents by search criteria */
  findDocuments: BuilderProfile_DocumentResultPage;
};


/** Queries: BuilderProfile Document */
export type BuilderProfileQueriesBuilderProfile_DocumentsArgs = {
  paging?: InputMaybe<BuilderProfile_PagingInput>;
};


/** Queries: BuilderProfile Document */
export type BuilderProfileQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<BuilderProfile_ViewFilterInput>;
};


/** Queries: BuilderProfile Document */
export type BuilderProfileQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<BuilderProfile_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<BuilderProfile_ViewFilterInput>;
};


/** Queries: BuilderProfile Document */
export type BuilderProfileQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<BuilderProfile_PagingInput>;
  view?: InputMaybe<BuilderProfile_ViewFilterInput>;
};


/** Queries: BuilderProfile Document */
export type BuilderProfileQueriesFindDocumentsArgs = {
  paging?: InputMaybe<BuilderProfile_PagingInput>;
  search: BuilderProfile_SearchFilterInput;
  view?: InputMaybe<BuilderProfile_ViewFilterInput>;
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

export type BuilderProfile_BuilderLinkInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['URL']['input']>;
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

/** Input Types for Initial State */
export type BuilderProfile_BuilderProfileStateInput = {
  about?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  contributors?: InputMaybe<Array<InputMaybe<Scalars['PHID']['input']>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['URL']['input']>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  isOperator?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified?: InputMaybe<Scalars['DateTime']['input']>;
  links?: InputMaybe<Array<InputMaybe<BuilderProfile_BuilderLinkInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  operationalHubMember?: InputMaybe<BuilderProfile_OpHubMemberInput>;
  scopes?: InputMaybe<Array<InputMaybe<BuilderProfile_BuilderScope>>>;
  skills?: InputMaybe<Array<InputMaybe<BuilderProfile_BuilderSkill>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<BuilderProfile_BuilderStatus>;
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

/** Paginated result type for BuilderProfile documents */
export type BuilderProfile_DocumentResultPage = {
  __typename?: 'BuilderProfile_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<BuilderProfileMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for BuilderProfile */
export type BuilderProfile_DocumentWithChildren = {
  __typename?: 'BuilderProfile_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: BuilderProfileMutationResult;
};

export type BuilderProfile_EditLinkInput = {
  id: Scalars['OID']['input'];
  label?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['URL']['input'];
};

/** Full state with all scopes for BuilderProfile */
export type BuilderProfile_FullState = {
  __typename?: 'BuilderProfile_FullState';
  auth: Scalars['JSONObject']['output'];
  document: BuilderProfile_PhDocumentScopeState;
  global: BuilderProfile_BuilderProfileState;
  local: Scalars['JSONObject']['output'];
};

export type BuilderProfile_InitialStateInput = {
  global?: InputMaybe<BuilderProfile_BuilderProfileStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type BuilderProfile_OpHubMember = {
  __typename?: 'BuilderProfile_OpHubMember';
  name?: Maybe<Scalars['String']['output']>;
  phid?: Maybe<Scalars['PHID']['output']>;
};

export type BuilderProfile_OpHubMemberInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  phid?: InputMaybe<Scalars['PHID']['input']>;
};

/** Document scope state (same for all document types) */
export type BuilderProfile_PhDocumentScopeState = {
  __typename?: 'BuilderProfile_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: BuilderProfile_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type BuilderProfile_PhHashConfig = {
  __typename?: 'BuilderProfile_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type BuilderProfile_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type BuilderProfile_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
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

export type BuilderProfile_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

/**
 * Mutation result type for Builders operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type BuildersMutationResult = {
  __typename?: 'BuildersMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Builders_FullState;
};

/** Mutations: Builders */
export type BuildersMutations = {
  __typename?: 'BuildersMutations';
  addBuilder: BuildersMutationResult;
  addBuilderAsync: Scalars['String']['output'];
  createDocument: BuildersMutationResult;
  createEmptyDocument: BuildersMutationResult;
  removeBuilder: BuildersMutationResult;
  removeBuilderAsync: Scalars['String']['output'];
};


/** Mutations: Builders */
export type BuildersMutationsAddBuilderArgs = {
  docId: Scalars['PHID']['input'];
  input: Builders_AddBuilderInput;
};


/** Mutations: Builders */
export type BuildersMutationsAddBuilderAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Builders_AddBuilderInput;
};


/** Mutations: Builders */
export type BuildersMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<Builders_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Builders */
export type BuildersMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Builders */
export type BuildersMutationsRemoveBuilderArgs = {
  docId: Scalars['PHID']['input'];
  input: Builders_RemoveBuilderInput;
};


/** Mutations: Builders */
export type BuildersMutationsRemoveBuilderAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Builders_RemoveBuilderInput;
};

/** Queries: Builders Document */
export type BuildersQueries = {
  __typename?: 'BuildersQueries';
  /** Get all Builders documents (paged) */
  Builders_documents: Builders_DocumentResultPage;
  /** Get a specific Builders document by identifier */
  document?: Maybe<Builders_DocumentWithChildren>;
  /** Get children of a Builders document */
  documentChildren: Builders_DocumentResultPage;
  /** Get parents of a Builders document */
  documentParents: Builders_DocumentResultPage;
  /** Find Builders documents by search criteria */
  findDocuments: Builders_DocumentResultPage;
};


/** Queries: Builders Document */
export type BuildersQueriesBuilders_DocumentsArgs = {
  paging?: InputMaybe<Builders_PagingInput>;
};


/** Queries: Builders Document */
export type BuildersQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<Builders_ViewFilterInput>;
};


/** Queries: Builders Document */
export type BuildersQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<Builders_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<Builders_ViewFilterInput>;
};


/** Queries: Builders Document */
export type BuildersQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<Builders_PagingInput>;
  view?: InputMaybe<Builders_ViewFilterInput>;
};


/** Queries: Builders Document */
export type BuildersQueriesFindDocumentsArgs = {
  paging?: InputMaybe<Builders_PagingInput>;
  search: Builders_SearchFilterInput;
  view?: InputMaybe<Builders_ViewFilterInput>;
};

/** Module: Builders */
export type Builders_AddBuilderInput = {
  builderPhid: Scalars['PHID']['input'];
};

export type Builders_BuildersState = {
  __typename?: 'Builders_BuildersState';
  builders: Array<Scalars['PHID']['output']>;
};

/** Input Types for Initial State */
export type Builders_BuildersStateInput = {
  builders?: InputMaybe<Array<InputMaybe<Scalars['PHID']['input']>>>;
};

/** Paginated result type for Builders documents */
export type Builders_DocumentResultPage = {
  __typename?: 'Builders_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<BuildersMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for Builders */
export type Builders_DocumentWithChildren = {
  __typename?: 'Builders_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: BuildersMutationResult;
};

/** Full state with all scopes for Builders */
export type Builders_FullState = {
  __typename?: 'Builders_FullState';
  auth: Scalars['JSONObject']['output'];
  document: Builders_PhDocumentScopeState;
  global: Builders_BuildersState;
  local: Scalars['JSONObject']['output'];
};

export type Builders_InitialStateInput = {
  global?: InputMaybe<Builders_BuildersStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type Builders_PhDocumentScopeState = {
  __typename?: 'Builders_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: Builders_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type Builders_PhHashConfig = {
  __typename?: 'Builders_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type Builders_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Builders_RemoveBuilderInput = {
  builderPhid: Scalars['PHID']['input'];
};

export type Builders_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type Builders_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ChannelMeta = {
  __typename?: 'ChannelMeta';
  id: Scalars['String']['output'];
};

export type ChannelMetaInput = {
  id: Scalars['String']['input'];
};

export type ClientInfo = {
  __typename?: 'ClientInfo';
  icon?: Maybe<Scalars['URL']['output']>;
  id: Scalars['PHID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type CreateProductInstancesInput = {
  customerEmail?: InputMaybe<Scalars['EmailAddress']['input']>;
  name: Scalars['String']['input'];
  serviceOfferingId: Scalars['PHID']['input'];
  teamName: Scalars['String']['input'];
  userSelection: UserSelectionInput;
};

export type CreateProductInstancesOutput = {
  __typename?: 'CreateProductInstancesOutput';
  data?: Maybe<Scalars['JSONObject']['output']>;
  errors: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

/** Output type for request finance payment */
export type CreateRequestFinancePaymentOutput = {
  __typename?: 'CreateRequestFinancePaymentOutput';
  data?: Maybe<Scalars['JSONObject']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CurrencyConversion = {
  metric: Scalars['String']['input'];
  sourceCurrency: Scalars['String']['input'];
};

export type DeadLetterInfo = {
  __typename?: 'DeadLetterInfo';
  branch: Scalars['String']['output'];
  documentId: Scalars['String']['output'];
  error: Scalars['String']['output'];
  jobId: Scalars['String']['output'];
  operationCount: Scalars['Int']['output'];
  scopes: Array<Scalars['String']['output']>;
};

export type Dimension = {
  __typename?: 'Dimension';
  name?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Value>>>;
};

export type DocumentChangeContext = {
  __typename?: 'DocumentChangeContext';
  childId?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['String']['output']>;
};

export type DocumentChangeEvent = {
  __typename?: 'DocumentChangeEvent';
  context?: Maybe<DocumentChangeContext>;
  documents: Array<PhDocument>;
  type: DocumentChangeType;
};

export enum DocumentChangeType {
  ChildAdded = 'CHILD_ADDED',
  ChildRemoved = 'CHILD_REMOVED',
  Created = 'CREATED',
  Deleted = 'DELETED',
  ParentAdded = 'PARENT_ADDED',
  ParentRemoved = 'PARENT_REMOVED',
  Updated = 'UPDATED'
}

export type DocumentDrive = IDocument & {
  __typename?: 'DocumentDrive';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: DocumentDrive_DocumentDriveState;
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: DocumentDrive_DocumentDriveState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DocumentDriveOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * Mutation result type for DocumentDrive operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type DocumentDriveMutationResult = {
  __typename?: 'DocumentDriveMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: DocumentDrive_FullState;
};

/** Mutations: DocumentDrive */
export type DocumentDriveMutations = {
  __typename?: 'DocumentDriveMutations';
  addFile: DocumentDriveMutationResult;
  addFileAsync: Scalars['String']['output'];
  addFolder: DocumentDriveMutationResult;
  addFolderAsync: Scalars['String']['output'];
  addListener: DocumentDriveMutationResult;
  addListenerAsync: Scalars['String']['output'];
  addTrigger: DocumentDriveMutationResult;
  addTriggerAsync: Scalars['String']['output'];
  copyNode: DocumentDriveMutationResult;
  copyNodeAsync: Scalars['String']['output'];
  createDocument: DocumentDriveMutationResult;
  createEmptyDocument: DocumentDriveMutationResult;
  deleteNode: DocumentDriveMutationResult;
  deleteNodeAsync: Scalars['String']['output'];
  moveNode: DocumentDriveMutationResult;
  moveNodeAsync: Scalars['String']['output'];
  removeListener: DocumentDriveMutationResult;
  removeListenerAsync: Scalars['String']['output'];
  removeTrigger: DocumentDriveMutationResult;
  removeTriggerAsync: Scalars['String']['output'];
  setAvailableOffline: DocumentDriveMutationResult;
  setAvailableOfflineAsync: Scalars['String']['output'];
  setDriveIcon: DocumentDriveMutationResult;
  setDriveIconAsync: Scalars['String']['output'];
  setDriveName: DocumentDriveMutationResult;
  setDriveNameAsync: Scalars['String']['output'];
  setSharingType: DocumentDriveMutationResult;
  setSharingTypeAsync: Scalars['String']['output'];
  updateFile: DocumentDriveMutationResult;
  updateFileAsync: Scalars['String']['output'];
  updateNode: DocumentDriveMutationResult;
  updateNodeAsync: Scalars['String']['output'];
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddFileArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddFileInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddFileAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddFileInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddFolderArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddFolderInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddFolderAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddFolderInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddListenerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddListenerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddListenerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddListenerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddTriggerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddTriggerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsAddTriggerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_AddTriggerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsCopyNodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_CopyNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsCopyNodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_CopyNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<DocumentDrive_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsDeleteNodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_DeleteNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsDeleteNodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_DeleteNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsMoveNodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_MoveNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsMoveNodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_MoveNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsRemoveListenerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_RemoveListenerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsRemoveListenerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_RemoveListenerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsRemoveTriggerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_RemoveTriggerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsRemoveTriggerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_RemoveTriggerInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetAvailableOfflineArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetAvailableOfflineInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetAvailableOfflineAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetAvailableOfflineInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetDriveIconArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetDriveIconInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetDriveIconAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetDriveIconInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetDriveNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetDriveNameInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetDriveNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetDriveNameInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetSharingTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetSharingTypeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsSetSharingTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_SetSharingTypeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsUpdateFileArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_UpdateFileInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsUpdateFileAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_UpdateFileInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsUpdateNodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_UpdateNodeInput;
};


/** Mutations: DocumentDrive */
export type DocumentDriveMutationsUpdateNodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentDrive_UpdateNodeInput;
};

/** Queries: DocumentDrive Document */
export type DocumentDriveQueries = {
  __typename?: 'DocumentDriveQueries';
  /** Get all DocumentDrive documents (paged) */
  DocumentDrive_documents: DocumentDrive_DocumentResultPage;
  /** Get a specific DocumentDrive document by identifier */
  document?: Maybe<DocumentDrive_DocumentWithChildren>;
  /** Get children of a DocumentDrive document */
  documentChildren: DocumentDrive_DocumentResultPage;
  /** Get parents of a DocumentDrive document */
  documentParents: DocumentDrive_DocumentResultPage;
  /** Find DocumentDrive documents by search criteria */
  findDocuments: DocumentDrive_DocumentResultPage;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesDocumentDrive_DocumentsArgs = {
  paging?: InputMaybe<DocumentDrive_PagingInput>;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentDrive_ViewFilterInput>;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<DocumentDrive_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentDrive_ViewFilterInput>;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<DocumentDrive_PagingInput>;
  view?: InputMaybe<DocumentDrive_ViewFilterInput>;
};


/** Queries: DocumentDrive Document */
export type DocumentDriveQueriesFindDocumentsArgs = {
  paging?: InputMaybe<DocumentDrive_PagingInput>;
  search: DocumentDrive_SearchFilterInput;
  view?: InputMaybe<DocumentDrive_ViewFilterInput>;
};

/** Module: Node */
export type DocumentDrive_AddFileInput = {
  documentType: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  parentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_AddFolderInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  parentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_AddListenerInput = {
  listener: DocumentDrive_ListenerInput;
};

export type DocumentDrive_AddTriggerInput = {
  trigger: DocumentDrive_TriggerInput;
};

export type DocumentDrive_CopyNodeInput = {
  srcId: Scalars['ID']['input'];
  targetId: Scalars['ID']['input'];
  targetName?: InputMaybe<Scalars['String']['input']>;
  targetParentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_DeleteNodeInput = {
  id: Scalars['ID']['input'];
};

export type DocumentDrive_DocumentDriveLocalState = {
  __typename?: 'DocumentDrive_DocumentDriveLocalState';
  availableOffline: Scalars['Boolean']['output'];
  listeners: Array<DocumentDrive_Listener>;
  sharingType?: Maybe<Scalars['String']['output']>;
  triggers: Array<DocumentDrive_Trigger>;
};

export type DocumentDrive_DocumentDriveLocalStateInput = {
  availableOffline?: InputMaybe<Scalars['Boolean']['input']>;
  listeners?: InputMaybe<Array<InputMaybe<DocumentDrive_ListenerInput>>>;
  sharingType?: InputMaybe<Scalars['String']['input']>;
  triggers?: InputMaybe<Array<InputMaybe<DocumentDrive_TriggerInput>>>;
};

export type DocumentDrive_DocumentDriveState = {
  __typename?: 'DocumentDrive_DocumentDriveState';
  icon?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  nodes: Array<DocumentDrive_Node>;
};

export type DocumentDrive_DocumentDriveStateInput = {
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nodes?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']['input']>>>;
};

/** Paginated result type for DocumentDrive documents */
export type DocumentDrive_DocumentResultPage = {
  __typename?: 'DocumentDrive_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<DocumentDriveMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for DocumentDrive */
export type DocumentDrive_DocumentWithChildren = {
  __typename?: 'DocumentDrive_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: DocumentDriveMutationResult;
};

export type DocumentDrive_FileNode = {
  __typename?: 'DocumentDrive_FileNode';
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentFolder?: Maybe<Scalars['String']['output']>;
};

export type DocumentDrive_FileNodeInput = {
  documentType?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentFolder?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentDrive_FolderNode = {
  __typename?: 'DocumentDrive_FolderNode';
  id: Scalars['String']['output'];
  kind: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentFolder?: Maybe<Scalars['String']['output']>;
};

/** Input Types for Initial State */
export type DocumentDrive_FolderNodeInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  kind?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  parentFolder?: InputMaybe<Scalars['String']['input']>;
};

/** Full state with all scopes for DocumentDrive */
export type DocumentDrive_FullState = {
  __typename?: 'DocumentDrive_FullState';
  auth: Scalars['JSONObject']['output'];
  document: DocumentDrive_PhDocumentScopeState;
  global: DocumentDrive_DocumentDriveState;
  local: DocumentDrive_DocumentDriveLocalState;
};

export type DocumentDrive_InitialStateInput = {
  global?: InputMaybe<DocumentDrive_DocumentDriveStateInput>;
  local?: InputMaybe<DocumentDrive_DocumentDriveLocalStateInput>;
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

export type DocumentDrive_ListenerCallInfoInput = {
  data?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  transmitterType?: InputMaybe<DocumentDrive_TransmitterType>;
};

export type DocumentDrive_ListenerFilter = {
  __typename?: 'DocumentDrive_ListenerFilter';
  branch?: Maybe<Array<Scalars['String']['output']>>;
  documentId?: Maybe<Array<Scalars['ID']['output']>>;
  documentType: Array<Scalars['String']['output']>;
  scope?: Maybe<Array<Scalars['String']['output']>>;
};

export type DocumentDrive_ListenerFilterInput = {
  branch?: InputMaybe<Array<Scalars['String']['input']>>;
  documentId?: InputMaybe<Array<Scalars['ID']['input']>>;
  documentType?: InputMaybe<Array<Scalars['String']['input']>>;
  scope?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentDrive_ListenerInput = {
  block: Scalars['Boolean']['input'];
  callInfo?: InputMaybe<DocumentDrive_ListenerCallInfoInput>;
  filter: DocumentDrive_ListenerFilterInput;
  label?: InputMaybe<Scalars['String']['input']>;
  listenerId: Scalars['ID']['input'];
  system: Scalars['Boolean']['input'];
};

export type DocumentDrive_MoveNodeInput = {
  srcFolder: Scalars['ID']['input'];
  targetParentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_Node = DocumentDrive_FileNode | DocumentDrive_FolderNode;

/** Document scope state (same for all document types) */
export type DocumentDrive_PhDocumentScopeState = {
  __typename?: 'DocumentDrive_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: DocumentDrive_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type DocumentDrive_PhHashConfig = {
  __typename?: 'DocumentDrive_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type DocumentDrive_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentDrive_PullResponderTriggerData = {
  __typename?: 'DocumentDrive_PullResponderTriggerData';
  interval: Scalars['String']['output'];
  listenerId: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type DocumentDrive_PullResponderTriggerDataInput = {
  interval: Scalars['String']['input'];
  listenerId: Scalars['ID']['input'];
  url: Scalars['String']['input'];
};

export type DocumentDrive_RemoveListenerInput = {
  listenerId: Scalars['String']['input'];
};

export type DocumentDrive_RemoveTriggerInput = {
  triggerId: Scalars['String']['input'];
};

export type DocumentDrive_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentDrive_SetAvailableOfflineInput = {
  availableOffline: Scalars['Boolean']['input'];
};

export type DocumentDrive_SetDriveIconInput = {
  icon: Scalars['String']['input'];
};

/** Module: Drive */
export type DocumentDrive_SetDriveNameInput = {
  name: Scalars['String']['input'];
};

export type DocumentDrive_SetSharingTypeInput = {
  type: Scalars['String']['input'];
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

export type DocumentDrive_TriggerInput = {
  data?: InputMaybe<DocumentDrive_PullResponderTriggerDataInput>;
  id: Scalars['ID']['input'];
  type: DocumentDrive_TriggerType;
};

export enum DocumentDrive_TriggerType {
  PullResponder = 'PullResponder'
}

export type DocumentDrive_UpdateFileInput = {
  documentType?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_UpdateNodeInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  parentFolder?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentDrive_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

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

export type DocumentModelGlobalState = {
  __typename?: 'DocumentModelGlobalState';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  namespace?: Maybe<Scalars['String']['output']>;
  specification: Scalars['JSONObject']['output'];
  version?: Maybe<Scalars['String']['output']>;
};

/**
 * Mutation result type for DocumentModel operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type DocumentModelMutationResult = {
  __typename?: 'DocumentModelMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: DocumentModel_FullState;
};

/** Mutations: DocumentModel */
export type DocumentModelMutations = {
  __typename?: 'DocumentModelMutations';
  addChangeLogItem: DocumentModelMutationResult;
  addChangeLogItemAsync: Scalars['String']['output'];
  addModule: DocumentModelMutationResult;
  addModuleAsync: Scalars['String']['output'];
  addOperation: DocumentModelMutationResult;
  addOperationAsync: Scalars['String']['output'];
  addOperationError: DocumentModelMutationResult;
  addOperationErrorAsync: Scalars['String']['output'];
  addOperationExample: DocumentModelMutationResult;
  addOperationExampleAsync: Scalars['String']['output'];
  addStateExample: DocumentModelMutationResult;
  addStateExampleAsync: Scalars['String']['output'];
  createDocument: DocumentModelMutationResult;
  createEmptyDocument: DocumentModelMutationResult;
  deleteChangeLogItem: DocumentModelMutationResult;
  deleteChangeLogItemAsync: Scalars['String']['output'];
  deleteModule: DocumentModelMutationResult;
  deleteModuleAsync: Scalars['String']['output'];
  deleteOperation: DocumentModelMutationResult;
  deleteOperationAsync: Scalars['String']['output'];
  deleteOperationError: DocumentModelMutationResult;
  deleteOperationErrorAsync: Scalars['String']['output'];
  deleteOperationExample: DocumentModelMutationResult;
  deleteOperationExampleAsync: Scalars['String']['output'];
  deleteStateExample: DocumentModelMutationResult;
  deleteStateExampleAsync: Scalars['String']['output'];
  moveOperation: DocumentModelMutationResult;
  moveOperationAsync: Scalars['String']['output'];
  reorderChangeLogItems: DocumentModelMutationResult;
  reorderChangeLogItemsAsync: Scalars['String']['output'];
  reorderModuleOperations: DocumentModelMutationResult;
  reorderModuleOperationsAsync: Scalars['String']['output'];
  reorderModules: DocumentModelMutationResult;
  reorderModulesAsync: Scalars['String']['output'];
  reorderOperationErrors: DocumentModelMutationResult;
  reorderOperationErrorsAsync: Scalars['String']['output'];
  reorderOperationExamples: DocumentModelMutationResult;
  reorderOperationExamplesAsync: Scalars['String']['output'];
  reorderStateExamples: DocumentModelMutationResult;
  reorderStateExamplesAsync: Scalars['String']['output'];
  setAuthorName: DocumentModelMutationResult;
  setAuthorNameAsync: Scalars['String']['output'];
  setAuthorWebsite: DocumentModelMutationResult;
  setAuthorWebsiteAsync: Scalars['String']['output'];
  setInitialState: DocumentModelMutationResult;
  setInitialStateAsync: Scalars['String']['output'];
  setModelDescription: DocumentModelMutationResult;
  setModelDescriptionAsync: Scalars['String']['output'];
  setModelExtension: DocumentModelMutationResult;
  setModelExtensionAsync: Scalars['String']['output'];
  setModelId: DocumentModelMutationResult;
  setModelIdAsync: Scalars['String']['output'];
  setModelName: DocumentModelMutationResult;
  setModelNameAsync: Scalars['String']['output'];
  setModuleDescription: DocumentModelMutationResult;
  setModuleDescriptionAsync: Scalars['String']['output'];
  setModuleName: DocumentModelMutationResult;
  setModuleNameAsync: Scalars['String']['output'];
  setOperationDescription: DocumentModelMutationResult;
  setOperationDescriptionAsync: Scalars['String']['output'];
  setOperationErrorCode: DocumentModelMutationResult;
  setOperationErrorCodeAsync: Scalars['String']['output'];
  setOperationErrorDescription: DocumentModelMutationResult;
  setOperationErrorDescriptionAsync: Scalars['String']['output'];
  setOperationErrorName: DocumentModelMutationResult;
  setOperationErrorNameAsync: Scalars['String']['output'];
  setOperationErrorTemplate: DocumentModelMutationResult;
  setOperationErrorTemplateAsync: Scalars['String']['output'];
  setOperationName: DocumentModelMutationResult;
  setOperationNameAsync: Scalars['String']['output'];
  setOperationReducer: DocumentModelMutationResult;
  setOperationReducerAsync: Scalars['String']['output'];
  setOperationSchema: DocumentModelMutationResult;
  setOperationSchemaAsync: Scalars['String']['output'];
  setOperationScope: DocumentModelMutationResult;
  setOperationScopeAsync: Scalars['String']['output'];
  setOperationTemplate: DocumentModelMutationResult;
  setOperationTemplateAsync: Scalars['String']['output'];
  setStateSchema: DocumentModelMutationResult;
  setStateSchemaAsync: Scalars['String']['output'];
  updateChangeLogItem: DocumentModelMutationResult;
  updateChangeLogItemAsync: Scalars['String']['output'];
  updateOperationExample: DocumentModelMutationResult;
  updateOperationExampleAsync: Scalars['String']['output'];
  updateStateExample: DocumentModelMutationResult;
  updateStateExampleAsync: Scalars['String']['output'];
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddChangeLogItemArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddChangeLogItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddModuleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddModuleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddModuleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddModuleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationErrorArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationErrorInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationErrorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationErrorInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddOperationExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddStateExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsAddStateExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_AddStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<DocumentModel_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteChangeLogItemArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteChangeLogItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteModuleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteModuleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteModuleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteModuleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationErrorArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationErrorInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationErrorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationErrorInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteOperationExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteStateExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsDeleteStateExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_DeleteStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsMoveOperationArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_MoveOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsMoveOperationAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_MoveOperationInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderChangeLogItemsArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderChangeLogItemsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderChangeLogItemsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderChangeLogItemsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderModuleOperationsArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderModuleOperationsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderModuleOperationsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderModuleOperationsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderModulesArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderModulesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderModulesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderModulesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderOperationErrorsArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderOperationErrorsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderOperationErrorsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderOperationErrorsInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderOperationExamplesArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderOperationExamplesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderOperationExamplesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderOperationExamplesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderStateExamplesArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderStateExamplesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsReorderStateExamplesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_ReorderStateExamplesInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetAuthorNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetAuthorNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetAuthorNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetAuthorNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetAuthorWebsiteArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetAuthorWebsiteInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetAuthorWebsiteAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetAuthorWebsiteInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetInitialStateArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetInitialStateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetInitialStateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetInitialStateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelExtensionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelExtensionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelExtensionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelExtensionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelIdArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelIdInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelIdAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelIdInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModelNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModelNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModuleDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModuleDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModuleDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModuleDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModuleNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModuleNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetModuleNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetModuleNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorCodeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorCodeInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorCodeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorCodeInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorDescriptionInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorTemplateArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorTemplateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationErrorTemplateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationErrorTemplateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationNameArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationNameInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationReducerArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationReducerInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationReducerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationReducerInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationSchemaArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationSchemaInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationSchemaAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationSchemaInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationScopeArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationScopeInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationScopeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationScopeInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationTemplateArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationTemplateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetOperationTemplateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetOperationTemplateInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetStateSchemaArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetStateSchemaInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsSetStateSchemaAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_SetStateSchemaInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateChangeLogItemArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateChangeLogItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateChangeLogItemInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateOperationExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateOperationExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateOperationExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateStateExampleArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateStateExampleInput;
};


/** Mutations: DocumentModel */
export type DocumentModelMutationsUpdateStateExampleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: DocumentModel_UpdateStateExampleInput;
};

/** Queries: DocumentModel Document */
export type DocumentModelQueries = {
  __typename?: 'DocumentModelQueries';
  /** Get all DocumentModel documents (paged) */
  DocumentModel_documents: DocumentModel_DocumentResultPage;
  /** Get a specific DocumentModel document by identifier */
  document?: Maybe<DocumentModel_DocumentWithChildren>;
  /** Get children of a DocumentModel document */
  documentChildren: DocumentModel_DocumentResultPage;
  /** Get parents of a DocumentModel document */
  documentParents: DocumentModel_DocumentResultPage;
  /** Find DocumentModel documents by search criteria */
  findDocuments: DocumentModel_DocumentResultPage;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesDocumentModel_DocumentsArgs = {
  paging?: InputMaybe<DocumentModel_PagingInput>;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentModel_ViewFilterInput>;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<DocumentModel_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<DocumentModel_ViewFilterInput>;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<DocumentModel_PagingInput>;
  view?: InputMaybe<DocumentModel_ViewFilterInput>;
};


/** Queries: DocumentModel Document */
export type DocumentModelQueriesFindDocumentsArgs = {
  paging?: InputMaybe<DocumentModel_PagingInput>;
  search: DocumentModel_SearchFilterInput;
  view?: InputMaybe<DocumentModel_ViewFilterInput>;
};

export type DocumentModelResultPage = {
  __typename?: 'DocumentModelResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<DocumentModelGlobalState>;
  totalCount: Scalars['Int']['output'];
};

/** Module: Versioning */
export type DocumentModel_AddChangeLogItemInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  insertBefore?: InputMaybe<Scalars['ID']['input']>;
};

/** Module: Module */
export type DocumentModel_AddModuleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

/** Module: OperationError */
export type DocumentModel_AddOperationErrorInput = {
  errorCode?: InputMaybe<Scalars['String']['input']>;
  errorDescription?: InputMaybe<Scalars['String']['input']>;
  errorName?: InputMaybe<Scalars['String']['input']>;
  errorTemplate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  operationId: Scalars['ID']['input'];
};

/** Module: OperationExample */
export type DocumentModel_AddOperationExampleInput = {
  example: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  operationId: Scalars['ID']['input'];
};

/** Module: Operation */
export type DocumentModel_AddOperationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  moduleId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  reducer?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_AddStateExampleInput = {
  example: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  insertBefore?: InputMaybe<Scalars['ID']['input']>;
  scope: Scalars['String']['input'];
};

export type DocumentModel_Author = {
  __typename?: 'DocumentModel_Author';
  name: Scalars['String']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export type DocumentModel_AuthorInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_CodeExample = {
  __typename?: 'DocumentModel_CodeExample';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

/** Input Types for Initial State */
export type DocumentModel_CodeExampleInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_DeleteChangeLogItemInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteModuleInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteOperationErrorInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteOperationExampleInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteOperationInput = {
  id: Scalars['ID']['input'];
};

export type DocumentModel_DeleteStateExampleInput = {
  id: Scalars['ID']['input'];
  scope: Scalars['String']['input'];
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

export type DocumentModel_DocumentModelGlobalStateInput = {
  author?: InputMaybe<DocumentModel_AuthorInput>;
  description?: InputMaybe<Scalars['String']['input']>;
  extension?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  specifications?: InputMaybe<Array<InputMaybe<DocumentModel_DocumentSpecificationInput>>>;
};

/** Paginated result type for DocumentModel documents */
export type DocumentModel_DocumentResultPage = {
  __typename?: 'DocumentModel_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<DocumentModelMutationResult>;
  totalCount: Scalars['Int']['output'];
};

export type DocumentModel_DocumentSpecification = {
  __typename?: 'DocumentModel_DocumentSpecification';
  changeLog: Array<Scalars['String']['output']>;
  modules: Array<DocumentModel_Module>;
  state: DocumentModel_ScopeState;
  version: Scalars['Int']['output'];
};

export type DocumentModel_DocumentSpecificationInput = {
  changeLog?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  modules?: InputMaybe<Array<InputMaybe<DocumentModel_ModuleInput>>>;
  state?: InputMaybe<DocumentModel_ScopeStateInput>;
  version?: InputMaybe<Scalars['Int']['input']>;
};

/** Document with children for DocumentModel */
export type DocumentModel_DocumentWithChildren = {
  __typename?: 'DocumentModel_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: DocumentModelMutationResult;
};

/** Full state with all scopes for DocumentModel */
export type DocumentModel_FullState = {
  __typename?: 'DocumentModel_FullState';
  auth: Scalars['JSONObject']['output'];
  document: DocumentModel_PhDocumentScopeState;
  global: DocumentModel_DocumentModelGlobalState;
  local: Scalars['JSONObject']['output'];
};

export type DocumentModel_InitialStateInput = {
  global?: InputMaybe<DocumentModel_DocumentModelGlobalStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type DocumentModel_Module = {
  __typename?: 'DocumentModel_Module';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  operations: Array<DocumentModel_Operation>;
};

export type DocumentModel_ModuleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  operations?: InputMaybe<Array<InputMaybe<DocumentModel_OperationInput>>>;
};

export type DocumentModel_MoveOperationInput = {
  newModuleId: Scalars['ID']['input'];
  operationId: Scalars['ID']['input'];
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

export type DocumentModel_OperationErrorInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_OperationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  errors?: InputMaybe<Array<InputMaybe<DocumentModel_OperationErrorInput>>>;
  examples?: InputMaybe<Array<InputMaybe<DocumentModel_CodeExampleInput>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  reducer?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  template?: InputMaybe<Scalars['String']['input']>;
};

/** Document scope state (same for all document types) */
export type DocumentModel_PhDocumentScopeState = {
  __typename?: 'DocumentModel_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: DocumentModel_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type DocumentModel_PhHashConfig = {
  __typename?: 'DocumentModel_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type DocumentModel_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type DocumentModel_ReorderChangeLogItemsInput = {
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderModuleOperationsInput = {
  moduleId: Scalars['ID']['input'];
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderModulesInput = {
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderOperationErrorsInput = {
  operationId: Scalars['ID']['input'];
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderOperationExamplesInput = {
  operationId: Scalars['ID']['input'];
  order: Array<Scalars['ID']['input']>;
};

export type DocumentModel_ReorderStateExamplesInput = {
  order: Array<Scalars['ID']['input']>;
  scope: Scalars['String']['input'];
};

export type DocumentModel_ScopeState = {
  __typename?: 'DocumentModel_ScopeState';
  global: DocumentModel_State;
  local: DocumentModel_State;
};

export type DocumentModel_ScopeStateInput = {
  global?: InputMaybe<DocumentModel_StateInput>;
  local?: InputMaybe<DocumentModel_StateInput>;
};

export type DocumentModel_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetAuthorNameInput = {
  authorName: Scalars['String']['input'];
};

export type DocumentModel_SetAuthorWebsiteInput = {
  authorWebsite: Scalars['String']['input'];
};

export type DocumentModel_SetInitialStateInput = {
  initialValue: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type DocumentModel_SetModelDescriptionInput = {
  description: Scalars['String']['input'];
};

export type DocumentModel_SetModelExtensionInput = {
  extension: Scalars['String']['input'];
};

export type DocumentModel_SetModelIdInput = {
  id: Scalars['String']['input'];
};

/** Module: Header */
export type DocumentModel_SetModelNameInput = {
  name: Scalars['String']['input'];
};

export type DocumentModel_SetModuleDescriptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetModuleNameInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationDescriptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationErrorCodeInput = {
  errorCode?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationErrorDescriptionInput = {
  errorDescription?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationErrorNameInput = {
  errorName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationErrorTemplateInput = {
  errorTemplate?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type DocumentModel_SetOperationNameInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationReducerInput = {
  id: Scalars['ID']['input'];
  reducer?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationSchemaInput = {
  id: Scalars['ID']['input'];
  schema?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationScopeInput = {
  id: Scalars['ID']['input'];
  scope?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_SetOperationTemplateInput = {
  id: Scalars['ID']['input'];
  template?: InputMaybe<Scalars['String']['input']>;
};

/** Module: State */
export type DocumentModel_SetStateSchemaInput = {
  schema: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type DocumentModel_State = {
  __typename?: 'DocumentModel_State';
  examples: Array<DocumentModel_CodeExample>;
  initialValue: Scalars['String']['output'];
  schema: Scalars['String']['output'];
};

export type DocumentModel_StateInput = {
  examples?: InputMaybe<Array<InputMaybe<DocumentModel_CodeExampleInput>>>;
  initialValue?: InputMaybe<Scalars['String']['input']>;
  schema?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentModel_UpdateChangeLogItemInput = {
  id: Scalars['ID']['input'];
  newContent: Scalars['String']['input'];
};

export type DocumentModel_UpdateOperationExampleInput = {
  example: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};

export type DocumentModel_UpdateStateExampleInput = {
  id: Scalars['ID']['input'];
  newExample: Scalars['String']['input'];
  scope: Scalars['String']['input'];
};

export type DocumentModel_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type DocumentOperationsFilterInput = {
  actionTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
  sinceRevision?: InputMaybe<Scalars['Int']['input']>;
  timestampFrom?: InputMaybe<Scalars['String']['input']>;
  timestampTo?: InputMaybe<Scalars['String']['input']>;
};

export type DocumentWithChildren = {
  __typename?: 'DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: PhDocument;
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

/**
 * Mutation result type for ExpenseReport operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ExpenseReportMutationResult = {
  __typename?: 'ExpenseReportMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ExpenseReport_FullState;
};

/** Mutations: ExpenseReport */
export type ExpenseReportMutations = {
  __typename?: 'ExpenseReportMutations';
  addBillingStatement: ExpenseReportMutationResult;
  addBillingStatementAsync: Scalars['String']['output'];
  addLineItem: ExpenseReportMutationResult;
  addLineItemAsync: Scalars['String']['output'];
  addLineItemGroup: ExpenseReportMutationResult;
  addLineItemGroupAsync: Scalars['String']['output'];
  addWallet: ExpenseReportMutationResult;
  addWalletAsync: Scalars['String']['output'];
  createDocument: ExpenseReportMutationResult;
  createEmptyDocument: ExpenseReportMutationResult;
  removeBillingStatement: ExpenseReportMutationResult;
  removeBillingStatementAsync: Scalars['String']['output'];
  removeGroupTotals: ExpenseReportMutationResult;
  removeGroupTotalsAsync: Scalars['String']['output'];
  removeLineItem: ExpenseReportMutationResult;
  removeLineItemAsync: Scalars['String']['output'];
  removeLineItemGroup: ExpenseReportMutationResult;
  removeLineItemGroupAsync: Scalars['String']['output'];
  removeWallet: ExpenseReportMutationResult;
  removeWalletAsync: Scalars['String']['output'];
  setGroupTotals: ExpenseReportMutationResult;
  setGroupTotalsAsync: Scalars['String']['output'];
  setOwnerId: ExpenseReportMutationResult;
  setOwnerIdAsync: Scalars['String']['output'];
  setPeriod: ExpenseReportMutationResult;
  setPeriodAsync: Scalars['String']['output'];
  setPeriodEnd: ExpenseReportMutationResult;
  setPeriodEndAsync: Scalars['String']['output'];
  setPeriodStart: ExpenseReportMutationResult;
  setPeriodStartAsync: Scalars['String']['output'];
  setStatus: ExpenseReportMutationResult;
  setStatusAsync: Scalars['String']['output'];
  updateLineItem: ExpenseReportMutationResult;
  updateLineItemAsync: Scalars['String']['output'];
  updateLineItemGroup: ExpenseReportMutationResult;
  updateLineItemGroupAsync: Scalars['String']['output'];
  updateWallet: ExpenseReportMutationResult;
  updateWalletAsync: Scalars['String']['output'];
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsAddBillingStatementArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_AddBillingStatementInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsAddBillingStatementAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_AddBillingStatementInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsAddLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_AddLineItemInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsAddLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_AddLineItemInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsAddLineItemGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_AddLineItemGroupInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsAddLineItemGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_AddLineItemGroupInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsAddWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_AddWalletInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsAddWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_AddWalletInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ExpenseReport_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveBillingStatementArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveBillingStatementInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveBillingStatementAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveBillingStatementInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveGroupTotalsArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveGroupTotalsInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveGroupTotalsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveGroupTotalsInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveLineItemInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveLineItemInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveLineItemGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveLineItemGroupInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveLineItemGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveLineItemGroupInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveWalletInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsRemoveWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_RemoveWalletInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetGroupTotalsArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetGroupTotalsInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetGroupTotalsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetGroupTotalsInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetOwnerIdArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetOwnerIdInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetOwnerIdAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetOwnerIdInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetPeriodArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetPeriodInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetPeriodAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetPeriodInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetPeriodEndArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetPeriodEndInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetPeriodEndAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetPeriodEndInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetPeriodStartArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetPeriodStartInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetPeriodStartAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetPeriodStartInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetStatusInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsSetStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_SetStatusInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsUpdateLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_UpdateLineItemInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsUpdateLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_UpdateLineItemInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsUpdateLineItemGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_UpdateLineItemGroupInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsUpdateLineItemGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_UpdateLineItemGroupInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsUpdateWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_UpdateWalletInput;
};


/** Mutations: ExpenseReport */
export type ExpenseReportMutationsUpdateWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ExpenseReport_UpdateWalletInput;
};

/** Queries: ExpenseReport Document */
export type ExpenseReportQueries = {
  __typename?: 'ExpenseReportQueries';
  /** Get all ExpenseReport documents (paged) */
  ExpenseReport_documents: ExpenseReport_DocumentResultPage;
  /** Get a specific ExpenseReport document by identifier */
  document?: Maybe<ExpenseReport_DocumentWithChildren>;
  /** Get children of a ExpenseReport document */
  documentChildren: ExpenseReport_DocumentResultPage;
  /** Get parents of a ExpenseReport document */
  documentParents: ExpenseReport_DocumentResultPage;
  /** Find ExpenseReport documents by search criteria */
  findDocuments: ExpenseReport_DocumentResultPage;
};


/** Queries: ExpenseReport Document */
export type ExpenseReportQueriesExpenseReport_DocumentsArgs = {
  paging?: InputMaybe<ExpenseReport_PagingInput>;
};


/** Queries: ExpenseReport Document */
export type ExpenseReportQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ExpenseReport_ViewFilterInput>;
};


/** Queries: ExpenseReport Document */
export type ExpenseReportQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ExpenseReport_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ExpenseReport_ViewFilterInput>;
};


/** Queries: ExpenseReport Document */
export type ExpenseReportQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ExpenseReport_PagingInput>;
  view?: InputMaybe<ExpenseReport_ViewFilterInput>;
};


/** Queries: ExpenseReport Document */
export type ExpenseReportQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ExpenseReport_PagingInput>;
  search: ExpenseReport_SearchFilterInput;
  view?: InputMaybe<ExpenseReport_ViewFilterInput>;
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

/** Paginated result type for ExpenseReport documents */
export type ExpenseReport_DocumentResultPage = {
  __typename?: 'ExpenseReport_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ExpenseReportMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for ExpenseReport */
export type ExpenseReport_DocumentWithChildren = {
  __typename?: 'ExpenseReport_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ExpenseReportMutationResult;
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

/** Input Types for Initial State */
export type ExpenseReport_ExpenseReportStateInput = {
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  groups?: InputMaybe<Array<InputMaybe<ExpenseReport_LineItemGroupInput>>>;
  ownerId?: InputMaybe<Scalars['PHID']['input']>;
  periodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  periodStart?: InputMaybe<Scalars['DateTime']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ExpenseReport_ExpenseReportStatus>;
  wallets?: InputMaybe<Array<InputMaybe<ExpenseReport_WalletInput>>>;
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

/** Full state with all scopes for ExpenseReport */
export type ExpenseReport_FullState = {
  __typename?: 'ExpenseReport_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ExpenseReport_PhDocumentScopeState;
  global: ExpenseReport_ExpenseReportState;
  local: Scalars['JSONObject']['output'];
};

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

export type ExpenseReport_InitialStateInput = {
  global?: InputMaybe<ExpenseReport_ExpenseReportStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
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

export type ExpenseReport_LineItemGroupInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
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

/** Document scope state (same for all document types) */
export type ExpenseReport_PhDocumentScopeState = {
  __typename?: 'ExpenseReport_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ExpenseReport_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ExpenseReport_PhHashConfig = {
  __typename?: 'ExpenseReport_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type ExpenseReport_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type ExpenseReport_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
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

export type ExpenseReport_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type ExpenseReport_WalletInput = {
  accountDocumentId?: InputMaybe<Scalars['PHID']['input']>;
  accountTransactionsDocumentId?: InputMaybe<Scalars['PHID']['input']>;
  billingStatements?: InputMaybe<Array<InputMaybe<Scalars['OID']['input']>>>;
  lineItems?: InputMaybe<Array<InputMaybe<ExpenseReport_LineItemInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  totals?: InputMaybe<Array<InputMaybe<ExpenseReport_GroupTotalsInput>>>;
  wallet?: InputMaybe<Scalars['EthereumAddress']['input']>;
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

/**
 * Mutation result type for Facet operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type FacetMutationResult = {
  __typename?: 'FacetMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Facet_FullState;
};

/** Mutations: Facet */
export type FacetMutations = {
  __typename?: 'FacetMutations';
  addOption: FacetMutationResult;
  addOptionAsync: Scalars['String']['output'];
  createDocument: FacetMutationResult;
  createEmptyDocument: FacetMutationResult;
  removeOption: FacetMutationResult;
  removeOptionAsync: Scalars['String']['output'];
  reorderOptions: FacetMutationResult;
  reorderOptionsAsync: Scalars['String']['output'];
  setFacetDescription: FacetMutationResult;
  setFacetDescriptionAsync: Scalars['String']['output'];
  setFacetName: FacetMutationResult;
  setFacetNameAsync: Scalars['String']['output'];
  updateOption: FacetMutationResult;
  updateOptionAsync: Scalars['String']['output'];
};


/** Mutations: Facet */
export type FacetMutationsAddOptionArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_AddOptionInput;
};


/** Mutations: Facet */
export type FacetMutationsAddOptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_AddOptionInput;
};


/** Mutations: Facet */
export type FacetMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<Facet_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Facet */
export type FacetMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Facet */
export type FacetMutationsRemoveOptionArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_RemoveOptionInput;
};


/** Mutations: Facet */
export type FacetMutationsRemoveOptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_RemoveOptionInput;
};


/** Mutations: Facet */
export type FacetMutationsReorderOptionsArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_ReorderOptionsInput;
};


/** Mutations: Facet */
export type FacetMutationsReorderOptionsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_ReorderOptionsInput;
};


/** Mutations: Facet */
export type FacetMutationsSetFacetDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_SetFacetDescriptionInput;
};


/** Mutations: Facet */
export type FacetMutationsSetFacetDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_SetFacetDescriptionInput;
};


/** Mutations: Facet */
export type FacetMutationsSetFacetNameArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_SetFacetNameInput;
};


/** Mutations: Facet */
export type FacetMutationsSetFacetNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_SetFacetNameInput;
};


/** Mutations: Facet */
export type FacetMutationsUpdateOptionArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_UpdateOptionInput;
};


/** Mutations: Facet */
export type FacetMutationsUpdateOptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Facet_UpdateOptionInput;
};

/** Queries: Facet Document */
export type FacetQueries = {
  __typename?: 'FacetQueries';
  /** Get all Facet documents (paged) */
  Facet_documents: Facet_DocumentResultPage;
  /** Get a specific Facet document by identifier */
  document?: Maybe<Facet_DocumentWithChildren>;
  /** Get children of a Facet document */
  documentChildren: Facet_DocumentResultPage;
  /** Get parents of a Facet document */
  documentParents: Facet_DocumentResultPage;
  /** Find Facet documents by search criteria */
  findDocuments: Facet_DocumentResultPage;
};


/** Queries: Facet Document */
export type FacetQueriesFacet_DocumentsArgs = {
  paging?: InputMaybe<Facet_PagingInput>;
};


/** Queries: Facet Document */
export type FacetQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<Facet_ViewFilterInput>;
};


/** Queries: Facet Document */
export type FacetQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<Facet_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<Facet_ViewFilterInput>;
};


/** Queries: Facet Document */
export type FacetQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<Facet_PagingInput>;
  view?: InputMaybe<Facet_ViewFilterInput>;
};


/** Queries: Facet Document */
export type FacetQueriesFindDocumentsArgs = {
  paging?: InputMaybe<Facet_PagingInput>;
  search: Facet_SearchFilterInput;
  view?: InputMaybe<Facet_ViewFilterInput>;
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

/** Paginated result type for Facet documents */
export type Facet_DocumentResultPage = {
  __typename?: 'Facet_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<FacetMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for Facet */
export type Facet_DocumentWithChildren = {
  __typename?: 'Facet_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: FacetMutationResult;
};

export type Facet_FacetOption = {
  __typename?: 'Facet_FacetOption';
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  isDefault: Scalars['Boolean']['output'];
  label: Scalars['String']['output'];
};

export type Facet_FacetOptionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  isDefault?: InputMaybe<Scalars['Boolean']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
};

export type Facet_FacetState = {
  __typename?: 'Facet_FacetState';
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['PHID']['output']>;
  lastModified?: Maybe<Scalars['DateTime']['output']>;
  name: Scalars['String']['output'];
  options: Array<Facet_FacetOption>;
};

/** Input Types for Initial State */
export type Facet_FacetStateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  lastModified?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  options?: InputMaybe<Array<InputMaybe<Facet_FacetOptionInput>>>;
};

/** Full state with all scopes for Facet */
export type Facet_FullState = {
  __typename?: 'Facet_FullState';
  auth: Scalars['JSONObject']['output'];
  document: Facet_PhDocumentScopeState;
  global: Facet_FacetState;
  local: Scalars['JSONObject']['output'];
};

export type Facet_InitialStateInput = {
  global?: InputMaybe<Facet_FacetStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type Facet_PhDocumentScopeState = {
  __typename?: 'Facet_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: Facet_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type Facet_PhHashConfig = {
  __typename?: 'Facet_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type Facet_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Facet_RemoveOptionInput = {
  id: Scalars['OID']['input'];
  lastModified: Scalars['DateTime']['input'];
};

export type Facet_ReorderOptionsInput = {
  lastModified: Scalars['DateTime']['input'];
  optionIds: Array<Scalars['OID']['input']>;
};

export type Facet_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
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

export type Facet_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

/**
 * Mutation result type for Invoice operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type InvoiceMutationResult = {
  __typename?: 'InvoiceMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Invoice_FullState;
};

/** Mutations: Invoice */
export type InvoiceMutations = {
  __typename?: 'InvoiceMutations';
  accept: InvoiceMutationResult;
  acceptAsync: Scalars['String']['output'];
  addLineItem: InvoiceMutationResult;
  addLineItemAsync: Scalars['String']['output'];
  addPayment: InvoiceMutationResult;
  addPaymentAsync: Scalars['String']['output'];
  cancel: InvoiceMutationResult;
  cancelAsync: Scalars['String']['output'];
  closePayment: InvoiceMutationResult;
  closePaymentAsync: Scalars['String']['output'];
  confirmPayment: InvoiceMutationResult;
  confirmPaymentAsync: Scalars['String']['output'];
  createDocument: InvoiceMutationResult;
  createEmptyDocument: InvoiceMutationResult;
  deleteLineItem: InvoiceMutationResult;
  deleteLineItemAsync: Scalars['String']['output'];
  editInvoice: InvoiceMutationResult;
  editInvoiceAsync: Scalars['String']['output'];
  editIssuer: InvoiceMutationResult;
  editIssuerAsync: Scalars['String']['output'];
  editIssuerBank: InvoiceMutationResult;
  editIssuerBankAsync: Scalars['String']['output'];
  editIssuerWallet: InvoiceMutationResult;
  editIssuerWalletAsync: Scalars['String']['output'];
  editLineItem: InvoiceMutationResult;
  editLineItemAsync: Scalars['String']['output'];
  editPayer: InvoiceMutationResult;
  editPayerAsync: Scalars['String']['output'];
  editPayerBank: InvoiceMutationResult;
  editPayerBankAsync: Scalars['String']['output'];
  editPayerWallet: InvoiceMutationResult;
  editPayerWalletAsync: Scalars['String']['output'];
  editPaymentData: InvoiceMutationResult;
  editPaymentDataAsync: Scalars['String']['output'];
  editStatus: InvoiceMutationResult;
  editStatusAsync: Scalars['String']['output'];
  issue: InvoiceMutationResult;
  issueAsync: Scalars['String']['output'];
  reapprovePayment: InvoiceMutationResult;
  reapprovePaymentAsync: Scalars['String']['output'];
  registerPaymentTx: InvoiceMutationResult;
  registerPaymentTxAsync: Scalars['String']['output'];
  reinstate: InvoiceMutationResult;
  reinstateAsync: Scalars['String']['output'];
  reject: InvoiceMutationResult;
  rejectAsync: Scalars['String']['output'];
  reportPaymentIssue: InvoiceMutationResult;
  reportPaymentIssueAsync: Scalars['String']['output'];
  reset: InvoiceMutationResult;
  resetAsync: Scalars['String']['output'];
  schedulePayment: InvoiceMutationResult;
  schedulePaymentAsync: Scalars['String']['output'];
  setExportedData: InvoiceMutationResult;
  setExportedDataAsync: Scalars['String']['output'];
  setInvoiceTag: InvoiceMutationResult;
  setInvoiceTagAsync: Scalars['String']['output'];
  setLineItemTag: InvoiceMutationResult;
  setLineItemTagAsync: Scalars['String']['output'];
};


/** Mutations: Invoice */
export type InvoiceMutationsAcceptArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_AcceptInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsAcceptAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_AcceptInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsAddLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_AddLineItemInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsAddLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_AddLineItemInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsAddPaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_AddPaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsAddPaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_AddPaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsCancelArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_CancelInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsCancelAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_CancelInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsClosePaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ClosePaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsClosePaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ClosePaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsConfirmPaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ConfirmPaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsConfirmPaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ConfirmPaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<Invoice_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Invoice */
export type InvoiceMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Invoice */
export type InvoiceMutationsDeleteLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_DeleteLineItemInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsDeleteLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_DeleteLineItemInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditInvoiceArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditInvoiceInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditInvoiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditInvoiceInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditIssuerArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditIssuerInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditIssuerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditIssuerInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditIssuerBankArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditIssuerBankInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditIssuerBankAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditIssuerBankInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditIssuerWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditIssuerWalletInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditIssuerWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditIssuerWalletInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditLineItemArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditLineItemInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditLineItemAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditLineItemInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditPayerArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditPayerInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditPayerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditPayerInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditPayerBankArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditPayerBankInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditPayerBankAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditPayerBankInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditPayerWalletArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditPayerWalletInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditPayerWalletAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditPayerWalletInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditPaymentDataArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditPaymentDataInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditPaymentDataAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditPaymentDataInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditStatusInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsEditStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_EditStatusInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsIssueArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_IssueInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsIssueAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_IssueInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsReapprovePaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ReapprovePaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsReapprovePaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ReapprovePaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsRegisterPaymentTxArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_RegisterPaymentTxInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsRegisterPaymentTxAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_RegisterPaymentTxInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsReinstateArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ReinstateInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsReinstateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ReinstateInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsRejectArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_RejectInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsRejectAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_RejectInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsReportPaymentIssueArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ReportPaymentIssueInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsReportPaymentIssueAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ReportPaymentIssueInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsResetArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ResetInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsResetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_ResetInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsSchedulePaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_SchedulePaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsSchedulePaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_SchedulePaymentInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsSetExportedDataArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_SetExportedDataInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsSetExportedDataAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_SetExportedDataInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsSetInvoiceTagArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_SetInvoiceTagInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsSetInvoiceTagAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_SetInvoiceTagInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsSetLineItemTagArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_SetLineItemTagInput;
};


/** Mutations: Invoice */
export type InvoiceMutationsSetLineItemTagAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Invoice_SetLineItemTagInput;
};

/** Queries: Invoice Document */
export type InvoiceQueries = {
  __typename?: 'InvoiceQueries';
  /** Get all Invoice documents (paged) */
  Invoice_documents: Invoice_DocumentResultPage;
  /** Get a specific Invoice document by identifier */
  document?: Maybe<Invoice_DocumentWithChildren>;
  /** Get children of a Invoice document */
  documentChildren: Invoice_DocumentResultPage;
  /** Get parents of a Invoice document */
  documentParents: Invoice_DocumentResultPage;
  /** Find Invoice documents by search criteria */
  findDocuments: Invoice_DocumentResultPage;
};


/** Queries: Invoice Document */
export type InvoiceQueriesInvoice_DocumentsArgs = {
  paging?: InputMaybe<Invoice_PagingInput>;
};


/** Queries: Invoice Document */
export type InvoiceQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<Invoice_ViewFilterInput>;
};


/** Queries: Invoice Document */
export type InvoiceQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<Invoice_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<Invoice_ViewFilterInput>;
};


/** Queries: Invoice Document */
export type InvoiceQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<Invoice_PagingInput>;
  view?: InputMaybe<Invoice_ViewFilterInput>;
};


/** Queries: Invoice Document */
export type InvoiceQueriesFindDocumentsArgs = {
  paging?: InputMaybe<Invoice_PagingInput>;
  search: Invoice_SearchFilterInput;
  view?: InputMaybe<Invoice_ViewFilterInput>;
};

/** Module: Transitions */
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

export type Invoice_AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  extendedAddress?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  stateProvince?: InputMaybe<Scalars['String']['input']>;
  streetAddress?: InputMaybe<Scalars['String']['input']>;
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

export type Invoice_BankInput = {
  ABA?: InputMaybe<Scalars['String']['input']>;
  BIC?: InputMaybe<Scalars['String']['input']>;
  SWIFT?: InputMaybe<Scalars['String']['input']>;
  accountNum?: InputMaybe<Scalars['String']['input']>;
  accountType?: InputMaybe<Invoice_InvoiceAccountType>;
  address?: InputMaybe<Invoice_AddressInput>;
  beneficiary?: InputMaybe<Scalars['String']['input']>;
  intermediaryBank?: InputMaybe<Invoice_IntermediaryBankInput>;
  memo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

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

export type Invoice_ContactInfoInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  tel?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_DeleteLineItemInput = {
  id: Scalars['OID']['input'];
};

/** Paginated result type for Invoice documents */
export type Invoice_DocumentResultPage = {
  __typename?: 'Invoice_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<InvoiceMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for Invoice */
export type Invoice_DocumentWithChildren = {
  __typename?: 'Invoice_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: InvoiceMutationResult;
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

/** Module: Parties */
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

export type Invoice_ExportedDataInput = {
  exportedLineItems?: InputMaybe<Array<InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>>>;
  timestamp?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Full state with all scopes for Invoice */
export type Invoice_FullState = {
  __typename?: 'Invoice_FullState';
  auth: Scalars['JSONObject']['output'];
  document: Invoice_PhDocumentScopeState;
  global: Invoice_InvoiceState;
  local: Scalars['JSONObject']['output'];
};

export type Invoice_InitialStateInput = {
  global?: InputMaybe<Invoice_InvoiceStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
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

export type Invoice_IntermediaryBankInput = {
  ABA?: InputMaybe<Scalars['String']['input']>;
  BIC?: InputMaybe<Scalars['String']['input']>;
  SWIFT?: InputMaybe<Scalars['String']['input']>;
  accountNum?: InputMaybe<Scalars['String']['input']>;
  accountType?: InputMaybe<Invoice_InvoiceAccountType>;
  address?: InputMaybe<Invoice_AddressInput>;
  beneficiary?: InputMaybe<Scalars['String']['input']>;
  memo?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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

export type Invoice_InvoiceLineItemInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  lineItemTag?: InputMaybe<Array<InputMaybe<Invoice_InvoiceTagInput>>>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  taxPercent?: InputMaybe<Scalars['Float']['input']>;
  totalPriceTaxExcl?: InputMaybe<Scalars['Float']['input']>;
  totalPriceTaxIncl?: InputMaybe<Scalars['Float']['input']>;
  unitPriceTaxExcl?: InputMaybe<Scalars['Float']['input']>;
  unitPriceTaxIncl?: InputMaybe<Scalars['Float']['input']>;
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

/** Input Types for Initial State */
export type Invoice_InvoiceStateInput = {
  closureReason?: InputMaybe<Invoice_ClosureReason>;
  currency?: InputMaybe<Scalars['String']['input']>;
  dateDelivered?: InputMaybe<Scalars['Date']['input']>;
  dateDue?: InputMaybe<Scalars['Date']['input']>;
  dateIssued?: InputMaybe<Scalars['Date']['input']>;
  exported?: InputMaybe<Invoice_ExportedDataInput>;
  invoiceNo?: InputMaybe<Scalars['String']['input']>;
  invoiceTags?: InputMaybe<Array<InputMaybe<Invoice_InvoiceTagInput>>>;
  issuer?: InputMaybe<Invoice_LegalEntityInput>;
  lineItems?: InputMaybe<Array<InputMaybe<Invoice_InvoiceLineItemInput>>>;
  notes?: InputMaybe<Scalars['String']['input']>;
  payAfter?: InputMaybe<Scalars['DateTime']['input']>;
  payer?: InputMaybe<Invoice_LegalEntityInput>;
  payments?: InputMaybe<Array<InputMaybe<Invoice_PaymentInput>>>;
  rejections?: InputMaybe<Array<InputMaybe<Invoice_RejectionInput>>>;
  status?: InputMaybe<Invoice_Status>;
  totalPriceTaxExcl?: InputMaybe<Scalars['Float']['input']>;
  totalPriceTaxIncl?: InputMaybe<Scalars['Float']['input']>;
};

export type Invoice_InvoiceTag = {
  __typename?: 'Invoice_InvoiceTag';
  dimension: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type Invoice_InvoiceTagInput = {
  dimension?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_InvoiceWallet = {
  __typename?: 'Invoice_InvoiceWallet';
  address?: Maybe<Scalars['String']['output']>;
  chainId?: Maybe<Scalars['String']['output']>;
  chainName?: Maybe<Scalars['String']['output']>;
  rpc?: Maybe<Scalars['String']['output']>;
};

export type Invoice_InvoiceWalletInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  chainId?: InputMaybe<Scalars['String']['input']>;
  chainName?: InputMaybe<Scalars['String']['input']>;
  rpc?: InputMaybe<Scalars['String']['input']>;
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

export type Invoice_LegalEntityId = {
  __typename?: 'Invoice_LegalEntityId';
  corpRegId?: Maybe<Scalars['String']['output']>;
  taxId?: Maybe<Scalars['String']['output']>;
};

export type Invoice_LegalEntityIdInput = {
  corpRegId?: InputMaybe<Scalars['String']['input']>;
  taxId?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_LegalEntityInput = {
  address?: InputMaybe<Invoice_AddressInput>;
  contactInfo?: InputMaybe<Invoice_ContactInfoInput>;
  country?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Invoice_LegalEntityIdInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  paymentRouting?: InputMaybe<Invoice_PaymentRoutingInput>;
};

/** Document scope state (same for all document types) */
export type Invoice_PhDocumentScopeState = {
  __typename?: 'Invoice_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: Invoice_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type Invoice_PhHashConfig = {
  __typename?: 'Invoice_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type Invoice_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type Invoice_PaymentInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  confirmed?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  issue?: InputMaybe<Scalars['String']['input']>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  processorRef?: InputMaybe<Scalars['String']['input']>;
  txnRef?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_PaymentRouting = {
  __typename?: 'Invoice_PaymentRouting';
  bank?: Maybe<Invoice_Bank>;
  wallet?: Maybe<Invoice_InvoiceWallet>;
};

export type Invoice_PaymentRoutingInput = {
  bank?: InputMaybe<Invoice_BankInput>;
  wallet?: InputMaybe<Invoice_InvoiceWalletInput>;
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

export type Invoice_RejectionInput = {
  final?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
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
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  processorRef: Scalars['String']['input'];
};

export type Invoice_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
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

export type Invoice_TokenInput = {
  chainId?: InputMaybe<Scalars['String']['input']>;
  chainName?: InputMaybe<Scalars['String']['input']>;
  evmAddress?: InputMaybe<Scalars['String']['input']>;
  rpc?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
};

export type Invoice_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type JobChangeEvent = {
  __typename?: 'JobChangeEvent';
  error?: Maybe<Scalars['String']['output']>;
  jobId: Scalars['String']['output'];
  result: Scalars['JSONObject']['output'];
  status: Scalars['String']['output'];
};

export type JobInfo = {
  __typename?: 'JobInfo';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  result: Scalars['JSONObject']['output'];
  status: Scalars['String']['output'];
};

export type LinkedDocument = {
  __typename?: 'LinkedDocument';
  id: Scalars['PHID']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};

export type MoveChildrenResult = {
  __typename?: 'MoveChildrenResult';
  source: PhDocument;
  target: PhDocument;
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
  AccountTransactions: AccountTransactionsMutations;
  AccountTransactions_fetchTransactionsFromAlchemy?: Maybe<AccountTransactions_AlchemyFetchResult>;
  AccountTransactions_getTransactionsFromAlchemy?: Maybe<AccountTransactions_AlchemyTransactionsResult>;
  Accounts: AccountsMutations;
  BillingStatement: BillingStatementMutations;
  BuilderProfile: BuilderProfileMutations;
  Builders: BuildersMutations;
  DocumentDrive: DocumentDriveMutations;
  DocumentModel: DocumentModelMutations;
  ExpenseReport: ExpenseReportMutations;
  Facet: FacetMutations;
  Invoice: InvoiceMutations;
  Invoice_createRequestFinancePayment?: Maybe<CreateRequestFinancePaymentOutput>;
  Invoice_processGnosisPayment?: Maybe<ProcessGnosisPaymentOutput>;
  Invoice_uploadInvoicePdfChunk?: Maybe<UploadInvoicePdfChunkOutput>;
  NetworkProfile: NetworkProfileMutations;
  OperationalHubProfile: OperationalHubProfileMutations;
  PaymentTerms: PaymentTermsMutations;
  RequestForProposals: RequestForProposalsMutations;
  ResourceInstance: ResourceInstanceMutations;
  ResourceTemplate: ResourceTemplateMutations;
  ScopeOfWork: ScopeOfWorkMutations;
  ServiceOffering: ServiceOfferingMutations;
  SnapshotReport: SnapshotReportMutations;
  SubscriptionInstance: SubscriptionInstanceMutations;
  Workstream: WorkstreamMutations;
  addChildren: PhDocument;
  createDocument: PhDocument;
  createEmptyDocument: PhDocument;
  createProductInstances?: Maybe<CreateProductInstancesOutput>;
  deleteDocument: Scalars['Boolean']['output'];
  deleteDocuments: Scalars['Boolean']['output'];
  moveChildren: MoveChildrenResult;
  mutateDocument: PhDocument;
  mutateDocumentAsync: Scalars['String']['output'];
  pushSyncEnvelopes: Scalars['Boolean']['output'];
  removeChildren: PhDocument;
  renameDocument: PhDocument;
  touchChannel: TouchChannelResult;
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
export type MutationInvoice_CreateRequestFinancePaymentArgs = {
  paymentData: Scalars['JSONObject']['input'];
};


/** Subgraph definition */
export type MutationInvoice_ProcessGnosisPaymentArgs = {
  chainName: Scalars['String']['input'];
  invoiceNo: Scalars['String']['input'];
  paymentDetails: Scalars['JSONObject']['input'];
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
export type MutationAddChildrenArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  documentIdentifiers: Array<Scalars['String']['input']>;
  parentIdentifier: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationCreateDocumentArgs = {
  document: Scalars['JSONObject']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Subgraph definition */
export type MutationCreateEmptyDocumentArgs = {
  documentType: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Subgraph definition */
export type MutationCreateProductInstancesArgs = {
  input: CreateProductInstancesInput;
};


/** Subgraph definition */
export type MutationDeleteDocumentArgs = {
  identifier: Scalars['String']['input'];
  propagate?: InputMaybe<PropagationMode>;
};


/** Subgraph definition */
export type MutationDeleteDocumentsArgs = {
  identifiers: Array<Scalars['String']['input']>;
  propagate?: InputMaybe<PropagationMode>;
};


/** Subgraph definition */
export type MutationMoveChildrenArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  documentIdentifiers: Array<Scalars['String']['input']>;
  sourceParentIdentifier: Scalars['String']['input'];
  targetParentIdentifier: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationMutateDocumentArgs = {
  actions: Array<Scalars['JSONObject']['input']>;
  documentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ViewFilterInput>;
};


/** Subgraph definition */
export type MutationMutateDocumentAsyncArgs = {
  actions: Array<Scalars['JSONObject']['input']>;
  documentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ViewFilterInput>;
};


/** Subgraph definition */
export type MutationPushSyncEnvelopesArgs = {
  envelopes: Array<SyncEnvelopeInput>;
};


/** Subgraph definition */
export type MutationRemoveChildrenArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  documentIdentifiers: Array<Scalars['String']['input']>;
  parentIdentifier: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationRenameDocumentArgs = {
  branch?: InputMaybe<Scalars['String']['input']>;
  documentIdentifier: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


/** Subgraph definition */
export type MutationTouchChannelArgs = {
  input: TouchChannelInput;
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

/**
 * Mutation result type for NetworkProfile operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type NetworkProfileMutationResult = {
  __typename?: 'NetworkProfileMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: NetworkProfile_FullState;
};

/** Mutations: NetworkProfile */
export type NetworkProfileMutations = {
  __typename?: 'NetworkProfileMutations';
  createDocument: NetworkProfileMutationResult;
  createEmptyDocument: NetworkProfileMutationResult;
  setCategory: NetworkProfileMutationResult;
  setCategoryAsync: Scalars['String']['output'];
  setDescription: NetworkProfileMutationResult;
  setDescriptionAsync: Scalars['String']['output'];
  setDiscord: NetworkProfileMutationResult;
  setDiscordAsync: Scalars['String']['output'];
  setGithub: NetworkProfileMutationResult;
  setGithubAsync: Scalars['String']['output'];
  setIcon: NetworkProfileMutationResult;
  setIconAsync: Scalars['String']['output'];
  setLogo: NetworkProfileMutationResult;
  setLogoAsync: Scalars['String']['output'];
  setLogoBig: NetworkProfileMutationResult;
  setLogoBigAsync: Scalars['String']['output'];
  setProfileName: NetworkProfileMutationResult;
  setProfileNameAsync: Scalars['String']['output'];
  setWebsite: NetworkProfileMutationResult;
  setWebsiteAsync: Scalars['String']['output'];
  setX: NetworkProfileMutationResult;
  setXAsync: Scalars['String']['output'];
  setYoutube: NetworkProfileMutationResult;
  setYoutubeAsync: Scalars['String']['output'];
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<NetworkProfile_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetCategoryArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetCategoryInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetCategoryAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetCategoryInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetDescriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetDescriptionInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetDescriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetDescriptionInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetDiscordArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetDiscordInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetDiscordAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetDiscordInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetGithubArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetGithubInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetGithubAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetGithubInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetIconArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetIconInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetIconAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetIconInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetLogoArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetLogoInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetLogoAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetLogoInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetLogoBigArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetLogoBigInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetLogoBigAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetLogoBigInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetProfileNameArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetProfileNameInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetProfileNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetProfileNameInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetWebsiteArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetWebsiteInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetWebsiteAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetWebsiteInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetXArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetXInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetXAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetXInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetYoutubeArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetYoutubeInput;
};


/** Mutations: NetworkProfile */
export type NetworkProfileMutationsSetYoutubeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: NetworkProfile_SetYoutubeInput;
};

/** Queries: NetworkProfile Document */
export type NetworkProfileQueries = {
  __typename?: 'NetworkProfileQueries';
  /** Get all NetworkProfile documents (paged) */
  NetworkProfile_documents: NetworkProfile_DocumentResultPage;
  /** Get a specific NetworkProfile document by identifier */
  document?: Maybe<NetworkProfile_DocumentWithChildren>;
  /** Get children of a NetworkProfile document */
  documentChildren: NetworkProfile_DocumentResultPage;
  /** Get parents of a NetworkProfile document */
  documentParents: NetworkProfile_DocumentResultPage;
  /** Find NetworkProfile documents by search criteria */
  findDocuments: NetworkProfile_DocumentResultPage;
};


/** Queries: NetworkProfile Document */
export type NetworkProfileQueriesNetworkProfile_DocumentsArgs = {
  paging?: InputMaybe<NetworkProfile_PagingInput>;
};


/** Queries: NetworkProfile Document */
export type NetworkProfileQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<NetworkProfile_ViewFilterInput>;
};


/** Queries: NetworkProfile Document */
export type NetworkProfileQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<NetworkProfile_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<NetworkProfile_ViewFilterInput>;
};


/** Queries: NetworkProfile Document */
export type NetworkProfileQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<NetworkProfile_PagingInput>;
  view?: InputMaybe<NetworkProfile_ViewFilterInput>;
};


/** Queries: NetworkProfile Document */
export type NetworkProfileQueriesFindDocumentsArgs = {
  paging?: InputMaybe<NetworkProfile_PagingInput>;
  search: NetworkProfile_SearchFilterInput;
  view?: InputMaybe<NetworkProfile_ViewFilterInput>;
};

/** Paginated result type for NetworkProfile documents */
export type NetworkProfile_DocumentResultPage = {
  __typename?: 'NetworkProfile_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<NetworkProfileMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for NetworkProfile */
export type NetworkProfile_DocumentWithChildren = {
  __typename?: 'NetworkProfile_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: NetworkProfileMutationResult;
};

/** Full state with all scopes for NetworkProfile */
export type NetworkProfile_FullState = {
  __typename?: 'NetworkProfile_FullState';
  auth: Scalars['JSONObject']['output'];
  document: NetworkProfile_PhDocumentScopeState;
  global: NetworkProfile_NetworkProfileState;
  local: Scalars['JSONObject']['output'];
};

export type NetworkProfile_InitialStateInput = {
  global?: InputMaybe<NetworkProfile_NetworkProfileStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
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

/** Input Types for Initial State */
export type NetworkProfile_NetworkProfileStateInput = {
  category?: InputMaybe<Array<InputMaybe<NetworkProfile_NetworkCategory>>>;
  darkThemeIcon?: InputMaybe<Scalars['String']['input']>;
  darkThemeLogo?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discord?: InputMaybe<Scalars['String']['input']>;
  github?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  logo?: InputMaybe<Scalars['String']['input']>;
  logoBig?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  x?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

/** Document scope state (same for all document types) */
export type NetworkProfile_PhDocumentScopeState = {
  __typename?: 'NetworkProfile_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: NetworkProfile_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type NetworkProfile_PhHashConfig = {
  __typename?: 'NetworkProfile_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type NetworkProfile_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type NetworkProfile_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
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

export type NetworkProfile_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type OperationContext = {
  __typename?: 'OperationContext';
  branch: Scalars['String']['output'];
  documentId: Scalars['String']['output'];
  documentType: Scalars['String']['output'];
  ordinal: Scalars['Int']['output'];
  scope: Scalars['String']['output'];
};

export type OperationContextInput = {
  branch: Scalars['String']['input'];
  documentId: Scalars['String']['input'];
  documentType: Scalars['String']['input'];
  ordinal: Scalars['Int']['input'];
  scope: Scalars['String']['input'];
};

export type OperationInput = {
  action: ActionInput;
  error?: InputMaybe<Scalars['String']['input']>;
  hash: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  index: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
  timestampUtcMs: Scalars['String']['input'];
};

export type OperationWithContext = {
  __typename?: 'OperationWithContext';
  context: OperationContext;
  operation: ReactorOperation;
};

export type OperationWithContextInput = {
  context: OperationContextInput;
  operation: OperationInput;
};

export type OperationalHubMember = {
  __typename?: 'OperationalHubMember';
  name?: Maybe<Scalars['String']['output']>;
  phid?: Maybe<Scalars['PHID']['output']>;
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

/**
 * Mutation result type for OperationalHubProfile operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type OperationalHubProfileMutationResult = {
  __typename?: 'OperationalHubProfileMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: OperationalHubProfile_FullState;
};

/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutations = {
  __typename?: 'OperationalHubProfileMutations';
  addSubteam: OperationalHubProfileMutationResult;
  addSubteamAsync: Scalars['String']['output'];
  createDocument: OperationalHubProfileMutationResult;
  createEmptyDocument: OperationalHubProfileMutationResult;
  removeSubteam: OperationalHubProfileMutationResult;
  removeSubteamAsync: Scalars['String']['output'];
  setOperationalHubName: OperationalHubProfileMutationResult;
  setOperationalHubNameAsync: Scalars['String']['output'];
  setOperatorTeam: OperationalHubProfileMutationResult;
  setOperatorTeamAsync: Scalars['String']['output'];
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsAddSubteamArgs = {
  docId: Scalars['PHID']['input'];
  input: OperationalHubProfile_AddSubteamInput;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsAddSubteamAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OperationalHubProfile_AddSubteamInput;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<OperationalHubProfile_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsRemoveSubteamArgs = {
  docId: Scalars['PHID']['input'];
  input: OperationalHubProfile_RemoveSubteamInput;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsRemoveSubteamAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OperationalHubProfile_RemoveSubteamInput;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsSetOperationalHubNameArgs = {
  docId: Scalars['PHID']['input'];
  input: OperationalHubProfile_SetOperationalHubNameInput;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsSetOperationalHubNameAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OperationalHubProfile_SetOperationalHubNameInput;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsSetOperatorTeamArgs = {
  docId: Scalars['PHID']['input'];
  input: OperationalHubProfile_SetOperatorTeamInput;
};


/** Mutations: OperationalHubProfile */
export type OperationalHubProfileMutationsSetOperatorTeamAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: OperationalHubProfile_SetOperatorTeamInput;
};

/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueries = {
  __typename?: 'OperationalHubProfileQueries';
  /** Get all OperationalHubProfile documents (paged) */
  OperationalHubProfile_documents: OperationalHubProfile_DocumentResultPage;
  /** Get a specific OperationalHubProfile document by identifier */
  document?: Maybe<OperationalHubProfile_DocumentWithChildren>;
  /** Get children of a OperationalHubProfile document */
  documentChildren: OperationalHubProfile_DocumentResultPage;
  /** Get parents of a OperationalHubProfile document */
  documentParents: OperationalHubProfile_DocumentResultPage;
  /** Find OperationalHubProfile documents by search criteria */
  findDocuments: OperationalHubProfile_DocumentResultPage;
};


/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueriesOperationalHubProfile_DocumentsArgs = {
  paging?: InputMaybe<OperationalHubProfile_PagingInput>;
};


/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<OperationalHubProfile_ViewFilterInput>;
};


/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<OperationalHubProfile_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<OperationalHubProfile_ViewFilterInput>;
};


/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<OperationalHubProfile_PagingInput>;
  view?: InputMaybe<OperationalHubProfile_ViewFilterInput>;
};


/** Queries: OperationalHubProfile Document */
export type OperationalHubProfileQueriesFindDocumentsArgs = {
  paging?: InputMaybe<OperationalHubProfile_PagingInput>;
  search: OperationalHubProfile_SearchFilterInput;
  view?: InputMaybe<OperationalHubProfile_ViewFilterInput>;
};

export type OperationalHubProfile_AddSubteamInput = {
  subteam: Scalars['PHID']['input'];
};

/** Paginated result type for OperationalHubProfile documents */
export type OperationalHubProfile_DocumentResultPage = {
  __typename?: 'OperationalHubProfile_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<OperationalHubProfileMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for OperationalHubProfile */
export type OperationalHubProfile_DocumentWithChildren = {
  __typename?: 'OperationalHubProfile_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: OperationalHubProfileMutationResult;
};

/** Full state with all scopes for OperationalHubProfile */
export type OperationalHubProfile_FullState = {
  __typename?: 'OperationalHubProfile_FullState';
  auth: Scalars['JSONObject']['output'];
  document: OperationalHubProfile_PhDocumentScopeState;
  global: OperationalHubProfile_OperationalHubProfileState;
  local: Scalars['JSONObject']['output'];
};

export type OperationalHubProfile_InitialStateInput = {
  global?: InputMaybe<OperationalHubProfile_OperationalHubProfileStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type OperationalHubProfile_OperationalHubProfileState = {
  __typename?: 'OperationalHubProfile_OperationalHubProfileState';
  name: Scalars['String']['output'];
  operatorTeam?: Maybe<Scalars['PHID']['output']>;
  subteams: Array<Scalars['PHID']['output']>;
};

/** Input Types for Initial State */
export type OperationalHubProfile_OperationalHubProfileStateInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  operatorTeam?: InputMaybe<Scalars['PHID']['input']>;
  subteams?: InputMaybe<Array<InputMaybe<Scalars['PHID']['input']>>>;
};

/** Document scope state (same for all document types) */
export type OperationalHubProfile_PhDocumentScopeState = {
  __typename?: 'OperationalHubProfile_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: OperationalHubProfile_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type OperationalHubProfile_PhHashConfig = {
  __typename?: 'OperationalHubProfile_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type OperationalHubProfile_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type OperationalHubProfile_RemoveSubteamInput = {
  subteam: Scalars['PHID']['input'];
};

export type OperationalHubProfile_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: Configuration */
export type OperationalHubProfile_SetOperationalHubNameInput = {
  name: Scalars['String']['input'];
};

export type OperationalHubProfile_SetOperatorTeamInput = {
  operatorTeam?: InputMaybe<Scalars['PHID']['input']>;
};

export type OperationalHubProfile_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type OperationsFilterInput = {
  actionTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  branch?: InputMaybe<Scalars['String']['input']>;
  documentId: Scalars['String']['input'];
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
  sinceRevision?: InputMaybe<Scalars['Int']['input']>;
  timestampFrom?: InputMaybe<Scalars['String']['input']>;
  timestampTo?: InputMaybe<Scalars['String']['input']>;
};

export type PhDocument = {
  __typename?: 'PHDocument';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations?: Maybe<ReactorOperationResultPage>;
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Scalars['JSONObject']['output'];
};


export type PhDocumentOperationsArgs = {
  filter?: InputMaybe<DocumentOperationsFilterInput>;
  paging?: InputMaybe<PagingInput>;
};

export type PhDocumentResultPage = {
  __typename?: 'PHDocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<PhDocument>;
  totalCount: Scalars['Int']['output'];
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

export type PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

/**
 * Mutation result type for PaymentTerms operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type PaymentTermsMutationResult = {
  __typename?: 'PaymentTermsMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: PaymentTerms_FullState;
};

/** Mutations: PaymentTerms */
export type PaymentTermsMutations = {
  __typename?: 'PaymentTermsMutations';
  addBonusClause: PaymentTermsMutationResult;
  addBonusClauseAsync: Scalars['String']['output'];
  addMilestone: PaymentTermsMutationResult;
  addMilestoneAsync: Scalars['String']['output'];
  addPenaltyClause: PaymentTermsMutationResult;
  addPenaltyClauseAsync: Scalars['String']['output'];
  createDocument: PaymentTermsMutationResult;
  createEmptyDocument: PaymentTermsMutationResult;
  deleteBonusClause: PaymentTermsMutationResult;
  deleteBonusClauseAsync: Scalars['String']['output'];
  deleteMilestone: PaymentTermsMutationResult;
  deleteMilestoneAsync: Scalars['String']['output'];
  deletePenaltyClause: PaymentTermsMutationResult;
  deletePenaltyClauseAsync: Scalars['String']['output'];
  reorderMilestones: PaymentTermsMutationResult;
  reorderMilestonesAsync: Scalars['String']['output'];
  setBasicTerms: PaymentTermsMutationResult;
  setBasicTermsAsync: Scalars['String']['output'];
  setCostAndMaterials: PaymentTermsMutationResult;
  setCostAndMaterialsAsync: Scalars['String']['output'];
  setEscrowDetails: PaymentTermsMutationResult;
  setEscrowDetailsAsync: Scalars['String']['output'];
  setEvaluationTerms: PaymentTermsMutationResult;
  setEvaluationTermsAsync: Scalars['String']['output'];
  setRetainerDetails: PaymentTermsMutationResult;
  setRetainerDetailsAsync: Scalars['String']['output'];
  updateBonusClause: PaymentTermsMutationResult;
  updateBonusClauseAsync: Scalars['String']['output'];
  updateMilestone: PaymentTermsMutationResult;
  updateMilestoneAsync: Scalars['String']['output'];
  updateMilestoneStatus: PaymentTermsMutationResult;
  updateMilestoneStatusAsync: Scalars['String']['output'];
  updatePenaltyClause: PaymentTermsMutationResult;
  updatePenaltyClauseAsync: Scalars['String']['output'];
  updateStatus: PaymentTermsMutationResult;
  updateStatusAsync: Scalars['String']['output'];
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsAddBonusClauseArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_AddBonusClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsAddBonusClauseAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_AddBonusClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsAddMilestoneArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_AddMilestoneInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsAddMilestoneAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_AddMilestoneInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsAddPenaltyClauseArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_AddPenaltyClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsAddPenaltyClauseAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_AddPenaltyClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<PaymentTerms_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsDeleteBonusClauseArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_DeleteBonusClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsDeleteBonusClauseAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_DeleteBonusClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsDeleteMilestoneArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_DeleteMilestoneInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsDeleteMilestoneAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_DeleteMilestoneInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsDeletePenaltyClauseArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_DeletePenaltyClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsDeletePenaltyClauseAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_DeletePenaltyClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsReorderMilestonesArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_ReorderMilestonesInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsReorderMilestonesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_ReorderMilestonesInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetBasicTermsArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetBasicTermsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetBasicTermsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetBasicTermsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetCostAndMaterialsArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetCostAndMaterialsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetCostAndMaterialsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetCostAndMaterialsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetEscrowDetailsArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetEscrowDetailsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetEscrowDetailsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetEscrowDetailsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetEvaluationTermsArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetEvaluationTermsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetEvaluationTermsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetEvaluationTermsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetRetainerDetailsArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetRetainerDetailsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsSetRetainerDetailsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_SetRetainerDetailsInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdateBonusClauseArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdateBonusClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdateBonusClauseAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdateBonusClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdateMilestoneArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdateMilestoneInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdateMilestoneAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdateMilestoneInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdateMilestoneStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdateMilestoneStatusInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdateMilestoneStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdateMilestoneStatusInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdatePenaltyClauseArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdatePenaltyClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdatePenaltyClauseAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdatePenaltyClauseInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdateStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdateStatusInput;
};


/** Mutations: PaymentTerms */
export type PaymentTermsMutationsUpdateStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: PaymentTerms_UpdateStatusInput;
};

/** Queries: PaymentTerms Document */
export type PaymentTermsQueries = {
  __typename?: 'PaymentTermsQueries';
  /** Get all PaymentTerms documents (paged) */
  PaymentTerms_documents: PaymentTerms_DocumentResultPage;
  /** Get a specific PaymentTerms document by identifier */
  document?: Maybe<PaymentTerms_DocumentWithChildren>;
  /** Get children of a PaymentTerms document */
  documentChildren: PaymentTerms_DocumentResultPage;
  /** Get parents of a PaymentTerms document */
  documentParents: PaymentTerms_DocumentResultPage;
  /** Find PaymentTerms documents by search criteria */
  findDocuments: PaymentTerms_DocumentResultPage;
};


/** Queries: PaymentTerms Document */
export type PaymentTermsQueriesPaymentTerms_DocumentsArgs = {
  paging?: InputMaybe<PaymentTerms_PagingInput>;
};


/** Queries: PaymentTerms Document */
export type PaymentTermsQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<PaymentTerms_ViewFilterInput>;
};


/** Queries: PaymentTerms Document */
export type PaymentTermsQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<PaymentTerms_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<PaymentTerms_ViewFilterInput>;
};


/** Queries: PaymentTerms Document */
export type PaymentTermsQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<PaymentTerms_PagingInput>;
  view?: InputMaybe<PaymentTerms_ViewFilterInput>;
};


/** Queries: PaymentTerms Document */
export type PaymentTermsQueriesFindDocumentsArgs = {
  paging?: InputMaybe<PaymentTerms_PagingInput>;
  search: PaymentTerms_SearchFilterInput;
  view?: InputMaybe<PaymentTerms_ViewFilterInput>;
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

export type PaymentTerms_BonusClauseInput = {
  bonusAmount?: InputMaybe<Scalars['Amount']['input']>;
  comment?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
};

export type PaymentTerms_CostAndMaterials = {
  __typename?: 'PaymentTerms_CostAndMaterials';
  billingFrequency: PaymentTerms_BillingFrequency;
  hourlyRate?: Maybe<Scalars['Amount']['output']>;
  timesheetRequired: Scalars['Boolean']['output'];
  variableCap?: Maybe<Scalars['Amount']['output']>;
};

export type PaymentTerms_CostAndMaterialsInput = {
  billingFrequency?: InputMaybe<PaymentTerms_BillingFrequency>;
  hourlyRate?: InputMaybe<Scalars['Amount']['input']>;
  timesheetRequired?: InputMaybe<Scalars['Boolean']['input']>;
  variableCap?: InputMaybe<Scalars['Amount']['input']>;
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

/** Paginated result type for PaymentTerms documents */
export type PaymentTerms_DocumentResultPage = {
  __typename?: 'PaymentTerms_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<PaymentTermsMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for PaymentTerms */
export type PaymentTerms_DocumentWithChildren = {
  __typename?: 'PaymentTerms_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: PaymentTermsMutationResult;
};

export type PaymentTerms_Escrow = {
  __typename?: 'PaymentTerms_Escrow';
  amountHeld: Scalars['Amount']['output'];
  escrowProvider?: Maybe<Scalars['String']['output']>;
  proofOfFundsDocumentId?: Maybe<Scalars['String']['output']>;
  releaseConditions: Scalars['String']['output'];
};

export type PaymentTerms_EscrowInput = {
  amountHeld?: InputMaybe<Scalars['Amount']['input']>;
  escrowProvider?: InputMaybe<Scalars['String']['input']>;
  proofOfFundsDocumentId?: InputMaybe<Scalars['String']['input']>;
  releaseConditions?: InputMaybe<Scalars['String']['input']>;
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

export type PaymentTerms_EvaluationTermsInput = {
  commentsVisibleToClient?: InputMaybe<Scalars['Boolean']['input']>;
  criteria?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  evaluationFrequency?: InputMaybe<PaymentTerms_EvaluationFrequency>;
  evaluatorTeam?: InputMaybe<Scalars['String']['input']>;
  impactsPayout?: InputMaybe<Scalars['Boolean']['input']>;
  impactsReputation?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Full state with all scopes for PaymentTerms */
export type PaymentTerms_FullState = {
  __typename?: 'PaymentTerms_FullState';
  auth: Scalars['JSONObject']['output'];
  document: PaymentTerms_PhDocumentScopeState;
  global: PaymentTerms_PaymentTermsState;
  local: Scalars['JSONObject']['output'];
};

export type PaymentTerms_InitialStateInput = {
  global?: InputMaybe<PaymentTerms_PaymentTermsStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
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

/** Input Types for Initial State */
export type PaymentTerms_MilestoneInput = {
  amount?: InputMaybe<Scalars['Amount']['input']>;
  expectedCompletionDate?: InputMaybe<Scalars['Date']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  payoutStatus?: InputMaybe<PaymentTerms_MilestonePayoutStatus>;
  requiresApproval?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PaymentTerms_MilestonePayoutStatus {
  Approved = 'APPROVED',
  Paid = 'PAID',
  Pending = 'PENDING',
  ReadyForReview = 'READY_FOR_REVIEW',
  Rejected = 'REJECTED'
}

/** Document scope state (same for all document types) */
export type PaymentTerms_PhDocumentScopeState = {
  __typename?: 'PaymentTerms_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: PaymentTerms_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type PaymentTerms_PhHashConfig = {
  __typename?: 'PaymentTerms_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type PaymentTerms_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum PaymentTerms_PaymentCurrency {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export enum PaymentTerms_PaymentModel {
  CostAndMaterials = 'COST_AND_MATERIALS',
  Milestone = 'MILESTONE',
  Retainer = 'RETAINER'
}

export type PaymentTerms_PaymentTermsState = {
  __typename?: 'PaymentTerms_PaymentTermsState';
  bonusClauses: Array<PaymentTerms_BonusClause>;
  costAndMaterials?: Maybe<PaymentTerms_CostAndMaterials>;
  currency: PaymentTerms_PaymentCurrency;
  escrowDetails?: Maybe<PaymentTerms_Escrow>;
  evaluation?: Maybe<PaymentTerms_EvaluationTerms>;
  milestoneSchedule: Array<PaymentTerms_Milestone>;
  payer: Scalars['String']['output'];
  paymentModel: PaymentTerms_PaymentModel;
  penaltyClauses: Array<PaymentTerms_PenaltyClause>;
  proposer: Scalars['String']['output'];
  retainerDetails?: Maybe<PaymentTerms_Retainer>;
  status: PaymentTerms_PaymentTermsStatus;
  totalAmount?: Maybe<Scalars['Amount']['output']>;
};

export type PaymentTerms_PaymentTermsStateInput = {
  bonusClauses?: InputMaybe<Array<InputMaybe<PaymentTerms_BonusClauseInput>>>;
  costAndMaterials?: InputMaybe<PaymentTerms_CostAndMaterialsInput>;
  currency?: InputMaybe<PaymentTerms_PaymentCurrency>;
  escrowDetails?: InputMaybe<PaymentTerms_EscrowInput>;
  evaluation?: InputMaybe<PaymentTerms_EvaluationTermsInput>;
  milestoneSchedule?: InputMaybe<Array<InputMaybe<PaymentTerms_MilestoneInput>>>;
  payer?: InputMaybe<Scalars['String']['input']>;
  paymentModel?: InputMaybe<PaymentTerms_PaymentModel>;
  penaltyClauses?: InputMaybe<Array<InputMaybe<PaymentTerms_PenaltyClauseInput>>>;
  proposer?: InputMaybe<Scalars['String']['input']>;
  retainerDetails?: InputMaybe<PaymentTerms_RetainerInput>;
  status?: InputMaybe<PaymentTerms_PaymentTermsStatus>;
  totalAmount?: InputMaybe<Scalars['Amount']['input']>;
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

export type PaymentTerms_PenaltyClauseInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  deductionAmount?: InputMaybe<Scalars['Amount']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
};

export type PaymentTerms_ReorderMilestonesInput = {
  order: Array<Scalars['OID']['input']>;
};

export type PaymentTerms_Retainer = {
  __typename?: 'PaymentTerms_Retainer';
  autoRenew: Scalars['Boolean']['output'];
  billingFrequency: PaymentTerms_BillingFrequency;
  endDate?: Maybe<Scalars['Date']['output']>;
  retainerAmount: Scalars['Amount']['output'];
  servicesIncluded: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
};

export type PaymentTerms_RetainerInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  billingFrequency?: InputMaybe<PaymentTerms_BillingFrequency>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  retainerAmount?: InputMaybe<Scalars['Amount']['input']>;
  servicesIncluded?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['Date']['input']>;
};

export type PaymentTerms_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: Terms */
export type PaymentTerms_SetBasicTermsInput = {
  currency: PaymentTerms_PaymentCurrency;
  payer: Scalars['String']['input'];
  paymentModel: PaymentTerms_PaymentModel;
  proposer: Scalars['String']['input'];
  totalAmount?: InputMaybe<Scalars['Amount']['input']>;
};

export type PaymentTerms_SetCostAndMaterialsInput = {
  billingFrequency: PaymentTerms_BillingFrequency;
  hourlyRate?: InputMaybe<Scalars['Amount']['input']>;
  timesheetRequired: Scalars['Boolean']['input'];
  variableCap?: InputMaybe<Scalars['Amount']['input']>;
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

export type PaymentTerms_SetRetainerDetailsInput = {
  autoRenew: Scalars['Boolean']['input'];
  billingFrequency: PaymentTerms_BillingFrequency;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  retainerAmount: Scalars['Amount']['input'];
  servicesIncluded: Scalars['String']['input'];
  startDate: Scalars['Date']['input'];
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

export type PaymentTerms_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type PollSyncEnvelopesResult = {
  __typename?: 'PollSyncEnvelopesResult';
  ackOrdinal: Scalars['Int']['output'];
  deadLetters: Array<DeadLetterInfo>;
  envelopes: Array<SyncEnvelope>;
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

export enum PropagationMode {
  Cascade = 'CASCADE',
  Orphan = 'ORPHAN'
}

export type Proposal = {
  __typename?: 'Proposal';
  author: ProposalAuthor;
  id: Scalars['OID']['output'];
  paymentTerms?: Maybe<Scalars['PHID']['output']>;
  sow?: Maybe<Scalars['PHID']['output']>;
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
  AccountTransactions: AccountTransactionsQueries;
  Accounts: AccountsQueries;
  BillingStatement: BillingStatementQueries;
  BuilderProfile: BuilderProfileQueries;
  Builders: BuildersQueries;
  DocumentDrive: DocumentDriveQueries;
  DocumentModel: DocumentModelQueries;
  ExpenseReport: ExpenseReportQueries;
  Facet: FacetQueries;
  Invoice: InvoiceQueries;
  NetworkProfile: NetworkProfileQueries;
  OperationalHubProfile: OperationalHubProfileQueries;
  PaymentTerms: PaymentTermsQueries;
  RequestForProposals: RequestForProposalsQueries;
  ResourceInstance: ResourceInstanceQueries;
  ResourceTemplate: ResourceTemplateQueries;
  ScopeOfWork: ScopeOfWorkQueries;
  ServiceOffering: ServiceOfferingQueries;
  SnapshotReport: SnapshotReportQueries;
  SubscriptionInstance: SubscriptionInstanceQueries;
  Workstream: WorkstreamQueries;
  allNetworks: Array<AllNetworks>;
  analytics?: Maybe<AnalyticsQuery>;
  budgetStatements: Array<BudgetStatement>;
  builders: Array<BuilderProfileState>;
  document?: Maybe<DocumentWithChildren>;
  documentChildren: PhDocumentResultPage;
  documentModels: DocumentModelResultPage;
  documentOperations: ReactorOperationResultPage;
  documentParents: PhDocumentResultPage;
  findDocuments: PhDocumentResultPage;
  jobStatus?: Maybe<JobInfo>;
  pollSyncEnvelopes: PollSyncEnvelopesResult;
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
export type QueryDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ViewFilterInput>;
};


/** Subgraph definition */
export type QueryDocumentChildrenArgs = {
  paging?: InputMaybe<PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ViewFilterInput>;
};


/** Subgraph definition */
export type QueryDocumentModelsArgs = {
  namespace?: InputMaybe<Scalars['String']['input']>;
  paging?: InputMaybe<PagingInput>;
};


/** Subgraph definition */
export type QueryDocumentOperationsArgs = {
  filter: OperationsFilterInput;
  paging?: InputMaybe<PagingInput>;
};


/** Subgraph definition */
export type QueryDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<PagingInput>;
  view?: InputMaybe<ViewFilterInput>;
};


/** Subgraph definition */
export type QueryFindDocumentsArgs = {
  paging?: InputMaybe<PagingInput>;
  search: SearchFilterInput;
  view?: InputMaybe<ViewFilterInput>;
};


/** Subgraph definition */
export type QueryJobStatusArgs = {
  jobId: Scalars['String']['input'];
};


/** Subgraph definition */
export type QueryPollSyncEnvelopesArgs = {
  channelId: Scalars['String']['input'];
  outboxAck: Scalars['Int']['input'];
  outboxLatest: Scalars['Int']['input'];
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
  title?: Maybe<Scalars['String']['output']>;
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

export enum RsAddOnPricingMode {
  Standalone = 'STANDALONE',
  TierDependent = 'TIER_DEPENDENT'
}

export enum RsBillingCycle {
  Annual = 'ANNUAL',
  Monthly = 'MONTHLY',
  OneTime = 'ONE_TIME',
  Quarterly = 'QUARTERLY',
  SemiAnnual = 'SEMI_ANNUAL'
}

export type RsBillingCycleDiscount = {
  __typename?: 'RSBillingCycleDiscount';
  billingCycle: RsBillingCycle;
  discountRule: RsDiscountRule;
};

export type RsContentSection = {
  __typename?: 'RSContentSection';
  content: Scalars['String']['output'];
  displayOrder: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  title: Scalars['String']['output'];
};

export enum RsDiscountMode {
  Independent = 'INDEPENDENT',
  InheritTier = 'INHERIT_TIER'
}

export type RsDiscountRule = {
  __typename?: 'RSDiscountRule';
  discountType: RsDiscountType;
  discountValue: Scalars['Float']['output'];
};

export enum RsDiscountType {
  FlatAmount = 'FLAT_AMOUNT',
  Percentage = 'PERCENTAGE'
}

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
  availableBillingCycles: Array<RsBillingCycle>;
  billingCycleDiscounts: Array<RsBillingCycleDiscount>;
  costType?: Maybe<RsGroupCostType>;
  currency?: Maybe<Scalars['Currency']['output']>;
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountMode?: Maybe<RsDiscountMode>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Amount_Money']['output']>;
  pricingMode?: Maybe<RsAddOnPricingMode>;
  standalonePricing?: Maybe<RsStandalonePricing>;
  tierDependentPricing?: Maybe<Array<RsOptionGroupTierPricing>>;
};

export type RsOfferingService = {
  __typename?: 'RSOfferingService';
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  isSetupFormation: Scalars['Boolean']['output'];
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  title: Scalars['String']['output'];
};

export type RsOptionGroup = {
  __typename?: 'RSOptionGroup';
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type RsOptionGroupTierPricing = {
  __typename?: 'RSOptionGroupTierPricing';
  id: Scalars['OID']['output'];
  recurringPricing: Array<RsRecurringPriceOption>;
  setupCost?: Maybe<RsSetupCost>;
  setupCostDiscounts: Array<RsBillingCycleDiscount>;
  tierId: Scalars['OID']['output'];
};

export type RsRecurringPriceOption = {
  __typename?: 'RSRecurringPriceOption';
  amount: Scalars['Amount_Money']['output'];
  billingCycle: RsBillingCycle;
  currency: Scalars['Currency']['output'];
  discount?: Maybe<RsDiscountRule>;
  id: Scalars['OID']['output'];
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
  availableBillingCycles: Array<RsBillingCycle>;
  description?: Maybe<Scalars['String']['output']>;
  facetTargets: Array<RsOfferingFacetTarget>;
  id: Scalars['PHID']['output'];
  infoLink?: Maybe<Scalars['URL']['output']>;
  lastModified: Scalars['DateTime']['output'];
  operatorId: Scalars['PHID']['output'];
  optionGroups: Array<RsOfferingOptionGroup>;
  resourceTemplateId?: Maybe<Scalars['PHID']['output']>;
  services: Array<RsOfferingService>;
  status: RsServiceStatus;
  summary: Scalars['String']['output'];
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
  billingCycleDiscounts: Array<RsBillingCycleDiscount>;
  defaultBillingCycle?: Maybe<RsBillingCycle>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isCustomPricing: Scalars['Boolean']['output'];
  mostPopular: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pricing: RsServicePricing;
  pricingMode?: Maybe<RsTierPricingMode>;
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

export type RsSetupCost = {
  __typename?: 'RSSetupCost';
  amount: Scalars['Amount_Money']['output'];
  currency: Scalars['Currency']['output'];
  discount?: Maybe<RsDiscountRule>;
};

export type RsStandalonePricing = {
  __typename?: 'RSStandalonePricing';
  recurringPricing: Array<RsRecurringPriceOption>;
  setupCost?: Maybe<RsSetupCost>;
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

export enum RsTierPricingMode {
  Calculated = 'CALCULATED',
  ManualOverride = 'MANUAL_OVERRIDE'
}

export enum RsUsageResetCycle {
  Annual = 'ANNUAL',
  Daily = 'DAILY',
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  None = 'NONE',
  Quarterly = 'QUARTERLY',
  SemiAnnual = 'SEMI_ANNUAL',
  Weekly = 'WEEKLY'
}

export type ReactorOperation = {
  __typename?: 'ReactorOperation';
  action: Action;
  error?: Maybe<Scalars['String']['output']>;
  hash: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
  index: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  timestampUtcMs: Scalars['String']['output'];
};

export type ReactorOperationResultPage = {
  __typename?: 'ReactorOperationResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ReactorOperation>;
  totalCount: Scalars['Int']['output'];
};

export type ReactorSigner = {
  __typename?: 'ReactorSigner';
  app?: Maybe<ReactorSignerApp>;
  signatures: Array<Scalars['String']['output']>;
  user?: Maybe<ReactorSignerUser>;
};

export type ReactorSignerApp = {
  __typename?: 'ReactorSignerApp';
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type ReactorSignerAppInput = {
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type ReactorSignerInput = {
  app?: InputMaybe<ReactorSignerAppInput>;
  signatures: Array<Scalars['String']['input']>;
  user?: InputMaybe<ReactorSignerUserInput>;
};

export type ReactorSignerUser = {
  __typename?: 'ReactorSignerUser';
  address: Scalars['String']['output'];
  chainId: Scalars['Int']['output'];
  networkId: Scalars['String']['output'];
};

export type ReactorSignerUserInput = {
  address: Scalars['String']['input'];
  chainId: Scalars['Int']['input'];
  networkId: Scalars['String']['input'];
};

export type RemoteCursor = {
  __typename?: 'RemoteCursor';
  cursorOrdinal: Scalars['Int']['output'];
  lastSyncedAtUtcMs?: Maybe<Scalars['String']['output']>;
  remoteName: Scalars['String']['output'];
};

export type RemoteCursorInput = {
  cursorOrdinal: Scalars['Int']['input'];
  lastSyncedAtUtcMs?: InputMaybe<Scalars['String']['input']>;
  remoteName: Scalars['String']['input'];
};

export type RemoteFilterInput = {
  branch: Scalars['String']['input'];
  documentId: Array<Scalars['String']['input']>;
  scope: Array<Scalars['String']['input']>;
};

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

/**
 * Mutation result type for RequestForProposals operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type RequestForProposalsMutationResult = {
  __typename?: 'RequestForProposalsMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: RequestForProposals_FullState;
};

/** Mutations: RequestForProposals */
export type RequestForProposalsMutations = {
  __typename?: 'RequestForProposalsMutations';
  addContextDocument: RequestForProposalsMutationResult;
  addContextDocumentAsync: Scalars['String']['output'];
  addProposal: RequestForProposalsMutationResult;
  addProposalAsync: Scalars['String']['output'];
  changeProposalStatus: RequestForProposalsMutationResult;
  changeProposalStatusAsync: Scalars['String']['output'];
  createDocument: RequestForProposalsMutationResult;
  createEmptyDocument: RequestForProposalsMutationResult;
  editRfp: RequestForProposalsMutationResult;
  editRfpAsync: Scalars['String']['output'];
  removeContextDocument: RequestForProposalsMutationResult;
  removeContextDocumentAsync: Scalars['String']['output'];
  removeProposal: RequestForProposalsMutationResult;
  removeProposalAsync: Scalars['String']['output'];
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsAddContextDocumentArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_AddContextDocumentInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsAddContextDocumentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_AddContextDocumentInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsAddProposalArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_AddProposalInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsAddProposalAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_AddProposalInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsChangeProposalStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_ChangeProposalStatusInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsChangeProposalStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_ChangeProposalStatusInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<RequestForProposals_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsEditRfpArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_EditRfpInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsEditRfpAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_EditRfpInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsRemoveContextDocumentArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_RemoveContextDocumentInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsRemoveContextDocumentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_RemoveContextDocumentInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsRemoveProposalArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_RemoveProposalInput;
};


/** Mutations: RequestForProposals */
export type RequestForProposalsMutationsRemoveProposalAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: RequestForProposals_RemoveProposalInput;
};

/** Queries: RequestForProposals Document */
export type RequestForProposalsQueries = {
  __typename?: 'RequestForProposalsQueries';
  /** Get all RequestForProposals documents (paged) */
  RequestForProposals_documents: RequestForProposals_DocumentResultPage;
  /** Get a specific RequestForProposals document by identifier */
  document?: Maybe<RequestForProposals_DocumentWithChildren>;
  /** Get children of a RequestForProposals document */
  documentChildren: RequestForProposals_DocumentResultPage;
  /** Get parents of a RequestForProposals document */
  documentParents: RequestForProposals_DocumentResultPage;
  /** Find RequestForProposals documents by search criteria */
  findDocuments: RequestForProposals_DocumentResultPage;
};


/** Queries: RequestForProposals Document */
export type RequestForProposalsQueriesRequestForProposals_DocumentsArgs = {
  paging?: InputMaybe<RequestForProposals_PagingInput>;
};


/** Queries: RequestForProposals Document */
export type RequestForProposalsQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<RequestForProposals_ViewFilterInput>;
};


/** Queries: RequestForProposals Document */
export type RequestForProposalsQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<RequestForProposals_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<RequestForProposals_ViewFilterInput>;
};


/** Queries: RequestForProposals Document */
export type RequestForProposalsQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<RequestForProposals_PagingInput>;
  view?: InputMaybe<RequestForProposals_ViewFilterInput>;
};


/** Queries: RequestForProposals Document */
export type RequestForProposalsQueriesFindDocumentsArgs = {
  paging?: InputMaybe<RequestForProposals_PagingInput>;
  search: RequestForProposals_SearchFilterInput;
  view?: InputMaybe<RequestForProposals_ViewFilterInput>;
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
  paymentTerms: RequestForProposals_RfpPaymentTerm;
  proposalStatus: RequestForProposals_RfpProposalStatus;
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
  status: RequestForProposals_RfpProposalStatus;
};

export type RequestForProposals_ContextDocument = {
  __typename?: 'RequestForProposals_ContextDocument';
  name: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export type RequestForProposals_ContextDocumentInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['URL']['input']>;
};

/** Paginated result type for RequestForProposals documents */
export type RequestForProposals_DocumentResultPage = {
  __typename?: 'RequestForProposals_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<RequestForProposalsMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for RequestForProposals */
export type RequestForProposals_DocumentWithChildren = {
  __typename?: 'RequestForProposals_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: RequestForProposalsMutationResult;
};

/** Module: RfpState */
export type RequestForProposals_EditRfpInput = {
  briefing?: InputMaybe<Scalars['String']['input']>;
  budgetRange?: InputMaybe<RequestForProposals_BudgetRangeInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  eligibilityCriteria?: InputMaybe<Scalars['String']['input']>;
  evaluationCriteria?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RequestForProposals_RfpStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Full state with all scopes for RequestForProposals */
export type RequestForProposals_FullState = {
  __typename?: 'RequestForProposals_FullState';
  auth: Scalars['JSONObject']['output'];
  document: RequestForProposals_PhDocumentScopeState;
  global: RequestForProposals_RequestForProposalsState;
  local: Scalars['JSONObject']['output'];
};

export type RequestForProposals_InitialStateInput = {
  global?: InputMaybe<RequestForProposals_RequestForProposalsStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type RequestForProposals_PhDocumentScopeState = {
  __typename?: 'RequestForProposals_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: RequestForProposals_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type RequestForProposals_PhHashConfig = {
  __typename?: 'RequestForProposals_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type RequestForProposals_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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
  issuer: Scalars['String']['output'];
  proposals: Array<RequestForProposals_RfpProposal>;
  rfpCommenter: Array<RequestForProposals_RfpCommenter>;
  status: RequestForProposals_RfpStatus;
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
};

/** Input Types for Initial State */
export type RequestForProposals_RequestForProposalsStateInput = {
  briefing?: InputMaybe<Scalars['String']['input']>;
  budgetRange?: InputMaybe<RequestForProposals_BudgetRangeInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  contextDocuments?: InputMaybe<Array<InputMaybe<RequestForProposals_ContextDocumentInput>>>;
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  eligibilityCriteria?: InputMaybe<Scalars['String']['input']>;
  evaluationCriteria?: InputMaybe<Scalars['String']['input']>;
  issuer?: InputMaybe<Scalars['String']['input']>;
  proposals?: InputMaybe<Array<InputMaybe<RequestForProposals_RfpProposalInput>>>;
  rfpCommenter?: InputMaybe<Array<InputMaybe<RequestForProposals_RfpCommenterInput>>>;
  status?: InputMaybe<RequestForProposals_RfpStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title?: InputMaybe<Scalars['String']['input']>;
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
  id: Scalars['OID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rfpCommentatorType: RequestForProposals_RfpCommentatorType;
};

export type RequestForProposals_RfpCommenterInput = {
  agentType?: InputMaybe<RequestForProposals_RfpAgentType>;
  code?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rfpCommentatorType?: InputMaybe<RequestForProposals_RfpCommentatorType>;
};

export enum RequestForProposals_RfpPaymentTerm {
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

export type RequestForProposals_RfpProposalInput = {
  budgetEstimate?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  paymentTerms?: InputMaybe<RequestForProposals_RfpPaymentTerm>;
  proposalStatus?: InputMaybe<RequestForProposals_RfpProposalStatus>;
  submittedby?: InputMaybe<Scalars['OID']['input']>;
  summary?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type RequestForProposals_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type RequestForProposals_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

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

/**
 * Mutation result type for ResourceInstance operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ResourceInstanceMutationResult = {
  __typename?: 'ResourceInstanceMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ResourceInstance_FullState;
};

/** Mutations: ResourceInstance */
export type ResourceInstanceMutations = {
  __typename?: 'ResourceInstanceMutations';
  activateInstance: ResourceInstanceMutationResult;
  activateInstanceAsync: Scalars['String']['output'];
  applyConfigurationChanges: ResourceInstanceMutationResult;
  applyConfigurationChangesAsync: Scalars['String']['output'];
  confirmInstance: ResourceInstanceMutationResult;
  confirmInstanceAsync: Scalars['String']['output'];
  createDocument: ResourceInstanceMutationResult;
  createEmptyDocument: ResourceInstanceMutationResult;
  initializeInstance: ResourceInstanceMutationResult;
  initializeInstanceAsync: Scalars['String']['output'];
  removeInstanceFacet: ResourceInstanceMutationResult;
  removeInstanceFacetAsync: Scalars['String']['output'];
  reportProvisioningCompleted: ResourceInstanceMutationResult;
  reportProvisioningCompletedAsync: Scalars['String']['output'];
  reportProvisioningFailed: ResourceInstanceMutationResult;
  reportProvisioningFailedAsync: Scalars['String']['output'];
  reportProvisioningStarted: ResourceInstanceMutationResult;
  reportProvisioningStartedAsync: Scalars['String']['output'];
  resumeAfterMaintenance: ResourceInstanceMutationResult;
  resumeAfterMaintenanceAsync: Scalars['String']['output'];
  resumeAfterPayment: ResourceInstanceMutationResult;
  resumeAfterPaymentAsync: Scalars['String']['output'];
  setInstanceFacet: ResourceInstanceMutationResult;
  setInstanceFacetAsync: Scalars['String']['output'];
  setOperatorProfile: ResourceInstanceMutationResult;
  setOperatorProfileAsync: Scalars['String']['output'];
  suspendForMaintenance: ResourceInstanceMutationResult;
  suspendForMaintenanceAsync: Scalars['String']['output'];
  suspendForNonPayment: ResourceInstanceMutationResult;
  suspendForNonPaymentAsync: Scalars['String']['output'];
  suspendInstance: ResourceInstanceMutationResult;
  suspendInstanceAsync: Scalars['String']['output'];
  terminateInstance: ResourceInstanceMutationResult;
  terminateInstanceAsync: Scalars['String']['output'];
  updateInstanceFacet: ResourceInstanceMutationResult;
  updateInstanceFacetAsync: Scalars['String']['output'];
  updateInstanceInfo: ResourceInstanceMutationResult;
  updateInstanceInfoAsync: Scalars['String']['output'];
  updateInstanceStatus: ResourceInstanceMutationResult;
  updateInstanceStatusAsync: Scalars['String']['output'];
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsActivateInstanceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ActivateInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsActivateInstanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ActivateInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsApplyConfigurationChangesArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ApplyConfigurationChangesInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsApplyConfigurationChangesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ApplyConfigurationChangesInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsConfirmInstanceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ConfirmInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsConfirmInstanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ConfirmInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ResourceInstance_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsInitializeInstanceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_InitializeInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsInitializeInstanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_InitializeInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsRemoveInstanceFacetArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_RemoveInstanceFacetInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsRemoveInstanceFacetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_RemoveInstanceFacetInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsReportProvisioningCompletedArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ReportProvisioningCompletedInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsReportProvisioningCompletedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ReportProvisioningCompletedInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsReportProvisioningFailedArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ReportProvisioningFailedInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsReportProvisioningFailedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ReportProvisioningFailedInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsReportProvisioningStartedArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ReportProvisioningStartedInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsReportProvisioningStartedAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ReportProvisioningStartedInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsResumeAfterMaintenanceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ResumeAfterMaintenanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsResumeAfterMaintenanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ResumeAfterMaintenanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsResumeAfterPaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ResumeAfterPaymentInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsResumeAfterPaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_ResumeAfterPaymentInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSetInstanceFacetArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SetInstanceFacetInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSetInstanceFacetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SetInstanceFacetInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSetOperatorProfileArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SetOperatorProfileInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSetOperatorProfileAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SetOperatorProfileInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSuspendForMaintenanceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SuspendForMaintenanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSuspendForMaintenanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SuspendForMaintenanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSuspendForNonPaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SuspendForNonPaymentInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSuspendForNonPaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SuspendForNonPaymentInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSuspendInstanceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SuspendInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsSuspendInstanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_SuspendInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsTerminateInstanceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_TerminateInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsTerminateInstanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_TerminateInstanceInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsUpdateInstanceFacetArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_UpdateInstanceFacetInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsUpdateInstanceFacetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_UpdateInstanceFacetInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsUpdateInstanceInfoArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_UpdateInstanceInfoInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsUpdateInstanceInfoAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_UpdateInstanceInfoInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsUpdateInstanceStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_UpdateInstanceStatusInput;
};


/** Mutations: ResourceInstance */
export type ResourceInstanceMutationsUpdateInstanceStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceInstance_UpdateInstanceStatusInput;
};

/** Queries: ResourceInstance Document */
export type ResourceInstanceQueries = {
  __typename?: 'ResourceInstanceQueries';
  /** Get all ResourceInstance documents (paged) */
  ResourceInstance_documents: ResourceInstance_DocumentResultPage;
  /** Get a specific ResourceInstance document by identifier */
  document?: Maybe<ResourceInstance_DocumentWithChildren>;
  /** Get children of a ResourceInstance document */
  documentChildren: ResourceInstance_DocumentResultPage;
  /** Get parents of a ResourceInstance document */
  documentParents: ResourceInstance_DocumentResultPage;
  /** Find ResourceInstance documents by search criteria */
  findDocuments: ResourceInstance_DocumentResultPage;
};


/** Queries: ResourceInstance Document */
export type ResourceInstanceQueriesResourceInstance_DocumentsArgs = {
  paging?: InputMaybe<ResourceInstance_PagingInput>;
};


/** Queries: ResourceInstance Document */
export type ResourceInstanceQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ResourceInstance_ViewFilterInput>;
};


/** Queries: ResourceInstance Document */
export type ResourceInstanceQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ResourceInstance_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ResourceInstance_ViewFilterInput>;
};


/** Queries: ResourceInstance Document */
export type ResourceInstanceQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ResourceInstance_PagingInput>;
  view?: InputMaybe<ResourceInstance_ViewFilterInput>;
};


/** Queries: ResourceInstance Document */
export type ResourceInstanceQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ResourceInstance_PagingInput>;
  search: ResourceInstance_SearchFilterInput;
  view?: InputMaybe<ResourceInstance_ViewFilterInput>;
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

/** Paginated result type for ResourceInstance documents */
export type ResourceInstance_DocumentResultPage = {
  __typename?: 'ResourceInstance_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ResourceInstanceMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for ResourceInstance */
export type ResourceInstance_DocumentWithChildren = {
  __typename?: 'ResourceInstance_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ResourceInstanceMutationResult;
};

/** Full state with all scopes for ResourceInstance */
export type ResourceInstance_FullState = {
  __typename?: 'ResourceInstance_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ResourceInstance_PhDocumentScopeState;
  global: ResourceInstance_ResourceInstanceState;
  local: Scalars['JSONObject']['output'];
};

export type ResourceInstance_InitialStateInput = {
  global?: InputMaybe<ResourceInstance_ResourceInstanceStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Module: InstanceManagement */
export type ResourceInstance_InitializeInstanceInput = {
  customerId?: InputMaybe<Scalars['PHID']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  infoLink?: InputMaybe<Scalars['URL']['input']>;
  operatorDocumentType: Scalars['String']['input'];
  operatorId: Scalars['PHID']['input'];
  operatorName?: InputMaybe<Scalars['String']['input']>;
  resourceTemplateId?: InputMaybe<Scalars['PHID']['input']>;
  templateName?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type ResourceInstance_InstanceFacet = {
  __typename?: 'ResourceInstance_InstanceFacet';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOption: Scalars['String']['output'];
};

export type ResourceInstance_InstanceFacetInput = {
  categoryKey?: InputMaybe<Scalars['String']['input']>;
  categoryLabel?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  selectedOption?: InputMaybe<Scalars['String']['input']>;
};

export enum ResourceInstance_InstanceStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Provisioning = 'PROVISIONING',
  Suspended = 'SUSPENDED',
  Terminated = 'TERMINATED'
}

export type ResourceInstance_OperatorProfile = {
  __typename?: 'ResourceInstance_OperatorProfile';
  id: Scalars['PHID']['output'];
  operatorName?: Maybe<Scalars['String']['output']>;
};

export type ResourceInstance_OperatorProfileInput = {
  id?: InputMaybe<Scalars['PHID']['input']>;
  operatorName?: InputMaybe<Scalars['String']['input']>;
};

/** Document scope state (same for all document types) */
export type ResourceInstance_PhDocumentScopeState = {
  __typename?: 'ResourceInstance_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ResourceInstance_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ResourceInstance_PhHashConfig = {
  __typename?: 'ResourceInstance_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type ResourceInstance_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

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
  customerName?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  infoLink?: Maybe<Scalars['URL']['output']>;
  operatorProfile?: Maybe<ResourceInstance_OperatorProfile>;
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
  templateName?: Maybe<Scalars['String']['output']>;
  terminatedAt?: Maybe<Scalars['DateTime']['output']>;
  terminationReason?: Maybe<Scalars['String']['output']>;
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
};

/** Input Types for Initial State */
export type ResourceInstance_ResourceInstanceStateInput = {
  activatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  configuration?: InputMaybe<Array<InputMaybe<ResourceInstance_InstanceFacetInput>>>;
  confirmedAt?: InputMaybe<Scalars['DateTime']['input']>;
  customerId?: InputMaybe<Scalars['PHID']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  infoLink?: InputMaybe<Scalars['URL']['input']>;
  operatorProfile?: InputMaybe<ResourceInstance_OperatorProfileInput>;
  provisioningCompletedAt?: InputMaybe<Scalars['DateTime']['input']>;
  provisioningFailureReason?: InputMaybe<Scalars['String']['input']>;
  provisioningStartedAt?: InputMaybe<Scalars['DateTime']['input']>;
  resourceTemplateId?: InputMaybe<Scalars['PHID']['input']>;
  resumedAt?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<ResourceInstance_InstanceStatus>;
  suspendedAt?: InputMaybe<Scalars['DateTime']['input']>;
  suspensionDetails?: InputMaybe<Scalars['String']['input']>;
  suspensionReason?: InputMaybe<Scalars['String']['input']>;
  suspensionType?: InputMaybe<ResourceInstance_SuspensionType>;
  templateName?: InputMaybe<Scalars['String']['input']>;
  terminatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  terminationReason?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type ResourceInstance_ResumeAfterMaintenanceInput = {
  resumedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_ResumeAfterPaymentInput = {
  paymentReference?: InputMaybe<Scalars['String']['input']>;
  resumedAt: Scalars['DateTime']['input'];
};

export type ResourceInstance_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

/** Module: ConfigurationManagement */
export type ResourceInstance_SetInstanceFacetInput = {
  categoryKey: Scalars['String']['input'];
  categoryLabel: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  selectedOption: Scalars['String']['input'];
};

export type ResourceInstance_SetOperatorProfileInput = {
  operatorId: Scalars['PHID']['input'];
  operatorName?: InputMaybe<Scalars['String']['input']>;
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

export type ResourceInstance_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

/**
 * Mutation result type for ResourceTemplate operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ResourceTemplateMutationResult = {
  __typename?: 'ResourceTemplateMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ResourceTemplate_FullState;
};

/** Mutations: ResourceTemplate */
export type ResourceTemplateMutations = {
  __typename?: 'ResourceTemplateMutations';
  addContentSection: ResourceTemplateMutationResult;
  addContentSectionAsync: Scalars['String']['output'];
  addFacetBinding: ResourceTemplateMutationResult;
  addFacetBindingAsync: Scalars['String']['output'];
  addFacetOption: ResourceTemplateMutationResult;
  addFacetOptionAsync: Scalars['String']['output'];
  addFaq: ResourceTemplateMutationResult;
  addFaqAsync: Scalars['String']['output'];
  addOptionGroup: ResourceTemplateMutationResult;
  addOptionGroupAsync: Scalars['String']['output'];
  addService: ResourceTemplateMutationResult;
  addServiceAsync: Scalars['String']['output'];
  addTargetAudience: ResourceTemplateMutationResult;
  addTargetAudienceAsync: Scalars['String']['output'];
  createDocument: ResourceTemplateMutationResult;
  createEmptyDocument: ResourceTemplateMutationResult;
  deleteContentSection: ResourceTemplateMutationResult;
  deleteContentSectionAsync: Scalars['String']['output'];
  deleteFaq: ResourceTemplateMutationResult;
  deleteFaqAsync: Scalars['String']['output'];
  deleteOptionGroup: ResourceTemplateMutationResult;
  deleteOptionGroupAsync: Scalars['String']['output'];
  deleteService: ResourceTemplateMutationResult;
  deleteServiceAsync: Scalars['String']['output'];
  removeFacetBinding: ResourceTemplateMutationResult;
  removeFacetBindingAsync: Scalars['String']['output'];
  removeFacetOption: ResourceTemplateMutationResult;
  removeFacetOptionAsync: Scalars['String']['output'];
  removeFacetTarget: ResourceTemplateMutationResult;
  removeFacetTargetAsync: Scalars['String']['output'];
  removeTargetAudience: ResourceTemplateMutationResult;
  removeTargetAudienceAsync: Scalars['String']['output'];
  reorderContentSections: ResourceTemplateMutationResult;
  reorderContentSectionsAsync: Scalars['String']['output'];
  reorderFaqs: ResourceTemplateMutationResult;
  reorderFaqsAsync: Scalars['String']['output'];
  setFacetTarget: ResourceTemplateMutationResult;
  setFacetTargetAsync: Scalars['String']['output'];
  setOperator: ResourceTemplateMutationResult;
  setOperatorAsync: Scalars['String']['output'];
  setRecurringServices: ResourceTemplateMutationResult;
  setRecurringServicesAsync: Scalars['String']['output'];
  setSetupServices: ResourceTemplateMutationResult;
  setSetupServicesAsync: Scalars['String']['output'];
  setTemplateId: ResourceTemplateMutationResult;
  setTemplateIdAsync: Scalars['String']['output'];
  updateContentSection: ResourceTemplateMutationResult;
  updateContentSectionAsync: Scalars['String']['output'];
  updateFaq: ResourceTemplateMutationResult;
  updateFaqAsync: Scalars['String']['output'];
  updateOptionGroup: ResourceTemplateMutationResult;
  updateOptionGroupAsync: Scalars['String']['output'];
  updateService: ResourceTemplateMutationResult;
  updateServiceAsync: Scalars['String']['output'];
  updateTemplateInfo: ResourceTemplateMutationResult;
  updateTemplateInfoAsync: Scalars['String']['output'];
  updateTemplateStatus: ResourceTemplateMutationResult;
  updateTemplateStatusAsync: Scalars['String']['output'];
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddContentSectionArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddContentSectionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddContentSectionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddContentSectionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddFacetBindingArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddFacetBindingInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddFacetBindingAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddFacetBindingInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddFacetOptionArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddFacetOptionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddFacetOptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddFacetOptionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddFaqArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddFaqInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddFaqAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddFaqInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddOptionGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddOptionGroupInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddOptionGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddOptionGroupInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddServiceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddServiceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddServiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddServiceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddTargetAudienceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddTargetAudienceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsAddTargetAudienceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_AddTargetAudienceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ResourceTemplate_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsDeleteContentSectionArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_DeleteContentSectionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsDeleteContentSectionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_DeleteContentSectionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsDeleteFaqArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_DeleteFaqInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsDeleteFaqAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_DeleteFaqInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsDeleteOptionGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_DeleteOptionGroupInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsDeleteOptionGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_DeleteOptionGroupInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsDeleteServiceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_DeleteServiceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsDeleteServiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_DeleteServiceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsRemoveFacetBindingArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_RemoveFacetBindingInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsRemoveFacetBindingAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_RemoveFacetBindingInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsRemoveFacetOptionArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_RemoveFacetOptionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsRemoveFacetOptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_RemoveFacetOptionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsRemoveFacetTargetArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_RemoveFacetTargetInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsRemoveFacetTargetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_RemoveFacetTargetInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsRemoveTargetAudienceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_RemoveTargetAudienceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsRemoveTargetAudienceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_RemoveTargetAudienceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsReorderContentSectionsArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_ReorderContentSectionsInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsReorderContentSectionsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_ReorderContentSectionsInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsReorderFaqsArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_ReorderFaqsInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsReorderFaqsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_ReorderFaqsInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetFacetTargetArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetFacetTargetInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetFacetTargetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetFacetTargetInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetOperatorArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetOperatorInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetOperatorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetOperatorInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetRecurringServicesArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetRecurringServicesInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetRecurringServicesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetRecurringServicesInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetSetupServicesArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetSetupServicesInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetSetupServicesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetSetupServicesInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetTemplateIdArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetTemplateIdInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsSetTemplateIdAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_SetTemplateIdInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateContentSectionArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateContentSectionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateContentSectionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateContentSectionInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateFaqArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateFaqInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateFaqAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateFaqInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateOptionGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateOptionGroupInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateOptionGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateOptionGroupInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateServiceArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateServiceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateServiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateServiceInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateTemplateInfoArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateTemplateInfoInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateTemplateInfoAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateTemplateInfoInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateTemplateStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateTemplateStatusInput;
};


/** Mutations: ResourceTemplate */
export type ResourceTemplateMutationsUpdateTemplateStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ResourceTemplate_UpdateTemplateStatusInput;
};

/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueries = {
  __typename?: 'ResourceTemplateQueries';
  /** Get all ResourceTemplate documents (paged) */
  ResourceTemplate_documents: ResourceTemplate_DocumentResultPage;
  /** Get a specific ResourceTemplate document by identifier */
  document?: Maybe<ResourceTemplate_DocumentWithChildren>;
  /** Get children of a ResourceTemplate document */
  documentChildren: ResourceTemplate_DocumentResultPage;
  /** Get parents of a ResourceTemplate document */
  documentParents: ResourceTemplate_DocumentResultPage;
  /** Find ResourceTemplate documents by search criteria */
  findDocuments: ResourceTemplate_DocumentResultPage;
};


/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueriesResourceTemplate_DocumentsArgs = {
  paging?: InputMaybe<ResourceTemplate_PagingInput>;
};


/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ResourceTemplate_ViewFilterInput>;
};


/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ResourceTemplate_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ResourceTemplate_ViewFilterInput>;
};


/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ResourceTemplate_PagingInput>;
  view?: InputMaybe<ResourceTemplate_ViewFilterInput>;
};


/** Queries: ResourceTemplate Document */
export type ResourceTemplateQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ResourceTemplate_PagingInput>;
  search: ResourceTemplate_SearchFilterInput;
  view?: InputMaybe<ResourceTemplate_ViewFilterInput>;
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

export type ResourceTemplate_ContentSectionInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

/** Paginated result type for ResourceTemplate documents */
export type ResourceTemplate_DocumentResultPage = {
  __typename?: 'ResourceTemplate_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ResourceTemplateMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for ResourceTemplate */
export type ResourceTemplate_DocumentWithChildren = {
  __typename?: 'ResourceTemplate_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ResourceTemplateMutationResult;
};

export type ResourceTemplate_FacetTarget = {
  __typename?: 'ResourceTemplate_FacetTarget';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOptions: Array<Scalars['String']['output']>;
};

export type ResourceTemplate_FacetTargetInput = {
  categoryKey?: InputMaybe<Scalars['String']['input']>;
  categoryLabel?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  selectedOptions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ResourceTemplate_FaqField = {
  __typename?: 'ResourceTemplate_FaqField';
  answer?: Maybe<Scalars['String']['output']>;
  displayOrder: Scalars['Int']['output'];
  id: Scalars['OID']['output'];
  question?: Maybe<Scalars['String']['output']>;
};

export type ResourceTemplate_FaqFieldInput = {
  answer?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  question?: InputMaybe<Scalars['String']['input']>;
};

/** Full state with all scopes for ResourceTemplate */
export type ResourceTemplate_FullState = {
  __typename?: 'ResourceTemplate_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ResourceTemplate_PhDocumentScopeState;
  global: ResourceTemplate_ResourceTemplateState;
  local: Scalars['JSONObject']['output'];
};

export type ResourceTemplate_InitialStateInput = {
  global?: InputMaybe<ResourceTemplate_ResourceTemplateStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type ResourceTemplate_OptionGroup = {
  __typename?: 'ResourceTemplate_OptionGroup';
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
};

export type ResourceTemplate_OptionGroupInput = {
  defaultSelected?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  isAddOn?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Document scope state (same for all document types) */
export type ResourceTemplate_PhDocumentScopeState = {
  __typename?: 'ResourceTemplate_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ResourceTemplate_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ResourceTemplate_PhHashConfig = {
  __typename?: 'ResourceTemplate_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type ResourceTemplate_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type ResourceTemplate_ResourceFacetBindingInput = {
  facetName?: InputMaybe<Scalars['String']['input']>;
  facetType?: InputMaybe<Scalars['PHID']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  supportedOptions?: InputMaybe<Array<InputMaybe<Scalars['OID']['input']>>>;
};

export type ResourceTemplate_ResourceTemplateState = {
  __typename?: 'ResourceTemplate_ResourceTemplateState';
  contentSections: Array<ResourceTemplate_ContentSection>;
  description?: Maybe<Scalars['String']['output']>;
  facetTargets: Array<ResourceTemplate_FacetTarget>;
  faqFields?: Maybe<Array<ResourceTemplate_FaqField>>;
  id?: Maybe<Scalars['PHID']['output']>;
  infoLink?: Maybe<Scalars['URL']['output']>;
  lastModified?: Maybe<Scalars['DateTime']['output']>;
  operatorId?: Maybe<Scalars['PHID']['output']>;
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

/** Input Types for Initial State */
export type ResourceTemplate_ResourceTemplateStateInput = {
  contentSections?: InputMaybe<Array<InputMaybe<ResourceTemplate_ContentSectionInput>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  facetTargets?: InputMaybe<Array<InputMaybe<ResourceTemplate_FacetTargetInput>>>;
  faqFields?: InputMaybe<Array<InputMaybe<ResourceTemplate_FaqFieldInput>>>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  infoLink?: InputMaybe<Scalars['URL']['input']>;
  lastModified?: InputMaybe<Scalars['DateTime']['input']>;
  operatorId?: InputMaybe<Scalars['PHID']['input']>;
  optionGroups?: InputMaybe<Array<InputMaybe<ResourceTemplate_OptionGroupInput>>>;
  recurringServices?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  services?: InputMaybe<Array<InputMaybe<ResourceTemplate_ServiceInput>>>;
  setupServices?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  status?: InputMaybe<ResourceTemplate_TemplateStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  targetAudiences?: InputMaybe<Array<InputMaybe<ResourceTemplate_TargetAudienceInput>>>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ResourceTemplate_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
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

export type ResourceTemplate_ServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  facetBindings?: InputMaybe<Array<InputMaybe<ResourceTemplate_ResourceFacetBindingInput>>>;
  id?: InputMaybe<Scalars['OID']['input']>;
  isSetupFormation?: InputMaybe<Scalars['Boolean']['input']>;
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  parentServiceId?: InputMaybe<Scalars['OID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type ResourceTemplate_TargetAudienceInput = {
  color?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
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

export type ResourceTemplate_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Revision = {
  __typename?: 'Revision';
  revision: Scalars['Int']['output'];
  scope: Scalars['String']['output'];
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

/**
 * Mutation result type for ScopeOfWork operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ScopeOfWorkMutationResult = {
  __typename?: 'ScopeOfWorkMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ScopeOfWork_FullState;
};

/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutations = {
  __typename?: 'ScopeOfWorkMutations';
  addAgent: ScopeOfWorkMutationResult;
  addAgentAsync: Scalars['String']['output'];
  addCoordinator: ScopeOfWorkMutationResult;
  addCoordinatorAsync: Scalars['String']['output'];
  addDeliverable: ScopeOfWorkMutationResult;
  addDeliverableAsync: Scalars['String']['output'];
  addDeliverableInSet: ScopeOfWorkMutationResult;
  addDeliverableInSetAsync: Scalars['String']['output'];
  addKeyResult: ScopeOfWorkMutationResult;
  addKeyResultAsync: Scalars['String']['output'];
  addMilestone: ScopeOfWorkMutationResult;
  addMilestoneAsync: Scalars['String']['output'];
  addMilestoneDeliverable: ScopeOfWorkMutationResult;
  addMilestoneDeliverableAsync: Scalars['String']['output'];
  addProject: ScopeOfWorkMutationResult;
  addProjectAsync: Scalars['String']['output'];
  addProjectDeliverable: ScopeOfWorkMutationResult;
  addProjectDeliverableAsync: Scalars['String']['output'];
  addRoadmap: ScopeOfWorkMutationResult;
  addRoadmapAsync: Scalars['String']['output'];
  createDocument: ScopeOfWorkMutationResult;
  createEmptyDocument: ScopeOfWorkMutationResult;
  editAgent: ScopeOfWorkMutationResult;
  editAgentAsync: Scalars['String']['output'];
  editDeliverable: ScopeOfWorkMutationResult;
  editDeliverableAsync: Scalars['String']['output'];
  editDeliverablesSet: ScopeOfWorkMutationResult;
  editDeliverablesSetAsync: Scalars['String']['output'];
  editKeyResult: ScopeOfWorkMutationResult;
  editKeyResultAsync: Scalars['String']['output'];
  editMilestone: ScopeOfWorkMutationResult;
  editMilestoneAsync: Scalars['String']['output'];
  editRoadmap: ScopeOfWorkMutationResult;
  editRoadmapAsync: Scalars['String']['output'];
  editScopeOfWork: ScopeOfWorkMutationResult;
  editScopeOfWorkAsync: Scalars['String']['output'];
  removeAgent: ScopeOfWorkMutationResult;
  removeAgentAsync: Scalars['String']['output'];
  removeCoordinator: ScopeOfWorkMutationResult;
  removeCoordinatorAsync: Scalars['String']['output'];
  removeDeliverable: ScopeOfWorkMutationResult;
  removeDeliverableAsync: Scalars['String']['output'];
  removeDeliverableInSet: ScopeOfWorkMutationResult;
  removeDeliverableInSetAsync: Scalars['String']['output'];
  removeKeyResult: ScopeOfWorkMutationResult;
  removeKeyResultAsync: Scalars['String']['output'];
  removeMilestone: ScopeOfWorkMutationResult;
  removeMilestoneAsync: Scalars['String']['output'];
  removeMilestoneDeliverable: ScopeOfWorkMutationResult;
  removeMilestoneDeliverableAsync: Scalars['String']['output'];
  removeProject: ScopeOfWorkMutationResult;
  removeProjectAsync: Scalars['String']['output'];
  removeProjectDeliverable: ScopeOfWorkMutationResult;
  removeProjectDeliverableAsync: Scalars['String']['output'];
  removeRoadmap: ScopeOfWorkMutationResult;
  removeRoadmapAsync: Scalars['String']['output'];
  setDeliverableBudgetAnchorProject: ScopeOfWorkMutationResult;
  setDeliverableBudgetAnchorProjectAsync: Scalars['String']['output'];
  setDeliverableProgress: ScopeOfWorkMutationResult;
  setDeliverableProgressAsync: Scalars['String']['output'];
  setProjectMargin: ScopeOfWorkMutationResult;
  setProjectMarginAsync: Scalars['String']['output'];
  setProjectTotalBudget: ScopeOfWorkMutationResult;
  setProjectTotalBudgetAsync: Scalars['String']['output'];
  updateProject: ScopeOfWorkMutationResult;
  updateProjectAsync: Scalars['String']['output'];
  updateProjectOwner: ScopeOfWorkMutationResult;
  updateProjectOwnerAsync: Scalars['String']['output'];
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddAgentArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddAgentInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddAgentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddAgentInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddCoordinatorArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddCoordinatorInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddCoordinatorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddCoordinatorInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddDeliverableArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddDeliverableAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddDeliverableInSetArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddDeliverableInSetInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddDeliverableInSetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddDeliverableInSetInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddKeyResultArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddKeyResultInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddKeyResultAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddKeyResultInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddMilestoneArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddMilestoneInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddMilestoneAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddMilestoneInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddMilestoneDeliverableArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddMilestoneDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddMilestoneDeliverableAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddMilestoneDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddProjectArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddProjectInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddProjectAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddProjectInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddProjectDeliverableArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddProjectDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddProjectDeliverableAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddProjectDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddRoadmapArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddRoadmapInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsAddRoadmapAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_AddRoadmapInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ScopeOfWork_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditAgentArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditAgentInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditAgentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditAgentInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditDeliverableArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditDeliverableAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditDeliverablesSetArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditDeliverablesSetInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditDeliverablesSetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditDeliverablesSetInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditKeyResultArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditKeyResultInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditKeyResultAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditKeyResultInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditMilestoneArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditMilestoneInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditMilestoneAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditMilestoneInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditRoadmapArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditRoadmapInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditRoadmapAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditRoadmapInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditScopeOfWorkArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditScopeOfWorkInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsEditScopeOfWorkAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_EditScopeOfWorkInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveAgentArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveAgentInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveAgentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveAgentInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveCoordinatorArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveCoordinatorInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveCoordinatorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveCoordinatorInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveDeliverableArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveDeliverableAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveDeliverableInSetArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveDeliverableInSetInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveDeliverableInSetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveDeliverableInSetInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveKeyResultArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveKeyResultInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveKeyResultAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveKeyResultInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveMilestoneArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveMilestoneInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveMilestoneAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveMilestoneInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveMilestoneDeliverableArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveMilestoneDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveMilestoneDeliverableAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveMilestoneDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveProjectArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveProjectInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveProjectAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveProjectInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveProjectDeliverableArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveProjectDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveProjectDeliverableAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveProjectDeliverableInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveRoadmapArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveRoadmapInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsRemoveRoadmapAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_RemoveRoadmapInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsSetDeliverableBudgetAnchorProjectArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_SetDeliverableBudgetAnchorProjectInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsSetDeliverableBudgetAnchorProjectAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_SetDeliverableBudgetAnchorProjectInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsSetDeliverableProgressArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_SetDeliverableProgressInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsSetDeliverableProgressAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_SetDeliverableProgressInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsSetProjectMarginArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_SetProjectMarginInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsSetProjectMarginAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_SetProjectMarginInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsSetProjectTotalBudgetArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_SetProjectTotalBudgetInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsSetProjectTotalBudgetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_SetProjectTotalBudgetInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsUpdateProjectArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_UpdateProjectInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsUpdateProjectAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_UpdateProjectInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsUpdateProjectOwnerArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_UpdateProjectOwnerInput;
};


/** Mutations: ScopeOfWork */
export type ScopeOfWorkMutationsUpdateProjectOwnerAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ScopeOfWork_UpdateProjectOwnerInput;
};

/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueries = {
  __typename?: 'ScopeOfWorkQueries';
  /** Get all ScopeOfWork documents (paged) */
  ScopeOfWork_documents: ScopeOfWork_DocumentResultPage;
  /** Get a specific ScopeOfWork document by identifier */
  document?: Maybe<ScopeOfWork_DocumentWithChildren>;
  /** Get children of a ScopeOfWork document */
  documentChildren: ScopeOfWork_DocumentResultPage;
  /** Get parents of a ScopeOfWork document */
  documentParents: ScopeOfWork_DocumentResultPage;
  /** Find ScopeOfWork documents by search criteria */
  findDocuments: ScopeOfWork_DocumentResultPage;
};


/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueriesScopeOfWork_DocumentsArgs = {
  paging?: InputMaybe<ScopeOfWork_PagingInput>;
};


/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ScopeOfWork_ViewFilterInput>;
};


/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ScopeOfWork_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ScopeOfWork_ViewFilterInput>;
};


/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ScopeOfWork_PagingInput>;
  view?: InputMaybe<ScopeOfWork_ViewFilterInput>;
};


/** Queries: ScopeOfWork Document */
export type ScopeOfWorkQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ScopeOfWork_PagingInput>;
  search: ScopeOfWork_SearchFilterInput;
  view?: InputMaybe<ScopeOfWork_ViewFilterInput>;
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

export type ScopeOfWork_AgentInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['URL']['input']>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_Binary = {
  __typename?: 'ScopeOfWork_Binary';
  done?: Maybe<Scalars['Boolean']['output']>;
};

export type ScopeOfWork_BinaryInput = {
  done?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ScopeOfWork_BudgetAnchorProject = {
  __typename?: 'ScopeOfWork_BudgetAnchorProject';
  margin: Scalars['Float']['output'];
  project?: Maybe<Scalars['OID']['output']>;
  quantity: Scalars['Float']['output'];
  unit?: Maybe<ScopeOfWork_Unit>;
  unitCost: Scalars['Float']['output'];
};

export type ScopeOfWork_BudgetAnchorProjectInput = {
  margin?: InputMaybe<Scalars['Float']['input']>;
  project?: InputMaybe<Scalars['OID']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<ScopeOfWork_Unit>;
  unitCost?: InputMaybe<Scalars['Float']['input']>;
};

export type ScopeOfWork_BudgetExpenditure = {
  __typename?: 'ScopeOfWork_BudgetExpenditure';
  actuals: Scalars['Float']['output'];
  cap: Scalars['Float']['output'];
  percentage: Scalars['Float']['output'];
};

export type ScopeOfWork_BudgetExpenditureInput = {
  actuals?: InputMaybe<Scalars['Float']['input']>;
  cap?: InputMaybe<Scalars['Float']['input']>;
  percentage?: InputMaybe<Scalars['Float']['input']>;
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

export type ScopeOfWork_DeliverableInput = {
  budgetAnchor?: InputMaybe<ScopeOfWork_BudgetAnchorProjectInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  keyResults?: InputMaybe<Array<InputMaybe<ScopeOfWork_KeyResultInput>>>;
  owner?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<ScopeOfWork_DeliverableStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  workProgress?: InputMaybe<Scalars['JSONObject']['input']>;
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

export type ScopeOfWork_DeliverablesSetInput = {
  deliverables?: InputMaybe<Array<InputMaybe<Scalars['OID']['input']>>>;
  deliverablesCompleted?: InputMaybe<ScopeOfWork_DeliverablesCompletedInput>;
  progress?: InputMaybe<Scalars['JSONObject']['input']>;
  status?: InputMaybe<ScopeOfWork_DeliverableSetStatus>;
};

/** Paginated result type for ScopeOfWork documents */
export type ScopeOfWork_DocumentResultPage = {
  __typename?: 'ScopeOfWork_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ScopeOfWorkMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for ScopeOfWork */
export type ScopeOfWork_DocumentWithChildren = {
  __typename?: 'ScopeOfWork_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ScopeOfWorkMutationResult;
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

/** Full state with all scopes for ScopeOfWork */
export type ScopeOfWork_FullState = {
  __typename?: 'ScopeOfWork_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ScopeOfWork_PhDocumentScopeState;
  global: ScopeOfWork_ScopeOfWorkState;
  local: Scalars['JSONObject']['output'];
};

export type ScopeOfWork_InitialStateInput = {
  global?: InputMaybe<ScopeOfWork_ScopeOfWorkStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type ScopeOfWork_KeyResult = {
  __typename?: 'ScopeOfWork_KeyResult';
  id: Scalars['OID']['output'];
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScopeOfWork_KeyResultInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type ScopeOfWork_MilestoneInput = {
  budget?: InputMaybe<Scalars['Float']['input']>;
  coordinators?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
  deliveryTarget?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  scope?: InputMaybe<ScopeOfWork_DeliverablesSetInput>;
  sequenceCode?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Document scope state (same for all document types) */
export type ScopeOfWork_PhDocumentScopeState = {
  __typename?: 'ScopeOfWork_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ScopeOfWork_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ScopeOfWork_PhHashConfig = {
  __typename?: 'ScopeOfWork_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
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

export type ScopeOfWork_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ScopeOfWork_Percentage = {
  __typename?: 'ScopeOfWork_Percentage';
  value: Scalars['Float']['output'];
};

export type ScopeOfWork_PercentageInput = {
  value?: InputMaybe<Scalars['Float']['input']>;
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

export type ScopeOfWork_ProjectInput = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  budget?: InputMaybe<Scalars['Float']['input']>;
  budgetType?: InputMaybe<ScopeOfWork_BudgetType>;
  code?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<ScopeOfWork_PmCurrency>;
  expenditure?: InputMaybe<ScopeOfWork_BudgetExpenditureInput>;
  id?: InputMaybe<Scalars['OID']['input']>;
  imageUrl?: InputMaybe<Scalars['URL']['input']>;
  projectOwner?: InputMaybe<Scalars['ID']['input']>;
  scope?: InputMaybe<ScopeOfWork_DeliverablesSetInput>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type ScopeOfWork_RoadmapInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  milestones?: InputMaybe<Array<InputMaybe<ScopeOfWork_MilestoneInput>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

/** Input Types for Initial State */
export type ScopeOfWork_ScopeOfWorkStateInput = {
  contributors?: InputMaybe<Array<InputMaybe<ScopeOfWork_AgentInput>>>;
  deliverables?: InputMaybe<Array<InputMaybe<ScopeOfWork_DeliverableInput>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  projects?: InputMaybe<Array<InputMaybe<ScopeOfWork_ProjectInput>>>;
  roadmaps?: InputMaybe<Array<InputMaybe<ScopeOfWork_RoadmapInput>>>;
  status?: InputMaybe<ScopeOfWork_ScopeOfWorkStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type ScopeOfWork_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

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

export type ScopeOfWork_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
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

/**
 * Mutation result type for ServiceOffering operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type ServiceOfferingMutationResult = {
  __typename?: 'ServiceOfferingMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: ServiceOffering_FullState;
};

/** Mutations: ServiceOffering */
export type ServiceOfferingMutations = {
  __typename?: 'ServiceOfferingMutations';
  addFacetOption: ServiceOfferingMutationResult;
  addFacetOptionAsync: Scalars['String']['output'];
  addOptionGroup: ServiceOfferingMutationResult;
  addOptionGroupAsync: Scalars['String']['output'];
  addOptionGroupTierPricing: ServiceOfferingMutationResult;
  addOptionGroupTierPricingAsync: Scalars['String']['output'];
  addService: ServiceOfferingMutationResult;
  addServiceAsync: Scalars['String']['output'];
  addServiceLevel: ServiceOfferingMutationResult;
  addServiceLevelAsync: Scalars['String']['output'];
  addTier: ServiceOfferingMutationResult;
  addTierAsync: Scalars['String']['output'];
  addUsageLimit: ServiceOfferingMutationResult;
  addUsageLimitAsync: Scalars['String']['output'];
  changeResourceTemplate: ServiceOfferingMutationResult;
  changeResourceTemplateAsync: Scalars['String']['output'];
  createDocument: ServiceOfferingMutationResult;
  createEmptyDocument: ServiceOfferingMutationResult;
  deleteOptionGroup: ServiceOfferingMutationResult;
  deleteOptionGroupAsync: Scalars['String']['output'];
  deleteService: ServiceOfferingMutationResult;
  deleteServiceAsync: Scalars['String']['output'];
  deleteTier: ServiceOfferingMutationResult;
  deleteTierAsync: Scalars['String']['output'];
  removeFacetOption: ServiceOfferingMutationResult;
  removeFacetOptionAsync: Scalars['String']['output'];
  removeFacetTarget: ServiceOfferingMutationResult;
  removeFacetTargetAsync: Scalars['String']['output'];
  removeOptionGroupTierPricing: ServiceOfferingMutationResult;
  removeOptionGroupTierPricingAsync: Scalars['String']['output'];
  removeServiceLevel: ServiceOfferingMutationResult;
  removeServiceLevelAsync: Scalars['String']['output'];
  removeUsageLimit: ServiceOfferingMutationResult;
  removeUsageLimitAsync: Scalars['String']['output'];
  selectResourceTemplate: ServiceOfferingMutationResult;
  selectResourceTemplateAsync: Scalars['String']['output'];
  setAvailableBillingCycles: ServiceOfferingMutationResult;
  setAvailableBillingCyclesAsync: Scalars['String']['output'];
  setFacetTarget: ServiceOfferingMutationResult;
  setFacetTargetAsync: Scalars['String']['output'];
  setOfferingId: ServiceOfferingMutationResult;
  setOfferingIdAsync: Scalars['String']['output'];
  setOperator: ServiceOfferingMutationResult;
  setOperatorAsync: Scalars['String']['output'];
  setOptionGroupDiscountMode: ServiceOfferingMutationResult;
  setOptionGroupDiscountModeAsync: Scalars['String']['output'];
  setOptionGroupStandalonePricing: ServiceOfferingMutationResult;
  setOptionGroupStandalonePricingAsync: Scalars['String']['output'];
  setTierBillingCycleDiscounts: ServiceOfferingMutationResult;
  setTierBillingCycleDiscountsAsync: Scalars['String']['output'];
  setTierDefaultBillingCycle: ServiceOfferingMutationResult;
  setTierDefaultBillingCycleAsync: Scalars['String']['output'];
  setTierPricingMode: ServiceOfferingMutationResult;
  setTierPricingModeAsync: Scalars['String']['output'];
  updateOfferingInfo: ServiceOfferingMutationResult;
  updateOfferingInfoAsync: Scalars['String']['output'];
  updateOfferingStatus: ServiceOfferingMutationResult;
  updateOfferingStatusAsync: Scalars['String']['output'];
  updateOptionGroup: ServiceOfferingMutationResult;
  updateOptionGroupAsync: Scalars['String']['output'];
  updateOptionGroupTierPricing: ServiceOfferingMutationResult;
  updateOptionGroupTierPricingAsync: Scalars['String']['output'];
  updateService: ServiceOfferingMutationResult;
  updateServiceAsync: Scalars['String']['output'];
  updateServiceLevel: ServiceOfferingMutationResult;
  updateServiceLevelAsync: Scalars['String']['output'];
  updateTier: ServiceOfferingMutationResult;
  updateTierAsync: Scalars['String']['output'];
  updateTierPricing: ServiceOfferingMutationResult;
  updateTierPricingAsync: Scalars['String']['output'];
  updateUsageLimit: ServiceOfferingMutationResult;
  updateUsageLimitAsync: Scalars['String']['output'];
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddFacetOptionArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddFacetOptionInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddFacetOptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddFacetOptionInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddOptionGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddOptionGroupInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddOptionGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddOptionGroupInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddOptionGroupTierPricingArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddOptionGroupTierPricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddOptionGroupTierPricingAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddOptionGroupTierPricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddServiceArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddServiceInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddServiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddServiceInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddServiceLevelArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddServiceLevelInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddServiceLevelAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddServiceLevelInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddTierArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddTierInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddTierAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddTierInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddUsageLimitArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddUsageLimitInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsAddUsageLimitAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_AddUsageLimitInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsChangeResourceTemplateArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_ChangeResourceTemplateInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsChangeResourceTemplateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_ChangeResourceTemplateInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<ServiceOffering_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsDeleteOptionGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_DeleteOptionGroupInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsDeleteOptionGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_DeleteOptionGroupInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsDeleteServiceArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_DeleteServiceInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsDeleteServiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_DeleteServiceInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsDeleteTierArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_DeleteTierInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsDeleteTierAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_DeleteTierInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveFacetOptionArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveFacetOptionInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveFacetOptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveFacetOptionInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveFacetTargetArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveFacetTargetInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveFacetTargetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveFacetTargetInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveOptionGroupTierPricingArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveOptionGroupTierPricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveOptionGroupTierPricingAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveOptionGroupTierPricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveServiceLevelArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveServiceLevelInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveServiceLevelAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveServiceLevelInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveUsageLimitArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveUsageLimitInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsRemoveUsageLimitAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_RemoveUsageLimitInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSelectResourceTemplateArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SelectResourceTemplateInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSelectResourceTemplateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SelectResourceTemplateInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetAvailableBillingCyclesArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetAvailableBillingCyclesInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetAvailableBillingCyclesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetAvailableBillingCyclesInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetFacetTargetArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetFacetTargetInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetFacetTargetAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetFacetTargetInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetOfferingIdArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetOfferingIdInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetOfferingIdAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetOfferingIdInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetOperatorArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetOperatorInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetOperatorAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetOperatorInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetOptionGroupDiscountModeArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetOptionGroupDiscountModeInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetOptionGroupDiscountModeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetOptionGroupDiscountModeInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetOptionGroupStandalonePricingArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetOptionGroupStandalonePricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetOptionGroupStandalonePricingAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetOptionGroupStandalonePricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetTierBillingCycleDiscountsArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetTierBillingCycleDiscountsInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetTierBillingCycleDiscountsAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetTierBillingCycleDiscountsInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetTierDefaultBillingCycleArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetTierDefaultBillingCycleInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetTierDefaultBillingCycleAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetTierDefaultBillingCycleInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetTierPricingModeArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetTierPricingModeInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsSetTierPricingModeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_SetTierPricingModeInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateOfferingInfoArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateOfferingInfoInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateOfferingInfoAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateOfferingInfoInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateOfferingStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateOfferingStatusInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateOfferingStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateOfferingStatusInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateOptionGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateOptionGroupInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateOptionGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateOptionGroupInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateOptionGroupTierPricingArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateOptionGroupTierPricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateOptionGroupTierPricingAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateOptionGroupTierPricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateServiceArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateServiceInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateServiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateServiceInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateServiceLevelArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateServiceLevelInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateServiceLevelAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateServiceLevelInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateTierArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateTierInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateTierAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateTierInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateTierPricingArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateTierPricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateTierPricingAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateTierPricingInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateUsageLimitArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateUsageLimitInput;
};


/** Mutations: ServiceOffering */
export type ServiceOfferingMutationsUpdateUsageLimitAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: ServiceOffering_UpdateUsageLimitInput;
};

/** Queries: ServiceOffering Document */
export type ServiceOfferingQueries = {
  __typename?: 'ServiceOfferingQueries';
  /** Get all ServiceOffering documents (paged) */
  ServiceOffering_documents: ServiceOffering_DocumentResultPage;
  /** Get a specific ServiceOffering document by identifier */
  document?: Maybe<ServiceOffering_DocumentWithChildren>;
  /** Get children of a ServiceOffering document */
  documentChildren: ServiceOffering_DocumentResultPage;
  /** Get parents of a ServiceOffering document */
  documentParents: ServiceOffering_DocumentResultPage;
  /** Find ServiceOffering documents by search criteria */
  findDocuments: ServiceOffering_DocumentResultPage;
};


/** Queries: ServiceOffering Document */
export type ServiceOfferingQueriesServiceOffering_DocumentsArgs = {
  paging?: InputMaybe<ServiceOffering_PagingInput>;
};


/** Queries: ServiceOffering Document */
export type ServiceOfferingQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<ServiceOffering_ViewFilterInput>;
};


/** Queries: ServiceOffering Document */
export type ServiceOfferingQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<ServiceOffering_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<ServiceOffering_ViewFilterInput>;
};


/** Queries: ServiceOffering Document */
export type ServiceOfferingQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<ServiceOffering_PagingInput>;
  view?: InputMaybe<ServiceOffering_ViewFilterInput>;
};


/** Queries: ServiceOffering Document */
export type ServiceOfferingQueriesFindDocumentsArgs = {
  paging?: InputMaybe<ServiceOffering_PagingInput>;
  search: ServiceOffering_SearchFilterInput;
  view?: InputMaybe<ServiceOffering_ViewFilterInput>;
};

export type ServiceOffering_AddFacetOptionInput = {
  categoryKey: Scalars['String']['input'];
  lastModified: Scalars['DateTime']['input'];
  optionId: Scalars['String']['input'];
};

export enum ServiceOffering_AddOnPricingMode {
  Standalone = 'STANDALONE',
  TierDependent = 'TIER_DEPENDENT'
}

/** Module: OptionGroups */
export type ServiceOffering_AddOptionGroupInput = {
  availableBillingCycles?: InputMaybe<Array<ServiceOffering_BillingCycle>>;
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

export type ServiceOffering_AddOptionGroupTierPricingInput = {
  lastModified: Scalars['DateTime']['input'];
  optionGroupId: Scalars['OID']['input'];
  recurringPricing: Array<ServiceOffering_RecurringPriceOptionInput>;
  setupCost?: InputMaybe<ServiceOffering_SetupCostInput>;
  setupCostDiscounts?: InputMaybe<Array<ServiceOffering_BillingCycleDiscountInput>>;
  tierId: Scalars['OID']['input'];
  tierPricingId: Scalars['OID']['input'];
};

/** Module: Services */
export type ServiceOffering_AddServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  isSetupFormation?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
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

/** Module: Tiers */
export type ServiceOffering_AddTierInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  currency: Scalars['Currency']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  isCustomPricing?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
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

export type ServiceOffering_BillingCycleDiscount = {
  __typename?: 'ServiceOffering_BillingCycleDiscount';
  billingCycle: ServiceOffering_BillingCycle;
  discountRule: ServiceOffering_DiscountRule;
};

export type ServiceOffering_BillingCycleDiscountInput = {
  billingCycle: ServiceOffering_BillingCycle;
  discountRule: ServiceOffering_DiscountRuleInput;
};

export type ServiceOffering_ChangeResourceTemplateInput = {
  lastModified: Scalars['DateTime']['input'];
  newTemplateId: Scalars['PHID']['input'];
  previousTemplateId: Scalars['PHID']['input'];
};

export type ServiceOffering_DeleteOptionGroupInput = {
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

export enum ServiceOffering_DiscountMode {
  Independent = 'INDEPENDENT',
  InheritTier = 'INHERIT_TIER'
}

export type ServiceOffering_DiscountRule = {
  __typename?: 'ServiceOffering_DiscountRule';
  discountType: ServiceOffering_DiscountType;
  discountValue: Scalars['Float']['output'];
};

export type ServiceOffering_DiscountRuleInput = {
  discountType: ServiceOffering_DiscountType;
  discountValue: Scalars['Float']['input'];
};

export enum ServiceOffering_DiscountType {
  FlatAmount = 'FLAT_AMOUNT',
  Percentage = 'PERCENTAGE'
}

/** Paginated result type for ServiceOffering documents */
export type ServiceOffering_DocumentResultPage = {
  __typename?: 'ServiceOffering_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<ServiceOfferingMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for ServiceOffering */
export type ServiceOffering_DocumentWithChildren = {
  __typename?: 'ServiceOffering_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: ServiceOfferingMutationResult;
};

export type ServiceOffering_FacetTarget = {
  __typename?: 'ServiceOffering_FacetTarget';
  categoryKey: Scalars['String']['output'];
  categoryLabel: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOptions: Array<Scalars['String']['output']>;
};

export type ServiceOffering_FacetTargetInput = {
  categoryKey?: InputMaybe<Scalars['String']['input']>;
  categoryLabel?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  selectedOptions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Full state with all scopes for ServiceOffering */
export type ServiceOffering_FullState = {
  __typename?: 'ServiceOffering_FullState';
  auth: Scalars['JSONObject']['output'];
  document: ServiceOffering_PhDocumentScopeState;
  global: ServiceOffering_ServiceOfferingState;
  local: Scalars['JSONObject']['output'];
};

export enum ServiceOffering_GroupCostType {
  Recurring = 'RECURRING',
  Setup = 'SETUP'
}

export type ServiceOffering_InitialStateInput = {
  global?: InputMaybe<ServiceOffering_ServiceOfferingStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type ServiceOffering_OptionGroup = {
  __typename?: 'ServiceOffering_OptionGroup';
  availableBillingCycles: Array<ServiceOffering_BillingCycle>;
  billingCycleDiscounts: Array<ServiceOffering_BillingCycleDiscount>;
  costType?: Maybe<ServiceOffering_GroupCostType>;
  currency?: Maybe<Scalars['Currency']['output']>;
  defaultSelected: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  discountMode?: Maybe<ServiceOffering_DiscountMode>;
  id: Scalars['OID']['output'];
  isAddOn: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Amount_Money']['output']>;
  pricingMode?: Maybe<ServiceOffering_AddOnPricingMode>;
  standalonePricing?: Maybe<ServiceOffering_StandalonePricing>;
  tierDependentPricing?: Maybe<Array<ServiceOffering_OptionGroupTierPricing>>;
};

export type ServiceOffering_OptionGroupInput = {
  availableBillingCycles?: InputMaybe<Array<InputMaybe<ServiceOffering_BillingCycle>>>;
  billingCycleDiscounts?: InputMaybe<Array<InputMaybe<ServiceOffering_BillingCycleDiscountInput>>>;
  costType?: InputMaybe<ServiceOffering_GroupCostType>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  defaultSelected?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  discountMode?: InputMaybe<ServiceOffering_DiscountMode>;
  id?: InputMaybe<Scalars['OID']['input']>;
  isAddOn?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Amount_Money']['input']>;
  pricingMode?: InputMaybe<ServiceOffering_AddOnPricingMode>;
  standalonePricing?: InputMaybe<ServiceOffering_StandalonePricingInput>;
  tierDependentPricing?: InputMaybe<Array<InputMaybe<ServiceOffering_OptionGroupTierPricingInput>>>;
};

export type ServiceOffering_OptionGroupTierPricing = {
  __typename?: 'ServiceOffering_OptionGroupTierPricing';
  id: Scalars['OID']['output'];
  recurringPricing: Array<ServiceOffering_RecurringPriceOption>;
  setupCost?: Maybe<ServiceOffering_SetupCost>;
  setupCostDiscounts: Array<ServiceOffering_BillingCycleDiscount>;
  tierId: Scalars['OID']['output'];
};

export type ServiceOffering_OptionGroupTierPricingInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  recurringPricing?: InputMaybe<Array<InputMaybe<ServiceOffering_RecurringPriceOptionInput>>>;
  setupCost?: InputMaybe<ServiceOffering_SetupCostInput>;
  setupCostDiscounts?: InputMaybe<Array<InputMaybe<ServiceOffering_BillingCycleDiscountInput>>>;
  tierId?: InputMaybe<Scalars['OID']['input']>;
};

/** Document scope state (same for all document types) */
export type ServiceOffering_PhDocumentScopeState = {
  __typename?: 'ServiceOffering_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: ServiceOffering_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type ServiceOffering_PhHashConfig = {
  __typename?: 'ServiceOffering_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type ServiceOffering_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type ServiceOffering_RecurringPriceOption = {
  __typename?: 'ServiceOffering_RecurringPriceOption';
  amount: Scalars['Amount_Money']['output'];
  billingCycle: ServiceOffering_BillingCycle;
  currency: Scalars['Currency']['output'];
  discount?: Maybe<ServiceOffering_DiscountRule>;
  id: Scalars['OID']['output'];
};

export type ServiceOffering_RecurringPriceOptionInput = {
  amount: Scalars['Amount_Money']['input'];
  billingCycle: ServiceOffering_BillingCycle;
  currency: Scalars['Currency']['input'];
  discount?: InputMaybe<ServiceOffering_DiscountRuleInput>;
  id: Scalars['OID']['input'];
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

export type ServiceOffering_RemoveOptionGroupTierPricingInput = {
  lastModified: Scalars['DateTime']['input'];
  optionGroupId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_RemoveServiceLevelInput = {
  lastModified: Scalars['DateTime']['input'];
  serviceLevelId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_RemoveUsageLimitInput = {
  lastModified: Scalars['DateTime']['input'];
  limitId: Scalars['OID']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceOffering_SelectResourceTemplateInput = {
  lastModified: Scalars['DateTime']['input'];
  resourceTemplateId: Scalars['PHID']['input'];
};

export type ServiceOffering_Service = {
  __typename?: 'ServiceOffering_Service';
  description?: Maybe<Scalars['String']['output']>;
  displayOrder?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  isSetupFormation: Scalars['Boolean']['output'];
  optionGroupId?: Maybe<Scalars['OID']['output']>;
  title: Scalars['String']['output'];
};

export type ServiceOffering_ServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  isSetupFormation?: InputMaybe<Scalars['Boolean']['input']>;
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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

export type ServiceOffering_ServiceLevelBindingInput = {
  customValue?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  level?: InputMaybe<ServiceOffering_ServiceLevel>;
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
  serviceId?: InputMaybe<Scalars['OID']['input']>;
};

export type ServiceOffering_ServiceOfferingState = {
  __typename?: 'ServiceOffering_ServiceOfferingState';
  availableBillingCycles: Array<ServiceOffering_BillingCycle>;
  description?: Maybe<Scalars['String']['output']>;
  facetTargets: Array<ServiceOffering_FacetTarget>;
  id?: Maybe<Scalars['PHID']['output']>;
  infoLink?: Maybe<Scalars['URL']['output']>;
  lastModified?: Maybe<Scalars['DateTime']['output']>;
  operatorId?: Maybe<Scalars['PHID']['output']>;
  optionGroups: Array<ServiceOffering_OptionGroup>;
  resourceTemplateId?: Maybe<Scalars['PHID']['output']>;
  services: Array<ServiceOffering_Service>;
  status: ServiceOffering_ServiceStatus;
  summary: Scalars['String']['output'];
  thumbnailUrl?: Maybe<Scalars['URL']['output']>;
  tiers: Array<ServiceOffering_ServiceSubscriptionTier>;
  title: Scalars['String']['output'];
};

/** Input Types for Initial State */
export type ServiceOffering_ServiceOfferingStateInput = {
  availableBillingCycles?: InputMaybe<Array<InputMaybe<ServiceOffering_BillingCycle>>>;
  description?: InputMaybe<Scalars['String']['input']>;
  facetTargets?: InputMaybe<Array<InputMaybe<ServiceOffering_FacetTargetInput>>>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  infoLink?: InputMaybe<Scalars['URL']['input']>;
  lastModified?: InputMaybe<Scalars['DateTime']['input']>;
  operatorId?: InputMaybe<Scalars['PHID']['input']>;
  optionGroups?: InputMaybe<Array<InputMaybe<ServiceOffering_OptionGroupInput>>>;
  resourceTemplateId?: InputMaybe<Scalars['PHID']['input']>;
  services?: InputMaybe<Array<InputMaybe<ServiceOffering_ServiceInput>>>;
  status?: InputMaybe<ServiceOffering_ServiceStatus>;
  summary?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
  tiers?: InputMaybe<Array<InputMaybe<ServiceOffering_ServiceSubscriptionTierInput>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceOffering_ServicePricing = {
  __typename?: 'ServiceOffering_ServicePricing';
  amount?: Maybe<Scalars['Amount_Money']['output']>;
  currency: Scalars['Currency']['output'];
};

export type ServiceOffering_ServicePricingInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
};

export enum ServiceOffering_ServiceStatus {
  Active = 'ACTIVE',
  ComingSoon = 'COMING_SOON',
  Deprecated = 'DEPRECATED',
  Draft = 'DRAFT'
}

export type ServiceOffering_ServiceSubscriptionTier = {
  __typename?: 'ServiceOffering_ServiceSubscriptionTier';
  billingCycleDiscounts: Array<ServiceOffering_BillingCycleDiscount>;
  defaultBillingCycle?: Maybe<ServiceOffering_BillingCycle>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['OID']['output'];
  isCustomPricing: Scalars['Boolean']['output'];
  mostPopular: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  pricing: ServiceOffering_ServicePricing;
  pricingMode?: Maybe<ServiceOffering_TierPricingMode>;
  serviceLevels: Array<ServiceOffering_ServiceLevelBinding>;
  usageLimits: Array<ServiceOffering_ServiceUsageLimit>;
};

export type ServiceOffering_ServiceSubscriptionTierInput = {
  billingCycleDiscounts?: InputMaybe<Array<InputMaybe<ServiceOffering_BillingCycleDiscountInput>>>;
  defaultBillingCycle?: InputMaybe<ServiceOffering_BillingCycle>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  isCustomPricing?: InputMaybe<Scalars['Boolean']['input']>;
  mostPopular?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pricing?: InputMaybe<ServiceOffering_ServicePricingInput>;
  pricingMode?: InputMaybe<ServiceOffering_TierPricingMode>;
  serviceLevels?: InputMaybe<Array<InputMaybe<ServiceOffering_ServiceLevelBindingInput>>>;
  usageLimits?: InputMaybe<Array<InputMaybe<ServiceOffering_ServiceUsageLimitInput>>>;
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

export type ServiceOffering_ServiceUsageLimitInput = {
  freeLimit?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  metric?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  paidLimit?: InputMaybe<Scalars['Int']['input']>;
  resetCycle?: InputMaybe<ServiceOffering_UsageResetCycle>;
  serviceId?: InputMaybe<Scalars['OID']['input']>;
  unitName?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['Amount_Money']['input']>;
  unitPriceCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export type ServiceOffering_SetAvailableBillingCyclesInput = {
  billingCycles: Array<ServiceOffering_BillingCycle>;
  lastModified: Scalars['DateTime']['input'];
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

export type ServiceOffering_SetOptionGroupDiscountModeInput = {
  discountMode: ServiceOffering_DiscountMode;
  lastModified: Scalars['DateTime']['input'];
  optionGroupId: Scalars['OID']['input'];
};

export type ServiceOffering_SetOptionGroupStandalonePricingInput = {
  billingCycleDiscounts?: InputMaybe<Array<ServiceOffering_BillingCycleDiscountInput>>;
  lastModified: Scalars['DateTime']['input'];
  optionGroupId: Scalars['OID']['input'];
  recurringPricing: Array<ServiceOffering_RecurringPriceOptionInput>;
  setupCost?: InputMaybe<ServiceOffering_SetupCostInput>;
};

export type ServiceOffering_SetTierBillingCycleDiscountsInput = {
  discounts: Array<ServiceOffering_BillingCycleDiscountInput>;
  lastModified: Scalars['DateTime']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_SetTierDefaultBillingCycleInput = {
  defaultBillingCycle: ServiceOffering_BillingCycle;
  lastModified: Scalars['DateTime']['input'];
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_SetTierPricingModeInput = {
  lastModified: Scalars['DateTime']['input'];
  pricingMode: ServiceOffering_TierPricingMode;
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_SetupCost = {
  __typename?: 'ServiceOffering_SetupCost';
  amount: Scalars['Amount_Money']['output'];
  currency: Scalars['Currency']['output'];
  discount?: Maybe<ServiceOffering_DiscountRule>;
};

export type ServiceOffering_SetupCostInput = {
  amount: Scalars['Amount_Money']['input'];
  currency: Scalars['Currency']['input'];
  discount?: InputMaybe<ServiceOffering_DiscountRuleInput>;
};

export type ServiceOffering_StandalonePricing = {
  __typename?: 'ServiceOffering_StandalonePricing';
  recurringPricing: Array<ServiceOffering_RecurringPriceOption>;
  setupCost?: Maybe<ServiceOffering_SetupCost>;
};

export type ServiceOffering_StandalonePricingInput = {
  recurringPricing?: InputMaybe<Array<InputMaybe<ServiceOffering_RecurringPriceOptionInput>>>;
  setupCost?: InputMaybe<ServiceOffering_SetupCostInput>;
};

export enum ServiceOffering_TierPricingMode {
  Calculated = 'CALCULATED',
  ManualOverride = 'MANUAL_OVERRIDE'
}

/** Module: Offering */
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
  availableBillingCycles?: InputMaybe<Array<ServiceOffering_BillingCycle>>;
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

export type ServiceOffering_UpdateOptionGroupTierPricingInput = {
  lastModified: Scalars['DateTime']['input'];
  optionGroupId: Scalars['OID']['input'];
  recurringPricing?: InputMaybe<Array<ServiceOffering_RecurringPriceOptionInput>>;
  setupCost?: InputMaybe<ServiceOffering_SetupCostInput>;
  setupCostDiscounts?: InputMaybe<Array<ServiceOffering_BillingCycleDiscountInput>>;
  tierId: Scalars['OID']['input'];
};

export type ServiceOffering_UpdateServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  displayOrder?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  isSetupFormation?: InputMaybe<Scalars['Boolean']['input']>;
  lastModified: Scalars['DateTime']['input'];
  optionGroupId?: InputMaybe<Scalars['OID']['input']>;
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
  mostPopular?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ServiceOffering_UpdateTierPricingInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  lastModified: Scalars['DateTime']['input'];
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
  Annual = 'ANNUAL',
  Daily = 'DAILY',
  Hourly = 'HOURLY',
  Monthly = 'MONTHLY',
  None = 'NONE',
  Quarterly = 'QUARTERLY',
  SemiAnnual = 'SEMI_ANNUAL',
  Weekly = 'WEEKLY'
}

export type ServiceOffering_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

/**
 * Mutation result type for SnapshotReport operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type SnapshotReportMutationResult = {
  __typename?: 'SnapshotReportMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: SnapshotReport_FullState;
};

/** Mutations: SnapshotReport */
export type SnapshotReportMutations = {
  __typename?: 'SnapshotReportMutations';
  addOwnerId: SnapshotReportMutationResult;
  addOwnerIdAsync: Scalars['String']['output'];
  addSnapshotAccount: SnapshotReportMutationResult;
  addSnapshotAccountAsync: Scalars['String']['output'];
  addTransaction: SnapshotReportMutationResult;
  addTransactionAsync: Scalars['String']['output'];
  createDocument: SnapshotReportMutationResult;
  createEmptyDocument: SnapshotReportMutationResult;
  recalculateFlowTypes: SnapshotReportMutationResult;
  recalculateFlowTypesAsync: Scalars['String']['output'];
  removeEndingBalance: SnapshotReportMutationResult;
  removeEndingBalanceAsync: Scalars['String']['output'];
  removeOwnerId: SnapshotReportMutationResult;
  removeOwnerIdAsync: Scalars['String']['output'];
  removeSnapshotAccount: SnapshotReportMutationResult;
  removeSnapshotAccountAsync: Scalars['String']['output'];
  removeStartingBalance: SnapshotReportMutationResult;
  removeStartingBalanceAsync: Scalars['String']['output'];
  removeTransaction: SnapshotReportMutationResult;
  removeTransactionAsync: Scalars['String']['output'];
  setAccountsDocument: SnapshotReportMutationResult;
  setAccountsDocumentAsync: Scalars['String']['output'];
  setEndingBalance: SnapshotReportMutationResult;
  setEndingBalanceAsync: Scalars['String']['output'];
  setPeriod: SnapshotReportMutationResult;
  setPeriodAsync: Scalars['String']['output'];
  setPeriodEnd: SnapshotReportMutationResult;
  setPeriodEndAsync: Scalars['String']['output'];
  setPeriodStart: SnapshotReportMutationResult;
  setPeriodStartAsync: Scalars['String']['output'];
  setReportConfig: SnapshotReportMutationResult;
  setReportConfigAsync: Scalars['String']['output'];
  setStartingBalance: SnapshotReportMutationResult;
  setStartingBalanceAsync: Scalars['String']['output'];
  updateSnapshotAccountType: SnapshotReportMutationResult;
  updateSnapshotAccountTypeAsync: Scalars['String']['output'];
  updateTransactionFlowType: SnapshotReportMutationResult;
  updateTransactionFlowTypeAsync: Scalars['String']['output'];
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsAddOwnerIdArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_AddOwnerIdInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsAddOwnerIdAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_AddOwnerIdInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsAddSnapshotAccountArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_AddSnapshotAccountInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsAddSnapshotAccountAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_AddSnapshotAccountInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsAddTransactionArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_AddTransactionInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsAddTransactionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_AddTransactionInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<SnapshotReport_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRecalculateFlowTypesArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RecalculateFlowTypesInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRecalculateFlowTypesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RecalculateFlowTypesInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveEndingBalanceArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveEndingBalanceInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveEndingBalanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveEndingBalanceInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveOwnerIdArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveOwnerIdInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveOwnerIdAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveOwnerIdInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveSnapshotAccountArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveSnapshotAccountInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveSnapshotAccountAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveSnapshotAccountInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveStartingBalanceArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveStartingBalanceInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveStartingBalanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveStartingBalanceInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveTransactionArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveTransactionInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsRemoveTransactionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_RemoveTransactionInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetAccountsDocumentArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetAccountsDocumentInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetAccountsDocumentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetAccountsDocumentInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetEndingBalanceArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetEndingBalanceInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetEndingBalanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetEndingBalanceInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetPeriodArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetPeriodInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetPeriodAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetPeriodInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetPeriodEndArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetPeriodEndInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetPeriodEndAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetPeriodEndInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetPeriodStartArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetPeriodStartInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetPeriodStartAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetPeriodStartInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetReportConfigArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetReportConfigInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetReportConfigAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetReportConfigInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetStartingBalanceArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetStartingBalanceInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsSetStartingBalanceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_SetStartingBalanceInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsUpdateSnapshotAccountTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_UpdateSnapshotAccountTypeInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsUpdateSnapshotAccountTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_UpdateSnapshotAccountTypeInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsUpdateTransactionFlowTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_UpdateTransactionFlowTypeInput;
};


/** Mutations: SnapshotReport */
export type SnapshotReportMutationsUpdateTransactionFlowTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SnapshotReport_UpdateTransactionFlowTypeInput;
};

/** Queries: SnapshotReport Document */
export type SnapshotReportQueries = {
  __typename?: 'SnapshotReportQueries';
  /** Get all SnapshotReport documents (paged) */
  SnapshotReport_documents: SnapshotReport_DocumentResultPage;
  /** Get a specific SnapshotReport document by identifier */
  document?: Maybe<SnapshotReport_DocumentWithChildren>;
  /** Get children of a SnapshotReport document */
  documentChildren: SnapshotReport_DocumentResultPage;
  /** Get parents of a SnapshotReport document */
  documentParents: SnapshotReport_DocumentResultPage;
  /** Find SnapshotReport documents by search criteria */
  findDocuments: SnapshotReport_DocumentResultPage;
};


/** Queries: SnapshotReport Document */
export type SnapshotReportQueriesSnapshotReport_DocumentsArgs = {
  paging?: InputMaybe<SnapshotReport_PagingInput>;
};


/** Queries: SnapshotReport Document */
export type SnapshotReportQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<SnapshotReport_ViewFilterInput>;
};


/** Queries: SnapshotReport Document */
export type SnapshotReportQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<SnapshotReport_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<SnapshotReport_ViewFilterInput>;
};


/** Queries: SnapshotReport Document */
export type SnapshotReportQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<SnapshotReport_PagingInput>;
  view?: InputMaybe<SnapshotReport_ViewFilterInput>;
};


/** Queries: SnapshotReport Document */
export type SnapshotReportQueriesFindDocumentsArgs = {
  paging?: InputMaybe<SnapshotReport_PagingInput>;
  search: SnapshotReport_SearchFilterInput;
  view?: InputMaybe<SnapshotReport_ViewFilterInput>;
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

/** Paginated result type for SnapshotReport documents */
export type SnapshotReport_DocumentResultPage = {
  __typename?: 'SnapshotReport_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<SnapshotReportMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for SnapshotReport */
export type SnapshotReport_DocumentWithChildren = {
  __typename?: 'SnapshotReport_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: SnapshotReportMutationResult;
};

/** Full state with all scopes for SnapshotReport */
export type SnapshotReport_FullState = {
  __typename?: 'SnapshotReport_FullState';
  auth: Scalars['JSONObject']['output'];
  document: SnapshotReport_PhDocumentScopeState;
  global: SnapshotReport_SnapshotReportState;
  local: Scalars['JSONObject']['output'];
};

export type SnapshotReport_InitialStateInput = {
  global?: InputMaybe<SnapshotReport_SnapshotReportStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type SnapshotReport_PhDocumentScopeState = {
  __typename?: 'SnapshotReport_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: SnapshotReport_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type SnapshotReport_PhHashConfig = {
  __typename?: 'SnapshotReport_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type SnapshotReport_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type SnapshotReport_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
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

export type SnapshotReport_SnapshotAccountInput = {
  accountAddress?: InputMaybe<Scalars['String']['input']>;
  accountId?: InputMaybe<Scalars['OID']['input']>;
  accountName?: InputMaybe<Scalars['String']['input']>;
  accountTransactionsId?: InputMaybe<Scalars['PHID']['input']>;
  endingBalances?: InputMaybe<Array<InputMaybe<SnapshotReport_TokenBalanceInput>>>;
  id?: InputMaybe<Scalars['OID']['input']>;
  startingBalances?: InputMaybe<Array<InputMaybe<SnapshotReport_TokenBalanceInput>>>;
  transactions?: InputMaybe<Array<InputMaybe<SnapshotReport_SnapshotTransactionInput>>>;
  type?: InputMaybe<SnapshotReport_AccountType>;
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

/** Input Types for Initial State */
export type SnapshotReport_SnapshotReportStateInput = {
  accountsDocumentId?: InputMaybe<Scalars['PHID']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  ownerIds?: InputMaybe<Array<InputMaybe<Scalars['PHID']['input']>>>;
  reportName?: InputMaybe<Scalars['String']['input']>;
  reportPeriodEnd?: InputMaybe<Scalars['DateTime']['input']>;
  reportPeriodStart?: InputMaybe<Scalars['DateTime']['input']>;
  snapshotAccounts?: InputMaybe<Array<InputMaybe<SnapshotReport_SnapshotAccountInput>>>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
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

export type SnapshotReport_SnapshotTransactionInput = {
  amount?: InputMaybe<Scalars['Amount_Currency']['input']>;
  blockNumber?: InputMaybe<Scalars['Int']['input']>;
  counterParty?: InputMaybe<Scalars['EthereumAddress']['input']>;
  counterPartyAccountId?: InputMaybe<Scalars['OID']['input']>;
  datetime?: InputMaybe<Scalars['DateTime']['input']>;
  direction?: InputMaybe<SnapshotReport_TransactionDirection>;
  flowType?: InputMaybe<SnapshotReport_TransactionFlowType>;
  id?: InputMaybe<Scalars['OID']['input']>;
  token?: InputMaybe<Scalars['Currency']['input']>;
  transactionId?: InputMaybe<Scalars['String']['input']>;
  txHash?: InputMaybe<Scalars['String']['input']>;
};

export type SnapshotReport_TokenBalance = {
  __typename?: 'SnapshotReport_TokenBalance';
  amount: Scalars['Amount_Currency']['output'];
  id: Scalars['OID']['output'];
  token: Scalars['Currency']['output'];
};

export type SnapshotReport_TokenBalanceInput = {
  amount?: InputMaybe<Scalars['Amount_Currency']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  token?: InputMaybe<Scalars['Currency']['input']>;
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

export type SnapshotReport_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  documentChanges: DocumentChangeEvent;
  jobChanges: JobChangeEvent;
};


export type SubscriptionDocumentChangesArgs = {
  search: SearchFilterInput;
  view?: InputMaybe<ViewFilterInput>;
};


export type SubscriptionJobChangesArgs = {
  jobId: Scalars['String']['input'];
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

/**
 * Mutation result type for SubscriptionInstance operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type SubscriptionInstanceMutationResult = {
  __typename?: 'SubscriptionInstanceMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: SubscriptionInstance_FullState;
};

/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutations = {
  __typename?: 'SubscriptionInstanceMutations';
  activateSubscription: SubscriptionInstanceMutationResult;
  activateSubscriptionAsync: Scalars['String']['output'];
  addService: SubscriptionInstanceMutationResult;
  addServiceAsync: Scalars['String']['output'];
  addServiceFacetSelection: SubscriptionInstanceMutationResult;
  addServiceFacetSelectionAsync: Scalars['String']['output'];
  addServiceGroup: SubscriptionInstanceMutationResult;
  addServiceGroupAsync: Scalars['String']['output'];
  addServiceMetric: SubscriptionInstanceMutationResult;
  addServiceMetricAsync: Scalars['String']['output'];
  addServiceToGroup: SubscriptionInstanceMutationResult;
  addServiceToGroupAsync: Scalars['String']['output'];
  cancelSubscription: SubscriptionInstanceMutationResult;
  cancelSubscriptionAsync: Scalars['String']['output'];
  createDocument: SubscriptionInstanceMutationResult;
  createEmptyDocument: SubscriptionInstanceMutationResult;
  decrementMetricUsage: SubscriptionInstanceMutationResult;
  decrementMetricUsageAsync: Scalars['String']['output'];
  incrementMetricUsage: SubscriptionInstanceMutationResult;
  incrementMetricUsageAsync: Scalars['String']['output'];
  initializeSubscription: SubscriptionInstanceMutationResult;
  initializeSubscriptionAsync: Scalars['String']['output'];
  pauseSubscription: SubscriptionInstanceMutationResult;
  pauseSubscriptionAsync: Scalars['String']['output'];
  removeBudgetCategory: SubscriptionInstanceMutationResult;
  removeBudgetCategoryAsync: Scalars['String']['output'];
  removeService: SubscriptionInstanceMutationResult;
  removeServiceAsync: Scalars['String']['output'];
  removeServiceFacetSelection: SubscriptionInstanceMutationResult;
  removeServiceFacetSelectionAsync: Scalars['String']['output'];
  removeServiceFromGroup: SubscriptionInstanceMutationResult;
  removeServiceFromGroupAsync: Scalars['String']['output'];
  removeServiceGroup: SubscriptionInstanceMutationResult;
  removeServiceGroupAsync: Scalars['String']['output'];
  removeServiceMetric: SubscriptionInstanceMutationResult;
  removeServiceMetricAsync: Scalars['String']['output'];
  renewExpiringSubscription: SubscriptionInstanceMutationResult;
  renewExpiringSubscriptionAsync: Scalars['String']['output'];
  reportRecurringPayment: SubscriptionInstanceMutationResult;
  reportRecurringPaymentAsync: Scalars['String']['output'];
  reportSetupPayment: SubscriptionInstanceMutationResult;
  reportSetupPaymentAsync: Scalars['String']['output'];
  resumeSubscription: SubscriptionInstanceMutationResult;
  resumeSubscriptionAsync: Scalars['String']['output'];
  setAutoRenew: SubscriptionInstanceMutationResult;
  setAutoRenewAsync: Scalars['String']['output'];
  setBudgetCategory: SubscriptionInstanceMutationResult;
  setBudgetCategoryAsync: Scalars['String']['output'];
  setCustomerType: SubscriptionInstanceMutationResult;
  setCustomerTypeAsync: Scalars['String']['output'];
  setExpiring: SubscriptionInstanceMutationResult;
  setExpiringAsync: Scalars['String']['output'];
  setOperatorNotes: SubscriptionInstanceMutationResult;
  setOperatorNotesAsync: Scalars['String']['output'];
  setRenewalDate: SubscriptionInstanceMutationResult;
  setRenewalDateAsync: Scalars['String']['output'];
  setResourceDocument: SubscriptionInstanceMutationResult;
  setResourceDocumentAsync: Scalars['String']['output'];
  updateBillingProjection: SubscriptionInstanceMutationResult;
  updateBillingProjectionAsync: Scalars['String']['output'];
  updateCustomerInfo: SubscriptionInstanceMutationResult;
  updateCustomerInfoAsync: Scalars['String']['output'];
  updateMetric: SubscriptionInstanceMutationResult;
  updateMetricAsync: Scalars['String']['output'];
  updateMetricUsage: SubscriptionInstanceMutationResult;
  updateMetricUsageAsync: Scalars['String']['output'];
  updateServiceGroupCost: SubscriptionInstanceMutationResult;
  updateServiceGroupCostAsync: Scalars['String']['output'];
  updateServiceInfo: SubscriptionInstanceMutationResult;
  updateServiceInfoAsync: Scalars['String']['output'];
  updateServiceRecurringCost: SubscriptionInstanceMutationResult;
  updateServiceRecurringCostAsync: Scalars['String']['output'];
  updateServiceSetupCost: SubscriptionInstanceMutationResult;
  updateServiceSetupCostAsync: Scalars['String']['output'];
  updateSubscriptionStatus: SubscriptionInstanceMutationResult;
  updateSubscriptionStatusAsync: Scalars['String']['output'];
  updateTeamMemberCount: SubscriptionInstanceMutationResult;
  updateTeamMemberCountAsync: Scalars['String']['output'];
  updateTierInfo: SubscriptionInstanceMutationResult;
  updateTierInfoAsync: Scalars['String']['output'];
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsActivateSubscriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_ActivateSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsActivateSubscriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_ActivateSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceFacetSelectionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceFacetSelectionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceFacetSelectionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceFacetSelectionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceGroupInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceGroupInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceMetricArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceMetricInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceMetricAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceMetricInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceToGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceToGroupInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsAddServiceToGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_AddServiceToGroupInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsCancelSubscriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_CancelSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsCancelSubscriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_CancelSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<SubscriptionInstance_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsDecrementMetricUsageArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_DecrementMetricUsageInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsDecrementMetricUsageAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_DecrementMetricUsageInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsIncrementMetricUsageArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_IncrementMetricUsageInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsIncrementMetricUsageAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_IncrementMetricUsageInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsInitializeSubscriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_InitializeSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsInitializeSubscriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_InitializeSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsPauseSubscriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_PauseSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsPauseSubscriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_PauseSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveBudgetCategoryArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveBudgetCategoryInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveBudgetCategoryAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveBudgetCategoryInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceFacetSelectionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceFacetSelectionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceFacetSelectionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceFacetSelectionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceFromGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceFromGroupInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceFromGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceFromGroupInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceGroupArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceGroupInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceGroupAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceGroupInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceMetricArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceMetricInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRemoveServiceMetricAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RemoveServiceMetricInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRenewExpiringSubscriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RenewExpiringSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsRenewExpiringSubscriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_RenewExpiringSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsReportRecurringPaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_ReportRecurringPaymentInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsReportRecurringPaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_ReportRecurringPaymentInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsReportSetupPaymentArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_ReportSetupPaymentInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsReportSetupPaymentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_ReportSetupPaymentInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsResumeSubscriptionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_ResumeSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsResumeSubscriptionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_ResumeSubscriptionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetAutoRenewArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetAutoRenewInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetAutoRenewAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetAutoRenewInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetBudgetCategoryArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetBudgetCategoryInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetBudgetCategoryAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetBudgetCategoryInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetCustomerTypeArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetCustomerTypeInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetCustomerTypeAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetCustomerTypeInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetExpiringArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetExpiringInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetExpiringAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetExpiringInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetOperatorNotesArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetOperatorNotesInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetOperatorNotesAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetOperatorNotesInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetRenewalDateArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetRenewalDateInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetRenewalDateAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetRenewalDateInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetResourceDocumentArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetResourceDocumentInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsSetResourceDocumentAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_SetResourceDocumentInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateBillingProjectionArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateBillingProjectionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateBillingProjectionAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateBillingProjectionInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateCustomerInfoArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateCustomerInfoInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateCustomerInfoAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateCustomerInfoInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateMetricArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateMetricInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateMetricAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateMetricInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateMetricUsageArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateMetricUsageInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateMetricUsageAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateMetricUsageInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateServiceGroupCostArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateServiceGroupCostInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateServiceGroupCostAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateServiceGroupCostInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateServiceInfoArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateServiceInfoInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateServiceInfoAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateServiceInfoInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateServiceRecurringCostArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateServiceRecurringCostInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateServiceRecurringCostAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateServiceRecurringCostInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateServiceSetupCostArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateServiceSetupCostInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateServiceSetupCostAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateServiceSetupCostInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateSubscriptionStatusArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateSubscriptionStatusInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateSubscriptionStatusAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateSubscriptionStatusInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateTeamMemberCountArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateTeamMemberCountInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateTeamMemberCountAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateTeamMemberCountInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateTierInfoArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateTierInfoInput;
};


/** Mutations: SubscriptionInstance */
export type SubscriptionInstanceMutationsUpdateTierInfoAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: SubscriptionInstance_UpdateTierInfoInput;
};

/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueries = {
  __typename?: 'SubscriptionInstanceQueries';
  /** Get all SubscriptionInstance documents (paged) */
  SubscriptionInstance_documents: SubscriptionInstance_DocumentResultPage;
  /** Get a specific SubscriptionInstance document by identifier */
  document?: Maybe<SubscriptionInstance_DocumentWithChildren>;
  /** Get children of a SubscriptionInstance document */
  documentChildren: SubscriptionInstance_DocumentResultPage;
  /** Get parents of a SubscriptionInstance document */
  documentParents: SubscriptionInstance_DocumentResultPage;
  /** Find SubscriptionInstance documents by search criteria */
  findDocuments: SubscriptionInstance_DocumentResultPage;
};


/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueriesSubscriptionInstance_DocumentsArgs = {
  paging?: InputMaybe<SubscriptionInstance_PagingInput>;
};


/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<SubscriptionInstance_ViewFilterInput>;
};


/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<SubscriptionInstance_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<SubscriptionInstance_ViewFilterInput>;
};


/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<SubscriptionInstance_PagingInput>;
  view?: InputMaybe<SubscriptionInstance_ViewFilterInput>;
};


/** Queries: SubscriptionInstance Document */
export type SubscriptionInstanceQueriesFindDocumentsArgs = {
  paging?: InputMaybe<SubscriptionInstance_PagingInput>;
  search: SubscriptionInstance_SearchFilterInput;
  view?: InputMaybe<SubscriptionInstance_ViewFilterInput>;
};

export type SubscriptionInstance_ActivateSubscriptionInput = {
  activatedSince: Scalars['DateTime']['input'];
};

export type SubscriptionInstance_AddServiceFacetSelectionInput = {
  facetName: Scalars['String']['input'];
  facetSelectionId: Scalars['OID']['input'];
  selectedOption: Scalars['String']['input'];
  serviceId: Scalars['OID']['input'];
};

/** Module: ServiceGroup */
export type SubscriptionInstance_AddServiceGroupInput = {
  costType?: InputMaybe<SubscriptionInstance_GroupCostType>;
  groupId: Scalars['OID']['input'];
  name: Scalars['String']['input'];
  optional: Scalars['Boolean']['input'];
  recurringAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  recurringBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars['Currency']['input']>;
  recurringDiscount?: InputMaybe<SubscriptionInstance_DiscountServiceInfoInput>;
  setupAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  setupBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  setupCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export type SubscriptionInstance_AddServiceInput = {
  customValue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  recurringAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  recurringBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars['Currency']['input']>;
  recurringDiscount?: InputMaybe<SubscriptionInstance_DiscountServiceInfoInput>;
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
  freeLimit?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  metricId: Scalars['OID']['input'];
  name: Scalars['String']['input'];
  nextUsageReset?: InputMaybe<Scalars['DateTime']['input']>;
  paidLimit?: InputMaybe<Scalars['Int']['input']>;
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
  customValue?: InputMaybe<Scalars['String']['input']>;
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

export type SubscriptionInstance_BudgetCategoryInput = {
  id?: InputMaybe<Scalars['OID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
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

export type SubscriptionInstance_DiscountInfo = {
  __typename?: 'SubscriptionInstance_DiscountInfo';
  discountType: SubscriptionInstance_DiscountType;
  discountValue: Scalars['Float']['output'];
  originalAmount: Scalars['Amount_Money']['output'];
  source: SubscriptionInstance_DiscountSource;
};

export type SubscriptionInstance_DiscountInfoInitInput = {
  discountType: SubscriptionInstance_DiscountType;
  discountValue: Scalars['Float']['input'];
  originalAmount: Scalars['Amount_Money']['input'];
  source: SubscriptionInstance_DiscountSource;
};

export type SubscriptionInstance_DiscountInfoInput = {
  discountType?: InputMaybe<SubscriptionInstance_DiscountType>;
  discountValue?: InputMaybe<Scalars['Float']['input']>;
  originalAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  source?: InputMaybe<SubscriptionInstance_DiscountSource>;
};

/** Module: Service */
export type SubscriptionInstance_DiscountServiceInfoInput = {
  discountType: SubscriptionInstance_DiscountType;
  discountValue: Scalars['Float']['input'];
  originalAmount: Scalars['Amount_Money']['input'];
  source: SubscriptionInstance_DiscountSource;
};

export enum SubscriptionInstance_DiscountSource {
  Bundle = 'BUNDLE',
  GroupIndependent = 'GROUP_INDEPENDENT',
  TierInherited = 'TIER_INHERITED'
}

export enum SubscriptionInstance_DiscountType {
  FlatAmount = 'FLAT_AMOUNT',
  Percentage = 'PERCENTAGE'
}

/** Paginated result type for SubscriptionInstance documents */
export type SubscriptionInstance_DocumentResultPage = {
  __typename?: 'SubscriptionInstance_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<SubscriptionInstanceMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for SubscriptionInstance */
export type SubscriptionInstance_DocumentWithChildren = {
  __typename?: 'SubscriptionInstance_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: SubscriptionInstanceMutationResult;
};

/** Full state with all scopes for SubscriptionInstance */
export type SubscriptionInstance_FullState = {
  __typename?: 'SubscriptionInstance_FullState';
  auth: Scalars['JSONObject']['output'];
  document: SubscriptionInstance_PhDocumentScopeState;
  global: SubscriptionInstance_SubscriptionInstanceState;
  local: Scalars['JSONObject']['output'];
};

export enum SubscriptionInstance_GroupCostType {
  Recurring = 'RECURRING',
  Setup = 'SETUP'
}

export type SubscriptionInstance_IncrementMetricUsageInput = {
  currentTime: Scalars['DateTime']['input'];
  incrementBy: Scalars['Int']['input'];
  metricId: Scalars['OID']['input'];
  serviceId: Scalars['OID']['input'];
};

export type SubscriptionInstance_InitialStateInput = {
  global?: InputMaybe<SubscriptionInstance_SubscriptionInstanceStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Module: Subscription */
export type SubscriptionInstance_InitializeFacetSelectionInput = {
  facetName: Scalars['String']['input'];
  id: Scalars['OID']['input'];
  selectedOption: Scalars['String']['input'];
};

export type SubscriptionInstance_InitializeMetricInput = {
  currentUsage: Scalars['Int']['input'];
  freeLimit?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['OID']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  paidLimit?: InputMaybe<Scalars['Int']['input']>;
  unitCostAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  unitCostBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  unitCostCurrency?: InputMaybe<Scalars['Currency']['input']>;
  unitName: Scalars['String']['input'];
  usageResetPeriod?: InputMaybe<SubscriptionInstance_ResetPeriod>;
};

export type SubscriptionInstance_InitializeServiceGroupInput = {
  costType?: InputMaybe<SubscriptionInstance_GroupCostType>;
  id: Scalars['OID']['input'];
  name: Scalars['String']['input'];
  optional: Scalars['Boolean']['input'];
  recurringAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  recurringBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars['Currency']['input']>;
  recurringDiscount?: InputMaybe<SubscriptionInstance_DiscountInfoInitInput>;
  services?: InputMaybe<Array<SubscriptionInstance_InitializeServiceInput>>;
  setupAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  setupBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  setupCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export type SubscriptionInstance_InitializeServiceInput = {
  customValue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  facetSelections?: InputMaybe<Array<SubscriptionInstance_InitializeFacetSelectionInput>>;
  id: Scalars['OID']['input'];
  metrics?: InputMaybe<Array<SubscriptionInstance_InitializeMetricInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  recurringAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  recurringBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars['Currency']['input']>;
  recurringDiscount?: InputMaybe<SubscriptionInstance_DiscountInfoInitInput>;
  setupAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  setupCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export type SubscriptionInstance_InitializeSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt: Scalars['DateTime']['input'];
  customerEmail?: InputMaybe<Scalars['EmailAddress']['input']>;
  customerId?: InputMaybe<Scalars['PHID']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  globalCurrency?: InputMaybe<Scalars['Currency']['input']>;
  resourceId?: InputMaybe<Scalars['PHID']['input']>;
  resourceLabel?: InputMaybe<Scalars['String']['input']>;
  resourceThumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
  selectedBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  serviceGroups?: InputMaybe<Array<SubscriptionInstance_InitializeServiceGroupInput>>;
  serviceOfferingId?: InputMaybe<Scalars['PHID']['input']>;
  services?: InputMaybe<Array<SubscriptionInstance_InitializeServiceInput>>;
  tierCurrency?: InputMaybe<Scalars['Currency']['input']>;
  tierName?: InputMaybe<Scalars['String']['input']>;
  tierPrice?: InputMaybe<Scalars['Amount_Money']['input']>;
  tierPricingMode?: InputMaybe<SubscriptionInstance_TierPricingMode>;
  tierPricingOptionId?: InputMaybe<Scalars['OID']['input']>;
};

/** Document scope state (same for all document types) */
export type SubscriptionInstance_PhDocumentScopeState = {
  __typename?: 'SubscriptionInstance_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: SubscriptionInstance_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type SubscriptionInstance_PhHashConfig = {
  __typename?: 'SubscriptionInstance_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type SubscriptionInstance_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type SubscriptionInstance_PauseSubscriptionInput = {
  pausedSince: Scalars['DateTime']['input'];
};

export type SubscriptionInstance_RecurringCost = {
  __typename?: 'SubscriptionInstance_RecurringCost';
  amount: Scalars['Amount_Money']['output'];
  billingCycle: SubscriptionInstance_BillingCycle;
  currency: Scalars['Currency']['output'];
  discount?: Maybe<SubscriptionInstance_DiscountInfo>;
  lastPaymentDate?: Maybe<Scalars['DateTime']['output']>;
  nextBillingDate?: Maybe<Scalars['DateTime']['output']>;
};

export type SubscriptionInstance_RecurringCostInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  billingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  discount?: InputMaybe<SubscriptionInstance_DiscountInfoInput>;
  lastPaymentDate?: InputMaybe<Scalars['DateTime']['input']>;
  nextBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SubscriptionInstance_RemoveBudgetCategoryInput = {
  budgetId: Scalars['OID']['input'];
};

export type SubscriptionInstance_RemoveServiceFacetSelectionInput = {
  facetSelectionId: Scalars['OID']['input'];
  serviceId: Scalars['OID']['input'];
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

export type SubscriptionInstance_ResourceDocumentInput = {
  id?: InputMaybe<Scalars['PHID']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  thumbnailUrl?: InputMaybe<Scalars['URL']['input']>;
};

export type SubscriptionInstance_ResumeSubscriptionInput = {
  timestamp: Scalars['DateTime']['input'];
};

export type SubscriptionInstance_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionInstance_Service = {
  __typename?: 'SubscriptionInstance_Service';
  customValue?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  facetSelections: Array<SubscriptionInstance_ServiceFacetSelection>;
  id: Scalars['OID']['output'];
  metrics: Array<SubscriptionInstance_ServiceMetric>;
  name?: Maybe<Scalars['String']['output']>;
  recurringCost?: Maybe<SubscriptionInstance_RecurringCost>;
  setupCost?: Maybe<SubscriptionInstance_SetupCost>;
};

export type SubscriptionInstance_ServiceFacetSelection = {
  __typename?: 'SubscriptionInstance_ServiceFacetSelection';
  facetName: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  selectedOption: Scalars['String']['output'];
};

export type SubscriptionInstance_ServiceFacetSelectionInput = {
  facetName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  selectedOption?: InputMaybe<Scalars['String']['input']>;
};

export type SubscriptionInstance_ServiceGroup = {
  __typename?: 'SubscriptionInstance_ServiceGroup';
  costType?: Maybe<SubscriptionInstance_GroupCostType>;
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
  optional: Scalars['Boolean']['output'];
  recurringCost?: Maybe<SubscriptionInstance_RecurringCost>;
  services: Array<SubscriptionInstance_Service>;
  setupCost?: Maybe<SubscriptionInstance_SetupCost>;
};

export type SubscriptionInstance_ServiceGroupInput = {
  costType?: InputMaybe<SubscriptionInstance_GroupCostType>;
  id?: InputMaybe<Scalars['OID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  optional?: InputMaybe<Scalars['Boolean']['input']>;
  recurringCost?: InputMaybe<SubscriptionInstance_RecurringCostInput>;
  services?: InputMaybe<Array<InputMaybe<SubscriptionInstance_ServiceInput>>>;
  setupCost?: InputMaybe<SubscriptionInstance_SetupCostInput>;
};

export type SubscriptionInstance_ServiceInput = {
  customValue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  facetSelections?: InputMaybe<Array<InputMaybe<SubscriptionInstance_ServiceFacetSelectionInput>>>;
  id?: InputMaybe<Scalars['OID']['input']>;
  metrics?: InputMaybe<Array<InputMaybe<SubscriptionInstance_ServiceMetricInput>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  recurringCost?: InputMaybe<SubscriptionInstance_RecurringCostInput>;
  setupCost?: InputMaybe<SubscriptionInstance_SetupCostInput>;
};

export type SubscriptionInstance_ServiceMetric = {
  __typename?: 'SubscriptionInstance_ServiceMetric';
  currentUsage: Scalars['Int']['output'];
  freeLimit?: Maybe<Scalars['Int']['output']>;
  id: Scalars['OID']['output'];
  limit?: Maybe<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
  nextUsageReset?: Maybe<Scalars['DateTime']['output']>;
  paidLimit?: Maybe<Scalars['Int']['output']>;
  unitCost?: Maybe<SubscriptionInstance_RecurringCost>;
  unitName: Scalars['String']['output'];
  usageResetPeriod?: Maybe<SubscriptionInstance_ResetPeriod>;
};

export type SubscriptionInstance_ServiceMetricInput = {
  currentUsage?: InputMaybe<Scalars['Int']['input']>;
  freeLimit?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['OID']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nextUsageReset?: InputMaybe<Scalars['DateTime']['input']>;
  paidLimit?: InputMaybe<Scalars['Int']['input']>;
  unitCost?: InputMaybe<SubscriptionInstance_RecurringCostInput>;
  unitName?: InputMaybe<Scalars['String']['input']>;
  usageResetPeriod?: InputMaybe<SubscriptionInstance_ResetPeriod>;
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

export type SubscriptionInstance_SetupCostInput = {
  amount?: InputMaybe<Scalars['Amount_Money']['input']>;
  billingDate?: InputMaybe<Scalars['DateTime']['input']>;
  currency?: InputMaybe<Scalars['Currency']['input']>;
  paymentDate?: InputMaybe<Scalars['DateTime']['input']>;
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
  globalCurrency?: Maybe<Scalars['Currency']['output']>;
  nextBillingDate?: Maybe<Scalars['DateTime']['output']>;
  operatorId?: Maybe<Scalars['PHID']['output']>;
  operatorNotes?: Maybe<Scalars['String']['output']>;
  pausedSince?: Maybe<Scalars['DateTime']['output']>;
  projectedBillAmount?: Maybe<Scalars['Amount_Money']['output']>;
  projectedBillCurrency?: Maybe<Scalars['Currency']['output']>;
  renewalDate?: Maybe<Scalars['DateTime']['output']>;
  resource?: Maybe<SubscriptionInstance_ResourceDocument>;
  selectedBillingCycle?: Maybe<SubscriptionInstance_BillingCycle>;
  serviceGroups: Array<SubscriptionInstance_ServiceGroup>;
  serviceOfferingId?: Maybe<Scalars['PHID']['output']>;
  services: Array<SubscriptionInstance_Service>;
  status: SubscriptionInstance_SubscriptionStatus;
  teamMemberCount?: Maybe<Scalars['Int']['output']>;
  tierCurrency?: Maybe<Scalars['Currency']['output']>;
  tierName?: Maybe<Scalars['String']['output']>;
  tierPrice?: Maybe<Scalars['Amount_Money']['output']>;
  tierPricingMode?: Maybe<SubscriptionInstance_TierPricingMode>;
  tierPricingOptionId?: Maybe<Scalars['OID']['output']>;
};

/** Input Types for Initial State */
export type SubscriptionInstance_SubscriptionInstanceStateInput = {
  activatedSince?: InputMaybe<Scalars['DateTime']['input']>;
  autoRenew?: InputMaybe<Scalars['Boolean']['input']>;
  budget?: InputMaybe<SubscriptionInstance_BudgetCategoryInput>;
  cancellationReason?: InputMaybe<Scalars['String']['input']>;
  cancelledSince?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  customerEmail?: InputMaybe<Scalars['EmailAddress']['input']>;
  customerId?: InputMaybe<Scalars['PHID']['input']>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  customerType?: InputMaybe<SubscriptionInstance_CustomerType>;
  expiringSince?: InputMaybe<Scalars['DateTime']['input']>;
  globalCurrency?: InputMaybe<Scalars['Currency']['input']>;
  nextBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  operatorId?: InputMaybe<Scalars['PHID']['input']>;
  operatorNotes?: InputMaybe<Scalars['String']['input']>;
  pausedSince?: InputMaybe<Scalars['DateTime']['input']>;
  projectedBillAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  projectedBillCurrency?: InputMaybe<Scalars['Currency']['input']>;
  renewalDate?: InputMaybe<Scalars['DateTime']['input']>;
  resource?: InputMaybe<SubscriptionInstance_ResourceDocumentInput>;
  selectedBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  serviceGroups?: InputMaybe<Array<InputMaybe<SubscriptionInstance_ServiceGroupInput>>>;
  serviceOfferingId?: InputMaybe<Scalars['PHID']['input']>;
  services?: InputMaybe<Array<InputMaybe<SubscriptionInstance_ServiceInput>>>;
  status?: InputMaybe<SubscriptionInstance_SubscriptionStatus>;
  teamMemberCount?: InputMaybe<Scalars['Int']['input']>;
  tierCurrency?: InputMaybe<Scalars['Currency']['input']>;
  tierName?: InputMaybe<Scalars['String']['input']>;
  tierPrice?: InputMaybe<Scalars['Amount_Money']['input']>;
  tierPricingMode?: InputMaybe<SubscriptionInstance_TierPricingMode>;
  tierPricingOptionId?: InputMaybe<Scalars['OID']['input']>;
};

export enum SubscriptionInstance_SubscriptionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Expiring = 'EXPIRING',
  Paused = 'PAUSED',
  Pending = 'PENDING'
}

export enum SubscriptionInstance_TierPricingMode {
  Calculated = 'CALCULATED',
  ManualOverride = 'MANUAL_OVERRIDE'
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

export type SubscriptionInstance_UpdateServiceGroupCostInput = {
  groupId: Scalars['OID']['input'];
  recurringAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  recurringBillingCycle?: InputMaybe<SubscriptionInstance_BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars['Currency']['input']>;
  setupAmount?: InputMaybe<Scalars['Amount_Money']['input']>;
  setupBillingDate?: InputMaybe<Scalars['DateTime']['input']>;
  setupCurrency?: InputMaybe<Scalars['Currency']['input']>;
};

export type SubscriptionInstance_UpdateServiceInfoInput = {
  customValue?: InputMaybe<Scalars['String']['input']>;
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
  tierCurrency?: InputMaybe<Scalars['Currency']['input']>;
  tierName?: InputMaybe<Scalars['String']['input']>;
  tierPrice?: InputMaybe<Scalars['Amount_Money']['input']>;
  tierPricingMode?: InputMaybe<SubscriptionInstance_TierPricingMode>;
  tierPricingOptionId?: InputMaybe<Scalars['OID']['input']>;
};

export type SubscriptionInstance_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SyncEnvelope = {
  __typename?: 'SyncEnvelope';
  channelMeta: ChannelMeta;
  cursor?: Maybe<RemoteCursor>;
  dependsOn?: Maybe<Array<Scalars['String']['output']>>;
  key?: Maybe<Scalars['String']['output']>;
  operations?: Maybe<Array<OperationWithContext>>;
  type: SyncEnvelopeType;
};

export type SyncEnvelopeInput = {
  channelMeta: ChannelMetaInput;
  cursor?: InputMaybe<RemoteCursorInput>;
  dependsOn?: InputMaybe<Array<Scalars['String']['input']>>;
  key?: InputMaybe<Scalars['String']['input']>;
  operations?: InputMaybe<Array<OperationWithContextInput>>;
  type: SyncEnvelopeType;
};

export enum SyncEnvelopeType {
  Ack = 'ACK',
  Operations = 'OPERATIONS'
}

export type Token = {
  __typename?: 'Token';
  contractAddress: Scalars['EthereumAddress']['output'];
  symbol: Scalars['String']['output'];
};

export type TouchChannelInput = {
  collectionId: Scalars['String']['input'];
  filter: RemoteFilterInput;
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  sinceTimestampUtcMs: Scalars['String']['input'];
};

export type TouchChannelResult = {
  __typename?: 'TouchChannelResult';
  ackOrdinal: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
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

export type UserSelectionInput = {
  addonBillingCycleOverrides?: InputMaybe<Array<BillingCycleOverrideInput>>;
  billingCycle: RsBillingCycle;
  groupBillingCycleOverrides?: InputMaybe<Array<BillingCycleOverrideInput>>;
  optionGroupIds: Array<Scalars['OID']['input']>;
  tierId: Scalars['OID']['input'];
};

export type Value = {
  __typename?: 'Value';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

/**
 * Mutation result type for Workstream operations with typed state.
 * Matches ReactorSubgraph PHDocument pattern with revisionsList.
 */
export type WorkstreamMutationResult = {
  __typename?: 'WorkstreamMutationResult';
  createdAtUtcIso: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModifiedAtUtcIso: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  revisionsList: Array<Revision>;
  slug?: Maybe<Scalars['String']['output']>;
  state: Workstream_FullState;
};

/** Mutations: Workstream */
export type WorkstreamMutations = {
  __typename?: 'WorkstreamMutations';
  addAlternativeProposal: WorkstreamMutationResult;
  addAlternativeProposalAsync: Scalars['String']['output'];
  addPaymentRequest: WorkstreamMutationResult;
  addPaymentRequestAsync: Scalars['String']['output'];
  createDocument: WorkstreamMutationResult;
  createEmptyDocument: WorkstreamMutationResult;
  editAlternativeProposal: WorkstreamMutationResult;
  editAlternativeProposalAsync: Scalars['String']['output'];
  editClientInfo: WorkstreamMutationResult;
  editClientInfoAsync: Scalars['String']['output'];
  editInitialProposal: WorkstreamMutationResult;
  editInitialProposalAsync: Scalars['String']['output'];
  editWorkstream: WorkstreamMutationResult;
  editWorkstreamAsync: Scalars['String']['output'];
  removeAlternativeProposal: WorkstreamMutationResult;
  removeAlternativeProposalAsync: Scalars['String']['output'];
  removePaymentRequest: WorkstreamMutationResult;
  removePaymentRequestAsync: Scalars['String']['output'];
  setRequestForProposal: WorkstreamMutationResult;
  setRequestForProposalAsync: Scalars['String']['output'];
};


/** Mutations: Workstream */
export type WorkstreamMutationsAddAlternativeProposalArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_AddAlternativeProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsAddAlternativeProposalAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_AddAlternativeProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsAddPaymentRequestArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_AddPaymentRequestInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsAddPaymentRequestAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_AddPaymentRequestInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsCreateDocumentArgs = {
  initialState?: InputMaybe<Workstream_InitialStateInput>;
  name: Scalars['String']['input'];
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Workstream */
export type WorkstreamMutationsCreateEmptyDocumentArgs = {
  parentIdentifier?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: Workstream */
export type WorkstreamMutationsEditAlternativeProposalArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_EditAlternativeProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsEditAlternativeProposalAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_EditAlternativeProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsEditClientInfoArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_EditClientInfoInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsEditClientInfoAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_EditClientInfoInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsEditInitialProposalArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_EditInitialProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsEditInitialProposalAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_EditInitialProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsEditWorkstreamArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_EditWorkstreamInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsEditWorkstreamAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_EditWorkstreamInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsRemoveAlternativeProposalArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_RemoveAlternativeProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsRemoveAlternativeProposalAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_RemoveAlternativeProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsRemovePaymentRequestArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_RemovePaymentRequestInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsRemovePaymentRequestAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_RemovePaymentRequestInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsSetRequestForProposalArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_SetRequestForProposalInput;
};


/** Mutations: Workstream */
export type WorkstreamMutationsSetRequestForProposalAsyncArgs = {
  docId: Scalars['PHID']['input'];
  input: Workstream_SetRequestForProposalInput;
};

/** Queries: Workstream Document */
export type WorkstreamQueries = {
  __typename?: 'WorkstreamQueries';
  /** Get all Workstream documents (paged) */
  Workstream_documents: Workstream_DocumentResultPage;
  /** Get a specific Workstream document by identifier */
  document?: Maybe<Workstream_DocumentWithChildren>;
  /** Get children of a Workstream document */
  documentChildren: Workstream_DocumentResultPage;
  /** Get parents of a Workstream document */
  documentParents: Workstream_DocumentResultPage;
  /** Find Workstream documents by search criteria */
  findDocuments: Workstream_DocumentResultPage;
};


/** Queries: Workstream Document */
export type WorkstreamQueriesWorkstream_DocumentsArgs = {
  paging?: InputMaybe<Workstream_PagingInput>;
};


/** Queries: Workstream Document */
export type WorkstreamQueriesDocumentArgs = {
  identifier: Scalars['String']['input'];
  view?: InputMaybe<Workstream_ViewFilterInput>;
};


/** Queries: Workstream Document */
export type WorkstreamQueriesDocumentChildrenArgs = {
  paging?: InputMaybe<Workstream_PagingInput>;
  parentIdentifier: Scalars['String']['input'];
  view?: InputMaybe<Workstream_ViewFilterInput>;
};


/** Queries: Workstream Document */
export type WorkstreamQueriesDocumentParentsArgs = {
  childIdentifier: Scalars['String']['input'];
  paging?: InputMaybe<Workstream_PagingInput>;
  view?: InputMaybe<Workstream_ViewFilterInput>;
};


/** Queries: Workstream Document */
export type WorkstreamQueriesFindDocumentsArgs = {
  paging?: InputMaybe<Workstream_PagingInput>;
  search: Workstream_SearchFilterInput;
  view?: InputMaybe<Workstream_ViewFilterInput>;
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
  id: Scalars['OID']['input'];
  paymentTermsId?: InputMaybe<Scalars['PHID']['input']>;
  proposalAuthor?: InputMaybe<Workstream_ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_ProposalStatus>;
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

export type Workstream_ClientInfoInput = {
  icon?: InputMaybe<Scalars['URL']['input']>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Paginated result type for Workstream documents */
export type Workstream_DocumentResultPage = {
  __typename?: 'Workstream_DocumentResultPage';
  cursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  items: Array<WorkstreamMutationResult>;
  totalCount: Scalars['Int']['output'];
};

/** Document with children for Workstream */
export type Workstream_DocumentWithChildren = {
  __typename?: 'Workstream_DocumentWithChildren';
  childIds: Array<Scalars['String']['output']>;
  document: WorkstreamMutationResult;
};

export type Workstream_EditAlternativeProposalInput = {
  id: Scalars['OID']['input'];
  paymentTermsId?: InputMaybe<Scalars['PHID']['input']>;
  proposalAuthor?: InputMaybe<Workstream_ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_ProposalStatus>;
};

export type Workstream_EditClientInfoInput = {
  clientId: Scalars['PHID']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Module: Proposals */
export type Workstream_EditInitialProposalInput = {
  id: Scalars['OID']['input'];
  paymentTermsId?: InputMaybe<Scalars['PHID']['input']>;
  proposalAuthor?: InputMaybe<Workstream_ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_ProposalStatus>;
};

/** Module: Workstream */
export type Workstream_EditWorkstreamInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['PHID']['input']>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_WorkstreamStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Full state with all scopes for Workstream */
export type Workstream_FullState = {
  __typename?: 'Workstream_FullState';
  auth: Scalars['JSONObject']['output'];
  document: Workstream_PhDocumentScopeState;
  global: Workstream_WorkstreamState;
  local: Scalars['JSONObject']['output'];
};

export type Workstream_InitialStateInput = {
  global?: InputMaybe<Workstream_WorkstreamStateInput>;
  local?: InputMaybe<Scalars['JSONObject']['input']>;
};

/** Document scope state (same for all document types) */
export type Workstream_PhDocumentScopeState = {
  __typename?: 'Workstream_PHDocumentScopeState';
  deletedAtUtcIso?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  deletionReason?: Maybe<Scalars['String']['output']>;
  hash: Workstream_PhHashConfig;
  isDeleted?: Maybe<Scalars['Boolean']['output']>;
  version: Scalars['Int']['output'];
};

/** Hash configuration for document state */
export type Workstream_PhHashConfig = {
  __typename?: 'Workstream_PHHashConfig';
  algorithm: Scalars['String']['output'];
  encoding: Scalars['String']['output'];
};

export type Workstream_PagingInput = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Workstream_Proposal = {
  __typename?: 'Workstream_Proposal';
  author: Workstream_ProposalAuthor;
  id: Scalars['OID']['output'];
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

export type Workstream_ProposalInput = {
  author?: InputMaybe<Workstream_ProposalAuthorInput>;
  id?: InputMaybe<Scalars['OID']['input']>;
  paymentTerms?: InputMaybe<Scalars['PHID']['input']>;
  sow?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_ProposalStatus>;
};

export enum Workstream_ProposalStatus {
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

export type Workstream_RfpInput = {
  id?: InputMaybe<Scalars['PHID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Workstream_RemoveAlternativeProposalInput = {
  id: Scalars['OID']['input'];
};

export type Workstream_RemovePaymentRequestInput = {
  id: Scalars['PHID']['input'];
};

export type Workstream_SearchFilterInput = {
  identifiers?: InputMaybe<Array<Scalars['String']['input']>>;
  parentId?: InputMaybe<Scalars['String']['input']>;
};

export type Workstream_SetRequestForProposalInput = {
  rfpId: Scalars['PHID']['input'];
  title: Scalars['String']['input'];
};

export type Workstream_ViewFilterInput = {
  branch?: InputMaybe<Scalars['String']['input']>;
  scopes?: InputMaybe<Array<Scalars['String']['input']>>;
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

/** Input Types for Initial State */
export type Workstream_WorkstreamStateInput = {
  alternativeProposals?: InputMaybe<Array<InputMaybe<Workstream_ProposalInput>>>;
  client?: InputMaybe<Workstream_ClientInfoInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  initialProposal?: InputMaybe<Workstream_ProposalInput>;
  paymentRequests?: InputMaybe<Array<InputMaybe<Scalars['PHID']['input']>>>;
  paymentTerms?: InputMaybe<Scalars['PHID']['input']>;
  rfp?: InputMaybe<Workstream_RfpInput>;
  sow?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<Workstream_WorkstreamStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
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


export type AccountSnapshotsQuery = { __typename?: 'Query', budgetStatements: Array<{ __typename?: 'BudgetStatement', id: any, month: string, netExpenseTxns: any, reportedActuals: any, snapshotReport: { __typename?: 'BudgetStatementSnapshotReport', startDate: any, endDate: any, accounts: Array<{ __typename?: 'SnapshotAccount', id: string, name: string, type: SnapAccountType, address: string, transactions: Array<{ __typename?: 'SnapshotAccountTransaction', id: string, counterParty: any, counterPartyName: string, datetime: any, direction: AccountTransactionDirection, flowType: AccountTransactionFlowType, txHash: string, amount: { __typename?: 'TxAmount', unit: string, value: any } }>, balances: Array<{ __typename?: 'SnapshotAccountBalance', endingBalance: any, startingBalance: any, token: { __typename?: 'Token', symbol: string, contractAddress: any } }> }> } }> };

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

export type OperatorProfileQueryVariables = Exact<{
  filter?: InputMaybe<BuildersFilter>;
}>;


export type OperatorProfileQuery = { __typename?: 'Query', builders: Array<{ __typename?: 'BuilderProfileState', isOperator: boolean, id?: any | null, name?: string | null, code?: string | null, slug?: string | null, icon?: any | null, skills: Array<BuilderSkill>, description?: string | null, about?: string | null, lastModified?: any | null, status?: BuilderStatus | null, contributors: Array<any>, operationalHubMember: { __typename?: 'OpHubMember', name?: string | null } }> };

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


export type RfpByWorkstreamQuery = { __typename?: 'Query', rfpByWorkstream: Array<{ __typename?: 'WorkstreamRfp', code?: string | null, title?: string | null, status?: WorkstreamStatus | null, rfp?: { __typename?: 'RFP', briefing?: string | null, budgetCurrency?: string | null, budgetMax?: number | null, budgetMin?: number | null, code?: string | null, eligibilityCriteria?: string | null, evaluationCriteria?: string | null, status?: RfpStatus | null, id: any, summary?: string | null, submissionDeadline?: any | null, title?: string | null } | null }> };

export type RoadmapDetailsQueryVariables = Exact<{
  filter: ScopeOfWorkByNetworkOrStatusFilter;
}>;


export type RoadmapDetailsQuery = { __typename?: 'Query', scopeOfWorkByNetworkOrStatus: Array<{ __typename?: 'SOW_ScopeOfWorkState', title: string, status: Sow_ScopeOfWorkStatus, description: string, roadmaps: Array<{ __typename?: 'SOW_Roadmap', id: any, title: string, slug: string, description: string, milestones: Array<{ __typename?: 'SOW_Milestone', id: any, title: string, description: string, sequenceCode: string, budget?: number | null, deliveryTarget: string, coordinators: Array<string>, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any>, status: Sow_DeliverableSetStatus, deliverablesCompleted: { __typename?: 'SOW_DeliverablesCompleted', completed: number, total: number }, progress: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', total: number, completed: number } } | null }> }>, contributors: Array<{ __typename?: 'Builder', id?: any | null, name: string }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, status: Sow_DeliverableStatus, title: string, code: string, description: string, owner?: { __typename?: 'Builder', id?: any | null, code?: string | null, icon: string } | null, budgetAnchor?: { __typename?: 'SOW_BudgetAnchorProject', margin: number, project?: any | null, quantity: number, unit?: Sow_Unit | null, unitCost: number } | null, keyResults: Array<{ __typename?: 'SOW_KeyResult', id: any, link: string, title: string }>, workProgress?: { __typename: 'SOW_Binary', done?: boolean | null } | { __typename: 'SOW_Percentage', value: number } | { __typename: 'SOW_StoryPoint', total: number, completed: number } | null }>, projects: Array<{ __typename?: 'SOW_Project', abstract?: string | null, budget?: number | null, budgetType?: Sow_BudgetType | null, code: string, currency?: Sow_PmCurrency | null, id: any, imageUrl?: any | null, title: string, expenditure?: { __typename?: 'SOW_BudgetExpenditure', actuals: number, cap: number, percentage: number } | null, projectOwner?: { __typename?: 'Builder', id?: any | null, code?: string | null, name: string } | null, scope?: { __typename?: 'SOW_DeliverablesSet', status: Sow_DeliverableSetStatus, deliverables: Array<any>, deliverablesCompleted: { __typename?: 'SOW_DeliverablesCompleted', completed: number, total: number } } | null }> }> };

export type ScopeOfWorkQueryVariables = Exact<{
  identifier: Scalars['String']['input'];
}>;


export type ScopeOfWorkQuery = { __typename?: 'Query', ScopeOfWork?: { __typename?: 'ScopeOfWorkQueries', getDocument?: { __typename?: 'ScopeOfWork', id: string, stateJSON?: any | null, state: { __typename?: 'ScopeOfWork_ScopeOfWorkState', description: string, status: ScopeOfWork_ScopeOfWorkStatus, title: string, roadmaps: Array<{ __typename?: 'ScopeOfWork_Roadmap', id: any, slug: string, title: string, description: string, milestones: Array<{ __typename?: 'ScopeOfWork_Milestone', description: string, budget?: number | null, title: string, sequenceCode: string, id: any, coordinators: Array<string>, deliveryTarget: string, scope?: { __typename?: 'ScopeOfWork_DeliverablesSet', deliverables: Array<any>, status: ScopeOfWork_DeliverableSetStatus, deliverablesCompleted: { __typename?: 'ScopeOfWork_DeliverablesCompleted', completed: number, total: number } } | null }> }>, contributors: Array<{ __typename?: 'ScopeOfWork_Agent', id: any, name: string }>, deliverables: Array<{ __typename?: 'ScopeOfWork_Deliverable', code: string, description: string, id: any, owner?: string | null, status: ScopeOfWork_DeliverableStatus, title: string, budgetAnchor?: { __typename?: 'ScopeOfWork_BudgetAnchorProject', margin: number, project?: any | null, quantity: number, unit?: ScopeOfWork_Unit | null, unitCost: number } | null, keyResults: Array<{ __typename?: 'ScopeOfWork_KeyResult', id: any, link: string, title: string }> }>, projects: Array<{ __typename?: 'ScopeOfWork_Project', abstract?: string | null, budget?: number | null, budgetType?: ScopeOfWork_BudgetType | null, code: string, currency?: ScopeOfWork_PmCurrency | null, id: any, imageUrl?: any | null, projectOwner?: string | null, title: string, expenditure?: { __typename?: 'ScopeOfWork_BudgetExpenditure', actuals: number, cap: number, percentage: number } | null, scope?: { __typename?: 'ScopeOfWork_DeliverablesSet', status: ScopeOfWork_DeliverableSetStatus, deliverables: Array<any>, deliverablesCompleted: { __typename?: 'ScopeOfWork_DeliverablesCompleted', completed: number, total: number } } | null }> } } | null } | null };

export type RoadmapListQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type RoadmapListQuery = { __typename?: 'Query', workstream: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, slug?: string | null, network?: { __typename?: 'Network', name?: string | null, logo?: string | null, darkThemeLogo?: string | null, slug?: string | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', roadmaps: Array<{ __typename?: 'SOW_Roadmap', id: any, description: string, slug: string, title: string, milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, coordinators: Array<string>, deliveryTarget: string, description: string, id: any, sequenceCode: string, title: string, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any>, status: Sow_DeliverableSetStatus, deliverablesCompleted: { __typename?: 'SOW_DeliverablesCompleted', completed: number, total: number }, progress: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', completed: number, total: number } } | null }> }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string, status: Sow_DeliverableStatus, keyResults: Array<{ __typename?: 'SOW_KeyResult', id: any, link: string, title: string }> }> } | null }> };

export type ResourceProfileQueryVariables = Exact<{
  filter?: InputMaybe<RsResourceTemplatesFilter>;
}>;


export type ResourceProfileQuery = { __typename?: 'Query', resourceTemplates: Array<{ __typename?: 'RSResourceTemplate', id: any, infoLink?: any | null, title: string, description?: string | null, thumbnailUrl?: any | null, summary: string, status: RsTemplateStatus, operatorId: any, contentSections: Array<{ __typename?: 'RSContentSection', content: string, displayOrder: number, id: any, title: string }>, faqFields?: Array<{ __typename?: 'RSFaqField', answer?: string | null, displayOrder: number, id: any, question?: string | null }> | null }> };

export type CreateProductInstancesMutationVariables = Exact<{
  input: CreateProductInstancesInput;
}>;


export type CreateProductInstancesMutation = { __typename?: 'Mutation', createProductInstances?: { __typename?: 'CreateProductInstancesOutput', data?: any | null, errors: Array<string>, success: boolean } | null };

export type ResourceOperatorQueryVariables = Exact<{
  filter?: InputMaybe<BuildersFilter>;
}>;


export type ResourceOperatorQuery = { __typename?: 'Query', builders: Array<{ __typename?: 'BuilderProfileState', id?: any | null, slug?: string | null, description?: string | null, name?: string | null, icon?: any | null, lastModified?: any | null, contributors: Array<any>, code?: string | null, status?: BuilderStatus | null }> };

export type ResourceTemplateQueryVariables = Exact<{
  filter?: InputMaybe<RsResourceTemplatesFilter>;
}>;


export type ResourceTemplateQuery = { __typename?: 'Query', resourceTemplates: Array<{ __typename?: 'RSResourceTemplate', id: any, title: string, description?: string | null, thumbnailUrl?: any | null, summary: string, status: RsTemplateStatus, operatorId: any, faqFields?: Array<{ __typename?: 'RSFaqField', displayOrder: number, question?: string | null, answer?: string | null, id: any }> | null, contentSections: Array<{ __typename?: 'RSContentSection', content: string, displayOrder: number, id: any, title: string }> }> };

export type ServiceOfferingsQueryVariables = Exact<{
  filter?: InputMaybe<RsServiceOfferingsFilter>;
}>;


export type ServiceOfferingsQuery = { __typename?: 'Query', serviceOfferings: Array<{ __typename?: 'RSServiceOffering', id: any, description?: string | null, infoLink?: any | null, lastModified: any, operatorId: any, title: string, thumbnailUrl?: any | null, resourceTemplateId?: any | null, status: RsServiceStatus, summary: string, availableBillingCycles: Array<RsBillingCycle>, tiers: Array<{ __typename?: 'RSServiceSubscriptionTier', id: any, name: string, mostPopular: boolean, description?: string | null, isCustomPricing: boolean, pricingMode?: RsTierPricingMode | null, pricing: { __typename?: 'RSServicePricing', amount?: any | null, currency: any }, serviceLevels: Array<{ __typename?: 'RSServiceLevelBinding', id: any, serviceId: any, level: RsServiceLevel, customValue?: string | null, optionGroupId?: any | null }>, usageLimits: Array<{ __typename?: 'RSServiceUsageLimit', id: any, serviceId: any, metric: string, unitName?: string | null, freeLimit?: number | null, paidLimit?: number | null, resetCycle?: RsUsageResetCycle | null, notes?: string | null, unitPrice?: any | null, unitPriceCurrency?: any | null }>, billingCycleDiscounts: Array<{ __typename?: 'RSBillingCycleDiscount', billingCycle: RsBillingCycle, discountRule: { __typename?: 'RSDiscountRule', discountType: RsDiscountType, discountValue: number } }> }>, facetTargets: Array<{ __typename?: 'RSOfferingFacetTarget', id: any, categoryKey: string, categoryLabel: string, selectedOptions: Array<string> }>, optionGroups: Array<{ __typename?: 'RSOfferingOptionGroup', id: any, name: string, description?: string | null, isAddOn: boolean, defaultSelected: boolean, pricingMode?: RsAddOnPricingMode | null, costType?: RsGroupCostType | null, availableBillingCycles: Array<RsBillingCycle>, price?: any | null, currency?: any | null, discountMode?: RsDiscountMode | null, standalonePricing?: { __typename?: 'RSStandalonePricing', setupCost?: { __typename?: 'RSSetupCost', amount: any, currency: any, discount?: { __typename?: 'RSDiscountRule', discountType: RsDiscountType, discountValue: number } | null } | null, recurringPricing: Array<{ __typename?: 'RSRecurringPriceOption', id: any, billingCycle: RsBillingCycle, amount: any, currency: any, discount?: { __typename?: 'RSDiscountRule', discountType: RsDiscountType, discountValue: number } | null }> } | null, tierDependentPricing?: Array<{ __typename?: 'RSOptionGroupTierPricing', id: any, tierId: any, setupCost?: { __typename?: 'RSSetupCost', amount: any, currency: any, discount?: { __typename?: 'RSDiscountRule', discountType: RsDiscountType, discountValue: number } | null } | null, setupCostDiscounts: Array<{ __typename?: 'RSBillingCycleDiscount', billingCycle: RsBillingCycle, discountRule: { __typename?: 'RSDiscountRule', discountType: RsDiscountType, discountValue: number } }>, recurringPricing: Array<{ __typename?: 'RSRecurringPriceOption', id: any, billingCycle: RsBillingCycle, amount: any, currency: any, discount?: { __typename?: 'RSDiscountRule', discountType: RsDiscountType, discountValue: number } | null }> }> | null, billingCycleDiscounts: Array<{ __typename?: 'RSBillingCycleDiscount', billingCycle: RsBillingCycle, discountRule: { __typename?: 'RSDiscountRule', discountType: RsDiscountType, discountValue: number } }> }>, services: Array<{ __typename?: 'RSOfferingService', id: any, title: string, description?: string | null, displayOrder?: number | null, isSetupFormation: boolean, optionGroupId?: any | null }> }> };

export type ResourceTemplatesQueryVariables = Exact<{
  filter?: InputMaybe<RsResourceTemplatesFilter>;
}>;


export type ResourceTemplatesQuery = { __typename?: 'Query', resourceTemplates: Array<{ __typename?: 'RSResourceTemplate', description?: string | null, infoLink?: any | null, lastModified: any, title: string, thumbnailUrl?: any | null, operatorId: any, recurringServices: Array<string>, status: RsTemplateStatus, summary: string, setupServices: Array<string>, id: any, contentSections: Array<{ __typename?: 'RSContentSection', id: any, title: string, content: string, displayOrder: number }>, facetTargets: Array<{ __typename?: 'RSFacetTarget', id: any, categoryKey: string, categoryLabel: string, selectedOptions: Array<string> }>, faqFields?: Array<{ __typename?: 'RSFaqField', id: any, question?: string | null, answer?: string | null, displayOrder: number }> | null, targetAudiences: Array<{ __typename?: 'RSTargetAudience', id: any, label: string, color?: string | null }> }> };

export type WorkstreamDetailsQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type WorkstreamDetailsQuery = { __typename?: 'Query', workstream: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, status?: WorkstreamStatus | null, slug?: string | null, client?: { __typename?: 'ClientInfo', name?: string | null, icon?: any | null } | null, network?: { __typename?: 'Network', name?: string | null, slug?: string | null, logo?: string | null, darkThemeLogo?: string | null } | null, initialProposal?: { __typename?: 'FullProposal', status: ProposalStatus, author: { __typename?: 'ProposalAuthor', name?: string | null }, paymentTerms?: { __typename?: 'PT_PaymentTermsState', proposer: string, currency: Pt_PaymentCurrency, totalAmount?: any | null, paymentModel: Pt_PaymentModel } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', description: string, title: string, status: Sow_ScopeOfWorkStatus, projects: Array<{ __typename?: 'SOW_Project', id: any, slug: string, code: string, abstract?: string | null, title: string, imageUrl?: any | null, budget?: number | null, budgetType?: Sow_BudgetType | null, currency?: Sow_PmCurrency | null, projectOwner?: { __typename?: 'Builder', id?: any | null, code?: string | null, name: string } | null, expenditure?: { __typename?: 'SOW_BudgetExpenditure', cap: number } | null, scope?: { __typename?: 'SOW_DeliverablesSet', status: Sow_DeliverableSetStatus, deliverables: Array<any>, progress: { __typename?: 'SOW_Binary' } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint' } } | null }>, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any> } | null }> }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string, status: Sow_DeliverableStatus, keyResults: Array<{ __typename?: 'SOW_KeyResult', title: string, id: any, link: string }>, workProgress?: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', total: number, completed: number } | null, budgetAnchor?: { __typename?: 'SOW_BudgetAnchorProject', unitCost: number, unit?: Sow_Unit | null, quantity: number } | null }> } | null } | null, rfp?: { __typename?: 'RFP', title?: string | null, summary?: string | null, budgetMax?: number | null, budgetMin?: number | null, budgetCurrency?: string | null, briefing?: string | null, submissionDeadline?: any | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', projects: Array<{ __typename?: 'SOW_Project', title: string }>, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', id: any }> }> } | null, alternativeProposals: Array<{ __typename?: 'FullProposal', id: any }> }> };

export type WorkstreamsQueryVariables = Exact<{
  filter?: InputMaybe<WorkstreamsFilter>;
}>;


export type WorkstreamsQuery = { __typename?: 'Query', workstreams: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, status?: WorkstreamStatus | null, slug?: string | null, client?: { __typename?: 'ClientInfo', name?: string | null, icon?: any | null } | null, initialProposal?: { __typename?: 'FullProposal', status: ProposalStatus, author: { __typename?: 'ProposalAuthor', name?: string | null }, paymentTerms?: { __typename?: 'PT_PaymentTermsState', proposer: string, currency: Pt_PaymentCurrency, totalAmount?: any | null, paymentModel: Pt_PaymentModel } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', description: string, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any> } | null }> }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string }> } | null } | null, rfp?: { __typename?: 'RFP', title?: string | null, summary?: string | null, budgetMax?: number | null, budgetMin?: number | null, budgetCurrency?: string | null, briefing?: string | null, submissionDeadline?: any | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', projects: Array<{ __typename?: 'SOW_Project', title: string }>, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', id: any }> }> } | null, alternativeProposals: Array<{ __typename?: 'FullProposal', id: any }>, network?: { __typename?: 'Network', name?: string | null, logo?: string | null, darkThemeLogo?: string | null, slug?: string | null } | null }> };



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
    netExpenseTxns
    reportedActuals
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

export const OperatorProfileDocument = `
    query OperatorProfile($filter: buildersFilter) {
  builders(filter: $filter) {
    isOperator
    id
    name
    code
    slug
    icon
    skills
    description
    about
    lastModified
    status
    contributors
    operationalHubMember {
      name
    }
  }
}
    `;

export const useOperatorProfileQuery = <
      TData = OperatorProfileQuery,
      TError = unknown
    >(
      variables?: OperatorProfileQueryVariables,
      options?: Omit<UseQueryOptions<OperatorProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<OperatorProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<OperatorProfileQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OperatorProfile'] : ['OperatorProfile', variables],
    queryFn: switchboardFetcher<OperatorProfileQuery, OperatorProfileQueryVariables>(OperatorProfileDocument, variables),
    ...options
  }
    )};

useOperatorProfileQuery.getKey = (variables?: OperatorProfileQueryVariables) => variables === undefined ? ['OperatorProfile'] : ['OperatorProfile', variables];

export const useSuspenseOperatorProfileQuery = <
      TData = OperatorProfileQuery,
      TError = unknown
    >(
      variables?: OperatorProfileQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<OperatorProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<OperatorProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<OperatorProfileQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['OperatorProfileSuspense'] : ['OperatorProfileSuspense', variables],
    queryFn: switchboardFetcher<OperatorProfileQuery, OperatorProfileQueryVariables>(OperatorProfileDocument, variables),
    ...options
  }
    )};

useSuspenseOperatorProfileQuery.getKey = (variables?: OperatorProfileQueryVariables) => variables === undefined ? ['OperatorProfileSuspense'] : ['OperatorProfileSuspense', variables];


useOperatorProfileQuery.fetcher = (variables?: OperatorProfileQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<OperatorProfileQuery, OperatorProfileQueryVariables>(OperatorProfileDocument, variables, options);

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
    query ScopeOfWork($identifier: String!) {
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

export const ResourceProfileDocument = `
    query ResourceProfile($filter: RSResourceTemplatesFilter) {
  resourceTemplates(filter: $filter) {
    id
    infoLink
    title
    description
    thumbnailUrl
    summary
    status
    operatorId
    contentSections {
      content
      displayOrder
      id
      title
    }
    faqFields {
      answer
      displayOrder
      id
      question
    }
  }
}
    `;

export const useResourceProfileQuery = <
      TData = ResourceProfileQuery,
      TError = unknown
    >(
      variables?: ResourceProfileQueryVariables,
      options?: Omit<UseQueryOptions<ResourceProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ResourceProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ResourceProfileQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ResourceProfile'] : ['ResourceProfile', variables],
    queryFn: switchboardFetcher<ResourceProfileQuery, ResourceProfileQueryVariables>(ResourceProfileDocument, variables),
    ...options
  }
    )};

useResourceProfileQuery.getKey = (variables?: ResourceProfileQueryVariables) => variables === undefined ? ['ResourceProfile'] : ['ResourceProfile', variables];

export const useSuspenseResourceProfileQuery = <
      TData = ResourceProfileQuery,
      TError = unknown
    >(
      variables?: ResourceProfileQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<ResourceProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<ResourceProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<ResourceProfileQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ResourceProfileSuspense'] : ['ResourceProfileSuspense', variables],
    queryFn: switchboardFetcher<ResourceProfileQuery, ResourceProfileQueryVariables>(ResourceProfileDocument, variables),
    ...options
  }
    )};

useSuspenseResourceProfileQuery.getKey = (variables?: ResourceProfileQueryVariables) => variables === undefined ? ['ResourceProfileSuspense'] : ['ResourceProfileSuspense', variables];


useResourceProfileQuery.fetcher = (variables?: ResourceProfileQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<ResourceProfileQuery, ResourceProfileQueryVariables>(ResourceProfileDocument, variables, options);

export const CreateProductInstancesDocument = `
    mutation CreateProductInstances($input: CreateProductInstancesInput!) {
  createProductInstances(input: $input) {
    data
    errors
    success
  }
}
    `;

export const useCreateProductInstancesMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateProductInstancesMutation, TError, CreateProductInstancesMutationVariables, TContext>) => {
    
    return useMutation<CreateProductInstancesMutation, TError, CreateProductInstancesMutationVariables, TContext>(
      {
    mutationKey: ['CreateProductInstances'],
    mutationFn: (variables?: CreateProductInstancesMutationVariables) => switchboardFetcher<CreateProductInstancesMutation, CreateProductInstancesMutationVariables>(CreateProductInstancesDocument, variables)(),
    ...options
  }
    )};


useCreateProductInstancesMutation.fetcher = (variables: CreateProductInstancesMutationVariables, options?: RequestInit['headers']) => switchboardFetcher<CreateProductInstancesMutation, CreateProductInstancesMutationVariables>(CreateProductInstancesDocument, variables, options);

export const ResourceOperatorDocument = `
    query ResourceOperator($filter: buildersFilter) {
  builders(filter: $filter) {
    id
    slug
    description
    name
    icon
    lastModified
    contributors
    code
    status
  }
}
    `;

export const useResourceOperatorQuery = <
      TData = ResourceOperatorQuery,
      TError = unknown
    >(
      variables?: ResourceOperatorQueryVariables,
      options?: Omit<UseQueryOptions<ResourceOperatorQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ResourceOperatorQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ResourceOperatorQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ResourceOperator'] : ['ResourceOperator', variables],
    queryFn: switchboardFetcher<ResourceOperatorQuery, ResourceOperatorQueryVariables>(ResourceOperatorDocument, variables),
    ...options
  }
    )};

useResourceOperatorQuery.getKey = (variables?: ResourceOperatorQueryVariables) => variables === undefined ? ['ResourceOperator'] : ['ResourceOperator', variables];

export const useSuspenseResourceOperatorQuery = <
      TData = ResourceOperatorQuery,
      TError = unknown
    >(
      variables?: ResourceOperatorQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<ResourceOperatorQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<ResourceOperatorQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<ResourceOperatorQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ResourceOperatorSuspense'] : ['ResourceOperatorSuspense', variables],
    queryFn: switchboardFetcher<ResourceOperatorQuery, ResourceOperatorQueryVariables>(ResourceOperatorDocument, variables),
    ...options
  }
    )};

useSuspenseResourceOperatorQuery.getKey = (variables?: ResourceOperatorQueryVariables) => variables === undefined ? ['ResourceOperatorSuspense'] : ['ResourceOperatorSuspense', variables];


useResourceOperatorQuery.fetcher = (variables?: ResourceOperatorQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<ResourceOperatorQuery, ResourceOperatorQueryVariables>(ResourceOperatorDocument, variables, options);

export const ResourceTemplateDocument = `
    query ResourceTemplate($filter: RSResourceTemplatesFilter) {
  resourceTemplates(filter: $filter) {
    id
    title
    description
    thumbnailUrl
    summary
    status
    operatorId
    faqFields {
      displayOrder
      question
      answer
      id
    }
    contentSections {
      content
      displayOrder
      id
      title
    }
  }
}
    `;

export const useResourceTemplateQuery = <
      TData = ResourceTemplateQuery,
      TError = unknown
    >(
      variables?: ResourceTemplateQueryVariables,
      options?: Omit<UseQueryOptions<ResourceTemplateQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<ResourceTemplateQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<ResourceTemplateQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ResourceTemplate'] : ['ResourceTemplate', variables],
    queryFn: switchboardFetcher<ResourceTemplateQuery, ResourceTemplateQueryVariables>(ResourceTemplateDocument, variables),
    ...options
  }
    )};

useResourceTemplateQuery.getKey = (variables?: ResourceTemplateQueryVariables) => variables === undefined ? ['ResourceTemplate'] : ['ResourceTemplate', variables];

export const useSuspenseResourceTemplateQuery = <
      TData = ResourceTemplateQuery,
      TError = unknown
    >(
      variables?: ResourceTemplateQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<ResourceTemplateQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<ResourceTemplateQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<ResourceTemplateQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['ResourceTemplateSuspense'] : ['ResourceTemplateSuspense', variables],
    queryFn: switchboardFetcher<ResourceTemplateQuery, ResourceTemplateQueryVariables>(ResourceTemplateDocument, variables),
    ...options
  }
    )};

useSuspenseResourceTemplateQuery.getKey = (variables?: ResourceTemplateQueryVariables) => variables === undefined ? ['ResourceTemplateSuspense'] : ['ResourceTemplateSuspense', variables];


useResourceTemplateQuery.fetcher = (variables?: ResourceTemplateQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<ResourceTemplateQuery, ResourceTemplateQueryVariables>(ResourceTemplateDocument, variables, options);

export const ServiceOfferingsDocument = `
    query ServiceOfferings($filter: RSServiceOfferingsFilter) {
  serviceOfferings(filter: $filter) {
    id
    description
    infoLink
    lastModified
    operatorId
    title
    thumbnailUrl
    tiers {
      id
      name
      mostPopular
      description
      isCustomPricing
      pricingMode
      pricing {
        amount
        currency
      }
      serviceLevels {
        id
        serviceId
        level
        customValue
        optionGroupId
      }
      usageLimits {
        id
        serviceId
        metric
        unitName
        freeLimit
        paidLimit
        resetCycle
        notes
        unitPrice
        unitPriceCurrency
      }
      billingCycleDiscounts {
        billingCycle
        discountRule {
          discountType
          discountValue
        }
      }
    }
    facetTargets {
      id
      categoryKey
      categoryLabel
      selectedOptions
    }
    optionGroups {
      id
      name
      description
      isAddOn
      defaultSelected
      pricingMode
      standalonePricing {
        setupCost {
          amount
          currency
          discount {
            discountType
            discountValue
          }
        }
        recurringPricing {
          id
          billingCycle
          amount
          currency
          discount {
            discountType
            discountValue
          }
        }
      }
      tierDependentPricing {
        id
        tierId
        setupCost {
          amount
          currency
          discount {
            discountType
            discountValue
          }
        }
        setupCostDiscounts {
          billingCycle
          discountRule {
            discountType
            discountValue
          }
        }
        recurringPricing {
          id
          billingCycle
          amount
          currency
          discount {
            discountType
            discountValue
          }
        }
      }
      costType
      availableBillingCycles
      price
      currency
      discountMode
      billingCycleDiscounts {
        billingCycle
        discountRule {
          discountType
          discountValue
        }
      }
    }
    resourceTemplateId
    services {
      id
      title
      description
      displayOrder
      isSetupFormation
      optionGroupId
    }
    status
    summary
    availableBillingCycles
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
    query ResourceTemplates($filter: RSResourceTemplatesFilter) {
  resourceTemplates(filter: $filter) {
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
          budgetType
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
