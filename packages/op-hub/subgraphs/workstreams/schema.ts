import { gql } from "graphql-tag";
import type { DocumentNode } from "graphql";

export const schema: DocumentNode = gql`
  """
  Subgraph definition
  """
  type Query {
    processorWorkstreams: [ProcessorWorkstream!]!
    workstream(filter: WorkstreamFilter!): [FullQueryWorkstream!]!
    workstreams(filter: WorkstreamsFilter): [FullQueryWorkstream!]!
    rfpByWorkstream(filter: WorkstreamFilter!): [WorkstreamRfp!]!
    scopeOfWorkByNetworkOrStatus(
      filter: scopeOfWorkByNetworkOrStatusFilter!
    ): [SOW_ScopeOfWorkState!]!
  }

  type ProcessorWorkstream {
    network_phid: PHID
    network_slug: String
    workstream_phid: PHID
    workstream_slug: String
    workstream_title: String
    workstream_status: WorkstreamStatus
    sow_phid: PHID
    final_milestone_target: DateTime
    initial_proposal_status: ProposalStatus
    initial_proposal_author: PHID
  }

  enum WorkstreamStatus {
    RFP_DRAFT
    PREWORK_RFC
    RFP_CANCELLED
    OPEN_FOR_PROPOSALS
    PROPOSAL_SUBMITTED
    NOT_AWARDED
    AWARDED
    IN_PROGRESS
    FINISHED
  }

  enum RFPStatus {
    DRAFT
    REQUEST_FOR_COMMMENTS
    CANCELED
    OPEN_FOR_PROPOSALS
    AWARDED
    NOT_AWARDED
    CLOSED
  }

  enum ProposalStatus {
    DRAFT
    SUBMITTED
    ACCEPTED
    REJECTED
  }

  """
  Filter to fetch a single workstream
  """
  input WorkstreamFilter {
    workstreamId: PHID
    workstreamSlug: String
    networkId: PHID
    networkSlug: String
    networkName: String
    workstreamStatus: WorkstreamStatus
    workstreamStatuses: [WorkstreamStatus!]
  }

  input WorkstreamsFilter {
    networkId: PHID
    networkSlug: String
    networkName: String
    networkNames: [String!]
    workstreamTitle: String
    workstreamStatus: WorkstreamStatus
    workstreamStatuses: [WorkstreamStatus!]
  }

  input scopeOfWorkByNetworkOrStatusFilter {
    networkId: PHID
    networkSlug: String
    networkName: String
    workstreamId: PHID
    workstreamSlug: String
    workstreamStatus: WorkstreamStatus
    proposalRole: ProposalRole
  }

  enum ProposalRole {
    INITIAL
    ALTERNATIVE
    AWARDED
  }

  """
  Detailed Workstream hydrated from DB + documents
  """
  type FullQueryWorkstream {
    code: String
    title: String
    slug: String
    status: WorkstreamStatus
    client: ClientInfo
    network: Network
    rfp: RFP
    initialProposal: FullProposal
    alternativeProposals: [FullProposal!]!
    sow: SOW_ScopeOfWorkState
    paymentTerms: PT_PaymentTermsState
    paymentRequests: [PHID!]!
  }

  type Network {
    name: String
    slug: String
    icon: String
    darkThemeIcon: String
    logo: String
    darkThemeLogo: String
    logoBig: String
    website: String
    description: String
    category: [NetworkCategory!]
    x: String
    github: String
    discord: String
    youtube: String
  }

  enum NetworkCategory {
    DEFI
    OSS
    CRYPTO
    NGO
    CHARITY
  }

  type WorkstreamRfp {
    code: String
    title: String
    status: WorkstreamStatus
    rfp: RFP
  }

  type ClientInfo {
    id: PHID!
    name: String
    icon: URL
  }

  type RFP {
    id: PHID!
    code: String
    title: String
    status: RFPStatus
    summary: String
    submissionDeadline: DateTime
    budgetMin: Float
    budgetMax: Float
    budgetCurrency: String
    eligibilityCriteria: String
    evaluationCriteria: String
    briefing: String
  }

  type ProposalAuthor {
    id: PHID!
    name: String
    icon: URL
  }

  # Must match type from Workstream subgraph to compose
  type Proposal {
    id: OID!
    sow: PHID
    paymentTerms: PHID
    status: ProposalStatus!
    author: ProposalAuthor!
  }

  type LinkedDocument {
    id: PHID!
    stateJSON: JSONObject
  }

  # ==========================
  # ScopeOfWork (typed schema)
  # ==========================
  type SOW_ScopeOfWorkState {
    title: String!
    description: String!
    status: SOW_ScopeOfWorkStatus!
    deliverables: [SOW_Deliverable!]!
    projects: [SOW_Project!]!
    roadmaps: [SOW_Roadmap!]!
    contributors: [Builder!]!
  }

  enum SOW_ScopeOfWorkStatus {
    DRAFT
    SUBMITTED
    IN_PROGRESS
    REJECTED
    APPROVED
    DELIVERED
    CANCELED
  }

  type SOW_Agent {
    id: PHID!
    name: String!
    icon: URL
    description: String
  }

  type SOW_Deliverable {
    id: OID!
    owner: Builder
    icon: String
    title: String!
    code: String!
    description: String!
    status: SOW_DeliverableStatus!
    workProgress: SOW_Progress
    keyResults: [SOW_KeyResult!]!
    budgetAnchor: SOW_BudgetAnchorProject
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

  enum SOW_DeliverableStatus {
    WONT_DO
    DRAFT
    TODO
    BLOCKED
    IN_PROGRESS
    DELIVERED
    CANCELED
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

  type SOW_KeyResult {
    id: OID!
    title: String!
    link: String!
  }

  type SOW_Project {
    id: OID!
    code: String!
    title: String!
    slug: String!
    projectOwner: Builder
    abstract: String
    imageUrl: URL
    scope: SOW_DeliverablesSet
    budgetType: SOW_BudgetType
    currency: SOW_PMCurrency
    budget: Float
    expenditure: SOW_BudgetExpenditure
  }

  enum SOW_PMCurrency {
    DAI
    USDS
    EUR
    USD
  }
  enum SOW_BudgetType {
    CONTINGENCY
    OPEX
    CAPEX
    OVERHEAD
  }

  type SOW_BudgetExpenditure {
    percentage: Float!
    actuals: Float!
    cap: Float!
  }

  type SOW_Roadmap {
    id: OID!
    slug: String!
    title: String!
    description: String!
    milestones: [SOW_Milestone!]!
  }

  type SOW_Milestone {
    id: OID!
    sequenceCode: String!
    title: String!
    description: String!
    deliveryTarget: String!
    scope: SOW_DeliverablesSet
    coordinators: [ID!]!
    budget: Float
  }

  type SOW_DeliverablesSet {
    deliverables: [OID!]!
    status: SOW_DeliverableSetStatus!
    progress: SOW_Progress!
    deliverablesCompleted: SOW_DeliverablesCompleted!
  }

  type SOW_DeliverablesCompleted {
    total: Int!
    completed: Int!
  }
  enum SOW_DeliverableSetStatus {
    DRAFT
    TODO
    IN_PROGRESS
    FINISHED
    CANCELED
  }

  # ==========================
  # Payment Terms (typed)
  # ==========================
  enum PT_PaymentTermsStatus {
    DRAFT
    SUBMITTED
    ACCEPTED
    CANCELLED
  }
  enum PT_PaymentCurrency {
    USD
    EUR
    GBP
  }
  enum PT_PaymentModel {
    MILESTONE
    COST_AND_MATERIALS
    RETAINER
  }
  enum PT_MilestonePayoutStatus {
    PENDING
    READY_FOR_REVIEW
    APPROVED
    PAID
    REJECTED
  }
  enum PT_BillingFrequency {
    WEEKLY
    BIWEEKLY
    MONTHLY
  }
  enum PT_EvaluationFrequency {
    WEEKLY
    MONTHLY
    PER_MILESTONE
  }

  type PT_Milestone {
    id: OID!
    name: String!
    amount: Amount!
    expectedCompletionDate: Date
    requiresApproval: Boolean!
    payoutStatus: PT_MilestonePayoutStatus!
  }
  type PT_CostAndMaterials {
    hourlyRate: Amount
    variableCap: Amount
    billingFrequency: PT_BillingFrequency!
    timesheetRequired: Boolean!
  }
  type PT_Retainer {
    retainerAmount: Amount!
    billingFrequency: PT_BillingFrequency!
    startDate: Date!
    endDate: Date
    autoRenew: Boolean!
    servicesIncluded: String!
  }
  type PT_Escrow {
    amountHeld: Amount!
    proofOfFundsDocumentId: String
    releaseConditions: String!
    escrowProvider: String
  }
  type PT_EvaluationTerms {
    evaluationFrequency: PT_EvaluationFrequency!
    evaluatorTeam: String!
    criteria: [String!]!
    impactsPayout: Boolean!
    impactsReputation: Boolean!
    commentsVisibleToClient: Boolean!
  }
  type PT_BonusClause {
    id: OID!
    condition: String!
    bonusAmount: Amount!
    comment: String
  }
  type PT_PenaltyClause {
    id: OID!
    condition: String!
    deductionAmount: Amount!
    comment: String
  }

  type PT_PaymentTermsState {
    status: PT_PaymentTermsStatus!
    proposer: String!
    payer: String!
    currency: PT_PaymentCurrency!
    paymentModel: PT_PaymentModel!
    totalAmount: Amount
    milestoneSchedule: [PT_Milestone!]!
    costAndMaterials: PT_CostAndMaterials
    retainerDetails: PT_Retainer
    escrowDetails: PT_Escrow
    evaluation: PT_EvaluationTerms
    bonusClauses: [PT_BonusClause!]!
    penaltyClauses: [PT_PenaltyClause!]!
  }

  # ==========================
  # Full Proposal (typed links)
  # ==========================
  type FullProposal {
    id: OID!
    status: ProposalStatus!
    author: ProposalAuthor!
    sow: SOW_ScopeOfWorkState
    paymentTerms: PT_PaymentTermsState
  }

  # ==========================
  # Builder (typed)
  # ==========================
  type Builder {
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
`;
