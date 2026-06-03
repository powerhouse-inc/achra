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

export type AddAlternativeProposalInput = {
  id: Scalars["OID"]["input"];
  paymentTermsId?: InputMaybe<Scalars["PHID"]["input"]>;
  proposalAuthor?: InputMaybe<ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars["PHID"]["input"]>;
  status?: InputMaybe<ProposalStatus>;
};

export type AddPaymentRequestInput = {
  id: Scalars["PHID"]["input"];
};

export type ClientInfo = {
  icon: Maybe<Scalars["URL"]["output"]>;
  id: Scalars["PHID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
};

export type EditAlternativeProposalInput = {
  id: Scalars["OID"]["input"];
  paymentTermsId?: InputMaybe<Scalars["PHID"]["input"]>;
  proposalAuthor?: InputMaybe<ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars["PHID"]["input"]>;
  status?: InputMaybe<ProposalStatus>;
};

export type EditClientInfoInput = {
  clientId: Scalars["PHID"]["input"];
  icon?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type EditInitialProposalInput = {
  id: Scalars["OID"]["input"];
  paymentTermsId?: InputMaybe<Scalars["PHID"]["input"]>;
  proposalAuthor?: InputMaybe<ProposalAuthorInput>;
  sowId?: InputMaybe<Scalars["PHID"]["input"]>;
  status?: InputMaybe<ProposalStatus>;
};

export type EditWorkstreamInput = {
  code?: InputMaybe<Scalars["String"]["input"]>;
  paymentTerms?: InputMaybe<Scalars["PHID"]["input"]>;
  sowId?: InputMaybe<Scalars["PHID"]["input"]>;
  status?: InputMaybe<WorkstreamStatus>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Proposal = {
  author: ProposalAuthor;
  id: Scalars["OID"]["output"];
  paymentTerms: Scalars["PHID"]["output"];
  sow: Scalars["PHID"]["output"];
  status: ProposalStatus;
};

export type ProposalAuthor = {
  icon: Maybe<Scalars["URL"]["output"]>;
  id: Scalars["PHID"]["output"];
  name: Maybe<Scalars["String"]["output"]>;
};

export type ProposalAuthorInput = {
  icon?: InputMaybe<Scalars["URL"]["input"]>;
  id: Scalars["PHID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type ProposalStatus = "ACCEPTED" | "DRAFT" | "REJECTED" | "SUBMITTED";

export type Rfp = {
  id: Scalars["PHID"]["output"];
  title: Scalars["String"]["output"];
};

export type RemoveAlternativeProposalInput = {
  id: Scalars["OID"]["input"];
};

export type RemovePaymentRequestInput = {
  id: Scalars["PHID"]["input"];
};

export type SetRequestForProposalInput = {
  rfpId: Scalars["PHID"]["input"];
  title: Scalars["String"]["input"];
};

export type WorkstreamState = {
  alternativeProposals: Array<Proposal>;
  client: Maybe<ClientInfo>;
  code: Maybe<Scalars["String"]["output"]>;
  initialProposal: Maybe<Proposal>;
  paymentRequests: Array<Scalars["PHID"]["output"]>;
  paymentTerms: Maybe<Scalars["PHID"]["output"]>;
  rfp: Maybe<Rfp>;
  sow: Maybe<Scalars["PHID"]["output"]>;
  status: WorkstreamStatus;
  title: Maybe<Scalars["String"]["output"]>;
};

export type WorkstreamStatus =
  | "AWARDED"
  | "FINISHED"
  | "IN_PROGRESS"
  | "NOT_AWARDED"
  | "OPEN_FOR_PROPOSALS"
  | "PREWORK_RFC"
  | "PROPOSAL_SUBMITTED"
  | "RFP_CANCELLED"
  | "RFP_DRAFT";
