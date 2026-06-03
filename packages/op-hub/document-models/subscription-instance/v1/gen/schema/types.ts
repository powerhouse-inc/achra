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

export type AccrualCycle =
  | "ANNUAL"
  | "DAILY"
  | "HOURLY"
  | "MONTHLY"
  | "QUARTERLY"
  | "SEMI_ANNUAL"
  | "WEEKLY";

export type AccrueMetricUsageInput = {
  accrualDate: Scalars["DateTime"]["input"];
  metricId: Scalars["OID"]["input"];
  newSliceIds: Array<Scalars["OID"]["input"]>;
  serviceId: Scalars["OID"]["input"];
};

export type ActivateSliceIdMappingInput = {
  sliceId: Scalars["OID"]["input"];
  sourceId: Scalars["OID"]["input"];
  sourceName?: InputMaybe<Scalars["String"]["input"]>;
};

export type ActivateSubscriptionInput = {
  activatedSince: Scalars["DateTime"]["input"];
  recurringSliceIds: Array<ActivateSliceIdMappingInput>;
  setupSliceIds: Array<ActivateSliceIdMappingInput>;
};

export type AddServiceFacetSelectionInput = {
  facetName: Scalars["String"]["input"];
  facetSelectionId: Scalars["OID"]["input"];
  selectedOption: Scalars["String"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type AddServiceGroupInput = {
  costType?: InputMaybe<GroupCostType>;
  effectiveDate: Scalars["DateTime"]["input"];
  groupId: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
  optional: Scalars["Boolean"]["input"];
  recurringAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  recurringBillingCycle?: InputMaybe<BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  recurringDiscount?: InputMaybe<DiscountServiceInfoInput>;
  recurringSliceId: Scalars["OID"]["input"];
  setupAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  setupCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  setupSliceId: Scalars["OID"]["input"];
};

export type AddServiceInput = {
  customValue?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  recurringAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  recurringBillingCycle?: InputMaybe<BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  recurringDiscount?: InputMaybe<DiscountServiceInfoInput>;
  recurringLastPaymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  serviceId: Scalars["OID"]["input"];
  setupAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  setupCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  setupPaymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type AddServiceMetricInput = {
  accrualCycle: AccrualCycle;
  currentUsage: Scalars["Int"]["input"];
  freeLimit?: InputMaybe<Scalars["Int"]["input"]>;
  lastAccrualDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  metricId: Scalars["OID"]["input"];
  metricType: MetricType;
  name: Scalars["String"]["input"];
  paidLimit?: InputMaybe<Scalars["Int"]["input"]>;
  serviceId: Scalars["OID"]["input"];
  unitCostAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  unitCostBillingCycle?: InputMaybe<BillingCycle>;
  unitCostCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  unitName: Scalars["String"]["input"];
};

export type AddServiceToGroupInput = {
  customValue?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  groupId: Scalars["OID"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  recurringAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  recurringBillingCycle?: InputMaybe<BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  recurringLastPaymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  serviceId: Scalars["OID"]["input"];
  setupAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  setupCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  setupPaymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type ApplyCreditInput = {
  amount: Scalars["Amount_Money"]["input"];
  creditDate: Scalars["DateTime"]["input"];
  /** When provided, allocates credit against a single specific debt line item; otherwise FIFO+priority across all collectible outstanding slices. */
  lineItemId?: InputMaybe<Scalars["OID"]["input"]>;
  reason: Scalars["String"]["input"];
};

export type BillingCycle =
  | "ANNUAL"
  | "MONTHLY"
  | "ONE_TIME"
  | "QUARTERLY"
  | "SEMI_ANNUAL";

export type CancelSubscriptionInput = {
  cancellationReason?: InputMaybe<Scalars["String"]["input"]>;
  cancelledSince: Scalars["DateTime"]["input"];
  refundSliceIds: Array<RenewSliceIdMappingInput>;
};

export type ChangePlanInput = {
  creditLineItemId: Scalars["OID"]["input"];
  debitLineItemId: Scalars["OID"]["input"];
  effectiveDate: Scalars["DateTime"]["input"];
  newBillingCycle?: InputMaybe<BillingCycle>;
  newTierCurrency: Scalars["Currency"]["input"];
  newTierName?: InputMaybe<Scalars["String"]["input"]>;
  newTierPrice: Scalars["Amount_Money"]["input"];
  newTierPricingOptionId: Scalars["OID"]["input"];
};

export type ConfirmLineItemPaymentInput = {
  amount: Scalars["Amount_Money"]["input"];
  lineItemId: Scalars["OID"]["input"];
  paymentDate: Scalars["DateTime"]["input"];
  paymentRef?: InputMaybe<Scalars["PHID"]["input"]>;
};

export type CustomerType = "INDIVIDUAL" | "TEAM";

export type DebtLineItem = {
  accrualPeriodStart: Maybe<Scalars["DateTime"]["output"]>;
  chargedAt: Scalars["DateTime"]["output"];
  creditApplied: Scalars["Amount_Money"]["output"];
  currency: Scalars["Currency"]["output"];
  debitAmount: Scalars["Amount_Money"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  frozen: Scalars["Boolean"]["output"];
  fullyPaidAt: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["OID"]["output"];
  invoiceRef: Maybe<Scalars["PHID"]["output"]>;
  invoiced: Scalars["Boolean"]["output"];
  invoicedAt: Maybe<Scalars["DateTime"]["output"]>;
  lastPaymentRef: Maybe<Scalars["PHID"]["output"]>;
  origin: DebtOriginType;
  settledAmount: Scalars["Amount_Money"]["output"];
  sourceGroupId: Maybe<Scalars["OID"]["output"]>;
  sourceMetricId: Maybe<Scalars["OID"]["output"]>;
  sourceServiceId: Maybe<Scalars["OID"]["output"]>;
  status: DebtLineItemStatus;
};

export type DebtLineItemStatus =
  | "CHARGED"
  | "FULLY_PAID"
  | "INVOICED"
  | "PARTIALLY_PAID";

export type DebtOriginType =
  | "DYNAMIC"
  | "ESTIMATED_USAGE"
  | "RECONCILIATION"
  | "SETUP"
  | "SUBSCRIPTION_FEE";

export type DecrementMetricUsageInput = {
  currentTime: Scalars["DateTime"]["input"];
  decrementBy: Scalars["Int"]["input"];
  metricId: Scalars["OID"]["input"];
  newSliceId: Scalars["OID"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type DiscountInfo = {
  discountType: DiscountType;
  discountValue: Scalars["Float"]["output"];
  originalAmount: Scalars["Amount_Money"]["output"];
  source: DiscountSource;
};

export type DiscountInfoInitInput = {
  discountType: DiscountType;
  discountValue: Scalars["Float"]["input"];
  originalAmount: Scalars["Amount_Money"]["input"];
  source: DiscountSource;
};

export type DiscountServiceInfoInput = {
  discountType: DiscountType;
  discountValue: Scalars["Float"]["input"];
  originalAmount: Scalars["Amount_Money"]["input"];
  source: DiscountSource;
};

export type DiscountSource = "BUNDLE" | "GROUP_INDEPENDENT" | "TIER_INHERITED";

export type DiscountType = "FLAT_AMOUNT" | "PERCENTAGE";

export type GenerateInvoiceInput = {
  advanceCycleIfDue?: InputMaybe<Scalars["Boolean"]["input"]>;
  generatedAt: Scalars["DateTime"]["input"];
  invoiceId: Scalars["PHID"]["input"];
  metricFreezeSliceIds: Array<SettleSliceIdMappingInput>;
  nextCycleRecurringSliceIds: Array<SettleSliceIdMappingInput>;
};

export type GroupCostType = "RECURRING" | "SETUP";

export type IncrementMetricUsageInput = {
  currentTime: Scalars["DateTime"]["input"];
  incrementBy: Scalars["Int"]["input"];
  metricId: Scalars["OID"]["input"];
  newSliceId: Scalars["OID"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type InitializeFacetSelectionInput = {
  facetName: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  selectedOption: Scalars["String"]["input"];
};

export type InitializeMetricInput = {
  accrualCycle: AccrualCycle;
  currentUsage: Scalars["Int"]["input"];
  freeLimit?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["OID"]["input"];
  lastAccrualDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  metricType: MetricType;
  name: Scalars["String"]["input"];
  paidLimit?: InputMaybe<Scalars["Int"]["input"]>;
  unitCostAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  unitCostBillingCycle?: InputMaybe<BillingCycle>;
  unitCostCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  unitName: Scalars["String"]["input"];
};

export type InitializeServiceGroupInput = {
  costType?: InputMaybe<GroupCostType>;
  id: Scalars["OID"]["input"];
  name: Scalars["String"]["input"];
  optional: Scalars["Boolean"]["input"];
  recurringAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  recurringBillingCycle?: InputMaybe<BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  recurringDiscount?: InputMaybe<DiscountInfoInitInput>;
  services?: InputMaybe<Array<InitializeServiceInput>>;
  setupAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  setupCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
};

export type InitializeServiceInput = {
  customValue?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  facetSelections?: InputMaybe<Array<InitializeFacetSelectionInput>>;
  id: Scalars["OID"]["input"];
  metrics?: InputMaybe<Array<InitializeMetricInput>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  recurringAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  recurringBillingCycle?: InputMaybe<BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  recurringDiscount?: InputMaybe<DiscountInfoInitInput>;
  setupAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  setupCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
};

export type InitializeSubscriptionInput = {
  autoRenew?: InputMaybe<Scalars["Boolean"]["input"]>;
  createdAt: Scalars["DateTime"]["input"];
  customerEmail?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  customerId?: InputMaybe<Scalars["PHID"]["input"]>;
  customerName?: InputMaybe<Scalars["String"]["input"]>;
  globalCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  resourceId?: InputMaybe<Scalars["PHID"]["input"]>;
  resourceLabel?: InputMaybe<Scalars["String"]["input"]>;
  resourceThumbnailUrl?: InputMaybe<Scalars["URL"]["input"]>;
  selectedBillingCycle?: InputMaybe<BillingCycle>;
  serviceGroups?: InputMaybe<Array<InitializeServiceGroupInput>>;
  serviceOfferingId?: InputMaybe<Scalars["PHID"]["input"]>;
  services?: InputMaybe<Array<InitializeServiceInput>>;
  tierCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  tierName?: InputMaybe<Scalars["String"]["input"]>;
  tierPrice?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  tierPricingMode?: InputMaybe<TierPricingMode>;
  tierPricingOptionId?: InputMaybe<Scalars["OID"]["input"]>;
};

export type MarkLineItemInvoicedInput = {
  invoiceRef?: InputMaybe<Scalars["PHID"]["input"]>;
  invoicedAt: Scalars["DateTime"]["input"];
  lineItemId: Scalars["OID"]["input"];
};

export type MetricType = "CUMULATIVE" | "NON_CUMULATIVE";

export type PauseSubscriptionInput = {
  pausedSince: Scalars["DateTime"]["input"];
};

export type RecurringCost = {
  amount: Scalars["Amount_Money"]["output"];
  billingCycle: BillingCycle;
  currency: Scalars["Currency"]["output"];
  discount: Maybe<DiscountInfo>;
  lastPaymentDate: Maybe<Scalars["DateTime"]["output"]>;
};

export type RemoveServiceFacetSelectionInput = {
  facetSelectionId: Scalars["OID"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type RemoveServiceFromGroupInput = {
  groupId: Scalars["OID"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type RemoveServiceGroupInput = {
  creditSliceId: Scalars["OID"]["input"];
  effectiveDate: Scalars["DateTime"]["input"];
  groupId: Scalars["OID"]["input"];
};

export type RemoveServiceInput = {
  serviceId: Scalars["OID"]["input"];
};

export type RemoveServiceMetricInput = {
  metricId: Scalars["OID"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type RenewExpiringSubscriptionInput = {
  recurringSliceIds: Array<RenewSliceIdMappingInput>;
  timestamp: Scalars["DateTime"]["input"];
};

export type RenewSliceIdMappingInput = {
  sliceId: Scalars["OID"]["input"];
  sourceId: Scalars["OID"]["input"];
  sourceName?: InputMaybe<Scalars["String"]["input"]>;
};

export type ReportOveragePaymentInput = {
  amount: Scalars["Amount_Money"]["input"];
  paymentDate: Scalars["DateTime"]["input"];
};

export type ReportPaymentInput = {
  amount: Scalars["Amount_Money"]["input"];
  paymentDate: Scalars["DateTime"]["input"];
  paymentRef?: InputMaybe<Scalars["PHID"]["input"]>;
};

export type ReportRecurringPaymentInput = {
  paymentDate: Scalars["DateTime"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type ReportSetupPaymentInput = {
  paymentDate: Scalars["DateTime"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type ResourceDocument = {
  id: Scalars["PHID"]["output"];
  label: Maybe<Scalars["String"]["output"]>;
  thumbnailUrl: Maybe<Scalars["URL"]["output"]>;
};

export type ResumeSubscriptionInput = {
  timestamp: Scalars["DateTime"]["input"];
};

export type Service = {
  customValue: Maybe<Scalars["String"]["output"]>;
  description: Maybe<Scalars["String"]["output"]>;
  facetSelections: Array<ServiceFacetSelection>;
  id: Scalars["OID"]["output"];
  metrics: Array<ServiceMetric>;
  name: Maybe<Scalars["String"]["output"]>;
  recurringCost: Maybe<RecurringCost>;
  setupCost: Maybe<SetupCost>;
};

export type ServiceFacetSelection = {
  facetName: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  selectedOption: Scalars["String"]["output"];
};

export type ServiceGroup = {
  costType: Maybe<GroupCostType>;
  id: Scalars["OID"]["output"];
  name: Scalars["String"]["output"];
  optional: Scalars["Boolean"]["output"];
  recurringCost: Maybe<RecurringCost>;
  services: Array<Service>;
  setupCost: Maybe<SetupCost>;
};

export type ServiceMetric = {
  accrualCycle: AccrualCycle;
  currentUsage: Scalars["Int"]["output"];
  freeLimit: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["OID"]["output"];
  lastAccrualDate: Maybe<Scalars["DateTime"]["output"]>;
  metricType: MetricType;
  name: Scalars["String"]["output"];
  paidLimit: Maybe<Scalars["Int"]["output"]>;
  unitCost: Maybe<RecurringCost>;
  unitName: Scalars["String"]["output"];
};

export type SetAutoRenewInput = {
  autoRenew: Scalars["Boolean"]["input"];
};

export type SetCustomerTypeInput = {
  customerType: CustomerType;
  teamMemberCount?: InputMaybe<Scalars["Int"]["input"]>;
};

export type SetExpiringInput = {
  expiringSince: Scalars["DateTime"]["input"];
};

export type SetOperatorNotesInput = {
  operatorNotes?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetResourceDocumentInput = {
  resourceId: Scalars["PHID"]["input"];
  resourceLabel?: InputMaybe<Scalars["String"]["input"]>;
  resourceThumbnailUrl?: InputMaybe<Scalars["URL"]["input"]>;
};

export type SettleSliceIdMappingInput = {
  sliceId: Scalars["OID"]["input"];
  sourceId: Scalars["OID"]["input"];
  sourceName?: InputMaybe<Scalars["String"]["input"]>;
};

export type SetupCost = {
  amount: Scalars["Amount_Money"]["output"];
  currency: Scalars["Currency"]["output"];
  paymentDate: Maybe<Scalars["DateTime"]["output"]>;
};

export type SubscriptionInstanceState = {
  activatedSince: Maybe<Scalars["DateTime"]["output"]>;
  autoRenew: Scalars["Boolean"]["output"];
  cancellationReason: Maybe<Scalars["String"]["output"]>;
  cancelledSince: Maybe<Scalars["DateTime"]["output"]>;
  createdAt: Maybe<Scalars["DateTime"]["output"]>;
  currentBillingCycleStart: Maybe<Scalars["DateTime"]["output"]>;
  currentCycleOverage: Maybe<Scalars["Amount_Money"]["output"]>;
  customerEmail: Maybe<Scalars["EmailAddress"]["output"]>;
  customerId: Maybe<Scalars["PHID"]["output"]>;
  customerName: Maybe<Scalars["String"]["output"]>;
  customerType: Maybe<CustomerType>;
  debtLineItems: Array<DebtLineItem>;
  expiringSince: Maybe<Scalars["DateTime"]["output"]>;
  globalCurrency: Maybe<Scalars["Currency"]["output"]>;
  nextBillingDate: Maybe<Scalars["DateTime"]["output"]>;
  operatorId: Maybe<Scalars["PHID"]["output"]>;
  operatorNotes: Maybe<Scalars["String"]["output"]>;
  pausedSince: Maybe<Scalars["DateTime"]["output"]>;
  resource: Maybe<ResourceDocument>;
  selectedBillingCycle: Maybe<BillingCycle>;
  serviceGroups: Array<ServiceGroup>;
  serviceOfferingId: Maybe<Scalars["PHID"]["output"]>;
  services: Array<Service>;
  status: SubscriptionStatus;
  teamMemberCount: Maybe<Scalars["Int"]["output"]>;
  tierCurrency: Maybe<Scalars["Currency"]["output"]>;
  tierName: Maybe<Scalars["String"]["output"]>;
  tierPrice: Maybe<Scalars["Amount_Money"]["output"]>;
  tierPricingMode: Maybe<TierPricingMode>;
  tierPricingOptionId: Maybe<Scalars["OID"]["output"]>;
  totalCredit: Maybe<Scalars["Amount_Money"]["output"]>;
  totalDebt: Maybe<Scalars["Amount_Money"]["output"]>;
};

export type SubscriptionStatus =
  | "ACTIVE"
  | "CANCELLED"
  | "EXPIRING"
  | "PAUSED"
  | "PENDING";

export type TierPricingMode = "CALCULATED" | "MANUAL_OVERRIDE";

export type UpdateCustomerInfoInput = {
  customerEmail?: InputMaybe<Scalars["EmailAddress"]["input"]>;
  customerId?: InputMaybe<Scalars["PHID"]["input"]>;
  customerName?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateMetricInput = {
  accrualCycle?: InputMaybe<AccrualCycle>;
  freeLimit?: InputMaybe<Scalars["Int"]["input"]>;
  lastAccrualDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  metricId: Scalars["OID"]["input"];
  metricType?: InputMaybe<MetricType>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  paidLimit?: InputMaybe<Scalars["Int"]["input"]>;
  serviceId: Scalars["OID"]["input"];
  unitName?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateMetricUsageInput = {
  currentTime: Scalars["DateTime"]["input"];
  currentUsage: Scalars["Int"]["input"];
  isAdjustment?: InputMaybe<Scalars["Boolean"]["input"]>;
  metricId: Scalars["OID"]["input"];
  newSliceId: Scalars["OID"]["input"];
  serviceId: Scalars["OID"]["input"];
};

export type UpdateServiceGroupCostInput = {
  groupId: Scalars["OID"]["input"];
  recurringAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  recurringBillingCycle?: InputMaybe<BillingCycle>;
  recurringCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  setupAmount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  setupCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
};

export type UpdateServiceInfoInput = {
  customValue?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  serviceId: Scalars["OID"]["input"];
};

export type UpdateServiceRecurringCostInput = {
  amount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  billingCycle?: InputMaybe<BillingCycle>;
  currency?: InputMaybe<Scalars["Currency"]["input"]>;
  lastPaymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  nextBillingDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  serviceId: Scalars["OID"]["input"];
};

export type UpdateServiceSetupCostInput = {
  amount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  currency?: InputMaybe<Scalars["Currency"]["input"]>;
  paymentDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  serviceId: Scalars["OID"]["input"];
};

export type UpdateTeamMemberCountInput = {
  teamMemberCount: Scalars["Int"]["input"];
};

export type UpdateTierInfoInput = {
  tierCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
  tierName?: InputMaybe<Scalars["String"]["input"]>;
  tierPrice?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  tierPricingMode?: InputMaybe<TierPricingMode>;
  tierPricingOptionId?: InputMaybe<Scalars["OID"]["input"]>;
};
