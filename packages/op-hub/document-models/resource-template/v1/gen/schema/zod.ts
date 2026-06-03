/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";
import type {
  AddContentSectionInput,
  AddFacetBindingInput,
  AddFacetOptionInput,
  AddFaqInput,
  AddOptionGroupInput,
  AddServiceInput,
  AddTargetAudienceInput,
  ContentSection,
  DeleteContentSectionInput,
  DeleteFaqInput,
  DeleteOptionGroupInput,
  DeleteServiceInput,
  FacetTarget,
  FaqField,
  OptionGroup,
  RemoveFacetBindingInput,
  RemoveFacetOptionInput,
  RemoveFacetTargetInput,
  RemoveTargetAudienceInput,
  ReorderContentSectionsInput,
  ReorderFaqsInput,
  ResourceFacetBinding,
  ResourceTemplateState,
  Service,
  SetFacetTargetInput,
  SetOperatorInput,
  SetRecurringServicesInput,
  SetSetupServicesInput,
  SetTemplateIdInput,
  SetWeightInput,
  TargetAudience,
  TemplateStatus,
  UpdateContentSectionInput,
  UpdateFaqInput,
  UpdateOptionGroupInput,
  UpdateServiceInput,
  UpdateTemplateInfoInput,
  UpdateTemplateStatusInput,
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

export const TemplateStatusSchema = z.enum([
  "ACTIVE",
  "COMING_SOON",
  "DEPRECATED",
  "DRAFT",
]);

export function AddContentSectionInputSchema(): z.ZodObject<
  Properties<AddContentSectionInput>
> {
  return z.object({
    content: z.string(),
    displayOrder: z.number(),
    id: z.string(),
    lastModified: z.iso.datetime(),
    title: z.string(),
  });
}

export function AddFacetBindingInputSchema(): z.ZodObject<
  Properties<AddFacetBindingInput>
> {
  return z.object({
    bindingId: z.string(),
    facetName: z.string(),
    facetType: z.string(),
    lastModified: z.iso.datetime(),
    serviceId: z.string(),
    supportedOptions: z.array(z.string()),
  });
}

export function AddFacetOptionInputSchema(): z.ZodObject<
  Properties<AddFacetOptionInput>
> {
  return z.object({
    categoryKey: z.string(),
    lastModified: z.iso.datetime(),
    optionId: z.string(),
  });
}

export function AddFaqInputSchema(): z.ZodObject<Properties<AddFaqInput>> {
  return z.object({
    answer: z.string().nullish(),
    displayOrder: z.number(),
    id: z.string(),
    question: z.string().nullish(),
  });
}

export function AddOptionGroupInputSchema(): z.ZodObject<
  Properties<AddOptionGroupInput>
> {
  return z.object({
    defaultSelected: z.boolean(),
    description: z.string().nullish(),
    id: z.string(),
    isAddOn: z.boolean(),
    lastModified: z.iso.datetime(),
    name: z.string(),
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
    parentServiceId: z.string().nullish(),
    title: z.string(),
  });
}

export function AddTargetAudienceInputSchema(): z.ZodObject<
  Properties<AddTargetAudienceInput>
> {
  return z.object({
    color: z.string().nullish(),
    id: z.string(),
    label: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function ContentSectionSchema(): z.ZodObject<
  Properties<ContentSection>
> {
  return z.object({
    __typename: z.literal("ContentSection").optional(),
    content: z.string(),
    displayOrder: z.number(),
    id: z.string(),
    title: z.string(),
  });
}

export function DeleteContentSectionInputSchema(): z.ZodObject<
  Properties<DeleteContentSectionInput>
> {
  return z.object({
    id: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function DeleteFaqInputSchema(): z.ZodObject<
  Properties<DeleteFaqInput>
> {
  return z.object({
    id: z.string(),
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

export function FacetTargetSchema(): z.ZodObject<Properties<FacetTarget>> {
  return z.object({
    __typename: z.literal("FacetTarget").optional(),
    categoryKey: z.string(),
    categoryLabel: z.string(),
    id: z.string(),
    selectedOptions: z.array(z.string()),
  });
}

export function FaqFieldSchema(): z.ZodObject<Properties<FaqField>> {
  return z.object({
    __typename: z.literal("FaqField").optional(),
    answer: z.string().nullish(),
    displayOrder: z.number(),
    id: z.string(),
    question: z.string().nullish(),
  });
}

export function OptionGroupSchema(): z.ZodObject<Properties<OptionGroup>> {
  return z.object({
    __typename: z.literal("OptionGroup").optional(),
    defaultSelected: z.boolean(),
    description: z.string().nullish(),
    id: z.string(),
    isAddOn: z.boolean(),
    name: z.string(),
  });
}

export function RemoveFacetBindingInputSchema(): z.ZodObject<
  Properties<RemoveFacetBindingInput>
> {
  return z.object({
    bindingId: z.string(),
    lastModified: z.iso.datetime(),
    serviceId: z.string(),
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

export function RemoveTargetAudienceInputSchema(): z.ZodObject<
  Properties<RemoveTargetAudienceInput>
> {
  return z.object({
    id: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function ReorderContentSectionsInputSchema(): z.ZodObject<
  Properties<ReorderContentSectionsInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    sectionIds: z.array(z.string()),
  });
}

export function ReorderFaqsInputSchema(): z.ZodObject<
  Properties<ReorderFaqsInput>
> {
  return z.object({
    faqIds: z.array(z.string()),
    lastModified: z.iso.datetime(),
  });
}

export function ResourceFacetBindingSchema(): z.ZodObject<
  Properties<ResourceFacetBinding>
> {
  return z.object({
    __typename: z.literal("ResourceFacetBinding").optional(),
    facetName: z.string(),
    facetType: z.string(),
    id: z.string(),
    supportedOptions: z.array(z.string()),
  });
}

export function ResourceTemplateStateSchema(): z.ZodObject<
  Properties<ResourceTemplateState>
> {
  return z.object({
    __typename: z.literal("ResourceTemplateState").optional(),
    contentSections: z.array(z.lazy(() => ContentSectionSchema())),
    description: z.string().nullish(),
    facetTargets: z.array(z.lazy(() => FacetTargetSchema())),
    faqFields: z.array(z.lazy(() => FaqFieldSchema())).nullish(),
    id: z.string().nullish(),
    infoLink: z.url().nullish(),
    lastModified: z.iso.datetime().nullish(),
    operatorId: z.string().nullish(),
    optionGroups: z.array(z.lazy(() => OptionGroupSchema())),
    recurringServices: z.array(z.string()),
    services: z.array(z.lazy(() => ServiceSchema())),
    setupServices: z.array(z.string()),
    status: TemplateStatusSchema,
    subtitle: z.string().nullish(),
    summary: z.string(),
    targetAudiences: z.array(z.lazy(() => TargetAudienceSchema())),
    thumbnailUrl: z.url().nullish(),
    title: z.string(),
    weight: z.number().nullish(),
  });
}

export function ServiceSchema(): z.ZodObject<Properties<Service>> {
  return z.object({
    __typename: z.literal("Service").optional(),
    description: z.string().nullish(),
    displayOrder: z.number().nullish(),
    facetBindings: z.array(z.lazy(() => ResourceFacetBindingSchema())),
    id: z.string(),
    isSetupFormation: z.boolean(),
    optionGroupId: z.string().nullish(),
    parentServiceId: z.string().nullish(),
    title: z.string(),
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

export function SetOperatorInputSchema(): z.ZodObject<
  Properties<SetOperatorInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    operatorId: z.string(),
  });
}

export function SetRecurringServicesInputSchema(): z.ZodObject<
  Properties<SetRecurringServicesInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    services: z.array(z.string()),
  });
}

export function SetSetupServicesInputSchema(): z.ZodObject<
  Properties<SetSetupServicesInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    services: z.array(z.string()),
  });
}

export function SetTemplateIdInputSchema(): z.ZodObject<
  Properties<SetTemplateIdInput>
> {
  return z.object({
    id: z.string(),
    lastModified: z.iso.datetime(),
  });
}

export function SetWeightInputSchema(): z.ZodObject<
  Properties<SetWeightInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    weight: z.number().nullish(),
  });
}

export function TargetAudienceSchema(): z.ZodObject<
  Properties<TargetAudience>
> {
  return z.object({
    __typename: z.literal("TargetAudience").optional(),
    color: z.string().nullish(),
    id: z.string(),
    label: z.string(),
  });
}

export function UpdateContentSectionInputSchema(): z.ZodObject<
  Properties<UpdateContentSectionInput>
> {
  return z.object({
    content: z.string().nullish(),
    displayOrder: z.number().nullish(),
    id: z.string(),
    lastModified: z.iso.datetime(),
    title: z.string().nullish(),
  });
}

export function UpdateFaqInputSchema(): z.ZodObject<
  Properties<UpdateFaqInput>
> {
  return z.object({
    answer: z.string().nullish(),
    id: z.string(),
    question: z.string().nullish(),
  });
}

export function UpdateOptionGroupInputSchema(): z.ZodObject<
  Properties<UpdateOptionGroupInput>
> {
  return z.object({
    defaultSelected: z.boolean().nullish(),
    description: z.string().nullish(),
    id: z.string(),
    isAddOn: z.boolean().nullish(),
    lastModified: z.iso.datetime(),
    name: z.string().nullish(),
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
    parentServiceId: z.string().nullish(),
    title: z.string().nullish(),
  });
}

export function UpdateTemplateInfoInputSchema(): z.ZodObject<
  Properties<UpdateTemplateInfoInput>
> {
  return z.object({
    description: z.string().nullish(),
    infoLink: z.url().nullish(),
    lastModified: z.iso.datetime(),
    subtitle: z.string().nullish(),
    summary: z.string().nullish(),
    thumbnailUrl: z.url().nullish(),
    title: z.string().nullish(),
  });
}

export function UpdateTemplateStatusInputSchema(): z.ZodObject<
  Properties<UpdateTemplateStatusInput>
> {
  return z.object({
    lastModified: z.iso.datetime(),
    status: TemplateStatusSchema,
  });
}
