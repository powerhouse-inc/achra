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
  JSON: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  OID: { input: any; output: any; }
  OLabel: { input: any; output: any; }
  PHID: { input: any; output: any; }
  URL: { input: any; output: any; }
  Upload: { input: any; output: any; }
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

export type Builder = {
  __typename?: 'Builder';
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id?: Maybe<Scalars['PHID']['output']>;
  name: Scalars['String']['output'];
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

export type BuilderProfile_BuilderProfileState = {
  __typename?: 'BuilderProfile_BuilderProfileState';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['URL']['output']>;
  id?: Maybe<Scalars['PHID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
};

/** Module: Builder */
export type BuilderProfile_UpdateProfileInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  icon?: InputMaybe<Scalars['URL']['input']>;
  id?: InputMaybe<Scalars['PHID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
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

export type LinkedDocument = {
  __typename?: 'LinkedDocument';
  id: Scalars['PHID']['output'];
  stateJSON?: Maybe<Scalars['JSON']['output']>;
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

/** Mutations: BuilderProfile */
export type Mutation = {
  __typename?: 'Mutation';
  BuilderProfile_createDocument?: Maybe<Scalars['String']['output']>;
  BuilderProfile_updateProfile?: Maybe<Scalars['Int']['output']>;
  Builders_addBuilder?: Maybe<Scalars['Int']['output']>;
  Builders_createDocument?: Maybe<Scalars['String']['output']>;
  Builders_removeBuilder?: Maybe<Scalars['Int']['output']>;
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
  deleteDrive?: Maybe<Scalars['Boolean']['output']>;
  setDriveIcon?: Maybe<Scalars['Boolean']['output']>;
  setDriveName?: Maybe<Scalars['Boolean']['output']>;
};


/** Mutations: BuilderProfile */
export type MutationBuilderProfile_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
export type MutationBuilderProfile_UpdateProfileArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<BuilderProfile_UpdateProfileInput>;
};


/** Mutations: BuilderProfile */
export type MutationBuilders_AddBuilderArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Builders_AddBuilderInput>;
};


/** Mutations: BuilderProfile */
export type MutationBuilders_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
export type MutationBuilders_RemoveBuilderArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Builders_RemoveBuilderInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetCategoryArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetCategoryInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetDescriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetDescriptionInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetDiscordArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetDiscordInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetGithubArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetGithubInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetIconArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetIconInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetLogoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetLogoInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetLogoBigArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetLogoBigInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetProfileNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetProfileNameInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetWebsiteArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetWebsiteInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetXArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetXInput>;
};


/** Mutations: BuilderProfile */
export type MutationNetworkProfile_SetYoutubeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetYoutubeInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_AddBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddBonusClauseInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_AddMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddMilestoneInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_AddPenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddPenaltyClauseInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_DeleteBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeleteBonusClauseInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_DeleteMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeleteMilestoneInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_DeletePenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeletePenaltyClauseInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_ReorderMilestonesArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_ReorderMilestonesInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_SetBasicTermsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetBasicTermsInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_SetEscrowDetailsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetEscrowDetailsInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_SetEvaluationTermsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetEvaluationTermsInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_SetTimeAndMaterialsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetTimeAndMaterialsInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_UpdateBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateBonusClauseInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_UpdateMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateMilestoneInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_UpdateMilestoneStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateMilestoneStatusInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_UpdatePenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdatePenaltyClauseInput>;
};


/** Mutations: BuilderProfile */
export type MutationPaymentTerms_UpdateStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateStatusInput>;
};


/** Mutations: BuilderProfile */
export type MutationRequestForProposals_AddContextDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_AddContextDocumentInput>;
};


/** Mutations: BuilderProfile */
export type MutationRequestForProposals_AddProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_AddProposalInput>;
};


/** Mutations: BuilderProfile */
export type MutationRequestForProposals_ChangeProposalStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_ChangeProposalStatusInput>;
};


/** Mutations: BuilderProfile */
export type MutationRequestForProposals_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
export type MutationRequestForProposals_EditRfpArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_EditRfpInput>;
};


