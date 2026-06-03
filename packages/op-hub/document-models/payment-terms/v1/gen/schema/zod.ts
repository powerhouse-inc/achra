/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AddBonusClauseInput,
  AddMilestoneInput,
  AddPenaltyClauseInput,
  BillingFrequency,
  BonusClause,
  CostAndMaterials,
  DeleteBonusClauseInput,
  DeleteMilestoneInput,
  DeletePenaltyClauseInput,
  Escrow,
  EvaluationFrequency,
  EvaluationTerms,
  Milestone,
  MilestonePayoutStatus,
  PaymentCurrency,
  PaymentModel,
  PaymentTermsState,
  PaymentTermsStatus,
  PenaltyClause,
  ReorderMilestonesInput,
  Retainer,
  SetBasicTermsInput,
  SetCostAndMaterialsInput,
  SetEscrowDetailsInput,
  SetEvaluationTermsInput,
  SetRetainerDetailsInput,
  UpdateBonusClauseInput,
  UpdateMilestoneInput,
  UpdateMilestoneStatusInput,
  UpdatePenaltyClauseInput,
  UpdateStatusInput,
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

export const BillingFrequencySchema = z.enum(["BIWEEKLY", "MONTHLY", "WEEKLY"]);

export const EvaluationFrequencySchema = z.enum([
  "MONTHLY",
  "PER_MILESTONE",
  "WEEKLY",
]);

export const MilestonePayoutStatusSchema = z.enum([
  "APPROVED",
  "PAID",
  "PENDING",
  "READY_FOR_REVIEW",
  "REJECTED",
]);

export const PaymentCurrencySchema = z.enum(["EUR", "GBP", "USD"]);

export const PaymentModelSchema = z.enum([
  "COST_AND_MATERIALS",
  "MILESTONE",
  "RETAINER",
]);

export const PaymentTermsStatusSchema = z.enum([
  "ACCEPTED",
  "CANCELLED",
  "DRAFT",
  "SUBMITTED",
]);

export function AddBonusClauseInputSchema(): z.ZodObject<
  Properties<AddBonusClauseInput>
> {
  return z.object({
    bonusAmount: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    comment: z.string().nullish(),
    condition: z.string(),
    id: z.string(),
  });
}

export function AddMilestoneInputSchema(): z.ZodObject<
  Properties<AddMilestoneInput>
> {
  return z.object({
    amount: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    expectedCompletionDate: z.iso.datetime().nullish(),
    id: z.string(),
    name: z.string(),
    requiresApproval: z.boolean(),
  });
}

export function AddPenaltyClauseInputSchema(): z.ZodObject<
  Properties<AddPenaltyClauseInput>
> {
  return z.object({
    comment: z.string().nullish(),
    condition: z.string(),
    deductionAmount: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    id: z.string(),
  });
}

export function BonusClauseSchema(): z.ZodObject<Properties<BonusClause>> {
  return z.object({
    __typename: z.literal("BonusClause").optional(),
    bonusAmount: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    comment: z.string().nullish(),
    condition: z.string(),
    id: z.string(),
  });
}

export function CostAndMaterialsSchema(): z.ZodObject<
  Properties<CostAndMaterials>
> {
  return z.object({
    __typename: z.literal("CostAndMaterials").optional(),
    billingFrequency: BillingFrequencySchema,
    hourlyRate: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
    timesheetRequired: z.boolean(),
    variableCap: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
  });
}

export function DeleteBonusClauseInputSchema(): z.ZodObject<
  Properties<DeleteBonusClauseInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function DeleteMilestoneInputSchema(): z.ZodObject<
  Properties<DeleteMilestoneInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function DeletePenaltyClauseInputSchema(): z.ZodObject<
  Properties<DeletePenaltyClauseInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function EscrowSchema(): z.ZodObject<Properties<Escrow>> {
  return z.object({
    __typename: z.literal("Escrow").optional(),
    amountHeld: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    escrowProvider: z.string().nullish(),
    proofOfFundsDocumentId: z.string().nullish(),
    releaseConditions: z.string(),
  });
}

export function EvaluationTermsSchema(): z.ZodObject<
  Properties<EvaluationTerms>
> {
  return z.object({
    __typename: z.literal("EvaluationTerms").optional(),
    commentsVisibleToClient: z.boolean(),
    criteria: z.array(z.string()),
    evaluationFrequency: EvaluationFrequencySchema,
    evaluatorTeam: z.string(),
    impactsPayout: z.boolean(),
    impactsReputation: z.boolean(),
  });
}

export function MilestoneSchema(): z.ZodObject<Properties<Milestone>> {
  return z.object({
    __typename: z.literal("Milestone").optional(),
    amount: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    expectedCompletionDate: z.iso.datetime().nullish(),
    id: z.string(),
    name: z.string(),
    payoutStatus: MilestonePayoutStatusSchema,
    requiresApproval: z.boolean(),
  });
}

export function PaymentTermsStateSchema(): z.ZodObject<
  Properties<PaymentTermsState>
