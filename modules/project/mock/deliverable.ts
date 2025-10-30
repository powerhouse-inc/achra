import {
  type ScopeOfWork_Deliverable,
  ScopeOfWork_DeliverableStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
export const mockDeliverables: ScopeOfWork_Deliverable[] = [
  {
    id: 'D1',
    title: 'Deliverable 1',
    status: ScopeOfWork_DeliverableStatus.InProgress,
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 100000,
      unit: null,
    },
    code: 'D1',
    description: 'Deliverable 1',
    owner: '1234567890',
    workProgress: {
      value: 10,
    },
    keyResults: [
      {
        id: 'kr1',
        title: 'RWA Portfolio conceptual wireframes',
        link: '',
      },
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
      {
        id: 'kr4',
        title: 'Expense dashboard on-goin process',
        link: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr5',
        title: 'Source code on Powerhouse Github repo',
        link: '',
      },
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
    workProgress: {
      value: 30,
    },
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 100000,
      unit: null,
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
      {
        id: 'kr9',
        title: 'Expense dashboard on-going work',
        link: '',
      },
      {
        id: 'kr10',
        title: 'Source code on Powerhouse Github repo',
        link: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr11',
        title: 'Custom MakerDAO domain name configured',
        link: '',
      },
    ],
  },
  {
    id: 'D3',
    title: 'Deliverable 3',
    status: ScopeOfWork_DeliverableStatus.Draft,
    code: 'D3',
    description: 'Deliverable 3',
    owner: '1234567890',
    workProgress: {
      value: 50,
    },
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 100000,
      unit: null,
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
    workProgress: {
      value: 70,
    },
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 100000,
      unit: null,
    },
    keyResults: [
      {
        id: 'kr13',
        title: 'Integration demo of RWA Portfolio - Apr 10',
        link: 'www.examplelink.com',
      },
      {
        id: 'kr14',
        title: 'Source code on Powerhouse Github repo',
        link: '',
      },
      {
        id: 'kr15',
        title: 'Expense dashboard on-going work',
        link: 'www.celestia-portfolio.com',
      },
    ],
  },
  {
    id: 'D5',
    title: 'Deliverable 5',
    status: ScopeOfWork_DeliverableStatus.Canceled,
    code: 'D5',
    description: 'Deliverable 5',
    owner: '1234567890',
    workProgress: {
      value: 0,
    },
    budgetAnchor: {
      project: 'rwa-project',
      margin: 0.1,
      quantity: 1,
      unitCost: 100000,
      unit: null,
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
      {
        id: 'kr18',
        title: 'Expense dashboard on-going work',
        link: '',
      },
      {
        id: 'kr19',
        title: 'Custom MakerDAO domain name configured',
        link: 'www.celestia-portfolio.com',
      },
    ],
  },
]
