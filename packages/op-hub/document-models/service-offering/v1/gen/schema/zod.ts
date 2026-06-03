/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AccrualCycle,
  AddFacetOptionInput,
  AddOnPricingMode,
  AddOptionGroupInput,
  AddOptionGroupTierPricingInput,
  AddServiceInput,
  AddServiceLevelInput,
  AddTierInput,
  AddUsageLimitInput,
  BillingCycle,
  BillingCycleDiscount,
  BillingCycleDiscountInput,
  ChangeResourceTemplateInput,
  DeleteOptionGroupInput,
  DeleteServiceInput,
  DeleteTierInput,
  DiscountMode,
  DiscountRule,
  DiscountRuleInput,
  DiscountType,
  FacetTarget,
  GroupCostType,
  MetricType,
  OptionGroup,
  OptionGroupTierPricing,
  RecurringPriceOption,
  RecurringPriceOptionInput,
  RemoveFacetOptionInput,
  RemoveFacetTargetInput,
  RemoveOptionGroupTierPricingInput,
  RemoveServiceLevelInput,
  RemoveUsageLimitInput,
  ReorderTiersInput,
  SelectResourceTemplateInput,
  Service,
  ServiceLevel,
  ServiceLevelBinding,
  ServiceOfferingState,
  ServicePricing,
  ServiceStatus,
  ServiceSubscriptionTier,
  ServiceUsageLimit,
  SetAvailableBillingCyclesInput,
  SetFacetTargetInput,
  SetOfferingIdInput,
  SetOperatorInput,
  SetOptionGroupDiscountModeInput,
  SetOptionGroupStandalonePricingInput,
  SetTierBillingCycleDiscountsInput,
  SetTierDefaultBillingCycleInput,
  SetTierPricingModeInput,
  SetupCost,
  SetupCostInput,
  StandalonePricing,
  TierPricingMode,
  UpdateOfferingInfoInput,
  UpdateOfferingStatusInput,
  UpdateOptionGroupInput,
  UpdateOptionGroupTierPricingInput,
  UpdateServiceInput,
  UpdateServiceLevelInput,
  UpdateTierInput,
  UpdateTierPricingInput,
  UpdateUsageLimitInput,
} from "./types.js";

type Properties<T> = Required<{
  [K in keyof T]: z.ZodType<T[K]>;
}>;

type definedNonNullAny = {};

export const isDefinedNonNullAny = (v: any): v is definedNonNullAny =>
  v !== undefined && v !== null;

export const definedNonNullAnySchema = z
  .any()
  .refine((v) => isDefinedNonNullAny(v));

export const AccrualCycleSchema = z.enum([
  "ANNUAL",
  "DAILY",
  "HOURLY",
  "MONTHLY",
  "QUARTERLY",
  "SEMI_ANNUAL",
  "WEEKLY",
]);

export const AddOnPricingModeSchema = z.enum(["STANDALONE", "TIER_DEPENDENT"]);

export const BillingCycleSchema = z.enum([
  "ANNUAL",
  "MONTHLY",
  "ONE_TIME",
  "QUARTERLY",
  "SEMI_ANNUAL",
]);

export const DiscountModeSchema = z.enum(["INDEPENDENT", "INHERIT_TIER"]);

export const DiscountTypeSchema = z.enum(["FLAT_AMOUNT", "PERCENTAGE"]);

export const GroupCostTypeSchema = z.enum(["RECURRING", "SETUP"]);

export const MetricTypeSchema = z.enum(["CUMULATIVE", "NON_CUMULATIVE"]);

export const ServiceLevelSchema = z.enum([
  "CUSTOM",
  "INCLUDED",
  "NOT_APPLICABLE",
  "NOT_INCLUDED",
  "OPTIONAL",
  "VARIABLE",
]);

export const ServiceStatusSchema = z.enum([
  "ACTIVE",
  "COMING_SOON",
  "DEPRECATED",
  "DRAFT",
]);

