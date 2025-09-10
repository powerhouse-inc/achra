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

export type AddDriveResult = {
  __typename?: 'AddDriveResult';
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  preferredEditor?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
};

export type Agent = {
  __typename?: 'Agent';
  agentType: AgentType;
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum AgentType {
  Ai = 'AI',
  Group = 'GROUP',
  Human = 'HUMAN'
}

export enum AgentTypeInput {
  Ai = 'AI',
  Group = 'GROUP',
  Human = 'HUMAN'
}

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

export type AppModule = IDocument & {
  __typename?: 'AppModule';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: AppModule_AppModuleState;
  lastModified: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: AppModule_AppModuleState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type AppModuleOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: AppModule */
export type AppModuleQueries = {
  __typename?: 'AppModuleQueries';
  getDocument?: Maybe<AppModule>;
  getDocuments?: Maybe<Array<AppModule>>;
};


/** Queries: AppModule */
export type AppModuleQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: AppModule */
export type AppModuleQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Subgraph definition for AppModule (powerhouse/app) */
export type AppModuleState = {
  __typename?: 'AppModuleState';
  name: Scalars['String']['output'];
  status: StatusType;
};

export type AppModule_AppModuleState = {
  __typename?: 'AppModule_AppModuleState';
  name: Scalars['String']['output'];
  status: AppModule_StatusType;
};

/** Module: BaseOperations */
export type AppModule_SetAppNameInput = {
  name: Scalars['String']['input'];
};

export type AppModule_SetAppStatusInput = {
  status: StatusType;
};

export enum AppModule_StatusType {
  Confirmed = 'CONFIRMED',
  Draft = 'DRAFT'
}

export type Author = {
  __typename?: 'Author';
  name?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['URL']['output']>;
};

export enum BillingFrequency {
  Biweekly = 'BIWEEKLY',
  Monthly = 'MONTHLY',
  Weekly = 'WEEKLY'
}

export type Binary = {
  __typename?: 'Binary';
  done?: Maybe<Scalars['Boolean']['output']>;
};

export type BonusClause = {
  __typename?: 'BonusClause';
  bonusAmount: Scalars['Amount']['output'];
  comment?: Maybe<Scalars['String']['output']>;
  condition: Scalars['String']['output'];
  id: Scalars['OID']['output'];
};

export type BudgetAnchorProject = {
  __typename?: 'BudgetAnchorProject';
  margin: Scalars['Float']['output'];
  project?: Maybe<Scalars['OID']['output']>;
  quantity: Scalars['Float']['output'];
  unit?: Maybe<Unit>;
  unitCost: Scalars['Float']['output'];
};

export type BudgetExpenditure = {
  __typename?: 'BudgetExpenditure';
  actuals: Scalars['Float']['output'];
  cap: Scalars['Float']['output'];
  percentage: Scalars['Float']['output'];
};

export type BudgetRange = {
  __typename?: 'BudgetRange';
  currency?: Maybe<Scalars['String']['output']>;
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type BudgetRangeInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export enum BudgetType {
  Capex = 'CAPEX',
  Contingency = 'CONTINGENCY',
  Opex = 'OPEX',
  Overhead = 'OVERHEAD'
}

export type ClientInfo = {
  __typename?: 'ClientInfo';
  icon?: Maybe<Scalars['URL']['output']>;
  id: Scalars['PHID']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type ContextDocument = {
  __typename?: 'ContextDocument';
  name: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

export type CostAndMaterials = {
  __typename?: 'CostAndMaterials';
  billingFrequency: BillingFrequency;
  hourlyRate?: Maybe<Scalars['Amount']['output']>;
  timesheetRequired: Scalars['Boolean']['output'];
  variableCap?: Maybe<Scalars['Amount']['output']>;
};

export type CurrencyConversion = {
  metric: Scalars['String']['input'];
  sourceCurrency: Scalars['String']['input'];
};

export type Deliverable = {
  __typename?: 'Deliverable';
  budgetAnchor?: Maybe<BudgetAnchorProject>;
  code: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  keyResults: Array<KeyResult>;
  owner?: Maybe<Scalars['ID']['output']>;
  status: DeliverableStatus;
  title: Scalars['String']['output'];
  workProgress?: Maybe<Progress>;
};

export enum DeliverableSetStatus {
  Canceled = 'CANCELED',
  Draft = 'DRAFT',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export enum DeliverableSetStatusInput {
  Canceled = 'CANCELED',
  Draft = 'DRAFT',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export enum DeliverableStatus {
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO',
  WontDo = 'WONT_DO'
}

export type DeliverablesCompleted = {
  __typename?: 'DeliverablesCompleted';
  completed: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type DeliverablesCompletedInput = {
  completed: Scalars['Int']['input'];
  total: Scalars['Int']['input'];
};

export type DeliverablesSet = {
  __typename?: 'DeliverablesSet';
  deliverables: Array<Scalars['OID']['output']>;
  deliverablesCompleted: DeliverablesCompleted;
  progress: Progress;
  status: DeliverableSetStatus;
};

export type Dimension = {
  __typename?: 'Dimension';
  name?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Maybe<Value>>>;
};

export type DocumentDrive = IDocument & {
  __typename?: 'DocumentDrive';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: DocumentDrive_DocumentDriveState;
  lastModified: Scalars['DateTime']['output'];
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

export type DocumentEditor = IDocument & {
  __typename?: 'DocumentEditor';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: DocumentEditor_DocumentEditorState;
  lastModified: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: DocumentEditor_DocumentEditorState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DocumentEditorOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: DocumentEditor */
export type DocumentEditorQueries = {
  __typename?: 'DocumentEditorQueries';
  getDocument?: Maybe<DocumentEditor>;
  getDocuments?: Maybe<Array<DocumentEditor>>;
};


/** Queries: DocumentEditor */
export type DocumentEditorQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: DocumentEditor */
export type DocumentEditorQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Subgraph definition for DocumentEditor (powerhouse/document-editor) */
export type DocumentEditorState = {
  __typename?: 'DocumentEditorState';
  documentTypes: Array<DocumentTypeItem>;
  name: Scalars['String']['output'];
  status: StatusType;
};

export type DocumentEditor_AddDocumentTypeInput = {
  documentType: Scalars['String']['input'];
  id: Scalars['OID']['input'];
};

export type DocumentEditor_DocumentEditorState = {
  __typename?: 'DocumentEditor_DocumentEditorState';
  documentTypes: Array<DocumentEditor_DocumentTypeItem>;
  name: Scalars['String']['output'];
  status: DocumentEditor_StatusType;
};

export type DocumentEditor_DocumentTypeItem = {
  __typename?: 'DocumentEditor_DocumentTypeItem';
  documentType: Scalars['String']['output'];
  id: Scalars['OID']['output'];
};

export type DocumentEditor_RemoveDocumentTypeInput = {
  id: Scalars['OID']['input'];
};

/** Module: BaseOperations */
export type DocumentEditor_SetEditorNameInput = {
  name: Scalars['String']['input'];
};

export type DocumentEditor_SetEditorStatusInput = {
  status: StatusType;
};

export enum DocumentEditor_StatusType {
  Confirmed = 'CONFIRMED',
  Draft = 'DRAFT'
}

export type DocumentModel = IDocument & {
  __typename?: 'DocumentModel';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModified: Scalars['DateTime']['output'];
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

export type DocumentModel_DocumentModelState = {
  __typename?: 'DocumentModel_DocumentModelState';
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

export type DocumentTypeItem = {
  __typename?: 'DocumentTypeItem';
  documentType: Scalars['String']['output'];
  id: Scalars['OID']['output'];
};

export type DriveDocument = IDocument & {
  __typename?: 'DriveDocument';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModified: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type DriveDocumentOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type Escrow = {
  __typename?: 'Escrow';
  amountHeld: Scalars['Amount']['output'];
  escrowProvider?: Maybe<Scalars['String']['output']>;
  proofOfFundsDocumentId?: Maybe<Scalars['String']['output']>;
  releaseConditions: Scalars['String']['output'];
};

export enum EvaluationFrequency {
  Monthly = 'MONTHLY',
  PerMilestone = 'PER_MILESTONE',
  Weekly = 'WEEKLY'
}

export type EvaluationTerms = {
  __typename?: 'EvaluationTerms';
  commentsVisibleToClient: Scalars['Boolean']['output'];
  criteria: Array<Scalars['String']['output']>;
  evaluationFrequency: EvaluationFrequency;
  evaluatorTeam: Scalars['String']['output'];
  impactsPayout: Scalars['Boolean']['output'];
  impactsReputation: Scalars['Boolean']['output'];
};

export type IDocument = {
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastModified: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type IDocumentOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type KeyResult = {
  __typename?: 'KeyResult';
  id: Scalars['OID']['output'];
  link: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type Keyword = {
  __typename?: 'Keyword';
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export type Milestone = {
  __typename?: 'Milestone';
  amount: Scalars['Amount']['output'];
  budget?: Maybe<Scalars['Float']['output']>;
  coordinators: Array<Scalars['ID']['output']>;
  deliveryTarget: Scalars['String']['output'];
  description: Scalars['String']['output'];
  expectedCompletionDate?: Maybe<Scalars['Date']['output']>;
  id: Scalars['OID']['output'];
  name: Scalars['String']['output'];
  payoutStatus: MilestonePayoutStatus;
  requiresApproval: Scalars['Boolean']['output'];
  scope?: Maybe<DeliverablesSet>;
  sequenceCode: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum MilestonePayoutStatus {
  Approved = 'APPROVED',
  Paid = 'PAID',
  Pending = 'PENDING',
  ReadyForReview = 'READY_FOR_REVIEW',
  Rejected = 'REJECTED'
}

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

/** Mutations: AppModule */
export type Mutation = {
  __typename?: 'Mutation';
  AppModule_createDocument?: Maybe<Scalars['String']['output']>;
  AppModule_setAppName?: Maybe<Scalars['Int']['output']>;
  AppModule_setAppStatus?: Maybe<Scalars['Int']['output']>;
  DocumentEditor_addDocumentType?: Maybe<Scalars['Int']['output']>;
  DocumentEditor_createDocument?: Maybe<Scalars['String']['output']>;
  DocumentEditor_removeDocumentType?: Maybe<Scalars['Int']['output']>;
  DocumentEditor_setEditorName?: Maybe<Scalars['Int']['output']>;
  DocumentEditor_setEditorStatus?: Maybe<Scalars['Int']['output']>;
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
  PaymentTerms_setCostAndMaterials?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_setEscrowDetails?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_setEvaluationTerms?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_setRetainerDetails?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updateBonusClause?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updateMilestone?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updateMilestoneStatus?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updatePenaltyClause?: Maybe<Scalars['Int']['output']>;
  PaymentTerms_updateStatus?: Maybe<Scalars['Int']['output']>;
  ProcessorModule_addDocumentType?: Maybe<Scalars['Int']['output']>;
  ProcessorModule_createDocument?: Maybe<Scalars['String']['output']>;
  ProcessorModule_removeDocumentType?: Maybe<Scalars['Int']['output']>;
  ProcessorModule_setProcessorName?: Maybe<Scalars['Int']['output']>;
  ProcessorModule_setProcessorStatus?: Maybe<Scalars['Int']['output']>;
  ProcessorModule_setProcessorType?: Maybe<Scalars['Int']['output']>;
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
  SubgraphModule_createDocument?: Maybe<Scalars['String']['output']>;
  SubgraphModule_setSubgraphName?: Maybe<Scalars['Int']['output']>;
  SubgraphModule_setSubgraphStatus?: Maybe<Scalars['Int']['output']>;
  VetraPackage_addPackageKeyword?: Maybe<Scalars['Int']['output']>;
  VetraPackage_createDocument?: Maybe<Scalars['String']['output']>;
  VetraPackage_removePackageKeyword?: Maybe<Scalars['Int']['output']>;
  VetraPackage_setPackageAuthor?: Maybe<Scalars['Int']['output']>;
  VetraPackage_setPackageAuthorName?: Maybe<Scalars['Int']['output']>;
  VetraPackage_setPackageAuthorWebsite?: Maybe<Scalars['Int']['output']>;
  VetraPackage_setPackageCategory?: Maybe<Scalars['Int']['output']>;
  VetraPackage_setPackageDescription?: Maybe<Scalars['Int']['output']>;
  VetraPackage_setPackageGithubUrl?: Maybe<Scalars['Int']['output']>;
  VetraPackage_setPackageName?: Maybe<Scalars['Int']['output']>;
  VetraPackage_setPackageNpmUrl?: Maybe<Scalars['Int']['output']>;
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


/** Mutations: AppModule */
export type MutationAppModule_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationAppModule_SetAppNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AppModule_SetAppNameInput>;
};


/** Mutations: AppModule */
export type MutationAppModule_SetAppStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<AppModule_SetAppStatusInput>;
};


/** Mutations: AppModule */
export type MutationDocumentEditor_AddDocumentTypeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<DocumentEditor_AddDocumentTypeInput>;
};


/** Mutations: AppModule */
export type MutationDocumentEditor_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationDocumentEditor_RemoveDocumentTypeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<DocumentEditor_RemoveDocumentTypeInput>;
};


/** Mutations: AppModule */
export type MutationDocumentEditor_SetEditorNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<DocumentEditor_SetEditorNameInput>;
};


/** Mutations: AppModule */
export type MutationDocumentEditor_SetEditorStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<DocumentEditor_SetEditorStatusInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetCategoryArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetCategoryInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetDescriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetDescriptionInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetDiscordArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetDiscordInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetGithubArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetGithubInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetIconArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetIconInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetLogoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetLogoInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetLogoBigArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetLogoBigInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetProfileNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetProfileNameInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetWebsiteArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetWebsiteInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetXArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetXInput>;
};


/** Mutations: AppModule */
export type MutationNetworkProfile_SetYoutubeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<NetworkProfile_SetYoutubeInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_AddBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddBonusClauseInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_AddMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddMilestoneInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_AddPenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_AddPenaltyClauseInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationPaymentTerms_DeleteBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeleteBonusClauseInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_DeleteMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeleteMilestoneInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_DeletePenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_DeletePenaltyClauseInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_ReorderMilestonesArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_ReorderMilestonesInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_SetBasicTermsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetBasicTermsInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_SetCostAndMaterialsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetCostAndMaterialsInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_SetEscrowDetailsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetEscrowDetailsInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_SetEvaluationTermsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetEvaluationTermsInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_SetRetainerDetailsArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_SetRetainerDetailsInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_UpdateBonusClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateBonusClauseInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_UpdateMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateMilestoneInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_UpdateMilestoneStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateMilestoneStatusInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_UpdatePenaltyClauseArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdatePenaltyClauseInput>;
};


/** Mutations: AppModule */
export type MutationPaymentTerms_UpdateStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<PaymentTerms_UpdateStatusInput>;
};


/** Mutations: AppModule */
export type MutationProcessorModule_AddDocumentTypeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ProcessorModule_AddDocumentTypeInput>;
};


/** Mutations: AppModule */
export type MutationProcessorModule_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationProcessorModule_RemoveDocumentTypeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ProcessorModule_RemoveDocumentTypeInput>;
};


/** Mutations: AppModule */
export type MutationProcessorModule_SetProcessorNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ProcessorModule_SetProcessorNameInput>;
};


/** Mutations: AppModule */
export type MutationProcessorModule_SetProcessorStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ProcessorModule_SetProcessorStatusInput>;
};


/** Mutations: AppModule */
export type MutationProcessorModule_SetProcessorTypeArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ProcessorModule_SetProcessorTypeInput>;
};


/** Mutations: AppModule */
export type MutationRequestForProposals_AddContextDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_AddContextDocumentInput>;
};


/** Mutations: AppModule */
export type MutationRequestForProposals_AddProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_AddProposalInput>;
};


/** Mutations: AppModule */
export type MutationRequestForProposals_ChangeProposalStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_ChangeProposalStatusInput>;
};


/** Mutations: AppModule */
export type MutationRequestForProposals_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationRequestForProposals_EditRfpArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_EditRfpInput>;
};


/** Mutations: AppModule */
export type MutationRequestForProposals_RemoveContextDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_RemoveContextDocumentInput>;
};


