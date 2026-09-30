/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AddContributorInput,
  AddLinkInput,
  AddScopeInput,
  AddSkillInput,
  BuilderLink,
  BuilderProfileState,
  BuilderScope,
  BuilderScopeInput,
  BuilderSkill,
  BuilderSkillInput,
  BuilderStatus,
  BuilderStatusInput,
  EditLinkInput,
  OpHubMember,
  RemoveContributorInput,
  RemoveLinkInput,
  RemoveScopeInput,
  RemoveSkillInput,
  SetOpHubMemberInput,
  SetOperatorInput,
  SetWalletAddressInput,
  UpdateProfileInput,
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

export const BuilderScopeSchema = z.enum([
  "ACC",
  "GOVERNANCE_SCOPE",
  "PROTOCOL_SCOPE",
  "STA",
  "STABILITY_SCOPE",
  "SUP",
  "SUPPORT_SCOPE",
]);

export const BuilderScopeInputSchema = z.enum([
  "ACC",
  "GOVERNANCE_SCOPE",
  "PROTOCOL_SCOPE",
  "STA",
  "STABILITY_SCOPE",
  "SUP",
  "SUPPORT_SCOPE",
]);

export const BuilderSkillSchema = z.enum([
  "BACKEND_DEVELOPMENT",
  "DATA_ENGINEERING",
  "DEVOPS_ENGINEERING",
  "FRONTEND_DEVELOPMENT",
  "FULL_STACK_DEVELOPMENT",
  "QA_TESTING",
  "SECURITY_ENGINEERING",
  "SMART_CONTRACT_DEVELOPMENT",
  "TECHNICAL_WRITING",
  "UI_UX_DESIGN",
]);

export const BuilderSkillInputSchema = z.enum([
  "BACKEND_DEVELOPMENT",
  "DATA_ENGINEERING",
  "DEVOPS_ENGINEERING",
  "FRONTEND_DEVELOPMENT",
  "FULL_STACK_DEVELOPMENT",
  "QA_TESTING",
  "SECURITY_ENGINEERING",
  "SMART_CONTRACT_DEVELOPMENT",
  "TECHNICAL_WRITING",
  "UI_UX_DESIGN",
]);

export const BuilderStatusSchema = z.enum([
  "ACTIVE",
  "ARCHIVED",
  "COMPLETED",
  "INACTIVE",
  "ON_HOLD",
]);

export const BuilderStatusInputSchema = z.enum([
  "ACTIVE",
  "ARCHIVED",
  "COMPLETED",
  "INACTIVE",
  "ON_HOLD",
]);

export function AddContributorInputSchema(): z.ZodObject<
  Properties<AddContributorInput>
> {
  return z.object({
    contributorPHID: z.string(),
  });
}

export function AddLinkInputSchema(): z.ZodObject<Properties<AddLinkInput>> {
  return z.object({
    id: z.string(),
    label: z.string().nullish(),
    url: z.url(),
  });
}

export function AddScopeInputSchema(): z.ZodObject<Properties<AddScopeInput>> {
  return z.object({
    scope: BuilderScopeInputSchema.nullish(),
  });
}

export function AddSkillInputSchema(): z.ZodObject<Properties<AddSkillInput>> {
  return z.object({
    skill: BuilderSkillInputSchema.nullish(),
  });
}

export function BuilderLinkSchema(): z.ZodObject<Properties<BuilderLink>> {
  return z.object({
    __typename: z.literal("BuilderLink").optional(),
    id: z.string(),
    label: z.string().nullish(),
    url: z.url(),
  });
}

export function BuilderProfileStateSchema(): z.ZodObject<
  Properties<BuilderProfileState>
> {
  return z.object({
    __typename: z.literal("BuilderProfileState").optional(),
    about: z.string().nullish(),
    code: z.string().nullish(),
    contributors: z.array(z.string()),
    description: z.string().nullish(),
    icon: z.url().nullish(),
    id: z.string().nullish(),
    isOperator: z.boolean(),
    lastModified: z.iso.datetime().nullish(),
    links: z.array(z.lazy(() => BuilderLinkSchema())),
    name: z.string().nullish(),
    operationalHubMember: z.lazy(() => OpHubMemberSchema()),
    scopes: z.array(BuilderScopeSchema),
    skills: z.array(BuilderSkillSchema),
    slug: z.string().nullish(),
    status: BuilderStatusSchema.nullish(),
    walletAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      })
      .nullish(),
  });
}

export function EditLinkInputSchema(): z.ZodObject<Properties<EditLinkInput>> {
  return z.object({
    id: z.string(),
    label: z.string().nullish(),
    url: z.url(),
  });
}

export function OpHubMemberSchema(): z.ZodObject<Properties<OpHubMember>> {
  return z.object({
    __typename: z.literal("OpHubMember").optional(),
    name: z.string().nullish(),
    phid: z.string().nullish(),
  });
}

export function RemoveContributorInputSchema(): z.ZodObject<
  Properties<RemoveContributorInput>
> {
  return z.object({
    contributorPHID: z.string(),
  });
}

export function RemoveLinkInputSchema(): z.ZodObject<
  Properties<RemoveLinkInput>
> {
  return z.object({
    id: z.string(),
  });
}

export function RemoveScopeInputSchema(): z.ZodObject<
  Properties<RemoveScopeInput>
> {
  return z.object({
    scope: BuilderScopeInputSchema.nullish(),
  });
}

export function RemoveSkillInputSchema(): z.ZodObject<
  Properties<RemoveSkillInput>
> {
  return z.object({
    skill: BuilderSkillInputSchema.nullish(),
  });
}

export function SetOpHubMemberInputSchema(): z.ZodObject<
  Properties<SetOpHubMemberInput>
> {
  return z.object({
    name: z.string().nullish(),
    phid: z.string().nullish(),
  });
}

export function SetOperatorInputSchema(): z.ZodObject<
  Properties<SetOperatorInput>
> {
  return z.object({
    isOperator: z.boolean(),
  });
}

export function SetWalletAddressInputSchema(): z.ZodObject<
  Properties<SetWalletAddressInput>
> {
  return z.object({
    walletAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, {
        message: "Invalid Ethereum address format",
      }),
  });
}

export function UpdateProfileInputSchema(): z.ZodObject<
  Properties<UpdateProfileInput>
> {
  return z.object({
    about: z.string().nullish(),
    code: z.string().nullish(),
    description: z.string().nullish(),
    icon: z.url().nullish(),
    id: z.string().nullish(),
    name: z.string().nullish(),
    slug: z.string().nullish(),
    status: BuilderStatusInputSchema.nullish(),
  });
}
