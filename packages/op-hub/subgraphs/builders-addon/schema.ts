import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition
  """
  type Query {
    builders(filter: buildersFilter): [BuilderProfileState!]!
  }

  ## Filters

  input buildersFilter {
    id: PHID
    code: String
    name: String
    slug: String
    status: BuilderStatus
    skills: [BuilderSkill!]
    scopes: [BuilderScope!]
    networkSlug: String
    isOperator: Boolean
  }

  ## Builder Profile Schema
  type BuilderProfileState {
    id: PHID
    code: String
    slug: String
    name: String
    icon: URL
    description: String
    about: String
    lastModified: DateTime
    isOperator: Boolean!
    operationalHubMember: OpHubMember!
    contributors: [PHID!]!
    status: BuilderStatus
    skills: [BuilderSkill!]!
    scopes: [BuilderScope!]!
    links: [BuilderLink!]!
    projects: [BuilderProject!]!
    products: [BuilderProduct!]!
  }

  type OpHubMember {
    name: String
    phid: PHID
  }

  enum BuilderStatus {
    ACTIVE
    INACTIVE
    ON_HOLD
    COMPLETED
    ARCHIVED
  }

  enum BuilderSkill {
    FRONTEND_DEVELOPMENT
    BACKEND_DEVELOPMENT
    FULL_STACK_DEVELOPMENT
    DEVOPS_ENGINEERING
    SMART_CONTRACT_DEVELOPMENT
    UI_UX_DESIGN
    TECHNICAL_WRITING
    QA_TESTING
    DATA_ENGINEERING
    SECURITY_ENGINEERING
  }

  enum BuilderScope {
    ACC
    STA
    SUP
    STABILITY_SCOPE
    SUPPORT_SCOPE
    PROTOCOL_SCOPE
    GOVERNANCE_SCOPE
  }

  type BuilderLink {
    id: OID!
    url: URL!
    label: String
  }

  type Builder @key(fields: "id") {
    id: PHID
    code: String
    slug: String
    name: String!
    icon: String!
    description: String!
    lastModified: DateTime
    isOperator: Boolean!
    operationalHubMember: OpHubMember!
    contributors: [Builder!]!
    status: BuilderStatus
    skills: [BuilderSkill!]!
    scopes: [BuilderScope!]!
    links: [BuilderLink!]!
  }

  type BuilderProject {
    id: OID!
    code: String!
    title: String!
    slug: String!
    abstract: String
    imageUrl: URL
    scope: Builder_SOW_DeliverablesSet
    budgetType: SOW_BudgetType
    currency: SOW_PMCurrency
    budget: Float
    expenditure: SOW_BudgetExpenditure
  }

  type Builder_SOW_DeliverablesSet {
    deliverables: [BuilderSOW_Deliverable!]!
    status: SOW_DeliverableSetStatus!
    progress: SOW_Progress!
    deliverablesCompleted: SOW_DeliverablesCompleted!
  }

  type BuilderSOW_Deliverable {
    id: OID!
    icon: String
    title: String!
    code: String!
    description: String!
    status: SOW_DeliverableStatus!
    workProgress: SOW_Progress
    keyResults: [SOW_KeyResult!]!
    budgetAnchor: SOW_BudgetAnchorProject
  }

  enum SOW_DeliverableStatus {
    WONT_DO
    DRAFT
    TODO
    BLOCKED
    IN_PROGRESS
    DELIVERED
    CANCELED
  }

  type SOW_KeyResult {
    id: OID!
    title: String!
    link: String!
  }

  type SOW_BudgetAnchorProject {
    project: OID
    unit: SOW_Unit
    unitCost: Float!
    quantity: Float!
    margin: Float!
  }

  enum SOW_Unit {
    StoryPoints
    Hours
  }

  enum SOW_BudgetType {
    CONTINGENCY
    OPEX
    CAPEX
    OVERHEAD
  }

  enum SOW_PMCurrency {
    DAI
    USDS
    EUR
    USD
  }

  enum SOW_DeliverableSetStatus {
    DRAFT
    TODO
    IN_PROGRESS
    FINISHED
    CANCELED
  }

  type SOW_DeliverablesCompleted {
    total: Int!
    completed: Int!
  }

  type SOW_BudgetExpenditure {
    percentage: Float!
    actuals: Float!
    cap: Float!
  }

  union SOW_Progress = SOW_StoryPoint | SOW_Percentage | SOW_Binary

  type SOW_Percentage {
    value: Float!
  }
  type SOW_Binary {
    done: Boolean
  }
  type SOW_StoryPoint {
    total: Int!
    completed: Int!
  }

  # PRODUCTS #

  type BuilderProduct {
    id: PHID!
    operatorId: PHID!
    title: String!
    summary: String!
    description: String
    thumbnailUrl: URL
    infoLink: URL
    status: BTemplateStatus!
    lastModified: DateTime!
    targetAudiences: [BTargetAudience!]!
    setupServices: [String!]!
    recurringServices: [String!]!
    facetTargets: [BFacetTarget!]!
    services: [BService!]!
    optionGroups: [BOptionGroup!]!
    faqFields: [BFaqField!]
    contentSections: [BContentSection!]!
  }

  enum BTemplateStatus {
    DRAFT
    COMING_SOON
    ACTIVE
    DEPRECATED
  }

  type BTargetAudience {
    id: OID!
    label: String!
    color: String
  }

  type BFacetTarget {
    id: OID!
    categoryKey: String!
    categoryLabel: String!
    selectedOptions: [String!]!
  }

  type BService {
    id: OID!
    title: String!
    description: String
    displayOrder: Int
    parentServiceId: OID
    isSetupFormation: Boolean!
    optionGroupId: OID
    facetBindings: [BResourceFacetBinding!]!
  }

  type BResourceFacetBinding {
    id: OID!
    facetName: String!
    facetType: PHID!
    supportedOptions: [OID!]!
  }

  type BOptionGroup {
    id: OID!
    name: String!
    description: String
    isAddOn: Boolean!
    defaultSelected: Boolean!
  }

  type BFaqField {
    id: OID!
    question: String
    answer: String
    displayOrder: Int!
  }

  type BContentSection {
    id: OID!
    title: String!
    content: String!
    displayOrder: Int!
  }
`;
