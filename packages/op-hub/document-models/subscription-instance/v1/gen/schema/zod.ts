/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AccrualCycle,
  AccrueMetricUsageInput,
  ActivateSliceIdMappingInput,
  ActivateSubscriptionInput,
  AddServiceFacetSelectionInput,
  AddServiceGroupInput,
  AddServiceInput,
  AddServiceMetricInput,
  AddServiceToGroupInput,
  ApplyCreditInput,
  BillingCycle,
  CancelSubscriptionInput,
  ChangePlanInput,
  ConfirmLineItemPaymentInput,
  CustomerType,
  DebtLineItem,
  DebtLineItemStatus,
  DebtOriginType,
  DecrementMetricUsageInput,
  DiscountInfo,
  DiscountInfoInitInput,
  DiscountServiceInfoInput,
  DiscountSource,
  DiscountType,
  GenerateInvoiceInput,
  GroupCostType,
  IncrementMetricUsageInput,
  InitializeFacetSelectionInput,
  InitializeMetricInput,
  InitializeServiceGroupInput,
  InitializeServiceInput,
  InitializeSubscriptionInput,
  MarkLineItemInvoicedInput,
  MetricType,
  PauseSubscriptionInput,
  RecurringCost,
  RemoveServiceFacetSelectionInput,
  RemoveServiceFromGroupInput,
  RemoveServiceGroupInput,
  RemoveServiceInput,
  RemoveServiceMetricInput,
  RenewExpiringSubscriptionInput,
  RenewSliceIdMappingInput,
  ReportOveragePaymentInput,
  ReportPaymentInput,
  ReportRecurringPaymentInput,
  ReportSetupPaymentInput,
  ResourceDocument,
  ResumeSubscriptionInput,
  Service,
  ServiceFacetSelection,
  ServiceGroup,
  ServiceMetric,
  SetAutoRenewInput,
  SetCustomerTypeInput,
  SetExpiringInput,
  SetOperatorNotesInput,
  SetResourceDocumentInput,
  SettleSliceIdMappingInput,
  SetupCost,
  SubscriptionInstanceState,
  SubscriptionStatus,
  TierPricingMode,
  UpdateCustomerInfoInput,
  UpdateMetricInput,
  UpdateMetricUsageInput,
  UpdateServiceGroupCostInput,
  UpdateServiceInfoInput,
  UpdateServiceRecurringCostInput,
  UpdateServiceSetupCostInput,
  UpdateTeamMemberCountInput,
  UpdateTierInfoInput,
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

export const BillingCycleSchema = z.enum([
  "ANNUAL",
  "MONTHLY",
  "ONE_TIME",
  "QUARTERLY",
  "SEMI_ANNUAL",
]);

export const CustomerTypeSchema = z.enum(["INDIVIDUAL", "TEAM"]);

export const DebtLineItemStatusSchema = z.enum([
  "CHARGED",
  "FULLY_PAID",
  "INVOICED",
  "PARTIALLY_PAID",
]);

export const DebtOriginTypeSchema = z.enum([
  "DYNAMIC",
  "ESTIMATED_USAGE",
  "RECONCILIATION",
  "SETUP",
  "SUBSCRIPTION_FEE",
]);

export const DiscountSourceSchema = z.enum([
  "BUNDLE",
  "GROUP_INDEPENDENT",
  "TIER_INHERITED",
]);

export const DiscountTypeSchema = z.enum(["FLAT_AMOUNT", "PERCENTAGE"]);

export const GroupCostTypeSchema = z.enum(["RECURRING", "SETUP"]);

export const MetricTypeSchema = z.enum(["CUMULATIVE", "NON_CUMULATIVE"]);

export const SubscriptionStatusSchema = z.enum([
  "ACTIVE",
  "CANCELLED",
  "EXPIRING",
  "PAUSED",
  "PENDING",
]);

export const TierPricingModeSchema = z.enum(["CALCULATED", "MANUAL_OVERRIDE"]);

export function AccrueMetricUsageInputSchema(): z.ZodObject<
  Properties<AccrueMetricUsageInput>