export const TierPricingModeSchema = z.enum(["CALCULATED", "MANUAL_OVERRIDE"]);

export function AddFacetOptionInputSchema(): z.ZodObject<
  Properties<AddFacetOptionInput>
> {
  return z.object({
    categoryKey: z.string(),
    lastModified: z.iso.datetime(),
    optionId: z.string(),
  });
}

export function AddOptionGroupInputSchema(): z.ZodObject<
  Properties<AddOptionGroupInput>
> {
  return z.object({
    availableBillingCycles: z.array(BillingCycleSchema).nullish(),
    costType: GroupCostTypeSchema.nullish(),
    currency: z.string().nullish(),
    defaultSelected: z.boolean(),
    description: z.string().nullish(),
    id: z.string(),
    isAddOn: z.boolean(),
    lastModified: z.iso.datetime(),
    name: z.string(),
    price: z.number().nullish(),
  });
}

export function AddOptionGroupTierPricingInputSchema(): z.ZodObject<
  Properties<AddOptionGroupTierPricingInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    optionGroupId: z.string(),
    recurringPricing: z.array(z.lazy(() => RecurringPriceOptionInputSchema())),
    setupCost: z.lazy(() => SetupCostInputSchema().nullish()),
    setupCostDiscounts: z
      .array(z.lazy(() => BillingCycleDiscountInputSchema()))
      .nullish(),
    tierId: z.string(),
    tierPricingId: z.string(),
  });
}

export function AddServiceInputSchema(): z.ZodObject<
  Properties<AddServiceInput>
> {
  return z.object({
    description: z.string().nullish(),
    displayOrder: z.number().nullish(),
    id: z.string(),
    isSetupFormation: z.boolean().nullish(),
    lastModified: z.iso.datetime(),
    optionGroupId: z.string().nullish(),
    title: z.string(),
  });
}

export function AddServiceLevelInputSchema(): z.ZodObject<
  Properties<AddServiceLevelInput>
> {
  return z.object({
    customValue: z.string().nullish(),
    lastModified: z.iso.datetime(),
    level: ServiceLevelSchema,
    optionGroupId: z.string().nullish(),
    serviceId: z.string(),
    serviceLevelId: z.string(),
    tierId: z.string(),
  });
}

export function AddTierInputSchema(): z.ZodObject<Properties<AddTierInput>> {
  return z.object({
    amount: z.number().nullish(),
    currency: z.string(),
    description: z.string().nullish(),
    excludeFromSetupFee: z.boolean().nullish(),
    id: z.string(),
    isCustomPricing: z.boolean().nullish(),
    lastModified: z.iso.datetime(),
    name: z.string(),
  });
}

export function AddUsageLimitInputSchema(): z.ZodObject<
  Properties<AddUsageLimitInput>
> {
  return z.object({
    accrualCycle: AccrualCycleSchema,
    freeLimit: z.number().nullish(),
    lastModified: z.iso.datetime(),
    limitId: z.string(),
    metric: z.string(),
    metricType: MetricTypeSchema,
    notes: z.string().nullish(),
    paidLimit: z.number().nullish(),
    serviceId: z.string(),
    tierId: z.string(),
    unitName: z.string().nullish(),
    unitPrice: z.number().nullish(),
    unitPriceCurrency: z.string().nullish(),
  });
}

export function BillingCycleDiscountSchema(): z.ZodObject<
  Properties<BillingCycleDiscount>
> {
  return z.object({
    __typename: z.literal("BillingCycleDiscount").optional(),
    billingCycle: BillingCycleSchema,
    discountRule: z.lazy(() => DiscountRuleSchema()),
  });
}

export function BillingCycleDiscountInputSchema(): z.ZodObject<
  Properties<BillingCycleDiscountInput>
> {
  return z.object({
    billingCycle: BillingCycleSchema,
    discountRule: z.lazy(() => DiscountRuleInputSchema()),
  });
}

