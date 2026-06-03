/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  ActivateInstanceInput,
  ApplyConfigurationChangesInput,
  ConfirmInstanceInput,
  InitializeInstanceInput,
  InstanceFacet,
  InstanceStatus,
  OperatorProfile,
  RemoveInstanceFacetInput,
  ReportProvisioningCompletedInput,
  ReportProvisioningFailedInput,
  ReportProvisioningStartedInput,
  ResourceInstanceState,
  ResumeAfterMaintenanceInput,
  ResumeAfterPaymentInput,
  SetInstanceFacetInput,
  SetOperatorProfileInput,
  SuspendForMaintenanceInput,
  SuspendForNonPaymentInput,
  SuspendInstanceInput,
  SuspensionType,
  TerminateInstanceInput,
  UpdateInstanceFacetInput,
  UpdateInstanceInfoInput,
  UpdateInstanceStatusInput,
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

export const InstanceStatusSchema = z.enum([
  "ACTIVE",
  "DRAFT",
  "PROVISIONING",
  "SUSPENDED",
  "TERMINATED",
]);

export const SuspensionTypeSchema = z.enum([
  "MAINTENANCE",
  "NON_PAYMENT",
  "OTHER",
]);

export function ActivateInstanceInputSchema(): z.ZodObject<
  Properties<ActivateInstanceInput>
> {
  return z.object({
    activatedAt: z.iso.datetime(),
  });
}

export function ApplyConfigurationChangesInputSchema(): z.ZodObject<
  Properties<ApplyConfigurationChangesInput>
> {
  return z.object({
    addFacets: z.array(z.lazy(() => SetInstanceFacetInputSchema())).nullish(),
    appliedAt: z.iso.datetime(),
    changeDescription: z.string().nullish(),
    removeFacetKeys: z.array(z.string()).nullish(),
    updateFacets: z
      .array(z.lazy(() => UpdateInstanceFacetInputSchema()))
      .nullish(),
  });
}

export function ConfirmInstanceInputSchema(): z.ZodObject<
  Properties<ConfirmInstanceInput>
> {
  return z.object({
    confirmedAt: z.iso.datetime(),
  });
}

export function InitializeInstanceInputSchema(): z.ZodObject<
  Properties<InitializeInstanceInput>
> {
  return z.object({
    customerId: z.string().nullish(),
    customerName: z.string().nullish(),
    description: z.string().nullish(),
    infoLink: z.url().nullish(),
    operatorDocumentType: z.string(),
    operatorId: z.string(),
    operatorName: z.string().nullish(),
    resourceTemplateId: z.string().nullish(),
    templateName: z.string().nullish(),
    thumbnailUrl: z.url().nullish(),
  });
}

export function InstanceFacetSchema(): z.ZodObject<Properties<InstanceFacet>> {
  return z.object({
    __typename: z.literal("InstanceFacet").optional(),
    categoryKey: z.string(),
    categoryLabel: z.string(),
    id: z.string(),
    selectedOption: z.string(),
  });
}

export function OperatorProfileSchema(): z.ZodObject<
  Properties<OperatorProfile>
> {
  return z.object({
    __typename: z.literal("OperatorProfile").optional(),
    id: z.string(),
    operatorName: z.string().nullish(),
  });
}

export function RemoveInstanceFacetInputSchema(): z.ZodObject<
  Properties<RemoveInstanceFacetInput>
> {
  return z.object({
    categoryKey: z.string(),
  });
}

export function ReportProvisioningCompletedInputSchema(): z.ZodObject<
  Properties<ReportProvisioningCompletedInput>
> {
  return z.object({
    completedAt: z.iso.datetime(),
  });
}

export function ReportProvisioningFailedInputSchema(): z.ZodObject<
  Properties<ReportProvisioningFailedInput>
> {
  return z.object({
    failedAt: z.iso.datetime(),
    failureReason: z.string(),
  });
}

export function ReportProvisioningStartedInputSchema(): z.ZodObject<
  Properties<ReportProvisioningStartedInput>
> {
  return z.object({
    startedAt: z.iso.datetime(),
  });
}