> {
  return z.object({
    accrualDate: z.iso.datetime(),
    metricId: z.string(),
    newSliceIds: z.array(z.string()),
    serviceId: z.string(),
  });
}

export function ActivateSliceIdMappingInputSchema(): z.ZodObject<
  Properties<ActivateSliceIdMappingInput>
> {
  return z.object({
    sliceId: z.string(),
    sourceId: z.string(),
    sourceName: z.string().nullish(),
  });
}

export function ActivateSubscriptionInputSchema(): z.ZodObject<
  Properties<ActivateSubscriptionInput>
> {
  return z.object({
    activatedSince: z.iso.datetime(),
    recurringSliceIds: z.array(
      z.lazy(() => ActivateSliceIdMappingInputSchema()),
    ),
    setupSliceIds: z.array(z.lazy(() => ActivateSliceIdMappingInputSchema())),
  });
}

export function AddServiceFacetSelectionInputSchema(): z.ZodObject<
  Properties<AddServiceFacetSelectionInput>
> {
  return z.object({
    facetName: z.string(),
    facetSelectionId: z.string(),
    selectedOption: z.string(),
    serviceId: z.string(),
  });
}

export function AddServiceGroupInputSchema(): z.ZodObject<
  Properties<AddServiceGroupInput>
> {
  return z.object({
    costType: GroupCostTypeSchema.nullish(),
    effectiveDate: z.iso.datetime(),
    groupId: z.string(),
    name: z.string(),
    optional: z.boolean(),
    recurringAmount: z.number().nullish(),
    recurringBillingCycle: BillingCycleSchema.nullish(),
    recurringCurrency: z.string().nullish(),
    recurringDiscount: z.lazy(() => DiscountServiceInfoInputSchema().nullish()),
    recurringSliceId: z.string(),
    setupAmount: z.number().nullish(),
    setupCurrency: z.string().nullish(),
    setupSliceId: z.string(),
  });
}

export function AddServiceInputSchema(): z.ZodObject<
  Properties<AddServiceInput>
> {
  return z.object({
    customValue: z.string().nullish(),
    description: z.string().nullish(),
    name: z.string().nullish(),
    recurringAmount: z.number().nullish(),
    recurringBillingCycle: BillingCycleSchema.nullish(),
    recurringCurrency: z.string().nullish(),
    recurringDiscount: z.lazy(() => DiscountServiceInfoInputSchema().nullish()),
    recurringLastPaymentDate: z.iso.datetime().nullish(),
    serviceId: z.string(),
    setupAmount: z.number().nullish(),
    setupCurrency: z.string().nullish(),
    setupPaymentDate: z.iso.datetime().nullish(),
  });
}

export function AddServiceMetricInputSchema(): z.ZodObject<
  Properties<AddServiceMetricInput>
> {
  return z.object({
    accrualCycle: AccrualCycleSchema,
    currentUsage: z.number(),
    freeLimit: z.number().nullish(),
    lastAccrualDate: z.iso.datetime().nullish(),
    metricId: z.string(),
    metricType: MetricTypeSchema,
    name: z.string(),
    paidLimit: z.number().nullish(),
    serviceId: z.string(),
    unitCostAmount: z.number().nullish(),
    unitCostBillingCycle: BillingCycleSchema.nullish(),
    unitCostCurrency: z.string().nullish(),
    unitName: z.string(),
  });
}

export function AddServiceToGroupInputSchema(): z.ZodObject<
  Properties<AddServiceToGroupInput>
> {
  return z.object({
    customValue: z.string().nullish(),
    description: z.string().nullish(),
    groupId: z.string(),
    name: z.string().nullish(),
    recurringAmount: z.number().nullish(),
    recurringBillingCycle: BillingCycleSchema.nullish(),
    recurringCurrency: z.string().nullish(),
    recurringLastPaymentDate: z.iso.datetime().nullish(),
    serviceId: z.string(),
    setupAmount: z.number().nullish(),
    setupCurrency: z.string().nullish(),
    setupPaymentDate: z.iso.datetime().nullish(),
  });
}

export function ApplyCreditInputSchema(): z.ZodObject<
  Properties<ApplyCreditInput>
