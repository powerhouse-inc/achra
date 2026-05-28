import {
  type ScopeOfWorkQuery,
  type Sow_Agent,
  type Sow_Deliverable,
  Sow_DeliverableSetStatus,
  Sow_DeliverableStatus,
  type Sow_Milestone,
  type Sow_Project,
  type Sow_Roadmap,
  type Sow_ScopeOfWorkState,
  Sow_ScopeOfWorkStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'

// Mocked contributors/agents
export const mockedContributors: Sow_Agent[] = [
  {
    __typename: 'SOW_Agent',
    id: '93RF8qO5',
    name: 'Powerhouse',
  },
  {
    __typename: 'SOW_Agent',
    id: '0454KB3p',
    name: 'Prometheus',
  },
  {
    __typename: 'SOW_Agent',
    id: '5Q4UrTDg',
    name: 'teep',
  },
  {
    __typename: 'SOW_Agent',
    id: '11F2ho3q',
    name: 'meraki',
  },
  {
    __typename: 'SOW_Agent',
    id: 'p7026973',
    name: 'callmeT',
  },
]

// Mocked projects
export const mockedProjects: Sow_Project[] = [
  {
    __typename: 'SOW_Project',
    id: 'rwa-project',
    code: 'RWA',
    title: 'RWA Portfolio Reporting',
    abstract: 'Real World Assets Portfolio Reporting project',
    budget: 100000,
    budgetType: null,
    currency: null,
    expenditure: null,
    imageUrl: null,
    projectOwner: { id: '93RF8qO5' } as unknown as Sow_Project['projectOwner'],
    scope: null,
    slug: 'rwa-project',
  },
  {
    __typename: 'SOW_Project',
    id: 'php-project',
    code: 'PHP',
    title: 'Powerhouse Products POC',
    abstract: 'Powerhouse Products Proof of Concept',
    budget: 150000,
    budgetType: null,
    currency: null,
    expenditure: null,
    imageUrl: null,
    projectOwner: { id: '93RF8qO5' } as unknown as Sow_Project['projectOwner'],
    scope: null,
    slug: 'php-project',
  },
  {
    __typename: 'SOW_Project',
    id: 'pea-project',
    code: 'PEA',
    title: 'Protocol Expense Accounting',
    abstract: 'Protocol Expense Accounting project',
    budget: 80000,
    budgetType: null,
    currency: null,
    expenditure: null,
    imageUrl: null,
    projectOwner: { id: '93RF8qO5' } as unknown as Sow_Project['projectOwner'],
    scope: null,
    slug: 'pea-project',
  },
]

// Mocked deliverables
export const mockedDeliverables: Sow_Deliverable[] = [
  {
    __typename: 'SOW_Deliverable',
    id: 'oy69oibt04',
    code: 'POC1',
    title: 'First technical integration of RWA Portfolio (Connect & Switchboard)',
    description:
      'Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard.',
    status: Sow_DeliverableStatus.Delivered,
    owner: { id: '93RF8qO5' } as unknown as Sow_Deliverable['owner'],
    keyResults: [
      {
        __typename: 'SOW_KeyResult',
        id: 'e9FdAg63',
        title: 'RWA Conceptual Wireframes',
        link: 'https://drive.google.com/file/d/1NZXm_Q43sKH5pqwHTwN0DYvSW1uewMlY/view',
      },
      {
        __typename: 'SOW_KeyResult',
        id: '710Ed212',
        title: 'First demo of RWA Portfolio - Feb 21',
        link: 'https://drive.google.com/file/d/1CMwePiR046IJqQGLypi7Fzu_B7aLYNco/view',
      },
    ],
    workProgress: {
      __typename: 'SOW_Percentage',
      value: 1,
    },
    budgetAnchor: {
      __typename: 'SOW_BudgetAnchorProject',
      project: 'rwa-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 100000,
      unit: null,
    },
  },
  {
    __typename: 'SOW_Deliverable',
    id: 'oy69oibt03',
    code: 'POC2',
    title: 'Integration (API endpoints and Queries)',
    description:
      'Switchboard API endpoints for integration partners with document model update events and document state queries.',
    status: Sow_DeliverableStatus.Delivered,
    owner: { id: '93RF8qO5' } as unknown as Sow_Deliverable['owner'],
    keyResults: [
      {
        __typename: 'SOW_KeyResult',
        id: 'Zmb1aoqR',
        title: 'Source code (Powerhouse repo)',
        link: 'https://github.com/powerhouse-inc/',
      },
      {
        __typename: 'SOW_KeyResult',
        id: '9p92yM7X',
        title: 'Source code (SES repo)',
        link: 'https://github.com/makerdao-ses',
      },
    ],
    workProgress: {
      __typename: 'SOW_Percentage',
      value: 1,
    },
    budgetAnchor: {
      __typename: 'SOW_BudgetAnchorProject',
      project: 'php-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 150000,
      unit: null,
    },
  },
  {
    __typename: 'SOW_Deliverable',
    id: 'oy69oibt02',
    code: 'POC3',
    title: 'Expense dashboard increments (on-chain data, budget breakdowns)',
    description:
      'Separate incremental release of the Sky Ecosystem expenses platform with on-chain transactional data and budget breakdown views.',
    status: Sow_DeliverableStatus.Delivered,
    owner: { id: '93RF8qO5' } as unknown as Sow_Deliverable['owner'],
    keyResults: [
      {
        __typename: 'SOW_KeyResult',
        id: '7E7cp06j',
        title: 'Expense Dashboard deployment v0.33.0',
        link: 'https://github.com/makerdao-ses/ecosystem-dashboard/releases/tag/v0.33.0',
      },
    ],
    workProgress: {
      __typename: 'SOW_Percentage',
      value: 1,
    },
    budgetAnchor: {
      __typename: 'SOW_BudgetAnchorProject',
      project: 'pea-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 80000,
      unit: null,
    },
  },
  {
    __typename: 'SOW_Deliverable',
    id: 'mvp-deliverable-1',
    code: 'MVP1',
    title: 'MVP Platform Core Features',
    description:
      'Core platform features for the MVP release including user management, document editing, and basic workflows.',
    status: Sow_DeliverableStatus.InProgress,
    owner: { id: '93RF8qO5' } as unknown as Sow_Deliverable['owner'],
    keyResults: [
      {
        __typename: 'SOW_KeyResult',
        id: 'mvp-kr-1',
        title: 'User Authentication System',
        link: 'https://github.com/powerhouse-inc/auth-system',
      },
      {
        __typename: 'SOW_KeyResult',
        id: 'mvp-kr-2',
        title: 'Document Editor MVP',
        link: 'https://github.com/powerhouse-inc/document-editor',
      },
    ],
    workProgress: {
      __typename: 'SOW_Percentage',
      value: 0.6,
    },
    budgetAnchor: {
      __typename: 'SOW_BudgetAnchorProject',
      project: 'php-project',
      margin: 0.15,
      quantity: 1,
      unitCost: 200000,
      unit: null,
    },
  },
  {
    __typename: 'SOW_Deliverable',
    id: 'prod-deliverable-1',
    code: 'PROD1',
    title: 'Production Infrastructure Setup',
    description:
      'Production-ready infrastructure including monitoring, logging, security, and scalability improvements.',
    status: Sow_DeliverableStatus.Todo,
    owner: { id: '93RF8qO5' } as unknown as Sow_Deliverable['owner'],
    keyResults: [
      {
        __typename: 'SOW_KeyResult',
        id: 'prod-kr-1',
        title: 'Infrastructure Documentation',
        link: '',
      },
      {
        __typename: 'SOW_KeyResult',
        id: 'prod-kr-2',
        title: 'Security Audit Report',
        link: 'https://security-audit.example.com',
      },
      {
        __typename: 'SOW_KeyResult',
        id: 'prod-kr-3',
        title: 'Performance Benchmarks',
        link: '',
      },
    ],
    workProgress: {
      __typename: 'SOW_Percentage',
      value: 0,
    },
    budgetAnchor: {
      __typename: 'SOW_BudgetAnchorProject',
      project: 'php-project',
      margin: 0.2,
      quantity: 1,
      unitCost: 300000,
      unit: null,
    },
  },
  {
    __typename: 'SOW_Deliverable',
    id: 'atlas-deliverable-1',
    code: 'ATLAS1',
    title: 'Atlas Editor Integration',
    description: 'Integration of Atlas Editor with automation processes and workflow management.',
    status: Sow_DeliverableStatus.Todo,
    owner: { id: '11F2ho3q' } as unknown as Sow_Deliverable['owner'],
    keyResults: [
      {
        __typename: 'SOW_KeyResult',
        id: 'atlas-kr-1',
        title: 'Atlas Editor Prototype',
        link: '',
      },
    ],
    workProgress: {
      __typename: 'SOW_Percentage',
      value: 0,
    },
    budgetAnchor: {
      __typename: 'SOW_BudgetAnchorProject',
      project: 'php-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 100000,
      unit: null,
    },
  },
]

// Mocked milestones
export const mockedMilestones: Sow_Milestone[] = [
  {
    __typename: 'SOW_Milestone',
    id: 'ustpb52jla',
    sequenceCode: 'PH01',
    title: 'Decentralized Operations Platform - POC',
    description:
      'Roadmap milestone: Decentralized Operations Platform - Proof of Concept. Milestone 1, set for March 1, marks the initial phase of Powerhouse Decentralized Operations Platform. Deliverables include: Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard; Switchboard API endpoints for integration partners with document model update events and document state queries; and Switchboard API endpoints for integration partners with document model update events and document state queries.',
    deliveryTarget: '2024-03-01T00:00:00.000Z',
    budget: 330000,
    coordinators: ['Prometheus', 'callmeT', 'meraki', 'Lumen', 'Kilgore', 'Layer0x'],
    scope: {
      __typename: 'SOW_DeliverablesSet',
      deliverables: ['oy69oibt04', 'oy69oibt03', 'oy69oibt02'],
      status: Sow_DeliverableSetStatus.Finished,
      deliverablesCompleted: {
        __typename: 'SOW_DeliverablesCompleted',
        completed: 3,
        total: 3,
      },
      progress: {
        __typename: 'SOW_Percentage',
        value: 1,
      },
    },
  },
  {
    __typename: 'SOW_Milestone',
    id: 'milestone-2',
    sequenceCode: 'PH02',
    title: 'Decentralized Operations Platform - MVP',
    description:
      'Decentralized Operations Platform - Minimum Viable Product Release, including: MVP release of the MakerDAO transparency reporting information; Integrated Powerhouse Platform delivery.',
    deliveryTarget: '2024-06-30T00:00:00.000Z',
    budget: 500000,
    coordinators: ['Prometheus', 'teep'],
    scope: {
      __typename: 'SOW_DeliverablesSet',
      deliverables: ['mvp-deliverable-1'],
      status: Sow_DeliverableSetStatus.Todo,
      deliverablesCompleted: {
        __typename: 'SOW_DeliverablesCompleted',
        completed: 0,
        total: 5,
      },
      progress: {
        __typename: 'SOW_Percentage',
        value: 0,
      },
    },
  },
  {
    __typename: 'SOW_Milestone',
    id: 'milestone-3',
    sequenceCode: 'PH03',
    title: 'Decentralized Operations Platform - Production',
    description:
      'Decentralized Operations Platform - Production release, including: (scope not final) Production grade release of the MakerDAO transparency reporting information; Integrated Powerhouse platform.',
    deliveryTarget: '2024-09-30T00:00:00.000Z',
    budget: 750000,
    coordinators: ['Powerhouse', 'Prometheus'],
    scope: {
      __typename: 'SOW_DeliverablesSet',
      deliverables: ['prod-deliverable-1'],
      status: Sow_DeliverableSetStatus.Todo,
      deliverablesCompleted: {
        __typename: 'SOW_DeliverablesCompleted',
        completed: 0,
        total: 8,
      },
      progress: {
        __typename: 'SOW_Percentage',
        value: 0,
      },
    },
  },
  {
    __typename: 'SOW_Milestone',
    id: 'milestone-4',
    sequenceCode: 'PH04',
    title: 'Atlas + I/A POC',
    description:
      'Decentralized Operations Platform - Atlas Editor + Integration / Automation PoC, including: (scope not final) of Atlas Editor document model; Automation process POC.',
    deliveryTarget: '2024-12-31T00:00:00.000Z',
    budget: 200000,
    coordinators: ['meraki', 'callmeT'],
    scope: {
      __typename: 'SOW_DeliverablesSet',
      deliverables: ['atlas-deliverable-1'],
      status: Sow_DeliverableSetStatus.Todo,
      deliverablesCompleted: {
        __typename: 'SOW_DeliverablesCompleted',
        completed: 0,
        total: 3,
      },
      progress: {
        __typename: 'SOW_Percentage',
        value: 0,
      },
    },
  },
  {
    __typename: 'SOW_Milestone',
    id: 'milestone-5',
    sequenceCode: 'PH05',
    title: 'Powerhouse Spin-off',
    description:
      'Powerhouse spin-off research, creation and structuring, including: legal entity; business model; token model; new customers; public comms.',
    deliveryTarget: '2025-03-31T00:00:00.000Z',
    budget: 1000000,
    coordinators: ['Powerhouse', 'Prometheus', 'teep'],
    scope: {
      __typename: 'SOW_DeliverablesSet',
      deliverables: [],
      status: Sow_DeliverableSetStatus.InProgress,
      deliverablesCompleted: {
        __typename: 'SOW_DeliverablesCompleted',
        completed: 1,
        total: 6,
      },
      progress: {
        __typename: 'SOW_Percentage',
        value: 0.33,
      },
    },
  },
  {
    __typename: 'SOW_Milestone',
    id: 'milestone-6',
    sequenceCode: 'PH06',
    title: 'MakerDAO PM Consultancy',
    description:
      'MakerDAO project management consultancy, including: Endgame advisory & Operations coordination; Management & delivelt of Pointable AI SOW1; related OCF work & management.',
    deliveryTarget: '2025-06-30T00:00:00.000Z',
    budget: 300000,
    coordinators: ['Prometheus', 'meraki'],
    scope: {
      __typename: 'SOW_DeliverablesSet',
      deliverables: [],
      status: Sow_DeliverableSetStatus.InProgress,
      deliverablesCompleted: {
        __typename: 'SOW_DeliverablesCompleted',
        completed: 2,
        total: 4,
      },
      progress: {
        __typename: 'SOW_Percentage',
        value: 0.66,
      },
    },
  },
]

// Mocked roadmap
export const mockedRoadmaps: Sow_Roadmap[] = [
  {
    __typename: 'SOW_Roadmap',
    id: 'roadmap-powerhouse-2024',
    slug: 'powerhouse-2024',
    title: 'Powerhouse 2024 Roadmap',
    description: 'Comprehensive roadmap for Powerhouse development and operations in 2024.',
    milestones: mockedMilestones,
  },
  {
    __typename: 'SOW_Roadmap',
    id: 'roadmap-powerhouse-2025',
    slug: 'powerhouse-2025',
    title: 'Powerhouse 2025 Roadmap',
    description: 'Comprehensive roadmap for Powerhouse development and operations in 2025.',
    milestones: mockedMilestones,
  },
  {
    __typename: 'SOW_Roadmap',
    id: 'roadmap-powerhouse-2026',
    slug: 'powerhouse-2026',
    title: 'Powerhouse 2026 Roadmap',
    description: 'Comprehensive roadmap for Powerhouse development and operations in 2026.',
    milestones: mockedMilestones,
  },
]

// Mocked scope of work state
export const mockedScopeOfWorkState: Sow_ScopeOfWorkState = {
  __typename: 'SOW_ScopeOfWorkState',
  title: 'Powerhouse Scope of Work 2024',
  description: 'Comprehensive scope of work for Powerhouse operations and development',
  status: Sow_ScopeOfWorkStatus.InProgress,
  roadmaps: mockedRoadmaps,
  contributors: mockedContributors as unknown as Sow_ScopeOfWorkState['contributors'],
  deliverables: mockedDeliverables,
  projects: mockedProjects,
}

export const mockedScopeOfWorkQuery = {
  ScopeOfWork: {
    document: {
      document: {
        id: 'powerhouse-scope-of-work-2024',
        state: { global: mockedScopeOfWorkState },
      },
      childIds: [],
    },
  },
} as unknown as ScopeOfWorkQuery

// Legacy compatibility exports for existing components
export const mockedContributors1 = mockedContributors
export const mockedProjects1 = mockedProjects
export const mockedDeliverables1 = mockedDeliverables
export const mockedMilestone1 = mockedMilestones[0]