/** Mutations: AppModule */
export type MutationRequestForProposals_RemoveProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<RequestForProposals_RemoveProposalInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddAgentInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddCoordinatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddCoordinatorInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddDeliverableInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddDeliverableInSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddDeliverableInSetInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddKeyResultInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddMilestoneInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddMilestoneDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddMilestoneDeliverableInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddProjectInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddProjectDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddProjectDeliverableInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_AddRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_AddRoadmapInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationScopeOfWork_EditAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditAgentInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_EditDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditDeliverableInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_EditDeliverablesSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditDeliverablesSetInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_EditKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditKeyResultInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_EditMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditMilestoneInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_EditRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditRoadmapInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_EditScopeOfWorkArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_EditScopeOfWorkInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveAgentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveAgentInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveCoordinatorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveCoordinatorInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveDeliverableInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveDeliverableInSetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveDeliverableInSetInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveKeyResultArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveKeyResultInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveMilestoneArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveMilestoneInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveMilestoneDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveMilestoneDeliverableInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveProjectInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveProjectDeliverableArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveProjectDeliverableInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_RemoveRoadmapArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_RemoveRoadmapInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_SetDeliverableBudgetAnchorProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetDeliverableBudgetAnchorProjectInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_SetDeliverableProgressArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetDeliverableProgressInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_SetProjectMarginArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetProjectMarginInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_SetProjectTotalBudgetArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_SetProjectTotalBudgetInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_UpdateProjectArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_UpdateProjectInput>;
};