> {
  return z.object({
    amount: z.number(),
    creditDate: z.iso.datetime(),
    lineItemId: z.string().nullish(),
    reason: z.string(),
  });
}

export function CancelSubscriptionInputSchema(): z.ZodObject<
  Properties<CancelSubscriptionInput>
> {
  return z.object({
    cancellationReason: z.string().nullish(),
    cancelledSince: z.iso.datetime(),
    refundSliceIds: z.array(z.lazy(() => RenewSliceIdMappingInputSchema())),
  });
}

export function ChangePlanInputSchema(): z.ZodObject<
  Properties<ChangePlanInput>
> {
  return z.object({
    creditLineItemId: z.string(),
    debitLineItemId: z.string(),
    effectiveDate: z.iso.datetime(),
    newBillingCycle: BillingCycleSchema.nullish(),
    newTierCurrency: z.string(),
    newTierName: z.string().nullish(),
    newTierPrice: z.number(),
    newTierPricingOptionId: z.string(),
  });
}

export function ConfirmLineItemPaymentInputSchema(): z.ZodObject<
  Properties<ConfirmLineItemPaymentInput>
> {
  return z.object({
    amount: z.number(),
    lineItemId: z.string(),
    paymentDate: z.iso.datetime(),
    paymentRef: z.string().nullish(),
  });
}

export function DebtLineItemSchema(): z.ZodObject<Properties<DebtLineItem>> {
  return z.object({
    __typename: z.literal("DebtLineItem").optional(),
    accrualPeriodStart: z.iso.datetime().nullish(),
    chargedAt: z.iso.datetime(),
    creditApplied: z.number(),
    currency: z.string(),
    debitAmount: z.number(),
    description: z.string().nullish(),
    frozen: z.boolean(),
    fullyPaidAt: z.iso.datetime().nullish(),
    id: z.string(),
    invoiceRef: z.string().nullish(),
    invoiced: z.boolean(),
    invoicedAt: z.iso.datetime().nullish(),
    lastPaymentRef: z.string().nullish(),
    origin: DebtOriginTypeSchema,
    settledAmount: z.number(),
    sourceGroupId: z.string().nullish(),
    sourceMetricId: z.string().nullish(),
    sourceServiceId: z.string().nullish(),
    status: DebtLineItemStatusSchema,
  });
}

export function DecrementMetricUsageInputSchema(): z.ZodObject<
  Properties<DecrementMetricUsageInput>
> {
  return z.object({
    currentTime: z.iso.datetime(),
    decrementBy: z.number(),
    metricId: z.string(),
    newSliceId: z.string(),
    serviceId: z.string(),
  });
}

export function DiscountInfoSchema(): z.ZodObject<Properties<DiscountInfo>> {
  return z.object({
    __typename: z.literal("DiscountInfo").optional(),
    discountType: DiscountTypeSchema,
    discountValue: z.number(),
    originalAmount: z.number(),
    source: DiscountSourceSchema,
  });
}

export function DiscountInfoInitInputSchema(): z.ZodObject<
  Properties<DiscountInfoInitInput>
> {
  return z.object({
    discountType: DiscountTypeSchema,
    discountValue: z.number(),
    originalAmount: z.number(),
    source: DiscountSourceSchema,
  });
}

export function DiscountServiceInfoInputSchema(): z.ZodObject<
  Properties<DiscountServiceInfoInput>
> {
  return z.object({
    discountType: DiscountTypeSchema,
    discountValue: z.number(),
    originalAmount: z.number(),
    source: DiscountSourceSchema,
  });
}

export function GenerateInvoiceInputSchema(): z.ZodObject<
  Properties<GenerateInvoiceInput>
> {
  return z.object({
    advanceCycleIfDue: z.boolean().nullish(),
    generatedAt: z.iso.datetime(),
    invoiceId: z.string(),
    metricFreezeSliceIds: z.array(
      z.lazy(() => SettleSliceIdMappingInputSchema()),
    ),
    nextCycleRecurringSliceIds: z.array(
      z.lazy(() => SettleSliceIdMappingInputSchema()),
    ),
  });
}

export function IncrementMetricUsageInputSchema(): z.ZodObject<
  Properties<IncrementMetricUsageInput>
