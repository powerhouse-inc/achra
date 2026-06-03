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

export type ActivateInstanceInput = {
  activatedAt: Scalars["DateTime"]["input"];
};

export type ApplyConfigurationChangesInput = {
  addFacets?: InputMaybe<Array<SetInstanceFacetInput>>;
  appliedAt: Scalars["DateTime"]["input"];
  changeDescription?: InputMaybe<Scalars["String"]["input"]>;
  removeFacetKeys?: InputMaybe<Array<Scalars["String"]["input"]>>;
  updateFacets?: InputMaybe<Array<UpdateInstanceFacetInput>>;
};

export type ConfirmInstanceInput = {
  confirmedAt: Scalars["DateTime"]["input"];
};

export type InitializeInstanceInput = {
  customerId?: InputMaybe<Scalars["PHID"]["input"]>;
  customerName?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  infoLink?: InputMaybe<Scalars["URL"]["input"]>;
  operatorDocumentType: Scalars["String"]["input"];
  operatorId: Scalars["PHID"]["input"];
  operatorName?: InputMaybe<Scalars["String"]["input"]>;
  resourceTemplateId?: InputMaybe<Scalars["PHID"]["input"]>;
  templateName?: InputMaybe<Scalars["String"]["input"]>;
  thumbnailUrl?: InputMaybe<Scalars["URL"]["input"]>;
};

export type InstanceFacet = {
  categoryKey: Scalars["String"]["output"];
  categoryLabel: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  selectedOption: Scalars["String"]["output"];
};

export type InstanceStatus =
  | "ACTIVE"
  | "DRAFT"
  | "PROVISIONING"
  | "SUSPENDED"
  | "TERMINATED";

export type OperatorProfile = {
  id: Scalars["PHID"]["output"];
  operatorName: Maybe<Scalars["String"]["output"]>;
};

export type RemoveInstanceFacetInput = {
  categoryKey: Scalars["String"]["input"];
};

export type ReportProvisioningCompletedInput = {
  completedAt: Scalars["DateTime"]["input"];
};

export type ReportProvisioningFailedInput = {
  failedAt: Scalars["DateTime"]["input"];
  failureReason: Scalars["String"]["input"];
};

export type ReportProvisioningStartedInput = {
  startedAt: Scalars["DateTime"]["input"];
};

export type ResourceInstanceState = {
  activatedAt: Maybe<Scalars["DateTime"]["output"]>;
  configuration: Array<InstanceFacet>;
  confirmedAt: Maybe<Scalars["DateTime"]["output"]>;
  customerId: Maybe<Scalars["PHID"]["output"]>;
  customerName: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  infoLink: Maybe<Scalars["URL"]["output"]>;
  operatorProfile: Maybe<OperatorProfile>;
  provisioningCompletedAt: Maybe<Scalars["DateTime"]["output"]>;
  provisioningFailureReason: Maybe<Scalars["String"]["output"]>;
  provisioningStartedAt: Maybe<Scalars["DateTime"]["output"]>;
  resourceTemplateId: Maybe<Scalars["PHID"]["output"]>;
  resumedAt: Maybe<Scalars["DateTime"]["output"]>;
  status: InstanceStatus;
  suspendedAt: Maybe<Scalars["DateTime"]["output"]>;
  suspensionDetails: Maybe<Scalars["String"]["output"]>;
  suspensionReason: Maybe<Scalars["String"]["output"]>;
  suspensionType: Maybe<SuspensionType>;
  templateName: Maybe<Scalars["String"]["output"]>;
  terminatedAt: Maybe<Scalars["DateTime"]["output"]>;
  terminationReason: Maybe<Scalars["String"]["output"]>;
  thumbnailUrl: Maybe<Scalars["URL"]["output"]>;
};

export type ResumeAfterMaintenanceInput = {
  resumedAt: Scalars["DateTime"]["input"];
};

export type ResumeAfterPaymentInput = {
  paymentReference?: InputMaybe<Scalars["String"]["input"]>;
  resumedAt: Scalars["DateTime"]["input"];
};

export type SetInstanceFacetInput = {
  categoryKey: Scalars["String"]["input"];
  categoryLabel: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  selectedOption: Scalars["String"]["input"];
};

export type SetOperatorProfileInput = {
  operatorId: Scalars["PHID"]["input"];
  operatorName?: InputMaybe<Scalars["String"]["input"]>;
};

export type SuspendForMaintenanceInput = {
  estimatedDuration?: InputMaybe<Scalars["String"]["input"]>;
  maintenanceType?: InputMaybe<Scalars["String"]["input"]>;
  suspendedAt: Scalars["DateTime"]["input"];
};

export type SuspendForNonPaymentInput = {
  daysPastDue?: InputMaybe<Scalars["Int"]["input"]>;
  outstandingAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  suspendedAt: Scalars["DateTime"]["input"];
};

export type SuspendInstanceInput = {
  reason?: InputMaybe<Scalars["String"]["input"]>;
  suspendedAt: Scalars["DateTime"]["input"];
};

export type SuspensionType = "MAINTENANCE" | "NON_PAYMENT" | "OTHER";

export type TerminateInstanceInput = {
  reason: Scalars["String"]["input"];
  terminatedAt: Scalars["DateTime"]["input"];
};

export type UpdateInstanceFacetInput = {
  categoryKey: Scalars["String"]["input"];
  categoryLabel?: InputMaybe<Scalars["String"]["input"]>;
  selectedOption?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateInstanceInfoInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  infoLink?: InputMaybe<Scalars["URL"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  thumbnailUrl?: InputMaybe<Scalars["URL"]["input"]>;
};

export type UpdateInstanceStatusInput = {
  status: InstanceStatus;
};