/** Mutations: BuilderProfile */
export type MutationRequestForProposals_RemoveContextDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_RemoveContextDocumentInput>;
};


/** Mutations: BuilderProfile */
export type MutationRequestForProposals_RemoveProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_RemoveProposalInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddAgentInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddCoordinatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddCoordinatorInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddDeliverableInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddDeliverableInSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddDeliverableInSetInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddKeyResultInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddMilestoneInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddMilestoneDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddMilestoneDeliverableInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddProjectInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddProjectDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddProjectDeliverableInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_AddRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddRoadmapInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_EditAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditAgentInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_EditDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditDeliverableInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_EditDeliverablesSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditDeliverablesSetInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_EditKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditKeyResultInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_EditMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditMilestoneInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_EditRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditRoadmapInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_EditScopeOfWorkArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditScopeOfWorkInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveAgentInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveCoordinatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveCoordinatorInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveDeliverableInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveDeliverableInSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveDeliverableInSetInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveKeyResultInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveMilestoneInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveMilestoneDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveMilestoneDeliverableInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveProjectInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveProjectDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveProjectDeliverableInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_RemoveRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveRoadmapInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_SetDeliverableBudgetAnchorProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetDeliverableBudgetAnchorProjectInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_SetDeliverableProgressArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetDeliverableProgressInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_SetProjectMarginArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetProjectMarginInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_SetProjectTotalBudgetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetProjectTotalBudgetInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_UpdateProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_UpdateProjectInput>;
};


/** Mutations: BuilderProfile */
export type MutationScopeOfWork_UpdateProjectOwnerArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_UpdateProjectOwnerInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_AddAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_AddAlternativeProposalInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_AddPaymentRequestArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_AddPaymentRequestInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_EditAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditAlternativeProposalInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_EditClientInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditClientInfoInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_EditInitialProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditInitialProposalInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_EditWorkstreamArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditWorkstreamInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_RemoveAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_RemoveAlternativeProposalInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_RemovePaymentRequestArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_RemovePaymentRequestInput>;
};


/** Mutations: BuilderProfile */
export type MutationWorkstream_SetRequestForProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_SetRequestForProposalInput>;
};