export function ChangeResourceTemplateInputSchema(): z.ZodObject<
  Properties<ChangeResourceTemplateInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    newTemplateId: z.string(),
    previousTemplateId: z.string(),
  });
}

export function DeleteOptionGroupInputSchema(): z.ZodObject<
  Properties<DeleteOptionGroupInput>
> {
  return z.object({
    id: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function DeleteServiceInputSchema(): z.ZodObject<
  Properties<DeleteServiceInput>
> {
  return z.object({
    id: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function DeleteTierInputSchema(): z.ZodObject<
  Properties<DeleteTierInput>
> {
  return z.object({
    id: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function DiscountRuleSchema(): z.ZodObject<Properties<DiscountRule>> {
  return z.object({
    __typename: z.literal("DiscountRule").optional(),
    discountType: DiscountTypeSchema,
    discountValue: z.number(),
  });
}

export function DiscountRuleInputSchema(): z.ZodObject<
  Properties<DiscountRuleInput>
> {
  return z.object({
    discountType: DiscountTypeSchema,
    discountValue: z.number(),
  });
}

export function FacetTargetSchema(): z.ZodObject<Properties<FacetTarget>> {
  return z.object({
    __typename: z.literal("FacetTarget").optional(),
    categoryKey: z.string(),
    categoryLabel: z.string(),
    id: z.string(),
    selectedOptions: z.array(z.string()),
  });
}

export function OptionGroupSchema(): z.ZodObject<Properties<OptionGroup>> {
  return z.object({
    __typename: z.literal("OptionGroup").optional(),
    availableBillingCycles: z.array(BillingCycleSchema),
    billingCycleDiscounts: z.array(z.lazy(() => BillingCycleDiscountSchema())),
    costType: GroupCostTypeSchema.nullish(),
    currency: z.string().nullish(),
    defaultSelected: z.boolean(),
    description: z.string().nullish(),
    discountMode: DiscountModeSchema.nullish(),
    id: z.string(),
    isAddOn: z.boolean(),
    name: z.string(),
    price: z.number().nullish(),
    pricingMode: AddOnPricingModeSchema.nullish(),
    standalonePricing: z.lazy(() => StandalonePricingSchema().nullish()),
    tierDependentPricing: z
      .array(z.lazy(() => OptionGroupTierPricingSchema()))
      .nullish(),
  });
}

export function OptionGroupTierPricingSchema(): z.ZodObject<
  Properties<OptionGroupTierPricing>
> {
  return z.object({
    __typename: z.literal("OptionGroupTierPricing").optional(),
    id: z.string(),
    recurringPricing: z.array(z.lazy(() => RecurringPriceOptionSchema())),
    setupCost: z.lazy(() => SetupCostSchema().nullish()),
    setupCostDiscounts: z.array(z.lazy(() => BillingCycleDiscountSchema())),
    tierId: z.string(),
  });
}

export function RecurringPriceOptionSchema(): z.ZodObject<
  Properties<RecurringPriceOption>
> {
  return z.object({
    __typename: z.literal("RecurringPriceOption").optional(),
    amount: z.number(),
    billingCycle: BillingCycleSchema,
    currency: z.string(),
    discount: z.lazy(() => DiscountRuleSchema().nullish()),
    id: z.string(),
  });
}

export function RecurringPriceOptionInputSchema(): z.ZodObject<
  Properties<RecurringPriceOptionInput>
> {
  return z.object({
    amount: z.number(),
    billingCycle: BillingCycleSchema,
    currency: z.string(),
    discount: z.lazy(() => DiscountRuleInputSchema().nullish()),
    id: z.string(),
  });
}

export function RemoveFacetOptionInputSchema(): z.ZodObject<
  Properties<RemoveFacetOptionInput>
> {
  return z.object({
    categoryKey: z.string(),
    lastModified: z.iso.datetime(),
    optionId: z.string(),
  });
}

export function RemoveFacetTargetInputSchema(): z.ZodObject<
  Properties<RemoveFacetTargetInput>
> {
  return z.object({
    categoryKey: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function RemoveOptionGroupTierPricingInputSchema(): z.ZodObject<
  Properties<RemoveOptionGroupTierPricingInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    optionGroupId: z.string(),
    tierId: z.string(),
  });
}

export function RemoveServiceLevelInputSchema(): z.ZodObject<
  Properties<RemoveServiceLevelInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    serviceLevelId: z.string(),
    tierId: z.string(),
  });
}

export function RemoveUsageLimitInputSchema(): z.ZodObject<
  Properties<RemoveUsageLimitInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    limitId: z.string(),
    tierId: z.string(),
  });
}

export function ReorderTiersInputSchema(): z.ZodObject<
  Properties<ReorderTiersInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    tierIds: z.array(z.string()),
  });
}