> {
  return z.object({
    currentTime: z.iso.datetime(),
    incrementBy: z.number(),
    metricId: z.string(),
    newSliceId: z.string(),
    serviceId: z.string(),
  });
}

export function InitializeFacetSelectionInputSchema(): z.ZodObject<
  Properties<InitializeFacetSelectionInput>
> {
  return z.object({
    facetName: z.string(),
    id: z.string(),
    selectedOption: z.string(),
  });
}

export function InitializeMetricInputSchema(): z.ZodObject<
  Properties<InitializeMetricInput>
> {
  return z.object({
    accrualCycle: AccrualCycleSchema,
    currentUsage: z.number(),
    freeLimit: z.number().nullish(),
    id: z.string(),
    lastAccrualDate: z.iso.datetime().nullish(),
    metricType: MetricTypeSchema,
    name: z.string(),
    paidLimit: z.number().nullish(),
    unitCostAmount: z.number().nullish(),
    unitCostBillingCycle: BillingCycleSchema.nullish(),
    unitCostCurrency: z.string().nullish(),
    unitName: z.string(),
  });
}

export function InitializeServiceGroupInputSchema(): z.ZodObject<
  Properties<InitializeServiceGroupInput>
> {
  return z.object({
    costType: GroupCostTypeSchema.nullish(),
    id: z.string(),
    name: z.string(),
    optional: z.boolean(),
    recurringAmount: z.number().nullish(),
    recurringBillingCycle: BillingCycleSchema.nullish(),
    recurringCurrency: z.string().nullish(),
    recurringDiscount: z.lazy(() => DiscountInfoInitInputSchema().nullish()),
    services: z.array(z.lazy(() => InitializeServiceInputSchema())).nullish(),
    setupAmount: z.number().nullish(),
    setupCurrency: z.string().nullish(),
  });
}

export function InitializeServiceInputSchema(): z.ZodObject<
  Properties<InitializeServiceInput>
> {
  return z.object({
    customValue: z.string().nullish(),
    description: z.string().nullish(),
    facetSelections: z
      .array(z.lazy(() => InitializeFacetSelectionInputSchema()))
      .nullish(),
    id: z.string(),
    metrics: z.array(z.lazy(() => InitializeMetricInputSchema())).nullish(),
    name: z.string().nullish(),
    recurringAmount: z.number().nullish(),
    recurringBillingCycle: BillingCycleSchema.nullish(),
    recurringCurrency: z.string().nullish(),
    recurringDiscount: z.lazy(() => DiscountInfoInitInputSchema().nullish()),
    setupAmount: z.number().nullish(),
    setupCurrency: z.string().nullish(),
  });
}

export function InitializeSubscriptionInputSchema(): z.ZodObject<
  Properties<InitializeSubscriptionInput>
> {
  return z.object({
    autoRenew: z.boolean().nullish(),
    createdAt: z.iso.datetime(),
    customerEmail: z.email().nullish(),
    customerId: z.string().nullish(),
    customerName: z.string().nullish(),
    globalCurrency: z.string().nullish(),
    resourceId: z.string().nullish(),
    resourceLabel: z.string().nullish(),
    resourceThumbnailUrl: z.url().nullish(),
    selectedBillingCycle: BillingCycleSchema.nullish(),
    serviceGroups: z
      .array(z.lazy(() => InitializeServiceGroupInputSchema()))
      .nullish(),
    serviceOfferingId: z.string().nullish(),
    services: z.array(z.lazy(() => InitializeServiceInputSchema())).nullish(),
    tierCurrency: z.string().nullish(),
    tierName: z.string().nullish(),
    tierPrice: z.number().nullish(),
    tierPricingMode: TierPricingModeSchema.nullish(),
    tierPricingOptionId: z.string().nullish(),
  });
}

export function MarkLineItemInvoicedInputSchema(): z.ZodObject<
  Properties<MarkLineItemInvoicedInput>
> {
  return z.object({
    invoiceRef: z.string().nullish(),
    invoicedAt: z.iso.datetime(),
    lineItemId: z.string(),
  });
}

export function PauseSubscriptionInputSchema(): z.ZodObject<
  Properties<PauseSubscriptionInput>
