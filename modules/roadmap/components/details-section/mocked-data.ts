import {
  type ScopeOfWork_Agent,
  type ScopeOfWork_Project,
  type ScopeOfWork_Deliverable,
  type ScopeOfWork_Milestone,
  ScopeOfWork_DeliverableStatus,
  ScopeOfWork_DeliverableSetStatus,
  ScopeOfWork_AgentType,
} from '@/modules/__generated__/graphql/switchboard-generated'

// Mocked contributors/agents
export const mockedContributors1: ScopeOfWork_Agent[] = [
  {
    __typename: 'ScopeOfWork_Agent',
    id: '93RF8qO5',
    name: 'Powerhouse',
    code: 'PH',
    agentType: ScopeOfWork_AgentType.Group,
  },
  {
    __typename: 'ScopeOfWork_Agent',
    id: '0454KB3p',
    name: 'Prometheus',
    code: 'Prometheus',
    agentType: ScopeOfWork_AgentType.Human,
  },
  {
    __typename: 'ScopeOfWork_Agent',
    id: '5Q4UrTDg',
    name: 'teep',
    code: 'teep',
    agentType: ScopeOfWork_AgentType.Human,
  },
  {
    __typename: 'ScopeOfWork_Agent',
    id: '11F2ho3q',
    name: 'meraki',
    code: 'meraki',
    agentType: ScopeOfWork_AgentType.Human,
  },
  {
    __typename: 'ScopeOfWork_Agent',
    id: 'p7026973',
    name: 'callmeT',
    code: 'callmeT',
    agentType: ScopeOfWork_AgentType.Human,
  },
]

// Mocked projects
export const mockedProjects1: ScopeOfWork_Project[] = [
  {
    __typename: 'ScopeOfWork_Project',
    id: 'rwa-project',
    code: 'RWA',
    title: 'RWA Portfolio Reporting',
    abstract: 'Real World Assets Portfolio Reporting project',
    budget: 100000,
    budgetType: null,
    currency: null,
    expenditure: null,
    imageUrl: null,
    projectOwner: '93RF8qO5',
    scope: null,
  },
  {
    __typename: 'ScopeOfWork_Project',
    id: 'php-project',
    code: 'PHP',
    title: 'Powerhouse Products POC',
    abstract: 'Powerhouse Products Proof of Concept',
    budget: 150000,
    budgetType: null,
    currency: null,
    expenditure: null,
    imageUrl: null,
    projectOwner: '93RF8qO5',
    scope: null,
  },
  {
    __typename: 'ScopeOfWork_Project',
    id: 'pea-project',
    code: 'PEA',
    title: 'Protocol Expense Accounting',
    abstract: 'Protocol Expense Accounting project',
    budget: 80000,
    budgetType: null,
    currency: null,
    expenditure: null,
    imageUrl: null,
    projectOwner: '93RF8qO5',
    scope: null,
  },
]

// Mocked deliverables
export const mockedDeliverables1: ScopeOfWork_Deliverable[] = [
  {
    __typename: 'ScopeOfWork_Deliverable',
    id: 'oy69oibt04',
    code: 'POC1',
    title: 'First technical integration of RWA Portfolio (Connect & Switchboard)',
    description:
      'Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard.',
    status: ScopeOfWork_DeliverableStatus.Delivered,
    owner: '93RF8qO5',
    keyResults: [
      {
        __typename: 'ScopeOfWork_KeyResult',
        id: 'e9FdAg63',
        title: 'RWA Conceptual Wireframes',
        link: 'https://drive.google.com/file/d/1NZXm_Q43sKH5pqwHTwN0DYvSW1uewMlY/view',
      },
      {
        __typename: 'ScopeOfWork_KeyResult',
        id: '710Ed212',
        title: 'First demo of RWA Portfolio - Feb 21',
        link: 'https://drive.google.com/file/d/1CMwePiR046IJqQGLypi7Fzu_B7aLYNco/view',
      },
    ],
    workProgress: {
      __typename: 'ScopeOfWork_Percentage',
      value: 1,
    },
    budgetAnchor: {
      __typename: 'ScopeOfWork_BudgetAnchorProject',
      project: 'rwa-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 100000,
      unit: null,
    },
  },
  {
    __typename: 'ScopeOfWork_Deliverable',
    id: 'oy69oibt03',
    code: 'POC2',
    title: 'Integration (API endpoints and Queries)',
    description:
      'Switchboard API endpoints for integration partners with document model update events and document state queries.',
    status: ScopeOfWork_DeliverableStatus.Delivered,
    owner: '93RF8qO5',
    keyResults: [
      {
        __typename: 'ScopeOfWork_KeyResult',
        id: 'Zmb1aoqR',
        title: 'Source code (Powerhouse repo)',
        link: 'https://github.com/powerhouse-inc/',
      },
      {
        __typename: 'ScopeOfWork_KeyResult',
        id: '9p92yM7X',
        title: 'Source code (SES repo)',
        link: 'https://github.com/makerdao-ses',
      },
    ],
    workProgress: {
      __typename: 'ScopeOfWork_Percentage',
      value: 1,
    },
    budgetAnchor: {
      __typename: 'ScopeOfWork_BudgetAnchorProject',
      project: 'php-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 150000,
      unit: null,
    },
  },
  {
    __typename: 'ScopeOfWork_Deliverable',
    id: 'oy69oibt02',
    code: 'POC3',
    title: 'Expense dashboard increments (on-chain data, budget breakdowns)',
    description:
      'Separate incremental release of the Sky Ecosystem expenses platform with on-chain transactional data and budget breakdown views.',
    status: ScopeOfWork_DeliverableStatus.Delivered,
    owner: '93RF8qO5',
    keyResults: [
      {
        __typename: 'ScopeOfWork_KeyResult',
        id: '7E7cp06j',
        title: 'Expense Dashboard deployment v0.33.0',
        link: 'https://github.com/makerdao-ses/ecosystem-dashboard/releases/tag/v0.33.0',
      },
    ],
    workProgress: {
      __typename: 'ScopeOfWork_Percentage',
      value: 1,
    },
    budgetAnchor: {
      __typename: 'ScopeOfWork_BudgetAnchorProject',
      project: 'pea-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 80000,
      unit: null,
    },
  },
]

// Mocked milestone
export const mockedMilestone1: ScopeOfWork_Milestone = {
  __typename: 'ScopeOfWork_Milestone',
  id: 'ustpb52jla',
  sequenceCode: 'PH01',
  title: 'Decentralized Operations Platform - POC',
  description:
    'Roadmap milestone: Decentralized Operations Platform - Proof of Concept. Milestone 1, set for March 1, marks the initial phase of Powerhouse Decentralized Operations Platform. Deliverables include: Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard; Switchboard API endpoints for integration partners with document model update events and document state queries; and Switchboard API endpoints for integration partners with document model update events and document state queries.',
  deliveryTarget: '2024-03-01T00:00:00.000Z',
  budget: 330000,
  coordinators: ['Prometheus', 'callmeT', 'meraki', 'Lumen', 'Kilgore', 'Layer0x'],
  scope: {
    __typename: 'ScopeOfWork_DeliverablesSet',
    deliverables: ['oy69oibt04', 'oy69oibt03', 'oy69oibt02'],
    status: ScopeOfWork_DeliverableSetStatus.Finished,
    deliverablesCompleted: {
      __typename: 'ScopeOfWork_DeliverablesCompleted',
      completed: 3,
      total: 3,
    },
    progress: {
      __typename: 'ScopeOfWork_Percentage',
      value: 1,
    },
  },
}