/** Mutations: AppModule */
export type MutationScopeOfWork_UpdateProjectOwnerArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<ScopeOfWork_UpdateProjectOwnerInput>;
};


/** Mutations: AppModule */
export type MutationSubgraphModule_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationSubgraphModule_SetSubgraphNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubgraphModule_SetSubgraphNameInput>;
};


/** Mutations: AppModule */
export type MutationSubgraphModule_SetSubgraphStatusArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<SubgraphModule_SetSubgraphStatusInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_AddPackageKeywordArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_AddPackageKeywordInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_RemovePackageKeywordArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_RemovePackageKeywordInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_SetPackageAuthorArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_SetPackageAuthorInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_SetPackageAuthorNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_SetPackageAuthorNameInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_SetPackageAuthorWebsiteArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_SetPackageAuthorWebsiteInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_SetPackageCategoryArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_SetPackageCategoryInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_SetPackageDescriptionArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_SetPackageDescriptionInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_SetPackageGithubUrlArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_SetPackageGithubUrlInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_SetPackageNameArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_SetPackageNameInput>;
};


/** Mutations: AppModule */
export type MutationVetraPackage_SetPackageNpmUrlArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<VetraPackage_SetPackageNpmUrlInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_AddAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_AddAlternativeProposalInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_AddPaymentRequestArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_AddPaymentRequestInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_CreateDocumentArgs = {
  driveId?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationWorkstream_EditAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditAlternativeProposalInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_EditClientInfoArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditClientInfoInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_EditInitialProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditInitialProposalInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_EditWorkstreamArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_EditWorkstreamInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_RemoveAlternativeProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_RemoveAlternativeProposalInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_RemovePaymentRequestArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_RemovePaymentRequestInput>;
};


