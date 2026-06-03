import type { DocumentModelGlobalState } from "document-model";

export const documentModel: DocumentModelGlobalState = {
  id: "powerhouse/scopeofwork",
  name: "ScopeOfWork",
  author: {
    name: "Powerhouse",
    website: "https://powerhouse.inc",
  },
  extension: "",
  description:
    "The Scope of Work model defines a structured plan for executing contributor work; on top of deliverables and roadmaps with milestones it now also includes projects as budget anchors for project based budgeting",
  specifications: [
    {
      state: {
        local: {
          schema: "",
          examples: [],
          initialValue: "",
        },
        global: {
          schema:
            "type ScopeOfWorkState {\n  title: String!\n  description: String!\n  status: ScopeOfWorkStatus!\n  deliverables: [Deliverable!]!\n  projects: [Project!]!\n  roadmaps: [Roadmap!]!\n  contributors: [Agent!]!\n}\n\nenum ScopeOfWorkStatus {\n  DRAFT\n  SUBMITTED\n  IN_PROGRESS\n  REJECTED\n  APPROVED\n  DELIVERED\n  CANCELED\n}\n\ntype Agent {\n  id: PHID!\n  name: String!\n  icon: URL\n  description: String\n}\n\ntype Deliverable {\n  id: OID!\n  owner: ID\n  icon: String\n  title: String!\n  code: String!\n  description: String!\n  status: DeliverableStatus!\n  workProgress: Progress\n  keyResults: [KeyResult!]!\n  budgetAnchor: BudgetAnchorProject\n}\n\ntype BudgetAnchorProject {\n  project: OID\n  unit: Unit\n  unitCost: Float!\n  quantity: Float!\n  margin: Float!\n}\n\nenum Unit {\n  StoryPoints\n  Hours\n}\n\nenum DeliverableStatus {\n  WONT_DO\n  DRAFT\n  TODO\n  BLOCKED\n  IN_PROGRESS\n  DELIVERED\n  CANCELED\n}\n\ntype Progress {\n  value: Float\n  done: Boolean\n  total: Int\n  completed: Int\n}\n\ntype KeyResult {\n  id: OID!\n  title: String!\n  link: String!\n}\n\ntype Project {\n  id: OID!\n  slug: String!\n  code: String!\n  title: String!\n  projectOwner: ID\n  abstract: String\n  imageUrl: URL\n  scope: DeliverablesSet\n  budgetType: BudgetType\n  currency: PMCurrency\n  budget: Float\n  expenditure: BudgetExpenditure\n}\n\nenum PMCurrency {\n  DAI\n  USDS\n  EUR\n  USD\n}\n\nenum BudgetType {\n  CONTINGENCY\n  OPEX\n  CAPEX\n  OVERHEAD\n}\n\ntype BudgetExpenditure {\n  percentage: Float!\n  actuals: Float!\n  cap: Float!\n}\n\ntype Roadmap {\n  id: OID!\n  slug: String!\n  title: String!\n  description: String!\n  milestones: [Milestone!]!\n}\n\ntype Milestone {\n  id: OID!\n  sequenceCode: String!\n  title: String!\n  description: String!\n  deliveryTarget: String!\n  scope: DeliverablesSet\n  coordinators: [ID!]!\n  budget: Float\n}\n\ntype DeliverablesSet {\n  deliverables: [OID!]!\n  status: DeliverableSetStatus!\n  progress: Progress!\n  deliverablesCompleted: DeliverablesCompleted!\n}\n\ntype DeliverablesCompleted {\n  total: Int!\n  completed: Int!\n}\n\nenum DeliverableSetStatus {\n  DRAFT\n  TODO\n  IN_PROGRESS\n  FINISHED\n  CANCELED\n}",
          examples: [],
          initialValue:
            '{\n  "title": "Scope of Work",\n  "description": "The Scope of Work model defines a structured plan for executing contributor work; on top of deliverables and roadmaps with milestones it now also includes projects as budget anchors for project based budgeting.",\n  "status": "DRAFT",\n  "deliverables": [],\n  "projects": [],\n  "roadmaps": [],\n  "contributors": []\n}',
        },
      },
      modules: [
        {
          id: "mod-scope-of-work",
          name: "scope_of_work",
          description: "",
          operations: [
            {
              id: "op-edit-scope-of-work",
              name: "EDIT_SCOPE_OF_WORK",
              description:
                "This operation allows a user to edit the basic details of a Scope of Work (SoW) document.",
              schema:
                "input EditScopeOfWorkInput {\n    title: String\n    description: String\n\tstatus: ScopeOfWorkStatusInput\n}\n\nenum ScopeOfWorkStatusInput {\n  DRAFT\n  SUBMITTED\n  IN_PROGRESS\n  REJECTED\n  APPROVED\n  DELIVERED\n  CANCELED\n}",
              template:
                "This operation allows a user to edit the basic details of a Scope of Work (SoW) document.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-deliverables",
          name: "deliverables",
          description: "",
          operations: [
            {
              id: "op-add-deliverable",
              name: "ADD_DELIVERABLE",
              description:
                "This operation is used to create a new deliverable.",
              schema:
                "input AddDeliverableInput {\n  id: OID!\n  owner: ID\n  title: String\n  code: String\n  description: String\n  status: PMDeliverableStatusInput\n}\n\nenum PMDeliverableStatusInput {\n  WONT_DO\n  DRAFT\n  TODO\n  BLOCKED\n  IN_PROGRESS\n  DELIVERED\n  CANCELED\n}",
              template: "This operation is used to create a new deliverable.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-deliverable",
              name: "REMOVE_DELIVERABLE",
              description: "",
              schema: "input RemoveDeliverableInput {\n  id: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-edit-deliverable",
              name: "EDIT_DELIVERABLE",
              description:
                "This operation allows a user to edit the core attributes of a deliverable, a concrete piece of work within a project or a milestone. Deliverables are the building blocks of execution, typically assigned to contributors or teams.",
              schema:
                "input EditDeliverableInput {\n  id: OID!\n  owner: ID\n  icon: String\n  title: String\n  code: String\n  description: String\n  status: PMDeliverableStatusInput\n}",
              template:
                "This operation allows a user to edit the core attributes of a deliverable, a concrete piece of work within a project or a milestone. Deliverables are the building blocks of execution, typically assigned to contributors or teams.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-deliverable-progress",
              name: "SET_DELIVERABLE_PROGRESS",
              description: "",
              schema:
                "input SetDeliverableProgressInput {\n  id: OID!\n  workProgress: ProgressInput\n}\n\ninput ProgressInput {\n  percentage: Float\n  storyPoints: StoryPointInput\n  done: Boolean\n}\n\ninput StoryPointInput {\n  total: Int!\n  completed: Int!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-key-result",
              name: "ADD_KEY_RESULT",
              description:
                "This operation allows a user to add a key result to a specific deliverable. Key results are measurable outcomes or indicators that help track progress on a deliverable.",
              schema:
                "input AddKeyResultInput {\n  id: OID!\n  deliverableId: OID!\n  title: String!\n  link: String\n}",
              template:
                "This operation allows a user to add a key result to a specific deliverable. Key results are measurable outcomes or indicators that help track progress on a deliverable.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-key-result",
              name: "REMOVE_KEY_RESULT",
              description: "",
              schema:
                "input RemoveKeyResultInput {\n  id: OID!\n  deliverableId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-edit-key-result",
              name: "EDIT_KEY_RESULT",
              description: "",
              schema:
                "input EditKeyResultInput {\n  id: OID!\n  deliverableId: OID!\n  title: String\n  link: URL\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-deliverable-budget-anchor",
              name: "SET_DELIVERABLE_BUDGET_ANCHOR_PROJECT",
              description: "",
              schema:
                "input SetDeliverableBudgetAnchorProjectInput {\n  deliverableId: ID!\n  project: OID\n  unit: Unit\n  unitCost: Float\n  quantity: Float\n  margin: Float\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-roadmaps",
          name: "roadmaps",
          description: "",
          operations: [
            {
              id: "op-add-roadmap",
              name: "ADD_ROADMAP",
              description: "",
              schema:
                "input AddRoadmapInput {\n  id: OID!\n  title: String!\n  slug: String\n  description: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-roadmap",
              name: "REMOVE_ROADMAP",
              description: "",
              schema: "input RemoveRoadmapInput {\n  id: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-edit-roadmap",
              name: "EDIT_ROADMAP",
              description:
                "This operation allows a user to edit the details of a roadmap document, which outlines the structure",
              schema:
                "input EditRoadmapInput {\n  id: OID!\n  title: String\n  slug: String\n  description: String\n}",
              template:
                "This operation allows a user to edit the details of a roadmap document, which outlines the structure",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-milestones",
          name: "milestones",
          description: "",
          operations: [
            {
              id: "op-add-milestone",
              name: "ADD_MILESTONE",
              description: "",
              schema:
                "input AddMilestoneInput {\n  id: OID!\n  roadmapId: OID!\n  sequenceCode: String\n  title: String\n  description: String\n  deliveryTarget: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-milestone",
              name: "REMOVE_MILESTONE",
              description: "",
              schema:
                "input RemoveMilestoneInput {\n  id: OID!\n  roadmapId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-edit-milestone",
              name: "EDIT_MILESTONE",
              description: "",
              schema:
                "input EditMilestoneInput {\n  id: OID!\n  roadmapId: OID!\n  sequenceCode: String\n  title: String\n  description: String\n  deliveryTarget: String\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-coordinator",
              name: "ADD_COORDINATOR",
              description:
                "This operation allows a user to assign a contributor as a coordinator for a specific milestone. Coordinators are the people responsible for ensuring the milestone gets delivered; they're often leads, facilitators, or project managers.",
              schema:
                "input AddCoordinatorInput {\n  id: ID!\n  milestoneId: OID!\n}",
              template:
                "This operation allows a user to assign a contributor as a coordinator for a specific milestone. Coordinators are the people responsible for ensuring the milestone gets delivered; they're often leads, facilitators, or project managers.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-coordinator",
              name: "REMOVE_COORDINATOR",
              description: "",
              schema:
                "input RemoveCoordinatorInput {\n  id: ID!\n  milestoneId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-milestone-deliverable",
              name: "ADD_MILESTONE_DELIVERABLE",
              description: "",
              schema:
                "input AddMilestoneDeliverableInput {\n  milestoneId: OID!\n  deliverableId: OID!\n  title: String!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-milestone-deliverable",
              name: "REMOVE_MILESTONE_DELIVERABLE",
              description: "",
              schema:
                "input RemoveMilestoneDeliverableInput {\n  milestoneId: OID!\n  deliverableId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-deliverables-set",
          name: "deliverables_set",
          description: "",
          operations: [
            {
              id: "op-edit-deliverables-set",
              name: "EDIT_DELIVERABLES_SET",
              description: "",
              schema:
                "input EditDeliverablesSetInput {\n  milestoneId: ID\n  projectId: ID\n  status: DeliverableSetStatusInput\n  deliverablesCompleted: DeliverablesCompletedInput\n}\n\nenum DeliverableSetStatusInput {\n  DRAFT\n  TODO\n  IN_PROGRESS\n  FINISHED\n  CANCELED\n}\n\ninput DeliverablesCompletedInput {\n  total: Int!\n  completed: Int!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-deliverable-in-set",
              name: "ADD_DELIVERABLE_IN_SET",
              description: "",
              schema:
                "input AddDeliverableInSetInput {\n  milestoneId: ID\n  projectId: ID\n  deliverableId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-deliverable-in-set",
              name: "REMOVE_DELIVERABLE_IN_SET",
              description: "",
              schema:
                "input RemoveDeliverableInSetInput {\n  milestoneId: ID\n  projectId: ID\n  deliverableId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-contributors",
          name: "contributors",
          description: "",
          operations: [
            {
              id: "op-add-agent",
              name: "ADD_AGENT",
              description: "",
              schema:
                "input AddAgentInput {\n  id: PHID!\n  name: String!\n  icon: URL\n  description: String\n}",
              template: "",
              reducer:
                "// Check if agent with same ID already exists\nconst existingAgent = state.contributors.find(agent => agent.id === action.input.id);\nif (existingAgent) {\n  throw new AgentDuplicateIdError(`Agent with ID ${action.input.id} already exists`);\n}\n\n// Create new agent with correct structure matching GraphQL schema\nconst agent = {\n  id: action.input.id,\n  name: action.input.name,\n  icon: action.input.icon || null,\n  description: action.input.description || null,\n};\n\nstate.contributors.push(agent);",
              errors: [
                {
                  id: "err-agent-duplicate-id",
                  name: "AgentDuplicateIdError",
                  code: "AGENT_DUPLICATE_ID",
                  description: "An agent with the specified ID already exists",
                  template: "",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-agent",
              name: "REMOVE_AGENT",
              description: "",
              schema: "input RemoveAgentInput {\n  id: PHID!\n}",
              template: "",
              reducer:
                "// Find agent by ID\nconst agentIndex = state.contributors.findIndex(agent => agent.id === action.input.id);\nif (agentIndex === -1) {\n  throw new AgentNotFoundError(`Agent with ID ${action.input.id} not found`);\n}\n\n// Remove agent from contributors array\nstate.contributors.splice(agentIndex, 1);",
              errors: [
                {
                  id: "err-agent-not-found-remove",
                  name: "AgentNotFoundError",
                  code: "AGENT_NOT_FOUND",
                  description: "The specified agent was not found",
                  template: "Agent with ID ${id} not found",
                },
              ],
              examples: [],
              scope: "global",
            },
            {
              id: "op-edit-agent",
              name: "EDIT_AGENT",
              description: "",
              schema:
                "input EditAgentInput {\n  id: PHID!\n  name: String\n  icon: URL\n  description: String\n}",
              template: "",
              reducer:
                "// Find agent by ID\nconst agentIndex = state.contributors.findIndex(agent => agent.id === action.input.id);\nif (agentIndex === -1) {\n  throw new AgentNotFoundError(`Agent with ID ${action.input.id} not found`);\n}\n\n// Update agent with provided fields, preserving existing values for optional fields\nconst existingAgent = state.contributors[agentIndex];\nconst updatedAgent = {\n  ...existingAgent,\n  name: action.input.name !== undefined ? action.input.name : existingAgent.name,\n  icon: action.input.icon !== undefined ? action.input.icon : existingAgent.icon,\n  description: action.input.description !== undefined ? action.input.description : existingAgent.description,\n};\n\nstate.contributors[agentIndex] = updatedAgent;",
              errors: [
                {
                  id: "err-agent-not-found-edit",
                  name: "AgentNotFoundError",
                  code: "AGENT_NOT_FOUND",
                  description: "The specified agent was not found",
                  template: "Agent with ID ${id} not found",
                },
              ],
              examples: [],
              scope: "global",
            },
          ],
        },
        {
          id: "mod-projects",
          name: "projects",
          description: "",
          operations: [
            {
              id: "op-add-project",
              name: "ADD_PROJECT",
              description:
                "Creates a new project in a DRAFT status, initializing its core fields. The status of the new project defaults to DRAFT. The Deliverables list (scope) is initialized as empty.",
              schema:
                "input AddProjectInput {\n  id: OID!\n  code: String!\n  title: String!\n  slug: String\n  projectOwner: ID\n  abstract: String\n  imageUrl: URL\n  budgetType: PMBudgetTypeInput\n  currency: PMCurrencyInput\n  budget: Float\n}\n\nenum PMBudgetTypeInput {\n  CONTINGENCY\n  OPEX\n  CAPEX\n  OVERHEAD\n}\n\nenum PMCurrencyInput {\n  DAI\n  USDS\n  EUR\n  USD\n}",
              template:
                "Creates a new project in a DRAFT status, initializing its core fields. The status of the new project defaults to DRAFT. The Deliverables list (scope) is initialized as empty.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-project",
              name: "UPDATE_PROJECT",
              description:
                "Updates general, non-status-related fields of an existing project. This operation is for minor content adjustments. Project must exist; only allowed if the project status is DRAFT or REJECTED. For projects in other statuses, specific operations for status transitions or scope management should be used.\n\nIf code is updated, it must remain unique.",
              schema:
                "input UpdateProjectInput {\n  id: OID!\n  code: String\n  slug: String\n  title: String\n  abstract: String\n  imageUrl: URL\n  budgetType: PMBudgetTypeInput\n  currency: PMCurrencyInput\n  budget: Float\n}",
              template:
                "Updates general, non-status-related fields of an existing project. This operation is for minor content adjustments. Project must exist; only allowed if the project status is DRAFT or REJECTED. For projects in other statuses, specific operations for status transitions or scope management should be used.\n\nIf code is updated, it must remain unique.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-update-project-owner",
              name: "UPDATE_PROJECT_OWNER",
              description:
                "Changes the primary owner of a project. This is a specific update due to its potential impact on permissions and responsibilities.",
              schema:
                "input UpdateProjectOwnerInput {\n  id: OID!\n  projectOwner: ID!\n}",
              template:
                "Changes the primary owner of a project. This is a specific update due to its potential impact on permissions and responsibilities. Project must exist. The projectOwner must correspond to a valid existing Agent.",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-project",
              name: "REMOVE_PROJECT",
              description: "",
              schema: "input RemoveProjectInput {\n  projectId: ID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-project-margin",
              name: "SET_PROJECT_MARGIN",
              description: "",
              schema:
                "input SetProjectMarginInput {\n  projectId: OID!\n  margin: Float!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-set-project-total-budget",
              name: "SET_PROJECT_TOTAL_BUDGET",
              description: "",
              schema:
                "input SetProjectTotalBudgetInput {\n  projectId: OID!\n  totalBudget: Float!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-add-project-deliverable",
              name: "ADD_PROJECT_DELIVERABLE",
              description: "",
              schema:
                "input AddProjectDeliverableInput {\n  projectId: OID!\n  deliverableId: ID!\n  title: String!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
            {
              id: "op-remove-project-deliverable",
              name: "REMOVE_PROJECT_DELIVERABLE",
              description: "",
              schema:
                "input RemoveProjectDeliverableInput {\n  projectId: OID!\n  deliverableId: OID!\n}",
              template: "",
              reducer: "",
              errors: [],
              examples: [],
              scope: "global",
            },
          ],
        },
      ],
      version: 1,
      changeLog: [],
    },
  ],
};
