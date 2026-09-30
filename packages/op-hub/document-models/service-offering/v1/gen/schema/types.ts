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
  AttachmentRef: {
    input: `attachment://v${number}:${string}`;
    output: `attachment://v${number}:${string}`;
  };
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

export type AddFacetOptionInput = {
  categoryKey: Scalars["String"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  optionId: Scalars["String"]["input"];
};

export type AddOnPricingMode = "STANDALONE" | "TIER_DEPENDENT";

export type AddOptionGroupInput = {
  availableBillingCycles?: InputMaybe<Array<BillingCycle>>;
  costType?: InputMaybe<GroupCostType>;
  currency?: InputMaybe<Scalars["Currency"]["input"]>;
  defaultSelected: Scalars["Boolean"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  isAddOn: Scalars["Boolean"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  name: Scalars["String"]["input"];
  price?: InputMaybe<Scalars["Amount_Money"]["input"]>;
};

export type AddOptionGroupTierPricingInput = {
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId: Scalars["OID"]["input"];
  recurringPricing: Array<RecurringPriceOptionInput>;
  setupCost?: InputMaybe<SetupCostInput>;
  setupCostDiscounts?: InputMaybe<Array<BillingCycleDiscountInput>>;
  tierId: Scalars["OID"]["input"];
  tierPricingId: Scalars["OID"]["input"];
};

export type AddServiceInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  displayOrder?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["OID"]["input"];
  isSetupFormation?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId?: InputMaybe<Scalars["OID"]["input"]>;
  title: Scalars["String"]["input"];
};

export type AddServiceLevelInput = {
  customValue?: InputMaybe<Scalars["String"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  level: ServiceLevel;
  optionGroupId?: InputMaybe<Scalars["OID"]["input"]>;
  serviceId: Scalars["OID"]["input"];
  serviceLevelId: Scalars["OID"]["input"];
  tierId: Scalars["OID"]["input"];
};

export type AddTierInput = {
  amount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  currency: Scalars["Currency"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  excludeFromSetupFee?: InputMaybe<Scalars["Boolean"]["input"]>;
  id: Scalars["OID"]["input"];
  isCustomPricing?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  name: Scalars["String"]["input"];
};

export type AddUsageLimitInput = {
  accrualCycle: AccrualCycle;
  freeLimit?: InputMaybe<Scalars["Int"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  limitId: Scalars["OID"]["input"];
  metric: Scalars["String"]["input"];
  metricType: MetricType;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  paidLimit?: InputMaybe<Scalars["Int"]["input"]>;
  serviceId: Scalars["OID"]["input"];
  tierId: Scalars["OID"]["input"];
  unitName?: InputMaybe<Scalars["String"]["input"]>;
  unitPrice?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  unitPriceCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
};

export type BillingCycle =
  | "ANNUAL"
  | "MONTHLY"
  | "ONE_TIME"
  | "QUARTERLY"
  | "SEMI_ANNUAL";

export type BillingCycleDiscount = {
  billingCycle: BillingCycle;
  discountRule: DiscountRule;
};

export type BillingCycleDiscountInput = {
  billingCycle: BillingCycle;
  discountRule: DiscountRuleInput;
};

export type ChangeResourceTemplateInput = {
  lastModified: Scalars["DateTime"]["input"];
  newTemplateId: Scalars["PHID"]["input"];
  previousTemplateId: Scalars["PHID"]["input"];
};

export type DeleteOptionGroupInput = {
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type DeleteServiceInput = {
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type DeleteTierInput = {
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type DiscountMode = "INDEPENDENT" | "INHERIT_TIER";

export type DiscountRule = {
  discountType: DiscountType;
  discountValue: Scalars["Float"]["output"];
};

export type DiscountRuleInput = {
  discountType: DiscountType;
  discountValue: Scalars["Float"]["input"];
};

export type DiscountType = "FLAT_AMOUNT" | "PERCENTAGE";

export type FacetTarget = {
  categoryKey: Scalars["String"]["output"];
  categoryLabel: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  selectedOptions: Array<Scalars["String"]["output"]>;
};

export type GroupCostType = "RECURRING" | "SETUP";

export type MetricType = "CUMULATIVE" | "NON_CUMULATIVE";

export type OptionGroup = {
  availableBillingCycles: Array<BillingCycle>;
  billingCycleDiscounts: Array<BillingCycleDiscount>;
  costType: Maybe<GroupCostType>;
  currency: Maybe<Scalars["Currency"]["output"]>;
  defaultSelected: Scalars["Boolean"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  discountMode: Maybe<DiscountMode>;
  id: Scalars["OID"]["output"];
  isAddOn: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  price: Maybe<Scalars["Amount_Money"]["output"]>;
  pricingMode: Maybe<AddOnPricingMode>;
  standalonePricing: Maybe<StandalonePricing>;
  tierDependentPricing: Maybe<Array<OptionGroupTierPricing>>;
};

export type OptionGroupTierPricing = {
  id: Scalars["OID"]["output"];
  recurringPricing: Array<RecurringPriceOption>;
  setupCost: Maybe<SetupCost>;
  setupCostDiscounts: Array<BillingCycleDiscount>;
  tierId: Scalars["OID"]["output"];
};

export type RecurringPriceOption = {
  amount: Scalars["Amount_Money"]["output"];
  billingCycle: BillingCycle;
  currency: Scalars["Currency"]["output"];
  discount: Maybe<DiscountRule>;
  id: Scalars["OID"]["output"];
};

export type RecurringPriceOptionInput = {
  amount: Scalars["Amount_Money"]["input"];
  billingCycle: BillingCycle;
  currency: Scalars["Currency"]["input"];
  discount?: InputMaybe<DiscountRuleInput>;
  id: Scalars["OID"]["input"];
};

export type RemoveFacetOptionInput = {
  categoryKey: Scalars["String"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  optionId: Scalars["String"]["input"];
};

export type RemoveFacetTargetInput = {
  categoryKey: Scalars["String"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type RemoveOptionGroupTierPricingInput = {
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId: Scalars["OID"]["input"];
  tierId: Scalars["OID"]["input"];
};

export type RemoveServiceLevelInput = {
  lastModified: Scalars["DateTime"]["input"];
  serviceLevelId: Scalars["OID"]["input"];
  tierId: Scalars["OID"]["input"];
};

export type RemoveUsageLimitInput = {
  lastModified: Scalars["DateTime"]["input"];
  limitId: Scalars["OID"]["input"];
  tierId: Scalars["OID"]["input"];
};

export type ReorderTiersInput = {
  lastModified: Scalars["DateTime"]["input"];
  tierIds: Array<Scalars["OID"]["input"]>;
};

export type SelectResourceTemplateInput = {
  lastModified: Scalars["DateTime"]["input"];
  resourceTemplateId: Scalars["PHID"]["input"];
};

export type Service = {
  description: Maybe<Scalars["String"]["output"]>;
  displayOrder: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["OID"]["output"];
  isSetupFormation: Scalars["Boolean"]["output"];
  optionGroupId: Maybe<Scalars["OID"]["output"]>;
  title: Scalars["String"]["output"];
};

export type ServiceLevel =
  | "CUSTOM"
  | "INCLUDED"
  | "NOT_APPLICABLE"
  | "NOT_INCLUDED"
  | "OPTIONAL"
  | "VARIABLE";

export type ServiceLevelBinding = {
  customValue: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  level: ServiceLevel;
  optionGroupId: Maybe<Scalars["OID"]["output"]>;
  serviceId: Scalars["OID"]["output"];
};

export type ServiceOfferingState = {
  availableBillingCycles: Array<BillingCycle>;
  description: Maybe<Scalars["String"]["output"]>;
  facetTargets: Array<FacetTarget>;
  id: Maybe<Scalars["PHID"]["output"]>;
  infoLink: Maybe<Scalars["URL"]["output"]>;
  lastModified: Maybe<Scalars["DateTime"]["output"]>;
  operatorId: Maybe<Scalars["PHID"]["output"]>;
  optionGroups: Array<OptionGroup>;
  resourceTemplateId: Maybe<Scalars["PHID"]["output"]>;
  services: Array<Service>;
  status: ServiceStatus;
  summary: Scalars["String"]["output"];
  thumbnailUrl: Maybe<Scalars["URL"]["output"]>;
  tiers: Array<ServiceSubscriptionTier>;
  title: Scalars["String"]["output"];
};

export type ServicePricing = {
  amount: Maybe<Scalars["Amount_Money"]["output"]>;
  currency: Scalars["Currency"]["output"];
};

export type ServiceStatus = "ACTIVE" | "COMING_SOON" | "DEPRECATED" | "DRAFT";

export type ServiceSubscriptionTier = {
  billingCycleDiscounts: Array<BillingCycleDiscount>;
  defaultBillingCycle: Maybe<BillingCycle>;
  description: Maybe<Scalars["String"]["output"]>;
  excludeFromSetupFee: Scalars["Boolean"]["output"];
  id: Scalars["OID"]["output"];
  isCustomPricing: Scalars["Boolean"]["output"];
  mostPopular: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
  pricing: ServicePricing;
  pricingMode: Maybe<TierPricingMode>;
  serviceLevels: Array<ServiceLevelBinding>;
  usageLimits: Array<ServiceUsageLimit>;
};

export type ServiceUsageLimit = {
  accrualCycle: AccrualCycle;
  freeLimit: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["OID"]["output"];
  metric: Scalars["String"]["output"];
  metricType: MetricType;
  notes: Maybe<Scalars["String"]["output"]>;
  paidLimit: Maybe<Scalars["Int"]["output"]>;
  serviceId: Scalars["OID"]["output"];
  unitName: Maybe<Scalars["String"]["output"]>;
  unitPrice: Maybe<Scalars["Amount_Money"]["output"]>;
  unitPriceCurrency: Maybe<Scalars["Currency"]["output"]>;
};

export type SetAvailableBillingCyclesInput = {
  billingCycles: Array<BillingCycle>;
  lastModified: Scalars["DateTime"]["input"];
};

export type SetFacetTargetInput = {
  categoryKey: Scalars["String"]["input"];
  categoryLabel: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  selectedOptions: Array<Scalars["String"]["input"]>;
};

export type SetOfferingIdInput = {
  id: Scalars["PHID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type SetOperatorInput = {
  lastModified: Scalars["DateTime"]["input"];
  operatorId: Scalars["PHID"]["input"];
};

export type SetOptionGroupDiscountModeInput = {
  discountMode: DiscountMode;
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId: Scalars["OID"]["input"];
};

export type SetOptionGroupStandalonePricingInput = {
  billingCycleDiscounts?: InputMaybe<Array<BillingCycleDiscountInput>>;
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId: Scalars["OID"]["input"];
  recurringPricing: Array<RecurringPriceOptionInput>;
  setupCost?: InputMaybe<SetupCostInput>;
};

export type SetTierBillingCycleDiscountsInput = {
  discounts: Array<BillingCycleDiscountInput>;
  lastModified: Scalars["DateTime"]["input"];
  tierId: Scalars["OID"]["input"];
};

export type SetTierDefaultBillingCycleInput = {
  defaultBillingCycle: BillingCycle;
  lastModified: Scalars["DateTime"]["input"];
  tierId: Scalars["OID"]["input"];
};

export type SetTierPricingModeInput = {
  lastModified: Scalars["DateTime"]["input"];
  pricingMode: TierPricingMode;
  tierId: Scalars["OID"]["input"];
};

export type SetupCost = {
  amount: Scalars["Amount_Money"]["output"];
  currency: Scalars["Currency"]["output"];
  discount: Maybe<DiscountRule>;
};

export type SetupCostInput = {
  amount: Scalars["Amount_Money"]["input"];
  currency: Scalars["Currency"]["input"];
  discount?: InputMaybe<DiscountRuleInput>;
};

export type StandalonePricing = {
  recurringPricing: Array<RecurringPriceOption>;
  setupCost: Maybe<SetupCost>;
};

export type TierPricingMode = "CALCULATED" | "MANUAL_OVERRIDE";

export type UpdateOfferingInfoInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  infoLink?: InputMaybe<Scalars["URL"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  summary?: InputMaybe<Scalars["String"]["input"]>;
  thumbnailUrl?: InputMaybe<Scalars["URL"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateOfferingStatusInput = {
  lastModified: Scalars["DateTime"]["input"];
  status: ServiceStatus;
};

export type UpdateOptionGroupInput = {
  availableBillingCycles?: InputMaybe<Array<BillingCycle>>;
  costType?: InputMaybe<GroupCostType>;
  currency?: InputMaybe<Scalars["Currency"]["input"]>;
  defaultSelected?: InputMaybe<Scalars["Boolean"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  isAddOn?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  price?: InputMaybe<Scalars["Amount_Money"]["input"]>;
};

export type UpdateOptionGroupTierPricingInput = {
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId: Scalars["OID"]["input"];
  recurringPricing?: InputMaybe<Array<RecurringPriceOptionInput>>;
  setupCost?: InputMaybe<SetupCostInput>;
  setupCostDiscounts?: InputMaybe<Array<BillingCycleDiscountInput>>;
  tierId: Scalars["OID"]["input"];
};

export type UpdateServiceInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  displayOrder?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["OID"]["input"];
  isSetupFormation?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId?: InputMaybe<Scalars["OID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateServiceLevelInput = {
  customValue?: InputMaybe<Scalars["String"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  level?: InputMaybe<ServiceLevel>;
  optionGroupId?: InputMaybe<Scalars["OID"]["input"]>;
  serviceLevelId: Scalars["OID"]["input"];
  tierId: Scalars["OID"]["input"];
};

export type UpdateTierInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  excludeFromSetupFee?: InputMaybe<Scalars["Boolean"]["input"]>;
  id: Scalars["OID"]["input"];
  isCustomPricing?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  mostPopular?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTierPricingInput = {
  amount?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  currency?: InputMaybe<Scalars["Currency"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  tierId: Scalars["OID"]["input"];
};

export type UpdateUsageLimitInput = {
  accrualCycle?: InputMaybe<AccrualCycle>;
  freeLimit?: InputMaybe<Scalars["Int"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  limitId: Scalars["OID"]["input"];
  metric?: InputMaybe<Scalars["String"]["input"]>;
  metricType?: InputMaybe<MetricType>;
  notes?: InputMaybe<Scalars["String"]["input"]>;
  paidLimit?: InputMaybe<Scalars["Int"]["input"]>;
  tierId: Scalars["OID"]["input"];
  unitName?: InputMaybe<Scalars["String"]["input"]>;
  unitPrice?: InputMaybe<Scalars["Amount_Money"]["input"]>;
  unitPriceCurrency?: InputMaybe<Scalars["Currency"]["input"]>;
};