/** Mutations: AppModule */
export type MutationWorkstream_SetRequestForProposalArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
  input?: InputMaybe<Workstream_SetRequestForProposalInput>;
};


/** Mutations: AppModule */
export type MutationAddDriveArgs = {
  icon?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  preferredEditor?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


/** Mutations: AppModule */
export type MutationDeleteDriveArgs = {
  id: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationSetDriveIconArgs = {
  icon: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


/** Mutations: AppModule */
export type MutationSetDriveNameArgs = {
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

/** Subgraph definition for NetworkProfile (powerhouse/network-profile) */
export enum NetworkCategory {
  Charity = 'CHARITY',
  Crypto = 'CRYPTO',
  Defi = 'DEFI',
  Ngo = 'NGO',
  Oss = 'OSS'
}

export type NetworkProfile = IDocument & {
  __typename?: 'NetworkProfile';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: NetworkProfile_NetworkProfileState;
  lastModified: Scalars['DateTime']['output'];
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

/** Queries: NetworkProfile */
export type NetworkProfileQueries = {
  __typename?: 'NetworkProfileQueries';
  getDocument?: Maybe<NetworkProfile>;
  getDocuments?: Maybe<Array<NetworkProfile>>;
};


/** Queries: NetworkProfile */
export type NetworkProfileQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: NetworkProfile */
export type NetworkProfileQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type NetworkProfileState = {
  __typename?: 'NetworkProfileState';
  category: Array<NetworkCategory>;
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
  category: Array<NetworkCategory>;
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
  icon: Scalars['String']['input'];
};

export type NetworkProfile_SetLogoBigInput = {
  logoBig: Scalars['String']['input'];
};

export type NetworkProfile_SetLogoInput = {
  logo: Scalars['String']['input'];
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

export enum PmBudgetTypeInput {
  Capex = 'CAPEX',
  Contingency = 'CONTINGENCY',
  Opex = 'OPEX',
  Overhead = 'OVERHEAD'
}

export enum PmCurrency {
  Dai = 'DAI',
  Eur = 'EUR',
  Usd = 'USD',
  Usds = 'USDS'
}

export enum PmCurrencyInput {
  Dai = 'DAI',
  Eur = 'EUR',
  Usd = 'USD',
  Usds = 'USDS'
}

export enum PmDeliverableStatusInput {
  Blocked = 'BLOCKED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO',
  WontDo = 'WONT_DO'
}

export enum PaymentCurrency {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export enum PaymentModel {
  CostAndMaterials = 'COST_AND_MATERIALS',
  Milestone = 'MILESTONE',
  Retainer = 'RETAINER'
}

export type PaymentTerms = IDocument & {
  __typename?: 'PaymentTerms';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: PaymentTerms_PaymentTermsState;
  lastModified: Scalars['DateTime']['output'];
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

/** Queries: PaymentTerms */
export type PaymentTermsQueries = {
  __typename?: 'PaymentTermsQueries';
  getDocument?: Maybe<PaymentTerms>;
  getDocuments?: Maybe<Array<PaymentTerms>>;
};


/** Queries: PaymentTerms */
export type PaymentTermsQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: PaymentTerms */
export type PaymentTermsQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

export type PaymentTermsState = {
  __typename?: 'PaymentTermsState';
  bonusClauses: Array<BonusClause>;
  costAndMaterials?: Maybe<CostAndMaterials>;
  currency: PaymentCurrency;
  escrowDetails?: Maybe<Escrow>;
  evaluation?: Maybe<EvaluationTerms>;
  milestoneSchedule: Array<Milestone>;
  payer: Scalars['String']['output'];
  paymentModel: PaymentModel;
  penaltyClauses: Array<PenaltyClause>;
  proposer: Scalars['String']['output'];
  retainerDetails?: Maybe<Retainer>;
  status: PaymentTermsStatus;
  totalAmount?: Maybe<Scalars['Amount']['output']>;
};

/** Subgraph definition for PaymentTerms (payment-terms) */
export enum PaymentTermsStatus {
  Accepted = 'ACCEPTED',
  Cancelled = 'CANCELLED',
  Draft = 'DRAFT',
  Submitted = 'SUBMITTED'
}

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

export type PaymentTerms_CostAndMaterials = {
  __typename?: 'PaymentTerms_CostAndMaterials';
  billingFrequency: PaymentTerms_BillingFrequency;
  hourlyRate?: Maybe<Scalars['Amount']['output']>;
  timesheetRequired: Scalars['Boolean']['output'];
  variableCap?: Maybe<Scalars['Amount']['output']>;
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

export type PaymentTerms_Retainer = {
  __typename?: 'PaymentTerms_Retainer';
  autoRenew: Scalars['Boolean']['output'];
  billingFrequency: PaymentTerms_BillingFrequency;
  endDate?: Maybe<Scalars['Date']['output']>;
  retainerAmount: Scalars['Amount']['output'];
  servicesIncluded: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
};

/** Module: Terms */
export type PaymentTerms_SetBasicTermsInput = {
  currency: PaymentCurrency;
  payer: Scalars['String']['input'];
  paymentModel: PaymentModel;
  proposer: Scalars['String']['input'];
  totalAmount?: InputMaybe<Scalars['Amount']['input']>;
};

export type PaymentTerms_SetCostAndMaterialsInput = {
  billingFrequency: BillingFrequency;
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
  evaluationFrequency: EvaluationFrequency;
  evaluatorTeam: Scalars['String']['input'];
  impactsPayout: Scalars['Boolean']['input'];
  impactsReputation: Scalars['Boolean']['input'];
};

export type PaymentTerms_SetRetainerDetailsInput = {
  autoRenew: Scalars['Boolean']['input'];
  billingFrequency: BillingFrequency;
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
  payoutStatus: MilestonePayoutStatus;
};

export type PaymentTerms_UpdatePenaltyClauseInput = {
  comment?: InputMaybe<Scalars['String']['input']>;
  condition?: InputMaybe<Scalars['String']['input']>;
  deductionAmount?: InputMaybe<Scalars['Amount']['input']>;
  id: Scalars['OID']['input'];
};

export type PaymentTerms_UpdateStatusInput = {
  status: PaymentTermsStatus;
};

export type PenaltyClause = {
  __typename?: 'PenaltyClause';
  comment?: Maybe<Scalars['String']['output']>;
  condition: Scalars['String']['output'];
  deductionAmount: Scalars['Amount']['output'];
  id: Scalars['OID']['output'];
};

export type Percentage = {
  __typename?: 'Percentage';
  value: Scalars['Float']['output'];
};

export type ProcessorModule = IDocument & {
  __typename?: 'ProcessorModule';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ProcessorModule_ProcessorModuleState;
  lastModified: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: ProcessorModule_ProcessorModuleState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type ProcessorModuleOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: ProcessorModule */
export type ProcessorModuleQueries = {
  __typename?: 'ProcessorModuleQueries';
  getDocument?: Maybe<ProcessorModule>;
  getDocuments?: Maybe<Array<ProcessorModule>>;
};


/** Queries: ProcessorModule */
export type ProcessorModuleQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: ProcessorModule */
export type ProcessorModuleQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Subgraph definition for ProcessorModule (powerhouse/processor) */
export type ProcessorModuleState = {
  __typename?: 'ProcessorModuleState';
  documentTypes: Array<DocumentTypeItem>;
  name: Scalars['String']['output'];
  status: StatusType;
  type: Scalars['String']['output'];
};

export type ProcessorModule_AddDocumentTypeInput = {
  documentType: Scalars['String']['input'];
  id: Scalars['OID']['input'];
};

export type ProcessorModule_DocumentTypeItem = {
  __typename?: 'ProcessorModule_DocumentTypeItem';
  documentType: Scalars['String']['output'];
  id: Scalars['OID']['output'];
};

export type ProcessorModule_ProcessorModuleState = {
  __typename?: 'ProcessorModule_ProcessorModuleState';
  documentTypes: Array<ProcessorModule_DocumentTypeItem>;
  name: Scalars['String']['output'];
  status: ProcessorModule_StatusType;
  type: Scalars['String']['output'];
};

export type ProcessorModule_RemoveDocumentTypeInput = {
  id: Scalars['OID']['input'];
};

/** Module: BaseOperations */
export type ProcessorModule_SetProcessorNameInput = {
  name: Scalars['String']['input'];
};

export type ProcessorModule_SetProcessorStatusInput = {
  status: StatusType;
};

export type ProcessorModule_SetProcessorTypeInput = {
  type: Scalars['String']['input'];
};

export enum ProcessorModule_StatusType {
  Confirmed = 'CONFIRMED',
  Draft = 'DRAFT'
}

export type Progress = Binary | Percentage | StoryPoint;

export type ProgressInput = {
  done?: InputMaybe<Scalars['Boolean']['input']>;
  percentage?: InputMaybe<Scalars['Float']['input']>;
  storyPoints?: InputMaybe<StoryPointInput>;
};

export type Project = {
  __typename?: 'Project';
  abstract?: Maybe<Scalars['String']['output']>;
  budget?: Maybe<Scalars['Float']['output']>;
  budgetType?: Maybe<BudgetType>;
  code: Scalars['String']['output'];
  currency?: Maybe<PmCurrency>;
  expenditure?: Maybe<BudgetExpenditure>;
  id: Scalars['OID']['output'];
  imageUrl?: Maybe<Scalars['URL']['output']>;
  projectOwner?: Maybe<Scalars['ID']['output']>;
  scope?: Maybe<DeliverablesSet>;
  title: Scalars['String']['output'];
};

export type Proposal = {
  __typename?: 'Proposal';
  author: ProposalAuthor;
  id: Scalars['ID']['output'];
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

export type ProposalAuthorInput = {
  icon?: InputMaybe<Scalars['URL']['input']>;
  id: Scalars['PHID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum ProposalStatus {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export enum ProposalStatusInput {
  Accepted = 'ACCEPTED',
  Draft = 'DRAFT',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export type Query = {
  __typename?: 'Query';
  AppModule?: Maybe<AppModuleQueries>;
  DocumentEditor?: Maybe<DocumentEditorQueries>;
  NetworkProfile?: Maybe<NetworkProfileQueries>;
  PaymentTerms?: Maybe<PaymentTermsQueries>;
  ProcessorModule?: Maybe<ProcessorModuleQueries>;
  RequestForProposals?: Maybe<RequestForProposalsQueries>;
  ScopeOfWork?: Maybe<ScopeOfWorkQueries>;
  SubgraphModule?: Maybe<SubgraphModuleQueries>;
  VetraPackage?: Maybe<VetraPackageQueries>;
  Workstream?: Maybe<WorkstreamQueries>;
  analytics?: Maybe<AnalyticsQuery>;
  driveIdBySlug?: Maybe<Scalars['String']['output']>;
  drives: Array<Scalars['String']['output']>;
};


export type QueryDriveIdBySlugArgs = {
  slug: Scalars['String']['input'];
};

export type Rfp = {
  __typename?: 'RFP';
  id: Scalars['PHID']['output'];
  title: Scalars['String']['output'];
};

export enum RfpCommentatorType {
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export enum RfpStatus {
  Awarded = 'AWARDED',
  Canceled = 'CANCELED',
  Closed = 'CLOSED',
  Draft = 'DRAFT',
  NotAwarded = 'NOT_AWARDED',
  OpenForProposals = 'OPEN_FOR_PROPOSALS',
  RequestForCommments = 'REQUEST_FOR_COMMMENTS'
}

export enum RfpStatusInput {
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
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: RequestForProposals_RequestForProposalsState;
  lastModified: Scalars['DateTime']['output'];
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

/** Queries: RequestForProposals */
export type RequestForProposalsQueries = {
  __typename?: 'RequestForProposalsQueries';
  getDocument?: Maybe<RequestForProposals>;
  getDocuments?: Maybe<Array<RequestForProposals>>;
};


/** Queries: RequestForProposals */
export type RequestForProposalsQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: RequestForProposals */
export type RequestForProposalsQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Subgraph definition for RequestForProposals (powerhouse/rfp) */
export type RequestForProposalsState = {
  __typename?: 'RequestForProposalsState';
  briefing: Scalars['String']['output'];
  budgetRange: BudgetRange;
  code?: Maybe<Scalars['String']['output']>;
  contextDocuments: Array<ContextDocument>;
  deadline?: Maybe<Scalars['DateTime']['output']>;
  eligibilityCriteria: Scalars['String']['output'];
  evaluationCriteria: Scalars['String']['output'];
  issuer: Scalars['ID']['output'];
  proposals: Array<RfpProposal>;
  rfpCommenter: Array<RfpCommenter>;
  status: RfpStatus;
  summary: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
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
  paymentTerms: RfpPaymentTermInput;
  proposalStatus: RfpProposalStatusInput;
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

export type RequestForProposals_ChangeProposalStatusInput = {
  proposalId: Scalars['OID']['input'];
  status: RfpProposalStatusInput;
};

export type RequestForProposals_ContextDocument = {
  __typename?: 'RequestForProposals_ContextDocument';
  name: Scalars['String']['output'];
  url: Scalars['URL']['output'];
};

/** Module: RfpState */
export type RequestForProposals_EditRfpInput = {
  briefing?: InputMaybe<Scalars['String']['input']>;
  budgetRange?: InputMaybe<BudgetRangeInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  deadline?: InputMaybe<Scalars['DateTime']['input']>;
  eligibilityCriteria?: InputMaybe<Scalars['String']['input']>;
  evaluationCriteria?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<RfpStatusInput>;
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

export type Retainer = {
  __typename?: 'Retainer';
  autoRenew: Scalars['Boolean']['output'];
  billingFrequency: BillingFrequency;
  endDate?: Maybe<Scalars['Date']['output']>;
  retainerAmount: Scalars['Amount']['output'];
  servicesIncluded: Scalars['String']['output'];
  startDate: Scalars['Date']['output'];
};

export enum RfpAgentType {
  Ai = 'AI',
  Group = 'GROUP',
  Human = 'HUMAN'
}

export type RfpCommenter = {
  __typename?: 'RfpCommenter';
  agentType: RfpAgentType;
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rfpCommentatorType: RfpCommentatorType;
};

export enum RfpPaymentTerm {
  Escrow = 'ESCROW',
  MilestoneBasedAdvancePayment = 'MILESTONE_BASED_ADVANCE_PAYMENT',
  MilestoneBasedFixedPrice = 'MILESTONE_BASED_FIXED_PRICE',
  RetainerBased = 'RETAINER_BASED',
  VariableCost = 'VARIABLE_COST'
}

export enum RfpPaymentTermInput {
  Escrow = 'ESCROW',
  MilestoneBasedAdvancePayment = 'MILESTONE_BASED_ADVANCE_PAYMENT',
  MilestoneBasedFixedPrice = 'MILESTONE_BASED_FIXED_PRICE',
  RetainerBased = 'RETAINER_BASED',
  VariableCost = 'VARIABLE_COST'
}

export type RfpProposal = {
  __typename?: 'RfpProposal';
  budgetEstimate: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  paymentTerms: RfpPaymentTerm;
  proposalStatus: RfpProposalStatus;
  submittedby?: Maybe<Scalars['OID']['output']>;
  summary: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export enum RfpProposalStatus {
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

export enum RfpProposalStatusInput {
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

export type Roadmap = {
  __typename?: 'Roadmap';
  description: Scalars['String']['output'];
  id: Scalars['OID']['output'];
  milestones: Array<Milestone>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ScopeOfWork = IDocument & {
  __typename?: 'ScopeOfWork';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: ScopeOfWork_ScopeOfWorkState;
  lastModified: Scalars['DateTime']['output'];
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

/** Queries: ScopeOfWork */
export type ScopeOfWorkQueries = {
  __typename?: 'ScopeOfWorkQueries';
  getDocument?: Maybe<ScopeOfWork>;
  getDocuments?: Maybe<Array<ScopeOfWork>>;
};


/** Queries: ScopeOfWork */
export type ScopeOfWorkQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: ScopeOfWork */
export type ScopeOfWorkQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Subgraph definition for ScopeOfWork (powerhouse/scopeofwork) */
export type ScopeOfWorkState = {
  __typename?: 'ScopeOfWorkState';
  contributors: Array<Agent>;
  deliverables: Array<Deliverable>;
  description: Scalars['String']['output'];
  projects: Array<Project>;
  roadmaps: Array<Roadmap>;
  status: ScopeOfWorkStatus;
  title: Scalars['String']['output'];
};

export enum ScopeOfWorkStatus {
  Approved = 'APPROVED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

export enum ScopeOfWorkStatusInput {
  Approved = 'APPROVED',
  Canceled = 'CANCELED',
  Delivered = 'DELIVERED',
  Draft = 'DRAFT',
  InProgress = 'IN_PROGRESS',
  Rejected = 'REJECTED',
  Submitted = 'SUBMITTED'
}

/** Module: Contributors */
export type ScopeOfWork_AddAgentInput = {
  agentType?: InputMaybe<AgentTypeInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
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
  status?: InputMaybe<PmDeliverableStatusInput>;
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
  budgetType?: InputMaybe<PmBudgetTypeInput>;
  code: Scalars['String']['input'];
  currency?: InputMaybe<PmCurrencyInput>;
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
  agentType: ScopeOfWork_AgentType;
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export enum ScopeOfWork_AgentType {
  Ai = 'AI',
  Group = 'GROUP',
  Human = 'HUMAN'
}

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

export type ScopeOfWork_DeliverablesSet = {
  __typename?: 'ScopeOfWork_DeliverablesSet';
  deliverables: Array<Scalars['OID']['output']>;
  deliverablesCompleted: ScopeOfWork_DeliverablesCompleted;
  progress: ScopeOfWork_Progress;
  status: ScopeOfWork_DeliverableSetStatus;
};

export type ScopeOfWork_EditAgentInput = {
  agentType?: InputMaybe<AgentTypeInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ScopeOfWork_EditDeliverableInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['OID']['input'];
  owner?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<PmDeliverableStatusInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Module: DeliverablesSet */
export type ScopeOfWork_EditDeliverablesSetInput = {
  deliverablesCompleted?: InputMaybe<DeliverablesCompletedInput>;
  milestoneId?: InputMaybe<Scalars['ID']['input']>;
  projectId?: InputMaybe<Scalars['ID']['input']>;
  status?: InputMaybe<DeliverableSetStatusInput>;
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
  status?: InputMaybe<ScopeOfWorkStatusInput>;
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

export enum ScopeOfWork_PmCurrency {
  Dai = 'DAI',
  Eur = 'EUR',
  Usd = 'USD',
  Usds = 'USDS'
}

export type ScopeOfWork_Percentage = {
  __typename?: 'ScopeOfWork_Percentage';
  value: Scalars['Float']['output'];
};

export type ScopeOfWork_Progress = ScopeOfWork_Binary | ScopeOfWork_Percentage | ScopeOfWork_StoryPoint;

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
  id: Scalars['OID']['input'];
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

export type ScopeOfWork_SetDeliverableBudgetAnchorProjectInput = {
  deliverableId: Scalars['ID']['input'];
  margin?: InputMaybe<Scalars['Float']['input']>;
  project?: InputMaybe<Scalars['OID']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  unit?: InputMaybe<Unit>;
  unitCost?: InputMaybe<Scalars['Float']['input']>;
};

export type ScopeOfWork_SetDeliverableProgressInput = {
  id: Scalars['OID']['input'];
  workProgress?: InputMaybe<ProgressInput>;
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

export enum ScopeOfWork_Unit {
  Hours = 'Hours',
  StoryPoints = 'StoryPoints'
}

export type ScopeOfWork_UpdateProjectInput = {
  abstract?: InputMaybe<Scalars['String']['input']>;
  budget?: InputMaybe<Scalars['Float']['input']>;
  budgetType?: InputMaybe<PmBudgetTypeInput>;
  code?: InputMaybe<Scalars['String']['input']>;
  currency?: InputMaybe<PmCurrencyInput>;
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

export enum StatusType {
  Confirmed = 'CONFIRMED',
  Draft = 'DRAFT'
}

export type StoryPoint = {
  __typename?: 'StoryPoint';
  completed: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type StoryPointInput = {
  completed: Scalars['Int']['input'];
  total: Scalars['Int']['input'];
};

export type SubgraphModule = IDocument & {
  __typename?: 'SubgraphModule';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: SubgraphModule_SubgraphModuleState;
  lastModified: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: SubgraphModule_SubgraphModuleState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type SubgraphModuleOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: SubgraphModule */
export type SubgraphModuleQueries = {
  __typename?: 'SubgraphModuleQueries';
  getDocument?: Maybe<SubgraphModule>;
  getDocuments?: Maybe<Array<SubgraphModule>>;
};


/** Queries: SubgraphModule */
export type SubgraphModuleQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: SubgraphModule */
export type SubgraphModuleQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Subgraph definition for SubgraphModule (powerhouse/subgraph) */
export type SubgraphModuleState = {
  __typename?: 'SubgraphModuleState';
  name: Scalars['String']['output'];
  status: StatusType;
};

/** Module: BaseOperations */
export type SubgraphModule_SetSubgraphNameInput = {
  name: Scalars['String']['input'];
};

export type SubgraphModule_SetSubgraphStatusInput = {
  status: StatusType;
};

export enum SubgraphModule_StatusType {
  Confirmed = 'CONFIRMED',
  Draft = 'DRAFT'
}

export type SubgraphModule_SubgraphModuleState = {
  __typename?: 'SubgraphModule_SubgraphModuleState';
  name: Scalars['String']['output'];
  status: SubgraphModule_StatusType;
};

export enum Unit {
  Hours = 'Hours',
  StoryPoints = 'StoryPoints'
}

export type Value = {
  __typename?: 'Value';
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  path?: Maybe<Scalars['String']['output']>;
};

export type VetraPackage = IDocument & {
  __typename?: 'VetraPackage';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: VetraPackage_VetraPackageState;
  lastModified: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  operations: Array<Operation>;
  revision: Scalars['Int']['output'];
  state: VetraPackage_VetraPackageState;
  stateJSON?: Maybe<Scalars['JSONObject']['output']>;
};


export type VetraPackageOperationsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

/** Queries: VetraPackage */
export type VetraPackageQueries = {
  __typename?: 'VetraPackageQueries';
  getDocument?: Maybe<VetraPackage>;
  getDocuments?: Maybe<Array<VetraPackage>>;
};


/** Queries: VetraPackage */
export type VetraPackageQueriesGetDocumentArgs = {
  docId?: InputMaybe<Scalars['PHID']['input']>;
  driveId?: InputMaybe<Scalars['String']['input']>;
};

/** Subgraph definition for VetraPackage (powerhouse/package) */
export type VetraPackageState = {
  __typename?: 'VetraPackageState';
  author: Author;
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  githubUrl?: Maybe<Scalars['URL']['output']>;
  keywords: Array<Keyword>;
  name?: Maybe<Scalars['String']['output']>;
  npmUrl?: Maybe<Scalars['URL']['output']>;
};

export type VetraPackage_AddPackageKeywordInput = {
  id: Scalars['String']['input'];
  label: Scalars['String']['input'];
};

export type VetraPackage_Author = {
  __typename?: 'VetraPackage_Author';
  name?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['URL']['output']>;
};

export type VetraPackage_Keyword = {
  __typename?: 'VetraPackage_Keyword';
  id: Scalars['OID']['output'];
  label: Scalars['String']['output'];
};

export type VetraPackage_RemovePackageKeywordInput = {
  id: Scalars['String']['input'];
};

export type VetraPackage_SetPackageAuthorInput = {
  name?: InputMaybe<Scalars['OID']['input']>;
  website?: InputMaybe<Scalars['URL']['input']>;
};

export type VetraPackage_SetPackageAuthorNameInput = {
  name: Scalars['String']['input'];
};

export type VetraPackage_SetPackageAuthorWebsiteInput = {
  website: Scalars['URL']['input'];
};

export type VetraPackage_SetPackageCategoryInput = {
  category: Scalars['String']['input'];
};

export type VetraPackage_SetPackageDescriptionInput = {
  description: Scalars['String']['input'];
};

export type VetraPackage_SetPackageGithubUrlInput = {
  url: Scalars['URL']['input'];
};

/** Module: BaseOperations */
export type VetraPackage_SetPackageNameInput = {
  name: Scalars['String']['input'];
};

export type VetraPackage_SetPackageNpmUrlInput = {
  url: Scalars['URL']['input'];
};

export type VetraPackage_VetraPackageState = {
  __typename?: 'VetraPackage_VetraPackageState';
  author: VetraPackage_Author;
  category?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  githubUrl?: Maybe<Scalars['URL']['output']>;
  keywords: Array<VetraPackage_Keyword>;
  name?: Maybe<Scalars['String']['output']>;
  npmUrl?: Maybe<Scalars['URL']['output']>;
};

export type Workstream = IDocument & {
  __typename?: 'Workstream';
  created: Scalars['DateTime']['output'];
  documentType: Scalars['String']['output'];
  id: Scalars['String']['output'];
  initialState: Workstream_WorkstreamState;
  lastModified: Scalars['DateTime']['output'];
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

/** Queries: Workstream */
export type WorkstreamQueries = {
  __typename?: 'WorkstreamQueries';
  getDocument?: Maybe<Workstream>;
  getDocuments?: Maybe<Array<Workstream>>;
};


/** Queries: Workstream */
export type WorkstreamQueriesGetDocumentArgs = {
  docId: Scalars['PHID']['input'];
  driveId?: InputMaybe<Scalars['PHID']['input']>;
};


/** Queries: Workstream */
export type WorkstreamQueriesGetDocumentsArgs = {
  driveId: Scalars['String']['input'];
};

/** Subgraph definition for Workstream (powerhouse/workstream) */
export type WorkstreamState = {
  __typename?: 'WorkstreamState';
  alternativeProposals: Array<Proposal>;
  client?: Maybe<ClientInfo>;
  code?: Maybe<Scalars['String']['output']>;
  initialProposal?: Maybe<Proposal>;
  paymentRequests: Array<Scalars['PHID']['output']>;
  paymentTerms?: Maybe<Scalars['PHID']['output']>;
  rfp?: Maybe<Rfp>;
  sow?: Maybe<Scalars['PHID']['output']>;
  status: WorkstreamStatus;
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

export enum WorkstreamStatusInput {
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
  proposalAuthor?: InputMaybe<ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<ProposalStatusInput>;
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
  proposalAuthor?: InputMaybe<ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<ProposalStatusInput>;
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
  proposalAuthor?: InputMaybe<ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<ProposalStatusInput>;
};

/** Module: Workstream */
export type Workstream_EditWorkstreamInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  paymentTerms?: InputMaybe<Scalars['PHID']['input']>;
  sowId?: InputMaybe<Scalars['PHID']['input']>;
  status?: InputMaybe<WorkstreamStatusInput>;
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

export type NetworkProfileQueryVariables = Exact<{
  docId: Scalars['PHID']['input'];
}>;


export type NetworkProfileQuery = { __typename?: 'Query', NetworkProfile?: { __typename?: 'NetworkProfileQueries', getDocument?: { __typename?: 'NetworkProfile', state: { __typename?: 'NetworkProfile_NetworkProfileState', category: Array<NetworkProfile_NetworkCategory>, description: string, discord?: string | null, github?: string | null, icon: string, logo: string, logoBig: string, name: string, website?: string | null, x?: string | null, youtube?: string | null } } | null } | null };

export type ScopeOfWorkQueryVariables = Exact<{
  docId: Scalars['PHID']['input'];
}>;


export type ScopeOfWorkQuery = { __typename?: 'Query', ScopeOfWork?: { __typename?: 'ScopeOfWorkQueries', getDocument?: { __typename?: 'ScopeOfWork', id: string, state: { __typename?: 'ScopeOfWork_ScopeOfWorkState', description: string, status: ScopeOfWork_ScopeOfWorkStatus, title: string, roadmaps: Array<{ __typename?: 'ScopeOfWork_Roadmap', slug: string, title: string, milestones: Array<{ __typename?: 'ScopeOfWork_Milestone', description: string, budget?: number | null, title: string, sequenceCode: string, id: any }> }>, contributors: Array<{ __typename?: 'ScopeOfWork_Agent', agentType: ScopeOfWork_AgentType, code?: string | null, id: string, name: string }>, deliverables: Array<{ __typename?: 'ScopeOfWork_Deliverable', code: string, description: string, id: any, owner?: string | null, status: ScopeOfWork_DeliverableStatus, title: string, budgetAnchor?: { __typename?: 'ScopeOfWork_BudgetAnchorProject', margin: number, project?: any | null, quantity: number, unit?: ScopeOfWork_Unit | null, unitCost: number } | null, keyResults: Array<{ __typename?: 'ScopeOfWork_KeyResult', id: any, link: string, title: string }> }>, projects: Array<{ __typename?: 'ScopeOfWork_Project', abstract?: string | null, budget?: number | null, budgetType?: ScopeOfWork_BudgetType | null, code: string, currency?: ScopeOfWork_PmCurrency | null, id: any, imageUrl?: any | null, projectOwner?: string | null, title: string, expenditure?: { __typename?: 'ScopeOfWork_BudgetExpenditure', actuals: number, cap: number, percentage: number } | null, scope?: { __typename?: 'ScopeOfWork_DeliverablesSet', status: ScopeOfWork_DeliverableSetStatus, deliverables: Array<any>, deliverablesCompleted: { __typename?: 'ScopeOfWork_DeliverablesCompleted', completed: number, total: number } } | null }> } } | null } | null };



export const NetworkProfileDocument = `
    query NetworkProfile($docId: PHID!) {
  NetworkProfile {
    getDocument(docId: $docId) {
      state {
        category
        description
        discord
        github
        icon
        logo
        logoBig
        name
        website
        x
        youtube
      }
    }
  }
}
    `;

export const useNetworkProfileQuery = <
      TData = NetworkProfileQuery,
      TError = unknown
    >(
      variables: NetworkProfileQueryVariables,
      options?: Omit<UseQueryOptions<NetworkProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<NetworkProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<NetworkProfileQuery, TError, TData>(
      {
    queryKey: ['NetworkProfile', variables],
    queryFn: switchboardFetcher<NetworkProfileQuery, NetworkProfileQueryVariables>(NetworkProfileDocument, variables),
    ...options
  }
    )};

useNetworkProfileQuery.getKey = (variables: NetworkProfileQueryVariables) => ['NetworkProfile', variables];

export const useSuspenseNetworkProfileQuery = <
      TData = NetworkProfileQuery,
      TError = unknown
    >(
      variables: NetworkProfileQueryVariables,
      options?: Omit<UseSuspenseQueryOptions<NetworkProfileQuery, TError, TData>, 'queryKey'> & { queryKey?: UseSuspenseQueryOptions<NetworkProfileQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useSuspenseQuery<NetworkProfileQuery, TError, TData>(
      {
    queryKey: ['NetworkProfileSuspense', variables],
    queryFn: switchboardFetcher<NetworkProfileQuery, NetworkProfileQueryVariables>(NetworkProfileDocument, variables),
    ...options
  }
    )};

useSuspenseNetworkProfileQuery.getKey = (variables: NetworkProfileQueryVariables) => ['NetworkProfileSuspense', variables];


useNetworkProfileQuery.fetcher = (variables: NetworkProfileQueryVariables, options?: RequestInit['headers']) => switchboardFetcher<NetworkProfileQuery, NetworkProfileQueryVariables>(NetworkProfileDocument, variables, options);

export const ScopeOfWorkDocument = `
    query ScopeOfWork($docId: PHID!) {
  ScopeOfWork {
    getDocument(docId: $docId) {
      id
      state {
        roadmaps {
          slug
          title
          milestones {
            description
            budget
            title
            sequenceCode
            id
          }
        }
        contributors {
          agentType
          code
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
