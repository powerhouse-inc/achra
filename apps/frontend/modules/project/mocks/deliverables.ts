import {
  type ScopeOfWork_Deliverable,
  ScopeOfWork_DeliverableStatus,
  type ScopeOfWork_Unit,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockProjectDeliverables: ScopeOfWork_Deliverable[] = [
  {
    __typename: 'ScopeOfWork_Deliverable',
    id: 'oy69oibt04',
    code: 'POC1',
    title: 'First technical integration of RWA Portfolio (Connect & Switchboard)',
    description:
      'Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard.',
    status: ScopeOfWork_DeliverableStatus.Delivered,
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
  },
  {
    __typename: 'ScopeOfWork_Deliverable',
    id: 'oy69oibt03',
    code: 'POC2',
    title: 'Integration (API endpoints and Queries)',
    description:
      'Switchboard API endpoints for integration partners with document model update events and document state queries.',
    status: ScopeOfWork_DeliverableStatus.Delivered,
    keyResults: [
      {
        __typename: 'ScopeOfWork_KeyResult',
        id: 'Zmb1aoqR',
        title: 'Source code (Powerhouse repo)',
        link: 'https://github.com/powerhouse-inc/',
      },
    ],
  },
  {
    __typename: 'ScopeOfWork_Deliverable',
    id: 'mvp-deliverable-1',
    code: 'MVP1',
    title: 'MVP Platform Core Features',
    description:
      'Core platform features for the MVP release including user management, document editing, and basic workflows.',
    status: ScopeOfWork_DeliverableStatus.InProgress,
    keyResults: [
      {
        __typename: 'ScopeOfWork_KeyResult',
        id: 'mvp-kr-1',
        title: 'User Authentication System',
        link: 'https://github.com/powerhouse-inc/auth-system',
      },
    ],
  },
]

export const mockDeliverables: ScopeOfWork_Deliverable[] = [
  {
    id: 'D1',
    title: 'Deliverable 1',
    status: ScopeOfWork_DeliverableStatus.InProgress,
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 300000,
      unit: 'Hours' as ScopeOfWork_Unit,
    },
    code: 'D1',
    description: 'Deliverable 1',
    owner: '1234567890',
    workProgress: { value: 10 },
    keyResults: [
      { id: 'kr1', title: 'RWA Portfolio conceptual wireframes', link: 'www.examplelink.com' },
      {
        id: 'kr2',
        title: 'Technical demo of RWA Portfolio - Feb 21',
        link: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr3',
        title: 'Expense Dashboard deployment v0.33.0',
        link: 'www.celestia-aurora-constellation-blockc...',
      },
      { id: 'kr4', title: 'Expense dashboard on-goin process', link: 'www.celestia-portfolio.com' },
      { id: 'kr5', title: 'Source code on Powerhouse Github repo', link: 'www.examplelink.com' },
      {
        id: 'kr6',
        title: 'Custom MakerDAO domain name configured',
        link: 'www.celestia-portfolio.com',
      },
    ],
  },
  {
    id: 'D2',
    title: 'Deliverable 2',
    status: ScopeOfWork_DeliverableStatus.Canceled,
    code: 'D2',
    description: 'Deliverable 2',
    owner: '1234567890',
    workProgress: { value: 30 },
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 2,
      unitCost: 230000,
      unit: 'Hours' as ScopeOfWork_Unit,
    },
    keyResults: [
      {
        id: 'kr7',
        title: 'Integration demo of RWA Portfolio - Apr 10',
        link: 'www.examplelink.com',
      },
      {
        id: 'kr8',
        title: 'Source code on Powerhouse Github repo',
        link: 'www.celestia-portfolio.com',
      },
      { id: 'kr9', title: 'Expense dashboard on-going work', link: 'www.examplelink.com' },
      {
        id: 'kr10',
        title: 'Source code on Powerhouse Github repo',
        link: 'www.celestia-portfolio.com',
      },
      { id: 'kr11', title: 'Custom MakerDAO domain name configured', link: 'www.examplelink.com' },
    ],
  },
  {
    id: 'D3',
    title: 'Deliverable 3',
    status: ScopeOfWork_DeliverableStatus.Draft,
    code: 'D3',
    description: 'Deliverable 3',
    owner: '1234567890',
    workProgress: { value: 50 },
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 2,
      unitCost: 250000,
      unit: 'Hours' as ScopeOfWork_Unit,
    },
    keyResults: [
      {
        id: 'kr12',
        title: 'Integration demo of RWA Portfolio - Apr 10',
        link: 'www.examplelink.com',
      },
    ],
  },
  {
    id: 'D4',
    title: 'Deliverable 4',
    status: ScopeOfWork_DeliverableStatus.Canceled,
    code: 'D4',
    description: 'Deliverable 4',
    owner: '1234567890',
    workProgress: { value: 70 },
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 4,
      unitCost: 250_600,
      unit: 'Hours' as ScopeOfWork_Unit,
    },
    keyResults: [
      {
        id: 'kr13',
        title: 'Integration demo of RWA Portfolio - Apr 10',
        link: 'www.examplelink.com',
      },
      { id: 'kr14', title: 'Source code on Powerhouse Github repo', link: 'www.examplelink.com' },
      { id: 'kr15', title: 'Expense dashboard on-going work', link: 'www.celestia-portfolio.com' },
    ],
  },
  {
    id: 'D5',
    title: 'Deliverable 5',
    status: ScopeOfWork_DeliverableStatus.Canceled,
    code: 'D5',
    description: 'Deliverable 5',
    owner: '1234567890',
    workProgress: { value: 0 },
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 3,
      unitCost: 150000,
      unit: 'Hours' as ScopeOfWork_Unit,
    },
    keyResults: [
      {
        id: 'kr16',
        title: 'Integration demo of RWA Portfolio - Apr 10',
        link: 'www.examplelink.com',
      },
      {
        id: 'kr17',
        title: 'Source code on Powerhouse Github repo',
        link: 'www.celestia-portfolio.com',
      },
      { id: 'kr18', title: 'Expense dashboard on-going work', link: 'www.examplelink.com' },
      {
        id: 'kr19',
        title: 'Custom MakerDAO domain name configured',
        link: 'www.celestia-portfolio.com',
      },
    ],
  },
]
