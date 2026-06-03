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

export type AddBonusClauseInput = {
  bonusAmount: Scalars["Amount"]["input"];
  comment?: InputMaybe<Scalars["String"]["input"]>;
  condition: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
};

export type AddMilestoneInput = {
  amount: Scalars["Amount"]["input"];
  expectedCompletionDate?: InputMaybe<Scalars["Date"]["input"]>;
  id: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
  requiresApproval: Scalars["Boolean"]["input"];
};

export type AddPenaltyClauseInput = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  condition: Scalars["String"]["input"];
  deductionAmount: Scalars["Amount"]["input"];
  id: Scalars["OID"]["input"];
};

export type BillingFrequency = "BIWEEKLY" | "MONTHLY" | "WEEKLY";

export type BonusClause = {
  bonusAmount: Scalars["Amount"]["output"];
  comment: Maybe<Scalars["String"]["output"]>;
  condition: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
};

export type CostAndMaterials = {
  billingFrequency: BillingFrequency;
  hourlyRate: Maybe<Scalars["Amount"]["output"]>;
  timesheetRequired: Scalars["Boolean"]["output"];
  variableCap: Maybe<Scalars["Amount"]["output"]>;
};

export type DeleteBonusClauseInput = {
  id: Scalars["OID"]["input"];
};

export type DeleteMilestoneInput = {
  id: Scalars["OID"]["input"];
};

export type DeletePenaltyClauseInput = {
  id: Scalars["OID"]["input"];
};

export type Escrow = {
  amountHeld: Scalars["Amount"]["output"];
  escrowProvider: Maybe<Scalars["String"]["output"]>;
  proofOfFundsDocumentId: Maybe<Scalars["String"]["output"]>;
  releaseConditions: Scalars["String"]["output"];
};

export type EvaluationFrequency = "MONTHLY" | "PER_MILESTONE" | "WEEKLY";

export type EvaluationTerms = {
  commentsVisibleToClient: Scalars["Boolean"]["output"];
  criteria: Array<Scalars["String"]["output"]>;
  evaluationFrequency: EvaluationFrequency;
  evaluatorTeam: Scalars["String"]["output"];
  impactsPayout: Scalars["Boolean"]["output"];
  impactsReputation: Scalars["Boolean"]["output"];
};

export type Milestone = {
  amount: Scalars["Amount"]["output"];
  expectedCompletionDate: Maybe<Scalars["Date"]["output"]>;
  id: Scalars["OID"]["output"];
  name: Scalars["String"]["output"];
  payoutStatus: MilestonePayoutStatus;
  requiresApproval: Scalars["Boolean"]["output"];
};

export type MilestonePayoutStatus =
  | "APPROVED"
  | "PAID"
  | "PENDING"
  | "READY_FOR_REVIEW"
  | "REJECTED";

export type PaymentCurrency = "EUR" | "GBP" | "USD";

export type PaymentModel = "COST_AND_MATERIALS" | "MILESTONE" | "RETAINER";

export type PaymentTermsState = {
  bonusClauses: Array<BonusClause>;
  costAndMaterials: Maybe<CostAndMaterials>;
  currency: PaymentCurrency;
  escrowDetails: Maybe<Escrow>;
  evaluation: Maybe<EvaluationTerms>;
  milestoneSchedule: Array<Milestone>;
  payer: Scalars["String"]["output"];
  paymentModel: PaymentModel;
  penaltyClauses: Array<PenaltyClause>;
  proposer: Scalars["String"]["output"];
  retainerDetails: Maybe<Retainer>;
  status: PaymentTermsStatus;
  totalAmount: Maybe<Scalars["Amount"]["output"]>;
};

export type PaymentTermsStatus =
  | "ACCEPTED"
  | "CANCELLED"
  | "DRAFT"
  | "SUBMITTED";

export type PenaltyClause = {
  comment: Maybe<Scalars["String"]["output"]>;
  condition: Scalars["String"]["output"];
  deductionAmount: Scalars["Amount"]["output"];
  id: Scalars["OID"]["output"];
};

export type ReorderMilestonesInput = {
  order: Array<Scalars["OID"]["input"]>;
};

export type Retainer = {
  autoRenew: Scalars["Boolean"]["output"];
  billingFrequency: BillingFrequency;
  endDate: Maybe<Scalars["Date"]["output"]>;
  retainerAmount: Scalars["Amount"]["output"];
  servicesIncluded: Scalars["String"]["output"];
  startDate: Scalars["Date"]["output"];
};

export type SetBasicTermsInput = {
  currency: PaymentCurrency;
  payer: Scalars["String"]["input"];
  paymentModel: PaymentModel;
  proposer: Scalars["String"]["input"];
  totalAmount?: InputMaybe<Scalars["Amount"]["input"]>;
};

export type SetCostAndMaterialsInput = {
  billingFrequency: BillingFrequency;
  hourlyRate?: InputMaybe<Scalars["Amount"]["input"]>;
  timesheetRequired: Scalars["Boolean"]["input"];
  variableCap?: InputMaybe<Scalars["Amount"]["input"]>;
};

export type SetEscrowDetailsInput = {
  amountHeld: Scalars["Amount"]["input"];
  escrowProvider?: InputMaybe<Scalars["String"]["input"]>;
  proofOfFundsDocumentId?: InputMaybe<Scalars["String"]["input"]>;
  releaseConditions: Scalars["String"]["input"];
};

export type SetEvaluationTermsInput = {
  commentsVisibleToClient: Scalars["Boolean"]["input"];
  criteria: Array<Scalars["String"]["input"]>;
  evaluationFrequency: EvaluationFrequency;
  evaluatorTeam: Scalars["String"]["input"];
  impactsPayout: Scalars["Boolean"]["input"];
  impactsReputation: Scalars["Boolean"]["input"];
};

export type SetRetainerDetailsInput = {
  autoRenew: Scalars["Boolean"]["input"];
  billingFrequency: BillingFrequency;
  endDate?: InputMaybe<Scalars["Date"]["input"]>;
  retainerAmount: Scalars["Amount"]["input"];
  servicesIncluded: Scalars["String"]["input"];
  startDate: Scalars["Date"]["input"];
};

export type UpdateBonusClauseInput = {
  bonusAmount?: InputMaybe<Scalars["Amount"]["input"]>;
  comment?: InputMaybe<Scalars["String"]["input"]>;
  condition?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
};

export type UpdateMilestoneInput = {
  amount?: InputMaybe<Scalars["Amount"]["input"]>;
  expectedCompletionDate?: InputMaybe<Scalars["Date"]["input"]>;
  id: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  requiresApproval?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UpdateMilestoneStatusInput = {
  id: Scalars["OID"]["input"];
  payoutStatus: MilestonePayoutStatus;
};

export type UpdatePenaltyClauseInput = {
  comment?: InputMaybe<Scalars["String"]["input"]>;
  condition?: InputMaybe<Scalars["String"]["input"]>;
  deductionAmount?: InputMaybe<Scalars["Amount"]["input"]>;
  id: Scalars["OID"]["input"];
};

export type UpdateStatusInput = {
  status: PaymentTermsStatus;
};
