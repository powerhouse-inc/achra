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

export type AddContextDocumentInput = {
  name: Scalars["String"]["input"];
  rfpId: Scalars["OID"]["input"];
  url: Scalars["URL"]["input"];
};

export type AddProposalInput = {
  budgetEstimate: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  paymentTerms: RfpPaymentTerm;
  proposalStatus: RfpProposalStatus;
  rfpId: Scalars["OID"]["input"];
  submittedby?: InputMaybe<Scalars["OID"]["input"]>;
  summary: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type BudgetRange = {
  currency: Maybe<Scalars["String"]["output"]>;
  max: Maybe<Scalars["Float"]["output"]>;
  min: Maybe<Scalars["Float"]["output"]>;
};

export type BudgetRangeInput = {
  currency?: InputMaybe<Scalars["String"]["input"]>;
  max?: InputMaybe<Scalars["Float"]["input"]>;
  min?: InputMaybe<Scalars["Float"]["input"]>;
};

export type ChangeProposalStatusInput = {
  proposalId: Scalars["OID"]["input"];
  status: RfpProposalStatus;
};

export type ContextDocument = {
  name: Scalars["String"]["output"];
  url: Scalars["URL"]["output"];
};

export type EditRfpInput = {
  briefing?: InputMaybe<Scalars["String"]["input"]>;
  budgetRange?: InputMaybe<BudgetRangeInput>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  deadline?: InputMaybe<Scalars["DateTime"]["input"]>;
  eligibilityCriteria?: InputMaybe<Scalars["String"]["input"]>;
  evaluationCriteria?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<RfpStatus>;
  summary?: InputMaybe<Scalars["String"]["input"]>;
  tags?: InputMaybe<Array<Scalars["String"]["input"]>>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type RfpCommentatorType = "EXTERNAL" | "INTERNAL";

export type RfpStatus =
  | "AWARDED"
  | "CANCELED"
  | "CLOSED"
  | "DRAFT"
  | "NOT_AWARDED"
  | "OPEN_FOR_PROPOSALS"
  | "REQUEST_FOR_COMMMENTS";

export type RemoveContextDocumentInput = {
  name: Scalars["String"]["input"];
  rfpId: Scalars["OID"]["input"];
};

export type RemoveProposalInput = {
  id: Scalars["OID"]["input"];
  rfpId: Scalars["OID"]["input"];
};

export type RequestForProposalsState = {
  briefing: Scalars["String"]["output"];
  budgetRange: BudgetRange;
  code: Maybe<Scalars["String"]["output"]>;
  contextDocuments: Array<ContextDocument>;
  deadline: Maybe<Scalars["DateTime"]["output"]>;
  eligibilityCriteria: Scalars["String"]["output"];
  evaluationCriteria: Scalars["String"]["output"];
  issuer: Scalars["String"]["output"];
  proposals: Array<RfpProposal>;
  rfpCommenter: Array<RfpCommenter>;
  status: RfpStatus;
  summary: Scalars["String"]["output"];
  tags: Maybe<Array<Scalars["String"]["output"]>>;
  title: Scalars["String"]["output"];
};

export type RfpAgentType = "AI" | "GROUP" | "HUMAN";

export type RfpCommenter = {
  agentType: RfpAgentType;
  code: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  imageUrl: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  rfpCommentatorType: RfpCommentatorType;
};

export type RfpPaymentTerm =
  | "ESCROW"
  | "MILESTONE_BASED_ADVANCE_PAYMENT"
  | "MILESTONE_BASED_FIXED_PRICE"
  | "RETAINER_BASED"
  | "VARIABLE_COST";

export type RfpProposal = {
  budgetEstimate: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  paymentTerms: RfpPaymentTerm;
  proposalStatus: RfpProposalStatus;
  submittedby: Maybe<Scalars["OID"]["output"]>;
  summary: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
};

export type RfpProposalStatus =
  | "APPROVED"
  | "CONDITIONALLY_APPROVED"
  | "NEEDS_REVISION"
  | "OPENED"
  | "REJECTED"
  | "REVISED"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "WITHDRAWN";
