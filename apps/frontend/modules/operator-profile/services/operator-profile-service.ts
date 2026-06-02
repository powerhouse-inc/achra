import { useOperatorProfileQuery } from '@/modules/__generated__/graphql/switchboard-generated'

export type OperatorProfile = NonNullable<Awaited<ReturnType<typeof getOperatorProfile>>>

export async function getOperatorProfile(operatorSlug: string) {
  const data = await useOperatorProfileQuery.fetcher({
    filter: {
      slug: operatorSlug,
      isOperator: true,
    },
  })()

  if (data.builders.length === 0) return undefined
  return data.builders[0]
}