> {
  return z.object({
    pausedSince: z.iso.datetime(),
  });
}

export function RecurringCostSchema(): z.ZodObject<Properties<RecurringCost>> {
  return z.object({
    __typename: z.literal("RecurringCost").optional(),
    amount: z.number(),
    billingCycle: BillingCycleSchema,
    currency: z.string(),
    discount: z.lazy(() => DiscountInfoSchema().nullish()),
    lastPaymentDate: z.iso.datetime().nullish(),
  });
}

export function RemoveServiceFacetSelectionInputSchema(): z.ZodObject<
  Properties<RemoveServiceFacetSelectionInput>
> {
  return z.object({
    facetSelectionId: z.string(),
    serviceId: z.string(),
  });
}

export function RemoveServiceFromGroupInputSchema(): z.ZodObject<
  Properties<RemoveServiceFromGroupInput>
> {
  return z.object({
    groupId: z.string(),
    serviceId: z.string(),
  });
}

export function RemoveServiceGroupInputSchema(): z.ZodObject<
  Properties<RemoveServiceGroupInput>
> {
  return z.object({
    creditSliceId: z.string(),
    effectiveDate: z.iso.datetime(),
    groupId: z.string(),
  });
}

export function RemoveServiceInputSchema(): z.ZodObject<
  Properties<RemoveServiceInput>
> {
  return z.object({
    serviceId: z.string(),
  });
}

export function RemoveServiceMetricInputSchema(): z.ZodObject<
  Properties<RemoveServiceMetricInput>
> {
  return z.object({
    metricId: z.string(),
    serviceId: z.string(),
  });
}

export function RenewExpiringSubscriptionInputSchema(): z.ZodObject<
  Properties<RenewExpiringSubscriptionInput>
> {
  return z.object({
    recurringSliceIds: z.array(z.lazy(() => RenewSliceIdMappingInputSchema())),
    timestamp: z.iso.datetime(),
  });
}

export function RenewSliceIdMappingInputSchema(): z.ZodObject<
  Properties<RenewSliceIdMappingInput>
> {
  return z.object({
    sliceId: z.string(),
    sourceId: z.string(),
    sourceName: z.string().nullish(),
  });
}

export function ReportOveragePaymentInputSchema(): z.ZodObject<
  Properties<ReportOveragePaymentInput>
> {
  return z.object({
    amount: z.number(),
    paymentDate: z.iso.datetime(),
  });
}

export function ReportPaymentInputSchema(): z.ZodObject<
  Properties<ReportPaymentInput>
> {
  return z.object({
    amount: z.number(),
    paymentDate: z.iso.datetime(),
    paymentRef: z.string().nullish(),
  });
}

export function ReportRecurringPaymentInputSchema(): z.ZodObject<
  Properties<ReportRecurringPaymentInput>
> {
  return z.object({
    paymentDate: z.iso.datetime(),
    serviceId: z.string(),
  });
}

export function ReportSetupPaymentInputSchema(): z.ZodObject<
  Properties<ReportSetupPaymentInput>
> {
  return z.object({
    paymentDate: z.iso.datetime(),
    serviceId: z.string(),
  });
}

export function ResourceDocumentSchema(): z.ZodObject<
  Properties<ResourceDocument>
> {
  return z.object({
    __typename: z.literal("ResourceDocument").optional(),
    id: z.string(),
    label: z.string().nullish(),
    thumbnailUrl: z.url().nullish(),
  });
}

export function ResumeSubscriptionInputSchema(): z.ZodObject<
  Properties<ResumeSubscriptionInput>
> {
  return z.object({
    timestamp: z.iso.datetime(),
  });
}

export function ServiceSchema(): z.ZodObject<Properties<Service>> {
  return z.object({
    __typename: z.literal("Service").optional(),
    customValue: z.string().nullish(),
    description: z.string().nullish(),
    facetSelections: z.array(z.lazy(() => ServiceFacetSelectionSchema())),
    id: z.string(),
    metrics: z.array(z.lazy(() => ServiceMetricSchema())),
    name: z.string().nullish(),
    recurringCost: z.lazy(() => RecurringCostSchema().nullish()),
    setupCost: z.lazy(() => SetupCostSchema().nullish()),
  });
}

