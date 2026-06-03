import type { WorkstreamDetailsQuery } from '@/modules/__generated__/graphql/switchboard-generated'

export type WorkstreamDetailsProject = Omit<
  NonNullable<
    NonNullable<NonNullable<WorkstreamDetailsQuery['workstream'][number]>['initialProposal']>['sow']
  >['projects'][number],
  'BudgetType'
>
