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

export type AddContentSectionInput = {
  content: Scalars["String"]["input"];
  displayOrder: Scalars["Int"]["input"];
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  title: Scalars["String"]["input"];
};

export type AddFacetBindingInput = {
  bindingId: Scalars["OID"]["input"];
  facetName: Scalars["String"]["input"];
  facetType: Scalars["PHID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  serviceId: Scalars["OID"]["input"];
  supportedOptions: Array<Scalars["OID"]["input"]>;
};

export type AddFacetOptionInput = {
  categoryKey: Scalars["String"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  optionId: Scalars["String"]["input"];
};

export type AddFaqInput = {
  answer?: InputMaybe<Scalars["String"]["input"]>;
  displayOrder: Scalars["Int"]["input"];
  id: Scalars["OID"]["input"];
  question?: InputMaybe<Scalars["String"]["input"]>;
};

export type AddOptionGroupInput = {
  defaultSelected: Scalars["Boolean"]["input"];
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  isAddOn: Scalars["Boolean"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  name: Scalars["String"]["input"];
};

export type AddServiceInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  displayOrder?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["OID"]["input"];
  isSetupFormation?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId?: InputMaybe<Scalars["OID"]["input"]>;
  parentServiceId?: InputMaybe<Scalars["OID"]["input"]>;
  title: Scalars["String"]["input"];
};

export type AddTargetAudienceInput = {
  color?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  label: Scalars["String"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type ContentSection = {
  content: Scalars["String"]["output"];
  displayOrder: Scalars["Int"]["output"];
  id: Scalars["OID"]["output"];
  title: Scalars["String"]["output"];
};

export type DeleteContentSectionInput = {
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type DeleteFaqInput = {
  id: Scalars["OID"]["input"];
};

export type DeleteOptionGroupInput = {
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type DeleteServiceInput = {
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type FacetTarget = {
  categoryKey: Scalars["String"]["output"];
  categoryLabel: Scalars["String"]["output"];
  id: Scalars["OID"]["output"];
  selectedOptions: Array<Scalars["String"]["output"]>;
};

export type FaqField = {
  answer: Maybe<Scalars["String"]["output"]>;
  displayOrder: Scalars["Int"]["output"];
  id: Scalars["OID"]["output"];
  question: Maybe<Scalars["String"]["output"]>;
};

export type OptionGroup = {
  defaultSelected: Scalars["Boolean"]["output"];
  description: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  isAddOn: Scalars["Boolean"]["output"];
  name: Scalars["String"]["output"];
};

export type RemoveFacetBindingInput = {
  bindingId: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  serviceId: Scalars["OID"]["input"];
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

export type RemoveTargetAudienceInput = {
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type ReorderContentSectionsInput = {
  lastModified: Scalars["DateTime"]["input"];
  sectionIds: Array<Scalars["OID"]["input"]>;
};

export type ReorderFaqsInput = {
  faqIds: Array<Scalars["OID"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
};

export type ResourceFacetBinding = {
  facetName: Scalars["String"]["output"];
  facetType: Scalars["PHID"]["output"];
  id: Scalars["OID"]["output"];
  supportedOptions: Array<Scalars["OID"]["output"]>;
};

export type ResourceTemplateState = {
  contentSections: Array<ContentSection>;
  description: Maybe<Scalars["String"]["output"]>;
  facetTargets: Array<FacetTarget>;
  faqFields: Maybe<Array<FaqField>>;
  id: Maybe<Scalars["PHID"]["output"]>;
  infoLink: Maybe<Scalars["URL"]["output"]>;
  lastModified: Maybe<Scalars["DateTime"]["output"]>;
  operatorId: Maybe<Scalars["PHID"]["output"]>;
  optionGroups: Array<OptionGroup>;
  recurringServices: Array<Scalars["String"]["output"]>;
  services: Array<Service>;
  setupServices: Array<Scalars["String"]["output"]>;
  status: TemplateStatus;
  subtitle: Maybe<Scalars["String"]["output"]>;
  summary: Scalars["String"]["output"];
  targetAudiences: Array<TargetAudience>;
  thumbnailUrl: Maybe<Scalars["URL"]["output"]>;
  title: Scalars["String"]["output"];
  weight: Maybe<Scalars["Int"]["output"]>;
};

export type Service = {
  description: Maybe<Scalars["String"]["output"]>;
  displayOrder: Maybe<Scalars["Int"]["output"]>;
  facetBindings: Array<ResourceFacetBinding>;
  id: Scalars["OID"]["output"];
  isSetupFormation: Scalars["Boolean"]["output"];
  optionGroupId: Maybe<Scalars["OID"]["output"]>;
  parentServiceId: Maybe<Scalars["OID"]["output"]>;
  title: Scalars["String"]["output"];
};

export type SetFacetTargetInput = {
  categoryKey: Scalars["String"]["input"];
  categoryLabel: Scalars["String"]["input"];
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  selectedOptions: Array<Scalars["String"]["input"]>;
};

export type SetOperatorInput = {
  lastModified: Scalars["DateTime"]["input"];
  operatorId: Scalars["PHID"]["input"];
};

export type SetRecurringServicesInput = {
  lastModified: Scalars["DateTime"]["input"];
  services: Array<Scalars["String"]["input"]>;
};

export type SetSetupServicesInput = {
  lastModified: Scalars["DateTime"]["input"];
  services: Array<Scalars["String"]["input"]>;
};

export type SetTemplateIdInput = {
  id: Scalars["PHID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
};

export type SetWeightInput = {
  lastModified: Scalars["DateTime"]["input"];
  weight?: InputMaybe<Scalars["Int"]["input"]>;
};

export type TargetAudience = {
  color: Maybe<Scalars["String"]["output"]>;
  id: Scalars["OID"]["output"];
  label: Scalars["String"]["output"];
};

export type TemplateStatus = "ACTIVE" | "COMING_SOON" | "DEPRECATED" | "DRAFT";

export type UpdateContentSectionInput = {
  content?: InputMaybe<Scalars["String"]["input"]>;
  displayOrder?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["OID"]["input"];
  lastModified: Scalars["DateTime"]["input"];
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateFaqInput = {
  answer?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  question?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateOptionGroupInput = {
  defaultSelected?: InputMaybe<Scalars["Boolean"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  id: Scalars["OID"]["input"];
  isAddOn?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateServiceInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  displayOrder?: InputMaybe<Scalars["Int"]["input"]>;
  id: Scalars["OID"]["input"];
  isSetupFormation?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  optionGroupId?: InputMaybe<Scalars["OID"]["input"]>;
  parentServiceId?: InputMaybe<Scalars["OID"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTemplateInfoInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  infoLink?: InputMaybe<Scalars["URL"]["input"]>;
  lastModified: Scalars["DateTime"]["input"];
  subtitle?: InputMaybe<Scalars["String"]["input"]>;
  summary?: InputMaybe<Scalars["String"]["input"]>;
  thumbnailUrl?: InputMaybe<Scalars["URL"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateTemplateStatusInput = {
  lastModified: Scalars["DateTime"]["input"];
  status: TemplateStatus;
};