export function SelectResourceTemplateInputSchema(): z.ZodObject<
  Properties<SelectResourceTemplateInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    resourceTemplateId: z.string(),
  });
}

export function ServiceSchema(): z.ZodObject<Properties<Service>> {
  return z.object({
    __typename: z.literal("Service").optional(),
    description: z.string().nullish(),
    displayOrder: z.number().nullish(),
    id: z.string(),
    isSetupFormation: z.boolean(),
    optionGroupId: z.string().nullish(),
    title: z.string(),
  });
}

export function ServiceLevelBindingSchema(): z.ZodObject<
  Properties<ServiceLevelBinding>
> {
  return z.object({
    __typename: z.literal("ServiceLevelBinding").optional(),
    customValue: z.string().nullish(),
    id: z.string(),
    level: ServiceLevelSchema,
    optionGroupId: z.string().nullish(),
    serviceId: z.string(),
  });
}

export function ServiceOfferingStateSchema(): z.ZodObject<
  Properties<ServiceOfferingState>
> {
  return z.object({
    __typename: z.literal("ServiceOfferingState").optional(),
    availableBillingCycles: z.array(BillingCycleSchema),
    description: z.string().nullish(),
    facetTargets: z.array(z.lazy(() => FacetTargetSchema())),
    id: z.string().nullish(),
    infoLink: z.url().nullish(),
    lastModified: z.iso.datetime().nullish(),
    operatorId: z.string().nullish(),
    optionGroups: z.array(z.lazy(() => OptionGroupSchema())),
    resourceTemplateId: z.string().nullish(),
    services: z.array(z.lazy(() => ServiceSchema())),
    status: ServiceStatusSchema,
    summary: z.string(),
    thumbnailUrl: z.url().nullish(),
    tiers: z.array(z.lazy(() => ServiceSubscriptionTierSchema())),
    title: z.string(),
  });
}

export function ServicePricingSchema(): z.ZodObject<
  Properties<ServicePricing>
> {
  return z.object({
    __typename: z.literal("ServicePricing").optional(),
    amount: z.number().nullish(),
    currency: z.string(),
  });
}

export function ServiceSubscriptionTierSchema(): z.ZodObject<
  Properties<ServiceSubscriptionTier>
> {
  return z.object({
    __typename: z.literal("ServiceSubscriptionTier").optional(),
    billingCycleDiscounts: z.array(z.lazy(() => BillingCycleDiscountSchema())),
    defaultBillingCycle: BillingCycleSchema.nullish(),
    description: z.string().nullish(),
    excludeFromSetupFee: z.boolean(),
    id: z.string(),
    isCustomPricing: z.boolean(),
    mostPopular: z.boolean(),
    name: z.string(),
    pricing: z.lazy(() => ServicePricingSchema()),
    pricingMode: TierPricingModeSchema.nullish(),
    serviceLevels: z.array(z.lazy(() => ServiceLevelBindingSchema())),
    usageLimits: z.array(z.lazy(() => ServiceUsageLimitSchema())),
  });
}

export function ServiceUsageLimitSchema(): z.ZodObject<
  Properties<ServiceUsageLimit>