export function ResourceInstanceStateSchema(): z.ZodObject<
  Properties<ResourceInstanceState>
> {
  return z.object({
    __typename: z.literal("ResourceInstanceState").optional(),
    activatedAt: z.iso.datetime().nullish(),
    configuration: z.array(z.lazy(() => InstanceFacetSchema())),
    confirmedAt: z.iso.datetime().nullish(),
    customerId: z.string().nullish(),
    customerName: z.string().nullish(),
    description: z.string().nullish(),
    infoLink: z.url().nullish(),
    operatorProfile: z.lazy(() => OperatorProfileSchema().nullish()),
    provisioningCompletedAt: z.iso.datetime().nullish(),
    provisioningFailureReason: z.string().nullish(),
    provisioningStartedAt: z.iso.datetime().nullish(),
    resourceTemplateId: z.string().nullish(),
    resumedAt: z.iso.datetime().nullish(),
    status: InstanceStatusSchema,
    suspendedAt: z.iso.datetime().nullish(),
    suspensionDetails: z.string().nullish(),
    suspensionReason: z.string().nullish(),
    suspensionType: SuspensionTypeSchema.nullish(),
    templateName: z.string().nullish(),
    terminatedAt: z.iso.datetime().nullish(),
    terminationReason: z.string().nullish(),
    thumbnailUrl: z.url().nullish(),
  });
}

export function ResumeAfterMaintenanceInputSchema(): z.ZodObject<
  Properties<ResumeAfterMaintenanceInput>
> {
  return z.object({
    resumedAt: z.iso.datetime(),
  });
}

export function ResumeAfterPaymentInputSchema(): z.ZodObject<
  Properties<ResumeAfterPaymentInput>
> {
  return z.object({
    paymentReference: z.string().nullish(),
    resumedAt: z.iso.datetime(),
  });
}

export function SetInstanceFacetInputSchema(): z.ZodObject<
  Properties<SetInstanceFacetInput>
> {
  return z.object({
    categoryKey: z.string(),
    categoryLabel: z.string(),
    id: z.string(),
    selectedOption: z.string(),
  });
}

export function SetOperatorProfileInputSchema(): z.ZodObject<
  Properties<SetOperatorProfileInput>
> {
  return z.object({
    operatorId: z.string(),
    operatorName: z.string().nullish(),
  });
}

export function SuspendForMaintenanceInputSchema(): z.ZodObject<
  Properties<SuspendForMaintenanceInput>
> {
  return z.object({
    estimatedDuration: z.string().nullish(),
    maintenanceType: z.string().nullish(),
    suspendedAt: z.iso.datetime(),
  });
}

export function SuspendForNonPaymentInputSchema(): z.ZodObject<
  Properties<SuspendForNonPaymentInput>
> {
  return z.object({
    daysPastDue: z.number().nullish(),
    outstandingAmount: z.number().nullish(),
    suspendedAt: z.iso.datetime(),
  });
}

export function SuspendInstanceInputSchema(): z.ZodObject<
  Properties<SuspendInstanceInput>
> {
  return z.object({
    reason: z.string().nullish(),
    suspendedAt: z.iso.datetime(),
  });
}

export function TerminateInstanceInputSchema(): z.ZodObject<
  Properties<TerminateInstanceInput>
> {
  return z.object({
    reason: z.string(),
    terminatedAt: z.iso.datetime(),
  });
}

export function UpdateInstanceFacetInputSchema(): z.ZodObject<
  Properties<UpdateInstanceFacetInput>
> {
  return z.object({
    categoryKey: z.string(),
    categoryLabel: z.string().nullish(),
    selectedOption: z.string().nullish(),
  });
}

export function UpdateInstanceInfoInputSchema(): z.ZodObject<
  Properties<UpdateInstanceInfoInput>
> {
  return z.object({
    description: z.string().nullish(),
    infoLink: z.url().nullish(),
    name: z.string().nullish(),
    thumbnailUrl: z.url().nullish(),
  });
}

export function UpdateInstanceStatusInputSchema(): z.ZodObject<
  Properties<UpdateInstanceStatusInput>
> {
  return z.object({
    status: InstanceStatusSchema,
  });
}
