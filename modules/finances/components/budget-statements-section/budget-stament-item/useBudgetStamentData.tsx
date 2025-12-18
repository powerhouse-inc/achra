import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'

interface BuildersStamentProps {
  builders: Builder[]
}

// TODO: Implement this hook to process correct data
export function useBudgetStamentData({ builders }: Readonly<BuildersStamentProps>) {
  return {
    buildersProcessed: builders,
  }
}