> {
  return z.object({
    __typename: z.literal("ServiceUsageLimit").optional(),
    accrualCycle: AccrualCycleSchema,
    freeLimit: z.number().nullish(),
    id: z.string(),
    metric: z.string(),
    metricType: MetricTypeSchema,
    notes: z.string().nullish(),
    paidLimit: z.number().nullish(),
    serviceId: z.string(),
    unitName: z.string().nullish(),
    unitPrice: z.number().nullish(),
    unitPriceCurrency: z.string().nullish(),
  });
}

export function SetAvailableBillingCyclesInputSchema(): z.ZodObject<
  Properties<SetAvailableBillingCyclesInput>
> {
  return z.object({
    billingCycles: z.array(BillingCycleSchema),
    lastModified: z.iso.datetime(),
  });
}

export function SetFacetTargetInputSchema(): z.ZodObject<
  Properties<SetFacetTargetInput>
> {
  return z.object({
    categoryKey: z.string(),
    categoryLabel: z.string(),
    id: z.string(),
    lastModified: z.iso.datetime(),
    selectedOptions: z.array(z.string()),
  });
}

export function SetOfferingIdInputSchema(): z.ZodObject<
  Properties<SetOfferingIdInput>
> {
  return z.object({
    id: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function SetOperatorInputSchema(): z.ZodObject<
  Properties<SetOperatorInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    operatorId: z.string(),
  });
}

export function SetOptionGroupDiscountModeInputSchema(): z.ZodObject<
  Properties<SetOptionGroupDiscountModeInput>
> {
  return z.object({
    discountMode: DiscountModeSchema,
    lastModified: z.iso.datetime(),
    optionGroupId: z.string(),
  });
}

export function SetOptionGroupStandalonePricingInputSchema(): z.ZodObject<
  Properties<SetOptionGroupStandalonePricingInput>
> {
  return z.object({
    billingCycleDiscounts: z
      .array(z.lazy(() => BillingCycleDiscountInputSchema()))
      .nullish(),
    lastModified: z.iso.datetime(),
    optionGroupId: z.string(),
    recurringPricing: z.array(z.lazy(() => RecurringPriceOptionInputSchema())),
    setupCost: z.lazy(() => SetupCostInputSchema().nullish()),
  });
}

export function SetTierBillingCycleDiscountsInputSchema(): z.ZodObject<
  Properties<SetTierBillingCycleDiscountsInput>
> {
  return z.object({
    discounts: z.array(z.lazy(() => BillingCycleDiscountInputSchema())),
    lastModified: z.iso.datetime(),
    tierId: z.string(),
  });
}

export function SetTierDefaultBillingCycleInputSchema(): z.ZodObject<
  Properties<SetTierDefaultBillingCycleInput>
> {
  return z.object({
    defaultBillingCycle: BillingCycleSchema,
    lastModified: z.iso.datetime(),
    tierId: z.string(),
  });
}

export function SetTierPricingModeInputSchema(): z.ZodObject<
  Properties<SetTierPricingModeInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    pricingMode: TierPricingModeSchema,
    tierId: z.string(),
  });
}

export function SetupCostSchema(): z.ZodObject<Properties<SetupCost>> {
  return z.object({
    __typename: z.literal("SetupCost").optional(),
    amount: z.number(),
    currency: z.string(),
    discount: z.lazy(() => DiscountRuleSchema().nullish()),
  });
}

export function SetupCostInputSchema(): z.ZodObject<
  Properties<SetupCostInput>
> {
  return z.object({
    amount: z.number(),
    currency: z.string(),
    discount: z.lazy(() => DiscountRuleInputSchema().nullish()),
  });
}

export function StandalonePricingSchema(): z.ZodObject<
  Properties<StandalonePricing>
> {
  return z.object({
    __typename: z.literal("StandalonePricing").optional(),
    recurringPricing: z.array(z.lazy(() => RecurringPriceOptionSchema())),
    setupCost: z.lazy(() => SetupCostSchema().nullish()),
  });
}

