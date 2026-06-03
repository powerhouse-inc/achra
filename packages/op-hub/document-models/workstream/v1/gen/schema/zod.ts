/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AddAlternativeProposalInput,
  AddPaymentRequestInput,
  ClientInfo,
  EditAlternativeProposalInput,
  EditClientInfoInput,
  EditInitialProposalInput,
  EditWorkstreamInput,
  Proposal,
  ProposalAuthor,
  ProposalAuthorInput,
  ProposalStatus,
  Rfp,
  RemoveAlternativeProposalInput,
  RemovePaymentRequestInput,
  SetRequestForProposalInput,
  WorkstreamState,
  WorkstreamStatus,
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

export const ProposalStatusSchema = z.enum([
  "ACCEPTED",
  "DRAFT",
  "REJECTED",
  "SUBMITTED",
]);

export const WorkstreamStatusSchema = z.enum([
  "AWARDED",
  "FINISHED",
  "IN_PROGRESS",
  "NOT_AWARDED",
  "OPEN_FOR_PROPOSALS",
  "PREWORK_RFC",
  "PROPOSAL_SUBMITTED",
  "RFP_CANCELLED",
  "RFP_DRAFT",
]);

export function AddAlternativeProposalInputSchema(): z.ZodObject<
  Properties<AddAlternativeProposalInput>
> {
  return z.object({
    id: z.string(),
    paymentTermsId: z.string().nullish(),
    proposalAuthor: z.lazy(() => ProposalAuthorInputSchema().nullish()),
    sowId: z.string().nullish(),
    status: ProposalStatusSchema.nullish(),
  });
}

export function AddPaymentRequestInputSchema(): z.ZodObject<
  Properties<AddPaymentRequestInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function ClientInfoSchema(): z.ZodObject<Properties<ClientInfo>> {
  return z.object({
    __typename: z.literal("ClientInfo").optional(),
    icon: z.url().nullish(),
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function EditAlternativeProposalInputSchema(): z.ZodObject<
  Properties<EditAlternativeProposalInput>
> {
  return z.object({
    id: z.string(),
    paymentTermsId: z.string().nullish(),
    proposalAuthor: z.lazy(() => ProposalAuthorInputSchema().nullish()),
    sowId: z.string().nullish(),
    status: ProposalStatusSchema.nullish(),
  });
}

export function EditClientInfoInputSchema(): z.ZodObject<
  Properties<EditClientInfoInput>
> {
  return z.object({
    clientId: z.string(),
    icon: z.string().nullish(),
    name: z.string().nullish(),
  });
}

export function EditInitialProposalInputSchema(): z.ZodObject<
  Properties<EditInitialProposalInput>
> {
  return z.object({
    id: z.string(),
    paymentTermsId: z.string().nullish(),
    proposalAuthor: z.lazy(() => ProposalAuthorInputSchema().nullish()),
    sowId: z.string().nullish(),
    status: ProposalStatusSchema.nullish(),
  });
}

export function EditWorkstreamInputSchema(): z.ZodObject<
  Properties<EditWorkstreamInput>
> {
  return z.object({
    code: z.string().nullish(),
    paymentTerms: z.string().nullish(),
    sowId: z.string().nullish(),
    status: WorkstreamStatusSchema.nullish(),
    title: z.string().nullish(),
  });
}

export function ProposalSchema(): z.ZodObject<Properties<Proposal>> {
  return z.object({
    __typename: z.literal("Proposal").optional(),
    author: z.lazy(() => ProposalAuthorSchema()),
    id: z.string(),
    paymentTerms: z.string(),
    sow: z.string(),
    status: ProposalStatusSchema,
  });
}

export function ProposalAuthorSchema(): z.ZodObject<
  Properties<ProposalAuthor>
> {
  return z.object({
    __typename: z.literal("ProposalAuthor").optional(),
    icon: z.url().nullish(),
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function ProposalAuthorInputSchema(): z.ZodObject<
  Properties<ProposalAuthorInput>
> {
  return z.object({
    icon: z.url().nullish(),
    id: z.string(),
    name: z.string().nullish(),
  });
}

export function RfpSchema(): z.ZodObject<Properties<Rfp>> {
  return z.object({
    __typename: z.literal("RFP").optional(),
    id: z.string(),
    title: z.string(),
  });
}

export function RemoveAlternativeProposalInputSchema(): z.ZodObject<
  Properties<RemoveAlternativeProposalInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemovePaymentRequestInputSchema(): z.ZodObject<
  Properties<RemovePaymentRequestInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function SetRequestForProposalInputSchema(): z.ZodObject<
  Properties<SetRequestForProposalInput>
> {
  return z.object({
    rfpId: z.string(),
    title: z.string(),
  });
}

export function WorkstreamStateSchema(): z.ZodObject<
  Properties<WorkstreamState>
> {
  return z.object({
    __typename: z.literal("WorkstreamState").optional(),
    alternativeProposals: z.array(z.lazy(() => ProposalSchema())),
    client: z.lazy(() => ClientInfoSchema().nullish()),
    code: z.string().nullish(),
    initialProposal: z.lazy(() => ProposalSchema().nullish()),
    paymentRequests: z.array(z.string()),
    paymentTerms: z.string().nullish(),
    rfp: z.lazy(() => RfpSchema().nullish()),
    sow: z.string().nullish(),
    status: WorkstreamStatusSchema,
    title: z.string().nullish(),
  });
}
