import {
  type AllNetworksQuery,
  type ProjectsQuery,
  ProposalStatus,
  Pt_PaymentCurrency,
  Pt_PaymentModel,
  Sow_DeliverableSetStatus,
  Sow_DeliverableStatus,
  Sow_PmCurrency,
  Sow_ScopeOfWorkStatus,
  type WorkstreamDetailsQuery,
  type WorkstreamsQuery,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { mockedNetworks } from '@/modules/networks/mocks/networks'

export const mockedAllNetworksQuery: AllNetworksQuery = {
  __typename: 'Query',
  allNetworks: mockedNetworks.map((network) => ({
    __typename: 'AllNetworks',
    network: {
      ...network,
      slug: network.name?.toLowerCase().replace(/\s+/g, '-') ?? null,
    },
  })),
}

const mockWorkstreamBase = {
  __typename: 'FullQueryWorkstream' as const,
  title: 'Finance Team Workstream',
  status: WorkstreamStatus.OpenForProposals,
  slug: 'finance-team',
  client: null,
  network: {
    __typename: 'Network' as const,
    name: 'Sky',
    slug: 'sky',
    logo: '/networks/logos/sky.png',
    darkThemeLogo: '/networks/logos/sky.png',
  },
  initialProposal: {
    __typename: 'FullProposal' as const,
    status: ProposalStatus.Submitted,
    author: { __typename: 'ProposalAuthor' as const, id: 'author-1', name: 'Jane Smith' },
    paymentTerms: {
      __typename: 'PT_PaymentTermsState' as const,
      proposer: 'Jane Smith',
      currency: Pt_PaymentCurrency.Usd,
      totalAmount: 1580000,
      paymentModel: Pt_PaymentModel.Milestone,
    },
    sow: {
      __typename: 'SOW_ScopeOfWorkState' as const,
      description: 'Scope of work for Finance Team',
      title: 'Finance Team Workstream',
      status: Sow_ScopeOfWorkStatus.InProgress,
      roadmaps: [
        {
          __typename: 'SOW_Roadmap' as const,
          milestones: [
            {
              __typename: 'SOW_Milestone' as const,
              budget: 500000,
              scope: {
                __typename: 'SOW_DeliverablesSet' as const,
                deliverables: ['del-1', 'del-2'],
              },
            },
          ],
        },
      ],
      deliverables: [
        {
          __typename: 'SOW_Deliverable' as const,
          id: 'del-1',
          code: 'D1',
          title: 'Deliverable 1',
          description: 'First deliverable',
        },
        {
          __typename: 'SOW_Deliverable' as const,
          id: 'del-2',
          code: 'D2',
          title: 'Deliverable 2',
          description: 'Second deliverable',
        },
      ],
      projects: [
        {
          __typename: 'SOW_Project' as const,
          id: 'proj-1',
          slug: 'project-alpha',
          code: 'PA',
          abstract: 'Project Alpha',
          title: 'Project Alpha',
          imageUrl: null,
          budget: 800000,
          currency: Sow_PmCurrency.Usd,
          projectOwner: {
            __typename: 'Builder' as const,
            id: 'builder-1',
            code: 'B1',
            name: 'John Doe',
          },
          expenditure: { __typename: 'SOW_BudgetExpenditure' as const, cap: 800000 },
          scope: {
            __typename: 'SOW_DeliverablesSet' as const,
            status: Sow_DeliverableSetStatus.InProgress,
            deliverables: ['del-1'],
            progress: { __typename: 'SOW_Percentage' as const, value: 50 },
          },
        },
      ],
    },
  },
  rfp: {
    __typename: 'RFP' as const,
    title: 'Finance Team RFP',
    summary: 'RFP summary',
    budgetMax: 2000000,
    budgetMin: 1000000,
    budgetCurrency: 'USD',
    briefing: 'Briefing',
    submissionDeadline: null,
  },
  alternativeProposals: [],
}

export const mockedWorkstreamsQuery: WorkstreamsQuery = {
  __typename: 'Query',
  workstreams: [
    {
      ...mockWorkstreamBase,
      sow: {
        ...mockWorkstreamBase.initialProposal.sow,
        __typename: 'SOW_ScopeOfWorkState' as const,
        projects: [{ __typename: 'SOW_Project', title: 'Project Alpha' }],
        roadmaps: [
          {
            __typename: 'SOW_Roadmap',
            milestones: [{ __typename: 'SOW_Milestone', id: 'm1' }],
          },
        ],
      },
    },
  ],
}

export const mockedProjectsQuery: ProjectsQuery = {
  __typename: 'Query',
  workstreams: [
    {
      ...mockWorkstreamBase,
      initialProposal: {
        ...mockWorkstreamBase.initialProposal,
        sow: {
          ...mockWorkstreamBase.initialProposal.sow,
          __typename: 'SOW_ScopeOfWorkState' as const,
          projects: [
            {
              __typename: 'SOW_Project' as const,
              id: 'proj-1',
              slug: 'project-alpha',
              code: 'PA',
              abstract: 'Project Alpha',
              title: 'Project Alpha',
              imageUrl: null,
              budget: 800000,
              currency: Sow_PmCurrency.Usd,
              projectOwner: {
                __typename: 'Builder' as const,
                id: 'builder-1',
                code: 'B1',
                name: 'John Doe',
              },
              expenditure: { __typename: 'SOW_BudgetExpenditure' as const, cap: 800000 },
              scope: {
                __typename: 'SOW_DeliverablesSet' as const,
                status: Sow_DeliverableSetStatus.InProgress,
                deliverables: ['del-1'],
                progress: { __typename: 'SOW_Percentage' as const, value: 50 },
              },
            },
          ],
          deliverables: [
            {
              __typename: 'SOW_Deliverable' as const,
              id: 'del-1',
              code: 'D1',
              title: 'Deliverable 1',
              description: 'First deliverable',
              status: Sow_DeliverableStatus.InProgress,
              keyResults: [
                {
                  __typename: 'SOW_KeyResult' as const,
                  id: 'kr-1',
                  title: 'Key Result 1',
                  link: 'https://example.com',
                },
              ],
              workProgress: { __typename: 'SOW_Percentage' as const, value: 50 },
              budgetAnchor: null,
            },
          ],
        },
      },
    },
  ],
}

export const mockedWorkstreamDetailsQuery: WorkstreamDetailsQuery = {
  __typename: 'Query',
  workstream: [
    {
      ...mockWorkstreamBase,
      initialProposal: {
        ...mockWorkstreamBase.initialProposal,
        sow: {
          ...mockWorkstreamBase.initialProposal.sow,
          __typename: 'SOW_ScopeOfWorkState' as const,
          deliverables: [
            {
              __typename: 'SOW_Deliverable' as const,
              id: 'del-1',
              code: 'D1',
              title: 'Deliverable 1',
              description: 'First deliverable',
              status: Sow_DeliverableStatus.InProgress,
              keyResults: [
                {
                  __typename: 'SOW_KeyResult' as const,
                  id: 'kr-1',
                  title: 'Key Result 1',
                  link: 'https://example.com',
                },
              ],
              workProgress: { __typename: 'SOW_Percentage' as const, value: 50 },
              budgetAnchor: null,
            },
          ],
        },
      },
    },
  ],
}