export function UpdateOfferingInfoInputSchema(): z.ZodObject<
  Properties<UpdateOfferingInfoInput>
> {
  return z.object({
    description: z.string().nullish(),
    infoLink: z.url().nullish(),
    lastModified: z.iso.datetime(),
    summary: z.string().nullish(),
    thumbnailUrl: z.url().nullish(),
    title: z.string().nullish(),
  });
}

export function UpdateOfferingStatusInputSchema(): z.ZodObject<
  Properties<UpdateOfferingStatusInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    status: ServiceStatusSchema,
  });
}

export function UpdateOptionGroupInputSchema(): z.ZodObject<
  Properties<UpdateOptionGroupInput>
> {
  return z.object({
    availableBillingCycles: z.array(BillingCycleSchema).nullish(),
    costType: GroupCostTypeSchema.nullish(),
    currency: z.string().nullish(),
    defaultSelected: z.boolean().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    isAddOn: z.boolean().nullish(),
    lastModified: z.iso.datetime(),
    name: z.string().nullish(),
    price: z.number().nullish(),
  });
}

export function UpdateOptionGroupTierPricingInputSchema(): z.ZodObject<
  Properties<UpdateOptionGroupTierPricingInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    optionGroupId: z.string(),
    recurringPricing: z
      .array(z.lazy(() => RecurringPriceOptionInputSchema()))
      .nullish(),
    setupCost: z.lazy(() => SetupCostInputSchema().nullish()),
    setupCostDiscounts: z
      .array(z.lazy(() => BillingCycleDiscountInputSchema()))
      .nullish(),
    tierId: z.string(),
  });
}

export function UpdateServiceInputSchema(): z.ZodObject<
  Properties<UpdateServiceInput>
> {
  return z.object({
    description: z.string().nullish(),
    displayOrder: z.number().nullish(),
    id: z.string(),
    isSetupFormation: z.boolean().nullish(),
    lastModified: z.iso.datetime(),
    optionGroupId: z.string().nullish(),
    title: z.string().nullish(),
  });
}

export function UpdateServiceLevelInputSchema(): z.ZodObject<
  Properties<UpdateServiceLevelInput>
> {
  return z.object({
    customValue: z.string().nullish(),
    lastModified: z.iso.datetime(),
    level: ServiceLevelSchema.nullish(),
    optionGroupId: z.string().nullish(),
    serviceLevelId: z.string(),
    tierId: z.string(),
  });
}

export function UpdateTierInputSchema(): z.ZodObject<
  Properties<UpdateTierInput>
> {
  return z.object({
    description: z.string().nullish(),
    excludeFromSetupFee: z.boolean().nullish(),
    id: z.string(),
    isCustomPricing: z.boolean().nullish(),
    lastModified: z.iso.datetime(),
    mostPopular: z.boolean().nullish(),
    name: z.string().nullish(),
  });
}

export function UpdateTierPricingInputSchema(): z.ZodObject<
  Properties<UpdateTierPricingInput>
> {
  return z.object({
    amount: z.number().nullish(),
    currency: z.string().nullish(),
    lastModified: z.iso.datetime(),
    tierId: z.string(),
  });
}

export function UpdateUsageLimitInputSchema(): z.ZodObject<
  Properties<UpdateUsageLimitInput>
> {
  return z.object({
    accrualCycle: AccrualCycleSchema.nullish(),
    freeLimit: z.number().nullish(),
    lastModified: z.iso.datetime(),
    limitId: z.string(),
    metric: z.string().nullish(),
    metricType: MetricTypeSchema.nullish(),
    notes: z.string().nullish(),
    paidLimit: z.number().nullish(),
    tierId: z.string(),
    unitName: z.string().nullish(),
    unitPrice: z.number().nullish(),
    unitPriceCurrency: z.string().nullish(),
  });
}
