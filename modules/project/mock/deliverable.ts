import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import type { Deliverable } from '@/modules/project/types'

// Mock data
export const mockDeliverables: Deliverable[] = [
  {
    id: 'D1',
    title: 'Deliverable 1',
    status: ScopeOfWork_DeliverableSetStatus.InProgress,
    keyResults: [
      {
        id: 'kr1',
        title: 'RWA Portfolio conceptual wireframes',
        url: 'www.examplelink.com',
        status: true,
      },
      {
        id: 'kr2',
        title: 'Technical demo of RWA Portfolio - Feb 21',
        url: 'www.celestia-portfolio.com',
        status: true,
      },
      {
        id: 'kr3',
        title: 'Expense Dashboard deployment v0.33.0',
        url: 'www.celestia-aurora-constellation-blockc...',
        status: false,
      },
      {
        id: 'kr4',
        title: 'Expense dashboard on-goin process',
        url: 'www.celestia-portfolio.com',
        status: false,
      },
      {
        id: 'kr5',
        title: 'Source code on Powerhouse Github repo',
        url: 'www.celestia-portfolio.com',
        status: false,
      },
      {
        id: 'kr6',
        title: 'Custom MakerDAO domain name configured',
        url: 'www.celestia-portfolio.com',
        status: false,
      },
    ],
    image: '',
    progress: 0,
    qyt: 0,
    unitBudget: 0,
    subtotal: 0,
  },
  {
    id: 'D2',
    title: 'Deliverable 2',
    status: ScopeOfWork_DeliverableSetStatus.Canceled,
    keyResults: [
      {
        id: 'kr7',
        title: 'Integration demo of RWA Portfolio - Apr 10',
        url: 'www.examplelink.com',
        status: true,
      },
      {
        id: 'kr8',
        title: 'Source code on Powerhouse Github repo',
        url: 'www.celestia-portfolio.com',
        status: true,
      },
      {
        id: 'kr9',
        title: 'Expense dashboard on-going work',
        url: 'www.celestia-portfolio.com',
        status: true,
      },
      {
        id: 'kr10',
        title: 'Source code on Powerhouse Github repo',
        status: false,
        url: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr11',
        title: 'Custom MakerDAO domain name configured',
        status: false,
        url: 'www.celestia-portfolio.com',
      },
    ],
    image: '',
    progress: 0,
    qyt: 0,
    unitBudget: 0,
    subtotal: 0,
  },
  {
    id: 'D3',
    title: 'Deliverable 3',
    status: ScopeOfWork_DeliverableSetStatus.Todo,
    keyResults: [
      {
        id: 'kr12',
        title: 'Source code on Powerhouse Github repo',
        status: false,
        url: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr13',
        title: 'Source code on Powerhouse Github repo',
        status: false,
        url: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr14',
        title: 'Source code on Powerhouse Github repo',
        status: false,
        url: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr15',
        title: 'Source code on Powerhouse Github repo',
        status: false,
        url: 'www.celestia-portfolio.com',
      },
    ],
    image: '',
    progress: 0,
    qyt: 0,
    unitBudget: 0,
    subtotal: 0,
  },
  {
    id: 'D4',
    title: 'Deliverable 4',
    status: ScopeOfWork_DeliverableSetStatus.Finished,
    keyResults: [
      {
        id: 'kr16',
        title: 'Source code on Powerhouse Github repo',
        status: true,
        url: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr17',
        title: 'Source code on Powerhouse Github repo',
        status: true,
        url: 'www.celestia-portfolio.com',
      },
      {
        id: 'kr18',
        title: 'Source code on Powerhouse Github repo',
        status: true,
        url: 'www.celestia-portfolio.com',
      },
    ],
    image: '',
    progress: 0,
    qyt: 0,
    unitBudget: 0,
    subtotal: 0,
  },
]