export function ServiceFacetSelectionSchema(): z.ZodObject<
  Properties<ServiceFacetSelection>
> {
  return z.object({
    __typename: z.literal("ServiceFacetSelection").optional(),
    facetName: z.string(),
    id: z.string(),
    selectedOption: z.string(),
  });
}

export function ServiceGroupSchema(): z.ZodObject<Properties<ServiceGroup>> {
  return z.object({
    __typename: z.literal("ServiceGroup").optional(),
    costType: GroupCostTypeSchema.nullish(),
    id: z.string(),
    name: z.string(),
    optional: z.boolean(),
    recurringCost: z.lazy(() => RecurringCostSchema().nullish()),
    services: z.array(z.lazy(() => ServiceSchema())),
    setupCost: z.lazy(() => SetupCostSchema().nullish()),
  });
}

export function ServiceMetricSchema(): z.ZodObject<Properties<ServiceMetric>> {
  return z.object({
    __typename: z.literal("ServiceMetric").optional(),
    accrualCycle: AccrualCycleSchema,
    currentUsage: z.number(),
    freeLimit: z.number().nullish(),
    id: z.string(),
    lastAccrualDate: z.iso.datetime().nullish(),
    metricType: MetricTypeSchema,
    name: z.string(),
    paidLimit: z.number().nullish(),
    unitCost: z.lazy(() => RecurringCostSchema().nullish()),
    unitName: z.string(),
  });
}

export function SetAutoRenewInputSchema(): z.ZodObject<
  Properties<SetAutoRenewInput>
> {
  return z.object({
    autoRenew: z.boolean(),
  });
}

export function SetCustomerTypeInputSchema(): z.ZodObject<
  Properties<SetCustomerTypeInput>
> {
  return z.object({
    customerType: CustomerTypeSchema,
    teamMemberCount: z.number().nullish(),
  });
}

export function SetExpiringInputSchema(): z.ZodObject<
  Properties<SetExpiringInput>
> {
  return z.object({
    expiringSince: z.iso.datetime(),
  });
}

export function SetOperatorNotesInputSchema(): z.ZodObject<
  Properties<SetOperatorNotesInput>
> {
  return z.object({
    operatorNotes: z.string().nullish(),
  });
}

export function SetResourceDocumentInputSchema(): z.ZodObject<
  Properties<SetResourceDocumentInput>
> {
  return z.object({
    resourceId: z.string(),
    resourceLabel: z.string().nullish(),
    resourceThumbnailUrl: z.url().nullish(),
  });
}

export function SettleSliceIdMappingInputSchema(): z.ZodObject<
  Properties<SettleSliceIdMappingInput>
> {
  return z.object({
    sliceId: z.string(),
    sourceId: z.string(),
    sourceName: z.string().nullish(),
  });
}

export function SetupCostSchema(): z.ZodObject<Properties<SetupCost>> {
  return z.object({
    __typename: z.literal("SetupCost").optional(),
    amount: z.number(),
    currency: z.string(),
    paymentDate: z.iso.datetime().nullish(),
  });
}

export function SubscriptionInstanceStateSchema(): z.ZodObject<
  Properties<SubscriptionInstanceState>
> {
  return z.object({
    __typename: z.literal("SubscriptionInstanceState").optional(),
    activatedSince: z.iso.datetime().nullish(),
    autoRenew: z.boolean(),
    cancellationReason: z.string().nullish(),
    cancelledSince: z.iso.datetime().nullish(),
    createdAt: z.iso.datetime().nullish(),
    currentBillingCycleStart: z.iso.datetime().nullish(),
    currentCycleOverage: z.number().nullish(),
    customerEmail: z.email().nullish(),
    customerId: z.string().nullish(),
    customerName: z.string().nullish(),
    customerType: CustomerTypeSchema.nullish(),
    debtLineItems: z.array(z.lazy(() => DebtLineItemSchema())),
    expiringSince: z.iso.datetime().nullish(),
    globalCurrency: z.string().nullish(),
    nextBillingDate: z.iso.datetime().nullish(),
    operatorId: z.string().nullish(),
    operatorNotes: z.string().nullish(),
    pausedSince: z.iso.datetime().nullish(),
    resource: z.lazy(() => ResourceDocumentSchema().nullish()),
    selectedBillingCycle: BillingCycleSchema.nullish(),
    serviceGroups: z.array(z.lazy(() => ServiceGroupSchema())),
    serviceOfferingId: z.string().nullish(),
    services: z.array(z.lazy(() => ServiceSchema())),
    status: SubscriptionStatusSchema,
    teamMemberCount: z.number().nullish(),
    tierCurrency: z.string().nullish(),
    tierName: z.string().nullish(),
    tierPrice: z.number().nullish(),
    tierPricingMode: TierPricingModeSchema.nullish(),
    tierPricingOptionId: z.string().nullish(),
    totalCredit: z.number().nullish(),
    totalDebt: z.number().nullish(),
  });
}

