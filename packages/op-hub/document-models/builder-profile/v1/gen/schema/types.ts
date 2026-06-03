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

export type AddContributorInput = {
  contributorPHID: Scalars["PHID"]["input"];
};

export type AddLinkInput = {
  id: Scalars["OID"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  url: Scalars["URL"]["input"];
};

export type AddScopeInput = {
  scope?: InputMaybe<BuilderScopeInput>;
};

export type AddSkillInput = {
  skill?: InputMaybe<BuilderSkillInput>;
};

export type BuilderLink = {
  id: Scalars["OID"]["output"];
  label: Maybe<Scalars["String"]["output"]>;
  url: Scalars["URL"]["output"];
};

export type BuilderProfileState = {
  about: Maybe<Scalars["String"]["output"]>;
  code: Maybe<Scalars["String"]["output"]>;
  contributors: Array<Scalars["PHID"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  icon: Maybe<Scalars["URL"]["output"]>;
  id: Maybe<Scalars["PHID"]["output"]>;
  isOperator: Scalars["Boolean"]["output"];
  lastModified: Maybe<Scalars["DateTime"]["output"]>;
  links: Array<BuilderLink>;
  name: Maybe<Scalars["String"]["output"]>;
  operationalHubMember: OpHubMember;
  scopes: Array<BuilderScope>;
  skills: Array<BuilderSkill>;
  slug: Maybe<Scalars["String"]["output"]>;
  status: Maybe<BuilderStatus>;
  walletAddress: Maybe<Scalars["EthereumAddress"]["output"]>;
};

export type BuilderScope =
  | "ACC"
  | "GOVERNANCE_SCOPE"
  | "PROTOCOL_SCOPE"
  | "STA"
  | "STABILITY_SCOPE"
  | "SUP"
  | "SUPPORT_SCOPE";

export type BuilderScopeInput =
  | "ACC"
  | "GOVERNANCE_SCOPE"
  | "PROTOCOL_SCOPE"
  | "STA"
  | "STABILITY_SCOPE"
  | "SUP"
  | "SUPPORT_SCOPE";

export type BuilderSkill =
  | "BACKEND_DEVELOPMENT"
  | "DATA_ENGINEERING"
  | "DEVOPS_ENGINEERING"
  | "FRONTEND_DEVELOPMENT"
  | "FULL_STACK_DEVELOPMENT"
  | "QA_TESTING"
  | "SECURITY_ENGINEERING"
  | "SMART_CONTRACT_DEVELOPMENT"
  | "TECHNICAL_WRITING"
  | "UI_UX_DESIGN";

export type BuilderSkillInput =
  | "BACKEND_DEVELOPMENT"
  | "DATA_ENGINEERING"
  | "DEVOPS_ENGINEERING"
  | "FRONTEND_DEVELOPMENT"
  | "FULL_STACK_DEVELOPMENT"
  | "QA_TESTING"
  | "SECURITY_ENGINEERING"
  | "SMART_CONTRACT_DEVELOPMENT"
  | "TECHNICAL_WRITING"
  | "UI_UX_DESIGN";

export type BuilderStatus =
  | "ACTIVE"
  | "ARCHIVED"
  | "COMPLETED"
  | "INACTIVE"
  | "ON_HOLD";

export type BuilderStatusInput =
  | "ACTIVE"
  | "ARCHIVED"
  | "COMPLETED"
  | "INACTIVE"
  | "ON_HOLD";

export type EditLinkInput = {
  id: Scalars["OID"]["input"];
  label?: InputMaybe<Scalars["String"]["input"]>;
  url: Scalars["URL"]["input"];
};

export type OpHubMember = {
  name: Maybe<Scalars["String"]["output"]>;
  phid: Maybe<Scalars["PHID"]["output"]>;
};

export type RemoveContributorInput = {
  contributorPHID: Scalars["PHID"]["input"];
};

export type RemoveLinkInput = {
  id: Scalars["OID"]["input"];
};

export type RemoveScopeInput = {
  scope?: InputMaybe<BuilderScopeInput>;
};

export type RemoveSkillInput = {
  skill?: InputMaybe<BuilderSkillInput>;
};

export type SetOpHubMemberInput = {
  name?: InputMaybe<Scalars["String"]["input"]>;
  phid?: InputMaybe<Scalars["PHID"]["input"]>;
};

export type SetOperatorInput = {
  isOperator: Scalars["Boolean"]["input"];
};

export type SetWalletAddressInput = {
  walletAddress: Scalars["EthereumAddress"]["input"];
};

export type UpdateProfileInput = {
  about?: InputMaybe<Scalars["String"]["input"]>;
  code?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  icon?: InputMaybe<Scalars["URL"]["input"]>;
  id?: InputMaybe<Scalars["PHID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  slug?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<BuilderStatusInput>;
};
