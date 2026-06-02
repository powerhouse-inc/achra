import {
  type BuilderProject,
  Sow_DeliverableSetStatus,
  Sow_PmCurrency,
} from '@/modules/__generated__/graphql/switchboard-generated'

const project: BuilderProject = {
  __typename: 'BuilderProject',
  id: 'proj-mock-id',
  title: 'Powerhouse Dashboard',
  code: 'PWR-001',
  slug: 'powerhouse-dashboard',
  abstract: 'A dashboard that centralizes KPIs, scope tracking, and expense insights.',
  budget: 250000,
  currency: Sow_PmCurrency.Dai,
  scope: {
    __typename: 'Builder_SOW_DeliverablesSet',
    status: Sow_DeliverableSetStatus.InProgress,
    progress: {
      __typename: 'SOW_Percentage',
      value: 65,
    },
    deliverablesCompleted: {
      __typename: 'SOW_DeliverablesCompleted',
      completed: 13,
      total: 20,
    },
    deliverables: [],
  },
}

export { project }