export function UpdateCustomerInfoInputSchema(): z.ZodObject<
  Properties<UpdateCustomerInfoInput>
> {
  return z.object({
    customerEmail: z.email().nullish(),
    customerId: z.string().nullish(),
    customerName: z.string().nullish(),
  });
}

export function UpdateMetricInputSchema(): z.ZodObject<
  Properties<UpdateMetricInput>
> {
  return z.object({
    accrualCycle: AccrualCycleSchema.nullish(),
    freeLimit: z.number().nullish(),
    lastAccrualDate: z.iso.datetime().nullish(),
    metricId: z.string(),
    metricType: MetricTypeSchema.nullish(),
    name: z.string().nullish(),
    paidLimit: z.number().nullish(),
    serviceId: z.string(),
    unitName: z.string().nullish(),
  });
}

export function UpdateMetricUsageInputSchema(): z.ZodObject<
  Properties<UpdateMetricUsageInput>
> {
  return z.object({
    currentTime: z.iso.datetime(),
    currentUsage: z.number(),
    isAdjustment: z.boolean().nullish(),
    metricId: z.string(),
    newSliceId: z.string(),
    serviceId: z.string(),
  });
}

export function UpdateServiceGroupCostInputSchema(): z.ZodObject<
  Properties<UpdateServiceGroupCostInput>
> {
  return z.object({
    groupId: z.string(),
    recurringAmount: z.number().nullish(),
    recurringBillingCycle: BillingCycleSchema.nullish(),
    recurringCurrency: z.string().nullish(),
    setupAmount: z.number().nullish(),
    setupCurrency: z.string().nullish(),
  });
}

export function UpdateServiceInfoInputSchema(): z.ZodObject<
  Properties<UpdateServiceInfoInput>
> {
  return z.object({
    customValue: z.string().nullish(),
    description: z.string().nullish(),
    name: z.string().nullish(),
    serviceId: z.string(),
  });
}

export function UpdateServiceRecurringCostInputSchema(): z.ZodObject<
  Properties<UpdateServiceRecurringCostInput>
> {
  return z.object({
    amount: z.number().nullish(),
    billingCycle: BillingCycleSchema.nullish(),
    currency: z.string().nullish(),
    lastPaymentDate: z.iso.datetime().nullish(),
    nextBillingDate: z.iso.datetime().nullish(),
    serviceId: z.string(),
  });
}

export function UpdateServiceSetupCostInputSchema(): z.ZodObject<
  Properties<UpdateServiceSetupCostInput>
> {
  return z.object({
    amount: z.number().nullish(),
    currency: z.string().nullish(),
    paymentDate: z.iso.datetime().nullish(),
    serviceId: z.string(),
  });
}

export function UpdateTeamMemberCountInputSchema(): z.ZodObject<
  Properties<UpdateTeamMemberCountInput>
> {
  return z.object({
    teamMemberCount: z.number(),
  });
}

export function UpdateTierInfoInputSchema(): z.ZodObject<
  Properties<UpdateTierInfoInput>
> {
  return z.object({
    tierCurrency: z.string().nullish(),
    tierName: z.string().nullish(),
    tierPrice: z.number().nullish(),
    tierPricingMode: TierPricingModeSchema.nullish(),
    tierPricingOptionId: z.string().nullish(),
  });
}
