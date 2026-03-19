import {
  type FullProposal,
  ProposalStatus,
  Sow_DeliverableStatus,
  Sow_ScopeOfWorkStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'

export const mockProposal: FullProposal = {
  __typename: 'FullProposal' as const,
  id: 'proposal-powerhouse-workstream-2024',
  status: ProposalStatus.Submitted,
  author: {
    __typename: 'ProposalAuthor' as const,
    id: '77d71092-1f1a-4d5c-93c4-ac8d9f43d56d',
    name: 'Prometheus',
  },
  sow: {
    __typename: 'SOW_ScopeOfWorkState' as const,
    description:
      'Scope of work for the Powerhouse Workstream 2024, covering platform development, integrations, and operational tooling.',
    title: 'Powerhouse Workstream 2024',
    status: Sow_ScopeOfWorkStatus.InProgress,
    contributors: [],
    roadmaps: [],
    deliverables: [
      {
        __typename: 'SOW_Deliverable' as const,
        id: 'oy69oibt04',
        code: 'POC1',
        title: 'First technical integration of RWA Portfolio (Connect & Switchboard)',
        description:
          'Technical integration demo showcasing the RWA Portfolio Editor in Connect and data synchronization with Switchboard.',
        status: Sow_DeliverableStatus.Delivered,
        keyResults: [
          {
            __typename: 'SOW_KeyResult' as const,
            id: 'e9FdAg63',
            title: 'RWA Conceptual Wireframes',
            link: 'https://drive.google.com/file/d/1NZXm_Q43sKH5pqwHTwN0DYvSW1uewMlY/view',
          },
        ],
      },
      {
        __typename: 'SOW_Deliverable' as const,
        id: 'mvp-deliverable-1',
        code: 'MVP1',
        title: 'MVP Platform Core Features',
        description:
          'Core platform features for the MVP release including user management, document editing, and basic workflows.',
        status: Sow_DeliverableStatus.InProgress,
        keyResults: [],
      },
      {
        __typename: 'SOW_Deliverable' as const,
        id: 'prod-deliverable-1',
        code: 'PROD1',
        title: 'Production Infrastructure Setup',
        description:
          'Production-ready infrastructure including monitoring, logging, security, and scalability improvements.',
        status: Sow_DeliverableStatus.Draft,
        keyResults: [],
      },
    ],
    projects: [],
  },
  paymentTerms: null,
}
