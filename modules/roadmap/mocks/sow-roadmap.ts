import {
  type Sow_Deliverable,
  Sow_DeliverableSetStatus,
  Sow_DeliverableStatus,
  type Sow_Roadmap,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockedSowDeliverables: Sow_Deliverable[] = [
  {
    __typename: 'SOW_Deliverable',
    id: 'oy69oibt04',
    code: 'POC1',
    title: 'First technical integration of RWA Portfolio (Connect & Switchboard)',
    description:
      'Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard.',
    status: Sow_DeliverableStatus.Delivered,
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
  },
  {
    __typename: 'SOW_Deliverable',
    id: 'oy69oibt03',
    code: 'POC2',
    title: 'Integration (API endpoints and Queries)',
    description:
      'Switchboard API endpoints for integration partners with document model update events and document state queries.',
    status: Sow_DeliverableStatus.Delivered,
    keyResults: [
      {
        __typename: 'SOW_KeyResult',
        id: 'Zmb1aoqR',
        title: 'Source code (Powerhouse repo)',
        link: 'https://github.com/powerhouse-inc/',
      },
    ],
  },
  {
    __typename: 'SOW_Deliverable',
    id: 'mvp-deliverable-1',
    code: 'MVP1',
    title: 'MVP Platform Core Features',
    description:
      'Core platform features for the MVP release including user management, document editing, and basic workflows.',
    status: Sow_DeliverableStatus.InProgress,
    keyResults: [
      {
        __typename: 'SOW_KeyResult',
        id: 'mvp-kr-1',
        title: 'User Authentication System',
        link: 'https://github.com/powerhouse-inc/auth-system',
      },
    ],
    workProgress: {
      __typename: 'SOW_Percentage',
      value: 0.6,
    },
  },
]

export const mockedSowRoadmap: Sow_Roadmap = {
  __typename: 'SOW_Roadmap',
  id: 'powerhouse-team-2024-roadmap-af7da134',
  slug: 'powerhouse-team-2024-roadmap-af7da134',
  title: 'Powerhouse Team 2024 Roadmap',
  description: 'Comprehensive roadmap for Powerhouse development and operations in 2024.',
  milestones: [
    {
      __typename: 'SOW_Milestone',
      id: 'ustpb52jla',
      sequenceCode: 'DOP',
      title: 'Decentralized Operations Platform - POC',
      description:
        'Initial phase of the Decentralized Operations Platform with proof of concept deliverables.',
      deliveryTarget: '2024-03-01T00:00:00.000Z',
      budget: 330000,
      coordinators: ['Prometheus', 'callmeT'],
      scope: {
        __typename: 'SOW_DeliverablesSet',
        deliverables: ['oy69oibt04', 'oy69oibt03'],
        status: Sow_DeliverableSetStatus.Finished,
        deliverablesCompleted: {
          __typename: 'SOW_DeliverablesCompleted',
          completed: 2,
          total: 2,
        },
        progress: {
          __typename: 'SOW_Percentage',
          value: 1,
        },
      },
    },
    {
      __typename: 'SOW_Milestone',
      id: 'milestone-mvp',
      sequenceCode: 'MVP',
      title: 'Decentralized Operations Platform - MVP',
      description:
        'MVP release of the MakerDAO transparency reporting information with integrated Powerhouse Platform delivery.',
      deliveryTarget: '2024-06-30T00:00:00.000Z',
      budget: 500000,
      coordinators: ['Prometheus', 'teep'],
      scope: {
        __typename: 'SOW_DeliverablesSet',
        deliverables: ['mvp-deliverable-1'],
        status: Sow_DeliverableSetStatus.InProgress,
        deliverablesCompleted: {
          __typename: 'SOW_DeliverablesCompleted',
          completed: 0,
          total: 3,
        },
        progress: {
          __typename: 'SOW_Percentage',
          value: 0.4,
        },
      },
    },
    {
      __typename: 'SOW_Milestone',
      id: 'milestone-prod',
      sequenceCode: 'PROD',
      title: 'Decentralized Operations Platform - Production',
      description: 'Production-grade release of the MakerDAO transparency reporting information.',
      deliveryTarget: '2024-09-30T00:00:00.000Z',
      budget: 750000,
      coordinators: ['Powerhouse', 'Prometheus'],
      scope: {
        __typename: 'SOW_DeliverablesSet',
        deliverables: [],
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
  ],
}