> {
  return z.object({
    __typename: z.literal("PaymentTermsState").optional(),
    bonusClauses: z.array(z.lazy(() => BonusClauseSchema())),
    costAndMaterials: z.lazy(() => CostAndMaterialsSchema().nullish()),
    currency: PaymentCurrencySchema,
    escrowDetails: z.lazy(() => EscrowSchema().nullish()),
    evaluation: z.lazy(() => EvaluationTermsSchema().nullish()),
    milestoneSchedule: z.array(z.lazy(() => MilestoneSchema())),
    payer: z.string(),
    paymentModel: PaymentModelSchema,
    penaltyClauses: z.array(z.lazy(() => PenaltyClauseSchema())),
    proposer: z.string(),
    retainerDetails: z.lazy(() => RetainerSchema().nullish()),
    status: PaymentTermsStatusSchema,
    totalAmount: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
  });
}

export function PenaltyClauseSchema(): z.ZodObject<Properties<PenaltyClause>> {
  return z.object({
    __typename: z.literal("PenaltyClause").optional(),
    comment: z.string().nullish(),
    condition: z.string(),
    deductionAmount: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    id: z.string(),
  });
}

export function ReorderMilestonesInputSchema(): z.ZodObject<
  Properties<ReorderMilestonesInput>
> {
  return z.object({
    order: z.array(z.string()),
  });
}

export function RetainerSchema(): z.ZodObject<Properties<Retainer>> {
  return z.object({
    __typename: z.literal("Retainer").optional(),
    autoRenew: z.boolean(),
    billingFrequency: BillingFrequencySchema,
    endDate: z.iso.datetime().nullish(),
    retainerAmount: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    servicesIncluded: z.string(),
    startDate: z.iso.datetime(),
  });
}

export function SetBasicTermsInputSchema(): z.ZodObject<
  Properties<SetBasicTermsInput>
> {
  return z.object({
    currency: PaymentCurrencySchema,
    payer: z.string(),
    paymentModel: PaymentModelSchema,
    proposer: z.string(),
    totalAmount: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
  });
}

export function SetCostAndMaterialsInputSchema(): z.ZodObject<
  Properties<SetCostAndMaterialsInput>
> {
  return z.object({
    billingFrequency: BillingFrequencySchema,
    hourlyRate: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
    timesheetRequired: z.boolean(),
    variableCap: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
  });
}

export function SetEscrowDetailsInputSchema(): z.ZodObject<
  Properties<SetEscrowDetailsInput>
> {
  return z.object({
    amountHeld: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    escrowProvider: z.string().nullish(),
    proofOfFundsDocumentId: z.string().nullish(),
    releaseConditions: z.string(),
  });
}

export function SetEvaluationTermsInputSchema(): z.ZodObject<
  Properties<SetEvaluationTermsInput>
> {
  return z.object({
    commentsVisibleToClient: z.boolean(),
    criteria: z.array(z.string()),
    evaluationFrequency: EvaluationFrequencySchema,
    evaluatorTeam: z.string(),
    impactsPayout: z.boolean(),
    impactsReputation: z.boolean(),
  });
}

export function SetRetainerDetailsInputSchema(): z.ZodObject<
  Properties<SetRetainerDetailsInput>
> {
  return z.object({
    autoRenew: z.boolean(),
    billingFrequency: BillingFrequencySchema,
    endDate: z.iso.datetime().nullish(),
    retainerAmount: z.object({
      unit: z.string().optional(),
      value: z.number().finite(),
    }),
    servicesIncluded: z.string(),
    startDate: z.iso.datetime(),
  });
}

export function UpdateBonusClauseInputSchema(): z.ZodObject<
  Properties<UpdateBonusClauseInput>
> {
  return z.object({
    bonusAmount: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
    comment: z.string().nullish(),
    condition: z.string().nullish(),
    id: z.string(),
  });
}

export function UpdateMilestoneInputSchema(): z.ZodObject<
  Properties<UpdateMilestoneInput>
> {
  return z.object({
    amount: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
    expectedCompletionDate: z.iso.datetime().nullish(),
    id: z.string(),
    name: z.string().nullish(),
    requiresApproval: z.boolean().nullish(),
  });
}

export function UpdateMilestoneStatusInputSchema(): z.ZodObject<
  Properties<UpdateMilestoneStatusInput>
> {
  return z.object({
    id: z.string(),
    payoutStatus: MilestonePayoutStatusSchema,
  });
}

export function UpdatePenaltyClauseInputSchema(): z.ZodObject<
  Properties<UpdatePenaltyClauseInput>
> {
  return z.object({
    comment: z.string().nullish(),
    condition: z.string().nullish(),
    deductionAmount: z
      .object({ unit: z.string().optional(), value: z.number().finite() })
      .nullish(),
    id: z.string(),
  });
}

export function UpdateStatusInputSchema(): z.ZodObject<
  Properties<UpdateStatusInput>
> {
  return z.object({
    status: PaymentTermsStatusSchema,
  });
}