/** Mutations: BuilderProfile */
export type MutationAddDriveArgs = {
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: BuilderProfile */
export type MutationDeleteDriveArgs = {
  id: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
export type MutationSetDriveIconArgs = {
  icon: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


/** Mutations: BuilderProfile */
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

export type ProcessorWorkstream = {
  __typename?: 'ProcessorWorkstream';
  final_milestone_target?: Maybe<Scalars['DateTime']['output']>;
  initial_proposal_author?: Maybe<Scalars['PHID']['output']>;
  initial_proposal_status?: Maybe<ProposalStatus>;
  network_phid?: Maybe<Scalars['PHID']['output']>;
  network_slug?: Maybe<Scalars['String']['output']>;
  roadmap_oid?: Maybe<Scalars['PHID']['output']>;
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
  BuilderProfile?: Maybe<BuilderProfileQueries>;
  Builders?: Maybe<BuildersQueries>;
  NetworkProfile?: Maybe<NetworkProfileQueries>;
  PaymentTerms?: Maybe<PaymentTermsQueries>;
  RequestForProposals?: Maybe<RequestForProposalsQueries>;
  ScopeOfWork?: Maybe<ScopeOfWorkQueries>;
  Workstream?: Maybe<WorkstreamQueries>;
  allNetworks: Array<AllNetworks>;
  analytics?: Maybe<AnalyticsQuery>;
  driveDocument?: Maybe<DocumentDrive>;
  driveDocuments: Array<DocumentDrive>;
  driveIdBySlug?: Maybe<Scalars['String']['output']>;
  drives: Array<Scalars['String']['output']>;
  processorWorkstreams: Array<ProcessorWorkstream>;
  rfpByWorkstream: Array<WorkstreamRfp>;
  scopeOfWorkByNetworkOrStatus: Array<Sow_ScopeOfWorkState>;
  workstream: Array<FullQueryWorkstream>;
  workstreams: Array<FullQueryWorkstream>;
};


/** Subgraph definition */
export type QueryAllNetworksArgs = {
  filter?: InputMaybe<NetworkFilter>;
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
export type QueryRfpByWorkstreamArgs = {
  filter: WorkstreamFilter;
};


/** Subgraph definition */
export type QueryScopeOfWorkByNetworkOrStatusArgs = {
  filter: ScopeOfWorkByNetworkOrStatusFilter;
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
  id: Scalars['OID']['output'];
  keyResults: Array<Sow_KeyResult>;
  owner?: Maybe<Scalars['ID']['output']>;
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
  projectOwner?: Maybe<Scalars['ID']['output']>;
  scope?: Maybe<Sow_DeliverablesSet>;
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
  contributors: Array<Sow_Agent>;
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
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_UpdateProjectOwnerInput = {
  id: Scalars['OID']['input'];
  projectOwner: Scalars['ID']['input'];
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

export type AllNetworksQueryVariables = Exact<{
  filter?: InputMaybe<NetworkFilter>;
}>;


export type AllNetworksQuery = { __typename?: 'Query', allNetworks: Array<{ __typename?: 'AllNetworks', network?: { __typename?: 'Network', name?: string | null, slug?: string | null, icon?: string | null, logo?: string | null, darkThemeIcon?: string | null, darkThemeLogo?: string | null, category?: Array<NetworkCategory> | null, description?: string | null, discord?: string | null, github?: string | null, logoBig?: string | null, website?: string | null, x?: string | null, youtube?: string | null } | null }> };

export type RfpByWorkstreamQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type RfpByWorkstreamQuery = { __typename?: 'Query', rfpByWorkstream: Array<{ __typename?: 'WorkstreamRfp', code?: string | null, title?: string | null, status?: WorkstreamStatus | null, rfp?: { __typename?: 'RFP', briefing?: string | null, budgetCurrency?: string | null, budgetMax?: number | null, budgetMin?: number | null, code?: string | null, eligibilityCriteria?: string | null, evaluationCriteria?: string | null, status?: RfpStatus | null, id: any, summary?: string | null, submissionDeadline?: any | null, title: string } | null }> };

export type ScopeOfWorkQueryVariables = Exact<{
  docId: Scalars['PHID']['input'];
}>;


export type ScopeOfWorkQuery = { __typename?: 'Query', ScopeOfWork?: { __typename?: 'ScopeOfWorkQueries', getDocument?: { __typename?: 'ScopeOfWork', id: string, stateJSON?: any | null, state: { __typename?: 'ScopeOfWork_ScopeOfWorkState', description: string, status: ScopeOfWork_ScopeOfWorkStatus, title: string, roadmaps: Array<{ __typename?: 'ScopeOfWork_Roadmap', id: any, slug: string, title: string, description: string, milestones: Array<{ __typename?: 'ScopeOfWork_Milestone', description: string, budget?: number | null, title: string, sequenceCode: string, id: any, coordinators: Array<string>, deliveryTarget: string, scope?: { __typename?: 'ScopeOfWork_DeliverablesSet', deliverables: Array<any>, status: ScopeOfWork_DeliverableSetStatus, deliverablesCompleted: { __typename?: 'ScopeOfWork_DeliverablesCompleted', completed: number, total: number } } | null }> }>, contributors: Array<{ __typename?: 'ScopeOfWork_Agent', id: any, name: string }>, deliverables: Array<{ __typename?: 'ScopeOfWork_Deliverable', code: string, description: string, id: any, owner?: string | null, status: ScopeOfWork_DeliverableStatus, title: string, budgetAnchor?: { __typename?: 'ScopeOfWork_BudgetAnchorProject', margin: number, project?: any | null, quantity: number, unit?: ScopeOfWork_Unit | null, unitCost: number } | null, keyResults: Array<{ __typename?: 'ScopeOfWork_KeyResult', id: any, link: string, title: string }> }>, projects: Array<{ __typename?: 'ScopeOfWork_Project', abstract?: string | null, budget?: number | null, budgetType?: ScopeOfWork_BudgetType | null, code: string, currency?: ScopeOfWork_PmCurrency | null, id: any, imageUrl?: any | null, projectOwner?: string | null, title: string, expenditure?: { __typename?: 'ScopeOfWork_BudgetExpenditure', actuals: number, cap: number, percentage: number } | null, scope?: { __typename?: 'ScopeOfWork_DeliverablesSet', status: ScopeOfWork_DeliverableSetStatus, deliverables: Array<any>, deliverablesCompleted: { __typename?: 'ScopeOfWork_DeliverablesCompleted', completed: number, total: number } } | null }> } } | null } | null };

export type RoadmapListQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type RoadmapListQuery = { __typename?: 'Query', workstream: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, slug?: string | null, client?: { __typename?: 'ClientInfo', name?: string | null, icon?: any | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', roadmaps: Array<{ __typename?: 'SOW_Roadmap', id: any, description: string, slug: string, title: string, milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, coordinators: Array<string>, deliveryTarget: string, description: string, id: any, sequenceCode: string, title: string, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any>, status: Sow_DeliverableSetStatus, deliverablesCompleted: { __typename?: 'SOW_DeliverablesCompleted', completed: number, total: number }, progress: { __typename?: 'SOW_Binary', done?: boolean | null } | { __typename?: 'SOW_Percentage', value: number } | { __typename?: 'SOW_StoryPoint', completed: number, total: number } } | null }> }> } | null }> };

export type WorkstreamDetailsQueryVariables = Exact<{
  filter: WorkstreamFilter;
}>;


export type WorkstreamDetailsQuery = { __typename?: 'Query', workstream: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, status?: WorkstreamStatus | null, slug?: string | null, client?: { __typename?: 'ClientInfo', name?: string | null, icon?: any | null } | null, network?: { __typename?: 'Network', name?: string | null, slug?: string | null, logo?: string | null, darkThemeLogo?: string | null } | null, initialProposal?: { __typename?: 'FullProposal', status: ProposalStatus, author: { __typename?: 'ProposalAuthor', name?: string | null }, paymentTerms?: { __typename?: 'PT_PaymentTermsState', proposer: string, currency: Pt_PaymentCurrency, totalAmount?: any | null, paymentModel: Pt_PaymentModel } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', description: string, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any> } | null }> }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string }> } | null } | null, rfp?: { __typename?: 'RFP', title: string, summary?: string | null, budgetMax?: number | null, budgetMin?: number | null, budgetCurrency?: string | null, briefing?: string | null, submissionDeadline?: any | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', projects: Array<{ __typename?: 'SOW_Project', title: string }>, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', id: any }> }> } | null, alternativeProposals: Array<{ __typename?: 'FullProposal', id: any }> }> };

export type WorkstreamsQueryVariables = Exact<{
  filter?: InputMaybe<WorkstreamsFilter>;
}>;


export type WorkstreamsQuery = { __typename?: 'Query', workstreams: Array<{ __typename?: 'FullQueryWorkstream', title?: string | null, status?: WorkstreamStatus | null, slug?: string | null, client?: { __typename?: 'ClientInfo', name?: string | null, icon?: any | null } | null, initialProposal?: { __typename?: 'FullProposal', status: ProposalStatus, author: { __typename?: 'ProposalAuthor', name?: string | null }, paymentTerms?: { __typename?: 'PT_PaymentTermsState', proposer: string, currency: Pt_PaymentCurrency, totalAmount?: any | null, paymentModel: Pt_PaymentModel } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', description: string, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', budget?: number | null, scope?: { __typename?: 'SOW_DeliverablesSet', deliverables: Array<any> } | null }> }>, deliverables: Array<{ __typename?: 'SOW_Deliverable', id: any, code: string, title: string, description: string }> } | null } | null, rfp?: { __typename?: 'RFP', title: string, summary?: string | null, budgetMax?: number | null, budgetMin?: number | null, budgetCurrency?: string | null, briefing?: string | null, submissionDeadline?: any | null } | null, sow?: { __typename?: 'SOW_ScopeOfWorkState', projects: Array<{ __typename?: 'SOW_Project', title: string }>, roadmaps: Array<{ __typename?: 'SOW_Roadmap', milestones: Array<{ __typename?: 'SOW_Milestone', id: any }> }> } | null, alternativeProposals: Array<{ __typename?: 'FullProposal', id: any }> }> };



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
    client {
      name
      icon
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
